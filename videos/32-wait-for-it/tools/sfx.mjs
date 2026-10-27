// ---- "wait for it": soft sad bed, steps, a glint chime, sprint, a brush swish + bloop per stroke, silence + heartbeat, SPLAT, two laughs, bright chords ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[7.7, 8.7]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_IN = 0.3, T_SEE = 1.25, T_GLINT = 1.55, T_RUN = 1.85, T_GRAB = 2.45, T_BACK = 2.6, T_KNEEL = 3.2;
const STROKES = [3.6, 4.05, 4.5, 4.95, 5.4, 5.85];
const T_TOUCH = 6.35, T_LOOKHAND = 6.75, T_GRABB = 7.45, T_SPLAT = 7.9, T_LAUGH = 8.75, T_COLOR = 9.0;
const rS = realOf(T_SPLAT), rC = realOf(T_COLOR);

// sad minor bed, it drops out for the tense beat, comes back major after the splat
bed([[0, [45, 48, 52]], [2.0, [41, 45, 48, 52]], [3.4, [43, 46, 50]], [5.0, [45, 48, 52, 55]], [6.3, [40, 47]], [rC, [48, 52, 55, 60]], [10.6, [53, 57, 60, 64]]], 10.8, 45);
// walk in, stop
for (let k = 0; k < 5; k++) step(realOf(T_IN + 0.1 + k * 0.19), 0.05, -0.6 + k * 0.1);
// glint chime on the paint box
bell(realOf(T_GLINT), 88, 0.03, -0.6, 2.5); bell(realOf(T_GLINT) + 0.06, 95, 0.02, -0.6, 2.5);
// sprint there and back, whooshes
sweep(realOf(T_RUN) - 0.05, 0.35, 0.06, -0.4, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_RUN + 0.1 + k * 0.14), 0.05, -0.4 - k * 0.08);
wood(realOf(T_GRAB), 0.06, -0.7);
sweep(realOf(T_BACK) - 0.05, 0.35, 0.06, -0.4, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_BACK + 0.08 + k * 0.14), 0.05, -0.6 + k * 0.12);
thump(realOf(T_KNEEL), 0.08, 70, 0);
// brush strokes: a wet swish and a little bloop, each one a step up
STROKES.forEach((t0, i) => {
  const t = realOf(t0);
  sweep(t + 0.02, 0.24, 0.05, 0.1, 0.08, 0.5);
  tone(t + 0.16, hz(72 + [0, 3, 5, 7, 10, 12][i]), 0.18, 0.03, 0.1, 0.004, 14);
  tone(t + 0.16, hz(84 + [0, 3, 5, 7, 10, 12][i]), 0.1, 0.012, 0.1, 0.004, 20);
});
// she touches her cheek ... silence, a heartbeat, a nervous gulp
click(realOf(T_TOUCH + 0.2), 0.03, 0.2);
[6.8, 7.2].forEach((s) => { thump(realOf(s), 0.12, 48, 0); thump(realOf(s) + 0.16, 0.08, 44, 0); });
tone(realOf(7.05), 300, 0.12, 0.02, -0.1, 0.01, 12); tone(realOf(7.1), 220, 0.12, 0.02, -0.1, 0.01, 12);
// the grab and the SPLAT (slow motion)
sweep(realOf(T_GRABB) , realOf(T_SPLAT) - realOf(T_GRABB), 0.08, 0, 0.02, 0.35);
thump(rS, 0.36, 40, 0); noise(rS, 0.5, 0.14, 0, 0.35, (p) => Math.exp(-p * 6));
for (let i = 0; i < 12; i++) click(rS + 0.05 + i * 0.05 + 0.02 * rnd(), 0.03, 0.4 * rnd());
tone(rS, hz(36), 1.2, 0.05, 0, 0.02, 2.2);
// two laughs: his lower, hers higher
const laugh = (t0, f0, pan) => { for (let k = 0; k < 6; k++) { const t = t0 + k * 0.14; noise(t, 0.05, 0.025, pan, 0.4, (p) => 1 - p); tone(t + 0.01, f0 * (1 + 0.05 * Math.sin(k)), 0.1, 0.025, pan, 0.01, 16); } };
laugh(realOf(T_LAUGH), 170, -0.2); laugh(realOf(T_LAUGH) + 0.07, 290, 0.2);
laugh(realOf(T_LAUGH) + 1.1, 160, -0.2); laugh(realOf(T_LAUGH) + 1.15, 300, 0.2);
// colour back: bright bells
[[0, 72], [0.08, 76], [0.16, 79], [0.24, 84]].forEach(([d, m]) => bell(rC + d, m, 0.025, 0, 1.4));
// last lines
[11.0, 11.14, 11.26, 11.38, 11.52].forEach((t, i) => thump(t, i === 4 ? 0.09 : 0.05, i === 4 ? 52 : 70, 0));
[12.0, 12.12, 12.26, 12.4, 12.52, 12.7].forEach((t, i) => { thump(t, i === 5 ? 0.12 : 0.05, i === 5 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.7, 76, 0.02, 0, 1.2); bell(12.75, 83, 0.015, 0, 1.2);
