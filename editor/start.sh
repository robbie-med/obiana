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

set -uo pipefail
cd "$(dirname "$0")/.."

PORT=3906
URL="http://127.0.0.1:${PORT}"

open_browser() {
  command -v xdg-open >/dev/null && xdg-open "$URL" >/dev/null 2>&1 &
}

# Launched from the desktop shortcut the terminal closes the moment this exits,
# taking any error message with it. Hold the window open so the reason is
# readable.
die() {
  echo >&2
  echo "  $*" >&2
  echo >&2
  read -r -p "  Press Enter to close. " _ || true
  exit 1
}

port_in_use() { (exec 3<>"/dev/tcp/127.0.0.1/${PORT}") 2>/dev/null; }

# Already running, most often because it was started earlier and left running.
# That is not an error: just show the page rather than dying on a bind failure
# the user never gets to see.
if port_in_use; then
  echo "Editor already running at $URL"
  open_browser
  exit 0
fi

git rev-parse --git-dir >/dev/null 2>&1 || die "Not a git repository: $(pwd)"

git remote | grep -qx obiana || die "No 'obiana' remote here. Add it with:
    git remote add obiana git@github.com:robbie-med/obiana.git"

# Publishing commits whatever branch is checked out and pushes it to
# obiana/main, so being on the wrong branch would push the wrong thing.
branch=$(git rev-parse --abbrev-ref HEAD)
[ "$branch" = "obiana-main" ] || die "You are on '$branch', but the editor publishes from 'obiana-main'.
    Switch first:  git checkout obiana-main"

command -v python3 >/dev/null || die "python3 not found."

# Open the page once the port answers, so double-clicking the shortcut lands
# you on the editor rather than on a terminal showing a URL to copy.
( for _ in $(seq 1 40); do
    if port_in_use; then open_browser; break; fi
    sleep 0.25
  done ) &

python3 editor/server.py
status=$?

# A non-zero exit here means the server itself failed. Ctrl-C is 130 and is not
# a failure worth holding the window for.
if [ "$status" -ne 0 ] && [ "$status" -ne 130 ]; then
  die "The editor stopped unexpectedly (exit $status). The output above says why."
fi
