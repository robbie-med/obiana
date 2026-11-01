// ═══════════════════════════════════════════════════════
// 4. DIAPER COUNTER
// ═══════════════════════════════════════════════════════
let diaperLog = safeLoad('diaper-log', []);

TOOL_INITS['tool-diapers'] = initDiapers;

function initDiapers() {
  const el = document.getElementById('diaper-content');
  if (!el) return;

  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayEntries = diaperLog.filter(d => d.ts >= todayStart.getTime());
  const wetToday = todayEntries.filter(d => d.type === 'wet' || d.type === 'both').length;
  const dirtyToday = todayEntries.filter(d => d.type === 'dirty' || d.type === 'both').length;

  el.innerHTML = `
    <div class="diaper-btns">
      <button class="diaper-big-btn" onclick="addDiaper('wet')" style="background:var(--info-bg);color:var(--info)">
        <span style="font-size:32px">💧</span>
        <span class="dbb-count" id="wet-count" style="color:var(--info)">${wetToday}</span>
        <span style="font-size:13px;font-weight:700">${t('tool.diaper.wetToday')}</span>
      </button>
      <button class="diaper-big-btn" onclick="addDiaper('dirty')" style="background:var(--caution-bg);color:var(--caution)">
        <span style="font-size:32px">💩</span>
        <span class="dbb-count" id="dirty-count" style="color:var(--caution)">${dirtyToday}</span>
        <span style="font-size:13px;font-weight:700">${t('tool.diaper.dirtyToday')}</span>
      </button>
    </div>
    <div class="btn-row" style="margin-bottom:8px">
      <button class="btn-sm" onclick="addDiaper('both')" style="flex:1;background:var(--teal-faint);color:var(--teal)">${t('tool.diaper.bothWetDirty')}</button>
    </div>
    <div class="callout" style="margin:4px 16px 8px">
      <div class="callout-title">${t('tool.diaper.whatToExpectByAge')}</div>
      <p>${t('tool.diaper.day1212')}</p>
    </div>
    <div class="history-section-title">${t('tool.diaper.todaySLog')}</div>
    <div class="history-list-card" id="diaper-list"></div>
    <div style="height:16px"></div>`;
  renderDiaperList();
}

let _lastDiaperTap = 0;
function addDiaper(type) {
  const now = Date.now();
  if (now - _lastDiaperTap < 400) return;    // double-tap guard
  _lastDiaperTap = now;
  diaperLog.unshift({ ts: now, type });
  if (diaperLog.length > 300) diaperLog = diaperLog.slice(0, 300);
  safeSave('diaper-log', diaperLog);
  initDiapers();
  showToast(t(type === 'wet' ? 'tool.diaper.loggedWet' : type === 'dirty' ? 'tool.diaper.loggedDirty' : 'tool.diaper.loggedGeneric'));
}

function renderDiaperList() {
  const el = document.getElementById('diaper-list');
  if (!el) return;
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayEntries = diaperLog.filter(d => d.ts >= todayStart.getTime());
  if (!todayEntries.length) { el.innerHTML = `<p class="history-empty">${t('tool.diaper.noDiapers')}</p>`; return; }
  const icons = { wet: '💧', dirty: '💩', both: '💧💩' };
  const labels = { wet: t('tool.diaper.wet'), dirty: t('tool.diaper.dirty'), both: t('tool.diaper.both') };
  el.innerHTML = todayEntries.map((d, i) => `
    <div class="diaper-log-row">
      <span>${icons[d.type]}</span>
      <span style="flex:1;font-weight:600">${labels[d.type]}</span>
      <span style="color:var(--ink-soft)">${fmtTimeOfDay(d.ts)}</span>
      <button onclick="deleteDiaper(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;margin-inline-start:6px;padding:2px 4px">×</button>
    </div>`).join('');
}

function deleteDiaper(idx) {
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayIdx = diaperLog.findIndex((d, i) => d.ts >= todayStart.getTime());
  const at = todayIdx >= 0 ? todayIdx + idx : idx;
  const [gone] = diaperLog.splice(at, 1);
  safeSave('diaper-log', diaperLog);
  initDiapers();
  deleteWithUndo(I18n.t('tool.common.entryDeleted'), () => {
    diaperLog.splice(at, 0, gone);
    safeSave('diaper-log', diaperLog);
    initDiapers();
  });
}
