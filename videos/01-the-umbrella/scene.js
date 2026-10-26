// 01 The Umbrella: he keeps them dry for three years, they walk away with the umbrella.
(function () {
  const { W, H, TAU, clamp, lerp, seg, hash, E, keys, mixColor, rgba, pose, mixPose, P, grounded, drawFigure, handF } = SS;
  const DUR = 13, G = 1420, RED = "#ff2d55", WARM = "#ffb46b";
  const LAMP = { x: 330, y: 575 };

  const rainDensity = (t) => keys(t, [[0, 0.35], [1.6, 0.45], [3.0, 1.0]]);
  const exposure = (t) => keys(t, [[1.8, 0], [3.0, 1]]);
  const dryness = (t) => keys(t, [[1.8, 1], [6.0, 0.3], [9.0, 0.06]]);

  // ---------- characters ----------
  function hero(t) {
    let aF = keys(t, [[0, 2.55], [1.7, 2.55], [3.0, 2.25], [6.6, 2.25], [7.9, 0.14], [11.0, 0.14], [12.1, 1.15]]);
    let eF = keys(t, [[0, 0.35], [1.7, 0.35], [3.0, 0.45], [6.6, 0.45], [7.9, 0.08], [11.0, 0.08], [12.1, 0.55]]);
    const p = pose({
      lean: keys(t, [[0, 0.03], [7.0, 0.03], [8.6, 0.13]]),
      head: keys(t, [[0, 0.12], [1.0, 0.2], [3.0, 0.18], [6.0, 0.22], [6.5, -0.05], [7.2, -0.05], [8.8, 0.52], [11.0, 0.52], [12.1, 0.38]]),
      aF, eF,
      aB: keys(t, [[0, 0.35], [6.6, 0.35], [8.0, -0.04]]), eB: keys(t, [[0, 0.6], [6.6, 0.6], [8.0, 0.06]]),
      lF: 0.06, kF: 0.04, lB: -0.07, kB: 0.04,
    });
    const shiver = Math.sin(t * 52) * 2.2 * exposure(t) * (1 - seg(t, 9, 11));
    const breathe = Math.sin(t * 2.4) * 0.012;
    p.lean += breathe;
    const j = grounded(p, 455 + shiver, G, 1.25, 1);
    const d = dryness(t);
    return { j, st: { color: mixColor("#ffffff", "#7f8aa3", 1 - d), back: mixColor("#c3cbe0", "#5d6780", 1 - d), glow: 4 + 30 * d } };
  }

  function partnerX(t) { return keys(t, [[6.8, 620], [8.4, 880], [9.1, 880], [11.6, 1320]], E.linear); }
  function partner(t) {
    const x = partnerX(t);
    const dir = keys(t, [[4.15, -1], [4.5, 1], [5.55, 1], [5.85, -1], [6.45, -1], [6.75, 1]], E.sine);
    const walking = (t > 6.8 && t < 8.4) || (t > 9.1 && t < 11.6);
    let p = pose({
      lean: keys(t, [[0, 0.08], [0.8, 0.08], [1.6, 0.16], [4.1, 0.16], [4.4, 0.0]]),
      head: keys(t, [[0, 0.2], [1.6, 0.34], [4.1, 0.34], [4.4, -0.08], [5.6, -0.08], [5.9, -0.18], [6.6, 0.0]]),
      aF: keys(t, [[0, 0.55], [5.6, 0.55], [6.3, 2.62], [6.5, 2.62], [6.9, 2.78]]),
      eF: keys(t, [[0, 1.05], [5.6, 1.05], [6.3, 0.18], [6.9, 0.22]]),
      aB: 0.45, eB: 1.0,
    });
    if (walking) {
      const ph = (x - 620) / 175;
      const w = P.walk(ph, 1);
      p = Object.assign(w, { aF: p.aF, eF: p.eF, head: -0.04 });
    }
    if (t > 8.4 && t < 9.1) p.head = keys(t, [[8.4, -0.02], [8.7, 0.22], [9.0, 0.1]]);
    return { j: grounded(p, x, G, 1.12, dir), st: { color: "#d9dce7", back: "#9da3b4", glow: 9, glowColor: "rgba(255,170,200,0.55)" } };
  }

  function stranger(t) {
    const alpha = keys(t, [[3.9, 0], [4.7, 1]]);
    const x = keys(t, [[9.1, 960], [11.6, 1400]], E.linear);
    const dir = keys(t, [[8.95, -1], [9.25, 1]], E.sine);
    let p = pose({ aF: 0.15, eF: 0.2, aB: -0.1, eB: 0.2, head: -0.05 });
    if (t > 4.9 && t < 6.0) {
      const k = Math.sin(seg(t, 4.9, 6.0) * Math.PI);
      p.aF = lerp(0.15, 2.9, clamp(k * 1.6)); p.eF = lerp(0.2, 0.35 + 0.35 * Math.sin(t * 15), clamp(k * 1.6));
    }
    if (t > 9.1 && t < 11.6) { p = P.walk((x - 960) / 185, 1); p.aF = 0.5; p.eF = 1.2; }
    return { j: grounded(p, x, G, 1.28, dir), st: { color: "#16120f", back: "#16120f", glow: 26, glowColor: "rgba(255,170,90,0.95)", alpha } };
  }

  // umbrella follows whoever holds it
  function umbrella(t, h, pa) {
    const k = E.inOut(seg(t, 6.36, 6.56));
    const hh = handF(h.j), ph = handF(pa.j);
    const x = lerp(hh[0], ph[0], k), y = lerp(hh[1], ph[1], k);
    const tilt = lerp(keys(t, [[1.7, 0], [3.0, 0.52]]), keys(t, [[6.6, 0.2], [8.4, 0.05], [8.8, 0.2]]), k);
    const R = 205, rim = -150;
    const c = Math.cos(tilt), s = Math.sin(tilt);
    const pt = (px, py) => [x + px * c - py * s, y + px * s + py * c];
    return { x, y, tilt, R, rim, L: pt(-R, rim), Rr: pt(R, rim), top: pt(0, rim - 125) };
  }
  // is a rain drop at (x,y) in the umbrella's dry shadow?
  function dry(u, x, y) {
    const yr = lerp(u.L[1], u.Rr[1], clamp((x - u.L[0]) / (u.Rr[0] - u.L[0])));
    if (y < yr - 6) return false;
    const xs = x - 0.12 * (y - yr);
    return xs > u.L[0] + 6 && xs < u.Rr[0] - 6 && y < G + 30;
  }

  function drawUmbrella(ctx, u, t) {
    ctx.save(); ctx.translate(u.x, u.y); ctx.rotate(u.tilt);
    const R = u.R, rim = u.rim, top = rim - 125;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#cfd4de"; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(0, top - 18); ctx.stroke();
    ctx.beginPath(); ctx.arc(-16, 16, 16, 0, Math.PI, false); ctx.stroke();
    const g = ctx.createLinearGradient(0, top, 0, rim);
    g.addColorStop(0, "#ff5a78"); g.addColorStop(1, "#c10f35");
    ctx.shadowColor = "rgba(255,45,85,0.75)"; ctx.shadowBlur = 46;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-R, rim);
    ctx.bezierCurveTo(-R * 0.95, top + 10, -R * 0.45, top, 0, top);
    ctx.bezierCurveTo(R * 0.45, top, R * 0.95, top + 10, R, rim);
    const n = 6;
    for (let i = n - 1; i >= 0; i--) { const x0 = -R + (2 * R * (i + 1)) / n, x1 = -R + (2 * R * i) / n; ctx.quadraticCurveTo((x0 + x1) / 2, rim - 26, x1, rim); }
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(90,0,20,0.45)"; ctx.lineWidth = 3;
    for (let i = 1; i < n; i++) { const xr = -R + (2 * R * i) / n; ctx.beginPath(); ctx.moveTo(0, top + 2); ctx.quadraticCurveTo(xr * 0.7, top + 30, xr, rim - 4); ctx.stroke(); }
    ctx.strokeStyle = "rgba(255,200,210,0.55)"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-R * 0.6, top + 40); ctx.quadraticCurveTo(-R * 0.35, top + 8, -R * 0.05, top + 4); ctx.stroke();
    // rain bouncing off the canopy
    ctx.fillStyle = "rgba(220,230,255,0.8)";
    for (let i = 0; i < 9; i++) {
      const per = 0.22 + 0.2 * hash(i, 41), ph = t / per + hash(i, 42), cyc = Math.floor(ph), a = ph - cyc;
      if (hash(i * 13 + cyc, 43) > rainDensity(t)) continue;
      const px = (hash(i * 7 + cyc, 44) * 2 - 1) * R * 0.85;
      const py = top + 8 + Math.pow(Math.abs(px) / R, 2) * (rim - top - 10);
      for (let d = -1; d <= 1; d += 2) ctx.fillRect(px + d * a * 26, py - 26 * a + 40 * a * a, 3, 3);
    }
    ctx.restore();
  }

  function heart(ctx, x, y, s, a) {
    if (a <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
    ctx.fillStyle = RED; ctx.shadowColor = RED; ctx.shadowBlur = 24;
    ctx.beginPath(); ctx.moveTo(0, 10);
    ctx.bezierCurveTo(-26, -8, -14, -30, 0, -16); ctx.bezierCurveTo(14, -30, 26, -8, 0, 10);
    ctx.fill(); ctx.restore();
  }

  // ---------- environment ----------
  const city = [];
  (function () {
    const r = SS.rng(11); let x = -80;
    while (x < 1200) { const w = 70 + r() * 120, h = 90 + r() * 330; city.push({ x, w, h, win: Array.from({ length: 10 }, () => [r(), r(), r()]) }); x += w + r() * 14; }
  })();

  function lightningA(t) {
    return Math.max(keys(t, [[7.2, 0], [7.24, 0.75], [7.31, 0.1], [7.4, 0.12], [7.44, 0.5], [7.85, 0]], E.linear), 0);
  }
  function bolt(ctx, t) {
    const a = lightningA(t);
    if (a < 0.05) return;
    const r = SS.rng(5); let x = 760, y = -40;
    ctx.save(); ctx.strokeStyle = "rgba(235,240,255," + a + ")"; ctx.lineWidth = 5; ctx.shadowColor = "#bcd0ff"; ctx.shadowBlur = 40;
    ctx.beginPath(); ctx.moveTo(x, y);
    while (y < 1150) { x += (r() - 0.5) * 120; y += 60 + r() * 70; ctx.lineTo(x, y); }
    ctx.stroke(); ctx.restore();
  }

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, -200, 0, G);
    g.addColorStop(0, "#04060c"); g.addColorStop(0.6, "#0a1121"); g.addColorStop(1, "#16203a");
    ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, G + 400);
    const la = lightningA(t);
    if (la > 0) { ctx.fillStyle = `rgba(150,175,235,${la * 0.55})`; ctx.fillRect(-400, -400, W + 800, G + 400); }
    bolt(ctx, t);
    for (const b of city) {
      ctx.fillStyle = la > 0.2 ? "#1a2238" : "#0b111f";
      ctx.fillRect(b.x, G - 170 - b.h, b.w, b.h + 170);
      for (const w of b.win) if (w[2] > 0.72) { ctx.fillStyle = `rgba(255,190,120,${0.25 + 0.3 * w[2]})`; ctx.fillRect(b.x + 10 + w[0] * (b.w - 26), G - 160 - w[1] * b.h, 9, 13); }
    }
    const f = ctx.createLinearGradient(0, G - 330, 0, G);
    f.addColorStop(0, "rgba(40,55,90,0)"); f.addColorStop(1, "rgba(40,55,90,0.55)");
    ctx.fillStyle = f; ctx.fillRect(-400, G - 330, W + 800, 330);
  }

  function doorA(t) {
    const on = seg(t, 3.9, 4.3);
    const flick = t < 4.3 ? (hash(Math.floor(t * 24), 9) > 0.35 ? 1 : 0.25) : 1;
    return on * flick;
  }
  function door(ctx, t) {
    const a = doorA(t);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    const g = ctx.createRadialGradient(965, 1260, 20, 965, 1260, 260);
    g.addColorStop(0, "rgba(255,200,140,0.95)"); g.addColorStop(0.5, "rgba(255,160,80,0.45)"); g.addColorStop(1, "rgba(255,140,60,0)");
    ctx.fillStyle = g; ctx.fillRect(700, 1000, 520, 420);
    ctx.fillStyle = "rgba(255,214,160,0.9)"; ctx.shadowColor = WARM; ctx.shadowBlur = 60;
    ctx.fillRect(895, 1105, 140, G - 1105);
    ctx.restore();
  }

  function lamp(ctx) {
    ctx.save();
    ctx.strokeStyle = "#1a2133"; ctx.lineWidth = 16; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(150, G); ctx.lineTo(150, 520); ctx.quadraticCurveTo(150, 480, 200, 480); ctx.lineTo(LAMP.x - 20, 480); ctx.stroke();
    ctx.fillStyle = "#1a2133"; ctx.beginPath(); ctx.moveTo(LAMP.x - 60, 560); ctx.lineTo(LAMP.x + 60, 560); ctx.lineTo(LAMP.x + 26, 488); ctx.lineTo(LAMP.x - 26, 488); ctx.closePath(); ctx.fill();
    ctx.shadowColor = "#ffd59a"; ctx.shadowBlur = 50; ctx.fillStyle = "#ffe2b5";
    ctx.beginPath(); ctx.ellipse(LAMP.x, 562, 54, 9, 0, 0, TAU); ctx.fill();
    ctx.restore();
  }

  function drawRain(ctx, t, near, u) {
    const dens = rainDensity(t), n = near ? 130 : 230, span = H + 400;
    ctx.save(); ctx.lineCap = "round";
    for (let i = 0; i < n; i++) {
      const sd = near ? 100 : 300;
      if (hash(i, sd + 1) > dens) continue;
      const sp = near ? 2700 + 900 * hash(i, sd + 2) : 1800 + 500 * hash(i, sd + 3);
      const len = near ? 80 + 50 * hash(i, sd + 4) : 36 + 22 * hash(i, sd + 5);
      const y = ((hash(i, sd + 6) * span + t * sp) % span) - 200;
      const x = hash(i, sd + 7) * (W + 400) - 300 + y * 0.12;
      if (!near && y > G + 40) continue;
      if (u && dry(u, x, y)) continue;
      const cw = lerp(30, 300, clamp((y - LAMP.y) / (G - LAMP.y)));
      const lit = y > LAMP.y && Math.abs(x - LAMP.x) < cw;
      ctx.strokeStyle = lit ? `rgba(255,228,190,${near ? 0.7 : 0.55})` : near ? "rgba(185,205,240,0.42)" : "rgba(140,160,205,0.3)";
      ctx.lineWidth = near ? 3.2 : 1.7;
      ctx.beginPath(); ctx.moveTo(x - len * 0.12, y - len); ctx.lineTo(x, y); ctx.stroke();
    }
    ctx.restore();
  }

  function splashes(ctx, t) {
    const dens = rainDensity(t);
    ctx.save();
    for (let i = 0; i < 80; i++) {
      if (hash(i, 51) > dens) continue;
      const per = 0.3 + 0.4 * hash(i, 52), ph = t / per + hash(i, 53), cyc = Math.floor(ph), age = (ph - cyc) * per;
      if (age > 0.3) continue;
      const x = hash(i * 31 + cyc, 54) * (W + 200) - 100, depth = hash(i * 17 + cyc, 55);
      const y = G + 8 + depth * 420, sc = 0.7 + depth * 1.6, k = age / 0.3;
      ctx.globalAlpha = 0.55 * (1 - k);
      ctx.strokeStyle = "rgba(190,210,245,1)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(x, y, (5 + 30 * k) * sc, (1.5 + 7 * k) * sc, 0, 0, TAU); ctx.stroke();
      ctx.fillStyle = "rgba(210,225,255,1)";
      for (let d = -1; d <= 1; d += 2) ctx.fillRect(x + d * k * 18 * sc, y - (34 * k - 40 * k * k) * sc, 2.5, 2.5);
    }
    ctx.restore();
  }

  // droplets bursting off the hero once he is out in the rain
  function heroSplash(ctx, t, j) {
    const ex = exposure(t);
    if (ex <= 0) return;
    ctx.save(); ctx.fillStyle = "rgba(215,228,255,0.9)";
    const spots = [j.head, j.sh, j.armF[1]];
    for (let i = 0; i < 10; i++) {
      const per = 0.18 + 0.16 * hash(i, 61), ph = t / per + hash(i, 62), cyc = Math.floor(ph), a = ph - cyc;
      if (hash(i * 5 + cyc, 63) > ex * rainDensity(t)) continue;
      const sp = spots[i % 3], ox = (hash(i * 9 + cyc, 64) - 0.5) * 50, oy = i % 3 === 0 ? -36 : -8;
      for (let d = -1; d <= 1; d += 2) ctx.fillRect(sp[0] + ox + d * a * 30, sp[1] + oy - 28 * a + 60 * a * a, 3.5, 3.5);
    }
    ctx.restore();
  }

  function figures(ctx, t, H1, Pa, N, u) {
    drawFigure(ctx, N.j, N.st);
    drawFigure(ctx, Pa.j, Pa.st);
    drawFigure(ctx, H1.j, H1.st);
    drawUmbrella(ctx, u, t);
  }

  function draw(ctx, t) {
    const H1 = hero(t), Pa = partner(t), N = stranger(t), u = umbrella(t, H1, Pa);
    const [sx, sy] = SS.shake(t, 7.22, 12, 0.7);
    ctx.save();
    SS.camera(ctx, {
      x: keys(t, [[0, 540], [7.8, 540], [12.9, 470]], E.sine),
      y: keys(t, [[0, 890], [7.8, 890], [12.9, 1010]], E.sine),
      zoom: keys(t, [[0, 1.0], [7.0, 1.06], [12.9, 1.4]], E.sine), sx, sy,
    });
    sky(ctx, t);
    door(ctx, t);
    lamp(ctx);
    drawRain(ctx, t, false, u);
    // wet ground + reflections
    ctx.fillStyle = "#070a12"; ctx.fillRect(-400, G, W + 800, 900);
    ctx.save(); ctx.translate(0, 2 * G); ctx.scale(1, -1); ctx.globalAlpha = 0.24;
    door(ctx, t); figures(ctx, t, H1, Pa, N, u); ctx.restore();
    const gg = ctx.createLinearGradient(0, G, 0, G + 520);
    gg.addColorStop(0, "rgba(7,10,18,0.25)"); gg.addColorStop(1, "rgba(7,10,18,0.95)");
    ctx.fillStyle = gg; ctx.fillRect(-400, G, W + 800, 900);
    SS.glowDot(ctx, LAMP.x, G + 30, 330, "#ffcf8a", 0.16);
    figures(ctx, t, H1, Pa, N, u);
    // heart between them at the start
    const hk = seg(t, 0.85, 1.35), hout = 1 - seg(t, 1.7, 2.2);
    heart(ctx, 540, lerp(930, 860, E.out(seg(t, 0.85, 2.2))), 1.3 * E.outBack(hk), hk * hout);
    heroSplash(ctx, t, H1.j);
    splashes(ctx, t);
    SS.cone(ctx, LAMP.x, 565, G, 90, 620, "#ffd59a", 0.2);
    drawRain(ctx, t, true, u);
    ctx.restore();

    SS.vignette(ctx, 0.8);
    // HUD
    const counting = keys(t, [[0.3, 1], [6.3, 1095]], E.out);
    const broke = seg(t, 6.42, 6.5);
    SS.counter(ctx, t, {
      label: "DAYS TOGETHER", value: Math.round(counting).toLocaleString("en-US"), x: W / 2, y: 252,
      color: mixColor("#ffffff", RED, broke), glow: broke > 0 ? "rgba(255,45,85,0.8)" : null,
      changedAt: 6.45, alpha: t > 6.45 && t < 7.0 ? (hash(Math.floor(t * 30), 3) > 0.3 ? 1 : 0.35) : 1,
    });
    const dim = 1 - 0.45 * seg(t, 6.6, 7.0);
    ctx.save(); ctx.globalAlpha = dim;
    SS.caption(ctx, t, { text: "YOU HELD THE UMBRELLA FOR THEM.", start: 0.25, y: 470, size: 66, accent: { UMBRELLA: RED } });
    ctx.restore();
    SS.caption(ctx, t, { text: "THEY WALKED AWAY WITH IT.", start: 6.7, y: 640, size: 66, accent: { WALKED: RED, AWAY: RED } });
    SS.flash(ctx, lightningA(t) * 0.35, "#dfe7ff");
    SS.grain(ctx, t, 0.08);
  }

  SS.mount({ id: "main", duration: DUR, draw });
})();
