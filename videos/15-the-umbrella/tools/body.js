        // ---------- scene: rain, one red umbrella, two people ----------
        const beams = E("beams");
        const beam = svgEl("polygon", { points: "340,-90 460,-90 600,600 200,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.4 }, beams);
        const W = E("world");
        const figG = svgEl("g", {}, W);
        const umbG = svgEl("g", {}, W);
        const rainG = svgEl("g", {}, W);

        // umbrella: hand H, tilt a (deg from vertical); canopy rim center sits 165 up the shaft
        const SHAFT = 165, R = 98, DOME = 66;
        const shaft = svgEl("path", { fill: "none", stroke: "#111", "stroke-width": 6, "stroke-linecap": "round" }, umbG);
        const hook = svgEl("path", { fill: "none", stroke: "#111", "stroke-width": 7, "stroke-linecap": "round" }, umbG);
        const canopy = svgEl("g", {}, umbG);
        let cd = `M${-R} 0 Q${-R} ${-DOME * 0.9} 0 ${-DOME} Q${R} ${-DOME * 0.9} ${R} 0`;
        for (let i = 0; i < 6; i++) {
          const x1 = R - (2 * R * (i + 1)) / 6, xm = R - (2 * R * (i + 0.5)) / 6;
          cd += ` Q${r1(xm)} -12 ${r1(x1)} 0`;
        }
        svgEl("path", { d: cd + "Z", fill: "#d62a2a", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, canopy);
        for (const x of [-R / 3, R / 3]) svgEl("path", { d: `M0 ${-DOME} Q${x * 0.6} ${-DOME * 0.7} ${x} -6`, fill: "none", stroke: "#8f1616", "stroke-width": 3 }, canopy);
        svgEl("path", { d: `M0 ${-DOME} L0 ${-DOME - 14}`, stroke: "#111", "stroke-width": 5, "stroke-linecap": "round" }, canopy);
        const umbGlow = svgEl("ellipse", { rx: 120, ry: 60, fill: "#ff4433", filter: "url(#soft)", opacity: 0 }, umbG);
        umbG.insertBefore(umbGlow, shaft);

        // keyframes [time, hand x, hand y, tilt]
        const UK = [[0, 345, 382, -8], [3.5, 345, 382, -8], [4.3, 398, 378, 24], [6.7, 398, 378, 24], [7.5, 400, 372, 0]];
        const umbAt = (t) => {
          let s = UK[0].slice(1);
          for (let i = 1; i < UK.length; i++) {
            const p = ease((t - UK[i - 1][0]) / (UK[i][0] - UK[i - 1][0]));
            if (t > UK[i - 1][0]) s = s.map((v, j) => lerp(UK[i - 1][j + 1], UK[i][j + 1], p));
          }
          const [hx, hy, a] = s;
          return { H: [hx, hy], a, C: [hx + Math.sin(rad(a)) * SHAFT, hy - Math.cos(rad(a)) * SHAFT], open: backOut((t - 1.6) / 0.5) };
        };
        // is a point sheltered by the canopy (in its tilted column)?
        function sheltered(u, x, y) {
          const dx = x - u.C[0], dy = y - u.C[1], c = Math.cos(rad(u.a)), s = Math.sin(rad(u.a));
          const lx = dx * c + dy * s, ly = -dx * s + dy * c;
          const w = R * clamp(u.open, 0, 1.05);
          return Math.abs(lx) < w && ly > -DOME * (1 - (lx / R) ** 2) * clamp(u.open, 0, 1);
        }

        // rain
        const NR = 150, rain = [];
        for (let i = 0; i < NR; i++) {
          rain.push({
            x: -30 + rnd() * 860, v: 950 + rnd() * 350, ph: rnd() * 1000,
            line: svgEl("line", { stroke: "#a9bdd1", "stroke-width": 2.2, "stroke-linecap": "round", opacity: 0 }, rainG),
            sp: svgEl("ellipse", { rx: 7, ry: 2.2, fill: "#a9bdd1", opacity: 0 }, rainG),
          });
        }
        const drips = [0, 1, 2, 3].map(() => svgEl("circle", { r: 3, fill: "#bcd0e2", opacity: 0 }, rainG));

        // ---------- figures ----------
        const man = makeFig(figG, "#ffffff", "#e2e2e2", true, "man");
        const wom = makeFig(figG, "#ffffff", "#e2e2e2", true, "wom");
        const tail = svgEl("ellipse", { rx: 12, ry: 21, fill: "#ffffff", stroke: "#000", "stroke-width": 5 }, wom.g);
        wom.g.insertBefore(tail, wom.head);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const lf = (t, a) => Math.sin(Math.PI * clamp((t - a) / 0.4, 0, 1));
        function manRaw(t) {
          const wet = win(t, 3.9, 4.6) * (1 - win(t, 7.0, 7.6));
          const shiv = wet * Math.sin(t * 38) * 1.2;
          const x = 300 + 45 * win(t, 6.8, 7.6);
          const u = umbAt(t);
          return base({
            hx: x, hy: stand + 5 * wet, torso: 3 + 6 * wet + shiv + 4 * win(t, 7.5, 8.2), head: 12 * wet - 2 * win(t, 7.5, 8.2),
            ax: 315 + 45 * win(t, 6.8, 7.2), ay: FL - 16 * lf(t, 6.8), bx: 285 + 45 * win(t, 7.2, 7.6), by: FL - 16 * lf(t, 7.2),
            aw: 1, atx: u.H[0] - 3, aty: u.H[1] + 6,
            bsh: lerp(-4, 30, wet), bel: lerp(10, 70, wet),
          });
        }
        function womRaw(t) {
          const wet = win(t, 1.7, 2.4) * (1 - win(t, 4.0, 4.6));
          const shiv = wet * Math.sin(t * 41) * 1.2;
          const x = 480 - 25 * win(t, 6.6, 7.3);
          const reach = win(t, 6.7, 7.3);
          const u = umbAt(t);
          return base({
            hx: x, hy: stand + 6 * wet, torso: 3 + 12 * wet + shiv + 3 * reach, head: 10 * wet - 6 * win(t, 4.6, 5.2) + 4 * reach,
            ax: 465 - 25 * win(t, 6.6, 7.0), ay: FL - 16 * lf(t, 6.6), bx: 495 - 25 * win(t, 6.9, 7.3), by: FL - 16 * lf(t, 6.9),
            // hugs herself while wet, then reaches for the handle
            ash: 8, ael: 12, aw: Math.max(wet, reach), atx: lerp(466, u.H[0] + 4, reach), aty: lerp(366, u.H[1] - 8, reach),
            bsh: -4, bel: 10, bw: wet, btx: 478, bty: 360,
          });
        }
        const WHITE = "#ffffff", WET = "#aebfd0";
        const hexLerp = (a, b, p) => {
          const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
          return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(p, 0, 1))).toString(16).padStart(2, "0")).join("");
        };
        function tint(parts, p) {
          const c = hexLerp(WHITE, WET, p);
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", c);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", hexLerp("#e2e2e2", "#97a8b9", p));
          parts.head.setAttribute("fill", c);
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };

        // ---------- per-frame render ----------
        function render(t) {
          drawFig(man, livePose(manRaw, t, 0.3), 1);
          const jw = drawFig(wom, livePose(womRaw, t, 1.9), -1);
          tail.setAttribute("cx", r1(jw.head[0] + 27));
          tail.setAttribute("cy", r1(jw.head[1] + 8));
          tail.setAttribute("transform", `rotate(-20 ${r1(jw.head[0] + 27)} ${r1(jw.head[1] + 8)})`);
          // soaked: she while the umbrella is his, he while it is hers; they dry a little at the end
          tint(man, win(t, 4.0, 5.2) * (1 - 0.5 * win(t, 8, 10)));
          tint(wom, win(t, 1.8, 3.0) * (1 - win(t, 4.4, 7)) * 1 + 0);

          const u = umbAt(t), op = clamp(u.open, 0, 1.08);
          shaft.setAttribute("d", P([u.H, [u.C[0] + Math.sin(rad(u.a)) * 20, u.C[1] - Math.cos(rad(u.a)) * 20]]));
          hook.setAttribute("d", `M${r1(u.H[0])} ${r1(u.H[1])} q0 18 -12 18 q-10 0 -10 -9`);
          canopy.setAttribute("transform", `translate(${r1(u.C[0])} ${r1(u.C[1])}) rotate(${r1(u.a)}) scale(${(0.14 + 0.86 * op).toFixed(3)} ${(0.35 + 0.65 * op).toFixed(3)})`);
          umbGlow.setAttribute("cx", r1(u.C[0]));
          umbGlow.setAttribute("cy", r1(u.C[1] - 20));
          umbGlow.setAttribute("opacity", (0.35 * win(t, 7.5, 8.8)).toFixed(3));

          const amt = win(t, 1.0, 2.2) * (1 - 0.35 * win(t, 8.6, 10));
          rain.forEach((d, i) => {
            const p = (d.ph + t * d.v) % 1000, y = -400 + p, x = d.x - p * 0.06;
            const on = i < NR * amt && !sheltered(u, x, y);
            d.line.setAttribute("x1", r1(x));
            d.line.setAttribute("y1", r1(y - 26));
            d.line.setAttribute("x2", r1(x - 3));
            d.line.setAttribute("y2", r1(y));
            d.line.setAttribute("opacity", on && y < FL ? 0.55 : 0);
            const near = y > FL - 40 && y < FL + 30;
            d.sp.setAttribute("cx", r1(x));
            d.sp.setAttribute("cy", FL);
            d.sp.setAttribute("opacity", i < NR * amt && near && !sheltered(u, x, FL - 2) ? 0.5 : 0);
            if (y >= FL) d.line.setAttribute("opacity", 0);
          });
          // drips run off both rim ends
          drips.forEach((c, j) => {
            const side = j % 2 ? 1 : -1, cs = Math.cos(rad(u.a)), sn = Math.sin(rad(u.a));
            const rx = u.C[0] + side * R * op * cs, ry = u.C[1] + side * R * op * sn;
            const q = ((t * 1.6 + j * 0.37) % 1);
            c.setAttribute("cx", r1(rx));
            c.setAttribute("cy", r1(ry + q * q * (FL - ry)));
            c.setAttribute("opacity", t > 2.1 ? (0.8 * (1 - q)).toFixed(3) : 0);
          });
          beam.setAttribute("opacity", (0.4 + 0.25 * win(t, 7.6, 9)).toFixed(3));

          typed("h1", "LOVE ISN'T STAYING DRY.", t, 9.8, 26);
          typed("h2", "IT'S MAKING ROOM FOR TWO.", t, 11.0, 26);
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
