        // ---------- "next patient" (viral remake, 53M views "Military Husband Poses As Patient To Surprise Wife On Return Home"): her doctor's office. "NEXT PATIENT!" A man walks in with a duffel bag, cap and face mask, head down, sits on the exam bed. "WHAT BRINGS YOU IN?" "I'VE BEEN AWAY 9 MONTHS." She listens with the stethoscope... he takes off the cap and the mask: her husband, back from deployment. Clipboard drops, "IT'S YOU?!", she jumps into his arms, he lifts her, hearts. FOLLOW: the X-ray lightbox on the wall shows a heart and "+ FOLLOW", she taps it → "FOLLOWING ✓". ----------
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
        const T_CALL = 0.6, T_DOOR = 1.3, T_SIT = 3.0, T_ASK = 3.3, T_WALK = 3.3, T_ATB = 4.2, T_SAY = 4.4, T_STETH = 5.2, T_REVEAL = 6.6, T_DROP = 6.8, T_YOU = 7.0, T_UP = 7.6, T_HUG = 8.0, T_LIFT = 8.3;
        const T_L2 = 10.8, T_L3 = 11.8;
        const T_CTA = 14.0, T_BOX = 14.4, T_TAP = 15.8;
        const DOORX = 90, BEDX = 440, DESKX = 800, LBX = 640, LBY = FL - 400;
        const hisX = (s) => (s < T_DOOR ? -200 : s < T_SIT - 0.3 ? lerp(DOORX, BEDX, sm(s, T_DOOR, T_SIT - 0.3)) : BEDX);
        const herX = (s) => (s < T_WALK ? DESKX : s < T_ATB ? lerp(DESKX, BEDX + 130, sm(s, T_WALK, T_ATB)) : s < T_REVEAL + 0.2 ? BEDX + 130 : s < T_HUG - 0.2 ? lerp(BEDX + 130, BEDX + 190, sm(s, T_REVEAL + 0.2, T_REVEAL + 0.6)) - lerp(0, 130, sm(s, T_UP, T_HUG - 0.2)) : BEDX + 70);

        // ---------- room ----------
        const coolG = svgEl("circle", { cx: 600, cy: FL - 260, r: 460, fill: "#cfe8ff", filter: "url(#soft)", opacity: 0.08 }, backG);
        svgEl("polygon", { points: `${BEDX - 60},${FL - 520} ${BEDX + 160},${FL - 520} ${BEDX + 280},${FL} ${BEDX - 180},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const doorLight = svgEl("rect", { x: DOORX - 60, y: FL - 310, width: 120, height: 310, fill: "#4a5268", opacity: 0 }, roomG);
        svgEl("rect", { x: DOORX - 70, y: FL - 320, width: 140, height: 320, fill: "none", stroke: "#3a3a42", "stroke-width": 10 }, roomG);
        const doorP = svgEl("rect", { x: DOORX - 60, y: FL - 310, width: 120, height: 310, fill: "#c8ccd4", stroke: "#000", "stroke-width": 5 }, roomG);
        // X-ray lightbox
        const lb = svgEl("g", { transform: `translate(${LBX} ${LBY})` }, roomG);
        svgEl("rect", { x: -90, y: -70, width: 180, height: 140, rx: 6, fill: "#1a1e26", stroke: "#000", "stroke-width": 6 }, lb);
        const lbScreen = svgEl("rect", { x: -80, y: -60, width: 160, height: 120, fill: "#c8dcf0", opacity: 0.35 }, lb);
        svgEl("path", { d: "M-30 -40 Q-50 0 -30 40 M30 -40 Q50 0 30 40 M-24 -30 L24 -30 M-26 -14 L26 -14 M-26 2 L26 2 M-24 18 L24 18 M0 -46 L0 46", stroke: "#e8f0f8", "stroke-width": 4, fill: "none", opacity: 0.6 }, lb);
        const lbHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0, transform: "translate(0 -16) scale(1.2)" }, lb);
        const lbBtn = svgEl("g", { opacity: 0, transform: "translate(0 34)" }, lb);
        const lbR = svgEl("rect", { x: -64, y: -15, width: 128, height: 30, rx: 15, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, lbBtn);
        const lbT = svgEl("text", { x: 0, y: 6, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#fff", "text-anchor": "middle" }, lbBtn);
        // exam bed
        svgEl("rect", { x: BEDX - 90, y: FL - 112, width: 200, height: 22, rx: 6, fill: "#9ab8d0", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: BEDX - 80, y: FL - 120, width: 180, height: 10, fill: "#f2f2f2", stroke: "#000", "stroke-width": 3 }, roomG);
        for (const dx of [-70, 90]) svgEl("rect", { x: BEDX + dx - 6, y: FL - 90, width: 12, height: 90, fill: "#6a6e78", stroke: "#000", "stroke-width": 3 }, roomG);
        // desk
        svgEl("rect", { x: DESKX - 20, y: FL - 150, width: 180, height: 14, rx: 4, fill: "#d8d8d8", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: DESKX + 140, y: FL - 136, width: 14, height: 136, fill: "#8a8e96", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("rect", { x: DESKX + 60, y: FL - 220, width: 70, height: 70, rx: 6, fill: "#2a3040", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("path", { d: `M${DESKX + 75} ${FL - 185} l10 0 l5 -14 l7 26 l6 -12 l12 0`, stroke: "#4dff7a", "stroke-width": 3, fill: "none" }, roomG);
        // props
        const bag = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -44, y: -26, width: 88, height: 46, rx: 22, fill: "#5a6a3a", stroke: "#000", "stroke-width": 4 }, bag);
        svgEl("path", { d: "M-30 -24 Q0 -50 30 -24", fill: "none", stroke: "#000", "stroke-width": 4 }, bag);
        const capH = svgEl("g", {}, propG);
        svgEl("path", { d: "M-32 -6 Q-30 -36 0 -38 Q30 -36 32 -6 Z", fill: "#5a6a3a", stroke: "#000", "stroke-width": 4 }, capH);
        const brim = svgEl("path", { d: "M10 -8 L52 -4 L48 4 L8 2 Z", fill: "#4a5a2a", stroke: "#000", "stroke-width": 4 }, capH);
        const mask = svgEl("rect", { x: -6, y: 2, width: 36, height: 22, rx: 6, fill: "#9ad0e8", stroke: "#000", "stroke-width": 3 }, propG);
        const clip = svgEl("g", {}, propG);
        svgEl("rect", { x: -20, y: -28, width: 40, height: 56, rx: 4, fill: "#f6f0e2", stroke: "#000", "stroke-width": 4 }, clip);
        svgEl("path", { d: "M-12 -14 L12 -14 M-12 -4 L12 -4 M-12 6 L8 6", stroke: "#888", "stroke-width": 2 }, clip);
        const steth = svgEl("path", { fill: "none", stroke: "#222", "stroke-width": 4 }, propG);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        figG.appendChild(capH); figG.appendChild(mask);
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt; return g;
        };
        const bNext = bubble("NEXT PATIENT!", 250, 26), bAsk = bubble("WHAT BRINGS YOU IN?", 340, 24), bAway = bubble("I'VE BEEN AWAY 9 MONTHS.", 410, 22), bYou = bubble("IT'S YOU?!", 200, 30, "#c0282a"), bHome = bubble("I'M HOME.", 180, 28);
        const hearts = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
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
        const walking = (x0, x, head = 6) => { const ft = feetOn(x0, x, 90, 9), sw = Math.sin((Math.PI * 2 * (x - x0)) / 90); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 8, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 12 * sw, ael: 14, bsh: -4 - 12 * sw, bel: 14 }); };
        const sitAt = (x, f, o) => base({ hx: x, hy: FL - 132, torso: 4, head: 0, ax: x + f * 50, ay: FL, bx: x + f * 36, by: FL, ...o });

        // ---- him ----
        function himRaw(s) {
          const x = hisX(s);
          if (s < T_SIT - 0.3) { const st = walking(DOORX, x, 22); reachTo(st, 1, [x - 10, stand - 120], "b"); return st; }
          const st = sitAt(BEDX, 1, { head: 20 });
          const sit = win(s, T_SIT - 0.3, T_SIT); st.hy = lerp(stand, st.hy, sit);
          reachTo(st, 1, [BEDX + 30, FL - 130]); reachTo(st, 1, [BEDX - 20, FL - 128], "b");
          st.head = lerp(st.head, 8, hold(s, T_SAY, T_REVEAL, 0.2));
          const rv = hold(s, T_REVEAL - 0.3, T_REVEAL + 0.4, 0.15); reachTo(st, rv, [BEDX + 20, FL - 300]); reachTo(st, rv, [BEDX + 30, FL - 250], "b"); st.head = lerp(st.head, -8, win(s, T_REVEAL - 0.2, T_REVEAL + 0.1));
          if (s > T_UP) { const u = win(s, T_UP, T_HUG); const up = standOn(BEDX + 10, 1, FL); const m = mixPose(st, up, u); const hug = win(s, T_HUG - 0.2, T_HUG + 0.2); reachTo(m, hug, [BEDX + 70, stand - 140]); reachTo(m, hug, [BEDX + 80, stand - 110], "b"); m.torso = lerp(m.torso, -10 * win(s, T_LIFT, T_LIFT + 0.3), 1); m.head = lerp(m.head, -14, hug); const tp = hold(s, T_CTA, DUR, 0.4); reachTo(m, tp, [BEDX + 60, stand - 150]); return m; }
          return st;
        }
        // ---- her ----
        function herRaw(s) {
          const x = herX(s), moving = (s > T_WALK && s < T_ATB) || (s > T_UP && s < T_HUG - 0.2);
          const st = moving ? walking(s < T_ATB ? DESKX : BEDX + 190, x, 0) : standOn(x, -1, FL);
          if (s < T_WALK) { st.head = 18; reachTo(st, 1, [x - 40, FL - 160 + 3 * Math.sin(s * 20)]); reachTo(st, hold(s, T_CALL - 0.1, T_DOOR + 0.4, 0.2), [x - 30, stand - 180], "b"); st.head = lerp(st.head, -2, hold(s, T_CALL - 0.1, T_SIT, 0.2)); }
          reachTo(st, s > T_WALK - 0.2 && s < T_DROP ? 1 : 0, [x - 20, stand - 70], "b");
          const stt = hold(s, T_STETH, T_REVEAL + 0.1, 0.25); reachTo(st, stt, [BEDX + 40, FL - 210]); st.torso = lerp(st.torso, 24, stt); st.head = lerp(st.head, 16, stt);
          const surp = hold(s, T_REVEAL + 0.1, T_UP, 0.15); reachTo(st, surp, [x - 22, stand - 150]); reachTo(st, surp, [x - 14, stand - 146], "b"); st.torso = lerp(st.torso, -10, surp);
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [BEDX + 10, stand - 150]); reachTo(st, hug, [BEDX + 20, stand - 120], "b"); st.torso = lerp(st.torso, 12, hug);
          const lift = 40 * hold(s, T_LIFT, T_CTA, 0.4); st.hy -= lift; st.ay -= lift + 20 * hold(s, T_LIFT, T_CTA, 0.4); st.by -= lift;
          const tap = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [LBX - 6, LBY + 34 + (Math.abs(s - T_TAP) < 0.1 ? 4 : 0)], "b"); st.head = lerp(st.head, -14, win(s, T_BOX, T_BOX + 0.4));
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
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.7, DESKX - 20, 380, 1.8], [T_DOOR - 0.05, 1.25, 420, 400, 1.3], [T_ASK, 1.5, 540, 390, 1.6], [T_STETH - 0.05, 2.0, BEDX + 60, 370, 2.15], [T_REVEAL - 0.05, 2.4, BEDX + 40, 360, 2.5], [T_YOU, 1.8, BEDX + 80, 380, 1.9], [T_HUG - 0.1, 1.5, BEDX + 60, 390, 1.6], [T_L2 - 0.1, 1.3, 520, 400, 1.34], [T_CTA, 1.9, LBX - 60, LBY + 80, 2.2]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.2, "SHE'S A DOCTOR."], [T_DOOR, "A NEW PATIENT.", 1], [T_SAY, "9 MONTHS?", 0], [T_STETH, "SOMETHING FEELS FAMILIAR...", 2], [T_REVEAL, "HER HUSBAND.", 1], [T_YOU + 0.4, "BACK FROM DEPLOYMENT.", 2]];
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
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          him.g.setAttribute("opacity", s > T_DOOR ? 1 : 0);
          if (him.g.previousSibling) him.g.previousSibling.setAttribute("opacity", s > T_DOOR ? 0.45 : 0);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), (s > T_WALK && s < T_ATB) ? -1 : -1);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // door
          const dq = hold(s, T_DOOR - 0.2, T_DOOR + 0.9, 0.25);
          doorP.setAttribute("transform", `translate(${DOORX - 60} 0) scale(${(1 - 0.85 * dq).toFixed(3)} 1) translate(${-(DOORX - 60)} 0)`);
          doorLight.setAttribute("opacity", (0.9 * dq).toFixed(3));
          // cap + mask, removed on reveal
          const on = s < T_REVEAL, rq = sm(s, T_REVEAL, T_REVEAL + 0.5);
          capH.setAttribute("opacity", s > T_DOOR ? 1 : 0); mask.setAttribute("opacity", s > T_DOOR && on ? 1 : 0);
          capH.setAttribute("transform", on ? `translate(${r1(mp.head[0])} ${r1(mp.head[1] - 14)})` : `translate(${r1(lerp(mp.head[0], BEDX - 60, rq))} ${r1(lerp(mp.head[1] - 14, FL - 126, rq))}) rotate(${r1(-200 * rq)})`);
          mask.setAttribute("transform", `translate(${r1(mp.head[0] - 4)} ${r1(mp.head[1] - 6)})`);
          // bag
          bag.setAttribute("opacity", s > T_DOOR ? 1 : 0);
          bag.setAttribute("transform", s < T_SIT - 0.3 ? `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1] + 26)})` : `translate(${BEDX - 140} ${FL - 22})`);
          // clipboard + stethoscope
          const cq = clamp((s - T_DROP) / 0.4, 0, 1);
          clip.setAttribute("transform", s < T_DROP ? `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1])})` : `translate(${r1(lerp(hp.hands[1][0], BEDX + 200, cq))} ${r1(lerp(hp.hands[1][1], FL - 8, cq * cq))}) rotate(${r1(-90 * cq)})`);
          clip.setAttribute("opacity", s > T_WALK - 0.2 ? 1 : 0);
          steth.setAttribute("d", `M${r1(hp.head[0] - 10)} ${r1(hp.head[1] + 30)} Q${r1(hp.head[0] - 30)} ${r1(hp.head[1] + 90)} ${r1(hp.head[0] + 6)} ${r1(hp.head[1] + 70)}` + (hold(s, T_STETH, T_REVEAL + 0.1, 0.25) > 0.3 ? ` M${r1(hp.head[0] - 10)} ${r1(hp.head[1] + 30)} Q${r1(hp.head[0] - 40)} ${r1(hp.head[1] + 80)} ${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])}` : ""));
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bNext, T_CALL, T_DOOR + 0.5, [hp.head[0] - 60, hp.head[1] - 90]);
          bub(bAsk, T_ASK, T_SAY, [hp.head[0] - 40, hp.head[1] - 90]);
          bub(bAway, T_SAY, T_STETH + 0.4, [mp.head[0] + 60, mp.head[1] - 90]);
          bub(bYou, T_YOU, T_UP + 0.3, [hp.head[0] + 10, hp.head[1] - 90]);
          bub(bHome, T_UP + 0.3, T_LIFT + 1.0, [mp.head[0] - 40, mp.head[1] - 100]);
          flash.style.opacity = (0.55 * Math.max(0, 1 - Math.abs(s - T_REVEAL - 0.05) / 0.12)).toFixed(3);
          hearts.forEach((h, i) => { const t0 = T_HUG + i * 0.2, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_CTA ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(BEDX + 40 + 90 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          // lightbox FOLLOW
          const bk = sm(s, T_BOX, T_BOX + 0.4), tapped = s > T_TAP;
          lbScreen.setAttribute("opacity", (0.35 + 0.5 * bk).toFixed(3));
          lbHeart.setAttribute("opacity", bk.toFixed(3));
          lbBtn.setAttribute("opacity", bk.toFixed(3)); lbBtn.setAttribute("transform", `translate(0 34) scale(${(tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : 0.6 + 0.4 * backOut(bk)).toFixed(3)})`);
          lbR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); lbT.setAttribute("fill", tapped ? "#000" : "#fff"); lbT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; lbT.setAttribute("font-size", tapped ? 13 : 16);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(LBX + Math.cos(a) * 130 * Math.sqrt(q))} ${r1(LBY + Math.sin(a) * 100 * Math.sqrt(q))}) scale(${(0.5 - 0.25 * q).toFixed(2)})`); });

          tag.textContent = s < T_REVEAL ? "CLINIC · 9:00 AM".slice(0, Math.floor(s * 24) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "SHE WAITED 9 MONTHS.", L3 = "HE COULDN'T WAIT ONE MINUTE MORE.";
          E("head").innerHTML = `<div>NEXT PATIENT, PLEASE.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_BOX, T_BOX + 0.4)).toFixed(3);
          const TT = "TOMORROW: A NEW LOVE STORY ♥";
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
