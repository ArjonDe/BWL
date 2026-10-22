/**
 * learn.js – Lernmodus: Themenübersicht, Kapitelstruktur, Zusammenfassungen, Stichpunkte.
 */
(function () {
  'use strict';
  const { U, Store, SRS } = LP;

  function overview(main, s) {
    const stats = SRS.chapterStats(s.id);
    const done = s.chapters.filter((c) => Store.chapterDone(c.id, s.id)).length;
    main.innerHTML = `
      <div class="page-head">
        <div><div class="eyebrow">Lernmodus</div><h1>Kapitel & Themen</h1>
        <p>${done} von ${s.chapters.length} Kapiteln abgeschlossen · Sterne = Klausurrelevanz laut Analyse der Unterlagen</p></div>
      </div>
      <div class="progress" style="margin-bottom:18px"><span style="width:${U.pct(done, s.chapters.length)}%"></span></div>
      ${s.parts
        .map(
          (p) => `<h2 style="margin-top:18px">${U.esc(p.title)}</h2>
          <div class="chapter-list">
          ${s.chapters
            .filter((c) => c.part === p.id)
            .map((c) => {
              const st = stats[c.id];
              const isDone = Store.chapterDone(c.id, s.id);
              return `<a class="chapter-item ${isDone ? 'done' : ''}" href="#/learn/${c.id}">
                <span class="chapter-num">${isDone ? '✓' : U.esc(c.nr)}</span>
                <span><strong>${U.esc(c.title)}</strong>
                  <span class="chapter-meta">${U.stars(c.relevance)}
                  <span class="badge">${st.total} Lernelemente</span>
                  ${st.rate != null ? `<span class="badge ${st.rate >= 0.75 ? 'success' : st.rate >= 0.5 ? 'warning' : 'danger'}">${Math.round(st.rate * 100)}% richtig</span>` : ''}
                  ${c.optional ? '<span class="badge">* Ergänzung</span>' : ''}</span>
                </span>
                <span class="muted">›</span>
              </a>`;
            })
            .join('')}
          </div>`
        )
        .join('')}`;
  }

  function detail(main, s, chId) {
    const idx = s.chapters.findIndex((c) => c.id === chId);
    const c = s.chapters[idx];
    if (!c) return overview(main, s);
    const prev = s.chapters[idx - 1];
    const next = s.chapters[idx + 1];
    const nQ = SRS.questions(s.id).filter((q) => q.ch === c.id).length;
    const nC = SRS.cards(s.id).filter((k) => k.ch === c.id).length;
    const gl = s.glossary.filter((g) => g.ch === c.id);
    const isDone = Store.chapterDone(c.id, s.id);

    const tabs = [
      ['sum', 'Zusammenfassung'],
      c.defs && c.defs.length ? ['def', `Definitionen (${c.defs.length})`] : null,
      c.formulas && c.formulas.length ? ['form', `Formeln (${c.formulas.length})`] : null,
      c.examples ? ['ex', 'Beispiele'] : null,
      c.focus && c.focus.length ? ['focus', 'Prüfungsfokus'] : null,
    ].filter(Boolean);

    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="eyebrow"><a href="#/learn" style="color:inherit">Lernmodus</a> › Kapitel ${U.esc(c.nr)}</div>
          <h1>${U.esc(c.title)}</h1>
          <div class="row">${U.stars(c.relevance)} <span class="src">${U.esc(c.src)}</span>${c.optional ? '<span class="badge">* nicht prüfungsnotwendig laut Skript</span>' : ''}</div>
        </div>
      </div>
      <div class="tabs" role="tablist">${tabs
        .map((t, i) => `<button role="tab" data-t="${t[0]}" aria-selected="${i === 0}">${t[1]}</button>`)
        .join('')}</div>
      <article class="card pad-lg content" id="tabBody"></article>
      ${gl.length ? `<div class="card"><h3>🔎 Glossarbegriffe in diesem Kapitel</h3><div class="chip-row">${gl
        .map((g) => `<a class="chip" href="#/glossary?q=${encodeURIComponent(g.term)}">${U.esc(g.term)}</a>`)
        .join('')}</div></div>` : ''}
      <div class="card">
        <h3>Aktiv lernen</h3>
        <div class="row">
          <a class="btn primary" href="#/quiz?ch=${c.id}">🎯 Quiz (${nQ} Fragen)</a>
          <a class="btn" href="#/cards?ch=${c.id}">🗂️ Karteikarten (${nC})</a>
          <button class="btn ${isDone ? 'success' : ''}" id="doneBtn">${isDone ? '✓ Abgeschlossen' : 'Als abgeschlossen markieren'}</button>
        </div>
      </div>
      <div class="row between" style="margin-top:14px">
        ${prev ? `<a class="btn ghost" href="#/learn/${prev.id}">‹ ${U.esc(prev.nr)} ${U.esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/learn/${next.id}">${U.esc(next.nr)} ${U.esc(next.title)} ›</a>` : ''}
      </div>`;

    const body = U.$('#tabBody', main);
    const show = (t) => {
      U.$$('.tabs button', main).forEach((b) => b.setAttribute('aria-selected', b.dataset.t === t));
      if (t === 'sum') {
        body.innerHTML = `${c.summary || ''}
          ${c.points && c.points.length ? `<h3>Das Wichtigste in Stichpunkten</h3><ul>${c.points.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
          ${c.missing ? `<div class="callout warn"><strong>Hinweis zur Datenlage:</strong> ${c.missing}</div>` : ''}`;
      } else if (t === 'def') {
        body.innerHTML = `<dl class="def-list">${c.defs.map((d) => `<div class="def"><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>`;
      } else if (t === 'form') {
        body.innerHTML = c.formulas
          .map((f) => `<h3>${f.name}</h3><div class="formula">${f.f}</div>${f.note ? `<p class="small muted">${f.note}</p>` : ''}`)
          .join('');
      } else if (t === 'ex') {
        body.innerHTML = c.examples;
      } else if (t === 'focus') {
        body.innerHTML = `<div class="callout"><strong>Darauf solltest du in der Klausur vorbereitet sein:</strong></div><ul>${c.focus
          .map((f) => `<li>${f}</li>`)
          .join('')}</ul>`;
      }
    };
    U.$$('.tabs button', main).forEach((b) => b.addEventListener('click', () => show(b.dataset.t)));
    show('sum');

    U.$('#doneBtn', main).addEventListener('click', (e) => {
      const now = !Store.chapterDone(c.id, s.id);
      Store.setChapterDone(c.id, now, s.id);
      e.target.className = 'btn ' + (now ? 'success' : '');
      e.target.textContent = now ? '✓ Abgeschlossen' : 'Als abgeschlossen markieren';
      if (now) { U.toast('Kapitel abgeschlossen – weiter so! 🎉'); U.confetti(24); }
    });
  }

  LP.views.learn = {
    render(main, { subject, args }) {
      if (args[0]) detail(main, subject, args[0]);
      else overview(main, subject);
    },
  };
})();
