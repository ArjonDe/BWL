/**
 * cards.js – Karteikarten mit Flip-Animation im Leitner-System (5 Fächer).
 */
(function () {
  'use strict';
  const { U, Store, SRS } = LP;
  let cleanupKeys = null;

  function deckFor(s, ch) {
    return SRS.cards(s.id).filter((c) => !ch || c.ch === ch);
  }

  function overview(main, s, params) {
    const ch = params.ch || '';
    const deck = deckFor(s, ch);
    const boxes = SRS.boxes(deck, s.id);
    const due = SRS.dueSeen(deck, s.id).length;
    const fresh = boxes[0];
    main.innerHTML = `
      <div class="page-head"><div><div class="eyebrow">Karteikarten</div><h1>Leitner-Trainer</h1>
      <p>Gewusst → ein Fach weiter (längere Pause). Nicht gewusst → zurück in Fach 1 (kommt bald wieder).</p></div></div>
      <div class="card stack">
        <label class="field">Stapel
          <select id="deck"><option value="">Alle Kapitel (${SRS.cards(s.id).length} Karten)</option>
          ${s.chapters.map((c) => `<option value="${c.id}" ${c.id === ch ? 'selected' : ''}>${U.esc(c.nr)} ${U.esc(c.title)} (${deckFor(s, c.id).length})</option>`).join('')}
          </select></label>
        <div class="leitner">
          ${[1, 2, 3, 4, 5].map((b) => `<div class="box"><strong>${boxes[b]}</strong><span>Fach ${b}<br>${b === 1 ? 'täglich' : 'alle ' + SRS.INTERVAL[b] + ' T.'}</span></div>`).join('')}
        </div>
        <p class="muted small">Neu: ${fresh} · Fällig: ${due}</p>
        <div class="row">
          <button class="btn primary" id="go" ${due + fresh ? '' : 'disabled'}>▶ Lernen (${Math.min(20, due + fresh)} Karten)</button>
          <button class="btn" id="all">Alle Karten durchgehen</button>
          <button class="btn" id="weak">Nur Fach 1–2</button>
        </div>
      </div>`;
    U.$('#deck', main).addEventListener('change', (e) => LP.go(`#/cards${e.target.value ? '?ch=' + e.target.value : ''}`));
    const start = (list) => (list.length ? session(main, s, list, ch) : U.toast('Keine Karten in dieser Auswahl.'));
    U.$('#go', main).addEventListener('click', () => {
      const dueList = U.shuffle(SRS.dueSeen(deck, s.id));
      const newList = U.shuffle(deck.filter((c) => !Store.item(c.id, s.id)));
      start(dueList.concat(newList).slice(0, 20));
    });
    U.$('#all', main).addEventListener('click', () => start(U.shuffle(deck)));
    U.$('#weak', main).addEventListener('click', () =>
      start(U.shuffle(deck.filter((c) => { const st = Store.item(c.id, s.id); return st && st.box <= 2; })))
    );
  }

  function session(main, s, list, ch) {
    let i = 0;
    const tally = { good: 0, hard: 0, wrong: 0 };
    const show = () => {
      if (i >= list.length) return done();
      const c = list[i];
      const st = Store.item(c.id, s.id);
      const chap = s.chapters.find((x) => x.id === c.ch);
      main.innerHTML = `
        <div class="quiz-top" style="max-width:640px;margin:0 auto 14px">
          <a class="btn sm ghost" href="#/cards${ch ? '?ch=' + ch : ''}" aria-label="Beenden">✕</a>
          <div class="progress"><span style="width:${U.pct(i, list.length)}%"></span></div>
          <span class="small muted">${i + 1}/${list.length}</span>
        </div>
        <div class="flash-stage">
          <div class="flash" id="flash" tabindex="0" role="button" aria-label="Karte umdrehen">
            <div class="flash-face front">
              <span class="lbl">Frage · ${st ? 'Fach ' + st.box : 'neu'}${chap ? ' · Kap. ' + U.esc(chap.nr) : ''}</span>
              <div class="txt">${c.front}</div>
              <span class="hint">Klicken oder Leertaste zum Umdrehen</span>
            </div>
            <div class="flash-face back">
              <span class="lbl">Antwort</span>
              <div class="txt">${c.back}</div>
              ${c.src ? `<span class="hint src">${U.esc(c.src)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="rate-row" id="rate" style="visibility:hidden">
          <button class="btn danger" data-q="wrong">✗ Nochmal <span class="small">(1)</span></button>
          <button class="btn" data-q="hard">≈ Schwer <span class="small">(2)</span></button>
          <button class="btn success" data-q="good">✓ Gewusst <span class="small">(3)</span></button>
        </div>`;
      const flash = U.$('#flash', main);
      const rate = U.$('#rate', main);
      const flip = () => { flash.classList.toggle('flipped'); rate.style.visibility = 'visible'; };
      flash.addEventListener('click', flip);
      U.$$('button', rate).forEach((b) => b.addEventListener('click', () => grade(b.dataset.q)));
      keyHandler = (e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
        else if (rate.style.visibility === 'visible' && ['1', '2', '3'].includes(e.key)) grade(['wrong', 'hard', 'good'][+e.key - 1]);
      };
    };
    const grade = (q) => {
      SRS.record(list[i].id, q, s.id);
      tally[q]++;
      if (q === 'wrong') list.push(list[i]); // falsch beantwortete Karte am Ende erneut zeigen
      i++;
      show();
    };
    const done = () => {
      keyHandler = null;
      if (tally.good >= tally.wrong) U.confetti(30);
      main.innerHTML = `<div class="card pad-lg" style="max-width:640px;margin:0 auto;text-align:center">
        <div style="font-size:3rem">🎉</div><h1>Runde geschafft!</h1>
        <p>✓ ${tally.good} gewusst · ≈ ${tally.hard} schwer · ✗ ${tally.wrong} nochmal</p>
        <div class="row" style="justify-content:center"><a class="btn primary" href="#/cards${ch ? '?ch=' + ch : ''}">Zur Übersicht</a><a class="btn" href="#/quiz">Quiz starten</a></div></div>`;
      LP.refreshNav();
    };
    let keyHandler = null;
    const onKey = (e) => keyHandler && keyHandler(e);
    if (cleanupKeys) cleanupKeys();
    document.addEventListener('keydown', onKey);
    cleanupKeys = () => { document.removeEventListener('keydown', onKey); cleanupKeys = null; };
    show();
  }

  LP.views.cards = {
    render(main, { subject, params }) {
      overview(main, subject, params);
      return () => cleanupKeys && cleanupKeys();
    },
  };
})();
