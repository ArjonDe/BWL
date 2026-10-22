/**
 * glossary.js – Glossar als durchsuchbare Wissensdatenbank (Volltextsuche, A–Z, Kapitelfilter).
 */
(function () {
  'use strict';
  const { U } = LP;

  const letterOf = (t) => {
    const c = t.replace(/^[^A-Za-zÄÖÜäöü0-9]+/, '').charAt(0).toUpperCase();
    return { Ä: 'A', Ö: 'O', Ü: 'U' }[c] || (/[0-9]/.test(c) ? '#' : c);
  };

  LP.views.glossary = {
    render(main, { subject: s, params }) {
      let q = params.q || '';
      let both = false;
      let ch = '';

      main.innerHTML = `
        <div class="page-head"><div><div class="eyebrow">Wissensdatenbank</div><h1>Glossar</h1>
        <p>Alle Fachbegriffe mit Definition, Kapitelbezug und Fundstelle.</p></div></div>
        <div class="card stack">
          <input class="input" id="q" type="search" placeholder="Begriff oder Stichwort suchen … (z. B. Fremdschlüssel, Leverage)" value="${U.esc(q)}" aria-label="Glossar durchsuchen">
          <div class="row">
            <select id="ch" style="max-width:340px" aria-label="Kapitel filtern"><option value="">Alle Kapitel</option>
              ${s.chapters.map((c) => `<option value="${c.id}">${U.esc(c.nr)} ${U.esc(c.title)}</option>`).join('')}</select>
            ${Object.keys(LP.subjects).length > 1 ? '<label class="row small"><input type="checkbox" id="both"> beide Fächer durchsuchen</label>' : ''}
            <span class="spacer"></span><span class="muted small" id="count"></span>
          </div>
          <nav class="az" id="az" aria-label="Alphabet"></nav>
        </div>
        <div id="list"></div>`;

      const listEl = U.$('#list', main);
      const draw = () => {
        const subjects = both ? Object.values(LP.subjects) : [s];
        const needle = U.norm(q);
        let items = [];
        subjects.forEach((sub) =>
          sub.glossary.forEach((g) => items.push(Object.assign({ sub }, g)))
        );
        items = items.filter(
          (g) => (!ch || g.ch === ch) && (!needle || U.norm(g.term + ' ' + g.def + ' ' + (g.alias || '')).includes(needle))
        );
        items.sort((a, b) => a.term.localeCompare(b.term, 'de'));
        U.$('#count', main).textContent = `${items.length} Begriffe`;

        const letters = new Set(items.map((g) => letterOf(g.term)));
        U.$('#az', main).innerHTML = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          .split('')
          .map((l) => `<a href="javascript:void(0)" data-l="${l}" class="${letters.has(l) ? '' : 'off'}">${l}</a>`)
          .join('');
        U.$$('#az a', main).forEach((a) =>
          a.addEventListener('click', () => {
            const t = document.getElementById('gl-' + a.dataset.l);
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          })
        );

        const hl = (txt) => {
          if (!q.trim()) return txt;
          const safe = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          return txt.replace(new RegExp(`(${safe})(?![^<]*>)`, 'gi'), '<mark>$1</mark>');
        };
        let lastL = '';
        listEl.innerHTML = items.length
          ? items
              .map((g) => {
                const l = letterOf(g.term);
                const head = l !== lastL ? `<div class="gl-letter" id="gl-${l}">${l}</div>` : '';
                lastL = l;
                const c = g.sub.chapters.find((x) => x.id === g.ch);
                return `${head}<div class="gl-item">
                  <h3>${hl(U.esc(g.term))} ${both ? `<span class="badge" style="color:var(--${g.sub.id})">${g.sub.short}</span>` : ''}</h3>
                  <p>${hl(g.def)}</p>
                  <div class="row small">${c ? `<a class="badge primary" href="#/learn/${c.id}">Kap. ${U.esc(c.nr)} ${U.esc(c.title)}</a>` : ''}<span class="src">${U.esc(g.src || '')}</span></div>
                </div>`;
              })
              .join('')
          : '<div class="empty"><div class="big">🔍</div><p>Kein Begriff gefunden.</p></div>';
      };
      U.$('#q', main).addEventListener('input', (e) => { q = e.target.value; draw(); });
      U.$('#ch', main).addEventListener('change', (e) => { ch = e.target.value; draw(); });
      const bothEl = U.$('#both', main);
      if (bothEl) bothEl.addEventListener('change', (e) => { both = e.target.checked; draw(); });
      draw();
      if (!q) U.$('#q', main).focus();
    },
  };
})();
