        // ---------- "small box" (viral remake, 8.3M views "Wife surprises husband with pregnancy announcement"): she hands him a small gift box, he shakes it, opens it: tiny baby shoes. Confused - he looks at her - her hand on her belly - "YOU'RE...?" "YES." He jumps up, drops to his knees, ear to her belly (heartbeat), then lifts her into a hug. FOLLOW: a baby mobile lowers over them, its moon disc says "+ FOLLOW", he taps it: it spins to "FOLLOWING". ----------
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
        const T_WIN = 0.4, T_STOP = 1.6, T_GIVE = 1.8, T_SHAKE = 2.6, T_ASK = 3.4, T_LID = 4.4, T_SHOES = 4.8, T_LOOK = 6.3, T_BELLY = 6.6;
        const T_REAL = 7.4, T_YOU = 8.0, T_YES = 8.6, T_JUMP = 9.2, T_KNEEL = 9.9, T_BEAT = 10.6, T_UP = 11.8, T_LIFT = 12.3;
        const T_L2 = 14.0, T_L3 = 15.0;
        const T_CTA = 17.0, T_MOB = 17.3, T_TAP = 19.4;
        const SOFX = 690, HERX = 460, HIMK = 585;

        // ---------- room: sofa, lamp, window ----------
        const warm = svgEl("circle", { cx: 600, cy: FL - 240, r: 460, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `480,${FL - 520} 660,${FL - 520} 780,${FL} 360,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        svgEl("rect", { x: 160, y: FL - 470, width: 170, height: 200, rx: 6, fill: "#0c1428", stroke: "#3a3a42", "stroke-width": 8 }, roomG);
        svgEl("path", { d: `M245 ${FL - 470} L245 ${FL - 270} M160 ${FL - 370} L330 ${FL - 370}`, stroke: "#3a3a42", "stroke-width": 6 }, roomG);
        svgEl("circle", { cx: 200, cy: FL - 430, r: 14, fill: "#e8e4d8", opacity: 0.7 }, roomG);
        svgEl("rect", { x: 980, y: FL - 300, width: 10, height: 300, fill: "#2a2a30", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("path", { d: `M950 ${FL - 300} L1020 ${FL - 300} L1000 ${FL - 360} L970 ${FL - 360} Z`, fill: "#ffd27a", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: 620, y: FL - 104, width: 260, height: 54, rx: 14, fill: "#4a5a6a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 820, y: FL - 220, width: 60, height: 170, rx: 16, fill: "#3e4c5a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 630, y: FL - 50, width: 240, height: 50, fill: "#2e3844", stroke: "#000", "stroke-width": 5 }, roomG);

        // ---------- props ----------
        const box = svgEl("g", {}, propG);
        svgEl("rect", { x: -26, y: -40, width: 52, height: 40, rx: 4, fill: "#ff5a6e", stroke: "#000", "stroke-width": 4 }, box);
        svgEl("rect", { x: -5, y: -40, width: 10, height: 40, fill: "#ffd25a", stroke: "#000", "stroke-width": 2 }, box);
        const lid = svgEl("g", {}, propG);
        svgEl("rect", { x: -30, y: -10, width: 60, height: 12, rx: 3, fill: "#ff7a8a", stroke: "#000", "stroke-width": 4 }, lid);
        svgEl("path", { d: "M0 -10 C-20 -30 -26 -10 0 -10 C26 -10 20 -30 0 -10", fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, lid);
        const shoe = (dx) => { const g = svgEl("g", { transform: `translate(${dx} 0)` }, propG); svgEl("path", { d: "M-10 -16 L4 -16 L6 -6 Q18 -6 18 2 L-10 2 Z", fill: "#a8d4ff", stroke: "#000", "stroke-width": 3, "stroke-linejoin": "round" }, g); return g; };
        const shoes = svgEl("g", {}, propG);
        const sh1 = shoe(0), sh2 = shoe(0);
        shoes.appendChild(sh1); shoes.appendChild(sh2);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bWhat = bubble("WHAT IS IT?", 220), bQ = bubble("?", 70, 34), bYou = bubble("YOU'RE...?", 210), bYes = bubble("YES.", 110, 30, "#ff3b30"), bEx = bubble("!", 70, 40, "#ff3b30");
        const beatH = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const hearts = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        // baby mobile (CTA)
        const mob = svgEl("g", { opacity: 0 }, fxG);
        svgEl("line", { x1: 0, y1: -600, x2: 0, y2: -110, stroke: "#bbb", "stroke-width": 3 }, mob);
        svgEl("path", { d: "M-150 -110 Q0 -150 150 -110", fill: "none", stroke: "#c9a27a", "stroke-width": 8, "stroke-linecap": "round" }, mob);
        const arms = svgEl("g", {}, mob);
        const hang = (x, len, d, col) => { svgEl("line", { x1: x, y1: -116, x2: x, y2: -116 + len, stroke: "#bbb", "stroke-width": 2 }, arms); const g = svgEl("g", { transform: `translate(${x} ${-116 + len})` }, arms); svgEl("path", { d, fill: col, stroke: "#000", "stroke-width": 3 }, g); return g; };
        hang(-140, 70, "M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4 Z", "#ffd25a");
        hang(140, 80, "M0 12 C-22 -3 -16 -22 0 -11 C16 -22 22 -3 0 12 Z", "#ff6a7a");
        hang(-70, 110, "M-10 -12 A14 14 0 1 0 6 12 A11 11 0 1 1 -10 -12 Z", "#e8e4d8");
        svgEl("line", { x1: 0, y1: -110, x2: 0, y2: -10, stroke: "#bbb", "stroke-width": 3 }, mob);
        const disc = svgEl("g", { transform: "translate(0 50)" }, mob);
        const discC = svgEl("circle", { r: 62, fill: "#ff3b30", stroke: "#000", "stroke-width": 6 }, disc);
        const discT = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 21, fill: "#fff", "text-anchor": "middle" }, disc);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 90, 9), sw = Math.sin((Math.PI * 2 * (x - x0)) / 90); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 10 * sw, ael: 14, bsh: -4 - 10 * sw, bel: 14 }); };
        const sitAt = (x, f, o) => base({ hx: x, hy: FL - 112, torso: 6, head: 6, ax: x + f * 60, ay: FL, bx: x + f * 44, by: FL, ...o });

        // ---- her ----
        const herX = (s) => (s < T_STOP ? lerp(-120, HERX, sm(s, T_WIN, T_STOP)) : HERX);
        function herRaw(s) {
          const x = herX(s);
          const st = s < T_STOP ? walking(-120, x) : standOn(x, 1, FL);
          // carries the box, hands it to him
          const carry = 1 - win(s, T_GIVE + 0.2, T_GIVE + 0.5);
          reachTo(st, carry, [lerp(x + 46, 560, win(s, T_GIVE - 0.2, T_GIVE + 0.3)), lerp(stand - 110, FL - 210, win(s, T_GIVE - 0.2, T_GIVE + 0.3))]);
          reachTo(st, carry, [lerp(x + 40, 556, win(s, T_GIVE - 0.2, T_GIVE + 0.3)), lerp(stand - 104, FL - 204, win(s, T_GIVE - 0.2, T_GIVE + 0.3))], "b");
          // hands folded, then a hand on her belly
          const wait = win(s, T_GIVE + 0.4, T_GIVE + 0.8) * (1 - win(s, T_UP, T_UP + 0.3));
          reachTo(st, wait, [x + 30, stand - 70]); reachTo(st, wait, [x + 24, stand - 66], "b");
          const bl = hold(s, T_BELLY, T_KNEEL + 1.6, 0.3); reachTo(st, bl, [x + 30, stand - 30]);
          st.head = lerp(st.head, 16, hold(s, T_BELLY, T_YES - 0.1, 0.3));
          st.head += 14 * Math.sin(Math.PI * clamp((s - T_YES) / 0.35, 0, 1)) * (s > T_YES && s < T_YES + 0.7 ? Math.sin(Math.PI * clamp((s - T_YES) / 0.7, 0, 1)) : 0);
          // hugged and lifted
          const hug = win(s, T_UP + 0.1, T_LIFT);
          reachTo(st, hug, [x + 80, stand - 160]); reachTo(st, hug, [x + 70, stand - 150], "b");
          const lift = win(s, T_LIFT, T_LIFT + 0.5);
          st.hy -= 60 * lift; st.ay -= 50 * lift; st.by -= 36 * lift; st.ax -= 20 * lift; st.bx -= 40 * lift; st.head = lerp(st.head, -10, hug);
          // CTA: both look up
          st.head = lerp(st.head, -24, win(s, T_MOB + 0.6, T_MOB + 1.2));
          return st;
        }
        // ---- him ----
        function himRaw(s) {
          let st = sitAt(SOFX, -1);
          // takes the box, shakes it at his ear
          const has = win(s, T_GIVE + 0.1, T_GIVE + 0.4);
          const shake = hold(s, T_SHAKE, T_LID - 0.2, 0.25), jig = 10 * Math.sin(s * 30) * shake;
          reachTo(st, has, [lerp(612, SOFX - 30 + jig, shake), lerp(FL - 196, FL - 280, shake)]); reachTo(st, has, [lerp(606, SOFX - 24 + jig, shake), lerp(FL - 190, FL - 272, shake)], "b");
          st.head = lerp(st.head, -6 + 0 * shake, shake) + 16 * win(s, T_LID - 0.3, T_LID);
          // lid off, shoes up
          const lidQ = hold(s, T_LID, T_SHOES + 0.1, 0.2); reachTo(st, lidQ, [600, FL - 250]);
          const sh = hold(s, T_SHOES, T_JUMP, 0.25); reachTo(st, sh, [590, FL - 250]);
          st.head = lerp(st.head, -10, sh);
          // looks at her, realizes
          const lk = win(s, T_LOOK, T_LOOK + 0.3); st.head = lerp(st.head, 6, lk);
          const re = win(s, T_REAL, T_REAL + 0.2); st.torso = lerp(st.torso, -10, re); st.head = lerp(st.head, -14, re);
          if (s > T_JUMP - 0.1) {
            const up = win(s, T_JUMP - 0.1, T_JUMP + 0.3);
            const x = lerp(SOFX - 30, HIMK, win(s, T_JUMP + 0.3, T_KNEEL));
            const sp = standOn(x, -1, FL); sp.hy -= 20 * Math.sin(Math.PI * clamp((s - T_JUMP) / 0.4, 0, 1));
            reachTo(sp, hold(s, T_JUMP, T_KNEEL - 0.1, 0.15), [x - 20, stand - 165]); reachTo(sp, hold(s, T_JUMP, T_KNEEL - 0.1, 0.15), [x + 22, stand - 160], "b");
            st = mixPose(st, sp, up);
            // kneels, ear to her belly
            const kn = win(s, T_KNEEL, T_KNEEL + 0.5) * (1 - win(s, T_UP, T_UP + 0.5));
            const kp = base({ hx: HIMK, hy: FL - 72, torso: 26, head: 14, ax: HIMK - 60, ay: FL, bx: HIMK + 46, by: FL - 4 });
            reachTo(kp, 1, [HERX + 30, stand - 20]); reachTo(kp, 1, [HERX + 26, stand - 60], "b");
            st = mixPose(st, kp, kn);
            // stands, lifts her into a hug
            const hg = win(s, T_UP, T_UP + 0.5);
            if (hg > 0) { const hp2 = standOn(HIMK - 50, -1, FL); hp2.torso = -6 * win(s, T_LIFT, T_LIFT + 0.5); reachTo(hp2, 1, [HERX + 10, stand - 120]); reachTo(hp2, 1, [HERX + 4, stand - 80], "b"); hp2.head = -6; st = mixPose(st, hp2, hg); }
            // CTA: looks up, taps the disc
            st.head = lerp(st.head, -24, win(s, T_MOB + 0.6, T_MOB + 1.2));
            const tp = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.3);
            reachTo(st, tp, [500, FL - 440 + (Math.abs(s - T_TAP) < 0.1 ? 6 : 0)], "b");
          }
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:270px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.35, 560, 400, 1.42], [T_SHAKE - 0.1, 1.9, 640, 380, 2.0], [T_SHOES - 0.1, 2.1, 640, 370, 2.25], [T_LOOK - 0.1, 1.6, 570, 390, 1.7], [T_KNEEL - 0.1, 1.8, 520, 410, 1.95], [T_UP - 0.1, 1.6, 520, 380, 1.7], [T_L2 - 0.1, 1.3, 540, 400, 1.34], [T_CTA, 1.45, 520, 330, 1.6]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.3, "SHE HAS A SURPRISE."], [T_GIVE, "A SMALL BOX."], [T_SHOES + 0.2, "TINY SHOES?", 1], [T_REAL, "WAIT..."], [T_BEAT - 0.3, "HE'S GOING TO BE A DAD.", 5]];
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

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // box: her hands -> his hands; after the lid comes off it sits on the sofa
          const hb = (f) => [(f.hands[0][0] + f.hands[1][0]) / 2, (f.hands[0][1] + f.hands[1][1]) / 2 + 30];
          let bp = s < T_GIVE + 0.3 ? hb(hp) : s < T_SHOES + 0.3 ? [mp.hands[1][0], mp.hands[1][1] + 30] : [SOFX - 80, FL - 104];
          box.setAttribute("transform", `translate(${r1(bp[0])} ${r1(bp[1])})`);
          box.setAttribute("opacity", s < T_KNEEL + 0.3 || true ? 1 : 0);
          let lp = s < T_LID ? [bp[0], bp[1] - 40] : s < T_SHOES + 0.3 ? [mp.hands[0][0], mp.hands[0][1]] : [SOFX - 30, FL - 104];
          lid.setAttribute("transform", `translate(${r1(lp[0])} ${r1(lp[1])}) rotate(${s > T_LID && s < T_SHOES + 0.3 ? -20 : 0})`);
          // shoes: in his hand, fall when he jumps up
          const inHand = s > T_SHOES && s < T_JUMP;
          shoes.setAttribute("opacity", s > T_SHOES ? 1 : 0);
          let spos = inHand ? [mp.hands[0][0], mp.hands[0][1]] : [lerp(mp.hands[0][0], 640, 1), FL];
          if (s >= T_JUMP) { const q = clamp((s - T_JUMP) / 0.4, 0, 1); spos = [lerp(590, 640, q), lerp(FL - 250, FL - 2, q * q)]; }
          sh1.setAttribute("transform", `translate(${r1(spos[0] - 30)} ${r1(spos[1] + (inHand ? 30 : 0))}) scale(2)`); sh2.setAttribute("transform", `translate(${r1(spos[0] + 20)} ${r1(spos[1] + (inHand ? 38 : 0))}) scale(2)`);
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bWhat, T_ASK, T_LID, [mp.head[0] - 20, mp.head[1] - 90]);
          bub(bQ, T_SHOES + 0.4, T_REAL - 0.1, [mp.head[0] - 10, mp.head[1] - 80]);
          bub(bEx, T_REAL, T_YOU, [mp.head[0] - 10, mp.head[1] - 80]);
          bub(bYou, T_YOU, T_YES + 0.6, [mp.head[0] - 40, mp.head[1] - 90]);
          bub(bYes, T_YES, T_JUMP + 0.4, [hp.head[0] + 10, hp.head[1] - 90]);
          const bq = clamp((s - T_BEAT) / 0.5, 0, 1), on = s > T_BEAT && s < T_UP;
          beatH.setAttribute("opacity", on ? 1 : 0);
          beatH.setAttribute("transform", `translate(${HERX + 34} ${r1(stand - 40)}) scale(${(0.8 + 0.35 * Math.max(0, Math.sin(s * 9)) * Math.max(0, Math.sin(s * 4.5))).toFixed(3)})`);
          hearts.forEach((h, i) => { const t0 = T_LIFT + 0.2 + i * 0.22, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_MOB ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(500 + 80 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 230 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          warm.setAttribute("opacity", (0.3 + 0.12 * win(s, T_LIFT, T_LIFT + 1)).toFixed(3));

          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "THE SMALLEST GIFT", L3 = "CHANGED HIS WHOLE LIFE.";
          E("head").innerHTML = `<div>SHE GAVE HIM A SMALL BOX.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - win(s, T_MOB + 0.6, T_MOB + 1.0)).toFixed(3);

          // ---- FOLLOW: the baby mobile
          const mq = sm(s, T_MOB, T_MOB + 1.0), tapped = s > T_TAP;
          mob.setAttribute("opacity", s > T_MOB ? 1 : 0);
          mob.setAttribute("transform", `translate(500 ${r1(lerp(FL - 1000, FL - 610, mq))}) rotate(${r1(3 * Math.sin(s * 1.8))}) scale(1.5)`);
          arms.setAttribute("transform", `scale(${Math.cos(s * 1.2).toFixed(3)} 1)`);
          const spin = tapped ? Math.cos(Math.PI * 2 * clamp((s - T_TAP) / 0.6, 0, 1)) : 1;
          disc.setAttribute("transform", `translate(0 50) scale(${(Math.abs(spin) < 0.05 ? 0.05 : spin).toFixed(3)} 1)`);
          const shown = !tapped || clamp((s - T_TAP) / 0.6, 0, 1) < 0.25;
          discC.setAttribute("fill", shown ? "#ff3b30" : "#ffffff"); discT.setAttribute("fill", shown ? "#fff" : "#000");
          discT.textContent = shown ? "+ FOLLOW" : "FOLLOWING"; discT.setAttribute("font-size", shown ? 21 : 17);
          const TT = "FOLLOW FOR MORE LOVE STORIES ♥";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_TAP - 0.5) * 28)));
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
