#!/bin/bash
# Publishes this site at https://dextini.com/founder-story/.
# dextini.com is the Cloudflare Pages project "dextini", deployed by direct upload: every deploy
# replaces the whole site, so the dextini landing page (~/code/dextini-site) goes up alongside.
set -euo pipefail
cd "$(dirname "$0")/.."
LANDING="${DEXTINI_SITE:-$HOME/code/dextini-site}"
[ -f "$LANDING/index.html" ] || { echo "dextini landing page not found in $LANDING" >&2; exit 1; }

npx tsc --noEmit
npx vite build --base /founder-story/ --outDir dist-founder --emptyOutDir

OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT
cp -r "$LANDING"/. "$OUT"/
rm -rf "$OUT/.git" "$OUT/founder-story"
cp -r dist-founder "$OUT/founder-story"
npx wrangler pages deploy "$OUT" --project-name dextini --branch main --commit-dirty=true
