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
              font-size="6" fill="var(--ink-soft)">${h}</text>`;
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
    ${renderSnackClock()}`;

  el.querySelectorAll('.snack-wedge').forEach(w => {
    const h = +w.dataset.hour;
    w.addEventListener('click', () => toggleSnackHour(h));
    w.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSnackHour(h); }
    });
  });
}
