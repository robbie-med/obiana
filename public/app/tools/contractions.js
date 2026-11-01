// ═══════════════════════════════════════════════════════
// 2. CONTRACTION TIMER
// ═══════════════════════════════════════════════════════
let cxActive = false;
let cxStart = null;
let cxTimer = null;
let cxList = safeLoad('contractions', []);

TOOL_INITS['tool-contractions'] = initContractions;

function initContractions() {
  const el = document.getElementById('cx-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:20px 16px 12px;text-align:center">
      <div id="cx-status-label" style="font-size:15px;font-weight:600;color:var(--ink-soft);margin-bottom:10px">${t('tool.cx.noContraction')}</div>
      <div id="cx-live-timer" class="contraction-live-time" style="display:none;color:var(--gold);margin-bottom:14px">0:00</div>
      <button id="cx-btn" class="big-action-btn btn-gold" onclick="toggleContraction()" style="margin-bottom:10px">${t('tool.cx.startBtn')}</button>
      <div style="margin-top:6px">
        <button onclick="clearContractions()" style="font-size:12px;color:var(--ink-soft);background:none;border:none;cursor:pointer;text-decoration:underline">${t('tool.cx.clearAll')}</button>
      </div>
    </div>
    <div id="cx-511-alert" style="display:none;margin:0 16px 12px"></div>
    <div class="history-section-title">${t('tool.common.recentContractions')}</div>
    <div class="history-list-card" id="cx-list"></div>
    <div style="height:16px"></div>`;
  renderContractionList();
  if (cxActive) {
    cxTimer = setInterval(updateCxTimer, 500);
    document.getElementById('cx-status-label').textContent = I18n.t('tool.cx.inProgress');
    document.getElementById('cx-btn').textContent = t('tool.cx.contractionEnding');
    document.getElementById('cx-btn').className = 'big-action-btn btn-rose';
    document.getElementById('cx-live-timer').style.display = '';
  }
}

function toggleContraction() {
  if (!cxActive) {
    cxStart = Date.now();
    cxActive = true;
    cxTimer = setInterval(updateCxTimer, 500);
    document.getElementById('cx-status-label').textContent = I18n.t('tool.cx.inProgress');
    const btn = document.getElementById('cx-btn');
    btn.textContent = I18n.t('tool.cx.endBtn');
    btn.className = 'big-action-btn btn-rose';
    document.getElementById('cx-live-timer').style.display = '';
  } else {
    clearInterval(cxTimer);
    const duration = Date.now() - cxStart;
    // interval from start of last to start of this
    let interval = null;
    if (cxList.length > 0) {
      interval = cxStart - cxList[0].startTime;
    }
    cxList.unshift({ startTime: cxStart, duration, interval });
    if (cxList.length > 60) cxList = cxList.slice(0, 60);
    safeSave('contractions', cxList);
    cxActive = false;
    cxStart = null;

    document.getElementById('cx-status-label').textContent = I18n.t('tool.cx.noContraction');
    const btn = document.getElementById('cx-btn');
    btn.textContent = I18n.t('tool.cx.startBtn');
    btn.className = 'big-action-btn btn-gold';
    const lt = document.getElementById('cx-live-timer');
    if (lt) { lt.style.display = 'none'; lt.textContent = '0:00'; }

    renderContractionList();
    check511();
  }
}

function updateCxTimer() {
  const el = document.getElementById('cx-live-timer');
  if (el && cxStart) el.textContent = fmtTime(Date.now() - cxStart);
}

function renderContractionList() {
  const el = document.getElementById('cx-list');
  if (!el) return;
  if (!cxList.length) {
    el.innerHTML = `<p class="history-empty">${t('tool.cx.noContractions')}</p>`;
    return;
  }
  el.innerHTML = cxList.slice(0, 20).map((c, i) => {
    const dur = fmtTime(c.duration);
    const intv = c.interval != null ? I18n.t('tool.cx.interval', { t: fmtTime(c.interval) }) : '–';
    return `<div class="cx-row">
      <span class="cx-num">${i + 1}</span>
      <span class="cx-dur">${I18n.t('tool.cx.duration', { d: dur })}</span>
      <span class="cx-interval">${intv}</span>
    </div>`;
  }).join('');
}

function check511() {
  const alertEl = document.getElementById('cx-511-alert');
  if (!alertEl || cxList.length < 4) { if (alertEl) alertEl.style.display = 'none'; return; }

  const recent = cxList.filter(c => Date.now() - c.startTime <= 60 * 60 * 1000);
  if (recent.length < 4) { alertEl.style.display = 'none'; return; }

  const withInterval = recent.filter(c => c.interval != null);
  const avgInterval = withInterval.length
    ? withInterval.reduce((s, c) => s + c.interval, 0) / withInterval.length
    : Infinity;
  const avgDuration = recent.reduce((s, c) => s + c.duration, 0) / recent.length;

  const minsApart = Math.round(avgInterval / 60000);
  const secsLong = Math.round(avgDuration / 1000);
  const meets511 = avgInterval <= 5 * 60 * 1000 && avgDuration >= 55 * 1000;
  const goNow = avgInterval <= 3 * 60 * 1000 && avgDuration >= 55 * 1000;

  alertEl.style.display = '';
  if (goNow) {
    alertEl.className = 'alert-511';
    alertEl.style.background = 'var(--danger-bg)';
    alertEl.style.borderColor = 'var(--danger)';
    alertEl.innerHTML = `<div style="font-size:15px;font-weight:700;color:var(--danger-ink);margin-bottom:4px">${t('tool.common.timeToGoToThe')}</div>
      <div style="font-size:13px;color:var(--ink)">${t('tool.cx.alertGo', { mins: minsApart, secs: secsLong })}</div>`;
  } else if (meets511) {
    alertEl.className = 'alert-511';
    alertEl.style.background = 'var(--caution-bg)';
    alertEl.style.borderColor = 'var(--gold)';
    alertEl.innerHTML = `<div style="font-size:15px;font-weight:700;color:var(--gold);margin-bottom:4px">${t('tool.common.511PatternReached')}</div>
      <div style="font-size:13px;color:var(--ink)">${t('tool.cx.alert511', { mins: minsApart, secs: secsLong })}</div>`;
  } else {
    alertEl.innerHTML = `<div style="font-size:13px;color:var(--ink-soft);padding:10px 14px;background:var(--teal-faint);border-radius:var(--radius-sm)">
      ${t('tool.cx.alertProgress', { mins: minsApart, secs: secsLong, n: recent.length })}
    </div>`;
  }
}

function clearContractions() {
  if (!confirm(I18n.t('tool.cx.clearConfirm'))) return;
  cxList = [];
  safeRemove('contractions');
  renderContractionList();
  const a = document.getElementById('cx-511-alert');
  if (a) a.style.display = 'none';
}
