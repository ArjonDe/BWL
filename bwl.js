/**
 * bwl.js – Wissensbasis "Einführung in die BWL" (Prof. Dr. Ines von Weichs / Dr. Petra Sonneborn, FH Südwestfalen).
 * Quelle: ausschließlich Vorlesungsunterlagen (256 S.), Übungen (alt/neu inkl. Moodle-Quizze), Modulhandbuch.
 * "VL Folie x (PDF-S. y)" = Foliennummer und Seite im PDF "Vorlesungsunterlagen Komplett".
 */
(function () {
  'use strict';

  const exam = `
    <p><strong>Form:</strong> 90-minütige Klausur (alternativ mündliche Prüfung). <strong>Hilfsmittel:</strong> Taschenrechner. Zusätzlich werden eine vorher bekannte <strong>Formelsammlung</strong> und eine <strong>RBF-Tabelle</strong> gestellt (Modulhandbuch).</p>
    <p><strong>Bonus:</strong> Über freiwillige Studienleistungen sind maximal 9 Zusatzpunkte möglich (z. B. Referat, Mini-Business-Plan, Glossarbeitrag, Präsentation).</p>
    <p><strong>Ausdrückliche Klausurhinweise aus den Folien:</strong></p>
    <ul>
      <li>Steuern (SolZ usw.) nur in <em>vereinfachter</em> Form, ohne Freibeträge/Gleitzone (Folie 50).</li>
      <li>Interner Zinsfuß nur im einfachen Fall (einmalige Auszahlung, konstante Rückflüsse, kein Restwert) und <em>nur per RBF-Tabelle</em> – keine Interpolation (Folie 203, 205).</li>
      <li>Die Abzinsungstabelle steht in der Klausur <em>nicht</em> zur Verfügung, die RBF-Tabelle schon (Folie 190/191).</li>
    </ul>
    <div class="callout warn"><strong>Datenlage:</strong> In den Unterlagen ist keine BWL-Altklausur enthalten. Die Klausurrelevanz (★) wurde aus Modulhandbuch, Übungsschwerpunkten und den Klausurhinweisen der Folien abgeleitet. Rechenlastig und damit punktestark sind v. a. Produktivität/Wirtschaftlichkeit, Steuerbelastung, Rentabilität/Leverage, Kostenfunktionen/Deckungsbeitrag, statische und dynamische Investitionsrechnung sowie Finanzkennzahlen.</div>`;

  const S = {
    id: 'bwl',
    name: 'Einführung in die BWL',
    short: 'BWL',
    module: 'Modul 582 · 6 CP · Grundlagen des Wirtschaftens',
    examInfo: exam,
    sources: [
      'Vorlesungsunterlagen „Einführung in die BWL“ komplett (256 Seiten, Folien 11–215 und Kapitel 8 Folien 2–40)',
      'Übungen ÜB 1–13 (WS 2025/26) inkl. Moodle-Online-Übungen („Übungen Alt“)',
      'Übungen ÜB 1–4 (WS 26/27) („Übungen Neu“)',
      'Modulhandbuch „Einführung in die BWL“ (Modul 582)',
    ],
    parts: [
      { id: 'A', title: 'Teil A · Grundlagen & konstitutive Entscheidungen' },
      { id: 'B', title: 'Teil B · Ziele, Organisation, Personal, Strategie & Controlling' },
      { id: 'C', title: 'Teil C · Rechnungswesen, Investition & Finanzierung' },
      { id: 'D', title: 'Teil D · Leistungserstellung' },
    ],
    chapters: [
      /* ------------------------------------------------------------------ 1 */
      {
        id: 'b1', nr: '1', part: 'A', relevance: 3, title: 'Grundlagen des Wirtschaftens', src: 'VL Folie 11–31 (PDF-S. 1–22)',
        summary: `<p>Die <strong>Allgemeine BWL</strong> befasst sich mit allen Wirtschaftseinheiten (Betriebe und Haushalte) unabhängig von Branche, Eigentum oder Rechtsform; <strong>spezielle BWLs</strong> mit Themen (Marketing, Controlling, Finanzierung …) oder Betriebsarten (Industrie, Handel, Bank, Handwerk). BWL und VWL bilden die Wirtschaftswissenschaften (Sozialwissenschaften → Geisteswissenschaften → Realwissenschaften).</p>
          <p><strong>Erkenntnisobjekt der BWL</strong> ist das Wirtschaften von Betrieben. Motor sind unbegrenzte <strong>Bedürfnisse</strong> (Empfinden eines Mangels) bei <strong>knappen Gütern</strong>. <em>Wirtschaften</em> heißt, knappe Güter geplant so einzusetzen, dass die Bedürfnisbefriedigung möglichst vorteilhaft erfolgt (Cassel 1923).</p>
          <h3>Menschenbild & Bedürfnisse</h3>
          <p><strong>Homo oeconomicus:</strong> Kunstfigur, die nach maximalem Eigennutz strebt, durch extrinsische Anreize handelt, vollständig informiert ist und nach dem Rationalprinzip entscheidet. Kritik: eindimensional – Menschen handeln oft irrational, Informationen sind meist unvollständig.</p>
          <p><strong>Maslow-Pyramide</strong> (von unten): 1. physiologische Bedürfnisse, 2. Sicherheit, 3. soziale Bedürfnisse, 4. Prestige, 5. Selbstverwirklichung – jede Stufe erst, wenn die darunter befriedigt ist.</p>
          <h3>Güter & Wirtschaftssubjekte</h3>
          <p>Wirtschaftsgüter sind <em>knappe</em> Güter (≠ freie Güter wie Luft, Sonnenlicht). Einteilung: materielle Güter (Produktionsgüter: Potenzialfaktoren/Investitionsgüter und Repetierfaktoren/Werkstoffe; Konsumgüter: Gebrauchs- und Verbrauchsgüter) und immaterielle Güter (Dienstleistungen, Rechte). Weitere Unterteilung: Input- und Outputgüter.</p>
          <p><strong>Haushalte</strong> (private/öffentliche) konsumieren zur Deckung <em>eigener</em> Bedarfe (Konsumptionswirtschaft); <strong>Betriebe</strong> (öffentliche Betriebe, Unternehmen) produzieren und setzen ab zur Deckung <em>fremder</em> Bedarfe (Produktionswirtschaft). <strong>Unternehmen</strong> sind Betriebe in mehrheitlich privatem Eigentum, autonom und meist nach dem erwerbswirtschaftlichen Prinzip (Gewinnmaximierung). Sachleistungsunternehmen (Gewinnung → Aufbereitung → Verarbeitung) und Dienstleistungsunternehmen.</p>
          <p>Das Unternehmen ist ein <strong>offenes, komplexes, dynamisches, autonomes, marktgerichtetes, produktives, soziales System</strong>.</p>
          <h3>Umsatzprozess & ökonomisches Prinzip</h3>
          <p>Güter- und finanzwirtschaftlicher Umsatzprozess: Beschaffung (Ausgaben) von Potenzial-/Repetierfaktoren, Arbeit, Informationen → Transformation/Produktion → Absatz (Einnahmen) über Beschaffungs-, Absatz- sowie Kredit-/Kapitalmarkt. Die Reihenfolge gibt es höchstens bei der Gründung; später laufen die Phasen parallel.</p>
          <p><strong>Ökonomisches Prinzip:</strong> Verhältnis von Output (Ertrag) zu Input (Aufwand) optimieren. Ausprägungen: <strong>Minimumprinzip</strong> (gegebener Output, Input minimieren), <strong>Maximumprinzip</strong> (gegebener Input, Output maximieren), <strong>Optimumprinzip</strong> (beides optimal abstimmen). Gemessen über Effizienz und Effektivität.</p>
          <p>Mindestbedingung unternehmerischer Existenz: langfristig Erträge ≥ Aufwendungen bzw. Einzahlungen ≥ Auszahlungen.</p>
          <h3>Umwelt des Unternehmens</h3>
          <p>Märkte (Absatz, Beschaffung, Wettbewerb), Umweltbereiche (ökonomisch, ökologisch, technologisch, gesellschaftlich) und <strong>Stakeholder</strong> (Anspruchsgruppen): alle Wirtschaftssubjekte, die das Handeln des Betriebes beeinflussen und/oder davon betroffen sind – z. B. Mitarbeiter, Manager, Eigen- und Fremdkapitalgeber (intern bzw. nah), Kunden, Lieferanten, Wettbewerber, Staat & Gesellschaft, Anwohner (extern).</p>`,
        points: [
          'Produktivität = Outputmenge / Inputmenge (mengenmäßig, ohne Bewertung).',
          'Wirtschaftlichkeit = bewerteter Output / bewerteter Input = Ertrag / Aufwand (bzw. Leistung / Kosten).',
          'Eine Gesamtproduktivität gibt es i. d. R. nicht, weil Inputmengen unterschiedliche Dimensionen haben (h, kWh, kg …); eine Gesamtwirtschaftlichkeit schon (alles in €).',
          'Kennzahlen sagen nichts darüber aus, ob das Verhältnis optimal im Sinne des ökonomischen Prinzips ist.',
          'Produktionsfaktoren (Input): Arbeit, Werkstoffe, Betriebsmittel.',
        ],
        defs: [
          ['Wirtschaften', 'Knappe Güter geplant so einsetzen, dass die Bedürfnisbefriedigung in möglichst vorteilhafter Weise erfolgt (Gustav Cassel, 1923).'],
          ['Bedürfnis', 'Empfinden eines Mangels – gleichgültig, ob objektiv vorhanden oder nur subjektiv empfunden.'],
          ['Homo oeconomicus', 'Kunstfigur, die streng rational handelt und ausschließlich auf den eigenen Vorteil bedacht ist.'],
          ['Rationalprinzip', 'Ein Mensch handelt danach, wenn er sich bei der Wahl zwischen Alternativen für die bessere Lösung entscheidet.'],
          ['Wirtschaftsgüter', 'Knappe Güter – im Gegensatz zu freien Gütern wie Luft oder Sonnenlicht.'],
          ['Betrieb', 'Wirtschaftssubjekt, in dem zur Deckung fremder Bedarfe Güter produziert und abgesetzt werden.'],
          ['Haushalt', 'Wirtschaftssubjekt, in dem zur Deckung eigener Bedarfe Güter konsumiert werden.'],
          ['Unternehmen', 'Betrieb in mehrheitlich privatem Eigentum, der autonom und in der Regel nach dem erwerbswirtschaftlichen Prinzip (Gewinnmaximierung) handelt.'],
          ['Ökonomisches Prinzip', 'Verlangt, das Verhältnis aus Produktionsergebnis (Output/Ertrag) und Produktionseinsatz (Input/Aufwand) zu optimieren.'],
          ['Minimumprinzip', 'Gegebener Output soll mit minimalem Input erreicht werden.'],
          ['Maximumprinzip', 'Mit gegebenem Input soll ein maximaler Output erreicht werden.'],
          ['Optimumprinzip', 'Input und Output werden optimal aufeinander abgestimmt.'],
          ['Produktivität', 'Verhältnis zwischen Ausbringungsmenge (Output) und Einsatzmenge (Input).'],
          ['Wirtschaftlichkeit', 'Verhältnis zwischen bewerteter Outputmenge und bewerteter Inputmenge (Ertrag / Aufwand).'],
          ['Teilproduktivität', 'Gesamtoutput (Menge) bezogen auf die Inputmenge eines einzelnen Produktionsfaktors.'],
          ['Gesamtwirtschaftlichkeit', 'Gesamtertrag / Summe der Einzelaufwendungen.'],
          ['Stakeholder (Anspruchsgruppen)', 'Alle Wirtschaftssubjekte, die in Beziehung zum Betrieb stehen und dessen Handeln beeinflussen und/oder von ihm betroffen sind.'],
          ['Markt', 'Alle Wirtschaftssubjekte, die Güter anbieten und nachfragen, die sich gegenseitig ersetzen können.'],
          ['Potenzialfaktoren', 'Produktionsgüter, die längerfristig genutzt werden (Investitionsgüter, z. B. Maschinen).'],
          ['Repetierfaktoren', 'Produktionsgüter, die im Prozess verbraucht werden (Werkstoffe).'],
        ],
        formulas: [
          { name: 'Produktivität', f: 'Produktivität = Outputmenge / Inputmenge', note: 'Folie 26/27' },
          { name: 'Teilproduktivität', f: 'P = Gesamtoutput (Menge) / Input (Menge) des Produktionsfaktors', note: 'Folie 28' },
          { name: 'Wirtschaftlichkeit', f: 'W = bewertete Outputmenge / bewertete Inputmenge = Ertrag / Aufwand', note: 'Folie 27' },
          { name: 'Gesamtwirtschaftlichkeit', f: 'W = Gesamtertrag / Summe der Einzelaufwendungen', note: 'Folie 28' },
          { name: 'Gewinn', f: 'Gewinn = Ertrag − Aufwand', note: 'Folie 26' },
          { name: 'Rentabilität (allgemein)', f: 'Rentabilität = Erfolgsgröße / Basisgröße  (z. B. Gewinn / Eigenkapital)', note: 'Folie 26' },
        ],
        examples: `<h3>Glasmanufaktur Sable GmbH (ÜB 1, Aufg. 6) – 8 h/Tag</h3>
<div class="table-wrap"><table><thead><tr><th>Artikel</th><th>Teilproduktivität Arbeit</th><th>Teilwirtschaftlichkeit Arbeit</th></tr></thead><tbody>
<tr><td>Kugeln (22 Stk, 30 €/h, 25 €)</td><td>22/8 = 2,75 Stk/h</td><td>550 € / 240 € = 2,29</td></tr>
<tr><td>Vasen (18 Stk, 36 €/h, 32 €)</td><td>18/8 = 2,25 Stk/h</td><td>576 € / 288 € = 2,00</td></tr>
<tr><td>Lampen (12 Stk, 42 €/h, 80 €)</td><td>12/8 = 1,50 Stk/h</td><td>960 € / 336 € = 2,86</td></tr></tbody></table></div>
<p>➜ Die Kugeln sind am <em>produktivsten</em>, die Lampen am <em>wirtschaftlichsten</em>. Produktivität allein ist kein Entscheidungskriterium.</p>
<h3>Raps (ÜB 2 neu, Aufg. 4)</h3>
<p>Produktivität Saatgut = 30.000 kg Raps / 40 kg = 750 kg/kg (bzw. 10.000 l / 40 kg = 250 l/kg) · Stickstoffdünger = 30.000 / 2.000 = 15 kg/kg. Gesamtwirtschaftlichkeit = (10.000 l · 4,99 €) / (12.500 € + 25.000 €) = 49.900 / 37.500 ≈ <strong>1,33</strong>. Mit IT-Verfahren (+15 % Ernte, +10.000 € Kosten): Produktivitäten steigen um 15 %, Wirtschaftlichkeit = 57.385 / 47.500 ≈ <strong>1,21</strong> → sinkt, daher nicht empfehlenswert.</p>
<h3>Min- oder Max-Prinzip? (ÜB 1, Aufg. 5)</h3>
<ul><li>Aus 11 t Stahl möglichst viele Werkzeuge → <strong>Maximum</strong></li><li>20.000 Blatt Papier beim preisgünstigsten Lieferanten → <strong>Minimum</strong></li><li>Billigster Dienstleister für 1-kg-Expresssendung → <strong>Minimum</strong></li><li>Mit 1 Mio. € Werbeetat möglichst viele Kunden → <strong>Maximum</strong></li><li>1000 m Elastikband zum günstigsten Preis → <strong>Minimum</strong></li></ul>`,
        focus: ['Produktivität und Wirtschaftlichkeit (Teil- und Gesamtwirtschaftlichkeit) berechnen und interpretieren – Kernaufgabe der Übungen 1 und 2 sowie der Moodle-Quizze.', 'Begründen, warum es keine Gesamtproduktivität gibt.', 'Min-/Max-/Optimumprinzip an Situationen zuordnen.', 'Stakeholder intern/extern benennen.'],
      },
      /* ------------------------------------------------------------------ 1E */
      {
        id: 'b1e', nr: '1E', part: 'A', relevance: 1, title: 'Exkurs: Wirtschaftsordnungen', src: 'VL Folie 33–35 (PDF-S. 23–26)',
        summary: `<p>Jede Wirtschaftsordnung beantwortet drei Fragen: <strong>Was, wie und für wen</strong> soll produziert werden?</p>
          <div class="table-wrap"><table><thead><tr><th></th><th>Zentralverwaltungswirtschaft (Planwirtschaft, Staatseigentum)</th><th>Marktwirtschaft (Privateigentum)</th></tr></thead><tbody>
          <tr><td>Entscheidungen</td><td>zentral, hierarchisch, Verantwortung gegenüber der nächsthöheren Instanz</td><td>dezentral, in eigener Verantwortung, kollegial</td></tr>
          <tr><td>Information & Koordination</td><td>zentraler Volkswirtschaftsplan, zentrale Bürokratie</td><td>dezentrale Wirtschaftspläne, Preissystem (relative Preise)</td></tr>
          <tr><td>Motivation & Sanktion</td><td>soziale Anerkennung, Planerfüllung, Prämiensystem</td><td>Privateigentum, Gewinn und Verlust</td></tr></tbody></table></div>
          <p>Eine <strong>Marktwirtschaft</strong> ist eine auf <strong>Arbeitsteilung</strong> (regional, zwischen- und innerbetrieblich; wirkt produktivitätsfördernd) beruhende <strong>Geldwirtschaft</strong> (Recheneinheit, Tauschmittel) mit prinzipiell <strong>freien Märkten</strong> (Preismechanismus aus Angebot und Nachfrage) und <strong>staatlicher Aktivität</strong> (Rahmen aus Verfassung und Rechtsordnung; Grundprinzipien: freie wirtschaftliche Betätigung, Vertragsfreiheit, freie Preisbildung, Schutz des Privateigentums).</p>
          <p><strong>Soziale Marktwirtschaft</strong> (Deutschland): Vorteile der freien Marktwirtschaft (Leistungsfähigkeit, Güterversorgung) verwirklichen, Nachteile (zerstörerischer Wettbewerb, Machtballung, unsoziale Auswirkungen wie Arbeitslosigkeit) vermeiden – z. B. über Sozialversicherungen. Ordnungspolitischer Grundsatz: Koordination über Märkte, aber <em>Marktkonformität</em> der wirtschaftspolitischen Instrumente.</p>`,
        points: ['Planwirtschaft = Zentralverwaltungswirtschaft.', 'In Marktwirtschaften werden die drei Grundfragen dem Markt überlassen.', 'Staatliche Eingriffe nur, wo der Wettbewerb zu unerwünschten Ergebnissen führt.'],
        defs: [
          ['Zentralverwaltungswirtschaft', 'Wirtschaftsordnung mit Staatseigentum, zentralem Volkswirtschaftsplan und hierarchischen Entscheidungen (Planwirtschaft).'],
          ['Marktwirtschaft', 'Auf Arbeitsteilung beruhende Geldwirtschaft mit prinzipiell freien Märkten und staatlicher Aktivität; Privateigentum.'],
          ['Soziale Marktwirtschaft', 'Will die Vorteile der freien Marktwirtschaft verwirklichen und deren Nachteile (z. B. unsoziale Auswirkungen) vermeiden.'],
          ['Marktkonformität', 'Wirtschaftspolitische Instrumente sollen die Marktprozesse nicht stören.'],
        ],
        focus: ['Unterschiede Plan- vs. Marktwirtschaft tabellarisch wiedergeben.'],
      },
      /* ------------------------------------------------------------------ 2 */
      {
        id: 'b2', nr: '2', part: 'A', relevance: 3, title: 'Konstitutive Entscheidungen: Standort, Rechtsform, Steuern, Zusammenschlüsse', src: 'VL Folie 37–58 (PDF-S. 27–49)',
        summary: `<p><strong>Konstitutive Entscheidungen</strong> sind Führungsentscheidungen von grundlegender Bedeutung, die einmalig oder sehr selten getroffen werden: Standort, Rechtsform, Zusammenschlüsse.</p>
          <h3>Standort</h3>
          <p>Standorte sind geografische Orte, an denen Unternehmen Leistungen herstellen und/oder absetzen. Fragen: Grad der (internationalen) Ausbreitung und Standortanalyse. <strong>Standortfaktoren</strong> sind entscheidungsrelevante Kriterien zur Eignung eines Ortes: arbeits-, material-, absatz-, verkehrs-, immobilien-, umweltschutz- und abgabenbezogene Faktoren, Clusterbildung, rechtliche/politische Faktoren. <strong>Limitationale</strong> Standortfaktoren sind MUSS-Kriterien, <strong>substitutionale</strong> KANN-/Wunschkriterien.</p>
          <p>Ziele: <em>Wachstum</em> (Errichtung/Erweiterung), <em>Strukturveränderung</em> (Aufteilung, Verlagerung, Vereinigung – wegen Arbeits-/Transportkosten, JIT, Wechselkursen, Subventionen, Steuern …), <em>Schrumpfung</em> ((Teil-)Stilllegung).</p>
          <h3>Rechtsform</h3>
          <p>Regelt das Innenverhältnis (Gesellschafter untereinander) und das Außenverhältnis (zu Stakeholdern). Es gilt <strong>Typenzwang</strong>: nur gesetzlich vordefinierte Rechtsformen.</p>
          <ul><li><strong>Einzelunternehmen</strong>: identisch mit natürlicher Person.</li>
          <li><strong>Personengesellschaften</strong> (GbR, OHG, KG, Stille Gesellschaft): wenige Gesellschafter, enge persönliche Beziehung, Einbringung der Arbeitskraft.</li>
          <li><strong>Kapitalgesellschaften</strong> (GmbH, UG haftungsbeschränkt, AG, SE): Körperschaften = juristische Personen; es haftet die Gesellschaft mit ihrem Vermögen.</li>
          <li><strong>Genossenschaften</strong> (eG): offene, wechselnde Mitgliederzahl, gemeinsamer Geschäftsbetrieb; Kapital aus Einlagen der Mitglieder.</li>
          <li><strong>Stiftungen</strong>: rechtlich verselbstständigte Vermögensmassen ohne Eigentümer.</li>
          <li>Mischformen: KGaA, AG & Co. KG, GmbH & Co. KG.</li></ul>
          <div class="table-wrap"><table><thead><tr><th></th><th>Einzelunt.</th><th>OHG</th><th>KG</th><th>GmbH</th><th>AG</th></tr></thead><tbody>
          <tr><td>Rechtsgrundlage</td><td>§§ 1–104a HGB</td><td>§§ 105–160 HGB</td><td>§§ 161–177a HGB</td><td>GmbHG</td><td>AktG</td></tr>
          <tr><td>Eigentümer</td><td>Inhaber</td><td>Gesellschafter</td><td>Komplementäre, Kommanditisten</td><td>Gesellschafter</td><td>Aktionäre</td></tr>
          <tr><td>Mindestanzahl</td><td>1 (höchstens)</td><td>2</td><td>2</td><td>1</td><td>1</td></tr>
          <tr><td>Mindest-EK</td><td>keine Vorschrift</td><td>keine</td><td>keine</td><td><strong>25.000 €</strong></td><td><strong>50.000 €</strong></td></tr>
          <tr><td>Haftung</td><td>unbeschränkt, persönlich</td><td>unbeschränkt, persönlich, solidarisch</td><td>Komplementär unbeschränkt; Kommanditist bis zur Einlage</td><td>beschränkt auf Stammeinlage</td><td>beschränkt auf Kapitaleinlage</td></tr>
          <tr><td>Leitung</td><td>Eigentümer</td><td>alle/einzelne Gesellschafter</td><td>Komplementär(e)</td><td>Geschäftsführer (Weisung der Gesellschafterversammlung)</td><td>Vorstand</td></tr>
          <tr><td>Kontrolle</td><td>Eigentümer</td><td>alle Gesellschafter</td><td>voll: Komplementäre; beschränkt: Kommanditisten</td><td>Gesellschafterversammlung</td><td>Aufsichtsrat; Hauptversammlung beschränkt</td></tr>
          <tr><td>Publizität/Prüfung</td><td colspan="3">nicht erforderlich (Ausnahme Großunternehmen)</td><td>zwingend</td><td>zwingend</td></tr>
          <tr><td>Mitbestimmung</td><td colspan="3">keine</td><td colspan="2">Drittelparität &gt; 500 (&lt; 2.000) Beschäftigte · Unterparität &gt; 2.000 · volle Parität Montan ab 1.000</td></tr>
          <tr><td>Ertragsteuer</td><td colspan="3">ESt (15–45 %), GewSt-Freibetrag 24.500 €</td><td colspan="2">KSt 15 % (Anteilseigner: Abgeltungsteuer 25 %)</td></tr></tbody></table></div>
          <p><strong>Finanzierung:</strong> Einzelunternehmen begrenzt durch Vermögen/Kreditwürdigkeit des Inhabers; OHG besser (mehrere Vollhafter); KG noch besser (Teilhafter bringen Kapital); GmbH: EF-Vorteil Haftungsbeschränkung, FF-Nachteil (Gläubiger verlangen Sicherheiten); AG: kleine EK-Anteile, Börse, Kapitalmarktzugang.</p>
          <p><strong>Gewinnverteilung</strong> (nur bei mehreren Gesellschaftern) nach Gesellschaftsvertrag, sonst nach HGB: Verzinsung der Einlage, Beteiligungsverhältnis, nach Köpfen oder andere Kriterien.</p>
          <h3>Steuern (vereinfacht)</h3>
          <div class="table-wrap"><table><thead><tr><th></th><th>Gewerbesteuer</th><th>Einkommensteuer</th><th>Körperschaftsteuer</th></tr></thead><tbody>
          <tr><td>Steuersubjekt</td><td>jeder Gewerbebetrieb im Inland</td><td>natürliche Personen mit inl. Wohnsitz</td><td>juristische Personen (AG, GmbH, eG) mit Sitz im Inland</td></tr>
          <tr><td>Bemessung</td><td>Gewerbeertrag</td><td>Gesamtbetrag der Einkünfte</td><td>Gewinn aus Gewerbebetrieb</td></tr>
          <tr><td>Tarif</td><td>Messzahl 3,5 % × Hebesatz (ca. 200–500 %)</td><td>progressiv (14–45 %)</td><td>linear 15 %</td></tr></tbody></table></div>
          <p><strong>Solidaritätszuschlag</strong> 5,5 % auf ESt, KSt und Abgeltungsteuer (Freigrenzen nur bei der ESt). <strong>Abgeltungsteuer</strong>: Quellensteuer auf Kapitalerträge, 25 % (+ SolZ, ggf. KiSt) ≈ 28 %. Die GewSt wird bei Personenunternehmen auf die ESt angerechnet (max. bis zum 4-fachen Messbetrag). Kapitalgesellschaften: Belastung bei Thesaurierung = GewSt + KSt + SolZ; bei Ausschüttung zusätzlich AbgSt + SolZ beim Gesellschafter.</p>
          <h3>Unternehmenszusammenschlüsse</h3>
          <p>Verbindung bisher rechtlich und wirtschaftlich selbstständiger Unternehmen (Mergers & Acquisitions). Ziele: Wachstum, Synergieeffekte, Risikostreuung. Kriterien: Produktionsstufe (<strong>horizontal</strong>, <strong>vertikal</strong> – Rückwärts-/Vorwärtsintegration, <strong>lateral</strong>), Dauer, Kooperationsgrad.</p>
          <p><strong>Kooperation</strong>: wirtschaftliche Selbstständigkeit weitgehend, rechtliche ganz erhalten. <strong>Konzentration</strong>: wirtschaftliche (ggf. auch rechtliche) Selbstständigkeit geht verloren. Nach Bindungsintensität (niedrig → hoch): Konsortium → Kartell → Strategische Allianz → Joint Venture → Konzern → Fusion/Merger.</p>`,
        points: [
          'GmbH: Mindeststammkapital 25.000 €; AG: Grundkapital 50.000 €.',
          'Kommanditist haftet nur bis zur Höhe seiner Einlage, Komplementär unbeschränkt.',
          'Gewerbesteuer = Gewinn × 3,5 % × Hebesatz; ihre Höhe ist unabhängig von der Rechtsform.',
          'Der Hebesatz ist ein Standortfaktor (abgabenbezogen) – jede Gemeinde legt ihn fest.',
          'Bei vollständiger Thesaurierung ist im Vorlesungsbeispiel die GmbH steuerlich günstiger als die OHG.',
          'Firma = Name des kaufmännischen Unternehmens (eigentlicher Name + Rechtsformzusatz).',
        ],
        defs: [
          ['Konstitutive Entscheidungen', 'Führungsentscheidungen von grundlegender Bedeutung, die einmalig oder sehr selten zu treffen sind (Standort, Rechtsform, Zusammenschlüsse).'],
          ['Standort', 'Geografischer Ort, an dem ein Unternehmen Leistungen herstellt und/oder absetzt.'],
          ['Standortfaktoren', 'Entscheidungsrelevante Kriterien, anhand derer die Eignung eines Ortes für eine Betriebsstätte überprüft wird.'],
          ['Limitationale Standortfaktoren', 'MUSS-Kriterien der Standortwahl.'],
          ['Substitutionale Standortfaktoren', 'KANN-/Wunschkriterien der Standortwahl, die sich gegenseitig ersetzen können.'],
          ['Typenzwang', 'Betriebe können nur aus bestimmten, gesetzlich vordefinierten Rechtsformen wählen.'],
          ['Personengesellschaft', 'Für wenige Gesellschafter konzipierte Gesellschaftsform mit enger persönlicher Beziehung und fortgesetzter Zugehörigkeit aller Gesellschafter.'],
          ['Kapitalgesellschaft', 'Körperschaft mit eigener Rechtspersönlichkeit für viele Gesellschafter; für Verbindlichkeiten haftet die Gesellschaft mit ihrem Vermögen.'],
          ['Juristische Person', 'Voll rechtsfähige Organisation, die über ihre Organe wie eine natürliche Person am Rechtsverkehr teilnimmt.'],
          ['Genossenschaft', 'Gesellschaft mit offener, wechselnder Mitgliederzahl, die einen wirtschaftlichen Zweck über einen gemeinsamen Geschäftsbetrieb verfolgt.'],
          ['Stiftung', 'Rechtlich verselbstständigte Vermögensmasse mit eigener Rechtspersönlichkeit ohne Eigentümer, die den Stifterzweck dauerhaft fördert.'],
          ['Firma', 'Name eines kaufmännischen Unternehmens, unter dem es Geschäfte betreibt; besteht aus Namen und Rechtsformzusatz.'],
          ['Stammkapital / Grundkapital', 'Bei Gründung gewidmetes Betriebsvermögen einer GmbH bzw. AG.'],
          ['Komplementär', 'Vollhafter einer KG mit Leitungsbefugnis und vollen Kontrollrechten.'],
          ['Kommanditist', 'Teilhafter einer KG, haftet nur bis zur Kapitaleinlage, beschränkte Kontrollrechte.'],
          ['Hebesatz', 'Von der Gemeinde festgelegter Prozentsatz (ca. 200–500 %), mit dem der Steuermessbetrag der Gewerbe- bzw. Grundsteuer vervielfältigt wird.'],
          ['Gewerbesteuer', 'Steuer auf den Gewerbeertrag jedes inländischen Gewerbebetriebs: Messzahl 3,5 % × Hebesatz.'],
          ['Körperschaftsteuer', 'Lineare Steuer von 15 % auf den Gewinn juristischer Personen.'],
          ['Einkommensteuer', 'Progressive Steuer (14–45 %) natürlicher Personen auf den Gesamtbetrag der Einkünfte.'],
          ['Abgeltungsteuer', 'Quellensteuer auf Kapitalerträge von 25 % (zzgl. SolZ, ggf. KiSt).'],
          ['Solidaritätszuschlag', 'Ergänzungsabgabe von 5,5 % auf ESt, KSt und Abgeltungsteuer zur Finanzierung der Wiedervereinigung.'],
          ['Thesaurierung', 'Einbehaltung des Gewinns im Unternehmen (statt Ausschüttung).'],
          ['Unternehmenszusammenschluss', 'Verbindung bisher rechtlich und wirtschaftlich selbstständiger Unternehmen zu größeren Wirtschaftseinheiten (M&A).'],
          ['Kooperation', 'Verbindung, bei der die wirtschaftliche Selbstständigkeit weitgehend und die rechtliche ganz erhalten bleibt.'],
          ['Konzentration', 'Verbindung, bei der die wirtschaftliche (ggf. auch rechtliche) Selbstständigkeit ganz verloren geht.'],
          ['Konsortium', 'Zweckgebundene, (un)befristete Vereinigung selbstständiger Unternehmen in Form einer GbR zur Durchführung eines bestimmten Geschäfts.'],
          ['Kartell', 'Vereinbarung zur Begrenzung des Wettbewerbs; rechtliche Selbstständigkeit bleibt, wirtschaftliche wird eingeschränkt.'],
          ['Strategische Allianz', 'Meist längerfristige vertragliche Partnerschaft zur gemeinsamen Bewältigung strategischer Herausforderungen.'],
          ['Joint Venture', 'Eigenständiges Gemeinschaftsunternehmen, dessen Anteile zu gleichen Teilen von den Gesellschaftsunternehmen gehalten werden.'],
          ['Konzern', 'Zusammenschluss von mindestens zwei rechtlich selbstständig bleibenden Unternehmen unter gemeinsamer Leitung.'],
          ['Fusion (Merger)', 'Völlige Verschmelzung von Unternehmen zu einer neuen wirtschaftlichen Einheit.'],
          ['Horizontaler Zusammenschluss', 'Verbindung von Unternehmen derselben Produktionsstufe.'],
          ['Vertikaler Zusammenschluss', 'Verbindung vor- bzw. nachgelagerter Produktionsstufen (Rückwärts-/Vorwärtsintegration).'],
          ['Lateraler Zusammenschluss', 'Verbindung von Unternehmen unterschiedlicher, nicht verwandter Bereiche.'],
        ],
        formulas: [
          { name: 'Gewerbesteuer (vereinfacht)', f: 'Messbetrag = Gewinn × 3,5 %\nGewSt = Messbetrag × Hebesatz', note: 'Folie 48/49, Lösung Folie 55' },
          { name: 'Steuerbelastung Kapitalgesellschaft (Thesaurierung)', f: 'GewSt + KSt (15 %) + SolZ (5,5 % der KSt)', note: 'Folie 51/55' },
          { name: 'Zusatzbelastung bei Ausschüttung (KapG)', f: 'AbgSt (25 %) + SolZ (5,5 % der AbgSt) auf den Ausschüttungsbetrag', note: 'Folie 51' },
          { name: 'Steuerbelastung Personenunternehmen', f: 'GewSt + [ESt − GewSt-Anrechnung (max. 4 × Messbetrag)] + SolZ (5,5 % der ESt)', note: 'Folie 52/55' },
        ],
        examples: `<h3>Steuerbelastungsvergleich OHG vs. GmbH (Folie 53–55)</h3>
<p>Gewinn 400.000 €, Hebesatz 500 %, A 60 % (ESt 40 %), B 40 % (ESt 30 %), Thesaurierung.</p>
<div class="table-wrap"><table><thead><tr><th>GmbH</th><th>€</th></tr></thead><tbody>
<tr><td>GewSt = 400.000 × 3,5 % × 500 %</td><td>70.000</td></tr><tr><td>KSt 15 %</td><td>60.000</td></tr><tr><td>SolZ 5,5 % der KSt</td><td>3.300</td></tr><tr><th>Gesamt</th><th>133.300</th></tr></tbody></table></div>
<div class="table-wrap"><table><thead><tr><th>OHG</th><th>A</th><th>B</th><th>gesamt</th></tr></thead><tbody>
<tr><td>Gewinnanteil</td><td>240.000</td><td>160.000</td><td>400.000</td></tr>
<tr><td>GewSt</td><td colspan="2"></td><td>70.000</td></tr>
<tr><td>ESt (40 % / 30 %)</td><td>96.000</td><td>48.000</td><td></td></tr>
<tr><td>− GewSt-Anrechnung (4 × 14.000 = 56.000 anteilig)</td><td>−33.600</td><td>−22.400</td><td></td></tr>
<tr><td>= ESt nach Anrechnung</td><td>62.400</td><td>25.600</td><td>88.000</td></tr>
<tr><td>SolZ 5,5 %</td><td>3.432</td><td>1.408</td><td>4.840</td></tr><tr><th>Gesamt</th><th colspan="2"></th><th>162.840</th></tr></tbody></table></div>
<p>➜ Ohne Thesaurierungsbegünstigung ist bei vollständiger Thesaurierung die <strong>GmbH günstiger</strong>.</p>
<h3>Gewinnverteilung (Folie 47)</h3>
<p>Einlagen A 2.000 €, B 3.000 €, C 5.000 €; Gewinn 1.000 €; 4 % Verzinsung (80/120/200 €), Rest 600 € nach Köpfen (je 200 €) → A 280 €, B 320 €, C 400 €.</p>
<h3>GmbH, Gewinn 2 Mio. €, Hebesatz Hagen 520 % (ÜB 3 neu)</h3>
<p>GewSt = 2.000.000 × 3,5 % × 5,2 = 364.000 € · KSt 300.000 € · SolZ 16.500 € → Belastung 680.500 €, im Unternehmen verbleiben <strong>1.319.500 €</strong>. Bei Entnahme/Ausschüttung zusätzlich AbgSt 25 % = 329.875 € + SolZ 18.143,13 € (vereinfacht, ohne KiSt).</p>`,
        focus: ['Steuerbelastung GmbH vs. Personengesellschaft rechnen (ÜB 3) – inkl. GewSt-Anrechnung und SolZ.', 'Rechtsformvergleich KG/GmbH tabellarisch (ÜB 2, Aufg. 6): Eigentümer, Mindestanzahl, Stammkapital, Haftung, Leitung, Publizität.', 'Limitationale vs. substitutionale Standortfaktoren mit Beispielen; Hebesatz als Standortfaktor.', 'Kooperations- und Konzentrationsformen nach Bindungsintensität ordnen.'],
      },
      /* ------------------------------------------------------------------ 3 */
      {
        id: 'b3', nr: '3', part: 'B', relevance: 3, title: 'Unternehmensziele, Zielsystem, Rentabilität & Leverage', src: 'VL Folie 59–73 (PDF-S. 50–65), Folie 1 Herleitung (PDF-S. 256)',
        summary: `<h3>Normativer Rahmen</h3>
          <p>Er schränkt durch Wertesystem und Mission den Handlungsspielraum sinnvoll ein und gibt durch Vision und Zielsystem Orientierung. Bestandteile: <strong>Unternehmensidentität (Corporate Identity)</strong>, <strong>Vision</strong>, <strong>Mission</strong>, <strong>Unternehmensgrundsätze</strong>, <strong>Zielsystem</strong>.</p>
          <ul><li><strong>Vision:</strong> realistisches, glaubwürdiges, erreichbares Zukunftsbild – nah genug, um die Realisierbarkeit zu sehen, fern genug für Begeisterung (BCG). Bsp.: Microsoft „A computer on every desk and in every home“.</li>
          <li><strong>Mission:</strong> Zweck und Gegenstand des gegenwärtigen Handelns. Bsp. Google: „to organize the world’s information and make it universally accessible and useful.“</li>
          <li><strong>Corporate Identity</strong> = Unternehmenspersönlichkeit; Identitätsmix aus Corporate Design, Corporate Behaviour, Corporate Communication.</li></ul>
          <p><strong>Zielhierarchie:</strong> Vision/Mission → Ziele → Strategien → Maßnahmen (steigender Operationalisierungsgrad); Ebenen: Unternehmen → strategische Geschäftseinheiten → operative Ebene (Funktionen, Prozesse).</p>
          <h3>Ziele</h3>
          <p>Handlungsziele: Finanz-, Produkt-/Markt-, soziale, Macht-/Prestige- und ökologische Ziele. Prozess der Zielplanung: Zielsuche → Operationalisierung → Zielanalyse/-ordnung → Prüfung der Realisierbarkeit → Zielentscheidung → Durchsetzung → Überprüfung/Revision.</p>
          <p><strong>Operationalisierung</strong> (Anforderungen an Ziele): <em>Inhalt</em> (was? qualitativ/quantitativ), <em>Ausmaß</em> (wie viel? Punkt-, Intervall-, Extremierungsziel), <em>Zeitbezug</em> (wann? Zeitpunkt- oder Zeitraumziel).</p>
          <p><strong>Zielbeziehungen:</strong> Komplementarität (Erreichung eines Ziels fördert ein anderes), Konflikt (behindert ein anderes), Neutralität (keine Auswirkung). Ein <strong>Zielsystem</strong> ist eine geordnete Gesamtheit von Zielen (Ordnung = Zielgewichtung + Zielhierarchie).</p>
          <p><strong>Formalziele (Erfolgsziele):</strong> Produktivität, Wirtschaftlichkeit, Rentabilität und Gewinn. <strong>Sachziele:</strong> Leistungsziele (Markt, Produkt), Finanzziele (Liquidität, Kapitalbeschaffung, Kapital-/Vermögensstruktur), Führungs- und Organisationsziele, soziale und ökologische Ziele.</p>
          <h3>Rentabilität</h3>
          <p>Gewinnziele absolut (Ertrag − Aufwand bzw. Umsatz − Kosten) oder relativ (Rentabilität = Gewinn / eingesetztes Kapital). Die Rentabilität zeigt, wie sich das eingesetzte Kapital in einer Zeitspanne verzinst hat.</p>
          <h3>Financial Leverage</h3>
          <p>Hebelwirkung des Fremdkapitals: Solange die Gesamtkapitalrentabilität den FK-Zins übersteigt (<strong>r(GK) &gt; i</strong>), steigt die Eigenkapitalrentabilität mit zunehmendem Verschuldungsgrad V = FK/EK. Ist <strong>r(GK) &lt; i</strong>, wirkt der Hebel negativ – bis zum vollständigen Verzehr des EK. Grenzen: mit steigender Verschuldung wachsen Risiko und verlangte Zinsen.</p>`,
        points: [
          'Gbrutto = Gewinn vor FK-Zinsen; Gnetto = Gbrutto − FK · i.',
          'r(EK) = Gnetto / EK; r(GK) = Gbrutto / GK = (Gnetto + FK · i) / (EK + FK).',
          'Leverage-Formel: r(EK) = r(GK) + (r(GK) − i) · V.',
          'Ändert sich nur der FK-Zins, bleibt r(GK) gleich – r(EK) ändert sich (sinkender Zins → steigende r(EK)).',
          'Positiver Klammerausdruck (r(GK) > i) → Hebel nach oben; negativer → Hebel nach unten.',
        ],
        defs: [
          ['Normativer Rahmen', 'Schränkt durch Wertesystem und Mission den Handlungsspielraum ein und gibt durch Vision und Zielsystem Orientierung.'],
          ['Vision', 'Generelle unternehmerische Leitidee mit realistischen, glaubwürdigen Aussagen über eine anzustrebende, erreichbare Zukunft.'],
          ['Mission', 'Beschreibt Zweck und Gegenstand des gegenwärtigen unternehmerischen Handelns.'],
          ['Unternehmensgrundsätze', 'Grundwerte und Grundsätze des unternehmerischen Handelns.'],
          ['Corporate Identity', 'Unternehmenspersönlichkeit (intern und extern); Identitätsmix aus Corporate Design, Behaviour und Communication.'],
          ['Zielsystem', 'Geordnete Gesamtheit von Zielen, wobei Ordnung Zielgewichtung und Zielhierarchie bedeutet.'],
          ['Zielhierarchie', 'Mittel-Zweck-Beziehung von Zielen: Ober-, Zwischen- und Unterziele.'],
          ['Zielgewichtung', 'Festlegung von Prioritäten und Rangordnungen zur Lösung von Zielkonflikten.'],
          ['Zielkomplementarität', 'Die Erreichung eines Ziels bedeutet zugleich eine bessere Erfüllung eines anderen Ziels.'],
          ['Zielkonflikt', 'Die Erreichung eines Ziels wirkt sich negativ auf die Erfüllung eines anderen Ziels aus.'],
          ['Zielneutralität', 'Die Erreichung eines Ziels hat keine Auswirkung auf ein anderes Ziel.'],
          ['Zieloperationalisierung', 'Konkretisierung eines Ziels nach Inhalt, Ausmaß und Zeitbezug.'],
          ['Formalziele', 'Erfolgsziele: Produktivität, Wirtschaftlichkeit, Rentabilität und Gewinn.'],
          ['Sachziele', 'Ziele bezogen auf betriebliche Tätigkeiten: Leistungs-, Finanz-, Führungs-/Organisations-, soziale und ökologische Ziele.'],
          ['Rentabilität', 'Gibt an, in welcher Höhe sich das eingesetzte Kapital während einer bestimmten Zeitspanne verzinst hat.'],
          ['Eigenkapitalrentabilität', 'r(EK) = Nettogewinn / Eigenkapital.'],
          ['Gesamtkapitalrentabilität', 'r(GK) = Bruttogewinn / Gesamtkapital.'],
          ['Leverage-Effekt', 'Hebelwirkung des Fremdkapitals: Mit mehr FK kann unter günstigen Bedingungen (r(GK) > i) die Eigenkapitalrentabilität erhöht werden.'],
          ['Verschuldungsgrad', 'V = Fremdkapital / Eigenkapital.'],
          ['Bruttogewinn', 'Gewinn vor Abzug der Fremdkapitalzinsen.'],
          ['Nettogewinn', 'Gewinn nach Abzug der Fremdkapitalzinsen.'],
        ],
        formulas: [
          { name: 'Gewinn', f: 'Gewinn = Umsatz − Kosten   (Umsatz = Verkaufsmenge × Verkaufspreis)', note: 'Folie 69' },
          { name: 'Rentabilität', f: 'Rentabilität = Gewinn / Ø eingesetztes Kapital [%]', note: 'Folie 69' },
          { name: 'Eigenkapitalrentabilität', f: 'r(EK) = Gnetto / EK = (Gbrutto − FK · i) / EK', note: 'Folie 70' },
          { name: 'Gesamtkapitalrentabilität', f: 'r(GK) = Gbrutto / GK = (Gnetto + FK · i) / (EK + FK)', note: 'Folie 70' },
          { name: 'Leverage-Formel', f: 'r(EK) = r(GK) + (r(GK) − i) · V   mit V = FK / EK', note: 'Folie 71, Herleitung PDF-S. 256' },
          { name: 'Eigenkapitalquote', f: 'EKQ = EK / GK', note: 'Folie 71/212' },
        ],
        examples: `<h3>Leverage-Tabelle (Folie 72)</h3>
<div class="table-wrap"><table><thead><tr><th>V</th><th>0</th><th>1</th><th>2</th><th>3</th><th>8</th><th>10</th><th>20</th></tr></thead><tbody>
<tr><td>r(GK) 10 %, i 5 % → r(EK)</td><td>10 %</td><td>15 %</td><td>20 %</td><td>25 %</td><td>50 %</td><td>60 %</td><td>110 %</td></tr>
<tr><td>r(GK) 3 %, i 8 % → r(EK)</td><td>3 %</td><td>−2 %</td><td>−7 %</td><td>−12 %</td><td>−37 %</td><td>−47 %</td><td>−97 %</td></tr></tbody></table></div>
<h3>Wohnimmobilie 500.000 €, Gbrutto 50.000 €, i = 8 % (Folie 73)</h3>
<p>Alt. 1: EK 500.000 → r(EK) = r(GK) = 10 % · Alt. 2: EK 200.000, FK 300.000 (V = 1,5), Zinsen 24.000 → r(EK) = 26.000/200.000 = 13 % · Alt. 3: EK 125.000, FK 375.000 (V = 3), Zinsen 30.000 → r(EK) = 20.000/125.000 = <strong>16 %</strong> (beste). Risiko: Sinkt Gbrutto unter 40.000 €, ist r(GK) &lt; 8 % und der Hebel wirkt negativ.</p>
<h3>Restaurant „Oregano“ (ÜB 4)</h3>
<p>GK 5,6 Mio., FK 3 Mio. zu 6 %, EK 2,6 Mio. (V ≈ 1,15). Gnetto = 1,5 Mio. − 1,4 Mio. = 100.000 €; Gbrutto = 100.000 + 180.000 = 280.000 € → r(GK) = 5 %, r(EK) ≈ 3,85 % (negativer Hebel, da 5 % &lt; 6 %). KfW 4,5 %: r(EK) = 145.000/2,6 Mio. ≈ 5,58 %. FK 4 Mio. (EK 1,6 Mio., V = 2,5): r(EK) = 5 + (5 − 4,5) · 2,5 = <strong>6,25 %</strong>. Bei halbiertem Gbrutto (140.000): r(GK) = 2,5 %, r(EK) = 2,5 + (2,5 − 4,5) · 2,5 = <strong>−2,5 %</strong>.</p>`,
        focus: ['Rentabilitätstabellen (GK, EK, FK, V, Zinsen, Gnetto, Gbrutto, r(GK), r(EK)) vervollständigen – Moodle-Quiz „Rentabilität“, ÜB 4/5.', 'Leverage-Formel anwenden und Chancen/Risiken erklären.', 'Ziele SMART-artig nach Inhalt, Ausmaß, Zeitbezug formulieren; Zielbeziehungen mit Beispiel.'],
      },
      /* ------------------------------------------------------------------ 4 */
      {
        id: 'b4', nr: '4.1', part: 'B', relevance: 2, title: 'Organisation', src: 'VL Folie 75–87 (PDF-S. 66–79)',
        summary: `<p>Mit zunehmender <strong>Arbeitsteilung</strong> (Spezialisierung) steigt die Produktivität – aber auch Abhängigkeiten und Komplexität (Abstimmung). Grenzen: Koordinationskosten, Technik, Folgeschäden durch Monotonie.</p>
          <p><strong>Organisieren</strong> heißt, die Gesamtaufgabe des Unternehmens in Teilaufgaben zu gliedern und diese zueinander in Beziehung zu setzen, damit die Ziele optimal erreicht werden (Thommen).</p>
          <h3>Analyse-Synthese-Konzept</h3>
          <p>Aufgabe → Aufgabenanalyse / Arbeitsanalyse → Aufgabensynthese (Stellen, Abteilungen → <strong>Aufbauorganisation</strong>, Darstellung im Organigramm) bzw. Arbeitssynthese (→ <strong>Ablauforganisation</strong>, Darstellung in Prozessketten).</p>
          <h3>Ablauforganisation – Wertkette</h3>
          <p><strong>Primärprozesse</strong> (direkte Leistungsprozesse, unmittelbar wertschöpfend): Eingangslogistik, Produktion, Ausgangslogistik, Marketing & Vertrieb, Kundendienst. <strong>Sekundärprozesse</strong> (indirekt, sichern die Betriebsbereitschaft): Unternehmensinfrastruktur, Personalwirtschaft, Technologieentwicklung, Beschaffung.</p>
          <h3>Aufbauorganisation</h3>
          <p><strong>Organisationseinheiten</strong> entstehen durch dauerhafte Zuordnung von Teilaufgaben zu Personen. Merkmale: dauerhafte Aufgabenbündelung, versachlichter Personenbezug, Kompetenz- und Verantwortungszuweisung. <strong>Leitungstiefe</strong> = Anzahl Hierarchieebenen unterhalb einer Instanz; <strong>Leitungsspanne</strong> = Anzahl direkt unterstellter Mitarbeiter.</p>
          <ul><li><strong>Einliniensystem:</strong> Einheit der Auftragserteilung – Anweisungen nur von der direkt vorgesetzten Stelle; Dienstweg; Fayolsche Brücken für Querkommunikation. Mit Stäben = <em>Stabliniensystem</em>. Nachteil: lange Dienstwege, Belastung der Instanzen. V. a. in kleineren Betrieben.</li>
          <li><strong>Mehrliniensystem:</strong> Prinzip der Mehrfachunterstellung und des kürzesten Weges (Spezialisierung der Instanzen). Nachteil: Aufgabenüberschneidungen, Kompetenzstreitigkeiten.</li></ul>
          <p><strong>Strukturierungsformen:</strong> <em>funktional</em> (verrichtungsorientiert: Beschaffung, Produktion, Vertrieb …), <em>divisional/Sparten</em> (objektorientiert: Produkte/Produktgruppen/Kunden, z. B. PKW, LKW, Motorräder), <em>regional</em> (Absatzmärkte: Europa, Asien, USA). <strong>Matrix-Organisation</strong>: mehrdimensional auf Basis des Mehrliniensystems; an den Schnittstellen treffen Funktions- und Sparteninstanzen gleichberechtigt zusammen; Vorteil kurze Kommunikationswege, Nachteil Kompetenzunklarheiten/Konflikte durch Doppelunterstellung (ab drei Dimensionen: Tensororganisation).</p>
          <p><strong>Neuere Formen</strong> (Trend: anpassungsfähiger, weniger Hierarchie): modulare, virtuelle und vernetzte Organisation – je nach Komplexität/Dynamik des Marktes und Neuartigkeit der Produkte. <strong>Informelle Organisation</strong>: neben (komplementär) oder anstelle (substituierend) der formalen Strukturen; Ursachen: Sympathie, gemeinsame Interessen, Status, Aufgabe, Arbeitsbedingungen.</p>`,
        points: ['Aufbau = Stellen/Abteilungen (Organigramm); Ablauf = Prozesse (Prozessketten).', 'Mehrliniensystem basiert auf Mehrfachunterstellung und kürzestem Weg.', 'Divisional = objektorientiert, funktional = verrichtungsorientiert.'],
        defs: [
          ['Organisieren', 'Gliederung der Gesamtaufgabe in Teilaufgaben und deren In-Beziehung-Setzen, damit die Unternehmensziele optimal erreicht werden.'],
          ['Arbeitsteilung', 'Spezialisierung auf Teilaufgaben; steigert die Produktivität, erhöht aber Abhängigkeiten und Komplexität.'],
          ['Aufbauorganisation', 'Gliederung des Unternehmens in Stellen und Abteilungen (Darstellung im Organigramm).'],
          ['Ablauforganisation', 'Gestaltung der Arbeitsprozesse (Darstellung in Prozessketten).'],
          ['Aufgabenanalyse / Aufgabensynthese', 'Zerlegung der Gesamtaufgabe in Teilaufgaben bzw. deren Zusammenfassung zu Stellen und Abteilungen.'],
          ['Primärprozesse', 'Marktprozesse, unmittelbar an der Wertschöpfung beteiligt (Logistik, Produktion, Vertrieb, Service).'],
          ['Sekundärprozesse', 'Prozesse, die die Betriebsbereitschaft sichern und Primärprozesse unterstützen (Planung, Beschaffung, Wartung, Finanzen).'],
          ['Organisationseinheit', 'Organisatorisches Element, das durch dauerhafte Zuordnung von Teilaufgaben auf eine oder mehrere Personen entsteht.'],
          ['Leitungstiefe', 'Anzahl der Hierarchieebenen unterhalb einer Instanz.'],
          ['Leitungsspanne', 'Anzahl der einer Instanz direkt unterstellten Mitarbeiter.'],
          ['Einliniensystem', 'Prinzip der Einheit der Auftragserteilung: Anweisungen nur von der direkt vorgesetzten Stelle.'],
          ['Stabliniensystem', 'Einliniensystem, bei dem Leitungsstellen Stäbe als Leitungshilfsstellen zugeordnet sind.'],
          ['Fayolsche Brücke', 'Direkte Querkommunikation zwischen Organisationseinheiten im Einliniensystem.'],
          ['Mehrliniensystem', 'Prinzip der Mehrfachunterstellung und des kürzesten Weges: mehrere Vorgesetzte mit fachlich begrenzter Weisungsbefugnis.'],
          ['Funktionale Organisation', 'Verrichtungsorientierte Gliederung der zweiten Ebene nach Funktionsbereichen (Beschaffung, Produktion, Vertrieb).'],
          ['Divisionale Organisation (Spartenorganisation)', 'Objektorientierte Gliederung der zweiten Ebene nach Produkten, Produktgruppen oder Kunden.'],
          ['Regionalorientierte Organisation', 'Gliederung der zweiten Ebene nach Regionen bzw. Absatzmärkten.'],
          ['Matrix-Organisation', 'Mehrdimensionale Organisationsform auf Basis des Mehrliniensystems, in der sich Funktions- und Spartenzuständigkeiten kreuzen.'],
          ['Modulare Organisation', 'Ergebnisverantwortliche, kleine, stark marktorientierte Organisationseinheiten (Dezentralisierung).'],
          ['Informelle Organisation', 'Neben oder anstelle der formalen Organisation entstehende Strukturen (Sympathie, Interessen, Status …).'],
        ],
        focus: ['Ein- vs. Mehrliniensystem mit Vor- und Nachteilen.', 'Organisationsform an Organigrammen bestimmen (ÜB 5: BVB, ThyssenKrupp – Grafiken nur in Moodle).', 'Aufbau- vs. Ablauforganisation unterscheiden.'],
        missing: 'Die Organigramme aus ÜB 5 (BVB 09, ThyssenKrupp) liegen nur als Bilder vor und sind nicht als Text auswertbar.',
      },
      /* ------------------------------------------------------------------ 4.2 */
      {
        id: 'b4p', nr: '4.2', part: 'B', relevance: 2, title: 'Personalmanagement', src: 'VL Folie 89–102 (PDF-S. 80–94)',
        summary: `<p>Gegenstand ist die Planung, Beschaffung und Gestaltung des Einsatzes der Beschäftigten (HR-Management). <strong>Ziele:</strong> Sachziele (ausreichende Anzahl, angemessene Qualifikation, richtige Zeit, richtiger Ort), Formalziele (Kosten, Arbeitsleistung), Sozialziele (Bedürfnisse und Interessen der Beschäftigten).</p>
          <p><strong>Personal als Leistungs- vs. Kostenfaktor:</strong> Werkstoffe und Betriebsmittel kann jeder zu ähnlichen Bedingungen kaufen – Wettbewerbsvorsprung gewinnt man am ehesten durch hochqualifizierte, motivierte Beschäftigte. Aber: Qualität hat ihren Preis.</p>
          <p><strong>Handlungsrahmen eingeschränkt</strong> durch Einschränkung der Vertragsfreiheit (Gesetze), Fachkräftemangel (geburtenschwache Jahrgänge, steigende Qualifikationsanforderungen) und eingeschränkte Flexibilität (Konjunktur, Kündigungsschutz).</p>
          <p><strong>Regelungsebenen:</strong> kollektives Arbeitsrecht – staatliche Ebene (Arbeitszeit, Urlaub, Altersversorgung, Entgeltfortzahlung, Arbeitssicherheit), bestimmte Gruppen (Tarifverträge, Schutz von Jugendlichen, Schwangeren, Behinderten), betriebliche Ebene (Arbeitszeitlage, Entlohnungsgrundsätze, Akkord-/Prämiensätze); individuelles Arbeitsrecht – Arbeitsvertrag.</p>
          <p><strong>Gesetzliche Beispiele (Folie 93):</strong> Mindestlohn 12,41 €/h · Mindesturlaub 24 Werktage bei 6-Tage-Woche (sonst 20) · Arbeitszeit durchschnittlich 8 h/Tag, max. 10 h · Kündigungsfrist mind. 4 Wochen · Lohnfortzahlung bei Krankheit 6 Wochen.</p>
          <h3>Aufgaben</h3>
          <p>Personalbeschaffung (quantitative und qualitative Bedarfsermittlung, Suche, Auswahl) · Personaleinsatz (Einarbeitung, Arbeitsbedingungen, Arbeitszeit, Vergütung, Führung, Verwaltung) · Personalbeurteilung · Personalentwicklung · Personalfreisetzung.</p>
          <p><strong>Stellenbeschreibung</strong> (personenunabhängig): beschreibt Führungs- und Leistungsanforderungen einer Stelle und ihre Einordnung in die Organisation → macht den qualitativen Bedarf deutlich.</p>
          <h3>Arbeitsleistung</h3>
          <p>Bestimmt durch <strong>Leistungsvermögen</strong> (SKILL: Leistungsfähigkeit aus Anlagen + Wissen; Leistungsdisposition je nach Tagesrhythmus, Gesundheit, Ermüdung), <strong>Leistungsbereitschaft/Motivation</strong> (WILL) und <strong>Leistungsbedingungen</strong> (Arbeitsinhalt, Arbeitsplatz, Arbeitsumfeld).</p>
          <p><strong>Vergütung:</strong> Direktvergütung + Personalnebenkosten; Stücklohn vs. Zeitlohn; Prämien, Leistungszulagen, Erfolgsbeteiligungen.</p>
          <h3>Führungsstile</h3>
          <p>Führungsstil = langfristig relativ stabiles Verhalten eines Vorgesetzten, unabhängig von der Situation; Merkmale: Taktik der Willensdurchsetzung, Ausmaß der Partizipation, Art der Kontrolle. Kontinuum (Tannenbaum/Schmidt) von <strong>autoritär</strong> (despotisch, patriarchalisch) bis <strong>kooperativ</strong> (partizipativ, demokratisch). Einen „richtigen“ Stil gibt es nicht – <em>situativer Ansatz</em>.</p>
          <p><strong>Skill-Will-Matrix</strong> (Folie 102): niedriger Wille & niedrige Fähigkeit → <em>Anweisen</em>; hoher Wille & niedrige Fähigkeit → <em>Führen</em>; niedriger Wille & hohe Fähigkeit → <em>Begeistern</em>; hoher Wille & hohe Fähigkeit → <em>Delegieren</em>.</p>`,
        points: ['Netto-Personalbedarf = Brutto-Bedarf Jahresende − Bestand Jahresanfang + Abgänge − feststehende Zugänge.', 'Arbeitszeit = Zeit vom Beginn bis zum Ende der Arbeit ohne Ruhepausen.'],
        defs: [
          ['Personalmanagement', 'Planung, Beschaffung und Gestaltung des Einsatzes der Beschäftigten eines Unternehmens (HR-Management).'],
          ['Quantitativer Personalbedarf', 'Wie viele Mitarbeiter in den Organisationseinheiten in der Planperiode benötigt werden.'],
          ['Qualitativer Personalbedarf', 'Welchen Anforderungen die Mitarbeiter in der Planperiode genügen müssen.'],
          ['Netto-Personalbedarf', 'Bis zum Jahresende zu beschaffende Personen (bzw. negativ: freizusetzender Überhang).'],
          ['Stellenbeschreibung', 'Personenunabhängige Beschreibung der Führungs- und Leistungsanforderungen einer Stelle und ihrer Einordnung in die Organisation.'],
          ['Leistungsvermögen (Skill)', 'Leistungsfähigkeit (Anlagen + erworbenes Wissen) und Leistungsdisposition (Tagesform).'],
          ['Leistungsbereitschaft (Will)', 'Wille der Beschäftigten, ihr Leistungsvermögen einzubringen (Motivation).'],
          ['Führungsstil', 'Langfristig relativ stabiles, situationsunabhängiges Verhalten eines Vorgesetzten.'],
          ['Autoritärer Führungsstil', 'Vorgesetzter entscheidet und ordnet an (Entscheidungsspielraum beim Vorgesetzten).'],
          ['Kooperativer Führungsstil', 'Gruppe wird beteiligt bis hin zur Entscheidung durch die Gruppe (partizipativ, demokratisch).'],
          ['Situativer Ansatz', 'Führungsstil wird an Aufgabe, Organisationsstruktur und Personen angepasst.'],
          ['Skill-Will-Matrix', 'Ordnet je nach Fähigkeit und Wille die Führungsaufgabe zu: Anweisen, Führen, Begeistern, Delegieren.'],
          ['Tarifvertrag', 'Vereinbarung zwischen Arbeitgeber(verband) und Gewerkschaft u. a. über Entlohnung und Urlaub einer Branche.'],
        ],
        formulas: [{ name: 'Netto-Personalbedarf', f: 'Brutto-Personalbedarf (Jahresende)\n− Personalbestand (Jahresanfang)\n+ Personalabgänge\n− feststehende Personalzugänge\n= Netto-Personalbedarf (bzw. −Überhang)', note: 'Folie 95' }],
        examples: `<p><strong>Speedy GmbH (Folie 96):</strong> Bedarf 7, Bestand 5, Abgänge 2 (Vorruhestand, Wechsel in andere Gruppe), Zugang 1 (Studentin) → 7 − 5 + 2 − 1 = <strong>3</strong> Personen.</p>
<p><strong>Dachdecker-Arbeitsvertrag (Folie 93):</strong> 12 €/h, 12 h/Tag, kein Urlaub, keine Entgeltfortzahlung, Kündigungsfrist 2 Tage verstößt gegen Mindestlohn/Tarif (16 €), Arbeitszeitgesetz (max. 10 h), Bundesurlaubsgesetz, Entgeltfortzahlungsgesetz (6 Wochen) und § 622 BGB (4 Wochen).</p>`,
        focus: ['Netto-Personalbedarf berechnen.', 'Bestimmungsfaktoren der Arbeitsleistung; Führungsstile und Skill-Will-Matrix (ÜB 5).'],
      },
      /* ------------------------------------------------------------------ 5 */
      {
        id: 'b5', nr: '5', part: 'B', relevance: 2, title: 'Strategische Planung & Controlling', src: 'VL Folie 104–117 (PDF-S. 95–109)',
        summary: `<p>Eine <strong>Strategie</strong> ist das rational geplante Entscheidungs-, Maßnahmen- und Verhaltensbündel zur langfristigen Sicherung des Unternehmenserfolgs. <strong>Strategische Planung</strong> stimmt Umweltanforderungen mit Unternehmenspotenzialen ab. Prozess: Zielbildung → Umweltanalyse → Unternehmensanalyse → Strategiewahl → Implementierung (mit Rückkopplung).</p>
          <h3>Tools</h3>
          <ul><li><strong>PESTEL</strong> (Umweltanalyse): Political, Economical, Social, Technological, Environmental, Legal.</li>
          <li><strong>Wertkette nach Porter</strong> (Unternehmensanalyse): alle Prozesse hinsichtlich ihres Einflusses auf die Gewinnspanne; Steigerung durch niedrigere Kosten oder Differenzierung in strategisch relevanten Aktivitäten.</li>
          <li><strong>SWOT</strong>: interne Stärken/Schwächen + externe Chancen/Risiken.</li>
          <li><strong>GAP-Analyse</strong>: strategische Lücke zwischen Zielgröße (z. B. Umsatz, Gewinn) und erwarteter Entwicklung im Zeitverlauf.</li>
          <li><strong>Ansoff-Matrix</strong> (Wachstum): bestehende Produkte/Märkte → Marktdurchdringung; neue Märkte → Marktentwicklung; neue Produkte → Produktentwicklung; beides neu → Diversifikation.</li>
          <li><strong>Porter-Wettbewerbsstrategien</strong>: Kostenführerschaft (Kostenvorsprung, branchenweit), Differenzierung (Einzigartigkeit aus Käufersicht, branchenweit), Fokus (Beschränkung auf ein Segment).</li></ul>
          <h3>Controlling</h3>
          <p>Das <strong>Controlling</strong> koordiniert sämtliche Planungs-, Kontroll- und Informationsaktivitäten zur Unternehmenssteuerung („Lotse der Zielerreichung“). Aufgaben: Transparenz, unternehmensweite Koordination von Plänen und Berichten, Informationsversorgung, interne Beratung. Management verantwortet Inhalte und Entscheidungen; Controlling gestaltet und koordiniert die Planungs- und Kontrollprozesse (Führungsprozess: Planen → Entscheiden → Realisieren → Kontrollieren).</p>
          <p><strong>Kontrolle</strong>: systematische Ermittlung und Analyse von Abweichungen zwischen Soll und Wird/Ist (Beobachtungs-/Abbildungs-, Beurteilungs-, Präventivfunktion). <strong>Berichte</strong>: das richtige Maß an Informationen zur rechten Zeit am richtigen Ort – Standard-, Abweichungs- und Bedarfsberichte.</p>
          <p><strong>Kennzahlen</strong>: absolute (Einzelkennzahlen, Summen, Differenzen, Mittelwerte) und Verhältniskennzahlen (Gliederungs-, Beziehungs-, Indexkennzahlen). Einzelkennzahlen sind begrenzt aussagekräftig → Kennzahlensysteme. Ältestes: <strong>DuPont-System</strong> (1919): ROI = Umsatzrentabilität × Kapitalumschlag.</p>`,
        points: ['ROI = (Gewinn / Umsatz) × (Umsatz / Gesamtkapital).', 'Umsatzrentabilität: Gewinn je Umsatz; Kapitalumschlag: wie oft das Kapital durch den Umsatz umgeschlagen wird.', 'Discounter: niedrige Umsatzrentabilität, hoher Kapitalumschlag; Luxusyachten: umgekehrt (ÜB 6).'],
        defs: [
          ['Strategie', 'Rational geplantes Entscheidungs-, Maßnahmen- und Verhaltensbündel zur langfristigen Sicherung des Unternehmenserfolgs.'],
          ['Strategische Planung', 'Informationsverarbeitender Prozess zur Abstimmung von Umweltanforderungen mit Unternehmenspotenzialen.'],
          ['PESTEL-Analyse', 'Umweltanalyse nach politischen, wirtschaftlichen, soziokulturellen, technologischen, ökologischen und rechtlichen Faktoren.'],
          ['Wertkettenmodell (Porter)', 'Untersucht alle Prozesse (primäre und sekundäre Aktivitäten) hinsichtlich ihres Einflusses auf die Gewinnspanne.'],
          ['SWOT-Analyse', 'Situationsanalyse aus internen Stärken/Schwächen und externen Chancen/Risiken.'],
          ['GAP-Analyse', 'Ermittlung der strategischen Lücke zwischen angestrebter und erwarteter Entwicklung einer Zielgröße.'],
          ['Ansoff-Matrix (Produkt-Markt-Matrix)', 'Wachstumsstrategien: Marktdurchdringung, Marktentwicklung, Produktentwicklung, Diversifikation.'],
          ['Marktdurchdringung', 'Wachstum mit bestehenden Produkten auf bestehenden Märkten.'],
          ['Marktentwicklung', 'Bestehende Produkte auf neuen Märkten.'],
          ['Produktentwicklung', 'Neue Produkte für bestehende Märkte.'],
          ['Diversifikation', 'Neue Produkte auf neuen Märkten.'],
          ['Kostenführerschaft', 'Porter-Strategie: branchenweiter Kostenvorsprung.'],
          ['Differenzierung', 'Porter-Strategie: branchenweite Einzigartigkeit (Singularität) aus Sicht des Käufers.'],
          ['Fokusstrategie', 'Porter-Strategie: Beschränkung auf ein Marktsegment.'],
          ['Controlling', 'Koordiniert sämtliche Planungs-, Kontroll- und Informationsaktivitäten zur Steuerung von Unternehmen.'],
          ['Kontrolle', 'Systematischer Prozess zur Ermittlung und Analyse von Abweichungen zwischen Soll- und Wird- bzw. Ist-Werten.'],
          ['Kennzahlen', 'Maßzahlen, die Sachverhalte reproduzierbar und in konzentrierter Form quantifizieren.'],
          ['DuPont-Kennzahlensystem', 'Ältestes Kennzahlensystem (1919): ROI = Umsatzrentabilität × Kapitalumschlag.'],
          ['ROI (Return on Investment)', 'Gesamtkapitalrentabilität im DuPont-Schema = Umsatzrentabilität × Kapitalumschlag.'],
          ['Umsatzrentabilität', 'Gewinn je Umsatz.'],
          ['Kapitalumschlag', 'Umsatz / Gesamtkapital (= Gesamtvermögen): wie intensiv das Vermögen genutzt wird.'],
          ['Abweichungsbericht', 'Standardisierter Bericht bei Über- oder Unterschreiten bestimmter Toleranzwerte.'],
        ],
        formulas: [
          { name: 'DuPont / ROI', f: 'Umsatzrentabilität = Gewinn / Umsatzerlöse\nKapitalumschlag = Umsatzerlöse / Gesamtvermögen (= Gesamtkapital)\nROI = Umsatzrentabilität × Kapitalumschlag', note: 'Folie 116/117' },
          { name: 'DuPont-Bausteine', f: 'Gewinn = Umsatzerlöse − Aufwand (Fertigung + Verwaltung + Vertrieb)\nGesamtvermögen = Anlagevermögen + Umlaufvermögen (Vorräte + Forderungen + flüssige Mittel)', note: 'Folie 116' },
        ],
        examples: `<p><strong>DÜPON OHG (ÜB 6):</strong> Umsatz 1.100.000 €; Aufwand 400.000 + 200.000 + 300.000 = 900.000 € → Gewinn 200.000 €. Vermögen = AV 500.000 + Vorräte 100.000 + Forderungen 50.000 + Kasse 50.000 = 700.000 €. Umsatzrentabilität = 18,18 %, Kapitalumschlag = 1,571, <strong>ROI = 28,57 %</strong>.</p>
<p><strong>Wichtel GmbH – Ansoff (ÜB 6):</strong> Marktdurchdringung (mehr Kränze am bestehenden Stand verkaufen), Marktentwicklung (weitere Weihnachtsmärkte), Produktentwicklung (neue Holzdekorationen), Diversifikation (neues Produkt in neuem Markt) – Beispiele sind eigene Anwendung.</p>`,
        focus: ['DuPont-Schema berechnen (Kapitalumschlag, Umsatzrentabilität, ROI).', 'Ansoff-Strategien mit Beispiel; Porter-Strategien.', 'PESTEL/SWOT/GAP erklären.'],
      },
      /* ------------------------------------------------------------------ 6 */
      {
        id: 'b6', nr: '6', part: 'C', relevance: 3, title: 'Externes & internes Rechnungswesen', src: 'VL Folie 119–153 (PDF-S. 110–145)',
        summary: `<div class="table-wrap"><table><thead><tr><th></th><th>Externes Rechnungswesen</th><th>Internes Rechnungswesen</th></tr></thead><tbody>
          <tr><td>Adressaten</td><td>Unternehmensleitung, Externe</td><td>Unternehmensleitung, Bereiche/Funktionen</td></tr>
          <tr><td>Informationen</td><td>Vermögens-, Ertrags-, Finanzlage</td><td>Planung, Steuerung, Kontrolle</td></tr>
          <tr><td>Grundlage</td><td>handels-/steuerrechtlich (gesetzlich normiert)</td><td>betriebswirtschaftlich (Selbstverantwortung)</td></tr>
          <tr><td>Instrumente</td><td>Jahresabschluss</td><td>Kosten- und Leistungsrechnung, Investitions- und Finanzierungsrechnungen</td></tr></tbody></table></div>
          <h3>Externes Rechnungswesen</h3>
          <p><strong>Buchführung</strong> (§ 238 HGB: jeder Kaufmann ist buchführungspflichtig): Dokumentation aller Geschäftsvorfälle, Berechnungsgrundlage für Steuern und Ausschüttung, Information. <strong>Jahresabschluss</strong> (§ 242 HGB) = Bilanz + GuV (+ Anhang bei Kapitalgesellschaften; ggf. Lagebericht, Kapitalflussrechnung).</p>
          <p><strong>Rechengrößen</strong>: Auszahlung/Einzahlung (Zahlungsmittelbestand) · Ausgabe/Einnahme (Geldvermögen = Zahlungsmittel + Forderungen − Verbindlichkeiten) · Aufwand/Ertrag (Gesamtvermögen, bewerteter Verbrauch/Zuwachs einer Periode). Beispiel: Rohstoffe mit Rechnung erhalten = Ausgabe; Überweisung = Auszahlung; Verbrauch = Aufwand; Rechnung an Kunden = Einnahme/Ertrag; Geldeingang = Einzahlung.</p>
          <p><strong>Bilanz</strong> (ital. bilancia „Waage“, § 266 HGB): Aktiva = Mittelverwendung (A. Anlagevermögen: immaterielle VG, Sachanlagen, Finanzanlagen; B. Umlaufvermögen: Vorräte, Forderungen, Wertpapiere, Zahlungsmittel) = Passiva = Mittelherkunft (A. Eigenkapital, B. Rückstellungen, C. Verbindlichkeiten). <strong>Anlagevermögen</strong> dient dauernd dem Geschäftsbetrieb, <strong>Umlaufvermögen</strong> nicht. <strong>Eigenkapital</strong>: zeitlich unbefristet, haftend (Vermögen − Schulden); <strong>Fremdkapital</strong>: befristet, fester Rückzahlungsanspruch, nicht haftend.</p>
          <p><strong>GuV</strong>: zeitraumbezogene Bewegungsrechnung; Erträge − Aufwendungen = Ergebnis (Gewinn/Überschuss bzw. Verlust/Fehlbetrag). <strong>Kapitalflussrechnung</strong>: Ein- und Auszahlungen aus laufender Geschäfts-, Investitions- und Finanzierungstätigkeit. <strong>Cashflow</strong> = Einzahlungen − Auszahlungen = interne Finanzierungskraft (Innenfinanzierung, Schuldentilgung, Ausschüttung); enthält – anders als der Jahresüberschuss – keine zahlungsunwirksamen Posten wie Abschreibungen.</p>
          <h3>Internes Rechnungswesen / Kostenrechnung</h3>
          <p>Schafft Transparenz durch verursachungsgerechte Kostenermittlung (Planungs-, Kontroll-/Steuerungs-, Dokumentationsfunktion). <strong>Kosten</strong> = kalkulatorische Aufwandsäquivalente aus Verbrauch von Gütern im Rahmen der normalen Tätigkeit; <strong>Erlöse</strong> entsprechend Ertragsäquivalente.</p>
          <p><strong>Systeme:</strong> zeitbezogen Ist-, Normal-, Plankostenrechnung; umfangsbezogen Voll- und Teilkostenrechnung. <strong>Teilbereiche:</strong> Kostenarten- (welche?), Kostenstellen- (wo?), Kostenträgerrechnung (wofür?).</p>
          <p><strong>Kostencharakterisierung:</strong> fix (mengenunabhängig: Abschreibungen, Mieten, Gehälter) vs. variabel (Rohstoffe, Hilfsstoffe, Strom); Einzelkosten (direkt zurechenbar: Rohstoffe, Fertigungslöhne, Fracht) vs. Gemeinkosten (über Schlüssel: Verwaltung, Instandhaltung, Kantine); primäre (von außen bezogen) vs. sekundäre Kosten (innerbetriebliche Leistungsverrechnung). Einzelkosten sind stets variabel, Gemeinkosten meist fix. Kostenverläufe: fix, sprungfix, proportional, degressiv. <strong>Fixkostendegression</strong>: sinkende fixe Stückkosten bei steigender Auslastung.</p>
          <p><strong>Kostenstellenrechnung</strong> verteilt Gemeinkosten über Mengen- (Fläche, Mitarbeiter) oder Wertschlüssel. <strong>Kostenträgerrechnung/Kalkulation</strong>: Divisionskalkulation (Einprodukt), Äquivalenzziffernkalkulation (verwandte Produkte), Zuschlagskalkulation (unterschiedliche Produkte). Verkaufspreis: Selbstkosten + Gewinnaufschlag → Barverkaufspreis + Skonto → Zielverkaufspreis + Rabatt → Nettoverkaufspreis + USt → Bruttoverkaufspreis.</p>
          <h3>Deckungsbeitrag & Entscheidungsrechnung</h3>
          <p>Der <strong>Deckungsbeitrag</strong> ist der Betrag, den ein Kostenträger zur Deckung der (noch nicht abgezogenen) Fixkosten und damit zum Erfolg beiträgt: Umsatz − variable Kosten = DB; DB − Fixkosten = Erfolg. Mehrstufig: stufenweise Fixkostendeckung (Erzeugnis-, Erzeugnisgruppen-, Bereichs-, Betriebsfixkosten). <strong>Entscheidungsrelevant</strong> sind nur Kosten, die ausschließlich durch eine bestimmte Alternative ausgelöst werden. Anwendungen: Programmplanung, Preisgrenzen, Break-even-Analyse, Make-or-Buy.</p>
          <p><strong>Programmplanung:</strong> ohne Engpass bleiben alle Produkte mit positivem db im Sortiment; mit Engpass werden Produkte nach db je Engpasseinheit gereiht.</p>`,
        points: [
          'Bilanz: Aktiva = Passiva; Vermögen = Kapital.',
          'Break-even-Menge x(BE) = Kf / (p − kv) = Kf / db.',
          'Kostenfunktion (linear): K(x) = Kf + kv · x; Stückkosten k = K(x)/x.',
          'Fixkosten, die durch nicht kündbare Verträge entstehen, sind kurzfristig nicht entscheidungsrelevant → Entscheidung nach Teilkosten (db).',
          'Produkt mit negativem db verschlechtert das Ergebnis und sollte (bei sonst gleichen Bedingungen) eliminiert werden.',
        ],
        defs: [
          ['Externes Rechnungswesen', 'Versorgt primär externe Adressaten mit Informationen über Vermögens-, Finanz- und Ertragslage; gesetzlich normiert.'],
          ['Internes Rechnungswesen', 'Rechenwerk zur Planung, Kontrolle und Steuerung des Leistungserstellungsprozesses; verursachungsgerechte Kostenermittlung.'],
          ['Buchführung', 'Vollständige Dokumentation aller finanziellen Prozesse (Geschäftsvorfälle) im Unternehmen (§ 238 HGB).'],
          ['Jahresabschluss', 'Bilanz und GuV (bei Kapitalgesellschaften zusätzlich Anhang) – Information und Rechenschaftslegung (§ 242 HGB).'],
          ['Bilanz', 'Gegenüberstellung von Vermögen (Aktiva, Mittelverwendung) und Kapital (Passiva, Mittelherkunft); stets im Gleichgewicht.'],
          ['Aktiva', 'Mittelverwendung: Anlage- und Umlaufvermögen.'],
          ['Passiva', 'Mittelherkunft: Eigen- und Fremdkapital.'],
          ['Anlagevermögen', 'Vermögensgegenstände, die dauernd dem Geschäftsbetrieb dienen (immaterielle VG, Sachanlagen, Finanzanlagen).'],
          ['Umlaufvermögen', 'Vermögensgegenstände, die nicht dauernd dem Geschäftsbetrieb dienen (Vorräte, Forderungen, Kasse/Bank).'],
          ['Eigenkapital', 'Von den Eignern zeitlich unbefristet in haftender Weise zur Verfügung gestellte Mittel (Vermögen − Schulden).'],
          ['Fremdkapital', 'Von Gläubigern zeitlich befristet, mit festem Rückzahlungsanspruch, nicht haftend zur Verfügung gestellte Mittel (Rückstellungen, Verbindlichkeiten).'],
          ['Gewinn- und Verlustrechnung (GuV)', 'Zeitraumbezogene Gegenüberstellung von Erträgen und Aufwendungen einer Periode.'],
          ['Kapitalflussrechnung', 'Gegenüberstellung der zahlungswirksamen Ein- und Auszahlungen einer Periode.'],
          ['Cashflow', 'Nettozufluss liquider Mittel einer Periode (Einzahlungen − Auszahlungen); interne Finanzierungskraft.'],
          ['Auszahlung / Einzahlung', 'Abfluss bzw. Zufluss liquider Mittel (Veränderung des Zahlungsmittelbestands).'],
          ['Ausgabe / Einnahme', 'Veränderung des Geldvermögens (Zahlungsmittel + Forderungen − Verbindlichkeiten).'],
          ['Aufwand / Ertrag', 'Bewerteter Verbrauch bzw. Zuwachs von Gütern/Leistungen einer Periode (Veränderung des Gesamtvermögens).'],
          ['Kosten', 'Für kalkulatorische Zwecke anzusetzende Aufwandsäquivalente aus Verbrauch/Inanspruchnahme von Gütern im Rahmen der normalen Tätigkeit.'],
          ['Erlöse', 'Für kalkulatorische Zwecke anzusetzende Ertragsäquivalente aus Herstellung, Verkauf oder Bereitstellung von Gütern.'],
          ['Vollkostenrechnung', 'Sämtliche Kosten werden auf die Produkte verrechnet.'],
          ['Teilkostenrechnung', 'Nur die für die Entscheidung relevanten Kosten werden verrechnet.'],
          ['Ist-/Normal-/Plankostenrechnung', 'Rechnung mit tatsächlichen, durchschnittlichen bzw. zukünftigen Kosten.'],
          ['Kostenartenrechnung', 'Welche Kosten sind angefallen? (Erfassung)'],
          ['Kostenstellenrechnung', 'Wo sind die Kosten angefallen? Verteilung der Gemeinkosten auf Kostenstellen über Schlüssel.'],
          ['Kostenträgerrechnung', 'Wofür sind die Kosten angefallen? Kalkulation der Selbstkosten je Kostenträger.'],
          ['Fixe Kosten', 'Kosten, deren Höhe unabhängig von der Ausbringungsmenge ist.'],
          ['Variable Kosten', 'Kosten, deren Höhe von der Ausbringungsmenge abhängt.'],
          ['Einzelkosten', 'Kosten, die einem Kostenobjekt eindeutig zugerechnet werden können.'],
          ['Gemeinkosten', 'Kosten, die einem Kostenobjekt nicht eindeutig zurechenbar sind (Zurechnung über Schlüssel).'],
          ['Primäre Kosten', 'Kosten aus einem schuldrechtlichen Verhältnis zur Außenwelt (z. B. Löhne, Energie der Stadtwerke).'],
          ['Sekundäre Kosten', 'Kosten aus innerbetrieblicher Leistungsverrechnung (z. B. selbst erzeugte Energie).'],
          ['Fixkostendegression', 'Sinkende fixe Stückkosten bei steigender Auslastung.'],
          ['Kostenstelle', 'Teilbereich eines Unternehmens, dessen Kosten erfasst, geplant und kontrolliert werden.'],
          ['Kostenträger', 'Objekte (z. B. Produkte), auf die bestimmte Kosten verteilt werden.'],
          ['Divisionskalkulation', 'Kalkulation für Einproduktunternehmen: Gesamtkosten / Stückzahl.'],
          ['Äquivalenzziffernkalkulation', 'Kalkulation für verwandte Produkte über Gewichtungsfaktoren (Äquivalenzziffern).'],
          ['Zuschlagskalkulation', 'Kalkulation für unterschiedliche Produkte über Zuschlagssätze.'],
          ['Deckungsbeitrag', 'Betrag, den ein Kostenträger zur Deckung noch nicht subtrahierter (fixer) Kosten und damit zum Erfolg beiträgt.'],
          ['Deckungsspanne (db)', 'Stückdeckungsbeitrag: Preis − variable Stückkosten.'],
          ['Break-even-Point', 'Gewinnschwelle/Kostendeckungspunkt: Menge, ab der die Erlöse die Kosten decken.'],
          ['Entscheidungsrelevante Kosten', 'Kosten, die ausschließlich durch eine bestimmte Entscheidungsalternative ausgelöst werden.'],
          ['Make-or-Buy-Analyse', 'Entscheidungsrechnung über Eigenherstellung oder Fremdbezug (Leistungstiefe).'],
          ['Programmplanung', 'Festlegung, welche Produkte kurz- und langfristig in welcher Menge produziert werden.'],
        ],
        formulas: [
          { name: 'Kostenfunktion (linear)', f: 'K(x) = Kf + kv · x\nKv(x) = kv · x\nkf(x) = Kf / x  (x > 0)', note: 'Folie 140' },
          { name: 'Deckungsbeitrag', f: 'db = p − kv\nDB = db · x = Umsatz − variable Kosten\nErfolg = DB − Kf', note: 'Folie 148' },
          { name: 'Break-even-Menge', f: 'p · x(BE) = Kf + kv · x(BE)  ⇔  x(BE) = Kf / (p − kv) = Kf / db', note: 'Folie 153' },
          { name: 'Programmplanung bei Engpass', f: 'db je Engpasseinheit = Stückdeckungsbeitrag db / Engpassbelastung je Stück', note: 'Folie 152' },
          { name: 'Kalkulationssatz', f: 'Kalkulationssatz = zu verrechnende Kosten / Bezugsbasis', note: 'Folie 144' },
          { name: 'Verkaufspreis (Schema)', f: 'Selbstkosten + Gewinnaufschlag = Barverkaufspreis\n+ Skonto = Zielverkaufspreis\n+ Rabatt = Nettoverkaufspreis\n+ Umsatzsteuer = Bruttoverkaufspreis', note: 'Folie 147 – Rechenweg für Skonto/Rabatt (im Hundert) in den Folien nicht ausgeführt' },
        ],
        examples: `<h3>Fixkostendegression (Folie 140)</h3>
<p>Kf = 100 €, kv = 5 €: x = 1 → K = 105 (kf = 100) · x = 2 → 110 (kf = 50) · x = 5 → 125 (kf = 20).</p>
<h3>Divisions- und Äquivalenzziffernkalkulation (Folie 145/146)</h3>
<p>Speedy GmbH, Gesamtkosten 1.023.450 T€, 125.000 Stück → 8.187,60 €/Stück (Division). Mit Äquivalenzziffern 1,0 (City, 85.000 Stk) und 1,2 (Family, 40.000 Stk → 48.000 Einheiten): 133.000 Einheiten → 7.695,11 €/Einheit → City 7.695,11 €, Family 9.234,13 €.</p>
<h3>Woody GmbH – Programmplanung (ÜB 8)</h3>
<div class="table-wrap"><table><thead><tr><th>Produkt</th><th>db</th><th>DB</th><th>Kf</th><th>Ergebnis</th></tr></thead><tbody>
<tr><td>Lichterbogen</td><td>12,00</td><td>18.000</td><td>6.000</td><td>12.000</td></tr>
<tr><td>Türkranz</td><td>4,00</td><td>1.600</td><td>1.500</td><td>100</td></tr>
<tr><td>Honigkerzen</td><td>6,50</td><td>2.275</td><td>2.450</td><td>−175</td></tr>
<tr><td>Adventskranz</td><td>−6,00</td><td>−480</td><td>800</td><td>−1.280</td></tr></tbody></table></div>
<p>➜ Nach Vollkosten würde man Honigkerzen und Adventskranz streichen. Da die Fixkosten (Miet-/Leasingverträge) nicht kündbar sind, entscheidet der <strong>Deckungsbeitrag</strong>: nur der <strong>Adventskranz</strong> (db &lt; 0) wird eliminiert; die Honigkerzen decken mit 2.275 € einen Teil der ohnehin anfallenden Fixkosten.</p>
<h3>Höhlenwhisky (ÜB 7)</h3>
<p>K(x) = 60.000 + 24x, p = 60 → E(x) = 60x, x(BE) = 60.000/36 ≈ 1.667 Flaschen. Bei 1.000 Flaschen: k = 84 €, db = 36 €, DB = 36.000 €, G = −24.000 €.</p>
<h3>Zuschlagskalkulation (Folie 147)</h3>
<p>Sk 313,20 € +10 % = 344,52 € (BVP) → /0,97 = 355,18 € (ZVP) → /0,90 = 394,64 € (NVP) → ×1,19 = <strong>469,62 €</strong> (unter der Annahme „im Hundert“).</p>`,
        focus: ['Kostenfunktionen aufstellen (Torten, Dubai-Schokolade, Felgen) – Moodle-Quiz und ÜB 7.', 'Break-even-Menge, kritische Menge (Make-or-Buy), Deckungsbeiträge berechnen.', 'Programmplanung nach Teil- vs. Vollkosten begründen (ÜB 8).', 'Rechengrößen (Auszahlung, Ausgabe, Aufwand …) zuordnen; Bilanz vervollständigen.'],
      },
      /* ------------------------------------------------------------------ 7.1 */
      {
        id: 'b7i', nr: '7.1', part: 'C', relevance: 3, title: 'Investition: statische & dynamische Verfahren', src: 'VL Folie 156–206 (PDF-S. 147–198)',
        summary: `<p>Eine <strong>Investition</strong> ist der heutige Einsatz von Geld (Auszahlung) in der Absicht, künftig höhere Rückflüsse (Einzahlungen) zu erzielen. <strong>Finanzierung</strong> stellt die dafür nötigen Mittel bereit – beide sind untrennbar verbunden. Finanzierung/Entfinanzierung betreffen das Kapital (Mittelherkunft), Investition/Desinvestition das Vermögen (Mittelverwendung).</p>
          <p>Die <strong>Investitionsrechnung</strong> prognostiziert und bewertet den Investitionserfolg: Ist ein Projekt vorteilhaft? Welches von mehreren ist das beste? Ablauf: Anregung → Alternativen & Daten → Beurteilung (statisch/dynamisch/qualitativ) → Festlegung → Durchführung → Kontrolle. <strong>Investitionsdaten:</strong> Anschaffungsauszahlung A0, Nutzungsdauer n, Liquidationserlös Ln, jährliche Einzahlungsüberschüsse EÜt = Et − At.</p>
          <h3>Statische Verfahren (eine fiktive Durchschnittsperiode)</h3>
          <div class="table-wrap"><table><thead><tr><th>Verfahren</th><th>Rechengrößen</th><th>Anwendung</th><th>Ergebnis</th></tr></thead><tbody>
          <tr><td>Kostenvergleich</td><td>Kosten</td><td>keine/gleich hohe Erlöse, gleiche Investitionshöhe</td><td>kostengünstigste Alternative</td></tr>
          <tr><td>Gewinnvergleich</td><td>Kosten und Erlöse</td><td>gleiche Investitionshöhe (und Nutzungsdauer)</td><td>gewinnträchtigste Variante</td></tr>
          <tr><td>Rentabilitätsvergleich</td><td>Kosten und Erlöse</td><td>unterschiedliche Investitionshöhe</td><td>rentabelste Variante (r ≥ Mindestverzinsung i)</td></tr>
          <tr><td>Amortisationsrechnung</td><td>Ein- und Auszahlungen (mehrere Perioden)</td><td>unterschiedliche Investitionsdauer</td><td>schnellster Mittelrückfluss (Pay-back &lt; Nutzungsdauer)</td></tr></tbody></table></div>
          <p>Kosten im Kostenvergleich: aufwandsgleiche Betriebskosten (Personal, Reparatur, Energie, Material, Raum) + <strong>kalkulatorische Abschreibungen</strong> (A0 − Ln)/n + <strong>kalkulatorische Zinsen</strong> = Ø gebundenes Kapital × i mit Ø Kapital = (A0 + Ln)/2. <strong>Kritische Auslastung</strong>: Menge, bei der zwei Alternativen gleich teuer (bzgl. Kosten: ΔKf/Δkv) bzw. gleich gewinnbringend sind (bzgl. Gewinn: ΔKf/Δdb).</p>
          <p><strong>Vorteil</strong> der statischen Verfahren: große Praktikabilität. <strong>Nachteile</strong>: zeitliche Unterschiede der Zahlungen unberücksichtigt, grobe Durchschnittswerte, Kostenzusammensetzung und effektive Nutzungsdauer unberücksichtigt, Zurechnung schwierig, innerbetriebliche Zusammenhänge fehlen.</p>
          <h3>Dynamische Verfahren</h3>
          <p>Rechnen mit Zahlungsströmen über die gesamte Nutzungsdauer und berücksichtigen deren <strong>Zeitpunkte</strong>: Zahlungen zu verschiedenen Zeitpunkten dürfen nicht einfach addiert werden – sie werden auf- oder abgezinst. Der <strong>Kalkulationszinsfuß</strong> entspricht der gewünschten Mindestverzinsung (Kapitalkosten: Sollzins bei FK, entgangener Habenzins bei EK). Annahme: vollkommener Kapitalmarkt (ein einheitlicher Zins), Zahlungen sicher bekannt, keine Steuern/Inflation.</p>
          <ul><li><strong>Kapitalwertmethode:</strong> K0 = Barwert aller Ein- und Auszahlungen; vorteilhaft, wenn <strong>K0 &gt; 0</strong>. Der Kapitalwert entspricht der Vermögensänderung. Bestimmt durch Höhe/zeitliche Verteilung der Zahlungen und den Kalkulationszins.</li>
          <li><strong>Annuitätenmethode:</strong> wandelt K0 in gleichbleibende, nachschüssige Jahresbeträge um: a = K0 / RBF; vorteilhaft bei <strong>a &gt; 0</strong>. Zeigt, welchen Betrag der Investor jährlich entnehmen kann, ohne sein Reinvermögen zu mindern.</li>
          <li><strong>Interne Zinsfußmethode:</strong> r ist der Zinssatz, bei dem <strong>K0 = 0</strong>. r &gt; i vorteilhaft, r = i indifferent, r &lt; i unvorteilhaft. Klausur: nur einfacher Fall – A0/EÜ = RBF(n, r) berechnen und r in der RBF-Tabelle ablesen (keine Interpolation). Kritik: bei Vorzeichenwechseln Nichtexistenz oder Mehrdeutigkeit.</li></ul>
          <p><strong>Qualitative Aspekte:</strong> marktbezogen (Realisierungszeitraum, Produktqualität, Durchlaufzeit), technisch (Flexibilität, Lebensdauer, Störanfälligkeit, Service, Umweltbelastung), sozial (Rationalisierung, Qualifikation, Arbeitsbedingungen, Arbeitssicherheit).</p>`,
        points: [
          'Gbrutto = Gnetto + kalkulatorische Zinsen.',
          'Cashflow EÜ (statisch) = Gbrutto + kalkulatorische Abschreibung.',
          'Amortisationsdauer = A0 / EÜ – man rechnet mit dem Cashflow, weil es um den Rückfluss der Mittel geht.',
          'Vereinfachte Kapitalwertmethode (konstante EÜ, Ln = 0): K0 = −A0 + EÜ · RBF.',
          'Abzinsungstabelle in der Klausur NICHT verfügbar, RBF-Tabelle schon.',
          'Unterschiedliche Investitionssummen dynamisch vergleichen: über interne Zinsfüße oder Annuitäten (bei gleicher Nutzungsdauer).',
        ],
        defs: [
          ['Investition', 'Heutiger Einsatz von Geld (Auszahlung) in der Absicht, künftig höhere Rückflüsse (Einzahlungen) zu erzielen.'],
          ['Investitionsrechnung', 'Prognostiziert und bewertet den künftigen Investitionserfolg (Wirtschaftlichkeitsrechnung).'],
          ['Anschaffungsauszahlung A0', 'Alle Auszahlungen, um Betriebsmittel zu erwerben und betriebsbereit zu machen.'],
          ['Nutzungsdauer n', 'Zeitraum, über den mit Rückflüssen aus einer Investition gerechnet wird.'],
          ['Liquidationserlös Ln', 'Einzahlung aus dem Verkauf der Betriebsmittel nach Ende der Nutzung (Restwert).'],
          ['Einzahlungsüberschuss EÜ', 'Einzahlungen − Auszahlungen einer Periode (Cashflow).'],
          ['Kostenvergleichsrechnung', 'Statisches Verfahren, das die Kosten mehrerer Investitionsalternativen gegenüberstellt (Erlöse müssen gleich sein).'],
          ['Gewinnvergleichsrechnung', 'Statisches Verfahren, das die Alternative mit dem größten Gewinn (U − K) wählt.'],
          ['Rentabilitätsvergleichsrechnung', 'Statisches Verfahren: r = Gbrutto / Ø gebundenes Kapital, Vergleich mit der Mindestverzinsung.'],
          ['Amortisationsrechnung', 'Ermittelt den Zeitraum, bis das investierte Kapital über die Rückflüsse zurückgewonnen ist (Pay-back-Dauer).'],
          ['Kalkulatorische Abschreibung', 'Berücksichtigt den Werteverzehr einer Anlage: (A0 − Ln) / n.'],
          ['Kalkulatorische Zinsen', 'Zinsen auf das durchschnittlich gebundene Kapital: (A0 + Ln)/2 × i.'],
          ['Durchschnittlich gebundenes Kapital', '(A0 + Ln) / 2 bei linearer Abschreibung.'],
          ['Kritische Auslastung', 'Menge, bei der zwei Alternativen gleiche Kosten (ΔKf/Δkv) bzw. gleichen Gewinn (ΔKf/Δdb) haben.'],
          ['Kalkulationszinsfuß', 'Gewünschte Mindestverzinsung eines Investors; entspricht den Kapitalkosten.'],
          ['Vollkommener Kapitalmarkt', 'Modellannahme: Geld kann jederzeit zu einem einheitlichen Zins angelegt und aufgenommen werden.'],
          ['Aufzinsungsfaktor', '(1 + i)^n – Endwert einer heutigen Zahlung.'],
          ['Abzinsungsfaktor', '(1 + i)^−n – Barwert einer künftigen Zahlung.'],
          ['Rentenbarwertfaktor (RBF)', '((1+i)^n − 1) / (i · (1+i)^n) – heutiger Wert von n künftigen konstanten jährlichen Zahlungen.'],
          ['Annuitätenfaktor', 'i · (1+i)^n / ((1+i)^n − 1) = 1/RBF – gleichbleibende Jahreszahlung aus einem Gegenwartswert.'],
          ['Kapitalwert K0', 'Barwert aller einer Investition zurechenbaren Ein- und Auszahlungen; entspricht der Vermögensänderung.'],
          ['Kapitalwertmethode', 'Dynamisches Verfahren: Investition vorteilhaft, wenn K0 > 0.'],
          ['Annuitätenmethode', 'Wandelt den Kapitalwert in gleichbleibende nachschüssige Jahreszahlungen a = K0/RBF um; vorteilhaft bei a > 0.'],
          ['Interner Zinsfuß', 'Zinssatz, bei dem sich ein Kapitalwert von 0 ergibt; zeigt die Verzinsung des gebundenen Kapitals.'],
          ['Normalinvestition', 'Investition mit Anfangsauszahlung und danach positiven (hier: konstanten) Einzahlungsüberschüssen.'],
        ],
        formulas: [
          { name: 'Kalkulatorische Abschreibung', f: 'AfA = (A0 − Ln) / n', note: 'Folie 163' },
          { name: 'Kalkulatorische Zinsen', f: 'Zinsen = Ø gebundenes Kapital × i  mit  Ø Kapital = (A0 + Ln) / 2', note: 'Folie 165' },
          { name: 'Kritische Auslastung bzgl. Kosten', f: 'x_krit = (Kf(Anl.1) − Kf(Anl.2)) / (kv(Anl.2) − kv(Anl.1)) = ΔKf / Δkv', note: 'Folie 167 – alternativ Kostenfunktionen gleichsetzen' },
          { name: 'Gewinn & Gewinnschwelle', f: 'G = U − K\nx(BE) = Kf / db   mit db = p − kv', note: 'Folie 171/172' },
          { name: 'Kritische Auslastung bzgl. Gewinn', f: 'x_krit = (Kf(Anl.1) − Kf(Anl.2)) / (db(Anl.1) − db(Anl.2)) = ΔKf / Δdb', note: 'Folie 172' },
          { name: 'Rentabilität (statisch)', f: 'r = Gbrutto / Ø gebundenes Kapital   mit  Gbrutto = Gnetto + kalk. Zinsen', note: 'Folie 175' },
          { name: 'Amortisationsdauer', f: 'Amortisationsdauer = A0 / Ø EÜ   mit  EÜ = Gbrutto + kalk. Abschreibung\nVorteilhaft: Amortisationsdauer < Nutzungsdauer', note: 'Folie 178' },
          { name: 'Zinsfaktoren', f: 'Aufzinsung: (1+i)^n\nAbzinsung: 1/(1+i)^n = (1+i)^−n\nRBF(n,i) = ((1+i)^n − 1) / (i · (1+i)^n)\nAnnuitätenfaktor = i · (1+i)^n / ((1+i)^n − 1)', note: 'Folie 187' },
          { name: 'Barwert', f: 'K0 = Kn · 1/(1+i)^n     |   konstante Zahlung K über n Jahre: K0 = K · RBF(n,i)', note: 'Folie 188' },
          { name: 'Kapitalwert', f: 'K0 = −A0 + Σ (Et − At) · (1+i)^−t + Ln · (1+i)^−n', note: 'Folie 192' },
          { name: 'Vereinfachte Kapitalwertmethode', f: 'K0 = −A0 + EÜ · RBF(n,i)   (konstante EÜ, einmalige A0, Ln = 0)', note: 'Folie 195' },
          { name: 'Annuität', f: 'a = K0 / RBF(n,i)', note: 'Folie 198' },
          { name: 'Interner Zinsfuß (einfacher Fall)', f: '0 = −A0 + EÜ · RBF(n, r)  ⇔  RBF(n, r) = A0 / EÜ  → r aus RBF-Tabelle ablesen', note: 'Folie 203 – nur so klausurrelevant' },
        ],
        examples: `<h3>TBW AG (Folie 169–179)</h3>
<p>Anlage 1: A0 160.000 €, fix 1.400 €, kv 5,60 €; Anlage 2: A0 220.000 €, fix 9.200 €, kv 3,70 €; je 8.000 ME, n = 10, Ln = 0, i = 8 %; Erlöse 10,00 € bzw. 10,60 €.</p>
<div class="table-wrap"><table><thead><tr><th></th><th>Anlage 1</th><th>Anlage 2</th></tr></thead><tbody>
<tr><td>Aufwandsgleiche Betriebskosten</td><td>1.400 + 44.800 = 46.200</td><td>9.200 + 29.600 = 38.800</td></tr>
<tr><td>Kalk. Abschreibung</td><td>16.000</td><td>22.000</td></tr>
<tr><td>Kalk. Zinsen (Ø 80.000 / 110.000 × 8 %)</td><td>6.400</td><td>8.800</td></tr>
<tr><th>Gesamtkosten</th><th>68.600</th><th>69.600</th></tr>
<tr><td>Erlöse</td><td>80.000</td><td>84.800</td></tr>
<tr><td>Gewinn</td><td>11.400</td><td>15.200</td></tr>
<tr><td>Gbrutto</td><td>17.800</td><td>24.000</td></tr>
<tr><td>Rentabilität</td><td>22,3 %</td><td>21,8 %</td></tr>
<tr><td>EÜ = Gbrutto + AfA</td><td>33.800</td><td>46.000</td></tr>
<tr><td>Amortisation</td><td>4,73 J.</td><td>4,78 J.</td></tr></tbody></table></div>
<p>Kritische Auslastung bzgl. Kosten (Fixkosten inkl. AfA und Zinsen: 23.800 € bzw. 40.000 €): ΔKf/Δkv = 16.200 / 1,90 ≈ <strong>8.526 ME</strong> – darunter ist Anlage 1, darüber Anlage 2 kostengünstiger. Bei 8.000 ME ist Anlage 1 daher knapp günstiger (68.600 € &lt; 69.600 €).</p>
<h3>Kapitalwert A vs. B (Folie 194, i = 9 %)</h3>
<p>A: −1.000 + 800/1,09 + 300/1,09² + 400/1,09³ = <strong>+295,32</strong> · B: −1.000 + 300/1,09 + 800/1,09² + 200/1,09³ = <strong>+103,01</strong> → A ist vorteilhafter (frühere Rückflüsse).</p>
<h3>Vereinfachte Kapitalwertmethode (Folie 196)</h3>
<p>A0 = 10.000 €, EÜ = 2.500 €, n = 4: i = 6 % → K0 = −1.337,24 € · 8 % → −1.719,68 € · 10 % → −2.075,34 € (je höher der Zins, desto kleiner K0).</p>
<h3>Interner Zinsfuß (Folie 204)</h3>
<p>A0 = 1.400 €, EÜ = 200 €, n = 10 → RBF = 7,0 → laut Tabelle r ≈ <strong>7 %</strong> (RBF(10; 7 %) = 7,02).</p>
<h3>Rocket GmbH – Raketen-Sets (ÜB 11, Lösung aus Übungsblatt)</h3>
<p>AfA 200.000 · Ø Kapital 500.000 · Zinsen 40.000 · Kf 340.000 · Kv 2.000.000 · K 2.340.000 · U 2.400.000 · Gnetto 60.000 · Gbrutto 100.000 · r = 20 % · EÜ 300.000 · Amortisation 3,33 J. · K0 ≈ 197.900 (RBF 3,993) · RBF für IZF = 3,333 → r ≈ 15 % · Annuität ≈ 49.562 €.</p>`,
        focus: ['Statische Kennzahlentabelle komplett rechnen (AfA, Ø Kapital, Zinsen, Kf, K, k, U, G, r, EÜ, Amortisation, Gewinnschwelle, kritische Mengen) – Moodle-Quiz, ÜB 8, 9, 11.', 'Kapitalwert mit Abzinsung und vereinfacht mit RBF; Annuität; interner Zinsfuß per Tabelle.', 'Vor- und Nachteile statischer Verfahren; Annahmen der dynamischen Verfahren.'],
      },
      /* ------------------------------------------------------------------ 7.2 */
      {
        id: 'b7f', nr: '7.2', part: 'C', relevance: 3, title: 'Finanzierung & Finanzkennzahlen', src: 'VL Folie 200–215',
        summary: `<p><strong>Finanzierung</strong> = Bereitstellung von Geld zur Durchführung einer Investition; alle Aktivitäten, die Umfang und Zusammensetzung des Kapitals (Passivseite) beeinflussen. Ziele: Kapitalkostenminimierung bei Sicherung der Zahlungsfähigkeit (Liquidität = strikte Nebenbedingung), Kreditwürdigkeit, Unabhängigkeit von Kapitalgebern.</p>
          <div class="table-wrap"><table><thead><tr><th></th><th>Eigenfinanzierung</th><th>Fremdfinanzierung</th></tr></thead><tbody>
          <tr><td><strong>Außenfinanzierung</strong></td><td>Beteiligungsfinanzierung</td><td>Kreditfinanzierung</td></tr>
          <tr><td><strong>Innenfinanzierung</strong></td><td>Selbstfinanzierung (thesaurierter Gewinn); Finanzierung durch Vermögensumschichtung</td><td>Finanzierung durch Rückstellungsbildung</td></tr></tbody></table></div>
          <p class="small">Einteilung nach Herkunft der Mittel (außen/innen) und Rechtsstellung der Kapitalgeber (Eigen/Fremd).</p>
          <p><strong>Finanzplanung:</strong> finanzielles Gleichgewicht, wenn in allen Perioden Einzahlungen ≥ Auszahlungen. Unterziele: Unterliquidität verhindern (Insolvenzrisiko), kostenminimale Finanzierung wählen, Überliquidität verhindern (Zinsverlust).</p>
          <ul><li><strong>Selbstfinanzierung:</strong> nicht ausgeschütteter (thesaurierter) Gewinn. Weitere Innenfinanzierung durch erst später auszahlungswirksame Aufwendungen (langfristige Rückstellungen) und Abschreibungen (Vermögensumschichtung).</li>
          <li><strong>Beteiligungsfinanzierung:</strong> externes Eigenkapital. EK-Funktionen: Finanzierungsbasis (ohne EK kein FK), Maß der Kreditwürdigkeit, Verlustauffangpotenzial, Bezugsgröße der Erfolgsverteilung. Rechtsformabhängig; börsenfähige Unternehmen im Vorteil.</li>
          <li><strong>Kreditfinanzierung</strong> – kurzfristig: Kundenkredit (An-/Vorauszahlung), Lieferantenkredit (Zahlungsziel), Kontokorrentkredit (Überziehung), Lombardkredit (mobiles Pfand); mittel-/langfristig: Bankdarlehen, Schuldverschreibungen (Anleihen, Obligationen, Bonds), Schuldscheindarlehen (4–10 Jahre), Genussscheine (Erfolgsanteil, kein Stimmrecht).</li>
          <li><strong>Rückstellungen:</strong> Mittel bis zur Fälligkeit nutzbar (kurzfristig Steuern, mittelfristig Prozessrisiken, langfristig Pensionen) – Finanzierung durch ausbleibende Auszahlung.</li>
          <li><strong>Weitere:</strong> Vermögensumschichtung (Verkauf von Vermögen), Subventionsfinanzierung (staatlich, ohne unmittelbare Gegenleistung), Kapitalsubstitution (Miete, Pacht, Leasing), Factoring (Verkauf von Forderungen an eine Factoringgesellschaft).</li></ul>
          <h3>Kapitalstruktur- und Liquiditätskennzahlen</h3>
          <p><strong>Vertikale Regel:</strong> Verschuldungsgrad V = FK/EK, Eigenkapitalquote = EK/(EK + FK); strengste Form: EK ≥ FK. <strong>Horizontale Regel (Goldene Bilanz-/Bankregel):</strong> Fristenkongruenz – langfristig gebundenes Vermögen langfristig finanzieren: (EK + langfristiges FK) / Anlagevermögen ≥ 1; AV + „eiserner Bestand“ &lt; EK + langfr. FK; UV &gt; kurz- und mittelfristiges FK.</p>`,
        points: [
          'Liquidität 1. Grades = liquide Mittel / kurzfristiges FK.',
          'Liquidität 2. Grades = (liquide Mittel + kurzfristige Forderungen) / kurzfristiges FK.',
          'Liquidität 3. Grades = Umlaufvermögen / kurzfristiges FK.',
          'Lieferantenkredit-Effektivzins i = S/(1 − S) · 360/(Z − s) – meist sehr teuer.',
          'Bankdarlehen = Fremd- und Außenfinanzierung (Kreditfinanzierung).',
          'Kundenkredit = Abnehmer zahlt vorab; Lieferantenkredit = Lieferant gewährt Zahlungsziel.',
        ],
        defs: [
          ['Finanzierung', 'Bereitstellung finanzieller Mittel zur Durchführung einer Investition; wirkt auf Umfang und Zusammensetzung des Kapitals.'],
          ['Eigenfinanzierung', 'Kapital wird von den Eignern zur Verfügung gestellt.'],
          ['Fremdfinanzierung', 'Kapital wird von Gläubigern zur Verfügung gestellt.'],
          ['Außenfinanzierung', 'Kapitalzuführung von außerhalb des Unternehmens.'],
          ['Innenfinanzierung', 'Kapital wird vom Unternehmen selbst erzeugt.'],
          ['Selbstfinanzierung', 'Innenfinanzierung aus zurückbehaltenem (thesauriertem) Gewinn.'],
          ['Beteiligungsfinanzierung', 'Finanzierung mit von externen Kapitalgebern eingebrachtem Eigenkapital.'],
          ['Kreditfinanzierung', 'Finanzierung mit von externen Kapitalgebern eingebrachtem Fremdkapital.'],
          ['Finanzierung aus Rückstellungen', 'Für Rückstellungen vorgesehene Mittel werden bis zur Fälligkeit zur Finanzierung genutzt (keine Auszahlung).'],
          ['Vermögensumschichtung', 'Bereitstellung von Mitteln durch Verkauf von Vermögensgegenständen.'],
          ['Subventionsfinanzierung', 'Staatlich eingebrachtes Kapital ohne unmittelbare geldliche Gegenleistung.'],
          ['Kapitalsubstitution', 'Reduzierung des zu finanzierenden Vermögens durch Miete, Pacht oder Leasing.'],
          ['Leasing', 'Mittel- bis langfristige Überlassung von Anlagegegenständen gegen Nutzungsentgelt.'],
          ['Pacht', 'Pächter darf die Sache gebrauchen und erhält die direkt damit erwirtschafteten Erträge.'],
          ['Factoring', 'Aufkauf von Forderungen aus Lieferungen und Leistungen durch eine Factoringgesellschaft.'],
          ['Kundenkredit', 'Zinslose An- oder Vorauszahlung von Abnehmern (Handelskredit).'],
          ['Lieferantenkredit', 'Zahlungsziel, das Lieferanten ihren Abnehmern einräumen (Handelskredit).'],
          ['Kontokorrentkredit', 'Betrag, um den ein Kontokorrent-/Girokonto überzogen werden darf.'],
          ['Lombardkredit', 'Kredit gegen ein leicht liquidierbares, mobiles Gut als Pfand.'],
          ['Schuldverschreibung', 'Anleihe, Obligation, Bond – mittel- bis langfristige Kreditfinanzierung.'],
          ['Schuldscheindarlehen', 'Kredit von vier bis zehn Jahren mit nicht frei veräußerbarem Schuldschein als Beweisurkunde.'],
          ['Genussschein', 'Verzinsung durch Erfolgsanteil, kein Stimmrecht, nur Gläubigerrechte.'],
          ['Finanzplanung', 'Sichert das finanzielle Gleichgewicht (Einzahlungen ≥ Auszahlungen) und betreibt Liquiditätsvorsorge.'],
          ['Eigenkapitalquote', 'EK / (EK + FK).'],
          ['Goldene Bilanzregel', 'Fristenkongruenz: (EK + langfristiges FK) / Anlagevermögen ≥ 1.'],
          ['Liquidität 1./2./3. Grades', 'Liquide Mittel bzw. + kurzfristige Forderungen bzw. Umlaufvermögen, jeweils bezogen auf kurzfristiges FK.'],
        ],
        formulas: [
          { name: 'Lieferantenkredit (Effektivzins)', f: 'i = Skontosatz / (1 − Skontosatz) × 360 / (Zahlungsziel − Skontofrist)\n  = S / (1 − S) × 360 / (Z − s)', note: 'Folie 207' },
          { name: 'Verschuldungsgrad / EK-Quote', f: 'V = FK / EK\nEKQ = EK / (EK + FK)', note: 'Folie 212' },
          { name: 'Goldene Bilanzregel', f: '(EK + langfristiges FK) / Anlagevermögen ≥ 1', note: 'Folie 214' },
          { name: 'Liquiditätsgrade', f: 'L1 = liquide Mittel / kurzfr. FK\nL2 = (liquide Mittel + kurzfr. Forderungen) / kurzfr. FK\nL3 = Umlaufvermögen / kurzfr. FK', note: 'Folie 215' },
        ],
        examples: `<h3>Lieferantenkredit (ÜB 11)</h3>
<p>3 % Skonto innerhalb 5 Tagen, sonst 30 Tage: i = 0,03/0,97 · 360/25 ≈ <strong>44,5 %</strong> p. a. Bei 90 Tagen Ziel: 360/85 → ≈ 13,1 %. Günstiger als 9 % FK-Zins erst ab Z − 5 ≥ 123,7, also ab einem Zahlungsziel von etwa <strong>129 Tagen</strong>.</p>
<h3>Bilanz & Liquidität (Moodle-Quiz)</h3>
<p>AV = Grundstücke 800.000 + Anlagen 600.000; UV = Lager 540.000 + Forderungen 300.000 + Bank 100.000 + Kasse 20.000 = 960.000 → Bilanzsumme 2.360.000. EK = 800.000 + 340.000 + 50.000 = 1.190.000; FK = 810.000 + 360.000 = 1.170.000. L1 = 120.000/360.000 = 33,3 % · L2 = 420.000/360.000 = 116,7 % · L3 = 960.000/360.000 = 266,7 % · V = 98,3 %.</p>
<h3>Zwischenübung Klassifikation (Folie 210)</h3>
<div class="table-wrap"><table><thead><tr><th>Vorgang</th><th>Klassifikation</th></tr></thead><tbody>
<tr><td>25.000 € Einzahlung bei GmbH-Gründung</td><td>Eigen- + Außenfinanzierung</td></tr>
<tr><td>Pensionsrückstellungen für Rohstoffkauf</td><td>Fremd- + Innenfinanzierung</td></tr>
<tr><td>Aktionäre nutzen 100.000 € Gewinn für Solaranlage</td><td>Eigen- + Innenfinanzierung (Selbstfinanzierung)</td></tr>
<tr><td>Einzelunternehmer least ein Auto</td><td>Kapitalsubstitut</td></tr>
<tr><td>OHG nimmt 50.000 € Kredit auf</td><td>Fremd- + Außenfinanzierung</td></tr></tbody></table></div>`,
        focus: ['Finanzierungsformen in die 2×2-Matrix einordnen (Zwischenübung, ÜB 11).', 'Effektivzins des Lieferantenkredits berechnen.', 'Liquiditätsgrade, V, EK-Quote, Goldene Bilanzregel aus einer Bilanz berechnen.'],
      },
      /* ------------------------------------------------------------------ 8 */
      {
        id: 'b8', nr: '8', part: 'D', relevance: 2, title: 'Leistungserstellung: Beschaffung, Logistik, Produktion, Marketing', src: 'VL Kap. 8, Folie 2–40 (PDF-S. 216–255)',
        summary: `<h3>8.1 Beschaffung</h3>
          <p><strong>Materialwirtschaft</strong> umfasst Beschaffung, Lagerhaltung und Verteilung des Materials. <strong>Beschaffung</strong> stellt die bedarfsgerechte Versorgung mit den Gütern sicher, die in die Leistungserstellung eingehen. Werkstoffe: <strong>Rohstoffe</strong> (Grundmaterial, gehen unmittelbar ins Produkt), <strong>Hilfsstoffe</strong> (gehen ein, ergänzender Charakter), <strong>Betriebsstoffe</strong> (kein Bestandteil, im Prozess verbraucht), <strong>Halbfabrikate</strong> (Teile/Baugruppen mit höherem Reifegrad); außerdem <strong>Handelswaren</strong> (unverarbeitet weiterverkauft).</p>
          <p>Ziele: Kostenziele (Beschaffungs-, Materialkosten), Ergebnisziele (Güterqualität, Lieferbereitschaft). Strategisch: Insourcing/Outsourcing, System-/Component-, Single-/Multiple-, Global-/Domestic-Sourcing. Operativ: Bedarfs-, Bestandsplanung, Bestell- und Lieferantenpolitik.</p>
          <p><strong>ABC-Analyse</strong> (nach Wert): A-Güter ≈ 70–80 % des Verbrauchswerts bei 10–20 % der Menge (Priorität: Marktanalysen, optimale Bestellmengen, genaue Bestände); B-Güter ≈ 10–20 % Wert, 20–30 % Menge (fallweise); C-Güter ≈ 5–10 % Wert, 60–70 % Menge (Schätzung, höhere Sicherheitsbestände, weniger Kontrolle). Vorgehen: Jahresverbrauchswerte sortieren → Anteile kumulieren → Mengenanteile → Lorenzkurve.</p>
          <p><strong>XYZ-Analyse</strong> (nach Stetigkeit des Bedarfs, über den Variationskoeffizienten VarK = σ / Mittelwert): X konstant, Y trendförmig/saisonal, Z unregelmäßig. Kombiniert zur ABC-XYZ-Analyse → Beschaffungsart: <strong>bedarfsgesteuert</strong> (aus übergeordneten Bedarfen, idealerweise ohne Lager), <strong>deterministisch</strong> (Sekundärbedarf aus Aufträgen/Absatzprogramm per Stücklisten- oder Rezeptauflösung), <strong>verbrauchsgesteuert</strong> (Prognose aus Vergangenheitswerten, Lager als Puffer).</p>
          <h3>8.2 Logistik</h3>
          <p>Transport und Lagerung von Roh-, Halb- und Fertigfabrikaten sowie zugehörigen Informationen und Werten vom Lieferanten bis zum Endverbraucher. Objekte: Waren/Material, Informationen, Personen. Basisfunktionen <strong>Transportieren</strong> (räumlich) und <strong>Lagern</strong> (zeitlich), ergänzend Umschlagen, Kommissionieren (strukturell), Verpacken, Ladeeinheiten bilden. Phasen: Beschaffungs-, Produktions-, Distributions-, Entsorgungslogistik. Ziele: Kosten (Logistikkosten, Kapitalbindung), Zeit (Durchlaufzeiten, Termine), Ergebnis (richtige Orte, Güter, Zustände). Transportentscheidung: Kosten, Geschwindigkeit/Frequenz, Verlässlichkeit, Flexibilität, Vernetzung, Reichweite, Technik, Nebenleistungen; Eigen- vs. Fremdleistung.</p>
          <h3>8.3 Produktion</h3>
          <p>Im engeren Sinne Fertigung (Be- und Verarbeitung), im weiteren Sinne Leistungserstellungsprozess: Transformation von Produktionsfaktoren in Erzeugnisse. Entscheidungen über Produktionsprogramm, -menge, Fertigungstyp, Fertigungsverfahren, Ablauf. Ziele: Kosten (Produktions-, Herstellkosten), Zeit (Termine, Durchlaufzeiten, Flexibilität), Ergebnis (Stückzahl, Qualität, Ökologie).</p>
          <p><strong>Produktionsprogramm</strong> (zu erstellende Leistungen) vs. <strong>Absatzprogramm</strong> (angebotene Leistungen): gleich (selten), Produktion &gt; Absatz (Eigenbedarf), Produktion &lt; Absatz (Fremdfertigung/Handelsware).</p>
          <p><strong>Fertigungstypen</strong> (nach Wiederholungshäufigkeit): Einzelfertigung; Mehrfachfertigung als Massenfertigung (große Stückzahl, lange), Serienfertigung (begrenzte Stückzahl hintereinander), Mass Customization (Individualisierung). <strong>Fertigungsverfahren:</strong> Werkstattprinzip (gleichartige Verrichtungen zusammengefasst; flexibel, hohe Qualität, aber lange Wege, Zwischenlager, schwierige Auslastung), Fließprinzip (Anordnung nach Arbeitsfolge; kurze Durchlaufzeiten, weniger Lager/Koordination, aber hoher Kapitalbedarf, Störanfälligkeit, Monotonie), Gruppenfertigung (Kombination), außerdem handwerkliche und Baustellenfertigung.</p>
          <p><strong>Produktionsplanung</strong> (Mengen rechtzeitig, Materialbereitstellung, effizienter Ressourceneinsatz) und <strong>-steuerung</strong> (Auftragsfreigabe, Fortschrittsüberwachung, Korrekturen). <strong>Erfahrungskurve:</strong> Stückkosten sinken mit kumulierter Produktionsmenge stark (Economies of Scale) – Ursachen: Lernkurveneffekte, technischer Fortschritt, rationellere Verfahren/Organisation, Fixkostendegression.</p>
          <h3>8.4 Marketing</h3>
          <p>Planung und Durchführung von Aktivitäten, damit Individuen/Gruppen Produkte kaufen oder Anliegen unterstützen. Aufgaben: Nachfragesteuerung, Kundengewinnung/-bindung, Stakeholdermanagement. <strong>Markt</strong> (Meffert): aktuelle und potenzielle Nachfrager und Anbieter bestimmter Leistungen und ihre Beziehungen. Institutionell: gewinnorientiert (B2C, B2B, Dienstleistungen) vs. Non-Profit (öffentliche Einrichtungen, Social Marketing). <strong>Marketing-Mix – 4 P:</strong> Product (Produkt-/Sortimentspolitik), Price (Preispolitik – Preis zwischen Selbstkosten, Wettbewerb und Strategie), Place (Distribution), Promotion (Kommunikation).</p>`,
        points: ['ABC = Wert, XYZ = Vorhersehbarkeit/Stetigkeit.', 'Schmieröl für Maschinen = Betriebsstoff; Lack/Erstbefüllungsöl = Hilfsstoff; fertige Sitze = Halbfabrikat.', 'Fließfertigung: kurze Durchlaufzeit, aber hoher Kapitalbedarf und Störanfälligkeit.'],
        defs: [
          ['Materialwirtschaft', 'Funktionsbereich, der Beschaffung, Lagerhaltung und Verteilung des zur Produktion notwendigen Materials umfasst.'],
          ['Beschaffung', 'Sicherstellung der bedarfsgerechten Versorgung mit den Gütern, die in die Leistungserstellung eingehen.'],
          ['Rohstoffe', 'Grundmaterial, das unmittelbar in das Produkt eingeht.'],
          ['Hilfsstoffe', 'Gehen in das Produkt ein, haben aber nur ergänzenden Charakter.'],
          ['Betriebsstoffe', 'Werden im Produktionsprozess verbraucht, sind kein Bestandteil des Fertigprodukts.'],
          ['Halbfabrikate', 'Teile oder Baugruppen mit höherem Reifegrad, die ins Endprodukt eingehen.'],
          ['Handelswaren', 'Ergänzen das Produktionsprogramm und werden unverarbeitet weiterverkauft.'],
          ['ABC-Analyse', 'Klassifikation von Gütern nach der Höhe ihres (Verbrauchs-)Wertes in A-, B- und C-Güter.'],
          ['XYZ-Analyse', 'Klassifikation von Gütern nach der Stetigkeit/Vorhersehbarkeit des Bedarfs (Variationskoeffizient).'],
          ['Variationskoeffizient', 'Standardabweichung / Mittelwert.'],
          ['Lorenzkurve', 'Grafische Darstellung der kumulierten Wert- über den kumulierten Mengenanteilen in der ABC-Analyse.'],
          ['Bedarfsgesteuerte Materialbeschaffung', 'Menge und Zeitpunkt werden aus dem Bedarf übergeordneter Materialien abgeleitet; idealerweise kein Lager.'],
          ['Deterministische Materialbeschaffung', 'Sekundärbedarf aus Kundenaufträgen/Absatzprogramm per Stücklisten- oder Rezeptauflösung.'],
          ['Verbrauchsgesteuerte Materialbeschaffung', 'Prognose aus Vergangenheitswerten; Lager als Puffer erforderlich.'],
          ['Single-/Multiple-Sourcing', 'Beschaffung bei einem bzw. mehreren Lieferanten.'],
          ['Logistik', 'Transport und Lagerung von Roh-, Halb- und Fertigfabrikaten samt Informationen und Werten vom Lieferanten bis zum Endverbraucher.'],
          ['Kommissionieren', 'Zusammenstellen von Gütern nach Aufträgen (Änderung der strukturellen Gütereigenschaften).'],
          ['Distributionslogistik', 'Logistikphase für fertige Erzeugnisse zum Kunden.'],
          ['Produktion', 'Transformation von Produktionsfaktoren in Erzeugnisse oder Leistungen.'],
          ['Produktionsprogramm', 'Gesamtheit aller von einem Unternehmen zu erstellenden Leistungen.'],
          ['Absatzprogramm', 'Gesamtheit aller von einem Unternehmen angebotenen Leistungen.'],
          ['Einzelfertigung', 'Nur eine Einheit wird hergestellt.'],
          ['Massenfertigung', 'Große Stückzahlen über einen längeren Zeitraum.'],
          ['Serienfertigung', 'Mehrere Produkte hintereinander in begrenzter Stückzahl.'],
          ['Mass Customization', 'Produkte in mehreren Ausprägungen / Individualisierung in Mehrfachfertigung.'],
          ['Werkstattprinzip', 'Maschinen und Arbeitsplätze mit gleichartigen Verrichtungen werden zu einer Werkstatt zusammengefasst.'],
          ['Fließprinzip', 'Anordnung der Arbeitsplätze und Anlagen entspricht der Reihenfolge der Tätigkeiten am Produkt.'],
          ['Gruppenfertigung', 'Kombination aus Werkstatt- und Fließfertigung (Funktionsgruppen mit Fließprinzip).'],
          ['Erfahrungskurve', 'Empirisches Phänomen: Stückkosten sinken mit zunehmender kumulierter Ausbringungsmenge stark (Economies of Scale).'],
          ['Marketing', 'Planung und Durchführung von Aktivitäten, damit Individuen/Gruppen Produkte kaufen oder Anliegen des Unternehmens unterstützen.'],
          ['Marketing-Mix (4 P)', 'Product, Price, Place, Promotion – Produkt-, Preis-, Distributions- und Kommunikationspolitik.'],
          ['B2C / B2B', 'Business to Consumer (Konsumgütermarketing) bzw. Business to Business.'],
        ],
        formulas: [
          { name: 'XYZ-Kennzahlen', f: 'Mittelwert = Σ Mᵢ / n\nσ = √( Σ (Mᵢ − Mittelwert)² / n )\nVarK = σ / Mittelwert', note: 'Kap. 8 Folie 12 (PDF-S. 227)' },
        ],
        examples: `<h3>ABC-Analyse (ÜB 12, Grenzen &lt; 85 % / &lt; 97 %)</h3>
<div class="table-wrap"><table><thead><tr><th>Rang</th><th>Artikel</th><th>Wert %</th><th>kumuliert</th><th>Klasse</th></tr></thead><tbody>
<tr><td>1</td><td>A2</td><td>37,74</td><td>37,74</td><td>A</td></tr><tr><td>2</td><td>A8</td><td>28,30</td><td>66,04</td><td>A</td></tr><tr><td>3</td><td>A6</td><td>18,87</td><td>84,91</td><td>A</td></tr>
<tr><td>4</td><td>A1</td><td>4,53</td><td>89,43</td><td>B</td></tr><tr><td>5</td><td>A4</td><td>3,77</td><td>93,21</td><td>B</td></tr><tr><td>6</td><td>A5</td><td>2,83</td><td>96,04</td><td>B</td></tr>
<tr><td>7</td><td>A3</td><td>1,89</td><td>97,92</td><td>C</td></tr><tr><td>8</td><td>A10</td><td>1,51</td><td>99,43</td><td>C</td></tr><tr><td>9</td><td>A9</td><td>0,38</td><td>99,81</td><td>C</td></tr><tr><td>10</td><td>A7</td><td>0,19</td><td>100</td><td>C</td></tr></tbody></table></div>
<p>A-Güter: 3 Artikel ≈ 85 % des Werts bei nur 19,45 % der Menge.</p>
<h3>Transportmittelvergleich (ÜB 12)</h3>
<p>Spedition K = 800 + 40x, eigener LKW 1.500 € je Fahrt (max. 66 Paletten): 800 + 40x = 1.500 → x = 17,5. Bis 17 Paletten Spedition, ab 18 Paletten eigener LKW (bei &gt; 66 Paletten zwei Fahrten = 3.000 €, Spedition dann ≥ 3.480 € → weiterhin LKW). Qualitativ: Zuverlässigkeit, Flexibilität, Kontrolle, Verfügbarkeit.</p>
<h3>Arbeitsteilung „Twax“ (ÜB 13)</h3>
<p>Ohne Spezialisierung je Betrieb 25 + 50 + 25 = 100 h je Tonne Keksriegel → 0,01 t/h. Mit Spezialisierung (L nur Keks: 1 t in 50 h, R nur Schokolade: 1 t in 50 h, Tausch 1:1) → 50 + 25 = 75 h je Tonne → ≈ 0,0133 t/h: Produktivität steigt um ein Drittel.</p>
<h3>Werkstoffe (Zwischenübung Kap. 8 Folie 5)</h3>
<p>Schmieröl für Maschinen → Betriebsstoff · Schmieröl zur Erstbefüllung der Motoren → Hilfsstoff · fertige Sitze → Halbfabrikat · Fräsmaschine → kein Werkstoff (Betriebsmittel) · Schneidplatten (verbraucht) → Betriebsstoff · Strom → Betriebsstoff · Lacke → Hilfsstoff.</p>`,
        focus: ['ABC-Analyse durchführen und Handlungsempfehlungen ableiten (ÜB 12).', 'Werkstoffe klassifizieren.', 'Transportkostenvergleich (kritische Menge).', 'Fertigungstypen/-verfahren mit Vor- und Nachteilen; Erfahrungskurve; 4 P.'],
        missing: 'Die Folien zur historischen Marktentwicklung (Käufer-/Verkäufermarkt), Preis-Nachfrage-Dynamik und Werbekanälen sind nur als Grafik enthalten; der Unterschied Käufer-/Verkäufermarkt (ÜB 13) ist im Foliestext nicht ausgeführt.',
      },
    ],
    glossary: [],
    cards: [],
    questions: [],
  };

  S.chapters.forEach((c) =>
    (c.defs || []).forEach(([term, def]) => S.glossary.push({ term, def, ch: c.id, src: c.src }))
  );

  LP.subjects.bwl = S;
})();
