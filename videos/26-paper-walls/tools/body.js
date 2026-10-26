        // ---------- TEST: modern action cut. He sprints and smashes 4 walls, freezes at a giant one, then breaks it in slow motion ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const pillarG = svgEl("g", {}, backG);
        const tickG = svgEl("g", {}, W);
        const wallG = svgEl("g", {}, W);
        const trailG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const shardG = svgEl("g", {}, W);
        const labelG = svgEl("g", {}, cam);           // labels + rings sit on top and are not mirrored
        const FXS = E("fx");
        const frac = (v) => v - Math.floor(v);
        const mod = (a, n) => ((a % n) + n) % n;

        // ---------- time warp: slow motion around the last impact ----------
        const SLOW0 = 9.78, SLOW1 = 10.75;
        const speedAt = (t) => 1 - 0.76 * win(t, SLOW0, SLOW0 + 0.1) * (1 - win(t, SLOW1 - 0.3, SLOW1));
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- runner path (story time) ----------
        const V = 800, STRIDE = 230;
        const D_STOP = 0.7625, X_STOP = 3720 + V * D_STOP - 0.5 * (V / D_STOP) * D_STOP * D_STOP; // 4025
        const X_BACK = X_STOP - STRIDE / 2, A2 = (2 * (4130 - X_BACK)) / (0.95 * 0.95);
        function xOf(s) {
          if (s < 0.95) return 0;
          if (s < 1.35) return (V * (s - 0.95) ** 2) / 0.8;
          if (s < 5.8) return 160 + V * (s - 1.35);
          if (s < 5.8 + D_STOP) { const u = s - 5.8; return 3720 + V * u - 0.5 * (V / D_STOP) * u * u; }
          if (s < 8.0) return X_STOP;
          if (s < 8.6) return lerp(X_STOP, X_BACK, ease((s - 8.0) / 0.6));
          if (s < 9.55) return X_BACK + 0.5 * A2 * (s - 8.6) ** 2;
          if (s < 10.35) return 4130 + 330 * (s - 9.55);
          if (s < 10.7) return 4394 + 66 * ease((s - 10.35) / 0.35);
          return 4460;
        }
        const WALLS = [
          { x: 900, w: 50, h: 230, label: "EXCUSES" },
          { x: 1900, w: 56, h: 280, label: "FEAR" },
          { x: 2800, w: 62, h: 330, label: "DOUBT" },
          { x: 3600, w: 68, h: 380, label: "THEIR OPINION" },
          { x: 4300, w: 100, h: 700, label: "COMFORT ZONE", paper: true },
        ];
        WALLS.forEach((w, i) => (w.ts = i < 4 ? 1.35 + (w.x - 40 - 160) / V : 9.9));
        WALLS.forEach((w) => (w.tr = realOf(w.ts)));

        // ---------- background: parallax pillars, floor ticks, light beyond the last wall ----------
        const pillars = [];
        for (let i = 0; i < 10; i++) {
          const g = svgEl("g", {}, pillarG);
          svgEl("rect", { x: -14, y: -900, width: 28, height: 1500, fill: "#141414" }, g);
          svgEl("rect", { x: -40, y: -900, width: 80, height: 1500, fill: "#ffffff", opacity: 0.025, filter: "url(#soft)" }, g);
          pillars.push(g);
        }
        const ticks = [];
        for (let i = 0; i < 26; i++) ticks.push(svgEl("rect", { y: FL + 3, width: 3, height: 12, fill: "#3a3a3a" }, tickG));
        const beyond = svgEl("ellipse", { cx: 4560, cy: FL - 220, rx: 420, ry: 420, fill: "url(#lightBeyond)", opacity: 0 }, backG);
        const beyondBeam = svgEl("polygon", { points: "4420,-900 4640,-900 4760,600 4300,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const runBeam = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0.3 }, beams);

        // ---------- walls, labels, shards ----------
        WALLS.forEach((w, k) => {
          w.g = svgEl("g", {}, wallG);
          const x0 = w.x - w.w / 2, y0 = FL - w.h;
          svgEl("rect", { x: x0, y: y0, width: w.w, height: w.h, fill: w.paper ? "#bdbdbd" : "url(#brick)", stroke: "#000", "stroke-width": 6 }, w.g);
          for (let y = y0 + 34; y < FL; y += 34) svgEl("line", { x1: x0 + 3, x2: x0 + w.w - 3, y1: y, y2: y, stroke: "#000", "stroke-width": 3, opacity: 0.45 }, w.g);
          if (w.paper) svgEl("rect", { x: x0 - 3, y: y0 - 3, width: w.w + 6, height: w.h + 3, fill: "none", stroke: "#d62a2a", "stroke-width": 5 }, w.g);
          w.lab = svgEl("text", { x: w.x, y: FL - w.h * 0.55, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": w.paper ? 30 : 24, "letter-spacing": 3, fill: w.paper ? "#ff4a3d" : "#ffffff", stroke: "#000", "stroke-width": 7, "paint-order": "stroke" }, labelG);
          w.lab.textContent = w.label;
          // shards: a jittered 2 x 7 grid of the wall
          w.shards = [];
          const cols = 2, rows = w.paper ? 9 : 7, cw = w.w / cols, rh = w.h / rows;
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            const cx = x0 + cw * (c + 0.5), cy = y0 + rh * (r + 0.5);
            const pts = [[-cw / 2, -rh / 2], [cw / 2, -rh / 2], [cw / 2, rh / 2], [-cw / 2, rh / 2]].map(([a, b]) => [a + (rnd() - 0.5) * 10, b + (rnd() - 0.5) * 10]);
            const el = svgEl("polygon", { points: pts.map((p) => p.map(r1).join(",")).join(" "), fill: w.paper ? "#f4f4f0" : "#5a5a5a", stroke: w.paper ? "#9a9a9a" : "#000", "stroke-width": w.paper ? 2 : 4, opacity: 0 }, shardG);
            const hit = 1 - Math.abs(cy - (FL - 150)) / w.h;
            w.shards.push({ el, cx, cy, vx: (w.paper ? 120 : 380) + rnd() * (w.paper ? 260 : 520) * (0.5 + hit), vy: -(w.paper ? 260 : 300) - rnd() * (w.paper ? 260 : 420) * (0.4 + hit), spin: (rnd() - 0.5) * (w.paper ? 260 : 900), ph: rnd() * 6 });
          }
          w.ring = svgEl("circle", { cx: w.x - w.w / 2, cy: FL - 160, r: 0, fill: "none", stroke: "#fff", "stroke-width": 12, opacity: 0 }, labelG);
        });

        // ---------- the runner + motion trails ----------
        const runner = makeFig(figG, "#ffffff", "#e2e2e2", true, "runner");
        const trails = [0, 1, 2].map((i) => svgEl("use", { href: "#runner", opacity: 0 }, trailG));
        const legRun = Math.sqrt(LEG * LEG - (STRIDE * 0.25) ** 2);
        function strideFeet(hx, lift) {
          const p = hx / STRIDE;
          return [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + STRIDE * (0.25 - q), FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)), FL - Math.sin(Math.PI * s) * lift - Math.max(0, Math.sin(Math.PI * s * 2)) * lift * 0.5];
          });
        }
        function runnerRaw(s) {
          const hx = xOf(s), v = (xOf(s + 0.01) - xOf(s - 0.01)) / 0.02, vn = clamp(Math.abs(v) / V, 0, 1);
          const p = hx / STRIDE, sw = Math.sin(Math.PI * 2 * p);
          // sprint start: crouched, rocking
          if (s < 0.95) {
            const k = win(s, 0.6, 0.95);
            return base({ hx: -10 + 20 * k, hy: FL - 70 + 30 * k, torso: 55 - 15 * k, head: -30, ax: 50, ay: FL, bx: -70, by: FL, ash: 20, ael: 20, aw: 1 - k, atx: 40, aty: FL - 2, bsh: -40, bel: 20 });
          }
          if (s >= 9.55 && s < 10.35) {
            // the leap: shoulder first through the wall
            const k = (s - 9.55) / 0.8, y = FL - 140 - 4 * 110 * k * (1 - k);
            return base({ hx, hy: y, torso: 42, head: -26, ax: hx - 50, ay: y + 120, bx: hx - 110, by: y + 70, ash: 60, ael: 70, aw: 1, atx: hx + 40, aty: y - 70, bsh: -70, bel: 30 });
          }
          if (s >= 10.35 && s < 10.75) {
            // landing: three-point crouch
            return base({ hx, hy: FL - 70, torso: 52, head: -34, ax: hx + 40, ay: FL, bx: hx - 80, by: FL, ash: 30, ael: 10, aw: 1, atx: hx + 70, aty: FL - 2, bsh: -50, bel: 40 });
          }
          if (s >= 10.75) {
            const k = win(s, 10.75, 11.3);
            const crouch = base({ hx, hy: FL - 70, torso: 52, head: -34, ax: hx + 40, ay: FL, bx: hx - 80, by: FL, ash: 30, ael: 10, bsh: -50, bel: 40 });
            const st = standOn(hx, 1, FL);
            st.head = -8; st.ash = 14; st.bsh = -10;
            return mixPose(crouch, st, k);
          }
          const feet = strideFeet(hx, 34 + 20 * vn);
          const still = 1 - vn;
          const look = win(s, 6.6, 7.0) * (1 - win(s, 7.8, 8.1));
          return base({
            hx, hy: lerp(FL - legRun, FL - legRun + 4, still) + 6 * Math.abs(sw) * vn, torso: 4 + 16 * vn - 6 * look, head: -10 * vn - 34 * look,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            ash: 8 - 55 * sw * vn, ael: 12 + 78 * vn, bsh: -4 + 55 * sw * vn, bel: 12 + 78 * vn,
          });
        }

        // ---------- camera keys (story time): scale, world y at screen 1180, roll, follow weight, fixed x ----------
        const CK = [
          [0, 1.85, 520, 0, 1, 0], [0.9, 1.85, 520, 0, 1, 0], [1.45, 1.35, 470, -1.5, 1, 0], [5.8, 1.35, 470, -1.5, 1, 0],
          [6.9, 0.8, 250, 0, 0, 4170], [8.0, 0.8, 250, 0, 0, 4170], [9.0, 1.15, 420, -1, 0, 4130], [9.78, 1.25, 440, -2, 0, 4190],
          [9.95, 1.7, 430, 4, 0, 4250], [10.4, 1.55, 450, 3, 0, 4330], [11.4, 1.15, 470, 0, 0, 4440], [99, 1.15, 470, 0, 0, 4440],
        ];
        function camAt(s, hx) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          const v = a.map((x, j) => lerp(x, b[j], k));
          return { s: v[1], cy: v[2], rot: v[3], cx: v[4] * (hx + 140) + (1 - v[4]) * v[5] };
        }

        // ---------- screen-space speed lines ----------
        const streaks = [];
        for (let i = 0; i < 18; i++) streaks.push({ el: svgEl("rect", { height: 3 + (i % 3), fill: "url(#streak)", opacity: 0 }, FXS), y: 260 + ((i * 397) % 1300), len: 140 + ((i * 131) % 220), sp: 2600 + ((i * 577) % 1600), o: (i * 911) % 1500 });

        // ---------- kinetic type ----------
        const slam = (words, times, t, redLast) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${redLast && i === words.length - 1 ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const svgRoot = E("svg");

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t), hx = xOf(s);
          const v = (xOf(s + 0.01) - xOf(s - 0.01)) / 0.02, vn = clamp(Math.abs(v) / V, 0, 1) * speedAt(t);

          // impact kicks (real time)
          let kick = 0, chroma = 0, flash = 0;
          WALLS.forEach((w, k) => {
            const dt = t - w.tr, big = w.paper ? 1 : 0;
            if (dt >= 0) {
              kick += Math.exp(-dt / (big ? 0.5 : 0.18)) * (big ? 1.4 : 1);
              chroma += Math.exp(-dt / (big ? 0.45 : 0.15));
              flash += (big ? 0.8 : 0.42) * Math.exp(-dt / (big ? 0.2 : 0.05));
            }
          });
          [0.15, 0.4, 0.65].forEach((h) => { if (t >= h) { chroma += 0.6 * Math.exp(-(t - h) / 0.08); kick += 0.3 * Math.exp(-(t - h) / 0.1); } });
          if (t > realOf(0.95)) kick += 0.5 * Math.exp(-(t - realOf(0.95)) / 0.15);

          const c = camAt(s, hx);
          const sc = c.s * (1 + 0.07 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 14 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 12 * Math.min(kick, 1.5);
          const rot = c.rot + Math.sin(t * 31) * 1.2 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${rot.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-c.cx)} ${r1(-c.cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); labelG.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else { W.removeAttribute("filter"); labelG.removeAttribute("filter"); }
          E("flash").style.opacity = Math.min(0.9, flash).toFixed(3);

          // parallax pillars + floor ticks wrap around the camera
          pillars.forEach((g, i) => g.setAttribute("transform", `translate(${r1(c.cx + mod(i * 260 - c.cx * 0.45, 2600) - 1300)} 0)`));
          ticks.forEach((tk, i) => tk.setAttribute("x", r1(c.cx + mod(i * 100 - c.cx, 2600) - 1300)));

          // walls / shards / rings / labels
          WALLS.forEach((w) => {
            const ds = s - w.ts, broken = ds >= 0;
            w.g.setAttribute("opacity", broken ? 0 : 1);
            const near = clamp(1 - Math.abs(w.x - c.cx) / 900, 0, 1);
            w.lab.setAttribute("opacity", broken ? 0 : near.toFixed(3));
            w.shards.forEach((sh, i) => {
              if (!broken) { sh.el.setAttribute("opacity", 0); return; }
              const g = w.paper ? 140 : 1800;
              const fl = w.paper ? Math.sin(ds * 3 + sh.ph) * 40 : 0;
              const x = sh.cx + sh.vx * ds + fl, y = Math.min(FL - 4, sh.cy + sh.vy * ds + 0.5 * g * ds * ds);
              sh.el.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(sh.spin * ds)})`);
              sh.el.setAttribute("opacity", clamp(1 - (ds - (w.paper ? 2.6 : 0.7)) / 0.6, 0, 1).toFixed(3));
            });
            const dr = t - w.tr;
            w.ring.setAttribute("r", r1(dr > 0 ? 30 + 340 * (1 - Math.exp(-dr / 0.18)) * (w.paper ? 1.5 : 1) : 0));
            w.ring.setAttribute("stroke-width", r1(dr > 0 ? 14 * Math.exp(-dr / 0.2) : 0));
            w.ring.setAttribute("opacity", dr > 0 ? Math.exp(-dr / 0.25).toFixed(3) : 0);
          });
          const brk = win(s, 9.9, 10.6);
          beyond.setAttribute("opacity", (0.95 * brk).toFixed(3));
          beyondBeam.setAttribute("opacity", (0.5 * brk).toFixed(3));
          runBeam.setAttribute("points", `${r1(hx - 50)},-900 ${r1(hx + 50)},-900 ${r1(hx + 160)},${FL} ${r1(hx - 160)},${FL}`);

          // runner + trails
          drawFig(runner, livePose(runnerRaw, s, 0.3), 1);
          trails.forEach((tr, i) => {
            const dx = v * 0.028 * (i + 1);
            tr.setAttribute("transform", `translate(${r1(-dx)} 0)`);
            tr.setAttribute("opacity", (vn > 0.3 ? (0.28 - i * 0.08) * vn : 0).toFixed(3));
          });

          // speed lines
          const sl = vn * (1 - win(s, 5.7, 6.4)) + 0.9 * win(s, 9.2, 9.6) * (1 - win(s, 10.1, 10.6));
          streaks.forEach((st) => {
            const x = 1300 - mod(st.o + t * st.sp, 1700);
            st.el.setAttribute("x", r1(x)); st.el.setAttribute("y", st.y); st.el.setAttribute("width", st.len);
            st.el.setAttribute("opacity", (0.5 * sl).toFixed(3));
          });

          // HUD: walls broken
          const n = WALLS.filter((w) => t >= w.tr).length;
          const lastT = n ? WALLS[n - 1].tr : -9;
          E("wn").textContent = n + "/5";
          E("wn").style.transform = `scale(${(1 + 0.6 * Math.exp(-(t - lastT) / 0.12)).toFixed(3)})`;
          E("wn").style.color = n === 5 ? "#ff3b30" : "#fff";
          E("hud").style.opacity = (win(t, 1.3, 1.6)).toFixed(3);

          // hook + punchline type
          if (t < 2.0) {
            E("h1").innerHTML = slam(["WHAT'S", "STOPPING", "YOU?"], [0.15, 0.4, 0.65], t, false);
            E("h1").style.opacity = (1 - win(t, 1.4, 1.8)).toFixed(3);
            E("h2").innerHTML = "";
          } else {
            E("h1").innerHTML = slam(["THE", "WALLS", "WERE", "PAPER."], [11.2, 11.38, 11.56, 11.8], t, false);
            E("h1").style.opacity = (1 - 0.5 * win(t, 12.2, 12.5)).toFixed(3);
            E("h2").innerHTML = slam(["YOU", "JUST", "HAD", "TO", "RUN."], [12.3, 12.42, 12.54, 12.66, 12.85], t, true);
          }
          fade.style.opacity = win(t, 13.45, 13.95).toFixed(3);
        }

        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const clock = { t: 0 };
        tl.to(clock, { t: DUR, duration: DUR, ease: "none", onUpdate: () => render(clock.t) }, 0);
        window.__timelines["main"] = tl;
        render(0);
        tl.seek(0);
      })();
    </script>
  </body>
</html>
