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
// ---- part 3: wedding bells + organ chord, ring box click + sparkle, her sniff; storm, running splashes, thunder, wind rips the umbrella, slip + splash + thud, getting up, running again; doors bang open, gasp, dad's angry voice, the rich man laughs, his small voice, "get out!", steps, umbrella clatters; ring moment with heartbeat; gleam on the umbrella; card ----
[0, 0.5, 1.0, 1.5, 3.0, 3.5].forEach((t, i) => bell(t + 0.1, [76, 72, 74, 67, 76, 79][i], 0.03, 0, 1.2));
pad([[0, 6, [60, 64, 67, 72]]], 0.007);
click(0.55, 0.05); [[0.75, 88], [0.85, 91], [0.95, 96]].forEach(([t, m]) => bell(t, m, 0.02, 0.3, 2));
voice(3.0, 520, 0.2, 0.015, -0.1, 0.2);
rainBed((t) => (t >= 6 && t < 15 ? 1 : 0), 0.13);
for (let t = 6.1; t < 10.4; t += 0.25) wetStep(t, 0.06, 0);
thunder(8.4, 0.5);
sweep(8.9, 0.6, 0.09, 0.2, 0.05, 0.6); click(9.2, 0.06); noise(9.2, 0.25, 0.06, 0, 0.8, (p) => 1 - p);
thump(10.45, 0.14, 55, 0); noise(10.45, 0.6, 0.09, 0, 0.5, (p) => Math.exp(-p * 4));
voice(11.7, 200, 0.5, 0.03, 0, -0.1);
for (let t = 12.6; t < 15; t += 0.3) wetStep(t, 0.05, 0);
pad([[11.8, 15, [57, 60, 64, 69]]], 0.008);
thump(15.2, 0.16, 45, -0.3); noise(15.2, 0.3, 0.1, -0.3, 0.6, (p) => 1 - p); thunder(15.25, 0.25);
voice(15.4, 600, 0.25, 0.03, 0.1, 0.3);
voice(16.45, 150, 0.9, 0.05, -0.1, 0.3);
laugh(18.35, 260, 0.3); laugh(18.95, 250, 0.3);
voice(20.35, 210, 0.9, 0.03, -0.3, -0.15);
pad([[20.2, 22.6, [57, 60, 64]]], 0.009);
voice(22.65, 160, 0.6, 0.05, -0.2, 0.3);
thump(22.9, 0.08, 70, -0.3);
steps(23.6, 24.6, 0.3, 0.04, -0.6, false);
click(23.75, 0.05, -0.4); thump(23.8, 0.04, 160, -0.4);
heartbeat(25.4, 33.6, 0.09);
pad([[25.2, 30.6, [53, 56, 60]], [30.6, 36, [48, 51, 55]]], 0.011);
piano([[31.4, 79], [31.8, 76], [32.2, 72, 0.8]]);
words(33.6, 4, 0.13);
bell(34.2, 76, 0.03, 0, 1.4); bell(34.28, 83, 0.02, 0, 1.4);
