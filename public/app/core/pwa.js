// ═══════════════════════════════════════════════════════
// PWA INSTALL
// ═══════════════════════════════════════════════════════
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('install-btn').classList.add('visible');
});

function installPWA() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(() => {
    deferredInstallPrompt = null;
    document.getElementById('install-btn').classList.remove('visible');
  });
}

window.addEventListener('appinstalled', () => {
  document.getElementById('install-btn').classList.remove('visible');
  showToast(I18n.t('toast.appInstalled'));
});

// ═══════════════════════════════════════════════════════
// OFFLINE DETECTION
// ═══════════════════════════════════════════════════════
function updateOnlineStatus() {
  document.getElementById('offline-banner').classList.toggle('visible', !navigator.onLine);
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ═══════════════════════════════════════════════════════
// SERVICE WORKER
// ═══════════════════════════════════════════════════════
if ('serviceWorker' in navigator) {
  // On a first visit the reader's locale file loads before the service worker
  // controls the page, so it never reaches the cache and her language is gone
  // the first time she opens the app offline. Once the worker takes control,
  // request it again through the worker so it is kept.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    const s = document.querySelector(`script[src*="/i18n/locale.${I18n.lang}.js"]`);
    if (s) fetch(s.src).catch(() => {});
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast(I18n.t('toast.appUpdated'), 4000);
          }
        });
      });
    }).catch(console.error);
  });
}
