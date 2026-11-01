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
