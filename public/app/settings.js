// ═══════════════════════════════════════════════════════
// DARK MODE
// ═══════════════════════════════════════════════════════
function initDarkMode() {
  const saved = safeGet('dark-mode', null);
  if (saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  safeSet('dark-mode', isDark ? '1' : '0');
  updateThemeIcon();
  renderSettings();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="none"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  }
}

// ═══════════════════════════════════════════════════════
// DATA EXPORT
// ═══════════════════════════════════════════════════════
// Everything a user would be upset to lose. The two -v2 flags are included
// deliberately: they record that birth-plan and appt-notes have already been
// migrated to id-keyed form, and importing the migrated payload without them
// would run the migration a second time over already-migrated data.
//
// Device preferences (myob.lang, dark-mode) are here too, so a restore on a
// new phone lands in the right language rather than guessing again.
const EXPORT_KEYS = [
  'birth-guide-info', 'kick-history', 'contractions', 'feed-log',
  'diaper-log', 'jaundice-birth-date', 'bp-log', 'weight-log',
  'weight-profile', 'epds-history', 'birth-plan', 'birth-plan-notes', 'appt-notes',
  'nausea-log', 'nausea-snacks', 'nausea-week', 'nausea-tried',
  'myob.epdsLang', 'birth-plan-v2', 'appt-notes-v2',
  'myob.lang', 'dark-mode', 'myob.usNoticeSeen', 'myob.noticeAccepted',
  'obiana.dates', 'obiana.textSize',
];

// ═══════════════════════════════════════════════════════
// SETTINGS (Me): text size, language, dark mode
// ═══════════════════════════════════════════════════════
// Text size scales the reading area (#content) with CSS zoom, because the
// stylesheet sizes text in px. The class is set before first paint by
// core/theme.js, so a large-text reader never sees small text flash.
const TEXT_SIZE_KEY = 'obiana.textSize';

function setTextSize(n) {
  n = [1, 2, 3].includes(+n) ? +n : 1;
  safeSet(TEXT_SIZE_KEY, String(n));
  document.body.classList.remove('text-2', 'text-3');
  if (n > 1) document.body.classList.add('text-' + n);
  renderSettings();
}

function renderSettings() {
  const size = +(safeGet(TEXT_SIZE_KEY, '1')) || 1;
  document.querySelectorAll('.size-btn').forEach(b =>
    b.setAttribute('aria-pressed', String(+b.dataset.size === size)));
  const lang = document.getElementById('settings-lang');
  if (lang) lang.textContent = (I18n.LOCALES[I18n.lang] || {}).native || I18n.lang;
  const dark = document.getElementById('settings-dark');
  if (dark) dark.checked = document.body.classList.contains('dark');
}

document.addEventListener('click', e => {
  const size = e.target.closest && e.target.closest('.size-btn');
  if (size) setTextSize(size.dataset.size);
});
// On the button itself, so the header popover's outside-tap handler on
// document never sees this click and closes what it just opened.
document.getElementById('settings-lang')?.addEventListener('click', e => {
  e.stopPropagation();
  openLangPop();
});
document.addEventListener('change', e => {
  if (e.target && e.target.id === 'settings-dark') {
    if (e.target.checked !== document.body.classList.contains('dark')) toggleDarkMode();
  }
});

function exportData() {
  const keys = EXPORT_KEYS;
  const data = {};
  keys.forEach(k => {
    const v = safeGet(k, null);
    if (v !== null) {
      try { data[k] = JSON.parse(v); } catch (e) { data[k] = v; }
    }
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'obiana-' + isoDate(Date.now()) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(I18n.t('toast.dataExported'));
}

// There was no way back in: data could leave the app but never return, so a
// new phone meant retyping everything.
function importData(file) {
  const reader = new FileReader();
  reader.onerror = () => showToast(I18n.t('toast.importFailed'));
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); }
    catch (e) { showToast(I18n.t('toast.importFailed')); return; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      showToast(I18n.t('toast.importFailed')); return;
    }
    // Only known keys. An arbitrary file must not be able to write whatever it
    // likes into this origin's storage.
    const found = EXPORT_KEYS.filter(k => k in data);
    if (!found.length) { showToast(I18n.t('toast.importNothing')); return; }
    if (!confirm(I18n.t('myinfo.importConfirm', { n: I18n.fmt.num(found.length) }))) return;

    let written = 0;
    found.forEach(k => {
      const v = data[k];
      const ok = typeof v === 'string' ? safeSet(k, v) : safeSave(k, v);
      if (ok) written++;
    });
    if (!written) { showToast(I18n.t('toast.importFailed')); return; }
    // Reload rather than patch: ten trackers read their history into module
    // scope at parse time, so their in-memory copies are now wrong.
    showToast(I18n.t('toast.importDone'));
    setTimeout(() => location.reload(), 900);
  };
  reader.readAsText(file);
}

function handleImportFile(input) {
  const file = input.files && input.files[0];
  input.value = '';                 // so the same file can be picked twice
  if (file) importData(file);
}
