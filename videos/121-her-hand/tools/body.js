        // ---------- "her hand" (ONE-SIDED LOVE, format 2, she loves, he ignores): a street at night, lamps, a pedestrian signal pole. DAY 1 they walk, she reaches for his hand, he takes his phone out. DAY 30 she reaches, he walks ahead. DAY 90 she takes his hand, he shakes it off: "NOT IN PUBLIC." DAY 365 she walks behind with her hands down, stops, her heart breaks, she turns and walks away. He stops, and for the first time reaches back: nobody there. FOLLOW: the pedestrian signal shows a red hand "+ FOLLOW", he presses the button → walking man "FOLLOWING ✓". ----------
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
        const R1 = 0.8, IG1 = 1.4, T_C1 = 2.6;
        const R2 = 5.0, IG2 = 5.8, T_C2 = 6.8;
        const R3 = 9.0, IG3 = 9.6, T_C3 = 10.2;
        const T_STOP = 12.8, T_SHAT = 13.2, T_LEAVE = 13.6, T_OUT = 15.0, T_HSTOP = 15.0, T_REACH = 15.4, T_TURN = 16.3, T_READ = 16.9;
        const T_L2 = 18.4, T_L3 = 19.6;
        const T_CTA = 21.2, T_WALK2 = 21.4, T_AT = 22.2, T_SIG = 22.4, T_TAP = 23.2;
        const SIGX = 980, HSTOPX = 690;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- street ----------
        svgEl("polygon", { points: `-1400,${FL - 900} 3000,${FL - 900} 3000,${FL} -1400,${FL}`, fill: "#0b0d14", opacity: 1 }, backG);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        for (let i = 0; i < 16; i++) {
          const x = -700 + i * 160 + ((i * 37) % 40), h = 300 + ((i * 97) % 260);
          svgEl("rect", { x, y: FL - 60 - h, width: 140, height: h, fill: "#151822", stroke: "#000", "stroke-width": 4 }, roomG);
          for (let r = 0; r < Math.floor(h / 60); r++) for (let c = 0; c < 3; c++) if ((i * 7 + r * 3 + c) % 5 === 0) svgEl("rect", { x: x + 18 + c * 40, y: FL - 40 - h + r * 60, width: 22, height: 28, fill: "#e8c878", opacity: 0.55 }, roomG);
        }
        svgEl("rect", { x: -1400, y: FL - 60, width: 3400, height: 60, fill: "#2a2c34", stroke: "#000", "stroke-width": 5 }, roomG);
        for (let x = -1400; x < 2000; x += 90) svgEl("path", { d: `M${x} ${FL - 60} L${x - 20} ${FL}`, stroke: "#1a1c22", "stroke-width": 4 }, roomG);
        const lampXs = [-500, 120, 740, 1360];
        for (const lx of lampXs) {
          svgEl("polygon", { points: `${lx - 30},${FL - 470} ${lx + 30},${FL - 470} ${lx + 170},${FL} ${lx - 170},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.2 }, beams);
          svgEl("rect", { x: lx - 6, y: FL - 480, width: 12, height: 480, fill: "#2e323c", stroke: "#000", "stroke-width": 4 }, roomG);
          svgEl("path", { d: `M${lx - 34} ${FL - 470} L${lx + 34} ${FL - 470} L${lx + 20} ${FL - 500} L${lx - 20} ${FL - 500} Z`, fill: "#f2dc9a", stroke: "#000", "stroke-width": 4 }, roomG);
        }
        // pedestrian signal pole
        svgEl("rect", { x: SIGX - 7, y: FL - 430, width: 14, height: 430, fill: "#3a3e48", stroke: "#000", "stroke-width": 4 }, roomG);
        const sigBox = svgEl("g", {}, roomG);
        svgEl("rect", { x: SIGX - 46, y: FL - 470, width: 92, height: 110, rx: 8, fill: "#1a1c22", stroke: "#000", "stroke-width": 5 }, sigBox);
        const sigHand = svgEl("path", { d: "M-14 22 L-14 -4 Q-14 -8 -10 -8 Q-6 -8 -6 -4 L-6 -18 Q-6 -22 -2 -22 Q2 -22 2 -18 L2 -20 Q2 -24 6 -24 Q10 -24 10 -20 L10 -14 Q10 -18 14 -18 Q18 -18 18 -14 L18 10 Q18 22 6 22 Z", fill: "#ff5a3a", opacity: 0.4 }, sigBox);
        sigHand.setAttribute("transform", `translate(${SIGX - 2} ${FL - 415}) scale(1.4)`);
        const sigMan = svgEl("g", { opacity: 0, transform: `translate(${SIGX} ${FL - 415}) scale(1.4)` }, sigBox);
        svgEl("circle", { cx: 0, cy: -20, r: 5, fill: "#f4f4f4" }, sigMan);
        svgEl("path", { d: "M0 -13 L-2 6 M-2 6 L-10 22 M-2 6 L8 22 M0 -10 L-10 2 M0 -10 L10 0", stroke: "#f4f4f4", "stroke-width": 4, "stroke-linecap": "round" }, sigMan);
        const sigGlow = svgEl("circle", { cx: SIGX, cy: FL - 415, r: 80, fill: "url(#fireGlow)", opacity: 0 }, roomG);
        svgEl("rect", { x: SIGX - 18, y: FL - 250, width: 36, height: 54, rx: 6, fill: "#d8c040", stroke: "#000", "stroke-width": 4 }, roomG);
        const btn = svgEl("circle", { cx: SIGX, cy: FL - 222, r: 10, fill: "#333", stroke: "#000", "stroke-width": 3 }, roomG);
        const sigTag = svgEl("g", { opacity: 0 }, roomG);
        const sigR = svgEl("rect", { x: -70, y: -20, width: 140, height: 40, rx: 12, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, sigTag);
        const sigT = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 20, fill: "#fff", "text-anchor": "middle" }, sigTag);

        // props
        const hisPhone = svgEl("rect", { x: -9, y: -14, width: 18, height: 28, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, propG);
        const hisGlow = svgEl("circle", { r: 55, fill: "url(#phoneGlow)", opacity: 0.7 }, propG);

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
        const bNot = bubble("NOT IN PUBLIC.", 290, 28, "#c0282a"), bBabe = bubble("BABE?", 150, 30);
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
        const walking = (x0, x, head = 4) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };

        // ---------- paths ----------
        function himX(s) {
          const ch = chap(s), u = s - C[ch];
          if (ch === 0) return 240 + 160 * u;
          if (ch === 1) return 240 + 150 * u + 170 * sm(u, IG2 - C[1] - 0.1, IG2 - C[1] + 1.2);
          if (ch === 2) return 240 + 140 * u + 40 * sm(s, IG3, IG3 + 0.3);
          if (s < T_HSTOP) return lerp(200, HSTOPX, (s - C[3]) / (T_HSTOP - C[3]));
          if (s < T_WALK2) return HSTOPX;
          return lerp(HSTOPX, SIGX - 72, sm(s, T_WALK2, T_AT));
        }
        function herX(s) {
          const ch = chap(s), u = s - C[ch];
          if (ch === 0) return 120 + 160 * u;
          if (ch === 1) return 120 + 150 * u;
          if (ch === 2) return 120 + 140 * u;
          if (s < T_STOP) return lerp(70, 70 + 120 * (T_STOP - C[3]), (s - C[3]) / (T_STOP - C[3]));
          const sx = 70 + 120 * (T_STOP - C[3]);
          if (s < T_LEAVE) return sx;
          return lerp(sx, -420, sm(s, T_LEAVE, T_OUT));
        }
        const herStopX = 70 + 120 * (T_STOP - C[3]);
        const moving = (fn, s) => Math.abs(fn(s + 0.03) - fn(s - 0.03)) > 0.6;
        const himF = (s) => (s > T_TURN && s < T_CTA ? -1 : 1);
        const herF = (s) => (s > T_LEAVE - 0.1 && chap(s) === 3 ? -1 : 1);

        function himRaw(s) {
          const x = himX(s), ch = chap(s), f = himF(s);
          const anchor = ch === 3 ? (s < T_HSTOP ? 200 : HSTOPX) : 240;
          const st = moving(himX, s) ? walking(anchor, x, 4) : standOn(x, f, FL);
          // phone in both hands (from IG1 in DAY 1, always after)
          const ph = ch === 0 ? win(s, IG1 - 0.2, IG1 + 0.2) : ch === 3 ? 1 - win(s, T_HSTOP - 0.2, T_HSTOP + 0.2) : ch === 2 ? 1 - hold(s, R3 + 0.3, IG3 + 0.4, 0.15) : 1;
          reachTo(st, ph, [x + 34 * f, FL - 210]); reachTo(st, ph, [x + 28 * f, FL - 206], "b");
          st.head = lerp(st.head, 24, ph);
          if (ch === 2) { const sh = hold(s, IG3 - 0.1, IG3 + 0.5, 0.15); reachTo(st, sh, [x - 10, FL - 250]); st.head = lerp(st.head, -10, sh); }
          if (ch === 3 && s > T_HSTOP) {
            const rb = hold(s, T_REACH, T_TURN + 0.6, 0.35); reachTo(st, rb, [x - 110, FL - 160 - 6 * Math.sin(s * 3)], "b"); st.head = lerp(st.head, 0, rb);
            if (s > T_TURN && s < T_CTA) { st.head = lerp(-6, 20, win(s, T_READ, T_READ + 0.8)); reachTo(st, 0.4 * win(s, T_TURN, T_TURN + 0.4), [x - 100, FL - 150]); }
            const tp = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.25); reachTo(st, tp, [SIGX - 10, FL - 222 + 3 * win(s, T_TAP - 0.08, T_TAP)]);
          }
          return st;
        }
        function herRaw(s) {
          const x = herX(s), ch = chap(s), f = herF(s);
          if (x < -400) return standOn(-400, -1, FL);
          const anchor = ch === 3 ? (s < T_LEAVE ? 70 : herStopX) : 120;
          const st = moving(herX, s) ? walking(anchor, x, 0) : standOn(x, f, FL);
          const hx = himX(s);
          const reach = ch === 0 ? hold(s, R1, IG1 + 0.6, 0.3) : ch === 1 ? hold(s, R2, IG2 + 0.5, 0.3) : ch === 2 ? hold(s, R3, IG3 + 0.15, 0.3) : 0;
          const tgt = ch === 2 && s > R3 + 0.4 ? [hx - 30, FL - 160] : [Math.min(hx - 40, x + 110), FL - 165];
          reachTo(st, reach, tgt);
          st.head = lerp(st.head, -6, reach);
          const sad = [IG1, IG2, IG3].reduce((a, g) => Math.max(a, win(s, g + 0.4, g + 0.9) * (s < g + 2.2 ? 1 : 0)), 0); st.head = lerp(st.head, 26, sad);
          if (ch === 3) { st.head = lerp(16, 30, win(s, T_STOP, T_SHAT)); reachTo(st, 1, [x + 14 * f, FL - 150]); reachTo(st, 1, [x + 10 * f, FL - 146], "b"); }
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
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera: follows the couple ----------
        function camAt(s) {
          const ch = chap(s);
          let cx, z = 1.45;
          if (ch < 3) { cx = (himX(s) + herX(s)) / 2; z = ch === 2 ? 1.6 : 1.45; }
          else if (s < T_LEAVE) { cx = (himX(s) + herX(s)) / 2; z = lerp(1.35, 1.6, sm(s, T_STOP, T_SHAT)); }
          else if (s < T_HSTOP) { cx = lerp((himX(T_LEAVE) + herStopX) / 2, 480, sm(s, T_LEAVE, T_HSTOP)); z = 1.25; }
          else if (s < T_TURN) { cx = lerp(480, HSTOPX - 40, sm(s, T_HSTOP, T_REACH)); z = lerp(1.25, 1.9, sm(s, T_HSTOP, T_REACH + 0.4)); }
          else if (s < T_L2) { cx = lerp(HSTOPX - 40, 420, sm(s, T_TURN, T_READ)); z = lerp(1.9, 1.2, sm(s, T_TURN, T_READ)); }
          else if (s < T_CTA) { cx = 480; z = 1.25; }
          else { cx = lerp(480, SIGX - 50, sm(s, T_CTA, T_SIG)); z = lerp(1.25, 2.1, sm(s, T_CTA, T_SIG + 0.4)); }
          const cy = s > T_CTA ? lerp(400, FL - 300, sm(s, T_CTA, T_SIG)) : 400;
          return [z, cx, cy];
        }
        const CAPS = [[0.3, "SHE REACHES FOR HIS HAND."], [IG1, "HE REACHES FOR HIS PHONE.", 4], [C[1] + 0.3, "SHE TRIES AGAIN."], [IG2, "HE WALKS AHEAD.", 2], [C[2] + 0.3, "SHE HOLDS ON."], [IG3, "HE LETS GO.", 2], [C[3] + 0.3, "SHE STOPPED REACHING."], [T_REACH, "NOW HE REACHES BACK.", 3], [T_READ, "NO HAND THERE.", 1]];
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
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const gone = ch === 3 && s > T_OUT;
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          her.g.setAttribute("opacity", gone ? 0 : 1); bun.setAttribute("opacity", gone ? 0 : 1);
          if (her.g.previousSibling) her.g.previousSibling.setAttribute("opacity", gone ? 0 : 0.45);
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herF(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0) + (s > T_SHAT ? 1 : 0);
          her.g.style.filter = `brightness(${LIGHT[lvl].toFixed(3)})`;
          // his phone
          const pOn = (ch === 0 && s > IG1 - 0.1) || ch === 1 || (ch === 2 && !(s > R3 + 0.4 && s < IG3 + 0.3)) || (ch === 3 && s < T_HSTOP);
          const pp = mp.hands[0];
          hisPhone.setAttribute("opacity", pOn ? 1 : 0); hisPhone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])})`);
          hisGlow.setAttribute("cx", r1(pp[0])); hisGlow.setAttribute("cy", r1(pp[1])); hisGlow.setAttribute("opacity", pOn ? (0.6 + 0.15 * Math.sin(s * 5)).toFixed(3) : 0);
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bNot, IG3, IG3 + 1.4, [mp.head[0] + 20, mp.head[1] - 90]);
          bub(bBabe, T_TURN + 0.3, T_READ + 0.9, [mp.head[0] - 10, mp.head[1] - 90]);
          // signal: red hand → walking man
          const tapped = s > T_TAP, on = s > T_SIG;
          sigHand.setAttribute("opacity", tapped ? 0.12 : on ? 1 : 0.4);
          sigMan.setAttribute("opacity", tapped ? 1 : 0);
          sigGlow.setAttribute("opacity", on ? (tapped ? 0.5 : 0.35).toFixed(3) : 0);
          btn.setAttribute("fill", tapped ? "#ff3b30" : "#333");
          sigTag.setAttribute("opacity", sm(s, T_SIG, T_SIG + 0.3).toFixed(3));
          const bump = tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : backOut(sm(s, T_SIG, T_SIG + 0.3));
          sigTag.setAttribute("transform", `translate(${SIGX} ${FL - 512}) scale(${bump.toFixed(3)})`);
          sigR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); sigT.setAttribute("fill", tapped ? "#000" : "#fff");
          sigT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; sigT.setAttribute("font-size", tapped ? 16 : 20);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(SIGX + Math.cos(a) * 110 * Math.sqrt(q))} ${r1(FL - 512 + Math.sin(a) * 80 * Math.sqrt(q))}) scale(${(0.4 - 0.2 * q).toFixed(2)})`); });
          // heart meter above her
          const hx = hp.head[0], hy = hp.head[1] - 110, shat = s > T_SHAT;
          hm.setAttribute("opacity", s > 0.3 && !shat && !gone ? 1 : 0);
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hx + jolt)} ${r1(hy)}) scale(0.7)`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622", "#9e2622"][lvl]);
          shards.forEach((e, i) => { const q = clamp((s - T_SHAT) / 1.2, 0, 1), a = (i / 6) * Math.PI * 2 + 0.4; const sx = herStopX + 70 * Math.cos(a) * q, sy = FL - 420 + (-60 * Math.sin(a) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(sy)}) rotate(${r1(200 * q * (i % 2 ? 1 : -1))})`); });
          cold.setAttribute("opacity", (0.08 * ch + 0.15 * (s > T_OUT ? 1 : 0)).toFixed(3));

          tag.textContent = s < T_L2 - 0.2 ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "THE DAY HE FINALLY REACHED BACK,", L3 = "HER HAND WAS GONE.";
          E("head").innerHTML = `<div>SHE REACHED FOR HIS HAND EVERY DAY.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_SIG - 0.3, T_SIG + 0.1)).toFixed(3);
          const TT = "HOLD THE HAND WHILE IT'S STILL REACHING.";
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
