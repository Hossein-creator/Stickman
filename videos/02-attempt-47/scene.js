// 02 Attempt 47: he falls short 46 times while the crowd laughs, then makes the jump.
(function () {
  const { W, H, TAU, clamp, lerp, seg, hash, E, keys, mixColor, rgba, pose, mixPose, P, joints, grounded, drawFigure } = SS;
  const DUR = 13, Y = 1380, EL = 420, ER = 700, RED = "#ff3b5c", GOLD = "#ffc542";
  const S = 1.05, HIP = 168 * S + 7.5 * S; // hip height above ground when standing straight

  // ---------- jump physics ----------
  function arc(D, h, g) { const T = 2 * Math.sqrt((2 * h) / g); return { D, h, g, T, vx: D / T, vy: Math.sqrt(2 * g * h) }; }
  // position of the hip tau seconds after take-off; failed jumps slide down the far wall
  function fly(a, tau, land) {
    let x = EL + a.vx * tau;
    const y = Y - HIP - (a.vy * tau - 0.5 * a.g * tau * tau);
    if (!land) x = Math.min(x, ER - 30);
    else if (tau >= a.T) return { x: EL + a.D, y: Y - HIP, done: true };
    return { x, y, done: false };
  }

  // the five quick fails in the montage
  const MONT = [4, 12, 23, 35, 46].map((n, i) => ({ n, t0: 2.0 + i * 0.62, a: arc([200, 228, 248, 262, 272][i], 140, 5200) }));
  const FIRST = { t0: 0.85, a: arc(150, 150, 3200) };
  const LAST = { t0: 7.1, t1: 8.62, a: arc(340, 230, 3200) };
  // every failed attempt gets a faint arc
  const GHOSTS = Array.from({ length: 46 }, (_, i) => {
    const n = i + 1, D = 150 + 124 * Math.pow(n / 46, 0.6), h = 135 + 50 * hash(n, 3);
    return { n, a: arc(D, h, 3200) };
  });

  function warp(u) { return u + (0.92 / TAU) * Math.sin(TAU * u); } // slow in the middle of the big jump

  function attemptNumber(t) {
    if (t < 2.0) return 1;
    if (t < 5.2) {
      const i = Math.min(4, Math.floor((t - 2.0) / 0.62)), prev = i ? MONT[i - 1].n : 1;
      return Math.round(lerp(prev, MONT[i].n, seg(t, MONT[i].t0, MONT[i].t0 + 0.18)));
    }
    return t < 5.25 ? 46 : 47;
  }

  function hero(t) {
    const st = { color: "#ffffff", back: "#c0c8dc", glow: 28, glowColor: "rgba(170,200,255,0.95)", alpha: 1 };
    // attempt 1
    if (t < 2.0) {
      if (t < FIRST.t0) {
        const u = seg(t, 0, FIRST.t0), x = 120 + 300 * Math.pow(u, 1.5);
        return { j: grounded(P.run((x - 120) / 190 + 0.25, lerp(0.6, 1, u)), x, Y, S), st };
      }
      const tau = t - FIRST.t0, f = fly(FIRST.a, tau, false);
      const p = tau < FIRST.a.T * 0.5 ? mixPose(P.reach, P.tuck, seg(tau, 0, FIRST.a.T * 0.5)) : mixPose(P.tuck, P.flail(t * 2), seg(tau, FIRST.a.T * 0.5, FIRST.a.T));
      st.alpha = 1 - seg(f.y, Y + 250, Y + 700);
      return { j: joints(p, f.x, f.y, S), st, falling: f.y > Y - HIP + 20 };
    }
    // montage
    if (t < 5.1) {
      const i = Math.min(4, Math.floor((t - 2.0) / 0.62)), m = MONT[i], tau = t - m.t0 + 0.12; // cut in just after take-off
      const f = fly(m.a, tau, false);
      const p = tau < m.a.T * 0.5 ? mixPose(P.reach, P.tuck, seg(tau, 0, m.a.T * 0.5)) : mixPose(P.tuck, P.flail(t * 2), seg(tau, m.a.T * 0.5, m.a.T));
      st.alpha = 1 - seg(f.y, Y + 150, Y + 420);
      return { j: joints(p, f.x, f.y, S), st };
    }
    // attempt 47: reset, breathe, crouch, sprint, slow-motion jump, land
    if (t < 6.4) {
      st.alpha = seg(t, 5.12, 5.3);
      const br = Math.sin((t - 5.1) * 5) * 0.03;
      let p = pose({ lean: 0.08 + br, head: keys(t, [[5.1, 0.05], [5.6, -0.12], [6.0, 0.0]]), aF: 0.2, eF: 0.4, aB: -0.15, eB: 0.4 });
      p = mixPose(p, P.crouch, E.inOut(seg(t, 6.05, 6.38)) * 0.55);
      return { j: grounded(p, 150, Y, S), st };
    }
    if (t < LAST.t0) {
      const u = seg(t, 6.4, LAST.t0), x = 150 + 270 * Math.pow(u, 1.35);
      return { j: grounded(P.run((x - 150) / 210, 1.1), x, Y, S), st, sprint: u };
    }
    if (t < LAST.t1) {
      const u = seg(t, LAST.t0, LAST.t1), tau = warp(u) * LAST.a.T, f = fly(LAST.a, tau, true);
      const p = tau < LAST.a.T * 0.45 ? mixPose(P.reach, P.tuck, E.out(seg(tau, 0, LAST.a.T * 0.45))) : mixPose(P.tuck, P.reach, E.inOut(seg(tau, LAST.a.T * 0.55, LAST.a.T)));
      st.glowColor = mixColor("#aac8ff", GOLD, u); st.glow = 28 + 20 * u;
      return { j: joints(p, f.x, f.y, S), st, flying: u };
    }
    const k1 = E.out(seg(t, LAST.t1, LAST.t1 + 0.35)), k2 = E.inOut(seg(t, LAST.t1 + 0.45, LAST.t1 + 0.95)), k3 = E.outBack(seg(t, 9.55, 9.95));
    let p = mixPose(P.crouch, P.stand, k2);
    if (k1 < 1) p = mixPose(P.tuck, p, k1);
    p = mixPose(p, P.victory, k3);
    p.lean += Math.sin(t * 2.6) * 0.01;
    st.glowColor = "rgba(255,197,66,0.95)"; st.glow = 46;
    return { j: grounded(p, EL + LAST.a.D, Y, S), st };
  }

  // ---------- crowd ----------
  const CROWD = Array.from({ length: 7 }, (_, i) => ({
    x: 812 + i * 40 + hash(i, 1) * 10, s: (i % 2 ? 0.66 : 0.8) + hash(i, 2) * 0.06, back: i % 2 === 1, ph: hash(i, 4),
  })).sort((a, b) => (a.back === b.back ? 0 : a.back ? -1 : 1));

  // 0 = laughing hard, 1 = silent, 2 = clapping
  function crowdMood(t) { return t < 8.75 ? keys(t, [[0, 0], [3.6, 0], [4.9, 1]], E.linear) : 2; }
  function laughingAt(t) { // a fail just happened -> laugh burst
    const fails = [1.15, ...MONT.map((m) => m.t0 + 0.42)];
    let b = 0;
    for (const f of fails) b = Math.max(b, Math.exp(-Math.max(0, t - f) * 3) * (t >= f ? 1 : 0));
    return b;
  }
  function crowdFigure(c, i, t) {
    const mood = crowdMood(t);
    let p;
    if (mood < 2) {
      const lb = laughingAt(t) * (1 - mood), bounce = Math.sin(t * 22 + i) * lb;
      const laugh = pose({ lean: -0.18 + 0.06 * bounce, head: -0.35 + 0.1 * bounce, aF: 0.95, eF: 1.7, aB: 0.6, eB: 1.9 });
      const watch = pose({ lean: 0.02, head: 0.05, aF: 1.0, eF: 2.2, aB: 0.85, eB: 2.3 });
      p = mixPose(watch, laugh, clamp(lb * 1.4 + (1 - mood) * 0.35));
    } else {
      p = P.clap(t * 3.2 + c.ph);
      p.head = -0.12;
    }
    const col = c.back ? "#3c4250" : "#5c6475";
    const glow = mood === 2 ? 8 : 0;
    return { j: grounded(p, c.x, Y, c.s, -1), st: { color: col, back: c.back ? "#2f3440" : "#4a5160", glow, glowColor: "rgba(255,197,66,0.5)" } };
  }

  function bubbles(ctx, t) {
    const fails = [1.15, ...MONT.map((m) => m.t0 + 0.42)];
    const words = ["HAHA", "LOL", "HA HA", "LMAO", "HAHA"];
    ctx.save();
    ctx.font = `800 30px ${SS.FONT}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.letterSpacing = "2px";
    fails.forEach((f, fi) => {
      const count = Math.max(0, 4 - Math.floor(fi * 0.8));
      for (let b = 0; b < count; b++) {
        const st = f + b * 0.09, k = seg(t, st, st + 0.18), out = 1 - seg(t, st + 0.55, st + 0.75);
        if (k <= 0 || out <= 0) continue;
        const c = CROWD[(fi * 3 + b * 2) % CROWD.length], word = words[(fi + b) % words.length];
        const x = c.x + (hash(fi * 7 + b, 9) - 0.5) * 60, y = Y - 330 * c.s - 40 - b * 18 - 30 * seg(t, st, st + 0.75);
        const sc = E.outBack(k);
        ctx.globalAlpha = out * 0.95;
        ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate((hash(fi + b, 2) - 0.5) * 0.3);
        const w = ctx.measureText(word).width + 30;
        ctx.fillStyle = "rgba(240,242,248,0.95)"; ctx.beginPath(); ctx.roundRect(-w / 2, -24, w, 48, 24); ctx.fill();
        ctx.beginPath(); ctx.moveTo(6, 20); ctx.lineTo(20, 38); ctx.lineTo(20, 18); ctx.fill();
        ctx.fillStyle = "#11141c"; ctx.fillText(word, 0, 2);
        ctx.restore();
      }
    });
    ctx.restore();
  }

  // ---------- world ----------
  function backdrop(ctx, t) {
    const g = ctx.createLinearGradient(0, -400, 0, Y + 200);
    g.addColorStop(0, "#030409"); g.addColorStop(0.7, "#0a0e1a"); g.addColorStop(1, "#121a2e");
    ctx.fillStyle = g; ctx.fillRect(-800, -600, W + 1600, 3200);
    // far ridges
    [["#0b101c", 0.35, 220, 5], ["#0e1424", 0.6, 120, 9]].forEach(([col, amp, base, sd]) => {
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-800, Y);
      for (let x = -800; x <= W + 800; x += 60) ctx.lineTo(x, Y - base - Math.sin(x * 0.004 + sd) * 90 * amp - hash(Math.floor(x / 60), sd) * 60 * amp);
      ctx.lineTo(W + 800, Y); ctx.closePath(); ctx.fill();
    });
    // gold beam on the far side after landing
    const gb = seg(t, 8.6, 9.4);
    if (gb > 0) SS.cone(ctx, 760, -300, Y, 160, 520, GOLD, 0.22 * gb);
    SS.cone(ctx, 300, -300, Y, 120, 560, "#cfdcff", 0.11);
  }

  function cliffs(ctx, t) {
    const r = SS.rng(21);
    const edge = (x0, side) => { const pts = [[x0, Y]]; let y = Y; while (y < 2600) { y += 60 + r() * 90; pts.push([x0 + side * (r() * 26 - 8) - side * (y - Y) * 0.02, y]); } return pts; };
    const L = edge(EL, -1), R = edge(ER, 1);
    // the gap fades to black, with a little mist near the top
    const ab = ctx.createLinearGradient(0, Y, 0, Y + 700);
    ab.addColorStop(0, "rgba(20,28,48,0.0)"); ab.addColorStop(0.15, "rgba(30,42,72,0.35)"); ab.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = ab; ctx.fillRect(EL - 60, Y, ER - EL + 120, 700);
    ctx.fillStyle = "#000"; ctx.fillRect(EL - 60, Y + 699, ER - EL + 120, 1400);
    const fill = (pts, far) => {
      const g = ctx.createLinearGradient(0, Y, 0, Y + 900);
      g.addColorStop(0, "#151a26"); g.addColorStop(1, "#050609");
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(far, Y);
      pts.forEach((p) => ctx.lineTo(p[0], p[1])); ctx.lineTo(far, 2700); ctx.closePath(); ctx.fill();
    };
    fill(L, -900); fill(R, W + 900);
    const glow = seg(t, 8.62, 9.2);
    ctx.save(); ctx.lineWidth = 3; ctx.shadowBlur = 16;
    ctx.strokeStyle = "rgba(220,230,255,0.35)"; ctx.shadowColor = "rgba(200,220,255,0.5)";
    ctx.beginPath(); ctx.moveTo(-900, Y); ctx.lineTo(EL, Y); ctx.stroke();
    ctx.strokeStyle = glow > 0 ? rgba(GOLD, 0.35 + 0.5 * glow) : "rgba(220,230,255,0.35)"; ctx.shadowColor = glow > 0 ? GOLD : "rgba(200,220,255,0.5)";
    ctx.beginPath(); ctx.moveTo(ER, Y); ctx.lineTo(W + 900, Y); ctx.stroke();
    ctx.restore();
  }

  function arcPath(ctx, a, upto, fail) {
    ctx.beginPath();
    for (let k = 0; k <= 40; k++) {
      const tau = (upto * k) / 40, f = fly(a, tau, !fail);
      const yy = f.y + HIP - 30; // draw the path at waist height
      if (k === 0) ctx.moveTo(f.x, yy); else ctx.lineTo(f.x, yy);
    }
  }
  function ghostArcs(ctx, t) {
    const n = t < 5.2 ? attemptNumber(t) - 1 : 46;
    ctx.save(); ctx.setLineDash([2, 14]); ctx.lineCap = "round"; ctx.lineWidth = 3;
    for (const g of GHOSTS) {
      if (g.n > n) break;
      ctx.strokeStyle = rgba(RED, 0.16 + 0.12 * hash(g.n, 8)); arcPath(ctx, g.a, g.a.T + 0.03, true); ctx.stroke();
    }
    ctx.restore();
  }
  function goldArc(ctx, t) {
    if (t < LAST.t0) return;
    const u = t < LAST.t1 ? warp(seg(t, LAST.t0, LAST.t1)) : 1;
    ctx.save(); ctx.lineCap = "round"; ctx.lineWidth = 7; ctx.strokeStyle = GOLD; ctx.shadowColor = GOLD; ctx.shadowBlur = 30;
    arcPath(ctx, LAST.a, LAST.a.T * u, false); ctx.stroke(); ctx.restore();
  }

  function sparks(ctx, t) {
    if (t < LAST.t0 || t > LAST.t1 + 1.2) return;
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 70; i++) {
      const born = LAST.t0 + (i / 70) * (LAST.t1 - LAST.t0), age = t - born;
      if (age < 0 || age > 0.9) continue;
      const u = warp(seg(born, LAST.t0, LAST.t1)), f = fly(LAST.a, u * LAST.a.T, true);
      const x = f.x - 30 + (hash(i, 1) - 0.5) * 40 - age * 60, y = f.y + 20 + (hash(i, 2) - 0.5) * 50 + age * age * 160;
      SS.glowDot(ctx, x, y, 10 * (1 - age / 0.9) + 2, GOLD, 0.8 * (1 - age / 0.9));
    }
    ctx.restore();
  }
  function landingFx(ctx, t) {
    const t0 = LAST.t1, x = EL + LAST.a.D;
    if (t < t0) return;
    const a = t - t0;
    SS.ring(ctx, x, Y, 40 + a * 900, 6 * (1 - seg(a, 0, 0.8)), GOLD, 1 - seg(a, 0, 0.8), 0.22);
    SS.ring(ctx, x, Y, 20 + a * 520, 3, "#ffffff", 0.7 * (1 - seg(a, 0, 0.6)), 0.22);
    ctx.save();
    for (let i = 0; i < 26; i++) {
      const ang = Math.PI * (0.05 + 0.9 * hash(i, 3)), sp = 300 + 500 * hash(i, 4), life = 0.7 + 0.5 * hash(i, 5);
      if (a > life) continue;
      const px = x + Math.cos(ang) * sp * a * (hash(i, 6) > 0.5 ? 1 : -1), py = Y - Math.sin(ang) * sp * a + 900 * a * a;
      ctx.globalAlpha = 0.7 * (1 - a / life); ctx.fillStyle = i % 3 ? "#9aa3b8" : GOLD;
      ctx.beginPath(); ctx.arc(px, Math.min(py, Y), 4 + 5 * hash(i, 7), 0, TAU); ctx.fill();
    }
    ctx.restore();
  }
  // sprint afterimages
  function afterimages(ctx, t) {
    if (t < 6.55 || t > LAST.t0 + 0.2) return;
    for (let k = 3; k >= 1; k--) {
      const h = hero(Math.max(6.4, t - k * 0.055));
      if (!h.j) continue;
      drawFigure(ctx, h.j, { color: "#9fb6ff", back: "#9fb6ff", glow: 0, alpha: 0.12 * (4 - k) });
    }
  }
  function speedLines(ctx, t) {
    const k = seg(t, 6.5, 7.0) * (1 - seg(t, 7.3, 7.6));
    if (k <= 0) return;
    ctx.save(); ctx.strokeStyle = "rgba(220,230,255,0.5)"; ctx.lineCap = "round";
    for (let i = 0; i < 22; i++) {
      const y = 760 + hash(i, 1) * 640, len = 120 + 220 * hash(i, 2), x = ((hash(i, 3) * 1400 - t * 2600) % 1400 + 1400) % 1400 - 200;
      ctx.globalAlpha = k * (0.25 + 0.4 * hash(i, 4)); ctx.lineWidth = 2 + 3 * hash(i, 5);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y); ctx.stroke();
    }
    ctx.restore();
  }

  function draw(ctx, t) {
    const h = hero(t);
    const [sx1, sy1] = SS.shake(t, LAST.t1, 22, 0.6);
    const [sx2, sy2] = SS.shake(t, 1.42, 6, 0.3);
    ctx.save();
    SS.camera(ctx, {
      x: keys(t, [[0, 540], [5.1, 540], [5.3, 330], [6.3, 330], [7.1, 520], [8.6, 600], [12.9, 560]], E.sine),
      y: keys(t, [[0, 990], [5.1, 990], [5.3, 1120], [6.3, 1120], [7.1, 1040], [8.6, 1000], [12.9, 1010]], E.sine),
      zoom: keys(t, [[0, 1.0], [5.1, 1.0], [5.3, 1.32], [6.3, 1.42], [7.1, 1.0], [7.85, 1.1], [8.6, 1.06], [12.9, 0.94]], E.sine),
      sx: sx1 + sx2, sy: sy1 + sy2,
    });
    backdrop(ctx, t);
    SS.motes(ctx, t, 40, -100, 1200, 300, Y - 40, "#cfdcff", 0.25);
    ghostArcs(ctx, t);
    CROWD.forEach((c, i) => { const f = crowdFigure(c, i, t); drawFigure(ctx, f.j, f.st); });
    afterimages(ctx, t);
    goldArc(ctx, t);
    sparks(ctx, t);
    if (h.st.alpha > 0) drawFigure(ctx, h.j, h.st);
    cliffs(ctx, t);
    landingFx(ctx, t);
    bubbles(ctx, t);
    ctx.restore();

    speedLines(ctx, t);
    SS.vignette(ctx, 0.78);
    // HUD
    const n = attemptNumber(t), made = seg(t, 8.8, 8.95);
    const changes = [0, ...MONT.map((m) => m.t0), 5.25];
    const changedAt = changes.filter((c) => c <= t).pop();
    SS.counter(ctx, t, {
      label: "ATTEMPT", value: String(n).padStart(2, "0"), x: W / 2, y: 252, changedAt: t >= 8.8 ? 8.8 : changedAt,
      color: mixColor("#ffffff", GOLD, made), glow: made > 0 ? "rgba(255,197,66,0.9)" : null,
    });
    const fails = [[1.2, 1.95], ...MONT.map((m) => [m.t0 + 0.4, m.t0 + 0.6])];
    fails.forEach(([a, b]) => SS.tag(ctx, t, { text: "FAIL", start: a, end: b, x: W / 2 + 140, y: 308, color: RED, rot: -0.08 }));
    SS.tag(ctx, t, { text: "MADE IT", start: 8.85, x: W / 2 + 190, y: 308, color: GOLD, rot: -0.06 });

    ctx.save(); ctx.globalAlpha = 1 - 0.45 * seg(t, 8.85, 9.2);
    const yEnd = SS.caption(ctx, t, { text: "THEY LAUGHED AT ATTEMPT 1.", start: 0.15, y: 470, size: 70, maxW: 600, accent: { LAUGHED: RED } });
    ctx.restore();
    SS.caption(ctx, t, { text: "THEY CLAPPED AT ATTEMPT 47.", start: 8.9, y: yEnd + 110, size: 70, maxW: 600, accent: { CLAPPED: GOLD, 47: GOLD } });

    SS.flash(ctx, (1 - seg(t, LAST.t1, LAST.t1 + 0.35)) * (t >= LAST.t1 ? 0.45 : 0), "#ffe3a1");
    SS.flash(ctx, t >= 5.1 ? (1 - seg(t, 5.1, 5.35)) * 0.6 : 0, "#000000");
    SS.grain(ctx, t, 0.08);
  }

  SS.mount({ id: "main", duration: DUR, draw });
})();
