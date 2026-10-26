        // ---------- scene: a couple, and a wall of small words that grows between them ----------
        const beams = E("beams");
        const beamL = svgEl("polygon", { points: "240,-90 320,-90 380,600 180,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.45 }, beams);
        const beamR = svgEl("polygon", { points: "480,-90 560,-90 620,600 420,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.45 }, beams);
        const beamC = svgEl("polygon", { points: "370,-90 430,-90 470,600 330,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.5 }, beams);
        const W = E("world");
        const heartG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const wallG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const HEART = "M0 6 C0 -2 -10 -6 -14 0 C-18 6 -10 14 0 22 C10 14 18 6 14 0 C10 -6 0 -2 0 6 Z";
        const heartGlow = svgEl("circle", { r: 46, fill: "#ff3b30", filter: "url(#soft)", opacity: 0.5 }, heartG);
        const heart = svgEl("path", { d: HEART, fill: "#e0322b", stroke: "#000", "stroke-width": 2.5 }, heartG);

        // bricks: one small word each, dropped one after another
        const WORDS = ["NOT NOW", "I'M BUSY", "FORGOT", "LATER", "WHATEVER", "NO TIME", "FINE.", "SILENCE"];
        const DROP = [1.5, 2.4, 3.3, 4.2, 5.1, 6.0, 6.9, 7.8];
        const BH = 42, BWID = 152, FALL = 0.38;
        const OFF = [0, 7, -5, 4, -7, 5, -3, 6];
        const bricks = WORDS.map((w, k) => {
          const g = svgEl("g", { opacity: 0 }, wallG);
          svgEl("rect", { x: -BWID / 2, y: -BH / 2, width: BWID, height: BH, rx: 5, fill: k % 2 ? "#34343a" : "#3c3c43", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: -BWID / 2 + 5, y: -BH / 2 + 4, width: BWID - 10, height: 4, rx: 2, fill: "#ffffff", opacity: 0.08 }, g);
          const tx = svgEl("text", { x: 0, y: 6, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 17, fill: "#e8e8e8", "letter-spacing": 1.5 }, g);
          tx.textContent = w;
          return g;
        });
        const dust = DROP.map(() => [-1, 1].map(() => svgEl("ellipse", { rx: 10, ry: 6, fill: "url(#dustG)", opacity: 0 }, fxG)));
        const landed = (t) => DROP.filter((d) => t >= d + FALL).length;

        // ---------- the two figures (she has a ponytail) ----------
        const man = makeFig(figG, "#ffffff", "#e2e2e2", true, "man");
        const wom = makeFig(figG, "#ffffff", "#e2e2e2", true, "wom");
        const tail = svgEl("ellipse", { rx: 12, ry: 21, fill: "#ffffff", stroke: "#000", "stroke-width": 5 }, wom.g);
        wom.g.insertBefore(tail, wom.head);
        const flinch = (t) => DROP.reduce((v, d) => v + Math.exp(-(((t - d - FALL - 0.12) / 0.14) ** 2)), 0);
        function person(t, x0, f) {
          const hold = 1 - win(t, 1.15, 1.6);
          const slump = win(t, 2.5, 8.6);
          // close while holding hands, step back 50 when they let go, 30 more at the end
          const back = win(t, 8.5, 9.3);
          const hx = x0 - f * 50 * win(t, 1.2, 1.9) - f * 30 * back;
          const lf = (a) => Math.sin(Math.PI * clamp((t - a) / 0.4, 0, 1));
          const lift1 = lf(1.2) + lf(8.5), lift2 = lf(1.5) + lf(8.85);
          const ax = x0 + f * 15 - f * 50 * win(t, 1.2, 1.6) - f * 30 * win(t, 8.5, 8.9);
          const bx = x0 - f * 15 - f * 50 * win(t, 1.5, 1.9) - f * 30 * win(t, 8.85, 9.25);
          const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
          return base({
            hx, hy: stand + 5 * slump + 3 * back, torso: 10 * hold + 2 - 4 * flinch(t) + 7 * slump, head: -4 * hold + 18 * slump - 4 * back,
            ax, ay: FL - 16 * lift1, bx, by: FL - 16 * lift2,
            ash: lerp(8, 2, slump), ael: lerp(12, 4, slump), aw: hold, atx: 400 - f * 4, aty: 410,
            bsh: lerp(-4, 0, slump), bel: lerp(10, 4, slump),
          });
        }
        const manRaw = (t) => person(t, 300, 1);
        const womRaw = (t) => person(t, 500, -1);

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");
        const hexLerp = (a, b, p) => {
          const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
          return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(p, 0, 1))).toString(16).padStart(2, "0")).join("");
        };

        // ---------- per-frame render ----------
        function render(t) {
          drawFig(man, livePose(manRaw, t, 0.3), 1);
          const jw = drawFig(wom, livePose(womRaw, t, 1.9), -1);
          tail.setAttribute("cx", r1(jw.head[0] + 27));
          tail.setAttribute("cy", r1(jw.head[1] + 8));
          tail.setAttribute("transform", `rotate(-20 ${r1(jw.head[0] + 27)} ${r1(jw.head[1] + 8)})`);

          const n = landed(t);
          // heart floats over the held hands, beats, then fades behind the wall
          const fade = win(t, 4.2, 6.6);
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7.5)) * (1 - fade);
          const hy = 352 - 6 * Math.sin(t * 1.6);
          heart.setAttribute("transform", `translate(400 ${r1(hy - 16)}) scale(${(1.7 * beat).toFixed(3)})`);
          heart.setAttribute("fill", hexLerp("#e0322b", "#3a1616", fade));
          heartGlow.setAttribute("cx", 400);
          heartGlow.setAttribute("cy", r1(hy));
          heartGlow.setAttribute("opacity", (0.5 * (1 - fade)).toFixed(3));

          bricks.forEach((g, k) => {
            const d = DROP[k];
            if (t < d) return g.setAttribute("opacity", 0);
            g.setAttribute("opacity", 1);
            const yEnd = FL - BH / 2 - BH * k;
            const q = clamp((t - d) / FALL, 0, 1);
            let y = lerp(-420, yEnd, q * q);
            const b = (t - d - FALL) / 0.3;
            if (b > 0 && b < 1) y -= Math.sin(Math.PI * b) * 7;
            const rot = (1 - q) * (k % 2 ? 9 : -9);
            g.setAttribute("transform", `translate(${400 + OFF[k]} ${r1(y)}) rotate(${r1(rot)})`);
            const da = (t - d - FALL) / 0.7;
            dust[k].forEach((c, j) => {
              const dir = j ? 1 : -1, e = ease(da);
              c.setAttribute("cx", r1(400 + OFF[k] + dir * (BWID / 2 + 30 * e)));
              c.setAttribute("cy", r1(yEnd + BH / 2 - 6 - 10 * e));
              c.setAttribute("rx", r1(12 + 30 * e));
              c.setAttribute("ry", r1(6 + 10 * e));
              c.setAttribute("opacity", da > 0 && da < 1 ? (0.6 * (1 - da)).toFixed(3) : 0);
            });
          });
          beamC.setAttribute("opacity", (0.5 * (1 - n / 8)).toFixed(3));
          const dim = 0.45 - 0.2 * win(t, 8.2, 9.4);
          beamL.setAttribute("opacity", dim.toFixed(3));
          beamR.setAttribute("opacity", dim.toFixed(3));

          E("num").textContent = pad(1 + Math.round((n * 7) / 8));
          typed("h1", "NOBODY BUILDS A WALL ON PURPOSE.", t, 9.8, 26);
          typed("h2", "IT'S ONE \"NOT NOW\" AT A TIME.", t, 11.0, 26);
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
