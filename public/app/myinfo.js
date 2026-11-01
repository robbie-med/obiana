// ═══════════════════════════════════════════════════════
// CONTACTS & DETAILS CONFIG
// ═══════════════════════════════════════════════════════
// Structure only — labels/placeholders come from i18n (ui.myinfo.*).
const CONTACTS = [
  { id: "familydoc",  hasName: true,  hasPhone: true },
  { id: "ob",         hasName: true,  hasPhone: true },
  { id: "peds",       hasName: true,  hasPhone: true },
  { id: "mfm",        hasName: true,  hasPhone: true },
  { id: "lactation",  hasName: true,  hasPhone: true },
  { id: "ld",         hasName: false, hasPhone: true },
  { id: "pharmacy",   hasName: true,  hasPhone: true },
];

// The due date is not here: it lives in "Your dates" (obiana.dates, a real
// date field) so Today, the Guide and Me all read the same one.
const DETAILS = [
  { id: "bloodtype", type: "text" },
  { id: "gbs",       type: "text" },
  { id: "allergies", type: "text" },
  { id: "insurance", type: "text" },
];

// ═══════════════════════════════════════════════════════
// MY INFO — RENDER FORM
// ═══════════════════════════════════════════════════════
function renderMyInfo() {
  const saved = safeLoad('birth-guide-info', {});

  // Contacts
  const cForm = document.getElementById('contacts-form');
  cForm.innerHTML = '';   // idempotent: re-rendered on every locale change
  CONTACTS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const nameVal = saved[c.id + '_name'] || '';
    const phoneVal = saved[c.id + '_phone'] || '';

    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.contact.' + c.id))}</div>
      <div class="contact-fields">
        ${c.hasName ? `<input class="contact-input" id="ci_${c.id}_name" type="text" placeholder="${escHtml(I18n.t('myinfo.namePlaceholder'))}" value="${escHtml(nameVal)}">` : ''}
        <div class="contact-field-wrap">
          <input class="contact-input" id="ci_${c.id}_phone" type="tel" placeholder="${escHtml(I18n.t('myinfo.phonePlaceholder'))}" value="${escHtml(phoneVal)}" inputmode="tel">
          <button class="action-btn call-btn" onclick="callContact('${c.id}')" title="${escHtml(I18n.t('myinfo.call'))}" aria-label="${escHtml(I18n.t('myinfo.callContact', { name: I18n.t('myinfo.contact.' + c.id) }))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </button>
          <button class="action-btn text-btn" onclick="textContact('${c.id}')" title="${escHtml(I18n.t('myinfo.text'))}" aria-label="${escHtml(I18n.t('myinfo.textContact', { name: I18n.t('myinfo.contact.' + c.id) }))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
        </div>
      </div>`;

    // Update buttons when phone changes
    const phoneInput = row.querySelector(`#ci_${c.id}_phone`);
    const callBtn = row.querySelector('.call-btn');
    const textBtn = row.querySelector('.text-btn');
    phoneInput.addEventListener('input', () => {
      const has = !!phoneInput.value.trim();
      callBtn.disabled = !has;
      textBtn.disabled = !has;
    });

    cForm.appendChild(row);
  });

  // Details
  const dForm = document.getElementById('details-form');
  dForm.innerHTML = '';
  DETAILS.forEach(d => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const val = saved[d.id] || '';
    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.detail.' + d.id + '.label'))}</div>
      <input class="contact-input" id="di_${d.id}" type="${d.type}" placeholder="${escHtml(I18n.t('myinfo.detail.' + d.id + '.placeholder'))}" value="${escHtml(val)}">`;
    dForm.appendChild(row);
  });

  refreshMeDates();
  if (typeof renderSettings === 'function') renderSettings();

  // Notes
  document.getElementById('notes-field').value = saved['notes'] || '';
}

// ─── Your dates ─────────────────────────────────────────
// One store (obiana.dates) for Today, the Guide and Me. The fields are read
// fresh every time Me opens and saved the moment they change, so a date set on
// Today shows here, and a stale field can never be written back over it.
function refreshMeDates() {
  const d = getDates();
  const eddEl = document.getElementById('me-edd'), bornEl = document.getElementById('me-born');
  if (eddEl && document.activeElement !== eddEl) eddEl.value = d.edd || '';
  if (bornEl && document.activeElement !== bornEl) bornEl.value = d.born || '';
}

document.addEventListener('change', e => {
  const id = e.target && e.target.id;
  if (id !== 'me-edd' && id !== 'me-born') return;
  const ok = setDates(id === 'me-edd' ? { edd: e.target.value } : { born: e.target.value });
  showToast(I18n.t(ok ? 'myinfo.saved' : 'toast.notSaved'));
  renderToday();
});

function escHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function callContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'tel:' + phone;
}

function textContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'sms:' + phone;
}

function saveInfo() {
  const data = {};
  CONTACTS.forEach(c => {
    const n = document.getElementById('ci_' + c.id + '_name');
    const p = document.getElementById('ci_' + c.id + '_phone');
    if (n) data[c.id + '_name'] = n.value.trim();
    if (p) data[c.id + '_phone'] = p.value.trim();
  });
  DETAILS.forEach(d => {
    const el = document.getElementById('di_' + d.id);
    if (el) data[d.id] = el.value.trim();
  });
  data['notes'] = document.getElementById('notes-field').value;
  // Kept so an older free-text due date is not lost; it is no longer shown.
  const old = safeLoad('birth-guide-info', {});
  if (old.edd) data.edd = old.edd;

  safeSave('birth-guide-info', data);

  const btn = document.getElementById('save-btn');
  btn.textContent = I18n.t('myinfo.saved');
  btn.classList.add('saved');
  showToast(I18n.t('toast.contactsSaved'));
  setTimeout(() => {
    btn.textContent = I18n.t('myinfo.saveMyInformation');
    btn.classList.remove('saved');
  }, 2500);
}
