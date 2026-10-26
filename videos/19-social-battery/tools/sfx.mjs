// ---- "social battery": muffled party beat, then a quiet warm room; charge blips up, drain blips down ----
bed([[0, [45, 52, 57]], [5.0, [50, 57, 62, 66]], [6.4, [47, 54, 59, 62]], [8.2, [45, 52, 57, 60]], [10.2, [50, 57, 62, 66, 69]]], 10.8, 45);
// party: kick + bass on a 120 bpm grid, crowd murmur, cut at 5.0
for (let b = 0; b < 10; b++) {
  const t = 0.05 + b * 0.5, g = 1 - smooth(t, 4.6, 5.0);
  thump(t, 0.12 * g, 52, 0);
  tone(t + 0.25, hz(33 + [0, 0, 3, 5][b % 4]), 0.22, 0.05 * g, 0, 0.01, 9);
  noise(t + 0.25, 0.04, 0.03 * g, 0.2 * rnd(), 0.7, (p) => 1 - p);
}
noise(0, 5.1, 0.05, 0, 0.05, (p) => { const t = p * 5.1; return Math.min(1, t / 0.3) * (1 - smooth(t, 4.7, 5.1)); });
// the cut: lamp switch, room tone
click(5.05, 0.12, panX(60));
noise(5.1, 8.6, 0.012, 0, 0.01);
// battery blips: rising pitch when charging, falling when draining (one per ~10%)
const blips = (t0, t1, n, m0, m1, pan, g) => { for (let i = 0; i < n; i++) { const t = t0 + (t1 - t0) * (i / n); tone(t, hz(m0 + (m1 - m0) * (i / n)), 0.08, g, pan, 0.002, 30); } };
blips(1.0, 4.8, 9, 76, 64, panX(150), 0.025);   // introvert drains at the party
blips(0.3, 4.6, 7, 64, 76, panX(620), 0.025);   // extrovert charges
tone(4.4, hz(52), 0.5, 0.04, panX(150), 0.01, 5); // low-battery warning
tone(4.75, hz(52), 0.5, 0.04, panX(150), 0.01, 5);
wood(5.6, 0.05, panX(150));                      // sinks into the armchair
blips(5.9, 8.0, 10, 64, 79, panX(150), 0.03);   // charging by the lamp
blips(5.2, 8.0, 10, 76, 60, panX(620), 0.025);  // she drains alone
tone(7.6, hz(50), 0.5, 0.04, panX(620), 0.01, 5);
tone(7.95, hz(50), 0.5, 0.04, panX(620), 0.01, 5);
// she walks over and sits on the floor beside him
for (let s = 0; s < 4; s++) step(8.45 + s * 0.3, 0.06, panX(640 - 70 * s));
thump(9.9, 0.05, 90, panX(360));
// both charging: soft rising chime
blips(10.2, 11.8, 10, 67, 81, panX(300), 0.03);
[74, 79, 83, 86].forEach((m, i) => bell(11.0 + i * 0.14, m, 0.025, panX(220)));
typing(10.6, 22, 24);
typing(11.6, 26, 24);
