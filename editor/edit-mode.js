// ═══════════════════════════════════════════════════════
// EDIT MODE — served only by editor/server.py, never shipped
// ═══════════════════════════════════════════════════════
// Turns the real app into an editor for the English content. Every guide
// sentence already has its own key, so a sentence on screen maps to exactly
// one entry in i18n/locale.en.js and can be edited where it is read, with the
// sentences around it visible.
//
// Nothing here is in the production bundle: index.html gets this script tag
// injected by the local server and by nothing else.

(function () {
  'use strict';

  const dirty = new Map();          // key -> new value, unsaved
  let saving = false;

  // ─── Slot marking ─────────────────────────────────────
  // content.js calls this for every filled body slot when it is set. Marking
  // happens in the render rather than by matching text afterwards, because two
  // cards can legitimately contain the same sentence.
  window.MYOB_EDIT_WRAP = function (key, text) {
    return '<span class="ed-slot" data-ed-key="' + key + '">' +
      (text === '' ? '<em class="ed-empty">(empty)</em>' : escapeHtml(text)) + '</span>';
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ─── Marking titles and subtitles ─────────────────────
  // These go through escHtml at their render site, so they are marked on the
  // element after the fact, using the card id already on the wrapper.
  function markTitles(root) {
    (root || document).querySelectorAll('.card[id^="card-"]').forEach(card => {
      const id = card.id.slice('card-'.length);
      const t = card.querySelector('.acc-title, .faq-q');
      const s = card.querySelector('.acc-sub');
      if (t && !t.dataset.edKey) { t.dataset.edKey = 'content.' + id + '.title'; t.classList.add('ed-slot'); }
      if (s && !s.dataset.edKey) { s.dataset.edKey = 'content.' + id + '.sub'; s.classList.add('ed-slot'); }
    });
  }

  // ─── Editing ──────────────────────────────────────────
  function beginEdit(el) {
    if (el.querySelector('textarea')) return;
    const key = el.dataset.edKey;
    const current = dirty.has(key) ? dirty.get(key) : el.textContent.replace(/^\(empty\)$/, '');

    const box = document.createElement('div');
    box.className = 'ed-box';
    box.innerHTML =
      '<div class="ed-key"></div>' +
      '<textarea class="ed-input" rows="4"></textarea>' +
      '<div class="ed-actions">' +
      '  <button class="ed-save">Save</button>' +
      '  <button class="ed-cancel">Cancel</button>' +
      '  <span class="ed-hint">Ctrl+Enter saves, Esc cancels</span>' +
      '</div>';
    box.querySelector('.ed-key').textContent = key;
    const ta = box.querySelector('.ed-input');
    ta.value = current;

    const prev = el.innerHTML;
    el.innerHTML = '';
    el.appendChild(box);
    el.classList.add('ed-editing');
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    autoGrow(ta);
    ta.addEventListener('input', () => autoGrow(ta));

    const cancel = () => { el.innerHTML = prev; el.classList.remove('ed-editing'); };
    const commit = () => {
      const v = ta.value.trim();
      el.classList.remove('ed-editing');
      if (v === current) { el.innerHTML = prev; return; }
      dirty.set(key, v);
      el.innerHTML = v === '' ? '<em class="ed-empty">(empty)</em>' : escapeHtml(v);
      el.classList.add('ed-dirty');
      renderBar();
    };

    box.querySelector('.ed-save').onclick = e => { e.stopPropagation(); commit(); };
    box.querySelector('.ed-cancel').onclick = e => { e.stopPropagation(); cancel(); };
    ta.onkeydown = e => {
      if (e.key === 'Escape') { e.preventDefault(); cancel(); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); commit(); }
      e.stopPropagation();
    };
    box.onclick = e => e.stopPropagation();
  }

  function autoGrow(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.min(400, ta.scrollHeight + 2) + 'px';
  }

  // Capture phase, because the accordion header is a button and the card
  // toggle would otherwise swallow the click before it reaches the sentence.
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('.ed-slot');
    if (!el || el.classList.contains('ed-editing')) return;
    e.preventDefault();
    e.stopPropagation();
    beginEdit(el);
  }, true);

  // ─── Toolbar ──────────────────────────────────────────
  let bar;
  function renderBar() {
    if (!bar) return;
    const n = dirty.size;
    bar.querySelector('.ed-count').textContent =
      n === 0 ? 'No unsaved edits' : n === 1 ? '1 unsaved edit' : n + ' unsaved edits';
    bar.querySelector('.ed-savebtn').disabled = n === 0 || saving;
    bar.classList.toggle('ed-has-edits', n > 0);
  }

  function buildBar() {
    bar = document.createElement('div');
    bar.className = 'ed-bar';
    bar.innerHTML =
      '<span class="ed-brand">EDITING ENGLISH</span>' +
      '<span class="ed-count"></span>' +
      '<button class="ed-savebtn">Save to file</button>' +
      '<button class="ed-publishbtn">Publish…</button>' +
      '<span class="ed-status"></span>';
    document.body.appendChild(bar);
    bar.querySelector('.ed-savebtn').onclick = save;
    bar.querySelector('.ed-publishbtn').onclick = openPublish;
    renderBar();
    refreshStatus();
  }

  function setStatus(msg, kind) {
    const el = bar && bar.querySelector('.ed-status');
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'ed-status' + (kind ? ' ed-' + kind : '');
  }

  async function save() {
    if (!dirty.size || saving) return;
    saving = true; renderBar();
    setStatus('Saving…');
    const edits = [...dirty.entries()].map(([key, value]) => ({ key, value }));
    try {
      const res = await fetch('/api/save', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ edits }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'save failed');
      dirty.clear();
      document.querySelectorAll('.ed-dirty').forEach(e => e.classList.remove('ed-dirty'));
      setStatus(`Saved ${data.applied.length} to locale.en.js`, 'ok');
      applyStatus(data.status);
    } catch (err) {
      setStatus(err.message, 'bad');
    } finally {
      saving = false; renderBar();
    }
  }

  // ─── Publish ──────────────────────────────────────────
  function openPublish() {
    const wrap = document.createElement('div');
    wrap.className = 'ed-modal';
    wrap.innerHTML =
      '<div class="ed-modal-box">' +
      '  <h2>Publish to obiana</h2>' +
      '  <p class="ed-modal-sub"></p>' +
      '  <label>Commit message</label>' +
      '  <textarea class="ed-msg" rows="3" placeholder="What changed, and why"></textarea>' +
      '  <p class="ed-note">Regenerates the translation snapshot, verifies fingerprints, ' +
      '     lints every locale, bumps the cache version, commits, and pushes to ' +
      '     <strong>obiana/main</strong>. Never origin.</p>' +
      '  <div class="ed-modal-actions">' +
      '    <button class="ed-go">Publish</button>' +
      '    <button class="ed-close">Cancel</button>' +
      '  </div>' +
      '  <pre class="ed-log" hidden></pre>' +
      '</div>';
    document.body.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector('.ed-close').onclick = close;
    wrap.onclick = e => { if (e.target === wrap) close(); };
    wrap.querySelector('.ed-msg').focus();

    fetch('/api/status').then(r => r.json()).then(s => {
      wrap.querySelector('.ed-modal-sub').textContent =
        s.uncommitted ? `${s.uncommitted} changed file(s) will be committed.`
                      : 'Nothing to publish: no changed files.';
    });

    wrap.querySelector('.ed-go').onclick = async (e) => {
      const msg = wrap.querySelector('.ed-msg').value.trim();
      if (!msg) { wrap.querySelector('.ed-msg').focus(); return; }
      if (dirty.size && !confirm(`${dirty.size} edit(s) are not saved to the file yet. Publish without them?`)) return;
      e.target.disabled = true;
      const log = wrap.querySelector('.ed-log');
      log.hidden = false;
      log.textContent = 'Working…\n';
      try {
        const res = await fetch('/api/publish', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ message: msg }),
        });
        const data = await res.json();
        log.textContent = (data.steps || []).map(s =>
          `${s.ok ? 'ok  ' : 'FAIL'} ${s.step}\n${(s.out || '').split('\n').map(l => '      ' + l).join('\n')}`
        ).join('\n\n');
        if (!res.ok) { log.textContent += '\n\n' + (data.error || 'failed'); e.target.disabled = false; return; }
        setStatus('Published', 'ok');
        applyStatus(data.status);
      } catch (err) {
        log.textContent += '\n' + err.message;
        e.target.disabled = false;
      }
    };
  }

  // ─── Status ───────────────────────────────────────────
  function applyStatus(s) {
    if (!s || !bar) return;
    const t = s.translations || {};
    const stale = Object.entries(t).filter(([, v]) => v.stale || v.untranslated);
    const el = bar.querySelector('.ed-trans') || (() => {
      const e = document.createElement('span');
      e.className = 'ed-trans';
      bar.appendChild(e);
      return e;
    })();
    el.textContent = stale.length
      ? stale.map(([l, v]) => `${l}: ${v.stale}⟳ ${v.untranslated}✗`).join('  ')
      : '';
    el.title = 'Translations needing work after your edits';
  }
  function refreshStatus() { fetch('/api/status').then(r => r.json()).then(applyStatus).catch(() => {}); }

  // ─── Boot ─────────────────────────────────────────────
  function boot() {
    buildBar();
    markTitles();
    // Cards render lazily per section, so mark whatever appears.
    new MutationObserver(() => markTitles()).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('beforeunload', e => {
      if (dirty.size) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // ─── Styles ───────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
.ed-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 2147483647;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  padding: 8px 14px; background: #10202e; color: #dbe7ef;
  font: 13px/1.4 system-ui, sans-serif; border-top: 2px solid #2f6f8f; }
.ed-bar.ed-has-edits { background: #3a2a06; border-top-color: #b8842a; }
.ed-brand { font-weight: 800; letter-spacing: .08em; font-size: 11px; color: #8fd0ef; }
.ed-bar.ed-has-edits .ed-brand { color: #f0c675; }
.ed-count { opacity: .9; }
.ed-bar button { font: inherit; font-weight: 600; padding: 6px 12px; border-radius: 6px;
  border: 1px solid #3f6f8f; background: #17384c; color: #dbe7ef; cursor: pointer; }
.ed-bar button:disabled { opacity: .45; cursor: default; }
.ed-savebtn { background: #1f6f4a !important; border-color: #2e9a68 !important; color: #fff !important; }
.ed-publishbtn { background: #7a3d10 !important; border-color: #b06a20 !important; color: #fff !important; }
.ed-status.ed-ok { color: #7fe0a8; } .ed-status.ed-bad { color: #ff9c9c; }
.ed-trans { margin-inline-start: auto; font-size: 11.5px; opacity: .85; font-family: ui-monospace, monospace; }
body { padding-bottom: 60px !important; }

.ed-slot { outline: 1px dashed rgba(47,111,143,.45); outline-offset: 2px;
  cursor: text; border-radius: 2px; transition: background .12s; }
.ed-slot:hover { background: rgba(143,208,239,.18); outline-color: #2f6f8f; }
.ed-slot.ed-dirty { background: rgba(240,198,117,.28); outline: 1px solid #b8842a; }
.ed-slot.ed-editing { display: block; outline: none; cursor: default; }
.ed-empty { opacity: .5; }

.ed-box { display: block; margin: 6px 0; padding: 8px; border-radius: 8px;
  background: #0e1b26; border: 1px solid #2f6f8f; }
.ed-key { font: 10px ui-monospace, monospace; color: #8fd0ef; margin-bottom: 5px; word-break: break-all; }
.ed-input { width: 100%; box-sizing: border-box; font: 14px/1.5 system-ui, sans-serif;
  padding: 8px; border-radius: 6px; border: 1px solid #3f6f8f; background: #071119; color: #eaf3f8; resize: vertical; }
.ed-actions { display: flex; align-items: center; gap: 8px; margin-top: 7px; }
.ed-actions button { font: 13px system-ui, sans-serif; font-weight: 600; padding: 5px 12px;
  border-radius: 6px; cursor: pointer; border: 1px solid #3f6f8f; background: #17384c; color: #dbe7ef; }
.ed-save { background: #1f6f4a !important; border-color: #2e9a68 !important; color: #fff !important; }
.ed-hint { font-size: 11px; color: #7fa3b8; }

.ed-modal { position: fixed; inset: 0; z-index: 2147483647; background: rgba(0,0,0,.6);
  display: flex; align-items: center; justify-content: center; padding: 20px; }
.ed-modal-box { background: #0e1b26; color: #dbe7ef; border: 1px solid #2f6f8f; border-radius: 12px;
  padding: 18px; width: min(680px, 100%); max-height: 90vh; overflow: auto;
  font: 14px/1.5 system-ui, sans-serif; }
.ed-modal-box h2 { margin: 0 0 6px; font-size: 17px; }
.ed-modal-sub { margin: 0 0 12px; color: #8fd0ef; font-size: 13px; }
.ed-modal-box label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
.ed-msg { width: 100%; box-sizing: border-box; font: 14px/1.5 system-ui, sans-serif; padding: 8px;
  border-radius: 6px; border: 1px solid #3f6f8f; background: #071119; color: #eaf3f8; resize: vertical; }
.ed-note { font-size: 12px; color: #9dbccd; margin: 10px 0; }
.ed-modal-actions { display: flex; gap: 8px; margin-top: 8px; }
.ed-modal-actions button { font: 14px system-ui, sans-serif; font-weight: 600; padding: 8px 16px;
  border-radius: 6px; cursor: pointer; border: 1px solid #3f6f8f; background: #17384c; color: #dbe7ef; }
.ed-go { background: #7a3d10 !important; border-color: #b06a20 !important; color: #fff !important; }
.ed-log { margin-top: 12px; padding: 10px; background: #071119; border: 1px solid #24455c;
  border-radius: 8px; font: 11.5px/1.5 ui-monospace, monospace; white-space: pre-wrap;
  max-height: 320px; overflow: auto; color: #bcd4e2; }
`;
  document.head.appendChild(css);
})();
