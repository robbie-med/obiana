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

// A ui string, marked as English (lang + dir) when the active locale has no
// translation for it and t() fell back. Same reason as enRun(): in Arabic an
// unmarked English sentence mirrors its own punctuation and number ranges.
function uiIsEnglish(key) {
  if (I18n.lang === I18n.FALLBACK) return false;
  const own = String(key).split('.').reduce((o, k) => (o == null ? undefined : o[k]),
    ((window.MYOB_LOCALES[I18n.lang] || {}).ui));
  return own === undefined || own === null || own === '';
}
function tl(key, vars) { const s = t(key, vars); return uiIsEnglish(key) ? enRun(s) : s; }
function tpl(key, count, vars) { const s = tp(key, count, vars); return uiIsEnglish(key) ? enRun(s) : s; }

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
  // Set by the local English editor, and by "tap a sentence to suggest" (Me,
  // contribute/translate.js): wraps each slot in an element carrying its key,
  // so a sentence on screen traces back to exactly one entry in the locale
  // file. The third argument is what the slot would show unwrapped. Unset
  // otherwise, where the branch costs one property lookup per slot.
  const wrap = window.MYOB_EDIT_WRAP;
  return tpl.replace(/\{\{(\d+)\}\}/g, (m, i) => {
    const n = +i;
    const v = mine[n];
    if (wrap) return wrap('content.' + id + '.t.' + n, v === undefined ? '' : v,
      (v === undefined || v === '') ? enRun(fallback[n]) : v);
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

// One sentence of a card, by its permanent slot number, with the same
// per-slot English fallback as cardBody(). Lets another screen (When to call)
// show a card's own, already translated, warning list instead of a copy that
// would drift from it.
function cardSlot(id, n) {
  const mine = (((window.MYOB_LOCALES[I18n.lang] || {}).content || {})[id] || {}).t || [];
  const base = (((window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {})[id] || {}).t || [];
  const v = mine[n];
  return (v === undefined || v === '') ? enRun(base[n]) : v;
}

// The same, for a slot that is a " · " separated list: split first, then mark
// each English fallback item, so the lang/dir span never straddles items.
function cardSlotItems(id, n) {
  const mine = (((window.MYOB_LOCALES[I18n.lang] || {}).content || {})[id] || {}).t || [];
  const base = (((window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {})[id] || {}).t || [];
  const own = mine[n] !== undefined && mine[n] !== '';
  return String(own ? mine[n] : (base[n] || '')).split(/\s+·\s+/).filter(Boolean)
    .map(x => own ? x : enRun(x));
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
// The week-by-week visit schedule, shown as the first Prenatal card. Built
// from data (app/guide/visits.js) rather than a body template.
const VISITS_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\" /><path d=\"M16 3v4\" /><path d=\"M8 3v4\" /><path d=\"M4 11h16\" /><path d=\"M8 15h2v2h-2z\" /></svg>";
function visitsCardItem() {
  // Plain t() for title and sub: the card header escapes them, and marks them
  // English through titleEn/subEn, as getCards() does for every other card.
  return { id: 'visits', icon: VISITS_ICON, color: '', title: t('visits.title'), sub: t('visits.sub'),
    titleEn: uiIsEnglish('visits.title'), subEn: uiIsEnglish('visits.sub'), body: visitsTimelineHtml() };
}

function renderSection(section) {
  const container = document.getElementById('cards-' + section);
  if (!container || container.dataset.rendered) return;

  // A guide section is: the visit timeline (Prenatal only), its own cards,
  // then the FAQ answers whose home it is ("in" in CONTENT_STRUCTURE.faq),
  // under a "Quick answers" heading. The FAQ is no longer a page of its own.
  const items = getCards(section);
  if (section === 'pregnancy') items.unshift(visitsCardItem());
  const quick = section === 'faq' ? [] : getCards('faq').filter(f => f.in === section);
  items.push(...quick);
  items.forEach(item => {
    const isFaq = !!item.type;
    if (quick.length && item === quick[0]) {
      const h = document.createElement('h2');
      h.className = 'quick-answers-h';
      h.textContent = t('guide.quickAnswers');
      container.appendChild(h);
    }
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
  replaceCardRoute(currentSection, card.classList.contains('open') ? card.id.replace(/^card-/, '') : null);
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
