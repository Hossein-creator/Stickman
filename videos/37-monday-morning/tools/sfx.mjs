// ---- "monday morning": beeping alarm, two slaps, gum-stretch creaks, snap-back boings, the TEAR in slow motion, a tired sigh ----
const SLOWS = [[8.55, 9.6]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_SLAP1 = 1.2, T_SLAP2 = 1.85, T_WAKE = 2.4;
const TRIES = [[3.0, 3.75, 4.05], [5.2, 6.1, 6.45]];
const T_A3 = 7.5, T_GRAB = 8.0, T_TEAR = 8.8, T_UPR = 9.2;
const rTear = realOf(T_TEAR);

// sleepy bed; empties under the tear; tired after
bed([[0, [45, 52, 57]], [realOf(3.0), [43, 50, 55]], [realOf(5.2), [41, 48, 53]], [realOf(7.5), [40, 47]], [rTear + 0.6, [45, 52, 57, 60]]], 10.6, 45);
// alarm: beep-beep until the second slap
for (let s = 0.05; s < T_SLAP2 - 0.05; s += 0.45) [0, 0.12].forEach((d) => { if (s + d < T_SLAP2) tone(s + d, 2093, 0.08, 0.05, -0.4, 0.002, 6); });
// one snore under the alarm
noise(0.0, 0.7, 0.04, 0, 0.04, (p) => Math.sin(Math.PI * p));
// slaps on the clock
[T_SLAP1, T_SLAP2].forEach((s) => { thump(realOf(s), 0.14, 90, -0.4); click(realOf(s), 0.09, -0.4); noise(realOf(s), 0.05, 0.08, -0.4, 0.5, (p) => Math.exp(-p * 6)); });
// wake: a groan
tone(realOf(T_WAKE), 110, 0.5, 0.035, 0, 0.05, 3); tone(realOf(T_WAKE) + 0.05, 165, 0.4, 0.012, 0, 0.05, 4);
// gum stretch: a rising rubbery creak with wobble
function creak(t0, t1, f0, f1, gain) {
  const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n, f = f0 + (f1 - f0) * p * p + 6 * Math.sin(i / SR * 50);
    ph += (2 * Math.PI * f) / SR;
    add(s0 + i, (Math.sin(ph) + 0.4 * Math.sin(ph * 2.02)) * gain * Math.min(1, p * 6) * (0.6 + 0.4 * p), 0);
  }
}
// snap back: whip, thwump into the pillow, boing
function boing(t, f, gain) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.7; i++) { const tt = i / SR; add(s0 + i, Math.sin(2 * Math.PI * f * tt * (1 + 0.25 * Math.sin(tt * 40) * Math.exp(-tt * 5))) * Math.exp(-tt * 6) * gain, 0); }
}
TRIES.forEach(([a, m, sn], k) => {
  creak(realOf(a + 0.1), realOf(sn), 120 + k * 20, 260 + k * 60, 0.025);
  sweep(realOf(sn) - 0.08, 0.14, 0.07, 0, 0.05, 0.4);
  thump(realOf(sn), 0.2, 70, -0.2); noise(realOf(sn), 0.12, 0.06, -0.2, 0.1, (p) => Math.exp(-p * 6));
  boing(realOf(sn) + 0.03, 180 + k * 30, 0.05);
});
// try 3: a longer, higher creak, a grab squelch
creak(realOf(T_A3 + 0.1), rTear, 140, 420, 0.03);
noise(realOf(T_GRAB), 0.12, 0.05, -0.2, 0.15, (p) => Math.sin(Math.PI * p));
// the TEAR (slow motion): wet pop, deep boom, splats
noise(rTear, 0.08, 0.2, 0, 0.7, (p) => 1 - p);
thump(rTear, 0.32, 48, 0); tone(rTear, hz(33), 1.4, 0.05, 0, 0.03, 1.5);
[0.35, 0.5, 0.62].forEach((d, i) => { noise(rTear + d, 0.05, 0.05, (i - 1) * 0.3, 0.3, (p) => Math.exp(-p * 5)); thump(rTear + d, 0.04, 120, (i - 1) * 0.3); });
// sits there: long tired sigh
noise(realOf(T_UPR + 0.4), 1.0, 0.035, 0, 0.06, (p) => Math.sin(Math.PI * p) * (1 - p * 0.5));
// last lines
[11.0, 11.2].forEach((t, i) => thump(t, i === 1 ? 0.09 : 0.05, i === 1 ? 52 : 70, 0));
[12.0, 12.15, 12.3, 12.5].forEach((t, i) => { thump(t, i === 3 ? 0.12 : 0.05, i === 3 ? 46 : 70, 0); click(t, 0.04, 0); });
bell(12.5, 76, 0.02, 0, 1.2); bell(12.55, 83, 0.015, 0, 1.2);
