/**
 * app.js – Hash-Router, Navigation, Fachwechsel und Theme.
 * Hash-Routing funktioniert auf GitHub Pages ohne Server-Konfiguration.
 */
(function () {
  'use strict';
  const { U, Store, SRS } = LP;

  const NAV = [
    { path: '', ico: '🏠', label: 'Dashboard' },
    { path: 'learn', ico: '📖', label: 'Lernmodus' },
    { path: 'quiz', ico: '🎯', label: 'Quiz' },
    { path: 'cards', ico: '🗂️', label: 'Karteikarten', badge: 'due' },
    { path: 'exam', ico: '⏱️', label: 'Prüfungsmodus' },
    { sep: true },
    { path: 'tools', ico: '🧮', label: 'Formeln & Rechner' },
    { path: 'glossary', ico: '🔎', label: 'Glossar' },
    { path: 'stats', ico: '📊', label: 'Statistik' },
    { sep: true },
    { path: 'settings', ico: '⚙️', label: 'Daten & Einstellungen' },
  ];

  const VIEW_BY_PATH = {
    '': 'dashboard', learn: 'learn', quiz: 'quiz', cards: 'cards', exam: 'exam',
    stats: 'stats', glossary: 'glossary', tools: 'tools', settings: 'settings',
  };

  let cleanup = null;

  function currentSubject() {
    let id = Store.getSubject();
    if (!LP.subjects[id]) id = Object.keys(LP.subjects)[0];
    return LP.subjects[id];
  }

  function renderSubjectSwitch() {
    const host = U.$('#subjectSwitch');
    const cur = currentSubject();
    // Nur ein Fach vorhanden → kein Umschalter nötig
    host.hidden = Object.keys(LP.subjects).length < 2;
    if (host.hidden) return;
    host.innerHTML = Object.values(LP.subjects)
      .map(
        (s) => `<button role="tab" data-s="${s.id}" aria-selected="${s.id === cur.id}">
          <span class="dot" style="background:var(--${s.id})"></span>${U.esc(s.short)}</button>`
      )
      .join('');
    U.$$('button', host).forEach((b) =>
      b.addEventListener('click', () => {
        if (b.dataset.s === Store.getSubject()) return;
        Store.setSubject(b.dataset.s);
        U.toast(`Fach gewechselt: ${LP.subjects[b.dataset.s].name}`);
        const path = parse().path;
        const p = NAV.find((n) => n.path === path);
        // Fachspezifische Seiten auf das passende Gegenstück umleiten
        if (p && p.only && p.only !== b.dataset.s) location.hash = '#/';
        else if (path === 'learn') location.hash = '#/learn';
        else route();
      })
    );
  }

  function renderNav(path) {
    const s = currentSubject();
    const due = SRS.dueSeen(SRS.cards(s.id).concat(SRS.questions(s.id)), s.id).length;
    U.$('#nav').innerHTML = NAV.filter((n) => !n.only || n.only === s.id)
      .map((n) =>
        n.sep
          ? '<li class="sep" role="separator"></li>'
          : `<li><a href="#/${n.path}" class="${n.path === path ? 'active' : ''}"><span class="ico">${n.ico}</span>${n.label}${
              n.badge === 'due' && due ? `<span class="badge warning">${due}</span>` : ''
            }</a></li>`
      )
      .join('');
  }

  function parse() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [pathPart, query] = raw.split('?');
    const segs = pathPart.split('/').filter(Boolean);
    const params = {};
    new URLSearchParams(query || '').forEach((v, k) => (params[k] = v));
    return { path: segs[0] || '', args: segs.slice(1), params };
  }

  function route() {
    const { path, args, params } = parse();
    const subject = currentSubject();
    document.body.dataset.subject = subject.id;
    renderSubjectSwitch();
    renderNav(path);
    closeNav();
    U.$('#streakBadge').textContent = `🔥 ${Store.streak()}`;

    if (typeof cleanup === 'function') { try { cleanup(); } catch (e) {} }
    cleanup = null;

    const main = U.$('#main');
    const viewName = VIEW_BY_PATH[path];
    const view = viewName && LP.views[viewName];
    main.innerHTML = '';
    main.className = 'main fade-in';
    if (!view) {
      main.innerHTML = '<div class="empty"><div class="big">🧭</div><p>Seite nicht gefunden.</p><a class="btn primary" href="#/">Zum Dashboard</a></div>';
      return;
    }
    cleanup = view.render(main, { subject, args, params });
    document.title = `${(NAV.find((n) => n.path === path) || {}).label || 'Klausurtrainer'} · ${subject.short} · Klausurtrainer`;
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  /* ----- Mobile Navigation ----- */
  function openNav() {
    U.$('#sidebar').classList.add('open');
    U.$('#scrim').hidden = false;
    U.$('#navToggle').setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    U.$('#sidebar').classList.remove('open');
    U.$('#scrim').hidden = true;
    U.$('#navToggle').setAttribute('aria-expanded', 'false');
  }

  /* ----- Theme ----- */
  function toggleTheme() {
    const root = document.documentElement;
    const isDark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    Store.setTheme(next);
  }

  /* ----- Start ----- */
  LP.refreshNav = () => renderNav(parse().path);
  LP.go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };

  document.addEventListener('DOMContentLoaded', () => {
    U.$('#navToggle').addEventListener('click', () => (U.$('#sidebar').classList.contains('open') ? closeNav() : openNav()));
    U.$('#scrim').addEventListener('click', closeNav);
    U.$('#themeToggle').addEventListener('click', toggleTheme);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('hashchange', route);
    if (!Store.isPersistent) U.toast('Hinweis: Browser-Speicher nicht verfügbar – Fortschritt wird nicht dauerhaft gespeichert.', 5000);
    route();
  });
})();
