// ---- "love is a dance": a soft waltz (3/4 bells + bass) that plays through the top; footsteps on the beat; a sparkle on the spin and dip, warm chord on "together"; bottom: phone taps, a watch tick, the waltz thins out to a single note when she's alone ----
const T_SPIN = 2.9, T_SPIN1 = 3.9, T_DIP = 6.0, T_HOLD = 7.2, T_REACH = 4.2, T_WATCH = 4.6, T_BACK = 6.2, T_ALONE = 7.0, T_T1 = 9.4, T_T2 = 10.0, T_CARD = 11.6;
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.01; add(i, lp * 0.08 * Math.min(1, t / 0.6) * (1 - smooth(t, DUR - 1.2, DUR)), 0); } }
// waltz: bar = 1.2 s, 3 beats; melody over I-vi-IV-V
const prog = [[57, 61, 64], [54, 57, 61], [50, 54, 57], [52, 56, 59]];
const mel = [76, 73, 69, 74, 73, 71, 69, 66, 69, 71, 73, 76];
for (let b = 0; b * 0.4 < T_CARD; b++) {
  const t = 0.3 + b * 0.4, bar = Math.floor(b / 3), ch = prog[bar % 4];
  if (t > T_CARD + 0.4) break;
  if (b % 3 === 0) tone(t, hz(ch[0] - 12), 0.5, 0.025, 0, 0.01, 4); else { bell(t, ch[1] + 12, 0.008, -0.1, 0.4); bell(t, ch[2] + 12, 0.007, 0.1, 0.4); }
  if (b % 3 !== 1) bell(t, mel[b % mel.length], 0.014, 0, 0.9);
}
// footsteps on the beat (top)
for (let t = 0.3; t < T_DIP; t += 0.6) step(t, 0.012, -0.3);
// spin + dip sparkle, together chord
[[0, 84], [0.07, 88], [0.14, 91]].forEach(([d, m]) => bell(T_SPIN + d, m, 0.015, -0.2, 0.8));
sweep(T_DIP, 0.5, 0.025, -0.2, 0.02, 0.2);
const chord = (t0, t1, ms, g) => { const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.8) * Math.min(1, (t1 - t0 - tt) / 1.2); let v = 0; for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * (t0 + tt)) + 0.25 * Math.sin(4 * Math.PI * hz(m) * (t0 + tt)); add(s0 + i, v * g * e, 0); } };
chord(T_HOLD, T_CARD + 0.5, [57, 61, 64, 69], 0.01);
[[0, 76], [0.08, 81], [0.16, 85]].forEach(([d, m]) => bell(T_HOLD + d, m, 0.02, 0, 1.2));
// bottom: phone taps, watch tick, sour notes, alone
for (let t = 0.5; t < T_BACK; t += 0.5 + 0.2 * rnd()) click(t, 0.014, 0.3);
for (let k = 0; k < 4; k++) click(T_WATCH + 0.1 + k * 0.12, 0.03, 0.3);
tone(T_REACH + 0.1, hz(64), 0.4, 0.015, 0.3, 0.01, 4); tone(T_REACH + 0.2, hz(63), 0.5, 0.015, 0.3, 0.01, 4);
for (let t = T_BACK; t < T_BACK + 0.7; t += 0.3) step(t, 0.02, 0.3);
tone(T_ALONE, hz(64), 0.6, 0.02, 0.3, 0.01, 3.5); tone(T_ALONE + 0.14, hz(63), 0.8, 0.02, 0.3, 0.01, 3);
{ const s0 = Math.floor(T_ALONE * SR), n = Math.floor((T_CARD - T_ALONE + 0.4) * SR); for (let i = 0; i < n; i++) { const tt = i / SR, e = Math.min(1, tt / 0.5) * Math.min(1, (n / SR - tt) / 1.0); add(s0 + i, (Math.sin(2 * Math.PI * 49 * tt) + 0.3 * Math.sin(2 * Math.PI * 98 * tt)) * 0.03 * e, 0.3); } }
typing(T_T1, 14, 30); typing(T_T2, 14, 30);
[0, 0.15, 0.3].forEach((d, i) => thump(T_CARD + d, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[0.75, 0.88, 1.0, 1.12].forEach((d, i) => { thump(T_CARD + d, i === 3 ? 0.13 : 0.05, i === 3 ? 44 : 70, 0); click(T_CARD + d, 0.04, 0); });
bell(T_CARD + 1.5, 69, 0.02, 0, 1.2); bell(T_CARD + 1.56, 76, 0.015, 0, 1.2);
