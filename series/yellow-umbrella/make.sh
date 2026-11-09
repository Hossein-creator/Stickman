#!/bin/bash
# usage: series/yellow-umbrella/make.sh <part 1-4> <videos/NN-slug>
# builds videos/NN-slug/tools/{body.js,defs.svg,ctr.html,sfx.mjs,dur.txt} from the shared lib + partN files, then runs the kit build
set -e
H=$(cd "$(dirname "$0")" && pwd); N=$1; D=$2
mkdir -p "$D/tools"
cat "$H/lib.js" "$H/part$N.js" "$H/tail.js" > "$D/tools/body.js"
cp "$H/defs.svg" "$D/tools/defs.svg"; cp "$H/ctr.html" "$D/tools/ctr.html"
cat "$H/sfx-lib.mjs" "$H/part$N-sfx.mjs" > "$D/tools/sfx.mjs"
grep -o 'const DURP = [0-9.]*' "$H/part$N.js" | grep -o '[0-9.]*$' > "$D/tools/dur.txt"
node "$H/../../tools/kit/build.mjs" "$D"
