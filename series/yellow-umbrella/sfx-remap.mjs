// ---- remap story-time audio to video time (teaser, rewind, slow motion, freeze) + video-time stings ----
{
  let v = 0;
  const M = MAPDEF.map((e) => { let o; if (e[0] === "freeze") o = { k: "freeze", v0: v, v1: v + e[2], T0: e[1], T1: e[1] }; else if (e[0] === "rew") o = { k: "rew", v0: v, v1: v + e[3], T0: e[1], T1: e[2] }; else o = { k: e[0], v0: v, v1: v + (e[2] - e[1]) / e[3], T0: e[1], T1: e[2], rate: e[3] }; v = o.v1; return o; });
  const sL = Float32Array.from(L), sR = Float32Array.from(R);
  L.fill(0); R.fill(0);
  let mi = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    while (mi < M.length - 1 && t >= M[mi].v1) mi++;
    const m = M[mi], p = clamp((t - m.v0) / (m.v1 - m.v0), 0, 1);
    const pe = m.k === "rew" ? p * p * (3 - 2 * p) : p;
    const T = m.T0 + (m.T1 - m.T0) * pe;
    const g = m.k === "freeze" ? 0 : m.k === "rew" ? 0.25 : m.k === "tease" ? 0.85 : 1;
    const e = Math.min(1, (t - m.v0) / 0.03, (m.v1 - t) / 0.03 + (mi === M.length - 1 ? 1 : 0));
    const j = T * SR, j0 = Math.floor(j), f = j - j0;
    if (j0 >= 0 && j0 + 1 < N) { L[i] = (sL[j0] * (1 - f) + sL[j0 + 1] * f) * g * Math.max(0, e); R[i] = (sR[j0] * (1 - f) + sR[j0 + 1] * f) * g * Math.max(0, e); }
  }
  for (const m of M) {
    if (m.k === "tease") { thump(m.v0 + 0.02, 0.12, 40, 0); noise(m.v0, 0.5, 0.05, 0, 0.05, (p) => 1 - p); }
    if (m.k === "rew") { sweep(m.v0, m.v1 - m.v0 + 0.1, 0.09, 0, 0.1, 0.9); for (let k = 0; k < 6; k++) tone(m.v0 + k * (m.v1 - m.v0) / 6, 1800 - k * 200, 0.05, 0.01, 0, 0.001, 50); thump(m.v1, 0.1, 50, 0); }
    if (m.k === "freeze") { thump(m.v0, 0.16, 42, 0); noise(m.v0, 0.5, 0.07, 0, 0.7, (p) => Math.pow(1 - p, 2)); bell(m.v0 + 0.02, 84, 0.025, 0, 0.9); bell(m.v0 + 0.02, 72, 0.02, 0, 0.6); for (let i = Math.floor(m.v0 * SR); i < Math.floor(m.v1 * SR) && i < N; i++) { const tt = i / SR - m.v0; add(i, Math.sin(2 * Math.PI * 55 * tt) * 0.03 * Math.min(1, tt / 0.2) * Math.min(1, (m.v1 - m.v0 - tt) / 0.2), 0); } }
    if (m.k === "play" && m.rate < 1) { sweep(m.v0 - 0.15, 0.4, 0.05, 0, 0.05, 0.4); thump(m.v0, 0.06, 45, 0); }
  }
}
