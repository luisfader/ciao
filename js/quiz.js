/* Motore dei test in stile Duolingo (senza audio). */
(() => {
  const { units, quizzes, finalExtra, store, icon, shuffle, esc, starsHtml, starsFor } = CIAO;

  const param = new URLSearchParams(location.search).get('u') || '1';
  const isFinal = param === 'finale';
  const unit = isFinal ? null : units.find(u => String(u.n) === param) || units[0];
  if ((isFinal && !CIAO.finalAvailable()) || (!isFinal && !unit.available)) { location.replace(isFinal ? 'index.html#percorso' : `unit.html?u=${unit.n}`); return; }
  const HEARTS = 5;
  const PASS = 0.8;

  const $ = id => document.getElementById(id);
  const main = $('main'), foot = $('foot'), msg = $('msg'), action = $('action'), hint = $('hint');
  $('qclose').innerHTML = icon.close;
  $('qclose').href = isFinal ? 'index.html' : `unit.html?u=${unit.n}`;
  document.title = (isFinal ? 'Esame finale' : `Test unità ${unit.n}`) + ' — Ciao, amore! 2';

  // ---------- testo e confronto ----------
  const norm = s => String(s).normalize('NFC').toLowerCase()
    .replace(/[’‘`´]/g, "'").replace(/[.,!?¡¿;:«»"“”…]/g, ' ').replace(/\s+/g, ' ').trim();
  const loose = s => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/'/g, '').replace(/\s+/g, ' ').trim();

  // ---------- audio ----------
  const AUDIO_DIR = 'assets/audio/';
  const audioOk = {};           // nome file -> true/false
  let audioOff = false;          // «Non posso ascoltare ora»
  let player = null;
  async function probeAudio(list) {
    const names = [...new Set(list.filter(q => q.audio).map(q => q.audio))].filter(n => !(n in audioOk));
    await Promise.all(names.map(n => fetch(AUDIO_DIR + n + '.mp3', { method: 'HEAD', cache: 'no-store' })
      .then(r => { audioOk[n] = r.ok; }).catch(() => { audioOk[n] = false; })));
  }
  const usable = q => !q.listen || (audioOk[q.audio] && !audioOff);
  const hasAudio = q => q.audio && audioOk[q.audio] && !audioOff;
  function play(slow) {
    const q = S && S.cur && S.cur.q;
    if (!q || !hasAudio(q)) return;
    if (player) player.pause();
    player = new Audio(AUDIO_DIR + q.audio + '.mp3');
    player.playbackRate = slow ? 0.7 : 1;
    const btn = main.querySelector(slow ? '.say.slow' : '.say.normal');
    if (btn) { btn.classList.add('playing'); player.onended = player.onpause = () => btn.classList.remove('playing'); }
    player.play().catch(() => {});
  }
  const stopAudio = () => { if (player) { player.pause(); player = null; } };

  // ---------- costruzione della sessione ----------
  function buildSet() {
    if (!isFinal) {
      const all = quizzes[unit.n].filter(usable);
      const listen = shuffle(all.filter(q => q.listen)).slice(0, 6);
      const read = shuffle(all.filter(q => !q.listen)).slice(0, listen.length ? 12 : 16);
      return shuffle(read.concat(listen)).map(q => ({ ...q, unit: unit.n }));
    }
    const picked = [];
    units.forEach(u => {
      // due esercizi per unità, di tipo diverso quando possibile
      const pool = shuffle(quizzes[u.n].filter(usable));
      const first = pool[0];
      const second = pool.find(q => q !== first && q.t !== first.t) || pool[1];
      picked.push({ ...first, unit: u.n }, { ...second, unit: u.n });
    });
    finalExtra.forEach(q => picked.push({ ...q, unit: 0 }));
    return shuffle(picked);
  }

  let S;
  function reset() {
    const set = buildSet();
    S = {
      queue: set.map((q, i) => ({ q, id: i, retry: false })),
      total: set.length, finished: 0, hearts: HEARTS, firstOk: new Set(), byUnit: {},
      xp: 0, combo: 0, start: Date.now(), cur: null, answer: null, phase: 'idle', running: false
    };
    set.forEach(q => { S.byUnit[q.unit] = S.byUnit[q.unit] || { ok: 0, n: 0 }; S.byUnit[q.unit].n++; });
  }

  // ---------- barra superiore ----------
  function paintTop(hit) {
    const pct = S ? Math.round((S.finished / S.total) * 100) : 0;
    $('bar').style.width = pct + '%';
    $('bar').parentElement.setAttribute('aria-valuenow', pct);
    const h = $('hearts');
    h.innerHTML = icon.heart + `<span>${S ? S.hearts : HEARTS}</span>`;
    h.setAttribute('aria-label', `${S ? S.hearts : HEARTS} cuori rimasti`);
    if (hit) { h.classList.remove('hit'); void h.offsetWidth; h.classList.add('hit'); }
  }

  // ---------- piede ----------
  function setFoot(state, opts = {}) {
    foot.className = 'qfoot' + (state === 'ok' ? ' ok' : state === 'ko' ? ' ko' : '');
    if (state === 'ok' || state === 'ko') {
      msg.innerHTML = `<span class="icon">${state === 'ok' ? icon.check : icon.cross}</span>
        <div><h4>${opts.title}</h4>${opts.body ? `<p>${opts.body}</p>` : ''}</div>`;
      action.textContent = 'Continua';
      action.disabled = false;
      hint.textContent = '';
      action.focus({ preventScroll: true });
    } else {
      msg.innerHTML = '';
      action.textContent = opts.label || 'Controlla';
      action.disabled = !!opts.disabled;
      hint.textContent = opts.hint || '';
    }
  }

  // ---------- schermata iniziale ----------
  async function intro() {
    main.innerHTML = '<div class="screen"><p class="lead">Un momento…</p></div>';
    setFoot('idle', { label: 'Inizia', disabled: true });
    await probeAudio(isFinal ? units.flatMap(u => quizzes[u.n]) : quizzes[unit.n]);
    reset(); paintTop();
    foot.style.display = '';
    window.scrollTo(0, 0);
    const art = isFinal ? 'assets/covers/cover.webp' : `assets/covers/u${unit.n}.webp`;
    const titolo = isFinal ? 'Esame finale' : `Test · Unità ${unit.n}`;
    const lead = isFinal
      ? `${S.total} esercizi su tutto il manuale, dalle prime parole a Venezia fino al futuro semplice. Per superarlo serve almeno l’80%.`
      : `${unit.place}: ${unit.focus}. ${S.total} esercizi tratti dalle attività del manuale.`;
    main.innerHTML = `<div class="screen">
      <div class="art"><img src="${art}" alt=""></div>
      <h1>${titolo}</h1>
      <p class="lead">${lead}</p>
      <ul class="intro-list">
        <li>${icon.heart.replace('<svg', '<svg style="fill:var(--rosso)"')}<span>Hai ${HEARTS} cuori: ogni errore ne costa uno.</span></li>
        <li>${icon.dot}<span>Gli esercizi sbagliati tornano alla fine, per riprovarci.</span></li>
        ${S.queue.some(i => i.q.listen) ? `<li>${icon.speaker}<span>Alcuni esercizi sono da ascoltare: alza il volume. Se non puoi, tocca «Non posso ascoltare ora».</span></li>` : `<li>${icon.dot}<span>Leggi, scegli, abbina, riordina e scrivi.</span></li>`}
        <li>${icon.dot}<span>Con la tastiera: i numeri scelgono le risposte, Invio controlla.</span></li>
      </ul></div>`;
    setFoot('idle', { label: 'Inizia' });
    S.phase = 'intro';
  }

  // ---------- domanda ----------
  function next() {
    if (S.hearts <= 0) return outOfHearts();
    if (!S.queue.length) return finish();
    stopAudio();
    S.cur = S.queue.shift();
    S.answer = null;
    S.phase = 'answer';
    render(S.cur);
    paintTop();
    if (hasAudio(S.cur.q)) setTimeout(() => play(false), 250);
  }

  const sentence = (s, fill) => {
    if (!s) return '';
    const parts = esc(s).split('___');
    return `<div class="qsentence">${parts.join(`<span class="blank">${fill ? esc(fill) : '&nbsp;'}</span>`)}</div>`;
  };

  const playerHtml = q => hasAudio(q) ? `<div class="say-row">
      <button class="say normal" type="button" aria-label="Ascolta">${icon.speaker}</button>
      <button class="say slow" type="button" aria-label="Ascolta lentamente">${icon.turtle}</button>
      ${q.listen ? '' : '<span class="say-hint">Ascolta e leggi</span>'}</div>` : '';

  function render(item) {
    const q = item.q;
    let h = item.retry ? `<div class="qreview">${icon.cross.replace('<svg', '<svg width="16" height="16"')} Errore precedente</div>` : '';
    const P = playerHtml(q);
    const ready = () => setFoot('idle', { disabled: false });
    setFoot('idle', { disabled: true });

    if (q.t === 'choice') {
      const opts = shuffle(q.o.map((text, i) => ({ text, ok: i === q.a })));
      item.opts = opts;
      h += `<h1 class="qtitle">${esc(q.q)}</h1>${P}${sentence(q.s)}<div class="opts">` +
        opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o.text)}</button>`).join('') + '</div>';
      main.innerHTML = h;
      main.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (S.phase !== 'answer') return;
        main.querySelectorAll('.opt').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); S.answer = +b.dataset.i;
        const blank = main.querySelector('.blank'); if (blank) blank.textContent = opts[S.answer].text;
        ready();
      });
      setFoot('idle', { disabled: true, hint: 'Premi 1–' + opts.length });
    }

    else if (q.t === 'tf') {
      h += `<h1 class="qtitle">Vero o falso?</h1>${q.ctx ? `<span class="qctx">${esc(q.ctx)}</span>` : ''}${P}
        <div class="qsentence">${esc(q.s)}</div>
        <div class="opts tf"><button class="opt" data-v="1"><span class="k">V</span>Vero</button><button class="opt" data-v="0"><span class="k">F</span>Falso</button></div>`;
      main.innerHTML = h;
      main.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (S.phase !== 'answer') return;
        main.querySelectorAll('.opt').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); S.answer = b.dataset.v === '1'; ready();
      });
      setFoot('idle', { disabled: true, hint: 'Premi V o F' });
    }

    else if (q.t === 'type') {
      h += `<h1 class="qtitle">${esc(q.q)}</h1>${P}${sentence(q.s)}
        <label class="sr-only" for="typein">La tua risposta</label>
        <input id="typein" class="typein" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Scrivi qui">
        <div class="accents" aria-label="Lettere accentate">${['à', 'è', 'é', 'ì', 'ò', 'ù', '’'].map(c => `<button type="button" data-c="${c}">${c}</button>`).join('')}</div>`;
      main.innerHTML = h;
      const inp = $('typein');
      inp.oninput = () => { S.answer = inp.value; setFoot('idle', { disabled: !inp.value.trim() }); };
      main.querySelectorAll('.accents button').forEach(b => b.onclick = () => {
        const c = b.dataset.c === '’' ? "'" : b.dataset.c;
        const st = inp.selectionStart ?? inp.value.length;
        inp.value = inp.value.slice(0, st) + c + inp.value.slice(inp.selectionEnd ?? st);
        inp.focus(); inp.setSelectionRange(st + 1, st + 1); inp.oninput();
      });
      setTimeout(() => inp.focus(), 30);
    }

    else if (q.t === 'build' || q.t === 'order') {
      const isOrder = q.t === 'order';
      const pieces = isOrder ? q.a.slice() : q.a.split(' ').concat(q.extra || []);
      const tiles = shuffle(pieces.map((w, i) => ({ w, i })));
      const chosen = [];
      h += `<h1 class="qtitle">${esc(q.q)}</h1>${P}
        <div class="answer-line ${isOrder ? 'list' : ''}" id="line" aria-label="La tua risposta"></div>
        <div class="bank ${isOrder ? 'list' : ''}" id="bank">` +
        tiles.map((t, k) => `<button class="tile" data-k="${k}">${esc(t.w)}</button>`).join('') + '</div>';
      main.innerHTML = h;
      const line = $('line');
      const sync = () => {
        line.innerHTML = chosen.map((k, pos) => `<button class="tile" data-pos="${pos}">${isOrder ? (pos + 1) + '. ' : ''}${esc(tiles[k].w)}</button>`).join('');
        main.querySelectorAll('#bank .tile').forEach(b => b.classList.toggle('used', chosen.includes(+b.dataset.k)));
        S.answer = chosen.map(k => tiles[k].w);
        setFoot('idle', { disabled: isOrder ? chosen.length !== tiles.length : !chosen.length });
      };
      $('bank').onclick = e => { const b = e.target.closest('.tile'); if (!b || S.phase !== 'answer' || chosen.includes(+b.dataset.k)) return; chosen.push(+b.dataset.k); sync(); };
      line.onclick = e => { const b = e.target.closest('.tile'); if (!b || S.phase !== 'answer') return; chosen.splice(+b.dataset.pos, 1); sync(); };
      sync();
    }

    else if (q.t === 'match') {
      const L = shuffle(q.pairs.map((p, i) => ({ t: p[0], i })));
      const R = shuffle(q.pairs.map((p, i) => ({ t: p[1], i })));
      h += `<h1 class="qtitle">${esc(q.q)}</h1><div class="match">
        <div class="col">${L.map(x => `<button class="tile" data-side="L" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
        <div class="col">${R.map(x => `<button class="tile" data-side="R" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>`;
      main.innerHTML = h;
      let sel = null, matched = 0; item.mistakes = 0;
      main.querySelector('.match').onclick = e => {
        const b = e.target.closest('.tile');
        if (!b || b.classList.contains('ok') || S.phase !== 'answer') return;
        if (!sel || sel.dataset.side === b.dataset.side) {
          if (sel) sel.classList.remove('sel');
          sel = b; b.classList.add('sel'); return;
        }
        const a = sel; sel = null; a.classList.remove('sel');
        if (a.dataset.i === b.dataset.i) {
          a.classList.add('ok'); b.classList.add('ok'); a.disabled = b.disabled = true; matched++;
          if (matched === q.pairs.length) check();
        } else {
          item.mistakes++;
          [a, b].forEach(x => { x.classList.add('ko'); setTimeout(() => x.classList.remove('ko'), 450); });
        }
      };
      setFoot('idle', { disabled: true, label: 'Controlla', hint: 'Tocca una voce a sinistra e la sua coppia a destra' });
    }

    if (hasAudio(q)) {
      main.querySelector('.say.normal').onclick = () => play(false);
      main.querySelector('.say.slow').onclick = () => play(true);
      if (q.listen) {
        hint.innerHTML = '<button class="linkbtn" id="nolisten">Non posso ascoltare ora</button>';
        $('nolisten').onclick = skipListening;
      }
    }
  }

  function skipListening() {
    stopAudio();
    audioOff = true;
    const pending = [S.cur, ...S.queue].filter(i => i && i.q.listen);
    const ids = new Set(pending.map(i => i.id));
    pending.filter(i => !i.retry || true).forEach(i => {
      if (!ids.has(i.id)) return;
      ids.delete(i.id);
      if (S.byUnit[i.q.unit]) S.byUnit[i.q.unit].n--;
      S.total--;
    });
    S.total = Math.max(1, S.total);
    S.queue = S.queue.filter(i => !i.q.listen);
    S.cur = null;
    next();
  }

  // ---------- correzione ----------
  const okWords = ['Esatto!', 'Perfetto!', 'Bravissimo!', 'Ottimo!', 'Ben fatto!', 'Che bravura, amore!'];
  function check() {
    const item = S.cur, q = item.q;
    let ok = false, correct = '', note = '';

    if (q.t === 'choice') {
      ok = item.opts[S.answer].ok;
      correct = q.o[q.a];
      main.querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
      main.querySelectorAll('.opt').forEach((b, i) => { if (item.opts[i].ok) b.classList.add('ok'); else if (i === S.answer) b.classList.add('ko'); });
    } else if (q.t === 'tf') {
      ok = S.answer === q.a;
      correct = q.a ? 'Vero' : 'Falso';
      main.querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
      main.querySelectorAll('.opt').forEach(b => { const v = b.dataset.v === '1'; if (v === q.a) b.classList.add('ok'); else if (v === S.answer) b.classList.add('ko'); });
    } else if (q.t === 'type') {
      const given = S.answer || '';
      ok = q.a.some(a => norm(a) === norm(given));
      if (!ok && q.a.some(a => loose(a) === loose(given))) { ok = true; note = `Attenzione agli accenti e agli apostrofi: «${q.a[0]}».`; }
      correct = q.a[0];
      $('typein').disabled = true;
      const blank = main.querySelector('.blank'); if (blank) blank.textContent = given;
    } else if (q.t === 'build') {
      const given = norm(S.answer.join(' '));
      ok = [q.a, ...(q.alt || [])].some(a => norm(a) === given);
      correct = q.a + '.';
    } else if (q.t === 'order') {
      ok = S.answer.join('|') === q.a.join('|');
      correct = q.a.map((x, i) => `${i + 1}. ${x}`).join(' · ');
    } else if (q.t === 'match') {
      ok = item.mistakes === 0;
      note = ok ? '' : `${item.mistakes === 1 ? 'Un abbinamento sbagliato' : item.mistakes + ' abbinamenti sbagliati'} lungo la strada.`;
    }

    S.phase = 'feedback';
    const first = !item.retry;
    if (ok) {
      S.combo++;
      if (first) { S.firstOk.add(item.id); S.byUnit[q.unit].ok++; }
      S.xp += first ? 10 : 5;
      S.finished++;
      const combo = [3, 5, 8, 12].includes(S.combo) ? ` ${S.combo} di fila!` : '';
      setFoot('ok', { title: okWords[Math.floor(Math.random() * okWords.length)] + combo, body: [note, q.tip].filter(Boolean).map(esc).join(' ') });
    } else {
      S.combo = 0;
      S.hearts--;
      paintTop(true);
      if (q.t === 'match') { S.finished++; }
      else if (!item.retry) { S.queue.push({ ...item, retry: true }); }
      else { S.finished++; }
      const heard = q.listen && q.t !== 'type' && q.t !== 'build' && q.tr && !q.tr.includes('\n') ? `<br>Hai sentito: «${esc(q.tr)}»` : '';
      const body = q.t === 'match' ? esc(note) + (q.tip ? ' ' + esc(q.tip) : '')
        : `Risposta corretta: <b>${esc(correct)}</b>${heard}${q.tip ? '<br>' + esc(q.tip) : ''}`;
      setFoot('ko', { title: q.t === 'match' ? 'Quasi!' : 'Non proprio…', body });
    }
    paintTop();
  }

  // ---------- fine ----------
  const fmtTime = ms => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

  function finish() {
    stopAudio();
    S.phase = 'end';
    const acc = S.firstOk.size / S.total;
    const bonus = isFinal ? 30 : 10;
    S.xp += bonus;
    store.addXp(S.xp);
    const art = isFinal ? 'assets/covers/cover.webp' : `assets/covers/u${unit.n}.webp`;
    const stats = `<div class="stat-row">
        <div class="stat"><div class="lbl">XP</div><div class="val">+${S.xp}</div></div>
        <div class="stat green"><div class="lbl">Precisione</div><div class="val">${Math.round(acc * 100)}%</div></div>
        <div class="stat blue"><div class="lbl">Tempo</div><div class="val">${fmtTime(Date.now() - S.start)}</div></div></div>`;
    $('bar').style.width = '100%';

    if (!isFinal) {
      store.saveUnit(unit.n, acc);
      const nextU = units.find(u => u.n === unit.n + 1);
      main.innerHTML = `<div class="screen">
        <div class="art"><img src="${art}" alt=""></div>
        <h1>Unità ${unit.n} completata!</h1>
        <p class="lead">${starsHtml(starsFor(acc))}<br>${acc >= 0.95 ? 'Perfetto: non hai sbagliato quasi niente.' : acc >= 0.8 ? 'Ottimo lavoro! Ancora un piccolo sforzo per le tre stelle.' : 'Fatto! Ripassa la grammatica e riprova per migliorare.'}</p>
        ${stats}
        <div class="actions">
          ${nextU && nextU.available ? `<a class="btn" href="unit.html?u=${nextU.n}">Vai all’unità ${nextU.n}</a>` : `<a class="btn" href="unit.html?u=${unit.n}">Torna all’unità</a>`}
          <button class="btn ghost" id="again">Ripeti il test</button>
          <a class="btn ghost" href="index.html#percorso">Torna al percorso</a>
        </div></div>`;
    } else {
      const passed = acc >= PASS;
      store.saveFinal(acc, passed);
      const rows = units.map(u => {
        const b = S.byUnit[u.n]; const r = b ? b.ok / b.n : 0;
        return `<a href="unit.html?u=${u.n}"><span>Unità ${u.n} · ${u.place}</span><span class="bar"><span class="${r < 0.5 ? 'low' : ''}" style="width:${r * 100}%"></span></span><b>${b ? b.ok + '/' + b.n : '–'}</b></a>`;
      }).join('');
      const today = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
      main.innerHTML = `<div class="screen">
        <div class="art"><img src="${art}" alt=""></div>
        <h1>${passed ? 'Esame superato!' : 'Ci sei quasi'}</h1>
        <p class="lead">${passed ? 'Complimenti: hai completato Ciao, amore! 2.' : `Ti serve almeno l’${Math.round(PASS * 100)}% per superare l’esame. Ripassa le unità con il punteggio più basso e riprova.`}</p>
        ${stats}
        ${passed ? `<div class="diploma"><h2>Ciao, amore! 2</h2><p>Esame finale superato da</p>
          <label class="sr-only" for="nome">Il tuo nome</label><input id="nome" placeholder="scrivi il tuo nome">
          <p>con il ${Math.round(acc * 100)}% · ${today}</p></div>` : ''}
        <div class="breakdown">${rows}</div>
        <div class="actions">
          ${passed ? '<button class="btn" id="print">Stampa il diploma</button>' : ''}
          <button class="btn ${passed ? 'ghost' : ''}" id="again">Ripeti l’esame</button>
          <a class="btn ghost" href="index.html#percorso">Torna al percorso</a>
        </div></div>`;
      const pr = $('print'); if (pr) pr.onclick = () => window.print();
    }
    $('again').onclick = intro;
    foot.className = 'qfoot'; foot.style.display = 'none';
    window.scrollTo(0, 0);
  }

  function outOfHearts() {
    stopAudio();
    S.phase = 'end';
    if (S.xp) store.addXp(S.xp);
    const art = isFinal ? 'assets/covers/cover.webp' : `assets/covers/u${unit.n}.webp`;
    main.innerHTML = `<div class="screen">
      <div class="art"><img src="${art}" alt=""></div>
      <h1>Hai finito i cuori</h1>
      <p class="lead">Hai completato ${S.finished} esercizi su ${S.total}. ${isFinal ? 'Ripassa le unità più difficili' : 'Ripassa la grammatica dell’unità'} e riprova: ce la puoi fare.</p>
      <div class="actions">
        <button class="btn" id="again">Riprova</button>
        <a class="btn ghost" href="${isFinal ? 'index.html#percorso' : `unit.html?u=${unit.n}#ripasso`}">${isFinal ? 'Torna al percorso' : 'Ripassa l’unità'}</a>
      </div></div>`;
    $('again').onclick = intro;
    foot.style.display = 'none';
  }

  // ---------- azioni ----------
  action.onclick = () => {
    if (S.phase === 'intro') return next();
    if (S.phase === 'answer' && !action.disabled) return check();
    if (S.phase === 'feedback') return next();
  };

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.code === 'Space') { e.preventDefault(); play(e.shiftKey); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Enter') {
      if (document.activeElement && document.activeElement.tagName === 'BUTTON' && document.activeElement !== action && S.phase !== 'answer') return;
      if (!action.disabled && foot.style.display !== 'none') { e.preventDefault(); action.click(); }
      return;
    }
    if (S.phase !== 'answer' || !S.cur) return;
    const t = S.cur.q.t;
    if (t === 'choice' && /^[1-9]$/.test(e.key)) { const b = main.querySelectorAll('.opt')[+e.key - 1]; if (b) b.click(); }
    if (t === 'tf') {
      const k = e.key.toLowerCase();
      if (k === 'v' || k === '1') main.querySelector('.opt[data-v="1"]').click();
      if (k === 'f' || k === '2') main.querySelector('.opt[data-v="0"]').click();
    }
  });

  $('qclose').addEventListener('click', e => {
    if (S && (S.phase === 'answer' || S.phase === 'feedback') && !confirm('Vuoi uscire? Perderai i progressi di questo test.')) e.preventDefault();
  });

  CIAO._state = () => S; // usato dai test automatici
  intro();
})();
