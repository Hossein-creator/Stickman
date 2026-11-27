        // ---------- "school gate" (viral remake: Seo Ellana "Boyfriend surprises his Girlfriend at School", 1.35M): chat on her phone "I MISS YOU" / "ME TOO. 600 KM IS SO FAR." → he is the one typing, standing outside her school gate with roses behind his back. The bell rings, the gate opens, students pour out, she comes out with two friends on her phone. A friend points, she looks up, drops her phone, runs, jumps into his arms; friends cheer, hearts. FOLLOW: the card on the bouquet turns into "+ FOLLOW", she flips it → "FOLLOWING ✓". ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const crowdG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_MSG1 = 0.5, T_TYP = 1.1, T_MSG2 = 1.8, T_CUT = 3.2, T_POCKET = 4.0, T_ROSES = 4.6;
        const T_BELL = 5.8, T_GATE = 6.3, T_OUT = 7.6, T_STOP = 9.0, T_POINT = 8.9, T_UP = 9.4, T_DROP = 9.8, T_RUN = 10.0, T_HUG = 10.8, T_HEART = 11.3;
        const T_L2 = 12.6, T_L3 = 13.8;
        const T_CTA = 15.2, T_CARD = 15.5, T_TAP = 16.7;
        const HX = 870, GX0 = 170, GX1 = 470, GC = 320, SHX0 = 320, SHX1 = 470, HUGX = HX - 66;

        // ---------- school street ----------
        svgEl("polygon", { points: `-1400,${FL - 900} 3000,${FL - 900} 3000,${FL} -1400,${FL}`, fill: "#1a2030", opacity: 1 }, backG);
        // school building behind the wall
        svgEl("rect", { x: -300, y: FL - 620, width: 1100, height: 620, fill: "#4a3e3a", stroke: "#000", "stroke-width": 6 }, roomG);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) svgEl("rect", { x: -260 + c * 150, y: FL - 590 + r * 120, width: 90, height: 80, fill: "#e8c878", opacity: 0.55, stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: 120, y: FL - 680, width: 400, height: 70, fill: "#2a3a5a", stroke: "#000", "stroke-width": 6 }, roomG);
        svgEl("text", { x: 320, y: FL - 633, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#f2f2f2", "text-anchor": "middle", "letter-spacing": "4" }, roomG).textContent = "HIGH SCHOOL";
        const bell = svgEl("g", {}, roomG);
        svgEl("path", { d: "M-26 16 Q-26 -24 0 -24 Q26 -24 26 16 Z", fill: "#d8b040", stroke: "#000", "stroke-width": 5 }, bell);
        svgEl("circle", { cx: 0, cy: 20, r: 7, fill: "#8a6a20", stroke: "#000", "stroke-width": 3 }, bell);
        const bellW = Array.from({ length: 3 }, (_, i) => svgEl("path", { d: `M${34 + i * 14} -20 Q${44 + i * 14} 0 ${34 + i * 14} 20`, fill: "none", stroke: "#fff", "stroke-width": 4, opacity: 0 }, bell));
        // trees + sky
        svgEl("circle", { cx: 1020, cy: 170, r: 36, fill: "#f4ecd0", opacity: 0.85 }, backG);
        for (const [x, r] of [[1060, 120], [-420, 110]]) {
          svgEl("rect", { x: x - 16, y: FL - 330, width: 32, height: 330, fill: "#3a2e26", stroke: "#000", "stroke-width": 5 }, roomG);
          svgEl("circle", { cx: x, cy: FL - 380, r, fill: "#2c4a30", stroke: "#000", "stroke-width": 6 }, roomG);
          svgEl("circle", { cx: x - 50, cy: FL - 330, r: r * 0.6, fill: "#335838", stroke: "#000", "stroke-width": 5 }, roomG);
        }
        // the wall with the gate
        svgEl("rect", { x: -1400, y: FL - 190, width: GX0 + 1400, height: 190, fill: "#7a6a5e", stroke: "#000", "stroke-width": 6 }, roomG);
        svgEl("rect", { x: GX1, y: FL - 190, width: 1000, height: 190, fill: "#7a6a5e", stroke: "#000", "stroke-width": 6 }, roomG);
        for (let x = -1380; x < 1500; x += 70) if (x < GX0 - 20 || x > GX1) svgEl("path", { d: `M${x} ${FL - 190} L${x} ${FL}`, stroke: "#5e5048", "stroke-width": 3 }, roomG);
        svgEl("rect", { x: GX0 - 30, y: FL - 260, width: 34, height: 260, fill: "#8a7a6a", stroke: "#000", "stroke-width": 6 }, roomG);
        svgEl("rect", { x: GX1 - 4, y: FL - 260, width: 34, height: 260, fill: "#8a7a6a", stroke: "#000", "stroke-width": 6 }, roomG);
        svgEl("rect", { x: -1400, y: FL - 30, width: 3400, height: 30, fill: "#3a3c44", stroke: "#000", "stroke-width": 5 }, roomG);
        const gateL = svgEl("g", {}, roomG), gateR = svgEl("g", {}, roomG);
        for (const [g, x0] of [[gateL, GX0 + 4], [gateR, GC]]) {
          svgEl("rect", { x: x0, y: FL - 230, width: GC - GX0 - 4, height: 200, fill: "none", stroke: "#000", "stroke-width": 9 }, g);
          svgEl("rect", { x: x0, y: FL - 230, width: GC - GX0 - 4, height: 200, fill: "none", stroke: "#4a5a6a", "stroke-width": 4 }, g);
          for (let i = 1; i < 6; i++) svgEl("path", { d: `M${x0 + i * 24.3} ${FL - 230} L${x0 + i * 24.3} ${FL - 30}`, stroke: "#2a3440", "stroke-width": 6 }, g);
        }
        // crowd layer goes between yard and gate front: use crowdG (drawn after roomG)

        // ---------- figures ----------
        const mkGrey = (id, col) => makeFig(crowdG, col, "#6a6a6a", false, id);
        const STU = [["s1", "#8a8a8a", 6.5, -1], ["s2", "#7a7a7a", 6.9, 1], ["s3", "#949494", 7.2, -1], ["s4", "#828282", 8.1, -1]].map(([id, col, t0, d]) => ({ fig: mkGrey(id, col), t0, d }));
        const FR = [["f1", "#9a9a9a", -90], ["f2", "#8e8e8e", -170]].map(([id, col, dx]) => ({ fig: mkGrey(id, col), dx, bun: svgEl("circle", { r: 14, fill: col, stroke: "#000", "stroke-width": 6 }, crowdG) }));
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const bag = svgEl("rect", { x: -22, y: -30, width: 44, height: 56, rx: 10, fill: "#4a6a9a", stroke: "#000", "stroke-width": 5 }, figG);
        figG.insertBefore(bag, her.g);
        const herPhone = svgEl("rect", { x: -9, y: -14, width: 18, height: 28, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, fxG);
        const herGlow = svgEl("circle", { r: 55, fill: "url(#phoneGlow2)", opacity: 0.7 }, fxG);
        const hisPhone = svgEl("rect", { x: -9, y: -14, width: 18, height: 28, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, fxG);
        // bouquet
        const bq = svgEl("g", {}, fxG);
        svgEl("path", { d: "M-6 70 L-30 0 L30 0 L6 70 Z", fill: "#f2ecdc", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, bq);
        for (const [x, y] of [[-20, -6], [0, -14], [20, -6], [-10, -26], [12, -28]]) { svgEl("circle", { cx: x, cy: y, r: 14, fill: "#e0282a", stroke: "#000", "stroke-width": 4 }, bq); svgEl("path", { d: `M${x - 5} ${y} q5 -6 10 0`, fill: "none", stroke: "#8a1010", "stroke-width": 3 }, bq); }
        for (const [x, y] of [[-30, 4], [30, 4]]) svgEl("ellipse", { cx: x, cy: y, rx: 12, ry: 6, fill: "#3a8a46", stroke: "#000", "stroke-width": 3 }, bq);
        const card = svgEl("g", {}, bq);
        svgEl("path", { d: "M0 30 L22 52", stroke: "#000", "stroke-width": 3 }, card);
        const cardR = svgEl("rect", { x: 8, y: 50, width: 40, height: 28, rx: 4, fill: "#fff", stroke: "#000", "stroke-width": 3 }, card);
        const cardT = svgEl("text", { x: 28, y: 69, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#e0282a", "text-anchor": "middle" }, card);
        const HEARTP = "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z";
        const hearts = Array.from({ length: 9 }, () => svgEl("path", { d: HEARTP, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: HEARTP, fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const glow = svgEl("circle", { r: 240, fill: "url(#fireGlow)", opacity: 0 }, roomG);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, head = 4, STR = 100, lift = 10, lean = 6) => { const ft = feetOn(x0, x, STR, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: lean, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 18 * sw, ael: 14, bsh: -4 - 18 * sw, bel: 14 }); };

        // ---------- paths ----------
        function herX(s) {
          if (s < T_OUT) return GC;
          if (s < T_STOP) return lerp(SHX0, SHX1, (s - T_OUT) / (T_STOP - T_OUT));
          if (s < T_RUN) return SHX1;
          return lerp(SHX1, HUGX, sm(s, T_RUN, T_HUG));
        }
        const herVis = (s) => sm(s, T_OUT - 0.1, T_OUT + 0.4);
        const moving = (fn, s) => Math.abs(fn(s + 0.03) - fn(s - 0.03)) > 0.6;
        function himRaw(s) {
          const st = standOn(HX, -1, FL);
          const ph = 1 - sm(s, T_POCKET, T_POCKET + 0.4);
          reachTo(st, ph, [HX - 30, FL - 212]); st.head = lerp(st.head, 24, ph);
          reachTo(st, 1 - ph, [HX - 14, FL - 140]);
          // roses behind his back (hand b), then up when she arrives
          reachTo(st, 1, [HX + 40, FL - 150], "b");
          const look = sm(s, T_BELL, T_BELL + 0.4); st.head = lerp(st.head, -6, look);
          const hug = sm(s, T_HUG - 0.2, T_HUG + 0.15);
          if (hug > 0) {
            st.torso = lerp(st.torso, 10, hug); st.head = lerp(st.head, 6, hug);
            reachTo(st, hug, [HUGX + 20, FL - 300]); reachTo(st, hug, [HX + 84, FL - 312], "b");
            const sw = Math.sin((s - T_HUG) * 2.2) * 6 * sm(s, T_HUG, T_HUG + 0.4); st.hx += sw * 0.3;
          }
          const tp = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.25);
          if (tp > 0) reachTo(st, tp, [cardPos(s)[0], cardPos(s)[1] + 8 * win(s, T_TAP - 0.08, T_TAP)]);
          return st;
        }
        function herRaw(s) {
          const x = herX(s);
          if (s >= T_RUN && s < T_HUG) { const st = walking(SHX1, x, 0, 150, 26, 16); return st; }
          let st = moving(herX, s) ? walking(SHX0, x, 0) : standOn(x, 1, FL);
          const ph = s < T_DROP ? 1 : 0;
          reachTo(st, ph, [x + 30, FL - 214]); st.head = lerp(st.head, 26, ph);
          st.head = lerp(st.head, -10, win(s, T_UP, T_UP + 0.25));
          if (s > T_UP && s < T_RUN) { reachTo(st, win(s, T_DROP, T_DROP + 0.2), [x + 10, FL - 290], "b"); st.torso -= 6; }
          const hug = sm(s, T_HUG - 0.1, T_HUG + 0.25);
          if (hug > 0) {
            const up = 64 * hug * (1 - 0.15 * Math.sin((s - T_HUG) * 2.2));
            st = mixPose(st, base({ hx: x, hy: stand - up, torso: 14, head: -6, ax: x - 70, ay: FL - up - 40, bx: x - 40, by: FL - up - 70 }), hug);
            reachTo(st, hug, [HX - 8, FL - 330 - 0.4 * up]); reachTo(st, hug, [HX + 20, FL - 300 - 0.4 * up], "b");
          }
          return st;
        }
        let bqAt = [HX + 40, FL - 150];
        const cardPos = (s) => [bqAt[0] + 30, bqAt[1] + 70];

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; } .bub { position:absolute; max-width:380px; padding:18px 24px; border-radius:30px; font-family:HFMono,monospace; font-weight:700; font-size:30px; letter-spacing:0.04em; border:4px solid #000; }";
        document.head.appendChild(capCss);
        const phoneUI = document.createElement("div");
        phoneUI.style.cssText = "position:absolute;left:250px;top:420px;width:580px;height:1060px;border-radius:70px;background:#0e1016;border:14px solid #2a2c34;box-shadow:0 0 0 5px #000,0 0 80px rgba(80,140,255,0.35);overflow:hidden";
        phoneUI.innerHTML = `<div style="position:absolute;left:0;right:0;top:0;height:150px;background:#181b24;border-bottom:3px solid #000"></div>
          <div style="position:absolute;left:40px;top:50px;width:70px;height:70px;border-radius:50%;background:#fff;border:4px solid #000"></div>
          <div style="position:absolute;left:130px;top:52px;font-family:HFMono,monospace;font-weight:700;font-size:32px;color:#fff">HIM ♥</div>
          <div style="position:absolute;left:130px;top:96px;font-family:HFMono,monospace;font-size:20px;color:#8fa0c0">600 KM AWAY</div>`;
        const b1 = document.createElement("div"); b1.className = "bub"; b1.style.cssText += ";right:30px;top:260px;background:#4f8cff;color:#fff"; b1.textContent = "I MISS YOU 🥺";
        const dots = document.createElement("div"); dots.className = "bub"; dots.style.cssText += ";left:30px;top:400px;background:#2a2e3a;color:#c8d0e0"; dots.textContent = "• • •";
        const b2 = document.createElement("div"); b2.className = "bub"; b2.style.cssText += ";left:30px;top:400px;background:#2a2e3a;color:#fff"; b2.textContent = "ME TOO. 600 KM IS SO FAR.";
        [b1, dots, b2].forEach((b) => phoneUI.appendChild(b));
        const phoneBg = document.createElement("div"); phoneBg.style.cssText = "position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#141a2c,#05060a)"; E("stage").appendChild(phoneBg);
        E("stage").appendChild(phoneUI);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:0;width:1080px;text-align:center;top:1530px;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.18em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:100px;right:100px;top:330px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const flash = document.createElement("div");
        flash.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(flash);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:560px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function camAt(s) {
          if (s < T_ROSES) return [1.9, HX - 30, FL - 210];
          if (s < T_GATE + 0.6) { const q = sm(s, T_ROSES + 0.2, T_GATE + 0.6); return [lerp(1.9, 1.12, q), lerp(HX - 10, 560, q), lerp(FL - 190, 400, q)]; }
          if (s < T_HUG - 0.6) return [1.12, 560, 400];
          if (s < T_CTA) { const q = sm(s, T_HUG - 0.6, T_HUG + 0.6); return [lerp(1.12, 1.55, q), lerp(560, HX - 50, q), lerp(400, FL - 250, q)]; }
          const q = sm(s, T_CTA, T_CARD + 0.4); return [lerp(1.55, 1.95, q), lerp(HX - 50, HX - 10, q), lerp(FL - 250, FL - 230, q)];
        }
        const CAPS = [[T_CUT + 0.3, "HE WAS RIGHT OUTSIDE."], [T_BELL, "THE BELL RINGS."], [T_OUT + 0.2, "THERE SHE IS."], [T_POINT, "\"ISN'T THAT...?\""], [T_UP, "SHE LOOKS UP."], [T_RUN, "SHE RUNS.", 1]];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        E("head").style.top = "236px"; E("head").style.zIndex = "5";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          // phone UI
          const pq = sm(s, T_CUT - 0.3, T_CUT + 0.1);
          phoneUI.style.opacity = (1 - pq).toFixed(3); phoneBg.style.opacity = (1 - pq).toFixed(3);
          phoneUI.style.transform = `scale(${(1 + 0.15 * pq).toFixed(3)})`;
          const bb = (el, a, b = 99) => { const k = hold(s, a, b, 0.15); el.style.opacity = k.toFixed(3); el.style.transform = `scale(${(0.7 + 0.3 * backOut(sm(s, a, a + 0.25))).toFixed(3)})`; };
          bb(b1, T_MSG1); bb(dots, T_TYP, T_MSG2); bb(b2, T_MSG2);
          dots.textContent = ["•    ", "• •  ", "• • •"][Math.floor(s * 6) % 3];
          // bell
          const ring = hold(s, T_BELL, T_BELL + 1.0, 0.1);
          bell.setAttribute("transform", `translate(${GX1 + 120} ${FL - 260}) rotate(${r1(18 * Math.sin(s * 40) * ring)})`);
          bellW.forEach((w, i) => w.setAttribute("opacity", (ring * (0.5 + 0.5 * Math.sin(s * 20 - i))).toFixed(3)));
          // gate slides open
          const go = sm(s, T_GATE, T_GATE + 0.6);
          gateL.setAttribute("transform", `translate(${r1(-140 * go)} 0)`); gateR.setAttribute("transform", `translate(${r1(150 * go)} 0)`);
          // students
          STU.forEach((u) => {
            const tt = s - u.t0, vis = tt > 0 && tt < 4.5;
            u.fig.g.setAttribute("opacity", vis ? (sm(tt, 0, 0.4) * (1 - sm(tt, 3.6, 4.4))).toFixed(3) : 0);
            if (!vis) return;
            const x = GC + u.d * 160 * tt;
            drawFig(u.fig, livePose(() => walking(GC, GC + u.d * 160 * (s - u.t0), 6), s, u.t0), u.d);
          });
          // friends
          FR.forEach((fr, i) => {
            const raw = (ss) => {
              const x = (ss < T_STOP ? herX(ss) : SHX1) + fr.dx;
              const st = ss > T_OUT && ss < T_STOP ? walking(SHX0 + fr.dx, x, 4) : standOn(x, 1, FL);
              if (i === 0) { const pt = hold(ss, T_POINT, T_RUN + 0.3, 0.25); reachTo(st, pt, [x + 120, FL - 300]); st.head = lerp(st.head, -8, pt); }
              const ch = sm(ss, T_HUG, T_HUG + 0.3);
              if (ch > 0) { reachTo(st, ch, [x - 30 + 10 * Math.sin(ss * 9), FL - 400]); reachTo(st, ch, [x + 40 - 10 * Math.sin(ss * 9), FL - 400], "b"); st.hy -= 14 * Math.abs(Math.sin((ss - T_HUG) * 6)) * ch; }
              return st;
            };
            fr.fig.g.setAttribute("opacity", herVis(s).toFixed(3)); fr.bun.setAttribute("opacity", herVis(s).toFixed(3));
            const p = drawFig(fr.fig, livePose(raw, s, 0.7 + i), 1);
            fr.bun.setAttribute("cx", r1(p.head[0] - 25)); fr.bun.setAttribute("cy", r1(p.head[1] - 16));
          });
          // couple
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          her.g.setAttribute("opacity", herVis(s).toFixed(3)); bun.setAttribute("opacity", herVis(s).toFixed(3));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // school bag on her back (dropped when she runs)
          const bd = clamp((s - T_RUN) / 0.4, 0, 1);
          bag.setAttribute("opacity", (herVis(s) * (s > T_RUN + 2 ? 1 : 1)).toFixed(3));
          const bgx = s < T_RUN ? hp.head[0] - 34 : lerp(SHX1 - 34, SHX1 + 20, bd), bgy = s < T_RUN ? hp.head[1] + 110 : lerp(FL - 260, FL - 28, bd * bd);
          bag.setAttribute("transform", `translate(${r1(bgx)} ${r1(bgy)}) rotate(${r1(-10 + 80 * bd)})`);
          // phones
          const hpOn = s < T_POCKET + 0.3, hpp = mp.hands[0];
          hisPhone.setAttribute("opacity", hpOn ? 1 : 0); hisPhone.setAttribute("transform", `translate(${r1(hpp[0])} ${r1(hpp[1])})`);
          let px = hp.hands[0][0], py = hp.hands[0][1];
          if (s > T_DROP) { const q = clamp((s - T_DROP) / 0.45, 0, 1); px = lerp(SHX1 + 30, SHX1 + 60, q); py = lerp(FL - 214, FL - 8, q * q); }
          const pv = herVis(s);
          herPhone.setAttribute("opacity", pv.toFixed(3)); herPhone.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${r1(s > T_DROP ? 90 * clamp((s - T_DROP) / 0.45, 0, 1) : 0)})`);
          herGlow.setAttribute("cx", r1(px)); herGlow.setAttribute("cy", r1(py)); herGlow.setAttribute("opacity", (s < T_DROP ? pv * 0.7 : 0.3 * pv).toFixed(3));
          // bouquet: behind his back, then over her back in the hug
          bqAt = mp.hands[1];
          const hug = sm(s, T_HUG, T_HUG + 0.3);
          bq.setAttribute("transform", `translate(${r1(bqAt[0])} ${r1(bqAt[1])}) rotate(${r1(lerp(10, 0, hug))}) scale(${lerp(1, 1.1, hug).toFixed(3)})`);
          const cta = s > T_CARD, tapped = s > T_TAP;
          const ck = cta ? backOut(sm(s, T_CARD, T_CARD + 0.4)) : 0;
          cardR.setAttribute("x", r1(8 - 50 * ck)); cardR.setAttribute("width", r1(40 + 100 * ck)); cardR.setAttribute("height", r1(28 + 12 * ck));
          cardR.setAttribute("fill", tapped ? "#ff3b30" : "#fff");
          cardT.setAttribute("x", r1(28)); cardT.setAttribute("y", r1(69 + 6 * ck));
          cardT.textContent = tapped ? "FOLLOWING ✓" : cta ? "+ FOLLOW" : "♥";
          cardT.setAttribute("fill", tapped ? "#fff" : "#e0282a"); cardT.setAttribute("font-size", tapped ? 13 : cta ? 17 : 16);
          const flip = tapped ? Math.abs(Math.cos(Math.PI * clamp((s - T_TAP) / 0.3, 0, 1))) : 1;
          card.setAttribute("transform", `translate(28 64) scale(${Math.max(0.05, flip).toFixed(3)} 1) translate(-28 -64)`);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; const cp = [bqAt[0] + 28, bqAt[1] + 64]; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(cp[0] + Math.cos(a) * 90 * Math.sqrt(q))} ${r1(cp[1] + Math.sin(a) * 60 * Math.sqrt(q))}) scale(${(0.45 - 0.2 * q).toFixed(2)})`); });
          // hearts float up from the hug
          hearts.forEach((h, i) => { const tt = (s - T_HEART - i * 0.35) / 2.4; const on = tt > 0 && tt < 1 && s < T_CTA + 0.5; h.setAttribute("opacity", on ? (Math.sin(Math.PI * tt)).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(HX - 40 + 90 * Math.sin(i * 2.1) + 20 * Math.sin(tt * 6 + i))} ${r1(FL - 380 - 200 * tt)}) scale(${(0.6 + 0.3 * (i % 3) / 2).toFixed(2)})`); });
          glow.setAttribute("cx", HX - 40); glow.setAttribute("cy", FL - 300); glow.setAttribute("opacity", (0.6 * sm(s, T_HUG, T_HUG + 0.8)).toFixed(3));

          tag.textContent = s > T_CUT && s < T_L2 - 0.3 ? "600 KM AWAY? NOT TODAY.".slice(0, Math.max(0, Math.floor((s - T_ROSES) * 22))) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          flash.style.opacity = (1 - Math.abs(s - T_CUT) / 0.15 > 0 ? 1 - Math.abs(s - T_CUT) / 0.15 : 0).toFixed(3);
          const L2 = "HE DROVE ALL NIGHT", L3 = "TO BE AT HER SCHOOL GATE.";
          E("head").innerHTML = `<div>SHE THOUGHT HE WAS 600 KM AWAY.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          const TT = "DISTANCE MEANS NOTHING WHEN SOMEONE MEANS EVERYTHING.";
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
