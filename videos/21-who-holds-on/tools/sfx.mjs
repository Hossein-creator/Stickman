// ---- "who holds on": tense low pad, bar creaks, a thud for every man who lets go, clang when he grabs back on ----
bed([[0, [45, 52, 55]], [3.6, [43, 50, 53]], [5.3, [45, 52, 57, 60]], [9.0, [48, 55, 60]], [10.0, [45, 52, 57, 64]]], 10.0, 41);
// clock tick every half second
for (let t = 0.2; t < 12.6; t += 0.5) click(t, 0.025, 0);
const clang = (t, g, pan) => { for (const [f, d, a] of [[620, 6, 1], [1180, 8, 0.6], [1830, 11, 0.35], [2950, 16, 0.2]]) tone(t, f, 1.2, g * a, pan, 0.001, d); };
const creak = (t, g, pan) => { const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 0.35; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (140 + 60 * Math.sin(tt * 20)) * tt) * Math.sin(Math.PI * tt / 0.35) * g * (Math.sin(tt * 600) > 0 ? 1 : 0.4), pan); } };
for (const t of [0.8, 2.9, 6.4, 8.1, 11.2]) creak(t, 0.02, 0.2 * rnd());
// drops: slip whoosh + body thud
const XS = [130, 300, 470, 640];
for (const [t, i] of [[1.2, 0], [2.4, 1], [3.6, 3], [9.0, 2]]) {
  sweep(t, 0.22, 0.05, panX(XS[i]), 0.05, 0.4);
  thump(t + 0.26, 0.12, 58, panX(XS[i]));
  noise(t + 0.26, 0.08, 0.05, panX(XS[i]), 0.3, (p) => 1 - p);
  step(t + 0.9, 0.04, panX(XS[i]));
}
// "TOLD YOU." low mumble
for (let i = 0; i < 4; i++) tone(3.95 + i * 0.12, hz(43 + (i % 2) * 2), 0.12, 0.03, panX(130), 0.01, 18);
// he looks at his hands: heartbeat
for (let i = 0; i < 3; i++) { thump(4.2 + i * 0.32, 0.07, 48, panX(640)); thump(4.36 + i * 0.32, 0.05, 44, panX(640)); }
// jump and catch
sweep(5.0, 0.32, 0.06, panX(640), 0.05, 0.45);
clang(5.32, 0.07, panX(640));
// discipline shakes before he lets go
for (let i = 0; i < 6; i++) noise(8.1 + i * 0.15, 0.06, 0.02, panX(470), 0.2);
// alone at the top: opening chord
[57, 64, 69, 72].forEach((m, i) => bell(9.6 + i * 0.15, m, 0.03, panX(640)));
typing(0.3, 21, 24);
typing(10.2, 27, 22);
