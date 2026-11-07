// ---- "private": room tone, phone taps, a snatch whoosh + "show me.", fast scrolling ticks while he whistles a little tune, "ok. clean.", his "can I see yours?", a lock click + "that's private!", a record-scratch silence beat, "...", then a sweet chime as she turns the phone, "it's all pics of you", "aww", warm chord + bells; slams + card ----
const T_GRAB = 0.6, T_SCAN = 1.0, T_CLEAN = 3.1, T_RET = 3.3, T_ASK = 3.9, T_PULL = 4.5, T_PRIV = 4.7, T_STARE = 6.0, T_SHOW = 7.0, T_PICS = 7.3, T_HUG = 8.5, T_HOLD = 8.9;
const T_H1 = 9.6, T_H2 = 10.5, T_CARD = 11.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.09 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const shout = (t, f0, d, g, pan) => { const s0 = Math.floor(t * SR), n = Math.floor(d * SR); let ph = 0; for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 + 0.3 * Math.sin(Math.PI * p)); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(2 * ph) + 0.2 * Math.sin(3 * ph)) * Math.min(1, p * 6) * (1 - p) * g, pan); } };
for (let t = 0.1; t < T_GRAB; t += 0.18) tone(t, 2400, 0.02, 0.006, 0.2, 0.001, 80);
noise(T_GRAB - 0.05, 0.2, 0.05, 0, 0.5, (p) => Math.sin(Math.PI * p)); shout(T_GRAB + 0.05, 380, 0.4, 0.04, -0.2);
for (let t = T_SCAN; t < T_CLEAN; t += 0.07) tone(t, 2600 + 300 * rnd(), 0.015, 0.006, -0.2, 0.001, 80);
const tune = [76, 79, 81, 79, 76, 74, 76, 79]; tune.forEach((m, k) => tone(T_GRAB + 0.5 + k * 0.28, hz(m + 12), 0.24, 0.012, 0.3, 0.02, 5));
shout(T_CLEAN, 360, 0.5, 0.03, -0.2);
shout(T_ASK, 240, 0.8, 0.03, 0.2);
click(T_PRIV, 0.06, -0.2); tone(T_PRIV, 900, 0.1, 0.02, -0.2, 0.002, 30);
shout(T_PRIV + 0.05, 420, 0.8, 0.045, -0.2);
noise(T_STARE - 0.1, 0.25, 0.04, 0, 0.8, (p) => (1 - p) * Math.sin(p * 40));
[[0, 84], [0.1, 88], [0.2, 91], [0.3, 96]].forEach(([d, m]) => bell(T_SHOW + 0.15 + d, m, 0.014, -0.2, 0.6));
shout(T_PICS, 380, 0.9, 0.03, -0.2);
shout(T_PICS + 1.0, 230, 0.5, 0.025, 0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_SHOW, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
[[0, 76], [0.08, 81], [0.16, 88]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
[0, 0.13, 0.26, 0.4].forEach((d, i) => thump(T_H1 + d, i === 3 ? 0.1 : 0.05, i === 3 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.39, 0.52].forEach((d, i) => { thump(T_H2 + d, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.8, 0.95, 1.1].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
