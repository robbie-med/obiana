// ═══════════════════════════════════════════════════════
// WHEN TO CALL: every warning sign, one tap from anywhere
// ═══════════════════════════════════════════════════════
// The lists are the cards' own sentences (cardSlotItems, by permanent slot
// number), not copies: what this page says is exactly what the card says, in
// every language the card is translated into. Only the framing, the help
// lines and the "tell them you gave birth" line are this page's own text.
//
// Sources, by slot:
//   postpartum-danger  t0 ER/911 heading, t1 list, t2 call-OB heading, t3 list
//   signs-of-labor     t11–t14 the 5-1-1 rule, t15 heading, t16 + t17 list
//   normal-newborn     t31 heading, t32 list
// The pregnancy list is the Home screen's (ui.home.*).
const PREGNANCY_SIGNS = ['vaginalBleeding', 'fluidGushingOrTrickling', 'babyNotMovingNormally',
  'severeHeadache', 'visionChanges', 'suddenSwellingOfFaceHands', 'fever1004F', 'contractionsBefore37Weeks'];

const HELP_LINES = [
  { id: 'line988',    tel: '988',            sms: '988' },
  { id: 'lineMama',   tel: '18338526262',    sms: '18338526262' },
  { id: 'linePoison', tel: '18002221222' },
  { id: 'lineDv',     tel: '18007997233',    sms: '88788' },
];

function urgentList(items) {
  return `<ul class="urgent-list">${items.map(x => `<li>${x}</li>`).join('')}</ul>`;
}

function urgentBlock(kind, heading, body) {
  return `<section class="urgent-block urgent-${kind}"><h2 class="urgent-heading">${heading}</h2>${body}</section>`;
}

function renderUrgent() {
  const el = document.getElementById('urgent-content');
  if (!el) return;
  const stage = stageNow().stage;
  const info = safeLoad('birth-guide-info', {});
  const ld = (info.ld_phone || '').replace(/[^\d+]/g, '');

  const top = `
    <div class="urgent-actions">
      <a class="urgent-call urgent-911" href="tel:911">${tl('urgent.call911')}</a>
      ${ld ? `<a class="urgent-call urgent-ld" href="tel:${ld}">${tl('urgent.callLd')}</a>`
           : `<button type="button" class="urgent-add-ld" onclick="navigate('myinfo')">${tl('urgent.addLd')}</button>`}
    </div>`;

  const er = urgentBlock('er', cardSlot('postpartum-danger', 0), urgentList(cardSlotItems('postpartum-danger', 1)));

  const preg = urgentBlock('preg', `${tl('home.duringPregnancy')}: ${tl('home.callYourDoctorIf')}`,
    urgentList(PREGNANCY_SIGNS.map(k => tl('home.' + k))));

  const waterParts = cardSlotItems('signs-of-labor', 17);
  const goIn = [cardSlot('signs-of-labor', 16) + ' ' + (waterParts[0] || ''), ...waterParts.slice(1)];
  const labor = urgentBlock('labor', cardSlot('signs-of-labor', 15),
    urgentList(goIn) +
    `<p class="urgent-511"><strong>${cardSlot('signs-of-labor', 11)}.</strong> ${cardSlot('signs-of-labor', 12)} ` +
    `<strong>${cardSlot('signs-of-labor', 13)}</strong>${cardSlot('signs-of-labor', 14)}</p>` +
    `<button type="button" class="urgent-link" onclick="navigate('tool-contractions')">${tl('tools.contractionTimer')} →</button>`);

  const after = urgentBlock('after', cardSlot('postpartum-danger', 2),
    urgentList(cardSlotItems('postpartum-danger', 3)) + `<p class="urgent-tell">${tl('urgent.tellThem')}</p>`);

  const baby = urgentBlock('baby', cardSlot('normal-newborn', 31), urgentList(cardSlotItems('normal-newborn', 32)));

  const lines = urgentBlock('lines', tl('urgent.helpLines'),
    `<ul class="help-lines">${HELP_LINES.map(l => `<li>
      <div class="help-line-text">${tl('urgent.' + l.id)}</div>
      <div class="help-line-actions">
        <a class="help-line-btn" href="tel:${l.tel}">${tl('urgent.call')}</a>
        ${l.sms ? `<a class="help-line-btn" href="sms:${l.sms}">${tl('urgent.text')}</a>` : ''}
      </div></li>`).join('')}</ul>`);

  // Most relevant first. Everything is always on the page: a pregnant reader
  // may be asking about someone else, and the dates may be out of date.
  const order = stage === 'pregnant' ? [er, preg, labor, after, baby, lines]
              : stage === 'baby'     ? [er, after, baby, lines, preg, labor]
              :                        [er, preg, labor, after, baby, lines];
  el.innerHTML = top + order.join('');
}
TOOL_INITS['urgent'] = renderUrgent;
