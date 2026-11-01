// ═══════════════════════════════════════════════════════
// 5. JAUNDICE DAY TRACKER
// ═══════════════════════════════════════════════════════
TOOL_INITS['tool-jaundice'] = initJaundice;

// Day thresholds are structure; the guidance prose lives in i18n.
const JAUNDICE_GUIDANCE = [1, 2, 3, 4, 5, 6, 7, 10, 14, 21].map(day => ({
  day, get text() { return I18n.t('tool.jaundice.day' + day); }
}));


function getJaundiceDay() {
  const bd = safeGet('jaundice-birth-date', null);
  if (!bd) return null;
  const diff = Date.now() - new Date(bd).getTime();
  return Math.floor(diff / 86400000) + 1;
}

function getJaundiceGuidance(day) {
  let best = JAUNDICE_GUIDANCE[0];
  for (const g of JAUNDICE_GUIDANCE) {
    if (g.day <= day) best = g;
  }
  return best.text;
}

function initJaundice() {
  const el = document.getElementById('jaundice-content');
  if (!el) return;
  const day = getJaundiceDay();
  const birthDate = safeGet('jaundice-birth-date', null) || '';

  el.innerHTML = `
    <div class="weight-profile-card" style="margin:12px 16px">
      <div class="wpc-title">${t('tool.jaundice.babySBirthDate')}</div>
      <div style="display:flex;gap:10px;align-items:center">
        <input type="date" class="tool-input" id="jaundice-birth-input" value="${birthDate}" max="${new Date().toISOString().split('T')[0]}" style="flex:1">
        <button class="btn-sm btn-teal" onclick="setJaundiceBirthDate()">${t('tool.jaundice.set')}</button>
      </div>
    </div>
    ${day !== null ? `
    <div style="text-align:center;padding:20px 20px 8px">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--ink-soft);margin-bottom:4px">${t('tool.jaundice.dayOfLife')}</div>
      <div class="jaundice-day-num">${day}</div>
      ${day > 21 ? `<div style="font-size:13px;color:var(--ink-soft);margin-top:4px">${t('tool.jaundice.resolvesByNow')}</div>` : ''}
    </div>
    <div class="callout gold" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.jaundice.dayWatch', { day })}</div>
      <p>${getJaundiceGuidance(day)}</p>
    </div>
    <div class="callout alert" role="alert" style="margin:0 16px 8px">
      <div class="callout-title">${t('tool.jaundice.callImmediatelyIf')}</div>
      <p>${t('tool.jaundice.redFlags')}</p>
    </div>` : `
    <div style="padding:24px 20px;text-align:center;color:var(--ink-soft)">${t('tool.jaundice.setBirthDateHint')}</div>`}
    <div style="height:16px"></div>`;
}

function setJaundiceBirthDate() {
  const val = document.getElementById('jaundice-birth-input').value;
  if (!val) return;
  safeSet('jaundice-birth-date', val);
  initJaundice();
  showToast(t('tool.jaundice.birthDateSaved'));
}
