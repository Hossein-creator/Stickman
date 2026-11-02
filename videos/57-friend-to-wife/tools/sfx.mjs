// ---- "friend to wife": a gentle music-box melody through all the ages; scene whooshes on the cuts; playground (swing creak, kids laughing), rain + umbrella pop, school bell + "yes!", sunset: ring sparkle, "yes", wedding bells and a warm chord ----
const S2 = 3.0, S3 = 6.0, S4 = 8.6, T_GIVE = 1.2, T_SMILE1 = 2.0, T_UMB = 4.2, T_SIT2 = 4.8, T_SIGN = 6.4, T_JUMP = 7.3, T_KNEEL = 9.0, T_YES = 9.9, T_ARCH = 10.4, T_H1 = 11.8, T_H2 = 12.7, T_CARD = 13.8;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
const mel = [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84, 83, 79, 76, 74];
for (let k = 0; k * 0.36 < T_CARD - 0.3; k++) bell(0.2 + k * 0.36, mel[k % mel.length], 0.011, 0, 0.9);
for (let k = 0; k * 1.44 < T_CARD; k++) tone(0.2 + k * 1.44, hz([48, 45, 41, 43][k % 4]), 1.2, 0.02, 0, 0.02, 2.5);
[S2, S3, S4].forEach((t) => sweep(t - 0.15, 0.3, 0.04, 0, 0.02, 0.4));
for (let t = 0.2; t < S2; t += 1.3) tone(t, 420, 0.3, 0.008, -0.3, 0.05, 6);
for (let k = 0; k < 4; k++) tone(T_SMILE1 + k * 0.1, 600 + 60 * (k % 2), 0.07, 0.012, 0.2, 0.005, 20);
{ let lp = 0; const s0 = Math.floor(S2 * SR), n = Math.floor((S3 - S2) * SR); for (let i = 0; i < n; i++) { lp += (rnd() - lp) * 0.3; add(s0 + i, lp * 0.05 * Math.min(1, i / SR / 0.2) * Math.min(1, (n - i) / SR / 0.2), 0); } }
noise(T_UMB, 0.1, 0.05, 0, 0.6, (p) => 1 - p); thump(T_UMB, 0.06, 90, 0);
bell(S3 + 0.1, 84, 0.02, 0.3, 1.2); bell(S3 + 0.2, 84, 0.015, 0.3, 1.2);
tone(T_SIGN + 0.4, 600, 0.12, 0.03, 0, 0.005, 25); tone(T_SIGN + 0.47, 760, 0.15, 0.03, 0, 0.005, 25);
[[0, 88], [0.06, 93], [0.12, 100]].forEach(([d, m]) => bell(T_KNEEL + 0.2 + d, m, 0.022, 0, 1.0));
tone(T_YES, 620, 0.12, 0.03, 0, 0.005, 25); tone(T_YES + 0.07, 780, 0.15, 0.03, 0, 0.005, 25);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_ARCH, T_CARD + 0.6, [60, 64, 67, 72], 0.011);
for (let k = 0; k < 6; k++) bell(T_ARCH + k * 0.25, [84, 79, 76, 84, 79, 76][k], 0.02, (k % 2 ? 0.3 : -0.3), 1.6);
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_H1 + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0, 0.13, 0.26, 0.4].forEach((d, i) => { thump(T_H2 + d, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(T_H2 + d, 0.04, 0); });
[0, 0.2].forEach((d, i) => thump(T_CARD + d, i === 1 ? 0.1 : 0.05, i === 1 ? 50 : 70, 0));
[0.7, 0.9].forEach((d, i) => { thump(T_CARD + d, i === 1 ? 0.13 : 0.05, i === 1 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
