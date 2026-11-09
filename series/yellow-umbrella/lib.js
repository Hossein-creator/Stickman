        // ===== shared lib for the series "THE YELLOW UMBRELLA" (series/yellow-umbrella/lib.js) =====
        // each part = this lib + partN.js, concatenated by series/yellow-umbrella/make.sh into videos/NN/tools/body.js
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -2400); el.setAttribute("width", 6000); }
        }
        const W = E("world"), backG = E("back");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const YEL = "#ffd23a";
        // ---- layers (back to front) ----
        const skyG = svgEl("g", {}, backG);
        const setG = svgEl("g", {}, backG);
        const propG = svgEl("g", {}, W);
        const inG = svgEl("g", {}, W);      // actors inside a house (behind the wall)
        const wallG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const rainG = svgEl("g", {}, W);
        // ---- sky ----
        const SKY = {};
        for (const [n, c] of [["storm", "#26303c"], ["night", "#0b1640"], ["day", "#7aa8d8"], ["warm", "#3a2a22"], ["gray", "#4a5560"]]) SKY[n] = svgEl("rect", { x: -3000, y: -2000, width: 7000, height: 2600, fill: c, opacity: 0 }, skyG);
        const sun = svgEl("circle", { r: 40, fill: "#ffd060", opacity: 0 }, skyG);
        const moon = svgEl("circle", { r: 30, fill: "#f3efd8", opacity: 0 }, skyG);
        const bow = svgEl("g", { opacity: 0 }, skyG);
        ["#ff3b30", "#ff9500", "#ffd23a", "#34c759", "#0a84ff", "#8e5bd6"].forEach((c, i) => svgEl("path", { d: `M${-60 + i * 14} ${FL} A ${520 - i * 14} ${520 - i * 14} 0 0 1 ${980 - i * 14} ${FL}`, fill: "none", stroke: c, "stroke-width": 14, opacity: 0.55 }, bow));
        // ---- sets ----
        const SETS = {};
        const mk = (n) => (SETS[n] = svgEl("g", { opacity: 0 }, setG));
        const lamp = (g, x) => { svgEl("circle", { cx: x + 40, cy: FL - 470, r: 160, fill: "url(#fireGlow)", opacity: 0.35 }, g); svgEl("rect", { x: x - 6, y: FL - 480, width: 12, height: 480, fill: "#222", stroke: "#000", "stroke-width": 3 }, g); svgEl("path", { d: `M${x} ${FL - 478} q30 -14 50 4`, fill: "none", stroke: "#222", "stroke-width": 10 }, g); svgEl("ellipse", { cx: x + 50, cy: FL - 468, rx: 16, ry: 9, fill: "#ffe7a8" }, g); };
        // bus stop (shelter x 560..840)
        { const g = mk("stop");
          svgEl("rect", { x: -2400, y: FL - 700, width: 6000, height: 700, fill: "#1d232b", opacity: 0.6 }, g);
          for (let i = 0; i < 9; i++) svgEl("rect", { x: -900 + i * 300, y: FL - 620 + (i % 3) * 30, width: 180, height: 620, fill: "#151a20" }, g);
          for (let i = 0; i < 26; i++) svgEl("rect", { x: -880 + (i % 9) * 300 + (i % 2) * 70, y: FL - 560 + Math.floor(i / 9) * 90, width: 34, height: 44, fill: "#ffcf7a", opacity: 0.35 }, g);
          lamp(g, 300); lamp(g, 1180);
          svgEl("rect", { x: 575, y: FL - 340, width: 250, height: 260, fill: "#9fb8c8", opacity: 0.14, stroke: "#5a6a78", "stroke-width": 4 }, g);
          for (const x of [570, 830]) svgEl("rect", { x: x - 6, y: FL - 392, width: 12, height: 392, fill: "#3a4048", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 536, y: FL - 404, width: 330, height: 22, rx: 4, fill: "#4a525c", stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: 600, y: FL - 92, width: 200, height: 14, fill: "#6b4a30", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 1236, y: FL - 330, width: 8, height: 330, fill: "#555" }, g);
          svgEl("circle", { cx: 1240, cy: FL - 352, r: 30, fill: "#2a7ad8", stroke: "#000", "stroke-width": 4 }, g);
          const tx = svgEl("text", { x: 1240, y: FL - 344, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#fff", "text-anchor": "middle" }, g); tx.textContent = "BUS"; }
        // street (wide, for running)
        { const g = mk("road");
          svgEl("rect", { x: -2400, y: FL - 700, width: 6000, height: 700, fill: "#1d232b", opacity: 0.6 }, g);
          for (let i = 0; i < 16; i++) svgEl("rect", { x: -1400 + i * 260, y: FL - 640 + (i % 4) * 40, width: 170, height: 640, fill: "#151a20" }, g);
          for (let i = 0; i < 12; i++) lamp(g, -1200 + i * 420);
          for (let i = 0; i < 10; i++) svgEl("ellipse", { cx: -1100 + i * 380, cy: FL + 6, rx: 70, ry: 8, fill: "#8fb0d0", opacity: 0.25 }, g); }
        // her house: wall with a window hole (wall goes in front of inside actors)
        const roomLight = svgEl("rect", { x: 560, y: FL - 400, width: 220, height: 230, fill: "#ffcf7a", opacity: 0 }, setG);
        { const g = mk("house");
          svgEl("rect", { x: -2400, y: FL - 900, width: 6000, height: 900, fill: "#141a24" }, g);
          lamp(g, 1000); }
        const wall = svgEl("g", { opacity: 0 }, wallG);
        svgEl("path", { d: `M250 ${FL - 600} H1080 V${FL} H250 Z M560 ${FL - 400} V${FL - 170} H780 V${FL - 400} Z`, fill: "#3a3330", "fill-rule": "evenodd", stroke: "#000", "stroke-width": 6 }, wall);
        svgEl("path", { d: `M230 ${FL - 600} L665 ${FL - 820} L1100 ${FL - 600} Z`, fill: "#4a2a24", stroke: "#000", "stroke-width": 6 }, wall);
        svgEl("rect", { x: 552, y: FL - 408, width: 236, height: 246, fill: "none", stroke: "#6b4a30", "stroke-width": 14 }, wall);
        svgEl("rect", { x: 664, y: FL - 400, width: 12, height: 230, fill: "#6b4a30" }, wall);
        svgEl("rect", { x: 540, y: FL - 172, width: 260, height: 18, fill: "#6b4a30", stroke: "#000", "stroke-width": 3 }, wall);
        svgEl("rect", { x: 880, y: FL - 300, width: 130, height: 300, fill: "#2a2018", stroke: "#000", "stroke-width": 5 }, wall);
        svgEl("circle", { cx: 990, cy: FL - 150, r: 7, fill: "#d4af37" }, wall);
        // wedding hall
        { const g = mk("hall");
          svgEl("rect", { x: -2400, y: FL - 900, width: 6000, height: 900, fill: "#3a2a22" }, g);
          svgEl("circle", { cx: 640, cy: FL - 600, r: 420, fill: "url(#fireGlow)", opacity: 0.45 }, g);
          for (let i = 0; i < 8; i++) svgEl("rect", { x: -200 + i * 220, y: FL - 900, width: 40, height: 900, fill: "#2c1f19" }, g);
          svgEl("rect", { x: 180, y: FL - 330, width: 150, height: 330, fill: "#1a2232", stroke: "#000", "stroke-width": 6 }, g);
          for (let i = 0; i < 9; i++) svgEl("line", { x1: 196 + i * 15, y1: FL - 320 + (i % 3) * 40, x2: 190 + i * 15, y2: FL - 250 + (i % 3) * 40, stroke: "#8fb0d0", "stroke-width": 2, opacity: 0.5 }, g);
          const ax = 760;
          svgEl("path", { d: `M${ax - 150} ${FL} V${FL - 330} A150 150 0 0 1 ${ax + 150} ${FL - 330} V${FL}`, fill: "none", stroke: "#f2f2f2", "stroke-width": 16 }, g);
          for (let i = 0; i <= 14; i++) { const a = Math.PI * (i / 14); svgEl("circle", { cx: ax - Math.cos(a) * 150, cy: FL - 330 - Math.sin(a) * 150, r: 13, fill: i % 2 ? "#ff6a9a" : "#fff", stroke: "#000", "stroke-width": 3 }, g); }
          for (const [x, y] of [[ax - 150, FL - 200], [ax + 150, FL - 200], [ax - 150, FL - 100], [ax + 150, FL - 100]]) svgEl("circle", { cx: x, cy: y, r: 12, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3 }, g);
          for (let i = 0; i < 6; i++) svgEl("rect", { x: 380 + i * 60 - (i > 2 ? -420 : 0), y: FL - 70, width: 40, height: 70, fill: "#5a3a2a", stroke: "#000", "stroke-width": 3 }, g); }
        // ---- bus ----
        const bus = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: 0, y: FL - 330, width: 560, height: 290, rx: 26, fill: "#2a7ad8", stroke: "#000", "stroke-width": 6 }, bus);
        for (let i = 0; i < 5; i++) svgEl("rect", { x: 30 + i * 100, y: FL - 300, width: 80, height: 90, rx: 8, fill: "#cfe6ff", opacity: 0.85, stroke: "#000", "stroke-width": 4 }, bus);
        svgEl("rect", { x: 30, y: FL - 190, width: 70, height: 140, fill: "#1a4a8a", stroke: "#000", "stroke-width": 4 }, bus);
        for (const x of [110, 450]) { svgEl("circle", { cx: x, cy: FL - 38, r: 38, fill: "#222", stroke: "#000", "stroke-width": 5 }, bus); svgEl("circle", { cx: x, cy: FL - 38, r: 14, fill: "#888" }, bus); }
        svgEl("circle", { cx: 548, cy: FL - 90, r: 12, fill: "#ffe7a8", stroke: "#000", "stroke-width": 3 }, bus);
        const busFace = svgEl("g", {}, bus); // passenger head in a window
        const busHead = svgEl("circle", { cx: 270, cy: FL - 250, r: 26, fill: "#fff", stroke: "#000", "stroke-width": 5, opacity: 0 }, bus);
        // ---- actors ----
        function actor(id, front, back, opt = {}) {
          const w = svgEl("g", {}, figG);
          const a = { id, w, opt, extras: {} };
          if (opt.bun) a.extras.bun = svgEl("circle", { r: 15, fill: front, stroke: "#000", "stroke-width": 6 }, w);
          a.parts = makeFig(w, front, back, true, id);
          if (opt.veil) a.extras.veil = svgEl("path", { fill: "#ffffff", opacity: 0, stroke: "#ddd", "stroke-width": 2 }, w);
          if (opt.hat) { a.extras.hat = svgEl("g", {}, w); svgEl("rect", { x: -40, y: -6, width: 80, height: 12, rx: 4, fill: "#2a2a2a", stroke: "#000", "stroke-width": 4 }, a.extras.hat); svgEl("rect", { x: -26, y: -46, width: 52, height: 44, rx: 6, fill: "#2a2a2a", stroke: "#000", "stroke-width": 4 }, a.extras.hat); }
          if (opt.tophat) { a.extras.hat = svgEl("g", {}, w); svgEl("rect", { x: -38, y: -6, width: 76, height: 12, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 4 }, a.extras.hat); svgEl("rect", { x: -24, y: -64, width: 48, height: 62, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 4 }, a.extras.hat); svgEl("rect", { x: -24, y: -20, width: 48, height: 10, fill: "#d4af37" }, a.extras.hat); }
          if (opt.stache) a.extras.stache = svgEl("path", { d: "M-22 0 Q-11 -10 0 -2 Q11 -10 22 0 Q11 6 0 2 Q-11 6 -22 0 Z", fill: "#222", stroke: "#000", "stroke-width": 2 }, w);
          if (opt.tie) a.extras.tie = svgEl("path", { d: "M-12 -6 L12 -6 L4 4 L10 40 L0 52 L-10 40 L-4 4 Z", fill: "#d62a2a", stroke: "#000", "stroke-width": 3 }, w);
          a.on = (v) => w.setAttribute("opacity", v ? 1 : 0);
          return a;
        }
        const him = actor("him", "#ffffff", "#dedede");
        const her = actor("her", "#ffffff", "#e2e2e2", { bun: true, veil: true });
        const dad = actor("dad", "#a8a8a8", "#8a8a8a", { hat: true, stache: true });
        const rich = actor("rich", "#e8c25a", "#c9a23e", { tophat: true, tie: true });
        const kid = actor("kid", "#ffffff", "#e6e6e6");
        const ACT = { him, her, dad, rich, kid };
        // ---- props ----
        const umbrella = (col = YEL) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          const open = svgEl("g", {}, g);
          svgEl("path", { d: "M-120 0 Q0 -100 120 0 Q90 -14 60 0 Q30 -14 0 0 Q-30 -14 -60 0 Q-90 -14 -120 0 Z", fill: col, stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, open);
          svgEl("path", { d: "M0 -50 L-60 0 M0 -50 L60 0 M0 -50 L0 0", stroke: "#000", "stroke-width": 2, opacity: 0.35, fill: "none" }, open);
          const broke = svgEl("g", { opacity: 0 }, g);
          svgEl("path", { d: "M-110 -70 Q-60 -10 -10 -6 L-30 -40 Z M10 -6 Q60 -14 105 -80 L60 -40 Z", fill: col, stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, broke);
          svgEl("path", { d: "M0 -4 L-110 -70 M0 -4 L105 -80 M0 -4 L-40 -90 M0 -4 L50 -100", stroke: "#222", "stroke-width": 4, fill: "none" }, broke);
          const closed = svgEl("path", { d: "M0 -6 L-14 40 L-6 120 L6 120 L14 40 Z", fill: col, stroke: "#000", "stroke-width": 4, opacity: 0 }, g);
          svgEl("line", { x1: 0, y1: -6, x2: 0, y2: 150, stroke: "#222", "stroke-width": 6 }, g);
          svgEl("path", { d: "M0 150 q0 22 -18 18", fill: "none", stroke: "#222", "stroke-width": 7, "stroke-linecap": "round" }, g);
          return { g, open, broke, closed, span: null };
        };
        const U1 = umbrella(), U2 = umbrella("#3a3a3a");
        // mode: "open" | "closed" | "broken"; hand = where the handle is held
        function putUmb(u, hand, mode, tilt = 0, on = 1) {
          u.g.setAttribute("opacity", on);
          u.open.setAttribute("opacity", mode === "open" ? 1 : 0);
          u.broke.setAttribute("opacity", mode === "broken" ? 1 : 0);
          u.closed.setAttribute("opacity", mode === "closed" ? 1 : 0);
          u.g.setAttribute("transform", `translate(${r1(hand[0])} ${r1(hand[1])}) rotate(${r1(tilt)}) translate(0 -150)`);
          const top = [hand[0] + Math.sin(rad(tilt)) * 150, hand[1] - Math.cos(rad(tilt)) * 150];
          u.span = on && mode === "open" ? [top[0] - 115, top[0] + 115, top[1] - 10] : null;
        }
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const bigHeart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const smallH = Array.from({ length: 5 }, () => svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const brokenH = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 L-8 -4 L4 6 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, brokenH);
        svgEl("path", { d: "M0 -22 C30 -40 40 -8 0 18 L10 4 L-2 -6 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, transform: "translate(10 4)" }, brokenH);
        const plane = svgEl("path", { d: "M-30 0 L30 -6 L-20 14 L-12 4 Z", fill: "#fff", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const note = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -70, y: -40, width: 140, height: 80, rx: 6, fill: "#fff", stroke: "#000", "stroke-width": 4 }, note);
        const noteTx = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#111", "text-anchor": "middle" }, note);
        const notePieces = Array.from({ length: 6 }, () => svgEl("rect", { x: -16, y: -12, width: 32, height: 24, fill: "#fff", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const ringBox = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -26, y: -10, width: 52, height: 30, rx: 5, fill: "#b0182a", stroke: "#000", "stroke-width": 4 }, ringBox);
        const lid = svgEl("rect", { x: -26, y: -24, width: 52, height: 14, rx: 4, fill: "#c8203a", stroke: "#000", "stroke-width": 4 }, ringBox);
        const ring = svgEl("g", {}, ringBox);
        svgEl("circle", { cx: 0, cy: -16, r: 11, fill: "none", stroke: "#ffd84a", "stroke-width": 5 }, ring);
        svgEl("path", { d: "M-7 -28 L0 -38 L7 -28 L0 -24 Z", fill: "#cfefff", stroke: "#000", "stroke-width": 2 }, ring);
        const sparks = Array.from({ length: 4 }, () => svgEl("path", { d: "M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z", fill: "#fff", opacity: 0 }, fxG));
        const suitcase = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -44, y: 0, width: 88, height: 64, rx: 8, fill: "#8a5a3a", stroke: "#000", "stroke-width": 4 }, suitcase);
        svgEl("path", { d: "M-14 0 V-12 H14 V0", fill: "none", stroke: "#000", "stroke-width": 5 }, suitcase);
        const splash = Array.from({ length: 10 }, () => svgEl("circle", { r: 6, fill: "#8fb0d0", opacity: 0 }, fxG));
        const money = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 46, fill: "#34c759", stroke: "#000", "stroke-width": 2, opacity: 0, "text-anchor": "middle" }, fxG); money.textContent = "$$$";
        const bang = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 70, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0, "text-anchor": "middle" }, fxG); bang.textContent = "!";
        const tears = Array.from({ length: 4 }, () => svgEl("ellipse", { rx: 5, ry: 8, fill: "#8fd0ff", opacity: 0 }, fxG));
        const bubbles = {};
        function bubble(key, txt, col = "#111", size = 30) {
          const w = Math.max(110, txt.length * size * 0.62 + 50);
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          bubbles[key] = g;
          return g;
        }
        // ---- rain ----
        const DROPS = Array.from({ length: 170 }, (_, i) => ({ el: svgEl("line", { stroke: "#a9c4e0", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.55 }, rainG), x: rnd(), y: rnd(), v: 0.8 + 0.5 * rnd(), k: rnd() }));
        // ---- poses ----
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const pose = (x, f = 1, o = {}) => ({ ...standOn(x, f, FL), f, ...o });
        const walking = (x0, x, f, run = 0) => {
          const STR = run ? 150 : 100, ft = feetOn(x0, x, STR, run ? 30 : 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR);
          return { ...base({ hx: x, hy: stand + 3 + (run ? 10 : 3) * Math.abs(sw), torso: run ? 18 : 6, head: run ? -6 : 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + (run ? 50 : 20) * sw, ael: run ? 70 : 20, bsh: -4 - (run ? 50 : 20) * sw, bel: run ? 70 : 20 }), f };
        };
        const kneel = (x, f) => ({ ...base({ hx: x, hy: FL - 96, torso: 8, head: -10, ax: x - f * 58, ay: FL, bx: x + f * 64, by: FL - 2 }), f });
        const knees2 = (x, f) => ({ ...base({ hx: x, hy: FL - 70, torso: 20, head: 20, ax: x + f * 50, ay: FL, bx: x + f * 40, by: FL - 2 }), f });
        const lying = (x, f) => ({ ...base({ hx: x, hy: FL - 20, torso: 84, head: 0, ax: x - f * 150, ay: FL - 10, bx: x - f * 140, by: FL - 6, ash: 90, ael: 10, bsh: 80, bel: 10 }), f });
        const sitting = (x, f, y = FL - 92) => ({ ...base({ hx: x, hy: y, torso: -4, head: 2, ax: x + f * 70, ay: FL, bx: x + f * 56, by: FL - 2 }), f });
        const at = (st, k) => { // world point relative to standing shoulders/head: k = [dx, dy] in facing space
          return [st.hx + st.f * k[0], stand + k[1]];
        };
        function livePoseS(raw, t, phase, a, b) {
          const one = (tt) => raw(clamp(tt, a, b - 1e-4));
          const bl = (tt) => { const out = {}; let ws = 0; for (const [dt, w] of KER) { const p = one(tt + dt); for (const k in p) out[k] = (out[k] || 0) + p[k] * w; ws += w; } for (const k in out) out[k] /= ws; return out; };
          const s = bl(t), lag = bl(t - 0.05);
          for (const k of LAGGED) s[k] = lag[k];
          const br = Math.sin(t * 1.9 + phase);
          s.hy += br * 1.3; s.torso += br * 0.8; s.head += Math.sin(t * 1.2 + phase * 2) * 1.6;
          return s;
        }
        // ---- DOM: tag, captions, end card ----
        E("head").style.display = "none";
        const css = (el, c) => { el.style.cssText = c; E("stage").appendChild(el); return el; };
        const tagEl = css(document.createElement("div"), "position:absolute;left:0;right:0;top:206px;text-align:center;font-family:HFMono,monospace;font-weight:700;");
        const capEl = css(document.createElement("div"), "position:absolute;left:60px;right:60px;top:330px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;line-height:1.35;letter-spacing:0.06em;color:#fff;text-shadow:0 0 16px rgba(0,0,0,0.9),0 0 30px rgba(0,0,0,0.6)");
        const flashEl = E("flash");
        const dimEl = css(document.createElement("div"), "position:absolute;inset:0;background:#000;opacity:0");
        const cardEl = css(document.createElement("div"), "position:absolute;left:80px;right:80px;top:560px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.06em;opacity:0");
        const cutEl = css(document.createElement("div"), "position:absolute;inset:0;background:#000;opacity:0");
        const slam = (words, t0, t, red = [], step = 0.13) => words.map((w, i) => {
          const q = clamp((t - t0 - i * step) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="display:inline-block;margin:0 0.16em;opacity:0">${w}</span>`;
          const sc = lerp(2.0, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="display:inline-block;margin:0 0.16em;transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}${red === "y" || (Array.isArray(red) && red.includes("y" + i)) ? "color:" + YEL + ";" : ""}">${w}</span>`;
        }).join("");
        // ---- generic render ----
        // part defines: PART, TOTAL, DUR-based SCENES [{a,b,set,sky,rain,cam(t)->[cx,cy,z], cast:{him:(t)=>pose|null,...}, inside:[ids], draw(t,P)}], CAPS [[t0,t1,"TEXT",red]], CARD {t, html(t)}, FLASH [t...]
        function renderAll(t, PART, SCENES, CAPS, FLASH, CARD) {
          let sc = SCENES[0];
          for (const S of SCENES) if (t >= S.a) sc = S;
          for (const n in SETS) SETS[n].setAttribute("opacity", sc.set === n ? 1 : 0);
          wall.setAttribute("opacity", sc.set === "house" ? 1 : 0);
          roomLight.setAttribute("opacity", sc.set === "house" ? (sc.room ? sc.room(t) : 0.85) : 0);
          const skyMix = sc.sky(t);
          for (const n in SKY) SKY[n].setAttribute("opacity", skyMix[n] || 0);
          sun.setAttribute("opacity", skyMix.sun || 0); sun.setAttribute("cx", skyMix.sunX || 900); sun.setAttribute("cy", FL - 520);
          moon.setAttribute("opacity", skyMix.moon || 0); moon.setAttribute("cx", 300); moon.setAttribute("cy", FL - 560);
          bow.setAttribute("opacity", skyMix.bow || 0); bow.setAttribute("transform", `translate(${skyMix.bowX || 0} 0)`);
          // camera + shake
          let kick = 0;
          for (const f of FLASH) if (t >= f) kick += 0.6 * Math.exp(-(t - f) / 0.15);
          if (sc.kick) kick += sc.kick(t);
          const [cx, cy, z] = sc.cam(t);
          const shx = Math.sin(t * 67) * 10 * Math.min(kick, 1), shy = Math.cos(t * 59) * 7 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) scale(${(z * (1 + 0.04 * Math.min(kick, 1.5))).toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          // actors
          const PS = {};
          for (const id in ACT) {
            const a = ACT[id], fn = sc.cast[id];
            if (!fn || !fn(t)) { a.on(0); continue; }
            a.on(1);
            const parent = (sc.inside || []).includes(id) ? inG : figG;
            if (a.w.parentNode !== parent) parent.appendChild(a.w);
            const ph = { him: 0.3, her: 1.4, dad: 2.2, rich: 3.1, kid: 4.0 }[id];
            const s = livePoseS(fn, t, ph, sc.a, sc.b);
            const f = s.f === undefined ? 1 : s.f;
            const p = drawFig(a.parts, s, f);
            p.s = s; p.f = f;
            const kz = id === "kid" ? 0.55 : 1;
            a.w.setAttribute("transform", kz === 1 ? "" : `translate(${r1(s.hx)} ${FL}) scale(${kz}) translate(${r1(-s.hx)} ${-FL})`);
            const hd = p.head;
            const ex = a.extras;
            if (ex.bun) { ex.bun.setAttribute("cx", r1(hd[0] - 25 * f)); ex.bun.setAttribute("cy", r1(hd[1] - 16)); }
            if (ex.hat) ex.hat.setAttribute("transform", `translate(${r1(hd[0])} ${r1(hd[1] - 24)}) rotate(${r1(f * (s.torso + s.head) * 0.5)})`);
            if (ex.stache) ex.stache.setAttribute("transform", `translate(${r1(hd[0] + 10 * f)} ${r1(hd[1] + 12)})`);
            if (ex.tie) ex.tie.setAttribute("transform", `translate(${r1(hd[0] - (hd[0] - s.hx) * 0.35)} ${r1(hd[1] + 50)}) rotate(${r1(f * s.torso * 0.6)})`);
            if (ex.veil) { const v = sc.veil ? sc.veil(t) : 0; ex.veil.setAttribute("opacity", (0.85 * v).toFixed(3)); const fl = sc.veilFly ? sc.veilFly(t) : 0; ex.veil.setAttribute("d", `M${r1(hd[0] - 6 * f)} ${r1(hd[1] - 30)} Q${r1(hd[0] - (60 + 80 * fl) * f)} ${r1(hd[1] - 10 - 40 * fl)} ${r1(hd[0] - (50 + 140 * fl) * f)} ${r1(hd[1] + 150 - 90 * fl)} L${r1(hd[0] - (10 + 90 * fl) * f)} ${r1(hd[1] + 160 - 80 * fl)} Q${r1(hd[0] - 20 * f)} ${r1(hd[1] + 40)} ${r1(hd[0] + 4 * f)} ${r1(hd[1] - 20)} Z`); }
            if (kz !== 1) { const m = (q) => [s.hx + (q[0] - s.hx) * kz, FL + (q[1] - FL) * kz]; p.head = m(p.head); p.hands = p.hands.map(m); }
            PS[id] = p;
          }
          // reset per-frame props, then the scene draws its props
          for (const el of [plane, note, ringBox, suitcase, money, bang, bigHeart, brokenH, bus, busHead, ...smallH, ...sparks, ...notePieces, ...splash, ...tears]) el.setAttribute("opacity", 0);
          for (const k in bubbles) bubbles[k].setAttribute("opacity", 0);
          U1.span = U2.span = null; U1.g.setAttribute("opacity", 0); U2.g.setAttribute("opacity", 0);
          if (sc.draw) sc.draw(t, PS);
          // rain
          const rk = sc.rain ? sc.rain(t) : 0;
          const shields = [U1.span, U2.span, sc.set === "stop" ? [540, 860, FL - 400] : null].filter(Boolean);
          const top = cy - 1000 / z, hgt = FL + 10 - top, wdt = 1300 / z;
          DROPS.forEach((d) => {
            if (d.k > rk) { d.el.setAttribute("opacity", 0); return; }
            const y = top + frac(d.y + t * d.v * 1.6) * hgt, x = cx - wdt / 2 + frac(d.x + (y - top) * 0.0002) * wdt - (y - top) * 0.12;
            let hidden = false;
            for (const sp of shields) if (x > sp[0] && x < sp[1] && y > sp[2]) hidden = true;
            if (sc.set === "hall" || (sc.set === "house" && sc.inRoom)) hidden = true;
            d.el.setAttribute("opacity", hidden ? 0 : 0.55);
            d.el.setAttribute("x1", r1(x)); d.el.setAttribute("y1", r1(y)); d.el.setAttribute("x2", r1(x - 7)); d.el.setAttribute("y2", r1(y + 34));
          });
          // flash
          let fl = 0;
          for (const f of FLASH) if (t >= f) fl = Math.max(fl, Math.exp(-(t - f) / 0.12) * (t - f < 0.05 ? 0.9 : 0.6));
          flashEl.style.opacity = (0.75 * fl).toFixed(3);
          // quick black dip on each scene cut
          let cut = 0;
          for (const S of SCENES) if (S.a > 0) cut = Math.max(cut, 1 - clamp(Math.abs(t - S.a) / 0.14, 0, 1));
          cutEl.style.opacity = cut.toFixed(3);
          // tag + captions
          tagEl.innerHTML = `<div style="font-size:28px;letter-spacing:0.3em;color:${YEL};text-shadow:0 0 14px rgba(255,210,58,0.5)">THE YELLOW UMBRELLA</div><div style="margin-top:8px;font-size:40px;letter-spacing:0.18em;color:#fff">PART ${PART}/4</div>`;
          let cap = "";
          for (const [a, b, txt, red] of CAPS) if (t >= a && t < b) { const o = Math.min(1, (b - t) / 0.2); cap = `<div style="opacity:${o.toFixed(3)}">${slam(txt.split(" "), a, t, red || [], 0.1)}</div>`; }
          capEl.innerHTML = cap;
          // end card
          const ck = win(t, CARD.t - 0.3, CARD.t + 0.1);
          dimEl.style.opacity = (0.82 * ck).toFixed(3);
          capEl.style.opacity = (1 - ck).toFixed(3);
          cardEl.style.opacity = ck.toFixed(3);
          if (ck > 0) cardEl.innerHTML = CARD.html(t);
          return PS;
        }
        const follow = (t, t0, next) => {
          const q = clamp((t - t0) / 0.3, 0, 1), pulse = 1 + 0.05 * Math.sin((t - t0) * 7) * (q >= 1 ? 1 : 0);
          return `<div style="display:inline-block;margin-top:70px;padding:22px 44px 18px;background:${YEL};color:#000;font-size:54px;letter-spacing:0.12em;transform:scale(${(backOut(q) * pulse).toFixed(3)});box-shadow:0 0 40px rgba(255,210,58,0.55)">PART ${next} →</div><div style="margin-top:34px;font-size:40px;letter-spacing:0.3em;opacity:${q.toFixed(3)}">FOLLOW</div>`;
        };
        const placeHeart = (p, k, t) => { const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)); bigHeart.setAttribute("opacity", k > 0 ? 1 : 0); bigHeart.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(backOut(k) * 1.1 * beat).toFixed(3)})`); };
        const floatHearts = (p, t0, t) => smallH.forEach((h, k) => { const q = clamp((t - t0 - k * 0.18) / 0.9, 0, 1); h.setAttribute("opacity", q > 0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(p[0] + 30 - k * 18)} ${r1(p[1] - 60 * q)}) scale(0.45)`); });
        const say = (key, k, p) => { const g = bubbles[key]; g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
        const cry = (p, t, f) => tears.forEach((e, i) => { const q = frac(t * 1.3 + i / 4); e.setAttribute("opacity", Math.sin(Math.PI * q).toFixed(3)); e.setAttribute("cx", r1(p[0] + f * (12 + (i % 2) * -24))); e.setAttribute("cy", r1(p[1] + 10 + 70 * q)); });
        const doSplash = (p, t0, t) => splash.forEach((e, i) => { const q = clamp((t - t0) / 0.6, 0, 1); const ang = Math.PI * (0.15 + 0.7 * (i / 9)); e.setAttribute("opacity", q > 0 && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("cx", r1(p[0] + Math.cos(ang) * 120 * q)); e.setAttribute("cy", r1(p[1] - Math.sin(ang) * 140 * q + 200 * q * q)); });
