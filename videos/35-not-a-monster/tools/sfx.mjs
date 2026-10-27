// ---- "not a monster": heavy steps, crowd gasp, a kid's run and fall, the ball bouncing, a spike clinks off, the rope snaps, sprint, leap, CATCH in slow motion, silence while he walks away, a light chord when the kid takes his hand, steps of the crowd coming ----
const lerp = (a, b, p) => a + (b - a) * p;
const SLOWS = [[4.7, 5.7]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_IN = 0.1, T_FLINCH = 0.65, T_KIDRUN = 1.0, T_TRIP = 1.55, T_BALLSTOP = 2.05, T_PICK = 2.2, T_WALK = 2.45, T_KNEEL = 3.0, T_TAKE = 3.4;
const T_SNAP = 4.15, T_SPRINT = 4.25, T_JUMP = 4.62, T_CATCH = 4.85, T_LAND = 5.25, T_SET = 5.9, T_TURN = 6.45, T_AWAY = 6.6;
const T_KIDGO = 7.2, T_HAND = 7.9, T_LIGHT = 8.2, T_CROWD = 8.6;
const SPIKES = [3.5, 4.95, 5.0, 8.22, 8.26, 8.3, 8.32, 8.36];
const rC = realOf(T_CATCH), rL = realOf(T_LIGHT);

// dark low bed, a little lighter with each deed, empty while he walks away, warm at the end
bed([[0, [38, 45, 48]], [realOf(3.5), [40, 47, 50]], [realOf(T_SNAP), [41, 48, 51]], [rC, [43, 50, 55]], [realOf(T_AWAY), [38, 45]], [rL, [48, 55, 59, 64]], [realOf(10.3), [53, 57, 60, 64]]], 10.6, 38);
// his heavy steps
for (let k = 0; k < 5; k++) { thump(realOf(T_IN + 0.15 + k * 0.17), 0.08, 50, -0.4); }
// crowd gasp
noise(realOf(T_FLINCH), 0.35, 0.06, 0.5, 0.5, (p) => Math.sin(Math.PI * p) * (1 - p));
tone(realOf(T_FLINCH), 330, 0.2, 0.015, 0.5, 0.01, 10); tone(realOf(T_FLINCH) + 0.03, 400, 0.2, 0.012, 0.5, 0.01, 10);
// kid runs and falls
for (let k = 0; k < 4; k++) step(realOf(T_KIDRUN + 0.08 + k * 0.12), 0.03, 0.4 - k * 0.1);
thump(realOf(T_TRIP + 0.15), 0.12, 70, 0); noise(realOf(T_TRIP + 0.15), 0.2, 0.05, 0, 0.3, (p) => 1 - p);
// ball bounces
[0, 0.18, 0.32, 0.42].forEach((d, i) => { const t = realOf(T_TRIP + 0.05) + d; tone(t, 220 + i * 20, 0.08, 0.03 * (1 - i * 0.2), -0.2, 0.001, 30); });
// he picks it up, walks, kneels
for (let k = 0; k < 3; k++) thump(realOf(T_WALK + 0.1 + k * 0.18), 0.06, 55, -0.2);
// spikes clink off
SPIKES.forEach((s, i) => { const t = realOf(s); tone(t, hz(86 + (i % 3) * 2), 0.4, 0.02, 0, 0.001, 9); click(realOf(s + 0.35), 0.03, 0.1 * (i % 3 - 1)); });
bell(realOf(3.5), 76, 0.02, 0, 1.2);
// rope snaps, sprint, leap, catch
noise(realOf(T_SNAP), 0.05, 0.12, 0.4, 0.9, (p) => 1 - p); tone(realOf(T_SNAP), 900, 0.08, 0.03, 0.4, 0.001, 40);
for (let k = 0; k < 3; k++) step(realOf(T_SPRINT + 0.05 + k * 0.12), 0.06, -0.1 + k * 0.15);
sweep(realOf(T_JUMP) - 0.05, rC - realOf(T_JUMP) + 0.1, 0.08, 0.3, 0.03, 0.35);
thump(rC, 0.36, 38, 0.3); wood(rC, 0.1, 0.3); noise(rC, 0.6, 0.08, 0.3, 0.12, (p) => Math.exp(-p * 4));
tone(rC, hz(33), 1.6, 0.05, 0, 0.03, 1.2);
thump(realOf(T_LAND), 0.2, 45, 0.3); noise(realOf(T_LAND), 0.4, 0.06, 0.3, 0.1, (p) => Math.exp(-p * 4));
wood(realOf(T_SET), 0.07, 0.3);
// he walks away: slow steps in silence, a heartbeat
for (let k = 0; k < 5; k++) thump(realOf(T_AWAY + 0.15 + k * 0.24), 0.05, 50, 0.2 - k * 0.1);
[7.0, 7.5].forEach((s) => { thump(realOf(s), 0.1, 48, 0); thump(realOf(s) + 0.16, 0.07, 44, 0); });
// the kid runs, takes his hand: light chord
for (let k = 0; k < 4; k++) step(realOf(T_KIDGO + 0.25 + k * 0.12), 0.03, 0.2 - k * 0.1);
[[0, 64], [0.06, 71], [0.12, 76], [0.18, 79], [0.26, 83]].forEach(([d, m]) => bell(rL + d, m, 0.025, 0, 1.6));
sweep(rL - 0.2, 0.6, 0.04, 0, 0.02, 0.2);
// the crowd walks over
for (let i = 0; i < 3; i++) for (let k = 0; k < 4; k++) step(realOf(T_CROWD + i * 0.25 + 0.1 + k * 0.2), 0.03, 0.5 - i * 0.1);
// last lines
[10.9, 11.06, 11.24].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
[12.0, 12.14, 12.28, 12.5].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.5, 76, 0.02, 0, 1.2); bell(12.55, 83, 0.015, 0, 1.2);
