// ---- shared sounds for the series "THE YELLOW UMBRELLA" (series/yellow-umbrella/sfx-lib.mjs) ----
// rain bed: k(t) = intensity 0..1
function rainBed(k, gain = 0.11) { let a = 0, b = 0; for (let i = 0; i < N; i++) { const t = i / SR, g = k(t); a += (rnd() - a) * 0.35; b += (rnd() - b) * 0.04; add(i, (a * 0.6 + b * 0.8) * gain * g * Math.min(1, t / 0.3), Math.sin(t * 0.7) * 0.3); if (g > 0.3 && rnd() > 0.9993) click(t, 0.03 * g, rnd() * 0.8 - 0.4); } }
function thunder(t, gain = 0.5) { noise(t, 0.12, gain * 0.5, 0, 0.6, (p) => 1 - p); noise(t + 0.05, 2.6, gain, 0, 0.015, (p) => Math.min(1, p * 8) * Math.exp(-p * 2.2) * (0.7 + 0.3 * Math.sin(p * 40))); thump(t + 0.05, gain * 0.5, 38, 0); }
const wetStep = (t, g = 0.05, pan = 0) => { noise(t, 0.08, g, pan, 0.5, (p) => Math.exp(-p * 6)); tone(t, 130, 0.08, g * 0.6, pan, 0.001, 50); };
const steps = (t0, t1, dt, g, pan, wet = true) => { for (let t = t0; t < t1; t += dt) (wet ? wetStep : step)(t, g, pan); };
const voice = (t, f0, d, g, pan = 0, bend = 0.3) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + bend * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
const pop = (t, g = 0.03) => { tone(t, 900, 0.06, g, 0, 0.001, 60); tone(t, 1350, 0.05, g * 0.5, 0, 0.001, 70); };
const whoosh = (t, d = 0.35, g = 0.05) => sweep(t, d, g, 0, 0.05, 0.5);
const umbOpen = (t, g = 0.06) => { noise(t, 0.18, g, 0, 0.45, (p) => Math.sin(Math.PI * p)); thump(t + 0.15, g * 0.6, 120, 0); };
const slamHit = (t, g = 0.08) => { thump(t, g, 50, 0); click(t, 0.04, 0); };
const words = (t0, n, step = 0.1) => { for (let i = 0; i < n; i++) thump(t0 + i * step, i === n - 1 ? 0.08 : 0.04, i === n - 1 ? 52 : 70, 0); };
// soft piano-ish melody: notes = [[t, midi, gain?], ...]
const piano = (notes, g = 0.03) => notes.forEach(([t, m, k = 1]) => { bell(t, m, g * k, 0, 2.2); bell(t, m - 12, g * 0.5 * k, 0, 2.6); });
// warm pad: [[t0, t1, [midi...]], ...]
function pad(segs, g = 0.009) { for (const [t0, t1, ms] of segs) { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 0.8); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.2 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } } }
const heartbeat = (t0, t1, g = 0.12) => { for (let t = t0; t < t1; t += 0.8) { thump(t, g, 48, 0); thump(t + 0.22, g * 0.7, 48, 0); } };
const sneeze = (t) => { noise(t, 0.12, 0.02, 0.2, 0.2, (p) => p); noise(t + 0.15, 0.25, 0.09, 0.2, 0.7, (p) => Math.exp(-p * 5)); voice(t + 0.15, 520, 0.18, 0.03, 0.2, -0.3); };
const laugh = (t, f = 480, pan = -0.2) => { for (let k = 0; k < 4; k++) voice(t + k * 0.14, f - k * 15, 0.1, 0.03, pan, 0.1); };
// ---- part 2: storm, thunder, dad's angry voice, her small cry, sad steps away; night rain on the window, his steps, paper plane whoosh, piano, heart; thunder + paper rip; day birds, rich man's steps, ring sparkle bells, coins, "perfect!", her "no...", rain returns, umbrella clatters to the ground, heartbeat, card ----
rainBed((t) => (t < 9.4 ? 0.85 : t < 22 ? 0.7 : t < 30.2 ? 0 : 0.6));
for (const t of [0.4, 19.8]) thunder(t, 0.5);
steps(0.2, 0.9, 0.35, 0.06, 0.4);
voice(1.45, 160, 1.0, 0.05, 0.3, 0.25); voice(3.65, 150, 1.0, 0.05, 0.3, 0.3);
voice(0.7, 460, 0.4, 0.025, -0.1, 0.3);
steps(6.4, 9.2, 0.4, 0.04, 0.5);
pad([[6.8, 9.4, [57, 60, 64]], [9.4, 15.6, [53, 57, 60]], [15.6, 19.6, [60, 64, 67]], [27.6, 33.4, [57, 60, 64]]], 0.008);
piano([[7.2, 76], [7.8, 74], [8.4, 72], [9.0, 69, 0.8]]);
steps(11.6, 13.6, 0.4, 0.04, -0.3);
whoosh(15.0, 0.8, 0.05);
noise(15.95, 0.15, 0.02, 0, 0.6);
piano([[16.0, 72], [16.4, 76], [16.8, 79], [17.6, 84], [18.2, 79], [18.6, 84, 0.8]]);
noise(20.65, 0.35, 0.07, 0, 0.7, (p) => (p < 0.5 ? 1 : 0.4) * (1 - p));
heartbeat(20.0, 22.0, 0.08);
for (let t = 22.2; t < 30; t += 0.9 + 0.4 * Math.abs(rnd())) { tone(t, 2700 + 400 * Math.abs(rnd()), 0.08, 0.006, rnd(), 0.01, 30); tone(t + 0.1, 3100, 0.06, 0.005, rnd(), 0.01, 30); }
steps(22.6, 24.6, 0.4, 0.04, 0.5, false);
click(24.85, 0.05); [[25.0, 88], [25.1, 91], [25.2, 96]].forEach(([t, m]) => bell(t, m, 0.02, 0.3, 2));
for (let k = 0; k < 5; k++) tone(25.3 + k * 0.08, 2400 + k * 200, 0.08, 0.012, 0.2, 0.001, 30);
voice(25.95, 200, 0.5, 0.04, 0.3, 0.35);
voice(27.85, 380, 0.8, 0.025, -0.2, -0.2);
umbOpen(31.0, 0.03); thump(31.25, 0.05, 140, -0.3); click(31.3, 0.04, -0.3);
heartbeat(31.4, 33.6, 0.09);
pad([[31.2, 36, [48, 51, 55]]], 0.012);
words(33.6, 4, 0.13);
bell(34.2, 76, 0.03, 0, 1.4); bell(34.28, 83, 0.02, 0, 1.4);
