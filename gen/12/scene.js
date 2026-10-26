        // ---------- scene: a red thread between two people thins every day they stay turned away ----------
        const W = E("world");
        const threadG = svgEl("g", {}, W);
        const thGlow = svgEl("path", { fill: "none", stroke: "#ff3b30", "stroke-linecap": "round", filter: "url(#blur)", opacity: 0 }, threadG);
        const thread = svgEl("path", { fill: "none", stroke: "#d62a2a", "stroke-linecap": "round" }, threadG);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const env = (p, a, b, c, d) => ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));
        const LX = 250, RX = 550, STRIDE = 176;
        const TURN_H = [7.0, 7.4], WALK_H = [7.5, 9.1], TURN_R = [8.6, 9.0], TOUCH = [9.1, 9.6];
        const heroX = (t) => lerp(LX, 410, ease((t - WALK_H[0]) / (WALK_H[1] - WALK_H[0])));
        const sxH = (t) => lerp(-1, 1, win(t, TURN_H[0], TURN_H[1]));
        const sxR = (t) => lerp(1, -1, win(t, TURN_R[0], TURN_R[1]));
        const frac = (v) => v - Math.floor(v);
        const STAND = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const sad = (t) => win(t, 0.5, 6.8);
        function heroRaw(t) {
          const hx = heroX(t), p = (hx - LX) / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + STRIDE * (0.25 - q) * 0.5, FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)) * 0.5, FL - Math.sin(Math.PI * s) * 22];
          });
          const cross = 1 - win(t, TURN_H[0] - 0.2, TURN_H[0] + 0.3);
          const touch = win(t, TOUCH[0], TOUCH[0] + 0.5);
          return base({
            hx, hy: STAND + 2 * sad(t), torso: 3 - 2 * sad(t) * (1 - touch) + 3 * touch, head: 2 + 12 * sad(t) * cross - 6 * touch,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            ash: lerp(8, 0, cross), ael: lerp(12, 0, cross), aw: cross, atx: hx + 24, aty: 392,
            bsh: lerp(-4, 70, touch), bel: lerp(10, 35, touch), bw: Math.max(cross, touch), btx: lerp(hx + 6, 526, touch), bty: lerp(402, 345, touch),
          });
        }
        function partRaw(t) {
          const cross = 1 - win(t, TURN_R[0] - 0.3, TURN_R[0] + 0.2);
          const touch = win(t, TOUCH[0] + 0.2, TOUCH[0] + 0.7);
          const s = standOn(RX, 1, FL);
          return {
            ...s, hy: s.hy + 2 * sad(t), torso: 3 - 2 * sad(t) * (1 - touch), head: 2 + 12 * sad(t) * cross - 4 * touch,
            ash: lerp(8, 0, cross), ael: lerp(12, 0, cross), aw: cross, atx: RX + 24, aty: 392,
            bsh: lerp(-4, 60, touch), bel: lerp(10, 40, touch), bw: Math.max(cross, touch), btx: lerp(RX + 6, 2 * RX - 472, touch), bty: lerp(402, 345, touch),
          };
        }
        const figL = makeFig(figG, "#ffffff", "#e2e2e2", true, "figL");
        const figR = makeFig(figG, "#d4d4d4", "#b4b4b4", true, "figR");
        const spark = [0, 1, 2, 3, 4, 5].map(() => svgEl("circle", { r: 3, fill: "#ffd0cc", opacity: 0 }, fxG));

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");
        const flip = (g, hx, sx) => g.setAttribute("transform", `translate(${r1(hx)} 0) scale(${sx.toFixed(3)} 1) translate(${r1(-hx)} 0)`);

        // ---------- per-frame render ----------
        function render(t) {
          const hx = heroX(t);
          flip(figL.g, hx, sxH(t));
          flip(figR.g, RX, sxR(t));
          drawFig(figL, livePose(heroRaw, t, 0.4), 1);
          drawFig(figR, livePose(partRaw, t, 2.1), 1);
          // the thread: thins and frays each day, then holds again when they touch
          const day = 1 + Math.floor(29 * win(t, 0.4, 7.0));
          const dd = (day - 1) / 29;
          const heal = win(t, TOUCH[0], TOUCH[0] + 0.8);
          const w = lerp(lerp(7, 1.6, dd), 7, heal);
          const x0 = hx + 8, x1 = RX - 8, gap = x1 - x0;
          const sag = 34 + 0.35 * gap;
          const d = `M${r1(x0)} 392 Q${r1((x0 + x1) / 2)} ${r1(392 + sag * 2)} ${r1(x1)} 392`;
          thread.setAttribute("d", d);
          thread.setAttribute("stroke-width", r1(w));
          thread.setAttribute("stroke-dasharray", dd > 0.55 && heal < 0.5 ? `${r1(18 - 10 * dd)} ${r1(4 + 12 * dd)}` : "none");
          thread.setAttribute("opacity", (lerp(1, 0.55, dd * (1 - heal))).toFixed(3));
          thGlow.setAttribute("d", d);
          thGlow.setAttribute("stroke-width", r1(w * 3));
          thGlow.setAttribute("opacity", (0.7 * heal * (0.85 + 0.15 * Math.sin(t * 6))).toFixed(3));
          spark.forEach((c, i) => {
            const a = (t - TOUCH[0] - 0.4) / 0.9;
            const on = a > 0 && a < 1;
            c.setAttribute("opacity", on ? (1 - a).toFixed(3) : 0);
            c.setAttribute("cx", r1((x0 + x1) / 2 + (i - 2.5) * 22));
            c.setAttribute("cy", r1(392 + sag * 1.0 - 20 * a * (1 + (i % 3))));
          });
          E("num").textContent = pad(day);
          typed("h1", "NOBODY WINS THE SILENCE.", t, 9.9, 26);
          typed("h2", "SOMEONE JUST TURNS FIRST.", t, 11.0, 26);
        }
