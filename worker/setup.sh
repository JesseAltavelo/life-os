#!/bin/bash
# One-time setup of the Life OS worker. Run from the worker folder: ./setup.sh
set -e;cd "$(dirname "$0")"
npx wrangler login
if grep -q REPLACE_KV wrangler.toml;then
 ID=$(npx wrangler kv namespace create TOK 2>&1 | grep -oE '[0-9a-f]{32}' | head -1)
 [ -n "$ID" ] || { echo "Could not create KV namespace"; exit 1; }
 sed -i '' "s/REPLACE_KV/$ID/" wrangler.toml
fi
npx wrangler deploy
KEY=$(openssl rand -hex 12)
echo "$KEY" | npx wrangler secret put KEY
echo; echo "Paste your Google OAuth Client ID, then press Enter:"; npx wrangler secret put CID
echo; echo "Paste your Google OAuth Client secret, then press Enter:"; npx wrangler secret put CSECRET
echo; echo "Your to-do sync key (paste this into the app): $KEY"
echo "Now open this once in a browser to connect Google:  <your worker address>/auth/start?k=$KEY"
