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
