// ---- "the stairs": a knock-knock for every rough block he places, endless sanding on the perfect one, silence at the end ----
bed([[0, [45, 52, 57]], [3.3, [47, 54, 59]], [6.0, [48, 55, 60]], [8.7, [50, 57, 62, 66, 69]]], 9.6, 40);
// sanding: soft rhythmic scrubs whenever the level is off the block (mirrors LEVELS in body.js)
const LEVELS = [[2.0, 2.9], [5.0, 5.9], [8.0, 8.9], [11.0, 12.6]];
const checking = (t) => LEVELS.some(([a, b]) => t > a - 0.1 && t < b + 0.1);
for (let t = 0.1; t < 13.4; t += Math.PI / 14) if (!checking(t)) noise(t, 0.16, 0.022 * (t > 9.6 ? 0.6 : 1), panX(240), 0.25, (p) => Math.sin(Math.PI * p));
// level: click on, a small "wrong" blip, click off
for (const [a, b] of LEVELS) { click(a + 0.2, 0.05, panX(245)); tone(a + 0.6, hz(58), 0.2, 0.025, panX(245), 0.005, 12); tone(a + 0.75, hz(56), 0.25, 0.025, panX(245), 0.005, 10); if (b < 12) click(b - 0.2, 0.04, panX(245)); }
// action taker: place block (two knocks), steps up; one rising note per block
const NOTES = [57, 59, 60, 62, 64, 65, 67, 69, 71];
for (let k = 0; k < 9; k++) {
  const t0 = 0.6 + k * 0.9, pan = panX(500 + 50 * k);
  wood(t0 + 0.22, 0.06, pan); wood(t0 + 0.34, 0.045, pan);
  step(t0 + 0.6, 0.05, pan); step(t0 + 0.82, 0.045, pan);
  tone(t0 + 0.25, hz(NOTES[k]), 0.8, 0.018, 0, 0.01, 3.5);
}
// he steps into the light
[69, 74, 78, 81].forEach((m, i) => bell(9.0 + i * 0.13, m, 0.03, panX(950)));
sweep(9.2, 0.8, 0.03, panX(950), 0.02, 0.2);
typing(9.4, 20, 22);
typing(10.6, 21, 22);
