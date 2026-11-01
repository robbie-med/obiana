// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
// ─── Destructive actions ────────────────────────────────
// One policy, replacing three flows that used confirm() and five that deleted
// silently with no way back:
//
//   a single row you can put back  -> delete immediately, offer Undo
//   clearing everything at once    -> confirm() first, because undo of a
//                                     whole log is not worth the complexity
//
// Undo beats a confirm dialog for the high-frequency taps: nobody wants a
// modal every time they remove a mistyped diaper entry, but everybody wants
// the mistake to be recoverable.
let _undoAction = null;
let _undoTimer = null;

function deleteWithUndo(message, undoFn) {
  _undoAction = undoFn;
  clearTimeout(_undoTimer);
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = '';
  t.appendChild(document.createTextNode(message + ' '));
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'toast-undo';
  btn.textContent = I18n.t('common.undo');
  btn.onclick = () => {
    if (_undoAction) _undoAction();
    _undoAction = null;
    clearTimeout(_undoTimer);
    t.classList.remove('show');
    t.style.pointerEvents = '';
  };
  t.appendChild(btn);
  t.classList.add('show');
  t.style.pointerEvents = 'auto';        // the toast is interactive while an undo is live
  _undoTimer = setTimeout(() => {
    t.classList.remove('show');
    t.style.pointerEvents = '';
    _undoAction = null;
  }, 6000);
}

// The timer handle is kept because two toasts can overlap: a second message
// fired while the first is still up used to inherit the first one's timer,
// which then hid the second message early.
let _toastTimer = null;
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;                  // drops any Undo button from a previous toast
  t.style.pointerEvents = '';
  _undoAction = null;
  clearTimeout(_undoTimer);
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}
