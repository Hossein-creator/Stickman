#!/bin/bash
# usage: series/yellow-umbrella/make.sh <part 1-4> <videos/NN-slug>
# builds videos/NN-slug/tools/{body.js,defs.svg,ctr.html,sfx.mjs,dur.txt} from the shared lib + partN files, then runs the kit build.
# partN.js holds one line "const MAPDEF = [...];" (video time -> story time); the video length is computed from it.
set -e
H=$(cd "$(dirname "$0")" && pwd); N=$1; D=$2
mkdir -p "$D/tools"
cat "$H/lib.js" "$H/part$N.js" "$H/tail.js" > "$D/tools/body.js"
cp "$H/defs.svg" "$D/tools/defs.svg"; cp "$H/ctr.html" "$D/tools/ctr.html"
MAP=$(grep -m1 'const MAPDEF = ' "$H/part$N.js")
{ cat "$H/sfx-lib.mjs"; echo "$MAP"; cat "$H/part$N-sfx.mjs" "$H/sfx-remap.mjs"; } > "$D/tools/sfx.mjs"
node -e "$MAP; let v=0; for (const e of MAPDEF) v += e[0]==='freeze' ? e[2] : e[0]==='rew' ? e[3] : (e[2]-e[1])/e[3]; console.log(Math.ceil(v - 1e-6))" > "$D/tools/dur.txt"
echo "dur $(cat "$D/tools/dur.txt")"
node "$H/../../tools/kit/build.mjs" "$D"
