/**
 * quiz.js – Quiz-Modus mit Sofort-Feedback, Erklärung, Fundstelle und Spaced Repetition.
 */
(function () {
  'use strict';
  const { U, Store, SRS, QE } = LP;

  /** Fragenauswahl nach Filtern; Fehler und fällige Fragen werden bevorzugt. */
  function select(s, f) {
    let pool = SRS.questions(s.id).filter(
      (q) =>
        (!f.chs.length || f.chs.includes(q.ch)) &&
        (!f.diffs.length || f.diffs.includes(q.diff)) &&
        (!f.types.length || f.types.includes(q.type))
    );
    if (f.mode === 'review') {
      const due = pool.filter((q) => { const st = Store.item(q.id, s.id); return st && st.due <= Date.now(); });
      pool = due.length >= 3 ? due : pool;
    } else if (f.mode === 'new') {
      const fresh = pool.filter((q) => !Store.item(q.id, s.id));
      pool = fresh.length ? fresh : pool;
    } else if (f.mode === 'weak') {
      const stats = SRS.chapterStats(s.id);
      const weakCh = Object.values(stats).sort((a, b) => b.need - a.need).slice(0, 4).map((r) => r.ch.id);
      const wrong = pool.filter((q) => { const st = Store.item(q.id, s.id); return st && st.box <= 2 && st.bad > 0; });
      pool = wrong.length >= 5 ? wrong : pool.filter((q) => weakCh.includes(q.ch));
    }
    return U.weightedSample(pool, (q) => SRS.weight(q, s.id), Math.min(f.n, pool.length));
  }

  function setup(main, s, params) {
    const f = {
      chs: params.ch ? [params.ch] : [],
      diffs: [],
      types: [],
      n: 10,
      mode: params.mode || 'smart',
    };
    if (params.ch || params.mode) return run(main, s, f);

    const types = ['single', 'multi', 'tf', 'match', 'cloze'];
    main.innerHTML = `
      <div class="page-head"><div><div class="eyebrow">Quiz-Modus</div><h1>Quiz zusammenstellen</h1>
      <p>Fragen mit Fehlern erscheinen automatisch häufiger (Spaced Repetition).</p></div></div>
      <div class="card stack">
        <div><h3>Modus</h3><div class="chip-row" id="mode">
          ${[['smart', '🧠 Smart (gewichtet)'], ['new', '✨ Nur neue'], ['review', '🔁 Fällige'], ['weak', '🎯 Schwachstellen']]
            .map((m) => `<button class="chip" data-v="${m[0]}" aria-pressed="${m[0] === f.mode}">${m[1]}</button>`).join('')}
        </div></div>
        <div><h3>Kapitel <span class="muted small">(keins gewählt = alle)</span></h3><div class="chip-row" id="chs">
          ${s.chapters.map((c) => `<button class="chip" data-v="${c.id}" aria-pressed="false">${U.esc(c.nr)} ${U.esc(c.title)}</button>`).join('')}
        </div></div>
        <div><h3>Schwierigkeit</h3><div class="chip-row" id="diffs">
          ${[1, 2, 3, 4].map((d) => `<button class="chip" data-v="${d}" aria-pressed="false">${U.diffLabel(d)}</button>`).join('')}
        </div></div>
        <div><h3>Aufgabentyp</h3><div class="chip-row" id="types">
          ${types.map((t) => `<button class="chip" data-v="${t}" aria-pressed="false">${U.typeLabel(t)}</button>`).join('')}
        </div></div>
        <div><h3>Anzahl Fragen</h3><div class="chip-row" id="n">
          ${[5, 10, 20, 30].map((n) => `<button class="chip" data-v="${n}" aria-pressed="${n === f.n}">${n}</button>`).join('')}
        </div></div>
        <div class="row"><span class="muted small" id="poolInfo"></span><span class="spacer"></span><button class="btn primary" id="start">Quiz starten →</button></div>
      </div>`;

    const multi = (id, key, cast) =>
      U.$$(`#${id} .chip`, main).forEach((b) =>
        b.addEventListener('click', () => {
          const v = cast(b.dataset.v);
          const on = b.getAttribute('aria-pressed') !== 'true';
          b.setAttribute('aria-pressed', on);
          f[key] = on ? f[key].concat(v) : f[key].filter((x) => x !== v);
          info();
        })
      );
    const single = (id, key, cast) =>
      U.$$(`#${id} .chip`, main).forEach((b) =>
        b.addEventListener('click', () => {
          U.$$(`#${id} .chip`, main).forEach((x) => x.setAttribute('aria-pressed', x === b));
          f[key] = cast(b.dataset.v);
          info();
        })
      );
    multi('chs', 'chs', String);
    multi('diffs', 'diffs', Number);
    multi('types', 'types', String);
    single('n', 'n', Number);
    single('mode', 'mode', String);
    const info = () => {
      const n = SRS.questions(s.id).filter(
        (q) => (!f.chs.length || f.chs.includes(q.ch)) && (!f.diffs.length || f.diffs.includes(q.diff)) && (!f.types.length || f.types.includes(q.type))
      ).length;
      U.$('#poolInfo', main).textContent = `${n} passende Fragen verfügbar`;
      U.$('#start', main).disabled = n === 0;
    };
    info();
    U.$('#start', main).addEventListener('click', () => run(main, s, f));
  }

  function run(main, s, f) {
    const list = select(s, f);
    if (!list.length) {
      main.innerHTML = '<div class="empty"><div class="big">🤷</div><p>Keine passenden Fragen gefunden.</p><a class="btn primary" href="#/quiz">Zurück</a></div>';
      return;
    }
    const results = [];
    let i = 0;
    Store.sub(s.id).sessions++;

    const step = () => {
      const q = list[i];
      main.innerHTML = `
        <div class="quiz-wrap">
          <div class="quiz-top">
            <a class="btn sm ghost" href="#/quiz" aria-label="Quiz beenden">✕</a>
            <div class="progress"><span style="width:${U.pct(i, list.length)}%"></span></div>
            <span class="small muted">${i + 1}/${list.length}</span>
          </div>
          <div class="card q-card">
            <div class="q-meta">${U.diffBadge(q.diff)}<span class="badge">${U.typeLabel(q.type)}</span>
              <span class="badge">Kap. ${U.esc((s.chapters.find((c) => c.id === q.ch) || {}).nr || '')}</span></div>
            <div id="qHost"></div>
            <div id="fb"></div>
            <div class="q-actions"><button class="btn primary" id="check" disabled>Prüfen</button></div>
          </div>
          <p class="muted small" style="text-align:center;margin-top:10px">Tipp: Tastatur A–E wählt Antworten, Enter prüft.</p>
        </div>`;
      const checkBtn = U.$('#check', main);
      const ctrl = QE.render(q, U.$('#qHost', main), { onChange: () => (checkBtn.disabled = !ctrl.isAnswered()) });
      let checked = false;

      const doCheck = () => {
        if (checked) return next();
        if (!ctrl.isAnswered()) return;
        checked = true;
        const res = ctrl.evaluate();
        ctrl.reveal();
        SRS.record(q.id, res.correct ? 'good' : res.score >= 0.5 ? 'hard' : 'wrong', s.id);
        results.push({ q, res });
        U.$('#fb', main).innerHTML = QE.feedbackHTML(q, res, s);
        if (!res.correct) U.$('.q-card', main).classList.add('shake');
        checkBtn.textContent = i + 1 < list.length ? 'Weiter →' : 'Auswertung';
        checkBtn.disabled = false;
        checkBtn.focus();
      };
      const next = () => { i++; i < list.length ? step() : summary(); };
      checkBtn.addEventListener('click', doCheck);
      keyHandler = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
          if (e.key === 'Enter') { e.preventDefault(); doCheck(); }
          return;
        }
        if (e.key === 'Enter') { e.preventDefault(); doCheck(); return; }
        const k = 'abcdefgh'.indexOf(e.key.toLowerCase());
        if (k >= 0) { const opts = U.$$('.option', main); if (opts[k]) opts[k].click(); }
      };
    };

    const summary = () => {
      keyHandler = null;
      const ok = results.filter((r) => r.res.correct).length;
      const pct = U.pct(ok, results.length);
      if (pct >= 80) U.confetti();
      const wrong = results.filter((r) => !r.res.correct);
      main.innerHTML = `
        <div class="quiz-wrap stack">
          <div class="card pad-lg" style="text-align:center">
            <div class="big" style="font-size:3rem">${pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚'}</div>
            <h1>${ok} von ${results.length} richtig</h1>
            <div class="progress ${pct >= 50 ? 'success' : 'danger'}" style="margin:12px 0"><span style="width:${pct}%"></span></div>
            <p class="muted">${pct >= 80 ? 'Hervorragend – das sitzt!' : pct >= 50 ? 'Gute Basis. Die Fehler kommen bald erneut dran.' : 'Kein Problem – falsche Fragen landen in Fach 1 und werden häufiger wiederholt.'}</p>
            <div class="row" style="justify-content:center">
              <button class="btn primary" id="again">Neues Quiz</button>
              ${wrong.length ? '<button class="btn" id="retry">Nur Fehler wiederholen</button>' : ''}
              <a class="btn ghost" href="#/">Dashboard</a>
            </div>
          </div>
          ${wrong.length ? `<h2>Fehleranalyse</h2>${wrong
            .map((r) => `<details class="acc"><summary>${U.diffBadge(r.q.diff)} ${r.q.q ? r.q.q.replace(/<pre[\s\S]*?<\/pre>/g, '[Code]').replace(/<[^>]+>/g, '').slice(0, 110) : 'Lückentext'}</summary>
              <div>${QE.feedbackHTML(r.q, r.res, s)}</div></details>`)
            .join('')}` : ''}
        </div>`;
      U.$('#again', main).addEventListener('click', () => LP.go('#/quiz'));
      const rb = U.$('#retry', main);
      if (rb) rb.addEventListener('click', () => { list.length = 0; wrong.forEach((w) => list.push(w.q)); results.length = 0; i = 0; step(); });
      LP.refreshNav();
    };

    let keyHandler = null;
    const onKey = (e) => keyHandler && keyHandler(e);
    if (cleanupKeys) cleanupKeys();
    document.addEventListener('keydown', onKey);
    cleanupKeys = () => { document.removeEventListener('keydown', onKey); cleanupKeys = null; };
    step();
  }

  let cleanupKeys = null;

  LP.views.quiz = {
    render(main, { subject, params }) {
      setup(main, subject, params);
      return () => cleanupKeys && cleanupKeys();
    },
  };
})();
