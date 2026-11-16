        // ---------- "she waited up" (ONE-SIDED LOVE, format 2, she loves, he ignores): a table set for two, a wall clock, the front door. DAY 1 10 PM "DINNER?" "ALREADY ATE." DAY 30 12 AM "HOW WAS WORK?" "TIRED." DAY 90 2 AM she fell asleep at the table, he walks past and doesn't even cover her (heart shatters). DAY 365 dark room, empty chair, a note: "I STOPPED WAITING." "BABE?" FOLLOW: the wall clock face turns into a "+ FOLLOW" button, he taps it: "FOLLOWING" + chime. ----------
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
        const C = [0, 4.4, 8.4, 12.2];                         // DAY 1 / 30 / 90 / 365, max 2 s after each rejection
        const IN = [0.9, 4.9, 8.9, 12.6], ASK = [1.6, 5.6], IG = [2.4, 6.4, 10.3], T_C1 = 2.6, T_C2 = 6.6, T_SHAT = 10.5;
        const T_NOTE = 13.4, T_READ = 13.8, T_BABE = 15.0, T_L2 = 16.2, T_L3 = 17.2;
        const T_CTA = 19.4, T_CLK = 19.8, T_REACH = 21.2, T_TAP = 21.8;
        const CHX = 700, TBLX = 600, DOORX = 150, CLKX = 870, CLKY = FL - 440;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- room ----------
        const warm = svgEl("circle", { cx: 600, cy: FL - 220, r: 420, fill: "url(#fireGlow)", opacity: 0.22 }, backG);
        svgEl("polygon", { points: `520,${FL - 520} 680,${FL - 520} 780,${FL} 420,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        const doorLight = svgEl("rect", { x: DOORX - 70, y: FL - 300, width: 140, height: 300, fill: "#3a4258", opacity: 0 }, roomG);
        svgEl("rect", { x: DOORX - 80, y: FL - 310, width: 160, height: 310, fill: "none", stroke: "#3a3a42", "stroke-width": 10 }, roomG);
        const doorP = svgEl("g", {}, roomG);
        svgEl("rect", { x: 0, y: FL - 300, width: 140, height: 300, fill: "#2a2018", stroke: "#000", "stroke-width": 5 }, doorP);
        svgEl("circle", { cx: 120, cy: FL - 150, r: 8, fill: "#c9a24a" }, doorP);
        // wall clock
        const clk = svgEl("g", { transform: `translate(${CLKX} ${CLKY})` }, roomG);
        const clkFace = svgEl("circle", { r: 62, fill: "#efefef", stroke: "#000", "stroke-width": 7 }, clk);
        const ticks = svgEl("g", {}, clk);
        for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; svgEl("line", { x1: Math.sin(a) * 48, y1: -Math.cos(a) * 48, x2: Math.sin(a) * 56, y2: -Math.cos(a) * 56, stroke: "#222", "stroke-width": i % 3 ? 3 : 6 }, ticks); }
        const hH = svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -30, stroke: "#111", "stroke-width": 7, "stroke-linecap": "round" }, clk);
        const hM = svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -46, stroke: "#111", "stroke-width": 4, "stroke-linecap": "round" }, clk);
        const clkBtn = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 20, fill: "#fff", "text-anchor": "middle", opacity: 0 }, clk);
        // table + chairs
        const chair = (x, f) => { svgEl("rect", { x: x - 30, y: FL - 104, width: 60, height: 12, fill: "#5a4636", stroke: "#000", "stroke-width": 4 }, roomG); svgEl("rect", { x: x + f * 26 - 6, y: FL - 220, width: 12, height: 220, fill: "#4a3a2e", stroke: "#000", "stroke-width": 4 }, roomG); svgEl("rect", { x: x - f * 26 - 5, y: FL - 92, width: 10, height: 92, fill: "#4a3a2e", stroke: "#000", "stroke-width": 3 }, roomG); };
        chair(500, -1); chair(CHX, 1);
        svgEl("rect", { x: TBLX - 90, y: FL - 150, width: 180, height: 14, rx: 4, fill: "#6a5240", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: TBLX - 8, y: FL - 136, width: 16, height: 136, fill: "#4a3a2e", stroke: "#000", "stroke-width": 3 }, roomG);
        const dinner = svgEl("g", {}, propG);
        for (const dx of [-50, 50]) { svgEl("ellipse", { cx: TBLX + dx, cy: FL - 156, rx: 30, ry: 7, fill: "#f4f4f4", stroke: "#000", "stroke-width": 3 }, dinner); svgEl("ellipse", { cx: TBLX + dx, cy: FL - 162, rx: 16, ry: 5, fill: "#d9a35a", stroke: "#000", "stroke-width": 2 }, dinner); }
        svgEl("rect", { x: TBLX - 5, y: FL - 196, width: 10, height: 46, fill: "#efe6d6", stroke: "#000", "stroke-width": 3 }, dinner);
        const flame = svgEl("path", { fill: "#ffb347", stroke: "#000", "stroke-width": 2 }, dinner);
        const steam = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#cfcfcf", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, fxG));
        const note = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -26, y: -6, width: 52, height: 10, fill: "#fffbe8", stroke: "#000", "stroke-width": 3 }, note);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const bag = svgEl("rect", { x: -18, y: -10, width: 36, height: 30, rx: 4, fill: "#3a3a44", stroke: "#000", "stroke-width": 4 }, propG);
        const phone = svgEl("g", {}, propG);
        svgEl("circle", { r: 60, fill: "url(#phoneGlow)", opacity: 0.6 }, phone);
        svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, phone);

        // heart meter above HER
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        const hmGlow = svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = ["M-2 -34 L6 -20 L-4 -8", "M-4 -8 L8 4 L-2 16"].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const shards = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: ["M0 0 L-20 -16 L-6 -24 Z", "M0 0 L18 -18 L6 -26 Z", "M0 0 L-22 8 L-12 18 Z", "M0 0 L20 8 L10 20 Z", "M0 0 L-8 18 L6 22 Z", "M0 0 L-4 -20 L12 -14 Z"][i], fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bDin = bubble("DINNER?", 170), bAte = bubble("ALREADY ATE.", 240, 28, "#888"), bWork = bubble("HOW WAS WORK?", 270), bTired = bubble("TIRED.", 140, 28, "#888"), bBabe = bubble("BABE?", 140);
        const zz = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#9ab", opacity: 0 }, fxG); zz.textContent = "z z";
        const noteBig = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -190, y: -70, width: 380, height: 140, rx: 6, fill: "#fffbe8", stroke: "#000", "stroke-width": 6 }, noteBig);
        const nt = svgEl("text", { x: 0, y: 14, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#222", "text-anchor": "middle" }, noteBig); nt.textContent = "I STOPPED WAITING.";
        const nh = svgEl("path", { d: "M150 40 C138 32 140 24 150 30 C160 24 162 32 150 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 2 }, noteBig);
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

        // ---- him: walks in through the door and past her, every night ----
        const hisX = (s) => {
          const ch = chap(s), t0 = IN[ch];
          if (s < t0) return -300;
          if (ch === 2) return s < IN[2] + 0.9 ? lerp(DOORX, 420, sm(s, IN[2], IN[2] + 0.9)) : s < IG[2] ? 420 : lerp(420, 1200, sm(s, IG[2], IG[2] + 2.0));
          if (ch === 3) { if (s < T_CTA) return lerp(DOORX, 470, sm(s, IN[3], IN[3] + 0.9)); return lerp(470, CLKX - 60, sm(s, T_CLK, T_CLK + 1.0)); }
          return s < IG[ch] + 0.3 ? lerp(DOORX, 380, sm(s, t0, t0 + 1.0)) : lerp(380, 1200, sm(s, IG[ch] + 0.3, IG[ch] + 2.1));
        };
        function himRaw(s) {
          const x = hisX(s), ch = chap(s);
          let st;
          const moving = ch < 2 ? (s > IN[ch] && s < IN[ch] + 1.0) || s > IG[ch] + 0.3 : ch === 2 ? (s < IN[2] + 0.9 || s > IG[2]) : (s < IN[3] + 0.9 || (s > T_CLK && s < T_CLK + 1.0));
          st = moving ? walking(DOORX, x, ch < 3 ? 26 : 10) : standOn(x, 1, FL);
          if (ch < 3) { reachTo(st, 1, [x + 34, stand - 120]); st.head = 26; }   // phone in hand, head down
          if (ch === 2 && s > IN[2] + 0.9 && s < IG[2]) st.head = lerp(26, 8, win(s, IN[2] + 0.9, IN[2] + 1.3));
          if (ch === 3 && s < T_CTA) {
            reachTo(st, win(s, T_NOTE - 0.3, T_NOTE), [TBLX - 70, stand - 80]); st.head = lerp(10, 30, win(s, T_NOTE, T_READ));
            st.head = lerp(st.head, -4, win(s, T_BABE - 0.3, T_BABE));
          }
          if (s > T_CTA) { st.head = -14; reachTo(st, hold(s, T_REACH - 0.3, T_TAP + 0.4, 0.3), [CLKX - 30, CLKY + 40 + (Math.abs(s - T_TAP) < 0.1 ? 6 : 0)]); }
          return st;
        }
        // ---- her: at the table, waiting; asleep on DAY 90; gone on DAY 365 ----
        function herRaw(s) {
          const ch = chap(s);
          const st = sitAt(CHX, -1, { head: 10 });
          if (ch < 2) {
            const ask = hold(s, ASK[ch] - 0.4, IG[ch] + 0.6, 0.3);
            st.head = lerp(st.head, -6, ask); st.torso = lerp(st.torso, -4, ask);
            reachTo(st, 1, [CHX - 70, FL - 160]); reachTo(st, 1, [CHX - 60, FL - 156], "b");
            st.head = lerp(st.head, 30, win(s, IG[ch], IG[ch] + 0.5));
          } else if (ch === 2) {
            Object.assign(st, sitAt(CHX, -1, { torso: 50, head: 30 }));
            reachTo(st, 1, [CHX - 96, FL - 166]); reachTo(st, 1, [CHX - 80, FL - 162], "b");
          }
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
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:520px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.2, 560, 400, 1.26], [C[1], 1.7, 650, 380, 1.8], [C[2], 1.55, 600, 390, 1.65], [C[3], 1.2, 520, 400, 1.24], [T_READ - 0.05, 1.8, 470, 370, 1.95], [T_L2 - 0.1, 1.2, 560, 400, 1.24], [T_CTA, 1.7, 820, 320, 2.0]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.3, "SHE WAITS WITH DINNER."], [IG[0], "HE ALREADY ATE.", 1], [C[1] + 0.3, "SHE ASKS ABOUT HIS DAY."], [IG[1], "HE SAYS \"TIRED.\"", 2], [C[2] + 0.3, "SHE FELL ASLEEP WAITING."], [IG[2] - 0.2, "HE DOESN'T EVEN WAKE HER.", 2], [C[3] + 0.3, "ONE NIGHT..."], [T_READ, "SHE WASN'T THERE.", 1]];
        const TAGS = ["DAY 1 · 10:00 PM", "DAY 30 · 12:00 AM", "DAY 90 · 2:00 AM", "DAY 365 · 11:00 PM"];
        const HOURS = [10, 12, 2, 11];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        const LIGHT = [1, 0.8, 0.62, 0.45];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s), ch = chap(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), -1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const herOn = ch < 3;
          her.g.setAttribute("opacity", herOn ? 1 : 0); bun.setAttribute("opacity", herOn ? 1 : 0);
          if (her.g.previousSibling) her.g.previousSibling.setAttribute("opacity", herOn ? 0.45 : 0);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_SHAT ? 1 : 0);
          her.g.style.filter = `brightness(${LIGHT[lvl].toFixed(3)})`;
          // door opens when he comes home
          const dq = Math.max(...IN.map((ti) => hold(s, ti - 0.3, ti + 0.6, 0.25)));
          doorP.setAttribute("transform", `translate(${DOORX - 70} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1)`);
          doorLight.setAttribute("opacity", (0.9 * dq).toFixed(3));
          // clock: hour per chapter, minute hand ticks
          const hr = HOURS[ch] + (s - C[ch]) * 0.05, mn = ((s - C[ch]) * 0.6) % 1;
          hH.setAttribute("transform", `rotate(${r1((hr % 12) * 30)})`); hM.setAttribute("transform", `rotate(${r1(mn * 360)})`);
          // dinner: hot on DAY 1, cold later, gone on DAY 365; candle out on DAY 365
          dinner.setAttribute("opacity", ch < 3 ? 1 : 0);
          const fh = 14 + 3 * Math.sin(s * 13);
          flame.setAttribute("d", `M${TBLX} ${FL - 196} Q${TBLX - 8} ${r1(FL - 206)} ${TBLX} ${r1(FL - 196 - fh)} Q${TBLX + 8} ${r1(FL - 206)} ${TBLX} ${FL - 196} Z`);
          flame.setAttribute("opacity", ch < 3 ? 1 : 0);
          steam.forEach((e, i) => { const q = frac(s * 0.7 + i / 3); e.setAttribute("d", `M${r1(TBLX - 62 + i * 12)} ${r1(FL - 172 - 50 * q)} q8 -10 0 -20`); e.setAttribute("opacity", (0.6 * Math.sin(Math.PI * q) * (ch === 0 ? 1 : 0)).toFixed(3)); });
          note.setAttribute("opacity", ch === 3 && s < T_NOTE ? 1 : 0); note.setAttribute("transform", `translate(${TBLX - 40} ${FL - 152})`);
          bag.setAttribute("opacity", ch < 3 && s > IN[ch] ? 1 : 0);
          bag.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] + 10)})`);
          phone.setAttribute("opacity", ch < 3 && s > IN[ch] ? 1 : 0);
          phone.setAttribute("transform", `translate(${r1(mp.hands[0][0])} ${r1(mp.hands[0][1] - 6)})`);
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bDin, ASK[0], IG[0] + 0.5, [hp.head[0] - 40, hp.head[1] - 90]);
          bub(bAte, IG[0], C[1] - 0.6, [mp.head[0] + 60, mp.head[1] - 90]);
          bub(bWork, ASK[1], IG[1] + 0.5, [hp.head[0] - 60, hp.head[1] - 90]);
          bub(bTired, IG[1], C[2] - 0.6, [mp.head[0] + 50, mp.head[1] - 90]);
          bub(bBabe, T_BABE, T_L2, [mp.head[0] + 40, mp.head[1] - 90]);
          zz.setAttribute("opacity", ch === 2 ? (0.6 + 0.4 * Math.sin(s * 3)).toFixed(3) : 0);
          zz.setAttribute("x", r1(hp.head[0] - 30)); zz.setAttribute("y", r1(hp.head[1] - 50 - 10 * frac(s * 0.5)));
          const nq = hold(s, T_READ, T_BABE - 0.05, 0.2);
          noteBig.setAttribute("opacity", nq.toFixed(3));
          noteBig.setAttribute("transform", `translate(${r1(mp.head[0] + 60)} ${r1(mp.head[1] - 140)}) scale(${(0.6 + 0.4 * backOut(nq)).toFixed(3)}) rotate(-3)`);
          // heart meter above her
          const hx = hp.head[0], hy = hp.head[1] - (ch === 2 ? 110 : 150), shat = s > T_SHAT;
          hm.setAttribute("opacity", s > 0.3 && !shat && herOn ? 1 : 0);
          const jolt = [T_C1, T_C2].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(hx + jolt)} ${r1(hy)}) scale(${(0.8 * (1 + 0.05 * Math.max(0, Math.sin(s * 7)))).toFixed(3)})`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622"][lvl]);
          shards.forEach((e, i) => { const q = clamp((s - T_SHAT) / 1.2, 0, 1), a = (i / 6) * Math.PI * 2 + 0.4; const sx = CHX - 40 + 70 * Math.cos(a) * q, sy = FL - 330 + (-60 * Math.sin(a) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(sy)}) rotate(${r1(200 * q * (i % 2 ? 1 : -1))})`); });
          cold.setAttribute("opacity", (0.1 * ch + 0.15 * (ch === 3 ? 1 : 0)).toFixed(3));
          warm.setAttribute("opacity", (0.22 - 0.05 * ch - (ch === 3 ? 0.08 : 0)).toFixed(3));

          tag.textContent = s < T_L2 - 0.2 ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 24) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SHE STOPPED WAITING UP.", L3 = "THAT'S WHEN HE NOTICED.";
          E("head").innerHTML = `<div>SHE WAITED UP EVERY NIGHT.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_CLK + 0.6, T_CLK + 1.0)).toFixed(3);

          // ---- FOLLOW: the clock face turns into a button
          const bq = sm(s, T_CLK + 0.4, T_CLK + 0.9), tapped = s > T_TAP;
          ticks.setAttribute("opacity", (1 - bq).toFixed(3)); hH.setAttribute("opacity", (1 - bq).toFixed(3)); hM.setAttribute("opacity", (1 - bq).toFixed(3));
          clkFace.setAttribute("fill", bq < 0.5 ? "#efefef" : tapped ? "#ffffff" : "#ff3b30");
          clkBtn.setAttribute("opacity", bq.toFixed(3));
          clkBtn.textContent = tapped ? "FOLLOWING" : "+ FOLLOW"; clkBtn.setAttribute("fill", tapped ? "#000" : "#fff"); clkBtn.setAttribute("font-size", tapped ? 17 : 20);
          const bump = (1 + 0.25 * bq) * (tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : 1 + 0.04 * bq * Math.max(0, Math.sin(s * 6)));
          clk.setAttribute("transform", `translate(${CLKX} ${CLKY}) scale(${bump.toFixed(3)})`);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(CLKX + Math.cos(a) * 140 * Math.sqrt(q))} ${r1(CLKY + Math.sin(a) * 110 * Math.sqrt(q))}) scale(${(0.8 - 0.4 * q).toFixed(2)})`); });
          const TT = "DON'T WAIT UNTIL SHE STOPS WAITING.";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_TAP - 0.3) * 28)));
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
