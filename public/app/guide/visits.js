// ═══════════════════════════════════════════════════════
// VISITS, WEEK BY WEEK
// ═══════════════════════════════════════════════════════
// The schedule of US prenatal and postpartum care as data, so Today can show
// the visits that matter this week and the Guide can show all of them.
// Text lives in ui.visits.<id> (when, title, i1…); `items` says how many.
// Pregnancy rows are keyed on gestational weeks, postpartum rows on days.
// `choice` marks a row whose tests are hers to accept or decline.
const VISITS = [
  { id: 'first',     from: 6,  to: 12, items: 4 },
  { id: 'genetic',   from: 10, to: 20, items: 3, choice: true },
  { id: 'monthly',   from: 12, to: 27, items: 1 },
  { id: 'anatomy',   from: 18, to: 22, items: 1 },
  { id: 'sugar',     from: 24, to: 28, items: 3 },
  { id: 'tdap',      from: 27, to: 36, items: 1 },
  { id: 'twoweekly', from: 28, to: 35, items: 2 },
  { id: 'rsv',       from: 32, to: 36, items: 1, choice: true },
  { id: 'gbs',       from: 36, to: 37, items: 3 },
  { id: 'weekly',    from: 36, to: 42, items: 2 },
  { id: 'ppBp',      ppFrom: 0,  ppTo: 14, items: 1 },
  { id: 'pp3',       ppFrom: 0,  ppTo: 21, items: 1 },
  { id: 'ppFull',    ppFrom: 14, ppTo: 84, items: 3 },
];

// Rows for where she is now: everything current, plus the next one coming.
function visitsNow(s) {
  if (s.stage === 'pregnant') {
    const now = VISITS.filter(v => v.from !== undefined && v.from <= s.week && s.week <= v.to);
    const next = VISITS.find(v => v.from !== undefined && v.from > s.week);
    return { now, next: next || null };
  }
  if (s.stage === 'baby') {
    const now = VISITS.filter(v => v.ppFrom !== undefined && v.ppFrom <= s.days && s.days <= v.ppTo);
    return { now, next: null };
  }
  return { now: [], next: null };
}

function visitRowHtml(v) {
  const items = [];
  for (let i = 1; i <= v.items; i++) items.push(`<li>${tl('visits.' + v.id + '.i' + i)}</li>`);
  return `<div class="visit-row${v.choice ? ' is-choice' : ''}">
    <div class="visit-when">${tl('visits.' + v.id + '.when')}</div>
    <div class="visit-title">${tl('visits.' + v.id + '.title')}${v.choice ? ` <span class="choice-badge">${tl('visits.yourChoice')}</span>` : ''}</div>
    <ul class="visit-items">${items.join('')}</ul>
  </div>`;
}

// The whole schedule, for the Guide.
function visitsTimelineHtml() {
  const preg = VISITS.filter(v => v.from !== undefined);
  const pp = VISITS.filter(v => v.ppFrom !== undefined);
  return `<p class="lead">${tl('visits.lead')}</p>
    <div class="visit-list">${preg.map(visitRowHtml).join('')}</div>
    <h3>${tl('visits.afterBirth')}</h3>
    <div class="visit-list">${pp.map(visitRowHtml).join('')}</div>`;
}

// Plain text of every row, for search (plain t(): no lang/dir markup).
function visitsSearchText() {
  return VISITS.map(v => {
    const parts = [t('visits.' + v.id + '.when'), t('visits.' + v.id + '.title')];
    for (let i = 1; i <= v.items; i++) parts.push(t('visits.' + v.id + '.i' + i));
    return parts.join(' ');
  }).join(' ');
}
