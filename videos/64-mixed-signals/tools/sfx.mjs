// ---- "mixed signals": room tone; her clipped "I'm fine." with a low rumble as the storm cloud forms; his cheerful "ok cool!" cut off by a thunder crack; rain; second line, second crack; page flips of the decoder book + confused "hm?"; book whoosh + thud offstage; footsteps out and back; paper bag rustle; the cloud clears into bright bells + warm chord, "aww", hug; slams + card ----
const T_FINE = 0.5, T_OK = 1.8, T_BOLT1 = 2.4, T_WHAT = 2.9, T_WRONG = 4.1, T_BOLT2 = 4.4;
const T_BOOK = 4.9, T_TOSS = 6.2, T_GO = 6.4, T_OUT = 6.9, T_BACK = 7.0, T_ARR = 7.6, T_GIVE = 7.7, T_CLEAR = 7.9, T_HUG = 8.3, T_HOLD = 8.7, T_H1 = 9.4, T_H2 = 10.3, T_CARD = 11.4;
{ let lp = 0, lr = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; const rainOn = smooth(t, T_WHAT, T_WHAT + 0.5) * (1 - smooth(t, T_CLEAR, T_CLEAR + 0.5)); lr += ((rnd() - 0.5) - lr) * 0.5; add(i, (lp * 0.09 + lr * 0.05 * rainOn) * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
const rumble = (t, d, g) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let lp = 0; for (let i = 0; i < n; i++) { const p = i / n; lp += (rnd() - lp) * 0.004; add(s0 + i, lp * g * Math.sin(Math.PI * p), 0); } };
const crack = (t) => { noise(t, 0.08, 0.12, 0, 0.95, (p) => 1 - p); thump(t, 0.12, 40, 0); rumble(t + 0.05, 1.2, 1.4); };
shout(T_FINE, 330, 0.35, 0.04, -0.2); rumble(T_FINE, 1.0, 0.9);
shout(T_OK, 250, 0.45, 0.045, 0.2);
crack(T_BOLT1); tone(T_BOLT1 + 0.1, 1100, 0.12, 0.02, 0.2, 0.005, 20);
shout(T_WHAT, 340, 0.8, 0.04, -0.2);
shout(T_WRONG, 320, 0.6, 0.04, -0.2); crack(T_BOLT2);
for (let t = T_BOOK + 0.1; t < T_TOSS; t += 0.385) noise(t, 0.12, 0.03, 0.2, 0.6, (p) => Math.sin(Math.PI * p));
[0.4, 0.9].forEach((d) => tone(T_BOOK + d, 300, 0.2, 0.02, 0.2, 0.01, 3));
noise(T_TOSS, 0.35, 0.04, 0.4, 0.4, (p) => Math.sin(Math.PI * p)); thump(T_TOSS + 0.6, 0.05, 80, 0.8);
for (let t = T_GO; t < T_OUT; t += 0.18) step(t, 0.02, 0.6);
for (let t = T_BACK; t < T_ARR; t += 0.18) step(t, 0.02, 0.4);
noise(T_ARR, 0.3, 0.025, 0.2, 0.7, (p) => Math.sin(Math.PI * p) * (0.5 + 0.5 * Math.sin(p * 50)));
noise(T_GIVE, 0.25, 0.02, 0, 0.7, (p) => Math.sin(Math.PI * p));
[[0, 79], [0.07, 84], [0.14, 88], [0.21, 91]].forEach(([d, m]) => bell(T_CLEAR + d, m, 0.016, 0, 0.8));
shout(T_CLEAR + 0.1, 420, 0.6, 0.035, -0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_CLEAR, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.85, 1.0].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
