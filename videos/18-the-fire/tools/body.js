        // ---------- scene: 8 friends around one campfire; the years take them one by one ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const backG = E("back");
        const logG = svgEl("g", {}, W);
        const fireBack = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fireG = svgEl("g", {}, W);
        const FX = 400;

        // warm light on the floor and the air around the fire
        const pool = svgEl("ellipse", { cx: FX, cy: FL, rx: 330, ry: 46, fill: "url(#fireGlow)" }, backG);
        const halo = svgEl("circle", { cx: FX, cy: FL - 90, r: 330, fill: "url(#fireGlow)" }, backG);

        // two long logs to sit on
        const LOGY = FL - 50;
        for (const [x0, x1] of [[0, 320], [480, 800]]) {
          svgEl("rect", { x: x0, y: LOGY, width: x1 - x0, height: 26, rx: 13, fill: "#5d4b3b", stroke: "#000", "stroke-width": 5 }, logG);
          svgEl("rect", { x: x0 + 14, y: LOGY + 6, width: x1 - x0 - 28, height: 4, rx: 2, fill: "#7a6450" }, logG);
          svgEl("rect", { x: x0 + 20, y: LOGY + 26, width: 14, height: 24, fill: "#3e3228", stroke: "#000", "stroke-width": 4 }, logG);
          svgEl("rect", { x: x1 - 34, y: LOGY + 26, width: 14, height: 24, fill: "#3e3228", stroke: "#000", "stroke-width": 4 }, logG);
        }
        // fire: crossed logs + stones
        for (const a of [-18, 18]) svgEl("rect", { x: FX - 46, y: FL - 14, width: 92, height: 14, rx: 7, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4, transform: `rotate(${a} ${FX} ${FL - 7})` }, fireBack);
        for (let i = 0; i < 7; i++) svgEl("ellipse", { cx: FX - 60 + i * 20, cy: FL - 4, rx: 11, ry: 7, fill: "#3a3a3a", stroke: "#000", "stroke-width": 3 }, fireBack);
        const flames = [];
        const FL_DEF = [[-22, 0.62, "#d62a2a"], [20, 0.7, "#d62a2a"], [0, 1, "#ff6a2a"], [-10, 0.7, "#ffb347"], [10, 0.62, "#ffb347"], [0, 0.45, "#fff1c2"]];
        for (const [dx, k, col] of FL_DEF) flames.push([svgEl("path", { fill: col, stroke: "#000", "stroke-width": col === "#fff1c2" ? 0 : 3, "stroke-linejoin": "round" }, fireG), dx, k]);
        const sparks = [];
        for (let i = 0; i < 14; i++) sparks.push(svgEl("circle", { r: 2.4, fill: "#ffc070" }, fireG));
        // the stick he throws in
        const stick = svgEl("rect", { x: -34, y: -6, width: 68, height: 12, rx: 6, fill: "#5d4b3b", stroke: "#000", "stroke-width": 4 }, W);

        // ---------- people ----------
        const SITY = LOGY - 8;
        const SEATS = [
          // x, facing, leave time (null = stays)
          [40, 1, 1.0], [115, 1, 2.3], [190, 1, 4.4], [268, 1, null],
          [532, -1, null], [610, -1, 3.7], [685, -1, 3.0], [760, -1, 1.6],
        ];
        const STRIDE = 120, SPEED = 170;
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        function sitPose(x, f, age) {
          return base({
            hx: x, hy: SITY + 3 * age, torso: 8 + 9 * age, head: 4 + 16 * age,
            ax: x + f * 72, ay: FL, bx: x + f * 58, by: FL,
            ash: 30, ael: 40, aw: 1, atx: x + f * 62, aty: SITY - 4,
            bsh: 20, bel: 40, bw: 1, btx: x + f * 52, bty: SITY - 2,
          });
        }
        function walkPose(x0, dir, hx) {
          const u = (hx - x0) * dir, p = u / STRIDE;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o + 1e-6);
            let uf, lift = 0;
            if (q < 0.5) uf = u + STRIDE * (0.25 - q);
            else { const s = (q - 0.5) / 0.5; uf = u + STRIDE * (-0.25 + 0.5 * ease(s)); lift = Math.sin(Math.PI * s) * 16; }
            return [x0 + dir * uf, FL - lift];
          });
          const sw = Math.sin(Math.PI * 2 * p);
          const legH = Math.sqrt(LEG * LEG - (STRIDE * 0.25) ** 2);
          return base({ hx, hy: lerp(stand, FL - legH, 0.6) + 3 * Math.abs(sw), torso: 5, head: 2, ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1], ash: 8 + 24 * sw, ael: 14, bsh: -4 - 24 * sw, bel: 12 });
        }
        const people = SEATS.map(([x, f, tl], i) => {
          const box = svgEl("g", {}, figG);
          const parts = makeFig(box, "#ffffff", "#dedede", true, "p" + i);
          return { x, f, tl, box, parts };
        });
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const grey = (k) => { const v = Math.round(lerp(255, 120, k)); return `rgb(${v},${v},${v})`; };
        const greyB = (k) => { const v = Math.round(lerp(222, 100, k)); return `rgb(${v},${v},${v})`; };

        // a leaver: sits, stands up, turns outward and walks off into the dark
        function leaverRaw(pp) {
          return (t) => {
            const dir = -pp.f;
            if (t < pp.tl) return sitPose(pp.x, pp.f, 0);
            const up = win(t, pp.tl, pp.tl + 0.5);
            if (t < pp.tl + 0.5) return mixPose(sitPose(pp.x, pp.f, 0), standOn(pp.x, dir, FL), up);
            return walkPose(pp.x, dir, pp.x + dir * SPEED * Math.pow(t - pp.tl - 0.5, 1.05));
          };
        }
        // the hero (stays, grows old, watches the fire)
        const AGE0 = 9.0, AGE1 = 11.0;
        const age = (t) => win(t, AGE0, AGE1);
        function heroRaw(t) {
          const a = age(t), look = win(t, 6.9, 7.2) * (1 - win(t, 8.2, 8.6));
          const s = sitPose(268, 1, a);
          s.head += -14 * look;
          return s;
        }
        // the friend across the fire: stands up as if to leave... then feeds the fire and sits back down
        const T_UP = 6.8, T_BACK = 7.8, T_THROW = 8.3, T_SIT = 8.7;
        function friendRaw(t) {
          const a = age(t);
          if (t < T_UP) return sitPose(532, -1, 0);
          if (t < T_UP + 0.5) return mixPose(sitPose(532, -1, 0), standOn(540, 1, FL), win(t, T_UP, T_UP + 0.5));
          if (t < T_BACK) { const s = standOn(540, 1, FL); s.head = 6; return s; }
          if (t < T_THROW) {
            // bends down and picks up the stick near his feet
            const b = Math.sin(Math.PI * clamp((t - T_BACK) / (T_THROW - T_BACK), 0, 1));
            const s = standOn(540, -1, FL);
            s.torso = 5 + 50 * b; s.hy += 26 * b; s.head = 10 * b;
            s.aw = 1; s.atx = lerp(512, 480, b); s.aty = lerp(stand - 60, FL - 14, b);
            return s;
          }
          if (t < T_SIT) {
            const p = win(t, T_THROW, T_THROW + 0.25);
            const s = standOn(540, -1, FL);
            s.aw = 1; s.atx = lerp(480, 440, p); s.aty = lerp(stand - 70, stand - 40, p);
            return s;
          }
          return mixPose(standOn(540, -1, FL), sitPose(532, -1, a), win(t, T_SIT, T_SIT + 0.5));
        }

        // ---------- fire size: shrinks with each friend who leaves, flares when he feeds it ----------
        const LEAVES = SEATS.map((s) => s[2]).filter((v) => v != null);
        const fireK = (t) => {
          let k = 1;
          for (const tl of LEAVES) k -= 0.075 * win(t, tl + 0.4, tl + 1.4);
          k += 0.55 * win(t, T_THROW + 0.25, T_THROW + 0.5) - 0.3 * win(t, T_THROW + 0.6, T_THROW + 2.0);
          return k;
        };

        const ageNum = (t) => {
          if (t < 0.8) return 18;
          if (t < 5.6) return Math.round(lerp(18, 30, (t - 0.8) / 4.8));
          if (t < AGE0) return 30;
          return Math.round(lerp(30, 70, clamp((t - AGE0) / (AGE1 - AGE0), 0, 1)));
        };
        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        E("h2").style.whiteSpace = "pre-line";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          // camera: slow push-in on the two who stayed
          const z = win(t, 7.6, 12.6);
          const s = lerp(1.25, 1.62, z), wy = lerp(600, 520, z), sy = lerp(1400, 1220, z);
          cam.setAttribute("transform", `translate(540 ${r1(sy)}) scale(${s.toFixed(4)}) translate(-400 ${r1(-wy)})`);

          people.forEach((pp, i) => {
            if (pp.tl != null) {
              const j = drawFig(pp.parts, livePose(leaverRaw(pp), t, i * 0.7), t < pp.tl + 0.5 ? pp.f : -pp.f);
              const g = win(t, pp.tl + 0.3, pp.tl + 1.6);
              tint(pp.parts, grey(g), greyB(g));
              pp.box.setAttribute("opacity", (1 - win(t, pp.tl + 1.0, pp.tl + 2.4)).toFixed(3));
            }
          });
          const a = age(t);
          const hj = drawFig(people[3].parts, livePose(heroRaw, t, 0.2), 1);
          const ff = t < T_UP + 0.5 ? -1 : t < T_BACK ? 1 : -1;
          const fj = drawFig(people[4].parts, livePose(friendRaw, t, 1.1), ff);
          const oldC = grey(0.2 * a), oldB = greyB(0.2 * a);
          tint(people[3].parts, oldC, oldB);
          tint(people[4].parts, oldC, oldB);

          // the stick: lies by his feet, picked up, thrown in an arc into the fire
          if (t < T_BACK + 0.25) stick.setAttribute("transform", `translate(480 ${FL - 6})`);
          else if (t < T_THROW + 0.05) stick.setAttribute("transform", `translate(${r1(fj.hands[0][0])} ${r1(fj.hands[0][1])}) rotate(-30)`);
          else {
            const q = clamp((t - T_THROW - 0.05) / 0.35, 0, 1);
            stick.setAttribute("transform", `translate(${r1(lerp(fj.hands[0][0], FX + 6, q))} ${r1(lerp(fj.hands[0][1], FL - 10, q) - Math.sin(Math.PI * q) * 60)}) rotate(${r1(-30 + 40 * q)})`);
          }
          stick.setAttribute("opacity", t > T_THROW + 0.55 ? (1 - win(t, T_THROW + 0.55, T_THROW + 1.2)).toFixed(3) : 1);

          // fire
          const k = fireK(t);
          flames.forEach(([el, dx, kk], i) => {
            const fl = 1 + 0.12 * Math.sin(t * 11 + i * 1.7) + 0.08 * Math.sin(t * 17.3 + i);
            const h = 120 * k * kk * fl, w = 30 * Math.sqrt(k) * kk;
            const x = FX + dx * Math.sqrt(k), b = FL - 10, tipX = x + Math.sin(t * 7 + i * 2.1) * 8 * k;
            el.setAttribute("d", `M${r1(x - w)} ${b} Q${r1(x - w * 1.1)} ${r1(b - h * 0.45)} ${r1(tipX)} ${r1(b - h)} Q${r1(x + w * 1.1)} ${r1(b - h * 0.45)} ${r1(x + w)} ${b} Z`);
          });
          sparks.forEach((sp, i) => {
            const per = 1.3 + (i % 5) * 0.21, ph = frac(t / per + i * 0.137);
            const burst = win(t, T_THROW + 0.3, T_THROW + 0.5) * (1 - win(t, T_THROW + 1.4, T_THROW + 2.4));
            sp.setAttribute("cx", r1(FX + Math.sin(i * 2.3 + ph * 3) * (20 + 30 * ph) * k));
            sp.setAttribute("cy", r1(FL - 40 - ph * (150 + 120 * burst) * k));
            sp.setAttribute("opacity", ((1 - ph) * clamp(0.35 + burst, 0, 1)).toFixed(3));
          });
          const glow = clamp(k, 0.3, 1.5) * (0.92 + 0.08 * Math.sin(t * 13));
          halo.setAttribute("opacity", (0.55 * glow).toFixed(3));
          pool.setAttribute("opacity", (0.8 * glow).toFixed(3));

          E("num").textContent = ageNum(t);
          typed("h1", "AT 18, THE FIRE IS CROWDED.", t, 0.3, 24);
          typed("h2", "AT 70, ONE FRIEND\nSTILL KEEPS IT WARM.", t, 10.9, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.6, 11.0)).toFixed(3)})`;
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
