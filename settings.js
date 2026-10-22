/**
 * settings.js – Datensicherung (Export/Import), Zurücksetzen, Quellen.
 */
(function () {
  'use strict';
  const { U, Store } = LP;

  LP.views.settings = {
    render(main, { subject: s }) {
      const bytes = new Blob([Store.exportJSON()]).size;
      main.innerHTML = `
        <div class="page-head"><div><div class="eyebrow">Einstellungen</div><h1>Daten & Einstellungen</h1>
        <p>Dein Fortschritt liegt ausschließlich lokal in diesem Browser (localStorage, ca. ${U.fmtNum(bytes / 1024, 1)} KB).</p></div></div>
        <div class="grid cols-2">
          <div class="card stack">
            <h2>💾 Sicherung</h2>
            <p class="small muted">Exportiere deinen Fortschritt, um ihn auf ein anderes Gerät oder in einen anderen Browser zu übertragen.</p>
            <div class="row"><button class="btn primary" id="exp">Fortschritt exportieren</button>
            <label class="btn" for="imp">Importieren …</label><input type="file" id="imp" accept="application/json" hidden></div>
          </div>
          <div class="card stack">
            <h2>♻️ Zurücksetzen</h2>
            <p class="small muted">Setzt Leitner-Fächer, Statistiken, Kapitelstatus und Prüfungsergebnisse zurück.</p>
            <div class="row"><button class="btn" id="resS">Nur ${U.esc(s.short)} zurücksetzen</button><button class="btn danger" id="resA">Alles zurücksetzen</button></div>
          </div>
        </div>
        <div class="card" style="margin-top:14px">
          <h2>📚 Quellen</h2>
          <p class="small">Sämtliche Lerninhalte wurden ausschließlich aus den bereitgestellten Unterlagen extrahiert. Fundstellen sind bei jeder Frage, jedem Glossarbegriff und jedem Kapitel angegeben.</p>
          ${Object.values(LP.subjects).map((x) => `<h3>${U.esc(x.name)}</h3><ul class="small">${x.sources.map((q) => `<li>${q}</li>`).join('')}</ul>`).join('')}
          <div class="callout warn small"><strong>Kennzeichnung:</strong> Wo die Unterlagen keine Musterlösung enthalten (z. B. Rechenübungen), wurden Lösungen ausschließlich mit den Formeln aus den Folien hergeleitet und als solche markiert.</div>
        </div>
        <div class="card"><h2>⌨️ Tastenkürzel</h2>
          <div class="table-wrap"><table><tbody>
          <tr><td>Quiz</td><td><code>A</code>–<code>E</code> Antwort wählen · <code>Enter</code> prüfen/weiter</td></tr>
          <tr><td>Karteikarten</td><td><code>Leertaste</code> umdrehen · <code>1</code> nochmal · <code>2</code> schwer · <code>3</code> gewusst</td></tr>
          </tbody></table></div></div>`;

      U.$('#exp', main).addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([Store.exportJSON()], { type: 'application/json' }));
        a.download = `klausurtrainer-fortschritt-${U.today()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
      });
      U.$('#imp', main).addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        file.text().then((t) => {
          try { Store.importJSON(t); U.toast('Fortschritt importiert ✓'); LP.go('#/'); }
          catch (err) { U.toast('Import fehlgeschlagen: ' + err.message, 4000); }
        });
      });
      U.$('#resS', main).addEventListener('click', () => {
        if (confirm(`Fortschritt für ${s.name} wirklich löschen?`)) { Store.resetSubject(s.id); U.toast('Zurückgesetzt'); LP.go('#/'); }
      });
      U.$('#resA', main).addEventListener('click', () => {
        if (confirm('Gesamten Fortschritt beider Fächer wirklich löschen?')) { Store.resetAll(); U.toast('Alles zurückgesetzt'); LP.go('#/'); }
      });
    },
  };
})();
