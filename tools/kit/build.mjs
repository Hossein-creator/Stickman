// Builds a stickman reel from the kit: node tools/kit/build.mjs videos/NN-slug
//   new folder  -> copies project files + font from videos/10-the-circle
//   tools/body.js (+ optional tools/defs.svg, tools/ctr.html) -> index.html
//   tools/sfx.mjs -> tools/sound.mjs -> assets/audio/mix.wav
//   optional tools/dur.txt: reel length in seconds (default 14)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const kit = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1"));
const root = path.join(kit, "..", "..");
const dir = path.resolve(process.argv[2]);
const name = path.basename(dir);
const tpl = path.join(root, "videos", "10-the-circle");
const rd = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const dur = rd(path.join(dir, "tools", "dur.txt")).trim() || "14";

fs.mkdirSync(path.join(dir, "tools"), { recursive: true });
fs.mkdirSync(path.join(dir, "assets", "fonts"), { recursive: true });
fs.mkdirSync(path.join(dir, "renders"), { recursive: true });
if (!fs.existsSync(path.join(dir, "hyperframes.json"))) {
  fs.copyFileSync(path.join(tpl, "hyperframes.json"), path.join(dir, "hyperframes.json"));
  fs.copyFileSync(path.join(tpl, "assets", "fonts", "consolab.ttf"), path.join(dir, "assets", "fonts", "consolab.ttf"));
  fs.writeFileSync(path.join(dir, "package.json"), rd(path.join(tpl, "package.json")).replace(/10-the-circle/g, name));
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ id: name, name, createdAt: new Date().toISOString() }, null, 2));
}
const body = path.join(dir, "tools", "body.js");
if (fs.existsSync(body)) {
  const head = rd(path.join(kit, "head.html"))
    .replace("<!--DEFS-->", rd(path.join(dir, "tools", "defs.svg")).trimEnd())
    .replace("<!--CTR-->", rd(path.join(dir, "tools", "ctr.html")).trim())
    .replace(/data-duration="14"/g, `data-duration="${dur}"`)
    .replace("const DUR = 14;", `const DUR = ${dur};`);
  fs.writeFileSync(path.join(dir, "index.html"), head + rd(body));
  console.log("wrote index.html");
}
const sfx = path.join(dir, "tools", "sfx.mjs");
if (fs.existsSync(sfx)) {
  const snd = path.join(dir, "tools", "sound.mjs");
  fs.writeFileSync(snd, rd(path.join(kit, "snd-head.mjs")).replace("DUR = 14,", `DUR = ${dur},`) + "\n" + rd(sfx) + "\n" + rd(path.join(kit, "snd-tail.mjs")));
  console.log(execFileSync(process.execPath, [snd]).toString().trim());
}
