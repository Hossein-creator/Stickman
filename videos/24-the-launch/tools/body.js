        // ---------- scene: one rocket, one engineer. 62 explosions nobody saw, then the launch everybody saw ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const beams = E("beams");
        const backG = E("back");
        const padG = svgEl("g", {}, W);
        const smokeG = svgEl("g", {}, W);
        const rocketG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const RX = 430, PADY = FL - 26;

        // stars, beam, pad + tower, control box
        for (let i = 0; i < 60; i++) svgEl("circle", { cx: -200 + rnd() * 1200, cy: -900 + rnd() * 1100, r: 1 + rnd() * 1.6, fill: "#fff", opacity: 0.25 + rnd() * 0.5 }, backG);
        const beam = svgEl("polygon", { points: `${RX - 60},-500 ${RX + 60},-500 ${RX + 170},600 ${RX - 170},600`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.35 }, beams);
        svgEl("rect", { x: RX - 80, y: PADY, width: 160, height: 26, fill: "#4a4a4a", stroke: "#000", "stroke-width": 5 }, padG);
        for (const x of [RX + 64, RX + 104]) svgEl("rect", { x: x - 5, y: FL - 300, width: 10, height: 300 - 26, fill: "#5a5a5a", stroke: "#000", "stroke-width": 4 }, padG);
        for (let y = FL - 290; y < FL - 40; y += 40) svgEl("path", { d: `M${RX + 64} ${y} L${RX + 104} ${y + 40} M${RX + 104} ${y} L${RX + 64} ${y + 40}`, stroke: "#5a5a5a", "stroke-width": 4 }, padG);
        svgEl("rect", { x: 230, y: FL - 70, width: 54, height: 70, rx: 6, fill: "#3a3a3a", stroke: "#000", "stroke-width": 5 }, padG);
        const button = svgEl("rect", { x: 245, y: FL - 82, width: 24, height: 12, rx: 4, fill: "#d62a2a", stroke: "#000", "stroke-width": 3 }, padG);

        // the rocket
        const rocket = svgEl("g", {}, rocketG);
        const flameEl = svgEl("path", { fill: "url(#flame)" }, rocket);
        svgEl("path", { d: "M-22 -18 L-40 6 L-22 0 Z M22 -18 L40 6 L22 0 Z", fill: "#d62a2a", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, rocket);
        svgEl("path", { d: "M-22 0 L-22 -110 Q-22 -150 0 -168 Q22 -150 22 -110 L22 0 Z", fill: "#f2f2f2", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, rocket);
        svgEl("circle", { cx: 0, cy: -100, r: 9, fill: "#8fbaff", stroke: "#000", "stroke-width": 4 }, rocket);
        svgEl("rect", { x: -12, y: 0, width: 24, height: 10, fill: "#555", stroke: "#000", "stroke-width": 3 }, rocket);
        const trail = svgEl("path", { fill: "none", stroke: "#e8e8e8", "stroke-width": 16, "stroke-linecap": "round", filter: "url(#blur)", opacity: 0 }, smokeG);
        const trailCore = svgEl("path", { fill: "none", stroke: "#ffffff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, smokeG);
        const groundGlow = svgEl("ellipse", { cx: RX, cy: FL, rx: 220, ry: 34, fill: "url(#boom)", opacity: 0 }, backG);

        // explosions: flash + smoke puffs + debris
        function makeBoom() {
          const g = svgEl("g", {}, fxG);
          const puffs = [], deb = [];
          for (let i = 0; i < 7; i++) puffs.push(svgEl("circle", { fill: "url(#smoke)" }, smokeG));
          for (let i = 0; i < 9; i++) deb.push(svgEl("rect", { width: 12, height: 6, fill: i % 3 ? "#e8e8e8" : "#d62a2a", stroke: "#000", "stroke-width": 2 }, g));
          const flash = svgEl("circle", { fill: "url(#boom)" }, g);
          return { puffs, deb, flash };
        }
        function drawBoom(b, x, y, t0, sc, t) {
          const q = t - t0;
          const on = q >= 0 && q < 2.2;
          b.flash.setAttribute("cx", r1(x)); b.flash.setAttribute("cy", r1(y));
          b.flash.setAttribute("r", r1(on ? 30 + 170 * sc * ease(Math.min(1, q / 0.18)) : 0));
          b.flash.setAttribute("opacity", on ? Math.max(0, 1 - q / 0.6).toFixed(3) : 0);
          b.puffs.forEach((p, i) => {
            const a = (i / 7) * Math.PI * 2;
            p.setAttribute("cx", r1(x + Math.cos(a) * 50 * sc * Math.min(1, q * 2)));
            p.setAttribute("cy", r1(y + Math.sin(a) * 30 * sc * Math.min(1, q * 2) - 60 * q));
            p.setAttribute("r", r1(on ? (40 + 60 * Math.min(1, q)) * sc : 0));
            p.setAttribute("opacity", on ? clamp(1 - q / 2.2, 0, 1).toFixed(3) : 0);
          });
          b.deb.forEach((d, i) => {
            const a = -Math.PI / 2 + (i / 8 - 0.5) * 2.6, v = (200 + (i % 4) * 60) * sc;
            const dq = Math.min(q, 1.0);
            d.setAttribute("x", r1(x + Math.cos(a) * v * dq));
            d.setAttribute("y", r1(y + Math.sin(a) * v * dq + 500 * dq * dq));
            d.setAttribute("transform", `rotate(${r1(q * 700 + i * 40)} ${r1(x + Math.cos(a) * v * dq)} ${r1(y + Math.sin(a) * v * dq + 500 * dq * dq)})`);
            d.setAttribute("opacity", on && q < 1.0 ? 1 : 0);
          });
        }
        const booms = [makeBoom(), makeBoom(), makeBoom(), makeBoom()];
        const MONT0 = 5.9, MONT1 = 8.2, MSTEP = 0.26;
        const montT = [];
        for (let t = MONT0 + 0.1; t < MONT1; t += MSTEP) montT.push(t);
        const bigSmoke = [];
        for (let i = 0; i < 10; i++) bigSmoke.push(svgEl("circle", { fill: "url(#smoke)" }, smokeG));

        // ---------- rocket state per attempt ----------
        const IG = [0.8, 3.0, 4.3], BOOM = [1.6, 3.35, 5.3], BACK = [2.6, 4.0, 5.9];
        const T_P = 8.6, T_IG = 8.7, T_LIFT = 9.0;
        function rk(t) {
          // returns x, h (height above pad), rot, visible, flame strength
          if (t < IG[0]) return [RX, 0, 0, 1, 0];
          if (t < BOOM[0]) return [RX, 90 * ease((t - IG[0]) / 0.8), 7 * Math.sin(t * 22) * win(t, 1.15, 1.6), 1, 1];
          if (t < BACK[0]) return [RX, 0, 0, 0, 0];
          if (t < IG[1]) return [RX, 0, 0, win(t, BACK[0], BACK[0] + 0.3), 0];
          if (t < BOOM[1]) return [RX + Math.sin(t * 80) * 2, 0, 0, 1, 0.6];
          if (t < BACK[1]) return [RX, 0, 0, 0, 0];
          if (t < IG[2]) return [RX, 0, 0, win(t, BACK[1], BACK[1] + 0.3), 0];
          if (t < BOOM[2]) {
            const r = win(t, 4.8, 5.3);
            return [RX + 240 * r * r, 210 * ease((t - IG[2]) / 0.6) - 60 * r * r, 115 * r, 1, 1];
          }
          if (t < BACK[2]) return [RX, 0, 0, 0, 0];
          if (t < T_IG) return [RX, 0, 0, win(t, BACK[2], BACK[2] + 0.2), 0];
          if (t < T_LIFT) return [RX + Math.sin(t * 70) * 1.5, 0, 0, 1, 0.8];
          return [RX, 230 * (t - T_LIFT) ** 2, 0, 1, 1.3];
        }
        const attempt = (t) => (t < BACK[0] ? 1 : t < BACK[1] ? 2 : t < BACK[2] ? 3 : t < MONT1 ? Math.round(lerp(4, 62, (t - MONT0) / (MONT1 - MONT0))) : 63);
        const montFlash = (t) => montT.reduce((v, m) => (t >= m && t < m + 0.16 ? 1 - (t - m) / 0.16 : v), 0);

        // ---------- the engineer ----------
        const eng = makeFig(figG, "#ffffff", "#dedede", true, "eng");
        const PRESS = [0.7, 2.9, 4.2, T_P];
        for (let t = MONT0; t < MONT1; t += MSTEP) PRESS.push(t);
        const EX = 170;
        function engRaw(t) {
          const s = standOn(EX, 1, FL);
          let pr = 0;
          for (const p of PRESS) pr = Math.max(pr, Math.sin(Math.PI * clamp((t - p + 0.15) / 0.3, 0, 1)));
          s.aw = pr; s.atx = 257; s.aty = FL - 84;
          s.torso = 4 + 10 * pr;
          let sad = 0;
          for (const b of BOOM) sad = Math.max(sad, win(t, b + 0.2, b + 0.5) * (1 - win(t, b + 0.9, b + 1.2)));
          s.head = 4 + 22 * sad - 20 * win(t, T_LIFT, T_LIFT + 0.6);
          const yay = win(t, 9.8, 10.2);
          s.ash = lerp(s.ash, 160, yay); s.ael = lerp(s.ael, -10, yay); s.bsh = lerp(s.bsh, 150, yay); s.bel = lerp(s.bel, -10, yay);
          s.aw *= 1 - yay;
          s.hy -= 10 * yay * Math.abs(Math.sin((t - 9.8) * 7));
          return s;
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const pad = (n) => String(n).padStart(2, "0");

        // ---------- per-frame render ----------
        function render(t) {
          // camera: shake on explosions and lift-off, small tilt up after launch
          let sh = 0;
          for (const b of BOOM) sh += Math.max(0, 1 - Math.abs(t - b - 0.1) / 0.35);
          sh += montFlash(t) * 0.4 + win(t, T_IG, T_LIFT) * (1 - win(t, 10.2, 10.8)) * 0.7;
          const ox = Math.sin(t * 61) * 7 * sh, oy = Math.cos(t * 53) * 6 * sh;
          const up = win(t, 9.6, 11.6);
          cam.setAttribute("transform", `translate(${r1(540 + ox)} ${r1(1380 + oy + 170 * up)}) scale(1.5) translate(-340 -600)`);

          const [x, h, rot, vis, fl] = rk(t);
          const mf = t > MONT0 && t < MONT1 ? montFlash(t) : 0;
          rocket.setAttribute("transform", `translate(${r1(x)} ${r1(PADY - 10 - h)}) rotate(${r1(rot)})`);
          rocket.setAttribute("opacity", (vis * (1 - 0.9 * mf)).toFixed(3));
          const fll = fl * (70 + 30 * Math.sin(t * 40) + 18 * Math.sin(t * 23));
          flameEl.setAttribute("d", fl > 0 ? `M-15 8 Q${r1(-10 + 4 * Math.sin(t * 30))} ${r1(8 + fll * 0.6)} 0 ${r1(8 + fll)} Q${r1(10 + 4 * Math.sin(t * 27))} ${r1(8 + fll * 0.6)} 15 8 Z` : "");
          groundGlow.setAttribute("opacity", (clamp(fl, 0, 1) * (h < 260 ? 1 - h / 260 : 0) * 0.9 + mf * 0.6).toFixed(3));
          const ty = Math.max(-80, PADY - 10 - h + 20);
          for (const tr of [trail, trailCore]) { tr.setAttribute("d", t > T_LIFT ? `M${RX} ${PADY - 20} L${RX} ${r1(ty)}` : ""); tr.setAttribute("opacity", (win(t, T_LIFT, T_LIFT + 0.3) * (tr === trail ? 0.55 : 0.8) * (1 - 0.4 * win(t, 11.5, 13))).toFixed(3)); }
          beam.setAttribute("opacity", (0.35 + 0.2 * win(t, T_LIFT, 9.8)).toFixed(3));

          drawBoom(booms[0], RX, PADY - 10 - 90 - 70, BOOM[0], 1, t);
          drawBoom(booms[1], RX, PADY - 60, BOOM[1], 1.1, t);
          drawBoom(booms[2], RX + 240, PADY - 10 - 150 - 40, BOOM[2], 0.9, t);
          // montage: small booms on every press
          let lastM = -9;
          for (const m of montT) if (t >= m) lastM = m;
          drawBoom(booms[3], RX + ((lastM * 37) % 30) - 15, PADY - 70, lastM, 0.55, t < MONT1 + 0.6 ? t : -9);
          // lift-off smoke billows out to the sides
          bigSmoke.forEach((c, i) => {
            const q = t - T_IG - i * 0.06, side = i % 2 ? 1 : -1;
            const r = q > 0 ? 30 + 70 * Math.min(1, q / 1.2) : 0;
            c.setAttribute("cx", r1(RX + side * (20 + 40 * (i >> 1)) * Math.min(1, q > 0 ? q * 1.5 : 0)));
            c.setAttribute("cy", r1(FL - 30 - 10 * (i >> 1)));
            c.setAttribute("r", r1(r));
            c.setAttribute("opacity", q > 0 ? clamp(1 - (q - 1.2) / 2.5, 0, 0.9).toFixed(3) : 0);
          });

          drawFig(eng, livePose(engRaw, t, 0.5), 1);
          button.setAttribute("fill", PRESS.some((p) => t > p && t < p + 0.18) ? "#ff6a5a" : "#d62a2a");

          // counter + FAIL / PASS
          E("num").textContent = pad(attempt(t));
          const tag = E("tag");
          let failOn = BOOM.some((b) => t > b && t < b + 0.9) || mf > 0.2;
          tag.className = t > 9.6 ? "pass" : failOn ? "fail" : "";
          tag.textContent = t > 9.6 ? "PASS" : "FAIL";

          typed("h1", "YOU SAW ONE LAUNCH.", t, 0.3, 24);
          typed("h2", "NOT THE 62 EXPLOSIONS.", t, 10.5, 22);
          E("h1").style.color = `rgba(255,255,255,${(1 - 0.55 * win(t, 10.3, 10.7)).toFixed(3)})`;
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
