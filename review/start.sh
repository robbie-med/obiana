#!/usr/bin/env bash
# Launch the local translation-review UI and open it in a browser.
set -euo pipefail
cd "$(dirname "$0")/.."
URL="http://127.0.0.1:3905"

# Reuse an already-running instance instead of failing on a bound port.
if curl -s -o /dev/null --max-time 2 "$URL/api/languages" 2>/dev/null; then
  xdg-open "$URL" >/dev/null 2>&1 || true
  exit 0
fi

python3 review/server.py &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  curl -s -o /dev/null --max-time 1 "$URL/" 2>/dev/null && break
  sleep 0.25
done
xdg-open "$URL" >/dev/null 2>&1 || echo "Open $URL"
wait $SERVER
