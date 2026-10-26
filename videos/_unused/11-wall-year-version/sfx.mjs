// ---- "the wall": warm pad that darkens with every brick ----
bed([[0, [57, 61, 64, 69]], [3.3, [57, 60, 64]], [5.1, [53, 57, 60]], [6.9, [50, 53, 57]], [8.6, [45, 52]]], 9.4);
// soft heartbeat while the heart is still visible
for (let b = 0; b < 7; b++) { const g = 0.1 * (1 - b / 7); thump(0.3 + b * 0.84, g, 48, 0); thump(0.45 + b * 0.84, g * 0.7, 48, 0); }
// hands let go
noise(1.2, 0.25, 0.04, 0, 0.1);
// every brick: a short whistle while it falls, then a heavy stone knock
[1.5, 2.4, 3.3, 4.2, 5.1, 6.0, 6.9, 7.8].forEach((d, k) => {
  sweep(d, 0.38, 0.03, 0, 0.02, 0.2);
  const t = d + 0.38;
  thump(t, 0.32 + 0.02 * k, 62 - k * 2, 0);
  noise(t, 0.06, 0.14, 0, 0.5, (p) => Math.exp(-p * 6));
  tone(t, 210 - k * 8, 0.25, 0.06, 0, 0.001, 22);
  noise(t + 0.02, 0.5, 0.025, k % 2 ? 0.3 : -0.3, 0.08);
});
// the step back, then near silence before the punchline
step(8.7, 0.06, panX(260)); step(8.75, 0.06, panX(540));
step(9.05, 0.05, panX(240)); step(9.1, 0.05, panX(560));
tone(8.4, 98, 1.6, 0.05, 0, 0.3, 1.5);
typing(9.8, 32);
typing(11.0, 29);
// the step back after letting go
step(1.55, 0.06, panX(270)); step(1.6, 0.06, panX(530)); step(1.88, 0.05, panX(250)); step(1.92, 0.05, panX(550));
