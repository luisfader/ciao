(() => {
  const { units, appendix, pageImg, manualPage, store, starsHtml, starsFor } = CIAO;
  CIAO.topbar('unit');
  const app = document.getElementById('app');
  const param = new URLSearchParams(location.search).get('u') || '1';
  const isApp = param === 'appendice';
  const unit = isApp ? null : units.find(u => String(u.n) === param) || units[0];

  const sections = isApp ? appendix.sections : unit.sections;
  const allPages = sections.flatMap(s => s.pages.map(p => ({ p, title: s.title })));

  const pageRange = pages => {
    const a = manualPage(pages[0]), b = manualPage(pages[pages.length - 1]);
    return a === b ? `pagina ${a}` : `pagine ${a}–${b}`;
  };

  const pagesHtml = pages => `<div class="pages ${pages.length === 1 ? 'one' : ''}">` + pages.map(p =>
    `<button class="page-thumb" data-p="${p}" aria-label="Ingrandisci la pagina ${manualPage(p)}">
       <img src="${pageImg(p)}" alt="Pagina ${manualPage(p)} del manuale" loading="lazy" width="990" height="1400">
       <span class="pn">p. ${manualPage(p)}</span></button>`).join('') + '</div>';

  let html = '';
  if (isApp) {
    document.title = 'Appendice — Ciao, amore! 2';
    html += `<section class="unit-hero"><div class="wrap">
      <img class="cover" src="assets/covers/cover.webp" alt="">
      <div><p class="kicker">Ciao, amore! 2</p><h1>Appendice</h1>
      <p class="tagline">l’autore, i suoi romanzi, i personaggi e le soluzioni degli esercizi</p></div></div></section>`;
  } else {
    document.title = `Unità ${unit.n}: ${unit.place} — Ciao, amore! 2`;
    const p = store.unit(unit.n);
    html += `<section class="unit-hero"><div class="wrap">
      <img class="cover" src="${pageImg(unit.cover)}" alt="Copertina dell’unità ${unit.n}">
      <div>
        <p class="kicker">Unità ${unit.n}</p>
        <h1>${unit.place}</h1>
        <p class="tagline">${unit.tagline}</p>
        <ul class="temi">${unit.temi.map(t => `<li>${t}</li>`).join('')}</ul>
        <div class="hero-actions">
          <a class="btn" href="quiz.html?u=${unit.n}">${p ? 'Ripeti il test' : 'Fai il test'}</a>
          <a class="btn ghost" href="#ripasso">Ripasso lampo</a>
          ${p ? `<span class="unit-best">${starsHtml(starsFor(p.best))} migliore: ${Math.round(p.best * 100)}%</span>` : ''}
        </div>
      </div></div></section>`;
  }

  html += `<nav class="secnav" aria-label="Sezioni"><div class="wrap">` +
    sections.map(s => `<a href="#s${s.id}"><b>${s.id}.</b>${s.title}</a>`).join('') +
    (isApp ? '' : `<a href="#ripasso"><b>✦</b>Ripasso</a>`) + `</div></nav>`;

  html += '<div class="wrap">';
  sections.forEach(s => {
    html += `<section class="sec" id="s${s.id}">
      <h2><span class="letter">${s.id}.</span> ${s.title}</h2>
      <p class="pg">${pageRange(s.pages)} del manuale</p>
      ${pagesHtml(s.pages)}
    </section>`;
  });

  if (!isApp) {
    html += `<section class="sec" id="ripasso">
      <h2><span class="letter">✦</span> Ripasso lampo</h2>
      <p class="pg">Il riassunto di ${unit.focus} prima del test</p>
      <div class="ripasso">${unit.grammar}</div></section>`;
    html += `<div class="cta-band"><div><h2>Pronto per il test?</h2>
      <p>${CIAO.quizzes[unit.n].length} esercizi senza audio: scelta multipla, vero o falso, abbinamenti, frasi da riordinare e da scrivere. Hai 5 cuori.</p></div>
      <a class="btn" href="quiz.html?u=${unit.n}">Fai il test</a></div>`;
    const prev = units.find(u => u.n === unit.n - 1), next = units.find(u => u.n === unit.n + 1);
    html += `<div class="unit-pager">
      ${prev ? `<a href="unit.html?u=${prev.n}">‹ Unità ${prev.n}: ${prev.place}</a>` : '<a href="index.html">‹ Il percorso</a>'}
      ${next ? `<a href="unit.html?u=${next.n}">Unità ${next.n}: ${next.place} ›</a>` : '<a href="quiz.html?u=finale">Esame finale ›</a>'}
    </div>`;
  } else {
    html += '<div style="height:48px"></div>';
  }
  html += '</div>';
  app.innerHTML = html;

  // Sezione attiva nella barra
  const links = [...document.querySelectorAll('.secnav a')];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('.sec').forEach(s => obs.observe(s));

  // Lightbox
  const lb = document.getElementById('lb'), img = document.getElementById('lb-img'), title = document.getElementById('lb-title');
  let idx = 0, lastFocus = null;
  const show = i => {
    idx = (i + allPages.length) % allPages.length;
    const { p, title: t } = allPages[idx];
    img.src = pageImg(p); img.alt = `Pagina ${manualPage(p)} del manuale`;
    title.textContent = `${t} · p. ${manualPage(p)}`;
    lb.querySelector('.stage').scrollTop = 0;
  };
  const open = p => { lastFocus = document.activeElement; show(allPages.findIndex(x => x.p === p)); lb.classList.add('open'); document.body.style.overflow = 'hidden'; document.getElementById('lb-close').focus(); };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  app.addEventListener('click', e => { const b = e.target.closest('.page-thumb'); if (b) open(+b.dataset.p); });
  document.getElementById('lb-close').onclick = close;
  document.getElementById('lb-prev').onclick = () => show(idx - 1);
  document.getElementById('lb-next').onclick = () => show(idx + 1);
  lb.addEventListener('click', e => { if (e.target.classList.contains('stage')) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 50); }
})();
