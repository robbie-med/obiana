// ═══════════════════════════════════════════════════════
// HELP IMPROVE THIS GUIDE
// ═══════════════════════════════════════════════════════
// Readers tell us how something is done in their culture, ask about a topic
// the guide does not cover, or point at a passage that did not read clearly.
//
// Framed as contributing to the guide, not as a support desk: there is no
// reply, no contact field, and no ticket. What comes back changes the content.
//
// Falls back to a local draft if the API is unreachable, so a half-written
// thought on a phone with no signal is never lost.

const IMPROVE_DRAFT_KEY = 'myob.improveDraft';

let _improveKind = 'culture';

TOOL_INITS['tool-improve'] = initImprove;

function improveDraft() {
  try { return JSON.parse(localStorage.getItem(IMPROVE_DRAFT_KEY) || '{}'); }
  catch (e) { return {}; }
}

function initImprove() {
  const el = document.getElementById('improve-content');
  if (!el) return;
  const draft = improveDraft();
  if (draft.kind) _improveKind = draft.kind;

  const KINDS = [
    ['culture',  'tool.improve.kindCulture'],
    ['question', 'tool.improve.kindQuestion'],
    ['unclear',  'tool.improve.kindUnclear'],
  ];

  el.innerHTML = `
    <div style="padding:12px 16px 4px">
      <p style="font-size:13.5px;color:var(--ink);line-height:1.6;margin-bottom:4px">
        ${escHtml(I18n.t('tool.improve.intro'))}
      </p>
      <p style="font-size:12px;color:var(--ink-soft);line-height:1.5;margin-bottom:14px">
        ${escHtml(I18n.t('tool.improve.notDoctor'))}
      </p>

      <div class="form-label" style="padding:0 0 6px">${escHtml(I18n.t('tool.improve.whatKind'))}</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
        ${KINDS.map(([k, key]) => `
          <button type="button" class="choice-pill${_improveKind === k ? ' selected' : ''}"
                  data-kind="${k}" style="width:100%;text-align:start;padding:11px 13px">
            ${escHtml(I18n.t(key))}
          </button>`).join('')}
      </div>

      <div class="form-label" style="padding:0 0 6px">${escHtml(I18n.t('tool.improve.topicLabel'))}</div>
      <input class="tool-input" id="improve-topic" type="text" maxlength="120"
             placeholder="${escHtml(I18n.t('tool.improve.topicPlaceholder'))}"
             value="${escHtml(draft.topic || '')}" style="width:100%;margin-bottom:14px">

      <div class="form-label" style="padding:0 0 6px">${escHtml(I18n.t('tool.improve.messageLabel'))}</div>
      <textarea class="tool-textarea" id="improve-message" rows="7" maxlength="4000"
        placeholder="${escHtml(I18n.t('tool.improve.messagePlaceholder'))}"
        style="width:100%;box-sizing:border-box">${escHtml(draft.message || '')}</textarea>
      <div id="improve-count" style="font-size:11px;color:var(--ink-soft);text-align:end;margin-top:4px"></div>
    </div>

    <div style="padding:8px 16px 24px">
      <button class="big-action-btn btn-teal" id="improve-send">${escHtml(I18n.t('tool.improve.send'))}</button>
      <p id="improve-status" style="font-size:12.5px;text-align:center;margin-top:10px;min-height:18px"></p>
    </div>`;

  el.querySelectorAll('[data-kind]').forEach(b => {
    b.addEventListener('click', () => {
      _improveKind = b.dataset.kind;
      saveImproveDraft();
      initImprove();
    });
  });

  const msg = document.getElementById('improve-message');
  const count = document.getElementById('improve-count');
  const updateCount = () => { count.textContent = `${msg.value.length} / 4000`; };
  updateCount();
  msg.addEventListener('input', updateCount);
  [msg, document.getElementById('improve-topic')].forEach(f =>
    f.addEventListener('change', saveImproveDraft));

  document.getElementById('improve-send').addEventListener('click', sendImprove);
}

function saveImproveDraft() {
  const msg = document.getElementById('improve-message');
  const topic = document.getElementById('improve-topic');
  try {
    localStorage.setItem(IMPROVE_DRAFT_KEY, JSON.stringify({
      kind: _improveKind,
      topic: topic ? topic.value : '',
      message: msg ? msg.value : '',
    }));
  } catch (e) { /* private mode */ }
}

async function sendImprove() {
  const btn = document.getElementById('improve-send');
  const status = document.getElementById('improve-status');
  const msg = document.getElementById('improve-message');
  const topic = document.getElementById('improve-topic');
  const setStatus = (t, bad) => { status.textContent = t; status.style.color = bad ? 'var(--rose)' : 'var(--teal)'; };

  const message = (msg.value || '').trim();
  if (!message) { setStatus(I18n.t('tool.improve.writeFirst'), true); msg.focus(); return; }

  saveImproveDraft();
  btn.disabled = true;
  setStatus(I18n.t('tool.improve.sending'));

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        lang: I18n.lang, kind: _improveKind,
        topic: (topic.value || '').trim(), message,
      }),
    });
    if (res.ok) {
      try { localStorage.removeItem(IMPROVE_DRAFT_KEY); } catch (e) {}
      msg.value = ''; topic.value = '';
      document.getElementById('improve-count').textContent = '0 / 4000';
      setStatus(I18n.t('tool.improve.thanks'));
      btn.disabled = false;
      return;
    }
    const err = await res.json().catch(() => ({}));
    setStatus(err.error === 'rate_limited'
      ? I18n.t('tool.improve.rateLimited')
      : I18n.t('tool.improve.failed'), true);
  } catch (e) {
    // Offline: the draft is already saved, so nothing typed is lost.
    setStatus(I18n.t('tool.improve.offline'), true);
  }
  btn.disabled = false;
}
