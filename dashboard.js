/**
 * dashboard.js – Startseite: Fortschritt, fällige Wiederholungen, Schwachstellen, Klausurinfos.
 */
(function () {
  'use strict';
  const { U, Store, SRS } = LP;

  function heatmap() {
    const days = Store.state.days;
    const cells = [];
    const d = new Date();
    d.setDate(d.getDate() - 27);
    for (let i = 0; i < 28; i++) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const n = days[k] || 0;
      const l = n === 0 ? 0 : n < 10 ? 1 : n < 30 ? 2 : 3;
      cells.push(`<span data-l="${l}" title="${k}: ${n} Aktivitäten"></span>`);
      d.setDate(d.getDate() + 1);
    }
    return `<div class="heat" aria-label="Lernaktivität der letzten 4 Wochen">${cells.join('')}</div>`;
  }

  LP.views.dashboard = {
    render(main, { subject: s }) {
      const prog = Math.round(SRS.progress(s.id) * 100);
      const rate = SRS.successRate(s.id);
      const allItems = SRS.questions(s.id).concat(SRS.cards(s.id));
      const due = SRS.dueSeen(allItems, s.id).length;
      const newCount = allItems.filter((it) => !Store.item(it.id, s.id)).length;
      const chDone = s.chapters.filter((c) => Store.chapterDone(c.id, s.id)).length;
      const stats = Object.values(SRS.chapterStats(s.id)).sort((a, b) => b.need - a.need);
      const weak = stats.slice(0, 3);
      const exams = Store.sub(s.id).exams;
      const lastExam = exams[exams.length - 1];

      main.innerHTML = `
        <section class="hero">
          <div class="stack">
            <div class="eyebrow" style="color:rgba(255,255,255,.85)">${U.esc(s.module)}</div>
            <h1>${U.esc(s.name)}</h1>
            <p>${due ? `Du hast <strong>${due}</strong> fällige Wiederholungen.` : newCount ? `Noch <strong>${newCount}</strong> neue Lernelemente warten auf dich.` : 'Alles wiederholt – stark! Teste dich im Prüfungsmodus.'}</p>
            <div class="row">
              <a class="btn" href="#/quiz?mode=review">${due ? '🔁 Jetzt wiederholen' : '🎯 Smart-Quiz starten'}</a>
              <a class="btn ghost-light" href="#/exam">⏱️ Probeklausur</a>
            </div>
          </div>
          <div class="ring" style="--p:${prog}"><div><div><strong>${prog}%</strong><span class="small muted">Fortschritt</span></div></div></div>
        </section>

        <div class="grid cols-4" style="margin-top:14px">
          <div class="card kpi"><span class="val">${rate.rate == null ? '–' : Math.round(rate.rate * 100) + '%'}</span><span class="lbl">Erfolgsquote</span></div>
          <div class="card kpi"><span class="val">${due}</span><span class="lbl">Fällig zur Wiederholung</span></div>
          <div class="card kpi"><span class="val">${chDone}/${s.chapters.length}</span><span class="lbl">Kapitel abgeschlossen</span></div>
          <div class="card kpi"><span class="val">${lastExam ? lastExam.pct + '%' : '–'}</span><span class="lbl">Letzte Probeklausur</span></div>
        </div>

        <div class="grid cols-2" style="margin-top:14px">
          <div class="card">
            <div class="row between"><h2>🎯 Wiederholungsbedarf</h2><a class="small" href="#/stats">Alle Themen →</a></div>
            <p class="muted small">Berechnet aus Klausurrelevanz, Fehlerquote, Abdeckung und fälligen Elementen.</p>
            <div class="bar-list">
              ${weak
                .map(
                  (w) => `<a href="#/learn/${w.ch.id}" style="text-decoration:none;color:inherit" class="bar-item">
                    <span><strong>${U.esc(w.ch.nr)}</strong> ${U.esc(w.ch.title)}</span>
                    <span class="small muted">${w.rate == null ? 'neu' : Math.round(w.rate * 100) + '% richtig'}</span>
                    <div class="progress thin ${w.rate != null && w.rate < 0.6 ? 'danger' : ''}"><span style="width:${Math.round(w.coverage * 100)}%"></span></div>
                  </a>`
                )
                .join('')}
            </div>
            <div class="row" style="margin-top:14px">
              <a class="btn sm primary" href="#/quiz?mode=weak">Schwachstellen trainieren</a>
            </div>
          </div>

          <div class="card">
            <h2>📝 Die Klausur</h2>
            <div class="content small">${s.examInfo}</div>
          </div>
        </div>

        <h2 style="margin-top:22px">Schnellstart</h2>
        <div class="grid cols-3">
          <a class="btn-big" href="#/learn"><span class="ico">📖</span><strong>Lernmodus</strong><span>Zusammenfassungen, Definitionen, Beispiele</span></a>
          <a class="btn-big" href="#/cards"><span class="ico">🗂️</span><strong>Karteikarten</strong><span>${SRS.cards(s.id).length} Karten im Leitner-System</span></a>
          <a class="btn-big" href="#/quiz"><span class="ico">🎯</span><strong>Quiz</strong><span>${SRS.questions(s.id).length} Fragen in 4 Schwierigkeitsstufen</span></a>
          <a class="btn-big" href="#/tools"><span class="ico">🧮</span><strong>Formeln & Rechner</strong><span>Kennzahlen interaktiv nachrechnen</span></a>
          <a class="btn-big" href="#/glossary"><span class="ico">🔎</span><strong>Glossar</strong><span>${s.glossary.length} Begriffe als Wissensdatenbank</span></a>
          <a class="btn-big" href="#/exam"><span class="ico">⏱️</span><strong>Prüfungsmodus</strong><span>Mit Zeit, Punkten und Analyse</span></a>
        </div>

        <div class="card" style="margin-top:14px">
          <div class="row between"><h3>Lernaktivität (28 Tage)</h3><span class="badge warning">🔥 ${Store.streak()} Tage in Folge</span></div>
          ${heatmap()}
        </div>`;
    },
  };
})();
