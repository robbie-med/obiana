// ═══════════════════════════════════════════════════════
// HER DATES: due date or baby's birthday, and where she is now
// ═══════════════════════════════════════════════════════
// Stored as ISO dates (YYYY-MM-DD), never as display text, so they survive a
// language change. The My Info "due date" field is free text in 17 languages
// and stays as it is; it is only used once, to pre-fill this if it parses.
const DATES_KEY = 'obiana.dates';

function getDates() { return safeLoad(DATES_KEY, {}); }

function setDates(patch) {
  const d = Object.assign(getDates(), patch);
  Object.keys(d).forEach(k => { if (d[k] === '' || d[k] == null) delete d[k]; });
  return safeSave(DATES_KEY, d);
}

function isoDate(ms) {
  const x = new Date(ms);
  return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
}

// Local midnight of an ISO date, or null.
function parseIsoDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : null;
}

function todayMidnight() {
  const n = new Date(Date.now());
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
}

// Once only: if My Info already holds a due date that parses, start from it.
function seedDatesFromMyInfo() {
  const d = getDates();
  if (d.edd || d.born || d.seeded) return;
  const info = safeLoad('birth-guide-info', {});
  const t = Date.parse(info.edd || '');
  const patch = { seeded: true };
  if (!isNaN(t)) patch.edd = isoDate(t);
  setDates(patch);
}

// { stage: 'pregnant', week, day, edd } | { stage: 'baby', days, born } | { stage: null }
// A birth date wins over a due date: once the baby is here, that is the stage.
function stageNow() {
  const d = getDates();
  const today = todayMidnight();
  const born = parseIsoDate(d.born);
  if (born !== null) {
    const days = Math.round((today - born) / 864e5);
    if (days >= 0 && days <= 400) return { stage: 'baby', days, born };
  }
  const edd = parseIsoDate(d.edd);
  if (edd !== null) {
    const gaDays = 280 - Math.round((edd - today) / 864e5);
    if (gaDays >= 0 && gaDays <= 44 * 7) return { stage: 'pregnant', week: Math.floor(gaDays / 7), day: gaDays % 7, edd };
  }
  return { stage: null };
}
