// ═══════════════════════════════════════════════════════
// I18N RUNTIME
// ═══════════════════════════════════════════════════════
// Locale files register themselves into MYOB_LOCALES as plain <script> tags
// (not fetch/JSON) so the app keeps working from file:// and so the service
// worker can precache them like any other asset.
//
// English is ALWAYS loaded and acts as the fallback layer: a missing key in
// any other locale silently falls back to en rather than rendering blank.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

const I18n = (() => {

  // ─── Supported locales ──────────────────────────────────
  // `medical` = has clinician-reviewed content. When false the app shows a
  // translation-quality notice. See EPDS gating in tools.js.
  // `zom` (Zomi / Tedim Chin) has no ISO 639-1 two-letter code and no CLDR
  // data, so Intl falls back to defaults for it — see intlTag() and tp().
  const LOCALES = {
    en:  { name: 'English',  native: 'English',  dir: 'ltr', prompt: 'Tap your language' },
    es:  { name: 'Spanish',  native: 'Español',  dir: 'ltr', prompt: 'Toca tu idioma' },
    fr:  { name: 'French',   native: 'Français', dir: 'ltr', prompt: 'Choisissez votre langue' },
    ko:  { name: 'Korean',   native: '한국어',    dir: 'ltr', prompt: '언어를 선택하세요' },
    ar:  { name: 'Arabic',   native: 'العربية',  dir: 'rtl', prompt: 'اختر لغتك' },
    ru:  { name: 'Russian',  native: 'Русский',  dir: 'ltr', prompt: 'Выберите язык' },
    zh:  { name: 'Chinese',  native: '中文',      dir: 'ltr', prompt: '选择您的语言' },
    // NOTE: the Zomi prompt needs confirmation by a native speaker.
    zom: { name: 'Zomi',     native: 'Zomi',     dir: 'ltr', prompt: 'Na kam teel in' },
  };

  // Locales with no CLDR entry: hand Intl a fallback so date/number
  // formatting degrades to English conventions instead of throwing.
  const INTL_FALLBACK = { zom: 'en' };

  // Bumped alongside sw.js CACHE_NAME so an updated locale file is actually
  // re-fetched instead of served from the browser's heuristic cache.
  const ASSET_VERSION = '7';

  const FALLBACK = 'en';
  const STORAGE_KEY = 'myob.lang';

  let lang = FALLBACK;
  const listeners = [];

  // ─── Detection ──────────────────────────────────────────
  // Priority: explicit user choice → ?lang= → browser → en
  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LOCALES[saved]) return saved;
    } catch (e) { /* private mode */ }

    const qs = new URLSearchParams(location.search).get('lang');
    if (qs && LOCALES[qs]) return qs;

    for (const tag of (navigator.languages || [navigator.language || ''])) {
      const base = String(tag).toLowerCase().split('-')[0];
      if (LOCALES[base]) return base;
    }
    return FALLBACK;
  }

  // ─── Loading ────────────────────────────────────────────
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensureLoaded(code) {
    if (MYOB_LOCALES[code]) return true;
    try {
      await loadScript(`./i18n/locale.${code}.js?v=${ASSET_VERSION}`);
      return !!MYOB_LOCALES[code];
    } catch (e) {
      console.error('[i18n] could not load locale', code, e);
      return false;
    }
  }

  // ─── Lookup ─────────────────────────────────────────────
  function dig(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  // Resolve a dot-path against the active locale, then English, then null.
  function resolve(path) {
    const active = MYOB_LOCALES[lang];
    let v = active ? dig(active, path) : undefined;
    if (v === undefined || v === null || v === '') {
      const base = MYOB_LOCALES[FALLBACK];
      v = base ? dig(base, path) : undefined;
    }
    return v === undefined ? null : v;
  }

  // UI string. Returns the key itself if genuinely missing, which makes
  // untranslated surfaces obvious in testing rather than silently blank.
  function t(key, vars) {
    let s = resolve('ui.' + key);
    if (s == null) {
      console.warn('[i18n] missing key:', key);
      return key;
    }
    if (vars) {
      s = String(s).replace(/\{(\w+)\}/g, (m, k) =>
        Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m);
    }
    return s;
  }

  // Plural helper driven by Intl.PluralRules so languages with non-binary
  // plural categories (ar has 6) work without special-casing at call sites.
  // Usage: ui key holds { one: '…', other: '…' } etc.
  function tp(key, count, vars) {
    const forms = resolve('ui.' + key);
    if (forms == null) { console.warn('[i18n] missing plural key:', key); return key; }
    if (typeof forms === 'string') return t(key, Object.assign({ count }, vars));
    let cat = 'other';
    try { cat = new Intl.PluralRules(intlTag()).select(count); }
    catch (e) { cat = count === 1 ? 'one' : 'other'; }
    const s = forms[cat] || forms.other || forms.one || '';
    return String(s).replace(/\{(\w+)\}/g, (m, k) =>
      k === 'count' ? count : (vars && k in vars ? vars[k] : m));
  }

  // Non-UI structured data (content cards, contacts, birth-plan options…).
  // Falls back to English per top-level path, so a partially translated
  // locale renders translated where it can and English where it cannot.
  function data(path) {
    return resolve(path);
  }

  // ─── Static DOM ─────────────────────────────────────────
  // Elements carry English inline as the no-JS / pre-boot fallback:
  //   <span data-i18n="nav.home">Home</span>
  //   <input data-i18n-placeholder="search.placeholder">
  //   <button data-i18n-aria-label="theme.toggle">
  const ATTR_MAP = {
    'data-i18n-placeholder': 'placeholder',
    'data-i18n-title': 'title',
    'data-i18n-aria-label': 'aria-label',
    'data-i18n-alt': 'alt',
    'data-i18n-content': 'content',
    'data-i18n-value': 'value',
  };

  function applyStatic(root) {
    const scope = root || document;

    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      // data-i18n-html opts into markup (for strings with <br>, <strong>…).
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });

    Object.keys(ATTR_MAP).forEach(dataAttr => {
      scope.querySelectorAll('[' + dataAttr + ']').forEach(el => {
        el.setAttribute(ATTR_MAP[dataAttr], t(el.getAttribute(dataAttr)));
      });
    });
  }

  // ─── Formatting ─────────────────────────────────────────
  // Bound to the APP locale, not navigator.language — otherwise a user on an
  // English phone who picks Spanish gets Spanish text with English dates.
  function intlTag() {
    // Force Latin digits for Arabic: clinical values (BP 140/90, weights,
    // gestational weeks) are safer read in the numerals used on the
    // equipment and the chart.
    if (lang === 'ar') return 'ar-u-nu-latn';
    return INTL_FALLBACK[lang] || lang;
  }

  const fmt = {
    time(ts)  { return new Date(ts).toLocaleTimeString(intlTag(), { hour: 'numeric', minute: '2-digit' }); },
    date(ts)  { return new Date(ts).toLocaleDateString(intlTag(), { month: 'short', day: 'numeric' }); },
    dateLong(ts) { return new Date(ts).toLocaleDateString(intlTag(), { year: 'numeric', month: 'long', day: 'numeric' }); },
    dateTime(ts) { return fmt.date(ts) + ' ' + fmt.time(ts); },
    num(n, opts) { return new Intl.NumberFormat(intlTag(), opts).format(n); },
  };

  // ─── Text normalization (search) ────────────────────────
  // Folds diacritics and case so "cesarea" matches "cesárea" and
  // "PREECLAMPSIA" matches "preeclampsia".
  // Escapes are spelled out rather than written as literal glyphs: these
  // ranges are invisible or easily mangled by editors, and a silently broken
  // character class degrades search without erroring.
  function normalize(s) {
    return String(s)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')        // Latin combining marks
      // Arabic harakat/tashkeel, maddah, and both hamza marks. Stripping the
      // hamza BEFORE recomposing is what turns أ/إ into a bare alef.
      .replace(/[ً-ٰٕ]/g, '')
      // Recompose. NFD splits Hangul syllables into conjoining Jamo, which
      // would break both CJK detection and per-character index mapping.
      .normalize('NFC')
      .replace(/[آأإٱ]/g, 'ا')  // alef variants → bare alef
      .replace(/ة/g, 'ه')                       // ta marbuta → ha
      .replace(/ى/g, 'ي')                       // alef maksura → ya
      // Russian readers routinely type е for ё; fold so search still matches.
      .replace(/ё/g, 'е');
  }

  // Fold a string while keeping a map back to original indices, so a match
  // found in folded space can be sliced/highlighted in the ORIGINAL text.
  // Folding alone changes length (NFD expands, mark-stripping contracts), so
  // naive index reuse would slice snippets at the wrong character.
  function foldMap(s) {
    const src = String(s);
    let norm = '';
    const map = [];
    for (let i = 0; i < src.length; i++) {
      const folded = normalize(src[i]);
      for (let j = 0; j < folded.length; j++) { norm += folded[j]; map.push(i); }
    }
    map.push(src.length);   // sentinel so an end index always maps
    return { norm, map };
  }

  // Korean/Japanese/Chinese do not delimit words with spaces, so a
  // whitespace split yields one giant token and substring search degrades.
  // For CJK we also emit character bigrams as fallback tokens.
  // Hangul syllables + conjoining/compatibility Jamo, kana, and Han.
  const CJK = /[ᄀ-ᇿ぀-ヿ㄰-㆏㐀-䶿一-鿿가-힯]/;

  function tokenize(q) {
    const n = normalize(q).trim();
    if (!n) return [];
    const bySpace = n.split(/\s+/).filter(Boolean);
    if (!CJK.test(n)) return bySpace;
    const out = [];
    bySpace.forEach(tok => {
      if (!CJK.test(tok) || tok.length <= 2) { out.push(tok); return; }
      for (let i = 0; i < tok.length - 1; i++) out.push(tok.slice(i, i + 2));
    });
    return out.length ? out : bySpace;
  }

  // ─── Switching ──────────────────────────────────────────
  function applyDocumentAttrs() {
    const meta = LOCALES[lang] || LOCALES[FALLBACK];
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    document.documentElement.setAttribute('data-lang', lang);
  }

  async function setLocale(code, opts) {
    if (!LOCALES[code]) return false;
    const ok = await ensureLoaded(code);
    if (!ok) return false;

    lang = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* private mode */ }

    applyDocumentAttrs();
    applyStatic(document);
    if (!opts || opts.notify !== false) listeners.forEach(fn => { try { fn(lang); } catch (e) { console.error(e); } });
    return true;
  }

  function onChange(fn) { listeners.push(fn); }

  // True only until the user has explicitly chosen a language. Drives the
  // first-run picker: an auto-detected locale is a guess, not a choice.
  function hasExplicitChoice() {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch (e) { return false; }
  }

  // ─── Boot ───────────────────────────────────────────────
  async function boot() {
    await ensureLoaded(FALLBACK);   // fallback layer, always present
    const want = detect();
    if (want !== FALLBACK) await ensureLoaded(want);
    lang = MYOB_LOCALES[want] ? want : FALLBACK;
    applyDocumentAttrs();
    applyStatic(document);
    return lang;
  }

  return {
    get lang() { return lang; },
    get dir() { return (LOCALES[lang] || LOCALES[FALLBACK]).dir; },
    get isRTL() { return this.dir === 'rtl'; },
    get meta() { return LOCALES[lang] || LOCALES[FALLBACK]; },
    LOCALES, FALLBACK,
    boot, setLocale, onChange, hasExplicitChoice,
    t, tp, data, applyStatic,
    fmt, normalize, tokenize, foldMap,
  };
})();

// Convenience alias used throughout content.js / tools.js templates.
const t = (key, vars) => I18n.t(key, vars);
const tp = (key, count, vars) => I18n.tp(key, count, vars);
