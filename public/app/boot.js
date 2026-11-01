// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  // i18n must resolve BEFORE anything renders, otherwise the first paint is
  // English and then visibly swaps.
  await I18n.boot();
  I18n.onChange(applyLocaleToApp);
  I18n.onChange(trApplyTap);          // after the rebuild: tap-to-suggest follows the language

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
