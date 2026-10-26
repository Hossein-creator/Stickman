// Silent Stickman engine: everything is drawn on one canvas as a pure function of time t (seconds).
(function () {
  const W = 1080, H = 1920, TAU = Math.PI * 2;

  // ---------- math ----------
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const hash = (i, s = 0) => { const x = Math.sin(i * 127.1 + s * 311.7 + 0.123) * 43758.5453; return x - Math.floor(x); };
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const E = {
    linear: (k) => k,
    in: (k) => k * k * k,
    out: (k) => 1 - Math.pow(1 - k, 3),
    inOut: (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
    sine: (k) => -(Math.cos(Math.PI * k) - 1) / 2,
    outBack: (k) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    outExpo: (k) => (k >= 1 ? 1 : 1 - Math.pow(2, -10 * k)),
  };
  // eased value between two keys
  const ease = (t, a, b, from, to, fn = E.inOut) => lerp(from, to, fn(seg(t, a, b)));

  // piecewise keyframes: keys = [[time, value], ...]
  function keys(t, list, fn = E.inOut) {
    if (t <= list[0][0]) return list[0][1];
    for (let i = 0; i < list.length - 1; i++) {
      const [t0, v0] = list[i], [t1, v1] = list[i + 1];
      if (t <= t1) return lerp(v0, v1, fn(seg(t, t0, t1)));
    }
    return list[list.length - 1][1];
  }

  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function mixColor(a, b, k) {
    const A = hexToRgb(a), B = hexToRgb(b);
    return `rgb(${Math.round(lerp(A[0], B[0], k))},${Math.round(lerp(A[1], B[1], k))},${Math.round(lerp(A[2], B[2], k))})`;
  }
  const rgba = (h, a) => { const c = hexToRgb(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };

  // ---------- stickman rig ----------
  // Angles are measured from straight down; positive turns toward the facing direction.
  // F = near limbs (drawn last), B = far limbs (drawn first, dimmer).
  const KEYS = ["lean", "head", "aF", "eF", "aB", "eB", "lF", "kF", "lB", "kB"];
  const pose = (o) => Object.assign({ lean: 0, head: 0, aF: 0.12, eF: 0.12, aB: -0.1, eB: 0.12, lF: 0.05, kF: 0.03, lB: -0.05, kB: 0.03 }, o || {});
  function mixPose(a, b, k) { const r = {}; for (const key of KEYS) r[key] = lerp(a[key], b[key], k); return r; }
  function addPose(a, d) { const r = Object.assign({}, a); for (const key in d) r[key] = (r[key] || 0) + d[key]; return r; }

  const P = {
    stand: pose(),
    walk(ph, amt = 1) {
      const th = ph * TAU, s = Math.sin(th), c = Math.cos(th);
      return pose({
        lean: 0.06 * amt, head: -0.02,
        lF: 0.42 * s * amt, kF: (0.08 + 0.75 * Math.max(0, c)) * amt,
        lB: -0.42 * s * amt, kB: (0.08 + 0.75 * Math.max(0, -c)) * amt,
        aF: -0.38 * s * amt, eF: 0.3 + 0.15 * amt,
        aB: 0.38 * s * amt, eB: 0.3 + 0.15 * amt,
      });
    },
    run(ph, amt = 1) {
      const th = ph * TAU, s = Math.sin(th), c = Math.cos(th);
      return pose({
        lean: 0.3 * amt, head: -0.22 * amt,
        lF: 0.8 * s * amt, kF: (0.25 + 1.5 * Math.max(0, c)) * amt,
        lB: -0.8 * s * amt, kB: (0.25 + 1.5 * Math.max(0, -c)) * amt,
        aF: -0.9 * s * amt, eF: 1.5 * amt,
        aB: 0.9 * s * amt, eB: 1.5 * amt,
      });
    },
    crouch: pose({ lean: 0.55, head: -0.35, lF: 1.25, kF: 2.1, lB: 0.95, kB: 1.9, aF: -0.5, eF: 0.4, aB: -0.7, eB: 0.4 }),
    tuck: pose({ lean: 0.2, head: -0.15, lF: 1.6, kF: 2.2, lB: 1.1, kB: 1.6, aF: 2.4, eF: 0.3, aB: 1.9, eB: 0.5 }),
    reach: pose({ lean: 0.25, head: -0.2, lF: 0.7, kF: 0.3, lB: -0.5, kB: 0.4, aF: 2.6, eF: 0.1, aB: 2.3, eB: 0.2 }),
    flail(ph) {
      const s = Math.sin(ph * TAU), c = Math.cos(ph * TAU * 1.3);
      return pose({ lean: -0.3, head: 0.3, lF: 0.4 + 0.3 * s, kF: 0.8, lB: -0.3 - 0.3 * s, kB: 0.6, aF: 2.6 + 0.5 * c, eF: 0.4, aB: 2.2 - 0.5 * c, eB: 0.5 });
    },
    slump: pose({ lean: 0.12, head: 0.5, aF: 0.06, eF: 0.05, aB: -0.02, eB: 0.05, lF: 0.02, kF: 0.05, lB: -0.03, kB: 0.05 }),
    victory: pose({ lean: -0.05, head: -0.25, aF: 3.0, eF: -0.15, aB: 0.3, eB: 0.5, lF: 0.12, kF: 0.05, lB: -0.14, kB: 0.05 }),
    clap(ph) {
      const k = 0.5 + 0.5 * Math.cos(ph * TAU);
      return pose({ lean: 0.04, head: -0.05, aF: 1.25, eF: lerp(0.6, 1.5, k), aB: 1.05, eB: lerp(0.5, 1.6, k) });
    },
  };

  function limb(base, a1, a2, l1, l2, s, dir) {
    const j = [base[0] + Math.sin(a1) * dir * l1 * s, base[1] + Math.cos(a1) * l1 * s];
    const e = [j[0] + Math.sin(a2) * dir * l2 * s, j[1] + Math.cos(a2) * l2 * s];
    return [base, j, e];
  }
  function joints(p, x, y, s = 1, dir = 1) {
    const ux = Math.sin(p.lean) * dir, uy = -Math.cos(p.lean);
    const hip = [x, y];
    const sh = [x + ux * 104 * s, y + uy * 104 * s];
    const neck = [x + ux * 118 * s, y + uy * 118 * s];
    const ha = p.lean + p.head;
    const head = [neck[0] + Math.sin(ha) * dir * 34 * s, neck[1] - Math.cos(ha) * 34 * s];
    return {
      hip, sh, neck, head, s, dir,
      armF: limb(sh, p.lean + p.aF, p.lean + p.aF + p.eF, 68, 64, s, dir),
      armB: limb(sh, p.lean + p.aB, p.lean + p.aB + p.eB, 68, 64, s, dir),
      legF: limb(hip, p.lF, p.lF - p.kF, 84, 84, s, dir),
      legB: limb(hip, p.lB, p.lB - p.kB, 84, 84, s, dir),
    };
  }
  // place the figure so its lowest foot touches groundY
  function grounded(p, x, groundY, s = 1, dir = 1) {
    const j = joints(p, 0, 0, s, dir);
    const drop = Math.max(j.legF[2][1], j.legB[2][1]);
    return joints(p, x, groundY - drop - 7.5 * s, s, dir);
  }

  function drawFigure(ctx, j, st) {
    const s = j.s, w = (st.width || 15) * s;
    ctx.save();
    ctx.globalAlpha *= st.alpha == null ? 1 : st.alpha;
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = w;
    const line = (pts, col) => {
      ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    };
    const pass = (glow) => {
      ctx.shadowColor = glow ? st.glowColor || "rgba(170,200,255,0.95)" : "transparent";
      ctx.shadowBlur = glow ? st.glow * s : 0;
      line(j.armB, st.back || st.color); line(j.legB, st.back || st.color);
      line([j.hip, j.neck], st.color);
      line(j.legF, st.color); line(j.armF, st.color);
      ctx.fillStyle = st.color; ctx.beginPath(); ctx.arc(j.head[0], j.head[1], 30 * s, 0, TAU); ctx.fill();
    };
    if (st.glow > 0) pass(true);
    pass(false);
    ctx.restore();
  }
  const handF = (j) => j.armF[2];
  const handB = (j) => j.armB[2];

  // ---------- screen effects ----------
  let grainCanvas = null;
  function grain(ctx, t, amount = 0.07) {
    if (!grainCanvas) {
      grainCanvas = document.createElement("canvas"); grainCanvas.width = grainCanvas.height = 256;
      const g = grainCanvas.getContext("2d"), img = g.createImageData(256, 256), r = rng(7);
      for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      g.putImageData(img, 0, 0);
    }
    const f = Math.floor(t * 30), ox = Math.floor(hash(f, 1) * 256), oy = Math.floor(hash(f, 2) * 256);
    ctx.save(); ctx.globalAlpha = amount; ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = ctx.createPattern(grainCanvas, "repeat");
    ctx.translate(-ox, -oy); ctx.fillRect(0, 0, W + 256, H + 256);
    ctx.restore();
  }
  function vignette(ctx, strength = 0.75) {
    const g = ctx.createRadialGradient(W / 2, H * 0.52, H * 0.22, W / 2, H * 0.52, H * 0.72);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, `rgba(0,0,0,${strength})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function flash(ctx, a, color = "#ffffff") {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = clamp(a); ctx.fillStyle = color; ctx.fillRect(0, 0, W, H); ctx.restore();
  }
  function shake(t, t0, amp, dur = 0.5) {
    const k = seg(t, t0, t0 + dur);
    if (k <= 0 || k >= 1) return [0, 0];
    const a = amp * Math.pow(1 - k, 2), d = t - t0;
    return [Math.sin(d * 83 + 1.3) * a, Math.cos(d * 67 + 0.4) * a];
  }
  function camera(ctx, c) {
    ctx.translate(W / 2 + (c.sx || 0), H / 2 + (c.sy || 0));
    ctx.rotate(c.rot || 0);
    ctx.scale(c.zoom || 1, c.zoom || 1);
    ctx.translate(-c.x, -c.y);
  }
  // soft light cone from a point downward
  function cone(ctx, x, y0, y1, w0, w1, color, a) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, rgba(color, a)); g.addColorStop(1, rgba(color, 0));
    ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x - w0 / 2, y0); ctx.lineTo(x + w0 / 2, y0); ctx.lineTo(x + w1 / 2, y1); ctx.lineTo(x - w1 / 2, y1); ctx.closePath();
    ctx.filter = "blur(18px)"; ctx.fill(); ctx.restore();
  }
  function glowDot(ctx, x, y, r, color, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(color, a)); g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }
  // dust motes drifting inside a region
  function motes(ctx, t, n, x0, x1, y0, y1, color, a, seed = 3) {
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < n; i++) {
      const px = lerp(x0, x1, hash(i, seed)) + Math.sin(t * (0.3 + hash(i, seed + 1)) + i) * 18;
      const py = lerp(y0, y1, (hash(i, seed + 2) + t * 0.02 * (0.5 + hash(i, seed + 3))) % 1);
      const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
      glowDot(ctx, px, py, 3 + 4 * hash(i, seed + 4), color, a * tw);
    }
    ctx.restore();
  }
  function ring(ctx, x, y, r, width, color, a, squash = 0.28) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.shadowColor = color; ctx.shadowBlur = 30;
    ctx.beginPath(); ctx.ellipse(x, y, r, r * squash, 0, 0, TAU); ctx.stroke(); ctx.restore();
  }

  // ---------- text ----------
  const FONT = '"Inter Tight"', MONO = '"JetBrains Mono"';
  // word-by-word reveal: rise + unblur. accent: {WORD: color}
  function caption(ctx, t, o) {
    const size = o.size || 60, maxW = o.maxW || 860, lh = size * 1.18;
    ctx.save();
    ctx.font = `800 ${size}px ${FONT}`; ctx.letterSpacing = `${(o.track || 0.02) * size}px`;
    ctx.textBaseline = "alphabetic";
    const words = o.text.split(" "), space = ctx.measureText(" ").width;
    const lines = [[]]; let lw = 0;
    for (const w of words) {
      const ww = ctx.measureText(w).width;
      if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; }
      lines[lines.length - 1].push({ w, ww }); lw += ww + space;
    }
    let idx = 0;
    lines.forEach((line, li) => {
      const total = line.reduce((s, x) => s + x.ww, 0) + space * (line.length - 1);
      let x = (o.x || W / 2) - total / 2;
      const y = o.y + li * lh;
      for (const word of line) {
        const st = o.start + idx * (o.stagger || 0.075);
        const k = E.out(seg(t, st, st + (o.dur || 0.5)));
        if (k > 0) {
          const out = o.end != null ? 1 - E.in(seg(t, o.end, o.end + 0.35)) : 1;
          const key = word.w.replace(/[^A-Z0-9']/gi, "").toUpperCase();
          const col = (o.accent && o.accent[key]) || o.color || "#ffffff";
          ctx.globalAlpha = k * out;
          ctx.filter = k < 1 ? `blur(${(1 - k) * 10}px)` : "none";
          ctx.shadowColor = col !== (o.color || "#ffffff") ? col : "rgba(0,0,0,0.85)";
          ctx.shadowBlur = col !== (o.color || "#ffffff") ? 26 : 24;
          ctx.fillStyle = col;
          ctx.fillText(word.w, x, y + (1 - k) * 26);
        }
        x += word.ww + space; idx++;
      }
    });
    ctx.restore();
    return o.y + (lines.length - 1) * lh; // baseline of the last line
  }
  // HUD counter: small tracked label + big mono value that pops when it changes
  function counter(ctx, t, o) {
    ctx.save();
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    ctx.font = `700 24px ${MONO}`; ctx.letterSpacing = "7px";
    ctx.fillStyle = o.labelColor || "rgba(200,210,230,0.62)";
    ctx.fillText(o.label, o.x, o.y);
    const pop = o.changedAt != null ? 1 + 0.16 * Math.exp(-(t - o.changedAt) * 14) * (t >= o.changedAt ? 1 : 0) : 1;
    ctx.translate(o.x, o.y + 78); ctx.scale(pop, pop);
    ctx.font = `700 ${o.size || 76}px ${MONO}`; ctx.letterSpacing = "2px";
    ctx.shadowColor = o.glow || "rgba(0,0,0,0.8)"; ctx.shadowBlur = o.glow ? 30 : 18;
    ctx.fillStyle = o.color || "#ffffff";
    ctx.fillText(o.value, 0, 0);
    ctx.restore();
  }
  // stamp tag like FAIL / MADE IT under the counter
  function tag(ctx, t, o) {
    const k = E.outBack(seg(t, o.start, o.start + 0.25));
    const out = o.end != null ? 1 - seg(t, o.end, o.end + 0.15) : 1;
    if (k <= 0 || out <= 0) return;
    ctx.save();
    ctx.translate(o.x, o.y); ctx.scale(lerp(1.6, 1, k), lerp(1.6, 1, k)); ctx.rotate(o.rot || 0);
    ctx.globalAlpha = clamp(k) * out;
    ctx.font = `700 28px ${MONO}`; ctx.letterSpacing = "6px"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const w = ctx.measureText(o.text).width + 40;
    ctx.strokeStyle = o.color; ctx.lineWidth = 3; ctx.shadowColor = o.color; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.roundRect(-w / 2, -26, w, 52, 10); ctx.stroke();
    ctx.fillStyle = o.color; ctx.fillText(o.text, 3, 2);
    ctx.restore();
  }

  // ---------- mount ----------
  function mount(o) {
    const c = document.getElementById("c"), ctx = c.getContext("2d");
    const state = { t: 0 };
    const render = (t) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = "none"; ctx.clearRect(0, 0, W, H); o.draw(ctx, t); };
    Promise.all([
      document.fonts.load(`800 60px ${FONT}`), document.fonts.load(`500 40px ${FONT}`), document.fonts.load(`700 40px ${MONO}`),
    ]).then(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(state, { t: o.duration, duration: o.duration, ease: "none", modifiers: { t: (v) => { render(+v); return v; } } }, 0);
      render(0);
      window.__timelines[o.id || "main"] = tl;
      if (window.__hfForceTimelineRebind) window.__hfForceTimelineRebind();
    });
    window.__ssRender = render; // handy for manual checks in a browser
  }

  window.SS = {
    W, H, TAU, clamp, lerp, seg, hash, rng, E, ease, keys, mixColor, rgba,
    pose, mixPose, addPose, P, joints, grounded, drawFigure, handF, handB,
    grain, vignette, flash, shake, camera, cone, glowDot, motes, ring,
    caption, counter, tag, mount, FONT, MONO,
  };
})();
