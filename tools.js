/**
 * tools.js – BWL: Formelsammlung + interaktive Rechner.
 * Alle Formeln stammen aus den Vorlesungsfolien; Abweichungen/Annahmen sind gekennzeichnet.
 */
(function () {
  'use strict';
  const { U } = LP;
  const f = (n, d = 2) => U.fmtNum(n, d);
  const pc = (n, d = 2) => (Number.isFinite(n) ? U.fmtNum(n * 100, d) + ' %' : '–');
  const eur = (n) => (Number.isFinite(n) ? U.fmtNum(n, 2) + ' €' : '–');
  const rbf = (n, i) => (i === 0 ? n : (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)));

  const CALCS = [
    {
      id: 'prod', title: 'Produktivität & Wirtschaftlichkeit', src: 'VL Folie 26–28 (PDF-S. 17–19)',
      inputs: [['outM', 'Outputmenge', 5000], ['inM', 'Inputmenge', 1000], ['ertrag', 'Ertrag (bewerteter Output) €', 10000], ['aufwand', 'Aufwand (bewerteter Input) €', 8000]],
      compute: (v) => [
        ['Produktivität = Output / Input', f(v.outM / v.inM, 4)],
        ['Wirtschaftlichkeit = Ertrag / Aufwand', f(v.ertrag / v.aufwand, 4)],
        ['Gewinn = Ertrag − Aufwand', eur(v.ertrag - v.aufwand)],
        ['Interpretation', v.ertrag / v.aufwand > 1 ? 'Wirtschaftlichkeit > 1: Erträge übersteigen Aufwendungen' : 'Wirtschaftlichkeit ≤ 1: kein Überschuss'],
      ],
    },
    {
      id: 'lev', title: 'Rentabilität & Leverage-Effekt', src: 'VL Folie 70–72 (PDF-S. 62–64), Folie 212',
      inputs: [['ek', 'Eigenkapital EK €', 200000], ['fk', 'Fremdkapital FK €', 300000], ['gb', 'Bruttogewinn (vor FK-Zinsen) €', 50000], ['i', 'Fremdkapitalzins i in %', 8]],
      compute: (v) => {
        const i = v.i / 100, gk = v.ek + v.fk, gn = v.gb - v.fk * i, V = v.fk / v.ek;
        const rgk = v.gb / gk, rek = gn / v.ek;
        return [
          ['Gesamtkapital GK = EK + FK', eur(gk)],
          ['FK-Zinsen = FK · i', eur(v.fk * i)],
          ['Nettogewinn = Gbrutto − FK · i', eur(gn)],
          ['Verschuldungsgrad V = FK / EK', f(V, 3)],
          ['r(GK) = Gbrutto / GK', pc(rgk)],
          ['r(EK) = Gnetto / EK', pc(rek)],
          ['Kontrolle: r(EK) = r(GK) + (r(GK) − i) · V', pc(rgk + (rgk - i) * V)],
          ['Leverage-Effekt', rgk > i ? '✅ positiv (r(GK) > i): mehr FK erhöht r(EK)' : rgk < i ? '⚠️ negativ (r(GK) < i): mehr FK senkt r(EK)' : 'neutral (r(GK) = i)'],
        ];
      },
    },
    {
      id: 'be', title: 'Break-even-Analyse & Deckungsbeitrag', src: 'VL Folie 148, 153 (PDF-S. 140, 145)',
      inputs: [['kf', 'Fixkosten Kf €', 60000], ['p', 'Preis p je Einheit €', 60], ['kv', 'variable Stückkosten kv €', 24], ['x', 'geplante Menge x', 1000]],
      compute: (v) => {
        const db = v.p - v.kv;
        return [
          ['Deckungsbeitrag je Stück db = p − kv', eur(db)],
          ['Break-even-Menge x(BE) = Kf / db', f(v.kf / db, 2) + ' ME'],
          ['Gesamtdeckungsbeitrag DB = db · x', eur(db * v.x)],
          ['Kosten K(x) = Kf + kv · x', eur(v.kf + v.kv * v.x)],
          ['Stückkosten k = K(x) / x', eur((v.kf + v.kv * v.x) / v.x)],
          ['Gewinn G = DB − Kf', eur(db * v.x - v.kf)],
        ];
      },
    },
    {
      id: 'stat', title: 'Statische Investitionsrechnung (eine Anlage)', src: 'VL Folie 162–181 (PDF-S. 154–173)',
      inputs: [['a0', 'Anschaffungskosten A0 €', 160000], ['ln', 'Restwert/Liquidationserlös Ln €', 0], ['n', 'Nutzungsdauer n (Jahre)', 10], ['i', 'kalk. Zinssatz in %', 8],
        ['kfb', 'fixe Betriebskosten p. a. €', 1400], ['kv', 'variable Kosten je ME €', 5.6], ['x', 'Menge x p. a.', 8000], ['p', 'Erlös je ME €', 10]],
      compute: (v) => {
        const afa = (v.a0 - v.ln) / v.n, cap = (v.a0 + v.ln) / 2, zins = cap * v.i / 100;
        const kf = v.kfb + afa + zins, K = kf + v.kv * v.x, U2 = v.p * v.x, G = U2 - K, Gb = G + zins, EU = Gb + afa, db = v.p - v.kv;
        return [
          ['Kalk. Abschreibung = (A0 − Ln) / n', eur(afa)],
          ['Ø gebundenes Kapital = (A0 + Ln) / 2', eur(cap)],
          ['Kalk. Zinsen = Ø Kapital · i', eur(zins)],
          ['Fixkosten gesamt = betr. Fixkosten + AfA + Zinsen', eur(kf)],
          ['Gesamtkosten K = Kf + kv · x', eur(K)],
          ['Stückkosten k = K / x', eur(K / v.x)],
          ['Erlöse U = p · x', eur(U2)],
          ['Gewinn (netto) G = U − K', eur(G)],
          ['Gbrutto = Gnetto + kalk. Zinsen', eur(Gb)],
          ['Rentabilität r = Gbrutto / Ø Kapital', pc(Gb / cap)],
          ['Gewinnschwelle x(BE) = Kf / db', f(kf / db, 0) + ' ME'],
          ['Cashflow EÜ = Gbrutto + kalk. Abschreibung', eur(EU)],
          ['Amortisationsdauer = A0 / EÜ', f(v.a0 / EU, 2) + ' Jahre'],
          ['Umsatzrentabilität = G / U (DuPont-Logik)', pc(G / U2)],
          ['Kapitalumschlag = U / Ø Kapital', f(U2 / cap, 3)],
        ];
      },
    },
    {
      id: 'dyn', title: 'Dynamisch: Kapitalwert, Annuität, interner Zinsfuß', src: 'VL Folie 187–205 (PDF-S. 179–197)',
      inputs: [['a0', 'Anschaffungsauszahlung A0 €', 10000], ['eu', 'konstanter Einzahlungsüberschuss EÜ p. a. €', 2500], ['n', 'Nutzungsdauer n (Jahre)', 4], ['i', 'Kalkulationszins i in %', 6]],
      note: 'Vereinfachte Kapitalwertmethode (konstante EÜ, Ln = 0). Der interne Zinsfuß wird hier numerisch genau berechnet – in der Klausur wird er laut Folie 203/205 NUR näherungsweise über die RBF-Tabelle (A0/EÜ) bestimmt.',
      compute: (v) => {
        const i = v.i / 100, R = rbf(v.n, i), K0 = -v.a0 + v.eu * R;
        let lo = -0.99, hi = 5;
        for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; (-v.a0 + v.eu * rbf(v.n, mid) > 0) ? (lo = mid) : (hi = mid); }
        return [
          ['RBF(n, i) = ((1+i)^n − 1) / (i · (1+i)^n)', f(R, 4)],
          ['Kapitalwert K0 = −A0 + EÜ · RBF', eur(K0)],
          ['Annuität a = K0 / RBF', eur(K0 / R)],
          ['Gesuchter RBF für r: A0 / EÜ', f(v.a0 / v.eu, 4)],
          ['Interner Zinsfuß r (numerisch)', pc(lo)],
          ['Entscheidung', K0 > 0 ? '✅ K0 > 0 bzw. r > i → vorteilhaft' : K0 < 0 ? '❌ K0 < 0 bzw. r < i → unvorteilhaft' : 'indifferent'],
        ];
      },
    },
    {
      id: 'zins', title: 'Auf- und Abzinsen, Rentenbarwert', src: 'VL Folie 187–189 (PDF-S. 179–181)',
      inputs: [['k', 'Betrag (K0 bzw. Kn bzw. Rente R) €', 1000], ['i', 'Zinssatz in %', 10], ['n', 'Jahre n', 3]],
      compute: (v) => {
        const i = v.i / 100, q = Math.pow(1 + i, v.n), R = rbf(v.n, i);
        return [
          ['Aufzinsungsfaktor (1+i)^n', f(q, 6)],
          ['Endwert Kn = K0 · (1+i)^n', eur(v.k * q)],
          ['Abzinsungsfaktor (1+i)^−n', f(1 / q, 6)],
          ['Barwert K0 = Kn · (1+i)^−n', eur(v.k / q)],
          ['Rentenbarwertfaktor RBF', f(R, 6)],
          ['Barwert einer Rente R: R · RBF', eur(v.k * R)],
          ['Annuitätenfaktor = 1 / RBF', f(1 / R, 6)],
          ['Jährliche Annuität aus K0: K0 / RBF', eur(v.k / R)],
        ];
      },
    },
    {
      id: 'skonto', title: 'Lieferantenkredit (Effektivzins)', src: 'VL Folie 207',
      inputs: [['s', 'Skontosatz in %', 3], ['z', 'Zahlungsziel Z (Tage)', 30], ['sf', 'Skontofrist s (Tage)', 5]],
      compute: (v) => {
        const s = v.s / 100;
        return [['i = S / (1 − S) · 360 / (Z − s)', pc((s / (1 - s)) * 360 / (v.z - v.sf))],
          ['Kreditdauer (Z − s)', f(v.z - v.sf, 0) + ' Tage']];
      },
    },
    {
      id: 'steuer', title: 'Steuerbelastung GmbH vs. Personengesellschaft (vereinfacht, Thesaurierung)', src: 'VL Folie 48–55 (PDF-S. 39–46)',
      inputs: [['g', 'Gewinn vor Steuern €', 400000], ['h', 'Hebesatz in %', 500], ['est', 'ESt-Satz Gesellschafter in %', 30]],
      note: 'Vereinfacht wie in der Vorlesung: GewSt = Gewinn · 3,5 % · Hebesatz; KSt 15 %; SolZ 5,5 % auf KSt bzw. ESt; GewSt-Anrechnung auf die ESt max. bis zum 4-fachen Messbetrag; keine Freibeträge.',
      compute: (v) => {
        const mb = v.g * 0.035, gew = mb * v.h / 100, kst = v.g * 0.15, solK = kst * 0.055;
        const anr = Math.min(gew, 4 * mb), est = Math.max(0, v.g * v.est / 100 - anr), solE = est * 0.055;
        return [
          ['Gewerbesteuer-Messbetrag = G · 3,5 %', eur(mb)],
          ['GewSt = Messbetrag · Hebesatz', eur(gew)],
          ['— Kapitalgesellschaft —', ''],
          ['KSt = 15 % von G', eur(kst)],
          ['SolZ = 5,5 % der KSt', eur(solK)],
          ['Gesamtbelastung GmbH (Thesaurierung)', eur(gew + kst + solK) + ' (' + pc((gew + kst + solK) / v.g) + ')'],
          ['— Personengesellschaft/Einzelunternehmen —', ''],
          ['ESt vor Anrechnung', eur(v.g * v.est / 100)],
          ['GewSt-Anrechnung (max. 4 × Messbetrag)', eur(anr)],
          ['ESt nach Anrechnung', eur(est)],
          ['SolZ = 5,5 % der ESt', eur(solE)],
          ['Gesamtbelastung PersG', eur(gew + est + solE) + ' (' + pc((gew + est + solE) / v.g) + ')'],
        ];
      },
    },
    {
      id: 'kalk', title: 'Verkaufspreis per Zuschlagskalkulation', src: 'VL Folie 147 (PDF-S. 139)',
      inputs: [['sk', 'Selbstkosten Sk €/Stück', 313.2], ['g', 'Gewinnaufschlag in %', 10], ['sko', 'Skontosatz in %', 3], ['rab', 'Rabattsatz in %', 10], ['ust', 'Umsatzsteuersatz in %', 19]],
      note: 'Annahme: Skonto und Rabatt werden „im Hundert“ (Division durch 1 − Satz) aufgeschlagen. Die Folie nennt nur die Reihenfolge (Gewinn → Skonto → Rabatt → USt), nicht den genauen Rechenweg – im Zweifel mit der Übungslösung abgleichen.',
      compute: (v) => {
        const bvp = v.sk * (1 + v.g / 100), zvp = bvp / (1 - v.sko / 100), nvp = zvp / (1 - v.rab / 100), br = nvp * (1 + v.ust / 100);
        return [['Barverkaufspreis = Sk · (1 + Gewinnsatz)', eur(bvp)], ['Zielverkaufspreis = BVP / (1 − Skonto)', eur(zvp)],
          ['Nettoverkaufspreis = ZVP / (1 − Rabatt)', eur(nvp)], ['Bruttoverkaufspreis = NVP · (1 + USt)', eur(br)]];
      },
    },
    {
      id: 'liq', title: 'Liquiditätsgrade & Kapitalstruktur', src: 'VL Folie 211–215',
      inputs: [['lm', 'liquide Mittel €', 120000], ['ford', 'kurzfristige Forderungen €', 300000], ['uv', 'Umlaufvermögen €', 960000], ['kfk', 'kurzfristiges FK €', 360000],
        ['ek', 'Eigenkapital €', 1190000], ['fk', 'Fremdkapital €', 1170000], ['lfk', 'langfristiges FK €', 810000], ['av', 'Anlagevermögen €', 1400000]],
      compute: (v) => [
        ['Liquidität 1. Grades = liquide Mittel / kurzfr. FK', pc(v.lm / v.kfk)],
        ['Liquidität 2. Grades = (liq. Mittel + kurzfr. Ford.) / kurzfr. FK', pc((v.lm + v.ford) / v.kfk)],
        ['Liquidität 3. Grades = UV / kurzfr. FK', pc(v.uv / v.kfk)],
        ['Verschuldungsgrad V = FK / EK', pc(v.fk / v.ek)],
        ['Eigenkapitalquote = EK / (EK + FK)', pc(v.ek / (v.ek + v.fk))],
        ['Goldene Bilanzregel: (EK + langfr. FK) / AV ≥ 1', f((v.ek + v.lfk) / v.av, 3) + ((v.ek + v.lfk) / v.av >= 1 ? ' ✅ erfüllt' : ' ❌ verletzt')],
        ['Vertikale Regel (strengste Form): EK ≥ FK', v.ek >= v.fk ? '✅ erfüllt' : '❌ verletzt'],
      ],
    },
    {
      id: 'pers', title: 'Netto-Personalbedarf', src: 'VL Folie 95–96 (PDF-S. 87–88)',
      inputs: [['brutto', 'Brutto-Personalbedarf am Jahresende', 7], ['bestand', 'Personalbestand am Jahresanfang', 5], ['ab', 'Personalabgänge im Jahr', 2], ['zu', 'feststehende Zugänge im Jahr', 1]],
      compute: (v) => {
        const n = v.brutto - v.bestand + v.ab - v.zu;
        return [['Netto-Personalbedarf = Brutto − Bestand + Abgänge − Zugänge', f(n, 0)], ['Bedeutung', n > 0 ? `${n} Person(en) beschaffen` : n < 0 ? `${-n} Person(en) Überhang (Freisetzung)` : 'Bedarf gedeckt']];
      },
    },
  ];

  function calcCard(c) {
    return `<details class="acc" id="calc-${c.id}"><summary>🧮 ${c.title}</summary><div>
      <div class="field-grid">${c.inputs.map(([k, l, d]) => `<label class="field">${l}<input class="input" type="number" step="any" data-k="${k}" value="${d}"></label>`).join('')}</div>
      <div class="table-wrap" style="margin-top:12px"><table><tbody class="out"></tbody></table></div>
      ${c.note ? `<p class="small muted">ℹ️ ${c.note}</p>` : ''}
      <span class="src">${c.src}</span></div></details>`;
  }

  LP.views.tools = {
    render(main, { subject: s }) {
      const formulas = [];
      s.chapters.forEach((c) => (c.formulas || []).forEach((fm) => formulas.push(Object.assign({ c }, fm))));
      main.innerHTML = `
        <div class="page-head"><div><div class="eyebrow">BWL</div><h1>Formeln & Rechner</h1>
        <p>Rechenaufgaben aktiv nachvollziehen – jeder Rechner zeigt den Rechenweg. In der Klausur: Taschenrechner, Formelsammlung und RBF-Tabelle sind erlaubt (Modulhandbuch).</p></div></div>
        <div class="tabs" role="tablist"><button role="tab" data-t="calc" aria-selected="true">Rechner (${CALCS.length})</button><button role="tab" data-t="form" aria-selected="false">Formelsammlung (${formulas.length})</button><button role="tab" data-t="rbf" aria-selected="false">RBF-Tabelle</button></div>
        <div id="tbody"></div>`;
      const body = U.$('#tbody', main);
      const show = (t) => {
        U.$$('.tabs button', main).forEach((b) => b.setAttribute('aria-selected', b.dataset.t === t));
        if (t === 'calc') {
          body.innerHTML = CALCS.map(calcCard).join('');
          CALCS.forEach((c) => {
            const root = U.$('#calc-' + c.id, body);
            const upd = () => {
              const v = {};
              U.$$('input', root).forEach((i) => (v[i.dataset.k] = parseFloat(String(i.value).replace(',', '.')) || 0));
              let rows;
              try { rows = c.compute(v); } catch (e) { rows = [['Fehler', 'Eingaben prüfen']]; }
              U.$('.out', root).innerHTML = rows.map(([a, b]) => (b === '' ? `<tr><th colspan="2">${a}</th></tr>` : `<tr><td>${a}</td><td style="text-align:right"><strong>${b}</strong></td></tr>`)).join('');
            };
            U.$$('input', root).forEach((i) => i.addEventListener('input', upd));
            upd();
          });
        } else if (t === 'form') {
          body.innerHTML = formulas.map((fm) => `<div class="card"><div class="row between"><h3 style="margin:0">${fm.name}</h3><a class="badge primary" href="#/learn/${fm.c.id}">Kap. ${U.esc(fm.c.nr)}</a></div><div class="formula">${fm.f}</div>${fm.note ? `<p class="small muted">${fm.note}</p>` : ''}</div>`).join('');
        } else {
          const is = [0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.15, 0.17, 0.2, 0.25, 0.3];
          body.innerHTML = `<div class="card"><p class="small muted">Rentenbarwertfaktoren RBF(n, i), berechnet mit der Formel aus Folie 188. Entspricht dem Tabellenauszug in Übung Ü 11 (dort auf 2 Stellen gerundet). Interner Zinsfuß: A0/EÜ berechnen und in der Zeile n den nächstgelegenen Wert suchen.</p>
            <div class="table-wrap"><table><thead><tr><th>n \\ i</th>${is.map((i) => `<th>${Math.round(i * 100)} %</th>`).join('')}</tr></thead><tbody>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20].map((n) => `<tr><th>${n}</th>${is.map((i) => `<td>${rbf(n, i).toFixed(2).replace('.', ',')}</td>`).join('')}</tr>`).join('')}
            </tbody></table></div></div>`;
        }
      };
      U.$$('.tabs button', main).forEach((b) => b.addEventListener('click', () => show(b.dataset.t)));
      show('calc');
      const first = U.$('details.acc', body);
      if (first) first.open = true;
    },
  };
})();
