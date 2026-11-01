#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════
# PREFLIGHT: the gate before every push to obiana
# ═══════════════════════════════════════════════════════
#   bash scripts/preflight.sh          check the working tree
#   bash scripts/preflight.sh <base>   ...and the commits <base>..HEAD, i.e. what a push adds
#
# scripts/hooks/pre-push runs this inside a clean worktree of exactly the commit
# being pushed, with <base> = what obiana/main holds now. Install the hook once:
#   git config core.hooksPath scripts/hooks
#
# Gates (any FAIL exits 1):
#   1. every tracked .js parses
#   2. scripts/check.js: locale lint, fingerprints, slot ids, precache, render
#   3. no private file is tracked, or added anywhere in <base>..HEAD
#   4. asset version agrees across i18n.js, sw.js and index.html
#   5. a push that changes public/ also bumps the asset version
#   6. no key in translation/clinical-keys.txt is stale in any locale
# Stale translations outside that list are reported, not gated.

set -uo pipefail
cd "$(dirname "$0")/.."

BASE="${1:-}"
FAIL=0
ok()   { echo "  ok    $*"; }
bad()  { echo "  FAIL  $*"; FAIL=1; }
note() { echo "  note  $*"; }

if [ -n "$BASE" ] && ! git rev-parse -q --verify "$BASE^{commit}" >/dev/null; then
  echo "preflight: unknown base $BASE"; exit 2
fi

echo "preflight $(git rev-parse --short HEAD)${BASE:+ (since $(git rev-parse --short "$BASE"))}"

# ─── 1. syntax ──────────────────────────────────────────
n=0; broken=()
while IFS= read -r f; do
  n=$((n+1))
  node --check "$f" 2>/dev/null || broken+=("$f")
done < <(git ls-files '*.js' ':!:node_modules')
if [ ${#broken[@]} -eq 0 ]; then ok "syntax: $n .js files parse"
else for f in "${broken[@]}"; do bad "syntax: $f"; done; fi

# ─── 2. check.js ────────────────────────────────────────
if out=$(node scripts/check.js 2>&1); then ok "check.js"
else bad "check.js"; echo "$out" | sed 's/^/        /'; fi

# ─── 3. private files ───────────────────────────────────
# The legal/identity docs leaked once (2026-11-01). Nothing under these names may
# be tracked, and a commit that adds one and a later commit that deletes it
# still publishes it, so the whole push range is checked too.
PRIVATE='(^|/)(docs/private/|pi/)|(^|/)(PROTECT\.md|LEGAL issues\.md|COMPLIANCE-PLAN\.md)$|(^|/)\.env(\..*)?$|(^|/)\.dev\.vars|(^|/)\.ppq_key$|\.(pem|key|p12)$|(^|/)id_(rsa|ed25519)'
hits=$(git ls-files | grep -E "$PRIVATE" || true)
if [ -n "$BASE" ]; then
  hits+=$'\n'$(git log --format= --name-only --diff-filter=A "$BASE..HEAD" | grep -E "$PRIVATE" || true)
fi
hits=$(echo "$hits" | sed '/^$/d' | sort -u)
if [ -z "$hits" ]; then ok "no private files"
else while IFS= read -r f; do bad "private file in history or tree: $f"; done <<< "$hits"; fi

# ─── 4. asset version agrees everywhere ─────────────────
ver=$(grep -oE "const ASSET_VERSION = '[0-9]+'" public/i18n/i18n.js | grep -oE '[0-9]+')
others=$(grep -ohE '\?v=[0-9]+' public/index.html public/sw.js | sort -u | grep -vx "?v=$ver" || true)
if [ -z "$ver" ]; then bad "ASSET_VERSION not found in public/i18n/i18n.js"
elif [ -n "$others" ] || ! grep -q "birth-guide-v$ver-i18n" public/sw.js; then
  bad "asset version $ver disagrees with sw.js/index.html ($(echo $others)). Run: node scripts/bump.js"
else ok "asset version $ver everywhere"; fi

# ─── 5. reader-visible change ⇒ bump ────────────────────
# index.html is served from the cache first: without a bump, a correction never
# reaches anyone who already has the app.
if [ -n "$BASE" ]; then
  changed=$(git diff --name-only "$BASE" HEAD -- public/ | wc -l)
  basever=$(git show "$BASE:public/i18n/i18n.js" 2>/dev/null | grep -oE "const ASSET_VERSION = '[0-9]+'" | grep -oE '[0-9]+')
  if [ "$changed" -eq 0 ]; then ok "public/ unchanged, no bump needed"
  elif [ "$ver" != "$basever" ]; then ok "public/ changed ($changed files), version $basever → $ver"
  else bad "public/ changed ($changed files) but version is still $ver. Run: node scripts/bump.js, commit, push"; fi
fi

# ─── 6. clinical keys current everywhere ────────────────
report=$(node translation/stamp.js report --keys 2>&1)
if [ -f translation/clinical-keys.txt ]; then
  stale=$(grep -vE '^\s*(#|$)' translation/clinical-keys.txt | while read -r k _; do
    awk -v k="$k" '$3=="current" {lang=$1} $1=="stale" && $2==k {print lang": "k}' <<< "$report"
  done)
  if [ -z "$stale" ]; then ok "clinical keys current in every locale"
  else while IFS= read -r s; do bad "clinical key stale: $s"; done <<< "$stale"; fi
else
  note "translation/clinical-keys.txt not written yet (§1), clinical staleness not gated"
fi
summary=$(awk '$3=="current" && $4>0 {print $1": "$4}' <<< "$report" | paste -sd, - | sed 's/,/, /g')
[ -n "$summary" ] && note "stale translations: $summary (node translation/stamp.js report --keys)"

echo
if [ $FAIL -eq 0 ]; then echo "preflight passed"; else echo "preflight FAILED"; fi
exit $FAIL
