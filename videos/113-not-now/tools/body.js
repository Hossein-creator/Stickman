        // ---------- "not now" (ONE-SIDED LOVE, format 2, she loves, he ignores): a living room, a couch (right), a photo board (left), a door (far left). DAY 1 she takes a selfie of them on the couch - in the photo she smiles, he looks at his phone. DAY 30 "SMILE? ♥" - he gets up and walks out of the shot. DAY 90 he pushes her phone down: "NOT NOW." DAY 365 the board is full of photos where he never looks; she pins one last photo of herself alone and leaves with a suitcase. He looks up for the first time and walks to the board. FOLLOW: a new polaroid "+ FOLLOW" on the board, he taps it → "FOLLOWING ✓". ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const C = [0, 4.4, 8.4, 12.0];                          // DAY 1 / 30 / 90 / 365
        const T_RAISE1 = 0.6, T_SNAP1 = 1.4, IG1 = 2.0, T_C1 = 2.6;
        const T_ASK2 = 4.8, T_UP2 = 5.2, T_SNAP2 = 5.9, IG2 = 6.1, T_C2 = 6.6;
        const T_RAISE3 = 9.0, IG3 = 9.6, T_C3 = 10.0;
        const T_PIN4 = 12.4, T_SHAT = 13.1, T_LEAVE = 13.5, T_OUT = 14.8, T_LOOK = 15.2, T_STAND = 15.6, T_AT = 16.6, T_READ = 16.8;
        const T_L2 = 18.4, T_L3 = 19.4;
        const T_CTA = 21.2, T_PIN = 21.7, T_TAP = 23.2;
        const BX = 290, BY = FL - 450, BW = 300, BH = 230, DOORX = 70, HERS = 600, HIMS = 720;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- room ----------
        const warm = svgEl("circle", { cx: 600, cy: FL - 220, r: 440, fill: "url(#fireGlow)", opacity: 0.2 }, backG);
        svgEl("polygon", { points: `${HERS - 40},${FL - 520} ${HIMS + 40},${FL - 520} ${HIMS + 160},${FL} ${HERS - 160},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        const doorLight = svgEl("rect", { x: DOORX - 55, y: FL - 300, width: 110, height: 300, fill: "#3a4258", opacity: 0 }, roomG);
        svgEl("rect", { x: DOORX - 65, y: FL - 310, width: 130, height: 310, fill: "none", stroke: "#3a3a42", "stroke-width": 10 }, roomG);
        const doorP = svgEl("rect", { x: DOORX - 55, y: FL - 300, width: 110, height: 300, fill: "#2a2018", stroke: "#000", "stroke-width": 5 }, roomG);
        // photo board
        svgEl("rect", { x: BX - BW / 2, y: BY, width: BW, height: BH, rx: 6, fill: "#8a6a4a", stroke: "#000", "stroke-width": 6 }, roomG);
        svgEl("rect", { x: BX - BW / 2 + 10, y: BY + 10, width: BW - 20, height: BH - 20, fill: "#a8845a" }, roomG);
        const mini = (g, kind, col = "#ffffff") => {
          svgEl("rect", { x: -16, y: -19, width: 32, height: 38, fill: "#f4f4f4", stroke: "#000", "stroke-width": 2 }, g);
          svgEl("rect", { x: -13, y: -16, width: 26, height: 24, fill: "#2a3040" }, g);
          svgEl("circle", { cx: -5, cy: -6, r: 4.5, fill: col, stroke: "#000", "stroke-width": 1.5 }, g);
          if (kind === 0) { svgEl("circle", { cx: 6, cy: -2, r: 4.5, fill: col, stroke: "#000", "stroke-width": 1.5 }, g); svgEl("rect", { x: 3, y: 3, width: 4, height: 4, fill: "#6aa8ff" }, g); }
        };
        const PH = [];
        for (let i = 0; i < 32; i++) { const col = i % 8, row = Math.floor(i / 8); const g = svgEl("g", { transform: `translate(${BX - BW / 2 + 32 + col * 34 + ((i * 7) % 5)} ${BY + 34 + row * 50 + ((i * 11) % 6)}) rotate(${((i * 37) % 12) - 6})`, opacity: 0 }, roomG); mini(g, 0); PH.push(g); }
        const lastP = svgEl("g", { opacity: 0 }, roomG); mini(lastP, 1);
        const newP = svgEl("g", { opacity: 0 }, roomG);
        const newR = svgEl("rect", { x: -40, y: -30, width: 80, height: 60, fill: "#f4f4f4", stroke: "#000", "stroke-width": 3 }, newP);
        const newT = svgEl("text", { x: 0, y: 5, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 13, fill: "#c0282a", "text-anchor": "middle" }, newP);
        // couch (facing left)
        svgEl("rect", { x: HERS - 60, y: FL - 104, width: 260, height: 44, rx: 10, fill: "#5a4a6a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: HIMS + 60, y: FL - 230, width: 40, height: 170, rx: 12, fill: "#4a3a5a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: HERS - 76, y: FL - 150, width: 36, height: 90, rx: 12, fill: "#4a3a5a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: HERS - 60, y: FL - 60, width: 260, height: 60, fill: "#3a2e48", stroke: "#000", "stroke-width": 5 }, roomG);
        // lamp
        svgEl("rect", { x: 880, y: FL - 260, width: 8, height: 260, fill: "#3a3a42", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("path", { d: `M850 ${FL - 260} L918 ${FL - 260} L900 ${FL - 310} L868 ${FL - 310} Z`, fill: "#e8d8a8", stroke: "#000", "stroke-width": 4 }, roomG);

        // props
        const herPhone = svgEl("rect", { x: -10, y: -15, width: 20, height: 30, rx: 4, fill: "#ffd0e0", stroke: "#000", "stroke-width": 3 }, propG);
        const hisPhone = svgEl("rect", { x: -9, y: -14, width: 18, height: 28, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, propG);
        const hisGlow = svgEl("circle", { r: 55, fill: "url(#phoneGlow)", opacity: 0.7 }, propG);
        const suit = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -26, y: -64, width: 52, height: 64, rx: 6, fill: "#8a4a6a", stroke: "#000", "stroke-width": 4 }, suit);
        const handP = svgEl("g", { opacity: 0 }, propG); mini(handP, 1);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = ["M-2 -34 L6 -20 L-4 -8", "M-4 -8 L8 4 L-2 16", "M-2 16 L4 28 M-30 -30 L-18 -18 L-26 -6 M28 -28 L18 -14 L26 -2"].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const shards = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: ["M0 0 L-20 -16 L-6 -24 Z", "M0 0 L18 -18 L6 -26 Z", "M0 0 L-22 8 L-12 18 Z", "M0 0 L20 8 L10 20 Z", "M0 0 L-8 18 L6 22 Z", "M0 0 L-4 -20 L12 -14 Z"][i], fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt; return g;
        };
        const bSmile = bubble("SMILE? ♥", 180, 28), bNot = bubble("NOT NOW.", 190, 30, "#c0282a");
        // big polaroid cards: 0 both (he looks at phone), 1 he walks out, 2 hand blocks, 3 her alone
        const card = (kind) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -120, y: -130, width: 240, height: 270, fill: "#f6f6f6", stroke: "#000", "stroke-width": 6 }, g);
          svgEl("rect", { x: -104, y: -114, width: 208, height: 200, fill: "#2a3040" }, g);
          const fig = (x, y, tilt, bunL) => { const h = svgEl("g", { transform: `translate(${x} ${y}) rotate(${tilt})` }, g); svgEl("path", { d: "M0 18 L0 90", stroke: "#000", "stroke-width": 26, "stroke-linecap": "round" }, h); svgEl("path", { d: "M0 18 L0 90", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round" }, h); if (bunL) svgEl("circle", { cx: -24, cy: -14, r: 12, fill: "#fff", stroke: "#000", "stroke-width": 5 }, h); svgEl("circle", { r: 26, fill: "#fff", stroke: "#000", "stroke-width": 5 }, h); };
          if (kind !== 2) fig(-44, -30, 0, true);
          if (kind === 0) { fig(46, -16, 24, false); svgEl("circle", { cx: 52, cy: 46, r: 30, fill: "url(#phoneGlow)" }, g); svgEl("rect", { x: 44, y: 36, width: 16, height: 24, rx: 3, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, g); }
          if (kind === 1) { const h = svgEl("g", { transform: "translate(104 -20)" }, g); svgEl("path", { d: "M-6 18 L-6 90", stroke: "#000", "stroke-width": 26, "stroke-linecap": "round" }, h); svgEl("path", { d: "M-6 18 L-6 90", stroke: "#fff", "stroke-width": 16, "stroke-linecap": "round" }, h); svgEl("rect", { x: 0, y: -40, width: 30, height: 150, fill: "#f6f6f6" }, h); }
          if (kind === 2) { svgEl("ellipse", { cx: 0, cy: -14, rx: 86, ry: 96, fill: "#d8d8d8", stroke: "#000", "stroke-width": 5, filter: "url(#blur)" }, g); }
          if (kind === 3) { svgEl("path", { d: "M-58 -16 Q-44 -8 -30 -16", fill: "none", stroke: "#000", "stroke-width": 4 }, g); }
          const cap = svgEl("text", { x: 0, y: 122, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#333", "text-anchor": "middle" }, g);
          cap.textContent = ["US ♥", "US?", "...", "ME."][kind];
          return g;
        };
        const cards = [card(0), card(1), card(2), card(3)];
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, head = 22) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 10, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };
        const sitAt = (x, f, o) => base({ hx: x, hy: FL - 112, torso: 6, head: 6, ax: x + f * 60, ay: FL, bx: x + f * 44, by: FL, ...o });

        // ---- him: sits on the couch with his phone; DAY 30 walks out; DAY 365 looks up, walks to the board ----
        function himState(s) {
          const ch = chap(s);
          if (ch === 1 && s > T_UP2) { if (s < T_UP2 + 0.3) return [HIMS, -1, 0, "up"]; return [lerp(HIMS, 1300, sm(s, T_UP2 + 0.3, C[2] - 0.2)), 1, 1]; }
          if (ch === 3 && s > T_STAND) { if (s < T_AT) return [lerp(HIMS - 20, BX + 120, sm(s, T_STAND, T_AT)), -1, 1]; return [BX + 120, -1, 0]; }
          return [HIMS, -1, 0, "sit"];
        }
        function himRaw(s) {
          const [x, f, mv, k] = himState(s), ch = chap(s);
          if (k === "sit" || k === "up") {
            const st = sitAt(HIMS, -1, { torso: 12, head: 26 });
            if (k === "up") { const u = win(s, T_UP2, T_UP2 + 0.3); st.hy = lerp(st.hy, stand, u); st.ax = lerp(st.ax, HIMS - 15, u); st.ay = FL; st.bx = lerp(st.bx, HIMS + 15, u); }
            reachTo(st, 1, [x - 36, FL - 200]); reachTo(st, 1, [x - 30, FL - 196], "b");
            if (ch === 2) { const pu = hold(s, IG3 - 0.3, IG3 + 0.6, 0.2); reachTo(st, pu, [HERS - 30, FL - 200 + 40 * win(s, IG3 - 0.1, IG3 + 0.2)]); st.head = lerp(st.head, 10, pu); }
            if (ch === 3) { const lk = win(s, T_LOOK, T_LOOK + 0.4); st.head = lerp(st.head, -4, lk); reachTo(st, lk, [x - 20, FL - 130]); reachTo(st, lk, [x - 14, FL - 126], "b"); if (s > T_STAND - 0.4) { const u = win(s, T_STAND - 0.4, T_STAND); st.hy = lerp(st.hy, stand, u); st.ax = lerp(st.ax, x - 15, u); st.bx = lerp(st.bx, x + 15, u); } }
            return st;
          }
          const st = mv ? walking(f > 0 ? HIMS : HIMS - 20, x, ch === 3 ? 0 : 26) : standOn(x, f, FL);
          if (ch === 1) { reachTo(st, 1, [x + 30, stand - 90]); }
          if (ch === 3 && !mv) {
            st.head = -8;
            const tp = hold(s, T_TAP - 0.4, T_TAP + 0.4, 0.2); reachTo(st, tp, [BX + 40, BY + BH - 60 + (Math.abs(s - T_TAP) < 0.1 ? 4 : 0)]);
          }
          return st;
        }
        // ---- her ----
        function herState(s) {
          const ch = chap(s);
          if (ch < 3) return [HERS, -1, 0, "sit"];
          if (s < T_LEAVE) return [BX + 110, -1, 0];
          if (s < T_OUT) return [lerp(BX + 110, -150, sm(s, T_LEAVE, T_OUT)), -1, 1];
          return null;
        }
        function herRaw(s) {
          const hs = herState(s) || [-400, -1, 0], [x, f, mv, k] = hs, ch = chap(s);
          if (k === "sit") {
            const st = sitAt(HERS, -1, { torso: 4, head: 0 });
            const sel = ch === 0 ? hold(s, T_RAISE1, IG1 + 0.4, 0.3) : ch === 1 ? hold(s, T_ASK2, IG2 + 0.4, 0.3) : hold(s, T_RAISE3, IG3 + 0.1, 0.3);
            reachTo(st, sel, [HERS - 110, FL - 290]); st.head = lerp(st.head, -10, sel);
            reachTo(st, sel, [HERS + 20, FL - 196], "b");
            const sad = [IG1, IG2, IG3].reduce((a, g) => Math.max(a, win(s, g + 0.3, g + 0.8) * (s < g + 2.0 ? 1 : 0)), 0); st.head = lerp(st.head, 28, sad);
            if (ch === 2 && s > IG3) { const dn = win(s, IG3, IG3 + 0.3); reachTo(st, dn, [HERS - 60, FL - 150]); }
            return st;
          }
          const st = mv ? walking(BX + 110, x, 10) : standOn(x, f, FL);
          if (!mv) { reachTo(st, hold(s, T_PIN4 - 0.2, T_PIN4 + 0.6, 0.2), [BX + 100, BY + BH - 50]); st.head = lerp(-8, 24, win(s, T_PIN4 + 0.6, T_PIN4 + 1.0)); }
          reachTo(st, win(s, T_LEAVE - 0.3, T_LEAVE), [x - 40, stand - 20], "b");
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:1450px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.18em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const flash = document.createElement("div");
        flash.style.cssText = "position:absolute;inset:0;background:#fff;opacity:0";
        E("stage").appendChild(flash);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.4, 640, 380, 1.5], [C[1], 1.35, 660, 390, 1.42], [C[2], 1.6, 640, 380, 1.75], [C[3], 1.45, 360, 400, 1.5], [T_LEAVE + 0.4, 1.2, 420, 400, 1.24], [T_LOOK - 0.1, 1.9, 700, 390, 2.0], [T_STAND, 1.4, 480, 400, 1.5], [T_READ - 0.1, 1.9, BX + 40, BY + 150, 2.1], [T_L2 - 0.1, 1.45, 380, 380, 1.5], [T_CTA, 2.6, BX + 40, BY + 140, 3.0]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.3, "SHE TAKES A PHOTO OF THEM."], [IG1, "HE DOESN'T EVEN LOOK UP.", 3], [C[1] + 0.3, "ONE MORE TRY."], [IG2, "HE WALKS OUT OF IT.", 1], [C[2] + 0.3, "EVERY DAY."], [IG3, "\"NOT NOW.\"", 1], [C[3] + 0.3, "ONE LAST PHOTO."], [T_LOOK, "NOW HE LOOKS UP.", 1], [T_READ, "365 PHOTOS. HE NEVER LOOKED.", 3]];
        const TAGS = ["DAY 1", "DAY 30", "DAY 90", "DAY 365"];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        const LIGHT = [1, 0.82, 0.66, 0.52, 0.38];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s), ch = chap(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hs = herState(s), ms = himState(s);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), ms[1]);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), hs ? hs[1] : -1);
          her.g.setAttribute("opacity", hs ? 1 : 0); bun.setAttribute("opacity", hs ? 1 : 0);
          if (her.g.previousSibling) her.g.previousSibling.setAttribute("opacity", hs ? 0.45 : 0);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0) + (s > T_SHAT ? 1 : 0);
          her.g.style.filter = `brightness(${LIGHT[lvl].toFixed(3)})`;
          // door
          const dq = hold(s, T_OUT - 0.7, T_OUT + 0.3, 0.25);
          doorP.setAttribute("transform", `translate(${DOORX - 55} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOORX - 55)} 0)`);
          doorLight.setAttribute("opacity", (0.9 * dq).toFixed(3));
          // phones
          const hpOn = hs && ch < 3;
          herPhone.setAttribute("opacity", hpOn ? 1 : 0); herPhone.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])}) scale(1.5)`);
          const onCouch = ms[3] === "sit" || ms[3] === "up";
          const hisOn = onCouch && !(ch === 3 && s > T_LOOK) || ch === 1;
          const pph = ch === 1 && !onCouch ? mp.hands[0] : mp.hands[0];
          hisPhone.setAttribute("opacity", hisOn ? 1 : 0); hisPhone.setAttribute("transform", `translate(${r1(pph[0])} ${r1(pph[1])})`);
          hisGlow.setAttribute("cx", r1(pph[0])); hisGlow.setAttribute("cy", r1(pph[1])); hisGlow.setAttribute("opacity", hisOn ? (0.6 + 0.15 * Math.sin(s * 5)).toFixed(3) : 0);
          if (ch === 3 && s > T_LOOK - 0.3 && onCouch) { hisPhone.setAttribute("opacity", 1); hisPhone.setAttribute("transform", `translate(${HIMS - 70} ${FL - 66}) rotate(80)`); }
          // flash on snaps
          flash.style.opacity = (0.7 * Math.max(0, ...[T_SNAP1, T_SNAP2].map((ts) => 1 - Math.abs(s - ts) / 0.08))).toFixed(3);
          // photos on the board
          const nShown = ch === 0 ? (s > T_SNAP1 + 1.8 ? 1 : 0) : ch === 1 ? 8 : ch === 2 ? 16 : 31;
          PH.forEach((n, i) => n.setAttribute("opacity", i < nShown ? 1 : 0));
          const lp = [BX + 100, BY + BH - 50];
          lastP.setAttribute("opacity", ch === 3 && s > T_PIN4 + 0.3 ? 1 : 0); lastP.setAttribute("transform", `translate(${lp[0]} ${lp[1]}) rotate(4) scale(1.3)`);
          handP.setAttribute("opacity", ch === 3 && s > C[3] && s < T_PIN4 + 0.3 ? 1 : 0); handP.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])}) scale(1.3)`);
          suit.setAttribute("opacity", ch === 3 && s < T_OUT ? 1 : 0);
          suit.setAttribute("transform", s > T_LEAVE - 0.3 ? `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1] + 60)})` : `translate(${BX + 170} ${FL})`);
          // big polaroids
          const bc = (g, a, b, p) => { const k = hold(s, a, b, 0.2); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.35 + 0.35 * backOut(k)).toFixed(3)}) rotate(-4)`); };
          bc(cards[0], T_SNAP1 + 0.1, T_SNAP1 + 1.9, [HERS - 160, FL - 400]);
          bc(cards[1], T_SNAP2 + 0.1, C[2] - 0.3, [HERS - 160, FL - 400]);
          bc(cards[2], IG3 + 0.1, C[3] - 0.4, [HERS - 160, FL - 400]);
          bc(cards[3], T_READ, T_L2 - 0.3, [BX + 170, BY - 60]);
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bSmile, T_ASK2, T_UP2 + 0.4, [hp.head[0] - 20, hp.head[1] - 90]);
          bub(bNot, IG3, IG3 + 1.2, [mp.head[0] + 10, mp.head[1] - 90]);
          // FOLLOW polaroid
          const pinned = s > T_PIN, tapped = s > T_TAP;
          newP.setAttribute("opacity", pinned ? 1 : 0);
          const bump = tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : backOut(sm(s, T_PIN, T_PIN + 0.3));
          newP.setAttribute("transform", `translate(${BX + 40} ${BY + BH - 60}) rotate(-3) scale(${bump.toFixed(3)})`);
          newR.setAttribute("fill", tapped ? "#ffffff" : "#ffe0e6"); newT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; newT.setAttribute("font-size", tapped ? 10.5 : 13);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(BX + 40 + Math.cos(a) * 80 * Math.sqrt(q))} ${r1(BY + BH - 60 + Math.sin(a) * 60 * Math.sqrt(q))}) scale(${(0.35 - 0.15 * q).toFixed(2)})`); });
          // heart meter above her
          const hx = hp.head[0], hy = hp.head[1] - 110, shat = s > T_SHAT;
          hm.setAttribute("opacity", s > 0.3 && !shat && hs ? 1 : 0);
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hx + jolt)} ${r1(hy)}) scale(0.7)`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622", "#9e2622"][lvl]);
          shards.forEach((e, i) => { const q = clamp((s - T_SHAT) / 1.2, 0, 1), a = (i / 6) * Math.PI * 2 + 0.4; const sx = BX + 110 + 70 * Math.cos(a) * q, sy = FL - 420 + (-60 * Math.sin(a) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(sy)}) rotate(${r1(200 * q * (i % 2 ? 1 : -1))})`); });
          cold.setAttribute("opacity", (0.08 * ch + 0.15 * (s > T_OUT ? 1 : 0)).toFixed(3));
          warm.setAttribute("opacity", (0.2 - 0.04 * ch).toFixed(3));

          tag.textContent = s < T_L2 - 0.2 ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "HE WAS IN EVERY PHOTO.", L3 = "BUT HE WAS NEVER THERE.";
          E("head").innerHTML = `<div>SHE TOOK A PHOTO OF THEM EVERY DAY.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_PIN - 0.3, T_PIN + 0.1)).toFixed(3);
          const TT = "LOOK UP WHILE THEY'RE STILL IN THE PICTURE.";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_TAP - 0.3) * 30)));
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
