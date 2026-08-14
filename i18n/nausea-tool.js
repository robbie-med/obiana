// ═══════════════════════════════════════════════════════
// NAUSEA & EATING
// ═══════════════════════════════════════════════════════
// Nausea in early pregnancy is driven far more by an empty stomach than by
// what is eaten, so the centrepiece is a 24-hour clock showing WHEN she ate
// and, more usefully, where the long gaps are.
//
// Every string is keyed. The clock is computed geometry, not artwork: wedge
// paths are generated from the hour, so it needs no image and no text baked
// into an SVG.

const NAUSEA_LOG_KEY   = 'nausea-log';      // symptom + intervention entries
const NAUSEA_SNACK_KEY = 'nausea-snacks';   // { 'YYYY-MM-DD': [hour, ...] }

let nauseaSnacks = {};
let nauseaLog = [];
try { nauseaSnacks = JSON.parse(localStorage.getItem(NAUSEA_SNACK_KEY) || '{}'); } catch (e) {}
try { nauseaLog = JSON.parse(localStorage.getItem(NAUSEA_LOG_KEY) || '[]'); } catch (e) {}

TOOL_INITS['tool-nausea'] = initNausea;
TOOL_INITS['tool-nausealog'] = initNauseaLog;

// Local calendar day, not UTC: a snack at 11pm belongs to today.
function nauseaToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function snacksForToday() {
  const v = nauseaSnacks[nauseaToday()];
  return Array.isArray(v) ? v.slice().sort((a, b) => a - b) : [];
}

function saveSnacks() {
  // Keep a fortnight; this is a "how am I doing today" tool, not an archive.
  const keys = Object.keys(nauseaSnacks).sort();
  while (keys.length > 14) delete nauseaSnacks[keys.shift()];
  try { localStorage.setItem(NAUSEA_SNACK_KEY, JSON.stringify(nauseaSnacks)); } catch (e) {}
}

function toggleSnackHour(h) {
  const day = nauseaToday();
  const list = Array.isArray(nauseaSnacks[day]) ? nauseaSnacks[day] : [];
  const i = list.indexOf(h);
  if (i >= 0) list.splice(i, 1); else list.push(h);
  nauseaSnacks[day] = list;
  saveSnacks();
  initNausea();
}

// ─── The clock ──────────────────────────────────────────
// One wedge per hour, midnight at the top, clockwise. Returns an SVG path for
// the hour's wedge as an annulus segment.
function hourWedgePath(hour, rOuter, rInner) {
  const per = (Math.PI * 2) / 24;
  // -90deg puts hour 0 at the top; a hair of padding separates the wedges.
  const pad = per * 0.06;
  const a0 = hour * per - Math.PI / 2 + pad;
  const a1 = (hour + 1) * per - Math.PI / 2 - pad;
  const p = (r, a) => [(50 + r * Math.cos(a)).toFixed(2), (50 + r * Math.sin(a)).toFixed(2)];
  const [x0, y0] = p(rOuter, a0), [x1, y1] = p(rOuter, a1);
  const [x2, y2] = p(rInner, a1), [x3, y3] = p(rInner, a0);
  return `M${x0} ${y0} A${rOuter} ${rOuter} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${rInner} ${rInner} 0 0 0 ${x3} ${y3} Z`;
}

// The number that actually matters: the longest stretch with nothing eaten.
//
// Deliberately ignores the window before the first snack of the day. That
// stretch is mostly sleep, and telling someone who ate well all day that she
// had an 8-hour gap at breakfast is both wrong and discouraging. What counts
// is the gaps BETWEEN snacks, and how long it has been since the last one.
function longestGap(snacks, nowHour) {
  if (!snacks.length) {
    // Nothing yet today. Only meaningful once she has been up a while.
    return { hours: Math.max(0, nowHour - 6), from: 6, noneYet: true };
  }
  let worst = { hours: 0, from: snacks[0] };
  for (let i = 1; i < snacks.length; i++) {
    const gap = snacks[i] - snacks[i - 1] - 1;
    if (gap > worst.hours) worst = { hours: gap, from: snacks[i - 1] + 1 };
  }
  const since = nowHour - snacks[snacks.length - 1];
  if (since > worst.hours) worst = { hours: since, from: snacks[snacks.length - 1] + 1 };
  return worst;
}


// ─── Gestational week ───────────────────────────────────
// Needed for the reassurance timeline. Tried in order of reliability: the
// weight tracker stores a real integer, the My Info due date is free text in
// 17 languages and only sometimes parses, and failing both she is asked.
const NAUSEA_WEEK_KEY = 'nausea-week';

function currentWeek() {
  try {
    const own = localStorage.getItem(NAUSEA_WEEK_KEY);
    if (own) return { week: +own, source: 'asked' };
  } catch (e) {}

  try {
    const wl = JSON.parse(localStorage.getItem('weight-log') || '[]');
    if (wl.length) {
      const latest = wl.slice().sort((a, b) => b.ts - a.ts)[0];
      if (latest && latest.week > 0) {
        // Advance it by however long ago that entry was.
        const weeksSince = Math.floor((Date.now() - latest.ts) / 6048e5);
        const w = latest.week + weeksSince;
        if (w >= 1 && w <= 45) return { week: w, source: 'weight' };
      }
    }
  } catch (e) {}

  try {
    const info = JSON.parse(localStorage.getItem('birth-guide-info') || '{}');
    const t = Date.parse(info.edd || '');
    if (!isNaN(t)) {
      const w = 40 - Math.round((t - Date.now()) / 6048e5);
      if (w >= 1 && w <= 45) return { week: w, source: 'edd' };
    }
  } catch (e) {}

  return { week: null, source: null };
}

function setNauseaWeek(v) {
  const w = parseInt(v, 10);
  if (!(w >= 1 && w <= 45)) return;
  try { localStorage.setItem(NAUSEA_WEEK_KEY, String(w)); } catch (e) {}
  initNausea();
}

// ─── Reassurance timeline ───────────────────────────────
// Nausea typically starts around week 6, peaks around 9 to 10, and has
// resolved for roughly 60% by week 12 and 90% by week 22. Showing her own
// position on that arc is the reassurance; a bare statistic is not.
const NAUSEA_START = 4, NAUSEA_END = 22;

function renderTimeline() {
  const { week, source } = currentWeek();

  if (!week) {
    return `
      <div class="callout" style="margin:12px 16px">
        <div class="callout-title">${escHtml(I18n.t('tool.nausea.whenAreYou'))}</div>
        <p style="margin-bottom:8px">${escHtml(I18n.t('tool.nausea.weekPrompt'))}</p>
        <div style="display:flex;gap:8px;align-items:center">
          <input class="tool-input" id="nausea-week" type="number" min="1" max="45"
                 inputmode="numeric" style="flex:1"
                 placeholder="${escHtml(I18n.t('tool.nausea.weekPlaceholder'))}">
          <button class="btn-sm btn-teal" id="nausea-week-set">${escHtml(I18n.t('tool.jaundice.set'))}</button>
        </div>
      </div>`;
  }

  const pct = Math.max(0, Math.min(100,
    ((week - NAUSEA_START) / (NAUSEA_END - NAUSEA_START)) * 100));

  let msgKey;
  if (week < 6) msgKey = 'phaseEarly';
  else if (week <= 10) msgKey = 'phasePeak';
  else if (week <= 14) msgKey = 'phaseEasing';
  else if (week <= 22) msgKey = 'phaseMost';
  else msgKey = 'phaseLate';

  return `
    <div style="padding:14px 16px 4px">
      <div class="nausea-track" role="img"
           aria-label="${escHtml(I18n.t('tool.nausea.timelineLabel', { week }))}">
        <div class="nausea-track-fill" style="width:${pct}%"></div>
        <div class="nausea-track-dot" style="inset-inline-start:${pct}%"></div>
      </div>
      <div class="nausea-track-marks">
        <span>${escHtml(I18n.t('tool.nausea.weekShort', { n: 6 }))}</span>
        <span>${escHtml(I18n.t('tool.nausea.weekShort', { n: 12 }))}</span>
        <span>${escHtml(I18n.t('tool.nausea.weekShort', { n: 22 }))}</span>
      </div>
      <p style="font-size:14px;color:var(--ink);line-height:1.6;margin-top:12px">
        <strong>${escHtml(I18n.t('tool.nausea.youAreWeek', { week }))}</strong>
        ${escHtml(I18n.t('tool.nausea.' + msgKey))}
      </p>
      <button class="btn-sm" id="nausea-week-edit"
        style="background:none;border:none;color:var(--teal);padding:2px 0;font-size:12px;text-decoration:underline">
        ${escHtml(I18n.t('tool.nausea.changeWeek'))}
      </button>
    </div>`;
}

// ─── Red flags ──────────────────────────────────────────
// Hyperemesis gravidarum. Placed high rather than buried at the bottom: the
// danger is dehydration, it is treatable, and the whole point is that she
// recognises it early.
function renderRedFlags() {
  const items = ['noFluids', 'vomitingOften', 'weightLoss', 'darkUrine', 'dizzy', 'racingHeart'];
  return `
    <div class="callout alert" style="margin:14px 16px;text-align:start">
      <div class="callout-title">${escHtml(I18n.t('tool.nausea.callTodayTitle'))}</div>
      <ul style="margin:6px 0 8px;padding-inline-start:18px">
        ${items.map(k => `<li>${escHtml(I18n.t('tool.nausea.flag.' + k))}</li>`).join('')}
      </ul>
      <p>${escHtml(I18n.t('tool.nausea.callTodayBody'))}</p>
    </div>`;
}


// ─── Strategies ─────────────────────────────────────────
// Ordered roughly by evidence and by what ACOG suggests trying first. Ids are
// stable and stored; labels come from the catalog, so a saved log entry still
// reads correctly after switching language.
const NAUSEA_STRATEGIES = [
  'empty',      // avoid an empty stomach
  'bland',      // dry, bland, cold foods
  'fluids',     // sip fluids between meals rather than with them
  'triggers',   // avoid personal smell and food triggers
  'b6',         // vitamin B6
  'ginger',     // ginger
  'acupressure',// P6 wristband or pressure
  'vitamin',    // move the prenatal vitamin, or switch it
  'rest',       // rest, get up slowly
  'doxylamine', // B6 plus doxylamine, discuss with clinician
];

const NAUSEA_TRIED_KEY = 'nausea-tried';
let nauseaTried = [];
try { nauseaTried = JSON.parse(localStorage.getItem(NAUSEA_TRIED_KEY) || '[]'); } catch (e) {}

function toggleTried(id) {
  const i = nauseaTried.indexOf(id);
  if (i >= 0) nauseaTried.splice(i, 1); else nauseaTried.push(id);
  try { localStorage.setItem(NAUSEA_TRIED_KEY, JSON.stringify(nauseaTried)); } catch (e) {}
  initNausea();
}

function renderStrategies() {
  const untried = NAUSEA_STRATEGIES.filter(id => !nauseaTried.includes(id));
  const next = untried[0];

  return `
    <div style="padding:6px 16px 0">
      <div class="form-label" style="padding:0 0 6px">${escHtml(I18n.t('tool.nausea.thingsToTry'))}</div>
      ${next ? `<p style="font-size:12.5px;color:var(--ink-soft);line-height:1.5;margin-bottom:10px">
        ${escHtml(I18n.t('tool.nausea.tryNext', { thing: I18n.t('tool.nausea.strat.' + next + '.name') }))}
      </p>` : `<p style="font-size:12.5px;color:var(--ink-soft);margin-bottom:10px">
        ${escHtml(I18n.t('tool.nausea.triedAll'))}</p>`}
      <div style="display:flex;flex-direction:column;gap:8px">
        ${NAUSEA_STRATEGIES.map(id => {
          const on = nauseaTried.includes(id);
          return `<button type="button" class="nausea-strat${on ? ' tried' : ''}" data-strat="${id}"
                    aria-pressed="${on}">
                    <span class="nausea-strat-check" aria-hidden="true">${on ? '✓' : ''}</span>
                    <span>
                      <span class="nausea-strat-name">${escHtml(I18n.t('tool.nausea.strat.' + id + '.name'))}</span>
                      <span class="nausea-strat-how">${escHtml(I18n.t('tool.nausea.strat.' + id + '.how'))}</span>
                    </span>
                  </button>`;
        }).join('')}
      </div>
      <p style="font-size:11.5px;color:var(--ink-soft);line-height:1.5;margin-top:10px">
        ${escHtml(I18n.t('tool.nausea.stratNote'))}
      </p>
    </div>`;
}

// ─── Symptom and intervention log ───────────────────────
// The point is not a chart. It is answering "does this actually help ME",
// which averages across women cannot answer.
function saveNauseaLog() {
  nauseaLog = nauseaLog.slice(0, 200);
  try { localStorage.setItem(NAUSEA_LOG_KEY, JSON.stringify(nauseaLog)); } catch (e) {}
}

function addNauseaEntry(level, strat) {
  nauseaLog.unshift({ ts: Date.now(), level, strat: strat || null });
  saveNauseaLog();
  initNauseaLog();
  showToast(I18n.t('tool.nausea.logged'));
}

function deleteNauseaEntry(ts) {
  nauseaLog = nauseaLog.filter(e => e.ts !== ts);
  saveNauseaLog();
  initNauseaLog();
}

// Average nausea level after each strategy, worst first. Needs at least two
// entries before it says anything: one data point is not a finding.
function strategyEffect() {
  const by = {};
  nauseaLog.forEach(e => {
    if (!e.strat) return;
    (by[e.strat] ||= []).push(e.level);
  });
  return Object.entries(by)
    .filter(([, v]) => v.length >= 2)
    .map(([id, v]) => ({ id, n: v.length, avg: v.reduce((a, b) => a + b, 0) / v.length }))
    .sort((a, b) => a.avg - b.avg);
}

function renderQuickLog() {
  // Kept near the top on purpose. Rating the nausea is the thing she does
  // most often, and burying it under the strategy list meant scrolling the
  // whole page every time.
  const LEVELS = [1, 2, 3, 4];
  return `
    <div class="card nausea-quick">
      <div class="form-label" style="padding:0 0 8px">${escHtml(I18n.t('tool.nausea.howIsItNow'))}</div>
      <div class="btn-row" style="margin-bottom:8px">
        ${LEVELS.map(n => `<button class="btn-sm nausea-level" data-level="${n}" style="flex:1">
            ${escHtml(I18n.t('tool.nausea.level' + n))}</button>`).join('')}
      </div>
      <select class="tool-select" id="nausea-log-strat" style="width:100%">
        <option value="">${escHtml(I18n.t('tool.nausea.didYouTry'))}</option>
        ${NAUSEA_STRATEGIES.map(id =>
          `<option value="${id}">${escHtml(I18n.t('tool.nausea.strat.' + id + '.name'))}</option>`).join('')}
      </select>
    </div>`;
}

function renderLogHistory() {
  const effect = strategyEffect();
  if (!effect.length && !nauseaLog.length) {
    return `<p class="history-empty" style="margin:14px 16px">${escHtml(I18n.t('tool.nausea.noEntries'))}</p>`;
  }
  return `
    <div style="padding:14px 16px 0">
      ${effect.length ? `
        <div class="callout" style="margin:0;text-align:start">
          <div class="callout-title">${escHtml(I18n.t('tool.nausea.whatHelpsYou'))}</div>
          ${effect.map(e => `<div style="display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:3px 0">
              <span>${escHtml(I18n.t('tool.nausea.strat.' + e.id + '.name'))}</span>
              <span style="color:var(--ink-soft);white-space:nowrap">
                ${escHtml(I18n.t('tool.nausea.avgAfter', { avg: I18n.fmt.num(e.avg, { minimumFractionDigits: 1, maximumFractionDigits: 1 }), n: I18n.fmt.num(e.n) }))}
              </span>
            </div>`).join('')}
          <p style="margin-top:6px">${escHtml(I18n.t('tool.nausea.lowerIsBetter'))}</p>
        </div>` : ''}

      ${nauseaLog.length ? `
        <div class="history-section-title" style="margin-top:${effect.length ? 14 : 0}px">${escHtml(I18n.t('tool.nausea.recent'))}</div>
        ${nauseaLog.slice(0, 10).map(e => `
          <div class="history-row">
            <div>
              <div style="font-weight:600;font-size:13px">${escHtml(I18n.t('tool.nausea.level' + e.level))}</div>
              <div style="font-size:11.5px;color:var(--ink-soft)">
                ${escHtml(I18n.fmt.dateTime(e.ts))}${e.strat
                  ? ' · ' + escHtml(I18n.t('tool.nausea.strat.' + e.strat + '.name')) : ''}
              </div>
            </div>
            <button class="btn-sm" data-del="${e.ts}"
              style="background:none;border:none;color:var(--rose);font-size:11.5px;text-decoration:underline">
              ${escHtml(I18n.t('tool.appts.delete'))}
            </button>
          </div>`).join('')}` : ''}
    </div>`;
}


// ─── Acupressure ────────────────────────────────────────
// Text only, deliberately. A diagram with baked-in labels cannot be
// translated, and a described location the reader finds on her own arm is more
// reliable than a picture she has to map onto herself anyway.
function renderAcupressure() {
  const steps = ['find', 'measure', 'feel', 'press', 'both'];
  return `
    <div style="padding:14px 16px 0">
      <div class="form-label" style="padding:0 0 6px">${escHtml(I18n.t('tool.nausea.acuTitle'))}</div>
      <p style="font-size:12.5px;color:var(--ink-soft);line-height:1.55;margin-bottom:10px">
        ${escHtml(I18n.t('tool.nausea.acuIntro'))}
      </p>
      <ol style="margin:0;padding-inline-start:20px;font-size:13.5px;line-height:1.7;color:var(--ink)">
        ${steps.map(k => `<li style="margin-bottom:6px">${escHtml(I18n.t('tool.nausea.acu.' + k))}</li>`).join('')}
      </ol>
      <p style="font-size:12.5px;color:var(--ink-soft);line-height:1.55;margin-top:10px">
        ${escHtml(I18n.t('tool.nausea.acuBands'))}
      </p>
    </div>`;
}

function renderSnackClock() {
  const snacks = snacksForToday();
  const nowHour = new Date().getHours();
  const eaten = new Set(snacks);

  const wedges = Array.from({ length: 24 }, (_, h) => {
    const has = eaten.has(h);
    const future = h > nowHour;
    const fill = has ? 'var(--teal)' : (future ? 'var(--rule)' : 'var(--rose-light)');
    const op = future && !has ? 0.45 : 1;
    return `<path d="${hourWedgePath(h, 46, 30)}" fill="${fill}" opacity="${op}"
              class="snack-wedge" data-hour="${h}" role="button" tabindex="0"
              aria-label="${escHtml(I18n.t('tool.nausea.hourLabel', { hour: h }))}"></path>`;
  }).join('');

  // Only 0/6/12/18 are labelled; 24 numbers around a phone-sized dial is noise.
  const ticks = [0, 6, 12, 18].map(h => {
    const a = h * (Math.PI * 2) / 24 - Math.PI / 2 + (Math.PI * 2) / 48;
    const x = (50 + 22 * Math.cos(a)).toFixed(1);
    const y = (50 + 22 * Math.sin(a)).toFixed(1);
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central"
              font-size="6" fill="var(--ink-soft)">${I18n.fmt.num(h)}</text>`;
  }).join('');

  const gap = longestGap(snacks, nowHour);
  const gapWarn = gap.hours >= 4;

  return `
    <div style="text-align:center;padding:4px 16px 0">
      <svg viewBox="0 0 100 100" class="snack-clock" role="group"
           aria-label="${escHtml(I18n.t('tool.nausea.clockLabel'))}">
        ${wedges}
        ${ticks}
        <text x="50" y="47" text-anchor="middle" font-size="13" font-weight="700"
              fill="var(--ink)">${snacks.length}</text>
        <text x="50" y="57" text-anchor="middle" font-size="5.5"
              fill="var(--ink-soft)">${escHtml(I18n.t('tool.nausea.snacksToday'))}</text>
      </svg>
      <p style="font-size:12.5px;color:var(--ink-soft);margin-top:2px">
        ${escHtml(I18n.t('tool.nausea.tapHour'))}
      </p>
      <div class="callout ${gapWarn ? 'gold' : ''}" style="margin:12px 0 4px;text-align:start">
        <div class="callout-title">${escHtml(I18n.t('tool.nausea.longestGap'))}</div>
        <p>${escHtml(gapWarn
              ? I18n.t('tool.nausea.gapLong', { hours: gap.hours })
              : I18n.t('tool.nausea.gapOk', { hours: gap.hours }))}</p>
      </div>
    </div>`;
}

function initNausea() {
  const el = document.getElementById('nausea-content');
  if (!el) return;

  el.innerHTML = `
    <div style="padding:12px 16px 0">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6">
        ${escHtml(I18n.t('tool.nausea.intro'))}
      </p>
    </div>
    ${renderTimeline()}
    ${renderSnackClock()}
    ${renderRedFlags()}
    ${renderStrategies()}
    ${renderAcupressure()}
    <div style="padding:16px">
      <button class="big-action-btn btn-plum" onclick="navigate('tool-nausealog')">
        ${escHtml(I18n.t('tool.nausea.openLog'))}
      </button>
    </div>
    <div style="height:20px"></div>`;

  el.querySelectorAll('[data-strat]').forEach(b =>
    b.addEventListener('click', () => toggleTried(b.dataset.strat)));



  const setBtn = document.getElementById('nausea-week-set');
  if (setBtn) setBtn.addEventListener('click', () =>
    setNauseaWeek(document.getElementById('nausea-week').value));
  const editBtn = document.getElementById('nausea-week-edit');
  if (editBtn) editBtn.addEventListener('click', () => {
    try { localStorage.removeItem(NAUSEA_WEEK_KEY); } catch (e) {}
    initNausea();
  });

  el.querySelectorAll('.snack-wedge').forEach(w => {
    const h = +w.dataset.hour;
    w.addEventListener('click', () => toggleSnackHour(h));
    w.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSnackHour(h); }
    });
  });
}


// ═══════════════════════════════════════════════════════
// NAUSEA LOG
// ═══════════════════════════════════════════════════════
// Separate tool. Rating the nausea is something she does repeatedly through
// the day; the education tool is something she reads once. Sharing a page made
// the quick action expensive to reach.
function initNauseaLog() {
  const el = document.getElementById('nausealog-content');
  if (!el) return;

  el.innerHTML = `
    <div style="padding:12px 16px 0">
      <p style="font-size:13px;color:var(--ink-soft);line-height:1.55">
        ${escHtml(I18n.t('tool.nausea.logIntro'))}
      </p>
    </div>
    ${renderQuickLog()}
    ${renderLogHistory()}
    <div style="padding:16px">
      <button class="big-action-btn" style="background:var(--white);color:var(--teal);border:1.5px solid var(--rule)"
        onclick="navigate('tool-nausea')">
        ${escHtml(I18n.t('tool.nausea.openHelp'))}
      </button>
    </div>
    <div style="height:20px"></div>`;

  el.querySelectorAll('.nausea-level').forEach(b =>
    b.addEventListener('click', () => addNauseaEntry(
      +b.dataset.level, document.getElementById('nausea-log-strat').value)));

  el.querySelectorAll('[data-del]').forEach(b =>
    b.addEventListener('click', () => deleteNauseaEntry(+b.dataset.del)));
}
