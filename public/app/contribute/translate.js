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

// ─── Pills ──────────────────────────────────────────────
// Tokens are never shown as code. Each is a locked pill, in the English and
// in the editor alike, reading as the English reads ("100.4°F") or, for a
// {placeholder}, its name. The editor is a contenteditable box so a pill can
// sit inside the text; what is read back out of it is the plain string with
// the tokens in place, exactly what a textarea would have given.
function trPillLabel(tok) {
  if (/^\{(temp|vol|wt|lb):/.test(tok)) return I18n.units.expand(tok, 'us');
  return tok.slice(1, -1);
}
function trPillHtml(tok) {
  return `<span class="tr-pill" contenteditable="false" data-token="${escHtml(tok)}" dir="ltr">${escHtml(trPillLabel(tok))}</span>`;
}
// English as shown above the editor: its own HTML, tokens as pills.
function trSourceHtml(source) {
  return String(source).replace(/\{[^{}\s]+\}/g, tok => trPillHtml(tok));
}
// Editable text → editor HTML: text escaped, newlines as <br>, tokens as pills.
function trEditorHtml(text) {
  return String(text).split(/(\{[^{}\s]+\})/).map((part, i) =>
    i % 2 ? trPillHtml(part) : escHtml(part).replace(/\n/g, '<br>')).join('');
}
// Editor → editable text. Browsers wrap new lines in <div> or <p> on Enter.
function trEditorText(ed) {
  let out = '';
  const walk = node => {
    for (const n of node.childNodes) {
      if (n.nodeType === 3) out += n.nodeValue;
      else if (n.nodeType !== 1) continue;
      else if (n.dataset && n.dataset.token) out += n.dataset.token;
      else if (n.nodeName === 'BR') out += '\n';
      else {
        const block = /^(DIV|P)$/.test(n.nodeName);
        if (block && out && !out.endsWith('\n')) out += '\n';
        walk(n);
      }
    }
  };
  walk(ed);
  return out.replace(/​/g, '').replace(/ /g, ' ');
}
// Wire an editor. Pills cannot be deleted: any edit whose range takes in a
// pill (Backspace next to one, typing over or cutting a selection that holds
// one) removes only the text and leaves every pill where it was. If some
// input path gets past that (a keyboard that doesn't send a cancelable
// beforeinput), the edit is undone. Pastes are plain text. The put-back row
// is only for a translation that arrived without a token.
function trWireEditor(ed, source, keepRow, onChange) {
  let saved = null;
  const remember = () => {
    const sel = getSelection();
    if (sel.rangeCount && ed.contains(sel.getRangeAt(0).commonAncestorContainer)) saved = sel.getRangeAt(0).cloneRange();
  };
  document.addEventListener('selectionchange', remember);
  const pills = () => [...ed.querySelectorAll('[data-token]')];
  const pillOf = n => n && (n.nodeType === 1 ? n : n.parentNode).closest && (n.nodeType === 1 ? n : n.parentNode).closest('[data-token]');
  // Replace the range's content with text, keeping every pill it held.
  const replaceKeepingPills = (r, text) => {
    const ps = pillOf(r.startContainer); if (ps && ed.contains(ps)) r.setStartBefore(ps);
    const pe = pillOf(r.endContainer); if (pe && ed.contains(pe)) r.setEndAfter(pe);
    const kept = pills().filter(p => r.intersectsNode(p));
    r.deleteContents();
    const frag = document.createDocumentFragment();
    const tn = text ? document.createTextNode(text) : null;
    if (tn) frag.appendChild(tn);
    kept.forEach(p => frag.appendChild(p));
    const start = r.startContainer, off = r.startOffset;
    r.insertNode(frag);
    const c = document.createRange();
    if (tn) c.setStart(tn, tn.length); else c.setStart(start, off);
    c.collapse(true);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(c);
    changed();
  };
  const toRange = sr => { const r = document.createRange(); r.setStart(sr.startContainer, sr.startOffset); r.setEnd(sr.endContainer, sr.endOffset); return r; };
  const currentRange = () => { const sel = getSelection(); return sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null; };
  const touchesPill = r => r && pills().some(p => r.intersectsNode(p));
  ed.addEventListener('beforeinput', ev => {
    if (ev.isComposing) return;
    if (!/^(delete|insertText|insertReplacementText|insertFromDrop|insertLineBreak|insertParagraph)/.test(ev.inputType)) return;
    const tr = ev.getTargetRanges ? ev.getTargetRanges() : [];
    const r = tr.length ? toRange(tr[0]) : currentRange();
    if (!touchesPill(r)) return;
    ev.preventDefault();
    const text = /^insert(Text|ReplacementText)/.test(ev.inputType) ? (ev.data || (ev.dataTransfer && ev.dataTransfer.getData('text/plain')) || '')
      : /^insert(LineBreak|Paragraph)/.test(ev.inputType) ? '\n' : '';
    replaceKeepingPills(r, text);
  });
  ed.addEventListener('dragstart', ev => ev.preventDefault());
  ed.addEventListener('drop', ev => ev.preventDefault());
  ed.addEventListener('paste', ev => {
    ev.preventDefault();
    const text = (ev.clipboardData || window.clipboardData).getData('text/plain');
    const r = currentRange();
    if (touchesPill(r)) replaceKeepingPills(r, text);
    else document.execCommand('insertText', false, text);
  });
  ed.addEventListener('cut', ev => {
    const r = currentRange();
    if (!touchesPill(r)) return;
    ev.preventDefault();
    const tmp = document.createElement('div'); tmp.appendChild(r.cloneContents());
    ev.clipboardData.setData('text/plain', trEditorText(tmp));
    replaceKeepingPills(r, '');
  });
  ed.addEventListener('keydown', ev => {
    if (ev.key !== 'Enter') return;
    ev.preventDefault();
    const r = currentRange();
    if (touchesPill(r) && !r.collapsed) replaceKeepingPills(r, '\n');
    else document.execCommand('insertLineBreak');
  });
  // Safety net: an edit that still lost a pill is undone.
  let snap = ed.innerHTML, snapCount = pills().length;
  const changed = () => { snap = ed.innerHTML; snapCount = pills().length; drawKeep(); onChange(); };
  const drawKeep = () => {
    if (!keepRow) return;
    const { missing } = trMissingTokens(source, trEditorText(ed));
    keepRow.hidden = !missing.length;
    keepRow.innerHTML = missing.length ? `${escHtml(t('tool.i18n.putBack'))} ` + [...new Set(missing)].map(x =>
      `<button type="button" class="tr-pill tr-pill-btn" data-token="${escHtml(x)}" dir="ltr">${escHtml(trPillLabel(x))}</button>`).join(' ') : '';
  };
  if (keepRow) {
    keepRow.addEventListener('mousedown', ev => { if (ev.target.closest('[data-token]')) ev.preventDefault(); });
    keepRow.addEventListener('click', ev => {
      const b = ev.target.closest('[data-token]'); if (!b) return;
      ed.focus();
      const sel = getSelection();
      let r = saved;
      if (!r || !ed.contains(r.commonAncestorContainer)) { r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); }
      r.deleteContents();
      const tmp = document.createElement('span'); tmp.innerHTML = trPillHtml(b.dataset.token);
      const pill = tmp.firstChild;
      r.insertNode(pill); r.setStartAfter(pill); r.collapse(true);
      sel.removeAllRanges(); sel.addRange(r); saved = r.cloneRange();
      changed();
    });
  }
  ed.addEventListener('input', ev => {
    if (ev.isComposing) return;
    if (pills().length < snapCount) {
      ed.innerHTML = snap;
      const c = document.createRange(); c.selectNodeContents(ed); c.collapse(false);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(c);
    }
    changed();
  });
  ed.addEventListener('compositionend', () => { if (pills().length < snapCount) { ed.innerHTML = snap; } changed(); });
  drawKeep();
  return () => document.removeEventListener('selectionchange', remember);
}
const trTokenNames = list => list.map(trPillLabel).join(', ');

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

// ─── Drafts left in the old Translation Helper ──────────
// The old Helper kept what she typed in myob.i18nSuggestions ({lang: {key:
// text}}) for a JSON export that no longer exists, so those sentences were
// never sent. The page offers them once: send (through the same queue) or
// delete. Nothing is sent without her tap.
const TR_OLD_KEY = 'myob.i18nSuggestions';
function trOldDrafts() {
  const old = trLoad(TR_OLD_KEY, {});
  const en = flattenLocale(window.MYOB_LOCALES.en);
  const list = [];
  for (const [lang, keys] of Object.entries(old || {})) {
    if (!I18n.LOCALES[lang] || lang === I18n.FALLBACK || !keys || typeof keys !== 'object') continue;
    const mine = flattenLocale((window.MYOB_LOCALES || {})[lang] || {});
    for (const [key, text] of Object.entries(keys)) {
      const source = en[key];
      if (typeof source !== 'string' || typeof text !== 'string' || !text.trim()) continue;
      const cur = typeof mine[key] === 'string' ? mine[key] : '';
      if (text.trim() === cur.trim()) continue;          // already what ships
      list.push({ lang, key, kind: 'suggest', suggestion: text.trim(), source, current: cur });
    }
  }
  return list;
}
function trOldDraftsHtml() {
  const n = trOldDrafts().length;
  if (!n) { try { localStorage.removeItem(TR_OLD_KEY); } catch (e) {} return ''; }
  return `<div class="tr-banner draft tr-old" id="tr-old">${escHtml(t('tool.i18n.oldDrafts', { n: I18n.fmt.num(n) }))}
    <div class="tr-actions"><button type="button" class="btn-sm btn-teal" id="tr-old-send">${escHtml(t('tool.i18n.oldDraftsSend'))}</button>
    <button type="button" class="btn-sm tr-skip" id="tr-old-delete">${escHtml(t('tool.i18n.oldDraftsDelete'))}</button></div></div>`;
}
function trWireOldDrafts(rerender) {
  const send = document.getElementById('tr-old-send');
  if (!send) return;
  send.addEventListener('click', () => {
    const list = trOldDrafts();
    const q = trLoad(TR_QUEUE_KEY, []); q.push(...list); trSave(TR_QUEUE_KEY, q);
    try { localStorage.removeItem(TR_OLD_KEY); } catch (e) {}
    trFlush();
    rerender();
    showToast(t(navigator.onLine ? 'tool.i18n.sent' : 'tool.i18n.savedOffline'));
  });
  document.getElementById('tr-old-delete').addEventListener('click', () => {
    try { localStorage.removeItem(TR_OLD_KEY); } catch (e) {}
    rerender();
  });
}

// ─── The page ───────────────────────────────────────────
let _trLang = null;
let _trShowSkipped = false;
let _trUnwire = null;   // the current editor's document listener

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
    <p class="tr-queued" id="tr-queued" role="status" hidden></p>
    ${trOldDraftsHtml()}`;

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
    const banner = next.state === 0 ? 'missing' : next.state === 1 ? 'draft' : next.state === 2 ? 'stale' : '';
    el.innerHTML = `<div class="tr-wrap">${head}
      <div class="card tr-card">
        <div class="tr-where">${escHtml(next.where())}</div>
        ${banner ? `<p class="tr-banner ${banner}">${escHtml(t('tool.i18n.banner_' + banner))}</p>` : ''}
        <div class="tr-label">English</div>
        <div class="tr-en" lang="en" dir="ltr">${trSourceHtml(next.source)}</div>
        <div class="tr-label" id="tr-text-label" lang="${lang}" dir="${meta.dir}">${escHtml(meta.native)}</div>
        <div id="tr-text" class="tool-textarea tr-text" contenteditable="true" role="textbox" aria-multiline="true"
          aria-labelledby="tr-text-label" spellcheck="true" autocapitalize="sentences"
          style="min-height:${Math.min(10, Math.max(3, Math.ceil(next.source.length / 45))) * 1.5 + 1.3}em"
          lang="${lang}" dir="${meta.dir}">${trEditorHtml(editable)}</div>
        <p class="tr-keep" id="tr-keep" hidden></p>
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
    const text = () => trEditorText(ta);
    const sync = () => {
      const changed = text().trim() !== editable.trim();
      send.disabled = !text().trim() || !changed;
      ok.disabled = changed;
      err.hidden = true;
    };
    if (_trUnwire) _trUnwire();
    _trUnwire = trWireEditor(ta, next.source, document.getElementById('tr-keep'), sync);
    sync();

    const advance = msg => { trRender(el); if (msg) showToast(msg); };
    send.addEventListener('click', () => {
      const suggestion = trFromEdit(text(), html);
      const { missing, extra } = trMissingTokens(next.source, suggestion);
      if (missing.length || extra.length) {
        err.textContent = t(missing.length ? 'tool.i18n.tokensMissing' : 'tool.i18n.tokensExtra',
          { tokens: trTokenNames(missing.length ? missing : extra) });
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

  trWireOldDrafts(() => trRender(el));
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
  const tag = /^<ul\b/.test(shown) ? 'div' : 'span';   // a list sentence is a block
  return `<${tag} class="sg-slot" data-sg-key="${key}">${shown}</${tag}>`;
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
  let sheet = document.getElementById('suggest-sheet');
  if (!sheet) { sheet = document.createElement('div'); sheet.id = 'suggest-sheet'; document.body.appendChild(sheet); }
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', 'sg-title');
  sheet.innerHTML = `<div class="sg-inner">
      <h2 id="sg-title" class="sg-title">${escHtml(t('tool.i18n.sheetTitle'))}</h2>
      <div class="tr-label">English</div>
      <div class="tr-en" lang="en" dir="ltr">${trSourceHtml(source)}</div>
      <div class="tr-label" id="sg-text-label" lang="${lang}" dir="${meta.dir}">${escHtml(meta.native)}</div>
      <div id="sg-text" class="tool-textarea tr-text" contenteditable="true" role="textbox" aria-multiline="true"
        aria-labelledby="sg-text-label" spellcheck="true" style="min-height:7.3em"
        lang="${lang}" dir="${meta.dir}">${trEditorHtml(editable)}</div>
      <p class="tr-keep" id="sg-keep" hidden></p>
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
  const text = () => trEditorText(ta);
  let unwire = null;
  const close = () => { sheet.hidden = true; document.removeEventListener('keydown', onKey, true); if (unwire) unwire(); if (from && from.focus) from.focus(); };
  const onKey = ev => { if (ev.key === 'Escape') { ev.preventDefault(); close(); } };
  document.addEventListener('keydown', onKey, true);
  const sync = () => { send.disabled = !text().trim() || text().trim() === editable.trim(); err.hidden = true; };
  unwire = trWireEditor(ta, source, document.getElementById('sg-keep'), sync); sync();
  sheet.onclick = ev => { if (ev.target === sheet) close(); };
  document.getElementById('sg-cancel').onclick = close;
  send.onclick = () => {
    const suggestion = trFromEdit(text(), html);
    const { missing, extra } = trMissingTokens(source, suggestion);
    if (missing.length || extra.length) {
      err.textContent = t(missing.length ? 'tool.i18n.tokensMissing' : 'tool.i18n.tokensExtra',
        { tokens: trTokenNames(missing.length ? missing : extra) });
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
