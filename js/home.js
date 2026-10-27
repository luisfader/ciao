(() => {
  const { units, store, icon, starsHtml, starsFor } = CIAO;
  CIAO.topbar('home');

  const path = document.getElementById('path');
  const C = 2 * Math.PI * 69; // circonferenza dell'anello (r = 69 in un viewBox 142)

  const ring = pct => `<svg class="ring" viewBox="0 0 142 142" aria-hidden="true">
      <circle class="track" cx="71" cy="71" r="69"/>
      <circle class="fill" cx="71" cy="71" r="69" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>`;

  const lock = '<svg class="lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  let html = '';
  const off = i => ` style="--o:${[0, 1, 2, 1][i % 4]}"`;
  units.forEach((u, i) => {
    if (!u.available) {
      html += `<div class="stop locked" aria-disabled="true"${off(i)}>
      <div class="medal">${ring(0)}<img src="assets/covers/u${u.n}.webp" alt="" loading="lazy"><span class="num">${lock}</span></div>
      <div class="stop-text"><small>Unità ${u.n} · disponibile presto</small><h3>${u.place}</h3><p class="tag">${u.tagline}</p></div></div>`;
      return;
    }
    const allEx = Object.values(CIAO.lessons[u.n] || {}).flat().filter(b => b.ex && CIAO.isGraded(b.ex)).map(b => b.ex.id);
    const done = CIAO.exStore.doneIn(allEx);
    const p = store.unit(u.n);
    const pct = allEx.length ? done / allEx.length : (p ? p.best : 0);
    html += `<a class="stop ${pct === 1 ? 'done' : ''}" href="unit.html?u=${u.n}"${off(i)}>
      <div class="medal">${ring(pct)}<img src="assets/covers/u${u.n}.webp" alt="" loading="lazy"><span class="num">${u.n}</span></div>
      <div class="stop-text">
        <small>Unità ${u.n} · ${u.focus}</small>
        <h3>${u.place}</h3>
        <p class="tag">${u.tagline}</p>
        <p class="stop-meta">${allEx.length ? `${done}/${allEx.length} esercizi` : 'grammatica e test'}${p ? ' · test ' + starsHtml(starsFor(p.best)) : ''}</p>
      </div></a>`;
  });
  if (CIAO.finalAvailable()) {
    const f = store.get().final;
    html += `<a class="stop finale${f ? ' done' : ''}" href="quiz.html?u=finale"${off(units.length)}>
      <div class="medal">${ring(f ? f.best : 0)}<div class="finale-badge">${icon.laurel}</div></div>
      <div class="stop-text"><small>Tutte le unità</small><h3>Esame finale</h3>
        <p class="tag">${f ? 'test ' + starsHtml(starsFor(f.best)) : 'metti alla prova tutto quello che hai imparato'}</p></div></a>`;
  } else {
    html += `<div class="stop finale locked" aria-disabled="true"${off(units.length)}>
      <div class="medal">${ring(0)}<div class="finale-badge">${icon.laurel}</div></div>
      <div class="stop-text"><small>Tutte le unità · disponibile presto</small><h3>Esame finale</h3>
        <p class="tag">si apre quando tutte le unità saranno pubblicate</p></div></div>`;
  }
  path.innerHTML = html;

  // Il "canale" che collega le tappe
  function drawCanal() {
    const old = path.querySelector('svg.canal'); if (old) old.remove();
    const box = path.getBoundingClientRect();
    const pts = [...path.querySelectorAll('.medal')].map(m => {
      const r = m.getBoundingClientRect();
      return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
    });
    if (pts.length < 2) return;
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const my = (y0 + y1) / 2;
      d += ` C${x0},${my} ${x1},${my} ${x1},${y1}`;
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'canal'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `<path d="${d}"/><path class="dash" d="${d}"/>`;
    path.prepend(svg);
  }
  drawCanal();
  window.addEventListener('resize', () => requestAnimationFrame(drawCanal));
  window.addEventListener('load', drawCanal);

  // Statistiche e pulsante "continua"
  const s = store.get();
  const avail = units.filter(u => u.available);
  const streak = store.streak();
  const exIds = avail.flatMap(u => Object.values(CIAO.lessons[u.n] || {}).flat().filter(b => b.ex && CIAO.isGraded(b.ex)).map(b => b.ex.id));
  document.getElementById('stats').innerHTML =
    `<div><b>${CIAO.exStore.doneIn(exIds)}/${exIds.length}</b>esercizi completati</div><div><b>${s.xp}</b>punti XP</div><div><b>${streak}</b>${streak === 1 ? 'giorno di fila' : 'giorni di fila'}</div>`;
  const started = exIds.some(id => CIAO.exStore.get(id));
  const next = avail.find(u => !store.unit(u.n)) || avail[avail.length - 1];
  const btn = document.getElementById('continua');
  if (started) { btn.textContent = `Continua: unità ${next.n}`; btn.href = `unit.html?u=${next.n}`; }
})();
