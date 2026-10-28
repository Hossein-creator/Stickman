// ---- "don't follow blindly": marching feet, wind from the drop, far screams, cloth pull, heartbeat, the push (strain + skidding), his fall in slow motion ----
const EDGE = 560, V = 120, GAP = 100, VP = 36, XH = 375, T_STOP = 1.9;
const T_PULL = 2.4, T_BAND = 2.95, T_LOOK = 3.0, T_TURN = 3.35, T_CONTACT = T_STOP + (340 - GAP) / V;
const T_SLIP = T_CONTACT + (EDGE - 62 - XH) / VP, T_FALL = T_SLIP + 0.32;
const SLOWS = [[T_SLIP - 0.05, T_FALL + 0.9]], SLOWK = 0.35;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const rFall = realOf(T_FALL);

// dark pad, wind from the drop on the right
bed([[0, [38, 45, 50]], [realOf(T_LOOK), [37, 44, 49]], [realOf(T_CONTACT), [36, 43, 48, 51]], [rFall, [31, 38]]], DUR - 1.4, 41);
{ let lp = 0; for (let i = 0; i < N; i++) { const t = i / SR; lp += (rnd() - lp) * 0.008; add(i, lp * 0.1 * (0.7 + 0.3 * Math.sin(t * 0.8)), 0.5); } }
// marching: soft footfalls from the whole crowd, never stopping
for (let t = 0.05, k = 0; t < DUR - 0.5; t += 0.135 + 0.05 * ((k * 7) % 3) / 3, k++) {
  const g = (k % 4 === 0 ? 0.07 : 0.035) * (t > rFall - 0.3 && t < rFall + 1.2 ? 0.4 : 1);
  step(t, g, -0.6 + ((k * 13) % 12) / 10);
}
// far screams falling away (descending)
function scream(t, f0, gain, pan) {
  const s0 = Math.floor(t * SR), n = Math.floor(1.1 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) { const p = i / n, f = f0 * (1 - 0.55 * p) + 6 * Math.sin(i / SR * 38); ph += (2 * Math.PI * f) / SR; add(s0 + i, (Math.sin(ph) + 0.3 * Math.sin(ph * 2.01)) * Math.sin(Math.PI * Math.min(1, p * 4)) * (1 - p) * gain, pan); }
}
for (let t = 0.3, k = 0; t < DUR - 1.2; t += 0.75 + 0.35 * ((k * 5) % 3) / 2, k++) scream(t, 520 + ((k * 97) % 260), k % 3 === 0 ? 0.018 : 0.009, 0.5 + ((k * 3) % 4) / 10);
// the blindfold comes off: cloth rustle, it drops
noise(realOf(T_PULL), 0.35, 0.05, 0, 0.35, (p) => Math.sin(Math.PI * p));
noise(realOf(T_BAND + 0.35), 0.05, 0.03, 0, 0.3, (p) => 1 - p);
// he sees it: sting + heartbeat
tone(realOf(T_LOOK), hz(40), 1.2, 0.05, 0, 0.01, 1.8);
bell(realOf(T_LOOK), 63, 0.015, 0.2, 1.2);
[T_LOOK + 0.3, T_LOOK + 1.0, T_TURN + 1.3, T_TURN + 2.0].forEach((s) => { thump(realOf(s), 0.12, 46, 0); thump(realOf(s) + 0.17, 0.08, 42, 0); });
// "stop!": a shout
tone(realOf(T_TURN + 0.05), 210, 0.35, 0.04, -0.1, 0.01, 5); tone(realOf(T_TURN + 0.05), 315, 0.3, 0.015, -0.1, 0.01, 6);
// contact + the push: thud, strain grunts, feet skidding the whole time
thump(realOf(T_CONTACT), 0.18, 70, -0.1);
for (let s = T_CONTACT + 0.3; s < T_SLIP; s += 0.55) tone(realOf(s), 130 + 20 * Math.sin(s * 3), 0.3, 0.025, -0.1, 0.03, 5);
noise(realOf(T_CONTACT + 0.2), realOf(T_SLIP) - realOf(T_CONTACT + 0.2), 0.035, 0.1, 0.12, (p) => Math.min(1, p * 8) * (0.7 + 0.3 * Math.sin(p * 60)));
// slip: scrape, whoosh, slow-motion boom, his long fall
noise(realOf(T_SLIP), 0.25, 0.08, 0.2, 0.5, (p) => Math.exp(-p * 4));
sweep(rFall - 0.1, 1.2, 0.1, 0.3, 0.02, 0.35);
thump(rFall, 0.3, 40, 0); tone(rFall, hz(29), 2.2, 0.05, 0, 0.03, 1.1);
scream(rFall + 0.05, 420, 0.03, 0.3);
// last line
const h2 = [0, 1, 2, 3, 4].map((i) => rFall + 0.15 + i * 0.16);
[2.7, 2.85, 3.0].forEach((t, i) => thump(t, i === 2 ? 0.09 : 0.05, i === 2 ? 52 : 70, 0));
h2.forEach((t, i) => { thump(t, i === 4 ? 0.12 : 0.05, i === 4 ? 46 : 70, 0); click(t, 0.04, 0); });
// end card: message words, quote chime
[11.6, 11.75, 11.9].forEach((t, i) => thump(t, i === 2 ? 0.1 : 0.05, i === 2 ? 50 : 70, 0));
[12.3, 12.42, 12.54, 12.66, 12.8].forEach((t, i) => { thump(t, i === 4 ? 0.13 : 0.05, i === 4 ? 44 : 70, 0); click(t, 0.04, 0); });
bell(13.3, 69, 0.02, 0, 1.0); bell(13.36, 76, 0.015, 0, 1.0);
