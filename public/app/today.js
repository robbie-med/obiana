// ═══════════════════════════════════════════════════════
// TODAY: the Home screen, for where she is now
// ═══════════════════════════════════════════════════════
// With a due date: her week, the visits that matter now, the tools that fit.
// With a birthday: the baby's age, the postpartum visits, the newborn tools.
// With neither: ask, once, and say it stays on the phone.
// "When to call" is the first thing on the screen in every state.

const TOOL_NAME_KEY = {
  nausea: 'tools.nauseaHelper', appts: 'tools.visitNotes', weight: 'tools.weightTracker',
  bp: 'tools.bloodPressure', kick: 'tools.kickCounter', birthplan: 'tools.birthPlanBuilder',
  contractions: 'tools.contractionTimer', feeding: 'tools.feedingLog', diapers: 'tools.diaperLog',
  jaundice: 'tools.jaundiceTracker', mood: 'tools.moodCheckIn',
};

function toolsForStage(s) {
  if (s.stage === 'pregnant') {
    if (s.week < 14) return ['nausea', 'appts'];
    if (s.week < 28) return ['weight', 'bp', 'appts'];
    if (s.week < 37) return ['kick', 'bp', 'birthplan', 'appts'];
    return ['contractions', 'kick', 'birthplan'];
  }
  if (s.stage === 'baby') return s.days <= 14 ? ['feeding', 'diapers', 'jaundice', 'mood'] : ['feeding', 'diapers', 'mood'];
  return [];
}

function babyAgeText(days) {
  return days < 14 ? tpl('today.babyDays', days) : tpl('today.babyWeeks', Math.floor(days / 7));
}

function stagePickerHtml() {
  const d = getDates();
  return `<div class="stage-picker">
    <h2 class="stage-picker-title">${tl('today.whereNow')}</h2>
    <label class="stage-option" for="today-edd">
      <span class="stage-option-title">${tl('today.pregnant')}</span>
      <span class="stage-option-label">${tl('today.dueLabel')}</span>
      <input type="date" id="today-edd" value="${escHtml(d.edd || '')}">
    </label>
    <label class="stage-option" for="today-born">
      <span class="stage-option-title">${tl('today.babyHere')}</span>
      <span class="stage-option-label">${tl('today.bornLabel')}</span>
      <input type="date" id="today-born" value="${escHtml(d.born || '')}">
    </label>
    <button type="button" class="stage-save" onclick="saveTodayDates()">${tl('today.save')}</button>
    <p class="stage-note">${tl('today.savedOnPhone')}</p>
  </div>`;
}

function saveTodayDates() {
  const edd = document.getElementById('today-edd').value;
  const born = document.getElementById('today-born').value;
  if (!edd && !born) return;
  if (!setDates({ edd, born })) { showToast(tl('toast.notSaved')); return; }
  renderToday();
}

function renderToday() {
  const el = document.getElementById('today');
  if (!el) return;
  const s = stageNow();
  const hero = document.querySelector('#page-home .home-hero');
  if (hero) hero.hidden = !!s.stage;

  let h = `<button type="button" class="today-urgent" onclick="navigate('urgent')">
      <span class="today-urgent-title">${tl('urgent.title')}</span>
    </button>`;

  if (!s.stage) {
    el.innerHTML = h + stagePickerHtml();
    return;
  }

  h += s.stage === 'pregnant'
    ? `<div class="today-head"><div class="today-week">${tl('today.week', { week: s.week })}</div>
         <div class="today-due">${tl('today.due', { date: I18n.fmt.dateLong(s.edd) })}</div></div>`
    : `<div class="today-head"><div class="today-week">${babyAgeText(s.days)}</div></div>`;

  const v = visitsNow(s);
  if (v.now.length) h += `<h2 class="today-h">${tl('today.visitsNow')}</h2>` + v.now.map(visitRowHtml).join('');
  if (v.next) h += `<h2 class="today-h">${tl('today.comingUp')}</h2>` + visitRowHtml(v.next);
  h += `<button type="button" class="today-link" onclick="navigate('pregnancy', { card: 'visits' })">${tl('today.allVisits')} →</button>`;

  const tools = toolsForStage(s);
  if (tools.length) {
    h += `<h2 class="today-h">${tl('today.toolsNow')}</h2><div class="today-tools">` +
      tools.map(id => `<button type="button" class="today-tool" onclick="navigate('tool-${id}')">${tl(TOOL_NAME_KEY[id])}</button>`).join('') +
      `</div>`;
  }
  h += `<button type="button" class="today-change" onclick="navigate('myinfo')">${tl('today.changeDates')}</button>`;
  el.innerHTML = h;
}
TOOL_INITS['home'] = renderToday;
