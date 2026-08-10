// ═══════════════════════════════════════════════════════
// CONTENT STRUCTURE
// ═══════════════════════════════════════════════════════
// Prose (title / sub / body) lives in i18n/locale.<lang>.js keyed by card id.
// Only language-independent structure lives here, so an icon fix does not
// need to be repeated across every locale.

// Card structure: ids, icons, colors, types. Prose lives in i18n/locale.*.js
const CONTENT_STRUCTURE = {
  "pregnancy": [
    {
      "id": "first-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/></svg>",
      "color": ""
    },
    {
      "id": "prenatal-vitamins",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><path d=\"M10.5 20.5a6 6 0 01-8.49-8.49l9.5-9.5a6 6 0 018.49 8.49z\"/><path d=\"M6.5 6.5l11 11\"/></svg>",
      "color": ""
    },
    {
      "id": "second-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>",
      "color": ""
    },
    {
      "id": "third-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>",
      "color": ""
    },
    {
      "id": "sve",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>",
      "color": ""
    },
    {
      "id": "exercise-pregnancy",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\"><path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/></svg>",
      "color": ""
    }
  ],
  "labor": [
    {
      "id": "signs-of-labor",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/></svg>",
      "color": "gold"
    },
    {
      "id": "what-happens-on-arrival",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/></svg>",
      "color": "gold"
    },
    {
      "id": "stages-of-labor",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"/></svg>",
      "color": "gold"
    },
    {
      "id": "pain-management",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>",
      "color": "gold"
    },
    {
      "id": "epidural",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><path d=\"M9 12l2 2 4-4\"/><path d=\"M5 7l7-7 7 7\"/><path d=\"M12 21V5\"/></svg>",
      "color": "gold"
    },
    {
      "id": "csection",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg>",
      "color": "gold"
    },
    {
      "id": "mfm",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\"><path d=\"M22 12h-4l-3 9L9 3l-3 9H2\"/></svg>",
      "color": "gold"
    }
  ],
  "recovery": [
    {
      "id": "immediate-postpartum",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><path d=\"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z\"/></svg>",
      "color": "rose"
    },
    {
      "id": "physical-recovery",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><path d=\"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z\"/><path d=\"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/><path d=\"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z\"/><path d=\"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z\"/><path d=\"M14 14.5c0-.83.67-1.5 1.5-1.5H20c.83 0 1.5.67 1.5 1.5S20.83 16 20 16h-4.5c-.83 0-1.5-.67-1.5-1.5z\"/><path d=\"M15.5 19H14v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/><path d=\"M10 9.5C10 8.67 9.33 8 8.5 8H4c-.83 0-1.5.67-1.5 1.5S3.17 11 4 11h4.5c.83 0 1.5-.67 1.5-1.5z\"/><path d=\"M8.5 5H10v1.5c0 .83-.67 1.5-1.5 1.5S7 7.33 7 6.5 7.67 5 8.5 5z\"/></svg>",
      "color": "rose"
    },
    {
      "id": "mood-ppd",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"/><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"/></svg>",
      "color": "rose"
    },
    {
      "id": "pelvic-rest",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>",
      "color": "rose"
    },
    {
      "id": "postpartum-exercise",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><path d=\"M13 2L3 14h9l-1 8 10-12h-9l1-8z\"/></svg>",
      "color": "rose"
    },
    {
      "id": "postpartum-danger",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\"><path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
      "color": "rose"
    }
  ],
  "baby": [
    {
      "id": "breastfeeding",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M6 20v-2a6 6 0 0112 0v2\"/></svg>",
      "color": "navy"
    },
    {
      "id": "bf-challenges",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><path d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"/></svg>",
      "color": "navy"
    },
    {
      "id": "formula",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><path d=\"M18 8h1a4 4 0 010 8h-1\"/><path d=\"M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z\"/><line x1=\"6\" y1=\"1\" x2=\"6\" y2=\"4\"/><line x1=\"10\" y1=\"1\" x2=\"10\" y2=\"4\"/><line x1=\"14\" y1=\"1\" x2=\"14\" y2=\"4\"/></svg>",
      "color": "navy"
    },
    {
      "id": "cord-care",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><path d=\"M12 22C12 22 3 15 3 9a9 9 0 0118 0c0 6-9 13-9 13z\"/></svg>",
      "color": "navy"
    },
    {
      "id": "normal-newborn",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"/><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"/></svg>",
      "color": "navy"
    },
    {
      "id": "safe-sleep",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><path d=\"M2 17l10-11 10 11\"/><path d=\"M4 15v6h16v-6\"/></svg>",
      "color": "navy"
    },
    {
      "id": "followup-appts",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>",
      "color": "navy"
    }
  ],
  "faq": [
    {
      "id": "faq-deli",
      "type": "myth"
    },
    {
      "id": "faq-coffee",
      "type": "myth"
    },
    {
      "id": "faq-hair-dye",
      "type": "myth"
    },
    {
      "id": "faq-exercise-mc",
      "type": "myth"
    },
    {
      "id": "faq-sex-pregnancy",
      "type": "faq"
    },
    {
      "id": "faq-vaccines",
      "type": "faq"
    },
    {
      "id": "faq-eat-for-two",
      "type": "myth"
    },
    {
      "id": "faq-hot-tub",
      "type": "faq"
    },
    {
      "id": "faq-epidural-csec",
      "type": "myth"
    },
    {
      "id": "faq-routine-episiotomy",
      "type": "myth"
    },
    {
      "id": "faq-water-breaking",
      "type": "myth"
    },
    {
      "id": "faq-eat-in-labor",
      "type": "faq"
    },
    {
      "id": "faq-vbac",
      "type": "faq"
    },
    {
      "id": "faq-bf-bc",
      "type": "myth"
    },
    {
      "id": "faq-stress-milk",
      "type": "myth"
    },
    {
      "id": "faq-bonding",
      "type": "myth"
    },
    {
      "id": "faq-ibuprofen-bf",
      "type": "faq"
    },
    {
      "id": "faq-jaundice",
      "type": "faq"
    },
    {
      "id": "faq-newborn-procedures",
      "type": "faq"
    },
    {
      "id": "faq-first-bath",
      "type": "faq"
    }
  ]
};

// Merge structure + active-locale prose. Falls back to English per card.
function getCards(section) {
  const list = CONTENT_STRUCTURE[section] || [];
  return list.map(item => {
    const s = I18n.data("content." + item.id) || {};
    return Object.assign({}, item, {
      title: s.title || item.id,
      sub: s.sub || "",
      body: s.body || "",
    });
  });
}

// ═══════════════════════════════════════════════════════
// CONTACTS & DETAILS CONFIG
// ═══════════════════════════════════════════════════════
// Structure only — labels/placeholders come from i18n (ui.myinfo.*).
const CONTACTS = [
  { id: "familydoc",  hasName: true,  hasPhone: true },
  { id: "ob",         hasName: true,  hasPhone: true },
  { id: "peds",       hasName: true,  hasPhone: true },
  { id: "mfm",        hasName: true,  hasPhone: true },
  { id: "lactation",  hasName: true,  hasPhone: true },
  { id: "ld",         hasName: false, hasPhone: true },
  { id: "pharmacy",   hasName: true,  hasPhone: true },
];

const DETAILS = [
  { id: "edd",       type: "text" },
  { id: "bloodtype", type: "text" },
  { id: "gbs",       type: "text" },
  { id: "allergies", type: "text" },
  { id: "insurance", type: "text" },
];

// ═══════════════════════════════════════════════════════
// SEARCH INDEX
// ═══════════════════════════════════════════════════════
let SEARCH_INDEX = [];

// Colors are structural; labels come from i18n.
const SECTION_COLORS = {
  pregnancy: '', labor: 'gold', recovery: 'rose', baby: 'navy', faq: 'plum',
};
function sectionLabel(section) { return I18n.t('section.' + section); }

// Rebuilt on every locale change — the index must hold the text the user is
// actually reading, or search silently matches invisible English.
function buildSearchIndex() {
  SEARCH_INDEX = [];
  for (const section of Object.keys(CONTENT_STRUCTURE)) {
    getCards(section).forEach(item => {
      const plainBody = decodeEntities(
        item.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      // Diacritic- and case-folded haystacks so "cesarea" finds "cesárea".
      const folded = I18n.foldMap(plainBody);
      SEARCH_INDEX.push({
        section,
        id: item.id,
        title: item.title,
        sub: item.sub || '',
        body: plainBody,
        bodyNorm: folded.norm,
        bodyMap: folded.map,
        titleNorm: I18n.normalize(item.title),
      });
    });
  }
}

// Card bodies are authored as HTML, so stripping tags leaves raw entities
// ("&amp;"). Decode once at index time so search matches what the eye reads
// and the snippet can be safely escaped at render time.
function decodeEntities(s) {
  if (!s || s.indexOf('&') === -1) return s;
  const el = document.createElement('textarea');
  el.innerHTML = s;
  return el.value;
}

// Build a highlighted snippet. Matching happens in folded space (accent- and
// case-insensitive); every index is mapped back through item.bodyMap before
// slicing, so the text shown is the original — accents and all.
function buildSnippet(item, terms) {
  const norm = item.bodyNorm, map = item.bodyMap, body = item.body;

  const ranges = [];
  terms.forEach(term => {
    let from = 0, i;
    while ((i = norm.indexOf(term, from)) > -1 && ranges.length < 200) {
      ranges.push([i, i + term.length]);
      from = i + term.length;
    }
  });
  ranges.sort((a, b) => a[0] - b[0]);

  const first = ranges.length ? ranges[0][0] : 0;
  const wStart = Math.max(0, first - 60);
  const wEnd = Math.min(norm.length, first + 160);

  // Clip to the window and merge overlaps so nested <em> can't be produced.
  const merged = [];
  ranges.forEach(([s, e]) => {
    if (e <= wStart || s >= wEnd) return;
    const cs = Math.max(s, wStart), ce = Math.min(e, wEnd);
    const last = merged[merged.length - 1];
    if (last && cs <= last[1]) last[1] = Math.max(last[1], ce);
    else merged.push([cs, ce]);
  });

  const o = i => map[Math.min(i, map.length - 1)];
  let html = '', cursor = wStart;
  merged.forEach(([s, e]) => {
    html += escHtml(body.slice(o(cursor), o(s)));
    html += '<em>' + escHtml(body.slice(o(s), o(e))) + '</em>';
    cursor = e;
  });
  html += escHtml(body.slice(o(cursor), o(wEnd)));

  return (wStart > 0 ? '…' : '') + html + (wEnd < norm.length ? '…' : '');
}

// ═══════════════════════════════════════════════════════
// RENDER CARDS
// ═══════════════════════════════════════════════════════
function renderSection(section) {
  const container = document.getElementById('cards-' + section);
  if (!container || container.dataset.rendered) return;

  const items = getCards(section);
  items.forEach(item => {
    const isFaq = section === 'faq';
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card-' + item.id;

    if (isFaq) {
      const badge = item.type === 'myth'
        ? `<span class="faq-badge badge-myth">${I18n.t('faq.badgeMyth')}</span>`
        : `<span class="faq-badge badge-faq">${I18n.t('faq.badgeFaq')}</span>`;
      card.innerHTML = `
        <div class="faq-header acc-header" onclick="toggleCard(this)">
          ${badge}
          <span class="faq-q">${item.title}</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="acc-body">${item.body}</div>`;
    } else {
      card.innerHTML = `
        <div class="acc-header" onclick="toggleCard(this)">
          <div class="acc-icon-wrap ${item.color || ''}">${item.icon}</div>
          <div class="acc-titles">
            <div class="acc-title">${item.title}</div>
            ${item.sub ? `<div class="acc-sub">${item.sub}</div>` : ''}
          </div>
          <svg class="acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="acc-body">${item.body}</div>`;
    }

    container.appendChild(card);
  });
  container.dataset.rendered = 'true';
}

function toggleCard(header) {
  const card = header.closest('.card');
  card.classList.toggle('open');
  if (card.classList.contains('open')) {
    // Smooth scroll into view with small delay
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      const headerH = document.getElementById('header').offsetHeight;
      if (rect.top < headerH + 8) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
let currentSection = 'home';

const TOOL_PAGES = ['tools','tool-kick','tool-contractions','tool-feeding',
  'tool-diapers','tool-jaundice','tool-bp','tool-weight',
  'tool-mood','tool-birthplan','tool-appts', 'tool-i18n', 'tool-improve', 'tool-nausea'];

// Map tool sub-pages to their init functions (populated by tools.js)
const TOOL_INITS = {};

function navigate(section) {
  // Clear search
  if (document.getElementById('search-input').value) {
    clearSearch();
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Show target
  const page = document.getElementById('page-' + section);
  if (page) {
    page.classList.add('active');
    page.scrollTop = 0;
  }

  // Active nav button: tool sub-pages highlight the 'tools' button
  const navSection = TOOL_PAGES.includes(section) ? 'tools' : section;
  const btn = document.getElementById('navbtn-' + navSection);
  if (btn) btn.classList.add('active');

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

// ═══════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchResultsPage = document.getElementById('search-results-page');
const searchResultsList = document.getElementById('search-results-list');
const searchResultsHeader = document.getElementById('search-results-header');
const contentEl = document.getElementById('content');

let searchDebounce;

searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(doSearch, 200);
});

function doSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    clearSearch();
    return;
  }

  searchClear.classList.add('visible');
  // Locale-aware tokenizer: folds diacritics, and emits bigrams for CJK where
  // whitespace splitting would yield a single unusable token.
  const terms = I18n.tokenize(q);
  if (!terms.length) { clearSearch(); return; }

  const results = SEARCH_INDEX.filter(item => {
    return terms.every(t => item.titleNorm.includes(t) || item.bodyNorm.includes(t));
  }).slice(0, 20);

  // Show search results, hide normal pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  searchResultsPage.classList.add('active');

  searchResultsHeader.textContent = results.length
    ? I18n.tp('search.resultCount', results.length, { q })
    : '';

  if (results.length === 0) {
    searchResultsList.innerHTML =
      `<div class="no-results"><strong>${escHtml(I18n.t('search.noResultsTitle'))}</strong>` +
      `${escHtml(I18n.t('search.noResultsHint'))}</div>`;
    return;
  }

  searchResultsList.innerHTML = '';
  results.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.innerHTML = `
      <div class="sri-section ${SECTION_COLORS[item.section]}">${escHtml(sectionLabel(item.section))}</div>
      <div class="sri-title">${escHtml(item.title)}</div>
      <div class="sri-snippet">${buildSnippet(item, terms)}</div>`;
    div.addEventListener('click', () => {
      clearSearch();
      navigate(item.section);
      renderSection(item.section);
      setTimeout(() => {
        const card = document.getElementById('card-' + item.id);
        if (card) {
          card.classList.add('open');
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
    searchResultsList.appendChild(div);
  });
}

function clearSearch() {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  searchResultsPage.classList.remove('active');
  document.getElementById('page-' + currentSection)?.classList.add('active');
  document.getElementById('navbtn-' + currentSection)?.classList.add('active');
}

// ═══════════════════════════════════════════════════════
// MY INFO — RENDER FORM
// ═══════════════════════════════════════════════════════
function renderMyInfo() {
  const saved = JSON.parse(localStorage.getItem('birth-guide-info') || '{}');

  // Contacts
  const cForm = document.getElementById('contacts-form');
  cForm.innerHTML = '';   // idempotent: re-rendered on every locale change
  CONTACTS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const nameVal = saved[c.id + '_name'] || '';
    const phoneVal = saved[c.id + '_phone'] || '';

    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.contact.' + c.id))}</div>
      <div class="contact-fields">
        ${c.hasName ? `<input class="contact-input" id="ci_${c.id}_name" type="text" placeholder="${escHtml(I18n.t('myinfo.namePlaceholder'))}" value="${escHtml(nameVal)}">` : ''}
        <div class="contact-field-wrap">
          <input class="contact-input" id="ci_${c.id}_phone" type="tel" placeholder="${escHtml(I18n.t('myinfo.phonePlaceholder'))}" value="${escHtml(phoneVal)}" inputmode="tel">
          <button class="action-btn call-btn" onclick="callContact('${c.id}')" title="${escHtml(I18n.t('myinfo.call'))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </button>
          <button class="action-btn text-btn" onclick="textContact('${c.id}')" title="${escHtml(I18n.t('myinfo.text'))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
        </div>
      </div>`;

    // Update buttons when phone changes
    const phoneInput = row.querySelector(`#ci_${c.id}_phone`);
    const callBtn = row.querySelector('.call-btn');
    const textBtn = row.querySelector('.text-btn');
    phoneInput.addEventListener('input', () => {
      const has = !!phoneInput.value.trim();
      callBtn.disabled = !has;
      textBtn.disabled = !has;
    });

    cForm.appendChild(row);
  });

  // Details
  const dForm = document.getElementById('details-form');
  dForm.innerHTML = '';
  DETAILS.forEach(d => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const val = saved[d.id] || '';
    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.detail.' + d.id + '.label'))}</div>
      <input class="contact-input" id="di_${d.id}" type="${d.type}" placeholder="${escHtml(I18n.t('myinfo.detail.' + d.id + '.placeholder'))}" value="${escHtml(val)}">`;
    dForm.appendChild(row);
  });

  // Notes
  document.getElementById('notes-field').value = saved['notes'] || '';
}

function escHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function callContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'tel:' + phone;
}

function textContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'sms:' + phone;
}

function saveInfo() {
  const data = {};
  CONTACTS.forEach(c => {
    const n = document.getElementById('ci_' + c.id + '_name');
    const p = document.getElementById('ci_' + c.id + '_phone');
    if (n) data[c.id + '_name'] = n.value.trim();
    if (p) data[c.id + '_phone'] = p.value.trim();
  });
  DETAILS.forEach(d => {
    const el = document.getElementById('di_' + d.id);
    if (el) data[d.id] = el.value.trim();
  });
  data['notes'] = document.getElementById('notes-field').value;

  localStorage.setItem('birth-guide-info', JSON.stringify(data));

  const btn = document.getElementById('save-btn');
  btn.textContent = '✓ Saved!';
  btn.classList.add('saved');
  showToast(I18n.t('toast.contactsSaved'));
  setTimeout(() => {
    btn.textContent = 'Save My Information';
    btn.classList.remove('saved');
  }, 2500);
}

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
// TOAST
// ═══════════════════════════════════════════════════════
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ═══════════════════════════════════════════════════════
// DARK MODE
// ═══════════════════════════════════════════════════════
function initDarkMode() {
  const saved = localStorage.getItem('dark-mode');
  if (saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('dark-mode', isDark ? '1' : '0');
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="none"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  }
}

// ═══════════════════════════════════════════════════════
// DATA EXPORT
// ═══════════════════════════════════════════════════════
function exportData() {
  const keys = [
    'birth-guide-info', 'kick-history', 'contractions', 'feed-log',
    'diaper-log', 'jaundice-birth-date', 'bp-log', 'weight-log',
    'weight-profile', 'epds-history', 'birth-plan', 'birth-plan-notes', 'appt-notes',
  ];
  const data = {};
  keys.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) {
      try { data[k] = JSON.parse(v); } catch { data[k] = v; }
    }
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'birth-guide-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(I18n.t('toast.dataExported'));
}

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

function maybeShowUsNotice() {
  try { if (localStorage.getItem(US_NOTICE_KEY)) return; } catch (e) { /* private mode */ }
  const el = document.getElementById('us-notice');
  if (!el) return;
  I18n.applyStatic(el);            // render it in the language just chosen
  el.hidden = false;
  document.body.style.overflow = 'hidden';
  const ok = document.getElementById('us-notice-ok');
  if (ok && ok.dataset.bound !== '1') {
    ok.dataset.bound = '1';
    ok.addEventListener('click', () => {
      try { localStorage.setItem(US_NOTICE_KEY, '1'); } catch (e) {}
      el.hidden = true;
      document.body.style.overflow = '';
    });
  }
  if (ok) ok.focus();
}

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
  el.hidden = reviewed;
  if (!reviewed) el.textContent = I18n.t('lang.unreviewedNotice');
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

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  // i18n must resolve BEFORE anything renders, otherwise the first paint is
  // English and then visibly swaps.
  await I18n.boot();
  I18n.onChange(applyLocaleToApp);

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
});
