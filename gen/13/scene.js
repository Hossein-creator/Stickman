        // ---------- scene: nothing shows above the soil for 89 days while the roots grow underneath ----------
        const W = E("world");
        const SOILX0 = 330, SOILX1 = 500, MX = 415;
        const soilG = svgEl("g", {}, W.parentNode);
        svgEl("rect", { x: SOILX0, y: FL, width: SOILX1 - SOILX0, height: 140, fill: "#241a12", stroke: "#000", "stroke-width": 3 }, soilG);
        svgEl("rect", { x: SOILX0, y: FL, width: SOILX1 - SOILX0, height: 8, fill: "#3a2b1c" }, soilG);
        [[350, 650], [372, 700], [455, 668], [478, 715], [395, 735], [430, 700], [490, 665]].forEach(([x, y]) => svgEl("circle", { cx: x, cy: y, r: 3, fill: "#3a2b1c" }, soilG));
        const rootsG = svgEl("g", {}, W.parentNode);
        const seedEl = svgEl("ellipse", { cx: MX, cy: 646, rx: 9, ry: 6, fill: "#e8d9b0", stroke: "#000", "stroke-width": 2 }, rootsG);
        const mound = svgEl("path", { d: `M${MX - 34} ${FL} Q${MX} ${FL - 22} ${MX + 34} ${FL} Z`, fill: "#3a2b1c", stroke: "#000", "stroke-width": 3 }, W);
        // roots: main root + branches, drawn as a growing length
        const ROOTS = [
          [[MX, 650], [MX - 4, 672], [MX + 3, 696], [MX - 2, 722], [MX + 2, 742]],
          [[MX - 3, 668], [MX - 26, 684], [MX - 44, 704], [MX - 60, 716]],
          [[MX + 1, 684], [MX + 24, 698], [MX + 46, 716], [MX + 62, 724]],
          [[MX - 2, 708], [MX - 20, 724], [MX - 30, 738]],
          [[MX + 2, 716], [MX + 22, 730], [MX + 34, 742]],
        ];
        const ROOT_AT = [0, 0.18, 0.34, 0.52, 0.66]; // when each root starts (0..1 of the growth)
        const rootPaths = ROOTS.map((_, i) => svgEl("path", { fill: "none", stroke: "#f2eadb", "stroke-width": i ? 3 : 4.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, rootsG));
        const plantG = svgEl("g", {}, W);
        const stem = svgEl("path", { fill: "none", stroke: "#ffffff", "stroke-width": 9, "stroke-linecap": "round" }, plantG);
        const stemGlow = svgEl("path", { fill: "none", stroke: "#ffffff", "stroke-width": 16, "stroke-linecap": "round", filter: "url(#blur)", opacity: 0.5 }, plantG);
        const leaves = [0, 1, 2, 3, 4, 5].map(() => svgEl("path", { fill: "#ffffff", stroke: "#000", "stroke-width": 2.5 }, plantG));
        const figG = svgEl("g", {}, W);
        const can = svgEl("g", {}, W);
        svgEl("path", { d: "M-22 -14 L18 -14 L22 18 L-26 18 Z", fill: "#a9a9a9", stroke: "#000", "stroke-width": 3 }, can);
        svgEl("path", { d: "M18 4 L48 -18 L52 -12 L24 14 Z", fill: "#a9a9a9", stroke: "#000", "stroke-width": 3 }, can);
        svgEl("path", { d: "M-22 -8 Q-44 -8 -36 14", fill: "none", stroke: "#000", "stroke-width": 7, "stroke-linecap": "round" }, can);
        svgEl("path", { d: "M-22 -8 Q-44 -8 -36 14", fill: "none", stroke: "#a9a9a9", "stroke-width": 3, "stroke-linecap": "round" }, can);
        const drops = [0, 1, 2, 3, 4, 5, 6, 7].map(() => svgEl("circle", { r: 3.5, fill: "#bfe3ff", opacity: 0 }, W));
        const LBL = svgEl("text", { "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 18, "letter-spacing": 3, fill: "#9a9a9a", opacity: 0 }, W.parentNode);
        LBL.textContent = "NOTHING.";
        const env = (p, a, b, c, d) => ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));
        const POUR = [1.0, 2.3, 3.6, 4.9, 6.2, 7.5];
        const SPROUT = [8.4, 9.5];
        const HX = 262;
        const pourAt = (t) => POUR.reduce((m, tp) => Math.max(m, env(t, tp, tp + 0.35, tp + 0.9, tp + 1.2)), 0);
        const doubt = (t) => env(t, 3.8, 4.8, 5.8, 6.8);
        function heroRaw(t) {
          const pr = pourAt(t), cheer = win(t, 9.0, 9.6);
          const s = standOn(HX, 1, FL);
          return {
            ...s, torso: 3 + 5 * pr - 5 * doubt(t) - 3 * cheer, head: 0 + 14 * doubt(t) - 6 * cheer,
            ash: 8, ael: 12, aw: pr, atx: 372, aty: 452,
            bsh: lerp(-4, 150, cheer), bel: lerp(10, 12, cheer), bw: 0, btx: 0, bty: 0,
          };
        }
        const hero = makeFig(figG, "#ffffff", "#e2e2e2", true, "hero");

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");
        const growth = (t) => clamp((t - 0.8) / 7.7, 0, 1);

        // ---------- per-frame render ----------
        function render(t) {
          const j = drawFig(hero, livePose(heroRaw, t, 0.4), 1);
          // watering can follows the front hand, tipping while he pours
          const pr = pourAt(t), hnd = j.hands[0];
          can.setAttribute("transform", `translate(${r1(hnd[0] + 4)} ${r1(hnd[1] - 8)}) rotate(${r1(lerp(0, 38, pr))})`);
          const spout = [hnd[0] + 4 + Math.cos(rad(38 * pr - 18)) * 48, hnd[1] - 8 + Math.sin(rad(38 * pr - 18)) * 48 - 10];
          drops.forEach((d, i) => {
            const tp = POUR.find((x) => t >= x + 0.3 && t < x + 1.1);
            if (tp === undefined) { d.setAttribute("opacity", 0); return; }
            const a = (((t - tp - 0.3) * 1.6 + i / drops.length) % 1);
            d.setAttribute("cx", r1(lerp(spout[0], MX - 6 + (i % 3) * 6, a)));
            d.setAttribute("cy", r1(lerp(spout[1], FL - 8, a * a)));
            d.setAttribute("opacity", (1 - a * 0.4).toFixed(3));
          });
          // roots grow slowly and steadily, underground
          const g = growth(t);
          rootPaths.forEach((rp, i) => {
            const pts = ROOTS[i], gl = clamp((g - ROOT_AT[i]) / (1 - ROOT_AT[i]) * 1.1, 0, 1) * (pts.length - 1);
            const seg = Math.floor(gl), fr = gl - seg;
            const out = pts.slice(0, seg + 1);
            if (seg < pts.length - 1) out.push([lerp(pts[seg][0], pts[seg + 1][0], fr), lerp(pts[seg][1], pts[seg + 1][1], fr)]);
            rp.setAttribute("d", out.length > 1 ? P(out) : "M0 0");
            rp.setAttribute("opacity", out.length > 1 ? 1 : 0);
          });
          seedEl.setAttribute("opacity", 1 - win(t, 8.4, 8.8));
          // the shoot breaks through at the end
          const sp = clamp((t - SPROUT[0]) / (SPROUT[1] - SPROUT[0]), 0, 1), rise = backOut(sp);
          const topY = FL - 14 - 270 * rise;
          const sway = Math.sin(t * 2.2) * 3 * sp;
          const sd = `M${MX} ${FL - 8} Q${MX + 10 + sway} ${r1((FL + topY) / 2)} ${r1(MX + sway * 2)} ${r1(topY)}`;
          stem.setAttribute("d", sd);
          stem.setAttribute("opacity", sp > 0 ? 1 : 0);
          stemGlow.setAttribute("d", sd);
          stemGlow.setAttribute("opacity", sp > 0 ? 0.5 * sp : 0);
          leaves.forEach((lf, i) => {
            const lv = clamp((sp - 0.3 - i * 0.09) / 0.4, 0, 1), side = i % 2 ? 1 : -1;
            const ly = FL - 14 - (60 + i * 38) * rise;
            const L = 46 * backOut(lv);
            lf.setAttribute("d", lv > 0 ? `M${MX} ${r1(ly)} Q${MX + side * L * 0.55} ${r1(ly - L * 0.7)} ${MX + side * L} ${r1(ly - L * 0.25)} Q${MX + side * L * 0.5} ${r1(ly + L * 0.1)} ${MX} ${r1(ly)} Z` : "M0 0");
          });
          mound.setAttribute("opacity", 1);
          // doubt: a grey label above the soil
          const nl = env(t, 3.4, 3.9, 5.6, 6.2);
          LBL.setAttribute("x", MX);
          LBL.setAttribute("y", r1(FL - 52));
          LBL.setAttribute("opacity", nl.toFixed(3));

          const day = 1 + Math.floor(89 * g);
          E("num").textContent = pad(day);
          typed("h1", "IT GREW THE WHOLE TIME.", t, 9.9, 26);
          typed("h2", "YOU JUST COULDN'T SEE IT.", t, 11.0, 26);
        }
