/**
 * store.js – Persistenz in localStorage.
 * Speichert Lernfortschritt, Statistiken, Scores und abgeschlossene Kapitel.
 * Fällt bei blockiertem Storage (z. B. privater Modus) auf einen In-Memory-Zustand zurück.
 */
(function () {
  'use strict';
  const { U } = LP;
  const KEY = 'lp.v1';
  const VERSION = 1;

  const blank = () => ({ version: VERSION, subject: 'bwl', days: {}, subjects: {} });
  const blankSubject = () => ({ items: {}, chapters: {}, exams: [], sessions: 0 });

  let state = blank();
  let persistent = true;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') state = Object.assign(blank(), parsed);
      }
    } catch (e) {
      persistent = false;
    }
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch (e) {
        persistent = false;
      }
    }, 120);
  }

  const Store = {
    get isPersistent() { return persistent; },
    get state() { return state; },

    getSubject() { return state.subject; },
    setSubject(id) { state.subject = id; save(); },

    /** Teilzustand eines Fachs (wird bei Bedarf angelegt). */
    sub(id) {
      id = id || state.subject;
      if (!state.subjects[id]) state.subjects[id] = blankSubject();
      return state.subjects[id];
    },

    item(id, subj) { return this.sub(subj).items[id]; },
    setItem(id, data, subj) { this.sub(subj).items[id] = data; this.markActivity(); save(); },

    chapterDone(ch, subj) { return !!(this.sub(subj).chapters[ch] || {}).done; },
    setChapterDone(ch, done, subj) {
      const c = this.sub(subj).chapters;
      c[ch] = Object.assign({}, c[ch], { done, at: Date.now() });
      this.markActivity();
      save();
    },

    addExam(result, subj) {
      const ex = this.sub(subj).exams;
      ex.push(result);
      if (ex.length > 50) ex.shift();
      this.markActivity();
      save();
    },

    /** Lerntag zählen (für Streak und Aktivitäts-Heatmap). */
    markActivity() {
      const d = U.today();
      state.days[d] = (state.days[d] || 0) + 1;
      save();
    },

    streak() {
      let n = 0;
      const d = new Date();
      // Heute zählt nur, wenn schon gelernt wurde; sonst ab gestern rückwärts zählen
      const key = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
      if (!state.days[key(d)]) d.setDate(d.getDate() - 1);
      while (state.days[key(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },

    theme() { try { return localStorage.getItem('lp.theme'); } catch (e) { return null; } },
    setTheme(t) { try { localStorage.setItem('lp.theme', t); } catch (e) {} },

    exportJSON() { return JSON.stringify(state, null, 2); },
    importJSON(text) {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object' || !parsed.subjects) throw new Error('Ungültige Datei');
      state = Object.assign(blank(), parsed);
      save();
    },
    resetSubject(id) { state.subjects[id] = blankSubject(); save(); },
    resetAll() { const s = state.subject; state = blank(); state.subject = s; save(); },
  };

  load();
  LP.Store = Store;
})();
