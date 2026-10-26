        // ---------- scene: the comfort zone is a pool of light that grows with every step out ----------
        const beams = E("beams");
        const beam = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0.6 }, beams);
        const W = E("world");
        const ringsG = svgEl("g", {}, W);
        const pool = svgEl("ellipse", { fill: "url(#pool)" }, ringsG);
        const oldRings = [0, 1, 2].map(() => svgEl("ellipse", { fill: "none", stroke: "#ffffff", "stroke-width": 2, "stroke-dasharray": "8 8", opacity: 0 }, ringsG));
        const ring = svgEl("ellipse", { fill: "none", stroke: "#ffffff", "stroke-width": 3 }, ringsG);
        const zoneTxt = svgEl("text", { "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 15, fill: "#d8d8d8", "letter-spacing": 3 }, ringsG);
        zoneTxt.textContent = "COMFORT ZONE";
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);

        // steps out: [start, end, hip x]; the circle grows and follows him after each one
        const STEPS = [[3.6, 4.3, 300], [5.0, 5.7, 388], [6.4, 7.1, 476]];
        const X0 = 220, STRIDE = 176;
        const ZONE = [[0, 70, 220], [4.3, 150, 290], [5.7, 232, 352], [7.1, 330, 400]]; // [time, radius, center x]
        const hipX = (t) => STEPS.reduce((x, [a, b, to], i) => lerp(x, to, ease((t - a) / (b - a))), X0);
        const zoneAt = (t) => {
          let r = ZONE[0][1], cx = ZONE[0][2];
          for (let i = 1; i < ZONE.length; i++) {
            const p = backOut((t - ZONE[i][0] + 0.1) / 0.6) * (t > ZONE[i][0] - 0.1 ? 1 : 0);
            r = lerp(r, ZONE[i][1], p);
            cx = lerp(cx, ZONE[i][2], clamp(p, 0, 1));
          }
          return { r, cx };
        };
        const frac = (v) => v - Math.floor(v);
        function heroRaw(t) {
          const hx = hipX(t), p = (hx - X0) / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + STRIDE * (0.25 - q) * 0.5, FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)) * 0.5, FL - Math.sin(Math.PI * s) * 22];
          });
          // hesitation: lifts the front foot toward the edge, then pulls it back
          const hes = env(t, 2.0, 2.4, 2.65, 3.05);
          feet[0] = [feet[0][0] + 34 * hes, feet[0][1] - 22 * hes];
          const fear = env(t, 2.5, 2.7, 2.9, 3.3);
          const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
          const proud = win(t, 7.3, 8.0);
          return base({
            hx: hx - 6 * fear, hy: stand + 4 * hes, torso: 4 + 6 * hes - 10 * fear - 3 * proud, head: -4 + 8 * fear - 6 * proud,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            ash: lerp(8, -20, fear) + 10 * proud, ael: 12, bsh: lerp(-4, 25, fear) - 8 * proud, bel: 10,
          });
        }
        const env = (p, a, b, c, d) => ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));
        const hero = makeFig(figG, "#ffffff", "#e2e2e2", true, "hero");
        const bang = svgEl("text", { "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 40, fill: "#ff3b30", opacity: 0 }, fxG);
        bang.textContent = "!";

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");

        // ---------- per-frame render ----------
        function render(t) {
          const j = drawFig(hero, livePose(heroRaw, t, 0.4), 1);
          const z = zoneAt(t);
          pool.setAttribute("cx", r1(z.cx));
          pool.setAttribute("cy", FL);
          pool.setAttribute("rx", r1(z.r * 1.15));
          pool.setAttribute("ry", r1(z.r * 0.26));
          ring.setAttribute("cx", r1(z.cx));
          ring.setAttribute("cy", FL);
          ring.setAttribute("rx", r1(z.r));
          ring.setAttribute("ry", r1(z.r * 0.2));
          ring.setAttribute("opacity", (0.85 - 0.4 * win(t, 7.3, 8.2)).toFixed(3));
          zoneTxt.setAttribute("x", r1(z.cx));
          zoneTxt.setAttribute("y", r1(FL + z.r * 0.2 + 22));
          zoneTxt.setAttribute("opacity", (1 - win(t, 7.3, 8.0) * 0.6).toFixed(3));
          ZONE.slice(0, 3).forEach(([tz, r, cx], i) => {
            const shown = t > ZONE[i + 1][0];
            oldRings[i].setAttribute("cx", cx);
            oldRings[i].setAttribute("cy", FL);
            oldRings[i].setAttribute("rx", r);
            oldRings[i].setAttribute("ry", r1(r * 0.2));
            oldRings[i].setAttribute("opacity", shown ? (0.35 * win(t, ZONE[i + 1][0], ZONE[i + 1][0] + 0.5)).toFixed(3) : 0);
          });
          const half = z.r * 0.9;
          beam.setAttribute("points", `${r1(z.cx - 40 - z.r * 0.15)},-90 ${r1(z.cx + 40 + z.r * 0.15)},-90 ${r1(z.cx + half)},600 ${r1(z.cx - half)},600`);
          beam.setAttribute("opacity", (0.5 + 0.35 * win(t, 4, 7.4)).toFixed(3));
          const fa = env(t, 2.5, 2.6, 3.0, 3.3);
          bang.setAttribute("x", r1(j.head[0] + 34));
          bang.setAttribute("y", r1(j.head[1] - 44));
          bang.setAttribute("opacity", fa.toFixed(3));

          const n = STEPS.filter(([a, b]) => t >= b - 0.1).length;
          E("num").textContent = pad(n);
          typed("h1", "YOUR COMFORT ZONE GROWS", t, 9.8, 26);
          typed("h2", "EVERY TIME YOU LEAVE IT.", t, 11.0, 26);
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
