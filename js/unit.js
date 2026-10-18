(() => {
  const { units, store, starsHtml, starsFor, lessons } = CIAO;
  CIAO.topbar('unit');
  const app = document.getElementById('app');
  const param = new URLSearchParams(location.search).get('u') || '1';
  const unit = units.find(u => String(u.n) === param) || units[0];
  const lesson = lessons[unit.n];
  document.title = `Unità ${unit.n}: ${unit.place} — Ciao, amore! 2`;

  const hero = (extra) => `<section class="unit-hero"><div class="wrap">
      <img class="cover" src="assets/covers/u${unit.n}.webp" alt="Copertina dell’unità ${unit.n}" width="633" height="900">
      <div>
        <p class="kicker">Unità ${unit.n}</p>
        <h1>${unit.place}</h1>
        <p class="tagline">${unit.tagline}</p>
        <ul class="temi">${unit.temi.map(t => `<li>${t}</li>`).join('')}</ul>
        ${extra}
      </div></div></section>`;

  // Unità non ancora disponibile
  if (!unit.available || !lesson) {
    app.innerHTML = hero(`<div class="locked-note"><p><b>Questa unità sarà disponibile presto.</b> Per ora puoi lavorare con le unità 1 e 2.</p>
      <div class="hero-actions"><a class="btn" href="unit.html?u=1">Vai all’unità 1</a><a class="btn ghost" href="index.html#percorso">Torna al percorso</a></div></div>`);
    return;
  }

  // Esercizi valutati dell'unità (per la barra dei progressi)
  const allEx = Object.values(lesson).flat().filter(b => b.ex).map(b => b.ex);
  const graded = allEx.filter(CIAO.isGraded).map(e => e.id);
  const t = store.unit(unit.n);

  let html = hero(`
    <div class="unit-progress"><div class="up-bar"><span id="up-fill"></span></div><span id="up-text"></span></div>
    <div class="hero-actions">
      <a class="btn" href="#sA">Inizia la lezione</a>
      <a class="btn ghost" href="quiz.html?u=${unit.n}">${t ? 'Ripeti il test finale' : 'Test finale dell’unità'}</a>
      ${t ? `<span class="unit-best">${starsHtml(starsFor(t.best))} test: ${Math.round(t.best * 100)}%</span>` : ''}
    </div>`);

  html += `<nav class="secnav" aria-label="Sezioni dell’unità"><div class="wrap">` +
    unit.sections.map(s => `<a href="#s${s.id}" data-s="${s.id}"><b>${s.id}.</b>${s.title}<span class="sec-dot" aria-hidden="true"></span></a>`).join('') +
    `<a href="#test"><b>★</b>Test finale</a></div></nav><div class="wrap lesson-wrap" id="lesson"></div>`;
  app.innerHTML = html;

  const wrap = document.getElementById('lesson');
  unit.sections.forEach(s => {
    const sec = document.createElement('section');
    sec.className = 'lesson';
    sec.id = 's' + s.id;
    const blocks = lesson[s.id] || [];
    const exIds = blocks.filter(b => b.ex && CIAO.isGraded(b.ex)).map(b => b.ex.id);
    sec.dataset.ex = exIds.join(',');
    sec.innerHTML = `<header class="lesson-head"><h2><span class="letter">${s.id}.</span> ${s.title}</h2>
      ${exIds.length ? `<span class="sec-count" data-sec="${s.id}"></span>` : ''}</header><div class="lesson-body"></div>`;
    const body = sec.querySelector('.lesson-body');
    let n = 0;
    blocks.forEach(b => {
      if (b.ex) { body.appendChild(CIAO.renderExercise(b.ex, ++n)); return; }
      if (b.img) {
        const f = document.createElement('figure');
        f.className = `fig size-${b.size || 'm'}${b.float ? ' float-' + b.float : ''}${b.white ? ' white' : ''}`;
        f.innerHTML = `<img src="${b.img}" alt="${b.alt || ''}" loading="lazy">${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}`;
        if (b.size === 'comic') { f.tabIndex = 0; f.title = 'Tocca per ingrandire'; f.onclick = () => f.classList.toggle('zoom'); }
        body.appendChild(f); return;
      }
      const d = document.createElement('div');
      d.className = 'prose';
      d.innerHTML = b.html;
      body.appendChild(d);
    });
    wrap.appendChild(sec);
  });

  wrap.insertAdjacentHTML('beforeend', `
    <div class="cta-band" id="test"><div><h2>Test finale dell’unità</h2>
      <p>${CIAO.quizzes[unit.n].length} esercizi in stile Duolingo per ripassare tutta l’unità. Hai 5 cuori.</p></div>
      <a class="btn" href="quiz.html?u=${unit.n}">Fai il test</a></div>
    <div class="unit-pager">
      ${unit.n > 1 ? `<a href="unit.html?u=${unit.n - 1}">‹ Unità ${unit.n - 1}</a>` : '<a href="index.html">‹ Il percorso</a>'}
      ${units[unit.n] && units[unit.n].available ? `<a href="unit.html?u=${unit.n + 1}">Unità ${unit.n + 1}: ${units[unit.n].place} ›</a>` : '<a href="index.html#percorso">Il percorso ›</a>'}
    </div>`);

  // Progressi
  function paintProgress() {
    const done = CIAO.exStore.doneIn(graded);
    document.getElementById('up-fill').style.width = (graded.length ? done / graded.length * 100 : 0) + '%';
    document.getElementById('up-text').textContent = `${done} di ${graded.length} esercizi completati`;
    document.querySelectorAll('.lesson').forEach(sec => {
      const ids = sec.dataset.ex ? sec.dataset.ex.split(',') : [];
      const c = sec.querySelector('.sec-count');
      if (!c) return;
      const d = CIAO.exStore.doneIn(ids);
      c.textContent = `${d}/${ids.length}`;
      c.classList.toggle('all', d === ids.length);
      const link = document.querySelector(`.secnav a[data-s="${sec.id.slice(1)}"]`);
      if (link) link.classList.toggle('complete', ids.length > 0 && d === ids.length);
    });
  }
  paintProgress();
  document.addEventListener('ex:progress', paintProgress);

  // Sezione attiva nella barra
  const links = [...document.querySelectorAll('.secnav a')];
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + e.target.id;
      a.classList.toggle('on', on);
      if (on) a.parentElement.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
    });
  }), { rootMargin: '-35% 0px -60% 0px' });
  document.querySelectorAll('.lesson, #test').forEach(s => obs.observe(s));

  if (location.hash) { const tEl = document.querySelector(location.hash); if (tEl) setTimeout(() => tEl.scrollIntoView(), 60); }
})();
