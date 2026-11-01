// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
let currentSection = 'home';

const TOOL_PAGES = ['tools','tool-kick','tool-contractions','tool-feeding',
  'tool-diapers','tool-jaundice','tool-bp','tool-weight',
  'tool-mood','tool-birthplan','tool-appts', 'tool-i18n', 'tool-improve', 'tool-nausea', 'tool-nausealog'];

// Map tool sub-pages to their init functions (populated by app/tools/*.js)
const TOOL_INITS = {};

function navigate(section) {
  // Clear search
  if (document.getElementById('search-input').value) {
    clearSearch();
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-current', 'false');
  });

  // Show target
  const page = document.getElementById('page-' + section);
  if (page) {
    page.classList.add('active');
    page.scrollTop = 0;
  }

  // Active nav button: tool sub-pages highlight the 'tools' button
  const navSection = TOOL_PAGES.includes(section) ? 'tools' : section;
  const btn = document.getElementById('navbtn-' + navSection);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }

  currentSection = section;

  // Render content lazily
  if (['pregnancy','labor','recovery','baby','faq'].includes(section)) {
    renderSection(section);
  }

  // Call tool init if navigating to a tool sub-page
  if (TOOL_INITS[section]) {
    TOOL_INITS[section]();
  }



  // Scroll content to top
  document.getElementById('content').scrollTop = 0;
}
