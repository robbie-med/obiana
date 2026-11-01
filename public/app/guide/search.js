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
  document.querySelectorAll('.nav-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-current', 'false'); });
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
    const div = document.createElement('button');
    div.type = 'button';
    div.className = 'search-result-item';
    div.innerHTML = `
      <div class="sri-section ${SECTION_COLORS[item.section]}">${escHtml(sectionLabel(item.section))}</div>
      <div class="sri-title">${escHtml(item.title)}</div>
      <div class="sri-snippet">${buildSnippet(item, terms)}</div>`;
    div.addEventListener('click', () => {
      clearSearch();
      navigate(item.section, { card: item.id });
    });
    searchResultsList.appendChild(div);
  });
}

function clearSearch() {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  searchResultsPage.classList.remove('active');
  document.getElementById('page-' + currentSection)?.classList.add('active');
  highlightNav(currentSection);
}
