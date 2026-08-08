// Bump on every content or code change, including any locale file.
const CACHE_NAME = 'birth-guide-v8-i18n';

// English is precached unconditionally: it is the fallback layer, so the app
// cannot render without it. Other locales are cached on first use (see fetch
// handler) rather than precached, to keep the install payload small.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css?v=8',
  './content.js?v=8',
  './tools.js?v=8',
  './i18n/i18n.js?v=8',
  './i18n/locale.en.js?v=8',
  './i18n/epds/epds.en.js?v=8',
  './i18n/epds/epds.es.js?v=8',
  './i18n/epds/epds.cnh.js?v=8',
  './i18n/epds/epds.ko.js?v=8',
  './i18n/epds/epds.zh.js?v=8',
  './i18n/epds/epds.ar.js?v=8',
  './i18n/epds/phq9.fr.js?v=8',
  './i18n/epds/phq9.ru.js?v=8',
];

// Locales fetched on demand and kept once seen, so a language the user has
// actually opened stays available offline.
const LOCALE_RE = /\/i18n\/locale\.[a-z]{2,3}\.js$/;   // zom has no 2-letter code

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
