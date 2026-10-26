        // ---------- scene: cutaway ground. One man starts 6 shallow holes, one digs a single well to the water ----------
        const cam = E("svg").children[1];
        // no mirror floor here: the ground is cut open
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (el.tagName === "use" || fill.includes("floorFade") || fill === "#000" || fill === "#2a2a2a") el.style.display = "none";
        }
        const W = E("world");
        const beams = E("beams");
        const groundG = svgEl("g", {}, W);
        const holeG = svgEl("g", {}, W);
        const waterG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const WY = FL + 330, FXH = 600, T_HIT = 8.0;

        svgEl("rect", { x: -500, y: FL, width: 1800, height: 1400, fill: "url(#earth)" }, groundG);
        svgEl("rect", { x: -500, y: FL - 3, width: 1800, height: 8, fill: "#6a5543" }, groundG);
        // little stones in the soil
        for (let i = 0; i < 70; i++) svgEl("ellipse", { cx: -300 + rnd() * 1400, cy: FL + 30 + rnd() * 560, rx: 3 + rnd() * 6, ry: 2 + rnd() * 4, fill: "#5a4635", opacity: 0.6 }, groundG);
        // water layer: dark until he reaches it
        svgEl("rect", { x: -500, y: WY, width: 1800, height: 46, fill: "#1d2226" }, waterG);
        const waterLit = svgEl("rect", { y: WY, height: 46, fill: "url(#water)" }, waterG);
        const waterHalo = svgEl("rect", { y: WY - 40, height: 126, fill: "#7fd3ff", filter: "url(#soft)", opacity: 0.35 }, waterG);
        const glints = [];
        for (let i = 0; i < 40; i++) glints.push(svgEl("circle", { cx: -300 + i * 35 + rnd() * 20, cy: WY + 8 + rnd() * 30, r: 2.5, fill: "#fff" }, waterG));
        const beamS = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0.3 }, beams);
        const beamF = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0.3 }, beams);

        // ---------- the starter: 6 holes, each given up early ----------
        const NH = 6, HS = 1.6, S0 = 0.3, X0 = 40, STEP = 70;
        const sx = (k) => X0 + STEP * k;               // where he stands for hole k
        const sh = (k) => sx(k) + 46;                  // hole k position
        const sDepth = (k, t) => (34 + 3 * k) * win(t, S0 + k * HS, S0 + k * HS + 1.1);
        const sHoles = [], sMounds = [], sLines = [];
        for (let k = 0; k < NH; k++) {
          sHoles.push(svgEl("path", { fill: "#0c0907" }, holeG));
          sMounds.push(svgEl("path", { fill: "#5a4635", stroke: "#000", "stroke-width": 3 }, holeG));
          sLines.push(svgEl("line", { x1: sh(k), x2: sh(k), y2: WY, stroke: "#ffffff", "stroke-width": 3, "stroke-dasharray": "4 9", opacity: 0 }, holeG));
        }
        // ---------- the finisher: one hole, all the way down ----------
        const fDepth = (t) => 330 * Math.pow(clamp((t - 0.3) / (T_HIT - 0.3), 0, 1), 0.92);
        const fHole = svgEl("path", { fill: "#0c0907" }, holeG);
        const fMound = svgEl("path", { fill: "#5a4635", stroke: "#000", "stroke-width": 3 }, holeG);
        const fWater = svgEl("rect", { x: FXH - 45, width: 90, fill: "url(#water)", opacity: 0.9 }, waterG);
        const burst = svgEl("circle", { cx: FXH, cy: WY, r: 140, fill: "url(#waterGlow)", opacity: 0 }, fxG);
        const drops = [];
        for (let i = 0; i < 18; i++) drops.push(svgEl("circle", { r: 4, fill: "#bfe9ff" }, fxG));
        const dirt = [];
        for (let i = 0; i < 10; i++) dirt.push(svgEl("circle", { r: 5, fill: "#6a5543", stroke: "#000", "stroke-width": 2 }, fxG));

        const sMan = makeFig(figG, "#ffffff", "#dedede", true, "sman");
        const fMan = makeFig(figG, "#ffffff", "#dedede", true, "fman");
        const shovels = [0, 1].map(() => ({ o: svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 11, "stroke-linecap": "round" }, figG), w: svgEl("path", { fill: "none", stroke: "#b9b9b9", "stroke-width": 5, "stroke-linecap": "round" }, figG), b: svgEl("path", { fill: "#9a9a9a", stroke: "#000", "stroke-width": 3 }, figG) }));

        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        function digPose(x, f, gy, c, amp) {
          const s = standOn(x, f, gy);
          const legH = Math.sqrt(LEG * LEG - 15 * 15);
          if (c < 0.5) {
            const p = Math.sin((Math.PI * c) / 0.5) * amp;
            s.torso = 8 + 30 * p; s.hy = gy - legH + 20 * p; s.head = 12 + 10 * p;
            s.aw = 1; s.atx = x + f * (40 + 14 * p); s.aty = gy - 112 + 66 * p;
            s.bw = 1; s.btx = x + f * (6 + 12 * p); s.bty = gy - 186 + 56 * p;
          } else {
            const q = Math.sin((Math.PI * (c - 0.5)) / 0.5) * amp;
            s.torso = 8 - 6 * q; s.head = 8 - 10 * q;
            s.aw = 1; s.atx = x + f * (40 - 30 * q); s.aty = gy - 112 - 60 * q;
            s.bw = 1; s.btx = x + f * (6 - 40 * q); s.bty = gy - 186 - 20 * q;
          }
          return s;
        }
        function walkPose(x0, dir, hx, STRIDE) {
          const u = (hx - x0) * dir, p = u / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            let uf, lift = 0;
            if (q < 0.5) uf = u + STRIDE * (0.25 - q);
            else { const s = (q - 0.5) / 0.5; uf = u + STRIDE * (-0.25 + 0.5 * ease(s)); lift = Math.sin(Math.PI * s) * 16; }
            return [x0 + dir * uf, FL - lift];
          });
          const legH = Math.sqrt(LEG * LEG - (STRIDE * 0.25) ** 2);
          return base({ hx, hy: lerp(stand, FL - legH, 0.6), torso: 6, head: 6, ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1], aw: 1, atx: hx + 30, aty: stand - 50, bw: 1, btx: hx + 18, bty: stand - 56 });
        }
        const leanPose = (x) => { const s = standOn(x, 1, FL); s.torso = 4; s.head = -6; s.aw = 1; s.atx = x + 44; s.aty = stand - 40; s.bw = 1; s.btx = x + 44; s.bty = stand - 70; return s; };
        function starterRaw(t) {
          const k = clamp(Math.floor((t - S0) / HS), 0, NH - 1);
          const q = t - S0 - k * HS;
          if (t < S0) return leanPose(sx(0));
          if (k === NH - 1 && q > 1.1) {
            // last hole abandoned: he leans on the shovel and watches the water
            const s = leanPose(sx(k));
            s.head = lerp(-6, -18, win(t, T_HIT + 0.3, T_HIT + 0.8));
            return s;
          }
          if (q < 1.1) return digPose(sx(k), 1, FL, frac(t * 1.5 + 0.3), win(q, 0, 0.15) * (1 - win(q, 0.95, 1.1)));
          if (q < 1.3) return leanPose(sx(k));
          return walkPose(sx(k), 1, lerp(sx(k), sx(k + 1), ease((q - 1.3) / 0.3)), 140);
        }
        function finisherRaw(t) {
          const gy = FL + fDepth(t);
          if (t < T_HIT) return digPose(FXH, -1, gy, frac(t * 1.5), win(t, 0.3, 0.5));
          // he hits water: arms up
          const s = standOn(FXH, -1, gy);
          const up = win(t, T_HIT + 0.2, T_HIT + 0.6);
          s.ash = lerp(8, 160, up); s.ael = -10 * up; s.bsh = lerp(-4, 150, up); s.bel = -10 * up; s.head = -20 * up; s.torso = -4 * up;
          return s;
        }

        function drawShovel(sv, j, show) {
          const [a, b] = j.hands;
          const dx = a[0] - b[0], dy = a[1] - b[1], d = Math.hypot(dx, dy) || 1;
          const ux = dx / d, uy = dy / d;
          const top = [b[0] - ux * 18, b[1] - uy * 18], end = [a[0] + ux * 60, a[1] + uy * 60];
          const dd = `M${r1(top[0])} ${r1(top[1])}L${r1(end[0])} ${r1(end[1])}`;
          sv.o.setAttribute("d", dd); sv.w.setAttribute("d", dd);
          const nx = -uy, ny = ux;
          const tip = [end[0] + ux * 34, end[1] + uy * 34];
          sv.b.setAttribute("d", `M${r1(end[0] + nx * 14)} ${r1(end[1] + ny * 14)}L${r1(tip[0] + nx * 12)} ${r1(tip[1] + ny * 12)}Q${r1(tip[0] + ux * 8)} ${r1(tip[1] + uy * 8)} ${r1(tip[0] - nx * 12)} ${r1(tip[1] - ny * 12)}L${r1(end[0] - nx * 14)} ${r1(end[1] - ny * 14)}Z`);
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          // camera pulls back and down to show how deep the water is
          const z = win(t, 3.5, 8.6);
          const s = lerp(1.25, 0.86, z), wy = lerp(600, 770, z), sy = lerp(1330, 1160, z);
          cam.setAttribute("transform", `translate(540 ${r1(sy)}) scale(${s.toFixed(4)}) translate(-400 ${r1(-wy)})`);

          // starter holes + little dirt piles
          for (let k = 0; k < NH; k++) {
            const d = sDepth(k, t), x = sh(k);
            sHoles[k].setAttribute("d", d > 0.5 ? `M${x - 30} ${FL} L${x + 30} ${FL} L${x + 24} ${r1(FL + d)} L${x - 24} ${r1(FL + d)} Z` : "");
            const m = d * 0.5;
            sMounds[k].setAttribute("d", m > 1 ? `M${x + 30} ${FL} Q${x + 46} ${r1(FL - m)} ${x + 64} ${FL} Z` : "");
            const ln = win(t, T_HIT + 0.9 + k * 0.12, T_HIT + 1.3 + k * 0.12);
            sLines[k].setAttribute("y1", r1(FL + d + 6));
            sLines[k].setAttribute("opacity", (0.75 * ln).toFixed(3));
          }
          const fd = fDepth(t);
          fHole.setAttribute("d", fd > 0.5 ? `M${FXH - 50} ${FL} L${FXH + 50} ${FL} L${FXH + 46} ${r1(FL + fd + 4)} L${FXH - 46} ${r1(FL + fd + 4)} Z` : "");
          const fm = Math.min(90, fd * 0.3);
          fMound.setAttribute("d", fm > 1 ? `M${FXH + 52} ${FL} Q${FXH + 110} ${r1(FL - fm * 1.6)} ${FXH + 190} ${FL} Z` : "");

          const js = drawFig(sMan, livePose(starterRaw, t, 0.4), 1);
          const jf = drawFig(fMan, livePose(finisherRaw, t, 1.2), -1);
          drawShovel(shovels[0], js);
          if (t < T_HIT + 0.2) drawShovel(shovels[1], jf);
          else for (const k of ["o", "w", "b"]) shovels[1][k].setAttribute("d", "");

          // dirt thrown out of his hole on every swing
          dirt.forEach((dt, i) => {
            const c = frac(t * 1.5 - i * 0.1);
            const on = t > 0.5 && t < T_HIT && c > 0.55;
            const q = (c - 0.55) / 0.45;
            const y0 = FL + fd - 60;
            dt.setAttribute("cx", r1(FXH + 10 + q * (90 + i * 6)));
            dt.setAttribute("cy", r1(lerp(y0, FL - 20, q) - Math.sin(Math.PI * q) * (60 + fd * 0.35)));
            dt.setAttribute("opacity", on ? 1 : 0);
          });

          // water: lights up from his hole outwards, right under every one of the starter's holes
          const rv = clamp((t - T_HIT) / 1.4, 0, 1), R = 900 * ease(rv);
          waterLit.setAttribute("x", r1(FXH - R)); waterLit.setAttribute("width", r1(2 * R));
          waterHalo.setAttribute("x", r1(FXH - R)); waterHalo.setAttribute("width", r1(2 * R));
          waterHalo.setAttribute("opacity", (0.35 * (rv > 0 ? 1 : 0) * (0.8 + 0.2 * Math.sin(t * 5))).toFixed(3));
          glints.forEach((g, i) => {
            const x = +g.getAttribute("cx");
            g.setAttribute("opacity", Math.abs(x - FXH) < R ? (0.5 + 0.5 * Math.sin(t * 6 + i * 1.7)).toFixed(3) : 0);
          });
          const wl = win(t, T_HIT, T_HIT + 1.2) * 70;
          fWater.setAttribute("y", r1(WY - wl)); fWater.setAttribute("height", r1(wl + 4));
          burst.setAttribute("opacity", (win(t, T_HIT, T_HIT + 0.15) * (1 - 0.5 * win(t, T_HIT + 0.4, T_HIT + 1.5))).toFixed(3));
          drops.forEach((dp, i) => {
            const tt = t - T_HIT - (i % 6) * 0.08;
            const per = 0.9, ph = frac(tt / per + i * 0.19);
            const on = tt > 0;
            const ang = -Math.PI / 2 + (i / 17 - 0.5) * 1.6;
            dp.setAttribute("cx", r1(FXH + Math.cos(ang) * 120 * ph));
            dp.setAttribute("cy", r1(WY - wl - Math.sin(-ang) * 160 * ph + 260 * ph * ph));
            dp.setAttribute("opacity", on ? (1 - ph).toFixed(3) : 0);
          });

          // beams follow the two men
          const hS = js.hip[0], hF = jf.hip[0];
          beamS.setAttribute("points", `${r1(hS - 40)},-300 ${r1(hS + 40)},-300 ${r1(hS + 130)},${FL} ${r1(hS - 130)},${FL}`);
          beamF.setAttribute("points", `${r1(hF - 40)},-300 ${r1(hF + 40)},-300 ${r1(hF + 130)},${FL} ${r1(hF - 130)},${FL}`);
          beamS.setAttribute("opacity", (0.3 * (1 - 0.6 * rv)).toFixed(3));

          const k = clamp(Math.floor((t - S0) / HS), 0, NH - 1);
          E("holeS").textContent = "HOLE " + (k + 1);
          typed("h1", "THE WATER WAS UNDER EVERY HOLE.", t, 9.3, 24);
          typed("h2", "ONLY ONE KEPT DIGGING.", t, 10.8, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.6, 11.0)).toFixed(3)})`;
          fade.style.opacity = win(t, 13.35, 13.95).toFixed(3);
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
