// Builds videos/NN-slug from the 10-the-circle template + gen/NN/scene.js + gen/NN/events.js
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const T = path.join(root, "videos", "10-the-circle");
const html = fs.readFileSync(path.join(T, "index.html"), "utf8");
const snd = fs.readFileSync(path.join(T, "tools", "sound.mjs"), "utf8");
const cfg = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "reels.json"), "utf8"));
for (const r of cfg) {
  const dir = path.join(root, "videos", r.id);
  fs.mkdirSync(path.join(dir, "tools"), { recursive: true });
  fs.mkdirSync(path.join(dir, "assets", "fonts"), { recursive: true });
  fs.copyFileSync(path.join(T, "assets", "fonts", "consolab.ttf"), path.join(dir, "assets", "fonts", "consolab.ttf"));
  for (const f of ["hyperframes.json", "package.json", "meta.json"]) fs.writeFileSync(path.join(dir, f), fs.readFileSync(path.join(T, f), "utf8").replaceAll("10-the-circle", r.id));
  const scene = fs.readFileSync(path.join(import.meta.dirname, r.n, "scene.js"), "utf8");
  const a = html.indexOf("        // ---------- scene:");
  const b = html.indexOf("        window.__timelines");
  let out = html.slice(0, a) + scene + "\n" + html.slice(b);
  out = out.replace('<span class="lbl">STEPS OUT</span> <span id="num">00</span>', `<span class="lbl">${r.label}</span> <span id="num">00</span>`);
  if (r.extraSvg) out = out.replace('<g id="world"></g>', '<g id="world"></g>' + r.extraSvg);
  fs.writeFileSync(path.join(dir, "index.html"), out);
  const ev = fs.readFileSync(path.join(import.meta.dirname, r.n, "events.js"), "utf8");
  const sa = snd.indexOf("// ---- hesitation");
  const sb = snd.indexOf("// ---- light reverb");
  let s = snd.slice(0, sa) + ev + "\n" + snd.slice(sb);
  s = s.replace("const GROW = [4.3, 5.7, 7.1];", `const GROW = ${JSON.stringify(r.grow)};`).replace("let seed = 71;", `let seed = ${r.seed};`);
  fs.writeFileSync(path.join(dir, "tools", "sound.mjs"), s);
  console.log("built", r.id);
}
