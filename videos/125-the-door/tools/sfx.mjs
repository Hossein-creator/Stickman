// ---- "the door": night street tone + café murmur that swells when the door is open; slow sad piano thinning per chapter; door creak open, bell over the door; steps; her phone taps; DAY 90 slam + bags drop; heart cracks / shatter; door swings shut slowly; his steps away; her bonk into the door + phone clatter; silence + low drop; typing; FOLLOW: neon buzz flicker, tap, door bell + chime ----
const C = [0, 4.6, 9.0, 13.4], T_SMILE = 2.2, T_C1 = 6.9, T_OPEN3 = 11.4, T_IN3 = 11.8, T_SLAM = 12.3, T_HIT = 12.45, T_C2 = 12.5, T_C3 = 14.7, T_LETGO = 15.4, T_HWALK = 15.9, T_HGONE = 18.6, T_SARR = 16.8, T_BUMP = 19.5, T_LOOK = 20.4, T_L2 = 21.6, T_L3 = 22.8, T_CTA = 24.0, T_SIG = 24.4, T_TAP = 25.6;
const open = (t) => t < C[2] ? 1 : t < C[3] ? (t > T_OPEN3 && t < T_HIT ? 1 : 0) : t < T_LETGO ? 1 : t > T_TAP + 0.3 ? 1 : 0;
{ let lp = 0, lp2 = 0, m = 0; for (let i = 0; i < N; i++) { const t = i / SR; const r = rnd(); lp += (r - lp) * 0.01; lp2 += (r - lp2) * 0.05; m += (open(t) - m) * 0.0002; add(i, (lp * 0.05 + lp2 * 0.025 * m * (0.6 + 0.4 * Math.sin(t * 3.1) * Math.sin(t * 1.7))) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 0.8, DUR)), 0); } }
const MEL = [64, 67, 69, 67, 64, 62, 60, 62, 64, 60, 59, 57];
for (let t = 0.3, i = 0; t < T_CTA; i++) { const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3; if (!(t > T_BUMP - 0.2 && t < T_LOOK + 1.0)) { bell(t, MEL[i % MEL.length] - 12, 0.014 - 0.002 * ch, 0, 1.0); if (i % 2 === 0) bell(t, MEL[i % MEL.length] - 24, 0.01, 0, 0.8); } t += 0.8 + 0.2 * ch; }
[C[1], C[2], C[3]].forEach((c) => { sweep(c - 0.25, 0.4, 0.06, 0, 0.05, 0.5); thump(c, 0.07, 48, 0); });
const creak = (t, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); for (let i = 0; i < n; i++) { const tt = i / SR, f = 240 + 160 * Math.sin(tt * 6); add(s0 + i, Math.sign(Math.sin(2 * Math.PI * f * tt)) * 0.25 * Math.sin(2 * Math.PI * 31 * tt) * g * Math.sin(Math.PI * tt / d), pan); } };
const doorBell = (t, g) => [[0, 88], [0.06, 93], [0.14, 88]].forEach(([d, m]) => bell(t + d, m, g, 0.2, 0.9));
[C[0] + 0.1, C[1] + 0.1, T_OPEN3, C[3] + 0.1].forEach((t) => { creak(t, 0.5, 0.014, 0.2); doorBell(t + 0.1, 0.01); });
for (const [a, b, pan] of [[0.4, 3.6, -0.3], [C[1] + 0.4, C[1] + 3.6, -0.3], [9.2, T_IN3, -0.3], [9.4, T_HIT, -0.5], [T_SARR, T_BUMP, -0.3]]) for (let t = a + 0.1; t < b; t += 0.36) step(t, 0.015, pan);
for (let t = C[1]; t < T_BUMP; t += 0.4) if (!(t > C[2] - 0.2 && t < C[2] + 0.2) && !(t > T_SLAM && t < T_SARR)) click(t, 0.006, -0.2);
thump(T_HIT, 0.16, 70, 0.1); wood(T_HIT, 0.05, 0.1); noise(T_HIT, 0.1, 0.06, 0.1, 0.5, (p) => Math.exp(-p * 7));
noise(T_HIT + 0.35, 0.15, 0.04, -0.2, 0.3, (p) => Math.exp(-p * 5)); noise(T_HIT + 0.42, 0.15, 0.04, 0.2, 0.3, (p) => Math.exp(-p * 5));
const crack = (t) => { noise(t, 0.08, 0.06, 0.3, 0.85, (p) => Math.exp(-p * 9)); tone(t, 1900, 0.15, 0.015, 0.3, 0.001, 30); };
[T_C1, T_C2, T_C3].forEach(crack);
crack(T_LETGO); noise(T_LETGO + 0.05, 0.5, 0.05, 0.3, 0.7, (p) => Math.exp(-p * 5));
creak(T_LETGO, 0.6, 0.016, 0.2); wood(T_LETGO + 0.55, 0.04, 0.2);
for (let t = T_HWALK + 0.1; t < T_HGONE; t += 0.38) step(t, 0.016 * (1 - (t - T_HWALK) / 3.2) + 0.004, 0.6);
thump(T_BUMP, 0.14, 90, 0); wood(T_BUMP, 0.04, 0); click(T_BUMP + 0.5, 0.04, 0.2); click(T_BUMP + 0.58, 0.02, 0.2);
{ const s0 = Math.floor((T_BUMP + 0.6) * SR), n = Math.floor(3.4 * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.4) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0); } }
typing(T_L2, 16, 26); typing(T_L3, 16, 26);
for (let k = 0; k < 6; k++) { tone(T_SIG + k * 0.07, 120, 0.05, 0.02, -0.2, 0.001, 20); }
click(T_TAP, 0.06, -0.2); creak(T_TAP + 0.2, 0.5, 0.012, 0.2); doorBell(T_TAP + 0.25, 0.018);
[[0.1, 84], [0.17, 88], [0.24, 91]].forEach(([d, m]) => bell(T_TAP + d, m, 0.022, -0.1, 1.4));
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_TAP, DUR, [57, 60, 64, 69], 0.01);
