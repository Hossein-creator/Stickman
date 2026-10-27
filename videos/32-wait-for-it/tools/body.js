        // ---------- "wait for it": she sits grey and sad. He finds a paint box and paints her face, badly. She touches her cheek, looks at the paint... and splats him back. Both laugh, the colour comes back ----------
        // remake of a 342x outlier (Scary Day, "cute couple, wait for end"), see viral/2026-10-27-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- time warp: slow motion on the splat ----------
        const SLOWS = [[7.7, 8.7]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_IN = 0.3, T_SEE = 1.25, T_GLINT = 1.55, T_RUN = 1.85, T_GRAB = 2.45, T_BACK = 2.6, T_KNEEL = 3.2;
        const STROKES = [3.6, 4.05, 4.5, 4.95, 5.4, 5.85];
        const T_TOUCH = 6.35, T_LOOKHAND = 6.75, T_GRABB = 7.45, T_SPLAT = 7.9, T_LAUGH = 8.75, T_COLOR = 9.0;
        const HERX = 560, HEX = 360, BOXX = 40;
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- set: one cold beam on her, a warm pool later ----------
        const coldBeam = svgEl("polygon", { points: `${HERX - 60},-900 ${HERX + 40},-900 ${HERX + 170},${FL} ${HERX - 190},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.3 }, beams);
        const warm = svgEl("ellipse", { cx: 460, cy: FL, rx: 380, ry: 56, fill: "url(#fireGlow)", opacity: 0 }, backG);
        const halo = svgEl("circle", { cx: 460, cy: FL - 140, r: 380, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- paint box + brush ----------
        const box = svgEl("g", {}, propG);
        svgEl("rect", { x: -26, y: -16, width: 52, height: 16, rx: 3, fill: "#2b2b2b", stroke: "#000", "stroke-width": 4 }, box);
        ["#ff3b5c", "#3a7bff", "#ffd23a", "#3fd17a"].forEach((c, i) => svgEl("rect", { x: -21 + i * 11, y: -13, width: 9, height: 9, rx: 2, fill: c }, box));
        const glint = svgEl("path", { d: "M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z", fill: "#fff", opacity: 0 }, fxG);
        const brush = svgEl("g", { opacity: 0 }, fxG);
        svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -46, stroke: "#c89a5a", "stroke-width": 6, "stroke-linecap": "round" }, brush);
        const brushTip = svgEl("path", { d: "M-5 -44 Q0 -64 5 -44 Z", fill: "#ff3b5c", stroke: "#000", "stroke-width": 3 }, brush);

        // ---------- the two of them ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const gray = (v) => { v = Math.round(v); return `rgb(${v},${v},${v})`; };
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        figG.insertBefore(bun, her.g);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const faceHer = svgEl("g", {}, figG);
        const faceHim = svgEl("g", {}, figG);
        // paint marks on her face (profile, facing left): one appears per stroke
        const MARKS = [
          ["c", -14, 9, 10, "#ff3b5c"],
          ["p", "M-4 -15 Q-14 -24 -26 -13", "#3a7bff"],
          ["p", "M-12 17 Q-20 27 -28 13", "#ff3b5c"],
          ["p", "M8 -26 Q-2 -34 -12 -26 Q-4 -20 4 -24", "#ffd23a"],
          ["p", "M-18 -2 L-30 4", "#3fd17a"],
          ["c", -31, 2, 7, "#ff3b5c"],
        ].map((m) => (m[0] === "c" ? svgEl("circle", { cx: m[1], cy: m[2], r: m[3], fill: m[4], opacity: 0 }, faceHer) : svgEl("path", { d: m[1], fill: "none", stroke: m[2], "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, faceHer)));
        // the big splat on his face
        const SPLAT = "M0 -22 Q8 -10 20 -16 Q14 -4 26 2 Q12 6 16 20 Q4 10 -4 22 Q-6 8 -20 12 Q-12 2 -24 -6 Q-10 -6 -12 -20 Q-4 -10 0 -22 Z";
        const splat = svgEl("path", { d: SPLAT, fill: "#ff3b5c", stroke: "#000", "stroke-width": 3, opacity: 0 }, faceHim);
        const tipDot = svgEl("circle", { r: 6, fill: "#ff3b5c", opacity: 0 }, fxG);
        const drops = Array.from({ length: 16 }, (_, i) => ({ a: -Math.PI * (0.1 + 0.8 * ((i * 37) % 16) / 16), v: 260 + ((i * 53) % 7) * 40, el: svgEl("circle", { r: 4 + (i % 3) * 2, fill: ["#ff3b5c", "#ffd23a", "#3a7bff", "#3fd17a"][i % 4], opacity: 0 }, fxG) }));
        const ring = svgEl("circle", { r: 10, fill: "none", stroke: "#fff", "stroke-width": 6, opacity: 0 }, fxG);
        const confetti = Array.from({ length: 30 }, (_, i) => ({ x: -100 + ((i * 271) % 1100), off: (i * 0.137) % 1, c: ["#ff3b5c", "#ffd23a", "#3a7bff", "#3fd17a"][i % 4], el: svgEl("rect", { x: -6, y: -3, width: 12, height: 6, rx: 2, opacity: 0 }, fxG) }));
        confetti.forEach((c) => c.el.setAttribute("fill", c.c));

        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, ST, lift, torso, head) => {
          const ft = feetOn(x0, x, ST, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / ST);
          return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 });
        };
        const running = (x0, x) => {
          const ft = feetOn(x0, x, 135, 30), sw = Math.sin((Math.PI * 2 * (x - x0)) / 135);
          return base({ hx: x, hy: stand + 10 + 4 * Math.abs(sw), torso: 18, head: -10, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 - 55 * sw, ael: 85, bsh: -4 + 55 * sw, bel: 85 });
        };
        // sitting on the floor, knees up, f = facing
        const floorSit = (x, f, look) => base({ hx: x, hy: FL - 24, torso: 20 - 14 * look, head: 26 - 46 * look, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, ash: 30, ael: 30, aw: 1, atx: x + f * 60, aty: FL - 92, bsh: 20, bel: 30, bw: 1, btx: x + f * 52, bty: FL - 88 });
        const kneel = (x, f) => base({ hx: x, hy: FL - 58, torso: 14, head: -6, ax: x + f * 36, ay: FL, bx: x - f * 70, by: FL, ash: 30, ael: 40, bsh: -10, bel: 30 });
        const laughK = (s) => (s < T_LAUGH ? 0 : win(s, T_LAUGH, T_LAUGH + 0.2));

        // ---------- her: sad and grey, looks up, gets painted, touches her cheek, splats him, laughs ----------
        const HEADH = [HERX - 70, FL - 168];   // where her face is while he paints (target for the brush)
        function herRaw(s) {
          const sad = floorSit(HERX, -1, 0);
          sad.head = 52; sad.torso = 24;
          if (s < T_KNEEL) return sad;
          const upP = floorSit(HERX, -1, 0.85);
          if (s < T_TOUCH) {
            const st = mixPose(sad, upP, win(s, T_KNEEL, T_KNEEL + 0.4));
            STROKES.forEach((t0) => { const k = Math.sin(Math.PI * clamp((s - t0) / 0.3, 0, 1)); st.head += 6 * k; });
            return st;
          }
          const st = { ...upP };
          // hand to the cheek, then she looks at her paint-red fingers
          const touch = win(s, T_TOUCH, T_TOUCH + 0.25), look = win(s, T_LOOKHAND, T_LOOKHAND + 0.25);
          st.bw = 1; st.btx = lerp(HERX - 40, HEADH[0] + 8, touch); st.bty = lerp(FL - 88, HEADH[1] + 14, touch);
          st.btx = lerp(st.btx, HERX - 96, look); st.bty = lerp(st.bty, FL - 150, look); st.head = lerp(st.head, 30, look);
          // a long beat... then she grabs the brush and splats his face
          const grab = win(s, T_GRABB, T_GRABB + 0.2), hitK = win(s, T_SPLAT - 0.18, T_SPLAT);
          st.aw = 1; st.atx = lerp(HERX - 40, HEX + 70, grab); st.aty = lerp(FL - 92, FL - 150, grab);
          st.atx = lerp(st.atx, HEX + 52, hitK); st.aty = lerp(st.aty, FL - 182, hitK);
          st.torso = lerp(st.torso, 18, grab) - 10 * win(s, T_SPLAT + 0.3, T_SPLAT + 0.7);
          st.head = lerp(st.head, -4, grab);
          const back = win(s, T_SPLAT + 0.25, T_SPLAT + 0.6);
          st.atx = lerp(st.atx, HERX - 60, back); st.aty = lerp(st.aty, FL - 92, back);
          st.btx = lerp(st.btx, HERX - 52, back); st.bty = lerp(st.bty, FL - 88, back);
          // laughing: head back, shoulders bouncing
          const lg = laughK(s);
          st.torso += lg * (-8 + 6 * Math.abs(Math.sin(s * 16)));
          st.head -= lg * 26;
          return st;
        }

        // ---------- him: walks in, sees her, spots the box, sprints, kneels, paints, gets splatted, laughs ----------
        function himRaw(s) {
          if (s < T_IN) return walking(-260, -260, 130, 16, 4, 0);
          if (s < T_SEE) return walking(-260, lerp(-260, 250, ease((s - T_IN) / (T_SEE - T_IN))), 130, 16, 4, 0);
          const st0 = standOn(250, 1, FL);
          if (s < T_RUN) {
            const st = { ...st0 };
            st.head = 14 * win(s, T_SEE, T_SEE + 0.2) - 30 * win(s, T_GLINT, T_GLINT + 0.15);
            return st;
          }
          if (s < T_GRAB) return running(250, lerp(250, BOXX + 40, ease((s - T_RUN) / (T_GRAB - T_RUN))));
          if (s < T_BACK) {
            const dip = Math.sin(Math.PI * clamp((s - T_GRAB) / 0.15, 0, 1));
            const st = standOn(BOXX + 40, -1, FL);
            st.hy += 40 * dip; st.torso = 30 * dip; st.aw = dip; st.atx = BOXX; st.aty = FL - 20;
            return st;
          }
          if (s < T_KNEEL) return running(BOXX + 40, lerp(BOXX + 40, HEX, ease((s - T_BACK) / (T_KNEEL - T_BACK))));
          const kn = kneel(HEX, 1);
          if (s < T_KNEEL + 0.2) return mixPose(running(BOXX + 40, HEX), kn, win(s, T_KNEEL, T_KNEEL + 0.2));
          // painting: the brush hand flicks to her face once per stroke, tongue-out concentration lean
          kn.aw = 1; kn.atx = HEADH[0] - 10; kn.aty = HEADH[1] + 30; kn.torso = 22; kn.head = -10;
          if (s < T_TOUCH) {
            STROKES.forEach((t0, i) => {
              const k = Math.sin(Math.PI * clamp((s - t0) / 0.3, 0, 1));
              kn.atx += k * (18 + 4 * (i % 3)); kn.aty += k * (-24 - 8 * (i % 2)) * (i % 2 ? 1 : -0.4);
            });
            return kn;
          }
          // waits nervously, then the splat knocks him onto his back-side
          kn.atx = lerp(kn.atx, HEX + 20, win(s, T_TOUCH, T_TOUCH + 0.3)); kn.aty = lerp(kn.aty, FL - 110, win(s, T_TOUCH, T_TOUCH + 0.3));
          kn.head = lerp(-10, 8, win(s, T_LOOKHAND, T_LOOKHAND + 0.3)) + 4 * Math.sin(s * 9) * win(s, 7.0, 7.2) * (1 - win(s, T_GRABB, T_GRABB + 0.1));
          if (s < T_SPLAT) return kn;
          const sit = floorSit(HEX - 30, 1, 0.9);
          sit.torso = -18; sit.head = -10;
          const st = mixPose(kn, sit, win(s, T_SPLAT, T_SPLAT + 0.35));
          const lg = laughK(s);
          st.torso += lg * (6 + 6 * Math.abs(Math.sin(s * 15 + 1)));
          st.head -= lg * 22;
          st.aw = lg; st.atx = HEX + 10; st.aty = FL - 70;
          return st;
        }
        const himF = (s) => (s > T_RUN && s < T_BACK ? -1 : 1);

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.9, HERX - 30, 470, 0], [1.0, 1.4, 380, 460, 0], [1.5, 1.6, 200, 480, -2], [1.85, 1.35, 120, 470, 0],
          [2.5, 1.5, 80, 480, 2], [3.1, 1.3, 380, 460, 0], [3.6, 1.95, 470, 440, 0], [5.0, 2.1, 480, 440, 1],
          [6.2, 1.8, 470, 450, 0], [6.4, 2.6, 500, 430, 0], [7.2, 2.7, 500, 430, -1], [7.6, 2.0, 430, 450, 0],
          [7.95, 2.4, 370, 450, -3], [8.6, 1.6, 440, 460, 0], [10.5, 1.45, 450, 470, 0], [99, 1.45, 450, 470, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          hit(realOf(T_GLINT), 0.25, 0, 0.05, 0.15);
          hit(realOf(T_GRAB), 0.4, 0.2, 0, 0.15);
          hit(realOf(T_KNEEL), 0.3, 0.1, 0, 0.15);
          STROKES.forEach((t0) => hit(realOf(t0 + 0.15), 0.18, 0.15, 0, 0.1));
          hit(realOf(T_SPLAT), 1.8, 1, 0.22, 0.4);
          hit(realOf(T_COLOR), 0.4, 0.2, 0.25, 0.3);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          // the people
          const hp = drawFig(her, livePose(herRaw, s, 0.4), -1);
          const mp = drawFig(him, livePose(himRaw, s, 1.3), himF(s));
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const col = win(s, T_COLOR, T_COLOR + 0.6);
          tint(her, gray(lerp(150, 255, col)), gray(lerp(120, 226, col)));
          bun.setAttribute("fill", gray(lerp(150, 255, col)));
          coldBeam.setAttribute("opacity", (0.3 * (1 - col)).toFixed(3));
          warm.setAttribute("opacity", (0.8 * col).toFixed(3));
          halo.setAttribute("opacity", (0.45 * col * (0.92 + 0.08 * Math.sin(t * 7))).toFixed(3));

          // paint marks follow her head
          faceHer.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1])})`);
          MARKS.forEach((m, i) => {
            const q = win(s, STROKES[i] + 0.1, STROKES[i] + 0.22);
            m.setAttribute("opacity", q.toFixed(3));
          });
          faceHim.setAttribute("transform", `translate(${r1(mp.head[0] + 6)} ${r1(mp.head[1])})`);
          const sp = s < T_SPLAT ? 0 : backOut(clamp((s - T_SPLAT) / 0.25, 0, 1));
          splat.setAttribute("opacity", s < T_SPLAT ? 0 : 1);
          splat.setAttribute("transform", `scale(${(0.2 + 0.9 * sp).toFixed(3)})`);

          // the box on the floor, the glint, the brush
          const grabbed = s > T_GRAB + 0.08;
          box.setAttribute("transform", grabbed ? `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] + 10)}) scale(0.8)` : `translate(${BOXX} ${FL})`);
          box.setAttribute("opacity", s > T_TOUCH + 0.3 ? 1 - win(s, T_TOUCH + 0.3, T_TOUCH + 0.6) : 1);
          const gq = clamp((s - T_GLINT) / 0.5, 0, 1);
          glint.setAttribute("opacity", s > T_GLINT && s < T_GLINT + 0.5 ? Math.sin(Math.PI * gq).toFixed(3) : 0);
          glint.setAttribute("transform", `translate(${BOXX + 10} ${FL - 26}) rotate(${r1(gq * 90)}) scale(${(0.6 + 1.2 * Math.sin(Math.PI * gq)).toFixed(3)})`);
          const holder = s < T_GRABB + 0.15 ? mp : hp;
          const bh = holder.hands[0];
          const bAng = s < T_GRABB + 0.15 ? 40 + 20 * Math.sin(s * 6) : -50;
          brush.setAttribute("transform", `translate(${r1(bh[0])} ${r1(bh[1])}) rotate(${r1(bAng)})`);
          brush.setAttribute("opacity", s > T_KNEEL && s < T_LAUGH + 0.4 ? 1 - win(s, T_LAUGH + 0.1, T_LAUGH + 0.4) : 0);
          brushTip.setAttribute("fill", ["#ff3b5c", "#3a7bff", "#ff3b5c", "#ffd23a", "#3fd17a", "#ff3b5c"][clamp(STROKES.filter((x) => s > x - 0.2).length - 1, 0, 5)]);
          // red paint on her fingertip when she looks at it
          tipDot.setAttribute("cx", r1(hp.hands[1][0])); tipDot.setAttribute("cy", r1(hp.hands[1][1]));
          tipDot.setAttribute("opacity", s > T_TOUCH + 0.25 && s < T_SPLAT + 0.6 ? 1 : 0);

          // the splat: drops fly, a shock ring
          const ds = s - T_SPLAT;
          drops.forEach((d) => {
            const on = ds > 0 && ds < 1.0;
            d.el.setAttribute("cx", r1(mp.head[0] + Math.cos(d.a) * d.v * ds * -1));
            d.el.setAttribute("cy", r1(mp.head[1] + Math.sin(d.a) * d.v * ds + 600 * ds * ds));
            d.el.setAttribute("opacity", on ? (1 - ds).toFixed(3) : 0);
          });
          ring.setAttribute("cx", r1(mp.head[0])); ring.setAttribute("cy", r1(mp.head[1]));
          ring.setAttribute("r", r1(10 + 260 * clamp(ds / 0.5, 0, 1)));
          ring.setAttribute("opacity", ds > 0 && ds < 0.5 ? (0.8 * (1 - ds / 0.5)).toFixed(3) : 0);

          // colour comes back: confetti floats up
          confetti.forEach((c) => {
            const q = frac((s - T_COLOR) * 0.35 + c.off);
            const on = s > T_COLOR + c.off * 0.6;
            c.el.setAttribute("transform", `translate(${r1(c.x + 30 * Math.sin(q * 8 + c.off * 20))} ${r1(lerp(FL - 10, -500, q))}) rotate(${r1(q * 720 + c.off * 300)})`);
            c.el.setAttribute("opacity", on ? (0.9 * Math.min(1, (1 - q) * 4)).toFixed(3) : 0);
          });

          E("h1").innerHTML = slam(["HE", "HAD", "NO", "IDEA", "HOW."], [11.0, 11.14, 11.26, 11.38, 11.52], t, []);
          E("h2").innerHTML = slam(["HE", "JUST", "WANTED", "YOU", "TO", "SMILE."], [12.0, 12.12, 12.26, 12.4, 12.52, 12.7], t, [5]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 11.9, 12.2)).toFixed(3);
          fade.style.opacity = win(t, 13.6, 13.98).toFixed(3);
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
