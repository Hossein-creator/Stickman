        // ---------- "player two" (ONE-SIDED LOVE, format 2, roles flipped): she loves him, he loves his game. DAY 1 breakfast (he does not look), DAY 30 "can we talk?" "LATER.", DAY 90 date tickets "I'M PLAYING.", DAY 365 gift, headphones, he does not even hear her; her heart shatters, she puts the gift down and walks out. He wins (VICTORY!), turns: "BABE, LOOK!" - empty room. FOLLOW: dive into the TV, a tiny platform game: mini him jumps and hits the "+ FOLLOW" block, mini her comes back. ----------
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
        const C = [0, 4.9, 8.7, 13.2];                       // DAY 1 / 30 / 90 / 365, max 2 s after each rejection (rule 4b)
        const T_STEP = 1.0, T_OFFER = 1.6, T_IGN = 2.9, T_PLATE = 3.2, T_C1 = 3.5;
        const T_TAPS = 5.6, T_LATER = 6.7, T_C2 = 7.5;
        const T_TIX = 9.4, T_PLAY = 11.2, T_C3 = 12.0;
        const T_GIFT = 14.0, T_NOT = 15.3, T_SHAT = 16.4, T_DOWNG = 16.9, T_GO = 17.6, T_OUT = 20.0;
        const T_WIN = 19.4, T_TURNB = 20.1, T_DROPC = 21.0, T_L2 = 20.4, T_L3 = 21.6;
        const T_PH = 24.0, T_WALK = 25.0, T_TAP = 26.4, T_P2 = 27.2;
        const IG = 600, LV0 = 330, LV = 440, TVX = 790, TVY = FL - 272;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- room: door (left), TV on a stand (right) ----------
        const glowC = svgEl("circle", { cx: 560, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.2 }, backG);
        svgEl("polygon", { points: `420,${FL - 520} 620,${FL - 520} 740,${FL} 300,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        svgEl("rect", { x: 200, y: FL - 300, width: 120, height: 300, fill: "#15171c", stroke: "#3a3a42", "stroke-width": 8 }, roomG);
        svgEl("circle", { cx: 300, cy: FL - 150, r: 7, fill: "#8a8a92" }, roomG);
        const tvGlow = svgEl("circle", { cx: TVX, cy: TVY, r: 240, fill: "#6a5cff", filter: "url(#soft)", opacity: 0.25 }, backG);
        svgEl("rect", { x: TVX - 10, y: FL - 210, width: 20, height: 150, fill: "#2a2a30", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: TVX - 70, y: FL - 64, width: 140, height: 64, rx: 6, fill: "#2a2a30", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: TVX - 98, y: TVY - 64, width: 196, height: 128, rx: 8, fill: "#0b0b0d", stroke: "#000", "stroke-width": 5 }, roomG);
        const tvS = svgEl("rect", { x: TVX - 88, y: TVY - 54, width: 176, height: 108, fill: "#1a1440" }, roomG);
        const tvBits = Array.from({ length: 5 }, () => svgEl("rect", { width: 14, height: 14, fill: "#ff5ac8" }, roomG));
        const tvP = svgEl("rect", { width: 14, height: 22, fill: "#7dff9a" }, roomG);
        const tvWin = svgEl("text", { x: TVX, y: TVY + 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#ffd25a", "text-anchor": "middle", opacity: 0 }, roomG); tvWin.textContent = "VICTORY!";

        // ---------- props ----------
        const plate = svgEl("g", { opacity: 0 }, propG);
        svgEl("ellipse", { cx: 0, cy: 0, rx: 44, ry: 10, fill: "#f4f4f4", stroke: "#000", "stroke-width": 4 }, plate);
        svgEl("ellipse", { cx: 0, cy: -10, rx: 28, ry: 9, fill: "#d9a35a", stroke: "#000", "stroke-width": 3 }, plate);
        svgEl("ellipse", { cx: 0, cy: -19, rx: 26, ry: 8, fill: "#e4b46a", stroke: "#000", "stroke-width": 3 }, plate);
        svgEl("path", { d: "M0 -20 C-10 -27 -8 -34 0 -29 C8 -34 10 -27 0 -20 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 2 }, plate);
        const steam = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#cfcfcf", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const tix = svgEl("g", { opacity: 0 }, propG);
        for (const [dx, r] of [[-10, -12], [10, 10]]) { const g = svgEl("g", { transform: `translate(${dx} 0) rotate(${r})` }, tix); svgEl("rect", { x: -16, y: -26, width: 32, height: 52, rx: 4, fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, g); svgEl("path", { d: "M-10 -4 L10 -4 M-10 6 L6 6", stroke: "#7a5a1a", "stroke-width": 3 }, g); }
        const gift = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -34, y: -50, width: 68, height: 50, rx: 4, fill: "#ff5a6e", stroke: "#000", "stroke-width": 4 }, gift);
        svgEl("rect", { x: -7, y: -50, width: 14, height: 50, fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, gift);
        svgEl("path", { d: "M0 -50 C-26 -76 -34 -50 0 -50 C34 -50 26 -76 0 -50", fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, gift);
        const pad = svgEl("g", {}, propG);
        svgEl("rect", { x: -24, y: -11, width: 48, height: 22, rx: 10, fill: "#3a3a44", stroke: "#000", "stroke-width": 4 }, pad);
        svgEl("circle", { cx: 12, cy: -1, r: 4, fill: "#ff5a6e" }, pad);
        const phones = svgEl("g", { opacity: 0 }, fxG);
        svgEl("path", { d: "M-40 6 C-40 -50 40 -50 40 6", fill: "none", stroke: "#000", "stroke-width": 16, "stroke-linecap": "round" }, phones);
        svgEl("path", { d: "M-40 6 C-40 -50 40 -50 40 6", fill: "none", stroke: "#4a4a54", "stroke-width": 8, "stroke-linecap": "round" }, phones);
        for (const x of [-38, 38]) svgEl("rect", { x: x - 11, y: -6, width: 22, height: 34, rx: 9, fill: "#4a4a54", stroke: "#000", "stroke-width": 4 }, phones);

        // ---------- figures ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");

        // heart meter above HER: cracks one by one, shatters on DAY 365
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        const hmGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = ["M-2 -34 L6 -20 L-4 -8", "M-4 -8 L8 4 L-2 16", "M-2 16 L4 28 M-30 -30 L-18 -18 L-26 -6 M28 -28 L18 -14 L26 -2"].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const shards = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: ["M0 0 L-20 -16 L-6 -24 Z", "M0 0 L18 -18 L6 -26 Z", "M0 0 L-22 8 L-12 18 Z", "M0 0 L20 8 L10 20 Z", "M0 0 L-8 18 L6 22 Z", "M0 0 L-4 -20 L12 -14 Z"][i], fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 30, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bTalk = bubble("CAN WE TALK?", 250), bLater = bubble("LATER.", 140, 30, "#888"), bDate = bubble("DATE NIGHT?", 230), bPlay = bubble("I'M PLAYING.", 230, 30, "#888"), bYear = bubble("HAPPY 1 YEAR!", 270), bLook = bubble("BABE, LOOK!", 230);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, f = 1) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 10, head: 26, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };

        // ---- him: always gaming, back to her ----
        const himDir = (s) => (s > T_TURNB + 0.1 ? -1 : 1);
        function himRaw(s) {
          const st = standOn(IG, 1, FL); st.head = 2;
          const mash = 3 * Math.sin(s * 31) * (s < T_WIN ? 1 : 0);
          const gp = 1 - win(s, T_DROPC - 0.1, T_DROPC + 0.15);
          reachTo(st, gp, [IG + 46, stand - 118 + mash]); reachTo(st, gp, [IG + 34, stand - 112 - mash], "b");
          const sh = hold(s, T_LATER - 0.1, T_LATER + 0.4, 0.12); st.hy -= 8 * sh; st.torso -= 4 * sh;
          // he wins: arms up, then turns to her - she's gone
          const up = hold(s, T_WIN + 0.1, T_TURNB + 0.1, 0.2);
          reachTo(st, up, [IG + 20, stand - 250]); reachTo(st, up, [IG - 10, stand - 245], "b"); st.head = lerp(st.head, -14, up);
          if (s > T_TURNB) { const lk = win(s, T_TURNB + 0.8, T_TURNB + 1.3); st.head = lerp(-6, 14, lk); }
          return st;
        }
        // ---- her: tries every chapter ----
        const herDir = (s) => (s > T_GO ? -1 : 1);
        function herRaw(s) {
          const c = chap(s);
          if (s > T_GO) { const x = lerp(LV, 150, sm(s, T_GO, T_OUT)); const p = walking(LV, x); p.head = 24; return p; }
          const x = c === 0 ? lerp(LV0, LV, win(s, T_STEP, T_STEP + 0.6)) : LV;
          const st = standOn(x, 1, FL); st.head = 2;
          if (c === 0) {
            const of = win(s, T_OFFER, T_OFFER + 0.4), dn = win(s, T_PLATE, T_PLATE + 0.35);
            const px = lerp(x + 46, x + 82, of), py = lerp(lerp(stand - 116, stand - 128, of), FL - 40, dn);
            reachTo(st, 1, [px - 14, py]); reachTo(st, 1, [px + 14, py + 3], "b");
            st.torso += 30 * dn * (1 - win(s, T_PLATE + 0.4, T_PLATE + 0.8)); st.hy += 20 * dn * (1 - win(s, T_PLATE + 0.4, T_PLATE + 0.8));
            const off = win(s, T_PLATE + 0.4, T_PLATE + 0.7); st.aw *= 1 - off; st.bw *= 1 - off;
            st.head = lerp(st.head, 26, win(s, T_C1, T_C1 + 0.6));
            return st;
          }
          if (c === 1) {
            const tp = hold(s, T_TAPS, T_LATER + 0.3, 0.3), tk = 6 * Math.max(0, Math.sin(s * 18)) * tp;
            reachTo(st, tp, [IG - 18, stand - 112 - tk]); st.torso += 6 * tp;
            st.head = lerp(-4, 26, win(s, T_C2, T_C2 + 0.6));
            return st;
          }
          if (c === 2) {
            const tx = hold(s, T_TIX - 0.2, T_PLAY + 0.6, 0.35);
            reachTo(st, tx, [x + 50, stand - 200]); st.head = lerp(-8, 26, win(s, T_C3, T_C3 + 0.6));
            reachTo(st, 1 - tx, [x + 40, stand - 100]);
            return st;
          }
          const of = win(s, T_GIFT, T_GIFT + 0.5), dn = win(s, T_DOWNG, T_DOWNG + 0.5), lg = win(s, T_GO - 0.3, T_GO);
          const gx = lerp(x + 50, x + 74, of), gy = lerp(lerp(stand - 96, stand - 108, of), FL - 46, dn);
          reachTo(st, 1 - lg, [gx - 32, gy]); reachTo(st, 1 - lg, [gx + 28, gy + 3], "b");
          st.torso += 30 * dn * (1 - lg); st.hy += 22 * dn * (1 - lg);
          st.head = lerp(st.head, 28, win(s, T_SHAT, T_SHAT + 0.5));
          return st;
        }

        // ---------- text layers ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:1720px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.22em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:305px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);

        // ---------- FOLLOW: dive into the TV, a tiny platform game ----------
        const ui = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ui);
        const PH = svgEl("g", { opacity: 0 }, ui);
        svgEl("rect", { x: -470, y: -330, width: 940, height: 660, rx: 26, fill: "#0b0b0d", stroke: "#3a3a42", "stroke-width": 10 }, PH);
        svgEl("rect", { x: -440, y: -300, width: 880, height: 600, fill: "#1a1440" }, PH);
        for (let i = 0; i < 14; i++) svgEl("rect", { x: -440 + ((i * 263) % 880), y: -280 + ((i * 97) % 200), width: 6, height: 6, fill: "#fff", opacity: 0.5 }, PH);
        const gtx = (x, y, size, col, txt) => { const e = svgEl("text", { x, y, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle", "letter-spacing": 4 }, PH); e.textContent = txt; return e; };
        const gTop = gtx(0, -235, 34, "#ffd25a", "PLAYER 2 HAS LEFT");
        gtx(0, -190, 22, "#9fc0e0", "@SILENT.STICKMAN");
        for (let x = -440; x < 440; x += 40) svgEl("rect", { x, y: 210, width: 40, height: 40, fill: x % 80 === 0 ? "#7a4a2a" : "#8a5a32", stroke: "#000", "stroke-width": 3 }, PH);
        svgEl("rect", { x: -440, y: 250, width: 880, height: 50, fill: "#5a3820" }, PH);
        const blk = svgEl("g", {}, PH);
        const blkR = svgEl("rect", { x: -150, y: -45, width: 300, height: 90, rx: 8, fill: "#ffb020", stroke: "#000", "stroke-width": 6 }, blk);
        const blkT = svgEl("text", { x: 0, y: 14, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#000", "text-anchor": "middle" }, blk);
        const BLK = [40, -110];
        const coins = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, PH));
        const mkMini = (bunOn) => {
          const g = svgEl("g", {}, PH);
          const lines = [0, 1, 2, 3, 4].map(() => [svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 20, "stroke-linecap": "round", "stroke-linejoin": "round" }, g), svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round" }, g)]);
          const b = bunOn ? svgEl("circle", { r: 10, fill: "#fff", stroke: "#000", "stroke-width": 4 }, g) : null;
          const head = svgEl("circle", { r: 20, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          return { g, lines, head, b };
        };
        function drawMini(m, x, y, ph, f, armsUp) {
          const sw = Math.sin(ph), hip = [x, y - 64], sh = [x, y - 130];
          const L = [[hip, [x + 22 * sw, y]], [hip, [x - 22 * sw, y]], [hip, sh], [sh, armsUp ? [x + 22, y - 190] : [x + 26 * -sw, y - 82]], [sh, armsUp ? [x - 22, y - 190] : [x + 26 * sw, y - 82]]];
          L.forEach(([a, b], i) => { const d = `M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}`; m.lines[i][0].setAttribute("d", d); m.lines[i][1].setAttribute("d", d); });
          m.head.setAttribute("cx", r1(x)); m.head.setAttribute("cy", r1(y - 156));
          if (m.b) { m.b.setAttribute("cx", r1(x - f * 18)); m.b.setAttribute("cy", r1(y - 168)); }
        }
        const m1 = mkMini(false), m2 = mkMini(true);
        const subT = document.createElement("div");
        subT.style.cssText = "position:absolute;left:120px;right:120px;top:262px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:34px;line-height:1.45;letter-spacing:0.08em;color:#fff";
        E("stage").appendChild(subT);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera: one shot per chapter, hard cuts ----------
        const SHOTS = [[0, 1.75, 600, 430, 1.85], [C[1], 2.05, 560, 420, 2.15], [C[2], 2.1, 560, 410, 2.25], [C[3], 1.7, 580, 430, 1.8], [T_GO + 0.4, 1.4, 520, 430, 1.45], [T_WIN - 0.1, 1.9, 640, 420, 2.05]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const toScreen = (c, x, y) => [540 + (x - c[1]) * c[0], 1180 + (y - c[2]) * c[0]];
        const CAPS = [[0.4, "SHE MAKES HIM BREAKFAST."], [T_IGN, "HE DOESN'T EVEN LOOK.", 3], [C[1] + 0.3, "SHE WANTS TO TALK."], [T_LATER, "HE SAYS \"LATER.\"", 2], [C[2] + 0.3, "SHE ASKS FOR A DATE."], [T_PLAY, "HE KEEPS PLAYING.", 2], [C[3] + 0.3, "SHE REMEMBERS THEIR DAY."], [T_NOT + 0.3, "HE DOESN'T EVEN HEAR HER.", 4], [T_GO, "SO SHE STOPPED TRYING.", 3]];
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
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const out = 1 - win(s, T_OUT - 0.7, T_OUT - 0.2);
          her.g.setAttribute("opacity", out.toFixed(3)); bun.setAttribute("opacity", out.toFixed(3));
          if (her.g.previousSibling) her.g.previousSibling.setAttribute("opacity", (0.45 * out).toFixed(3));
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0) + (s > T_SHAT ? 1 : 0);
          const TC = [T_C1, T_C2, T_C3, T_SHAT];
          const light = lerp(LIGHT[Math.max(0, lvl - 1)], LIGHT[lvl], lvl ? win(s, TC[lvl - 1], TC[lvl - 1] + 0.6) : 1);
          her.g.style.filter = `brightness(${light.toFixed(3)})`;
          // TV: little game running, VICTORY at the end
          const fl = 0.22 + 0.06 * Math.sin(s * 9) + 0.04 * Math.sin(s * 23);
          tvGlow.setAttribute("opacity", fl.toFixed(3));
          tvBits.forEach((b, i) => { const q = frac(s * 0.5 + i / 5); b.setAttribute("x", r1(TVX + 80 - 170 * q)); b.setAttribute("y", r1(TVY + 20 - (i % 3) * 22)); b.setAttribute("opacity", s < T_WIN ? 1 : 0); });
          tvP.setAttribute("x", TVX - 60); tvP.setAttribute("y", r1(TVY + 18 - 30 * Math.abs(Math.sin(s * 4)))); tvP.setAttribute("opacity", s < T_WIN ? 1 : 0);
          tvWin.setAttribute("opacity", s > T_WIN ? (0.6 + 0.4 * Math.abs(Math.sin(s * 6))).toFixed(3) : 0);
          tvS.setAttribute("fill", s > T_WIN ? "#2a1a00" : "#1a1440");
          // gamepad in his hands, drops when he sees the empty room
          let gp = [(mp.hands[0][0] + mp.hands[1][0]) / 2, (mp.hands[0][1] + mp.hands[1][1]) / 2], gr = 0;
          if (s > T_TURNB && s < T_DROPC) gp = [mp.hands[0][0], mp.hands[0][1]];
          if (s > T_DROPC) { const q = clamp((s - T_DROPC) / 0.4, 0, 1); gp = [IG - 20, lerp(stand - 120, FL - 10, q * q)]; gr = 160 * q; }
          pad.setAttribute("transform", `translate(${r1(gp[0])} ${r1(gp[1])}) rotate(${r1(gr)})`);
          phones.setAttribute("opacity", chap(s) === 3 ? 1 : 0);
          phones.setAttribute("transform", `translate(${r1(mp.head[0])} ${r1(mp.head[1])})`);
          // plate: offered, put on the floor, gets cold
          plate.setAttribute("opacity", s > 0 ? 1 : 0);
          const pp = s < T_PLATE + 0.4 ? [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2 - 6] : [LV + 70, FL - 10];
          plate.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])})`);
          plate.style.filter = `grayscale(${(0.25 * chap(s)).toFixed(2)}) brightness(${(1 - 0.1 * chap(s)).toFixed(2)})`;
          steam.forEach((e, i) => { const q = frac(s * 0.7 + i / 3); e.setAttribute("d", `M${r1(pp[0] - 12 + i * 12)} ${r1(pp[1] - 32 - 50 * q)} q8 -10 0 -20`); e.setAttribute("opacity", (0.6 * Math.sin(Math.PI * q) * (1 - win(s, T_C1, C[1]))).toFixed(3)); });
          tix.setAttribute("opacity", chap(s) === 2 ? 1 : 0);
          tix.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] - 26)})`);
          gift.setAttribute("opacity", chap(s) === 3 ? 1 : 0);
          const gpos = s < T_GO - 0.1 ? [(hp.hands[0][0] + hp.hands[1][0]) / 2, (hp.hands[0][1] + hp.hands[1][1]) / 2 + 4] : [LV + 74, FL];
          gift.setAttribute("transform", `translate(${r1(gpos[0])} ${r1(gpos[1])})`);
          // heart meter above her
          const hx = hp.head[0], hy = hp.head[1] - 112, shat = s > T_SHAT;
          hm.setAttribute("opacity", s > 0.3 && !shat ? 1 : 0);
          const pulse = 1 + 0.06 * Math.max(0, Math.sin(s * 7)) * (lvl === 0 ? 1 : 0.4);
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hx + jolt)} ${r1(hy)}) scale(${(0.9 * pulse).toFixed(3)})`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622"][Math.min(3, lvl)]);
          hmGlow.setAttribute("opacity", (0.5 * LIGHT[lvl]).toFixed(3));
          shards.forEach((e, i) => { const q = clamp((s - T_SHAT) / 1.2, 0, 1), a = (i / 6) * Math.PI * 2 + 0.4; const sx = LV + 70 * Math.cos(a) * q, sy = (stand - 270) + (-60 * Math.sin(a) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(Math.min(sy, FL - 4))}) rotate(${r1(300 * q * (i % 2 ? 1 : -1))})`); });
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bTalk, C[1] + 0.9, T_LATER - 0.1, [hp.head[0] + 20, hp.head[1] - 190]);
          bub(bLater, T_LATER, T_C2 + 0.6, [mp.head[0] + 40, mp.head[1] - 110]);
          bub(bDate, T_TIX + 0.2, T_PLAY, [hp.head[0] + 25, hp.head[1] - 190]);
          bub(bPlay, T_PLAY, T_C3 + 0.6, [mp.head[0] + 60, mp.head[1] - 110]);
          bub(bYear, T_GIFT + 0.2, T_NOT + 0.4, [hp.head[0] + 25, hp.head[1] - 190]);
          bub(bLook, T_TURNB + 0.15, T_DROPC + 0.5, [mp.head[0] - 30, mp.head[1] - 110]);
          cold.setAttribute("opacity", (0.12 * chap(s) + 0.25 * win(s, T_GO, T_OUT)).toFixed(3));
          glowC.setAttribute("opacity", (0.2 - 0.04 * chap(s) - 0.08 * win(s, T_GO, T_OUT)).toFixed(3));

          const ch = chap(s);
          tag.textContent = s < T_WIN ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_WIN - 0.2 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          cap.style.opacity = (1 - win(s, T_WIN - 0.5, T_WIN - 0.2)).toFixed(3);
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SHE DIDN'T LEAVE SUDDENLY.", L3 = "SHE LEFT A LITTLE EVERY DAY.";
          E("head").innerHTML = `<div>SHE LOVED HIM. HE LOVED HIS GAME.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - win(s, T_PH, T_PH + 0.3)).toFixed(3);
          dim.style.opacity = (0.5 * win(s, T_PH, T_PH + 0.6)).toFixed(3);

          // FOLLOW: dive into the TV
          const zq = sm(s, T_PH, T_PH + 0.9);
          const p0 = toScreen(c, TVX, TVY);
          const k = lerp(176 * c[0] / 880, 1, zq), px = lerp(p0[0], 540, zq), py = lerp(p0[1], 980, zq);
          PH.setAttribute("opacity", s > T_PH ? 1 : 0);
          PH.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) scale(${k.toFixed(4)})`);
          const tapped = s > T_TAP;
          const bump = tapped ? -24 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : 0;
          blk.setAttribute("transform", `translate(${BLK[0]} ${r1(BLK[1] + bump)})`);
          blkR.setAttribute("fill", tapped ? "#ffffff" : (Math.sin(s * 8) > 0 ? "#ffb020" : "#ffc24a"));
          blkT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          blkT.setAttribute("font-size", tapped ? 34 : 40);
          gTop.textContent = s > T_P2 ? "PLAYER 2 IS BACK ♥" : "PLAYER 2 HAS LEFT";
          gTop.setAttribute("fill", s > T_P2 ? "#ff6a60" : "#ffd25a");
          coins.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = -Math.PI / 2 + (i - 3.5) * 0.32; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(BLK[0] + Math.cos(a) * 300 * q)} ${r1(BLK[1] - 50 + Math.sin(a) * 220 * q + 160 * q * q)}) scale(1.3)`); });
          // mini him runs in, jumps, hits the block from below; then mini her joins
          const mx = lerp(-400, BLK[0] - 10, sm(s, T_WALK, T_TAP - 0.45));
          const jq = clamp((s - (T_TAP - 0.4)) / 0.8, 0, 1), jy = s > T_TAP - 0.4 ? -Math.sin(Math.PI * jq) * 100 : 0;
          const cheer = s > T_P2 + 0.4;
          drawMini(m1, mx, 210 + jy + (cheer ? -18 * Math.abs(Math.sin(s * 9)) : 0), mx * 0.06, 1, jy < -20 || cheer);
          m1.g.setAttribute("opacity", s > T_WALK ? 1 : 0);
          const m2x = lerp(400, BLK[0] + 110, sm(s, T_P2, T_P2 + 0.8));
          drawMini(m2, m2x, 210 + (cheer ? -18 * Math.abs(Math.sin(s * 9 + 1)) : 0), m2x * 0.06, -1, cheer);
          m2.g.setAttribute("opacity", s > T_P2 ? 1 : 0);
          const sq = s - (T_PH + 0.9), a1 = "DON'T WAIT UNTIL", a2 = "YOUR PLAYER 2 LEAVES.";
          subT.innerHTML = sq > 0 ? `${a1.slice(0, Math.floor(sq * 30))}&nbsp;<br/><span style="color:#ff6a60">${a2.slice(0, Math.max(0, Math.floor((sq - 0.6) * 30)))}</span>&nbsp;` : "";
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
