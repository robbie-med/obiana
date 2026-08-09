// Bump on every content or code change, including any locale file.
const CACHE_NAME = 'birth-guide-v41-i18n';

// English is precached unconditionally: it is the fallback layer, so the app
// cannot render without it. Other locales are cached on first use (see fetch
// handler) rather than precached, to keep the install payload small.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css?v=41',
  './content.js?v=41',
  './tools.js?v=41',
  './i18n/translate-tool.js?v=41',
  './i18n/improve-tool.js?v=41',
  './i18n/i18n.js?v=41',
  './i18n/locale.en.js?v=41',
  './flags/af.svg?v=41',
  './flags/br.svg?v=41',
  './flags/cn.svg?v=41',
  './flags/de.svg?v=41',
  './flags/es.svg?v=41',
  './flags/fr.svg?v=41',
  './flags/gb.svg?v=41',
  './flags/jp.svg?v=41',
  './flags/kr.svg?v=41',
  './flags/mm.svg?v=41',
  './flags/ph.svg?v=41',
  './flags/pl.svg?v=41',
  './flags/ru.svg?v=41',
  './flags/sa.svg?v=41',
  './flags/th.svg?v=41',
  './flags/us.svg?v=41',
  './flags/vn.svg?v=41',
  './i18n/epds/epds.en.js?v=41',
  './i18n/epds/epds.es.js?v=41',
  './i18n/epds/epds.cnh.js?v=41',
  './i18n/epds/epds.ko.js?v=41',
  './i18n/epds/epds.zh.js?v=41',
  './i18n/epds/epds.ar.js?v=41',
  './i18n/epds/phq9.fr.js?v=41',
  './i18n/epds/phq9.ru.js?v=41',
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
