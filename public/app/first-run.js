// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// FIRST-RUN LANGUAGE PICKER
// ═══════════════════════════════════════════════════════
// Shown only until the user has explicitly chosen a language. Auto-detection
// from navigator.languages is a guess — a phone set to English does not mean
// the patient reads English — so the guess never counts as a choice.
let _langHeadingTimer = null;

function maybeShowLanguagePicker() {
  if (I18n.hasExplicitChoice()) return;
  const picker = document.getElementById('lang-picker');
  const grid = document.getElementById('lang-picker-grid');
  if (!picker || !grid) return;

  const codes = Object.keys(I18n.LOCALES);

  grid.innerHTML = codes.map(code => {
    const m = I18n.LOCALES[code];
    return `<button type="button" class="lang-picker-btn" data-lang="${code}"
              lang="${code}" dir="${m.dir}" aria-label="${escHtml(m.name)}">
              <span class="lang-picker-flag" aria-hidden="true"><img src="./flags/${escHtml(m.flag)}.svg" alt="" loading="lazy"></span>
              <span class="lang-picker-native">${escHtml(m.native)}</span>
              <span class="lang-picker-prompt">${escHtml(m.prompt)}</span>
            </button>`;
  }).join('');

  grid.querySelectorAll('.lang-picker-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ok = await I18n.setLocale(btn.dataset.lang);   // persists on success
      if (!ok) {
        // The locale file failed to load (missing or offline). Keep the picker
        // open and say so — silently dismissing would strand the user in a
        // language they did not choose.
        btn.classList.add('lang-picker-failed');
        btn.querySelector('.lang-picker-prompt').textContent = I18n.t('lang.loadFailed');
        return;
      }
      hideLanguagePicker();
      renderLangSwitcher();
      maybeShowUsNotice();
    });
  });

  // Cycle the heading through every language so the instruction is readable
  // to whoever is holding the phone, without needing to scan the tiles.
  let i = 0;
  const heading = document.getElementById('lang-picker-heading');
  const cycle = () => {
    const m = I18n.LOCALES[codes[i % codes.length]];
    heading.textContent = m.prompt;
    heading.setAttribute('lang', codes[i % codes.length]);
    heading.setAttribute('dir', m.dir);
    i++;
  };
  cycle();
  _langHeadingTimer = setInterval(cycle, 1800);

  picker.hidden = false;
  document.body.style.overflow = 'hidden';
  const first = grid.querySelector('.lang-picker-btn');
  if (first) first.focus();
}

function hideLanguagePicker() {
  const picker = document.getElementById('lang-picker');
  if (picker) picker.hidden = true;
  document.body.style.overflow = '';
  if (_langHeadingTimer) { clearInterval(_langHeadingTimer); _langHeadingTimer = null; }
}

// ═══════════════════════════════════════════════════════
// US CARE NOTICE
// ═══════════════════════════════════════════════════════
// The whole guide describes US prenatal care. That has to be stated before
// anyone reads it as general advice, and it has to be in the language they
// just picked — which is why it comes after the picker, not before it.
const US_NOTICE_KEY = 'myob.usNoticeSeen';
const NOTICE_ACCEPTED_KEY = 'myob.noticeAccepted';

// Bump when either panel's meaning changes, so the gate is shown again rather
// than relying on an acceptance the user gave to different words. A wording
// tidy-up does not warrant it; a change to what the app claims about itself
// does.
const NOTICE_VERSION = '1';

function maybeShowUsNotice() {
  // The old boolean flag counts as acceptance of version 1, so existing users
  // are not re-gated for a notice they have already agreed to the substance of.
  if (safeGet(NOTICE_ACCEPTED_KEY, null) === NOTICE_VERSION) return;
  if (safeGet(US_NOTICE_KEY, null) && safeGet(NOTICE_ACCEPTED_KEY, null) === null) {
    safeSet(NOTICE_ACCEPTED_KEY, NOTICE_VERSION);
    return;
  }

  const el = document.getElementById('us-notice');
  if (!el) return;
  const p1 = document.getElementById('notice-panel-1');
  const p2 = document.getElementById('notice-panel-2');
  const next = document.getElementById('notice-next');
  const ok = document.getElementById('us-notice-ok');
  if (!p1 || !p2 || !next || !ok) return;

  I18n.applyStatic(el);            // render it in the language just chosen

  // Say so if this language has not been reviewed. The header banner is behind
  // the overlay at this point, so without this the disclaimer reads as though
  // a clinician had checked its wording in this language.
  const mt = document.getElementById('notice-mt');
  if (mt) {
    const reviewed = (MYOB_LOCALES[I18n.lang] || {}).reviewed === true;
    mt.hidden = reviewed;
    if (!reviewed) mt.textContent = I18n.t('lang.unreviewedNotice');
  }

  p1.hidden = false;
  p2.hidden = true;
  el.hidden = false;
  document.body.style.overflow = 'hidden';

  if (next.dataset.bound !== '1') {
    next.dataset.bound = '1';
    next.addEventListener('click', () => {
      p1.hidden = true;
      p2.hidden = false;
      ok.focus();
    });
  }
  if (ok.dataset.bound !== '1') {
    ok.dataset.bound = '1';
    ok.addEventListener('click', () => {
      safeSet(NOTICE_ACCEPTED_KEY, NOTICE_VERSION);
      safeSet(US_NOTICE_KEY, '1');       // kept so an older build still sees it
      el.hidden = true;
      document.body.style.overflow = '';
    });
  }
  next.focus();
}
