// ═══════════════════════════════════════════════════════
// ROUTER: the URL follows the page, so Back works
// ═══════════════════════════════════════════════════════
//   /                     Home
//   #/<page>              any page: #/labor, #/tool-kick, #/myinfo
//   #/<section>/<card>    a guide section with that card open: #/baby/safe-sleep
//
// navigate() pushes an entry; Back and Forward replay it through popstate.
// Without this the whole app was one history entry, so the phone's Back
// button left the app from anywhere in it.

function routeFromHash() {
  const m = location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?/);
  // The Translation Helper became the Translate page; old links still land.
  if (m && m[1] === 'tool-i18n') return { page: 'translate', card: null };
  // faq and guide are not pages; navigate() resolves them to a guide section.
  const known = m && (m[1] === 'faq' || m[1] === 'guide' || document.getElementById('page-' + m[1]));
  if (!known) return { page: 'home', card: null };
  return { page: m[1], card: m[2] || null };
}

function routeUrl(page, card) {
  if (page === 'home' && !card) return location.pathname + location.search;
  return '#/' + page + (card ? '/' + card : '');
}

function pushRoute(page, card, prev) {
  const url = routeUrl(page, card);
  const same = (location.hash || '') === (url.startsWith('#') ? url : '');
  if (same) return;
  history.pushState({ page, prev }, '', url);
}

// Record which card is open without adding a history entry, so the address
// can be shared and a reload comes back to the same card.
function replaceCardRoute(page, card) {
  history.replaceState(history.state, '', routeUrl(page, card));
}

function openCardById(id) {
  const card = document.getElementById('card-' + id);
  if (!card) return;
  card.classList.add('open');
  const header = card.querySelector('.acc-header');
  if (header) header.setAttribute('aria-expanded', 'true');
  setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

// In-app back buttons ("← Tools"): step back through history when that is
// where the reader came from, rather than pushing a new entry and making the
// phone's Back button bounce between the two pages.
function goBackTo(page) {
  if (history.state && history.state.prev === page) history.back();
  else navigate(page);
}

window.addEventListener('popstate', () => {
  const r = routeFromHash();
  navigate(r.page, { fromHistory: true, card: r.card });
});

// Called once at boot, after the locale has loaded.
function routeOnLoad() {
  const r = routeFromHash();
  history.replaceState({ page: r.page, prev: null }, '', routeUrl(r.page, r.card));
  if (r.page !== 'home' || r.card) {
    navigate(r.page, { fromHistory: true, card: r.card });
    // #/guide and old #/faq links resolve to a section: show that address.
    history.replaceState({ page: currentSection, prev: null }, '', routeUrl(currentSection, r.card));
  }
}
