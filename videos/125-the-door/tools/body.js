        // ---------- "the door" (ONE-SIDED LOVE, format 2, he loves, she ignores): a café door on a night street. DAY 1 he holds the door, she smiles and walks in. DAY 30 he holds it, she walks through on her phone without looking. DAY 90 he carries her bags, she goes in first and lets the door slam in his face, bags drop. DAY 365 he holds the door and waits, then lets go and walks away; she comes on her phone and walks straight into the closed door; for the first time she looks up: nobody. FOLLOW: the neon sign next to the door flips from "OPEN" to "+ FOLLOW", she taps it → "FOLLOWING ✓" and the door swings open, warm light. ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const doorG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const C = [0, 4.6, 9.0, 13.4];                          // DAY 1 / 30 / 90 / 365
        const T_SMILE = 2.2, T_C1 = 6.9;
        const T_OPEN3 = 11.4, T_IN3 = 11.8, T_SLAM = 12.3, T_HIT = 12.45, T_C2 = 12.5;
        const T_C3 = 14.7, T_LETGO = 15.4, T_HWALK = 15.9, T_HGONE = 18.6, T_SARR = 16.8, T_BUMP = 19.5, T_LOOK = 20.4;
        const T_L2 = 21.6, T_L3 = 22.8;
        const T_CTA = 24.0, T_SIG = 24.4, T_TAP = 25.6;
        const DXL = 600, DXR = 760, DH = 330, HX = 818, SIGNX = 500, SIGNY = FL - 300;
        const chap = (s) => (s < C[1] ? 0 : s < C[2] ? 1 : s < C[3] ? 2 : 3);

        // ---------- street + café front ----------
        svgEl("polygon", { points: `-1400,${FL - 900} 3000,${FL - 900} 3000,${FL} -1400,${FL}`, fill: "#0b0d14", opacity: 1 }, backG);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        for (let i = 0; i < 16; i++) {
          const x = -900 + i * 170 + ((i * 37) % 40), h = 320 + ((i * 97) % 260);
          if (x > 300 && x < 1150) continue;
          svgEl("rect", { x, y: FL - 60 - h, width: 150, height: h, fill: "#151822", stroke: "#000", "stroke-width": 4 }, roomG);
          for (let r = 0; r < Math.floor(h / 60); r++) for (let c = 0; c < 3; c++) if ((i * 7 + r * 3 + c) % 5 === 0) svgEl("rect", { x: x + 18 + c * 42, y: FL - 40 - h + r * 60, width: 22, height: 28, fill: "#e8c878", opacity: 0.5 }, roomG);
        }
        // café facade
        svgEl("rect", { x: 330, y: FL - 700, width: 820, height: 700, fill: "#22202a", stroke: "#000", "stroke-width": 6 }, roomG);
        for (let y = FL - 680; y < FL; y += 34) svgEl("path", { d: `M330 ${y} L1150 ${y}`, stroke: "#1a1820", "stroke-width": 3 }, roomG);
        svgEl("rect", { x: 320, y: FL - 470, width: 840, height: 60, fill: "#3a1e1e", stroke: "#000", "stroke-width": 6 }, roomG);
        for (let i = 0; i < 12; i++) svgEl("path", { d: `M${320 + i * 70} ${FL - 410} l35 30 l35 -30 Z`, fill: i % 2 ? "#7a2a2a" : "#d8d0c0", stroke: "#000", "stroke-width": 4 }, roomG);
        const shopWin = svgEl("rect", { x: 860, y: FL - 340, width: 250, height: 230, fill: "url(#warmIn)", stroke: "#000", "stroke-width": 6, opacity: 0.55 }, roomG);
        svgEl("path", { d: `M985 ${FL - 340} L985 ${FL - 110}`, stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("text", { x: 985, y: FL - 432, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#f2dc9a", "text-anchor": "middle", "letter-spacing": "4" }, roomG).textContent = "CAFÉ";
        // doorway (light inside) + frame
        const inside = svgEl("rect", { x: DXL, y: FL - DH, width: DXR - DXL, height: DH, fill: "url(#warmIn)", opacity: 0 }, roomG);
        svgEl("rect", { x: DXL, y: FL - DH, width: DXR - DXL, height: DH, fill: "#07080c", opacity: 0.55 }, roomG);
        const inGlow = svgEl("circle", { cx: 680, cy: FL - 120, r: 260, fill: "url(#fireGlow)", opacity: 0 }, roomG);
        svgEl("rect", { x: DXL - 14, y: FL - DH - 14, width: DXR - DXL + 28, height: DH + 14, fill: "none", stroke: "#000", "stroke-width": 8 }, roomG);
        svgEl("rect", { x: DXL - 10, y: FL - DH - 10, width: DXR - DXL + 20, height: DH + 10, fill: "none", stroke: "#4a3020", "stroke-width": 6 }, roomG);
        // neon sign
        const sign = svgEl("g", {}, roomG);
        const signR = svgEl("rect", { x: -70, y: -26, width: 140, height: 52, rx: 12, fill: "#14141a", stroke: "#000", "stroke-width": 5 }, sign);
        const signT = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 28, fill: "#ff5a8a", "text-anchor": "middle" }, sign);
        const signGlow = svgEl("circle", { r: 90, fill: "url(#fireGlow)", opacity: 0.3 }, sign);
        sign.insertBefore(signGlow, signR);
        svgEl("rect", { x: -1400, y: FL - 30, width: 3400, height: 30, fill: "#2a2c34", stroke: "#000", "stroke-width": 5 }, roomG);
        for (const lx of [-300, 1350]) {
          svgEl("polygon", { points: `${lx - 30},${FL - 470} ${lx + 30},${FL - 470} ${lx + 170},${FL} ${lx - 170},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.2 }, beams);
          svgEl("rect", { x: lx - 6, y: FL - 480, width: 12, height: 480, fill: "#2e323c", stroke: "#000", "stroke-width": 4 }, roomG);
          svgEl("path", { d: `M${lx - 34} ${FL - 470} L${lx + 34} ${FL - 470} L${lx + 20} ${FL - 500} L${lx - 20} ${FL - 500} Z`, fill: "#f2dc9a", stroke: "#000", "stroke-width": 4 }, roomG);
        }
        // the door: hinge on the right, swings out toward us
        const door = svgEl("path", { fill: "url(#doorG)", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, doorG);
        const doorWin = svgEl("path", { fill: "#e8c878", opacity: 0.35, stroke: "#000", "stroke-width": 4 }, doorG);
        const knob = svgEl("circle", { r: 8, fill: "#d8c070", stroke: "#000", "stroke-width": 3 }, doorG);
        const edgeX = (a) => DXR - (DXR - DXL) * Math.cos(rad(80 * a));
        function drawDoor(a) {
          const ex = edgeX(a), k = Math.sin(rad(80 * a)) * 22;
          door.setAttribute("d", `M${DXR} ${FL - DH} L${r1(ex)} ${r1(FL - DH - k)} L${r1(ex)} ${r1(FL + k * 0.4)} L${DXR} ${FL} Z`);
          const wx0 = lerp(ex, DXR, 0.2), wx1 = lerp(ex, DXR, 0.8);
          doorWin.setAttribute("d", `M${r1(wx0)} ${r1(FL - DH + 40 - k * 0.8)} L${r1(wx1)} ${r1(FL - DH + 40 - k * 0.2)} L${r1(wx1)} ${r1(FL - 190 - k * 0.1)} L${r1(wx0)} ${r1(FL - 190 - k * 0.4)} Z`);
          knob.setAttribute("cx", r1(lerp(ex, DXR, 0.12))); knob.setAttribute("cy", r1(FL - 170 - k * 0.3));
        }

        // ---------- figures + props ----------
        const bags = [0, 1].map((i) => { const g = svgEl("g", { opacity: 0 }, figG); svgEl("rect", { x: -26, y: 0, width: 52, height: 60, rx: 4, fill: i ? "#c86a8a" : "#e8d8b0", stroke: "#000", "stroke-width": 4 }, g); svgEl("path", { d: "M-14 0 Q0 -22 14 0", fill: "none", stroke: "#000", "stroke-width": 4 }, g); return g; });
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const herPhone = svgEl("rect", { x: -9, y: -14, width: 18, height: 28, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, fxG);
        const herGlow = svgEl("circle", { r: 55, fill: "url(#phoneGlow2)", opacity: 0.7 }, fxG);
        const HEART = "M0 30 C-66 -14 -50 -66 0 -36 C50 -66 66 -14 0 30 Z";
        const hm = svgEl("g", { opacity: 0 }, fxG);
        svgEl("circle", { r: 60, fill: "url(#fireGlow)", opacity: 0.5 }, hm);
        const hmH = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, hm);
        const cracks = ["M-2 -34 L6 -20 L-4 -8", "M-4 -8 L8 4 L-2 16", "M-2 16 L4 28 M-30 -30 L-18 -18 L-26 -6 M28 -28 L18 -14 L26 -2"].map((d) => svgEl("path", { d, fill: "none", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, hm));
        const shards = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: ["M0 0 L-20 -16 L-6 -24 Z", "M0 0 L18 -18 L6 -26 Z", "M0 0 L-22 8 L-12 18 Z", "M0 0 L20 8 L10 20 Z", "M0 0 L-8 18 L6 22 Z", "M0 0 L-4 -20 L12 -14 Z"][i], fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const smile = svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const bonk = Array.from({ length: 5 }, (_, i) => svgEl("path", { d: `M0 0 L${r1(Math.cos(rad(-150 + i * 30)) * 34)} ${r1(Math.sin(rad(-150 + i * 30)) * 34)}`, stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
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

        // ---------- door angle + paths ----------
        function doorA(s) {
          const ch = chap(s);
          if (ch < 2) return sm(s, C[ch] + 0.1, C[ch] + 0.6);
          if (ch === 2) return sm(s, T_OPEN3, T_IN3) * (1 - sm(s, T_SLAM, T_HIT));
          if (s < T_CTA) return sm(s, C[3] + 0.1, C[3] + 0.6) * (1 - sm(s, T_LETGO, T_LETGO + 0.5));
          return sm(s, T_TAP + 0.2, T_TAP + 0.9);
        }
        function herX(s) {
          const ch = chap(s);
          if (ch < 2) { const a = C[ch] + 0.4; return lerp(120, 690, clamp((s - a) / 3.3, 0, 1)); }
          if (ch === 2) { if (s < T_OPEN3) return lerp(120, 560, clamp((s - 9.2) / (T_OPEN3 - 9.2), 0, 1)); return lerp(560, 690, sm(s, T_IN3 - 0.1, T_SLAM)); }
          if (s < T_SARR) return -400;
          if (s < T_BUMP) return lerp(60, 675, (s - T_SARR) / (T_BUMP - T_SARR));
          if (s < T_CTA) return lerp(675, 640, sm(s, T_BUMP, T_BUMP + 0.25));
          return lerp(640, SIGNX + 92, sm(s, T_CTA, T_SIG + 0.3));
        }
        const herIn = (s) => { const ch = chap(s); if (ch === 3) return 0; const x = herX(s); return sm(x, 640, 688); };
        function himX(s) {
          const ch = chap(s);
          if (ch === 2) { const hx = lerp(-60, 556, clamp((s - 9.4) / (T_HIT - 9.4), 0, 1)); return s < T_HIT ? hx : lerp(556, 500, sm(s, T_HIT, T_HIT + 0.3)); }
          if (ch === 3 && s > T_HWALK) return lerp(HX, 1500, (s - T_HWALK) / (T_HGONE - T_HWALK));
          return HX;
        }
        const moving = (fn, s) => Math.abs(fn(s + 0.03) - fn(s - 0.03)) > 0.6;
        const himF = (s) => (chap(s) === 2 || (chap(s) === 3 && s > T_HWALK - 0.2) ? 1 : -1);
        const herF = (s) => (chap(s) === 3 && s > T_CTA + 0.1 ? -1 : 1);

        function himRaw(s) {
          const x = himX(s), ch = chap(s), f = himF(s);
          const st = moving(himX, s) ? walking(ch === 3 ? HX : -60, x, 4) : standOn(x, f, FL);
          if (ch !== 2 && !(ch === 3 && s > T_LETGO)) {
            const a = doorA(s), k = ch === 3 ? 1 : sm(s, C[ch], C[ch] + 0.3);
            reachTo(st, k, [edgeX(a) + 6, FL - 172]);
            st.head = lerp(st.head, ch === 3 ? -4 : 8, k);
          }
          if (ch === 0) st.head = lerp(st.head, -14, hold(s, T_SMILE - 0.4, T_SMILE + 1.0, 0.3));
          if (ch === 2) {
            const hit = sm(s, T_HIT, T_HIT + 0.15) * (1 - sm(s, T_HIT + 0.6, T_HIT + 1.2));
            st.torso -= 22 * hit; st.head -= 20 * hit;
            const carry = 1 - sm(s, T_HIT, T_HIT + 0.2);
            reachTo(st, carry, [x + 26, FL - 150]); reachTo(st, carry, [x - 22, FL - 150], "b");
            st.head = lerp(st.head, 30, sm(s, T_HIT + 1.0, C[3]));
          }
          if (ch === 3) {
            st.head = lerp(st.head, -18, hold(s, 13.9, T_C3 + 0.3, 0.3));
            st.head = lerp(st.head, 30, hold(s, T_C3 + 0.2, T_HWALK, 0.3));
          }
          return st;
        }
        function herRaw(s) {
          const x = herX(s), ch = chap(s), f = herF(s);
          if (x < -350) return standOn(-400, 1, FL);
          const st = moving(herX, s) ? walking(ch === 3 ? 60 : 120, x, 0) : standOn(x, f, FL);
          const ph = ch === 0 ? 0 : ch === 3 ? 1 - sm(s, T_BUMP, T_BUMP + 0.15) : 1;
          reachTo(st, ph, [x + 30 * f, FL - 214]); st.head = lerp(st.head, 26, ph);
          if (ch === 0) st.head = lerp(st.head, -8, hold(s, T_SMILE - 0.5, T_SMILE + 0.9, 0.3));
          if (ch === 2) reachTo(st, hold(s, T_OPEN3 - 0.3, T_IN3 + 0.2, 0.25), [edgeX(doorA(s)) + 4, FL - 172], "b");
          if (ch === 3 && s > T_BUMP) {
            const b = sm(s, T_BUMP, T_BUMP + 0.12) * (1 - sm(s, T_BUMP + 0.4, T_BUMP + 1.0));
            st.torso -= 18 * b; st.head -= 26 * b;
            reachTo(st, b, [x + 24, FL - 290], "b");
            st.head = lerp(st.head, -14, win(s, T_LOOK, T_LOOK + 0.5));
            reachTo(st, hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.25), [SIGNX + 30, SIGNY + 6 * win(s, T_TAP - 0.08, T_TAP)], "b");
          }
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:1500px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.18em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:100px;right:100px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:26px;letter-spacing:0.12em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function camAt(s) {
          const ch = chap(s);
          let cx = 650, cy = 400, z = 1.3;
          if (ch === 0) z = lerp(1.25, 1.35, s / C[1]);
          if (ch === 1) z = lerp(1.35, 1.45, (s - C[1]) / 4.4);
          if (ch === 2) { cx = lerp(480, 640, sm(s, 9.2, T_OPEN3)); z = lerp(1.35, 1.55, sm(s, T_OPEN3, T_HIT)); }
          if (ch === 3) {
            if (s < T_LETGO + 0.5) { cx = lerp(650, 760, sm(s, C[3], T_LETGO)); z = lerp(1.35, 1.7, sm(s, C[3], T_LETGO)); cy = lerp(400, 380, sm(s, C[3], T_LETGO)); }
            else if (s < T_BUMP) { cx = lerp(760, 600, sm(s, T_LETGO + 0.5, T_HGONE)); z = lerp(1.7, 1.3, sm(s, T_LETGO + 0.5, T_HGONE)); }
            else if (s < T_CTA) { cx = lerp(600, 650, sm(s, T_BUMP, T_LOOK)); z = lerp(1.3, 1.6, sm(s, T_BUMP, T_LOOK + 0.6)); cy = 380; }
            else { cx = lerp(650, 560, sm(s, T_CTA, T_SIG + 0.4)); z = lerp(1.6, 1.85, sm(s, T_CTA, T_SIG + 0.4)); cy = lerp(380, FL - 250, sm(s, T_CTA, T_SIG)); }
          }
          return [z, cx, cy];
        }
        const CAPS = [[0.3, "HE HOLDS THE DOOR."], [T_SMILE, "SHE SMILES.", 1], [C[1] + 0.3, "HE HOLDS THE DOOR."], [6.4, "SHE DOESN'T LOOK UP.", 1], [C[2] + 0.3, "HE CARRIES HER BAGS."], [T_SLAM, "SHE LETS IT SLAM.", 3], [C[3] + 0.3, "HE HOLDS THE DOOR."], [T_LETGO, "THEN HE LETS GO.", 3], [T_BUMP, "SHE WALKS INTO IT."], [T_LOOK, "SHE LOOKS UP. NOBODY.", 3]];
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
          const a = doorA(s);
          drawDoor(a);
          const lit = ch < 3 || s > T_TAP;
          inside.setAttribute("opacity", (a * (lit ? 0.85 : 0.2)).toFixed(3));
          inGlow.setAttribute("opacity", (a * (lit ? 0.5 : 0)).toFixed(3));
          shopWin.setAttribute("opacity", ch < 3 || s > T_TAP ? 0.55 : 0.18);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          const hin = herIn(s), hOff = herX(s) < -350;
          her.g.setAttribute("opacity", hOff ? 0 : (1 - hin).toFixed(3)); bun.setAttribute("opacity", hOff ? 0 : (1 - hin).toFixed(3));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herF(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hGone = ch === 3 && s > T_HGONE;
          him.g.setAttribute("opacity", hGone ? 0 : 1);
          const lvl = (s > T_C1 ? 1 : 0) + (s > T_C2 ? 1 : 0) + (s > T_C3 ? 1 : 0) + (s > T_LETGO ? 1 : 0);
          him.g.style.filter = `brightness(${LIGHT[lvl].toFixed(3)})`;
          // her phone
          const pOn = !hOff && hin < 0.5 && (ch === 1 || ch === 2 || (ch === 3 && s < T_BUMP + 0.05));
          const pp = hp.hands[0];
          let px = pp[0], py = pp[1];
          if (ch === 3 && s > T_BUMP) { const q = clamp((s - T_BUMP) / 0.5, 0, 1); px = lerp(pp[0], 720, q); py = lerp(FL - 214, FL - 6, q * q); }
          const showP = pOn || (ch === 3 && s > T_BUMP && s < T_CTA);
          herPhone.setAttribute("opacity", showP ? (1 - hin).toFixed(3) : 0); herPhone.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${ch === 3 && s > T_BUMP ? r1(90 * clamp((s - T_BUMP) / 0.5, 0, 1)) : 0})`);
          herGlow.setAttribute("cx", r1(px)); herGlow.setAttribute("cy", r1(py)); herGlow.setAttribute("opacity", showP ? ((0.6 + 0.15 * Math.sin(s * 5)) * (1 - hin)).toFixed(3) : 0);
          // bags (DAY 90): in his hands, then dropped
          bags.forEach((b, i) => {
            if (ch !== 2) { b.setAttribute("opacity", 0); return; }
            const hd = mp.hands[i];
            const q = clamp((s - T_HIT) / 0.4, 0, 1);
            const bx = s < T_HIT ? hd[0] : lerp(hd[0], 520 + i * 90, q), by = s < T_HIT ? hd[1] : lerp(hd[1], FL - 60, q * q);
            b.setAttribute("opacity", 1); b.setAttribute("transform", `translate(${r1(bx)} ${r1(by)}) rotate(${r1(q * (i ? 70 : -80))})`);
          });
          // her smile heart (DAY 1)
          const sq = hold(s, T_SMILE, T_SMILE + 1.4, 0.3);
          smile.setAttribute("opacity", sq.toFixed(3)); smile.setAttribute("transform", `translate(${r1(hp.head[0] + 30)} ${r1(hp.head[1] - 70 - 30 * (s - T_SMILE))}) scale(${(0.9 * backOut(sq)).toFixed(3)})`);
          // bonk
          bonk.forEach((e) => { e.setAttribute("opacity", hold(s, T_BUMP, T_BUMP + 0.5, 0.05).toFixed(3)); e.setAttribute("transform", `translate(${r1(hp.head[0] + 34)} ${r1(hp.head[1] - 10)}) scale(${(0.7 + 0.6 * sm(s, T_BUMP, T_BUMP + 0.3)).toFixed(3)})`); });
          // neon sign
          const cta = s > T_SIG, tapped = s > T_TAP;
          signT.textContent = tapped ? "FOLLOWING ✓" : cta ? "+ FOLLOW" : "OPEN";
          signT.setAttribute("font-size", tapped ? 17 : cta ? 22 : 28);
          const neonOn = ch < 3 || cta || s < T_LETGO;
          const flick = cta && !tapped && s < T_SIG + 0.4 ? (Math.sin(s * 70) > 0 ? 1 : 0.2) : 1;
          signT.setAttribute("fill", tapped ? "#ffffff" : cta ? "#ff3b30" : "#ff5a8a"); signT.setAttribute("opacity", neonOn ? flick : 0.15);
          signR.setAttribute("fill", tapped ? "#ff3b30" : "#14141a");
          signGlow.setAttribute("opacity", neonOn ? (cta ? 0.6 : 0.3) * flick : 0);
          const bump = tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : cta ? 1 + 0.08 * backOut(sm(s, T_SIG, T_SIG + 0.3)) * (1 - sm(s, T_SIG + 0.3, T_SIG + 0.6)) : 1;
          sign.setAttribute("transform", `translate(${SIGNX} ${SIGNY}) scale(${bump.toFixed(3)})`);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), aa = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(SIGNX + Math.cos(aa) * 120 * Math.sqrt(q))} ${r1(SIGNY + Math.sin(aa) * 80 * Math.sqrt(q))}) scale(${(0.5 - 0.2 * q).toFixed(2)})`); });
          // heart meter above him
          const shat = s > T_LETGO;
          hm.setAttribute("opacity", s > 0.3 && !shat ? 1 : 0);
          const jolt = [T_C1, T_C2, T_C3].reduce((j, tc) => j + (s > tc && s < tc + 0.25 ? 6 * Math.sin((s - tc) * 80) * (1 - (s - tc) / 0.25) : 0), 0);
          hm.setAttribute("transform", `translate(${r1(mp.head[0] + jolt)} ${r1(mp.head[1] - 110)}) scale(0.7)`);
          cracks.forEach((e, i) => e.setAttribute("opacity", s > [T_C1, T_C2, T_C3][i] ? 1 : 0));
          hmH.setAttribute("fill", ["#ff3b30", "#e8332a", "#c42c26", "#9e2622", "#9e2622"][lvl]);
          shards.forEach((e, i) => { const q = clamp((s - T_LETGO) / 1.2, 0, 1), aa = (i / 6) * Math.PI * 2 + 0.4; const sx = HX + 70 * Math.cos(aa) * q, sy = FL - 420 + (-60 * Math.sin(aa) - 30) * q + 520 * q * q; e.setAttribute("opacity", shat && q < 1 ? (1 - q * q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(sx)} ${r1(sy)}) rotate(${r1(200 * q * (i % 2 ? 1 : -1))})`); });
          cold.setAttribute("opacity", (0.08 * ch + 0.15 * (s > T_HGONE ? 1 : 0)).toFixed(3));

          tag.textContent = s < T_L2 - 0.2 ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2], C[3]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SHE ONLY NOTICED HIM", L3 = "WHEN THE DOOR WAS CLOSED.";
          E("head").innerHTML = `<div>HE HELD THE DOOR FOR HER EVERY DAY.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          const TT = "HOLD THE DOOR FOR THE ONE WHO HOLDS IT FOR YOU.";
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
