        // ---------- living room with a couch; visible part of the room is x 310-1110, y 288-743 ----------
        function buildRoom(g, good) {
          const R = {};
          svgEl("rect", { x: 0, y: 0, width: 1421, height: 730, fill: good ? "#3a2f45" : "#1b1e2c" }, g);
          svgEl("rect", { x: 0, y: 730, width: 1421, height: 75, fill: "#2b231f" }, g);
          svgEl("rect", { x: 0, y: 722, width: 1421, height: 8, fill: "#15131a" }, g);
          // window with dusk sky and a picture frame
          svgEl("rect", { x: 330, y: 330, width: 150, height: 150, fill: "#15141f" }, g);
          svgEl("rect", { x: 340, y: 340, width: 130, height: 130, fill: "url(#skyDusk)", opacity: good ? 1 : 0.55 }, g);
          svgEl("rect", { x: 401, y: 340, width: 8, height: 130, fill: "#15141f" }, g);
          // floor lamp (on only in the good room)
          svgEl("rect", { x: 1078, y: 420, width: 6, height: 310, fill: "#0d0d10" }, g);
          svgEl("polygon", { points: "1050,420 1112,420 1100,380 1062,380", fill: good ? "#f0cf8f" : "#33343d", stroke: "#000", "stroke-width": 3 }, g);
          if (good) {
            R.glow = svgEl("circle", { cx: 1081, cy: 430, r: 150, fill: "url(#warmGlow)", opacity: 0.8 }, g);
            svgEl("polygon", { points: "1056,420 1106,420 1180,730 980,730", fill: "url(#lampCone)", filter: "url(#soft)", opacity: 0.35 }, g);
          }
          // couch: backrest, arms, seat, legs (figures sit on top of the seat)
          const c1 = good ? "#6a4a5e" : "#33384c", c2 = good ? "#7d586f" : "#3d4358";
          svgEl("rect", { x: 405, y: 466, width: 620, height: 150, rx: 26, fill: c1, stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 380, y: 598, width: 670, height: 62, rx: 16, fill: c2, stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 368, y: 548, width: 54, height: 128, rx: 18, fill: c1, stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 1008, y: 548, width: 54, height: 128, rx: 18, fill: c1, stroke: "#000", "stroke-width": 3 }, g);
          for (const x of [400, 1020]) svgEl("rect", { x, y: 676, width: 12, height: 54, fill: "#211b18" }, g);
          R.figs = svgEl("g", {}, g);
          R.fx = svgEl("g", {}, g);
          // the love battery (top right of the panel)
          const B = svgEl("g", { transform: "translate(842 318)" }, g);
          R.batGlow = svgEl("rect", { x: -14, y: -14, width: 192, height: 88, rx: 22, fill: "#ffffff", filter: "url(#soft)", opacity: 0 }, B);
          svgEl("rect", { x: 0, y: 0, width: 164, height: 60, rx: 12, fill: "#0c0c10", stroke: "#e6e6e6", "stroke-width": 5 }, B);
          svgEl("rect", { x: 166, y: 18, width: 12, height: 24, rx: 4, fill: "#e6e6e6" }, B);
          R.batFill = svgEl("rect", { x: 7, y: 7, width: 150, height: 46, rx: 7, fill: "#ffffff" }, B);
          R.batTxt = svgEl("text", { x: 82, y: 41, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 28, fill: "#000" }, B);
          R.batHeart = svgEl("path", { d: HEART, fill: "#e0322b", stroke: "#000", "stroke-width": 2, transform: "translate(-30 32) scale(1.3)" }, B);
          R.pops = svgEl("g", {}, B);
          return R;
        }
        const RT = buildRoom(E("roomT"), true);
        const RB = buildRoom(E("roomB"), false);

        // battery level over time: steps that ease in over 0.4 s
        const levelAt = (steps, t) => {
          let v = steps[0][1];
          for (let i = 1; i < steps.length; i++) v = lerp(v, steps[i][1], ease((t - steps[i][0]) / 0.4));
          return v;
        };
        const LT = [[0, 40], [1.4, 60], [3.2, 80], [5.2, 100]];
        const LB = [[0, 60], [1.4, 45], [3.6, 25], [5.6, 10], [7.4, 3]];
        function battery(R, steps, t, good) {
          const v = levelAt(steps, t);
          const low = v < 20;
          const blink = low && t > 7.4 ? (Math.sin(t * 9) > 0 ? 1 : 0.35) : 1;
          R.batFill.setAttribute("width", r1(Math.max(4, 150 * v / 100)));
          R.batFill.setAttribute("fill", low ? "#e0322b" : "#ffffff");
          R.batFill.setAttribute("opacity", blink);
          R.batTxt.textContent = Math.round(v) + "%";
          R.batTxt.setAttribute("fill", low ? "#ffffff" : "#000000");
          R.batTxt.setAttribute("x", low ? 104 : 82);
          R.batGlow.setAttribute("opacity", good ? (0.55 * win(t, 5.2, 5.8) * (0.8 + 0.2 * Math.sin(t * 4))).toFixed(3) : 0);
          R.batHeart.setAttribute("opacity", good ? 1 : 0.35 + 0.65 * (v / 60));
          R.batHeart.setAttribute("fill", hexLerp("#4f1515", "#e0322b", clamp(v / 60, 0, 1)));
          // +20 / -20 pop-ups at each step
          while (R.pops.firstChild) R.pops.removeChild(R.pops.firstChild);
          steps.slice(1).forEach(([ts, val], i) => {
            const a = (t - ts) / 1.1;
            if (a <= 0 || a >= 1) return;
            const d = Math.round(val - steps[i][1]);
            const tx = svgEl("text", { x: 82, y: r1((good ? -12 : 92) + (good ? -40 : 40) * ease(a)), "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 30, fill: good ? "#ffffff" : "#ff4a3d", opacity: (1 - a).toFixed(3) }, R.pops);
            tx.textContent = (d > 0 ? "+" : "") + d;
          });
        }

