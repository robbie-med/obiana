// ═══════════════════════════════════════════════════════
// 1. KICK COUNTER
// ═══════════════════════════════════════════════════════
let kickSession = { active: false, startTime: null, count: 0, _timer: null };
let kickHistory = safeLoad('kick-history', []);

TOOL_INITS['tool-kick'] = initKick;

function initKick() {
  const el = document.getElementById('kick-content');
  if (!el) return;
  el.innerHTML = `
    <div id="kick-idle-view">
      <div style="padding:32px 20px 24px;text-align:center">
        <div style="font-size:15px;color:var(--ink-soft);line-height:1.6;margin-bottom:6px">${t('tool.kick.countMovements')}</div>
        <div style="font-size:14px;font-weight:700;color:var(--teal);margin-bottom:28px">${t('tool.kick.goal')}</div>
        <button class="big-action-btn btn-teal" onclick="startKickSession()">${t('tool.kick.startSession')}</button>
      </div>
    </div>
    <div id="kick-active-view" style="display:none">
      <div class="kick-display">
        <div class="kick-count teal" id="kick-count-num">0</div>
        <div id="kick-count-label" style="font-size:14px;color:var(--ink-soft);margin-top:4px">${escHtml(I18n.tp('tool.kick.movementsThisSession', kickSession.count || 0))}</div>
        <div style="margin-top:14px;font-size:13px;color:var(--ink-soft)">${t('tool.kick.elapsed')} <span id="kick-elapsed" style="font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums">0:00</span></div>
        <div style="font-size:12px;color:var(--ink-soft);margin-top:2px">${t('tool.kick.20000Limit')}</div>
      </div>
      <div style="padding:0 16px 12px">
        <button class="big-action-btn btn-teal" onclick="recordKick()" style="font-size:20px;padding:22px">${t('tool.kick.tapForEach')}</button>
      </div>
      <div class="btn-row" style="margin-bottom:8px">
        <button class="btn-sm" onclick="endKickSession(false)"
          style="flex:1;background:white;color:var(--rose);border:1.5px solid var(--rose)">${t('tool.kick.endEarly')}</button>
      </div>
      <div id="kick-limit-alert" role="alert" style="display:none;margin:8px 16px" class="callout alert">
        <div class="callout-title">${t('tool.kick.lessThan10MovementsIn')}</div>
        <p>${t('tool.kick.thisMayNeedAttentionCall')}</p>
      </div>
    </div>
    <div id="kick-success-view" style="display:none;padding:24px 20px;text-align:center">
      <div style="font-size:48px;margin-bottom:8px">✅</div>
      <div style="font-size:18px;font-weight:700;color:var(--success-ink);margin-bottom:4px">${t('tool.kick.10MovementsReached')}</div>
      <div id="kick-success-time" style="font-size:13px;color:var(--ink-soft);margin-bottom:20px"></div>
      <button class="big-action-btn btn-teal" onclick="resetKick()">${t('tool.kick.startAnotherSession')}</button>
    </div>
    <div class="history-section-title">${t('tool.kick.sessionHistory')}</div>
    <div class="history-list-card" id="kick-history-list"></div>
    <div style="height:16px"></div>`;
  renderKickHistory();
  if (kickSession.active) showKickActiveView();
  else showKickIdleView();
}

function showKickIdleView() {
  document.getElementById('kick-idle-view').style.display = '';
  document.getElementById('kick-active-view').style.display = 'none';
  document.getElementById('kick-success-view').style.display = 'none';
}
function showKickActiveView() {
  document.getElementById('kick-idle-view').style.display = 'none';
  document.getElementById('kick-active-view').style.display = '';
  document.getElementById('kick-success-view').style.display = 'none';
  updateKickDisplay();
}

function startKickSession() {
  kickSession = { active: true, startTime: Date.now(), count: 0, _timer: null };
  kickSession._timer = setInterval(updateKickDisplay, 500);
  showKickActiveView();
}

let _lastKickTap = 0;
function recordKick() {
  if (!kickSession.active) return;
  // Real fetal movements do not arrive 300ms apart; a pair that close is a
  // bouncing tap, and over-counting ends the session early at a number the
  // mother did not actually feel.
  const now = Date.now();
  if (now - _lastKickTap < 300) return;
  _lastKickTap = now;
  kickSession.count++;
  updateKickDisplay();
  if (kickSession.count >= 10) {
    endKickSession(true);
  }
}

function updateKickDisplay() {
  if (!kickSession.active) return;
  const el = document.getElementById('kick-count-num');
  const elEl = document.getElementById('kick-elapsed');
  if (el) el.textContent = I18n.fmt.num(kickSession.count);
  // Russian, Arabic and Polish inflect the noun by count, so the label has to
  // move with the number rather than being written once.
  const lbl = document.getElementById('kick-count-label');
  if (lbl) lbl.textContent = I18n.tp('tool.kick.movementsThisSession', kickSession.count);
  if (elEl) elEl.textContent = fmtTime(Date.now() - kickSession.startTime);
  // 2 hour limit
  const elapsed = Date.now() - kickSession.startTime;
  if (elapsed >= 2 * 60 * 60 * 1000 && kickSession.count < 10) {
    clearInterval(kickSession._timer);
    kickSession.active = false;
    document.getElementById('kick-limit-alert').style.display = '';
    saveKickRecord(false, elapsed);
    renderKickHistory();
  }
}

function endKickSession(success) {
  if (!kickSession.active && !success) return;
  clearInterval(kickSession._timer);
  const duration = Date.now() - kickSession.startTime;
  kickSession.active = false;
  saveKickRecord(success, duration);
  renderKickHistory();

  if (success) {
    document.getElementById('kick-idle-view').style.display = 'none';
    document.getElementById('kick-active-view').style.display = 'none';
    document.getElementById('kick-success-view').style.display = '';
    const el = document.getElementById('kick-success-time');
    if (el) el.textContent = I18n.t('tool.cx.reachedIn', { time: fmtTime(duration) });
  } else {
    showKickIdleView();
  }
}

function resetKick() {
  kickSession = { active: false, startTime: null, count: 0, _timer: null };
  showKickIdleView();
}

function saveKickRecord(success, duration) {
  kickHistory.unshift({ ts: kickSession.startTime || Date.now(), count: kickSession.count, duration, success });
  if (kickHistory.length > 40) kickHistory = kickHistory.slice(0, 40);
  safeSave('kick-history', kickHistory);
}

function renderKickHistory() {
  const el = document.getElementById('kick-history-list');
  if (!el) return;
  if (!kickHistory.length) {
    el.innerHTML = `<p class="history-empty">${t('tool.kick.noSessions')}</p>`;
    return;
  }
  el.innerHTML = kickHistory.slice(0, 15).map(r => `
    <div class="kick-history-row">
      <span class="khr-date">${fmtDate(r.ts)}</span>
      <span class="khr-count">${r.count} / 10 &nbsp;<span style="font-size:12px;color:var(--ink-soft)">${fmtTime(r.duration)}</span></span>
      <span class="khr-badge ${r.success ? 'khr-pass' : 'khr-fail'}">${r.success || r.count >= 10 ? t('tool.kick.pass') : t('tool.kick.low')}</span>
    </div>`).join('');
}
