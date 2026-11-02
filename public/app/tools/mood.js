// ═══════════════════════════════════════════════════════
// 8. MOOD CHECK-IN (EPDS)
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// EPDS — VALIDATED INSTRUMENT, NOT UI COPY
// ═══════════════════════════════════════════════════════
// The Edinburgh Postnatal Depression Scale is a validated screening tool.
// Its scoring thresholds are only meaningful for the exact wording of an
// officially validated translation, which exist per-language and are NOT
// interchangeable with a machine translation.
//
// Therefore this is the ONE place with no English fallback: if the active
// locale has no validated EPDS, the tool refuses to run rather than scoring
// answers to questions the patient read in a different language than the
// instrument was validated in.
//
// To add a language: put the OFFICIAL published translation in that
// locale file as epds.questions with validated: true. Do not translate it here.
// The EPDS language is chosen INDEPENDENTLY of the app UI language.
// Many patients read a second language fluently — a Zomi speaker may read
// Hakha Chin or Burmese — and an officially validated instrument in a language
// the patient can read beats no instrument at all.
const EPDS_CHOICE_KEY = 'myob.epdsLang';

// A Zomi speaker has no validated Zomi instrument, and there may never be one.
// Many are multilingual, and Hakha Chin and Burmese are the languages they are
// most likely to also read, which is why those forms are bundled. This orders
// the choice list to put those first rather than auto-selecting one: presenting
// a validated instrument in a language the patient may not read, without
// asking, is not a safe default for a screening tool.
const EPDS_SUGGESTED = { zom: ['cnh', 'my'] };

function epdsAvailable() {
  return Object.keys(window.MYOB_EPDS || {}).filter(c => {
    const e = window.MYOB_EPDS[c];
    const n = (e && e.instrument === 'PHQ-9') ? 9 : 10;
    return e && e.validated && Array.isArray(e.questions) && e.questions.length === n;
  // In a fixed order: the forms load in parallel and register in whatever
  // order they arrive, which must not reshuffle the list she chooses from.
  }).sort((a, b) => epdsRank(a) - epdsRank(b));
}
function epdsRank(code) {
  const i = EPDS_FILES.findIndex(f => f.split('.')[1] === code);
  return i === -1 ? EPDS_FILES.length : i;
}

function getEPDS() {
  const avail = epdsAvailable();
  if (!avail.length) return null;
  const chosen = safeGet(EPDS_CHOICE_KEY, null);
  if (chosen && avail.includes(chosen)) return window.MYOB_EPDS[chosen];
  // Default to the app language when a validated form exists for it.
  if (avail.includes(I18n.lang)) return window.MYOB_EPDS[I18n.lang];
  return null;   // force an explicit choice rather than silently using English
}

function setEPDSLang(code) {
  safeSet(EPDS_CHOICE_KEY, code);
  epdsAnswers = {};
  initMood();
}


let epdsAnswers = {};
let epdsHistory = safeLoad('epds-history', []);

TOOL_INITS['tool-mood'] = initMood;

// The validated questionnaires (about 45 KB) load only when the mood tool
// opens, not with every page. The service worker precaches them, so this works
// offline too. Same ?v= as this script, so a new version never mixes with old.
const MOOD_V = (() => {
  try { return new URL(document.currentScript.src, location.href).searchParams.get('v') || ''; }
  catch (e) { return ''; }
})();
const EPDS_FILES = ['epds.en', 'epds.es', 'epds.cnh', 'epds.ko', 'epds.zh', 'epds.ar', 'phq9.fr', 'phq9.ru'];
let epdsLoading = null;
let epdsLoaded = false;
function epdsReady() {
  return epdsLoaded || Object.keys(window.MYOB_EPDS || {}).length >= EPDS_FILES.length;
}
function loadEPDS() {
  if (!epdsLoading) {
    epdsLoading = Promise.all(EPDS_FILES.map(f => new Promise(done => {
      const s = document.createElement('script');
      s.src = `./i18n/epds/${f}.js?v=${MOOD_V}`;
      s.onload = s.onerror = done;   // a missing form just isn't offered
      document.head.appendChild(s);
    }))).then(() => { epdsLoaded = true; });
  }
  return epdsLoading;
}

function initMood() {
  const el = document.getElementById('mood-content');
  if (!el) return;
  if (!epdsReady()) {
    el.innerHTML = `<p class="history-empty">${t('tool.i18n.loading')}</p>`;
    loadEPDS().then(() => { if (currentSection === 'tool-mood') initMood(); });
    return;
  }
  epdsAnswers = {};

  const epds = getEPDS();
  if (!epds) {
    // No validated instrument selected for this language. Offer every form we
    // DO have, labelled in its own language — rather than silently defaulting
    // to English or scoring a machine translation.
    // Suggested forms first for locales with no instrument of their own.
    const suggested = EPDS_SUGGESTED[I18n.lang] || [];
    const avail = epdsAvailable().slice().sort((a, b) => {
      const ia = suggested.indexOf(a), ib = suggested.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    el.innerHTML = `
      <div style="padding:20px 16px">
        <div class="callout alert" role="alert">
          <div class="callout-title">${escHtml(I18n.t('tool.mood.unavailableTitle'))}</div>
          <p>${escHtml(I18n.t('tool.mood.unavailableBody'))}</p>
        </div>
        <p style="font-size:13.5px;color:var(--ink);line-height:1.6;margin:14px 0 10px">
          ${escHtml(I18n.t('tool.mood.chooseLanguage'))}
        </p>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${avail.map(c => {
            const e = window.MYOB_EPDS[c];
            return `<button class="big-action-btn btn-plum" style="text-align:start"
                      lang="${c}" onclick="setEPDSLang('${c}')">
                      ${escHtml(e.native || e.name || c)}
                    </button>`;
          }).join('')}
        </div>
        <p style="font-size:12px;color:var(--ink-soft);line-height:1.5;margin-top:14px">
          ${escHtml(I18n.t('tool.mood.validatedOnlyNote'))}
        </p>
      </div>`;
    return;
  }
  const EPDS_Q = epds.questions;

  el.innerHTML = `
    <div style="padding:12px 16px 0">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6;margin-bottom:4px">
        <strong>${epds.instrument === 'PHQ-9' ? t('tool.mood.phq9Title') : t('tool.mood.edinburghPostnatalDepressionScale')}</strong>:
        <span lang="${epds.language}">${escHtml(epds.instructions || '')}</span>
      </p>
      <p style="font-size:12px;color:var(--ink-soft)">${t('tool.mood.yourAnswersAreSavedOnly')}</p>
    </div>
    ${epdsAvailable().length > 1 ? `
    <div style="padding:0 16px 8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-size:12px;color:var(--ink-soft)">${escHtml(I18n.t('tool.mood.instrumentLanguage'))}</span>
      <strong style="font-size:13px" lang="${epds.language}">${escHtml(epds.native || epds.name)}</strong>
      <button class="btn-sm" style="background:var(--plum-light);color:var(--plum);border:none"
        onclick="setEPDSLang('')">${escHtml(I18n.t('tool.mood.change'))}</button>
    </div>` : ''}
    <div id="epds-questions">
      ${EPDS_Q.map((q, qi) => `
        <fieldset class="epds-question">
          <legend class="epds-legend">
            <span class="epds-q-num">${I18n.t('tool.mood.qCounter', { n: qi + 1, total: EPDS_Q.length })}</span>
            <span class="epds-q-text" lang="${epds.language}" dir="auto">${escHtml(q.text)}</span>
          </legend>
          <div class="epds-options">
            ${q.options.map((opt, oi) => `
              <label class="epds-option" id="epds-${qi}-${oi}">
                <input type="radio" name="epds-q${qi}" value="${oi}"
                       onchange="setEPDS(${qi}, ${oi})" class="epds-radio">
                <span class="epds-option-text" lang="${epds.language}" dir="auto">${escHtml(opt)}</span>
              </label>`).join('')}
          </div>
        </fieldset>`).join('')}
    </div>
    <div style="padding:12px 16px 16px">
      <button class="big-action-btn btn-plum" onclick="submitEPDS()">${t('tool.mood.getMyScore')}</button>
    </div>
    <div id="epds-result" role="status" aria-live="polite"></div>
    <div style="padding:4px 16px 0;font-size:11px;color:var(--ink-soft);line-height:1.5">
      ${escHtml(epds.attribution || '')}
    </div>
    ${epdsHistory.length ? `
    <div class="history-section-title">${t('tool.mood.pastCheckIns')}</div>
    <div class="history-list-card" style="margin:0 16px">
      ${epdsHistory.slice(0, 8).map(h => {
        const interp = getEPDSInterpretation(h.score);
        return `<div style="display:flex;align-items:center;padding:10px 16px;border-bottom:1px solid var(--rule)">
          <span style="flex:1;font-size:13px;color:var(--ink-soft)">${fmtDate(h.ts)}</span>
          <span style="font-size:18px;font-weight:700;color:${interp.color}">${h.score}</span>
          <span style="font-size:11px;font-weight:600;margin-inline-start:8px;color:${interp.color}">${interp.label}</span>
        </div>`;
      }).join('')}
    </div>` : ''}
    <div style="height:16px"></div>`;
}

function setEPDS(qi, oi) {
  epdsAnswers[qi] = oi;
  const _e = getEPDS(); if (!_e) return;
  _e.questions[qi].options.forEach((_, i) => {
    const el = document.getElementById(`epds-${qi}-${i}`);
    if (el) el.classList.toggle('selected', i === oi);
  });
}

function getEPDSInterpretation(score) {
  // Thresholds are a property of the validated translation, not of the app:
  // published cutoffs differ between language versions.
  const cut = (getEPDS() || {}).cutoffs || { concern: 10, high: 13 };
  if (score >= cut.high)    return { label: I18n.t('tool.mood.interpHigh'),    color: 'var(--danger-ink)',  bg: 'var(--danger-bg)' };
  if (score >= cut.concern) return { label: I18n.t('tool.mood.interpConcern'), color: 'var(--warning-ink)', bg: 'var(--warning-bg)' };
  return { label: I18n.t('tool.mood.interpLow'), color: 'var(--success-ink)', bg: 'var(--success-bg)' };
}

function submitEPDS() {
  const epds = getEPDS();
  if (!epds) return;
  if (Object.keys(epdsAnswers).length < epds.questions.length) {
    showToast(I18n.t('tool.mood.answerAll', { total: epds.questions.length }));
    return;
  }
  let score = 0;
  epds.questions.forEach((q, qi) => {
    score += q.scores[epdsAnswers[qi]];
  });

  epdsHistory.unshift({ ts: Date.now(), score });
  if (epdsHistory.length > 20) epdsHistory = epdsHistory.slice(0, 20);
  safeSave('epds-history', epdsHistory);

  const interp = getEPDSInterpretation(score);
  // EPDS item 10 / PHQ-9 item 9 — the self-harm item.
  const shIdx = typeof epds.selfHarmIndex === 'number' ? epds.selfHarmIndex : 9;
  const q10score = epds.questions[shIdx].scores[epdsAnswers[shIdx]];

  const result = document.getElementById('epds-result');
  if (result) {
    result.innerHTML = `
      <div class="score-result-card" style="background:${interp.bg};border-inline-start:4px solid ${interp.color}">
        <div class="score-num" style="color:${interp.color}">${score}</div>
        <div class="score-label" style="color:${interp.color}">${interp.label}</div>
        <div class="score-note">${escHtml(I18n.t('tool.mood.scoreNote', {
          max: epds.maxScore || 30, instrument: epds.instrument || 'EPDS' }))}</div>
        ${score >= ((epds.cutoffs || {}).concern || 10) ? `<div style="margin-top:10px;font-size:13px;font-weight:600;color:${interp.color}">${t('tool.mood.talkToDoctor')}</div>` : `<div style="margin-top:10px;font-size:13px;color:var(--ink-soft)">${t('tool.mood.continueWeekly')}</div>`}
        ${q10score > 0 ? `<div class="callout alert" role="alert" style="margin-top:12px;text-align:start">
          <div class="callout-title">${t('tool.mood.important')}</div>
          <p>${escHtml(I18n.t('tool.mood.selfHarmGuidance'))}</p>
        </div>` : ''}
      </div>`;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
