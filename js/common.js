/* Progressi salvati nel browser + piccoli aiuti condivisi. */
window.CIAO = window.CIAO || {};

CIAO.store = (() => {
  const KEY = 'ciaoAmore2.progress';
  const blank = () => ({ xp: 0, units: {}, final: null, days: [] });
  let data = blank();
  try { data = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* storage non disponibile */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} };
  const today = () => new Date().toISOString().slice(0, 10);
  return {
    get: () => data,
    unit: n => data.units[n] || null,
    addXp(x) {
      data.xp += x;
      const d = today();
      if (!data.days.includes(d)) data.days = [...data.days, d].slice(-60);
      save();
    },
    saveUnit(n, acc) {
      const prev = data.units[n] || { best: 0, runs: 0 };
      data.units[n] = { best: Math.max(prev.best, acc), runs: prev.runs + 1, done: true };
      save();
    },
    saveFinal(acc, passed) {
      const prev = data.final || { best: 0, runs: 0, passed: false };
      data.final = { best: Math.max(prev.best, acc), runs: prev.runs + 1, passed: prev.passed || passed };
      save();
    },
    streak() {
      const set = new Set(data.days);
      let s = 0; const d = new Date();
      if (!set.has(today())) d.setDate(d.getDate() - 1);
      while (set.has(d.toISOString().slice(0, 10))) { s++; d.setDate(d.getDate() - 1); }
      return s;
    }
  };
})();

CIAO.starsFor = acc => (acc >= 0.95 ? 3 : acc >= 0.8 ? 2 : acc > 0 ? 1 : 0);

CIAO.icon = {
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2.2 4 6.3 4c2.3 0 3.9 1.3 5.7 3.3C13.8 5.3 15.4 4 17.7 4 21.8 4 23.7 8.4 22 11.7 19.5 16.4 12 21 12 21z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  laurel: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M32 54c-12-2-20-12-20-26M32 54c12-2 20-12 20-26"/><path d="M14 36c-5 0-8-3-9-7 5-1 8 2 9 7zM12 26c-5-1-7-5-7-9 5 0 7 4 7 9zM15 17c-4-2-5-6-4-10 4 1 5 5 4 10zM50 36c5 0 8-3 9-7-5-1-8 2-9 7zM52 26c5-1 7-5 7-9-5 0-7 4-7 9zM49 17c4-2 5-6 4-10-4 1-5 5-4 10z"/><path d="M32 22l3 6 6 .8-4.5 4.3 1.1 6.4L32 36.4l-5.6 3.1 1.1-6.4L23 28.8l6-.8z" fill="currentColor"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  turtle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15c0-4 3-7 7-7s7 3 7 7z" fill="currentColor" fill-opacity=".25"/><path d="M18 13.5c1.5 0 3-1 3-2.5s-1-2-2-2-1.5.8-2 1.5M6 15l-1 3M15 15l1 3M2.5 15h17"/></svg>',
  dot: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>'
};

CIAO.starsHtml = n => '<span class="stars" aria-label="' + n + ' stelle su 3">' +
  [0, 1, 2].map(i => CIAO.icon.star.replace('<svg', `<svg class="${i < n ? 'on' : 'off'}"`)).join('') + '</span>';

CIAO.topbar = (active) => {
  const el = document.querySelector('.topbar');
  if (!el) return;
  const xp = CIAO.store.get().xp;
  el.innerHTML = `<div class="wrap">
    <a class="brand" href="index.html">Ciao, amore! <span>2</span></a>
    <nav aria-label="Navigazione principale">
      <a href="index.html#percorso" class="hide-s">Il percorso</a>
      <a href="index.html#autore" class="hide-s">L’autore</a>
      <span class="xp-pill" title="Punti esperienza">${CIAO.icon.bolt}${xp} XP</span>
    </nav></div>`;
};

CIAO.shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

CIAO.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
