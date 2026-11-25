        // ---------- "sky proposal" (viral remake, 5.49M views "Best Proposal Ever!" - a small-plane flight, she reads a card): a small plane over morning fields. Inside, he passes her a card over his shoulder: "LOOK DOWN." She looks out of the window: mown into the field below, "WILL YOU MARRY ME?" and a heart. Back inside he has turned around with an open ring box. "YES!" She hugs him from behind. Outside the plane draws a heart in the sky. FOLLOW: the plane skywrites "+ FOLLOW", flies back through it → "FOLLOWING ✓" + hearts. ----------
        const cam = E("svg").children[1];
        const W = E("world");
        const roomG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const S1 = 2.6, T_CARD = 3.1, T_TAKE = 3.7, T_READ = 4.1, T_BIG = 4.4, T_BIGOFF = 5.6, T_LOOK = 5.6, S2 = 6.2, S3 = 8.6, T_RING = 8.9, T_WILL = 9.2, T_YES = 9.9, T_HUG = 10.4, S4 = 11.4, T_HEND = 13.8;
        const T_L2 = 12.0, T_L3 = 13.0;
        const T_CTA = 14.6, T_SKY0 = 14.7, T_SKY1 = 16.0, T_BACK0 = 16.0, T_BACK1 = 17.4, T_TAP = 16.7;
        const HE = 650, SHE = 400;
        const scene = (s) => (s < S1 ? 0 : s < S2 ? 1 : s < S3 ? 2 : s < S4 ? 1 : 3);

        // ---------- exterior (sky) ----------
        const extG = svgEl("g", {}, roomG);
        svgEl("rect", { x: -800, y: -1200, width: 2700, height: 2600, fill: "url(#skyM)" }, extG);
        const sunE = svgEl("circle", { cx: 900, cy: -180, r: 70, fill: "#ffe0a0", stroke: "#000", "stroke-width": 5 }, extG);
        const extClouds = Array.from({ length: 5 }, (_, i) => { const c = svgEl("g", {}, extG); for (const [dx, dy, r] of [[-50, 0, 34], [0, -16, 46], [52, 0, 36]]) svgEl("circle", { cx: dx, cy: dy, r, fill: "#f4ece4", stroke: "#000", "stroke-width": 4 }, c); return c; });
        const fieldsE = svgEl("g", {}, extG);
        for (let i = 0; i < 9; i++) for (let r = 0; r < 3; r++) svgEl("polygon", { points: `${-300 + i * 200 + r * 40},${720 + r * 90} ${-110 + i * 200 + r * 40},${720 + r * 90} ${-90 + i * 200 + (r + 1) * 40},${810 + r * 90} ${-280 + i * 200 + (r + 1) * 40},${810 + r * 90}`, fill: ["#4a7a3a", "#6a9a4a", "#8aa84a", "#5a8a5a"][(i + r * 2) % 4], stroke: "#000", "stroke-width": 4 }, fieldsE);
        const trail = svgEl("path", { fill: "none", stroke: "#ffffff", "stroke-width": 22, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.85, filter: "url(#soft)" }, extG);
        const trail2 = svgEl("path", { fill: "none", stroke: "#ffffff", "stroke-width": 12, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.9 }, extG);
        // skywriting
        const skyClip = svgEl("clipPath", { id: "skyClip" }, E("svg").querySelector("defs"));
        const skyClipR = svgEl("rect", { x: -400, y: -400, width: 0, height: 500 }, skyClip);
        const skyG = svgEl("g", { "clip-path": "url(#skyClip)" }, extG);
        const skyT1 = svgEl("text", { x: 540, y: -110, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 118, fill: "none", stroke: "#ffffff", "stroke-width": 26, "stroke-linejoin": "round", "text-anchor": "middle", filter: "url(#soft)", opacity: 0.8 }, skyG);
        const skyT2 = svgEl("text", { x: 540, y: -110, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 118, fill: "#ffffff", stroke: "#e8e0dc", "stroke-width": 4, "text-anchor": "middle" }, skyG);
        const skyHearts = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, extG));
        const mkPlane = (parent) => {
          const g = svgEl("g", {}, parent);
          svgEl("path", { d: "M-130 -6 L-150 -60 L-120 -60 L-90 -12 Z", fill: "#ffffff", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, g);
          svgEl("path", { d: "M-140 0 Q-60 -26 60 -30 Q120 -30 130 -6 Q130 16 100 20 L-110 14 Q-140 10 -140 0 Z", fill: "#ffffff", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, g);
          svgEl("path", { d: "M-140 2 L130 0", stroke: "#ff3b30", "stroke-width": 7 }, g);
          svgEl("path", { d: "M10 -30 L30 -58 L86 -54 L100 -30 Z", fill: "#bfe0ff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("circle", { cx: 46, cy: -40, r: 10, fill: "#fff", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("circle", { cx: 72, cy: -42, r: 10, fill: "#fff", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("path", { d: "M-10 -58 L110 -58", stroke: "#000", "stroke-width": 10, "stroke-linecap": "round" }, g);
          svgEl("path", { d: "M-10 -58 L110 -58", stroke: "#ffffff", "stroke-width": 5, "stroke-linecap": "round" }, g);
          svgEl("path", { d: "M50 18 L40 40 M70 18 L80 40", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("circle", { cx: 40, cy: 44, r: 8, fill: "#333", stroke: "#000", "stroke-width": 3 }, g); svgEl("circle", { cx: 80, cy: 44, r: 8, fill: "#333", stroke: "#000", "stroke-width": 3 }, g);
          const prop = svgEl("ellipse", { cx: 136, cy: -4, rx: 6, ry: 40, fill: "#c8c8c8", opacity: 0.6, stroke: "#000", "stroke-width": 2 }, g);
          return { g, prop };
        };
        const plane = mkPlane(extG);

        // ---------- interior ----------
        const inG = svgEl("g", {}, roomG);
        svgEl("rect", { x: -800, y: -1200, width: 2700, height: 2600, fill: "#1a1c22" }, inG);
        const winG = svgEl("g", {}, inG);
        const winClip = svgEl("clipPath", { id: "winClip" }, E("svg").querySelector("defs"));
        svgEl("rect", { x: 210, y: FL - 470, width: 720, height: 230, rx: 60 }, winClip);
        const winIn = svgEl("g", { "clip-path": "url(#winClip)" }, winG);
        svgEl("rect", { x: 200, y: FL - 480, width: 740, height: 260, fill: "url(#skyM)" }, winIn);
        const winClouds = Array.from({ length: 4 }, () => { const c = svgEl("g", {}, winIn); for (const [dx, dy, r] of [[-40, 0, 26], [0, -12, 34], [40, 0, 28]]) svgEl("circle", { cx: dx, cy: dy, r, fill: "#f4ece4", stroke: "#000", "stroke-width": 3 }, c); return c; });
        svgEl("rect", { x: 210, y: FL - 470, width: 720, height: 230, rx: 60, fill: "none", stroke: "#000", "stroke-width": 14 }, winG);
        svgEl("rect", { x: 210, y: FL - 470, width: 720, height: 230, rx: 60, fill: "none", stroke: "#4a4e58", "stroke-width": 7 }, winG);
        svgEl("rect", { x: -800, y: FL, width: 2700, height: 800, fill: "#101116" }, inG);
        svgEl("path", { d: `M-800 ${FL} L1900 ${FL}`, stroke: "#000", "stroke-width": 6 }, inG);
        // instrument panel + yoke
        svgEl("path", { d: `M880 ${FL - 260} L1100 ${FL - 260} L1100 ${FL - 120} L860 ${FL - 160} Z`, fill: "#2a2c34", stroke: "#000", "stroke-width": 6 }, inG);
        for (const [x, y] of [[920, FL - 220], [970, FL - 225], [1020, FL - 220]]) { svgEl("circle", { cx: x, cy: y, r: 16, fill: "#0e1014", stroke: "#8a8e98", "stroke-width": 3 }, inG); svgEl("path", { d: `M${x} ${y} L${x + 8} ${y - 10}`, stroke: "#ffcf3a", "stroke-width": 3 }, inG); }
        svgEl("path", { d: `M860 ${FL - 190} L770 ${FL - 200}`, stroke: "#000", "stroke-width": 12, "stroke-linecap": "round" }, inG);
        svgEl("path", { d: `M770 ${FL - 230} L770 ${FL - 170}`, stroke: "#000", "stroke-width": 12, "stroke-linecap": "round" }, inG);
        // seats
        for (const x of [SHE, HE]) { svgEl("rect", { x: x - 62, y: FL - 330, width: 40, height: 230, rx: 14, fill: "#5a3a3a", stroke: "#000", "stroke-width": 5 }, inG); svgEl("rect", { x: x - 62, y: FL - 112, width: 130, height: 34, rx: 10, fill: "#6a4444", stroke: "#000", "stroke-width": 5 }, inG); }
        const glowIn = svgEl("circle", { cx: 520, cy: FL - 260, r: 300, fill: "url(#fireGlow)", opacity: 0 }, inG);

        // ---------- field (her view down) ----------
        const fieldG = svgEl("g", {}, roomG);
        svgEl("rect", { x: -800, y: -1200, width: 2700, height: 2600, fill: "#3f6e34" }, fieldG);
        const fieldInner = svgEl("g", {}, fieldG);
        for (let i = 0; i < 14; i++) svgEl("rect", { x: -400 + i * 140, y: -600, width: 70, height: 1800, fill: "#4a7c3c", opacity: 0.6 }, fieldInner);
        svgEl("rect", { x: 100, y: 60, width: 880, height: 600, fill: "#5a8c44", stroke: "#2a4a22", "stroke-width": 8 }, fieldInner);
        const mown = (txt, y, size) => { svgEl("text", { x: 540, y, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: "#c8e8a0", stroke: "#2a4a22", "stroke-width": 5, "text-anchor": "middle" }, fieldInner).textContent = txt; };
        mown("WILL YOU", 230, 120); mown("MARRY ME?", 380, 120);
        svgEl("path", { d: "M540 610 C430 540 450 450 540 500 C630 450 650 540 540 610 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 6 }, fieldInner);
        for (let i = 0; i < 7; i++) svgEl("circle", { cx: 150 + i * 130, cy: 720 + (i % 2) * 30, r: 34, fill: "#2e5a28", stroke: "#000", "stroke-width": 4 }, fieldInner);
        const shadowP = svgEl("path", { d: "M-80 0 L80 0 M0 -70 L0 70 M-30 60 L30 60", stroke: "#000", "stroke-width": 26, "stroke-linecap": "round", opacity: 0.25 }, fieldInner);
        const fieldFrame = svgEl("rect", { x: -60, y: -200, width: 1200, height: 1100, rx: 200, fill: "none", stroke: "#1a1c22", "stroke-width": 160, opacity: 0.9 }, fieldG);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const mkSet = () => { const g = svgEl("g", {}, fxG); svgEl("path", { d: "M-34 0 Q-36 -46 0 -46 Q36 -46 34 0", fill: "none", stroke: "#000", "stroke-width": 8 }, g); svgEl("rect", { x: -44, y: -14, width: 18, height: 30, rx: 6, fill: "#3a3e48", stroke: "#000", "stroke-width": 4 }, g); svgEl("rect", { x: 26, y: -14, width: 18, height: 30, rx: 6, fill: "#3a3e48", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M36 12 Q44 34 22 40", fill: "none", stroke: "#000", "stroke-width": 4 }, g); return g; };
        const setHim = mkSet(), setHer = mkSet();
        const card = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -22, y: -16, width: 44, height: 32, rx: 3, fill: "#f6f2ea", stroke: "#000", "stroke-width": 3 }, card);
        svgEl("path", { d: "M-10 -4 L10 -4 M-10 4 L6 4", stroke: "#c0282a", "stroke-width": 3 }, card);
        const bigCard = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -230, y: -150, width: 460, height: 300, rx: 10, fill: "#f6f2ea", stroke: "#000", "stroke-width": 8 }, bigCard);
        svgEl("text", { x: 0, y: -40, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#555", "text-anchor": "middle" }, bigCard).textContent = "BEFORE WE LAND...";
        svgEl("text", { x: 0, y: 40, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 64, fill: "#c0282a", "text-anchor": "middle" }, bigCard).textContent = "LOOK DOWN.";
        svgEl("path", { d: "M0 112 C-26 96 -19 74 0 86 C19 74 26 96 0 112 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, bigCard);
        const ringBox = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -20, y: -6, width: 40, height: 24, rx: 4, fill: "#c0282a", stroke: "#000", "stroke-width": 4 }, ringBox);
        const lid = svgEl("rect", { x: -20, y: -16, width: 40, height: 12, rx: 4, fill: "#c0282a", stroke: "#000", "stroke-width": 4 }, ringBox);
        const ring = svgEl("g", { opacity: 0 }, ringBox);
        svgEl("circle", { cx: 0, cy: -8, r: 8, fill: "none", stroke: "#ffcf3a", "stroke-width": 4 }, ring);
        svgEl("path", { d: "M-5 -18 L0 -26 L5 -18 Z", fill: "#bfe8ff", stroke: "#000", "stroke-width": 2 }, ring);
        const sparkles = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z", fill: "#fff6c0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt; return g;
        };
        const bWill = bubble("WILL YOU?", 210, 28), bYes = bubble("YES!!", 150, 34, "#c0282a");
        const hugHearts = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        // ---------- poses (seated, both face the nose = right) ----------
        const sitAt = (x, f, o) => base({ hx: x, hy: FL - 112, torso: 4, head: 0, ax: x + f * 64, ay: FL, bx: x + f * 48, by: FL, ...o });
        function himRaw(s) {
          const turned = s > S3 - 0.1;
          const st = sitAt(HE, turned ? -1 : 1, { torso: turned ? 8 : 4 });
          if (!turned) {
            reachTo(st, 1, [770, FL - 225]); reachTo(st, 1, [764, FL - 205], "b");
            const cd = hold(s, T_CARD, T_TAKE + 0.3, 0.3); reachTo(st, cd, [SHE + 110, FL - 250], "b"); st.head = lerp(st.head, -6, cd);
          } else {
            const box = 1 - win(s, T_HUG, T_HUG + 0.4) * 0.5;
            reachTo(st, box, [HE - 86, FL - 236]); reachTo(st, box, [HE - 80, FL - 230], "b");
            st.head = lerp(-4, 8, win(s, T_YES, T_YES + 0.3));
            reachTo(st, win(s, T_HUG, T_HUG + 0.4), [SHE + 170, FL - 270], "b");
          }
          return st;
        }
        function herRaw(s) {
          const st = sitAt(SHE, 1, {});
          if (s < S3) {
            const tk = hold(s, T_TAKE - 0.2, T_LOOK + 0.2, 0.25); reachTo(st, tk, [SHE + 92, FL - 236]); reachTo(st, win(s, T_READ - 0.2, T_READ) * tk, [SHE + 84, FL - 228], "b");
            st.head = lerp(st.head, 16, win(s, T_READ, T_READ + 0.3) * (1 - win(s, T_LOOK, T_LOOK + 0.2)));
            const lk = win(s, T_LOOK, T_LOOK + 0.4); st.head = lerp(st.head, 34, lk); st.torso = lerp(st.torso, -10, lk);
          } else {
            const mouth = hold(s, S3, T_YES + 0.4, 0.2); reachTo(st, mouth, [SHE + 34, FL - 330]); reachTo(st, mouth, [SHE + 28, FL - 320], "b");
            st.head = lerp(st.head, -6, mouth);
            const hg = win(s, T_HUG, T_HUG + 0.5); st.torso = lerp(st.torso, 30, hg); st.head = lerp(st.head, 10, hg);
            reachTo(st, hg, [HE - 20, FL - 300]); reachTo(st, hg, [HE - 30, FL - 290], "b");
          }
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:420px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(0,0,0,0.7)";
        E("stage").appendChild(cap);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:1560px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a;text-shadow:0 0 10px rgba(0,0,0,0.8)";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const CAPS = [[0.3, "JUST A MORNING FLIGHT."], [T_CARD + 0.2, "HE PASSES HER A CARD."], [T_LOOK, "SHE LOOKS DOWN...", 2], [S3 + 0.1, "HE TURNS AROUND.", 2], [T_YES, "YES!", 0]];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";
        E("head").style.textShadow = "0 0 10px rgba(0,0,0,0.8)";

        function camAt(s) {
          const sc = scene(s);
          if (sc === 0) return [1, 540, 400];
          if (sc === 1 && s < S2) return [lerp(1.5, 1.62, sm(s, S1, S2)), lerp(560, 520, sm(s, S1, S2)), FL - 210];
          if (sc === 2) return [lerp(1.0, 1.25, sm(s, S2, S3)), 540, 360];
          if (sc === 1) return [lerp(1.6, 1.75, sm(s, S3, S4)), 540, FL - 220];
          return [1, 540, 400];
        }
        const heartPt = (q) => { const a = Math.PI * 2 * q + Math.PI; const x = 16 * Math.pow(Math.sin(a), 3), y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); return [540 + x * 17, 160 + y * 17]; };

        function render(t) {
          const s = t, sc = scene(s), c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          extG.style.display = sc === 0 || sc === 3 ? "" : "none";
          inG.style.display = sc === 1 ? "" : "none";
          fieldG.style.display = sc === 2 ? "" : "none";
          figG.style.display = sc === 1 ? "" : "none";
          // exterior
          extClouds.forEach((cl, i) => { const x = ((i * 300 - s * (40 + i * 10)) % 1600 + 1600) % 1600 - 300; cl.setAttribute("transform", `translate(${r1(x)} ${-250 + i * 110}) scale(${0.8 + (i % 2) * 0.4})`); });
          let px, py, rot = 0, f = 1;
          if (sc === 0) { px = lerp(-250, 1350, s / S1); py = 230 + 14 * Math.sin(s * 2.2); rot = -3; }
          else if (s < T_HEND) { const q = clamp((s - S4) / (T_HEND - S4), 0, 1), p = heartPt(q), p2 = heartPt(Math.min(1, q + 0.01)); px = p[0]; py = p[1]; rot = (Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 180) / Math.PI; }
          else if (s < T_SKY0) { const q = sm(s, T_HEND, T_SKY0 - 0.05); px = lerp(heartPt(1)[0], 1400, q); py = lerp(heartPt(1)[1], 0, q); rot = -10; }
          else if (s < T_SKY1) { px = lerp(-250, 1350, (s - T_SKY0) / (T_SKY1 - T_SKY0)); py = -100 + 6 * Math.sin(s * 3); }
          else { px = lerp(1350, -260, (s - T_BACK0) / (T_BACK1 - T_BACK0)); py = -60 + 6 * Math.sin(s * 3); f = -1; }
          plane.g.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${r1(rot)}) scale(${f} 1)`);
          plane.prop.setAttribute("ry", r1(30 + 12 * Math.sin(s * 60)));
          // heart trail
          if (sc === 3) {
            const q = clamp((s - S4) / (T_HEND - S4), 0, 1); let d = "";
            for (let k = 0; k <= 80 * q; k++) { const p = heartPt(k / 80); d += (k ? "L" : "M") + r1(p[0]) + " " + r1(p[1]); }
            const fadeT = 1 - sm(s, T_CTA - 0.4, T_CTA + 0.3);
            trail.setAttribute("d", d); trail2.setAttribute("d", d); trail.setAttribute("opacity", (0.85 * fadeT).toFixed(3)); trail2.setAttribute("opacity", (0.9 * fadeT).toFixed(3));
            trail2.setAttribute("stroke", s > T_HEND - 0.2 ? "#ff8a80" : "#ffffff");
          } else { trail.setAttribute("d", ""); trail2.setAttribute("d", ""); }
          // skywriting FOLLOW
          const tapped = s > T_TAP;
          const reveal = s < T_SKY0 ? 0 : s < T_SKY1 ? px - 120 + 400 : 2000;
          skyClipR.setAttribute("width", r1(Math.max(0, reveal)));
          const puff = tapped ? 1 + 0.1 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.3, 0, 1)) : 1;
          [skyT1, skyT2].forEach((tx) => { tx.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; tx.setAttribute("font-size", tapped ? 92 : 118); tx.setAttribute("transform", `translate(540 -140) scale(${puff.toFixed(3)}) translate(-540 140)`); });
          skyT2.setAttribute("fill", tapped ? "#ffe0e0" : "#ffffff");
          skyHearts.forEach((h, i) => { const q = clamp((s - T_TAP) / 1.3, 0, 1), a = (i / 12) * Math.PI * 2; h.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(540 + Math.cos(a) * 420 * Math.sqrt(q))} ${r1(-140 + Math.sin(a) * 200 * Math.sqrt(q))}) scale(${(1.4 - 0.6 * q).toFixed(2)})`); });
          // interior
          winClouds.forEach((cl, i) => { const x = ((i * 260 - s * 260) % 1040 + 1040) % 1040 + 100; cl.setAttribute("transform", `translate(${r1(x)} ${FL - 400 + (i % 2) * 90})`); });
          glowIn.setAttribute("opacity", (0.35 * win(s, T_YES, T_YES + 0.5)).toFixed(3));
          const turned = s > S3 - 0.1;
          const mp = drawFig(him, livePose(himRaw, s, 0.3), turned ? -1 : 1);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const setOn = sc === 1 ? 1 : 0;
          setHim.setAttribute("opacity", setOn); setHer.setAttribute("opacity", setOn);
          setHim.setAttribute("transform", `translate(${r1(mp.head[0])} ${r1(mp.head[1])})`); setHer.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1])})`);
          // card: his hand → her hands
          const cardOn = sc === 1 && s > T_CARD - 0.1 && s < S2;
          const cp = s < T_TAKE ? mp.hands[1] : hp.hands[0];
          card.setAttribute("opacity", cardOn ? 1 : 0); card.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1])}) rotate(-8)`);
          const bk = hold(s, T_BIG, T_BIGOFF, 0.25);
          bigCard.setAttribute("opacity", (sc === 1 ? bk : 0).toFixed(3));
          bigCard.setAttribute("transform", `translate(520 ${FL - 330}) scale(${(0.4 + 0.25 * backOut(bk)).toFixed(3)}) rotate(-3)`);
          // ring box
          const rbOn = sc === 1 && s > S3;
          const rp = [(mp.hands[0][0] + mp.hands[1][0]) / 2, (mp.hands[0][1] + mp.hands[1][1]) / 2];
          ringBox.setAttribute("opacity", rbOn ? 1 : 0); ringBox.setAttribute("transform", `translate(${r1(rp[0])} ${r1(rp[1] - 8)}) scale(1.2)`);
          const op = sm(s, T_RING, T_RING + 0.25);
          lid.setAttribute("transform", `translate(0 ${r1(-6 * op)}) rotate(${r1(-70 * op)} -20 -10)`); ring.setAttribute("opacity", op);
          sparkles.forEach((e, i) => { const ph = frac(s * 1.3 + i / 6), a = i * 1.05; e.setAttribute("opacity", rbOn && op > 0.5 && s < T_HUG ? (Math.sin(Math.PI * ph)).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(rp[0] + Math.cos(a) * 34)} ${r1(rp[1] - 30 + Math.sin(a) * 24)}) scale(${(0.5 + 0.5 * Math.sin(Math.PI * ph)).toFixed(2)})`); });
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", (sc === 1 ? k : 0).toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.5 + 0.3 * backOut(k)).toFixed(3)})`); };
          bub(bWill, T_WILL, T_YES - 0.1, [mp.head[0] + 10, mp.head[1] - 74]);
          bub(bYes, T_YES, S4 - 0.1, [hp.head[0] + 10, hp.head[1] - 74]);
          hugHearts.forEach((h, i) => { const q = clamp((s - T_HUG - i * 0.12) / 1.0, 0, 1); h.setAttribute("opacity", sc === 1 && s > T_HUG + i * 0.12 && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(520 + (i - 3.5) * 22 + 10 * Math.sin(q * 6 + i))} ${r1(FL - 330 - 140 * q)}) scale(${(0.5 + 0.2 * (i % 3)).toFixed(2)})`); });
          // field: plane shadow crosses, slow zoom
          shadowP.setAttribute("transform", `translate(${r1(lerp(-200, 1300, (s - S2) / (S3 - S2)))} ${r1(lerp(520, 420, (s - S2) / (S3 - S2)))}) rotate(-8)`);

          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < S4 - 0.2 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [S1, S2, S3, S4]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SHE THOUGHT IT WAS JUST A FLIGHT.", L3 = "THE QUESTION WAS ON THE GROUND.";
          E("head").innerHTML = `<div>HE TOOK HER FLYING.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 30)))}&nbsp;</div>`;
          E("head").style.opacity = (sc === 2 ? 0.0 : 1 - 0.7 * win(s, T_SKY0 + 0.3, T_SKY0 + 0.7)).toFixed(3);
          const TT = "WOULD YOU SAY YES UP THERE?";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_TAP - 0.4) * 28)));
          fade.style.opacity = win(s, DUR - 0.4, DUR - 0.02).toFixed(3);
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
