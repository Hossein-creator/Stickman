        // ---------- "the gap": a fight splits the ground. Every step away makes it wider. He leaps, falls short, she catches him ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (el.tagName === "use" || fill.includes("floorFade") || fill === "#000" || fill === "#2a2a2a") el.style.display = "none";
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const abyssG = svgEl("g", {}, W);
        const slabG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const labelG = svgEl("g", {}, cam);
        const frac = (v) => v - Math.floor(v);
        const CX = 400;

        // ---------- time warp: slow motion from the leap to the catch ----------
        const SLOW0 = 6.45, SLOW1 = 7.95, SLOWK = 0.33;
        const speedAt = (t) => 1 - (1 - SLOWK) * win(t, SLOW0, SLOW0 + 0.1) * (1 - win(t, SLOW1 - 0.3, SLOW1));
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- the gap ----------
        const T_CRACK = 1.55, T_JUMP = 6.5, T_CATCH = 6.85, T_SLAM = 8.95;
        function gapAt(s) {
          if (s < T_CRACK) return 0;
          if (s < 4.5) return 240 * ease((s - T_CRACK) / (4.5 - T_CRACK));
          if (s < 6.6) return 240 + 60 * ease((s - 4.5) / 2.1);
          if (s < 8.7) return 300;
          if (s < T_SLAM) return 300 * (1 - ((s - 8.7) / (T_SLAM - 8.7)) ** 2);
          return 0;
        }
        // jagged split line: both slabs share it so they fit back together
        const J = [[0, 0], [16, 34], [-12, 70], [14, 108], [-9, 146], [12, 190], [-6, 236], [8, 290], [0, 360]];
        const jag = J.map(([x, y]) => `${CX + x},${FL + y}`).join(" ");
        const jagR = J.slice().reverse().map(([x, y]) => `${CX + x},${FL + y}`).join(" ");
        const abyss = svgEl("rect", { y: FL, height: 700, fill: "url(#abyss)" }, abyssG);
        const slabL = svgEl("g", {}, slabG), slabR = svgEl("g", {}, slabG);
        svgEl("polygon", { points: `-900,${FL} ${jag} ${CX},${FL + 900} -900,${FL + 900}`, fill: "url(#rockF)", stroke: "#000", "stroke-width": 6 }, slabL);
        svgEl("polygon", { points: `${CX},${FL} 1700,${FL} 1700,${FL + 900} ${CX},${FL + 900} ${jagR}`, fill: "url(#rockF)", stroke: "#000", "stroke-width": 6 }, slabR);
        for (const g of [slabL, slabR]) svgEl("rect", { x: g === slabL ? -900 : CX, y: FL - 3, width: 1300, height: 6, fill: "#6b6560" }, g);
        const crackHot = svgEl("polyline", { points: jag, fill: "none", stroke: "#ff5a3a", "stroke-width": 7, filter: "url(#blur)", opacity: 0 }, slabG);
        const seamGlow = svgEl("polyline", { points: jag, fill: "none", stroke: "#ffd27a", "stroke-width": 18, filter: "url(#soft)", opacity: 0 }, slabG);
        const seam = svgEl("polyline", { points: jag, fill: "none", stroke: "#ffd27a", "stroke-width": 6, "stroke-linejoin": "round", opacity: 0 }, slabG);
        const goldPool = svgEl("ellipse", { cx: CX, cy: FL, rx: 260, ry: 40, fill: "url(#goldGlow)", opacity: 0 }, backG);
        const spot = svgEl("polygon", { points: `${CX - 70},-900 ${CX + 70},-900 ${CX + 240},${FL} ${CX - 240},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.28 }, beams);
        const pebbles = [];
        for (let i = 0; i < 16; i++) pebbles.push({ el: svgEl("circle", { r: 4 + (i % 3) * 2, fill: "#5a5550", stroke: "#000", "stroke-width": 2 }, fxG), t0: i < 10 ? T_CRACK + i * 0.14 : T_CATCH + (i - 10) * 0.08, side: i % 2 ? 1 : -1, dx: ((i * 37) % 30) - 15 });

        // ---------- the couple ----------
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const him = makeFig(figG, "#ffffff", "#e2e2e2", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const pw = (s, K) => { for (let i = 1; i < K.length; i++) if (s < K[i][0]) return lerp(K[i - 1][1], K[i][1], ease((s - K[i - 1][0]) / (K[i][0] - K[i - 1][0]))); return K[K.length - 1][1]; };
        const herLocal = (s) => pw(s, [[0, 340], [1.7, 340], [3.3, 220], [5.8, 220], [6.6, 350], [7.6, 350], [8.4, 290], [99, 290]]);
        const himLocalR = (s) => pw(s, [[0, 460], [1.7, 460], [3.3, 580], [3.6, 580], [5.0, 700], [5.6, 700], [6.5, 430]]);
        const L = (s) => -gapAt(s) / 2, R = (s) => gapAt(s) / 2;
        const herF = (s) => (s < T_CRACK || s > 4.6 ? 1 : -1);
        const himF = (s) => (s < T_CRACK || s > 5.3 ? -1 : 1);
        function feetOn(x0, hx, ST, lift, shift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q) + shift, FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)) + shift, FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const LEFT_EDGE = (s) => CX + L(s);
        const G = (s) => { const k = ease((s - 7.0) / 1.4); return [lerp(LEFT_EDGE(s) + 6, LEFT_EDGE(s) - 26, k), lerp(FL + 4, FL - 120, k)]; };
        const argueArms = (st, x, f, t, ph) => {
          st.torso = 4 + 7 * Math.sin(t * 6 + ph); st.head = -4 + 6 * Math.sin(t * 9 + ph);
          st.ash = 40 + 90 * Math.max(0, Math.sin(t * 5.5 + ph)); st.ael = -20 + 40 * Math.max(0, Math.sin(t * 7 + ph));
          st.bsh = 30 + 80 * Math.max(0, Math.sin(t * 5.5 + ph + 2.2)); st.bel = -10;
          return st;
        };

        function herRaw(s) {
          const lx = herLocal(s), sh = L(s), x = lx + sh, f = herF(s);
          let st;
          if (s < T_CRACK) { st = argueArms(standOn(x, f, FL), x, f, s, 0); st.aw = 0.8 * Math.max(0, Math.sin(s * 4)); st.atx = x + 90; st.aty = stand - 150; return st; }
          if (s < 3.3) { st = base({ hx: x, hy: stand + 2, torso: 7, head: 18 }); const ft = feetOn(340, lx, 120, 14, sh); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; return st; }
          if (s < 4.6) { st = standOn(x, -1, FL); st.head = 22; st.torso = 6; st.aw = 1; st.atx = x - 20; st.aty = stand - 82; st.bw = 1; st.btx = x - 4; st.bty = stand - 88; return st; }
          if (s < 5.8) { st = standOn(x, 1, FL); const r = win(s, 5.0, 5.4); st.head = lerp(8, -6, r); st.aw = 0.5 * r; st.atx = x + 90; st.aty = stand - 110; return st; }
          if (s < 6.6) { st = base({ hx: x, hy: stand + 4, torso: 14, head: -8, ash: 30, bsh: -20 }); const ft = feetOn(220, lx, 150, 22, sh); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1]; return st; }
          const kneel = base({ hx: x, hy: FL - 58, torso: 56, head: -30, ax: x + 36, ay: FL, bx: x - 70, by: FL, aw: 1, bw: 1 });
          const g = G(s);
          kneel.atx = g[0]; kneel.aty = g[1]; kneel.btx = g[0] - 8; kneel.bty = g[1] - 4;
          if (s < 7.6) return mixPose(standOn(x, 1, FL), kneel, win(s, 6.6, 6.8));
          const pull = base({ hx: x, hy: stand + 8, torso: -14, head: -10, ax: x + 34, ay: FL, bx: x - 34, by: FL, aw: 1, bw: 1, atx: g[0], aty: g[1], btx: g[0] - 8, bty: g[1] - 4 });
          if (s < 8.5) return mixPose(kneel, pull, win(s, 7.6, 8.0));
          // hug
          const hx = 352 + sh;
          const hug = standOn(x, 1, FL);
          hug.torso = 10; hug.head = -6 + 4 * Math.sin(s * 2); hug.aw = 1; hug.atx = hx + 24; hug.aty = stand - 110; hug.bw = 1; hug.btx = hx + 10; hug.bty = stand - 90;
          return mixPose(pull, hug, win(s, 8.5, 8.9));
        }
        function himRaw(s) {
          const f = himF(s);
          if (s < T_JUMP) {
            const lx = himLocalR(s), sh = R(s), x = lx + sh;
            let st;
            if (s < T_CRACK) { st = argueArms(standOn(x, f, FL), x, f, s, 1.6); return st; }
            if (s < 5.0) {
              const walking = (s > 1.7 && s < 3.3) || (s > 3.6 && s < 5.0);
              st = base({ hx: x, hy: stand + 2, torso: 6, head: 12 });
              const ft = feetOn(s < 3.45 ? 460 : 580, lx, 120, 14, sh); st.ax = ft[0][0]; st.ay = ft[0][1]; st.bx = ft[1][0]; st.by = ft[1][1];
              if (!walking) { st.ax = x + 15; st.ay = FL; st.bx = x - 15; st.by = FL; }
              return st;
            }
            if (s < 5.6) { st = standOn(x, f, FL); st.head = lerp(10, -4, win(s, 5.3, 5.5)); st.torso = 3; return st; }
            // sprint back toward the gap
            const ft = feetOn(700, lx, 135, 34, sh);
            const sw = Math.sin(Math.PI * 2 * (700 - lx) / 135);
            return base({ hx: x, hy: stand + 10 + 4 * Math.abs(sw), torso: 18, head: -12, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 - 55 * sw, ael: 85, bsh: -4 + 55 * sw, bel: 85 });
          }
          const e = LEFT_EDGE(s);
          if (s < T_CATCH) {
            // the leap, arms out for the far edge
            const k = (s - T_JUMP) / (T_CATCH - T_JUMP);
            const x0 = 430 + R(T_JUMP), hx = lerp(x0, e + 28, k), hy = lerp(stand + 10, FL + 150, k * k) - Math.sin(Math.PI * k) * 70;
            return base({ hx, hy, torso: lerp(40, 10, k), head: -20, ax: hx + 60, ay: hy + 110, bx: hx + 100, by: hy + 70, aw: 1, atx: e + 4, aty: lerp(hy - 130, FL + 2, k), bw: 1, btx: e - 6, bty: lerp(hy - 120, FL + 2, k) });
          }
          if (s < 7.0) {
            const hang = base({ hx: e + 28, hy: FL + 150, torso: -4, head: -18, ax: e + 32, ay: FL + 297, bx: e + 42, by: FL + 293, aw: 1, atx: e + 4, aty: FL + 2, bw: 1, btx: e - 8, bty: FL + 2 });
            hang.hy += 10 * Math.exp(-(s - T_CATCH) * 12);
            return hang;
          }
          if (s < 8.4) {
            const k = ease((s - 7.0) / 1.4), g = G(s);
            const hx = lerp(e + 28, e - 48, k), hy = lerp(FL + 150, stand, k);
            const st = base({ hx, hy, torso: lerp(-6, 4, k) + 22 * Math.sin(Math.PI * k), head: -16, aw: 1, atx: g[0], aty: g[1], bw: 1, btx: e - 10, bty: FL - 2 });
            st.ax = k > 0.55 ? lerp(e - 10, hx - 15, win(k, 0.55, 1)) : hx + 10; st.ay = k > 0.55 ? FL : hy + 140;
            st.bx = k > 0.75 ? hx + 15 : hx + 30; st.by = k > 0.75 ? FL : hy + 145;
            return st;
          }
          const x = 352 + L(s);
          const hug = standOn(x, -1, FL);
          const hx = 290 + L(s);
          hug.torso = 10; hug.head = -4 + 4 * Math.sin(s * 2 + 1); hug.aw = 1; hug.atx = hx - 20; hug.aty = stand - 100; hug.bw = 1; hug.btx = hx - 6; hug.bty = stand - 120;
          return hug;
        }

        // ---------- angry bursts during the fight (symbols, no words) ----------
        const BURSTS = [[0.12, 1], [0.42, 0], [0.7, 1], [0.95, 0], [1.2, 1], [1.4, 0]];
        const bursts = BURSTS.map(() => {
          const g = svgEl("g", { opacity: 0 }, labelG);
          const pts = [];
          for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 34 : 54; pts.push(`${r1(Math.cos(a) * r * 1.3)},${r1(Math.sin(a) * r)}`); }
          svgEl("polygon", { points: pts.join(" "), fill: "#d62a2a", stroke: "#000", "stroke-width": 5 }, g);
          const tx = svgEl("text", { y: 10, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 30, fill: "#fff" }, g);
          tx.textContent = "#@!";
          return g;
        });

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.75, 400, 470, 0], [1.45, 1.75, 400, 470, 0], [1.75, 1.55, 400, 480, 0], [4.3, 1.02, 400, 430, 0],
          [4.8, 1.4, 210, 450, -1], [5.35, 1.4, 640, 450, 1], [6.3, 1.2, 470, 450, 0], [6.85, 1.95, 290, 560, 3],
          [7.7, 1.6, 280, 520, 0], [8.6, 1.5, 300, 480, 0], [9.1, 1.55, 330, 480, 0], [10.6, 1.3, 340, 470, 0], [99, 1.3, 340, 470, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t), gp = gapAt(s);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          hit(realOf(T_CRACK), 1.2, 1, 0.45, 0.25);
          hit(realOf(T_JUMP), 0.4, 0.5, 0, 0.2);
          hit(realOf(T_CATCH), 0.9, 1, 0.25, 0.35);
          hit(realOf(T_SLAM), 1.5, 1, 0.75, 0.4);
          BURSTS.forEach(([b]) => hit(b, 0.35, 0.3, 0, 0.1));
          if (s > T_CRACK && s < 4.5) kick += 0.12 * (0.5 + 0.5 * Math.sin(t * 29)); // the ground grinding apart

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          // ground
          slabL.setAttribute("transform", `translate(${r1(-gp / 2)} 0)`);
          const sw = s < T_CRACK || s > T_SLAM + 0.05 ? 0 : 6;
          slabL.firstChild.setAttribute("stroke-width", sw); slabR.firstChild.setAttribute("stroke-width", sw);
          slabR.setAttribute("transform", `translate(${r1(gp / 2)} 0)`);
          abyss.setAttribute("x", r1(CX - gp / 2 - 20)); abyss.setAttribute("width", r1(gp + 40));
          crackHot.setAttribute("opacity", (s > T_CRACK ? Math.exp(-(s - T_CRACK) / 0.5) : 0).toFixed(3));
          const gold = win(s, T_SLAM, T_SLAM + 0.6);
          seam.setAttribute("opacity", gold.toFixed(3));
          seamGlow.setAttribute("opacity", (gold * (0.55 + 0.25 * Math.sin(t * 3))).toFixed(3));
          goldPool.setAttribute("opacity", (0.9 * gold).toFixed(3));
          spot.setAttribute("opacity", (0.28 + 0.3 * gold).toFixed(3));
          pebbles.forEach((p) => {
            const dt = s - p.t0;
            const ex = p.t0 < T_CATCH ? CX + p.side * gapAt(p.t0) / 2 + p.side * 4 : LEFT_EDGE(p.t0) + 8;
            const on = dt > 0 && dt < 1.4;
            p.el.setAttribute("cx", r1(ex + p.dx * dt * 2));
            p.el.setAttribute("cy", r1(FL + 2 + 900 * dt * dt));
            p.el.setAttribute("opacity", on ? 1 : 0);
          });

          // couple
          const jh = drawFig(her, livePose(herRaw, s, 0.4), herF(s));
          drawFig(him, livePose(himRaw, s, 1.3), himF(s));
          bun.setAttribute("cx", r1(jh.head[0] - herF(s) * 25)); bun.setAttribute("cy", r1(jh.head[1] - 16));

          // fight bursts above their heads
          bursts.forEach((g, i) => {
            const [b, who] = BURSTS[i], q = (t - b) / 0.45;
            const x = who ? 340 : 460, y = FL - 400;
            g.setAttribute("opacity", q > 0 && q < 1 ? (1 - Math.max(0, q - 0.6) / 0.4).toFixed(3) : 0);
            g.setAttribute("transform", `translate(${x + (who ? -20 : 20)} ${y - 30 * q}) scale(${(backOut(clamp(q / 0.35, 0, 1)) * 0.9).toFixed(3)}) rotate(${who ? -8 : 8})`);
          });

          E("h1").innerHTML = slam(["IT", "TAKES", "TWO"], [11.5, 11.68, 11.9], t, [2]);
          E("h2").innerHTML = slam(["TO", "CLOSE", "THE", "GAP."], [12.4, 12.55, 12.7, 12.9], t, []);
          E("h1").style.opacity = (1 - 0.45 * win(t, 12.3, 12.6)).toFixed(3);
          fade.style.opacity = win(t, 13.5, 13.95).toFixed(3);
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
