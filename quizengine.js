/**
 * quizengine.js – Darstellung und Auswertung aller Aufgabentypen.
 *
 * Fragenformat:
 *   { id, ch, diff: 1..4, type, q, expl, src, ... }
 *   single: options: [..], answer: Index
 *   multi : options: [..], answer: [Indizes]
 *   tf    : answer: true | false
 *   match : pairs: [[links, rechts], ...]
 *   cloze : text mit Lücken {{Antwort|Alternative}}
 */
(function () {
  'use strict';
  const { U } = LP;
  const KEYS = 'ABCDEFGH';

  /** Punkte, die eine Frage im Prüfungsmodus wert ist. */
  function points(q) {
    const base = { single: 1, tf: 1, multi: 2, match: 2, cloze: 2 }[q.type] || 1;
    return base + (q.diff >= 3 ? 1 : 0) + (q.diff === 4 ? 1 : 0);
  }

  function clozeParts(text) {
    const parts = [];
    const re = /\{\{(.+?)\}\}/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      parts.push({ t: 'txt', v: text.slice(last, m.index) });
      parts.push({ t: 'gap', v: m[1].split('|').map((s) => s.trim()) });
      last = re.lastIndex;
    }
    parts.push({ t: 'txt', v: text.slice(last) });
    return parts;
  }

  /**
   * Rendert eine Frage in einen Container.
   * @returns Controller mit getAnswer/isAnswered/evaluate/reveal/lock
   */
  function render(q, host, opts = {}) {
    const onChange = opts.onChange || (() => {});
    const saved = opts.saved; // gespeicherte Antwort (Prüfungsmodus)
    host.innerHTML = '';
    let answer = saved !== undefined ? saved : null;
    let ctrl = {};

    const qText = U.el(`<div class="q-text">${q.q || ''}</div>`);
    if (q.type !== 'cloze') host.appendChild(qText);

    if (q.type === 'single' || q.type === 'multi' || q.type === 'tf') {
      const opts2 = q.type === 'tf' ? ['Wahr', 'Falsch'] : q.options;
      // Reihenfolge der Optionen einmalig mischen (außer Wahr/Falsch oder fixierte Reihenfolge)
      const order = q.type === 'tf' || q.fixed ? opts2.map((_, i) => i) : (q._order = q._order || U.shuffle(opts2.map((_, i) => i)));
      const list = U.el('<div class="options" role="group"></div>');
      if (q.type === 'multi') host.appendChild(U.el('<p class="muted small">Mehrere Antworten können richtig sein.</p>'));
      order.forEach((origIdx, pos) => {
        const b = U.el(
          `<button type="button" class="option" data-i="${origIdx}"><span class="key">${KEYS[pos]}</span><span>${opts2[origIdx]}</span></button>`
        );
        b.addEventListener('click', () => {
          if (ctrl.locked) return;
          if (q.type === 'multi') {
            const set = new Set(answer || []);
            set.has(origIdx) ? set.delete(origIdx) : set.add(origIdx);
            answer = Array.from(set);
          } else {
            answer = origIdx;
          }
          paint();
          onChange(answer);
        });
        list.appendChild(b);
      });
      host.appendChild(list);
      const paint = () =>
        U.$$('.option', list).forEach((b) => {
          const i = +b.dataset.i;
          const sel = q.type === 'multi' ? (answer || []).includes(i) : answer === i;
          b.classList.toggle('selected', sel);
          b.setAttribute('aria-pressed', sel);
        });
      paint();

      ctrl.isAnswered = () => (q.type === 'multi' ? (answer || []).length > 0 : answer !== null);
      ctrl.evaluate = () => {
        if (q.type === 'tf') {
          const correct = answer === (q.answer ? 0 : 1);
          return { correct, score: correct ? 1 : 0 };
        }
        if (q.type === 'single') {
          const correct = answer === q.answer;
          return { correct, score: correct ? 1 : 0 };
        }
        const sol = new Set(q.answer);
        const given = new Set(answer || []);
        let hit = 0, fp = 0;
        given.forEach((g) => (sol.has(g) ? hit++ : fp++));
        const correct = hit === sol.size && fp === 0;
        const score = Math.max(0, (hit - fp) / sol.size);
        return { correct, score: correct ? 1 : score };
      };
      ctrl.reveal = () => {
        ctrl.locked = true;
        U.$$('.option', list).forEach((b) => {
          b.disabled = true;
          const i = +b.dataset.i;
          const isSol = q.type === 'tf' ? i === (q.answer ? 0 : 1) : q.type === 'single' ? i === q.answer : q.answer.includes(i);
          const sel = q.type === 'multi' ? (answer || []).includes(i) : answer === i;
          if (isSol) b.classList.add('correct');
          else if (sel) b.classList.add('wrong');
        });
      };
    } else if (q.type === 'match') {
      const rights = q._rights || (q._rights = U.shuffle(Array.from(new Set(q.pairs.map((p) => p[1].trim())))));
      answer = answer || q.pairs.map(() => '');
      const wrap = U.el('<div class="options"></div>');
      q.pairs.forEach((p, i) => {
        const row = U.el(
          `<div class="match-row"><div><strong>${p[0]}</strong></div><select aria-label="Zuordnung für ${U.esc(
            p[0].replace(/<[^>]+>/g, '')
          )}"><option value="">– bitte wählen –</option>${rights
            .map((r) => `<option value="${U.esc(r)}">${U.esc(r.replace(/<[^>]+>/g, ''))}</option>`)
            .join('')}</select></div>`
        );
        const sel = U.$('select', row);
        sel.value = answer[i] || '';
        sel.addEventListener('change', () => {
          answer = answer.slice();
          answer[i] = sel.value;
          onChange(answer);
        });
        wrap.appendChild(row);
      });
      host.appendChild(wrap);
      ctrl.isAnswered = () => answer.every((a) => a);
      ctrl.evaluate = () => {
        let hit = 0;
        q.pairs.forEach((p, i) => { if (answer[i] === p[1].trim()) hit++; });
        return { correct: hit === q.pairs.length, score: hit / q.pairs.length };
      };
      ctrl.reveal = () => {
        ctrl.locked = true;
        U.$$('.match-row', wrap).forEach((row, i) => {
          const sel = U.$('select', row);
          sel.disabled = true;
          const ok = answer[i] === q.pairs[i][1].trim();
          row.classList.add(ok ? 'correct' : 'wrong');
          if (!ok) row.appendChild(U.el(`<div class="small" style="grid-column:1/-1">✔ Richtig: <strong>${q.pairs[i][1]}</strong></div>`));
        });
      };
    } else if (q.type === 'cloze') {
      if (q.q) host.appendChild(qText);
      const parts = clozeParts(q.text);
      const gaps = parts.filter((p) => p.t === 'gap');
      answer = answer || gaps.map(() => '');
      const box = U.el('<div class="cloze"></div>');
      let gi = 0;
      parts.forEach((p) => {
        if (p.t === 'txt') box.appendChild(document.createRange().createContextualFragment(p.v));
        else {
          const idx = gi++;
          const inp = U.el(`<input class="input" type="text" autocomplete="off" spellcheck="false" aria-label="Lücke ${idx + 1}">`);
          inp.value = answer[idx] || '';
          inp.style.width = Math.max(110, Math.min(220, p.v[0].length * 11 + 30)) + 'px';
          inp.addEventListener('input', () => {
            answer = answer.slice();
            answer[idx] = inp.value;
            onChange(answer);
          });
          box.appendChild(inp);
        }
      });
      host.appendChild(box);
      ctrl.isAnswered = () => answer.some((a) => String(a).trim());
      const check = (i) => gaps[i].v.some((alt) => U.norm(alt) === U.norm(answer[i]));
      ctrl.evaluate = () => {
        let hit = 0;
        gaps.forEach((_, i) => { if (check(i)) hit++; });
        return { correct: hit === gaps.length, score: hit / gaps.length };
      };
      ctrl.reveal = () => {
        ctrl.locked = true;
        U.$$('input', box).forEach((inp, i) => {
          inp.disabled = true;
          if (check(i)) inp.classList.add('correct');
          else {
            inp.classList.add('wrong');
            inp.insertAdjacentHTML('afterend', `<span class="badge success">${U.esc(gaps[i].v[0])}</span>`);
          }
        });
      };
    }

    ctrl.getAnswer = () => answer;
    return ctrl;
  }

  /** HTML für die Rückmeldung mit Erklärung, Fundstelle und Kapitel. */
  function feedbackHTML(q, res, subject) {
    const ch = subject ? subject.chapters.find((c) => c.id === q.ch) : null;
    const head = res.correct
      ? '<h4>✅ Richtig!</h4>'
      : res.score > 0
      ? `<h4>🟡 Teilweise richtig (${Math.round(res.score * 100)} %)</h4>`
      : '<h4>❌ Leider falsch</h4>';
    return `<div class="feedback ${res.correct ? 'ok' : 'bad'}">
      ${head}
      <p>${q.expl || ''}</p>
      <div class="row small">
        ${q.src ? `<span class="src">${U.esc(q.src)}</span>` : ''}
        ${ch ? `<a href="#/learn/${ch.id}" class="badge primary">Kapitel ${U.esc(ch.nr)}: ${U.esc(ch.title)}</a>` : ''}
      </div>
    </div>`;
  }

  LP.QE = { render, feedbackHTML, points };
})();
