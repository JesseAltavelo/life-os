#!/bin/bash
set -e;cd "$(dirname "$0")";B=$(date +%s)
sed -i '' "s/^const BUILD='[^']*'/const BUILD='$B'/" app.js
sed -i '' "s/app.js?b=[^\"]*/app.js?b=$B/" index.html
echo "{\"b\":\"$B\"}">version.json
node --check app.js
git add -A;git commit -qm "${1:-update}" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>";git push -q origin main
echo deployed $B
