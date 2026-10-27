// ---- "let her go": steps, rope creak and jolt on each tug, a "hey" chirp wave, a sulky thud, a yawn, knot fiddling, the rope falls in slow motion, heartbeat, sprint, a warm clasp and bells, walking together ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[7.25, 8.25]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_GO = 0.15, T_STOP = 1.15, T_TUG = [1.5, 1.8];
const T_STR = 2.3, T_WAVE = 3.05, T_CHECK = 3.8;
const T_SIT = 4.35, T_PEEK = 5.0, T_YAWN = 5.0;
const T_UNTIE = 6.1, T_OFFER = 6.85, T_DROP = 7.3, T_STAND = 8.2, T_LETGO = 8.6, T_RUN = 8.8, T_HOLD = 9.35, T_WALK = 9.75, T_END = 11.2;
const rH = realOf(T_HOLD);

// tense, teasing bed; it empties when the rope falls; warm major after the hand-hold
bed([[0, [45, 52, 55]], [realOf(2.2), [43, 50, 53]], [realOf(4.3), [41, 48, 52]], [realOf(6.0), [45, 52]], [realOf(T_DROP), [40, 47]], [rH, [48, 55, 59, 64]], [realOf(10.6), [53, 57, 60, 65]]], 10.7, 45);
// she walks off
for (let k = 0; k < 6; k++) step(realOf(T_GO + 0.1 + k * 0.17), 0.05, 0.1 + k * 0.08);
// tugs: creak + jolt
T_TUG.forEach((t0) => { const t = realOf(t0); noise(t - 0.06, 0.12, 0.05, 0, 0.12, (p) => Math.sin(Math.PI * p)); tone(t - 0.05, 240, 0.12, 0.02, 0, 0.01, 18); thump(t, 0.12, 70, -0.2); });
// the stranger walks in, a "hey!" chirp as she waves
for (let k = 0; k < 5; k++) step(realOf(T_STR + 0.1 + k * 0.15), 0.035, 0.6);
const chirp = (t, m0, m1, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(0.14 * SR); for (let i = 0; i < n; i++) { const p = i / n, f = hz(lerp(m0, m1, p)); add(s0 + i, Math.sin(2 * Math.PI * f * i / SR) * Math.sin(Math.PI * p) * 0.03, pan); } };
chirp(realOf(T_WAVE + 0.05), 76, 81, 0.3); chirp(realOf(T_WAVE + 0.25), 79, 84, 0.3); chirp(realOf(T_WAVE + 0.45), 70, 74, 0.6);
// she sits down in a huff
thump(realOf(T_SIT + 0.3), 0.12, 60, 0.3); noise(realOf(T_SIT + 0.3), 0.15, 0.04, 0.3, 0.2, (p) => 1 - p);
// his yawn: a slow sliding tone
{ const t0 = realOf(T_YAWN), n = Math.floor(0.7 * SR), s0 = Math.floor(t0 * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n; ph += lerp(260, 150, p) / SR; add(s0 + i, Math.sin(2 * Math.PI * ph) * Math.sin(Math.PI * p) * 0.025, -0.3); } }
// untie: little rope clicks
for (let k = 0; k < 8; k++) click(realOf(T_UNTIE + 0.15 + k * 0.07), 0.025, -0.3);
// he offers it... opens his hand: silence, then the rope hits the floor (slow)
noise(realOf(T_DROP), realOf(T_DROP + 0.55) - realOf(T_DROP), 0.04, -0.2, 0.05, (p) => p);
thump(realOf(T_DROP + 0.55), 0.3, 40, -0.2); noise(realOf(T_DROP + 0.55), 0.3, 0.06, -0.2, 0.2, (p) => Math.exp(-p * 5));
tone(realOf(T_DROP + 0.55), hz(33), 1.6, 0.04, 0, 0.03, 1.4);
[realOf(7.9), realOf(8.1)].forEach((t) => { thump(t, 0.1, 48, 0); thump(t + 0.16, 0.07, 44, 0); });
// she stands, drops her end, sprints back
click(realOf(T_LETGO + 0.25), 0.04, 0.4); thump(realOf(T_LETGO + 0.25), 0.06, 60, 0.4);
sweep(realOf(T_RUN) - 0.05, 0.45, 0.06, 0.2, 0.03, 0.3);
for (let k = 0; k < 4; k++) step(realOf(T_RUN + 0.08 + k * 0.13), 0.05, 0.4 - k * 0.12);
// the hand-hold: soft clap + chord bells
noise(rH, 0.03, 0.08, 0, 0.6, (p) => 1 - p); thump(rH, 0.1, 80, 0);
[[0, 72], [0.06, 76], [0.12, 79], [0.2, 84]].forEach(([d, m]) => bell(rH + d, m, 0.025, 0, 1.4));
// walking together
for (let k = 0; k < 7; k++) { step(realOf(T_WALK + 0.1 + k * 0.2), 0.035, -0.1 + k * 0.05); step(realOf(T_WALK + 0.2 + k * 0.2), 0.03, 0.1 + k * 0.05); }
// last lines
[10.9, 11.04, 11.18, 11.34].forEach((t, i) => thump(t, i === 3 ? 0.09 : 0.05, i === 3 ? 52 : 70, 0));
[11.95, 12.08, 12.2, 12.34, 12.56].forEach((t, i) => { thump(t, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.56, 76, 0.02, 0, 1.2); bell(12.6, 83, 0.015, 0, 1.2);
