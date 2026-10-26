// ---- "the fire": warm low pad, fire crackle that thins out as friends leave, flare when he feeds it ----
bed([[0, [50, 57, 62, 66]], [3.0, [47, 54, 59, 62]], [5.6, [45, 52, 57, 60]], [6.8, [43, 50, 55, 58]], [8.6, [50, 57, 62, 66, 69]], [10.4, [50, 57, 62]]], 10.6, 49);
// crackle density follows the fire size (mirrors fireK in body.js)
{
  const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
  const w = (t, a, b) => ez((t - a) / (b - a));
  const LEAVES = [1.0, 2.3, 4.4, 3.7, 3.0, 1.6];
  const k = (t) => { let v = 1; for (const tl of LEAVES) v -= 0.075 * w(t, tl + 0.4, tl + 1.4); return v + 0.55 * w(t, 8.55, 8.8) - 0.3 * w(t, 8.9, 10.3); };
  for (let t = 0.05; t < 13.6; t += 0.01) {
    const kk = k(t);
    if (rnd() * 0.5 + 0.5 < 0.06 * kk * kk) click(t, 0.025 + 0.035 * Math.abs(rnd()) * kk, 0.05 * rnd());
  }
  // soft roar of the flames
  noise(0, 13.8, 0.035, 0, 0.02, (p) => { const t = p * 13.8; return Math.min(1, t / 0.6) * k(t); });
}
// each friend: stands up (log creak), steps away into the dark
const LEAVERS = [[1.0, 40, -1], [1.6, 760, 1], [2.3, 115, -1], [3.0, 685, 1], [3.7, 610, 1], [4.4, 190, -1]];
for (const [tl, x, dir] of LEAVERS) {
  wood(tl + 0.1, 0.035, panX(x));
  for (let s = 0; s < 6; s++) step(tl + 0.6 + s * 0.36, 0.05 * (1 - s / 7), panX(x + dir * 60 * s));
}
// the friend stands too... a tense pause, then he picks up the stick
wood(6.85, 0.05, panX(520));
tone(6.9, hz(38), 1.0, 0.05, 0, 0.3, 1.5);
step(7.9, 0.06, panX(530));
noise(8.05, 0.12, 0.05, panX(480), 0.3);
// the throw: whoosh, log thump, fire flare
sweep(8.3, 0.35, 0.06, panX(440), 0.03, 0.35);
thump(8.62, 0.12, 70, 0);
sweep(8.62, 0.9, 0.08, 0, 0.02, 0.18);
for (let i = 0; i < 18; i++) click(8.65 + i * 0.04 + 0.02 * rnd(), 0.05, 0.3 * rnd());
wood(8.75, 0.04, panX(520));
// aging: a slow low bell
bell(9.0, 50, 0.05, 0, 0.8);
bell(10.2, 57, 0.035, 0, 0.9);
typing(0.3, 27, 24);
typing(10.9, 37, 22);
