// ---- "the storm" TEST: howling wind + rain that follow the storm, a crash per problem, thunder, slow-mo heartbeat on the catch ----
const SLOW0 = 6.4, SLOW1 = 7.8, SLOWK = 0.35;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => 1 - (1 - SLOWK) * wn(t, SLOW0, SLOW0 + 0.1) * (1 - wn(t, SLOW1 - 0.3, SLOW1));
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const storyOf = (t) => TS[Math.min(TS.length - 1, Math.floor(t / TSTEP))];
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const storm = (s) => clamp(0.12 + 0.88 * wn(s, 0.6, 5.0), 0, 1) * (1 - wn(s, 8.8, 10.4));

bed([[0, [45, 52, 57]], [1.5, [43, 50, 55]], [4.0, [41, 48, 53, 56]], [6.25, [40, 47, 52]], [realOf(6.75), [45, 52, 57, 61]], [realOf(7.5), [50, 57, 62, 66, 69]], [11.2, [50, 57, 62, 66]]], 99, 38);
// wind: band noise whose brightness and loudness follow the storm, ducked in slow motion
{
  let lp = 0, lp2 = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR, s = storyOf(t), I = storm(s), slow = speedAt(t);
    lp += (rnd() - lp) * (0.01 + 0.05 * I * (0.7 + 0.3 * Math.sin(t * 1.7)));
    lp2 += (rnd() - lp2) * 0.35;
    const g = (0.05 + 0.18 * I) * (0.35 + 0.65 * slow) * Math.min(1, t / 0.4);
    add(i, lp * g, 0.3 * Math.sin(t * 0.9));
    add(i, lp2 * 0.012 * I * slow, -0.2); // rain hiss
  }
}
// hook slams
[0.15, 0.4, 0.65].forEach((t, i) => { thump(t, 0.11, 55 + i * 6, 0); noise(t, 0.08, 0.06, 0, 0.6, (p) => 1 - p); });
// each problem: whoosh in, crash, debris
const DEB = [[1.6, 600], [2.6, 120], [3.5, 520], [4.4, 170], [5.3, 560]];
for (const [s, x] of DEB) {
  const t = realOf(s);
  sweep(t - 0.6, 0.6, 0.07, panX(x + 300), 0.05, 0.5);
  thump(t, 0.15, 48, panX(x)); noise(t, 0.5, 0.12, panX(x), 0.45, (p) => Math.exp(-p * 6));
  for (let i = 0; i < 7; i++) click(t + 0.06 + i * 0.05 + 0.03 * rnd(), 0.035, panX(x) + 0.3 * rnd());
}
// thunder
for (const t of [3.0, 5.0]) { noise(t, 0.08, 0.12, 0, 0.9, (p) => 1 - p); noise(t + 0.05, 2.2, 0.14, 0, 0.015, (p) => Math.exp(-p * 2) * (0.6 + 0.4 * Math.sin(p * 40))); thump(t + 0.1, 0.1, 34, 0); }
// DOUBT tears between them
sweep(realOf(5.9), 0.55, 0.12, 0, 0.08, 0.7);
tone(realOf(6.25), hz(40), 1.4, 0.07, 0, 0.01, 1.4);
// slow motion: heartbeat, then the catch
const tc = realOf(6.75);
for (const t of [realOf(6.42), realOf(6.6)]) { thump(t, 0.12, 44, 0); thump(t + 0.2, 0.08, 40, 0); }
thump(tc, 0.18, 52, 0); noise(tc, 0.12, 0.06, 0, 0.5, (p) => 1 - p);
[64, 69, 73, 76].forEach((m, i) => bell(tc + 0.05 + i * 0.1, m, 0.035, 0, 1.0));
// hug and the walk into the wind: steps
for (let k = 0; k < 4; k++) step(realOf(8.4 + 0.45 * k + 0.2), 0.07, 0);
// the storm breaks: soft birds
const chirp = (t, f, pan) => { const s0 = Math.floor(t * SR); for (let i = 0; i < SR * 0.09; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * (f + 1800 * tt) * tt) * Math.sin(Math.PI * tt / 0.09) * 0.025, pan); } };
for (let i = 0; i < 8; i++) chirp(10.6 + i * 0.32 + 0.1 * rnd(), 2700 + 500 * rnd(), 0.5 * rnd());
// punchline slams
[11.2, 11.38, 11.56, 11.76].forEach((t) => { thump(t, 0.06, 70, 0); click(t, 0.05, 0); });
thump(12.3, 0.13, 48, 0); thump(12.6, 0.1, 55, 0); noise(12.3, 0.3, 0.05, 0, 0.3, (p) => Math.exp(-p * 5));
