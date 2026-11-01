// ═══════════════════════════════════════════════════════
// 7. WEIGHT TRACKER
// ═══════════════════════════════════════════════════════
let weightLog = safeLoad('weight-log', []);
let weightProfile = safeLoad('weight-profile', {});

TOOL_INITS['tool-weight'] = initWeight;

function getGainRange(bmi) {
  if (!bmi) return null;
  if (bmi < 18.5) return { min: 28, max: 40, label: I18n.t('tool.weight.bmi.under')  + ' (BMI < 18.5)' };
  if (bmi < 25)   return { min: 25, max: 35, label: I18n.t('tool.weight.bmi.normal') + ' (BMI 18.5–24.9)' };
  if (bmi < 30)   return { min: 15, max: 25, label: I18n.t('tool.weight.bmi.over')   + ' (BMI 25–29.9)' };
  return { min: 11, max: 20, label: I18n.t('tool.weight.bmi.obese') + ' (BMI ≥ 30)' };
}

function initWeight() {
  const el = document.getElementById('weight-content');
  if (!el) return;
  const range = weightProfile.bmi ? getGainRange(weightProfile.bmi) : null;
  const baseline = weightProfile.baseWeight;
  const lastEntry = weightLog.length ? weightLog[weightLog.length - 1] : null;
  const totalGain = (baseline && lastEntry) ? (lastEntry.lbs - baseline).toFixed(1) : null;

  el.innerHTML = `
    <div class="weight-profile-card">
      <div class="wpc-title">${t('tool.weight.yourProfile')}</div>
      <div style="display:flex;gap:10px;margin-bottom:10px">
        <div style="flex:1">
          <label class="form-label">${t('tool.weight.prePregnancyWeightLbs')}</label>
          <input type="number" class="tool-input" id="wp-base" placeholder="${escHtml(I18n.t('common.eg', { n: I18n.fmt.num(140) }))}" value="${weightProfile.baseWeight || ''}" min="80" max="400">
        </div>
        <div style="flex:1">
          <label class="form-label">${t('tool.weight.prePregnancyBmi')}</label>
          <input type="number" class="tool-input" id="wp-bmi" placeholder="${escHtml(I18n.t('common.eg', { n: I18n.fmt.num(22.5) }))}" value="${weightProfile.bmi || ''}" min="15" max="60" step="0.1">
        </div>
      </div>
      <button class="btn-sm btn-teal" onclick="saveWeightProfile()" style="width:100%">${t('tool.weight.saveProfile')}</button>
    </div>
    ${range ? `<div class="callout" style="margin:8px 16px">
      <div class="callout-title">${t('tool.weight.iomFor', { range: range.label })}</div>
      <p>${t('tool.weight.recommendedGain')} <strong>${range.min}–${range.max} lbs</strong> ${t('tool.weight.forFullPregnancy')}
      ${totalGain !== null ? ' ' + boldSlot('tool.weight.gainedSoFar', 'amount', (totalGain > 0 ? '+' : '') + I18n.fmt.num(totalGain)) : ''}</p>
    </div>` : `<div class="callout" style="margin:8px 16px"><div class="callout-title">${t('tool.weight.setYourProfile')}</div><p>${t('tool.weight.setProfileHint')}</p></div>`}
    <div style="padding:0 16px 12px">
      <button class="big-action-btn btn-teal" onclick="openModal('weight')">${t('tool.weight.logWeight')}</button>
    </div>
    <div class="history-section-title">${t('tool.weight.weightLog')}</div>
    <div class="history-list-card" id="weight-list"></div>
    <div style="height:16px"></div>`;
  renderWeightList();
}

function saveWeightProfile() {
  const base = parseFloat(document.getElementById('wp-base').value);
  const bmi = parseFloat(document.getElementById('wp-bmi').value);
  if (base) weightProfile.baseWeight = base;
  if (bmi) weightProfile.bmi = bmi;
  safeSave('weight-profile', weightProfile);
  initWeight();
  showToast(t('tool.weight.profileSaved'));
}

function renderWeightList() {
  const el = document.getElementById('weight-list');
  if (!el) return;
  if (!weightLog.length) { el.innerHTML = `<p class="history-empty">${t('tool.weight.noWeights')}</p>`; return; }
  const sorted = [...weightLog].sort((a, b) => b.week - a.week || b.ts - a.ts);
  const base = weightProfile.baseWeight;
  el.innerHTML = sorted.slice(0, 20).map((w, i) => {
    const gain = base ? (w.lbs - base).toFixed(1) : null;
    return `<div class="weight-row">
      <span class="weight-wk">${escHtml(I18n.t('tool.weight.wk', { n: I18n.fmt.num(w.week) }))}</span>
      <span class="weight-val">${escHtml(I18n.t('tool.weight.lbsValue', { n: I18n.fmt.num(w.lbs) }))}</span>
      <span class="weight-gain">${gain !== null ? escHtml(I18n.t('tool.weight.lbsTotal', { n: (gain > 0 ? '+' : '') + I18n.fmt.num(gain) })) : fmtDate(w.ts)}</span>
      <button onclick="deleteWeight(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px">×</button>
    </div>`;
  }).join('');
}

function deleteWeight(idx) {
  const sorted = [...weightLog].sort((a, b) => b.week - a.week || b.ts - a.ts);
  const entry = sorted[idx];
  const realIdx = weightLog.findIndex(w => w.ts === entry.ts);
  if (realIdx < 0) return;
  const [gone] = weightLog.splice(realIdx, 1);
  safeSave('weight-log', weightLog);
  initWeight();
  deleteWithUndo(I18n.t('tool.common.entryDeleted'), () => {
    weightLog.splice(realIdx, 0, gone);
    safeSave('weight-log', weightLog);
    initWeight();
  });
}

function saveWeight() {
  const lbs = parseFloat(document.getElementById('weight-lbs').value);
  const week = parseInt(document.getElementById('weight-week').value);
  if (!lbs || !week || lbs < 80 || lbs > 400 || week < 4 || week > 44) {
    showToast(t('tool.weight.enterValidWeightAndPregnancy'));
    return;
  }
  weightLog.push({ ts: Date.now(), lbs, week });
  if (weightLog.length > 100) weightLog = weightLog.slice(0, 100);
  safeSave('weight-log', weightLog);
  document.getElementById('weight-lbs').value = '';
  document.getElementById('weight-week').value = '';
  closeModal('weight');
  initWeight();
  showToast(I18n.t('tool.weight.savedToast', { lbs: I18n.fmt.num(lbs), week: I18n.fmt.num(week) }));
}
