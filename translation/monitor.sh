#!/usr/bin/env bash
# Live monitor for the translation run.
#   bash translation/monitor.sh      (q or Ctrl-C to quit)
#
# Reads translation/out/*.json + validate.js; does not touch the run itself.

cd "$(dirname "$0")/.."

LANGS=(es fr ko ar ru zh zom)
BATCHES=()
for lang in "${LANGS[@]}"; do
  for i in 1 2 3 4; do BATCHES+=("$lang.ui.$i"); done
  for i in 1 2 3 4 5 6 7 8; do BATCHES+=("$lang.content.$i"); done
done
TOTAL=${#BATCHES[@]}

# run start = oldest output file (fallback: now)
start=$(stat -c %Y translation/out/*.json 2>/dev/null | sort -n | head -1)
start=${start:-$(date +%s)}

bar() { # bar <done> <width> -> block string
  local done=$1 width=$2 filled=$((done * width / TOTAL))
  printf '%*s' "$filled" '' | tr ' ' '█'
  printf '%*s' "$((width - filled))" '' | tr ' ' '░'
}

fmt_dur() { # fmt_dur <seconds>
  local s=$1
  printf '%dh%02dm' $((s / 3600)) $(( (s % 3600) / 60 ))
}

while true; do
  declare -A st=()
  warns=0
  while IFS= read -r line; do
    case "$line" in
      "✓ "*) name=$(cut -d' ' -f2 <<< "$line"); st[${name%.json}]=ok ;;
      "✗ "*) name=$(cut -d' ' -f2 <<< "$line"); st[${name%.json}]=bad ;;
      *"warnings total"*) warns=$(grep -o '[0-9]* warnings total' <<< "$line" | grep -o '^[0-9]*') ;;
    esac
  done < <(node translation/validate.js 2>/dev/null)

  ok=0; bad=0
  for b in "${BATCHES[@]}"; do
    [ "${st[$b]:-}" = ok ] && ok=$((ok+1))
    [ "${st[$b]:-}" = bad ] && bad=$((bad+1))
  done
  pending=$((TOTAL - ok - bad))

  # running = first pending batch, only if the runner is alive
  running=""
  if pgrep -f 'translation/run-kimi.sh' >/dev/null; then
    for b in "${BATCHES[@]}"; do
      if [ -z "${st[$b]:-}" ]; then running=$b; break; fi
    done
  fi

  now=$(date +%s); elapsed=$((now - start))
  if [ "$ok" -gt 0 ] && [ "$pending" -gt 0 ]; then
    eta=$(fmt_dur $((elapsed * (pending + bad) / ok)))
  elif [ "$pending" -eq 0 ]; then
    eta="done"
  else
    eta="…"
  fi

  printf '\033[2J\033[H'
  echo "translation monitor — $(date '+%H:%M:%S')   (q to quit)"
  echo
  printf 'overall  %s %d/%d valid, %d failed, %d pending   elapsed %s, ETA %s   (%d warnings)\n' \
    "$(bar $((ok+bad)) 40)" "$ok" "$TOTAL" "$bad" "$pending" "$(fmt_dur $elapsed)" "$eta" "$warns"
  echo
  for lang in "${LANGS[@]}"; do
    slots=""
    for b in "${BATCHES[@]}"; do
      [ "${b%%.*}" = "$lang" ] || continue
      case "${st[$b]:-}" in
        ok)  slots+="✓" ;;
        bad) slots+="✗" ;;
        *)   [ "$b" = "$running" ] && slots+="►" || slots+="·" ;;
      esac
    done
    lok=0
    for b in "${BATCHES[@]}"; do
      [ "${b%%.*}" = "$lang" ] && [ "${st[$b]:-}" = ok ] && lok=$((lok+1))
    done
    printf '%-4s %s %2d/12\n' "$lang" "$slots" "$lok"
  done
  echo
  if [ -n "$running" ]; then echo "now translating: $running"; else echo "runner not active"; fi
  if [ "$bad" -gt 0 ]; then
    echo "failed:"
    for b in "${BATCHES[@]}"; do
      [ "${st[$b]:-}" = bad ] && echo "  ✗ $b  (retry: bash translation/run-kimi.sh ${b%%.*})"
    done
  fi

  IFS= read -r -t 3 -n 1 key && { [ "$key" = q ] && { printf '\033[2J\033[H'; exit 0; }; }
done
