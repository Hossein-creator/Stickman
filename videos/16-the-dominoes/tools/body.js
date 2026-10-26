        // ---------- scene: one flick, a row of dominoes that grow, the camera pulls back ----------
        const cam = E("svg").children[1];
        const beams = E("beams");
        const beamA = svgEl("polygon", { points: "90,-200 190,-200 300,600 0,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.4 }, beams);
        const beamB = svgEl("polygon", { points: "960,-700 1260,-700 1560,600 700,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const W = E("world");
        const figG = svgEl("g", {}, W);
        const domG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);

        // dominoes: each one 1.36x the last, gap 0.55 h so it reaches the next one
        const HS = [28, 43, 67, 104, 162, 251, 389, 603];
        const DAYS = [1, 3, 10, 30, 60, 120, 240, 365];
        const PIPS = [[1, 1], [1, 2], [2, 3], [3, 3], [3, 4], [4, 5], [5, 6], [6, 6]];
        const GRID = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
        const doms = [];
        let x = 200;
        HS.forEach((h, k) => {
          const w = 0.3 * h;
          if (k) x += doms[k - 1].w / 2 + 0.5 * HS[k - 1] + w / 2;
          const last = k === HS.length - 1;
          const g = svgEl("g", {}, domG);
          svgEl("rect", { x: x - w / 2, y: FL - h, width: w, height: h, rx: Math.max(2, w * 0.14), fill: last ? "#d62a2a" : "#ece7dc", stroke: "#000", "stroke-width": Math.max(2, h * 0.025) }, g);
          svgEl("line", { x1: x - w * 0.34, x2: x + w * 0.34, y1: FL - h / 2, y2: FL - h / 2, stroke: last ? "#7a1010" : "#6d675d", "stroke-width": Math.max(1.2, h * 0.012) }, g);
          PIPS[k].forEach((n, half) => {
            const cy = FL - h * (half ? 0.25 : 0.75);
            for (const [gx, gy] of GRID[n]) svgEl("circle", { cx: x + gx * w * 0.27, cy: cy + gy * h * 0.13, r: h * 0.028, fill: last ? "#fff" : "#1a1a1a" }, g);
          });
          doms.push({ g, h, w, x, pv: x + w / 2 });
        });
        // timing: each fall gets slower with size; domino k hits k+1 when it has tipped 33 deg
        const HIT = (Math.asin(0.5) * 180) / Math.PI, REST = 62;
        const FT = HS.map((h) => 0.26 * Math.sqrt(h / 28));
        const T0 = [2.62];
        for (let k = 1; k < HS.length; k++) T0.push(T0[k - 1] + FT[k - 1]);
        const LASTF = 1.3 * FT[HS.length - 1], LAND = T0[HS.length - 1] + LASTF;
        function angles(t) {
          const th = new Array(HS.length).fill(0), n = HS.length - 1;
          const p7 = clamp((t - T0[n]) / LASTF, 0, 1);
          th[n] = 90 * p7 * p7 - (t > LAND ? 5 * Math.sin(Math.PI * clamp((t - LAND) / 0.28, 0, 1)) : 0);
          for (let k = n - 1; k >= 0; k--) {
            if (t < T0[k]) continue;
            const p = (t - T0[k]) / FT[k];
            th[k] = p < 1 ? HIT * p * p : HIT + (REST - HIT) * clamp(th[k + 1] / (k + 1 === n ? 90 : REST), 0, 1);
          }
          return th;
        }
        const dust = [0, 1, 2, 3, 4, 5].map(() => svgEl("ellipse", { rx: 10, ry: 6, fill: "url(#dustG)", opacity: 0 }, fxG));

        // ---------- the man: crouch, flick, stand, watch, fist up ----------
        const man = makeFig(figG, "#ffffff", "#e2e2e2", true, "man");
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        function manRaw(t) {
          const c = win(t, 1.6, 2.3) * (1 - win(t, 2.9, 3.6));
          const flick = Math.exp(-(((t - 2.58) / 0.08) ** 2));
          const watch = win(t, 3.6, 7.5);
          const pump = win(t, LAND + 0.15, LAND + 0.55);
          return base({
            hx: 115, hy: stand + 70 * c - 6 * pump, torso: 3 + 52 * c - 4 * watch, head: -10 * c - 8 * watch + 4 * pump,
            ax: 140, ay: FL, bx: 100, by: FL,
            ash: lerp(8, 110, pump), ael: lerp(12, 62, pump), aw: c * (1 - pump), atx: 186 + 6 * flick, aty: 566 - 4 * flick,
            bsh: lerp(-4, 20, c), bel: lerp(10, 20, c),
          });
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };

        // ---------- per-frame render ----------
        function render(t) {
          // camera: tight on the first domino, pulls back to show the whole row
          const zc = ease((t - 2.9) / (7.6 - 2.9));
          const z2 = ease((t - 6.9) / (8.5 - 6.9));
          const s = lerp(lerp(2.0, 0.7, zc), 0.47, z2), cx = lerp(lerp(185, 643, zc), 965, z2);
          const shake = t > LAND ? 7 * Math.exp(-(t - LAND) * 7) * Math.sin((t - LAND) * 60) : 0;
          cam.setAttribute("transform", `translate(540 ${r1(1400 + shake)}) scale(${s.toFixed(4)}) translate(${r1(-cx)} -600)`);

          drawFig(man, livePose(manRaw, t, 0.3), 1);
          const th = angles(t);
          doms.forEach((d, k) => d.g.setAttribute("transform", `rotate(${th[k].toFixed(2)} ${r1(d.pv)} ${FL})`));
          const L = doms[doms.length - 1];
          const da = (t - LAND) / 1.1;
          dust.forEach((c, j) => {
            const e = ease(da), dir = j < 3 ? -1 : 1;
            c.setAttribute("cx", r1(L.pv + L.h * (0.04 + 0.12 * (j % 3)) + dir * 40 * e));
            c.setAttribute("cy", r1(FL - 14 - 30 * e));
            c.setAttribute("rx", r1(40 + 90 * e));
            c.setAttribute("ry", r1(16 + 36 * e));
            c.setAttribute("opacity", da > 0 && da < 1 ? (0.75 * (1 - da)).toFixed(3) : 0);
          });
          beamB.setAttribute("opacity", (0.45 * win(t, 5.5, 7.5)).toFixed(3));

          let k = 0;
          for (let i = 0; i < T0.length; i++) if (t >= T0[i]) k = i;
          E("num").textContent = String(DAYS[k]).padStart(3, "0");
          typed("h1", "EVERY BIG RESULT", t, 9.8, 26);
          typed("h2", "STARTED WITH ONE SMALL PUSH.", t, 10.6, 26);
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
