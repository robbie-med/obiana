// ═══════════════════════════════════════════════════════
// 10. VISIT NOTES (APPOINTMENT NOTES)
// ═══════════════════════════════════════════════════════
let appointments = migrateAppointments(safeLoad('appt-notes', []));
let _editApptId = null;

// Appointment types are stored as stable IDS. Before i18n the <option>
// elements carried no value attribute, so the visible English text WAS the
// stored value — translating it would have silently rewritten saved data.
const APPT_TYPE_KEY = {
  'ob-routine': 'obRoutine', 'ob-triage': 'obTriage', 'mfm-consult': 'mfmConsult',
  'mfm-followup': 'mfmFollowup', 'endo': 'endo', 'cardio': 'cardio', 'nephro': 'nephro',
  'ultrasound': 'ultrasound', 'nst': 'nst', 'lactation': 'lactation', 'pp-2wk': 'pp2wk',
  'pp-6wk': 'pp6wk', 'peds-2-5d': 'peds25d', 'peds-2wk': 'peds2wk', 'peds-2mo': 'peds2mo',
  'family': 'family', 'other': 'other',
};

const APPT_TYPE_LEGACY = {
  'OB \u2013 Routine': 'ob-routine',
  'OB \u2013 L&D Triage / Unscheduled': 'ob-triage',
  'MFM Consultation': 'mfm-consult',
  'MFM Follow-up': 'mfm-followup',
  'Endocrinology': 'endo',
  'Cardiology': 'cardio',
  'Nephrology': 'nephro',
  'Ultrasound': 'ultrasound',
  'Non-Stress Test (NST)': 'nst',
  'Lactation Consult': 'lactation',
  'Postpartum \u2013 2 weeks': 'pp-2wk',
  'Postpartum \u2013 6 weeks': 'pp-6wk',
  'Pediatrician \u2013 2\u20135 days': 'peds-2-5d',
  'Pediatrician \u2013 2 weeks': 'peds-2wk',
  'Pediatrician \u2013 2 months': 'peds-2mo',
  'Family Doctor': 'family',
  'Other': 'other',
};

// Convert visits saved before i18n. Runs once, then the flag short-circuits.
function migrateAppointments(list) {
  if (safeGet('appt-notes-v2', null) === '1') return list;
  const out = (list || []).map(a => {
    const t = a && a.type;
    return Object.assign({}, a, {
      type: Object.prototype.hasOwnProperty.call(APPT_TYPE_LEGACY, t) ? APPT_TYPE_LEGACY[t] : t
    });
  });
  safeSave('appt-notes', out);
  safeSet('appt-notes-v2', '1');
  return out;
}

// Unknown or legacy ids fall through as their stored text rather than vanishing.
function apptTypeLabel(id) {
  if (!id) return I18n.t('tool.appts.untitledVisit');
  const k = APPT_TYPE_KEY[id];
  return k ? I18n.t('apptType.' + k) : id;
}

TOOL_INITS['tool-appts'] = initAppts;

function initAppts() {
  const el = document.getElementById('appts-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:12px 16px">
      <button class="big-action-btn btn-navy" onclick="openApptModal(null)">${t('tool.appts.addVisit')}</button>
    </div>
    <div id="appts-list"></div>
    <div style="height:16px"></div>`;
  renderApptsList();
}

function renderApptsList() {
  const el = document.getElementById('appts-list');
  if (!el) return;
  if (!appointments.length) {
    el.innerHTML = `<p style="text-align:center;color:var(--ink-soft);font-size:13px;padding:20px 16px">${t('tool.appts.noVisits')}</p>`;
    return;
  }
  const sorted = [...appointments].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  el.innerHTML = sorted.map((appt, i) => {
    const d = appt.date ? new Date(appt.date + 'T12:00:00') : null;
    const month = d ? I18n.fmt.date(d, { month: 'short' }) : '–';
    const day = d ? I18n.fmt.num(d.getDate()) : '–';
    const preview = appt.questions ? appt.questions.slice(0, 60) + (appt.questions.length > 60 ? '…' : '') : t('tool.appts.noQuestionsAdded');
    return `
      <div class="appt-card" id="appt-card-${appt.id}">
        <button type="button" class="appt-card-header" aria-expanded="false"
                aria-controls="appt-body-${appt.id}" onclick="toggleApptCard('appt-card-${appt.id}', this)">
          <span class="appt-date-badge">
            <span class="adb-month">${month}</span>
            <span class="adb-day">${day}</span>
          </span>
          <span class="appt-info">
            <span class="appt-type-label">${escHtml(apptTypeLabel(appt.type))}</span>
            <span class="appt-preview">${escHtml(preview)}</span>
          </span>
          <svg class="appt-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="appt-body" id="appt-body-${appt.id}">
          <div class="appt-sub-label">${t('tool.appts.questionsToAsk')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.questions ? escHtml(appt.questions) : ('<span style="color:var(--ink-soft)">' + escHtml(t('tool.appts.noneAdded')) + '</span>')}</div>
          <div class="appt-sub-label" style="margin-top:14px">${t('tool.appts.notesFromVisit')}</div>
          <div style="font-size:13.5px;color:var(--ink);white-space:pre-wrap;line-height:1.6">${appt.notes ? escHtml(appt.notes) : ('<span style="color:var(--ink-soft)">' + escHtml(t('tool.appts.noneAdded')) + '</span>')}</div>
          <div class="btn-row" style="margin-top:14px;padding:0">
            <button class="btn-sm" onclick="openApptModal('${appt.id}')"
              style="background:var(--teal-faint);color:var(--teal)">${t('tool.appts.edit')}</button>
            <button class="btn-sm" onclick="deleteAppt('${appt.id}')"
              style="background:var(--danger-bg);color:var(--danger-ink)">${t('tool.appts.delete')}</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleApptCard(cardId, header) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.classList.toggle('open');
  if (header) header.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
}

function openApptModal(id) {
  _editApptId = id;
  const appt = id ? appointments.find(a => a.id === id) : null;
  document.getElementById('modal-appt-title').textContent =
    I18n.t(id ? 'tool.appts.editVisit' : 'tool.appts.addVisit');
  document.getElementById('appt-type').value = appt ? appt.type : '';
  document.getElementById('appt-date').value = appt ? (appt.date || '') : new Date().toISOString().split('T')[0];
  document.getElementById('appt-questions').value = appt ? (appt.questions || '') : '';
  document.getElementById('appt-notes-field').value = appt ? (appt.notes || '') : '';
  openModal('appt');
}

function saveAppt() {
  const type = document.getElementById('appt-type').value || '';
  const date = document.getElementById('appt-date').value;
  const questions = document.getElementById('appt-questions').value.trim();
  const notes = document.getElementById('appt-notes-field').value.trim();

  if (_editApptId) {
    const idx = appointments.findIndex(a => a.id === _editApptId);
    if (idx >= 0) appointments[idx] = { ...appointments[idx], type, date, questions, notes };
  } else {
    appointments.unshift({ id: String(Date.now()), type, date, questions, notes });
  }
  if (appointments.length > 100) appointments = appointments.slice(0, 100);
  safeSave('appt-notes', appointments);
  closeModal('appt');
  initAppts();
  showToast(t(_editApptId ? 'tool.appts.visitUpdated' : 'tool.appts.visitAdded'));
  _editApptId = null;
}

function deleteAppt(id) {
  const at = appointments.findIndex(a => a.id === id);
  if (at < 0) return;
  const [gone] = appointments.splice(at, 1);
  safeSave('appt-notes', appointments);
  initAppts();
  deleteWithUndo(t('tool.appts.visitDeleted'), () => {
    appointments.splice(at, 0, gone);
    safeSave('appt-notes', appointments);
    initAppts();
  });
}
