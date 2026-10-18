/* Esercizi interattivi dentro la pagina dell'unità.
   Tipi: bank (trascina parole negli spazi), match (abbina trascinando), gaps (scrivi),
         select (scegli nella frase), tf (vero/falso), mc (scelta multipla),
         sort (classifica in colonne), open (scrittura libera con esempio). */
window.CIAO = window.CIAO || {};

(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = s => String(s).normalize('NFC').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:«»"“”…]/g, ' ').replace(/\s+/g, ' ').trim();
  const loose = s => norm(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/'/g, '').replace(/\s+/g, '');
  const TOKEN = /(\[\[.*?\]\]|\{\{.*?\}\})/g;

  // ---------- progressi ----------
  const KEY = 'ciaoAmore2.exercises';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} };
  CIAO.exStore = {
    get: id => saved[id],
    set(id, v) { saved[id] = Object.assign({}, saved[id], v); persist(); },
    doneIn: ids => ids.filter(id => saved[id] && saved[id].done).length
  };
  CIAO.isGraded = ex => !(ex.type === 'open' || (ex.type === 'sort' && ex.graded === false));

  // ---------- trascinamento (mouse e touch) ----------
  function makeDraggable(el, root, onDrop) {
    let start = null, ghost = null;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || el.disabled) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    });
    el.addEventListener('pointermove', e => {
      if (!start || e.pointerId !== start.id) return;
      if (!ghost && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) {
        ghost = el.cloneNode(true);
        ghost.classList.add('drag-ghost');
        const r = el.getBoundingClientRect();
        ghost.style.width = r.width + 'px';
        document.body.appendChild(ghost);
        el.classList.add('lifting');
        root.classList.add('dragging');
      }
      if (ghost) {
        ghost.style.left = (e.clientX - ghost.offsetWidth / 2) + 'px';
        ghost.style.top = (e.clientY - ghost.offsetHeight / 2) + 'px';
        root.querySelectorAll('.drop-hover').forEach(x => x.classList.remove('drop-hover'));
        const t = targetAt(e.clientX, e.clientY, root); if (t) t.classList.add('drop-hover');
      }
    });
    const end = e => {
      if (!start) return;
      if (ghost) {
        const t = targetAt(e.clientX, e.clientY, root);
        ghost.remove(); ghost = null;
        el.classList.remove('lifting'); root.classList.remove('dragging');
        root.querySelectorAll('.drop-hover').forEach(x => x.classList.remove('drop-hover'));
        el.dataset.justDragged = '1';
        setTimeout(() => delete el.dataset.justDragged, 50);
        if (t) onDrop(t);
      }
      start = null;
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }
  function targetAt(x, y, root) {
    const t = document.elementFromPoint(x, y);
    if (!t) return null;
    const d = t.closest('.gap, .sort-zone');
    return d && root.contains(d) && !d.classList.contains('locked') ? d : null;
  }

  // ---------- struttura comune ----------
  function shell(ex, n) {
    const art = document.createElement('article');
    art.className = 'ex ex-' + ex.type;
    art.id = 'ex-' + ex.id;
    const graded = CIAO.isGraded(ex);
    art.innerHTML = `
      <header class="ex-head"><span class="ex-n">${n}</span><h4>${esc(ex.title)}</h4>
        ${graded ? '<span class="ex-score" aria-live="polite"></span>' : '<span class="ex-free">attività libera</span>'}</header>
      ${ex.hint ? `<p class="ex-hint">${esc(ex.hint)}</p>` : ''}
      <div class="ex-body"></div>
      <p class="ex-feedback" aria-live="polite"></p>
      <footer class="ex-foot"></footer>`;
    return art;
  }
  function setScore(art, ex, ok, total, opts = {}) {
    const sc = art.querySelector('.ex-score');
    const fb = art.querySelector('.ex-feedback');
    const all = ok === total;
    if (sc) { sc.textContent = `${ok}/${total}`; sc.className = 'ex-score ' + (all ? 'all' : 'some'); }
    art.classList.toggle('done', all && !opts.shown);
    if (opts.shown) fb.innerHTML = 'Ecco la soluzione. Rileggila e poi prova a rifare l’esercizio.';
    else if (all) fb.innerHTML = `<b>Perfetto!</b> ${ex.tip ? esc(ex.tip) : 'Tutto giusto.'}`;
    else fb.innerHTML = `${total - ok === 1 ? 'C’è un errore' : `Ci sono ${total - ok} errori`}: correggi le risposte in rosso e controlla di nuovo.${ex.tip ? ' <span class="tip">' + esc(ex.tip) + '</span>' : ''}`;
    fb.className = 'ex-feedback ' + (opts.shown ? 'shown' : all ? 'good' : 'bad');
    if (!opts.shown) {
      const prev = CIAO.exStore.get(ex.id) || {};
      CIAO.exStore.set(ex.id, { best: Math.max(prev.best || 0, ok / total), done: !!prev.done || all });
    }
    document.dispatchEvent(new CustomEvent('ex:progress', { detail: { id: ex.id } }));
  }
  function foot(art, buttons) {
    const f = art.querySelector('.ex-foot');
    f.innerHTML = buttons.map(b => `<button class="${b.primary ? 'btn sm' : 'linkbtn'}" data-act="${b.act}">${b.label}</button>`).join('');
    buttons.forEach(b => f.querySelector(`[data-act="${b.act}"]`).onclick = b.fn);
  }
  const clearFeedback = art => { const fb = art.querySelector('.ex-feedback'); fb.textContent = ''; fb.className = 'ex-feedback'; };

  // ---------- frasi con spazi ----------
  const parseGap = tok => tok.slice(2, -2).split('|').map(s => s.trim());
  const parseSel = tok => tok.slice(2, -2).split('|').map(s => ({ t: s.replace(/\*$/, '').trim(), ok: /\*$/.test(s.trim()) }));

  // ===== BANK e MATCH =====
  function bank(ex, art) {
    const body = art.querySelector('.ex-body');
    const isMatch = ex.type === 'match';
    const lines = isMatch ? ex.pairs.map(p => `<span class="mleft">${esc(p[0])}</span> [[${p[1]}]]`) : ex.lines;
    const gaps = [];
    let html = `<div class="lines ${isMatch ? 'match-lines' + (ex.compact ? ' compact' : '') : ''} ${ex.layout || ''}">`;
    lines.forEach(line => {
      html += '<p class="ln">' + line.split(TOKEN).map(part => {
        if (part.startsWith('[[')) { const k = gaps.length; gaps.push(parseGap(part)); return `<button class="gap" data-k="${k}" aria-label="Spazio vuoto ${k + 1}"><span>&nbsp;</span></button>`; }
        return isMatch ? part : esc(part);
      }).join('') + '</p>';
    });
    html += '</div>';
    const words = ex.chips ? ex.chips.slice() : shuffle(gaps.map(g => g[0]).concat(ex.extra || []));
    const reuse = !!ex.reuse;
    html += `<div class="bank-wrap"><span class="bank-label">${esc(ex.bankLabel || (reuse ? 'Parole (si possono riusare)' : 'Parole'))}</span><div class="bank">` +
      words.map((w, i) => `<button class="chip" data-c="${i}">${esc(w)}</button>`).join('') + '</div></div>';
    body.innerHTML = html;

    const val = gaps.map(() => null); // indice della tessera
    let armed = null, picked = null;
    const gapEls = [...body.querySelectorAll('.gap')], chipEls = [...body.querySelectorAll('.chip')];

    const paint = () => {
      gapEls.forEach((g, k) => {
        g.querySelector('span').innerHTML = val[k] == null ? '&nbsp;' : esc(words[val[k]]);
        g.classList.toggle('filled', val[k] != null);
        g.classList.toggle('armed', armed === k);
      });
      if (!reuse) chipEls.forEach((c, i) => c.classList.toggle('used', val.includes(i)));
      chipEls.forEach((c, i) => c.classList.toggle('picked', picked === i));
    };
    const place = (k, c) => {
      if (gapEls[k].classList.contains('locked')) return;
      if (!reuse) { const prev = val.indexOf(c); if (prev > -1) val[prev] = null; }
      val[k] = c; gapEls[k].classList.remove('ok', 'ko');
      armed = null; picked = null; clearFeedback(art); paint();
    };
    chipEls.forEach((el, i) => {
      el.onclick = () => {
        if (el.dataset.justDragged || el.classList.contains('used')) return;
        if (armed != null) return place(armed, i);
        const empty = val.findIndex((v, k) => v == null && !gapEls[k].classList.contains('locked'));
        if (empty > -1 && !isMatch) return place(empty, i);
        picked = picked === i ? null : i; paint();
        if (isMatch && empty > -1 && picked === i) { /* scegli lo spazio */ }
      };
      makeDraggable(el, art, t => place(+t.dataset.k, i));
    });
    gapEls.forEach((g, k) => {
      g.onclick = () => {
        if (g.dataset.justDragged || g.classList.contains('locked')) return;
        if (picked != null) return place(k, picked);
        if (val[k] != null) { val[k] = null; g.classList.remove('ok', 'ko'); clearFeedback(art); paint(); return; }
        armed = armed === k ? null : k; paint();
      };
      makeDraggable(g, art, t => {
        if (val[k] == null || t === g) return;
        const c = val[k]; const k2 = +t.dataset.k;
        val[k] = val[k2]; val[k2] = c; gapEls.forEach(x => x.classList.remove('ok', 'ko')); clearFeedback(art); paint();
      });
    });

    const check = () => {
      let ok = 0;
      gapEls.forEach((g, k) => {
        const good = val[k] != null && gaps[k].some(a => norm(a) === norm(words[val[k]]));
        g.classList.toggle('ok', good); g.classList.toggle('ko', !good);
        if (good) { ok++; g.classList.add('locked'); }
      });
      setScore(art, ex, ok, gaps.length);
    };
    const show = () => {
      gapEls.forEach((g, k) => {
        g.querySelector('span').textContent = gaps[k][0];
        g.classList.remove('ko'); g.classList.add('ok', 'locked', 'filled');
      });
      chipEls.forEach(c => c.classList.add('used'));
      setScore(art, ex, gaps.length, gaps.length, { shown: true });
    };
    const reset = () => { val.fill(null); armed = picked = null; gapEls.forEach(g => g.classList.remove('ok', 'ko', 'locked')); chipEls.forEach(c => c.classList.remove('used')); clearFeedback(art); paint(); };
    foot(art, [{ act: 'check', label: 'Controlla', primary: true, fn: check }, { act: 'reset', label: 'Ricomincia', fn: reset }, { act: 'show', label: 'Mostra la soluzione', fn: show }]);
    paint();
  }

  // ===== GAPS (scrivi) =====
  function gapsEx(ex, art) {
    const body = art.querySelector('.ex-body');
    const gaps = [];
    body.innerHTML = '<div class="lines">' + ex.lines.map(line => '<p class="ln">' + line.split(TOKEN).map(part => {
      if (part.startsWith('[[')) {
        const k = gaps.length; const g = parseGap(part); gaps.push(g);
        const w = Math.max(3, Math.max(...g.map(x => x.length)) + 1);
        return `<input class="gapin" data-k="${k}" style="width:${w + 1.5}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Spazio ${k + 1}">`;
      }
      return esc(part);
    }).join('') + '</p>').join('') + '</div>' +
      `<div class="accents" aria-label="Lettere accentate">${['à', 'è', 'é', 'ì', 'ò', 'ù', '’'].map(c => `<button type="button" tabindex="-1" data-c="${c}">${c}</button>`).join('')}</div>`;
    const ins = [...body.querySelectorAll('.gapin')];
    let last = ins[0];
    ins.forEach((inp, i) => {
      inp.addEventListener('focus', () => last = inp);
      inp.addEventListener('input', () => { inp.classList.remove('ok', 'ko', 'warn'); clearFeedback(art); });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); const nx = ins.slice(i + 1).find(x => !x.value.trim()); if (nx) nx.focus(); else check(); }
      });
    });
    body.querySelectorAll('.accents button').forEach(b => {
      b.addEventListener('mousedown', e => e.preventDefault());
      b.onclick = () => {
        const inp = last; if (!inp || inp.readOnly) return;
        const c = b.dataset.c === '’' ? '’' : b.dataset.c;
        const s = inp.selectionStart ?? inp.value.length;
        inp.value = inp.value.slice(0, s) + c + inp.value.slice(inp.selectionEnd ?? s);
        inp.focus(); inp.setSelectionRange(s + 1, s + 1); inp.dispatchEvent(new Event('input'));
      };
    });
    const check = () => {
      let ok = 0, warn = false;
      ins.forEach((inp, k) => {
        const v = inp.value;
        let good = gaps[k].some(a => norm(a) === norm(v));
        const near = !good && v.trim() && gaps[k].some(a => loose(a) === loose(v));
        if (near) { good = true; warn = true; inp.classList.add('warn'); inp.title = 'Attenzione all’accento o all’apostrofo: ' + gaps[k][0]; }
        inp.classList.toggle('ok', good); inp.classList.toggle('ko', !good);
        if (good) { ok++; inp.readOnly = true; }
      });
      setScore(art, ex, ok, gaps.length);
      if (warn) art.querySelector('.ex-feedback').insertAdjacentHTML('beforeend', ' <span class="tip">Attenzione agli accenti e agli apostrofi nelle parole sottolineate.</span>');
    };
    const show = () => { ins.forEach((inp, k) => { inp.value = gaps[k][0]; inp.readOnly = true; inp.classList.remove('ko', 'warn'); inp.classList.add('ok'); }); setScore(art, ex, gaps.length, gaps.length, { shown: true }); };
    const reset = () => { ins.forEach(inp => { inp.value = ''; inp.readOnly = false; inp.classList.remove('ok', 'ko', 'warn'); }); clearFeedback(art); };
    foot(art, [{ act: 'check', label: 'Controlla', primary: true, fn: check }, { act: 'reset', label: 'Ricomincia', fn: reset }, { act: 'show', label: 'Mostra la soluzione', fn: show }]);
  }

  // ===== SELECT (scegli nella frase) =====
  function selectEx(ex, art) {
    const body = art.querySelector('.ex-body');
    const sels = [];
    body.innerHTML = '<div class="lines">' + ex.lines.map(line => '<p class="ln">' + line.split(TOKEN).map(part => {
      if (part.startsWith('{{')) {
        const k = sels.length; const opts = shuffle(parseSel(part)); sels.push(opts);
        return `<span class="pick" role="radiogroup" data-k="${k}">` + opts.map((o, i) => `<button role="radio" aria-checked="false" data-i="${i}">${esc(o.t)}</button>`).join('') + '</span>';
      }
      return esc(part);
    }).join('') + '</p>').join('') + '</div>';
    const choice = sels.map(() => null);
    body.querySelectorAll('.pick').forEach(p => {
      const k = +p.dataset.k;
      p.querySelectorAll('button').forEach(b => b.onclick = () => {
        if (p.classList.contains('locked')) return;
        choice[k] = +b.dataset.i;
        p.querySelectorAll('button').forEach(x => { x.setAttribute('aria-checked', x === b); x.classList.toggle('on', x === b); });
        p.classList.remove('ok', 'ko'); p.classList.add('chosen'); clearFeedback(art);
      });
    });
    const picks = [...body.querySelectorAll('.pick')];
    const check = () => {
      let ok = 0;
      picks.forEach((p, k) => {
        const good = choice[k] != null && sels[k][choice[k]].ok;
        p.classList.toggle('ok', good); p.classList.toggle('ko', !good);
        if (good) { ok++; p.classList.add('locked'); }
      });
      setScore(art, ex, ok, sels.length);
    };
    const show = () => {
      picks.forEach((p, k) => {
        const i = sels[k].findIndex(o => o.ok); choice[k] = i;
        p.querySelectorAll('button').forEach(x => { const on = +x.dataset.i === i; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); });
        p.classList.remove('ko'); p.classList.add('ok', 'locked', 'chosen');
      });
      setScore(art, ex, sels.length, sels.length, { shown: true });
    };
    const reset = () => { choice.fill(null); picks.forEach(p => { p.classList.remove('ok', 'ko', 'locked', 'chosen'); p.querySelectorAll('button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-checked', 'false'); }); }); clearFeedback(art); };
    foot(art, [{ act: 'check', label: 'Controlla', primary: true, fn: check }, { act: 'reset', label: 'Ricomincia', fn: reset }, { act: 'show', label: 'Mostra la soluzione', fn: show }]);
  }

  // ===== TF e MC =====
  function choiceEx(ex, art) {
    const body = art.querySelector('.ex-body');
    const isTf = ex.type === 'tf';
    const items = isTf
      ? ex.items.map(([q, a]) => ({ q, opts: [{ t: 'Vero', ok: a }, { t: 'Falso', ok: !a }] }))
      : ex.items.map(it => {
        const acc = Array.isArray(it.a) ? it.a : [it.a == null ? 0 : it.a];
        const opts = it.o.map((t, i) => ({ t, ok: acc.includes(i) }));
        return { q: it.q, why: it.why, opts: ex.shuffle === false ? opts : shuffle(opts) };
      });
    body.innerHTML = `<ol class="qlist ${isTf ? 'tf' : ''} ${ex.row ? 'row' : ''}">` + items.map((it, k) => `
      <li class="qitem" data-k="${k}"><p class="qq">${esc(it.q)}</p>
        <div class="qopts" role="radiogroup">${it.opts.map((o, i) => `<button role="radio" aria-checked="false" data-i="${i}">${esc(o.t)}</button>`).join('')}</div>
        <p class="why" hidden></p></li>`).join('') + '</ol>';
    const choice = items.map(() => null);
    const lis = [...body.querySelectorAll('.qitem')];
    lis.forEach((li, k) => li.querySelectorAll('button').forEach(b => b.onclick = () => {
      if (li.classList.contains('locked')) return;
      choice[k] = +b.dataset.i;
      li.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
      li.classList.remove('ok', 'ko'); clearFeedback(art);
    }));
    const reveal = (li, it) => { const w = li.querySelector('.why'); if (it.why) { w.textContent = it.why; w.hidden = false; } };
    const check = () => {
      let ok = 0;
      lis.forEach((li, k) => {
        const good = choice[k] != null && items[k].opts[choice[k]].ok;
        li.classList.toggle('ok', good); li.classList.toggle('ko', !good);
        if (good) { ok++; li.classList.add('locked'); reveal(li, items[k]); }
      });
      setScore(art, ex, ok, items.length);
    };
    const show = () => {
      lis.forEach((li, k) => {
        const i = items[k].opts.findIndex(o => o.ok); choice[k] = i;
        li.querySelectorAll('button').forEach(x => { const on = +x.dataset.i === i; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); });
        li.classList.remove('ko'); li.classList.add('ok', 'locked'); reveal(li, items[k]);
      });
      setScore(art, ex, items.length, items.length, { shown: true });
    };
    const reset = () => { choice.fill(null); lis.forEach(li => { li.classList.remove('ok', 'ko', 'locked'); li.querySelector('.why').hidden = true; li.querySelectorAll('button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-checked', 'false'); }); }); clearFeedback(art); };
    foot(art, [{ act: 'check', label: 'Controlla', primary: true, fn: check }, { act: 'reset', label: 'Ricomincia', fn: reset }, { act: 'show', label: 'Mostra la soluzione', fn: show }]);
  }

  // ===== SORT (classifica) =====
  function sortEx(ex, art) {
    const body = art.querySelector('.ex-body');
    body.innerHTML = `<div class="sort-cols">${ex.cols.map((c, i) => `<div class="sort-zone" data-z="${i}" tabindex="0"><h5>${esc(c)}</h5><div class="sort-items"></div></div>`).join('')}</div>
      <div class="bank-wrap"><div class="bank sort-pool">${shuffle(ex.chips).map(w => `<button class="chip">${esc(w)}</button>`).join('')}</div></div>`;
    const pool = body.querySelector('.sort-pool');
    let picked = null;
    const moveTo = (chip, zone) => { (zone ? zone.querySelector('.sort-items') : pool).appendChild(chip); chip.classList.remove('picked'); picked = null; };
    body.querySelectorAll('.chip').forEach(chip => {
      chip.onclick = () => {
        if (chip.dataset.justDragged) return;
        if (picked && picked !== chip && chip.parentElement !== pool) return moveTo(picked, chip.closest('.sort-zone'));
        if (chip.parentElement !== pool) return moveTo(chip, null);
        body.querySelectorAll('.chip.picked').forEach(x => x.classList.remove('picked'));
        picked = picked === chip ? null : chip; if (picked) chip.classList.add('picked');
      };
      makeDraggable(chip, art, zone => moveTo(chip, zone));
    });
    body.querySelectorAll('.sort-zone').forEach(z => {
      const go = () => { if (picked) moveTo(picked, z); };
      z.addEventListener('click', e => { if (!e.target.closest('.chip')) go(); });
      z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    foot(art, [{ act: 'done', label: 'Ho finito', primary: true, fn: () => {
      const fb = art.querySelector('.ex-feedback');
      const left = pool.children.length;
      fb.className = 'ex-feedback ' + (left ? 'bad' : 'good');
      fb.innerHTML = left ? `Mancano ancora ${left} ${left === 1 ? 'parola' : 'parole'} da sistemare.` : '<b>Fatto!</b> Confronta le tue scelte con un compagno: siete d’accordo?';
      if (!left) { CIAO.exStore.set(ex.id, { done: true }); art.classList.add('done'); }
    } }]);
  }

  // ===== OPEN (scrittura libera) =====
  function openEx(ex, art) {
    const body = art.querySelector('.ex-body');
    const prev = (CIAO.exStore.get(ex.id) || {}).text || [];
    body.innerHTML = ex.prompts.map((p, i) => `<label class="openq"><span>${esc(p)}</span><textarea rows="${ex.prompts.length === 1 ? 5 : 2}" data-i="${i}">${esc(prev[i] || '')}</textarea></label>`).join('') +
      `<div class="model" hidden><h5>Un esempio</h5><p>${esc(ex.model).replace(/\n/g, '<br>')}</p></div>`;
    const tas = [...body.querySelectorAll('textarea')];
    let t = null;
    tas.forEach(ta => ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => CIAO.exStore.set(ex.id, { text: tas.map(x => x.value) }), 300); }));
    foot(art, [{ act: 'model', label: 'Vedi un esempio', primary: true, fn: () => { const m = body.querySelector('.model'); m.hidden = !m.hidden; } }]);
  }

  CIAO.renderExercise = (ex, n) => {
    const art = shell(ex, n);
    ({ bank, match: bank, gaps: gapsEx, select: selectEx, tf: choiceEx, mc: choiceEx, sort: sortEx, open: openEx })[ex.type](ex, art);
    if (CIAO.exStore.get(ex.id) && CIAO.exStore.get(ex.id).done) art.classList.add('was-done');
    return art;
  };
})();
