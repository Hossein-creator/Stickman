        // ---------- scene: he walks the same line every day and wears a path, while the other waits for motivation ----------
        const W = E("world");
        const STRIDE = 176;
        const PX0 = 140, PX1 = 420, SEG = 16;
        const groundG = svgEl("g", {}, W);
        svgEl("rect", { x: PX0 - 30, y: FL + 4, width: PX1 - PX0 + 60, height: 60, rx: 6, fill: "#101010" }, groundG);
        const segs = [];
        for (let x = PX0; x < PX1; x += SEG) segs.push(svgEl("rect", { x, y: FL + 14, width: SEG + 0.5, height: 36, fill: "#ffffff", opacity: 0 }, groundG));
        const pathGlow = svgEl("rect", { x: PX0, y: FL + 10, width: PX1 - PX0, height: 44, rx: 10, fill: "#ffffff", filter: "url(#blur)", opacity: 0 }, groundG);
        const seatG = svgEl("g", {}, W);
        svgEl("rect", { x: 520, y: 528, width: 86, height: 72, rx: 6, fill: "#3b3b3b", stroke: "#000", "stroke-width": 3 }, seatG);
        svgEl("rect", { x: 520, y: 528, width: 86, height: 8, rx: 3, fill: "#5a5a5a" }, seatG);
        const figG = svgEl("g", {}, W);
        const lazy = makeFig(figG, "#8a8a8a", "#6c6c6c", false, false, "lazy");
        const hero = makeFig(figG, "#ffffff", "#e2e2e2", true, "hero");
        // motivation bar floats above the one who waits (outside #world, so it is not mirrored)
        const barG = svgEl("g", {}, W.parentNode);
        svgEl("text", { x: 563, y: 206, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 16, "letter-spacing": 3, fill: "#a0a0a0" }, barG).textContent = "MOTIVATION";
        svgEl("rect", { x: 508, y: 216, width: 110, height: 16, rx: 3, fill: "#0a0a0a", stroke: "#8a8a8a", "stroke-width": 2 }, barG);
        const barFill = svgEl("rect", { x: 511, y: 219, width: 10, height: 10, rx: 1, fill: "#d62a2a" }, barG);
        const barTxt = svgEl("text", { x: 563, y: 254, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 18, fill: "#d62a2a" }, barG);
        const env = (p, a, b, c, d) => ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));

        // laps: [start, end, from x, to x]
        const LAPS = [[0.8, 1.9, 150, 400], [2.1, 3.2, 400, 150], [3.5, 4.6, 150, 400], [4.8, 5.9, 400, 150], [6.2, 7.3, 150, 400]];
        const START_X = 150;
        const posAt = (t) => {
          let x = START_X;
          for (const [a, b, x0, x1] of LAPS) if (t >= a) x = lerp(x0, x1, ease((t - a) / (b - a)));
          return x;
        };
        const dirAt = (t) => { let d = 1; for (let i = 0; i < LAPS.length; i++) if (t >= LAPS[i][0] - 0.3) d = LAPS[i][3] > LAPS[i][2] ? 1 : -1; return d; };
        const sxAt = (t) => {
          let s = 1;
          for (let i = 0; i < LAPS.length; i++) {
            const d = LAPS[i][3] > LAPS[i][2] ? 1 : -1, prev = i ? (LAPS[i - 1][3] > LAPS[i - 1][2] ? 1 : -1) : d;
            if (t >= LAPS[i][0] - 0.3) s = lerp(prev, d, win(t, LAPS[i][0] - 0.3, LAPS[i][0] - 0.05));
          }
          return s;
        };
        // distance walked so far (for the stride phase) and how many times each path segment was crossed
        const DT = 1 / 120, TAB = [], CROSS = segs.map(() => []);
        {
          let dist = 0, prev = posAt(0);
          for (let i = 0; i <= 14 * 120; i++) {
            const t = i * DT, x = posAt(t);
            dist += Math.abs(x - prev);
            TAB.push(dist);
            segs.forEach((_, k) => {
              const cx = PX0 + k * SEG + SEG / 2;
              if ((prev - cx) * (x - cx) < 0) CROSS[k].push(t);
            });
            prev = x;
          }
        }
        const distAt = (t) => TAB[clamp(Math.round(t * 120), 0, TAB.length - 1)];
        const frac = (v) => v - Math.floor(v);
        const STAND = FL - Math.sqrt(LEG * LEG - 15 * 15);
        function heroRaw(t) {
          const hx = posAt(t), p = distAt(t) / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + STRIDE * (0.25 - q) * 0.5, FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)) * 0.5, FL - Math.sin(Math.PI * s) * 22];
          });
          const moving = LAPS.reduce((m, [a, b]) => Math.max(m, env(t, a, a + 0.2, b - 0.2, b)), 0);
          const sw = Math.sin(p * Math.PI * 2) * 26 * moving;
          const end = win(t, 7.6, 8.4);
          return base({
            hx, hy: STAND + 1.5 * Math.abs(Math.sin(p * Math.PI * 2)) * moving, torso: 3 + 5 * moving - 5 * end, head: -2 * end,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            ash: 8 + sw + 14 * end, ael: 12 + 10 * moving, bsh: -4 - sw - 12 * end, bel: 10 + 10 * moving,
          });
        }
        // the one who waits: slumped on the block, hands hanging, head down
        function lazyRaw(t) {
          const sigh = env(t, 5.2, 5.6, 5.9, 6.4);
          return base({
            hx: 563, hy: 516, torso: -4 - 3 * sigh, head: 22 + 8 * sigh,
            ax: 500, ay: FL, bx: 516, by: FL,
            ash: -18, ael: 24, aw: 1, atx: 522, aty: 548,
            bsh: -10, bel: 26, bw: 1, btx: 536, bty: 552,
          });
        }
        const flip = (g, hx, sx) => g.setAttribute("transform", `translate(${r1(hx)} 0) scale(${sx.toFixed(3)} 1) translate(${r1(-hx)} 0)`);

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");

        // ---------- per-frame render ----------
        function render(t) {
          flip(hero.g, posAt(t), sxAt(t));
          drawFig(hero, livePose(heroRaw, t, 0.4), 1);
          flip(lazy.g, 563, -1);
          drawFig(lazy, livePose(lazyRaw, t, 2.0), 1);
          // the path wears in: each crossing lights its segment more
          let sum = 0;
          segs.forEach((s, k) => {
            const n = CROSS[k].filter((tc) => tc < t - 0.15).length;
            const v = Math.min(1, n * 0.22);
            sum += v;
            s.setAttribute("opacity", (v * 0.9).toFixed(3));
          });
          pathGlow.setAttribute("opacity", (0.55 * (sum / segs.length) * win(t, 6.0, 8.0)).toFixed(3));
          // motivation bar: twitches, never fills
          const bar = 10 + 6 * Math.max(0, Math.sin(t * 1.3)) + 4 * win(t, 2, 8);
          barFill.setAttribute("width", r1(bar));
          barTxt.textContent = Math.round((bar / 104) * 100) + "%";
          const day = 1 + Math.floor(29 * clamp((t - 0.8) / 6.5, 0, 1));
          E("num").textContent = pad(day);
          typed("h1", "MOTIVATION NEVER SHOWED UP.", t, 9.8, 26);
          typed("h2", "THE PATH WAS BUILT ANYWAY.", t, 11.2, 26);
        }
