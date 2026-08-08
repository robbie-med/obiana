#!/usr/bin/env bash
# Pull contributor translation suggestions from D1 down to this PC.
#
#   bash translation/pull-suggestions.sh            # everything still 'new'
#   bash translation/pull-suggestions.sh es         # one language
#   bash translation/pull-suggestions.sh es --merge # also write translation/out/
#
# Suggestions live in D1 rather than being pushed here, so nothing is lost
# while this machine is off. This is the pull half.

set -euo pipefail
cd "$(dirname "$0")/.."

# Wrangler 4 needs Node >= 22. The system node on this host is 18, so prefer a
# newer one if it is installed rather than failing with a confusing error.
if ! node -e 'process.exit(process.versions.node.split(".")[0] >= 22 ? 0 : 1)' 2>/dev/null; then
  for candidate in "$HOME"/.nvm/versions/node/v2[2-9]*/bin "$HOME"/.local/share/pi-node/node-v2[2-9]*/bin; do
    [ -x "$candidate/node" ] && export PATH="$candidate:$PATH" && break
  done
fi
node -e 'process.exit(process.versions.node.split(".")[0] >= 22 ? 0 : 1)' || {
  echo "wrangler needs Node >= 22 (found $(node -v)). Install or nvm use a newer Node."; exit 1; }

DB=obiana-suggestions
LANG_FILTER="${1:-}"
MERGE="${2:-}"

WHERE="status = 'new'"
[ -n "$LANG_FILTER" ] && [ "$LANG_FILTER" != "--merge" ] && WHERE="$WHERE AND lang = '$LANG_FILTER'"

echo "→ fetching suggestions ($WHERE)"
npx wrangler d1 execute "$DB" --remote --json \
  --command "SELECT id, lang, key, source, current, suggestion, country, created_at
             FROM suggestions WHERE $WHERE ORDER BY lang, created_at" \
  > translation/out/_suggestions.raw.json

node -e '
const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("translation/out/_suggestions.raw.json", "utf8"));
const rows = (raw[0] && raw[0].results) || [];
if (!rows.length) { console.log("no new suggestions"); process.exit(0); }

const byLang = {};
rows.forEach(r => { (byLang[r.lang] ||= []).push(r); });

for (const [lang, list] of Object.entries(byLang)) {
  console.log(`\n═══ ${lang} — ${list.length} suggestion(s) ═══`);
  list.forEach(r => {
    console.log(`  #${r.id}  ${r.key}${r.country ? "  [" + r.country + "]" : ""}`);
    console.log(`      EN : ${r.source}`);
    console.log(`      NOW: ${r.current || "(missing)"}`);
    console.log(`      NEW: ${r.suggestion}`);
  });
}

if (process.argv.includes("--merge")) {
  for (const [lang, list] of Object.entries(byLang)) {
    const obj = {};
    list.forEach(r => { obj[r.key] = r.suggestion; });
    const f = `translation/out/${lang}.suggested.json`;
    fs.writeFileSync(f, JSON.stringify(obj, null, 2));
    console.log(`\nwrote ${f} (${Object.keys(obj).length} keys)`);
  }
  console.log("\nReview, then fold the wanted keys into i18n/locale.<lang>.js.");
  console.log("Nothing is applied automatically — these are suggestions from the public.");
}
' -- ${MERGE:+--merge}

echo
echo "Mark them handled once folded in:"
echo "  npx wrangler d1 execute $DB --remote --command \"UPDATE suggestions SET status='accepted' WHERE id IN (...)\""
