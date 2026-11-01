// ─── Source fingerprints ────────────────────────────────
// Mirror of srcHashOf() in translation/hash.js, which carries the full
// rationale. It is duplicated rather than imported because locale files and
// this file are plain <script> tags with no module loader; translation/
// lint-locales.js re-runs the shared test vectors through both copies so they
// cannot drift apart unnoticed.
function srcHashOf(s) {
  const bytes = new TextEncoder().encode(String(s).normalize('NFC'));
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < bytes.length; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ bytes[i], 0x85ebca6b) >>> 0;
  }
  return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
}

// English is the fallback layer: loaded once per session and never mutated,
// so these caches never need invalidating.
let _enHashes = null;
function enHashes() {
  if (_enHashes) return _enHashes;
  const map = Object.create(null);
  const content = (window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {};
  for (const [id, card] of Object.entries(content)) {
    for (const f of ['title', 'sub']) {
      if (typeof card[f] === 'string' && card[f] !== '') map['content.' + id + '.' + f] = srcHashOf(card[f]);
    }
    (card.t || []).forEach((run, i) => { map['content.' + id + '.t.' + i] = srcHashOf(run); });
  }
  return (_enHashes = map);
}

// Keys whose translation was made from English that has since changed.
//
// Read by the Translation Helper only. It deliberately has no effect on what a
// patient sees: a sentence that is translated stays translated, even if the
// English has since been reworded. Losing a whole paragraph of someone's own
// language over an English typo fix is not a trade worth making.
const _staleCache = new Map();
function staleSet(lang) {
  if (_staleCache.has(lang)) return _staleCache.get(lang);
  const set = new Set();
  const stamped = (window.MYOB_LOCALES[lang] || {}).srcHash;
  // A locale carrying NO map at all predates this mechanism, or is an old file
  // still sitting in the service worker cache. Trust it: treating a missing map
  // as "everything is stale" would flip a whole language back to English on any
  // cache skew, which is far worse than the problem being solved. A map that is
  // present but missing one entry is different, and does count as stale: that
  // key was written without recording what it was translated from.
  if (stamped && lang !== I18n.FALLBACK) {
    const now = enHashes();
    for (const key of Object.keys(now)) {
      if (stamped[key] !== now[key]) set.add(key);
    }
  }
  _staleCache.set(lang, set);
  return set;
}

// English standing in for a translation. lang and dir are not decoration:
// without lang a screen reader voices English with the target language's
// phonology, and without dir an English sentence inside an Arabic paragraph
// mirrors its own punctuation. [dir] carries unicode-bidi: isolate in the UA
// stylesheet, which is exactly the containment wanted.
function enRun(s) {
  if (s === undefined || s === "") return "";
  return I18n.lang === I18n.FALLBACK ? s
    : '<span class="src-en" lang="en" dir="ltr">' + s + '</span>';
}

// Merge structure + active-locale prose. Falls back to English per card.
// Rebuild a card body from the shared HTML template and the active locale's
// per-sentence runs. Each {{n}} falls back to English on its own, so a card
// translated halfway reads fully rather than showing gaps.
function cardBody(id) {
  const active = (window.MYOB_LOCALES[I18n.lang] || {}).content || {};
  const base = (window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {};
  const card = active[id] || {};

  const tpl = (window.MYOB_BODY_TPL || {})[id];
  if (!tpl) return "";

  const mine = card.t || [];
  const fallback = (base[id] || {}).t || [];
  // The local English editor sets this to wrap each filled slot in a element
  // carrying its key, so a sentence on screen can be traced back to exactly
  // one entry in the locale file. Unset in production, where the branch costs
  // one property lookup per slot and nothing else.
  const wrap = window.MYOB_EDIT_WRAP;
  return tpl.replace(/\{\{(\d+)\}\}/g, (m, i) => {
    const n = +i;
    const v = mine[n];
    if (wrap) return wrap('content.' + id + '.t.' + n, v === undefined ? '' : v);
    // Only a MISSING translation falls back. A translation that has fallen
    // behind the English still reads correctly in the reader's own language,
    // and swapping it for an English sentence mid-paragraph is a worse
    // outcome than slightly dated wording. The fingerprints still record that
    // it needs updating; that shows up in the Translation Helper, which is
    // where a contributor can act on it. See staleSet().
    if (v === undefined || v === "") return enRun(fallback[n]);
    return v;
  });
}

// Per FIELD, not per card. I18n.data() resolves the whole card object, so a
// card that exists in the target locale could never borrow English for a field
// it was missing: an untranslated sub rendered empty rather than falling back.
function cardField(id, field) {
  const lang = I18n.lang;
  const mine = ((window.MYOB_LOCALES[lang] || {}).content || {})[id] || {};
  const base = ((window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {})[id] || {};
  const v = mine[field];
  // Same rule as the body: present beats up to date.
  if (typeof v === 'string' && v !== '') return { text: v, en: false };
  const fallback = typeof base[field] === 'string' ? base[field] : '';
  return { text: fallback, en: lang !== I18n.FALLBACK && fallback !== '' };
}

function getCards(section) {
  const list = CONTENT_STRUCTURE[section] || [];
  return list.map(item => {
    const title = cardField(item.id, 'title');
    const sub = cardField(item.id, 'sub');
    return Object.assign({}, item, {
      title: title.text || item.id,
      titleEn: title.en,
      sub: sub.text,
      subEn: sub.en,
      body: cardBody(item.id),
    });
  });
}

// ═══════════════════════════════════════════════════════
// RENDER CARDS
// ═══════════════════════════════════════════════════════
function renderSection(section) {
  const container = document.getElementById('cards-' + section);
  if (!container || container.dataset.rendered) return;

  const items = getCards(section);
  items.forEach(item => {
    const isFaq = section === 'faq';
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card-' + item.id;

    if (isFaq) {
      const badge = item.type === 'myth'
        ? `<span class="faq-badge badge-myth">${I18n.t('faq.badgeMyth')}</span>`
        : `<span class="faq-badge badge-faq">${I18n.t('faq.badgeFaq')}</span>`;
      card.innerHTML = `
        <h2 class="acc-heading">
          <button type="button" class="faq-header acc-header" aria-expanded="false"
                  aria-controls="body-${item.id}" onclick="toggleCard(this)">
            ${badge}
            <span class="faq-q"${item.titleEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.title)}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </h2>
        <div class="acc-body" id="body-${item.id}">${item.body}</div>`;
    } else {
      card.innerHTML = `
        <h2 class="acc-heading">
          <button type="button" class="acc-header" aria-expanded="false"
                  aria-controls="body-${item.id}" onclick="toggleCard(this)">
            <span class="acc-icon-wrap ${item.color || ''}" aria-hidden="true">${item.icon}</span>
            <span class="acc-titles">
              <span class="acc-title"${item.titleEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.title)}</span>
              ${item.sub ? `<span class="acc-sub"${item.subEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.sub)}</span>` : ''}
            </span>
            <svg class="acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </h2>
        <div class="acc-body" id="body-${item.id}">${item.body}</div>`;
    }

    container.appendChild(card);
  });
  container.dataset.rendered = 'true';
}

function toggleCard(header) {
  const card = header.closest('.card');
  card.classList.toggle('open');
  header.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
  if (card.classList.contains('open')) {
    // Smooth scroll into view with small delay
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      const headerH = document.getElementById('header').offsetHeight;
      if (rect.top < headerH + 8) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}
