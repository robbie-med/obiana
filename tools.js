// ═══════════════════════════════════════════════════════
// TOOLS.JS — All 10 interactive tools
// ═══════════════════════════════════════════════════════

// ─── Shared modal helpers ───────────────────────────────
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('visible');
  document.body.style.overflow = '';
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}:${String(m % 60).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  return `${m}:${String(s % 60).padStart(2,'0')}`;
}

// Delegate to I18n so these follow the APP language. Passing [] used the
// browser locale, so a user on an English phone who picked Spanish got
// Spanish text with English dates.
function fmtTimeOfDay(ts) { return I18n.fmt.time(ts); }
function fmtDate(ts)      { return I18n.fmt.date(ts); }
function fmtDateTime(ts)  { return I18n.fmt.dateTime(ts); }

// ═══════════════════════════════════════════════════════
// 1. KICK COUNTER
// ═══════════════════════════════════════════════════════
let kickSession = { active: false, startTime: null, count: 0, _timer: null };
let kickHistory = JSON.parse(localStorage.getItem('kick-history') || '[]');

TOOL_INITS['tool-kick'] = initKick;

function initKick() {
  const el = document.getElementById('kick-content');
  if (!el) return;
  el.innerHTML = `
    <div id="kick-idle-view">
      <div style="padding:32px 20px 24px;text-align:center">
        <div style="font-size:15px;color:var(--ink-soft);line-height:1.6;margin-bottom:6px">
          Count fetal movements during an active session.
        </div>
        <div style="font-size:14px;font-weight:700;color:var(--teal);margin-bottom:28px">
          Goal: 10 movements within 2 hours
        </div>
        <button class="big-action-btn btn-teal" onclick="startKickSession()">${t('tool.kick.startSession')}</button>
      </div>
    </div>
    <div id="kick-active-view" style="display:none">
      <div class="kick-display">
        <div class="kick-count teal" id="kick-count-num">0</div>
        <div style="font-size:14px;color:var(--ink-soft);margin-top:4px">${t('tool.kick.movementsThisSession')}</div>
        <div style="margin-top:14px;font-size:13px;color:var(--ink-soft)">${t('tool.kick.elapsed')} <span id="kick-elapsed" style="font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums">0:00</span></div>
        <div style="font-size:12px;color:var(--ink-soft);margin-top:2px">${t('tool.kick.20000Limit')}</div>
      </div>
      <div style="padding:0 16px 12px">
        <button class="big-action-btn btn-teal" onclick="recordKick()" style="font-size:20px;padding:22px">
          👶 Tap for Each Movement
        </button>
      </div>
      <div class="btn-row" style="margin-bottom:8px">
        <button class="btn-sm" onclick="endKickSession(false)"
          style="flex:1;background:white;color:var(--rose);border:1.5px solid var(--rose)">
          End Session Early
        </button>
      </div>
      <div id="kick-limit-alert" style="display:none;margin:8px 16px" class="callout alert">
        <div class="callout-title">${t('tool.kick.lessThan10MovementsIn')}</div>
        <p>${t('tool.kick.thisMayNeedAttentionCall')}</p>
      </div>
    </div>
    <div id="kick-success-view" style="display:none;padding:24px 20px;text-align:center">
      <div style="font-size:48px;margin-bottom:8px">✅</div>
      <div style="font-size:18px;font-weight:700;color:#2e7d32;margin-bottom:4px">${t('tool.kick.10MovementsReached')}</div>
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

function recordKick() {
  if (!kickSession.active) return;
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
  if (el) el.textContent = kickSession.count;
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
    if (el) el.textContent = `Reached in ${fmtTime(duration)}`;
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
  localStorage.setItem('kick-history', JSON.stringify(kickHistory));
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
      <span class="khr-badge ${r.success ? 'khr-pass' : 'khr-fail'}">${r.success ? 'Pass' : r.count >= 10 ? 'Pass' : 'Low'}</span>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// 2. CONTRACTION TIMER
// ═══════════════════════════════════════════════════════
let cxActive = false;
let cxStart = null;
let cxTimer = null;
let cxList = JSON.parse(localStorage.getItem('contractions') || '[]');

TOOL_INITS['tool-contractions'] = initContractions;

function initContractions() {
  const el = document.getElementById('cx-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:20px 16px 12px;text-align:center">
      <div id="cx-status-label" style="font-size:15px;font-weight:600;color:var(--ink-soft);margin-bottom:10px">
        No contraction in progress
      </div>
      <div id="cx-live-timer" class="contraction-live-time" style="display:none;color:var(--gold);margin-bottom:14px">0:00</div>
      <button id="cx-btn" class="big-action-btn btn-gold" onclick="toggleContraction()" style="margin-bottom:10px">
        Contraction Starting
      </button>
      <div style="margin-top:6px">
        <button onclick="clearContractions()" style="font-size:12px;color:var(--ink-soft);background:none;border:none;cursor:pointer;text-decoration:underline">
          Clear all
        </button>
      </div>
    </div>
    <div id="cx-511-alert" style="display:none;margin:0 16px 12px"></div>
    <div class="history-section-title">${t('tool.common.recentContractions')}</div>
    <div class="history-list-card" id="cx-list"></div>
    <div style="height:16px"></div>`;
  renderContractionList();
  if (cxActive) {
    cxTimer = setInterval(updateCxTimer, 500);
    document.getElementById('cx-status-label').textContent = 'Contraction in progress…';
    document.getElementById('cx-btn').textContent = 'Contraction Ending';
    document.getElementById('cx-btn').className = 'big-action-btn btn-rose';
    document.getElementById('cx-live-timer').style.display = '';
  }
}

function toggleContraction() {
  if (!cxActive) {
    cxStart = Date.now();
    cxActive = true;
    cxTimer = setInterval(updateCxTimer, 500);
    document.getElementById('cx-status-label').textContent = 'Contraction in progress…';
    const btn = document.getElementById('cx-btn');
    btn.textContent = 'Contraction Ending';
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
    localStorage.setItem('contractions', JSON.stringify(cxList));
    cxActive = false;
    cxStart = null;

    document.getElementById('cx-status-label').textContent = 'No contraction in progress';
    const btn = document.getElementById('cx-btn');
    btn.textContent = 'Contraction Starting';
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
    const intv = c.interval != null ? `every ${fmtTime(c.interval)}` : '—';
    return `<div class="cx-row">
      <span class="cx-num">${i + 1}</span>
      <span class="cx-dur">${dur} long</span>
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
    alertEl.style.background = '#ffebee';
    alertEl.style.borderColor = '#c44';
    alertEl.innerHTML = `<div style="font-size:15px;font-weight:700;color:#c44;margin-bottom:4px">${t('tool.common.timeToGoToThe')}</div>
      <div style="font-size:13px;color:var(--ink)">Contractions ~${minsApart} min apart, lasting ~${secsLong}s — call L&D now.</div>`;
  } else if (meets511) {
    alertEl.className = 'alert-511';
    alertEl.style.background = '#fff8e1';
    alertEl.style.borderColor = 'var(--gold)';
    alertEl.innerHTML = `<div style="font-size:15px;font-weight:700;color:var(--gold);margin-bottom:4px">${t('tool.common.511PatternReached')}</div>
      <div style="font-size:13px;color:var(--ink)">~${minsApart} min apart, ~${secsLong}s long. If this is your first baby, head to the hospital. Call if water breaks or you're in doubt.</div>`;
  } else {
    alertEl.innerHTML = `<div style="font-size:13px;color:var(--ink-soft);padding:10px 14px;background:var(--teal-faint);border-radius:var(--radius-sm)">
      Last hour: ~${minsApart} min apart · ~${secsLong}s long · ${recent.length} contractions. 5-1-1 pattern not yet reached.
    </div>`;
  }
}

function clearContractions() {
  if (!confirm('Clear all contraction records?')) return;
  cxList = [];
  localStorage.removeItem('contractions');
  renderContractionList();
  const a = document.getElementById('cx-511-alert');
  if (a) a.style.display = 'none';
}

// ═══════════════════════════════════════════════════════
// 3. FEEDING LOG
// ═══════════════════════════════════════════════════════
let feedLog = JSON.parse(localStorage.getItem('feed-log') || '[]');
let _feedType = 'breast';
let _feedSide = 'left';

TOOL_INITS['tool-feeding'] = initFeeding;

function initFeeding() {
  const el = document.getElementById('feed-content');
  if (!el) return;

  const last24 = feedLog.filter(f => Date.now() - f.ts < 86400000);
  const count24 = last24.length;
  const flagLow = count24 < 8 && feedLog.length > 0;

  el.innerHTML = `
    <div class="stat-row">
      <div class="stat-box">
        <div class="stat-number" style="color:${flagLow ? '#c44' : 'var(--teal)'}">${count24}</div>
        <div class="stat-label">${t('tool.feed.feedsInLast24Hrs')}</div>
      </div>
      <div class="stat-box">
        <div class="stat-number" style="color:var(--teal)">${feedLog.length ? fmtTimeOfDay(feedLog[0].ts) : '—'}</div>
        <div class="stat-label">${t('tool.feed.lastFeed')}</div>
      </div>
    </div>
    ${flagLow ? `<div class="callout alert" style="margin:0 16px 8px">
      <div class="callout-title">⚠ Fewer than 8 feeds today</div>
      <p>Newborns typically need 8–12 feedings per 24 hours. If baby is difficult to wake or not gaining weight, call your doctor.</p>
    </div>` : ''}
    <div style="padding:0 16px 12px">
      <button class="big-action-btn btn-teal" onclick="openModal('feed')">${t('tool.feed.logAFeeding')}</button>
    </div>
    <div class="history-section-title">${t('tool.feed.feedLog')}</div>
    <div class="history-list-card" id="feed-list"></div>
    <div style="height:16px"></div>`;
  renderFeedList();
}

function renderFeedList() {
  const el = document.getElementById('feed-list');
  if (!el) return;
  if (!feedLog.length) { el.innerHTML = `<p class="history-empty">${t('tool.feed.noFeeds')}</p>`; return; }
  el.innerHTML = feedLog.slice(0, 30).map((f, i) => {
    let detail = '';
    if (f.type === 'breast') detail = `${f.side || ''} · ${f.duration || '?'} min`;
    else detail = `Bottle · ${f.oz || '?'} oz`;
    return `<div class="feed-row">
      <span class="feed-time">${fmtTimeOfDay(f.ts)}<br><span style="font-size:10px">${fmtDate(f.ts)}</span></span>
      <span class="feed-detail">${f.type === 'breast' ? '🤱 Breast' : '🍼 Bottle'}</span>
      <span class="feed-note">${detail}</span>
      <button onclick="deleteFeed(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px;-webkit-tap-highlight-color:transparent">×</button>
    </div>`;
  }).join('');
}

function deleteFeed(idx) {
  feedLog.splice(idx, 1);
  localStorage.setItem('feed-log', JSON.stringify(feedLog));
  initFeeding();
}

function setFeedType(type) {
  _feedType = type;
  document.getElementById('feed-type-breast').classList.toggle('selected', type === 'breast');
  document.getElementById('feed-type-bottle').classList.toggle('selected', type === 'bottle');
  document.getElementById('feed-breast-fields').style.display = type === 'breast' ? '' : 'none';
  document.getElementById('feed-bottle-fields').style.display = type === 'bottle' ? '' : 'none';
}

function setFeedSide(side) {
  _feedSide = side;
  ['left','right','both'].forEach(s => {
    const el = document.getElementById('feed-side-' + s);
    if (el) el.classList.toggle('selected', s === side);
  });
}

function saveFeed() {
  const entry = { ts: Date.now(), type: _feedType };
  if (_feedType === 'breast') {
    entry.side = _feedSide;
    entry.duration = parseInt(document.getElementById('feed-duration').value) || null;
  } else {
    entry.oz = parseFloat(document.getElementById('feed-oz').value) || null;
  }
  feedLog.unshift(entry);
  if (feedLog.length > 200) feedLog = feedLog.slice(0, 200);
  localStorage.setItem('feed-log', JSON.stringify(feedLog));
  closeModal('feed');
  document.getElementById('feed-duration').value = '';
  document.getElementById('feed-oz').value = '';
  initFeeding();
  showToast(t('tool.feed.feedLogged'));
}

// ═══════════════════════════════════════════════════════
// 4. DIAPER COUNTER
// ═══════════════════════════════════════════════════════
let diaperLog = JSON.parse(localStorage.getItem('diaper-log') || '[]');

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
      <button class="diaper-big-btn" onclick="addDiaper('wet')" style="background:#e3f2fd;color:#1565c0">
        <span style="font-size:32px">💧</span>
        <span class="dbb-count" id="wet-count" style="color:#1565c0">${wetToday}</span>
        <span style="font-size:13px;font-weight:700">${t('tool.diaper.wetToday')}</span>
      </button>
      <button class="diaper-big-btn" onclick="addDiaper('dirty')" style="background:#fff8e1;color:#f57f17">
        <span style="font-size:32px">💩</span>
        <span class="dbb-count" id="dirty-count" style="color:#f57f17">${dirtyToday}</span>
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

function addDiaper(type) {
  diaperLog.unshift({ ts: Date.now(), type });
  if (diaperLog.length > 300) diaperLog = diaperLog.slice(0, 300);
  localStorage.setItem('diaper-log', JSON.stringify(diaperLog));
  initDiapers();
  showToast(type === 'wet' ? 'Wet diaper logged' : type === 'dirty' ? 'Dirty diaper logged' : 'Diaper logged');
}

function renderDiaperList() {
  const el = document.getElementById('diaper-list');
  if (!el) return;
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayEntries = diaperLog.filter(d => d.ts >= todayStart.getTime());
  if (!todayEntries.length) { el.innerHTML = `<p class="history-empty">${t('tool.diaper.noDiapers')}</p>`; return; }
  const icons = { wet: '💧', dirty: '💩', both: '💧💩' };
  const labels = { wet: 'Wet', dirty: 'Dirty', both: 'Wet + Dirty' };
  el.innerHTML = todayEntries.map((d, i) => `
    <div class="diaper-log-row">
      <span>${icons[d.type]}</span>
      <span style="flex:1;font-weight:600">${labels[d.type]}</span>
      <span style="color:var(--ink-soft)">${fmtTimeOfDay(d.ts)}</span>
      <button onclick="deleteDiaper(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;margin-left:6px;padding:2px 4px">×</button>
    </div>`).join('');
}

function deleteDiaper(idx) {
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayIdx = diaperLog.findIndex((d, i) => d.ts >= todayStart.getTime());
  diaperLog.splice(todayIdx >= 0 ? todayIdx + idx : idx, 1);
  localStorage.setItem('diaper-log', JSON.stringify(diaperLog));
  initDiapers();
}

// ═══════════════════════════════════════════════════════
// 5. JAUNDICE DAY TRACKER
// ═══════════════════════════════════════════════════════
TOOL_INITS['tool-jaundice'] = initJaundice;

const JAUNDICE_GUIDANCE = [
  { day: 1, text: 'First day — bilirubin is being checked before hospital discharge. Baby is monitored by the nursing staff.' },
  { day: 2, text: 'Bilirubin levels are rising. Hospital checks before discharge. Watch for yellowing of skin and whites of eyes.' },
  { day: 3, text: 'Jaundice peaks around days 3–5 in most babies. Yellow color may be more visible. Feeding frequently (8–12 times/day) helps the body clear bilirubin.' },
  { day: 4, text: 'Peak jaundice period. Make sure baby is feeding well and having wet diapers. Pediatrician visit may be scheduled around now.' },
  { day: 5, text: 'Pediatrician visit: weight check + bilirubin level. Levels should start to level off. If baby is sleepy and not feeding, call your doctor.' },
  { day: 6, text: 'Levels should start declining in full-term babies. Continue feeding frequently. If skin is deeply yellow or baby won\'t wake to feed — call your doctor.' },
  { day: 7, text: 'Most term babies\' jaundice is improving by now. Watch for yellowing spreading to legs and feet, which signals higher levels.' },
  { day: 10, text: 'In most term babies, jaundice is nearly resolved. If it\'s persisting or worsening, your doctor will want to check a bilirubin level.' },
  { day: 14, text: '2-week visit. Jaundice should be resolved in term babies. Persistent jaundice beyond 2 weeks may need further evaluation — tell your doctor.' },
  { day: 21, text: 'Jaundice lasting beyond 3 weeks is considered prolonged and should be evaluated. Breastfed babies can have mild jaundice longer, but it still needs to be checked.' },
];

function getJaundiceDay() {
  const bd = localStorage.getItem('jaundice-birth-date');
  if (!bd) return null;
  const diff = Date.now() - new Date(bd).getTime();
  return Math.floor(diff / 86400000) + 1;
}

function getJaundiceGuidance(day) {
  let best = JAUNDICE_GUIDANCE[0];
  for (const g of JAUNDICE_GUIDANCE) {
    if (g.day <= day) best = g;
  }
  return best.text;
}

function initJaundice() {
  const el = document.getElementById('jaundice-content');
  if (!el) return;
  const day = getJaundiceDay();
  const birthDate = localStorage.getItem('jaundice-birth-date') || '';

  el.innerHTML = `
    <div class="weight-profile-card" style="margin:12px 16px">
      <div class="wpc-title">${t('tool.jaundice.babySBirthDate')}</div>
      <div style="display:flex;gap:10px;align-items:center">
        <input type="date" class="tool-input" id="jaundice-birth-input" value="${birthDate}" max="${new Date().toISOString().split('T')[0]}" style="flex:1">
        <button class="btn-sm btn-teal" onclick="setJaundiceBirthDate()">${t('tool.jaundice.set')}</button>
      </div>
    </div>
    ${day !== null ? `
    <div style="text-align:center;padding:20px 20px 8px">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--ink-soft);margin-bottom:4px">Day of Life</div>
      <div class="jaundice-day-num">${day}</div>
      ${day > 21 ? '<div style="font-size:13px;color:var(--ink-soft);margin-top:4px">Most jaundice resolves by now</div>' : ''}
    </div>
    <div class="callout gold" style="margin:0 16px 8px">
      <div class="callout-title">Day ${day} — What to watch for</div>
      <p>${getJaundiceGuidance(day)}</p>
    </div>
    <div class="callout alert" style="margin:0 16px 8px">
      <div class="callout-title">Call your doctor immediately if</div>
      <p>Baby won't wake to feed · Deeply yellow skin spreading to legs · Arching back or high-pitched cry · White or grey stools · Very dark urine</p>
    </div>` : `
    <div style="padding:24px 20px;text-align:center;color:var(--ink-soft)">
      Set baby's birth date above to see day-by-day guidance.
    </div>`}
    <div style="height:16px"></div>`;
}

function setJaundiceBirthDate() {
  const val = document.getElementById('jaundice-birth-input').value;
  if (!val) return;
  localStorage.setItem('jaundice-birth-date', val);
  initJaundice();
  showToast(t('tool.jaundice.birthDateSaved'));
}

// ═══════════════════════════════════════════════════════
// 6. BLOOD PRESSURE LOG
// ═══════════════════════════════════════════════════════
let bpLog = JSON.parse(localStorage.getItem('bp-log') || '[]');

TOOL_INITS['tool-bp'] = initBP;

function getBPCategory(s, d) {
  if (s >= 160 || d >= 110) return { label: 'Severely High', color: '#c44', urgent: true };
  if (s >= 140 || d >= 90)  return { label: 'High', color: '#e65100', urgent: true };
  if (s >= 130 || d >= 80)  return { label: 'Elevated', color: '#f59e0b', urgent: false };
  return { label: 'Normal', color: '#2e7d32', urgent: false };
}

function initBP() {
  const el = document.getElementById('bp-content');
  if (!el) return;

  const last = bpLog[0];
  const lastCat = last ? getBPCategory(last.s, last.d) : null;

  el.innerHTML = `
    ${last && lastCat.urgent ? `<div class="callout alert" style="margin:12px 16px 0">
      <div class="callout-title">⚠ High reading on record</div>
      <p>Your most recent reading (${last.s}/${last.d}) is in the ${lastCat.label} range. Contact your doctor today.</p>
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
      <span class="bp-pill" style="background:${cat.color}">${cat.label}</span>
      <span class="bp-time">${fmtDateTime(r.ts)}</span>
      <button onclick="deleteBP(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px">×</button>
    </div>`;
  }).join('');
}

function deleteBP(idx) {
  bpLog.splice(idx, 1);
  localStorage.setItem('bp-log', JSON.stringify(bpLog));
  initBP();
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
  localStorage.setItem('bp-log', JSON.stringify(bpLog));
  document.getElementById('bp-systolic').value = '';
  document.getElementById('bp-diastolic').value = '';
  closeModal('bp');
  initBP();
  const cat = getBPCategory(s, d);
  showToast(`${s}/${d} saved — ${cat.label}`);
  if (cat.urgent) setTimeout(() => showToast(t('tool.bp.highReadingContactYourDoctor'), 4000), 400);
}

// ═══════════════════════════════════════════════════════
// 7. WEIGHT TRACKER
// ═══════════════════════════════════════════════════════
let weightLog = JSON.parse(localStorage.getItem('weight-log') || '[]');
let weightProfile = JSON.parse(localStorage.getItem('weight-profile') || '{}');

TOOL_INITS['tool-weight'] = initWeight;

function getGainRange(bmi) {
  if (!bmi) return null;
  if (bmi < 18.5) return { min: 28, max: 40, label: 'Underweight (BMI < 18.5)' };
  if (bmi < 25)   return { min: 25, max: 35, label: 'Normal weight (BMI 18.5–24.9)' };
  if (bmi < 30)   return { min: 15, max: 25, label: 'Overweight (BMI 25–29.9)' };
  return { min: 11, max: 20, label: 'Obese (BMI ≥ 30)' };
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
          <input type="number" class="tool-input" id="wp-base" placeholder="e.g. 140" value="${weightProfile.baseWeight || ''}" min="80" max="400">
        </div>
        <div style="flex:1">
          <label class="form-label">${t('tool.weight.prePregnancyBmi')}</label>
          <input type="number" class="tool-input" id="wp-bmi" placeholder="e.g. 22.5" value="${weightProfile.bmi || ''}" min="15" max="60" step="0.1">
        </div>
      </div>
      <button class="btn-sm btn-teal" onclick="saveWeightProfile()" style="width:100%">${t('tool.weight.saveProfile')}</button>
    </div>
    ${range ? `<div class="callout" style="margin:8px 16px">
      <div class="callout-title">IOM guideline for you (${range.label})</div>
      <p>Recommended total gain: <strong>${range.min}–${range.max} lbs</strong> for the full pregnancy.
      ${totalGain !== null ? ` You have gained <strong>${totalGain > 0 ? '+' : ''}${totalGain} lbs</strong> so far.` : ''}</p>
    </div>` : `<div class="callout" style="margin:8px 16px"><div class="callout-title">Set your profile</div><p>Enter your pre-pregnancy BMI to see personalized IOM gain guidelines.</p></div>`}
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
  localStorage.setItem('weight-profile', JSON.stringify(weightProfile));
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
      <span class="weight-wk">Wk ${w.week}</span>
      <span class="weight-val">${w.lbs} lbs</span>
      <span class="weight-gain">${gain !== null ? (gain > 0 ? '+' : '') + gain + ' lbs total' : fmtDate(w.ts)}</span>
      <button onclick="deleteWeight(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px">×</button>
    </div>`;
  }).join('');
}

function deleteWeight(idx) {
  const sorted = [...weightLog].sort((a, b) => b.week - a.week || b.ts - a.ts);
  const entry = sorted[idx];
  const realIdx = weightLog.findIndex(w => w.ts === entry.ts);
  if (realIdx >= 0) weightLog.splice(realIdx, 1);
  localStorage.setItem('weight-log', JSON.stringify(weightLog));
  initWeight();
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
  localStorage.setItem('weight-log', JSON.stringify(weightLog));
  document.getElementById('weight-lbs').value = '';
  document.getElementById('weight-week').value = '';
  closeModal('weight');
  initWeight();
  showToast(`${lbs} lbs at week ${week} saved`);
}

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
function getEPDS() {
  const l = (window.MYOB_LOCALES[I18n.lang] || {}).epds;
  return (l && l.validated && Array.isArray(l.questions) && l.questions.length === 10) ? l : null;
}

let epdsAnswers = {};
let epdsHistory = JSON.parse(localStorage.getItem('epds-history') || '[]');

TOOL_INITS['tool-mood'] = initMood;

function initMood() {
  const el = document.getElementById('mood-content');
  if (!el) return;
  epdsAnswers = {};

  const epds = getEPDS();
  if (!epds) {
    // No validated instrument for this language. Refusing is the safe
    // failure: a machine-translated depression screen still produces a
    // number, and that number would look just as authoritative as a real one.
    const langs = Object.keys(window.MYOB_LOCALES)
      .filter(c => (window.MYOB_LOCALES[c].epds || {}).validated)
      .map(c => I18n.LOCALES[c] ? I18n.LOCALES[c].native : c);
    el.innerHTML = `
      <div style="padding:24px 20px">
        <div class="callout alert">
          <div class="callout-title">${escHtml(I18n.t('tool.mood.unavailableTitle'))}</div>
          <p>${escHtml(I18n.t('tool.mood.unavailableBody'))}</p>
        </div>
        <p style="font-size:13px;color:var(--ink-soft);line-height:1.6;margin-top:12px">
          ${escHtml(I18n.t('tool.mood.availableIn', { langs: langs.join(', ') }))}
        </p>
        <button class="big-action-btn btn-plum" style="margin-top:16px"
          onclick="I18n.setLocale('en')">${escHtml(I18n.t('tool.mood.switchToEnglish'))}</button>
      </div>`;
    return;
  }
  const EPDS_Q = epds.questions;

  el.innerHTML = `
    <div style="padding:12px 16px 0">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6;margin-bottom:4px">
        <strong>${t('tool.mood.edinburghPostnatalDepressionScale')}</strong> —
        Answer based on how you've felt <strong>${t('tool.mood.inThePast7Days')}</strong>.
      </p>
      <p style="font-size:12px;color:var(--ink-soft)">${t('tool.mood.yourAnswersAreSavedOnly')}</p>
    </div>
    <div id="epds-questions">
      ${EPDS_Q.map((q, qi) => `
        <div class="epds-question">
          <div class="epds-q-num">${I18n.t('tool.mood.qCounter', { n: qi + 1, total: EPDS_Q.length })}</div>
          <div class="epds-q-text">${q.text}</div>
          <div class="epds-options">
            ${q.options.map((opt, oi) => `
              <div class="epds-option" id="epds-${qi}-${oi}" onclick="setEPDS(${qi}, ${oi})">
                <span class="epds-option-text">${opt}</span>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div style="padding:12px 16px 16px">
      <button class="big-action-btn btn-plum" onclick="submitEPDS()">${t('tool.mood.getMyScore')}</button>
    </div>
    <div id="epds-result"></div>
    <div style="padding:4px 16px 0;font-size:11px;color:var(--ink-soft);line-height:1.5">
      ${escHtml(epds.attribution || '')}
    </div>
    ${epdsHistory.length ? `
    <div class="history-section-title">Past Check-Ins</div>
    <div class="history-list-card" style="margin:0 16px">
      ${epdsHistory.slice(0, 8).map(h => {
        const interp = getEPDSInterpretation(h.score);
        return `<div style="display:flex;align-items:center;padding:10px 16px;border-bottom:1px solid var(--rule)">
          <span style="flex:1;font-size:13px;color:var(--ink-soft)">${fmtDate(h.ts)}</span>
          <span style="font-size:18px;font-weight:700;color:${interp.color}">${h.score}</span>
          <span style="font-size:11px;font-weight:600;margin-left:8px;color:${interp.color}">${interp.label}</span>
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
  if (score >= cut.high)    return { label: I18n.t('tool.mood.interpHigh'),    color: '#c44',     bg: '#ffebee' };
  if (score >= cut.concern) return { label: I18n.t('tool.mood.interpConcern'), color: '#e65100',  bg: '#fff3e0' };
  return { label: I18n.t('tool.mood.interpLow'), color: '#2e7d32', bg: '#e8f5e9' };
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
  localStorage.setItem('epds-history', JSON.stringify(epdsHistory));

  const interp = getEPDSInterpretation(score);
  const q10score = epds.questions[9].scores[epdsAnswers[9]];

  const result = document.getElementById('epds-result');
  if (result) {
    result.innerHTML = `
      <div class="score-result-card" style="background:${interp.bg};border-left:4px solid ${interp.color}">
        <div class="score-num" style="color:${interp.color}">${score}</div>
        <div class="score-label" style="color:${interp.color}">${interp.label}</div>
        <div class="score-note">${t('tool.mood.scoreOutOf30Based')}</div>
        ${score >= 10 ? `<div style="margin-top:10px;font-size:13px;font-weight:600;color:${interp.color}">
          Talking to your doctor — even about a screening score — is always a good step. PPD is very treatable.
        </div>` : `<div style="margin-top:10px;font-size:13px;color:var(--ink-soft)">
          Continue checking in weekly. If your mood changes, this tool will help you track it.
        </div>`}
        ${q10score > 0 ? `<div class="callout alert" style="margin-top:12px;text-align:left">
          <div class="callout-title">Important</div>
          <p>You answered that thoughts of self-harm have occurred to you. Please reach out to your doctor, call 988 (Suicide &amp; Crisis Lifeline), or go to the nearest emergency room.</p>
        </div>` : ''}
      </div>`;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

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
  if (localStorage.getItem('birth-plan-v2') === '1') return saved;
  const out = {};
  Object.keys(saved || {}).forEach(key => {
    const map = BIRTH_PLAN_LEGACY[key] || {};
    const conv = v => (Object.prototype.hasOwnProperty.call(map, v) ? map[v] : v);
    const v = saved[key];
    out[key] = Array.isArray(v) ? v.map(conv) : conv(v);
  });
  localStorage.setItem('birth-plan', JSON.stringify(out));
  localStorage.setItem('birth-plan-v2', '1');
  return out;
}

// Label lookups — the only place birth-plan display text is produced.
function bpQuestionLabel(key) { return I18n.t('tool.birthplan.q.' + key + '.label'); }
function bpOptionLabel(key, optId) { return I18n.t('tool.birthplan.q.' + key + '.opt.' + optId); }

let birthPlanAnswers = migrateBirthPlan(JSON.parse(localStorage.getItem('birth-plan') || '{}'));

TOOL_INITS['tool-birthplan'] = initBirthPlan;

function initBirthPlan() {
  const el = document.getElementById('birthplan-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:12px 16px 4px">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6">
        Select your preferences below. Your summary will appear at the bottom — you can share it with your care team.
      </p>
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
  localStorage.setItem('birth-plan', JSON.stringify(birthPlanAnswers));
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
  const savedNotes = localStorage.getItem('birth-plan-notes') || '';
  return `
    <div class="birth-plan-output">
      <div class="bpo-header">📋 My Birth Preferences (${answered.length}/${BIRTH_PLAN_QUESTIONS.length})</div>
      ${rows}
      <div style="padding:12px 16px 4px;font-size:13px;font-weight:600;color:var(--ink-soft)">${t('tool.birthplan.additionalNotesComments')}</div>
      <div style="padding:0 16px 12px">
        <textarea class="bp-notes-area" id="bp-notes"
          placeholder="${t('tool.birthplan.anyOtherPreferencesConcernsOr')}"
          oninput="localStorage.setItem('birth-plan-notes', this.value)"
          style="width:100%;min-height:80px;border:1.5px solid var(--rule);border-radius:var(--radius-sm);padding:10px 12px;font-family:var(--font-sans);font-size:14px;color:var(--ink);background:var(--bg);outline:none;resize:vertical;transition:border-color .2s;line-height:1.5;box-sizing:border-box"
        >${savedNotes}</textarea>
      </div>
      <div style="padding:0 16px 16px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="big-action-btn btn-teal" onclick="copyBirthPlan()" style="flex:1">${t('tool.birthplan.copyToShare')}</button>
        <button class="big-action-btn btn-navy" onclick="printBirthPlan()" style="flex:1">${t('tool.birthplan.printPdf')}</button>
      </div>
    </div>`;
}

function copyBirthPlan() {
  const lines = ['MY BIRTH PREFERENCES\n'];
  BIRTH_PLAN_QUESTIONS.forEach(q => {
    const v = birthPlanAnswers[q.key];
    if (v && (!Array.isArray(v) || v.length)) {
      const disp = (Array.isArray(v) ? v : [v]).map(id => bpOptionLabel(q.key, id)).join(', ');
      lines.push(`• ${bpQuestionLabel(q.key)}: ${disp}`);
    }
  });
  const notes = (document.getElementById('bp-notes') || {}).value
    || localStorage.getItem('birth-plan-notes') || '';
  if (notes.trim()) lines.push('\nAdditional notes:\n' + notes.trim());
  lines.push('\nGenerated with Pregnancy & Birth Guide');
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
  const rows = answered.map(q => {
    const v = birthPlanAnswers[q.key];
    const display = (Array.isArray(v) ? v : [v]).map(id => bpOptionLabel(q.key, id)).join(', ');
    return `<div class="pv-row"><span class="pv-q">${bpQuestionLabel(q.key)}</span><span class="pv-a">${display}</span></div>`;
  }).join('');
  const notes = (document.getElementById('bp-notes') || {}).value
    || localStorage.getItem('birth-plan-notes') || '';
  const notesHtml = notes.trim()
    ? `<div class="pv-notes"><strong>${t('tool.birthplan.additionalNotes')}</strong><br>${notes.trim().replace(/\n/g, '<br>')}</div>`
    : '';
  pv.innerHTML = `
    <h1>${t('tool.birthplan.myBirthPreferences')}</h1>
    <div class="pv-meta">${I18n.t('tool.birthplan.generatedOn', { date: I18n.fmt.dateLong(Date.now()) })}</div>
    ${rows}
    ${notesHtml}
    <div class="pv-footer">${t('tool.birthplan.pregnancyBirthGuideEvidenceBased')}</div>`;
  window.print();
}

// ═══════════════════════════════════════════════════════
// 10. VISIT NOTES (APPOINTMENT NOTES)
// ═══════════════════════════════════════════════════════
let appointments = migrateAppointments(JSON.parse(localStorage.getItem('appt-notes') || '[]'));
let _editApptId = null;

// Appointment types are stored as stable IDS. Before i18n the <option>
// elements carried no value attribute, so the visible English text WAS the
// stored value — translating it would have silently rewritten saved data.
const APPT_TYPE_KEY = {
  'ob-routine': 'obRoutine', 'ob-triage': 'obTriage', 'mfm-consult': 'mfmConsult',
  'mfm-followup': 'mfmFollowup', 'endo': 'endo', 'cardio': 'cardio', 'nephro': 'nephro',
  'ultrasound': 'ultrasound', 'nst': 'nst', 'lactation': 'lactation', 'pp-2wk': 'pp2wk',
  'pp-6wk': 'pp6wk', 'peds-2-5d': 'peds25d', 'peds-2wk': 'peds2wk', 'peds-2mo': 'peds2mo',
  'family': 'family', 'other': 'other',
};

const APPT_TYPE_LEGACY = {
  'OB \u2013 Routine': 'ob-routine',
  'OB \u2013 L&D Triage / Unscheduled': 'ob-triage',
  'MFM Consultation': 'mfm-consult',
  'MFM Follow-up': 'mfm-followup',
  'Endocrinology': 'endo',
  'Cardiology': 'cardio',
  'Nephrology': 'nephro',
  'Ultrasound': 'ultrasound',
  'Non-Stress Test (NST)': 'nst',
  'Lactation Consult': 'lactation',
  'Postpartum \u2013 2 weeks': 'pp-2wk',
  'Postpartum \u2013 6 weeks': 'pp-6wk',
  'Pediatrician \u2013 2\u20135 days': 'peds-2-5d',
  'Pediatrician \u2013 2 weeks': 'peds-2wk',
  'Pediatrician \u2013 2 months': 'peds-2mo',
  'Family Doctor': 'family',
  'Other': 'other',
};

// Convert visits saved before i18n. Runs once, then the flag short-circuits.
function migrateAppointments(list) {
  if (localStorage.getItem('appt-notes-v2') === '1') return list;
  const out = (list || []).map(a => {
    const t = a && a.type;
    return Object.assign({}, a, {
      type: Object.prototype.hasOwnProperty.call(APPT_TYPE_LEGACY, t) ? APPT_TYPE_LEGACY[t] : t
    });
  });
  localStorage.setItem('appt-notes', JSON.stringify(out));
  localStorage.setItem('appt-notes-v2', '1');
  return out;
}

// Unknown or legacy ids fall through as their stored text rather than vanishing.
function apptTypeLabel(id) {
  if (!id) return I18n.t('tool.appts.untitledVisit');
  const k = APPT_TYPE_KEY[id];
  return k ? I18n.t('apptType.' + k) : id;
}

TOOL_INITS['tool-appts'] = initAppts;

function initAppts() {
  const el = document.getElementById('appts-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:12px 16px">
      <button class="big-action-btn btn-navy" onclick="openApptModal(null)">${t('tool.appts.addVisit')}</button>
    </div>
    <div id="appts-list"></div>
    <div style="height:16px"></div>`;
  renderApptsList();
}

function renderApptsList() {
  const el = document.getElementById('appts-list');
  if (!el) return;
  if (!appointments.length) {
    el.innerHTML = '<p style="text-align:center;color:var(--ink-soft);font-size:13px;padding:20px 16px">No visits logged yet.<br>Add one above to track questions and notes.</p>';
    return;
  }
  const sorted = [...appointments].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  el.innerHTML = sorted.map((appt, i) => {
    const d = appt.date ? new Date(appt.date + 'T12:00:00') : null;
    const month = d ? d.toLocaleDateString(I18n.lang === 'ar' ? 'ar-u-nu-latn' : I18n.lang, { month: 'short' }) : '—';
    const day = d ? d.getDate() : '—';
    const preview = appt.questions ? appt.questions.slice(0, 60) + (appt.questions.length > 60 ? '…' : '') : 'No questions added';
    return `
      <div class="appt-card" id="appt-card-${appt.id}" onclick="toggleApptCard('appt-card-${appt.id}')">
        <div class="appt-card-header">
          <div class="appt-date-badge">
            <div class="adb-month">${month}</div>
            <div class="adb-day">${day}</div>
          </div>
          <div class="appt-info">
            <div class="appt-type-label">${escHtml(apptTypeLabel(appt.type))}</div>
            <div class="appt-preview">${preview}</div>
          </div>
          <svg class="appt-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="appt-body">
          <div class="appt-sub-label">${t('tool.appts.questionsToAsk')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.questions || ('<span style="color:var(--ink-soft)">' + t('tool.appts.noneAdded') + '</span>')}</div>
          <div class="appt-sub-label" style="margin-top:14px">${t('tool.appts.notesFromVisit')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.notes || ('<span style="color:var(--ink-soft)">' + t('tool.appts.noneAdded') + '</span>')}</div>
          <div class="btn-row" style="margin-top:14px;padding:0">
            <button class="btn-sm" onclick="event.stopPropagation();openApptModal('${appt.id}')"
              style="background:var(--teal-faint);color:var(--teal)">${t('tool.appts.edit')}</button>
            <button class="btn-sm" onclick="event.stopPropagation();deleteAppt('${appt.id}')"
              style="background:#fff3f3;color:#c44">${t('tool.appts.delete')}</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleApptCard(cardId) {
  const card = document.getElementById(cardId);
  if (card) card.classList.toggle('open');
}

function openApptModal(id) {
  _editApptId = id;
  const appt = id ? appointments.find(a => a.id === id) : null;
  document.getElementById('appt-modal-title').textContent =
    I18n.t(id ? 'tool.appts.editVisit' : 'tool.appts.addVisit');
  document.getElementById('appt-type').value = appt ? appt.type : '';
  document.getElementById('appt-date').value = appt ? (appt.date || '') : new Date().toISOString().split('T')[0];
  document.getElementById('appt-questions').value = appt ? (appt.questions || '') : '';
  document.getElementById('appt-notes-field').value = appt ? (appt.notes || '') : '';
  openModal('appt');
}

function saveAppt() {
  const type = document.getElementById('appt-type').value || '';
  const date = document.getElementById('appt-date').value;
  const questions = document.getElementById('appt-questions').value.trim();
  const notes = document.getElementById('appt-notes-field').value.trim();

  if (_editApptId) {
    const idx = appointments.findIndex(a => a.id === _editApptId);
    if (idx >= 0) appointments[idx] = { ...appointments[idx], type, date, questions, notes };
  } else {
    appointments.unshift({ id: String(Date.now()), type, date, questions, notes });
  }
  if (appointments.length > 100) appointments = appointments.slice(0, 100);
  localStorage.setItem('appt-notes', JSON.stringify(appointments));
  closeModal('appt');
  initAppts();
  showToast(_editApptId ? 'Visit updated' : 'Visit added');
  _editApptId = null;
}

function deleteAppt(id) {
  if (!confirm('Delete this visit?')) return;
  appointments = appointments.filter(a => a.id !== id);
  localStorage.setItem('appt-notes', JSON.stringify(appointments));
  initAppts();
  showToast(t('tool.appts.visitDeleted'));
}

// ═══════════════════════════════════════════════════════
// TOOLS OVERVIEW INIT
// ═══════════════════════════════════════════════════════
TOOL_INITS['tools'] = function() {
  // Tools overview page is static HTML, no dynamic init needed
};
