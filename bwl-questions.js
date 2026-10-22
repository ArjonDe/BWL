/**
 * bwl-questions.js – Fragen und Karteikarten "Einführung in die BWL".
 * diff: 1 leicht · 2 mittel · 3 schwer · 4 klausurähnlich (Rechen-/Transferaufgaben aus den Übungen)
 * Rechenergebnisse ohne Musterlösung in den Unterlagen wurden mit den Formeln der Folien berechnet.
 */
(function () {
  'use strict';
  const S = LP.subjects.bwl;
  let n = 0;
  const add = (o) => S.questions.push(Object.assign({ id: 'bwq' + ++n }, o));
  const card = (ch, front, back, src) => S.cards.push({ id: 'bwc' + (S.cards.length + 1), ch, front, back, src });

  /* ===================== Kapitel 1 – Grundlagen ===================== */
  add({ ch: 'b1', diff: 1, type: 'single', q: 'Was versteht man unter „Wirtschaften“ (Cassel 1923)?', options: ['Knappe Güter geplant so einsetzen, dass die Bedürfnisbefriedigung möglichst vorteilhaft erfolgt', 'Möglichst viel Gewinn erzielen', 'Freie Güter verteilen', 'Bedürfnisse vollständig befriedigen'], answer: 0,
    expl: 'Die Notwendigkeit des Wirtschaftens ergibt sich aus unbegrenzten Bedürfnissen und knappen Mitteln.', src: 'VL Folie 15 (PDF-S. 6)' });
  add({ ch: 'b1', diff: 1, type: 'match', q: 'Ordne das ökonomische Prinzip zu.', pairs: [['Minimumprinzip', 'gegebener Output, Input minimieren'], ['Maximumprinzip', 'gegebener Input, Output maximieren'], ['Optimumprinzip', 'Input und Output optimal abstimmen']],
    expl: 'Drei Ausprägungen des ökonomischen Prinzips.', src: 'VL Folie 24 (PDF-S. 15)' });
  add({ ch: 'b1', diff: 1, type: 'single', q: 'Wie ist Produktivität definiert?', options: ['Outputmenge / Inputmenge', 'Ertrag / Aufwand', 'Gewinn / Eigenkapital', 'Umsatz − Kosten'], answer: 0,
    expl: 'Produktivität ist mengenmäßig. Ertrag/Aufwand ist die Wirtschaftlichkeit, Gewinn/EK eine Rentabilität.', src: 'VL Folie 26/27' });
  add({ ch: 'b1', diff: 1, type: 'match', q: 'Ordne die Stufen der Maslow-Pyramide (von unten) zu.', pairs: [['Stufe 1', 'Physiologische Bedürfnisse'], ['Stufe 2', 'Sicherheitsbedürfnisse'], ['Stufe 3', 'Soziale Bedürfnisse'], ['Stufe 4', 'Prestigebedürfnisse'], ['Stufe 5', 'Selbstverwirklichung']],
    expl: 'Nach Maslow kann jede Stufe erst erreicht werden, wenn die darunter liegende befriedigt ist.', src: 'VL Folie 16 (PDF-S. 7)' });
  add({ ch: 'b1', diff: 2, type: 'match', q: 'Min- oder Max-Prinzip? (ÜB 1, Aufg. 5)', pairs: [['Aus 11 t Stahl möglichst viele Werkzeuge', 'Maximumprinzip'], ['20.000 Blatt Papier beim preisgünstigsten Lieferanten', 'Minimumprinzip'], ['Mit 1 Mio. € Werbeetat möglichst viele Kunden', 'Maximumprinzip ']],
    expl: 'Gegebener Input → Output maximieren (Max); gegebener Output → Input minimieren (Min).', src: 'ÜB 1, Aufg. 5; VL Folie 24' });
  add({ ch: 'b1', diff: 2, type: 'tf', q: 'Eine Gesamtproduktivität lässt sich im Allgemeinen nicht bilden, eine Gesamtwirtschaftlichkeit dagegen schon.', answer: true,
    expl: 'Teilproduktivitäten haben verschiedene Dimensionen (h, kWh, kg …). Bei der Wirtschaftlichkeit ist alles in € bewertet: Gesamtertrag / Summe der Einzelaufwendungen.', src: 'VL Folie 28; ÜB 2, Aufg. 1' });
  add({ ch: 'b1', diff: 2, type: 'single', q: 'Worin unterscheiden sich Betriebe und Haushalte?', options: ['Betriebe produzieren zur Deckung fremder, Haushalte konsumieren zur Deckung eigener Bedarfe', 'Haushalte produzieren, Betriebe konsumieren', 'Betriebe sind immer privat, Haushalte immer öffentlich', 'Es gibt keinen Unterschied'], answer: 0,
    expl: 'Betriebe: Produktionswirtschaft; Haushalte: Konsumptionswirtschaft. Beide gibt es privat und öffentlich.', src: 'VL Folie 18 (PDF-S. 9)' });
  add({ ch: 'b1', diff: 2, type: 'multi', q: 'Welche Annahmen gehören zum Modell des Homo oeconomicus?', options: ['Streben nach maximalem Eigennutz', 'Vollständige Information', 'Entscheidung nach dem Rationalprinzip', 'Intrinsische Motivation als Auslöser'], answer: [0, 1, 2],
    expl: 'Auslöser sind extrinsische Anreize. Kritik: eindimensionales Bild – Menschen handeln oft irrational, Informationen sind unvollständig.', src: 'VL Folie 14 (PDF-S. 5)' });
  add({ ch: 'b1', diff: 2, type: 'multi', q: 'Welche Eigenschaften charakterisieren laut Vorlesung ein Unternehmen als System?', options: ['offen', 'dynamisch', 'autonom', 'geschlossen'], answer: [0, 1, 2],
    expl: 'Offen, komplex, dynamisch, autonom, marktgerichtet, produktiv, sozial.', src: 'VL Folie 20 (PDF-S. 11)' });
  add({ ch: 'b1', diff: 3, type: 'single', q: 'Glasmanufaktur Sable (8 h/Tag): Kugeln 22 Stück/Tag bei 30 €/h, Preis 25 €. Wie hoch ist die Teilwirtschaftlichkeit des Faktors Arbeit?', options: ['≈ 2,29', '2,75', '0,44', '≈ 1,83'], answer: 0,
    expl: 'Ertrag 22 × 25 = 550 €; Aufwand 8 × 30 = 240 € → 550/240 ≈ 2,29. (2,75 wäre die Teilproduktivität in Stück/h.)', src: 'ÜB 1, Aufg. 6; VL Folie 28' });
  add({ ch: 'b1', diff: 3, type: 'cloze', q: 'Glasmanufaktur Sable (8 h/Tag) – Teilproduktivität Arbeit in Stück pro Stunde:', text: 'Kugeln (22 Stück/Tag): {{2,75|2.75}} Stück/h · Vasen (18 Stück/Tag): {{2,25|2.25}} Stück/h · Lampen (12 Stück/Tag): {{1,5|1.5|1,50}} Stück/h',
    expl: 'Tagesleistung / 8 h. Die Lampen sind am wenigsten produktiv, aber am wirtschaftlichsten (960/336 ≈ 2,86).', src: 'ÜB 1, Aufg. 6' });
  add({ ch: 'b1', diff: 4, type: 'single', q: 'Raps (ÜB 2 neu): 10.000 l Öl zu 4,99 €/l; Inputfaktoren 12.500 € + sonstige 25.000 €. Neues Verfahren: +15 % Ernte, +10.000 € Kosten. Wie entwickelt sich die Gesamtwirtschaftlichkeit?',
    options: ['Sie sinkt von ≈ 1,33 auf ≈ 1,21 – Verfahren nicht empfehlenswert', 'Sie steigt von ≈ 1,33 auf ≈ 1,53', 'Sie bleibt gleich, nur die Produktivität steigt', 'Sie sinkt von 1,5 auf 1,4'], answer: 0,
    expl: 'Vorher 49.900/37.500 ≈ 1,33. Nachher 11.500 l × 4,99 = 57.385 € / 47.500 € ≈ 1,21. Die Produktivitäten von Saatgut und Dünger steigen um 15 %, die Wirtschaftlichkeit sinkt aber (Gewinn 12.400 → 9.885 €).', src: 'ÜB 2 (neu), Aufg. 4' });
  add({ ch: 'b1', diff: 4, type: 'single', q: 'TableTop AG (ÜB 2): 1 t Arbeitsplatte = 81 % MDF + 19 % Laminat; 10 % des eingesetzten MDF gehen verloren. Wie hoch ist der MDF-Einsatz je Tonne?', options: ['900 kg', '891 kg', '810 kg', '1.000 kg'], answer: 0,
    expl: '810 kg MDF im Produkt entsprechen 90 % des Einsatzes → 810 / 0,9 = 900 kg. Produktivität MDF = 1.000/900 ≈ 1,11 kg/kg.', src: 'ÜB 2 (alt), Aufg. 4' });
  add({ ch: 'b1', diff: 4, type: 'single', q: 'TableTop AG: MDF 900 kg à 1,50 €, Laminat 190 kg à 2 €, Energie 400 kWh à 0,22 €, Arbeit 8 h à 32 €; Verkauf 2,25 €/kg. Gesamtwirtschaftlichkeit je Tonne?', options: ['≈ 1,08', '≈ 1,25', '≈ 0,92', '≈ 2,25'], answer: 0,
    expl: 'Aufwand 1.350 + 380 + 88 + 256 = 2.074 €; Ertrag 2.250 € → 2.250/2.074 ≈ 1,085.', src: 'ÜB 2 (alt), Aufg. 4' });
  add({ ch: 'b1', diff: 3, type: 'single', q: 'Gabelschlüssel (Moodle-Quiz): 3.600 Stück in 6 Arbeitsstunden. Produktivität der Arbeit?', options: ['600 Stk/Std', '0,0017 Std/Stk', '21.600 Stk·Std', '360 Stk/Std'], answer: 0,
    expl: 'Outputmenge / Inputmenge = 3.600 / 6 = 600 Stück je Stunde.', src: 'Moodle-Quiz „Produktivität & Wirtschaftlichkeit“' });
  add({ ch: 'b1', diff: 2, type: 'multi', q: 'Wer gehört zu den Stakeholdern eines Unternehmens?', options: ['Mitarbeiter', 'Fremdkapitalgeber', 'Wettbewerber', 'Anwohner'], answer: [0, 1, 2, 3],
    expl: 'Alle Wirtschaftssubjekte, die das Handeln beeinflussen und/oder davon betroffen sind – intern und extern.', src: 'VL Folie 31 (PDF-S. 22)' });
  add({ ch: 'b1', diff: 3, type: 'tf', q: 'Kennzahlen wie Produktivität und Wirtschaftlichkeit zeigen, ob das Input-Output-Verhältnis optimal im Sinne des ökonomischen Prinzips ist.', answer: false,
    expl: 'Folie 27: Kennzahlen geben so keine Auskunft darüber, ob das Verhältnis optimal ist.', src: 'VL Folie 27' });

  /* ===================== Exkurs Wirtschaftsordnungen ===================== */
  add({ ch: 'b1e', diff: 1, type: 'multi', q: 'Welche drei Grundfragen stehen in jeder Wirtschaftsordnung im Vordergrund?', options: ['Was soll produziert werden?', 'Wie soll produziert werden?', 'Für wen soll produziert werden?', 'Wann soll gegründet werden?'], answer: [0, 1, 2],
    expl: 'In Marktwirtschaften werden diese Fragen dem Markt überlassen.', src: 'VL Folie 33' });
  add({ ch: 'b1e', diff: 2, type: 'match', q: 'Zentralverwaltungs- oder Marktwirtschaft?', pairs: [['zentraler Volkswirtschaftsplan', 'Zentralverwaltungswirtschaft'], ['Preissystem (relative Preise)', 'Marktwirtschaft'], ['Gewinn und Verlust als Sanktion', 'Marktwirtschaft '], ['Planerfüllung und Prämiensystem', 'Zentralverwaltungswirtschaft ']],
    expl: 'Gegenüberstellung der Wirtschaftsordnungen.', src: 'VL Folie 33' });
  add({ ch: 'b1e', diff: 2, type: 'single', q: 'Was ist das Ziel der Sozialen Marktwirtschaft?', options: ['Vorteile der freien Marktwirtschaft verwirklichen und ihre Nachteile (z. B. unsoziale Auswirkungen) vermeiden', 'Alle Preise staatlich festlegen', 'Privateigentum abschaffen', 'Wettbewerb vollständig ausschalten'], answer: 0,
    expl: 'Ordnungspolitischer Grundsatz: Koordination über Märkte, Instrumente marktkonform; wichtiges Instrument: Sozialversicherungen.', src: 'VL Folie 34/35' });

  /* ===================== Kapitel 2 – Konstitutive Entscheidungen ===================== */
  add({ ch: 'b2', diff: 1, type: 'multi', q: 'Welche Entscheidungen zählen zu den konstitutiven Entscheidungen?', options: ['Standortwahl', 'Rechtsformwahl', 'Unternehmenszusammenschlüsse', 'Tägliche Bestellmengen'], answer: [0, 1, 2],
    expl: 'Konstitutiv = grundlegend und einmalig bzw. sehr selten.', src: 'VL Folie 37' });
  add({ ch: 'b2', diff: 1, type: 'match', q: 'Mindestkapital bei Gründung', pairs: [['GmbH', '25.000 €'], ['AG', '50.000 €'], ['OHG', 'keine Vorschrift']],
    expl: 'Einzelunternehmen, OHG und KG haben kein vorgeschriebenes Mindestkapital.', src: 'VL Folie 44' });
  add({ ch: 'b2', diff: 2, type: 'match', q: 'Ordne die Haftung der Rechtsform bzw. Person zu.', pairs: [['Gesellschafter einer OHG', 'unbeschränkt, persönlich, solidarisch'], ['Kommanditist', 'beschränkt auf die Kapitaleinlage'], ['Komplementär', 'unbeschränkt'], ['GmbH-Gesellschafter', 'beschränkt auf die Stammeinlage']],
    expl: 'Rechtsformvergleich Folie 44.', src: 'VL Folie 44' });
  add({ ch: 'b2', diff: 2, type: 'single', q: 'Was bedeutet „Typenzwang“ bei Rechtsformen?', options: ['Betriebe können nur aus gesetzlich vordefinierten Rechtsformen wählen', 'Jede Branche hat eine Pflicht-Rechtsform', 'Ab 500 Mitarbeitern muss eine AG gegründet werden', 'Rechtsformen dürfen nie gewechselt werden'], answer: 0,
    expl: 'Die Rechtsform regelt Innen- und Außenverhältnis; es gibt nur gesetzlich vordefinierte Typen.', src: 'VL Folie 41' });
  add({ ch: 'b2', diff: 2, type: 'single', q: 'Wer leitet eine KG?', options: ['Der/die Komplementär(e)', 'Die Kommanditisten', 'Ein Vorstand', 'Ein Aufsichtsrat'], answer: 0,
    expl: 'Komplementäre haben Leitungsbefugnis und volle Kontrollrechte; Kommanditisten nur beschränkte Kontrollrechte.', src: 'VL Folie 45; ÜB 2, Aufg. 6' });
  add({ ch: 'b2', diff: 2, type: 'match', q: 'KG oder GmbH? (ÜB 2, Aufg. 6)', pairs: [['Personengesellschaft', 'KG'], ['Juristische Person (Kapitalgesellschaft)', 'GmbH'], ['Publizitätspflicht zwingend', 'GmbH '], ['Mindestens 2 Gründer', 'KG ']],
    expl: 'KG: Personengesellschaft, mind. 2 (Komplementär + Kommanditist), keine Publizitätspflicht; GmbH: Kapitalgesellschaft, ab 1 Gesellschafter, 25.000 € Stammkapital, Publizität zwingend.', src: 'VL Folie 42–45' });
  add({ ch: 'b2', diff: 2, type: 'single', q: 'Unterschied limitationaler und substitutionaler Standortfaktoren?', options: ['Limitational = MUSS-Kriterium, substitutional = KANN/Wunsch', 'Limitational = billig, substitutional = teuer', 'Limitational = nur für Dienstleister', 'Es gibt keinen Unterschied'], answer: 0,
    expl: 'Systematisierung nach Entscheidungsrelevanz.', src: 'VL Folie 40' });
  add({ ch: 'b2', diff: 2, type: 'single', q: 'Warum ist der Hebesatz der Gewerbesteuer ein Standortfaktor?', options: ['Jede Gemeinde legt ihn selbst fest (ca. 200–500 %) – er bestimmt die Höhe der Gewerbesteuer am Standort', 'Er ist bundesweit einheitlich', 'Er betrifft nur Kapitalgesellschaften', 'Er bestimmt die Einkommensteuer'], answer: 0,
    expl: 'Abgabenbezogener Standortfaktor; die GewSt-Höhe ist unabhängig von der Rechtsform.', src: 'VL Folie 49; ÜB 3, Aufg. 1–2' });
  add({ ch: 'b2', diff: 2, type: 'match', q: 'Ordne die Steuer zu.', pairs: [['Körperschaftsteuer', 'linear 15 %'], ['Einkommensteuer', 'progressiv 14–45 %'], ['Gewerbesteuer', 'Messzahl 3,5 % × Hebesatz'], ['Abgeltungsteuer', '25 % auf Kapitalerträge']],
    expl: 'Ertragsteuern im Überblick (vereinfacht).', src: 'VL Folie 48/49' });
  add({ ch: 'b2', diff: 2, type: 'tf', q: 'Der Solidaritätszuschlag (5,5 %) wird auf ESt, KSt und Abgeltungsteuer erhoben; Freigrenzen gibt es nur bei der ESt.', answer: true,
    expl: 'Keine Freigrenzen bei AbgSt und KSt. In der Klausur wird vereinfacht ohne Freibeträge gerechnet.', src: 'VL Folie 50' });
  add({ ch: 'b2', diff: 3, type: 'single', q: 'Gewinn 400.000 €, Hebesatz 500 %. Wie hoch ist die Gewerbesteuer?', options: ['70.000 €', '14.000 €', '200.000 €', '60.000 €'], answer: 0,
    expl: 'Messbetrag = 400.000 × 3,5 % = 14.000 €; × 500 % = 70.000 €.', src: 'VL Folie 55' });
  add({ ch: 'b2', diff: 3, type: 'cloze', q: 'GmbH, Gewinn 400.000 €, Hebesatz 500 %, vollständige Thesaurierung:', text: 'GewSt {{70000|70.000}} € + KSt {{60000|60.000}} € + SolZ {{3300|3.300}} € = Gesamtbelastung {{133300|133.300}} €',
    expl: 'KSt 15 % des Gewinns, SolZ 5,5 % der KSt.', src: 'VL Folie 54/55' });
  add({ ch: 'b2', diff: 3, type: 'single', q: 'Wie hoch ist die GewSt-Anrechnung auf die ESt, wenn der Messbetrag 14.000 € und die GewSt 70.000 € beträgt?', options: ['56.000 € (4 × Messbetrag)', '70.000 €', '14.000 €', '0 €'], answer: 0,
    expl: 'Die gezahlte GewSt wird auf die ESt angerechnet, jedoch maximal bis zum 4-fachen Messbetrag.', src: 'VL Folie 52, 55' });
  add({ ch: 'b2', diff: 4, type: 'single', q: 'OHG statt GmbH (Gewinn 400.000 €, Hebesatz 500 %, A 60 %/ESt 40 %, B 40 %/ESt 30 %, Thesaurierung). Gesamtbelastung der OHG?',
    options: ['162.840 € – die GmbH (133.300 €) ist günstiger', '133.300 € – gleich hoch wie die GmbH', '144.000 € – die OHG ist günstiger', '214.000 €'], answer: 0,
    expl: 'GewSt 70.000 + ESt nach Anrechnung (96.000 − 33.600) + (48.000 − 22.400) = 88.000 + SolZ 4.840 = 162.840 €.', src: 'VL Folie 53–55' });
  add({ ch: 'b2', diff: 4, type: 'single', q: 'ÜB 3 (neu): GmbH, Gewinn 2 Mio. €, Hebesatz Hagen 520 %. Wie viel verbleibt bei Thesaurierung im Unternehmen?',
    options: ['1.319.500 €', '1.336.000 €', '1.400.000 €', '1.284.000 €'], answer: 0,
    expl: 'GewSt = 2 Mio. × 3,5 % × 5,2 = 364.000 €; KSt 300.000 €; SolZ 16.500 € → 680.500 € Steuern → 1.319.500 € verbleiben.', src: 'ÜB 3 (neu), Aufg. 6a' });
  add({ ch: 'b2', diff: 4, type: 'single', q: 'Fortsetzung: Die 1.319.500 € werden entnommen (ausgeschüttet). Welche Steuer fällt beim Gesellschafter zusätzlich an (vereinfacht, ohne KiSt)?',
    options: ['Abgeltungsteuer 25 % + SolZ 5,5 % ≈ 348.018 €', 'Keine weitere Steuer', 'Einkommensteuer 45 % ≈ 593.775 €', 'Nochmals Körperschaftsteuer 15 %'], answer: 0,
    expl: 'AbgSt 329.875 € + SolZ 18.143,13 € = 348.018,13 €. Bei Ausschüttung entsteht die Zusatzbelastung auf Gesellschafterebene.', src: 'ÜB 3 (neu), Aufg. 6c; VL Folie 49, 51' });
  add({ ch: 'b2', diff: 3, type: 'single', q: 'Gewinnverteilung: Einlagen A 2.000 €, B 3.000 €, C 5.000 €, Gewinn 1.000 €, 4 % Verzinsung, Rest nach Köpfen. Anteil von C?', options: ['400 €', '500 €', '333,33 €', '200 €'], answer: 0,
    expl: '4 % von 5.000 = 200 €; Rest 1.000 − 400 = 600 € / 3 Köpfe = 200 € → 400 €.', src: 'VL Folie 47' });
  add({ ch: 'b2', diff: 2, type: 'single', q: 'Welche Unternehmensverbindung hat die höchste Bindungsintensität?', options: ['Fusion / Merger', 'Konsortium', 'Kartell', 'Strategische Allianz'], answer: 0,
    expl: 'Reihenfolge nach Bindungsintensität: Konsortium, Kartell, Strategische Allianz, Joint Venture, Konzern, Fusion.', src: 'VL Folie 58' });
  add({ ch: 'b2', diff: 2, type: 'match', q: 'Ordne die Form der Beschreibung zu.', pairs: [['Konsortium', 'befristete GbR für ein bestimmtes Geschäft'], ['Kartell', 'Vereinbarung zur Wettbewerbsbegrenzung'], ['Joint Venture', 'gemeinsames, eigenständiges Gemeinschaftsunternehmen'], ['Konzern', 'rechtlich selbstständige Unternehmen unter einheitlicher Leitung']],
    expl: 'Formen nach Kooperationsgrad und Bindungsintensität.', src: 'VL Folie 58' });
  add({ ch: 'b2', diff: 3, type: 'single', q: 'Ein Autohersteller übernimmt einen Zulieferer für Sitze. Welche Art der Verbindung nach Produktionsstufe liegt vor?', options: ['Vertikal (Rückwärtsintegration)', 'Horizontal', 'Lateral', 'Vertikal (Vorwärtsintegration)'], answer: 0,
    expl: 'Vorgelagerte Stufe = Rückwärtsintegration. Horizontal wäre ein anderer Autohersteller, lateral ein branchenfremdes Unternehmen.', src: 'VL Folie 57 (Anwendung)' });
  add({ ch: 'b2', diff: 2, type: 'tf', q: 'Bei einer Kooperation bleibt die rechtliche Selbstständigkeit der beteiligten Unternehmen ganz erhalten.', answer: true,
    expl: 'Kooperation: wirtschaftliche Selbstständigkeit weitgehend, rechtliche ganz erhalten. Konzentration: wirtschaftliche (ggf. auch rechtliche) geht verloren.', src: 'VL Folie 58' });
  add({ ch: 'b2', diff: 3, type: 'single', q: 'Welche Mitbestimmung gilt bei einer GmbH mit 1.200 Beschäftigten (kein Montanbetrieb)?', options: ['Drittelparität', 'Unterparität', 'Volle Parität', 'Keine'], answer: 0,
    expl: 'Drittelparität bei mehr als 500, aber weniger als 2.000 Beschäftigten; Unterparität ab 2.000; volle Parität für Montanbetriebe ab 1.000.', src: 'VL Folie 45' });

  /* ===================== Kapitel 3 – Ziele, Rentabilität, Leverage ===================== */
  add({ ch: 'b3', diff: 1, type: 'match', q: 'Ordne den Begriff des normativen Rahmens zu.', pairs: [['Vision', 'realistisches, begeisterndes Zukunftsbild'], ['Mission', 'Zweck und Gegenstand des gegenwärtigen Handelns'], ['Corporate Identity', 'Unternehmenspersönlichkeit']],
    expl: 'Normativer Rahmen: Unternehmensidentität, Vision, Mission, Grundsätze, Zielsystem.', src: 'VL Folie 59/60' });
  add({ ch: 'b3', diff: 1, type: 'multi', q: 'Welche drei Dimensionen umfasst die Zieloperationalisierung?', options: ['Inhalt', 'Ausmaß', 'Zeitbezug', 'Rechtsform'], answer: [0, 1, 2],
    expl: 'Was? Wie viel? Wann?', src: 'VL Folie 65' });
  add({ ch: 'b3', diff: 2, type: 'match', q: 'Ordne die Zielbeziehung zu.', pairs: [['Zielkomplementarität', 'Erreichung eines Ziels fördert ein anderes'], ['Zielkonflikt', 'Erreichung eines Ziels behindert ein anderes'], ['Zielneutralität', 'keine Auswirkung auf andere Ziele']],
    expl: 'Zielbeziehungen nach Thommen et al.', src: 'VL Folie 66' });
  add({ ch: 'b3', diff: 2, type: 'match', q: 'Ordne die Zielausmaß-Art zu.', pairs: [['„1 Mio. € Gewinn“', 'Punktziel'], ['„1 Mio. € < Gewinn < 2 Mio. €“', 'Intervallziel'], ['„höchstmöglicher Gewinn“', 'Extremierungsziel']],
    expl: 'Festlegung des Zielausmaßes bei der Operationalisierung.', src: 'VL Folie 65' });
  add({ ch: 'b3', diff: 2, type: 'single', q: 'Welche Ziele zählen zu den Formalzielen (Erfolgszielen)?', options: ['Produktivität, Wirtschaftlichkeit, Rentabilität und Gewinn', 'Marktanteil und Produktqualität', 'Liquidität und Kapitalstruktur', 'Mitarbeiterzufriedenheit'], answer: 0,
    expl: 'Die anderen Optionen sind Sachziele (Leistungs-, Finanz-, soziale Ziele).', src: 'VL Folie 68' });
  add({ ch: 'b3', diff: 2, type: 'single', q: 'Was besagt die Leverage-Formel?', options: ['r(EK) = r(GK) + (r(GK) − i) · FK/EK', 'r(EK) = r(GK) − i · EK/FK', 'r(GK) = r(EK) + i · V', 'r(EK) = Gbrutto / GK'], answer: 0,
    expl: 'Ist r(GK) > i, steigt r(EK) mit dem Verschuldungsgrad V = FK/EK.', src: 'VL Folie 71; Herleitung PDF-S. 256' });
  add({ ch: 'b3', diff: 2, type: 'tf', q: 'Ändert sich nur der Fremdkapitalzinssatz, so ändert sich die Gesamtkapitalrentabilität, nicht aber die Eigenkapitalrentabilität.', answer: false,
    expl: 'Umgekehrt: r(GK) = Gbrutto/GK bleibt gleich (Bruttogewinn vor Zinsen), r(EK) ändert sich über den Nettogewinn.', src: 'ÜB 4, Aufg. 2; VL Folie 70' });
  add({ ch: 'b3', diff: 3, type: 'single', q: 'r(GK) = 10 %, i = 5 %, V = 3. Wie hoch ist r(EK)?', options: ['25 %', '15 %', '30 %', '20 %'], answer: 0,
    expl: '10 + (10 − 5) · 3 = 25 % (vgl. Tabelle Folie 72).', src: 'VL Folie 72' });
  add({ ch: 'b3', diff: 3, type: 'single', q: 'r(GK) = 3 %, i = 8 %, V = 2. Wie hoch ist r(EK)?', options: ['−7 %', '13 %', '−2 %', '3 %'], answer: 0,
    expl: '3 + (3 − 8) · 2 = −7 % – negativer Leverage-Effekt.', src: 'VL Folie 72' });
  add({ ch: 'b3', diff: 4, type: 'single', q: 'Immobilie 500.000 €, Gbrutto 50.000 €, i = 8 %. Welche Finanzierung bringt die höchste r(EK)?', options: ['EK 125.000 / FK 375.000 → 16 %', 'EK 500.000 / FK 0 → 10 %', 'EK 200.000 / FK 300.000 → 13 %', 'Alle gleich – 10 %'], answer: 0,
    expl: 'r(GK) = 10 % > i = 8 % → positiver Hebel. Alt. 3: (50.000 − 30.000)/125.000 = 16 %.', src: 'VL Folie 73' });
  add({ ch: 'b3', diff: 4, type: 'cloze', q: 'Restaurant (ÜB 4): Kaufpreis 5,6 Mio. €, Kredit 3 Mio. € zu 6 %, Rest EK; Kosten (inkl. Zinsen) 1,4 Mio. €, Umsatz 1,5 Mio. €.',
    text: 'Gnetto = {{100000|100.000}} € · Gbrutto = {{280000|280.000}} € · r(GK) = {{5|5,0|5 %}} % · r(EK) ≈ {{3,85|3.85|3,8|3.8}} %',
    expl: 'FK-Zinsen 180.000 €; Gbrutto = 100.000 + 180.000; r(GK) = 280.000/5,6 Mio.; r(EK) = 100.000/2,6 Mio. ≈ 3,85 % (negativer Hebel, da 5 % < 6 %).', src: 'ÜB 4 (neu und alt), Aufg. 4/5' });
  add({ ch: 'b3', diff: 4, type: 'single', q: 'Restaurant: Die KfW bietet 4,5 %; Sie nehmen 4 Mio. € FK auf (EK 1,6 Mio. €). r(EK)?', options: ['6,25 %', '5,58 %', '5,00 %', '3,85 %'], answer: 0,
    expl: 'Zinsen 180.000 €, Gnetto 100.000 € → 100.000/1,6 Mio. = 6,25 %. Leverage-Formel: 5 + (5 − 4,5) · 2,5 = 6,25 %.', src: 'ÜB 4, Aufg. 4c ii/iii' });
  add({ ch: 'b3', diff: 4, type: 'single', q: 'Restaurant (FK 4 Mio. zu 4,5 %, EK 1,6 Mio.): Der Bruttogewinn halbiert sich auf 140.000 €. r(EK)?', options: ['−2,5 %', '+2,5 %', '0 %', '+6,25 %'], answer: 0,
    expl: 'r(GK) = 2,5 % < i = 4,5 % → 2,5 + (2,5 − 4,5) · 2,5 = −2,5 %. Hoher Verschuldungsgrad verstärkt den Gewinneinbruch (negativer Hebel).', src: 'ÜB 4, Aufg. 4c iv/v' });
  add({ ch: 'b3', diff: 4, type: 'single', q: 'Erlingo AG (ÜB 5): GK 125 Mio., Gbrutto 13 Mio., i = 7 %, EK 1 Mio. / FK 124 Mio. Wie verändert sich r(EK), wenn Gbrutto nur 8 Mio. beträgt?',
    options: ['von 432 % auf −68 %', 'von 10,4 % auf 6,4 %', 'von 15,5 % auf 4,7 %', 'bleibt bei 432 %'], answer: 0,
    expl: 'V = 124. Bei 13 Mio.: 10,4 + 3,4 · 124 = 432 %. Bei 8 Mio.: r(GK) = 6,4 % < 7 % → 6,4 − 0,6 · 124 = −68 %. Extreme Verschuldung = extremes Risiko.', src: 'ÜB 5 (alt), Aufg. 7' });
  add({ ch: 'b3', diff: 4, type: 'single', q: 'Druckerei PRINTIN (ÜB 5): EK 100.000 €, Gbrutto 15.000 €. Erweiterung 20.000 € (+3.000 € Gewinn) per Kredit zu 18 %. r(EK) danach?', options: ['14,4 %', '15,6 %', '15,0 %', '18,0 %'], answer: 0,
    expl: 'Zinsen 3.600 €; Gnetto = 18.000 − 3.600 = 14.400 € → 14,4 %. Die Investition rentiert sich mit 15 % < 18 % Zins → negativer Hebel. Bei 12 % Zins: 15,6 %.', src: 'ÜB 5 (alt), Aufg. 8' });
  add({ ch: 'b3', diff: 3, type: 'single', q: 'Schuldenfreies Unternehmen (GK 500.000 €, r(GK) 12 %) eröffnet Filialen mit je 200.000 € Kredit zu 8 %. r(EK) bei einer Filiale?', options: ['13,6 %', '12,0 %', '16,0 %', '20,0 %'], answer: 0,
    expl: 'V = 200.000/500.000 = 0,4 → 12 + (12 − 8) · 0,4 = 13,6 %; allgemein 12 + 1,6 · n %.', src: 'Moodle-Quiz „Rentabilität“, Frage 2' });
  add({ ch: 'b3', diff: 3, type: 'tf', q: 'Ein Kollege erzielt r(GK) = 20 %, aber nur r(EK) = 0,1 %. Das ist nur möglich, wenn der FK-Zins über der Gesamtkapitalrentabilität liegt.', answer: true,
    expl: 'Aus r(EK) = r(GK) + (r(GK) − i)·V folgt: r(EK) < r(GK) nur bei negativem Klammerausdruck, also i > r(GK) – sehr hohe Zinsen bei hoher Verschuldung.', src: 'ÜB 4 (alt), Aufg. 5c; VL Folie 71' });
  add({ ch: 'b3', diff: 2, type: 'single', q: 'Warum stößt die Hebelwirkung des Fremdkapitals an Grenzen?', options: ['Mit zunehmender Verschuldung steigen das Risiko und die von FK-Gebern verlangten Zinsen', 'Weil r(GK) immer kleiner als i ist', 'Weil Fremdkapital nicht besteuert wird', 'Weil Eigenkapital teurer ist'], answer: 0,
    expl: 'Folie 71: Risiken nehmen mit dem Verschuldungsgrad zu, Fremdkapitalgeber verlangen höhere Zinsen.', src: 'VL Folie 71' });
  add({ ch: 'b3', diff: 2, type: 'single', q: 'Reihenfolge der Zielhierarchie (abnehmender Abstraktionsgrad)?', options: ['Vision/Mission → Ziele → Strategien → Maßnahmen', 'Maßnahmen → Strategien → Ziele → Vision', 'Ziele → Vision → Maßnahmen → Strategien', 'Strategien → Vision → Ziele → Maßnahmen'], answer: 0,
    expl: 'Mit jeder Stufe steigt der Operationalisierungsgrad.', src: 'VL Folie 62' });

  /* ===================== Kapitel 4.1 – Organisation ===================== */
  add({ ch: 'b4', diff: 1, type: 'single', q: 'Was unterscheidet Aufbau- von Ablauforganisation?', options: ['Aufbau = Stellen/Abteilungen (Organigramm); Ablauf = Prozesse (Prozessketten)', 'Aufbau = Prozesse; Ablauf = Stellen', 'Aufbau nur bei AGs', 'Kein Unterschied'], answer: 0,
    expl: 'Analyse-Synthese-Konzept: Aufgabensynthese → Aufbau, Arbeitssynthese → Ablauf.', src: 'VL Folie 77; ÜB 5, Aufg. 1' });
  add({ ch: 'b4', diff: 2, type: 'multi', q: 'Auf welchen Prinzipien basiert das Mehrliniensystem?', options: ['Prinzip der Mehrfachunterstellung', 'Prinzip des kürzesten Weges', 'Einheit der Auftragserteilung', 'Fayolsche Brücke'], answer: [0, 1],
    expl: 'Einheit der Auftragserteilung und Fayolsche Brücken gehören zum Einliniensystem.', src: 'VL Folie 82/83; ÜB 5, Aufg. 2' });
  add({ ch: 'b4', diff: 2, type: 'match', q: 'Ordne die Organisationsform zu.', pairs: [['Unternehmensleitung → Materialwirtschaft, Produktion, Marketing', 'funktional (verrichtungsorientiert)'], ['Unternehmensleitung → PKW, LKW, Motorräder', 'divisional (objektorientiert)'], ['Unternehmensleitung → Europa, Asien, USA', 'regionalorientiert']],
    expl: 'Strukturierungsformen der zweiten Hierarchieebene.', src: 'VL Folie 84; ÜB 5, Aufg. 3' });
  add({ ch: 'b4', diff: 2, type: 'match', q: 'Ordne Leitungsspanne und Leitungstiefe zu.', pairs: [['Leitungsspanne', 'Anzahl direkt unterstellter Mitarbeiter'], ['Leitungstiefe', 'Anzahl Hierarchieebenen unterhalb einer Instanz']],
    expl: 'Management-Pyramide.', src: 'VL Folie 81' });
  add({ ch: 'b4', diff: 2, type: 'single', q: 'Was ist ein typischer Nachteil der Matrix-Organisation?', options: ['Kompetenzunklarheiten und Konflikte durch Doppelunterstellung', 'Lange Dienstwege', 'Keine Spezialisierung', 'Nur für Kleinbetriebe geeignet'], answer: 0,
    expl: 'Vorteil: kurze Kommunikationswege. Basiert auf dem Mehrliniensystem.', src: 'VL Folie 85' });
  add({ ch: 'b4', diff: 2, type: 'match', q: 'Primär- oder Sekundärprozess (Wertkette)?', pairs: [['Eingangslogistik', 'Primärprozess'], ['Personalwirtschaft', 'Sekundärprozess'], ['Kundendienst', 'Primärprozess '], ['Technologieentwicklung', 'Sekundärprozess ']],
    expl: 'Primär = unmittelbar wertschöpfend; sekundär = unterstützend, sichert Betriebsbereitschaft.', src: 'VL Folie 78' });
  add({ ch: 'b4', diff: 3, type: 'single', q: 'Was ist ein Stabliniensystem?', options: ['Ein Einliniensystem, in dem Leitungsstellen Stäbe als Leitungshilfsstellen zugeordnet sind', 'Ein Mehrliniensystem mit Matrix', 'Ein System ohne Hierarchie', 'Eine virtuelle Organisation'], answer: 0,
    expl: 'Stäbe beraten, haben aber keine Weisungsbefugnis im Liniensinn.', src: 'VL Folie 82' });
  add({ ch: 'b4', diff: 3, type: 'multi', q: 'Welche negativen Konsequenzen hat zunehmende Arbeitsteilung?', options: ['Zunahme der Abhängigkeiten', 'Zunahme der Komplexität (Abstimmung)', 'Folgeschäden durch Monotonie', 'Sinkende Produktivität'], answer: [0, 1, 2],
    expl: 'Arbeitsteilung steigert die Produktivität; Grenzen sind Koordinationskosten, Technik und Monotonie.', src: 'VL Folie 75' });
  add({ ch: 'b4', diff: 2, type: 'tf', q: 'Informelle Strukturen sollten immer beseitigt werden.', answer: false,
    expl: 'Man soll sich ihrer bewusst sein, positive Wirkungen fördern und hemmende Konflikte beseitigen.', src: 'VL Folie 87' });

  /* ===================== Kapitel 4.2 – Personal ===================== */
  add({ ch: 'b4p', diff: 2, type: 'single', q: 'Speedy GmbH: statt 5 werden 7 Beschäftigte benötigt; 2 gehen (Ruhestand, Wechsel), 1 Zugang steht fest. Netto-Personalbedarf?', options: ['3', '2', '1', '4'], answer: 0,
    expl: '7 − 5 + 2 − 1 = 3.', src: 'VL Folie 95/96' });
  add({ ch: 'b4p', diff: 1, type: 'match', q: 'Skill-Will-Matrix: Welche Führungsaufgabe passt?', pairs: [['hoher Wille, hohe Fähigkeit', 'Delegieren'], ['hoher Wille, geringe Fähigkeit', 'Führen'], ['geringer Wille, hohe Fähigkeit', 'Begeistern'], ['geringer Wille, geringe Fähigkeit', 'Anweisen']],
    expl: 'Faktoren der Arbeitsleistung und Führungsstile.', src: 'VL Folie 102 (PDF-S. 94)' });
  add({ ch: 'b4p', diff: 2, type: 'multi', q: 'Was bestimmt die Arbeitsleistung von Beschäftigten?', options: ['Leistungsvermögen (Skill)', 'Leistungsbereitschaft/Motivation (Will)', 'Leistungsbedingungen', 'Rechtsform des Unternehmens'], answer: [0, 1, 2],
    expl: 'Bestimmungsfaktoren der Arbeitsleistung.', src: 'VL Folie 98; ÜB 5, Aufg. 4' });
  add({ ch: 'b4p', diff: 2, type: 'single', q: 'Welche Aussage zum „richtigen“ Führungsstil trifft die Vorlesung?', options: ['Es gibt keinen allgemein richtigen – er hängt von objektiven und subjektiven Gegebenheiten ab (situativer Ansatz)', 'Der kooperative Stil ist immer richtig', 'Der autoritäre Stil ist am effizientesten', 'Der demokratische Stil ist gesetzlich vorgeschrieben'], answer: 0,
    expl: 'Abhängig von Aufgabe, Organisationsstruktur, Persönlichkeit des Vorgesetzten und Fähigkeiten der Beschäftigten.', src: 'VL Folie 100' });
  add({ ch: 'b4p', diff: 3, type: 'match', q: 'Gesetzliche Vorgaben (Folie 93):', pairs: [['Maximale tägliche Arbeitszeit', '10 Stunden (Ø 8 h)'], ['Lohnfortzahlung bei Krankheit', '6 Wochen'], ['Mindest-Kündigungsfrist', '4 Wochen'], ['Mindesturlaub bei 6-Tage-Woche', '24 Tage']],
    expl: 'Arbeitszeitgesetz, Entgeltfortzahlungsgesetz, § 622 BGB, Bundesurlaubsgesetz.', src: 'VL Folie 93' });
  add({ ch: 'b4p', diff: 2, type: 'multi', q: 'Welche Ziele gehören zu den Sachzielen des Personalmanagements?', options: ['ausreichende Anzahl an Arbeitskräften', 'angemessene Qualifikation', 'richtige Zeit und richtiger Ort', 'niedrige Kosten'], answer: [0, 1, 2],
    expl: 'Kosten und Arbeitsleistung sind Formalziele; Bedürfnisse der Beschäftigten Sozialziele.', src: 'VL Folie 89' });
  add({ ch: 'b4p', diff: 2, type: 'single', q: 'Wozu dient eine Stellenbeschreibung?', options: ['Sie beschreibt personenunabhängig Anforderungen und Einordnung einer Stelle und macht den qualitativen Personalbedarf deutlich', 'Sie ersetzt den Arbeitsvertrag', 'Sie regelt das Gehalt', 'Sie bestimmt den quantitativen Bedarf'], answer: 0,
    expl: 'Soll-Vorstellungen an die Mitarbeiter.', src: 'VL Folie 97' });

  /* ===================== Kapitel 5 – Strategie & Controlling ===================== */
  add({ ch: 'b5', diff: 1, type: 'match', q: 'Ansoff-Matrix: Ordne die Strategie zu.', pairs: [['bestehende Produkte, bestehende Märkte', 'Marktdurchdringung'], ['bestehende Produkte, neue Märkte', 'Marktentwicklung'], ['neue Produkte, bestehende Märkte', 'Produktentwicklung'], ['neue Produkte, neue Märkte', 'Diversifikation']],
    expl: 'Produkt-Markt-Matrix nach Ansoff (Wachstumsstrategien).', src: 'VL Folie 109' });
  add({ ch: 'b5', diff: 1, type: 'single', q: 'Wofür steht das „E“ an fünfter Stelle in PESTEL?', options: ['Environmental (ökologische Faktoren)', 'Economical', 'Ethical', 'Educational'], answer: 0,
    expl: 'Political, Economical, Social, Technological, Environmental, Legal.', src: 'VL Folie 105' });
  add({ ch: 'b5', diff: 2, type: 'match', q: 'Porter-Wettbewerbsstrategien', pairs: [['Kostenführerschaft', 'branchenweit, Kostenvorsprung'], ['Differenzierung', 'branchenweit, Einzigartigkeit aus Käufersicht'], ['Fokus', 'Beschränkung auf ein Segment']],
    expl: 'Strategisches Zielobjekt × strategischer Vorteil.', src: 'VL Folie 110' });
  add({ ch: 'b5', diff: 2, type: 'single', q: 'Was kann man mit einer GAP-Analyse identifizieren?', options: ['Die strategische Lücke zwischen Zielgröße und erwarteter Entwicklung', 'Den internen Zinsfuß', 'Die Leitungsspanne', 'Die Liquidität 2. Grades'], answer: 0,
    expl: 'Zielgröße (Umsatz, Gewinn …) im Zeitverlauf.', src: 'VL Folie 108; ÜB 6, Aufg. 2' });
  add({ ch: 'b5', diff: 2, type: 'single', q: 'Die SWOT-Analyse kombiniert …', options: ['interne Stärken/Schwächen mit externen Chancen/Risiken', 'Kosten und Erlöse', 'Primär- und Sekundärprozesse', 'Produkte und Märkte'], answer: 0,
    expl: 'Situationsanalyse.', src: 'VL Folie 107' });
  add({ ch: 'b5', diff: 2, type: 'single', q: 'Wie lautet die DuPont-Grundgleichung?', options: ['ROI = Umsatzrentabilität × Kapitalumschlag', 'ROI = Gewinn − Kapital', 'ROI = Umsatz / Gewinn', 'ROI = EK / FK'], answer: 0,
    expl: '(Gewinn/Umsatz) × (Umsatz/Gesamtkapital) = Gewinn/Gesamtkapital.', src: 'VL Folie 116/117' });
  add({ ch: 'b5', diff: 4, type: 'cloze', q: 'DÜPON OHG (ÜB 6): Umsatz 1.100.000 €, Fertigungs- 400.000 €, Verwaltungs- 200.000 €, Vertriebsaufwand 300.000 €; AV 500.000 €, Vorräte 100.000 €, Forderungen 50.000 €, Kasse 50.000 €.',
    text: 'Gewinn = {{200000|200.000}} € · Gesamtvermögen = {{700000|700.000}} € · Umsatzrentabilität ≈ {{18,18|18.18|18,2|18.2}} % · Kapitalumschlag ≈ {{1,57|1.57|1,571}} · ROI ≈ {{28,57|28.57|28,6|28.6}} %',
    expl: 'Gewinn = Umsatz − Aufwand; Gesamtvermögen = AV + UV; ROI = UR × KU = 200.000/700.000.', src: 'ÜB 6 (alt), Aufg. 7' });
  add({ ch: 'b5', diff: 3, type: 'single', q: 'Discounter und Luxusyacht-Reederei haben gleiche Kapitalbindung und gleichen ROI. Woran erkennt man das Schema des Discounters?', options: ['Niedrige Umsatzrentabilität, hoher Kapitalumschlag', 'Hohe Umsatzrentabilität, niedriger Kapitalumschlag', 'Höherer ROI', 'Kein Unterschied erkennbar'], answer: 0,
    expl: 'Discounter: geringe Marge, sehr häufiger Umschlag; Luxusyachten: hohe Marge, seltener Umschlag. (Anwendung der DuPont-Logik.)', src: 'ÜB 6, Aufg. 3; VL Folie 117' });
  add({ ch: 'b5', diff: 2, type: 'match', q: 'Ordne die Berichtsart zu.', pairs: [['Standardbericht', 'gleiche Form, gleiche Inhalte, regelmäßig'], ['Abweichungsbericht', 'bei Über-/Unterschreitung von Toleranzwerten'], ['Bedarfsbericht', 'auf Aufforderung für spezielle Zwecke']],
    expl: 'Berichtswesen im Controlling.', src: 'VL Folie 113' });
  add({ ch: 'b5', diff: 2, type: 'single', q: 'Welche Rolle wird dem Controlling zugeschrieben?', options: ['„Lotse der Zielerreichung“ – koordiniert Planungs-, Kontroll- und Informationsaktivitäten', 'Es trifft alle Entscheidungen', 'Es führt die Buchhaltung', 'Es ersetzt das Management'], answer: 0,
    expl: 'Management verantwortet Inhalte und Entscheidungen; Controlling gestaltet und koordiniert die Prozesse.', src: 'VL Folie 111/112' });
  add({ ch: 'b5', diff: 3, type: 'multi', q: 'Welche Aufgaben hat das Kontrollwesen?', options: ['Beobachtungs- und Abbildungsfunktion', 'Beurteilungsfunktion', 'Präventivfunktion', 'Finanzierungsfunktion'], answer: [0, 1, 2],
    expl: 'Kontrolle = Analyse von Soll-Wird/Ist-Abweichungen.', src: 'VL Folie 113' });
  add({ ch: 'b5', diff: 3, type: 'single', q: 'Ordne die strategische Planung: Welche Reihenfolge stimmt?', options: ['Zielbildung → Umweltanalyse → Unternehmensanalyse → Strategiewahl → Implementierung', 'Strategiewahl → Zielbildung → Implementierung', 'Implementierung → Analyse → Ziele', 'Umweltanalyse → Implementierung → Zielbildung'], answer: 0,
    expl: 'Fünf Komponenten mit Rückkopplung (Bea/Haas).', src: 'VL Folie 104' });

  /* ===================== Kapitel 6 – Rechnungswesen ===================== */
  add({ ch: 'b6', diff: 1, type: 'match', q: 'Teilbereiche der Kostenrechnung', pairs: [['Kostenartenrechnung', 'Welche Kosten?'], ['Kostenstellenrechnung', 'Wo?'], ['Kostenträgerrechnung', 'Wofür?']],
    expl: 'Erfassung, Verteilung, Zurechnung der Kosten.', src: 'VL Folie 136' });
  add({ ch: 'b6', diff: 1, type: 'single', q: 'Was steht auf der Passivseite der Bilanz?', options: ['Mittelherkunft: Eigen- und Fremdkapital', 'Mittelverwendung: Anlage- und Umlaufvermögen', 'Erträge und Aufwendungen', 'Ein- und Auszahlungen'], answer: 0,
    expl: 'Aktiva = Mittelverwendung, Passiva = Mittelherkunft; beide Seiten sind immer gleich groß.', src: 'VL Folie 124/125' });
  add({ ch: 'b6', diff: 2, type: 'match', q: 'Fix oder variabel? (Beispiele Folie 139)', pairs: [['Mieten', 'fixe Kosten'], ['Rohstoffe', 'variable Kosten'], ['Abschreibungen', 'fixe Kosten '], ['Strom in der Produktion', 'variable Kosten ']],
    expl: 'Fix = unabhängig von der Ausbringungsmenge.', src: 'VL Folie 139' });
  add({ ch: 'b6', diff: 2, type: 'match', q: 'Einzel- oder Gemeinkosten?', pairs: [['Fertigungslöhne', 'Einzelkosten'], ['Verwaltung', 'Gemeinkosten'], ['Fracht für einen Auftrag', 'Einzelkosten '], ['Kantine', 'Gemeinkosten ']],
    expl: 'Gemeinkosten werden über Schlüssel verteilt.', src: 'VL Folie 139' });
  add({ ch: 'b6', diff: 2, type: 'match', q: 'Ordne die Rechengröße dem Vorgang zu (Folie 122).', pairs: [['Geld an Lieferanten überweisen', 'Auszahlung'], ['Rohstoffe verbrauchen', 'Aufwand'], ['Rohstoffe und Rechnung gehen ein', 'Ausgabe'], ['Geld vom Kunden erhalten', 'Einzahlung']],
    expl: 'Auszahlung/Einzahlung = Zahlungsmittel; Ausgabe/Einnahme = Geldvermögen; Aufwand/Ertrag = Gesamtvermögen.', src: 'VL Folie 122' });
  add({ ch: 'b6', diff: 2, type: 'tf', q: 'Der Cashflow enthält – anders als der Jahresüberschuss – keine zahlungsunwirksamen Aufwendungen wie Abschreibungen.', answer: true,
    expl: 'Cashflow = Einzahlungen − Auszahlungen; Maß der Innenfinanzierungskraft.', src: 'VL Folie 128' });
  add({ ch: 'b6', diff: 2, type: 'single', q: 'Welche Bestandteile bilden nach § 242 HGB den Jahresabschluss?', options: ['Bilanz und GuV (bei KapG zusätzlich Anhang)', 'Nur die Bilanz', 'Kapitalflussrechnung und Lagebericht', 'Kostenstellenrechnung'], answer: 0,
    expl: '§ 242 Abs. 3 HGB: Bilanz und GuV bilden den Jahresabschluss.', src: 'VL Folie 120, 123' });
  add({ ch: 'b6', diff: 2, type: 'match', q: 'Ordne die Kalkulationsart zu.', pairs: [['Divisionskalkulation', 'Einproduktunternehmen'], ['Äquivalenzziffernkalkulation', 'verwandte Produkte'], ['Zuschlagskalkulation', 'unterschiedliche Produkte']],
    expl: 'Kostenträgerrechnungen.', src: 'VL Folie 145/146' });
  add({ ch: 'b6', diff: 2, type: 'single', q: 'K(x) = 60.000 + 24x, p = 60 €. Break-even-Menge?', options: ['≈ 1.667 Flaschen', '1.000 Flaschen', '2.500 Flaschen', '1.000.000 Flaschen'], answer: 0,
    expl: 'x(BE) = Kf / (p − kv) = 60.000 / 36 ≈ 1.666,7 → 1.667.', src: 'ÜB 7 (alt), Aufg. 6' });
  add({ ch: 'b6', diff: 3, type: 'cloze', q: 'Höhlenwhisky: K(x) = 60.000 + 24x, p = 60 €, geplante Menge 1.000 Flaschen.', text: 'Stückkosten k = {{84}} € · db = {{36}} € · DB = {{36000|36.000}} € · Gewinn G = {{-24000|−24000|-24.000|−24.000}} €',
    expl: 'k = 84.000/1.000; db = 60 − 24; DB = 36 × 1.000; G = DB − Kf = 36.000 − 60.000.', src: 'ÜB 7 (alt), Aufg. 6b' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Felgen: K(x) = 55.000 + 16x. Zukauf kostet 31 €/Stück. Ab welcher Menge lohnt die Eigenfertigung?', options: ['ab ≈ 3.667 Stück', 'ab 1.774 Stück', 'ab 5.000 Stück', 'immer'], answer: 0,
    expl: '55.000 + 16x = 31x → x = 55.000/15 ≈ 3.666,7.', src: 'Moodle-Quiz „Kostenfunktionen“, 1c' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Felgen: Neue Stanzmaschine – Fixkosten 85.000 € statt 55.000 €, kv 12 € statt 16 €. Ab welcher Menge lohnt sie sich?', options: ['ab 7.500 Stück', 'ab 3.000 Stück', 'ab 30.000 Stück', 'ab 2.143 Stück'], answer: 0,
    expl: 'Kritische Menge = ΔKf / Δkv = 30.000 / 4 = 7.500.', src: 'Moodle-Quiz „Kostenfunktionen“, 1d' });
  add({ ch: 'b6', diff: 4, type: 'cloze', q: 'Konditorei (Moodle-Quiz): je Torte 0,5 l Sahne (5 €/l), 5 Eier (0,15 €), 0,2 kg Mehl (0,40 €/kg), 0,6 h Arbeit (30 €/h), 1,50 € Aromen/Deko, 0,5 kg Zucker (0,60 €/kg); jährlich Miete 6.100 €, Nebenkosten 2.500 €, Leasing 500 €.',
    text: 'kv = {{23,13|23.13}} € · Kf = {{9100|9.100}} € · Mindestpreis bei 2.000 Torten = {{27,68|27.68|27,68 €}} € · Mindestmenge bei p = 30 € = {{1325|1.325}} Torten',
    expl: 'kv = 2,50 + 0,75 + 0,08 + 18 + 1,50 + 0,30 = 23,13 €; Kf = 9.100 €. k(2.000) = 9.100/2.000 + 23,13 = 27,68 €. x(BE) = 9.100/(30 − 23,13) = 1.324,6 → 1.325.', src: 'Moodle-Quiz „Kostenfunktionen“, Frage 2' });
  add({ ch: 'b6', diff: 4, type: 'single', q: 'Dubai-Schokolade (ÜB 7): Wie lautet die Kostenfunktion je Tafel? (Zutaten je 5 Tafeln: 200 g Zartbitter à 0,90 €/100 g, 100 g weiß à 0,85 €/100 g, 50 g Pistazien à 3,50 €/100 g, 40 g Puderzucker à 2,50 €/kg, 100 g Engelshaar à 10 €/kg, 10 g Sesampaste à 1 €/100 g; 1 h Arbeit à 40 € für 20 Tafeln; 0,50 € Verpackung je Tafel; Miete 2.400 €, Nebenkosten 600 €, Leasing 500 €)',
    options: ['K(x) = 3.500 + 3,62x', 'K(x) = 3.500 + 1,62x', 'K(x) = 3.000 + 3,62x', 'K(x) = 2.400 + 4,12x'], answer: 0,
    expl: 'Je Tafel: 0,36 + 0,17 + 0,35 + 0,02 + 0,20 + 0,02 = 1,12 € Material + 2,00 € Arbeit + 0,50 € Verpackung = 3,62 €. Kf = 2.400 + 600 + 500 = 3.500 €. Bei 4.000 Tafeln: Mindestpreis ≈ 4,50 €.', src: 'ÜB 7 (alt), Aufg. 3' });
  add({ ch: 'b6', diff: 4, type: 'single', q: 'Woody GmbH (ÜB 8): Die Fixkosten beruhen auf nicht kündbaren Verträgen. Welche Produkte sollten aus dem Programm genommen werden? (db: Lichterbogen 12, Türkranz 4, Honigkerzen 6,50, Adventskranz −6)',
    options: ['Nur der Adventskranz', 'Honigkerzen und Adventskranz', 'Nur die Honigkerzen', 'Keines'], answer: 0,
    expl: 'Nicht kündbare Fixkosten fallen ohnehin an → Entscheidung nach Teilkosten: alle Produkte mit positivem db behalten. Honigkerzen haben zwar nach Vollkosten −175 €, tragen aber 2.275 € DB zur Fixkostendeckung bei.', src: 'ÜB 8 (alt), Aufg. 3; VL Folie 151/152' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Festplatte F2 (Moodle): p = 146 €, kv = 64 €, Absatz 2.910 ME, Kf = 100.000 €. Break-even-Menge?', options: ['≈ 1.219,5 ME', '≈ 685 ME', '2.910 ME', '≈ 1.562,5 ME'], answer: 0,
    expl: 'db = 82 €; DB = 238.620 €; x(BE) = 100.000/82 ≈ 1.219,5.', src: 'Moodle-Quiz „Deckungsbeitragsrechnung“' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Kostenstellengemeinkosten 100.000 € werden nach den Schlüsseln 1 : 4 : 11 : 30 : 16 : 18 verteilt. Welcher Betrag entfällt auf die Endkostenstelle Fertigung (Schlüssel 30)?', options: ['37.500 €', '30.000 €', '33.333 €', '25.000 €'], answer: 0,
    expl: 'Summe der Schlüssel = 80 → 1.250 € je Einheit → 30 × 1.250 = 37.500 €.', src: 'VL Folie 143 (Zwischenübung)' });
  add({ ch: 'b6', diff: 2, type: 'tf', q: 'Einzelkosten sind stets variabel, Gemeinkosten meistens fix.', answer: true,
    expl: 'Zusammenhang laut Folie 137.', src: 'VL Folie 137' });
  add({ ch: 'b6', diff: 2, type: 'single', q: 'Was beschreibt die Fixkostendegression?', options: ['Sinkende fixe Stückkosten bei steigender Auslastung', 'Sinkende Fixkosten insgesamt', 'Steigende variable Kosten', 'Sprungfixe Kosten'], answer: 0,
    expl: 'kf(x) = Kf/x: z. B. Kf = 100 € → 100, 50, 33, 25, 20 € je Stück.', src: 'VL Folie 140' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Programmplanung bei Engpass: Wonach werden Produkte gereiht?', options: ['Nach dem Deckungsbeitrag je Einheit des Engpassfaktors', 'Nach dem Stückdeckungsbeitrag', 'Nach den Vollkosten', 'Nach dem Preis'], answer: 0,
    expl: 'db je Engpasseinheit = db / Engpassbelastung je Stück. Ohne Engpass bleiben alle Produkte mit positivem db.', src: 'VL Folie 152' });
  add({ ch: 'b6', diff: 3, type: 'single', q: 'Eine Hebebühne hat Selbstkosten von 1.450 €. Gewinnaufschlag 15 %, Skonto 3 %, Rabatt 5 %, USt 19 %. Bruttoverkaufspreis (Skonto/Rabatt „im Hundert“)?', options: ['≈ 2.153,36 €', '≈ 2.112,96 €', '1.985,05 €', '1.667,50 €'], answer: 0,
    expl: '1.450 × 1,15 = 1.667,50 → /0,97 = 1.719,07 → /0,95 = 1.809,55 → × 1,19 = 2.153,36 €. Hinweis: Den Rechenweg für Skonto/Rabatt nennen die Folien nicht ausdrücklich.', src: 'ÜB 7 (alt), Aufg. 5; VL Folie 147' });
  add({ ch: 'b6', diff: 4, type: 'cloze', q: 'Bilanz (Moodle-Quiz „Bilanz und Liquidität“): Grundstücke 800.000, Anlagen 600.000, Lager 540.000, Forderungen 300.000, Bank 100.000, Kasse 20.000; gezeichnetes Kapital 800.000, Rücklagen 340.000, Jahresüberschuss 50.000, langfr. Verbindlichkeiten 810.000, kurzfr. 360.000.',
    text: 'Bilanzsumme = {{2360000|2.360.000}} € · Eigenkapital = {{1190000|1.190.000}} € · Fremdkapital = {{1170000|1.170.000}} €',
    expl: 'Aktiva 1.400.000 + 960.000 = 2.360.000 = Passiva. EK = 800.000 + 340.000 + 50.000.', src: 'Übungen alt, Moodle-Quiz S. 1' });

  /* ===================== Kapitel 7.1 – Investition ===================== */
  add({ ch: 'b7i', diff: 1, type: 'match', q: 'Ordne das statische Verfahren seinen Rechengrößen zu.', pairs: [['Kostenvergleichsrechnung', 'Kosten (eine Periode)'], ['Gewinnvergleichsrechnung', 'Kosten und Erlöse (eine Periode)'], ['Amortisationsrechnung', 'Ein- und Auszahlungen (mehrere Perioden)']],
    expl: 'Auch die Rentabilitätsvergleichsrechnung nutzt Kosten und Erlöse einer Periode.', src: 'VL Folie 161/177' });
  add({ ch: 'b7i', diff: 1, type: 'single', q: 'Wann ist eine Investition nach der Kapitalwertmethode vorteilhaft?', options: ['K0 > 0', 'K0 < 0', 'K0 = A0', 'r < i'], answer: 0,
    expl: 'Der Kapitalwert entspricht der Vermögensänderung durch die Investition.', src: 'VL Folie 192' });
  add({ ch: 'b7i', diff: 2, type: 'single', q: 'Wie berechnet man die kalkulatorischen Zinsen bei linearer Abschreibung?', options: ['(A0 + Ln)/2 × i', '(A0 − Ln)/n × i', 'A0 × i', 'Ln × i'], answer: 0,
    expl: 'Durchschnittsmethode: Ø gebundenes Kapital × Zinssatz, unabhängig von der Finanzierung.', src: 'VL Folie 165' });
  add({ ch: 'b7i', diff: 2, type: 'single', q: 'Wie berechnet man die kalkulatorische Abschreibung?', options: ['(A0 − Ln) / n', '(A0 + Ln) / 2', 'A0 × i', 'A0 / EÜ'], answer: 0,
    expl: 'Kontinuierlicher Werteverzehr über die Nutzungsdauer.', src: 'VL Folie 163' });
  add({ ch: 'b7i', diff: 2, type: 'single', q: 'Warum rechnet man bei der Amortisationsdauer mit dem Cashflow statt mit dem Gewinn?', options: ['Weil es um den tatsächlichen Rückfluss der Mittel geht – die Abschreibung ist nicht auszahlungswirksam', 'Weil der Gewinn immer negativ ist', 'Weil der Cashflow kleiner ist', 'Weil die Zinsen sonst doppelt zählen'], answer: 0,
    expl: 'EÜ = Gbrutto + kalkulatorische Abschreibung; Amortisationsdauer = A0 / EÜ.', src: 'VL Folie 178; ÜB 9, Aufg. 2' });
  add({ ch: 'b7i', diff: 2, type: 'match', q: 'Ordne die Zinsfaktoren ihrer Fragestellung zu.', pairs: [['Aufzinsungsfaktor', 'Endwert einer heutigen Zahlung'], ['Abzinsungsfaktor', 'Barwert einer künftigen Zahlung'], ['Rentenbarwertfaktor', 'Barwert einer konstanten jährlichen Rente'], ['Annuitätenfaktor', 'jährliche Rente aus einem Gegenwartswert']],
    expl: 'Finanzmathematische Grundlagen.', src: 'VL Folie 187' });
  add({ ch: 'b7i', diff: 2, type: 'tf', q: 'In der Klausur steht die RBF-Tabelle zur Verfügung, die Abzinsungstabelle dagegen nicht.', answer: true,
    expl: 'Hinweise auf Folie 190 und 191.', src: 'VL Folie 190/191' });
  add({ ch: 'b7i', diff: 2, type: 'multi', q: 'Welche Nachteile haben statische Investitionsrechnungsverfahren?', options: ['Zeitliche Unterschiede der Zahlungen bleiben unberücksichtigt', 'Grobe Vereinfachung durch Durchschnittswerte', 'Effektive Nutzungsdauer bleibt unberücksichtigt', 'Sie sind schwer zu berechnen'], answer: [0, 1, 2],
    expl: 'Vorteil ist gerade die große Praktikabilität (einfache Berechnung).', src: 'VL Folie 182' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'Welche Entscheidungsregel gilt für den internen Zinsfuß r im Vergleich zum Kalkulationszins i?', options: ['r > i vorteilhaft, r = i indifferent, r < i unvorteilhaft', 'r < i vorteilhaft', 'r = 0 vorteilhaft', 'r hat keine Aussagekraft'], answer: 0,
    expl: 'Investitionsnutzen (r) vs. Kapitalkosten (i).', src: 'VL Folie 203' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'TBW AG: Anlage 1 (A0 160.000 €, n = 10, Ln = 0, i = 8 %). Kalk. Abschreibung und kalk. Zinsen?', options: ['16.000 € und 6.400 €', '16.000 € und 12.800 €', '8.000 € und 6.400 €', '17.600 € und 8.000 €'], answer: 0,
    expl: 'AfA = 160.000/10; Zinsen = 160.000/2 × 8 % = 6.400 €.', src: 'VL Folie 169' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'TBW AG: Gesamtkosten 68.600 € (Anl. 1) und 69.600 € (Anl. 2), Erlöse 80.000 € bzw. 84.800 €, kalk. Zinsen 6.400 € bzw. 8.800 €, Ø Kapital 80.000 € bzw. 110.000 €. Welche Anlage ist rentabler?', options: ['Anlage 1 mit 22,3 % (Anlage 2: 21,8 %)', 'Anlage 2 mit 24,0 %', 'Beide 19 %', 'Anlage 2 mit 21,8 % (Anlage 1: 14,3 %)'], answer: 0,
    expl: 'Gbrutto = 11.400 + 6.400 = 17.800 € → 22,25 %; Anlage 2: 15.200 + 8.800 = 24.000 €/110.000 € = 21,8 %. Anlage 2 hat den höheren Gewinn, Anlage 1 die höhere Rentabilität.', src: 'VL Folie 176/179' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'TBW AG Anlage 1: Gbrutto 17.800 €, AfA 16.000 €, A0 160.000 €. Amortisationsdauer?', options: ['≈ 4,73 Jahre', '≈ 8,99 Jahre', '10 Jahre', '≈ 2,13 Jahre'], answer: 0,
    expl: 'EÜ = 17.800 + 16.000 = 33.800 € → 160.000/33.800 ≈ 4,73 < Nutzungsdauer 10 → vorteilhaft.', src: 'VL Folie 179' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'Kapitalwert bei i = 9 %: A0 = 1.000; EÜ 800, 300, 400 (A) bzw. 300, 800, 200 (B). Ergebnis?', options: ['A ≈ +295, B ≈ +103 → A vorteilhafter', 'A ≈ +500, B ≈ +300', 'A und B gleich, da gleiche Summe', 'B vorteilhafter'], answer: 0,
    expl: 'Frühe Rückflüsse sind mehr wert: A = −1.000 + 733,94 + 252,50 + 308,87 = 295,32.', src: 'VL Folie 194' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'A0 = 1.400 €, konstanter EÜ 200 €, n = 10. Interner Zinsfuß laut RBF-Tabelle?', options: ['≈ 7 %', '≈ 14 %', '≈ 10 %', '≈ 3 %'], answer: 0,
    expl: 'RBF = A0/EÜ = 7,0; in der Zeile n = 10 liegt RBF(7 %) = 7,02 → r ≈ 7 %.', src: 'VL Folie 204' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'K0 = 1.000 €, i = 10 %, n = 2. Wie hoch ist die gleichbleibende Annuität?', options: ['576,19 €', '500,00 €', '550,00 €', '605,00 €'], answer: 0,
    expl: 'a = K0 / RBF(2; 10 %) = 1.000 / 1,7355 ≈ 576,19 €.', src: 'VL Folie 200' });
  add({ ch: 'b7i', diff: 4, type: 'cloze', q: 'ÜB 10, Aufg. 6: Spezialmaschine A0 = 5.000 €, EÜ 2.000 €/Jahr, n = 4, i = 8 % (RBF = 3,3121).',
    text: 'K0 ≈ {{1624,25|1624.25|1.624,25|1624|1624,3}} € · Annuität ≈ {{490,40|490.40|490,4|490}} € · interner Zinsfuß laut Tabelle (A0/EÜ = 2,5) ≈ {{22|22 %|20-25}} %',
    expl: 'K0 = −5.000 + 2.000 × 3,3121; a = K0/RBF; RBF 2,5 liegt in Zeile n = 4 zwischen 20 % (2,59) und 25 % (2,36) → ca. 22 % (Tabellenlösung, keine Interpolation verlangt).', src: 'ÜB 10 (alt), Aufg. 6a' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'ÜB 10, Aufg. 5: Zahlungsreihe −6.000; 2.000; 1.500; 1.700; 1.800 (inkl. Liquidationserlös). Kapitalwert bei 8 %?', options: ['≈ −189,57 € → nicht vorteilhaft', '≈ +74,91 € → vorteilhaft', '≈ +1.000 € → vorteilhaft', '0 € → indifferent'], answer: 0,
    expl: 'Barwerte: 1.851,85 + 1.286,01 + 1.349,52 + 1.323,05 = 5.810,43 → K0 = −189,57. Bei 6 % wäre K0 ≈ +74,91 (vorteilhaft).', src: 'ÜB 10 (alt), Aufg. 5a/b' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'ÜB 10, Aufg. 5d: Wie hoch muss ein konstanter EÜ sein, damit sich A0 = 6.000 € bei 8 % und n = 4 rentiert?', options: ['≈ 1.811,52 €', '1.500 €', '≈ 1.750 €', '≈ 2.000 €'], answer: 0,
    expl: 'K0 = 0 ⇔ EÜ = A0 / RBF(4; 8 %) = 6.000 / 3,3121 ≈ 1.811,52 €.', src: 'ÜB 10 (alt), Aufg. 5d' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'Rocket GmbH (ÜB 11), Batterien: A0 1 Mio. €, n = 5, Ln = 0, kv 27 €, p 35 €, Kf betr. 300.000 €, i = 8 %, 80.000 ME. Wie hoch ist der statische Cashflow EÜ?', options: ['340.000 €', '100.000 €', '140.000 €', '540.000 €'], answer: 0,
    expl: 'EÜ = U − Kv − Kf(betr.) = 2.800.000 − 2.160.000 − 300.000 = 340.000 € (= Gbrutto 140.000 + AfA 200.000).', src: 'ÜB 11 (alt), Aufg. 3' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'Rocket GmbH: Raketen-Sets (EÜ 300.000 €) vs. Batterien (EÜ 340.000 €), beide A0 1 Mio. €, n = 5, i = 8 %. Welche Alternative nach Kapitalwert?', options: ['Batterien (K0 ≈ 357.500 € vs. ≈ 197.800 €)', 'Raketen-Sets', 'Beide gleich', 'Keine – beide K0 < 0'], answer: 0,
    expl: 'K0 = −1.000.000 + EÜ × 3,9927. Gleiche A0 und n → auch Annuität und interner Zinsfuß (Batterien ≈ 20 %, Raketen ≈ 15 %) sprechen für die Batterien.', src: 'ÜB 11 (alt), Aufg. 3a' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'Rocket GmbH, Raketen-Sets (db 5 €, Kf betr. 100.000 €, A0 1 Mio. €, n = 5): Welche Absatzmenge ergibt einen internen Zinsfuß von 13 % (RBF(5; 13 %) ≈ 3,52)?', options: ['≈ 76.800 Stück', '≈ 80.000 Stück', '≈ 56.800 Stück', '≈ 100.000 Stück'], answer: 0,
    expl: 'Benötigter EÜ = 1.000.000 / 3,52 ≈ 284.100 €; EÜ = 5x − 100.000 → x ≈ 76.800.', src: 'ÜB 11 (alt), Aufg. 3b' });
  add({ ch: 'b7i', diff: 4, type: 'cloze', q: 'Kaffeemaschinen (ÜB 8): Kapselgerät A0 80 €, Ln 0, Reinigung 10 €/Jahr, Standby 30 €/Jahr, Kapsel 0,20 €; Vollautomat A0 300 €, Ln 50 €, Reinigung 20 €, Standby 60 €, Bohnen 0,12 €/Tasse; n = 5, i = 5 %, 3.000 Becher.',
    text: 'Gesamtkosten Kapsel = {{658}} € · Gesamtkosten Vollautomat = {{498,75|498.75}} € · kritische Menge bzgl. Kosten ≈ {{1009|1.009|1009,4|1010}} Becher',
    expl: 'Kapsel: AfA 16 + Zinsen 2 + 40 = Kf 58; + 600 = 658 €. Vollautomat: AfA 50 + Zinsen 8,75 (Ø 175 €) + 80 = 138,75; + 360 = 498,75 €. x_krit = 80,75 / 0,08 ≈ 1.009.', src: 'ÜB 8 (alt), Aufg. 4' });
  add({ ch: 'b7i', diff: 4, type: 'single', q: 'Metallbetrieb (ÜB 9): A: Kf gesamt 103.000 €, kv 5,50 €, p 15,50 €; B: Kf 121.000 €, kv 4,00 €, p 15,00 €. Kritische Auslastung bzgl. Gewinn?', options: ['18.000 ME', '12.000 ME', '10.300 ME', '11.000 ME'], answer: 0,
    expl: 'db A = 10 €, db B = 11 € → ΔKf/Δdb = 18.000/1 = 18.000 ME (bzgl. Kosten: 18.000/1,5 = 12.000 ME). Gewinnschwellen: A 10.300, B 11.000 ME.', src: 'ÜB 9 (alt), Aufg. 3' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'Sie legen 10.000 € zu 2,5 % für 10 Jahre an. Endwert?', options: ['≈ 12.800,85 €', '12.500,00 €', '≈ 11.250 €', '≈ 13.000 €'], answer: 0,
    expl: '10.000 × 1,025¹⁰ ≈ 12.800,85 €.', src: 'ÜB 9 (alt), Aufg. 4' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: '100.000 € Lotteriegewinn zu 4 % sollen über 10 Jahre in gleichen Beträgen verbraucht werden. Maximale Jahressumme?', options: ['≈ 12.329 €', '10.000 €', '14.000 €', '≈ 8.111 €'], answer: 0,
    expl: 'Annuität = 100.000 / RBF(10; 4 %) = 100.000 / 8,1109 ≈ 12.329,09 €.', src: 'ÜB 9 (alt), Aufg. 7' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'Moodle-Quiz: Maschine A0 90.000 €, EÜ 25.000 €/Jahr, n = 4, i = 6 %. Kapitalwert?', options: ['≈ −3.372 €', '≈ +10.000 €', '≈ +3.372 €', '0 €'], answer: 0,
    expl: 'RBF(4; 6 %) = 3,4651 → 25.000 × 3,4651 = 86.627,64 → K0 ≈ −3.372 € → nicht vorteilhaft.', src: 'Moodle-Quiz „dyn. Investitionsrechnung“ b' });
  add({ ch: 'b7i', diff: 3, type: 'single', q: 'Kredit 80.000 €, Laufzeit 5 Jahre, 8 %. Jährliche Annuität (Tilgung + Zinsen)?', options: ['≈ 20.036,52 €', '16.000 €', '≈ 22.400 €', '≈ 17.280 €'], answer: 0,
    expl: '80.000 / RBF(5; 8 %) = 80.000 / 3,9927 ≈ 20.036,52 €.', src: 'Moodle-Quiz „dyn. Investitionsrechnung“ c' });
  add({ ch: 'b7i', diff: 2, type: 'multi', q: 'Welche Annahmen liegen den dynamischen Verfahren zugrunde?', options: ['Vollkommener Kapitalmarkt mit einheitlichem Zinssatz', 'Zahlungen lassen sich verursachungsgerecht zuordnen', 'Alle künftigen Zahlungen sind in t = 0 bekannt', 'Steuern und Inflation werden berücksichtigt'], answer: [0, 1, 2],
    expl: 'Steuer- und Inflationseinflüsse sowie Unsicherheit werden nicht berücksichtigt.', src: 'VL Folie 185/186' });
  add({ ch: 'b7i', diff: 3, type: 'tf', q: 'Wechselt das Vorzeichen des Zahlungsstroms mehrfach, kann es keinen oder mehrere interne Zinsfüße geben.', answer: true,
    expl: 'Kritik an der Methode (Nichtexistenz, Mehrdeutigkeit). Klausur: nur Normalinvestitionen.', src: 'VL Folie 205' });
  add({ ch: 'b7i', diff: 2, type: 'multi', q: 'Welche qualitativen Kriterien nennt die Vorlesung für Investitionsentscheidungen?', options: ['Flexibilität und Störanfälligkeit (technisch)', 'Auswirkungen auf Arbeitssicherheit (sozial)', 'Realisierbare Produktqualität (marktbezogen)', 'Kalkulationszinsfuß'], answer: [0, 1, 2],
    expl: 'Markt-, technische und soziale Kriterien.', src: 'VL Folie 206' });

  /* ===================== Kapitel 7.2 – Finanzierung ===================== */
  add({ ch: 'b7f', diff: 1, type: 'match', q: 'Ordne die Finanzierungsform der Matrix zu.', pairs: [['Beteiligungsfinanzierung', 'Eigen- und Außenfinanzierung'], ['Kreditfinanzierung', 'Fremd- und Außenfinanzierung'], ['Selbstfinanzierung', 'Eigen- und Innenfinanzierung'], ['Finanzierung aus Rückstellungen', 'Fremd- und Innenfinanzierung']],
    expl: 'Einteilung nach Herkunft (innen/außen) und Rechtsstellung der Kapitalgeber (Eigen/Fremd).', src: 'VL Folie 202' });
  add({ ch: 'b7f', diff: 1, type: 'single', q: 'Wo ist ein normales Bankdarlehen einzuordnen?', options: ['Fremd- und Außenfinanzierung (Kreditfinanzierung)', 'Eigen- und Innenfinanzierung', 'Kapitalsubstitution', 'Beteiligungsfinanzierung'], answer: 0,
    expl: 'Klassische Form der mittel- und langfristigen Kreditfinanzierung kleiner und mittlerer Unternehmen.', src: 'VL Folie 206; ÜB 11, Aufg. 4' });
  add({ ch: 'b7f', diff: 2, type: 'match', q: 'Liquiditätsgrade', pairs: [['Liquidität 1. Grades', 'liquide Mittel / kurzfr. FK'], ['Liquidität 2. Grades', '(liquide Mittel + kurzfr. Forderungen) / kurzfr. FK'], ['Liquidität 3. Grades', 'Umlaufvermögen / kurzfr. FK']],
    expl: 'Folie 215.', src: 'VL Folie 215' });
  add({ ch: 'b7f', diff: 2, type: 'single', q: 'Was ist der Unterschied zwischen Kunden- und Lieferantenkredit?', options: ['Kundenkredit = An-/Vorauszahlung des Abnehmers; Lieferantenkredit = vom Lieferanten gewährtes Zahlungsziel', 'Beide sind Bankkredite', 'Kundenkredit ist langfristig, Lieferantenkredit kurzfristig mit Pfand', 'Kein Unterschied'], answer: 0,
    expl: 'Beide sind kurzfristige Handelskredite.', src: 'VL Folie 206; ÜB 11, Aufg. 5' });
  add({ ch: 'b7f', diff: 3, type: 'single', q: '3 % Skonto bei Zahlung innerhalb 5 Tagen, sonst Ziel 30 Tage. Effektiver Jahreszins des Lieferantenkredits?', options: ['≈ 44,5 %', '3 %', '≈ 36 %', '≈ 13,1 %'], answer: 0,
    expl: 'i = 0,03/0,97 × 360/25 ≈ 44,5 % – Skonto ziehen lohnt sich fast immer.', src: 'ÜB 11 (alt), Aufg. 6a; VL Folie 207' });
  add({ ch: 'b7f', diff: 4, type: 'single', q: 'Fortsetzung: Ab welchem Zahlungsziel ist der Lieferantenkredit (3 %, 5 Tage) günstiger als ein FK-Zins von 9 %?', options: ['ab ca. 129 Tagen', 'ab 90 Tagen', 'ab 30 Tagen', 'nie'], answer: 0,
    expl: '0,03/0,97 × 360/(Z − 5) ≤ 0,09 ⇔ Z − 5 ≥ 123,7 ⇔ Z ≥ ≈ 128,7 Tage. Bei Z = 90 Tagen liegt der Effektivzins noch bei ≈ 13,1 %.', src: 'ÜB 11 (alt), Aufg. 6b/c' });
  add({ ch: 'b7f', diff: 2, type: 'single', q: 'Was besagt die Goldene Bilanzregel?', options: ['(EK + langfristiges FK) / Anlagevermögen ≥ 1 – Fristenkongruenz', 'EK muss doppelt so hoch sein wie FK', 'Liquidität 1. Grades ≥ 100 %', 'Umlaufvermögen = Anlagevermögen'], answer: 0,
    expl: 'Langfristig gebundenes Vermögen soll langfristig finanziert sein.', src: 'VL Folie 214' });
  add({ ch: 'b7f', diff: 2, type: 'match', q: 'Klassifiziere die Finanzierung (Zwischenübung Folie 210).', pairs: [['25.000 € Einzahlung bei GmbH-Gründung', 'Eigen-/Außenfinanzierung'], ['Einzelunternehmer least ein Auto', 'Kapitalsubstitut'], ['OHG nimmt 50.000 € Kredit auf', 'Fremd-/Außenfinanzierung'], ['AG nutzt 100.000 € Gewinn für Solaranlage', 'Eigen-/Innenfinanzierung']],
    expl: 'Leasing reduziert das zu finanzierende Vermögen (Kapitalsubstitution).', src: 'VL Folie 209/210' });
  add({ ch: 'b7f', diff: 3, type: 'cloze', q: 'Bilanz-Quiz: liquide Mittel 120.000 €, Forderungen 300.000 €, UV 960.000 €, kurzfr. FK 360.000 €.', text: 'L1 ≈ {{33,33|33.33|33,3|33}} % · L2 ≈ {{116,67|116.67|116,7|117}} % · L3 ≈ {{266,67|266.67|266,7|267}} %',
    expl: '120/360, 420/360, 960/360.', src: 'Moodle-Quiz „Bilanz und Liquidität“ b' });
  add({ ch: 'b7f', diff: 2, type: 'multi', q: 'Welche Funktionen hat das Eigenkapital?', options: ['Finanzierungsbasis', 'Maßgröße der Kreditwürdigkeit', 'Verlustauffangpotenzial', 'Garantie fester Zinszahlungen'], answer: [0, 1, 2],
    expl: 'Außerdem Bezugsgröße zur Erfolgsverteilung.', src: 'VL Folie 205' });
  add({ ch: 'b7f', diff: 2, type: 'multi', q: 'Welche Unterziele verfolgt die Finanzplanung?', options: ['Unterliquidität verhindern', 'Kostenminimale Finanzierungsalternative wählen', 'Überliquidität verhindern', 'Maximale Verschuldung erreichen'], answer: [0, 1, 2],
    expl: 'Finanzielles Gleichgewicht: Einzahlungen ≥ Auszahlungen in allen Perioden.', src: 'VL Folie 203' });
  add({ ch: 'b7f', diff: 3, type: 'single', q: 'Was ist Factoring?', options: ['Aufkauf von Forderungen aus Lieferungen und Leistungen durch eine Factoringgesellschaft', 'Mietähnliche Überlassung von Anlagen', 'Ein Kredit gegen Pfand', 'Ausgabe neuer Aktien'], answer: 0,
    expl: 'Weitere Finanzierungsform neben Leasing, Miete, Pacht, Subventionen.', src: 'VL Folie 209' });
  add({ ch: 'b7f', diff: 3, type: 'tf', q: 'Abschreibungen und langfristige Rückstellungen erhöhen das Innenfinanzierungsvolumen, weil sie Aufwand, aber (noch) keine Auszahlung sind.', answer: true,
    expl: 'Bis zur späteren Auszahlung ist der Betrag frei disponierbar (Rückstellungen) bzw. es findet eine Vermögensumschichtung statt (Abschreibungen).', src: 'VL Folie 204' });

  /* ===================== Kapitel 8 – Leistungserstellung ===================== */
  add({ ch: 'b8', diff: 1, type: 'match', q: 'Ordne den Werkstoff zu (Automobilhersteller).', pairs: [['Schmieröl für Produktionsmaschinen', 'Betriebsstoff'], ['Lacke für die Lackierung', 'Hilfsstoff'], ['fertig montierte Sitze', 'Halbfabrikat'], ['Strom für die Geräte', 'Betriebsstoff ']],
    expl: 'Betriebsstoffe werden verbraucht, ohne Bestandteil zu werden; Hilfsstoffe gehen mit ergänzendem Charakter ins Produkt ein.', src: 'VL Kap. 8, Folie 4/5 (PDF-S. 219/220)' });
  add({ ch: 'b8', diff: 1, type: 'single', q: 'Wonach klassifiziert die ABC-Analyse Güter?', options: ['Nach der Höhe ihres Verbrauchswerts', 'Nach der Stetigkeit des Bedarfs', 'Nach dem Lieferanten', 'Nach dem Gewicht'], answer: 0,
    expl: 'Die XYZ-Analyse klassifiziert nach Stetigkeit/Vorhersehbarkeit.', src: 'VL Kap. 8, Folie 8' });
  add({ ch: 'b8', diff: 2, type: 'single', q: 'Welche Handlungsempfehlung gilt für C-Güter?', options: ['Bestellmengen schätzen, höhere Sicherheitsbestände, weniger Kontrollen', 'Detaillierte Beschaffungsmarktanalysen', 'Optimale Bestellmengen genau berechnen', 'Höchste Priorität'], answer: 0,
    expl: 'A-Güter haben Priorität mit genauer Analyse; C-Güter werden vereinfacht behandelt.', src: 'VL Kap. 8, Folie 10' });
  add({ ch: 'b8', diff: 2, type: 'single', q: 'Wie berechnet man den Variationskoeffizienten in der XYZ-Analyse?', options: ['Standardabweichung / Mittelwert', 'Mittelwert / Standardabweichung', 'Maximum − Minimum', 'Summe / Anzahl'], answer: 0,
    expl: 'Kleiner VarK → stetiger Verbrauch (X-Gut).', src: 'VL Kap. 8, Folie 12 (PDF-S. 227)' });
  add({ ch: 'b8', diff: 2, type: 'match', q: 'Ordne die Beschaffungsart zu.', pairs: [['bedarfsgesteuert', 'aus übergeordnetem Bedarf, idealerweise ohne Lager'], ['deterministisch', 'Stücklisten-/Rezeptauflösung aus Aufträgen'], ['verbrauchsgesteuert', 'Prognose aus Vergangenheitswerten, Lager als Puffer']],
    expl: 'Arten der Materialbeschaffung.', src: 'VL Kap. 8, Folie 16' });
  add({ ch: 'b8', diff: 4, type: 'single', q: 'ABC-Analyse (ÜB 12, A-Grenze < 85 %): A2 37,74 %, A8 28,30 %, A6 18,87 %, A1 4,53 % … Welche Artikel sind A-Güter?', options: ['A2, A8, A6', 'A2, A8', 'A2, A8, A6, A1', 'nur A2'], answer: 0,
    expl: 'Kumuliert 37,74 → 66,04 → 84,91 % (< 85 %). Mit A1 wären es 89,43 %. A-Güter: 84,91 % des Werts bei 19,45 % der Menge.', src: 'ÜB 12 (alt), Aufg. 4' });
  add({ ch: 'b8', diff: 4, type: 'single', q: 'Transportmittelvergleich (ÜB 12): Spedition 800 € + 40 €/Palette; eigener LKW 1.500 € je Fahrt (max. 66 Paletten). Ab wie vielen Paletten ist der eigene LKW günstiger?', options: ['ab 18 Paletten', 'ab 38 Paletten', 'ab 66 Paletten', 'nie'], answer: 0,
    expl: '800 + 40x = 1.500 → x = 17,5. Bis 17 Paletten Spedition, ab 18 eigener LKW.', src: 'ÜB 12 (alt), Aufg. 3a' });
  add({ ch: 'b8', diff: 2, type: 'match', q: 'Basis- und Ergänzungsfunktionen der Materiallogistik nach Gütereigenschaft', pairs: [['räumlich', 'Transportieren'], ['zeitlich', 'Lagern'], ['strukturell', 'Kommissionieren']],
    expl: 'Transportieren und Lagern sind die Basisfunktionen.', src: 'VL Kap. 8, Folie 20' });
  add({ ch: 'b8', diff: 2, type: 'single', q: 'Welche Phase der Logistik betrifft fertige Erzeugnisse?', options: ['Distributionslogistik', 'Beschaffungslogistik', 'Produktionslogistik', 'Entsorgungslogistik'], answer: 0,
    expl: 'Beschaffung → Werkstoffe, Produktion → unfertige, Distribution → fertige Erzeugnisse.', src: 'VL Kap. 8, Folie 21' });
  add({ ch: 'b8', diff: 2, type: 'match', q: 'Ordne den Fertigungstyp zu.', pairs: [['Massenfertigung', 'große Stückzahlen über längeren Zeitraum'], ['Serienfertigung', 'mehrere Produkte hintereinander in begrenzter Stückzahl'], ['Mass Customization', 'Individualisierung, mehrere Ausprägungen'], ['Einzelfertigung', 'nur eine Einheit']],
    expl: 'Abgrenzung nach der Häufigkeit der Wiederholung eines Fertigungsvorgangs.', src: 'VL Kap. 8, Folie 28' });
  add({ ch: 'b8', diff: 3, type: 'multi', q: 'Welche Nachteile hat das Fließprinzip?', options: ['Hoher Kapitalbedarf für Spezialmaschinen', 'Störanfälligkeit', 'Monotone Arbeit', 'Lange Transportwege'], answer: [0, 1, 2],
    expl: 'Lange Transportwege und Zwischenlager sind Nachteile des Werkstattprinzips.', src: 'VL Kap. 8, Folie 29' });
  add({ ch: 'b8', diff: 2, type: 'multi', q: 'Welche Ursachen hat der Erfahrungskurveneffekt?', options: ['Lernkurveneffekte', 'Technischer Fortschritt', 'Rationellere Verfahren und Organisation', 'Fixkostendegression'], answer: [0, 1, 2, 3],
    expl: 'Stückkosten sinken mit kumulierter Produktionsmenge (Economies of Scale).', src: 'VL Kap. 8, Folie 31; ÜB 13, Aufg. 2' });
  add({ ch: 'b8', diff: 2, type: 'match', q: 'Marketing-Mix (4 P)', pairs: [['Product', 'Produkt- und Sortimentspolitik'], ['Price', 'Preispolitik'], ['Place', 'Distributionspolitik'], ['Promotion', 'Kommunikationspolitik']],
    expl: 'Operative Marketingplanung nach McCarthy.', src: 'VL Kap. 8, Folie 36' });
  add({ ch: 'b8', diff: 2, type: 'single', q: 'Produktionsprogramm > Absatzprogramm bedeutet …', options: ['Ein Teil der Produktion dient dem Eigenbedarf', 'Es wird Handelsware zugekauft', 'Es gibt Fremdfertigung', 'Beide sind gleich'], answer: 0,
    expl: 'Produktion < Absatz: Fremdfertigung oder Handelsware.', src: 'VL Kap. 8, Folie 27; ÜB 13, Aufg. 1' });
  add({ ch: 'b8', diff: 4, type: 'single', q: '„Twax“ (ÜB 13): Ohne Arbeitsteilung braucht jeder Betrieb 100 h je Tonne Keksriegel. Mit Spezialisierung (L Keks, R Schokolade, Tausch 1:1)?', options: ['75 h je Tonne – Produktivität steigt von 0,01 auf ≈ 0,0133 t/h', '100 h – keine Veränderung', '50 h je Tonne', '125 h je Tonne'], answer: 0,
    expl: 'L: 1 t Keks in 50 h, R: 1 t Schokolade in 50 h; je 500 kg tauschen; je Betrieb 50 h (Vorprodukt) + 25 h (Riegel) = 75 h.', src: 'ÜB 13 (alt), Aufg. 5' });
  add({ ch: 'b8', diff: 4, type: 'single', q: 'Twax GmbH (ÜB 13): K(x) = 0,35x + 150.000; Preis-Absatz: p = 2,25 − 0,000005x. Welcher der Preise 0,75 / 1 / 1,25 / 1,5 / 1,75 / 2 € bringt den höchsten Gewinn?', options: ['1,25 € (x = 200.000, G = 30.000 €)', '1,00 € (G = 12.500 €)', '1,50 € (G = 22.500 €)', '2,00 € (G = −67.500 €)'], answer: 0,
    expl: 'x = (2,25 − p)/0,000005. p = 1,25 → x = 200.000; U = 250.000; K = 220.000; G = 30.000 €.', src: 'ÜB 13 (alt), Aufg. 6' });
  add({ ch: 'b8', diff: 3, type: 'multi', q: 'Welche Ziele verfolgt die Logistik?', options: ['Kostenziele (Logistikkosten, Kapitalbindung)', 'Zeitziele (Durchlaufzeiten, Termine)', 'Ergebnisziele (richtige Orte, Güter, Zustände)', 'Maximale Lagerbestände'], answer: [0, 1, 2],
    expl: 'Zielkonflikte z. B. zwischen niedriger Kapitalbindung und hoher Lieferbereitschaft.', src: 'VL Kap. 8, Folie 22; ÜB 12, Aufg. 2' });

  /* ===================== Zusätzliche Karteikarten ===================== */
  card('b1', 'Produktivität vs. Wirtschaftlichkeit vs. Rentabilität?', 'Produktivität = Output-/Inputmenge (mengenmäßig) · Wirtschaftlichkeit = Ertrag / Aufwand (bewertet) · Rentabilität = Gewinn / eingesetztes Kapital.', 'VL Folie 26–28, 69; ÜB 4, Aufg. 1');
  card('b2', 'Steuerbelastung GmbH bei Thesaurierung (vereinfacht)?', 'GewSt (G × 3,5 % × Hebesatz) + KSt 15 % + SolZ 5,5 % der KSt.', 'VL Folie 51/55');
  card('b2', 'GewSt-Anrechnung bei Personenunternehmen?', 'Gezahlte GewSt wird auf die ESt angerechnet – maximal bis zum 4-fachen Messbetrag.', 'VL Folie 52');
  card('b2', 'Rechtsformvergleich KG vs. GmbH (Kurzform)?', 'KG: Personengesellschaft, ≥ 2 (Komplementär + Kommanditist), kein Mindestkapital, Komplementär haftet unbeschränkt, Leitung durch Komplementär, keine Publizitätspflicht. GmbH: Kapitalgesellschaft, ≥ 1, 25.000 €, Haftung auf Stammeinlage begrenzt, Geschäftsführer, Publizität zwingend.', 'VL Folie 44/45; ÜB 2, Aufg. 6');
  card('b3', 'Leverage-Formel?', 'r(EK) = r(GK) + (r(GK) − i) · V   mit V = FK/EK', 'VL Folie 71');
  card('b3', 'Wann wirkt der Leverage-Effekt positiv?', 'Wenn r(GK) > i: Mit steigender Verschuldung steigt r(EK). Bei r(GK) < i sinkt r(EK) – bis zum Verzehr des EK.', 'VL Folie 71/72');
  card('b6', 'Break-even-Menge?', 'x(BE) = Kf / (p − kv) = Kf / db', 'VL Folie 153');
  card('b6', 'Kritische Menge Make-or-Buy bzw. Anlagenvergleich (Kosten)?', 'Kostenfunktionen gleichsetzen: x = ΔKf / Δkv.', 'VL Folie 167; Moodle-Quiz Kostenfunktionen');
  card('b7i', 'Statische Kennzahlenkette einer Anlage?', 'AfA = (A0 − Ln)/n · Ø Kapital = (A0 + Ln)/2 · Zinsen = Ø Kapital × i · K = Kf(betr.) + AfA + Zinsen + kv·x · G = U − K · Gbrutto = G + Zinsen · r = Gbrutto/Ø Kapital · EÜ = Gbrutto + AfA · Amortisation = A0/EÜ', 'VL Folie 162–180');
  card('b7i', 'Vereinfachte Kapitalwertmethode?', 'K0 = −A0 + EÜ · RBF(n, i) – bei konstanten EÜ, einmaliger A0 und Ln = 0.', 'VL Folie 195');
  card('b7i', 'Interner Zinsfuß in der Klausur?', 'Nur einfacher Fall: RBF = A0/EÜ berechnen, in der Zeile n der RBF-Tabelle den nächsten Wert suchen → r. Keine Interpolation.', 'VL Folie 203/205');
  card('b7i', 'Annuität aus Kapitalwert?', 'a = K0 / RBF(n, i); vorteilhaft bei a > 0.', 'VL Folie 198');
  card('b7i', 'Welches statische Verfahren wann?', 'Kostenvergleich: gleiche Erlöse & Investitionshöhe · Gewinnvergleich: gleiche Investitionshöhe · Rentabilitätsvergleich: unterschiedliche Investitionshöhe · Amortisation: unterschiedliche Investitionsdauer.', 'VL Folie 181');
  card('b7f', 'Effektivzins Lieferantenkredit?', 'i = S/(1 − S) × 360/(Z − s)', 'VL Folie 207');
  card('b8', 'ABC-Analyse – typische Verteilung?', 'A: 70–80 % Wert / 10–20 % Menge · B: 10–20 % / 20–30 % · C: 5–10 % / 60–70 %.', 'VL Kap. 8, Folie 7');
})();
