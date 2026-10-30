// ---- "same rock": wind, footsteps, both strain against the rock (grunts + scrape), top: a bright "idea" ping, climb scuffs, jump whoosh, landing, a rising gold chord and sparkle on the fist; bottom: a kick thud, sigh, rain and a low drone ----
const T_AT = 1.5, T_PUSH = 1.6, T_PUSH1 = 2.9, T_LOOK = 3.05, T_CLIMB = 3.6, T_ONROCK = 4.15, T_JUMP = 4.7, T_LAND = 5.25, T_WALKUP = 5.4, T_FIST = 6.4;
const T_KICK = 3.05, T_SIT = 3.9, T_STUCK = 6.4, T_TEXT1 = 9.0, T_TEXT2 = 9.8, T_CARD = 11.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.006; add(i, lp * 0.13 * (0.7 + 0.3 * Math.sin(t * 0.6)) * Math.min(1, t / 0.8) * (1 - smooth(t, DUR - 1.2, DUR)), Math.sin(t * 0.3) * 0.4); } }
for (let t = 0.1; t < T_AT; t += 0.3) { step(t, 0.025, -0.3); step(t + 0.02, 0.022, 0.3); }
// pushing: grunts + scrape, both panels
for (let t = T_PUSH; t < T_PUSH1; t += 0.45) { tone(t, 140 + 15 * Math.sin(t * 3), 0.3, 0.025, -0.2, 0.03, 5); tone(t + 0.05, 128, 0.3, 0.02, 0.2, 0.03, 5); }
noise(T_PUSH, T_PUSH1 - T_PUSH, 0.03, 0, 0.12, (p) => Math.min(1, p * 8) * (0.7 + 0.3 * Math.sin(p * 50)));
// top: idea ping, climb, jump, land, gold chord
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_LOOK + 0.2 + d, m, 0.022, -0.3, 1.0));
noise(T_CLIMB + 0.1, 0.4, 0.03, -0.3, 0.4, (p) => Math.sin(Math.PI * p)); step(T_ONROCK, 0.06, -0.3);
sweep(T_JUMP, T_LAND - T_JUMP, 0.05, -0.3, 0.02, 0.35); thump(T_LAND, 0.14, 70, -0.3); step(T_LAND, 0.06, -0.3);
for (let t = T_WALKUP; t < T_FIST; t += 0.3) step(t, 0.025, -0.3);
const chord = (t0, t1, ms, g, pan = 0) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, pan); } };
chord(T_LAND, T_CARD + 0.6, [60, 64, 67, 72], 0.011, -0.1);
[[0, 79], [0.08, 84], [0.16, 88], [0.24, 91]].forEach(([d, m]) => bell(T_FIST + d, m, 0.022, -0.2, 1.4));
// bottom: kick, sigh, sit, rain, low drone
thump(T_KICK + 0.15, 0.12, 80, 0.3); tone(T_KICK + 0.2, 200, 0.2, 0.02, 0.3, 0.005, 12);
noise(T_KICK + 0.5, 0.6, 0.025, 0.3, 0.15, (p) => Math.sin(Math.PI * p));
thump(T_SIT + 0.5, 0.08, 55, 0.3);
for (let t = T_SIT + 0.6; t < T_CARD; t += 0.05 + 0.06 * rnd()) noise(t, 0.01, 0.012, 0.3 + 0.3 * rnd(), 0.9, (p) => Math.exp(-p * 6));
{ const s0 = Math.floor((T_SIT + 0.6) * SR), n = Math.floor((T_CARD - T_SIT - 0.2) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.6) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.035 * e, 0.3); } }
typing(T_TEXT1, 15, 30); typing(T_TEXT2, 15, 30);
[0, 0.12, 0.24, 0.36, 0.48].forEach((d, i) => thump(T_CARD + d, i === 4 ? 0.1 : 0.05, i === 4 ? 50 : 70, 0));
[0.85, 1.0, 1.15].forEach((d, i) => { thump(T_CARD + d, i === 2 ? 0.13 : 0.05, i === 2 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.6, 69, 0.02, 0, 1.2); bell(T_CARD + 1.66, 76, 0.015, 0, 1.2);
