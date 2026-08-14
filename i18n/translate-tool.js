// ═══════════════════════════════════════════════════════
// TRANSLATION HELPER — the last tool in the Tools list
// ═══════════════════════════════════════════════════════
// Lets a bilingual contributor check every string in their language against
// the English source and suggest better wording, without touching a repo.
//
// It reads the LIVE catalogs, so it always reflects what is actually shipped —
// there is no separate list to keep in sync and go stale.
//
// Suggestions are held in localStorage and exported as JSON that drops straight
// into translation/out/, so an edit made on a phone in a clinic can be merged
// with the same validate.js / merge.js path as everything else.

const I18N_SUGGEST_KEY = 'myob.i18nSuggestions';

function loadSuggestions() {
  try { return JSON.parse(localStorage.getItem(I18N_SUGGEST_KEY) || '{}'); }
  catch (e) { return {}; }
}
function saveSuggestions(s) {
  try { localStorage.setItem(I18N_SUGGEST_KEY, JSON.stringify(s)); } catch (e) {}
}

// Flatten a locale to dot-notation. UI strings keep their bare path; guide
// cards are namespaced under "content." so the two cannot collide.
//
// The guide cards are the bulk of the app, roughly 6,900 words against about
// 500 short UI strings, and they were missing here entirely. A contributor
// could fix a button label but not a single word of the actual guide.
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

let _i18nFilter = 'untranslated';
let _i18nQuery = '';
let _i18nTargetLang = null;

TOOL_INITS['tool-i18n'] = initI18nTool;

function flattenLocale(L) {
  const out = flattenUi((L || {}).ui);
  const content = (L || {}).content || {};
  for (const [id, card] of Object.entries(content)) {
    for (const f of ['title', 'sub']) {
      if (typeof card[f] === 'string' && card[f] !== '') out[`content.${id}.${f}`] = card[f];
    }
    // One key per sentence. Bodies are no longer editable as HTML at all.
    (card.t || []).forEach((run, i) => { out[`content.${id}.t.${i}`] = run; });
  }
  return out;
}

function i18nRows() {
  const lang = _i18nTargetLang || (I18n.lang === 'en' ? 'es' : I18n.lang);
  const en = flattenLocale(window.MYOB_LOCALES.en);
  const tgt = flattenLocale(window.MYOB_LOCALES[lang]);
  const sug = loadSuggestions()[lang] || {};
  const rows = [];
  for (const [key, source] of Object.entries(en)) {
    if (typeof source === 'object') continue;          // plural forms: skip
    const current = tgt[key];
    const state = current === undefined ? 'missing'
                : String(current) === String(source) ? 'same'
                : 'translated';
    rows.push({ key, source: String(source), current: current === undefined ? '' : String(current),
                state, suggestion: sug[key] || '' });
  }
  return { lang, rows };
}

function initI18nTool() {
  const en = flattenLocale(window.MYOB_LOCALES.en);
  const el = document.getElementById('i18n-content');
  if (!el) return;

  const want = _i18nTargetLang || (I18n.lang === 'en' ? 'es' : I18n.lang);
  if (!window.MYOB_LOCALES[want]) {
    // Fetch it, then re-enter. Showing "everything missing" while it loads
    // would be wrong, so say so instead.
    el.innerHTML = `<p class="history-empty">${escHtml(I18n.t('tool.i18n.loading'))}</p>`;
    I18n.ensureLoaded(want).then(() => initI18nTool());
    return;
  }

  const { lang, rows } = i18nRows();

  const counts = { missing: 0, same: 0, translated: 0 };
  rows.forEach(r => counts[r.state]++);
  const sugCount = rows.filter(r => r.suggestion).length;

  const q = _i18nQuery.toLowerCase();
  const shown = rows.filter(r => {
    if (_i18nFilter === 'untranslated' && r.state === 'translated') return false;
    if (_i18nFilter === 'suggested' && !r.suggestion) return false;
    if (!q) return true;
    return r.key.toLowerCase().includes(q) || r.source.toLowerCase().includes(q)
        || r.current.toLowerCase().includes(q);
  });

  const langOptions = Object.keys(I18n.LOCALES).filter(c => c !== 'en')
    .map(c => `<option value="${c}"${c === lang ? ' selected' : ''}>${escHtml(I18n.LOCALES[c].native)}</option>`).join('');

  el.innerHTML = `
    <div style="padding:12px 16px 4px">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6;margin-bottom:10px">
        ${escHtml(I18n.t('tool.i18n.intro'))}
      </p>
      <p style="font-size:11.5px;color:var(--ink-soft);line-height:1.5;margin-bottom:10px">
        ${escHtml(I18n.t('tool.i18n.privacy'))}
      </p>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
        <select class="tool-select" id="i18n-lang" style="flex:0 1 auto;min-width:130px">${langOptions}</select>
        <span style="font-size:12px;color:var(--ink-soft)">
          ${I18n.fmt.num(counts.translated)} ✓ · ${I18n.fmt.num(counts.same)} ≡ · ${I18n.fmt.num(counts.missing)} ✗${sugCount ? ` · ${I18n.fmt.num(sugCount)} ✎` : ''}
        </span>
      </div>
      <input class="tool-input" id="i18n-search" type="search"
             placeholder="${escHtml(I18n.t('tool.i18n.searchPlaceholder'))}"
             value="${escHtml(_i18nQuery)}" style="width:100%;margin-bottom:8px">
      <div class="btn-row" style="margin-bottom:4px">
        ${[['untranslated','needsWork'],['all','all'],['suggested','suggested']].map(([f,k]) =>
          `<button class="btn-sm ${_i18nFilter === f ? 'btn-teal' : ''}" onclick="setI18nFilter('${f}')"
             style="flex:1${_i18nFilter === f ? '' : ';background:var(--white);color:var(--ink-mid);border:1.5px solid var(--rule)'}">
             ${escHtml(I18n.t('tool.i18n.' + k))}</button>`).join('')}
      </div>
    </div>

    <div style="padding:0 16px">
      ${shown.length === 0
        ? `<p class="history-empty">${escHtml(I18n.t('tool.i18n.nothingToShow'))}</p>`
        : shown.slice(0, 300).map(r => {
        const isBody = false;   // bodies are per-sentence keys now
        // A card body is an HTML fragment. Showing raw markup as the thing to
        // read is unusable, so the English is RENDERED for reading and the
        // markup is offered separately, collapsed. The textarea is seeded with
        // the English source for bodies so the tags are translated in place
        // rather than reconstructed from memory.
        const seed = r.suggestion || (isBody && !r.current ? r.source : r.suggestion);
        return `
        <div class="card i18n-row">
          <div class="i18n-key">${escHtml(r.key)}</div>
          ${isBody
            ? `<div class="i18n-en-rendered" dir="ltr" lang="en">${r.source}</div>
               <details class="i18n-src">
                 <summary>${escHtml(I18n.t('tool.i18n.showMarkup'))}</summary>
                 <pre dir="ltr">${escHtml(r.source)}</pre>
               </details>`
            : `<div class="i18n-en" dir="ltr" lang="en">${escHtml(r.source)}</div>`}
          <div class="i18n-cur ${r.state}" lang="${lang}" dir="${I18n.LOCALES[lang].dir}">
            ${r.current
              ? (isBody ? escHtml(r.current.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : escHtml(r.current))
              : `<em>${escHtml(I18n.t('tool.i18n.notTranslated'))}</em>`}
          </div>
          ${isBody ? `<p class="i18n-hint">${escHtml(I18n.t('tool.i18n.keepTags'))}</p>` : ''}
          <textarea class="tool-textarea" data-key="${escHtml(r.key)}"
            data-seeded="${isBody && !r.suggestion && !r.current ? '1' : '0'}"
            rows="${isBody ? 10 : 2}"
            lang="${lang}" dir="${I18n.LOCALES[lang].dir}"
            placeholder="${escHtml(I18n.t('tool.i18n.suggestPlaceholder'))}"
            >${escHtml(seed || '')}</textarea>
          <div class="i18n-actions">
            <button class="btn-sm btn-teal" data-submit="${escHtml(r.key)}">
              ${escHtml(I18n.t('tool.i18n.submit'))}
            </button>
            <span class="i18n-submit-status" data-status="${escHtml(r.key)}"></span>
          </div>
        </div>`; }).join('')}
      ${shown.length > 300 ? `<p class="history-empty">${escHtml(I18n.t('tool.i18n.showingFirst', { n: 300, total: shown.length }))}</p>` : ''}
    </div>

    <div style="padding:12px 16px 20px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="big-action-btn btn-teal" style="flex:1" onclick="exportI18nSuggestions()">
        ${escHtml(I18n.t('tool.i18n.export'))}
      </button>
      <button class="btn-sm" style="flex:0 0 auto;background:var(--white);color:var(--rose);border:1.5px solid var(--rose)"
        onclick="clearI18nSuggestions()">${escHtml(I18n.t('tool.i18n.clear'))}</button>
    </div>`;

  // Save on blur rather than on every keystroke, so typing stays smooth and a
  // half-typed word is never persisted.
  el.querySelectorAll('textarea[data-key]').forEach(ta => {
    ta.addEventListener('change', () => {
      const all = loadSuggestions();
      all[lang] = all[lang] || {};
      const v = ta.value.trim();
      // Seeded bodies start out holding the English; unchanged is not a
      // suggestion, or every card would look edited the moment it is shown.
      const untouched = ta.dataset.seeded === '1' && v === String(en[ta.dataset.key] || '').trim();
      if (v && !untouched) all[lang][ta.dataset.key] = v;
      else delete all[lang][ta.dataset.key];
      saveSuggestions(all);
    });
  });

  el.querySelectorAll('button[data-submit]').forEach(btn => {
    btn.addEventListener('click', () => submitI18nSuggestion(btn.dataset.submit, lang, btn));
  });

  const sel = document.getElementById('i18n-lang');
  if (sel) sel.addEventListener('change', async () => {
    _i18nTargetLang = sel.value;
    // Without this every string in an unloaded language reads as missing, so
    // a contributor picking Spanish would be told nothing was translated.
    await I18n.ensureLoaded(_i18nTargetLang);
    initI18nTool();
  });

  const search = document.getElementById('i18n-search');
  if (search) {
    let t;
    search.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        _i18nQuery = search.value;
        const pos = search.selectionStart;
        initI18nTool();
        const s2 = document.getElementById('i18n-search');
        if (s2) { s2.focus(); s2.setSelectionRange(pos, pos); }
      }, 250);
    });
  }
}

function setI18nFilter(f) { _i18nFilter = f; initI18nTool(); }

function clearI18nSuggestions() {
  const { lang } = i18nRows();
  if (!confirm(I18n.t('tool.i18n.clearConfirm'))) return;
  const all = loadSuggestions();
  delete all[lang];
  saveSuggestions(all);
  initI18nTool();
}

// Exports in exactly the shape translation/merge.js already consumes, so a
// contributor's file needs no reformatting to be merged.
function exportI18nSuggestions() {
  const { lang } = i18nRows();
  const sug = loadSuggestions()[lang] || {};
  const n = Object.keys(sug).length;
  if (!n) { showToast(I18n.t('tool.i18n.nothingToExport')); return; }

  const blob = new Blob([JSON.stringify(sug, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `obiana-suggestions-${lang}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(I18n.t('tool.i18n.exported', { n }));
}


// ─── Submit a single suggestion ─────────────────────────
// Only ever sends the translation key, the English source, what is currently
// shipped and the proposed wording. Nothing from any tracker leaves the device.
async function submitI18nSuggestion(key, lang, btn) {
  const el = document.getElementById('i18n-content');
  const ta = el?.querySelector(`textarea[data-key="${CSS.escape(key)}"]`);
  const status = el?.querySelector(`[data-status="${CSS.escape(key)}"]`);
  const setStatus = (msg, bad) => { if (status) { status.textContent = msg; status.style.color = bad ? 'var(--rose)' : 'var(--teal)'; } };

  const suggestion = (ta?.value || '').trim();
  if (!suggestion) { setStatus(I18n.t('tool.i18n.typeFirst'), true); return; }

  const row = i18nRows().rows.find(r => r.key === key) || {};
  btn.disabled = true;
  setStatus(I18n.t('tool.i18n.sending'));

  try {
    const res = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lang, key, suggestion, source: row.source || '', current: row.current || '' }),
    });
    if (res.ok) {
      setStatus(I18n.t('tool.i18n.sent'));
      btn.textContent = I18n.t('tool.i18n.sentShort');
      return;                       // leave it disabled: it is in
    }
    const err = await res.json().catch(() => ({}));
    setStatus(err.error === 'rate_limited'
      ? I18n.t('tool.i18n.rateLimited')
      : I18n.t('tool.i18n.sendFailed'), true);
  } catch (e) {
    // Offline, or the API is not deployed. The suggestion is still saved
    // locally and can go out via Export, so this is never a dead end.
    setStatus(I18n.t('tool.i18n.offlineSaved'), true);
  }
  btn.disabled = false;
}
