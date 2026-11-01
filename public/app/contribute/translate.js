// ═══════════════════════════════════════════════════════
// TRANSLATE: #/translate, one sentence at a time
// ═══════════════════════════════════════════════════════
// A bilingual reader checks Obiana in her language without seeing a key, a
// file or a line of code. Pick a language once; then each sentence shows where
// it appears, the English, and the current translation ready to edit, with
// Send, Looks right and Skip.
//
// It reads the LIVE catalogs, so it always reflects what is actually shipped.
// The order (see translateQueue) puts what readers need most first: When to
// call, then the tabs and Today, Visits, the cards in guide order, the rest;
// within each, missing, then unreviewed machine drafts, then outdated, then
// existing translations to confirm.
//
// Sending is automatic. Every Send and Looks right goes into a queue in
// localStorage and is posted to /api/suggest when online, retried when not.
// Nothing from any tracker is ever in it: only the key, the English, what is
// shipped now and the proposed wording.
//
// Shareable: #/translate/es opens straight on Spanish.

const TR_LANG_KEY = 'myob.translateLang';
const TR_MARKS_KEY = 'myob.translateMarks';   // { lang: { key: { a: 'sent'|'ok'|'skip', h } } }
const TR_QUEUE_KEY = 'myob.translateQueue';   // [{ lang, key, kind, suggestion, source, current }]

TOOL_INITS['translate'] = initTranslate;

function trLoad(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } }
function trSave(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

// Flatten a locale to the keys /api/suggest accepts: ui strings by their bare
// dot path, guide cards under "content." so the two cannot collide.
function flattenUi(obj, pre, out) {
  out = out || {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = pre ? pre + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const sub = Object.keys(v);
      const isPlural = sub.length && sub.every(x =>
        ['zero','one','two','few','many','other'].includes(x));
      if (isPlural) out[key] = v; else flattenUi(v, key, out);
    } else out[key] = v;
  }
  return out;
}
function flattenLocale(L) {
  const out = flattenUi((L || {}).ui);
  const content = (L || {}).content || {};
  for (const [id, card] of Object.entries(content)) {
    for (const f of ['title', 'sub']) {
      if (typeof card[f] === 'string' && card[f] !== '') out[`content.${id}.${f}`] = card[f];
    }
    (card.t || []).forEach((run, i) => { out[`content.${id}.t.${i}`] = run; });
  }
  return out;
}

// ─── Plain text in, the catalog's own form out ──────────
// Translators never see markup. A string whose English carries entities or
// <br> is HTML: it is shown decoded (<br> as a line break) and encoded again on
// send. A string without them is plain text and goes back exactly as typed.
const TR_HTMLISH = /&(amp|gt|lt|nbsp|quot|#\d+);|<br\s*\/?>/i;
function trIsHtml(en) { return TR_HTMLISH.test(en); }
function trToEdit(s, html) {
  if (!html) return s;
  return s.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n))
    .replace(/&amp;/g, '&');
}
function trFromEdit(s, html) {
  s = s.trim();
  if (!html) return s;
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, '<br>');
}

// {placeholders} (and the unit tokens of NEXT §6, {temp:100.4}) are filled in
// at runtime. A translation must keep every one, byte for byte.
function trTokens(s) { return (String(s).match(/\{[^{}\s]+\}/g) || []).sort(); }
function trMissingTokens(en, text) {
  const have = trTokens(text); const missing = [];
  for (const tok of trTokens(en)) {
    const i = have.indexOf(tok);
    if (i === -1) missing.push(tok); else have.splice(i, 1);
  }
  return { missing, extra: have };
}

// ─── The order ──────────────────────────────────────────
function trSlotOrder(id) {
  const tpl = (window.MYOB_BODY_TPL || {})[id] || '';
  const seen = [];
  tpl.replace(/\{\{(\d+)\}\}/g, (m, n) => { if (!seen.includes(+n)) seen.push(+n); return m; });
  return seen;
}

function trSections() {
  const en = flattenLocale(window.MYOB_LOCALES.en);
  const placed = new Set();
  const sections = [];
  const add = (where, keys) => {
    const list = keys.filter(k => k in en && !placed.has(k));
    list.forEach(k => placed.add(k));
    if (list.length) sections.push({ where, keys: list });
  };
  const uiKeys = pre => Object.keys(en).filter(k => k.startsWith(pre));
  const slots = (id, ns) => ns.map(n => `content.${id}.t.${n}`);

  // 1. When to call and the warning lists it is built from (guide/urgent.js).
  add(() => t('urgent.title'), [
    ...uiKeys('urgent.'), 'home.duringPregnancy', 'home.callYourDoctorIf',
    ...(typeof PREGNANCY_SIGNS !== 'undefined' ? PREGNANCY_SIGNS : []).map(k => 'home.' + k),
    ...slots('postpartum-danger', [0, 1, 2, 3]), ...slots('signs-of-labor', [11, 12, 13, 14, 15, 16, 17]),
    ...slots('normal-newborn', [31, 32]),
  ]);
  // 2. The tabs and Today.
  add(() => t('tool.i18n.whereTabs'), [...uiKeys('nav.'), 'app.prenatal', 'app.labor', 'app.recovery', 'app.baby',
    ...uiKeys('today.')]);
  // 3. Visits.
  add(() => t('visits.title'), uiKeys('visits.'));
  // 4. The cards, in guide order; each FAQ answer where the guide shows it.
  for (const sec of GUIDE_SECTIONS) {
    const cards = [...(CONTENT_STRUCTURE[sec] || []),
                   ...(CONTENT_STRUCTURE.faq || []).filter(f => (f.in || 'pregnancy') === sec)];
    for (const c of cards) {
      add(() => `${trSectionName(sec)} → ${trPlain(cardField(c.id, 'title').text || c.id)}`,
        [`content.${c.id}.title`, `content.${c.id}.sub`, ...slots(c.id, trSlotOrder(c.id))]);
    }
  }
  // 5. Everything else, grouped by the screen it belongs to.
  const rest = Object.keys(en).filter(k => !placed.has(k));
  const groups = new Map();
  for (const k of rest) {
    const g = k.startsWith('content.') ? 'content' : k.startsWith('tool.') ? 'tool.' + k.split('.')[1] : k.split('.')[0];
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(k);
  }
  for (const [g, keys] of groups) add(() => trGroupName(g), keys);
  return sections;
}

function trSectionName(sec) {
  return trPlain(t({ pregnancy: 'app.prenatal', labor: 'app.labor', recovery: 'app.recovery', baby: 'app.baby' }[sec]));
}
// A tool's own back-bar title names it in the reader's language already.
function trGroupName(g) {
  if (g.startsWith('tool.')) {
    const title = document.querySelector(`#page-tool-${g.slice(5)} .tool-back-title`);
    return `${trPlain(t('nav.toolsTrackers'))} → ${title ? title.textContent.trim() : g.slice(5)}`;
  }
  const page = { myinfo: 'nav.me', me: 'nav.me', home: 'nav.today', tools: 'nav.toolsTrackers', urgent: 'nav.urgent' }[g];
  return page ? trPlain(t(page)) : t('tool.i18n.whereOther');
}
function trPlain(s) { return String(s || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'); }

// State of one key in one language.
//   0 missing (or identical to the English)   1 unreviewed machine draft
//   2 outdated: the English changed since     3 translated, to confirm
// `unreviewed` is written by translation/merge.js for machine drafts (§4),
// keyed like this page's keys; a Send or Looks right clears it at review.
function trState(lang, key, en, cur) {
  if (cur === undefined || cur === '' || String(cur) === String(en)) return 0;
  const L = window.MYOB_LOCALES[lang] || {};
  if (L.unreviewed && L.unreviewed[key]) return 1;
  if (typeof staleSet === 'function' && staleSet(lang).has(key)) return 2;
  return 3;
}

function trMarkHash(en, cur) { return srcHashOf(String(en)) + srcHashOf(String(cur || '')); }

// Every sentence of a language, in order, with its state and whether it is
// done. A mark only counts while the English and the shipped wording are what
// they were when it was made: a sentence confirmed last month whose English has
// since changed comes round again.
function trQueue(lang) {
  const en = flattenLocale(window.MYOB_LOCALES.en);
  const tgt = flattenLocale(window.MYOB_LOCALES[lang]);
  const marks = (trLoad(TR_MARKS_KEY, {})[lang]) || {};
  const items = [];
  trSections().forEach((sec, si) => {
    const here = [];
    for (const key of sec.keys) {
      const source = en[key];
      if (typeof source !== 'string' || source === '') continue;   // plural forms, blanked slots
      const cur = typeof tgt[key] === 'string' ? tgt[key] : '';
      const m = marks[key];
      const mark = m && m.h === trMarkHash(source, cur) ? m.a : null;
      here.push({ key, source, cur, state: trState(lang, key, source, cur), mark, where: sec.where, si });
    }
    here.sort((a, b) => a.state - b.state);   // stable: keeps guide order within a state
    items.push(...here);
  });
  return items;
}

// ─── Sending ────────────────────────────────────────────
let _trFlushing = false;
let _trRetry = null;
async function trFlush() {
  if (_trFlushing || !navigator.onLine) return;
  _trFlushing = true;
  try {
    let q = trLoad(TR_QUEUE_KEY, []);
    while (q.length) {
      const item = q[0];
      let res;
      try {
        res = await fetch('/api/suggest', { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify(item) });
      } catch (e) { break; }                                  // offline again: keep it
      if (res.status === 429 || res.status >= 500) {          // later, not never
        clearTimeout(_trRetry); _trRetry = setTimeout(trFlush, 10 * 60 * 1000);
        break;
      }
      // ok, or a 4xx that can never succeed (a key removed since): either way done.
      q = trLoad(TR_QUEUE_KEY, []); q.shift(); trSave(TR_QUEUE_KEY, q);
    }
  } finally { _trFlushing = false; trShowQueued(); }
}
function trEnqueue(item) {
  const q = trLoad(TR_QUEUE_KEY, []);
  q.push(item); trSave(TR_QUEUE_KEY, q);
  trFlush();
}
window.addEventListener('online', trFlush);
setTimeout(() => { if (trLoad(TR_QUEUE_KEY, []).length) trFlush(); }, 3000);

function trShowQueued() {
  const el = document.getElementById('tr-queued');
  if (!el) return;
  const n = trLoad(TR_QUEUE_KEY, []).length;
  el.hidden = !n;
  el.textContent = n ? t('tool.i18n.queued', { n: I18n.fmt.num(n) }) : '';
}

function trMark(lang, item, a) {
  const all = trLoad(TR_MARKS_KEY, {});
  all[lang] = all[lang] || {};
  all[lang][item.key] = { a, h: trMarkHash(item.source, item.cur) };
  trSave(TR_MARKS_KEY, all);
}

// ─── The page ───────────────────────────────────────────
let _trLang = null;
let _trShowSkipped = false;

function trTargetLang() {
  const fromHash = (location.hash.match(/^#\/translate\/([\w-]+)/) || [])[1];
  if (fromHash && I18n.LOCALES[fromHash] && fromHash !== 'en') { trSave(TR_LANG_KEY, fromHash); return fromHash; }
  const saved = trLoad(TR_LANG_KEY, null);
  return saved && I18n.LOCALES[saved] && saved !== 'en' ? saved : null;
}

function initTranslate() {
  const el = document.getElementById('translate-content');
  if (!el) return;
  _trLang = trTargetLang();
  if (!_trLang) return trRenderPicker(el);
  if (!window.MYOB_LOCALES[_trLang]) {
    el.innerHTML = `<p class="history-empty">${escHtml(t('tool.i18n.loading'))}</p>`;
    I18n.ensureLoaded(_trLang).then(initTranslate);
    return;
  }
  trRender(el);
  trFlush();
}

function trRenderPicker(el) {
  const codes = Object.keys(I18n.LOCALES).filter(c => c !== 'en');
  const suggest = I18n.lang !== 'en' ? I18n.lang : null;
  el.innerHTML = `
    <div class="tr-wrap">
      <p class="tr-intro">${escHtml(t('tool.i18n.intro'))}</p>
      <h2 class="tr-pick-title">${escHtml(t('tool.i18n.pickLanguage'))}</h2>
      <div class="tr-pick">
        ${codes.map(c => `<button type="button" class="tr-pick-btn${c === suggest ? ' suggested' : ''}" data-lang="${c}"
            lang="${c}" dir="${I18n.LOCALES[c].dir}">${escHtml(I18n.LOCALES[c].native)}</button>`).join('')}
      </div>
      <p class="tr-privacy">${escHtml(t('tool.i18n.privacy'))}</p>
    </div>`;
  el.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
    trSave(TR_LANG_KEY, b.dataset.lang);
    history.replaceState(history.state, '', '#/translate/' + b.dataset.lang);
    initTranslate();
  }));
}

function trRender(el) {
  const lang = _trLang;
  const meta = I18n.LOCALES[lang];
  const items = trQueue(lang);
  const done = items.filter(i => i.mark === 'sent' || i.mark === 'ok').length;
  const skipped = items.filter(i => i.mark === 'skip');
  const next = items.find(i => !i.mark) || (_trShowSkipped ? skipped[0] : null);

  const head = `
    <div class="tr-head">
      <span class="tr-lang" lang="${lang}" dir="${meta.dir}">${escHtml(meta.native)}</span>
      <span class="tr-progress">${escHtml(t('tool.i18n.progress', { done: I18n.fmt.num(done), total: I18n.fmt.num(items.length) }))}</span>
      <button type="button" class="tr-link" id="tr-change">${escHtml(t('tool.i18n.changeLanguage'))}</button>
    </div>
    <div class="tr-bar" aria-hidden="true"><span style="width:${items.length ? (100 * done / items.length).toFixed(1) : 0}%"></span></div>
    <p class="tr-queued" id="tr-queued" role="status" hidden></p>`;

  if (!next) {
    el.innerHTML = `<div class="tr-wrap">${head}
      <div class="card tr-card"><p class="tr-done">${escHtml(t('tool.i18n.allDone'))}</p>
      ${skipped.length ? `<button type="button" class="btn-sm btn-teal" id="tr-skipped">${escHtml(t('tool.i18n.showSkipped', { n: I18n.fmt.num(skipped.length) }))}</button>` : ''}
      </div></div>`;
    const sb = document.getElementById('tr-skipped');
    if (sb) sb.addEventListener('click', () => { _trShowSkipped = true; trRender(el); });
  } else {
    const html = trIsHtml(next.source);
    const editable = trToEdit(next.cur, html);
    const tokens = trTokens(next.source);
    const banner = next.state === 0 ? 'missing' : next.state === 1 ? 'draft' : next.state === 2 ? 'stale' : '';
    el.innerHTML = `<div class="tr-wrap">${head}
      <div class="card tr-card">
        <div class="tr-where">${escHtml(next.where())}</div>
        ${banner ? `<p class="tr-banner ${banner}">${escHtml(t('tool.i18n.banner_' + banner))}</p>` : ''}
        <div class="tr-label">English</div>
        <div class="tr-en" lang="en" dir="ltr">${next.source}</div>
        <label class="tr-label" for="tr-text" lang="${lang}" dir="${meta.dir}">${escHtml(meta.native)}</label>
        <textarea id="tr-text" class="tool-textarea tr-text" rows="${Math.min(10, Math.max(3, Math.ceil(next.source.length / 45)))}"
          lang="${lang}" dir="${meta.dir}" autocapitalize="sentences">${escHtml(editable)}</textarea>
        ${tokens.length ? `<p class="tr-keep">${escHtml(t('tool.i18n.keepTokens'))}
          ${[...new Set(tokens)].map(x => `<button type="button" class="tr-token" data-token="${escHtml(x)}" dir="ltr">${escHtml(x)}</button>`).join(' ')}</p>` : ''}
        <p class="tr-error" id="tr-error" role="alert" hidden></p>
        <div class="tr-actions">
          <button type="button" class="btn-sm btn-teal" id="tr-send">${escHtml(t('tool.i18n.send'))}</button>
          <button type="button" class="btn-sm tr-ok" id="tr-ok"${next.cur ? '' : ' hidden'}>${escHtml(t('tool.i18n.looksRight'))}</button>
          <button type="button" class="btn-sm tr-skip" id="tr-skip">${escHtml(t('tool.i18n.skip'))}</button>
        </div>
      </div>
      <p class="tr-privacy">${escHtml(t('tool.i18n.privacy'))}</p>
    </div>`;

    const ta = document.getElementById('tr-text');
    const send = document.getElementById('tr-send');
    const ok = document.getElementById('tr-ok');
    const err = document.getElementById('tr-error');
    const sync = () => {
      const changed = ta.value.trim() !== editable.trim();
      send.disabled = !ta.value.trim() || !changed;
      ok.disabled = changed;
      err.hidden = true;
    };
    ta.addEventListener('input', sync);
    sync();

    el.querySelectorAll('[data-token]').forEach(b => b.addEventListener('click', () => {
      const s = ta.selectionStart ?? ta.value.length, e = ta.selectionEnd ?? s;
      ta.value = ta.value.slice(0, s) + b.dataset.token + ta.value.slice(e);
      ta.focus(); ta.setSelectionRange(s + b.dataset.token.length, s + b.dataset.token.length);
      sync();
    }));

    const advance = msg => { trRender(el); if (msg) showToast(msg); };
    send.addEventListener('click', () => {
      const suggestion = trFromEdit(ta.value, html);
      const { missing, extra } = trMissingTokens(next.source, suggestion);
      if (missing.length || extra.length) {
        err.textContent = t(missing.length ? 'tool.i18n.tokensMissing' : 'tool.i18n.tokensExtra',
          { tokens: (missing.length ? missing : extra).join(' ') });
        err.hidden = false;
        return;
      }
      trEnqueue({ lang, key: next.key, kind: 'suggest', suggestion, source: next.source, current: next.cur });
      trMark(lang, next, 'sent');
      advance(t(navigator.onLine ? 'tool.i18n.sent' : 'tool.i18n.savedOffline'));
    });
    ok.addEventListener('click', () => {
      trEnqueue({ lang, key: next.key, kind: 'confirm', suggestion: next.cur, source: next.source, current: next.cur });
      trMark(lang, next, 'ok');
      advance();
    });
    document.getElementById('tr-skip').addEventListener('click', () => { trMark(lang, next, 'skip'); advance(); });
  }

  document.getElementById('tr-change').addEventListener('click', () => {
    trSave(TR_LANG_KEY, null);
    _trShowSkipped = false;
    history.replaceState(history.state, '', '#/translate');
    initTranslate();
  });
  trShowQueued();
}

// ═══════════════════════════════════════════════════════
// TAP A SENTENCE TO SUGGEST (Me toggle)
// ═══════════════════════════════════════════════════════
// While on, tapping a guide sentence, or a line of text that is not itself a
// button or link, opens a small sheet: the English, the wording shown now, and
// Send. It goes through the same queue as the Translate page. Guide sentences
// are marked as they render (cardBody's MYOB_EDIT_WRAP slot wrapper, which
// already knows each slot's key); static text carries its key in data-i18n.
// Only for a translated language: English is the source, not a translation.
const TR_TAP_KEY = 'myob.suggestTap';

function trWrap(key, raw, shown) {
  return `<span class="sg-slot" data-sg-key="${key}">${shown}</span>`;
}

function trTapOn() {
  try { return localStorage.getItem(TR_TAP_KEY) === '1' && I18n.lang !== I18n.FALLBACK; }
  catch (e) { return false; }
}

function trApplyTap() {
  const on = trTapOn();
  const row = document.getElementById('me-suggest-row');
  if (row) row.hidden = I18n.lang === I18n.FALLBACK;
  const box = document.getElementById('me-suggest-toggle');
  if (box) box.checked = on;
  // The local English editor owns the wrapper when it is loaded; leave it be.
  const ours = !window.MYOB_EDIT_WRAP || window.MYOB_EDIT_WRAP === trWrap;
  const was = document.body.classList.contains('suggest-mode');
  document.body.classList.toggle('suggest-mode', on);
  if (ours) window.MYOB_EDIT_WRAP = on ? trWrap : undefined;
  trTapBar(on);
  if (ours && was !== on) {
    // Rebuild the guide so its sentences gain or lose their markers.
    document.querySelectorAll('[id^="cards-"]').forEach(c => { delete c.dataset.rendered; c.innerHTML = ''; });
    Object.keys(CONTENT_STRUCTURE).forEach(sec => {
      if (document.getElementById('page-' + sec)?.classList.contains('active')) renderSection(sec);
    });
  }
}

function trSetTap(on) {
  try { localStorage.setItem(TR_TAP_KEY, on ? '1' : '0'); } catch (e) {}
  trApplyTap();
}

function trTapBar(on) {
  let bar = document.getElementById('suggest-bar');
  if (!on) { if (bar) bar.hidden = true; return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'suggest-bar';
    bar.setAttribute('role', 'status');
    // In the page's own column, above the content, so it covers nothing.
    const content = document.getElementById('content');
    content ? content.parentNode.insertBefore(bar, content) : document.body.appendChild(bar);
  }
  bar.innerHTML = `<span>${escHtml(t('tool.i18n.tapBar'))}</span>
    <button type="button" id="suggest-bar-off">${escHtml(t('tool.i18n.tapOff'))}</button>`;
  bar.hidden = false;
  document.getElementById('suggest-bar-off').onclick = () => trSetTap(false);
}

document.addEventListener('change', e => {
  if (e.target && e.target.id === 'me-suggest-toggle') trSetTap(e.target.checked);
});

// Capture phase, so a sentence inside an open card is not also a card toggle.
document.addEventListener('click', e => {
  if (!document.body.classList.contains('suggest-mode') || !e.target.closest) return;
  const tgt = e.target;
  if (tgt.closest('#suggest-sheet, #suggest-bar, #page-translate, #page-myinfo')) return;
  let key = (tgt.closest('[data-sg-key]') || {}).dataset?.sgKey;
  if (!key) {
    const el = tgt.closest('[data-i18n]');
    if (el && !el.closest('a, button, input, select, textarea, label, summary')) key = el.dataset.i18n;
  }
  if (!key) return;
  const en = flattenLocale(window.MYOB_LOCALES.en)[key];
  if (typeof en !== 'string' || en === '') return;
  e.preventDefault();
  e.stopPropagation();
  trOpenSheet(key, tgt);
}, true);

function trOpenSheet(key, from) {
  const lang = I18n.lang, meta = I18n.LOCALES[lang];
  const source = flattenLocale(window.MYOB_LOCALES.en)[key];
  const curRaw = flattenLocale(window.MYOB_LOCALES[lang])[key];
  const cur = typeof curRaw === 'string' ? curRaw : '';
  const html = trIsHtml(source);
  const editable = trToEdit(cur, html);
  const tokens = [...new Set(trTokens(source))];

  let sheet = document.getElementById('suggest-sheet');
  if (!sheet) { sheet = document.createElement('div'); sheet.id = 'suggest-sheet'; document.body.appendChild(sheet); }
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', 'sg-title');
  sheet.innerHTML = `<div class="sg-inner">
      <h2 id="sg-title" class="sg-title">${escHtml(t('tool.i18n.sheetTitle'))}</h2>
      <div class="tr-label">English</div>
      <div class="tr-en" lang="en" dir="ltr">${source}</div>
      <label class="tr-label" for="sg-text" lang="${lang}" dir="${meta.dir}">${escHtml(meta.native)}</label>
      <textarea id="sg-text" class="tool-textarea tr-text" rows="4" lang="${lang}" dir="${meta.dir}">${escHtml(editable)}</textarea>
      ${tokens.length ? `<p class="tr-keep">${escHtml(t('tool.i18n.keepTokens'))}
        ${tokens.map(x => `<button type="button" class="tr-token" data-token="${escHtml(x)}" dir="ltr">${escHtml(x)}</button>`).join(' ')}</p>` : ''}
      <p class="tr-error" id="sg-error" role="alert" hidden></p>
      <div class="tr-actions">
        <button type="button" class="btn-sm btn-teal" id="sg-send">${escHtml(t('tool.i18n.send'))}</button>
        <button type="button" class="btn-sm tr-skip" id="sg-cancel">${escHtml(t('tool.i18n.cancel'))}</button>
      </div>
    </div>`;
  sheet.hidden = false;

  const ta = document.getElementById('sg-text');
  const send = document.getElementById('sg-send');
  const err = document.getElementById('sg-error');
  const close = () => { sheet.hidden = true; document.removeEventListener('keydown', onKey, true); if (from && from.focus) from.focus(); };
  const onKey = ev => { if (ev.key === 'Escape') { ev.preventDefault(); close(); } };
  document.addEventListener('keydown', onKey, true);
  const sync = () => { send.disabled = !ta.value.trim() || ta.value.trim() === editable.trim(); err.hidden = true; };
  ta.addEventListener('input', sync); sync();
  sheet.onclick = ev => { if (ev.target === sheet) close(); };
  sheet.querySelectorAll('[data-token]').forEach(b => b.addEventListener('click', () => {
    const s = ta.selectionStart ?? ta.value.length, e = ta.selectionEnd ?? s;
    ta.value = ta.value.slice(0, s) + b.dataset.token + ta.value.slice(e);
    ta.focus(); sync();
  }));
  document.getElementById('sg-cancel').onclick = close;
  send.onclick = () => {
    const suggestion = trFromEdit(ta.value, html);
    const { missing, extra } = trMissingTokens(source, suggestion);
    if (missing.length || extra.length) {
      err.textContent = t(missing.length ? 'tool.i18n.tokensMissing' : 'tool.i18n.tokensExtra',
        { tokens: (missing.length ? missing : extra).join(' ') });
      err.hidden = false;
      return;
    }
    trEnqueue({ lang, key, kind: 'suggest', suggestion, source, current: cur });
    trMark(lang, { key, source, cur }, 'sent');
    close();
    showToast(t(navigator.onLine ? 'tool.i18n.sent' : 'tool.i18n.savedOffline'));
  };
  ta.focus();
}
