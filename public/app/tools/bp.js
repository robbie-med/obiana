// ═══════════════════════════════════════════════════════
// 6. BLOOD PRESSURE LOG
// ═══════════════════════════════════════════════════════
let bpLog = safeLoad('bp-log', []);

TOOL_INITS['tool-bp'] = initBP;

function getBPCategory(s, d) {
  if (s >= 160 || d >= 110) return { label: I18n.t('tool.bp.cat.severe'),   color: 'var(--danger)',  urgent: true };
  if (s >= 140 || d >= 90)  return { label: I18n.t('tool.bp.cat.high'),     color: 'var(--warning)', urgent: true };
  if (s >= 130 || d >= 80)  return { label: I18n.t('tool.bp.cat.elevated'), color: 'var(--caution)', urgent: false };
  return { label: I18n.t('tool.bp.cat.normal'), color: 'var(--success)', urgent: false };
}

function initBP() {
  const el = document.getElementById('bp-content');
  if (!el) return;

  const last = bpLog[0];
  const lastCat = last ? getBPCategory(last.s, last.d) : null;

  el.innerHTML = `
    ${last && lastCat.urgent ? `<div class="callout alert" role="alert" style="margin:12px 16px 0">
      <div class="callout-title">${t('tool.bp.highOnRecord')}</div>
      <p>${t('tool.bp.recentSummary', { reading: last.s + '/' + last.d, cat: lastCat.label })}</p>
    </div>` : ''}
    <div style="padding:${last && lastCat.urgent ? '8px' : '12px'} 16px 12px">
      <button class="big-action-btn btn-teal" onclick="openModal('bp')">${t('tool.bp.logBloodPressure')}</button>
    </div>
    <div class="callout" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.bp.whenToCallYourDoctor')}</div>
      <p>${t('tool.bp.anyReading14090During')}</p>
    </div>
    <div class="history-section-title">${t('tool.bp.readings')}</div>
    <div class="history-list-card" id="bp-list"></div>
    <div style="height:16px"></div>`;
  renderBPList();
}

function renderBPList() {
  const el = document.getElementById('bp-list');
  if (!el) return;
  if (!bpLog.length) { el.innerHTML = `<p class="history-empty">${t('tool.bp.noReadings')}</p>`; return; }
  el.innerHTML = bpLog.slice(0, 30).map((r, i) => {
    const cat = getBPCategory(r.s, r.d);
    return `<div class="bp-row">
      <span class="bp-reading">${r.s}/${r.d}</span>
      <span class="bp-pill${cat.color === 'var(--caution)' ? ' caution' : ''}" style="background:${cat.color}">${cat.label}</span>
      <span class="bp-time">${fmtDateTime(r.ts)}</span>
      <button type="button" class="row-delete" onclick="deleteBP(${i})" aria-label="${escHtml(I18n.t('tool.common.delete'))}">×</button>
    </div>`;
  }).join('');
}

function deleteBP(idx) {
  const [gone] = bpLog.splice(idx, 1);
  safeSave('bp-log', bpLog);
  initBP();
  deleteWithUndo(I18n.t('tool.common.entryDeleted'), () => {
    bpLog.splice(idx, 0, gone);
    safeSave('bp-log', bpLog);
    initBP();
  });
}

function saveBP() {
  const s = parseInt(document.getElementById('bp-systolic').value);
  const d = parseInt(document.getElementById('bp-diastolic').value);
  if (!s || !d || s < 70 || s > 220 || d < 40 || d > 130) {
    showToast(t('tool.bp.enterValidNumbersEG'));
    return;
  }
  bpLog.unshift({ ts: Date.now(), s, d });
  if (bpLog.length > 100) bpLog = bpLog.slice(0, 100);
  safeSave('bp-log', bpLog);
  document.getElementById('bp-systolic').value = '';
  document.getElementById('bp-diastolic').value = '';
  closeModal('bp');
  initBP();
  const cat = getBPCategory(s, d);
  showToast(I18n.t('tool.bp.savedReading', { reading: `${s}/${d}`, cat: cat.label }));
  if (cat.urgent) setTimeout(() => showToast(t('tool.bp.highReadingContactYourDoctor'), 4000), 400);
}
