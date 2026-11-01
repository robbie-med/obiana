// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
let currentSection = 'home';

const TOOL_PAGES = ['tools','tool-kick','tool-contractions','tool-feeding',
  'tool-diapers','tool-jaundice','tool-bp','tool-weight',
  'tool-mood','tool-birthplan','tool-appts', 'tool-improve', 'tool-nausea', 'tool-nausealog'];

// Map tool sub-pages to their init functions (populated by app/tools/*.js)
const TOOL_INITS = {};

// The four guide sections share the Guide tab and the section switcher.
const GUIDE_SECTIONS = ['pregnancy', 'labor', 'recovery', 'baby'];
let lastGuideSection = null;

// Guide opens where she last was, or where her dates put her.
function guideDefault() {
  if (lastGuideSection) return lastGuideSection;
  const s = stageNow();
  if (s.stage === 'baby') return 'baby';
  if (s.stage === 'pregnant' && s.week >= 37) return 'labor';
  return 'pregnancy';
}

// The FAQ used to be a page. Its answers now sit in their guide sections, so
// an old #/faq link lands on the right one.
function faqHomeOf(cardId) {
  const e = (CONTENT_STRUCTURE.faq || []).find(f => f.id === cardId);
  return (e && e.in) || 'pregnancy';
}

// opts.fromHistory: replaying Back/Forward, so do not push another entry.
// opts.card: open that card once the section has rendered.
function navigate(section, opts = {}) {
  if (section === 'guide') section = guideDefault();
  if (section === 'faq') section = faqHomeOf(opts.card);
  if (GUIDE_SECTIONS.includes(section)) lastGuideSection = section;
  const prev = currentSection;
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

  highlightNav(section);

  currentSection = section;

  // Render content lazily
  if (GUIDE_SECTIONS.includes(section)) {
    renderSection(section);
  }

  // Call tool init if navigating to a tool sub-page
  if (TOOL_INITS[section]) {
    TOOL_INITS[section]();
  }



  // Scroll content to top
  document.getElementById('content').scrollTop = 0;

  if (!opts.fromHistory) pushRoute(section, opts.card || null, prev);
  if (opts.card) openCardById(opts.card);
}

// Tool sub-pages highlight Tools; guide sections highlight Guide.
function highlightNav(section) {
  // The Translate page is reached from Me, so Me stays lit.
  const navSection = section === 'translate' ? 'myinfo'
    : TOOL_PAGES.includes(section) ? 'tools'
    : GUIDE_SECTIONS.includes(section) ? 'guide' : section;
  const tabs = document.getElementById('guide-tabs');
  if (tabs) {
    tabs.hidden = !GUIDE_SECTIONS.includes(section);
    tabs.querySelectorAll('button').forEach(b => {
      const on = b.dataset.section === section;
      b.classList.toggle('active', on);
      b.setAttribute('aria-current', on ? 'page' : 'false');
    });
  }
  const btn = document.getElementById('navbtn-' + navSection);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }
}
