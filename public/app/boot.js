// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  // i18n must resolve BEFORE anything renders, otherwise the first paint is
  // English and then visibly swaps.
  await I18n.boot();
  I18n.onChange(applyLocaleToApp);
  I18n.onChange(trApplyTap);          // after the rebuild: tap-to-suggest follows the language
  // Me reads its dates and settings fresh each time it opens (myinfo.js loads
  // before nav.js defines TOOL_INITS, so this is registered here).
  TOOL_INITS['myinfo'] = () => { refreshMeDates(); renderSettings(); };

  document.title = I18n.t('app.title');
  buildSearchIndex();
  renderMyInfo();
  updateOnlineStatus();
  initDarkMode();
  renderLangSwitcher();
  maybeShowLanguagePicker();
  // Only reaches this if the picker did not open, i.e. a language was already
  // chosen. Someone mid-way through should still see the notice once.
  if (I18n.hasExplicitChoice()) maybeShowUsNotice();
  seedDatesFromMyInfo();
  renderToday();
  trApplyTap();
  routeOnLoad();
});
