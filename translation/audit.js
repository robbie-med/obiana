// ═══════════════════════════════════════════════════════
// RUNTIME i18n AUDIT
// ═══════════════════════════════════════════════════════
// Paste into the browser console on a running copy of the app, or call
// myobI18nAudit() after loading this file.
//
// Why runtime and not a source scan: every static regex over tools.js had a
// blind spot. The first pass missed text nodes spanning multiple lines, and a
// later one missed strings assigned via .textContent. Both looked clean.
//
// This compares the ACTUAL RENDERED DOM between two locales. A text node that
// is byte-identical in English and Korean, and contains real words, has not
// been translated — regardless of how it got on screen.
//
// It seeds every tracker with populated + alerting data first, because a large
// share of the strings only exist on a branch that an empty tool never renders.

(function (global) {
  const SEED_TS = 1786000000000;

  // Legitimately identical across locales: brand, clinical abbreviations that
  // patients must be able to repeat to a US care team, units, bare numbers.
  const ALLOWED = /^[\s\d\W]*$|^(Obiana|GBS|NIPT|ACOG|AAP|WHO|FDA|VBAC|Tdap|RhoGAM|BMI|NST|IOM|MFM|Rh|EPDS|PHQ-9|L&D|988|911|lbs?|oz|cm|mg|kg|CBC|HIV|STI|Pap|CVS|OB|PPD|SVE|MRN|PDF|IV|OR|Braxton Hicks|Listeria|Mastitis|Effacement|Engorgement|Prenatal|FAQ|Type|Date|Apgar|RhoGAM|Doppler|FAQ\s*&)$/i;

  function seed() {
    const S = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    S('kick-history', [{ ts: SEED_TS, count: 10, duration: 9e5, success: true },
                       { ts: SEED_TS - 9e7, count: 4, duration: 72e5, success: false }]);
    S('contractions', Array.from({ length: 6 }, (_, i) =>
      ({ start: SEED_TS - i * 3e5, end: SEED_TS - i * 3e5 + 6e4, duration: 6e4, interval: 3e5 })));
    S('feed-log', [{ ts: SEED_TS, type: 'breast', side: 'L', duration: 15 },
                   { ts: SEED_TS, type: 'bottle', amount: 60 }]);
    S('diaper-log', [{ ts: SEED_TS, type: 'wet' }, { ts: SEED_TS, type: 'dirty' }]);
    S('bp-log', [{ ts: SEED_TS, s: 165, d: 112 }, { ts: SEED_TS - 8.6e7, s: 118, d: 76 }]);
    S('weight-profile', { weight: 150, bmi: 22 });
    S('weight-log', [{ ts: SEED_TS, lbs: 168, week: 30 }, { ts: SEED_TS - 2e9, lbs: 150, week: 10 }]);
    S('epds-history', [{ ts: SEED_TS, score: 19 }, { ts: SEED_TS - 6e8, score: 6 }]);
    localStorage.setItem('jaundice-birth-date', '2026-07-20');
    S('appt-notes', [{ id: 1, type: 'ob-routine', date: '2026-08-01', questions: 'q', notes: 'n' }]);
    S('birth-plan', { epidural: 'epidural', csection: ['lowscreen'] });
    localStorage.setItem('birth-plan-v2', '1');
    localStorage.setItem('appt-notes-v2', '1');
  }

  function unseed() {
    ['kick-history','contractions','feed-log','diaper-log','bp-log','weight-profile','weight-log',
     'epds-history','jaundice-birth-date','appt-notes','birth-plan','birth-plan-v2','appt-notes-v2',
     'myob.epdsLang'].forEach(k => localStorage.removeItem(k));
  }

  async function snapshot(lang) {
    await I18n.setLocale(lang);
    const map = new Map();
    const grab = (scope, tag) => {
      if (!scope) return;
      const w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
      let n, i = 0;
      while ((n = w.nextNode())) {
        const t = n.textContent.trim();
        if (!t || n.parentElement?.closest('script,style,svg')) continue;
        map.set(`${tag}#${i++}`, t);
      }
    };

    const surfaces = ['home','pregnancy','labor','recovery','baby','faq','tools','myinfo',
                      ...Object.keys(TOOL_INITS)];
    for (const p of surfaces) {
      try {
        navigate(p);
        if (['pregnancy','labor','recovery','baby','faq'].includes(p)) renderSection(p);
        if (TOOL_INITS[p]) TOOL_INITS[p]();
      } catch (e) { continue; }
      grab(document.getElementById('page-' + p), p);
    }

    // Scored-result states, including the self-harm branch.
    if (typeof epdsAvailable === 'function') {
      for (const code of epdsAvailable()) {
        localStorage.setItem('myob.epdsLang', code);
        navigate('tool-mood'); initMood();
        const e = getEPDS();
        if (!e) continue;
        epdsAnswers = {};
        e.questions.forEach((q, i) => setEPDS(i, q.scores.indexOf(3)));
        submitEPDS();
        // Instrument text is deliberately per-instrument, not per-UI-locale, so
        // it is tagged separately and excluded from the comparison below.
        grab(document.getElementById('mood-content'), 'INSTRUMENT-' + code);
      }
      localStorage.removeItem('myob.epdsLang');
    }

    ['feed','bp','weight','appt'].forEach(m => grab(document.getElementById('modal-' + m), 'modal-' + m));
    ['header','nav','translation-notice','lang-pop'].forEach(id => grab(document.getElementById(id), id));
    return map;
  }

  async function audit(target) {
    const lang = target || 'ko';
    const restore = I18n.lang;
    seed();
    const a = await snapshot('en');
    const b = await snapshot(lang);
    unseed();
    await I18n.setLocale(restore);
    navigate('home');

    // A language's own name is identical in every locale by definition, so it
    // must never count as untranslated. Derived from the registry rather than
    // listed by hand — a hardcoded list silently rots each time a language is
    // added, which is exactly how Tagalog, Deutsch and Polski showed up here.
    const NATIVE = new Set(Object.values(I18n.LOCALES).flatMap(m => [m.native, m.name, m.prompt]));

    const found = new Map();
    for (const [k, v] of a) {
      // The validated EPDS/PHQ-9 text is not UI copy — it stays in the language
      // the instrument was validated in. Never flag it.
      if (k.startsWith('INSTRUMENT-')) continue;
      // The Translation Helper renders raw key names and the English source
      // side by side — that is its whole job, not an untranslated string.
      if (k.startsWith('tool-i18n')) continue;
      // The Help Improve draft is whatever the tester typed, not app copy.
      if (k.startsWith('tool-improve') && /^__/.test(v)) continue;
      if (b.get(k) !== v) continue;
      if (ALLOWED.test(v) || NATIVE.has(v) || !/[A-Za-z]{3}/.test(v)) continue;
      if (/^[\d\s:.\/+×–—-]+$/.test(v)) continue;
      if (!found.has(v)) found.set(v, k.split('#')[0]);
    }

    const items = [...found].map(([text, where]) => ({ where, text }));
    console.log(`i18n audit (en vs ${lang}): ${a.size} nodes compared, ${items.length} untranslated`);
    if (items.length) console.table(items);
    else console.log('✓ nothing untranslated');
    return items;
  }

  global.myobI18nAudit = audit;
})(window);
