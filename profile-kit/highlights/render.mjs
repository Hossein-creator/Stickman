// Renders every scene of index.html to profile-kit/final/highlights/<scene>.png
// Usage: node profile-kit/highlights/render.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "..", "final", "highlights");
mkdirSync(out, { recursive: true });
const url = pathToFileURL(path.join(dir, "index.html")).href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(url);
const scenes = await page.evaluate(() => window.SCENES);
for (const s of scenes) {
  await page.goto("about:blank");
  await page.goto(url + "#" + s);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: path.join(out, s + ".png") });
  console.log("wrote", s);
}
await browser.close();
