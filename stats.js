/**
 * stats.js – Lernanalytik: Fortschritt, Erfolgsquote, Fehleranalyse, Schwachstellen, Themen-Ranking.
 */
(function () {
  'use strict';
  const { U, Store, SRS } = LP;

  function rateBy(s, keyFn, labels) {
    const agg = {};
    SRS.questions(s.id).forEach((q) => {
      const st = Store.item(q.id, s.id);
      if (!st) return;
      const k = keyFn(q);
      const a = (agg[k] = agg[k] || { ok: 0, bad: 0 });
      a.ok += st.ok; a.bad += st.bad;
    });
    return Object.keys(labels)
      .filter((k) => agg[k])
      .map((k) => {
        const a = agg[k];
        const p = U.pct(a.ok, a.ok + a.bad);
        return `<div class="bar-item"><span>${labels[k]}</span><span class="small">${p}% · ${a.ok + a.bad} Versuche</span>
          <div class="progress thin ${p < 60 ? 'danger' : 'success'}"><span style="width:${p}%"></span></div></div>`;
      })
      .join('') || '<p class="muted small">Noch keine Daten.</p>';
  }

  LP.views.stats = {
    render(main, { subject: s }) {
      const stats = Object.values(SRS.chapterStats(s.id));
      const ranking = stats.slice().sort((a, b) => b.need - a.need);
      const rate = SRS.successRate(s.id);
      const all = SRS.questions(s.id).concat(SRS.cards(s.id));
      const boxes = SRS.boxes(all, s.id);
      const missed = SRS.mostMissed(s.id, 10);
      const exams = Store.sub(s.id).exams.slice(-12);
      const prog = Math.round(SRS.progress(s.id) * 100);

      main.innerHTML = `
        <div class="page-head"><div><div class="eyebrow">Lernanalytik</div><h1>Statistik · ${U.esc(s.short)}</h1>
        <p>Wo stehst du – und was solltest du als Nächstes wiederholen?</p></div></div>

        <div class="grid cols-4">
          <div class="card kpi"><span class="val">${prog}%</span><span class="lbl">Gesamtfortschritt</span></div>
          <div class="card kpi"><span class="val">${rate.rate == null ? '–' : Math.round(rate.rate * 100) + '%'}</span><span class="lbl">Erfolgsquote (${rate.ok + rate.bad} Antworten)</span></div>
          <div class="card kpi"><span class="val">${all.length - boxes[0]}/${all.length}</span><span class="lbl">Elemente bearbeitet</span></div>
          <div class="card kpi"><span class="val">${boxes[4] + boxes[5]}</span><span class="lbl">Sicher beherrscht (Fach 4–5)</span></div>
        </div>

        <div class="card" style="margin-top:14px">
          <h2>🏁 Themen-Ranking nach Wiederholungsbedarf</h2>
          <p class="muted small">Bedarf = Klausurrelevanz × (Fehlerquote, fehlende Abdeckung, fällige Elemente). Oben = zuerst wiederholen.</p>
          <div class="table-wrap"><table>
            <thead><tr><th>#</th><th>Kapitel</th><th>Relevanz</th><th>Quote</th><th>Abdeckung</th><th>Beherrscht</th><th>Fällig</th><th></th></tr></thead>
            <tbody>${ranking.map((r, i) => `<tr>
              <td>${i + 1}</td>
              <td><a href="#/learn/${r.ch.id}">${U.esc(r.ch.nr)} ${U.esc(r.ch.title)}</a></td>
              <td>${U.stars(r.ch.relevance)}</td>
              <td>${r.rate == null ? '<span class="badge">neu</span>' : `<span class="badge ${r.rate >= 0.75 ? 'success' : r.rate >= 0.5 ? 'warning' : 'danger'}">${Math.round(r.rate * 100)}%</span>`}</td>
              <td>${Math.round(r.coverage * 100)}%</td>
              <td>${Math.round(r.mastery * 100)}%</td>
              <td>${r.due}</td>
              <td><a class="btn sm" href="#/quiz?ch=${r.ch.id}">Üben</a></td></tr>`).join('')}
            </tbody></table></div>
        </div>

        <div class="grid cols-2" style="margin-top:14px">
          <div class="card"><h2>🗂️ Leitner-Verteilung</h2>
            <div class="leitner" style="grid-template-columns:repeat(6,1fr)">
              <div class="box"><strong>${boxes[0]}</strong><span>neu</span></div>
              ${[1, 2, 3, 4, 5].map((b) => `<div class="box"><strong>${boxes[b]}</strong><span>Fach ${b}</span></div>`).join('')}
            </div>
            <p class="muted small" style="margin-top:10px">Fach 1 = Fehler/neu gelernt · Fach 5 = langfristig gefestigt.</p>
          </div>
          <div class="card"><h2>📈 Probeklausuren</h2>
            ${exams.length ? `<div style="display:flex;align-items:flex-end;gap:6px;height:140px">${exams.map((e) => `<div title="${new Date(e.date).toLocaleDateString('de-DE')}: ${e.pct}%" style="flex:1;height:${Math.max(4, e.pct)}%;background:${e.pct >= 50 ? 'var(--success)' : 'var(--danger)'};border-radius:6px 6px 0 0"></div>`).join('')}</div>
              <p class="muted small">Letzte ${exams.length} Ergebnisse (älteste links).</p>` : '<p class="muted">Noch keine Probeklausur geschrieben. <a href="#/exam">Jetzt starten →</a></p>'}
          </div>
          <div class="card"><h2>🔬 Fehleranalyse nach Schwierigkeit</h2>
            <div class="bar-list">${rateBy(s, (q) => q.diff, { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer', 4: 'Klausurniveau' })}</div></div>
          <div class="card"><h2>🧩 Fehleranalyse nach Aufgabentyp</h2>
            <div class="bar-list">${rateBy(s, (q) => q.type, { single: 'Single Choice', multi: 'Multiple Choice', tf: 'Wahr/Falsch', match: 'Zuordnung', cloze: 'Lückentext' })}</div></div>
        </div>

        <div class="card" style="margin-top:14px"><h2>⚠️ Häufigste Fehler</h2>
          ${missed.length ? missed.map((m) => `<details class="acc"><summary><span class="badge danger">${m.st.bad}× falsch</span> ${(m.q.q || 'Lückentext').replace(/<pre[\s\S]*?<\/pre>/g, '[Code]').replace(/<[^>]+>/g, '').slice(0, 100)}</summary>
            <div><p>${m.q.expl}</p><span class="src">${U.esc(m.q.src || '')}</span></div></details>`).join('')
            + '<a class="btn primary" href="#/quiz?mode=weak" style="margin-top:8px">Diese Fehler gezielt üben</a>'
            : '<p class="muted">Noch keine Fehler erfasst – super oder noch nicht angefangen 😉</p>'}
        </div>`;
    },
  };
})();
