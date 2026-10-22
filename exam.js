/**
 * exam.js – Prüfungsmodus: zufällige Aufgaben, Zeitmessung, Punktebewertung, Ergebnisanalyse.
 * Während der Prüfung gibt es bewusst kein Feedback – erst in der Auswertung.
 */
(function () {
  'use strict';
  const { U, Store, SRS, QE } = LP;
  let timerId = null;

  const PRESETS = [
    { id: 'short', name: 'Kurztest', n: 10, min: 15, desc: '10 Aufgaben · 15 Minuten' },
    { id: 'std', name: 'Standard', n: 25, min: 45, desc: '25 Aufgaben · 45 Minuten' },
    { id: 'full', name: 'Probeklausur', n: 40, min: 90, desc: '40 Aufgaben · 90 Minuten (wie die echte Klausur)' },
  ];

  function pick(s, n) {
    const qs = SRS.questions(s.id);
    const rel = Object.fromEntries(s.chapters.map((c) => [c.id, c.relevance || 1]));
    // Klausurnahe und schwere Aufgaben sowie relevante Kapitel stärker gewichten
    return U.weightedSample(qs, (q) => rel[q.ch] * (q.diff >= 3 ? 1.6 : 1) * (q.diff === 4 ? 1.4 : 1), Math.min(n, qs.length));
  }

  function setup(main, s) {
    const history = Store.sub(s.id).exams.slice(-5).reverse();
    main.innerHTML = `
      <div class="page-head"><div><div class="eyebrow">Prüfungsmodus</div><h1>Probeklausur schreiben</h1>
      <p>Zufällige Aufgaben, gewichtet nach Klausurrelevanz. Feedback gibt es erst am Ende.</p></div></div>
      <div class="grid cols-3">${PRESETS.map((p) => `<button class="btn-big" data-p="${p.id}"><span class="ico">${p.id === 'full' ? '🎓' : p.id === 'std' ? '📝' : '⚡'}</span><strong>${p.name}</strong><span>${p.desc}</span></button>`).join('')}</div>
      <div class="card" style="margin-top:14px"><h3>Hinweise</h3><div class="content small">${s.examInfo}</div></div>
      ${history.length ? `<div class="card"><h3>Letzte Ergebnisse</h3><div class="table-wrap"><table><thead><tr><th>Datum</th><th>Modus</th><th>Punkte</th><th>%</th><th>Dauer</th></tr></thead><tbody>
        ${history.map((h) => `<tr><td>${new Date(h.date).toLocaleString('de-DE')}</td><td>${U.esc(h.mode)}</td><td>${h.score}/${h.max}</td><td><strong>${h.pct}%</strong></td><td>${U.fmtTime(h.dur)}</td></tr>`).join('')}
        </tbody></table></div></div>` : ''}`;
    U.$$('[data-p]', main).forEach((b) => b.addEventListener('click', () => run(main, s, PRESETS.find((p) => p.id === b.dataset.p))));
  }

  function run(main, s, preset) {
    const list = pick(s, preset.n);
    const answers = list.map(() => undefined);
    const start = Date.now();
    const limit = preset.min * 60;
    let cur = 0;
    let ctrl = null;

    main.innerHTML = `
      <div class="quiz-wrap">
        <div class="row between" style="margin-bottom:12px">
          <strong>${preset.name}</strong>
          <span class="timer" id="timer">${U.fmtTime(limit)}</span>
        </div>
        <div class="card" style="margin-bottom:14px"><div class="qnav" id="qnav"></div></div>
        <div class="card q-card">
          <div class="q-meta" id="meta"></div>
          <div id="qHost"></div>
          <div class="q-actions">
            <button class="btn" id="prev">‹ Zurück</button>
            <span class="spacer"></span>
            <button class="btn" id="next">Weiter ›</button>
            <button class="btn primary" id="submit">Abgeben</button>
          </div>
        </div>
      </div>`;

    const nav = U.$('#qnav', main);
    const paintNav = () => {
      nav.innerHTML = list.map((_, k) => {
        const a = answers[k];
        const answered = a !== undefined && a !== null && !(Array.isArray(a) && !a.some((x) => x !== '' && x != null));
        return `<button class="${answered ? 'answered' : ''} ${k === cur ? 'current' : ''}" data-k="${k}" aria-label="Aufgabe ${k + 1}">${k + 1}</button>`;
      }).join('');
      U.$$('button', nav).forEach((b) => b.addEventListener('click', () => go(+b.dataset.k)));
    };
    const show = () => {
      const q = list[cur];
      U.$('#meta', main).innerHTML = `<span class="badge primary">Aufgabe ${cur + 1}/${list.length}</span><span class="badge">${QE.points(q)} Punkte</span><span class="badge">${U.typeLabel(q.type)}</span>`;
      ctrl = QE.render(q, U.$('#qHost', main), { saved: answers[cur], onChange: (a) => { answers[cur] = a; paintNav(); } });
      U.$('#prev', main).disabled = cur === 0;
      U.$('#next', main).disabled = cur === list.length - 1;
      paintNav();
    };
    const go = (k) => { cur = U.clamp(k, 0, list.length - 1); show(); };
    U.$('#prev', main).addEventListener('click', () => go(cur - 1));
    U.$('#next', main).addEventListener('click', () => go(cur + 1));
    U.$('#submit', main).addEventListener('click', () => {
      const open = answers.filter((a) => a === undefined).length;
      if (open && !confirm(`${open} Aufgabe(n) noch unbeantwortet. Trotzdem abgeben?`)) return;
      finish();
    });

    const tick = () => {
      const left = limit - (Date.now() - start) / 1000;
      const t = U.$('#timer', main);
      if (!t) return;
      t.textContent = U.fmtTime(left);
      t.classList.toggle('low', left < 120);
      if (left <= 0) { U.toast('Zeit abgelaufen – Prüfung wird abgegeben.'); finish(); }
    };
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);

    function finish() {
      clearInterval(timerId);
      const dur = (Date.now() - start) / 1000;
      let score = 0, max = 0;
      const byCh = {};
      const graded = list.map((q, k) => {
        // Unsichtbar neu rendern, um mit gespeicherter Antwort auszuwerten
        const tmp = document.createElement('div');
        const c = QE.render(q, tmp, { saved: answers[k] });
        const answered = answers[k] !== undefined;
        const res = answered ? c.evaluate() : { correct: false, score: 0 };
        const pts = QE.points(q);
        const got = Math.round(res.score * pts * 2) / 2;
        score += got; max += pts;
        const b = (byCh[q.ch] = byCh[q.ch] || { got: 0, max: 0 });
        b.got += got; b.max += pts;
        SRS.record(q.id, res.correct ? 'good' : res.score >= 0.5 ? 'hard' : 'wrong', s.id);
        return { q, res, got, pts, k, ans: answers[k] };
      });
      const pct = U.pct(score, max);
      Store.addExam({ date: Date.now(), mode: preset.name, score, max, pct, dur: Math.round(dur), byCh }, s.id);
      if (pct >= 50) U.confetti(pct >= 80 ? 60 : 25);
      result(main, s, graded, { score, max, pct, dur, byCh });
      LP.refreshNav();
    }
    show();
  }

  function result(main, s, graded, r) {
    const chRows = Object.entries(r.byCh)
      .map(([id, v]) => ({ c: s.chapters.find((c) => c.id === id), p: U.pct(v.got, v.max), v }))
      .sort((a, b) => a.p - b.p);
    main.innerHTML = `
      <div class="quiz-wrap stack">
        <div class="card pad-lg" style="text-align:center">
          <div class="eyebrow">Ergebnis</div>
          <div class="grade">${r.pct}%</div>
          <p><strong>${U.fmtNum(r.score, 1)} von ${r.max} Punkten</strong> · Bearbeitungszeit ${U.fmtTime(r.dur)}</p>
          <div class="progress ${r.pct >= 50 ? 'success' : 'danger'}"><span style="width:${r.pct}%"></span></div>
          <p class="muted small" style="margin-top:10px">Orientierung: Die Bestehensgrenze ist in den Unterlagen nicht angegeben. Als grobe Selbsteinschätzung wird hier 50 % verwendet.</p>
          <div class="row" style="justify-content:center"><a class="btn primary" href="#/exam">Neue Prüfung</a><a class="btn" href="#/quiz?mode=weak">Schwachstellen üben</a></div>
        </div>
        <div class="card"><h2>Analyse nach Themen</h2><div class="bar-list">
          ${chRows.map((x) => `<div class="bar-item"><span><strong>${U.esc(x.c ? x.c.nr : '')}</strong> ${U.esc(x.c ? x.c.title : '')}</span><span class="small">${U.fmtNum(x.v.got, 1)}/${x.v.max} P. · ${x.p}%</span>
            <div class="progress thin ${x.p >= 50 ? 'success' : 'danger'}"><span style="width:${x.p}%"></span></div></div>`).join('')}
        </div></div>
        <h2>Alle Aufgaben mit Lösung</h2>
        ${graded.map((g) => `<details class="acc"><summary><span class="badge ${g.res.correct ? 'success' : g.got > 0 ? 'warning' : 'danger'}">${U.fmtNum(g.got, 1)}/${g.pts}</span>
          Aufgabe ${g.k + 1}: ${(g.q.q || 'Lückentext').replace(/<pre[\s\S]*?<\/pre>/g, '[Code]').replace(/<[^>]+>/g, '').slice(0, 90)}</summary>
          <div><div class="review" data-k="${g.k}"></div>${QE.feedbackHTML(g.q, g.res, s)}</div></details>`).join('')}
      </div>`;
    U.$$('details.acc', main).forEach((d, idx) =>
      d.addEventListener('toggle', () => {
        const host = U.$('.review', d);
        if (d.open && !host.dataset.done) {
          host.dataset.done = 1;
          const g = graded[idx];
          const c = QE.render(g.q, host, { saved: g.ans });
          c.reveal();
        }
      }, { once: false })
    );
  }

  LP.views.exam = {
    render(main, { subject }) {
      setup(main, subject);
      return () => clearInterval(timerId);
    },
  };
})();
