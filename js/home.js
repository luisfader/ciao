(() => {
  const { units, store, icon, starsHtml, starsFor } = CIAO;
  CIAO.topbar('home');

  const path = document.getElementById('path');
  const C = 2 * Math.PI * 69; // circonferenza dell'anello (r = 69 in un viewBox 142)

  const ring = pct => `<svg class="ring" viewBox="0 0 142 142" aria-hidden="true">
      <circle class="track" cx="71" cy="71" r="69"/>
      <circle class="fill" cx="71" cy="71" r="69" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>`;

  let html = '';
  units.forEach(u => {
    const p = store.unit(u.n);
    const best = p ? p.best : 0;
    html += `<a class="stop ${p ? 'done' : ''}" href="unit.html?u=${u.n}">
      <div class="medal">${ring(best)}<img src="assets/covers/u${u.n}.webp" alt="" loading="lazy"><span class="num">${u.n}</span></div>
      <div class="stop-text">
        <small>Unità ${u.n} · ${u.focus}</small>
        <h3>${u.place}</h3>
        <p class="tag">${u.tagline}</p>
        ${p ? starsHtml(starsFor(best)) : ''}
      </div></a>`;
  });
  const f = store.get().final;
  html += `<a class="stop finale ${f && f.passed ? 'done' : ''}" href="quiz.html?u=finale">
      <div class="medal">${ring(f ? f.best : 0)}<div class="finale-badge">${icon.laurel}</div></div>
      <div class="stop-text">
        <small>Tutte le unità</small>
        <h3>Esame finale</h3>
        <p class="tag">${f ? (f.passed ? 'superato con il ' + Math.round(f.best * 100) + '%' : 'migliore risultato: ' + Math.round(f.best * 100) + '%') : '25 esercizi su tutto il manuale'}</p>
      </div></a>`;
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
  const done = units.filter(u => store.unit(u.n)).length;
  const streak = store.streak();
  document.getElementById('stats').innerHTML =
    `<div><b>${done}/10</b>unità completate</div><div><b>${s.xp}</b>punti XP</div><div><b>${streak}</b>${streak === 1 ? 'giorno di fila' : 'giorni di fila'}</div>`;
  const next = units.find(u => !store.unit(u.n));
  const btn = document.getElementById('continua');
  if (done > 0 && next) { btn.textContent = `Continua: unità ${next.n}`; btn.href = `unit.html?u=${next.n}`; }
  else if (!next) { btn.textContent = 'Fai l’esame finale'; btn.href = 'quiz.html?u=finale'; }
})();
