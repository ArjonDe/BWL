/**
 * util.js – Namensraum und kleine Hilfsfunktionen.
 * Alle Module hängen sich an window.LP, damit die App ohne Build-Schritt
 * und auch direkt per Doppelklick (file://) funktioniert.
 */
(function () {
  'use strict';

  const LP = (window.LP = window.LP || {});
  LP.subjects = LP.subjects || {};
  LP.views = LP.views || {};

  const U = {};

  /** HTML-Escaping für alle Nutzereingaben. */
  U.esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  /** Erstellt ein DOM-Element aus einem HTML-String. */
  U.el = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  U.$ = (sel, root) => (root || document).querySelector(sel);
  U.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /** Fisher-Yates-Shuffle (liefert Kopie). */
  U.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /** Gewichtete Zufallsauswahl ohne Zurücklegen. */
  U.weightedSample = (items, weightFn, n) => {
    const pool = items.map((it) => ({ it, w: Math.max(0.0001, weightFn(it)) }));
    const out = [];
    while (out.length < n && pool.length) {
      const total = pool.reduce((s, p) => s + p.w, 0);
      let r = Math.random() * total;
      let idx = 0;
      for (; idx < pool.length; idx++) {
        r -= pool[idx].w;
        if (r <= 0) break;
      }
      out.push(pool.splice(Math.min(idx, pool.length - 1), 1)[0].it);
    }
    return out;
  };

  U.pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  U.clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  U.fmtNum = (n, d = 2) =>
    Number.isFinite(n) ? n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d }) : '–';
  U.fmtTime = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  U.today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  U.dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

  /** Normalisiert Freitext-Antworten für Lückentexte. */
  U.norm = (s) =>
    String(s || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[„“"']/g, '')
      .replace(/,(\d)/g, '.$1')
      .trim();

  /** Kurze Statusmeldung unten am Bildschirm. */
  U.toast = (msg, ms = 2200) => {
    const host = document.getElementById('toastHost');
    if (!host) return;
    const t = U.el(`<div class="toast">${U.esc(msg)}</div>`);
    host.appendChild(t);
    setTimeout(() => t.remove(), ms);
  };

  /** Kleine Konfetti-Belohnung (respektiert reduced motion über CSS). */
  U.confetti = (n = 40) => {
    const colors = ['#4f46e5', '#0ea5e9', '#16a34a', '#f59e0b', '#ec4899'];
    for (let i = 0; i < n; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = Math.random() * 0.4 + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2200);
    }
  };

  U.stars = (n) => `<span class="stars" title="Klausurrelevanz ${n}/3">${'★'.repeat(n)}${'☆'.repeat(3 - n)}</span>`;
  U.diffLabel = (d) => ['', 'Leicht', 'Mittel', 'Schwer', 'Klausur'][d] || '';
  U.diffBadge = (d) => {
    const cls = ['', 'success', 'primary', 'warning', 'danger'][d] || '';
    return `<span class="badge ${cls}">${U.diffLabel(d)}</span>`;
  };
  U.typeLabel = (t) =>
    ({ single: 'Single Choice', multi: 'Multiple Choice', tf: 'Wahr/Falsch', match: 'Zuordnung', cloze: 'Lückentext' })[t] || t;

  LP.U = U;
})();
