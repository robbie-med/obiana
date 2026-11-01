// ═══════════════════════════════════════════════════════
// 9. BIRTH PLAN BUILDER
// ═══════════════════════════════════════════════════════
// Structure only: option IDS, never display strings. Storing the English
// label (as this did before i18n) orphaned every saved answer the moment the
// user switched language. Labels resolve at render time via i18n.
const BIRTH_PLAN_QUESTIONS = [
  { key: "epidural", opts: ["epidural", "none", "open", "iv"] },
  { key: "mobility", opts: ["walk", "bed", "wireless"] },
  { key: "delayed-cord", opts: ["yes", "nopref", "discuss"] },
  { key: "skin-to-skin", opts: ["top", "ifposs", "nopref"] },
  { key: "pushing", opts: ["nurse", "positions", "squat"] },
  { key: "episiotomy", opts: ["avoid", "trust", "nopref"] },
  { key: "cord-cut", opts: ["support", "team", "nopref"] },
  { key: "photos", opts: ["yes", "none", "after"] },
  { key: "visitors", opts: ["supportonly", "family", "none"] },
  { key: "breastfeed", opts: ["exclusive", "supplement", "formula", "unsure"] },
  { key: "csection", multi: true, opts: ["lowscreen", "supportor", "skinor", "standard"] },
  { key: "music", opts: ["playlist", "quiet", "nopref"] },
];

const BIRTH_PLAN_LEGACY = {
  "epidural": { "Yes — epidural": "epidural", "No medication": "none", "Keep options open": "open", "IV medication only": "iv" },
  "mobility": { "Want to walk/move": "walk", "Prefer to stay in bed": "bed", "Wireless monitor if available": "wireless" },
  "delayed-cord": { "Yes please": "yes", "No preference": "nopref", "Discuss with team": "discuss" },
  "skin-to-skin": { "Yes — top priority": "top", "Yes if possible": "ifposs", "No preference": "nopref" },
  "pushing": { "Guided by nurse": "nurse", "Want to try different positions": "positions", "Squatting/standing": "squat" },
  "episiotomy": { "Avoid unless necessary": "avoid", "Trust the team’s judgment": "trust", "No preference": "nopref" },
  "cord-cut": { "Support person": "support", "Care team": "team", "No preference": "nopref" },
  "photos": { "Yes please": "yes", "No photos during delivery": "none", "Photos after delivery only": "after" },
  "visitors": { "Support person only": "supportonly", "Close family welcome": "family", "No visitors": "none" },
  "breastfeed": { "Breastfeed exclusively": "exclusive", "Breastfeed + supplement": "supplement", "Formula only": "formula", "Not sure yet": "unsure" },
  "csection": { "Low screen (see baby)": "lowscreen", "Support person in OR": "supportor", "Skin-to-skin in OR if possible": "skinor", "Standard practice is fine": "standard" },
  "music": { "Music / own playlist": "playlist", "Quiet environment": "quiet", "No preference": "nopref" },
};

// Maps pre-i18n English answers back to option ids, so existing users do not
// lose a birth plan they already built. Run once, then the flag is set.
function migrateBirthPlan(saved) {
  if (safeGet('birth-plan-v2', null) === '1') return saved;
  const out = {};
  Object.keys(saved || {}).forEach(key => {
    const map = BIRTH_PLAN_LEGACY[key] || {};
    const conv = v => (Object.prototype.hasOwnProperty.call(map, v) ? map[v] : v);
    const v = saved[key];
    out[key] = Array.isArray(v) ? v.map(conv) : conv(v);
  });
  safeSave('birth-plan', out);
  safeSet('birth-plan-v2', '1');
  return out;
}

// Label lookups: the only place birth-plan display text is produced.
function bpQuestionLabel(key) { return I18n.t('tool.birthplan.q.' + key + '.label'); }
function bpOptionLabel(key, optId) { return I18n.t('tool.birthplan.q.' + key + '.opt.' + optId); }

// The printed plan is read by an English-speaking care team, so it always
// carries English alongside the mother's language. Resolved straight from the
// English catalog rather than by switching locale, so nothing on screen moves.
function bpEn(path) {
  const en = (window.MYOB_LOCALES.en || {}).ui;
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), en) || '';
}
function bpQuestionLabelEn(key) { return bpEn('tool.birthplan.q.' + key + '.label'); }
function bpOptionLabelEn(key, optId) { return bpEn('tool.birthplan.q.' + key + '.opt.' + optId); }
function bpIsEnglish() { return I18n.lang === 'en'; }

let birthPlanAnswers = migrateBirthPlan(safeLoad('birth-plan', {}));

TOOL_INITS['tool-birthplan'] = initBirthPlan;

function initBirthPlan() {
  const el = document.getElementById('birthplan-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:12px 16px 4px">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6">${t('tool.birthplan.selectPreferences')}</p>
    </div>
    <div id="bpb-questions">
      ${BIRTH_PLAN_QUESTIONS.map(q => `
        <div class="bpb-question">
          <div class="bpb-q-text">${bpQuestionLabel(q.key)}</div>
          <div class="bpb-options">
            ${q.opts.map(optId => {
              const isSelected = q.multi
                ? Array.isArray(birthPlanAnswers[q.key]) && birthPlanAnswers[q.key].includes(optId)
                : birthPlanAnswers[q.key] === optId;
              return `<button class="bpb-pill ${isSelected ? 'selected' : ''}"
                onclick="setBPBAnswer('${q.key}', '${optId}', this, ${!!q.multi})">
                ${bpOptionLabel(q.key, optId)}
              </button>`;
            }).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div id="bpb-summary-wrap" style="margin-top:8px">
      ${renderBirthPlanSummary()}
    </div>
    <div style="height:16px"></div>`;
}

function setBPBAnswer(key, value, btn, multi) {
  if (multi) {
    let arr = Array.isArray(birthPlanAnswers[key]) ? [...birthPlanAnswers[key]] : [];
    const idx = arr.indexOf(value);
    if (idx >= 0) arr.splice(idx, 1); else arr.push(value);
    if (arr.length) birthPlanAnswers[key] = arr; else delete birthPlanAnswers[key];
    btn.classList.toggle('selected', (birthPlanAnswers[key] || []).includes(value));
  } else {
    birthPlanAnswers[key] = value;
    btn.closest('.bpb-question').querySelectorAll('.bpb-pill').forEach(p => p.classList.remove('selected'));
    btn.classList.add('selected');
  }
  safeSave('birth-plan', birthPlanAnswers);
  const wrap = document.getElementById('bpb-summary-wrap');
  if (wrap) wrap.innerHTML = renderBirthPlanSummary();
}

function renderBirthPlanSummary() {
  const answered = BIRTH_PLAN_QUESTIONS.filter(q => {
    const v = birthPlanAnswers[q.key];
    return v && (!Array.isArray(v) || v.length);
  });
  if (!answered.length) return '';
  const rows = answered.map(q => {
    const v = birthPlanAnswers[q.key];
    const display = (Array.isArray(v) ? v : [v]).map(id => bpOptionLabel(q.key, id)).join(', ');
    return `
    <div class="bpo-row">
      <span class="bpo-q">${bpQuestionLabel(q.key)}</span>
      <span class="bpo-a">${display}</span>
    </div>`;
  }).join('');
  const savedNotes = safeGet('birth-plan-notes', null) || '';
  return `
    <div class="birth-plan-output">
      <div class="bpo-header">📋 ${t('tool.birthplan.myBirthPreferences')} (${answered.length}/${BIRTH_PLAN_QUESTIONS.length})</div>
      ${rows}
      <div style="padding:12px 16px 4px;font-size:13px;font-weight:600;color:var(--ink-soft)">${t('tool.birthplan.additionalNotesComments')}</div>
      <div style="padding:0 16px 12px">
        <textarea class="bp-notes-area" id="bp-notes"
          placeholder="${t('tool.birthplan.anyOtherPreferencesConcernsOr')}"
          oninput="safeSet('birth-plan-notes', this.value)"
          style="width:100%;min-height:80px;border:1.5px solid var(--rule);border-radius:var(--radius-sm);padding:10px 12px;font-family:var(--font-sans);font-size:14px;color:var(--ink);background:var(--bg);outline:none;resize:vertical;transition:border-color .2s;line-height:1.5;box-sizing:border-box"
        >${escHtml(savedNotes)}</textarea>
      </div>
      <div style="padding:0 16px 16px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="big-action-btn btn-teal" onclick="copyBirthPlan()" style="flex:1">${t('tool.birthplan.copyToShare')}</button>
        <button class="big-action-btn btn-navy" onclick="printBirthPlan()" style="flex:1">${t('tool.birthplan.printPdf')}</button>
      </div>
    </div>`;
}

function copyBirthPlan() {
  const bilingual = !bpIsEnglish();
  const lines = [bilingual
    ? `${I18n.t('tool.birthplan.myBirthPreferences')} / ${bpEn('tool.birthplan.myBirthPreferences')}\n`
    : 'MY BIRTH PREFERENCES\n'];
  BIRTH_PLAN_QUESTIONS.forEach(q => {
    const v = birthPlanAnswers[q.key];
    if (v && (!Array.isArray(v) || v.length)) {
      const ids = Array.isArray(v) ? v : [v];
      const disp = ids.map(id => bpOptionLabel(q.key, id)).join(', ');
      lines.push(`• ${bpQuestionLabel(q.key)}: ${disp}`);
      if (bilingual) {
        const dispEn = ids.map(id => bpOptionLabelEn(q.key, id)).join(', ');
        lines.push(`  (EN) ${bpQuestionLabelEn(q.key)}: ${dispEn}`);
      }
    }
  });
  const notes = (document.getElementById('bp-notes') || {}).value
    || safeGet('birth-plan-notes', null) || '';
  if (notes.trim()) lines.push('\n' + t('tool.birthplan.additionalNotes') + '\n' + notes.trim());
  lines.push('\n' + t('tool.birthplan.generatedWith'));
  const text = lines.join('\n');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast(t('tool.birthplan.copiedToClipboard')));
  } else {
    showToast(t('tool.birthplan.copyNotSupportedOnThis'));
  }
}

function printBirthPlan() {
  const pv = document.getElementById('print-view');
  if (!pv) return;
  const answered = BIRTH_PLAN_QUESTIONS.filter(q => {
    const v = birthPlanAnswers[q.key];
    return v && (!Array.isArray(v) || v.length);
  });
  const bilingual = !bpIsEnglish();
  const rows = answered.map(q => {
    const v = birthPlanAnswers[q.key];
    const ids = Array.isArray(v) ? v : [v];
    const display = ids.map(id => bpOptionLabel(q.key, id)).join(', ');
    const en = bilingual
      ? `<div class="pv-row pv-en" lang="en" dir="ltr"><span class="pv-q">${escHtml(bpQuestionLabelEn(q.key))}</span><span class="pv-a">${escHtml(ids.map(id => bpOptionLabelEn(q.key, id)).join(', '))}</span></div>`
      : '';
    return `<div class="pv-row"><span class="pv-q">${escHtml(bpQuestionLabel(q.key))}</span><span class="pv-a">${escHtml(display)}</span></div>${en}`;
  }).join('');
  const notes = (document.getElementById('bp-notes') || {}).value
    || safeGet('birth-plan-notes', null) || '';
  const notesHtml = notes.trim()
    ? `<div class="pv-notes"><strong>${t('tool.birthplan.additionalNotes')}</strong><br>${escHtml(notes.trim()).replace(/\n/g, '<br>')}</div>`
    : '';
  pv.innerHTML = `
    <h1>${escHtml(t('tool.birthplan.myBirthPreferences'))}${
      bilingual ? `<span class="pv-h1-en"> / ${escHtml(bpEn('tool.birthplan.myBirthPreferences'))}</span>` : ''}</h1>
    <div class="pv-meta">${I18n.t('tool.birthplan.generatedOn', { date: I18n.fmt.dateLong(Date.now()) })}</div>
    ${rows}
    ${notesHtml}
    <div class="pv-footer">${t('tool.birthplan.pregnancyBirthGuideEvidenceBased')}</div>`;
  window.print();
}
