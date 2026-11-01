// Loaded synchronously as the first thing in <body>, before anything paints.
// initDarkMode() (app/settings.js) used to apply the theme only after the
// locale had loaded, so dark-mode readers saw a white flash on every open.
// Same decision as initDarkMode(), which still runs later and agrees.
try {
  const saved = localStorage.getItem('dark-mode');
  if (saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
} catch (e) { /* storage blocked: initDarkMode() decides later */ }
