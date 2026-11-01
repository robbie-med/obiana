// ─── Storage ────────────────────────────────────────────
// Every read and write goes through these. Two failures they exist for:
//
// Private mode and blocked third-party storage make localStorage itself throw
// on access, not just return null. And a single corrupt value used to abort
// the tools at parse time, because ten of its trackers parse their history at
// module scope: one bad kick-history entry meant openModal and closeModal were
// never defined, so all twelve tools and all four modals died together.
//
// safeSave returns a boolean because callers were toasting "saved" for data
// that had not been written.
function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const v = JSON.parse(raw);
    if (v === null || v === undefined) return fallback;
    // A value that parses but has the wrong shape is just as fatal: an object
    // where an array is expected gives undefined .length and breaks on render.
    if (Array.isArray(fallback) !== Array.isArray(v)) return fallback;
    if (typeof fallback === 'object' && typeof v !== 'object') return fallback;
    return v;
  } catch (e) {
    return fallback;
  }
}

function safeSave(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { return false; }
}

// Raw string variants, for the handful of keys that are not JSON.
function safeGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
  catch (e) { return fallback; }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, value); return true; }
  catch (e) { return false; }
}

function safeRemove(key) {
  try { localStorage.removeItem(key); return true; }
  catch (e) { return false; }
}
