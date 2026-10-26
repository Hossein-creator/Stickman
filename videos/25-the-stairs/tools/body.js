        // ---------- scene: one man polishes one perfect block; the other builds rough stairs up to a lit door ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const beams = E("beams");
        const backG = E("back");
        const stairG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const NB = 9, RUN = 50, RISE = 55, SBX = 500, T0 = 0.6, PER = 0.9;
        const TEND = T0 + NB * PER;                       // 8.7
        const lvl = (k) => FL - RISE * k;
        const px = (k) => (k === 0 ? 450 : SBX + RUN * (k - 1) + RUN / 2);

        // the lit door at the top of the stairs
        const DX = SBX + RUN * NB + 6, DY = lvl(NB);
        const doorBeam = svgEl("polygon", { points: `${DX + 10},-900 ${DX + 70},-900 ${DX + 140},${DY} ${DX - 60},${DY}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.4 }, beams);
        const doorHalo = svgEl("rect", { x: DX - 30, y: DY - 170, width: 130, height: 180, rx: 24, fill: "#fff6dc", filter: "url(#soft)", opacity: 0.35 }, backG);
        svgEl("rect", { x: DX, y: DY - 140, width: 70, height: 140, fill: "url(#doorL)", stroke: "#000", "stroke-width": 6 }, backG);
        svgEl("rect", { x: DX - 6, y: DY, width: 120, height: FL - DY, fill: "#1a1a1a", stroke: "#000", "stroke-width": 5 }, backG);
        const pBeam = svgEl("polygon", { points: "120,-400 240,-400 330,600 30,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);

        // rough stairs: every block a little crooked
        const blocks = [];
        for (let k = 1; k <= NB; k++) {
          const g = svgEl("g", {}, stairG);
          const x = SBX + RUN * (k - 1), tilt = ((k * 37) % 7) - 3;
          svgEl("rect", { x, y: lvl(k) + 4, width: RUN, height: RISE * k - 4, fill: "#2a2520", stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: x - 2, y: lvl(k), width: RUN + 4, height: 18, rx: 3, fill: "url(#wood)", stroke: "#000", "stroke-width": 4, transform: `rotate(${tilt} ${x + RUN / 2} ${lvl(k) + 9})` }, g);
          blocks.push({ g, x, k });
        }
        // the perfect block + red level
        const PB = 210;
        svgEl("rect", { x: PB, y: FL - 54, width: 70, height: 54, rx: 3, fill: "url(#wood)", stroke: "#000", "stroke-width": 5 }, stairG);
        const shine = svgEl("rect", { x: PB + 8, y: FL - 50, width: 18, height: 4, rx: 2, fill: "#fff", opacity: 0.7 }, stairG);
        const level = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -40, y: -10, width: 80, height: 12, rx: 3, fill: "#d62a2a", stroke: "#000", "stroke-width": 4 }, level);
        svgEl("rect", { x: -10, y: -8, width: 20, height: 8, rx: 3, fill: "#e8f6c0", stroke: "#000", "stroke-width": 2 }, level);
        const bubble = svgEl("circle", { cx: 0, cy: -4, r: 2.6, fill: "#2a2a2a" }, level);
        const dust = [];
        for (let i = 0; i < 6; i++) dust.push(svgEl("circle", { r: 2.4, fill: "#e0d2b2" }, fxG));

        const per = makeFig(figG, "#ffffff", "#dedede", true, "per");
        const act = makeFig(figG, "#ffffff", "#dedede", true, "act");
        const legH = Math.sqrt(LEG * LEG - 15 * 15);
        const LEVELS = [[2.0, 2.9], [5.0, 5.9], [8.0, 8.9], [11.0, 12.6]];
        const levelOn = (t) => LEVELS.some(([a, b]) => t > a && t < b);
        // perfectionist: kneels at the block and sands it, checks the level, shakes his head, sands again
        function perRaw(t) {
          const x = 150;
          const s = standOn(x, 1, FL);
          s.hy += 56; s.torso = 30; s.head = 18;
          s.ax = x + 40; s.bx = x - 30;
          const chk = LEVELS.reduce((v, [a, b]) => Math.max(v, win(t, a, a + 0.3) * (1 - win(t, b - 0.3, b))), 0);
          const sand = Math.sin(t * 14) * (1 - chk);
          s.aw = 1; s.atx = PB + 34 + 22 * sand; s.aty = FL - 58;
          s.bw = 1; s.btx = PB + 10 + 10 * sand; s.bty = FL - 56;
          // checking: hands off, leans in to read the level, shakes head
          s.atx = lerp(s.atx, PB + 30, chk); s.aty = lerp(s.aty, FL - 70, chk);
          s.head += chk * (10 + 14 * Math.sin(t * 9) * win(t % 3, 2.4, 2.6));
          s.torso += 8 * chk;
          return s;
        }
        // action taker: places a block, steps up, places the next one
        function actRaw(t) {
          if (t < T0) return standOn(px(0), 1, FL);
          if (t >= TEND) {
            const p = win(t, TEND + 0.2, TEND + 1.0);
            const s = standOn(lerp(px(NB), DX + 34, p), 1, lvl(NB));
            s.head = -10;
            return s;
          }
          const k = Math.floor((t - T0) / PER), q = (t - T0 - k * PER) / PER;
          const L0 = lvl(k), L1 = lvl(k + 1), X0 = px(k), X1 = px(k + 1);
          if (q < 0.45) {
            const b = Math.sin((Math.PI * q) / 0.45);
            const s = standOn(X0, 1, L0);
            s.torso = 8 + 34 * b; s.hy += 22 * b; s.head = 10 + 8 * b;
            s.aw = 1; s.atx = lerp(X0 + 30, X1 + 4, b); s.aty = lerp(L0 - 120, L1 + 6, b);
            s.bw = 1; s.btx = lerp(X0 + 20, X1 - 10, b); s.bty = lerp(L0 - 112, L1 + 10, b);
            return s;
          }
          const a = win(q, 0.45, 0.68), h = win(q, 0.55, 0.9), c = win(q, 0.68, 0.95);
          const s = standOn(lerp(X0, X1, h), 1, lerp(L0, L1, h));
          s.ax = lerp(X0 + 15, X1 + 15, a); s.ay = lerp(L0, L1, a) - Math.sin(Math.PI * a) * 26;
          s.bx = lerp(X0 - 15, X1 - 15, c); s.by = lerp(L0, L1, c) - Math.sin(Math.PI * c) * 22;
          s.hy = lerp(L0, L1, h) - legH + 6 * Math.sin(Math.PI * h);
          s.torso = 10 - 6 * h;
          return s;
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
          // camera: close on both, then follows the climb up and right, ending on the wide shot
          const z = win(t, 1.5, 9.4);
          const s = lerp(1.3, 1.0, z), cx = lerp(380, 560, z), sy = lerp(1400, 1520, z);
          cam.setAttribute("transform", `translate(540 ${r1(sy)}) scale(${s.toFixed(4)}) translate(${r1(-cx)} -600)`);

          // blocks pop in as he places them
          blocks.forEach((b) => {
            const tp = T0 + (b.k - 1) * PER + 0.2;
            const g = backOut(clamp((t - tp) / 0.25, 0, 1));
            b.g.setAttribute("opacity", t < tp ? 0 : 1);
            b.g.setAttribute("transform", `translate(${r1(b.x + RUN / 2)} ${lvl(b.k)}) scale(${g.toFixed(3)}) translate(${r1(-b.x - RUN / 2)} ${-lvl(b.k)})`);
          });
          drawFig(per, livePose(perRaw, t, 0.3), 1);
          const ja = drawFig(act, livePose(actRaw, t, 1.5), 1);
          act.g.setAttribute("opacity", (1 - win(t, TEND + 0.9, TEND + 1.4)).toFixed(3));
          const lo = levelOn(t);
          level.setAttribute("opacity", lo ? 1 : 0);
          level.setAttribute("transform", `translate(${PB + 35} ${FL - 54})`);
          bubble.setAttribute("cx", r1(6 + 2 * Math.sin(t * 3)));
          shine.setAttribute("opacity", (0.4 + 0.4 * Math.sin(t * 5)).toFixed(3));
          dust.forEach((d, i) => {
            const ph = (t * 2.5 + i / 6) % 1;
            d.setAttribute("cx", r1(PB + 20 + i * 8 + ph * 20));
            d.setAttribute("cy", r1(FL - 58 - ph * 30));
            d.setAttribute("opacity", lo ? 0 : (1 - ph).toFixed(3));
          });
          const inn = win(t, TEND + 0.6, TEND + 1.4);
          doorHalo.setAttribute("opacity", (0.35 + 0.45 * inn).toFixed(3));
          doorBeam.setAttribute("opacity", (0.4 + 0.3 * inn).toFixed(3));

          typed("h1", "NO STEP WAS PERFECT.", t, 9.4, 22);
          typed("h2", "EVERY STEP WAS TAKEN.", t, 10.6, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.4, 10.8)).toFixed(3)})`;
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
