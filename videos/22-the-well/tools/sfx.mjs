// ---- "the well": shovel bites in a steady rhythm; one rhythm keeps stopping, one never does. Water rushes in. ----
bed([[0, [45, 52, 57]], [3.4, [43, 50, 55]], [6.0, [41, 48, 53, 57]], [8.0, [50, 57, 62, 66, 69]], [10.0, [48, 55, 60, 64]]], 10.4, 41);
const dig = (t, g, pan) => { noise(t, 0.09, g, pan, 0.18, (p) => Math.exp(-p * 4)); tone(t, 95, 0.12, g * 0.6, pan, 0.002, 30); };
const toss = (t, g, pan) => noise(t, 0.2, g * 0.5, pan, 0.06, (p) => Math.sin(Math.PI * p));
// finisher: every swing from 0.5 to the water (deeper = darker, more muffled)
for (let n = 0; ; n++) {
  const t = (n + 0.45) / 1.5;
  if (t > 8.0) break;
  if (t < 0.5) continue;
  dig(t, 0.08 * (1 - 0.35 * (t / 8)), panX(600));
  toss(t + 0.35, 0.05, panX(640));
}
// starter: a few swings per hole, a sigh, then steps to the next one
for (let k = 0; k < 6; k++) {
  const s = 0.3 + k * 1.6;
  for (let n = 0; n < 30; n++) {
    const t = (n + 0.45 - 0.3) / 1.5;
    if (t >= s + 0.15 && t <= s + 1.0) { dig(t, 0.06, panX(80 + 70 * k)); toss(t + 0.35, 0.035, panX(80 + 70 * k)); }
  }
  tone(s + 1.12, hz(45), 0.35, 0.03, panX(80 + 70 * k), 0.05, 6);
  if (k < 5) { step(s + 1.38, 0.05, panX(60 + 70 * k)); step(s + 1.55, 0.04, panX(90 + 70 * k)); }
}
// water: deep thump, rush, shimmer spreading out
thump(8.0, 0.14, 50, panX(600));
sweep(8.0, 1.6, 0.09, panX(600), 0.02, 0.25);
for (let i = 0; i < 26; i++) tone(8.1 + i * 0.05, 1400 + 90 * i + 200 * rnd(), 0.4, 0.008, 0.6 * rnd(), 0.005, 9);
for (let i = 0; i < 10; i++) noise(8.4 + i * 0.12, 0.05, 0.03, 0.5 * rnd(), 0.5, (p) => 1 - p); // droplets
[69, 74, 76, 81].forEach((m, i) => bell(8.6 + i * 0.13, m, 0.03, panX(600)));
// dotted lines appear under every starter hole
for (let k = 0; k < 6; k++) tone(8.9 + k * 0.12, hz(76 + k), 0.12, 0.018, panX(90 + 70 * k), 0.002, 25);
typing(9.3, 31, 24);
typing(10.8, 22, 22);
