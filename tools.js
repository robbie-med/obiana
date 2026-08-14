// ═══════════════════════════════════════════════════════
// TOOLS.JS — All 10 interactive tools
// ═══════════════════════════════════════════════════════

// ─── Shared modal helpers ───────────────────────────────
// These four sheets had no dialog semantics at all: no role, no labelling, no
// focus handling, no Escape, and nothing stopping Tab walking straight out of
// the sheet and into the page behind it. The language picker has the right
// markup but no trap or restore, so this is written here and used by both.

let _modalReturnFocus = null;
let _modalOpenId = null;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusablesIn(el) {
  return [...el.querySelectorAll(FOCUSABLE)].filter(n => n.offsetParent !== null || n === document.activeElement);
}

// Tab and Shift+Tab wrap inside the sheet; Escape closes it.
function _modalKeydown(e) {
  if (!_modalOpenId) return;
  const sheet = document.getElementById('modal-' + _modalOpenId);
  if (!sheet) return;
  if (e.key === 'Escape') { e.preventDefault(); closeModal(_modalOpenId); return; }
  if (e.key !== 'Tab') return;
  const items = focusablesIn(sheet);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
document.addEventListener('keydown', _modalKeydown);

function openModal(id) {
  const el = document.getElementById('modal-' + id);
  if (!el) return;
  // Remember where focus came from so closing can put it back, rather than
  // dropping the user at the top of the document.
  _modalReturnFocus = document.activeElement;
  _modalOpenId = id;
  el.classList.add('visible');
  document.body.style.overflow = 'hidden';
  // Hide the rest of the page from assistive technology while the sheet owns
  // the screen. inert would be better but is not universally supported.
  const app = document.getElementById('app');
  if (app) app.setAttribute('aria-hidden', 'true');
  const items = focusablesIn(el);
  if (items.length) items[0].focus();
}

function closeModal(id) {
  const el = document.getElementById('modal-' + id);
  if (!el) return;
  el.classList.remove('visible');
  document.body.style.overflow = '';
  const app = document.getElementById('app');
  if (app) app.removeAttribute('aria-hidden');
  if (_modalOpenId === id) _modalOpenId = null;
  if (_modalReturnFocus && document.contains(_modalReturnFocus)) _modalReturnFocus.focus();
  _modalReturnFocus = null;
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

// Emphasise one interpolated value inside a translated sentence. The slot is
// filled with a sentinel, the whole sentence is escaped, and only then does the
// markup go in, so a translator can move the value anywhere in the sentence and
// can never inject HTML.
function boldSlot(key, slot, value) {
  const SENTINEL = '\u0001';
  return escHtml(I18n.t(key, { [slot]: SENTINEL }))
    .replace(SENTINEL, '<strong>' + escHtml(value) + '</strong>');
}

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

// ═══════════════════════════════════════════════════════
// 3. FEEDING LOG
// ═══════════════════════════════════════════════════════
let feedLog = safeLoad('feed-log', []);
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
        <div class="stat-number" style="color:${flagLow ? 'var(--danger-ink)' : 'var(--teal)'}">${count24}</div>
        <div class="stat-label">${t('tool.feed.feedsInLast24Hrs')}</div>
      </div>
      <div class="stat-box">
        <div class="stat-number" style="color:var(--teal)">${feedLog.length ? fmtTimeOfDay(feedLog[0].ts) : '–'}</div>
        <div class="stat-label">${t('tool.feed.lastFeed')}</div>
      </div>
    </div>
    ${flagLow ? `<div class="callout alert" role="alert" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.feed.fewFeedsTitle')}</div>
      <p>${t('tool.feed.fewFeedsBody')}</p>
    </div>` : ''}
    <div style="padding:0 16px 12px">
      <button class="big-action-btn btn-teal" onclick="openFeedModal()">${t('tool.feed.logAFeeding')}</button>
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
    if (f.type === 'breast') detail = `${f.side ? t('modalFeed.' + f.side) : ''} · ${(f.duration ? I18n.tp('tool.feed.minutes', f.duration) : '?')}`;
    else detail = I18n.t('tool.feed.bottleOz', { oz: f.oz == null ? '?' : I18n.fmt.num(f.oz) });
    return `<div class="feed-row">
      <span class="feed-time">${fmtTimeOfDay(f.ts)}<br><span style="font-size:10px">${fmtDate(f.ts)}</span></span>
      <span class="feed-detail">${f.type === 'breast' ? t('tool.feed.breast') : t('tool.feed.bottle')}</span>
      <span class="feed-note">${detail}</span>
      <button onclick="deleteFeed(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px;-webkit-tap-highlight-color:transparent">×</button>
    </div>`;
  }).join('');
}

function deleteFeed(idx) {
  const [gone] = feedLog.splice(idx, 1);
  safeSave('feed-log', feedLog);
  initFeeding();
  deleteWithUndo(I18n.t('tool.common.entryDeleted'), () => {
    feedLog.splice(idx, 0, gone);
    safeSave('feed-log', feedLog);
    initFeeding();
  });
}

// The modal markup is static and never re-rendered, so whatever was picked
// last time is still selected when it reopens. That is not a data bug, the
// variables and the pills agree, but it silently reuses the last choice and
// looks identical to a deliberate default. Reset on open, the way
// openApptModal already does.
function openFeedModal() {
  setFeedType('breast');
  setFeedSide('left');
  const d = document.getElementById('feed-duration');
  const o = document.getElementById('feed-oz');
  if (d) d.value = '';
  if (o) o.value = '';
  openModal('feed');
}

function setFeedType(type) {
  _feedType = type;
  ['breast', 'bottle'].forEach(k => {
    const el = document.getElementById('feed-type-' + k);
    if (el) { el.classList.toggle('selected', type === k); el.setAttribute('aria-pressed', String(type === k)); }
  });
  document.getElementById('feed-breast-fields').style.display = type === 'breast' ? '' : 'none';
  document.getElementById('feed-bottle-fields').style.display = type === 'bottle' ? '' : 'none';
}

function setFeedSide(side) {
  _feedSide = side;
  ['left','right','both'].forEach(s => {
    const el = document.getElementById('feed-side-' + s);
    if (el) { el.classList.toggle('selected', s === side); el.setAttribute('aria-pressed', String(s === side)); }
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
  safeSave('feed-log', feedLog);
  closeModal('feed');
  document.getElementById('feed-duration').value = '';
  document.getElementById('feed-oz').value = '';
  initFeeding();
  showToast(t('tool.feed.feedLogged'));
}

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

function addDiaper(type) {
  diaperLog.unshift({ ts: Date.now(), type });
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

// ═══════════════════════════════════════════════════════
// 5. JAUNDICE DAY TRACKER
// ═══════════════════════════════════════════════════════
TOOL_INITS['tool-jaundice'] = initJaundice;

// Day thresholds are structure; the guidance prose lives in i18n.
const JAUNDICE_GUIDANCE = [1, 2, 3, 4, 5, 6, 7, 10, 14, 21].map(day => ({
  day, get text() { return I18n.t('tool.jaundice.day' + day); }
}));


function getJaundiceDay() {
  const bd = safeGet('jaundice-birth-date', null);
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
  const birthDate = safeGet('jaundice-birth-date', null) || '';

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
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--ink-soft);margin-bottom:4px">${t('tool.jaundice.dayOfLife')}</div>
      <div class="jaundice-day-num">${day}</div>
      ${day > 21 ? `<div style="font-size:13px;color:var(--ink-soft);margin-top:4px">${t('tool.jaundice.resolvesByNow')}</div>` : ''}
    </div>
    <div class="callout gold" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.jaundice.dayWatch', { day })}</div>
      <p>${getJaundiceGuidance(day)}</p>
    </div>
    <div class="callout alert" role="alert" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.jaundice.callImmediatelyIf')}</div>
      <p>${t('tool.jaundice.redFlags')}</p>
    </div>` : `
    <div style="padding:24px 20px;text-align:center;color:var(--ink-soft)">${t('tool.jaundice.setBirthDateHint')}</div>`}
    <div style="height:16px"></div>`;
}

function setJaundiceBirthDate() {
  const val = document.getElementById('jaundice-birth-input').value;
  if (!val) return;
  safeSet('jaundice-birth-date', val);
  initJaundice();
  showToast(t('tool.jaundice.birthDateSaved'));
}

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
      <button onclick="deleteBP(${i})" style="background:none;border:none;color:var(--ink-soft);font-size:16px;cursor:pointer;padding:4px">×</button>
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
  });
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

function initMood() {
  const el = document.getElementById('mood-content');
  if (!el) return;
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

// ═══════════════════════════════════════════════════════
// 10. VISIT NOTES (APPOINTMENT NOTES)
// ═══════════════════════════════════════════════════════
let appointments = migrateAppointments(safeLoad('appt-notes', []));
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
  if (safeGet('appt-notes-v2', null) === '1') return list;
  const out = (list || []).map(a => {
    const t = a && a.type;
    return Object.assign({}, a, {
      type: Object.prototype.hasOwnProperty.call(APPT_TYPE_LEGACY, t) ? APPT_TYPE_LEGACY[t] : t
    });
  });
  safeSave('appt-notes', out);
  safeSet('appt-notes-v2', '1');
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
    el.innerHTML = `<p style="text-align:center;color:var(--ink-soft);font-size:13px;padding:20px 16px">${t('tool.appts.noVisits')}</p>`;
    return;
  }
  const sorted = [...appointments].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  el.innerHTML = sorted.map((appt, i) => {
    const d = appt.date ? new Date(appt.date + 'T12:00:00') : null;
    const month = d ? I18n.fmt.date(d, { month: 'short' }) : '–';
    const day = d ? I18n.fmt.num(d.getDate()) : '–';
    const preview = appt.questions ? appt.questions.slice(0, 60) + (appt.questions.length > 60 ? '…' : '') : t('tool.appts.noQuestionsAdded');
    return `
      <div class="appt-card" id="appt-card-${appt.id}">
        <button type="button" class="appt-card-header" aria-expanded="false"
                aria-controls="appt-body-${appt.id}" onclick="toggleApptCard('appt-card-${appt.id}', this)">
          <span class="appt-date-badge">
            <span class="adb-month">${month}</span>
            <span class="adb-day">${day}</span>
          </span>
          <span class="appt-info">
            <span class="appt-type-label">${escHtml(apptTypeLabel(appt.type))}</span>
            <span class="appt-preview">${escHtml(preview)}</span>
          </span>
          <svg class="appt-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="appt-body" id="appt-body-${appt.id}">
          <div class="appt-sub-label">${t('tool.appts.questionsToAsk')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.questions ? escHtml(appt.questions) : ('<span style="color:var(--ink-soft)">' + escHtml(t('tool.appts.noneAdded')) + '</span>')}</div>
          <div class="appt-sub-label" style="margin-top:14px">${t('tool.appts.notesFromVisit')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.notes ? escHtml(appt.notes) : ('<span style="color:var(--ink-soft)">' + escHtml(t('tool.appts.noneAdded')) + '</span>')}</div>
          <div class="btn-row" style="margin-top:14px;padding:0">
            <button class="btn-sm" onclick="openApptModal('${appt.id}')"
              style="background:var(--teal-faint);color:var(--teal)">${t('tool.appts.edit')}</button>
            <button class="btn-sm" onclick="deleteAppt('${appt.id}')"
              style="background:var(--danger-bg);color:var(--danger-ink)">${t('tool.appts.delete')}</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleApptCard(cardId, header) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.classList.toggle('open');
  if (header) header.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
}

function openApptModal(id) {
  _editApptId = id;
  const appt = id ? appointments.find(a => a.id === id) : null;
  document.getElementById('modal-appt-title').textContent =
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
  safeSave('appt-notes', appointments);
  closeModal('appt');
  initAppts();
  showToast(t(_editApptId ? 'tool.appts.visitUpdated' : 'tool.appts.visitAdded'));
  _editApptId = null;
}

function deleteAppt(id) {
  const at = appointments.findIndex(a => a.id === id);
  if (at < 0) return;
  const [gone] = appointments.splice(at, 1);
  safeSave('appt-notes', appointments);
  initAppts();
  deleteWithUndo(t('tool.appts.visitDeleted'), () => {
    appointments.splice(at, 0, gone);
    safeSave('appt-notes', appointments);
    initAppts();
  });
}

// ═══════════════════════════════════════════════════════
// TOOLS OVERVIEW INIT
// ═══════════════════════════════════════════════════════
TOOL_INITS['tools'] = function() {
  // Tools overview page is static HTML, no dynamic init needed
};
