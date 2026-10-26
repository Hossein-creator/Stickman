        // ---------- scene: men sit at the foot of a cliff. Nobody throws a rope. One carves steps and climbs ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const beams = E("beams");
        const backG = E("back");
        const wallG = svgEl("g", {}, W);
        const stepG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const WX = 520, RISE = 90, NSTEP = 8, TOPY = FL - RISE * (NSTEP + 1), HX = 496;
        const T0 = 1.0, PER = 1.0, T_TOP = T0 + NSTEP * PER;     // 9.0

        // light from above the cliff
        const topBeam = svgEl("polygon", { points: `560,-1400 820,-1400 900,${TOPY} 520,${TOPY}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.55 }, beams);
        svgEl("polygon", { points: `150,-400 330,-400 460,600 40,600`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.12 }, beams);
        const topPool = svgEl("ellipse", { cx: 700, cy: TOPY, rx: 260, ry: 40, fill: "url(#topGlow)" }, backG);
        // the cliff
        svgEl("rect", { x: WX, y: TOPY, width: 700, height: FL - TOPY, fill: "url(#rock)", stroke: "#000", "stroke-width": 6 }, wallG);
        for (let i = 0; i < 26; i++) {
          const y = TOPY + 20 + rnd() * (FL - TOPY - 40), x = WX + 20 + rnd() * 380;
          svgEl("path", { d: `M${r1(x)} ${r1(y)} l${r1(10 + rnd() * 30)} ${r1(rnd() * 14 - 7)} l${r1(rnd() * 20)} ${r1(10 + rnd() * 12)}`, fill: "none", stroke: "#1a1a1a", "stroke-width": 3 }, wallG);
        }
        svgEl("rect", { x: WX, y: TOPY - 4, width: 700, height: 8, fill: "#e8e8e8" }, wallG);
        const lvl = (k) => FL - RISE * k;
        // steps grow out of the wall as he carves them
        const steps = [];
        for (let k = 1; k <= NSTEP; k++) steps.push(svgEl("rect", { x: WX, y: lvl(k), width: 0, height: 14, rx: 3, fill: "#8a8a8a", stroke: "#000", "stroke-width": 4 }, stepG));
        const chips = [];
        for (let i = 0; i < 8; i++) chips.push(svgEl("circle", { r: 3, fill: "#d8d8d8" }, fxG));

        // ---------- crowd at the foot of the cliff ----------
        const CX = [30, 120, 210, 300, 395];
        const crowd = CX.map((x, i) => {
          const box = svgEl("g", {}, figG);
          return { x, box, parts: makeFig(box, "#8a8a8a", "#6e6e6e", false, "c" + i) };
        });
        const hero = makeFig(figG, "#ffffff", "#dedede", true, "hero");
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const mix = (a, b, p) => { const v = Math.round(lerp(a, b, p)); return `rgb(${v},${v},${v})`; };

        const floorSit = (x, f, look) => base({ hx: x, hy: FL - 24, torso: 20 - 14 * look, head: 26 - 46 * look, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, ash: 30, ael: 30, aw: 1, atx: x + f * 60, aty: FL - 92, bsh: 20, bel: 30, bw: 1, btx: x + f * 52, bty: FL - 88 });
        const legH = Math.sqrt(LEG * LEG - 15 * 15);
        // one carve-and-climb cycle from level k to k+1
        function climbPose(x, k, q, f) {
          const L0 = lvl(k), L1 = lvl(k + 1);
          const s = standOn(x, f, L0);
          if (q < 0.55) {
            // two strikes on the wall at thigh height
            const c = (q / 0.275) % 1, hit = Math.sin(Math.PI * Math.min(1, c / 0.6));
            s.torso = 10 + 16 * hit; s.head = 10 + 8 * hit;
            s.aw = 1; s.atx = lerp(x - f * 10, WX - 8, hit); s.aty = lerp(L0 - 250, L0 - 100, hit);
            s.bw = 1; s.btx = WX - 6; s.bty = L0 - 190;
            return s;
          }
          const a = win(q, 0.55, 0.75), h = win(q, 0.62, 0.92), b = win(q, 0.75, 0.95);
          s.ax = x + f * 15; s.ay = lerp(L0, L1, a) - Math.sin(Math.PI * a) * 30;
          s.bx = x - f * 15; s.by = lerp(L0, L1, b) - Math.sin(Math.PI * b) * 26;
          s.hy = lerp(L0, L1, h) - legH + 10 * Math.sin(Math.PI * h);
          s.torso = 12 - 6 * h; s.head = -6;
          s.aw = 1; s.atx = WX - 6; s.aty = lerp(L0 - 230, L1 - 230, h);
          s.bw = 1; s.btx = WX - 4; s.bty = lerp(L0 - 180, L1 - 180, h);
          return s;
        }
        function heroRaw(t) {
          if (t < T0) { const s = standOn(HX, 1, FL); s.head = -28 * win(t, 0.2, 0.7); return s; }
          if (t < T_TOP) { const k = Math.floor((t - T0) / PER); return climbPose(HX, k, (t - T0 - k * PER) / PER, 1); }
          // last pull onto the top, step into the light, then look down and reach
          const L0 = lvl(NSTEP);
          const p = win(t, T_TOP, T_TOP + 0.7);
          if (t < T_TOP + 0.8) {
            const s = standOn(lerp(HX, 600, p), 1, lerp(L0, TOPY, Math.min(1, p * 1.4)));
            s.torso = 18 * Math.sin(Math.PI * p); s.head = -10;
            return s;
          }
          const turn = win(t, 10.6, 10.9), reach = win(t, 11.0, 11.4);
          const s = standOn(600, 1, TOPY);
          s.head = -18 * (1 - turn) + 34 * turn; s.torso = 3 + 22 * reach;
          s.aw = reach; s.atx = 520; s.aty = TOPY - 40 + 60 * reach;
          s.ash = lerp(8, 30, 1 - turn); s.bsh = 140 * (1 - turn) * win(t, 9.9, 10.2);
          return s;
        }
        const heroF = (t) => (t < 10.75 ? 1 : -1);
        // the second man: stands up, walks to the wall, starts climbing the same steps
        const T2 = 10.0;
        function secondRaw(t) {
          const x0 = CX[4];
          if (t < T2) return floorSit(x0, 1, win(t, 4.0, 5.0));
          if (t < T2 + 0.5) return mixPose(floorSit(x0, 1, 1), standOn(x0, 1, FL), win(t, T2, T2 + 0.5));
          if (t < T2 + 1.1) {
            const q = win(t, T2 + 0.5, T2 + 1.1), hx = lerp(x0, HX, q), u = hx - x0, ST = 2 * (HX - x0);
            const p = u / ST, fr = (v) => v - Math.floor(v);
            const feet = [0, 0.5].map((o) => { const qq = fr(p + o + 1e-6); if (qq < 0.5) return [hx + ST * (0.25 - qq), FL]; const s2 = (qq - 0.5) / 0.5; return [hx + ST * (-0.25 + 0.5 * ease(s2)), FL - Math.sin(Math.PI * s2) * 16]; });
            return base({ hx, hy: FL - Math.sqrt(LEG * LEG - (ST * 0.25) ** 2) * 0.98, torso: 6, head: -10, ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1] });
          }
          const tt = t - T2 - 1.2;
          if (tt < 0) return standOn(HX, 1, FL);
          const k = Math.min(1, Math.floor(tt / 0.8));
          const q = clamp((tt - k * 0.8) / 0.8, 0, 1);
          return climbPose(HX, k, 0.55 + 0.45 * q, 1);
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
          const z = win(t, 1.6, 10.0);
          const s = lerp(1.55, 0.94, z), wy = 600, sy = lerp(1480, 1460, z);
          // follow him up while he climbs, then settle on the wide shot
          const hy = t < T0 ? FL : t < T_TOP ? lvl(Math.min(NSTEP, (t - T0) / PER)) : TOPY;
          const follow = lerp(0, (FL - hy) * 0.55, 1 - win(t, 9.2, 10.4)) * (1 - z * 0.3);
          cam.setAttribute("transform", `translate(540 ${r1(sy + follow * s)}) scale(${s.toFixed(4)}) translate(-400 ${r1(-wy)})`);

          // steps appear on the strikes
          steps.forEach((st, i) => {
            const tc = T0 + i * PER;
            const g = win(t, tc + 0.1, tc + 0.5);
            st.setAttribute("x", r1(WX - 44 * g)); st.setAttribute("width", r1(44 * g + 2));
          });
          // rock chips on each strike
          const k = Math.floor((t - T0) / PER), q = (t - T0 - k * PER) / PER;
          chips.forEach((c, i) => {
            const hitT = (i % 2) * 0.275 + 0.165, dt = q - hitT;
            const on = t > T0 && t < T_TOP && dt > 0 && dt < 0.2;
            c.setAttribute("cx", r1(WX - 10 - dt * 300 * (0.5 + (i % 4) * 0.2)));
            c.setAttribute("cy", r1(lvl(k) - 100 - dt * 200 + dt * dt * 3000 + (i % 3) * 6));
            c.setAttribute("opacity", on ? 1 : 0);
          });

          drawFig(hero, livePose(heroRaw, t, 0.3), heroF(t));
          crowd.forEach((c, i) => {
            if (i === 4) {
              drawFig(c.parts, livePose(secondRaw, t, 2.2), 1);
              const w = win(t, T2 + 0.3, T2 + 2.4);
              tint(c.parts, mix(138, 255, w), mix(110, 222, w));
              return;
            }
            const look = win(t, 5.5 + i * 0.4, 6.2 + i * 0.4) * (i % 2 ? 1 : 0.4);
            drawFig(c.parts, livePose((tt) => floorSit(c.x, i === 0 ? -1 : 1, look), t, i), i === 0 ? -1 : 1);
          });
          topBeam.setAttribute("opacity", (0.45 + 0.25 * win(t, T_TOP, T_TOP + 0.8)).toFixed(3));
          topPool.setAttribute("opacity", (0.7 + 0.3 * win(t, T_TOP, T_TOP + 0.8)).toFixed(3));

          typed("h1", "NOBODY THREW HIM A ROPE.", t, 0.4, 24);
          typed("h2", "SO HE CARVED HIS OWN STEPS.", t, 10.0, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 9.8, 10.2)).toFixed(3)})`;
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
