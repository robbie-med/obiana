// ═══════════════════════════════════════════════════════
// LANGUAGE SWITCHER
// ═══════════════════════════════════════════════════════
function renderLangSwitcher() {
  const btn = document.getElementById('lang-btn');
  const pop = document.getElementById('lang-pop');
  const grid = document.getElementById('lang-pop-grid');
  if (!btn || !pop || !grid) return;

  grid.innerHTML = Object.keys(I18n.LOCALES).map(code => {
    const m = I18n.LOCALES[code];
    return `<button type="button" class="lang-chip${code === I18n.lang ? ' current' : ''}"
              data-lang="${code}" lang="${code}" dir="${m.dir}"
              aria-label="${escHtml(m.name)}"${code === I18n.lang ? ' aria-current="true"' : ''}>
              <span class="lang-chip-flag" aria-hidden="true"><img src="./flags/${escHtml(m.flag)}.svg" alt="" loading="lazy"></span>
              <span class="lang-chip-name">${escHtml(m.native)}</span>
            </button>`;
  }).join('');

  grid.querySelectorAll('.lang-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      const ok = await I18n.setLocale(chip.dataset.lang);
      if (!ok) { chip.classList.add('failed'); return; }
      closeLangPop();
      renderLangSwitcher();
    });
  });

  if (btn.dataset.bound !== '1') {
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => { e.stopPropagation(); togglePop(); });
    // Dismiss on outside tap or Escape, like any other popover.
    document.addEventListener('click', e => {
      if (!pop.hidden && !pop.contains(e.target) && e.target !== btn) closeLangPop();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangPop(); });
  }
  updateTranslationNotice();
}

function togglePop() {
  const pop = document.getElementById('lang-pop');
  if (!pop) return;
  if (pop.hidden) openLangPop(); else closeLangPop();
}

function openLangPop() {
  const pop = document.getElementById('lang-pop');
  const btn = document.getElementById('lang-btn');
  if (!pop) return;
  pop.hidden = false;
  requestAnimationFrame(() => pop.classList.add('open'));
  if (btn) btn.setAttribute('aria-expanded', 'true');
  pop.querySelector('.lang-chip')?.focus();
}

function closeLangPop() {
  const pop = document.getElementById('lang-pop');
  const btn = document.getElementById('lang-btn');
  if (!pop || pop.hidden) return;
  pop.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  setTimeout(() => { pop.hidden = true; }, 160);
}

// Non-English content is LLM-drafted pending clinician review. Patients are
// told so explicitly rather than being handed unreviewed medical guidance
// that looks as authoritative as the reviewed English.
function updateTranslationNotice() {
  const el = document.getElementById('translation-notice');
  if (!el) return;
  const reviewed = (MYOB_LOCALES[I18n.lang] || {}).reviewed === true;
  const lines = [];
  if (!reviewed) lines.push(I18n.t('lang.unreviewedNotice'));
  // Say why English is showing through mid-page. Unexplained English inside a
  // translated card reads as a bug; named as "the English was updated and this
  // passage has not caught up", it reads as the safety behaviour it is.
  el.hidden = !lines.length;
  el.textContent = lines.join(' ');
}

// Re-render every locale-dependent surface. Called on language switch.
function applyLocaleToApp() {
  // Preserve anything typed but not yet saved — a language switch must not
  // silently discard the phone number the user is halfway through entering.
  const live = {};
  document.querySelectorAll('#contacts-form input, #details-form input').forEach(el => {
    if (el.value) live[el.id] = el.value;
  });

  buildSearchIndex();

  renderMyInfo();
  Object.keys(live).forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = live[id]; el.dispatchEvent(new Event('input')); }
  });

  // Force content cards to rebuild in the new language.
  document.querySelectorAll('[id^="cards-"]').forEach(c => {
    delete c.dataset.rendered;
    c.innerHTML = '';
  });
  Object.keys(CONTENT_STRUCTURE).forEach(sec => {
    if (document.getElementById('page-' + sec)?.classList.contains('active')) renderSection(sec);
  });

  // Re-init whichever tool is on screen so its generated markup is translated.
  const init = TOOL_INITS[currentSection];
  if (typeof init === 'function') init();

  document.title = I18n.t('app.title');
  // Driven by the locale change itself, not by the switcher widget — the
  // locale can also change via ?lang=, saved preference, or a direct call.
  updateTranslationNotice();
  // Refresh the picker so the current-language chip moves with the locale.
  renderLangSwitcher();
  if (searchInput && searchInput.value.trim()) doSearch();
}
