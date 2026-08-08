-- D1 schema for translation suggestions.
-- Apply with:  npx wrangler d1 execute obiana-suggestions --remote --file worker/schema.sql

CREATE TABLE IF NOT EXISTS suggestions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  lang        TEXT NOT NULL,
  key         TEXT NOT NULL,
  source      TEXT NOT NULL,          -- English wording at time of submission
  current     TEXT,                   -- what was shipped when they suggested
  suggestion  TEXT NOT NULL,
  note        TEXT,
  ip_hash     TEXT,                   -- salted hash, for rate limiting only
  country     TEXT,
  status      TEXT NOT NULL DEFAULT 'new',   -- new | accepted | rejected
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_suggestions_lang    ON suggestions(lang, status);
CREATE INDEX IF NOT EXISTS idx_suggestions_created ON suggestions(created_at);
CREATE INDEX IF NOT EXISTS idx_suggestions_iphash  ON suggestions(ip_hash, created_at);

-- Contributions from readers: cultural practices, questions, and places the
-- guide is unclear. Framed as improving the guide, not a support queue.
CREATE TABLE IF NOT EXISTS feedback (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  lang        TEXT NOT NULL,
  kind        TEXT NOT NULL,          -- culture | question | unclear
  topic       TEXT,                   -- card id or section it relates to
  message     TEXT NOT NULL,
  ip_hash     TEXT,                   -- salted hash, rate limiting only
  country     TEXT,
  status      TEXT NOT NULL DEFAULT 'new',   -- new | read | actioned | archived
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_feedback_status  ON feedback(status, created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_lang    ON feedback(lang, status);
CREATE INDEX IF NOT EXISTS idx_feedback_iphash  ON feedback(ip_hash, created_at);
