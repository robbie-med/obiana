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
  'myob.lang', 'dark-mode', 'myob.usNoticeSeen',
];

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
  a.download = 'birth-guide-' + new Date().toISOString().split('T')[0] + '.json';
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
