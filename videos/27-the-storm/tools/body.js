        // ---------- TEST (couple, action style): a storm of problems tries to tear their hands apart ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const cloudG = svgEl("g", {}, backG);
        const boltG = svgEl("g", {}, backG);
        const tickG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const debG = svgEl("g", {}, W);
        const shardG = svgEl("g", {}, W);
        const labelG = svgEl("g", {}, cam);
        const FXS = E("fx");
        const frac = (v) => v - Math.floor(v);
        const mod = (a, n) => ((a % n) + n) % n;

        // ---------- time warp: slow motion on the slip and the catch ----------
        const SLOW0 = 6.4, SLOW1 = 7.8, SLOWK = 0.35;
        const speedAt = (t) => 1 - (1 - SLOWK) * win(t, SLOW0, SLOW0 + 0.1) * (1 - win(t, SLOW1 - 0.3, SLOW1));
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- storm strength ----------
        const storm = (s) => clamp(0.12 + 0.88 * win(s, 0.6, 5.0), 0, 1) * (1 - win(s, 8.8, 10.4));
        const T_SPLIT = 6.25, T_CATCH = 6.75;

        // ---------- sky: rolling clouds, lightning, the light that breaks through ----------
        const clouds = [];
        for (let i = 0; i < 9; i++) clouds.push({ el: svgEl("ellipse", { rx: 260 + (i % 3) * 90, ry: 90 + (i % 2) * 40, fill: "url(#cloud)" }, cloudG), x: i * 170, y: -120 + (i % 4) * 70 });
        const BOLTS = [3.0, 5.0];
        const bolts = BOLTS.map((b, i) => {
          let x = 120 + i * 420, y = -500, d = `M${x} ${y}`;
          while (y < 250) { x += (rnd() - 0.5) * 90; y += 40 + rnd() * 40; d += ` L${r1(x)} ${r1(y)}`; }
          return svgEl("path", { d, fill: "none", stroke: "#e8ecff", "stroke-width": 7, "stroke-linejoin": "round", filter: "url(#blur)", opacity: 0 }, boltG);
        });
        const sunBeam = svgEl("polygon", { points: "260,-900 520,-900 680,600 140,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const warmPool = svgEl("ellipse", { cx: 450, cy: FL, rx: 380, ry: 50, fill: "url(#warm)", opacity: 0 }, backG);
        const ticks = [];
        for (let i = 0; i < 26; i++) ticks.push(svgEl("rect", { y: FL + 3, width: 3, height: 12, fill: "#3a3a3a" }, tickG));

        // ---------- the couple ----------
        const him = makeFig(figG, "#ffffff", "#e2e2e2", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = [svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG)];
        const handGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, figG);
        const stand = FL - Math.sqrt(LEG * LEG - 28 * 28);
        const brace = (x, f, I, s, ph) => {
          const st = base({ hx: x, hy: stand + 6 * I, torso: 4 + 16 * I, head: -6 - 6 * I, ax: x + f * 30, ay: FL, bx: x - f * 26, by: FL });
          st.torso += I * 2.5 * Math.sin(s * 13 + ph); st.head += I * 3 * Math.sin(s * 17 + ph);
          return st;
        };
        const HAND_Y = FL - 116;
        // positions over story time
        const herX = (s) => {
          if (s < 6.0) return 268;
          if (s < 6.55) return lerp(268, 160, ease((s - 6.0) / 0.55));
          if (s < 6.9) return 160;
          if (s < 7.4) return lerp(160, 250, ease((s - 6.9) / 0.5));
          if (s < 8.0) return 250;
          if (s < 8.4) return lerp(250, 268, ease((s - 8.0) / 0.4));
          return 268 + 220 * ease(clamp((s - 8.4) / 1.8, 0, 1));
        };
        const himX = (s) => {
          if (s < 6.45) return 378;
          if (s < 6.75) return lerp(378, 262, ease((s - 6.45) / 0.3));
          if (s < 7.4) return lerp(262, 312, ease((s - 6.85) / 0.55));
          if (s < 8.0) return 312;
          if (s < 8.4) return lerp(312, 378, ease((s - 8.0) / 0.4));
          return 378 + 220 * ease(clamp((s - 8.4) / 1.8, 0, 1));
        };
        const himF = (s) => (s > 6.3 && s < 8.1 ? -1 : 1);
        // walking feet locked to the floor while they push into the wind together
        function walkFeet(x0, hx) {
          const ST = 110, u = hx - x0, p = u / ST;
          return [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * 18];
          });
        }
        const hold = (s) => s < T_SPLIT || (s > T_CATCH && s < 7.4) || s > 8.3;
        function coupleRaw(who) {
          return (s) => {
            const I = storm(s), isHim = who === "him";
            const x = isHim ? himX(s) : herX(s);
            const f = isHim ? himF(s) : 1;
            let st = brace(x, f, I, s, isHim ? 0 : 1.7);
            if (s > 8.4) { const ft = walkFeet(isHim ? 378 : 268, x); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; st.hy = FL - Math.sqrt(LEG * LEG - 27 * 27) + 3; }
            const mid = (himX(s) + herX(s)) / 2;
            // shield arm against the debris
            const sh = I * (s < 6.0 ? 1 : 0);
            if (isHim) {
              st.aw = 0.8 * sh; st.atx = x + 34; st.aty = stand - 150;
              st.bw = 1; st.btx = mid; st.bty = HAND_Y;
              if (s > 6.3 && s < 8.1) { st.aw = 1; st.atx = s < 7.4 ? herX(s) + 30 : herX(s) - 10; st.aty = s < 7.4 ? HAND_Y : stand - 110; st.bw = s > 7.4 ? 1 : 0; st.btx = herX(s) + 4; st.bty = stand - 130; }
            } else {
              st.aw = 1; st.atx = mid; st.aty = HAND_Y;
              st.bw = 0.7 * sh; st.btx = x + 20; st.bty = stand - 140;
              if (s > 7.4 && s < 8.1) { st.aw = 1; st.atx = himX(s) + 10; st.aty = stand - 120; st.bw = 1; st.btx = himX(s) - 6; st.bty = stand - 100; }
            }
            // blown apart: arms stretch, she leans back, he lunges
            if (!isHim && s > 6.0 && s < 7.0) { st.torso = -14; st.head = 10; st.atx = himX(s) - 30; }
            if (isHim && s > 6.4 && s < 6.9) { st.torso = 36; st.hy += 16; st.head = -14; }
            // calm: they look at each other
            const calm = win(s, 10.2, 10.8);
            st.torso = lerp(st.torso, 3, win(s, 9.4, 10.4)); st.head = lerp(st.head, isHim ? 14 : -8, calm);
            return st;
          };
        }
        const himRaw = coupleRaw("him"), herRaw = coupleRaw("her");

        // ---------- debris (labeled blocks) ----------
        const DEB = [
          { label: "STRESS", t: 1.6, x: 600, y0: -60 },
          { label: "MONEY", t: 2.6, x: 120, y0: -180 },
          { label: "DISTANCE", t: 3.5, x: 520, y0: -20 },
          { label: "JEALOUSY", t: 4.4, x: 170, y0: -140 },
          { label: "THEIR EX", t: 5.3, x: 560, y0: -100 },
        ];
        const mkBlock = (d, w, h) => {
          d.g = svgEl("g", {}, debG);
          svgEl("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 5, fill: "#4a4a4a", stroke: "#000", "stroke-width": 5 }, d.g);
          d.lab = svgEl("text", { "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 27, "letter-spacing": 2, fill: "#fff", stroke: "#000", "stroke-width": 7, "paint-order": "stroke" }, labelG);
          d.lab.textContent = d.label;
          d.shards = [];
          for (let i = 0; i < 10; i++) d.shards.push({ el: svgEl("polygon", { points: `${-10 - rnd() * 8},${-6 - rnd() * 5} ${10 + rnd() * 8},${-5} ${6},${8 + rnd() * 5} ${-8},${7}`, fill: "#5a5a5a", stroke: "#000", "stroke-width": 3, opacity: 0 }, shardG), vx: (rnd() - 0.6) * 700, vy: -250 - rnd() * 450, spin: (rnd() - 0.5) * 900 });
          d.ring = svgEl("circle", { r: 0, fill: "none", stroke: "#fff", "stroke-width": 10, opacity: 0 }, labelG);
        };
        DEB.forEach((d) => { mkBlock(d, 150, 56); d.tr = realOf(d.t); });
        const DOUBT = { label: "DOUBT", t: T_SPLIT };
        mkBlock(DOUBT, 180, 64);
        DOUBT.lab.setAttribute("fill", "#ff4a3d"); DOUBT.lab.setAttribute("font-size", 32);
        const doubtPos = (s) => { const k = (s - 5.85) / 0.8; return [lerp(1000, -350, k), HAND_Y - 4 + Math.sin(k * 9) * 6, k]; };

        // ---------- screen-space wind + rain ----------
        const streaks = [];
        for (let i = 0; i < 20; i++) streaks.push({ el: svgEl("rect", { height: 3 + (i % 3), fill: "url(#streak)", opacity: 0 }, FXS), y: 240 + ((i * 397) % 1350), len: 160 + ((i * 131) % 240), sp: 2200 + ((i * 577) % 1600), o: (i * 911) % 1500 });
        streaks.forEach((st) => st.el.setAttribute("transform", "scale(-1 1) translate(-1080 0)"));
        const rain = [];
        for (let i = 0; i < 70; i++) rain.push({ el: svgEl("line", { stroke: "#9fb0c8", "stroke-width": 2, opacity: 0 }, FXS), x: (i * 157) % 1300, o: (i * 313) % 2000, sp: 2400 + (i % 5) * 300 });

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.9, 330, 470, 0], [0.8, 1.9, 330, 470, 0], [1.4, 1.35, 380, 440, -1], [5.6, 1.45, 360, 450, -2],
          [6.3, 1.7, 280, 470, 2], [6.75, 2.4, 230, 490, 5], [7.3, 2.0, 270, 480, 2], [8.2, 1.6, 320, 460, 0],
          [10.2, 1.3, 430, 450, 0], [99, 1.3, 430, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t), I = storm(s);
          let kick = 0, chroma = 0, flash = 0;
          DEB.forEach((d) => { const dt = t - d.tr; if (dt >= 0) { kick += Math.exp(-dt / 0.2); chroma += Math.exp(-dt / 0.16); flash += 0.35 * Math.exp(-dt / 0.06); } });
          BOLTS.forEach((b) => { const dt = t - b; if (dt >= 0) flash += 0.55 * Math.exp(-dt / 0.08); });
          const tc = realOf(T_CATCH);
          if (t >= tc) { kick += 0.8 * Math.exp(-(t - tc) / 0.3); chroma += Math.exp(-(t - tc) / 0.35); flash += 0.3 * Math.exp(-(t - tc) / 0.1); }
          const td = realOf(T_SPLIT);
          if (t >= td) { chroma += 0.8 * Math.exp(-(t - td) / 0.25); kick += 0.6 * Math.exp(-(t - td) / 0.2); }
          [0.15, 0.4, 0.65].forEach((h) => { if (t >= h) { chroma += 0.6 * Math.exp(-(t - h) / 0.08); kick += 0.3 * Math.exp(-(t - h) / 0.1); } });
          kick += 0.25 * I * (0.5 + 0.5 * Math.sin(t * 23)); // the wind itself shakes the camera

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); labelG.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else { W.removeAttribute("filter"); labelG.removeAttribute("filter"); }
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          // sky
          const clear = win(s, 9.0, 10.6);
          clouds.forEach((c, i) => {
            const x = mod(c.x - t * (80 + 260 * I), 1800) - 500 + (i % 2 ? 1 : -1) * 700 * clear;
            c.el.setAttribute("cx", r1(x)); c.el.setAttribute("cy", r1(c.y - 200 * clear));
            c.el.setAttribute("opacity", (0.95 * (1 - clear)).toFixed(3));
          });
          bolts.forEach((b, i) => b.setAttribute("opacity", t > BOLTS[i] && t < BOLTS[i] + 0.16 ? 1 : 0));
          sunBeam.setAttribute("opacity", (0.6 * clear).toFixed(3));
          warmPool.setAttribute("opacity", clear.toFixed(3));
          ticks.forEach((tk, i) => tk.setAttribute("x", r1(cx + mod(i * 100 - cx, 2600) - 1300)));

          // couple
          const jh = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const jr = drawFig(her, livePose(herRaw, s, 1.4), 1);
          bun[0].setAttribute("cx", r1(jr.head[0] - 25)); bun[0].setAttribute("cy", r1(jr.head[1] - 16));
          const held = hold(s);
          const hp = jh.hands[1];
          const catchG = t >= tc ? Math.exp(-(t - tc) / 0.6) : 0;
          handGlow.setAttribute("cx", r1(s > T_CATCH && s < 7.4 ? jh.hands[0][0] : hp[0]));
          handGlow.setAttribute("cy", r1(s > T_CATCH && s < 7.4 ? jh.hands[0][1] : hp[1]));
          handGlow.setAttribute("opacity", ((held ? 0.35 : 0) + 0.65 * catchG).toFixed(3));
          handGlow.setAttribute("r", r1(60 + 60 * catchG));

          // debris: arc in from the right, smash into the floor
          DEB.forEach((d) => {
            const ds = s - d.t, fly = clamp(1 + ds / 0.9, 0, 1);
            const x = lerp(d.x + 800, d.x, fly), y = lerp(d.y0, FL - 24, fly * fly);
            const vis = ds < 0 && fly > 0;
            d.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(-ds * 540)})`);
            d.g.setAttribute("opacity", vis ? 1 : 0);
            d.lab.setAttribute("x", r1(x)); d.lab.setAttribute("y", r1(y + 8));
            d.lab.setAttribute("opacity", vis ? 1 : 0);
            d.shards.forEach((sh) => {
              if (ds < 0) { sh.el.setAttribute("opacity", 0); return; }
              const px = d.x + sh.vx * ds, py = Math.min(FL - 4, FL - 24 + sh.vy * ds + 900 * ds * ds);
              sh.el.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${r1(sh.spin * ds)})`);
              sh.el.setAttribute("opacity", clamp(1 - (ds - 0.6) / 0.5, 0, 1).toFixed(3));
            });
            const dr = t - d.tr;
            d.ring.setAttribute("cx", d.x); d.ring.setAttribute("cy", FL - 30);
            d.ring.setAttribute("r", r1(dr > 0 ? 20 + 260 * (1 - Math.exp(-dr / 0.16)) : 0));
            d.ring.setAttribute("stroke-width", r1(dr > 0 ? 12 * Math.exp(-dr / 0.18) : 0));
            d.ring.setAttribute("opacity", dr > 0 ? Math.exp(-dr / 0.22).toFixed(3) : 0);
          });
          // DOUBT flies straight between their hands
          const [dx, dy, dk] = doubtPos(s);
          const dvis = dk > 0 && dk < 1;
          DOUBT.g.setAttribute("transform", `translate(${r1(dx)} ${r1(dy)}) rotate(${r1(dk * 30 - 15)})`);
          DOUBT.g.setAttribute("opacity", dvis ? 1 : 0);
          DOUBT.lab.setAttribute("x", r1(dx)); DOUBT.lab.setAttribute("y", r1(dy + 9));
          DOUBT.lab.setAttribute("opacity", dvis ? 1 : 0);

          // wind streaks + rain follow the storm
          streaks.forEach((st) => {
            const x = 1300 - mod(st.o + t * st.sp, 1700);
            st.el.setAttribute("x", r1(x)); st.el.setAttribute("y", st.y); st.el.setAttribute("width", st.len);
            st.el.setAttribute("opacity", (0.45 * I * speedAt(t)).toFixed(3));
          });
          rain.forEach((rd) => {
            const y = mod(rd.o + t * rd.sp * speedAt(t) * 0 + story(t) * rd.sp, 2100) - 100, x = rd.x - (y * 0.45 * I);
            rd.el.setAttribute("x1", r1(x)); rd.el.setAttribute("y1", r1(y));
            rd.el.setAttribute("x2", r1(x - 18 * I)); rd.el.setAttribute("y2", r1(y + 46));
            rd.el.setAttribute("opacity", (0.55 * I).toFixed(3));
          });

          // HUD: wind speed
          const kmh = Math.round(20 + 120 * I) * (clear > 0.98 ? 0 : 1);
          E("wn").textContent = kmh + " KM/H";
          E("wn").style.color = kmh > 110 ? "#ff3b30" : "#fff";
          E("wn").style.transform = `scale(${(1 + 0.25 * Math.min(1, kick * 0.5)).toFixed(3)})`;
          E("hud").style.opacity = (win(t, 1.3, 1.6) * (1 - win(t, 11.0, 11.4))).toFixed(3);

          if (t < 2.0) {
            E("h1").innerHTML = slam(["WHAT", "BREAKS", "A COUPLE?"], [0.15, 0.4, 0.65], t, []);
            E("h1").style.opacity = (1 - win(t, 1.4, 1.8)).toFixed(3);
            E("h2").innerHTML = "";
          } else {
            E("h1").innerHTML = slam(["STORMS", "DON'T", "BREAK", "COUPLES."], [11.2, 11.38, 11.56, 11.76], t, []);
            E("h1").style.opacity = (1 - 0.5 * win(t, 12.2, 12.5)).toFixed(3);
            E("h2").innerHTML = slam(["LETTING GO", "DOES."], [12.3, 12.6], t, [0]);
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
