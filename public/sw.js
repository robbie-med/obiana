// Bump on every content or code change, including any locale file.
const CACHE_NAME = 'birth-guide-v92-i18n';

// English is precached unconditionally: it is the fallback layer, so the app
// cannot render without it. Other locales are cached on first use (see fetch
// handler) rather than precached, to keep the install payload small.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './favicon.svg',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './styles.css?v=92',
  './app/guide/structure.js?v=92',
  './app/core/storage.js?v=92',
  './app/guide/cards.js?v=92',
  './app/myinfo.js?v=92',
  './app/guide/search.js?v=92',
  './app/core/nav.js?v=92',
  './app/core/pwa.js?v=92',
  './app/core/ui.js?v=92',
  './app/settings.js?v=92',
  './app/first-run.js?v=92',
  './app/language.js?v=92',
  './app/boot.js?v=92',
  './app/tools/shared.js?v=92',
  './app/tools/kick.js?v=92',
  './app/tools/contractions.js?v=92',
  './app/tools/feeding.js?v=92',
  './app/tools/diapers.js?v=92',
  './app/tools/jaundice.js?v=92',
  './app/tools/bp.js?v=92',
  './app/tools/weight.js?v=92',
  './app/tools/mood.js?v=92',
  './app/tools/birthplan.js?v=92',
  './app/tools/appts.js?v=92',
  './app/contribute/translate.js?v=92',
  './app/contribute/improve.js?v=92',
  './app/tools/nausea.js?v=92',
  './i18n/i18n.js?v=92',
  './i18n/body-templates.js?v=92',
  './i18n/locale.en.js?v=92',
  './flags/af.svg?v=92',
  './flags/br.svg?v=92',
  './flags/cn.svg?v=92',
  './flags/de.svg?v=92',
  './flags/es.svg?v=92',
  './flags/fr.svg?v=92',
  './flags/gb.svg?v=92',
  './flags/jp.svg?v=92',
  './flags/kr.svg?v=92',
  './flags/mm.svg?v=92',
  './flags/ph.svg?v=92',
  './flags/pl.svg?v=92',
  './flags/ru.svg?v=92',
  './flags/sa.svg?v=92',
  './flags/th.svg?v=92',
  './flags/us.svg?v=92',
  './flags/vn.svg?v=92',
  './i18n/epds/epds.en.js?v=92',
  './i18n/epds/epds.es.js?v=92',
  './i18n/epds/epds.cnh.js?v=92',
  './i18n/epds/epds.ko.js?v=92',
  './i18n/epds/epds.zh.js?v=92',
  './i18n/epds/epds.ar.js?v=92',
  './i18n/epds/phq9.fr.js?v=92',
  './i18n/epds/phq9.ru.js?v=92',
];

// Locales fetched on demand and kept once seen, so a language the user has
// actually opened stays available offline.
// zom has no 2-letter code; pt-BR carries a region subtag.
const LOCALE_RE = /\/i18n\/locale\.[a-z]{2,3}(?:-[A-Za-z]{2,4})?\.js$/;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for Google Fonts; cache-first for everything else
  if (e.request.url.includes('fonts.g')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Never serve the HTML shell in place of a missing script: it would
        // load with status 200 and blow up as a syntax error. Fail cleanly so
        // i18n.js can fall back to English.
        if (LOCALE_RE.test(e.request.url) || e.request.destination === 'script') {
          return new Response('', { status: 504, statusText: 'Offline' });
        }
        return caches.match('./index.html');
      });
    })
  );
});
