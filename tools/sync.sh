#!/usr/bin/env sh
# Copy the shared engine and fonts into a video project so it renders on its own.
# usage: tools/sync.sh videos/01-the-umbrella
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/$1"
mkdir -p "$DIR/assets/fonts"
cp "$ROOT/shared/engine.js" "$DIR/assets/engine.js"
cp "$ROOT"/shared/fonts/*.woff2 "$DIR/assets/fonts/"
