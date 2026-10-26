// ---- "didn't look up": her heartbeat, his phone taps and pings, the swat, glass heart shatters in slow motion, silence, rain and sad piano, his laugh while she cries ----
const SLOWS = [[4.95, 6.3], [10.9, 14.3]], SLOWK = 0.33;
const ez = (p) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p, 0, 1));
const wn = (t, a, b) => ez((t - a) / (b - a));
const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += wn(t, a, a + 0.1) * (1 - wn(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
const TSTEP = 1 / 400, TS = [0];
for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };
const T_FLICK = 2.9, T_SWAT = 4.9, T_SHATTER = 5.5, T_PING = 7.5, T_WALK = 8.7, T_GONE = 9.75;
const T_LOOK = 9.55, T_NOTICE = 9.8, T_RISE = 9.95, T_PHONE = 10.3, T_RUN = 10.1, T_KNEEL = 10.45, T_TAKE = 10.56, T_REACH = 10.68;
const PICK = [6.0, 6.2, 6.4, 6.6, 6.8, 7.0];
const rF = realOf(T_FLICK), rW = realOf(T_SWAT), rX = realOf(T_SHATTER);
const panH = panX(635), panS = panX(360);

const pad = (t0, t1, ms, g, fi = 0.4, fo = 0.5) => {
  const s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  for (let i = 0; i < n; i++) {
    const tt = i / SR, ta = t0 + tt, e = Math.min(1, tt / fi, (t1 - t0 - tt) / fo);
    let v = 0;
    for (const m of ms) v += Math.sin(2 * Math.PI * hz(m) * ta) + 0.2 * Math.sin(4 * Math.PI * hz(m) * ta);
    add(s0 + i, v * g * e, 0);
  }
};
// music: warm and hopeful, colder after the flick, cut dead at the swat, then sad and low
pad(0, rF + 0.2, [48, 55, 60, 64], 0.01, 0.8, 0.3);
pad(rF, rW, [45, 52, 57, 60], 0.008, 0.2, 0.1);
pad(rX + 0.7, 14, [40, 47, 52], 0.008, 1.2, 1.2);
[64, 62, 60, 57, 59, 57, 55, 52].forEach((m, i) => bell(realOf(6.05) + i * 0.6, m, 0.024, -0.1, 1.6));


// her heartbeat: steady, faster when she tries again, gone when the heart breaks
for (let b = 0.3; b < T_SHATTER - 0.2; b += b < 3.9 ? 0.85 : 0.5) { const t = realOf(b); thump(t, 0.12, 50, panS); thump(t + realOf(b + 0.18) - t, 0.08, 44, panS); }
thump(realOf(5.2), 0.16, 40, 0); // one slow last beat while it falls

// his phone: taps while he scrolls, two pings
const tapAt = (s0, s1) => { for (let s = s0; s < s1; s += 0.38) click(realOf(s), 0.025, panH); };
tapAt(0.5, T_SWAT - 0.2); tapAt(T_SHATTER + 0.4, T_PING); tapAt(8.3, T_LOOK);
const ping = (t) => { bell(t, 88, 0.03, panH, 0.5); bell(t + 0.09, 93, 0.03, panH, 0.6); };
ping(realOf(1.6)); ping(realOf(T_PING));

// the flick and the swat
sweep(rF - 0.12, 0.2, 0.05, panH, 0.1, 0.5); noise(rF, 0.03, 0.06, panS, 0.6, (p) => 1 - p);
sweep(rW - 0.15, 0.25, 0.09, panH, 0.1, 0.7); thump(rW, 0.14, 70, panS); noise(rW, 0.05, 0.12, panS, 0.8, (p) => 1 - p);
sweep(rW + 0.05, rX - rW, 0.06, 0, 0.02, 0.15); // the heart tumbling, slowed down
tone(rW, hz(36), rX - rW + 0.2, 0.05, 0, 0.3, 1.0);

// the heart shatters like glass
thump(rX, 0.3, 40, panS); noise(rX, 0.5, 0.16, panS, 0.85, (p) => Math.exp(-p * 7));
for (let i = 0; i < 34; i++) click(rX + 0.01 + i * 0.018 + 0.03 * Math.abs(rnd()), 0.05 * (1 - i / 40), panS + 0.3 * rnd());
[96, 99, 101, 103, 106].forEach((m, i) => bell(rX + 0.01 * i, m, 0.02, panS, 0.5));
for (let j = 0; j < 7; j++) click(realOf(T_SHATTER + 0.3 + j * 0.04), 0.03, panS + 0.2 * rnd()); // pieces settle
tone(rX + 0.1, 2900, 2.0, 0.006, 0, 0.4, 1.0); // ringing silence

// on her knees: thud, pieces clink as she picks them up, rain on her alone, sobbing breaths
thump(realOf(5.88), 0.1, 55, panS);
PICK.forEach((s) => { tone(realOf(s + 0.1), 3200 + 400 * rnd(), 0.15, 0.012, panS, 0.001, 40); });
{
  const t0 = realOf(5.8), t1 = realOf(T_GONE), s0 = Math.floor(t0 * SR), n = Math.floor((t1 - t0) * SR);
  let lp = 0, hp = 0;
  for (let i = 0; i < n; i++) {
    const t = t0 + i / SR, e = Math.min(1, (t - t0) / 0.8, (t1 - t) / 1.2);
    const x = rnd(); lp += (x - lp) * 0.5; hp = x - lp;
    add(s0 + i, (hp * 0.03 + lp * 0.012) * e, -0.25 - 0.3 * Math.min(1, (t - realOf(T_WALK)) / 1.5 > 0 ? (t - realOf(T_WALK)) / 1.5 : 0));
  }
}
const sob = (t, g) => { noise(t, 0.18, g, -0.2, 0.06, (p) => Math.sin(Math.PI * p) * (1 - p)); noise(t + 0.2, 0.14, g * 0.7, -0.2, 0.05, (p) => Math.sin(Math.PI * p)); };
for (const s of [6.1, 6.55, 6.95, 7.35, 7.75, 8.15, 8.6]) sob(realOf(s), 0.05);

// he laughs at his phone while she watches him
{
  const bp = (f, Q) => { const w = (2 * Math.PI * f) / SR, al = Math.sin(w) / (2 * Q), a0 = 1 + al; return [al / a0, -al / a0, (-2 * Math.cos(w)) / a0, (1 - al) / a0]; };
  const ha = (t, f0, g) => {
    noise(t, 0.03, g * 0.25, panH, 0.5, (p) => 1 - p);
    const s0 = Math.floor((t + 0.02) * SR), n = Math.floor(0.12 * SR), F = [bp(700, 4), bp(1150, 5)], st = [[0, 0, 0, 0], [0, 0, 0, 0]];
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const tt = i / SR; ph += (f0 * (1 - tt)) / SR;
      const x = 2 * (ph % 1) - 1;
      let out = 0;
      F.forEach(([b0, b2, a1, a2], j) => { const z = st[j], y = b0 * x + b2 * z[1] - a1 * z[2] - a2 * z[3]; z[1] = z[0]; z[0] = x; z[3] = z[2]; z[2] = y; out += y * (j ? 0.6 : 1); });
      add(s0 + i, out * g * Math.min(1, tt / 0.012) * Math.pow(1 - tt / 0.12, 1.3), panH);
    }
  };
  for (let k = 0; k < 5; k++) ha(realOf(T_PING + 0.12) + k * 0.15, 135 * (1 - 0.03 * k), 0.05 * (1 - 0.1 * k));
}

// she stands and walks away, steps fading into the dark
for (let k = 0; k < 5; k++) step(realOf(T_WALK + 0.12 + k * 0.2), 0.05 * (1 - k / 6), panX(300 - k * 90));

// regret, in slow motion: the phone hits the floor, he runs, his own heartbeat, he reaches after her
sweep(realOf(T_NOTICE) - 0.05, 0.3, 0.04, panH, 0.02, 0.2);
tone(realOf(T_RISE), hz(35), 14 - realOf(T_RISE), 0.05, 0, 0.6, 0.25);
thump(realOf(T_PHONE), 0.18, 60, panH); click(realOf(T_PHONE), 0.06, panH); noise(realOf(T_PHONE), 0.25, 0.05, panH, 0.7, (p) => Math.exp(-p * 8));
for (let k = 0; k < 3; k++) thump(realOf(T_RUN + 0.08 + k * 0.13), 0.09, 48, panX(560 - k * 40));
thump(realOf(T_KNEEL + 0.08), 0.16, 44, panX(470));
for (const s of [10.5, 10.66, 10.82, 10.98]) { const t = realOf(s); thump(t, 0.15, 40, 0); thump(t + 0.35, 0.1, 36, 0); }
tone(realOf(T_TAKE + 0.05), 3300, 0.6, 0.012, panX(420), 0.001, 8);
pad(realOf(T_KNEEL), 14, [45, 52, 57, 60], 0.009, 1.0, 1.0);
{
  const t0 = realOf(T_KNEEL), s0 = Math.floor(t0 * SR), n = Math.floor((14 - t0) * SR);
  let lp = 0;
  for (let i = 0; i < n; i++) { const x = rnd(); lp += (x - lp) * 0.5; add(s0 + i, (x - lp) * 0.025 * Math.min(1, i / SR / 0.8), panX(470)); }
}
[64, 62, 60, 57].forEach((m, i) => bell(realOf(T_REACH) + i * 0.7, m, 0.026, 0, 2.0));

// last lines
[11.7, 11.82, 11.94, 12.06, 12.2].forEach((t, i) => thump(t, i === 4 ? 0.1 : 0.05, i === 4 ? 52 : 70, 0));
[12.5, 12.62, 12.74, 12.95, 13.12].forEach((t, i) => { thump(t, i > 2 ? 0.11 : 0.05, i > 2 ? 46 : 70, 0); click(t, 0.04, 0); });
