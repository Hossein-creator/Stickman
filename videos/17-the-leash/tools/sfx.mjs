// ---- "the leash": pad pulled down at every buzz, opens up when he walks to the door ----
bed([[0, [50, 57, 62]], [1.62, [48, 55, 58]], [3.4, [50, 57, 62]], [4.42, [46, 53, 58]], [6.05, [50, 57, 62]], [7.4, [53, 57, 60, 64]], [8.6, [53, 60, 64, 69, 72]]], 10.0);
// footsteps: replay the hip path and step on every half stride (mirrors K in index.html)
{
  const K = [[0, 110], [0.3, 110], [1.6, 270], [2.7, 270], [3.25, 190], [3.4, 190], [4.4, 350], [5.5, 350], [6.0, 270], [6.05, 270], [6.6, 430], [7.4, 430], [9.0, 590], [14, 590]];
  const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
  const hip = (t) => { for (let i = 1; i < K.length; i++) if (t < K[i][0]) return K[i - 1][1] + (K[i][1] - K[i - 1][1]) * ez((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); return 590; };
  let last = Math.round((hip(0) - 110) / 80);
  for (let t = 0; t < 13.9; t += 0.005) {
    const h = hip(t), s = Math.round((h - 110) / 80 - 0.25);
    if (s !== last) { step(t, t > 7.4 ? 0.09 : 0.065, panX(h)); last = s; }
  }
}
// buzzes: phone vibration + notification ping
const buzz2 = (t, g, pan) => {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.42; i++) {
    const tt = i / SR, on = Math.floor(tt / 0.07) % 2 === 0 ? 1 : 0.15;
    add(s0 + i, Math.sin(2 * Math.PI * 170 * tt) * Math.sign(Math.sin(2 * Math.PI * 85 * tt)) * 0.5 * on * g, pan);
  }
};
[1.62, 4.42, 6.62].forEach((t, i) => { buzz2(t, 0.09, panX(330 + i * 80)); tone(t + 0.02, 1760, 0.25, 0.05, 0, 0.002, 14); tone(t + 0.12, 2350, 0.3, 0.04, 0, 0.002, 12); });
// the throw: whoosh, phone clatters on the floor
sweep(7.0, 0.45, 0.07, panX(420), 0.03, 0.4);
click(7.75, 0.12, panX(110)); click(7.86, 0.06, panX(110)); click(7.94, 0.03, panX(110));
// it keeps buzzing on the floor, quieter and ignored
[8.1, 8.9, 9.7, 10.6].forEach((t, i) => buzz2(t, 0.05 * (1 - i * 0.2), panX(110)));
// the door opens up: soft rising shimmer
for (let s = 0; s < 8; s++) tone(8.6 + s * 0.09, 880 + s * 140, 0.6, 0.012, panX(590), 0.01, 6);
[69, 73, 76, 81].forEach((m, i) => bell(9.0 + i * 0.12, m, 0.03, panX(590)));
typing(9.8, 16, 22);
typing(10.8, 18, 22);
