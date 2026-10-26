        // ---------- scene: a door marked GOAL, a man, a phone that keeps pulling him back ----------
        const beams = E("beams");
        const beam = svgEl("polygon", { points: "190,-90 290,-90 380,600 100,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.35 }, beams);
        const W = E("world");
        const doorG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);

        // the door (its label lives outside the reflected world so it is not mirrored)
        const DX = 535, DW = 110, DH = 360;
        const doorPool = svgEl("ellipse", { cx: DX + DW / 2 - 60, cy: FL, rx: 160, ry: 26, fill: "url(#warmPool)", opacity: 0.4 }, doorG);
        const doorHalo = svgEl("rect", { x: DX - 30, y: FL - DH - 30, width: DW + 60, height: DH + 30, rx: 20, fill: "#ffe2a0", filter: "url(#soft)", opacity: 0.25 }, doorG);
        const doorIn = svgEl("rect", { x: DX, y: FL - DH, width: DW, height: DH, fill: "url(#doorLight)", opacity: 0.55 }, doorG);
        svgEl("rect", { x: DX - 7, y: FL - DH - 7, width: DW + 14, height: DH + 7, fill: "none", stroke: "#000", "stroke-width": 16 }, doorG);
        svgEl("rect", { x: DX - 7, y: FL - DH - 7, width: DW + 14, height: DH + 7, fill: "none", stroke: "#cfcfcf", "stroke-width": 8 }, doorG);
        const doorRay = svgEl("polygon", { points: `${DX},${FL - DH} ${DX},${FL} ${DX - 260},${FL + 40} ${DX - 220},${FL - DH - 60}`, fill: "#ffe2a0", filter: "url(#soft)", opacity: 0.08 }, doorG);
        const goal = svgEl("text", { x: DX + DW / 2, y: FL - DH - 22, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 19, fill: "#f0e0b8", "letter-spacing": 4 }, W.parentNode);
        goal.textContent = "GOAL";

        // ---------- the walk: forward, buzz, backward while staring at the phone ----------
        // stops land on half strides (x = 110 + 80 n) so both feet are planted
        const X0 = 110, STRIDE = 160;
        const K = [[0, 110], [0.3, 110], [1.6, 270], [2.7, 270], [3.25, 190], [3.4, 190], [4.4, 350], [5.5, 350], [6.0, 270], [6.05, 270], [6.6, 430], [7.4, 430], [9.0, 590], [DUR, 590]];
        const hipX = (t) => {
          for (let i = 1; i < K.length; i++) if (t < K[i][0]) return lerp(K[i - 1][1], K[i][1], ease((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])));
          return K[K.length - 1][1];
        };
        const BUZZ = [1.62, 4.42, 6.62];
        const COUNT = [3, 12, 37];
        const LATE = [8.1, 8.9, 9.7, 10.6]; // the phone on the floor keeps buzzing, ignored
        const LCOUNT = [52, 64, 81, 99];
        const look = (t) => win(t, 1.62, 1.9) * (1 - win(t, 3.25, 3.55)) + win(t, 4.42, 4.7) * (1 - win(t, 6.0, 6.3)) + win(t, 6.62, 6.8) * (1 - win(t, 6.92, 7.05));
        const THROW = 7.15, LANDP = 7.75;
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        function manRaw(t) {
          const hx = hipX(t), p = (hx - X0) / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            if (q < 0.5) return [hx + STRIDE * (0.25 - q), FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)), FL - Math.sin(Math.PI * s) * 18];
          });
          const lk = clamp(look(t), 0, 1);
          const sw = Math.sin(Math.PI * 2 * p) * (1 - lk);
          const bob = 4 * Math.abs(Math.sin(Math.PI * 2 * p));
          const wind = win(t, 6.92, 7.1) * (1 - win(t, 7.12, 7.35));
          const free = win(t, 7.4, 8.0);
          const legH = Math.sqrt(LEG * LEG - (STRIDE * 0.25) ** 2);
          return base({
            hx, hy: lerp(stand, FL - legH, 0.6) + bob + 3 * lk, torso: 4 + 8 * lk - 8 * wind - 3 * free, head: 30 * lk - 4 * free,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            ash: 8 + 22 * sw - 80 * wind, ael: 14 + 30 * wind, aw: lk, atx: hx + 46, aty: stand - 62,
            bsh: -4 - 22 * sw, bel: 12, bw: lk, btx: hx + 40, bty: stand - 58,
          });
        }
        const man = makeFig(figG, "#ffffff", "#e2e2e2", true, "man");
        // phone: screen + glow + red badge
        const phGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0 }, fxG);
        const ph = svgEl("g", {}, fxG);
        svgEl("rect", { x: -9, y: -16, width: 18, height: 32, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 2 }, ph);
        const scr = svgEl("rect", { x: -6.5, y: -12.5, width: 13, height: 25, rx: 2, fill: "#2a3a55" }, ph);
        const badgeG = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { r: 14, fill: "#e0322b", stroke: "#000", "stroke-width": 2.5 }, badgeG);
        const badgeT = svgEl("text", { y: 5, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 13, fill: "#fff" }, badgeG);

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");

        // ---------- per-frame render ----------
        function render(t) {
          const j = drawFig(man, livePose(manRaw, t, 0.3), 1);
          // phone: in his hand until the throw, then an arc back to the floor where it buzzes alone
          let pp, rot;
          const hand = j.hands[0];
          if (t < THROW) {
            pp = [hand[0] + 4, hand[1] - 6];
            rot = 20 * (1 - look(t));
          } else {
            const q = clamp((t - THROW) / (LANDP - THROW), 0, 1);
            const start = [360, 300];
            pp = [lerp(start[0], 110, q), lerp(start[1], FL - 6, q) - Math.sin(Math.PI * q) * 140];
            rot = q < 1 ? -720 * q : 90;
          }
          const allB = BUZZ.concat(LATE);
          const bz = allB.reduce((v, b) => v + (t > b && t < b + 0.5 ? 1 : 0), 0);
          const shake = bz ? Math.sin(t * 90) * 6 : 0;
          ph.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])}) rotate(${r1(rot + shake)})`);
          const lit = Math.max(clamp(look(t), 0, 1), bz ? 1 : 0, t > LANDP ? 0.35 : 0);
          scr.setAttribute("fill", lit > 0.5 ? "#9cc4ff" : "#2a3a55");
          phGlow.setAttribute("cx", r1(pp[0]));
          phGlow.setAttribute("cy", r1(pp[1]));
          phGlow.setAttribute("opacity", (lit * (0.8 + 0.2 * Math.sin(t * 9))).toFixed(3));

          // badge pops up with each buzz
          let n = 0, bt = -9;
          BUZZ.forEach((b, i) => { if (t >= b) { n = COUNT[i]; bt = b; } });
          LATE.forEach((b, i) => { if (t >= b) { n = LCOUNT[i]; bt = b; } });
          const ba = (t - bt) / 0.9;
          badgeG.setAttribute("opacity", ba >= 0 && ba < 1 ? (1 - ease((ba - 0.6) / 0.4)).toFixed(3) : 0);
          badgeG.setAttribute("transform", `translate(${r1(pp[0] + 16)} ${r1(pp[1] - 28 - 10 * ease(ba))}) scale(${backOut(ba / 0.3).toFixed(3)})`);
          badgeT.textContent = n;
          E("num").textContent = pad(n);
          E("num").style.color = t > LATE[0] ? "#7a7a7a" : "#ffffff";

          // the door brightens as he gets close and opens wide when he steps in
          const near = clamp((hipX(t) - 110) / 480, 0, 1);
          const inn = win(t, 8.6, 9.6);
          doorIn.setAttribute("opacity", (0.45 + 0.45 * near * near + 0.1 * inn).toFixed(3));
          doorHalo.setAttribute("opacity", (0.2 + 0.5 * inn).toFixed(3));
          doorRay.setAttribute("opacity", (0.06 + 0.3 * inn).toFixed(3));
          doorPool.setAttribute("opacity", (0.35 + 0.6 * inn).toFixed(3));
          beam.setAttribute("points", `${r1(hipX(t) - 50)},-90 ${r1(hipX(t) + 50)},-90 ${r1(hipX(t) + 140)},600 ${r1(hipX(t) - 140)},600`);
          beam.setAttribute("opacity", (0.35 * (1 - inn)).toFixed(3));

          typed("h1", "YOU'RE NOT LAZY.", t, 9.8, 22);
          typed("h2", "YOU'RE DISTRACTED.", t, 10.8, 22);
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
