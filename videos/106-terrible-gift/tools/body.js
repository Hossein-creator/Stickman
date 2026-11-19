        // ---------- "terrible gift" (viral remake, 27M views "I gave my wife/girlfriend a terrible gift for Valentine's Day"): three boxes. Box 1: one sock (anger meter up). Box 2: a potato (storm cloud). Box 3: an onion (steam, she winds up to throw it). "WAIT! PEEL IT." - the layers fall off, a ring inside. He kneels, "YES!", hug. FOLLOW: a fourth box with a "+ FOLLOW" tag, she opens it: hearts burst out, "FOLLOWING". ----------
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
        const GIV = [0.6, 2.9, 5.1], OPN = [1.2, 3.5, 5.7], SAY = [1.9, 4.2, 6.3];
        const T_WIND = 6.9, T_WAIT = 7.3, T_PEEL = 8.1, T_RING = 9.0, T_KNEEL = 9.6, T_WILL = 10.1, T_YES = 10.8, T_HUG = 11.6;
        const T_L2 = 12.8, T_L3 = 13.8;
        const T_CTA = 15.6, T_BOX4 = 16.0, T_OPEN4 = 17.4;
        const HIMX = 430, HERX = 650;
        const gi = (s) => (s < GIV[1] ? 0 : s < GIV[2] ? 1 : 2);

        // ---------- room ----------
        const warm = svgEl("circle", { cx: 540, cy: FL - 240, r: 440, fill: "url(#fireGlow)", opacity: 0.25 }, backG);
        const angry = svgEl("circle", { cx: HERX, cy: FL - 240, r: 380, fill: "#ff2a2a", filter: "url(#soft)", opacity: 0 }, backG);
        svgEl("polygon", { points: `450,${FL - 520} 630,${FL - 520} 760,${FL} 320,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        // hearts garland (Valentine's)
        for (let i = 0; i < 9; i++) { const x = 200 + i * 85, y = FL - 690 + 30 * Math.sin((i / 8) * Math.PI); svgEl("path", { d: `M${x} ${y + 12} C${x - 20} ${y} ${x - 14} ${y - 18} ${x} ${y - 8} C${x + 14} ${y - 18} ${x + 20} ${y} ${x} ${y + 12} Z`, fill: i % 2 ? "#ff6a7a" : "#ff3b30", stroke: "#000", "stroke-width": 3 }, roomG); }
        svgEl("path", { d: `M170 ${FL - 700} Q540 ${FL - 630} 910 ${FL - 700}`, fill: "none", stroke: "#aaa", "stroke-width": 2 }, roomG);
        svgEl("rect", { x: 820, y: FL - 104, width: 220, height: 54, rx: 14, fill: "#5a3a4a", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 980, y: FL - 210, width: 60, height: 160, rx: 16, fill: "#4a2e3c", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: 830, y: FL - 50, width: 200, height: 50, fill: "#3a2430", stroke: "#000", "stroke-width": 5 }, roomG);

        // ---------- props ----------
        const mkBox = (col, tagTxt) => { const g = svgEl("g", { opacity: 0 }, propG); svgEl("rect", { x: -26, y: -40, width: 52, height: 40, rx: 4, fill: col, stroke: "#000", "stroke-width": 4 }, g); svgEl("rect", { x: -5, y: -40, width: 10, height: 40, fill: "#ffd25a", stroke: "#000", "stroke-width": 2 }, g); const lid = svgEl("g", {}, g); svgEl("rect", { x: -30, y: -50, width: 60, height: 12, rx: 3, fill: col, stroke: "#000", "stroke-width": 4 }, lid); svgEl("path", { d: "M0 -50 C-20 -70 -26 -50 0 -50 C26 -50 20 -70 0 -50", fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, lid); return { g, lid }; };
        const boxes = [mkBox("#ff5a6e"), mkBox("#5a8aff"), mkBox("#9a5aff")];
        const sock = svgEl("path", { d: "M-8 -40 L8 -40 L8 -6 Q8 6 22 8 Q30 10 28 18 L-4 18 Q-10 18 -8 4 Z", fill: "#bbbbbb", stroke: "#000", "stroke-width": 3, opacity: 0 }, propG);
        const potato = svgEl("ellipse", { rx: 26, ry: 18, fill: "#b08a5a", stroke: "#000", "stroke-width": 3, opacity: 0 }, propG);
        const onion = svgEl("g", { opacity: 0 }, propG);
        const layers = [30, 24, 18].map((r, i) => svgEl("path", { d: `M0 ${r} C${-r * 1.2} ${r} ${-r * 1.1} ${-r * 0.6} 0 ${-r * 1.3} C${r * 1.1} ${-r * 0.6} ${r * 1.2} ${r} 0 ${r} Z`, fill: ["#b05a9a", "#c87ab0", "#e0a8cc"][i], stroke: "#000", "stroke-width": 3 }, onion));
        const ring = svgEl("g", { opacity: 0 }, propG);
        svgEl("circle", { r: 10, fill: "none", stroke: "#ffd25a", "stroke-width": 5 }, ring);
        svgEl("path", { d: "M-7 -10 L7 -10 L0 -22 Z", fill: "#bfe8ff", stroke: "#000", "stroke-width": 2 }, ring);
        const ringGlow = svgEl("circle", { r: 50, fill: "#fff6c8", filter: "url(#soft)", opacity: 0 }, propG);
        const peels = Array.from({ length: 6 }, (_, i) => svgEl("path", { d: "M0 0 C-12 -6 -14 -18 -4 -24 C2 -14 6 -6 0 0 Z", fill: i % 2 ? "#b05a9a" : "#c87ab0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const box4 = mkBox("#ff3b30");
        const tag4 = svgEl("g", { opacity: 0 }, fxG);
        const tag4R = svgEl("rect", { x: -80, y: -22, width: 160, height: 44, rx: 14, fill: "#fff", stroke: "#000", "stroke-width": 4 }, tag4);
        const tag4T = svgEl("text", { x: 0, y: 9, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#ff3b30", "text-anchor": "middle" }, tag4);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        // anger meter above her
        const meter = svgEl("g", {}, fxG);
        svgEl("rect", { x: -70, y: -12, width: 140, height: 24, rx: 12, fill: "#222", stroke: "#000", "stroke-width": 4 }, meter);
        const meterF = svgEl("rect", { x: -66, y: -8, width: 0, height: 16, rx: 8, fill: "#ff3b30" }, meter);
        const meterT = svgEl("text", { x: -80, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 20, fill: "#ff6a60", "text-anchor": "end" }, meter); meterT.textContent = "ANGER";
        const cloud = svgEl("g", { opacity: 0 }, fxG);
        for (const [x, y, r] of [[-30, 0, 26], [0, -14, 32], [32, 0, 26], [0, 10, 26]]) svgEl("circle", { cx: x, cy: y, r, fill: "#4a4e5a", stroke: "#000", "stroke-width": 3 }, cloud);
        const bolt = svgEl("path", { d: "M4 18 L-8 40 L4 40 L-6 62", fill: "none", stroke: "#ffd25a", "stroke-width": 5 }, cloud);
        const steam = Array.from({ length: 4 }, () => svgEl("path", { fill: "none", stroke: "#e8e8e8", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bSock = bubble("...ONE SOCK?", 230), bPot = bubble("A POTATO?!", 210, 30, "#ff3b30"), bOn = bubble("AN ONION. REALLY?!", 330, 28, "#ff3b30"), bWait = bubble("WAIT! PEEL IT.", 250), bWill = bubble("WILL YOU?", 190), bYes = bubble("YES!", 110, 32, "#ff3b30");
        const hearts = Array.from({ length: 9 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const burst = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        // ---- poses ----
        const anger = (s) => clamp(0.2 * sm(s, OPN[0], OPN[0] + 0.5) + 0.35 * sm(s, OPN[1], OPN[1] + 0.5) + 0.42 * sm(s, OPN[2], OPN[2] + 0.5), 0, 0.97) * (1 - sm(s, T_RING, T_RING + 0.6));
        function himRaw(s) {
          const st = standOn(HIMX, 1, FL);
          const g = gi(s);
          // box behind his back, then he holds it out
          const give = hold(s, GIV[g] - 0.3, GIV[g] + 0.4, 0.2);
          reachTo(st, 1 - give, [HIMX - 40, stand - 70]); reachTo(st, give, [HERX - 90, stand - 110]);
          st.head = 0; st.torso = 4;
          const wait = hold(s, T_WAIT - 0.2, T_PEEL + 0.6, 0.15); reachTo(st, wait, [HIMX + 70, stand - 200], "b"); st.torso = lerp(st.torso, -6, wait);
          // kneels with the ring, then stands for the hug
          const kn = win(s, T_KNEEL, T_KNEEL + 0.4) * (1 - win(s, T_HUG - 0.4, T_HUG));
          const kp = base({ hx: HIMX + 40, hy: FL - 72, torso: 4, head: -10, ax: HIMX + 100, ay: FL, bx: HIMX - 10, by: FL - 4 }); reachTo(kp, 1, [HIMX + 110, stand - 70]);
          let out = mixPose(st, kp, kn);
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2);
          if (hug > 0) { const hp2 = standOn(HIMX + 70, 1, FL); reachTo(hp2, 1, [HERX - 30, stand - 130]); reachTo(hp2, 1, [HERX - 40, stand - 100], "b"); hp2.head = -6; out = mixPose(out, hp2, hug); }
          return out;
        }
        function herRaw(s) {
          const st = standOn(HERX - 20 * win(s, T_HUG - 0.4, T_HUG), -1, FL);
          const g = gi(s);
          const op = hold(s, OPN[g] - 0.2, GIV[Math.min(2, g + 1)] - 0.2 + (g === 2 ? 99 : 0), 0.2);
          // holds up the gift
          reachTo(st, op, [HERX - 80, stand - 105 + 8 * Math.sin(s * 4)]); reachTo(st, op * (s < OPN[g] + 0.2 ? 1 : 0.5), [HERX - 50, stand - 110], "b");
          st.head = lerp(st.head, -8, op);
          const a = anger(s); st.torso = 6 * a;
          // winds up to throw the onion
          const wind = hold(s, T_WIND, T_WAIT + 0.3, 0.25); reachTo(st, wind, [HERX + 40, stand - 220]);
          // peels it
          const pl = hold(s, T_PEEL - 0.2, T_KNEEL, 0.2); reachTo(st, pl, [HERX - 50, stand - 130]); reachTo(st, pl, [HERX - 46, stand - 120 + 8 * Math.sin(s * 18) * (s < T_RING ? 1 : 0)], "b");
          const hands = hold(s, T_RING, T_HUG, 0.2) * (s > T_RING + 0.3 ? 1 : 0); reachTo(st, hands, [HERX - 22, stand - 150]); reachTo(st, hands, [HERX - 14, stand - 146], "b");
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [HIMX + 90, stand - 140]); reachTo(st, hug, [HIMX + 100, stand - 120], "b"); st.head = lerp(st.head, -6, hug);
          // CTA: opens box 4
          const o4 = hold(s, T_OPEN4 - 0.5, T_OPEN4 + 0.4, 0.3); reachTo(st, o4, [770, FL - 210], "b");
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
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.45, 540, 390, 1.5], [OPN[0] - 0.05, 1.9, 600, 370, 2.0], [GIV[1] - 0.05, 1.5, 540, 390, 1.55], [OPN[1] - 0.05, 2.0, 610, 370, 2.1], [GIV[2] - 0.05, 1.5, 540, 390, 1.55], [OPN[2] - 0.05, 2.0, 610, 360, 2.2], [T_WAIT - 0.05, 1.5, 540, 380, 1.55], [T_PEEL - 0.05, 2.3, 600, 360, 2.5], [T_KNEEL - 0.05, 1.7, 550, 390, 1.8], [T_L2 - 0.1, 1.45, 540, 390, 1.5], [T_CTA, 1.75, 640, 400, 1.9]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.2, "VALENTINE'S DAY. 3 GIFTS."], [OPN[0] + 0.2, "GIFT 1: ONE SOCK.", 2], [OPN[1] + 0.2, "GIFT 2: A POTATO.", 3], [OPN[2] + 0.2, "GIFT 3: AN ONION.", 3], [T_WAIT, "\"PEEL IT.\""], [T_RING, "INSIDE... A RING.", 2]];
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
          const s = t, c = camAt(s), g = gi(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), -1);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // boxes: in his hand until handed over, then opened in hers and dropped
          boxes.forEach((B, i) => {
            const on = s > (i ? GIV[i] - 0.6 : 0) && s < OPN[i] + 0.6;
            B.g.setAttribute("opacity", on ? 1 : 0);
            const pos = s < GIV[i] + 0.3 ? [mp.hands[0][0], mp.hands[0][1] + 34] : [hp.hands[1][0], hp.hands[1][1] + 34];
            B.g.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])})`);
            B.lid.setAttribute("transform", s > OPN[i] ? `translate(-30 -40) rotate(-60)` : "");
          });
          const held = [hp.hands[0][0], hp.hands[0][1] - 10];
          sock.setAttribute("opacity", s > OPN[0] && s < GIV[1] ? 1 : 0); sock.setAttribute("transform", `translate(${r1(held[0])} ${r1(held[1] - 10)}) scale(2)`);
          potato.setAttribute("opacity", s > OPN[1] && s < GIV[2] ? 1 : 0); potato.setAttribute("transform", `translate(${r1(held[0])} ${r1(held[1] - 16)}) scale(1.8)`);
          const onionOn = s > OPN[2] && s < T_RING + 0.2;
          onion.setAttribute("opacity", onionOn ? 1 : 0); onion.setAttribute("transform", `translate(${r1(held[0])} ${r1(held[1] - 24)}) scale(1.6)`);
          layers.forEach((l, i) => l.setAttribute("opacity", s > T_PEEL + 0.25 * (i + 1) ? 0 : 1));
          peels.forEach((p, i) => { const t0 = T_PEEL + 0.12 * i, q = clamp((s - t0) / 0.9, 0, 1); p.setAttribute("opacity", s > t0 && q < 1 ? 1 : 0); p.setAttribute("transform", `translate(${r1(held[0] + (i % 2 ? 1 : -1) * 40 * q)} ${r1(held[1] + 300 * q * q)}) rotate(${r1(300 * q)})`); });
          const rOn = s > T_RING - 0.1;
          const rp = s < T_KNEEL ? held : [mp.hands[0][0], mp.hands[0][1] - 8];
          ring.setAttribute("opacity", rOn && s < T_HUG ? 1 : 0); ring.setAttribute("transform", `translate(${r1(rp[0])} ${r1(rp[1] - 20)}) scale(2)`);
          ringGlow.setAttribute("cx", r1(rp[0])); ringGlow.setAttribute("cy", r1(rp[1])); ringGlow.setAttribute("opacity", rOn && s < T_HUG ? (0.5 + 0.3 * Math.sin(s * 8)).toFixed(3) : 0);
          // anger
          const a = anger(s);
          meter.setAttribute("transform", `translate(${r1(hp.head[0] + 40)} ${r1(hp.head[1] - 120)})`); meter.setAttribute("opacity", s < T_RING + 0.8 ? 1 : 0);
          meterF.setAttribute("width", r1(132 * a));
          angry.setAttribute("opacity", (0.3 * Math.max(0, a - 0.4)).toFixed(3));
          cloud.setAttribute("opacity", s > OPN[1] + 0.3 && s < T_RING ? 1 : 0);
          cloud.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1] - 200)})`);
          bolt.setAttribute("opacity", Math.sin(s * 11) > 0.6 ? 1 : 0);
          steam.forEach((e, i) => { const q = frac(s * 2 + i / 4); e.setAttribute("d", `M${r1(hp.head[0] + (i % 2 ? 22 : -22))} ${r1(hp.head[1] - 30 - 40 * q)} q${i % 2 ? 10 : -10} -10 0 -20`); e.setAttribute("opacity", s > OPN[2] + 0.3 && s < T_RING ? (1 - q).toFixed(3) : 0); });
          warm.setAttribute("opacity", (0.25 + 0.15 * sm(s, T_RING, T_RING + 1)).toFixed(3));
          // bubbles
          const bub = (gg, a0, b0, p) => { const k = hold(s, a0, b0, 0.1); gg.setAttribute("opacity", k.toFixed(3)); gg.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bSock, SAY[0], GIV[1] - 0.2, [hp.head[0] - 20, hp.head[1] - 90]);
          bub(bPot, SAY[1], GIV[2] - 0.2, [hp.head[0] - 20, hp.head[1] - 90]);
          bub(bOn, SAY[2], T_WAIT, [hp.head[0] - 60, hp.head[1] - 90]);
          bub(bWait, T_WAIT, T_PEEL + 0.4, [mp.head[0] + 40, mp.head[1] - 90]);
          bub(bWill, T_WILL, T_YES + 0.2, [mp.head[0] + 30, mp.head[1] - 90]);
          bub(bYes, T_YES, T_HUG + 0.6, [hp.head[0] + 10, hp.head[1] - 90]);
          hearts.forEach((h, i) => { const t0 = T_HUG + i * 0.2, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_CTA ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(540 + 80 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          // CTA: box 4
          const b4 = sm(s, T_BOX4, T_BOX4 + 0.5), opened = s > T_OPEN4;
          box4.g.setAttribute("opacity", s > T_BOX4 ? 1 : 0);
          box4.g.setAttribute("transform", `translate(800 ${r1(lerp(FL - 600, FL - 150, backOut(b4)))}) scale(1.6)`);
          box4.lid.setAttribute("transform", opened ? `translate(-30 -40) rotate(-60)` : "");
          tag4.setAttribute("opacity", s > T_BOX4 + 0.4 ? 1 : 0);
          const bump = opened ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_OPEN4) / 0.25, 0, 1)) : 1;
          tag4.setAttribute("transform", `translate(800 ${r1(opened ? FL - 330 : FL - 290)}) scale(${bump.toFixed(3)})`);
          tag4R.setAttribute("fill", opened ? "#ff3b30" : "#fff"); tag4T.setAttribute("fill", opened ? "#fff" : "#ff3b30");
          tag4T.textContent = opened ? "FOLLOWING ✓" : "+ FOLLOW"; tag4T.setAttribute("font-size", opened ? 20 : 24);
          burst.forEach((e, i) => { const q = clamp((s - T_OPEN4) / 1.1, 0, 1), an = -Math.PI / 2 + (i - 5.5) * 0.25; e.setAttribute("opacity", opened && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(800 + Math.cos(an) * 220 * q)} ${r1(FL - 200 + Math.sin(an) * 260 * q + 120 * q * q)}) scale(${(0.7 - 0.3 * q).toFixed(2)})`); });

          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "SHE ALMOST THREW AWAY", L3 = "THE RING.";
          E("head").innerHTML = `<div>THE WORST GIFTS EVER.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_BOX4, T_BOX4 + 0.4)).toFixed(3);
          const TT = "FOLLOW FOR MORE LOVE STORIES ♥";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_OPEN4 - 0.4) * 28)));
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
