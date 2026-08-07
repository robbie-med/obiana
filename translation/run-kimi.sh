#!/usr/bin/env bash
# Runs every translation batch through kimi, then validates each output.
# Usage:  bash translation/run-kimi.sh            # all languages
#         bash translation/run-kimi.sh es fr      # only these
#
# Safe to re-run: batches whose output already exists AND validates are skipped,
# so an interrupted run resumes instead of redoing finished work.

set -uo pipefail
cd "$(dirname "$0")/.."

WANT="${*:-}"
PASS=0; FAIL=0; SKIP=0

run() {
  local lang="$1" out="$2" prompt="$3"
  if [ -n "$WANT" ] && ! grep -qw "$lang" <<< "$WANT"; then return; fi

  if [ -f "$out" ] && node translation/validate.js "$out" >/dev/null 2>&1; then
    echo "  skip (already valid): $out"; SKIP=$((SKIP+1)); return
  fi

  echo "→ $out"
  timeout 1800 kimi -p "$(cat "$prompt")" >/dev/null 2>&1

  if node translation/validate.js "$out"; then
    PASS=$((PASS+1))
  else
    echo "  ✗ FAILED validation: $out  (re-run: kimi -p \"\$(cat $prompt)\")"
    FAIL=$((FAIL+1))
  fi
}

run "es" "translation/out/es.ui.1.json" "translation/prompts/es.ui.1.md"
run "es" "translation/out/es.ui.2.json" "translation/prompts/es.ui.2.md"
run "es" "translation/out/es.ui.3.json" "translation/prompts/es.ui.3.md"
run "es" "translation/out/es.ui.4.json" "translation/prompts/es.ui.4.md"
run "es" "translation/out/es.content.1.json" "translation/prompts/es.content.1.md"
run "es" "translation/out/es.content.2.json" "translation/prompts/es.content.2.md"
run "es" "translation/out/es.content.3.json" "translation/prompts/es.content.3.md"
run "es" "translation/out/es.content.4.json" "translation/prompts/es.content.4.md"
run "es" "translation/out/es.content.5.json" "translation/prompts/es.content.5.md"
run "es" "translation/out/es.content.6.json" "translation/prompts/es.content.6.md"
run "es" "translation/out/es.content.7.json" "translation/prompts/es.content.7.md"
run "es" "translation/out/es.content.8.json" "translation/prompts/es.content.8.md"
run "fr" "translation/out/fr.ui.1.json" "translation/prompts/fr.ui.1.md"
run "fr" "translation/out/fr.ui.2.json" "translation/prompts/fr.ui.2.md"
run "fr" "translation/out/fr.ui.3.json" "translation/prompts/fr.ui.3.md"
run "fr" "translation/out/fr.ui.4.json" "translation/prompts/fr.ui.4.md"
run "fr" "translation/out/fr.content.1.json" "translation/prompts/fr.content.1.md"
run "fr" "translation/out/fr.content.2.json" "translation/prompts/fr.content.2.md"
run "fr" "translation/out/fr.content.3.json" "translation/prompts/fr.content.3.md"
run "fr" "translation/out/fr.content.4.json" "translation/prompts/fr.content.4.md"
run "fr" "translation/out/fr.content.5.json" "translation/prompts/fr.content.5.md"
run "fr" "translation/out/fr.content.6.json" "translation/prompts/fr.content.6.md"
run "fr" "translation/out/fr.content.7.json" "translation/prompts/fr.content.7.md"
run "fr" "translation/out/fr.content.8.json" "translation/prompts/fr.content.8.md"
run "ko" "translation/out/ko.ui.1.json" "translation/prompts/ko.ui.1.md"
run "ko" "translation/out/ko.ui.2.json" "translation/prompts/ko.ui.2.md"
run "ko" "translation/out/ko.ui.3.json" "translation/prompts/ko.ui.3.md"
run "ko" "translation/out/ko.ui.4.json" "translation/prompts/ko.ui.4.md"
run "ko" "translation/out/ko.content.1.json" "translation/prompts/ko.content.1.md"
run "ko" "translation/out/ko.content.2.json" "translation/prompts/ko.content.2.md"
run "ko" "translation/out/ko.content.3.json" "translation/prompts/ko.content.3.md"
run "ko" "translation/out/ko.content.4.json" "translation/prompts/ko.content.4.md"
run "ko" "translation/out/ko.content.5.json" "translation/prompts/ko.content.5.md"
run "ko" "translation/out/ko.content.6.json" "translation/prompts/ko.content.6.md"
run "ko" "translation/out/ko.content.7.json" "translation/prompts/ko.content.7.md"
run "ko" "translation/out/ko.content.8.json" "translation/prompts/ko.content.8.md"
run "ar" "translation/out/ar.ui.1.json" "translation/prompts/ar.ui.1.md"
run "ar" "translation/out/ar.ui.2.json" "translation/prompts/ar.ui.2.md"
run "ar" "translation/out/ar.ui.3.json" "translation/prompts/ar.ui.3.md"
run "ar" "translation/out/ar.ui.4.json" "translation/prompts/ar.ui.4.md"
run "ar" "translation/out/ar.content.1.json" "translation/prompts/ar.content.1.md"
run "ar" "translation/out/ar.content.2.json" "translation/prompts/ar.content.2.md"
run "ar" "translation/out/ar.content.3.json" "translation/prompts/ar.content.3.md"
run "ar" "translation/out/ar.content.4.json" "translation/prompts/ar.content.4.md"
run "ar" "translation/out/ar.content.5.json" "translation/prompts/ar.content.5.md"
run "ar" "translation/out/ar.content.6.json" "translation/prompts/ar.content.6.md"
run "ar" "translation/out/ar.content.7.json" "translation/prompts/ar.content.7.md"
run "ar" "translation/out/ar.content.8.json" "translation/prompts/ar.content.8.md"
run "ru" "translation/out/ru.ui.1.json" "translation/prompts/ru.ui.1.md"
run "ru" "translation/out/ru.ui.2.json" "translation/prompts/ru.ui.2.md"
run "ru" "translation/out/ru.ui.3.json" "translation/prompts/ru.ui.3.md"
run "ru" "translation/out/ru.ui.4.json" "translation/prompts/ru.ui.4.md"
run "ru" "translation/out/ru.content.1.json" "translation/prompts/ru.content.1.md"
run "ru" "translation/out/ru.content.2.json" "translation/prompts/ru.content.2.md"
run "ru" "translation/out/ru.content.3.json" "translation/prompts/ru.content.3.md"
run "ru" "translation/out/ru.content.4.json" "translation/prompts/ru.content.4.md"
run "ru" "translation/out/ru.content.5.json" "translation/prompts/ru.content.5.md"
run "ru" "translation/out/ru.content.6.json" "translation/prompts/ru.content.6.md"
run "ru" "translation/out/ru.content.7.json" "translation/prompts/ru.content.7.md"
run "ru" "translation/out/ru.content.8.json" "translation/prompts/ru.content.8.md"
run "zh" "translation/out/zh.ui.1.json" "translation/prompts/zh.ui.1.md"
run "zh" "translation/out/zh.ui.2.json" "translation/prompts/zh.ui.2.md"
run "zh" "translation/out/zh.ui.3.json" "translation/prompts/zh.ui.3.md"
run "zh" "translation/out/zh.ui.4.json" "translation/prompts/zh.ui.4.md"
run "zh" "translation/out/zh.content.1.json" "translation/prompts/zh.content.1.md"
run "zh" "translation/out/zh.content.2.json" "translation/prompts/zh.content.2.md"
run "zh" "translation/out/zh.content.3.json" "translation/prompts/zh.content.3.md"
run "zh" "translation/out/zh.content.4.json" "translation/prompts/zh.content.4.md"
run "zh" "translation/out/zh.content.5.json" "translation/prompts/zh.content.5.md"
run "zh" "translation/out/zh.content.6.json" "translation/prompts/zh.content.6.md"
run "zh" "translation/out/zh.content.7.json" "translation/prompts/zh.content.7.md"
run "zh" "translation/out/zh.content.8.json" "translation/prompts/zh.content.8.md"
run "zom" "translation/out/zom.ui.1.json" "translation/prompts/zom.ui.1.md"
run "zom" "translation/out/zom.ui.2.json" "translation/prompts/zom.ui.2.md"
run "zom" "translation/out/zom.ui.3.json" "translation/prompts/zom.ui.3.md"
run "zom" "translation/out/zom.ui.4.json" "translation/prompts/zom.ui.4.md"
run "zom" "translation/out/zom.content.1.json" "translation/prompts/zom.content.1.md"
run "zom" "translation/out/zom.content.2.json" "translation/prompts/zom.content.2.md"
run "zom" "translation/out/zom.content.3.json" "translation/prompts/zom.content.3.md"
run "zom" "translation/out/zom.content.4.json" "translation/prompts/zom.content.4.md"
run "zom" "translation/out/zom.content.5.json" "translation/prompts/zom.content.5.md"
run "zom" "translation/out/zom.content.6.json" "translation/prompts/zom.content.6.md"
run "zom" "translation/out/zom.content.7.json" "translation/prompts/zom.content.7.md"
run "zom" "translation/out/zom.content.8.json" "translation/prompts/zom.content.8.md"

echo
echo "passed: $PASS   failed: $FAIL   skipped: $SKIP"
[ "$FAIL" -eq 0 ] || echo "Re-run this script to retry only the failed batches."
