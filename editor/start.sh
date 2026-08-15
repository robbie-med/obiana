#!/usr/bin/env bash
# Start the local English content editor.
#
#   bash editor/start.sh      ->  http://127.0.0.1:3906
#
# Port 3906 is claimed in /home/user/Projects/PORTS.md. Bound to 127.0.0.1
# only: this server writes to the repo and pushes to GitHub, so it must not be
# reachable from the LAN.
#
# It pushes to the `obiana` remote and never to `origin`. The two remotes hold
# unrelated histories, and obiana is the one behind obiana.app.
set -euo pipefail
cd "$(dirname "$0")/.."

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "not a git repository: $(pwd)" >&2
  exit 1
fi

if ! git remote | grep -qx obiana; then
  echo "no 'obiana' remote here. Add it with:" >&2
  echo "  git remote add obiana git@github.com:robbie-med/obiana.git" >&2
  exit 1
fi

# Publishing commits whatever branch is checked out and pushes it to
# obiana/main, so being on the wrong branch would push the wrong thing.
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "obiana-main" ]; then
  echo "You are on '$branch', but the editor publishes from 'obiana-main'." >&2
  echo "Switch first:  git checkout obiana-main" >&2
  exit 1
fi

exec python3 editor/server.py
