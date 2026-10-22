/**
 * srs.js – Leitner-System (5 Fächer) + Lernanalytik.
 *
 * Jede Frage und jede Karteikarte ist ein "Item" mit Zustand:
 *   { box: 1..5, due: Zeitstempel, seen, ok, bad, last, streak }
 * Richtig  → ein Fach höher, Wiederholung nach längerem Intervall.
 * Falsch   → zurück in Fach 1, sofort wieder fällig (häufigeres Erscheinen).
 */
(function () {
  'use strict';
  const { U, Store } = LP;

  // Intervalle in Tagen je Leitner-Fach
  const INTERVAL = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };
  const DAY = 86400000;

  const SRS = { INTERVAL };

  /** Aktuelles Fach-Datenobjekt. */
  SRS.subject = (id) => LP.subjects[id || Store.getSubject()];

  /** Karteikarten = explizite Karten + automatisch aus dem Glossar erzeugte Karten. */
  SRS.cards = (id) => {
    const s = SRS.subject(id);
    if (!s) return [];
    if (!s._cards) {
      const fromGlossary = (s.glossary || []).map((g, i) => ({
        id: `${s.id}-g${i}`,
        ch: g.ch,
        front: `Was bedeutet „${g.term}“?`,
        back: g.def,
        src: g.src,
        auto: true,
      }));
      s._cards = (s.cards || []).concat(fromGlossary);
    }
    return s._cards;
  };

  SRS.questions = (id) => (SRS.subject(id) || {}).questions || [];

  SRS.state = (itemId, subj) => Store.item(itemId, subj) || null;

  /** Ergebnis eines Items verbuchen. quality: 'wrong' | 'hard' | 'good' */
  SRS.record = (itemId, quality, subj) => {
    const now = Date.now();
    const st = Object.assign({ box: 1, due: now, seen: 0, ok: 0, bad: 0, streak: 0 }, Store.item(itemId, subj));
    st.seen++;
    st.last = now;
    if (quality === 'wrong') {
      st.bad++;
      st.box = 1;
      st.streak = 0;
      st.due = now + 5 * 60000; // in 5 Minuten erneut
    } else {
      st.ok++;
      st.streak++;
      st.box = quality === 'hard' ? Math.max(1, st.box) : Math.min(5, st.box + 1);
      st.due = now + INTERVAL[st.box] * DAY + (quality === 'hard' ? 0 : 60000);
    }
    Store.setItem(itemId, st, subj);
    return st;
  };

  SRS.isDue = (itemId, subj) => {
    const st = Store.item(itemId, subj);
    return !st || st.due <= Date.now();
  };

  /** Fällige Items (bereits gesehen und fällig) – neue Items zählen nicht als "fällig". */
  SRS.dueSeen = (items, subj) =>
    items.filter((it) => {
      const st = Store.item(it.id, subj);
      return st && st.due <= Date.now();
    });

  /** Verteilung auf die Leitner-Fächer (0 = neu). */
  SRS.boxes = (items, subj) => {
    const b = [0, 0, 0, 0, 0, 0];
    items.forEach((it) => {
      const st = Store.item(it.id, subj);
      b[st ? st.box : 0]++;
    });
    return b;
  };

  /** Gewicht für die Auswahl: Fehler & fällige Items erscheinen häufiger. */
  SRS.weight = (it, subj) => {
    const st = Store.item(it.id, subj);
    if (!st) return 3; // neu
    let w = 6 - st.box; // Fach 1 → 5, Fach 5 → 1
    w += st.bad * 1.5;
    if (st.due <= Date.now()) w += 3;
    return w;
  };

  /** Statistik pro Kapitel. */
  SRS.chapterStats = (subjId) => {
    const s = SRS.subject(subjId);
    const res = {};
    s.chapters.forEach((c) => (res[c.id] = { ch: c, total: 0, seen: 0, ok: 0, bad: 0, mastered: 0, due: 0 }));
    const all = SRS.questions(subjId).concat(SRS.cards(subjId));
    all.forEach((it) => {
      const r = res[it.ch];
      if (!r) return;
      r.total++;
      const st = Store.item(it.id, subjId);
      if (st) {
        r.seen++;
        r.ok += st.ok;
        r.bad += st.bad;
        if (st.box >= 4) r.mastered++;
        if (st.due <= Date.now()) r.due++;
      }
    });
    Object.values(res).forEach((r) => {
      r.rate = r.ok + r.bad ? r.ok / (r.ok + r.bad) : null;
      r.coverage = r.total ? r.seen / r.total : 0;
      r.mastery = r.total ? r.mastered / r.total : 0;
      // Wiederholungsbedarf: hohe Relevanz, schwache Quote, geringe Abdeckung, viele fällige Items
      const rel = r.ch.relevance || 1;
      r.need = rel * ((1 - (r.rate == null ? 0.5 : r.rate)) * 2 + (1 - r.coverage) + r.due / Math.max(1, r.total));
    });
    return res;
  };

  /** Gesamtfortschritt eines Fachs 0..1 (gewichtet: Beherrschung + gelesene Kapitel). */
  SRS.progress = (subjId) => {
    const s = SRS.subject(subjId);
    const stats = Object.values(SRS.chapterStats(subjId));
    const total = stats.reduce((a, r) => a + r.total, 0);
    const score = stats.reduce((a, r) => a + r.mastered + 0.4 * (r.seen - r.mastered), 0);
    const chaptersDone = s.chapters.filter((c) => Store.chapterDone(c.id, subjId)).length;
    const itemPart = total ? score / total : 0;
    const chPart = s.chapters.length ? chaptersDone / s.chapters.length : 0;
    return U.clamp(itemPart * 0.8 + chPart * 0.2, 0, 1);
  };

  /** Gesamt-Erfolgsquote eines Fachs. */
  SRS.successRate = (subjId) => {
    let ok = 0, bad = 0;
    Object.values(Store.sub(subjId).items).forEach((st) => { ok += st.ok; bad += st.bad; });
    return { ok, bad, rate: ok + bad ? ok / (ok + bad) : null };
  };

  /** Fragen mit den meisten Fehlern. */
  SRS.mostMissed = (subjId, n = 8) =>
    SRS.questions(subjId)
      .map((q) => ({ q, st: Store.item(q.id, subjId) }))
      .filter((x) => x.st && x.st.bad > 0)
      .sort((a, b) => b.st.bad - a.st.bad || a.st.box - b.st.box)
      .slice(0, n);

  LP.SRS = SRS;
})();
