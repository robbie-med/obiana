// Bump on every content or code change, including any locale file.
const CACHE_NAME = 'birth-guide-v100-i18n';

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
  './styles.css?v=100',
  './fonts/fonts.css?v=100',
  // Latin subsets only: every other subset is cached the first time a page
  // needs it (each @font-face loads only for its unicode-range).
  './fonts/dm-sans-normal-latin.woff2',
  './fonts/dm-sans-normal-latin-ext.woff2',
  './fonts/lora-normal-latin.woff2',
  './fonts/lora-italic-latin.woff2',
  './app/guide/structure.js?v=100',
  './app/core/storage.js?v=100',
  './app/core/dates.js?v=100',
  './app/guide/cards.js?v=100',
  './app/guide/visits.js?v=100',
  './app/myinfo.js?v=100',
  './app/guide/search.js?v=100',
  './app/core/theme.js?v=100',
  './app/core/nav.js?v=100',
  './app/core/router.js?v=100',
  './app/guide/urgent.js?v=100',
  './app/today.js?v=100',
  './app/core/pwa.js?v=100',
  './app/core/ui.js?v=100',
  './app/settings.js?v=100',
  './app/first-run.js?v=100',
  './app/language.js?v=100',
  './app/boot.js?v=100',
  './app/tools/shared.js?v=100',
  './app/tools/kick.js?v=100',
  './app/tools/contractions.js?v=100',
  './app/tools/feeding.js?v=100',
  './app/tools/diapers.js?v=100',
  './app/tools/jaundice.js?v=100',
  './app/tools/bp.js?v=100',
  './app/tools/weight.js?v=100',
  './app/tools/mood.js?v=100',
  './app/tools/birthplan.js?v=100',
  './app/tools/appts.js?v=100',
  './app/contribute/translate.js?v=100',
  './app/contribute/improve.js?v=100',
  './app/tools/nausea.js?v=100',
  './i18n/i18n.js?v=100',
  './i18n/body-templates.js?v=100',
  './i18n/locale.en.js?v=100',
  './flags/af.svg?v=100',
  './flags/br.svg?v=100',
  './flags/cn.svg?v=100',
  './flags/de.svg?v=100',
  './flags/es.svg?v=100',
  './flags/fr.svg?v=100',
  './flags/gb.svg?v=100',
  './flags/jp.svg?v=100',
  './flags/kr.svg?v=100',
  './flags/mm.svg?v=100',
  './flags/ph.svg?v=100',
  './flags/pl.svg?v=100',
  './flags/ru.svg?v=100',
  './flags/sa.svg?v=100',
  './flags/th.svg?v=100',
  './flags/us.svg?v=100',
  './flags/vn.svg?v=100',
  './i18n/epds/epds.en.js?v=100',
  './i18n/epds/epds.es.js?v=100',
  './i18n/epds/epds.cnh.js?v=100',
  './i18n/epds/epds.ko.js?v=100',
  './i18n/epds/epds.zh.js?v=100',
  './i18n/epds/epds.ar.js?v=100',
  './i18n/epds/phq9.fr.js?v=100',
  './i18n/epds/phq9.ru.js?v=100',
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

// Carry the reader's own language across an update. Locale files are cached
// on first use under a versioned URL (?v=N), so a new version asks for a URL
// the new cache does not have. Without this, a reader who is offline when the
// update lands loses her language and gets English. Fetch the new file when
// we can; when we cannot, keep her old copy under the new URL (a slightly
// dated translation beats English, the same rule cardBody() follows).
async function carryLocales(newCache) {
  const version = (CACHE_NAME.match(/v(\d+)/) || [])[1];
  for (const name of await caches.keys()) {
    if (name === CACHE_NAME) continue;
    const old = await caches.open(name);
    for (const req of await old.keys()) {
      const url = new URL(req.url);
      if (!LOCALE_RE.test(url.pathname) || url.pathname.endsWith('/locale.en.js')) continue;
      url.searchParams.set('v', version);
      if (await newCache.match(url.href)) continue;
      try {
        const res = await fetch(url.href);
        if (res.ok) { await newCache.put(url.href, res); continue; }
      } catch (err) { /* offline: fall through to the old copy */ }
      const prev = await old.match(req);
      if (prev) await newCache.put(url.href, prev);
    }
  }
}

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(carryLocales)
      .catch(() => {})
      .then(() => caches.keys())
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only same-origin GETs are cacheable. The reader-feedback API (POST /api/*)
  // must always reach the network, and Cache.put() throws on a POST.
  if (e.request.method !== 'GET' || new URL(e.request.url).pathname.startsWith('/api/')) return;
  // Cache-first for everything (fonts are self-hosted in fonts/).
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
