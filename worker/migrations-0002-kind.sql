-- 2026-11-01: "Looks right" confirmations (NEXT.md §3).
-- A database created from schema.sql before this date lacks the column.
-- Apply once:  npx wrangler d1 execute obiana-suggestions --remote --file worker/migrations-0002-kind.sql
ALTER TABLE suggestions ADD COLUMN kind TEXT NOT NULL DEFAULT 'suggest';
CREATE INDEX IF NOT EXISTS idx_suggestions_kind ON suggestions(lang, kind, created_at);
