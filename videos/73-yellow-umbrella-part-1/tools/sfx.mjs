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
// ---- part 1: storm + rain, thunder cracks, his wet steps, "here." / "you'll get wet!", umbrella hand-over, he runs off splashing, soft piano when she smiles; next day drizzle-free birds, sneeze + her laugh, umbrella pops open, rain, warm pad; walking montage; dad: thunder + heartbeat; card slams ----
rainBed((t) => (t < 13.6 ? 1 : t < 19.6 ? 0.05 : t < 23.6 ? Math.min(1, (t - 19.6) / 0.6) : 0.75));
for (const t of [0.3, 1.7, 31.0]) thunder(t, t > 30 ? 0.6 : 0.45);
steps(2.5, 5.0, 0.42, 0.05, 0.4);
voice(6.0, 230, 0.35, 0.03, 0.3);
voice(7.25, 420, 0.7, 0.03, -0.1, 0.4);
whoosh(8.5, 0.3, 0.04);
steps(9.1, 10.8, 0.26, 0.06, 0.5);
piano([[10.9, 72], [11.3, 76], [11.7, 79], [12.4, 77, 0.8]]);
for (let t = 13.9; t < 19.4; t += 0.9 + 0.4 * Math.abs(rnd())) { tone(t, 2700 + 400 * Math.abs(rnd()), 0.08, 0.006, rnd(), 0.01, 30); tone(t + 0.1, 3100, 0.06, 0.005, rnd(), 0.01, 30); }
steps(16.0, 17.8, 0.42, 0.04, 0.4, false);
sneeze(17.9);
laugh(18.4);
umbOpen(20.1);
pad([[20.3, 23.6, [60, 64, 67]], [23.6, 29.6, [57, 60, 64]], [26.6, 29.8, [65, 69, 72]]], 0.008);
piano([[20.6, 72], [21.0, 76], [21.4, 79], [21.8, 84], [24.0, 76], [24.6, 77], [25.2, 79], [27.0, 81], [27.6, 79], [28.2, 76]]);
steps(23.7, 30.2, 0.36, 0.035, 0);
steps(29.6, 30.8, 0.42, 0.05, 0.4);
heartbeat(31.2, 33.6, 0.1);
voice(31.5, 170, 0.6, 0.05, 0.3, 0.2);
pad([[31.0, 36, [48, 51, 55]]], 0.012);
words(33.6, 5, 0.13);
bell(34.3, 76, 0.03, 0, 1.4); bell(34.38, 83, 0.02, 0, 1.4);
