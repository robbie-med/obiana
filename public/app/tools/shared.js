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
// TOOLS OVERVIEW INIT
// ═══════════════════════════════════════════════════════
TOOL_INITS['tools'] = function() {
  // Tools overview page is static HTML, no dynamic init needed
};
