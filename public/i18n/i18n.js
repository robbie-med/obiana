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
  // `flag` is an ISO country code resolving to flags/<code>.svg. Bundled SVGs
  // rather than emoji: emoji flags render completely differently per platform
  // and are missing entirely on some Android builds.
  //
  // Whether a locale is clinician-reviewed lives on the locale file itself
  // (`reviewed`), which drives the machine-translation notice.
  //
  // zom (Zomi / Tedim Chin) has no ISO 639-1 code and no CLDR data, so Intl
  // gets a fallback tag. See INTL_FALLBACK.
  const LOCALES = {
    en:  { name: 'English',  native: 'English',  dir: 'ltr', prompt: 'Tap your language', flag: 'gb' },
    es:  { name: 'Spanish',  native: 'Español',  dir: 'ltr', prompt: 'Toca tu idioma', flag: 'es' },
    fr:  { name: 'French',   native: 'Français', dir: 'ltr', prompt: 'Choisissez votre langue', flag: 'fr' },
    ko:  { name: 'Korean',   native: '한국어',    dir: 'ltr', prompt: '언어를 선택하세요', flag: 'kr' },
    ar:  { name: 'Arabic',   native: 'العربية',  dir: 'rtl', prompt: 'اختر لغتك', flag: 'sa' },
    ru:  { name: 'Russian',  native: 'Русский',  dir: 'ltr', prompt: 'Выберите язык', flag: 'ru' },
    zh:  { name: 'Chinese',  native: '中文',      dir: 'ltr', prompt: '选择您的语言', flag: 'cn' },
    // NOTE: the Zomi prompt needs confirmation by a native speaker.
    zom: { name: 'Zomi',     native: 'Zomi',     dir: 'ltr', prompt: 'Na kam teel in', flag: 'mm' },

    ja:  { name: 'Japanese', native: '日本語',    dir: 'ltr', prompt: '言語を選んでください', flag: 'jp' },
    tl:  { name: 'Tagalog',  native: 'Tagalog',  dir: 'ltr', prompt: 'Piliin ang iyong wika', flag: 'ph' },
    // Region subtag is deliberate: pt-BR and pt-PT diverge in vocabulary, and
    // Intl gives Brazilian date and number conventions for free.
    'pt-BR': { name: 'Portuguese (Brazil)', native: 'Português (Brasil)', dir: 'ltr',
               prompt: 'Escolha seu idioma', flag: 'br' },
    // Pashto and Dari share Afghanistan; both are Afghan languages.
    ps:  { name: 'Pashto',   native: 'پښتو',     dir: 'rtl', prompt: 'خپله ژبه وټاکئ', flag: 'af' },
    prs: { name: 'Dari',     native: 'دری',      dir: 'rtl', prompt: 'زبان خود را انتخاب کنید', flag: 'af' },

    vi:  { name: 'Vietnamese', native: 'Tiếng Việt', dir: 'ltr', prompt: 'Chọn ngôn ngữ của bạn', flag: 'vn' },
    th:  { name: 'Thai',     native: 'ไทย',       dir: 'ltr', prompt: 'เลือกภาษาของคุณ', flag: 'th' },
    de:  { name: 'German',   native: 'Deutsch',  dir: 'ltr', prompt: 'Wählen Sie Ihre Sprache', flag: 'de' },
    pl:  { name: 'Polish',   native: 'Polski',   dir: 'ltr', prompt: 'Wybierz swój język', flag: 'pl' },
  };

  // Flag choices are editorial, not political: English takes the Union Jack
  // because it marks a language, Zomi takes Myanmar at the clinician's
  // direction, Arabic takes Saudi Arabia as the conventional emblem. The US
  // flag on the care notice is separate and refers to the health system.
  // See NOTICE.md.

  // Locales with no CLDR entry: hand Intl a fallback so date/number
  // formatting degrades to English conventions instead of throwing.
  const INTL_FALLBACK = {
    zom: 'en',
    // Dari borrows Persian formatting, which defaults to the Jalali calendar
    // and Persian digits. Force Gregorian and Latin numerals so dates and
    // clinical numbers match the chart and the appointment card.
    prs: 'fa-u-nu-latn-ca-gregory',
  };

  // Bumped alongside sw.js CACHE_NAME so an updated locale file is actually
  // re-fetched instead of served from the browser's heuristic cache.
  const ASSET_VERSION = '119';

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
      // Try the full tag first so pt-BR wins over a generic pt, then the base.
      const exact = Object.keys(LOCALES).find(c => c.toLowerCase() === String(tag).toLowerCase());
      if (exact) return exact;
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
    return expandUnits(s);
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
    return expandUnits(String(s).replace(/\{(\w+)\}/g, (m, k) =>
      k === 'count' ? count : (vars && k in vars ? vars[k] : m)));
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

    // Labels and number inputs that follow the unit setting carry both forms:
    //   data-i18n-us / data-i18n-metric  the label key for each
    //   data-us / data-metric            "example|min|max|step" for the input
    const metric = getUnits() === 'metric';
    scope.querySelectorAll('[data-i18n-metric]').forEach(el => {
      el.setAttribute('data-i18n', el.getAttribute(metric ? 'data-i18n-metric' : 'data-i18n-us'));
    });
    scope.querySelectorAll('[data-metric]').forEach(el => {
      const [eg, min, max, step] = el.getAttribute(metric ? 'data-metric' : 'data-us').split('|');
      el.setAttribute('data-i18n-eg', eg);
      el.min = min; el.max = max; el.step = step;
    });

    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      // data-i18n-html opts into markup (for strings with <br>, <strong>…).
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });

    // "e.g. 15" hints: the number is the example value, the "e.g." is language.
    // data-i18n-eg="15" keeps the two apart without a key per input.
    scope.querySelectorAll('[data-i18n-eg]').forEach(el => {
      const n = el.getAttribute('data-i18n-eg');
      el.setAttribute('placeholder', t('common.eg', { n: fmt.num(Number(n)) }));
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
    // opts overrides the default day-and-month shape, so callers that want just
    // a month go through intlTag() too and inherit the INTL_FALLBACK table.
    date(ts, opts) { return new Date(ts).toLocaleDateString(intlTag(), opts || { month: 'short', day: 'numeric' }); },
    dateLong(ts) { return new Date(ts).toLocaleDateString(intlTag(), { year: 'numeric', month: 'long', day: 'numeric' }); },
    dateTime(ts) { return fmt.date(ts) + ' ' + fmt.time(ts); },
    num(n, opts) { return new Intl.NumberFormat(intlTag(), opts).format(n); },
  };

  // ─── Units ──────────────────────────────────────────────
  // US units by default; metric if she picks it in Me. Card and ui text never
  // spell a measured value out. It carries a token, in English and in every
  // translation alike, and the token is drawn in the chosen unit:
  //   {temp:100.4}  °F       → "100.4°F" or "38°C"
  //   {vol:4-6}     fluid oz → "4–6 oz"  or "120–180 mL"
  //   {wt:12}       oz (mass)→ "12 oz"   or "340 g"
  //   {lb:25-35}    pounds   → "25–35 lbs" or "11.5–16 kg"
  // The number in a token is always the US value, so one token means the same
  // thing in every language, and check.js can hold translations to it.
  const UNITS_KEY = 'obiana.units';
  function getUnits() {
    try { return localStorage.getItem(UNITS_KEY) === 'metric' ? 'metric' : 'us'; }
    catch (e) { return 'us'; }
  }
  function setUnits(u) {
    try { localStorage.setItem(UNITS_KEY, u === 'metric' ? 'metric' : 'us'); } catch (e) {}
  }
  const round = (x, step) => Math.round(x / step) * step;
  // Metric values are rounded the way a clinic would say them, not to the
  // precision of the arithmetic: 100.4°F is "38°C", 12 oz of fish "340 g".
  const CONV = {
    temp: { us: '°F', m: '°C', glue: '', to: f => { const c = (f - 32) * 5 / 9; return c >= 50 ? Math.round(c) : round(c, 0.1); } },
    vol:  { us: 'oz', m: 'mL', glue: ' ', to: oz => { const ml = oz * 29.5735; return ml < 100 ? round(ml, 5) : round(ml, 10); } },
    wt:   { us: 'oz', m: 'g',  glue: ' ', to: oz => { const g = oz * 28.3495; return g < 100 ? round(g, 5) : round(g, 10); } },
    lb:   { us: 'lbs', m: 'kg', glue: ' ', to: lb => round(lb * 0.45359, 0.5) },
  };
  const UNIT_TOKEN = /\{(temp|vol|wt|lb):(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?\}/g;
  function unitNum(n, kind, metric) {
    if (!metric && kind === 'wt' && n === 0.5) return '½';
    return fmt.num(+(+n).toFixed(1));
  }
  function unitValue(kind, a, b, units) {
    const c = CONV[kind], metric = (units || getUnits()) === 'metric';
    const v = x => metric ? c.to(+x) : +x;
    const nums = [a, b].filter(x => x !== undefined).map(x => unitNum(v(x), kind, metric));
    return nums.join('–') + c.glue + (metric ? c.m : c.us);
  }
  function expandUnits(s, units) {
    if (typeof s !== 'string' || s.indexOf('{') === -1) return s;
    return s.replace(UNIT_TOKEN, (m, kind, a, b) => unitValue(kind, a, b, units));
  }
  const units = { get: getUnits, set: setUnits, expand: expandUnits, value: unitValue, TOKEN: UNIT_TOKEN };

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
  // Scripts that do not delimit words with spaces: Hangul (+ Jamo), kana, Han,
  // and Thai. A whitespace split yields one unusable token for all of them.
  const CJK = /[ᄀ-ᇿ぀-ヿ㄰-㆏㐀-䶿一-鿿가-힯ก-๛]/;

  function tokenize(q) {
    const n = normalize(q).trim();
    if (!n) return [];
    const bySpace = n.split(/\s+/).filter(Boolean);
    if (!CJK.test(n)) return bySpace;

    // Intl.Segmenter knows real word boundaries for Thai, Japanese and Chinese.
    // Prefer it: naive bigrams split Thai combining marks off their base
    // consonant, producing tokens like "ั้" that can never match anything.
    try {
      const seg = new Intl.Segmenter(intlTag(), { granularity: 'word' });
      const words = [...seg.segment(n)]
        .filter(s => s.isWordLike)
        .map(s => s.segment.trim())
        .filter(Boolean);
      if (words.length) return words;
    } catch (e) { /* no Segmenter: fall through */ }

    // Fallback: grapheme-safe bigrams, so a mark stays with its base character.
    const out = [];
    bySpace.forEach(tok => {
      if (!CJK.test(tok)) { out.push(tok); return; }
      let chars;
      try {
        chars = [...new Intl.Segmenter(intlTag(), { granularity: 'grapheme' }).segment(tok)]
          .map(s => s.segment);
      } catch (e) { chars = [...tok]; }
      if (chars.length <= 2) { out.push(tok); return; }
      for (let i = 0; i < chars.length - 1; i++) out.push(chars[i] + chars[i + 1]);
    });
    return out.length ? out : bySpace;
  }

  // ─── Switching ──────────────────────────────────────────
  function applyDocumentAttrs() {
    const meta = LOCALES[lang] || LOCALES[FALLBACK];
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    document.documentElement.setAttribute('data-lang', lang);
    updateCanonical();
  }

  // Each language version is the root plus ?lang=. A ?lang= page names itself
  // as canonical, so search engines keep the versions apart (a canonical that
  // pointed every version at the root would cancel the hreflang links). Every
  // other URL, including the root with a saved language, points at the root.
  function updateCanonical() {
    const link = document.getElementById('canonical');
    if (!link) return;
    let q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    link.href = (q && LOCALES[q] && q === lang) ? `https://obiana.app/?lang=${q}` : 'https://obiana.app/';
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
    boot, setLocale, onChange, hasExplicitChoice, ensureLoaded,
    t, tp, data, applyStatic,
    fmt, units, normalize, tokenize, foldMap,
  };
})();

// Convenience aliases used throughout the app/ templates, which put the result
// straight into innerHTML. Escaped by default: ui strings carry no markup but
// <br> (check.js renders all of them), so any other "<" in a translation or a
// value is text, never a tag. A reader-suggested wording that slipped through
// review as "<img onerror=…>" shows as those characters, not as code.
// Entities (&gt;, &amp;) are left alone; they are how the strings spell > and &.
const uiSafe = s => String(s).replace(/<(?!br\s*\/?>)/gi, '&lt;');
const t = (key, vars) => uiSafe(I18n.t(key, vars));
const tp = (key, count, vars) => uiSafe(I18n.tp(key, count, vars));
