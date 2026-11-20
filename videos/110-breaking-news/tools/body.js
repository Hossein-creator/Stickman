        // ---------- "breaking news" (viral remake, 2.8M views "Reporter rushes to cover 'breaking' story, finds boyfriend proposing on one knee"): evening, city. She is a TV reporter: her phone rings "BREAKING NEWS! GO NOW!", she runs with her cameraman, goes LIVE ("BREAKING NEWS" lower third). While she talks, he walks in behind her and kneels. The cameraman: "BEHIND YOU." She turns: ring box. "THE NEWS IS... WILL YOU MARRY ME?" Mic drops. "YES!" Hug, hearts, lower third "SHE SAID YES ♥". FOLLOW: the lower third becomes "+ FOLLOW @SILENT.STICKMAN", the cameraman presses REC → "FOLLOWING ✓". ----------
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
        const T_CALL = 0.5, T_RUN = 1.9, T_ARR = 3.4, T_LIVE = 3.7, T_TALK = 4.1, T_IN = 4.5, T_KNEE = 5.4, T_POINT = 6.0, T_TURN = 6.6;
        const T_NEWS = 7.0, T_SURP = 7.3, T_DROP = 7.8, T_MARRY = 8.4, T_YES = 9.8, T_RISE = 10.3, T_HUG = 10.6;
        const T_L2 = 12.2, T_L3 = 13.2;
        const T_CTA = 15.6, T_LT = 16.1, T_TAP = 17.6;
        const RX = 560, MANX = 760, CMX = 330;
        const herX = (s) => lerp(300, RX, sm(s, T_RUN, T_ARR));
        const cmX = (s) => lerp(150, CMX, sm(s, T_RUN + 0.1, T_ARR + 0.2));
        const manX = (s) => lerp(1150, MANX, sm(s, T_IN, T_KNEE - 0.1));

        // ---------- city at dusk ----------
        const sky = svgEl("circle", { cx: 600, cy: FL - 260, r: 520, fill: "url(#fireGlow)", opacity: 0.18 }, backG);
        svgEl("polygon", { points: `${RX - 80},${FL - 520} ${RX + 120},${FL - 520} ${RX + 240},${FL} ${RX - 200},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const BLD = [[-200, 300], [-60, 380], [80, 260], [200, 420], [360, 300], [470, 460], [640, 340], [770, 400], [900, 280], [1020, 440], [1160, 320]];
        BLD.forEach(([x, h], i) => {
          const w = 120;
          svgEl("rect", { x, y: FL - h, width: w, height: h, fill: "#14161c", stroke: "#000", "stroke-width": 4 }, roomG);
          for (let r = 0; r < Math.floor(h / 50) - 1; r++) for (let c = 0; c < 3; c++) if ((i * 7 + r * 3 + c * 5) % 4 !== 0) svgEl("rect", { x: x + 16 + c * 36, y: FL - h + 22 + r * 50, width: 18, height: 24, fill: (i + r + c) % 3 ? "#ffcf6a" : "#6a7a9a", opacity: 0.55 }, roomG);
        });
        svgEl("rect", { x: -1400, y: FL - 30, width: 3400, height: 30, fill: "#2a2a30", stroke: "#000", "stroke-width": 4 }, roomG);
        // street lamp
        svgEl("rect", { x: 896, y: FL - 330, width: 10, height: 330, fill: "#3a3a42", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("path", { d: `M901 ${FL - 330} Q901 ${FL - 360} 870 ${FL - 360}`, fill: "none", stroke: "#3a3a42", "stroke-width": 8 }, roomG);
        svgEl("circle", { cx: 866, cy: FL - 348, r: 10, fill: "#ffe7a0", stroke: "#000", "stroke-width": 3 }, roomG);
        svgEl("circle", { cx: 866, cy: FL - 340, r: 120, fill: "url(#fireGlow)", opacity: 0.35 }, roomG);

        // ---------- props ----------
        const mic = svgEl("g", {}, propG);
        svgEl("rect", { x: -4, y: 0, width: 8, height: 34, rx: 3, fill: "#222", stroke: "#000", "stroke-width": 2 }, mic);
        svgEl("circle", { cy: -4, r: 10, fill: "#555", stroke: "#000", "stroke-width": 3 }, mic);
        svgEl("rect", { x: -9, y: 10, width: 18, height: 10, fill: "#ff3b30", stroke: "#000", "stroke-width": 2 }, mic);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 3 }, propG);
        const tvcam = svgEl("g", {}, propG);
        svgEl("rect", { x: -40, y: -26, width: 80, height: 48, rx: 6, fill: "#2a2d34", stroke: "#000", "stroke-width": 4 }, tvcam);
        svgEl("rect", { x: 40, y: -16, width: 30, height: 28, fill: "#1a1c22", stroke: "#000", "stroke-width": 4 }, tvcam);
        svgEl("circle", { cx: 70, cy: -2, r: 12, fill: "#3a5a8a", stroke: "#000", "stroke-width": 3 }, tvcam);
        svgEl("rect", { x: -30, y: -38, width: 44, height: 12, rx: 3, fill: "#3a3d44", stroke: "#000", "stroke-width": 3 }, tvcam);
        const recDot = svgEl("circle", { cx: -24, cy: -12, r: 7, fill: "#5a1a1a", stroke: "#000", "stroke-width": 2 }, tvcam);
        const recBtn = svgEl("g", { opacity: 0 }, tvcam);
        const recR = svgEl("rect", { x: -34, y: -14, width: 68, height: 28, rx: 14, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, recBtn);
        const recT = svgEl("text", { x: 0, y: 5, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 12, fill: "#fff", "text-anchor": "middle" }, recBtn);
        const rbox = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -16, y: -16, width: 32, height: 16, rx: 4, fill: "#8a1a2a", stroke: "#000", "stroke-width": 3 }, rbox);
        const rlid = svgEl("rect", { x: -16, y: -28, width: 32, height: 12, rx: 4, fill: "#a02234", stroke: "#000", "stroke-width": 3 }, rbox);
        svgEl("circle", { cy: -16, r: 7, fill: "none", stroke: "#ffd25a", "stroke-width": 4 }, rbox);
        svgEl("path", { d: "M-5 -23 L5 -23 L0 -32 Z", fill: "#bfe8ff", stroke: "#000", "stroke-width": 2 }, rbox);
        const sparkle = svgEl("path", { d: "M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z", fill: "#fff6c0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);

        // ---------- figures ----------
        const cm = makeFig(figG, "#9aa6b4", "#7a8694", false, "cm");
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bGo = bubble("BREAKING NEWS! GO!", 330, 26, "#ff3b30"), bLive = bubble("I'M LIVE AT THE SCENE...", 400, 24), bBehind = bubble("BEHIND YOU.", 220, 26), bNews = bubble("THE NEWS IS...", 260, 26), bMarry = bubble("WILL YOU MARRY ME?", 330, 26, "#ff3b30"), bYes = bubble("YES!", 110, 32, "#ff3b30");
        const hearts = Array.from({ length: 9 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const rings = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#bfe0ff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, fxG));

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, head = 6, STR = 90, lift = 9, torso = 8) => { const ft = feetOn(x0, x, STR, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 4 * Math.abs(sw), torso, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 22 * sw, ael: 30, bsh: -4 - 22 * sw, bel: 30 }); };

        // ---- her ----
        const herF = (s) => (s < T_ARR ? 1 : s < T_TURN ? -1 : 1);
        function herRaw(s) {
          const x = herX(s), f = herF(s);
          const run = s > T_RUN && s < T_ARR;
          const st = run ? walking(300, x, 0, 120, 20, 18) : standOn(x, f, FL);
          // phone at the ear, then the mic
          reachTo(st, hold(s, T_CALL - 0.2, T_RUN, 0.2), [x + 22 * f, stand - 165], "b");
          const micK = s > T_ARR ? 1 - win(s, T_SURP - 0.1, T_SURP + 0.2) : run ? 0.5 : 0;
          reachTo(st, micK, [x + f * 34, stand - 140]);
          if (s > T_TALK && s < T_TURN) st.head = 2 * Math.sin(s * 9);
          const surp = hold(s, T_SURP, T_HUG, 0.2); reachTo(st, surp, [x + 22, stand - 150]); reachTo(st, surp, [x + 14, stand - 146], "b"); st.torso = lerp(st.torso, -8, surp);
          if (s > T_YES && s < T_YES + 0.7) st.head += 12 * Math.sin(Math.PI * clamp((s - T_YES) / 0.35, 0, 1));
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2); const hx = x + 30 * hug; st.hx += 30 * hug; st.ax += 30 * hug; st.bx += 30 * hug;
          reachTo(st, hug, [hx + 70, stand - 140]); reachTo(st, hug, [hx + 80, stand - 110], "b"); st.torso = lerp(st.torso, 14, hug);
          return st;
        }
        // ---- him: walks in behind her, kneels with the ring, rises, hug ----
        function himRaw(s) {
          const x = manX(s);
          if (s < T_KNEE - 0.1) { const st = walking(1150, x, 6); return st; }
          const kneel = base({ hx: x, hy: FL - 106, torso: 4, head: -6, ax: x - 66, ay: FL, bx: x + 44, by: FL });
          const up = standOn(x - 40, -1, FL);
          const k = win(s, T_KNEE - 0.1, T_KNEE + 0.4) * (1 - win(s, T_RISE, T_RISE + 0.4));
          const st = mixPose(up, kneel, k);
          reachTo(st, hold(s, T_KNEE + 0.2, T_RISE + 0.2, 0.25), [x - 74, FL - 196]);
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [x - 120, stand - 140]); reachTo(st, hug, [x - 110, stand - 116], "b"); st.torso = lerp(st.torso, 14, hug);
          st.head = lerp(st.head, -10, win(s, T_HUG, T_HUG + 0.4));
          return st;
        }
        // ---- cameraman ----
        function cmRaw(s) {
          const x = cmX(s), run = s > T_RUN + 0.1 && s < T_ARR + 0.2;
          const st = run ? walking(150, x, 0, 110, 16, 14) : standOn(x, 1, FL);
          reachTo(st, 1, [x + 18, stand - 168]);
          reachTo(st, 1 - hold(s, T_POINT - 0.2, T_TURN + 0.4, 0.2), [x + 40, stand - 150], "b");
          reachTo(st, hold(s, T_POINT - 0.2, T_TURN + 0.4, 0.2), [x + 150, stand - 120], "b");
          reachTo(st, hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.3), [x + 2, stand - 180 + (Math.abs(s - T_TAP) < 0.1 ? 4 : 0)], "b");
          st.head = 4;
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        // TV lower third
        const lt = document.createElement("div");
        lt.style.cssText = "position:absolute;left:70px;width:940px;top:1640px;font-family:HFMono,monospace;font-weight:700;opacity:0";
        lt.innerHTML = `<div id="ltA" style="display:inline-block;background:#e0201a;color:#fff;font-size:30px;letter-spacing:0.12em;padding:10px 22px;border:4px solid #000">BREAKING NEWS</div><div id="ltLive" style="display:inline-block;margin-left:18px;color:#ff3b30;font-size:26px;letter-spacing:0.14em">● LIVE</div><div id="ltB" style="background:#fff;color:#111;font-size:30px;letter-spacing:0.06em;padding:12px 22px;border:4px solid #000;border-top:none;white-space:nowrap;overflow:hidden"></div>`;
        E("stage").appendChild(lt);
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
        const SHOTS = [[0, 1.7, 330, 390, 1.8], [T_RUN, 1.25, 430, 400, 1.3], [T_LIVE, 1.45, 520, 400, 1.5], [T_KNEE - 0.3, 1.4, 620, 400, 1.5], [T_TURN - 0.05, 1.75, 660, 390, 1.85], [T_MARRY - 0.05, 1.9, 680, 380, 2.0], [T_YES, 1.7, 640, 390, 1.8], [T_L2 - 0.1, 1.3, 560, 400, 1.35], [T_CTA, 1.9, CMX + 60, 380, 2.2]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.2, "SHE'S A TV REPORTER."], [T_RUN, "BREAKING NEWS.", 0], [T_LIVE, "LIVE ON AIR.", 0], [T_IN + 0.3, "THE STORY IS BEHIND HER.", 1], [T_TURN, "WAIT..."], [T_MARRY, "SHE IS THE NEWS.", 3]];
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
        const LTB = [[T_LIVE, "REPORTER ON THE SCENE"], [T_MARRY, "BREAKING: WILL YOU MARRY ME?"], [T_YES + 0.1, "BREAKING: SHE SAID YES ♥"]];

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const cp = drawFig(cm, livePose(cmRaw, s, 1.0), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);
          him.g.setAttribute("opacity", s > T_IN ? 1 : 0);
          if (him.g.previousSibling) him.g.previousSibling.setAttribute("opacity", s > T_IN ? 0.45 : 0);
          const hf = herF(s);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), hf);
          bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // tv camera on his shoulder
          tvcam.setAttribute("transform", `translate(${r1(cp.head[0] + 34)} ${r1(cp.head[1] + 6)})`);
          const live = s > T_LIVE;
          recDot.setAttribute("fill", live && Math.sin(s * 6) > -0.3 ? "#ff3b30" : "#5a1a1a");
          const lk = sm(s, T_LT, T_LT + 0.4), tapped = s > T_TAP;
          recBtn.setAttribute("opacity", lk.toFixed(3));
          recBtn.setAttribute("transform", `translate(-6 -58) scale(${(tapped ? 1 + 0.15 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : 0.6 + 0.4 * backOut(lk)).toFixed(3)})`);
          recR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); recT.setAttribute("fill", tapped ? "#000" : "#fff"); recT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; recT.setAttribute("font-size", tapped ? 9 : 12);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2, bx = cp.head[0] + 28, by = cp.head[1] - 52; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(bx + Math.cos(a) * 90 * Math.sqrt(q))} ${r1(by + Math.sin(a) * 70 * Math.sqrt(q))}) scale(${(0.45 - 0.2 * q).toFixed(2)})`); });
          // phone + ringing
          const ph = hold(s, T_CALL - 0.2, T_RUN, 0.2);
          phone.setAttribute("opacity", ph > 0.05 ? 1 : 0); phone.setAttribute("transform", `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1])})`);
          rings.forEach((r, i) => { const q = frac(s * 2 + i / 3); r.setAttribute("d", `M${r1(hp.hands[1][0] + 16 + 14 * q)} ${r1(hp.hands[1][1] - 10 - 8 * q)} q8 10 0 20`); r.setAttribute("opacity", s > T_CALL - 0.4 && s < T_CALL + 0.3 ? (1 - q).toFixed(3) : 0); });
          // mic: in hand, then dropped
          const dq = clamp((s - T_DROP) / 0.4, 0, 1);
          const mh = hp.hands[0];
          const mpos = s < T_SURP ? [mh[0], mh[1] - 6] : s < T_DROP ? [mh[0], mh[1] - 6] : [lerp(mh[0], RX + 30, dq), lerp(mh[1], FL - 10, dq * dq)];
          mic.setAttribute("opacity", s > T_RUN - 0.3 ? 1 : 0);
          mic.setAttribute("transform", `translate(${r1(mpos[0])} ${r1(mpos[1])}) rotate(${r1(s < T_DROP ? 0 : 100 * dq)})`);
          // ring box
          rbox.setAttribute("opacity", s > T_KNEE + 0.2 && s < T_HUG ? 1 : 0);
          rbox.setAttribute("transform", `translate(${r1(mp.hands[0][0])} ${r1(mp.hands[0][1] - 4)}) scale(1.4)`);
          rlid.setAttribute("transform", `rotate(${s > T_NEWS ? -110 : 0} -16 -16)`);
          const sk = hold(s, T_NEWS, T_YES, 0.2);
          sparkle.setAttribute("opacity", (sk * (0.6 + 0.4 * Math.sin(s * 9))).toFixed(3)); sparkle.setAttribute("transform", `translate(${r1(mp.hands[0][0] + 8)} ${r1(mp.hands[0][1] - 50)}) rotate(${r1(s * 60)})`);
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bGo, T_CALL, T_RUN, [hp.head[0] + 60, hp.head[1] - 90]);
          bub(bLive, T_TALK, T_POINT, [hp.head[0] - 40, hp.head[1] - 90]);
          bub(bBehind, T_POINT, T_TURN + 0.3, [cp.head[0] + 70, cp.head[1] - 110]);
          bub(bNews, T_NEWS, T_MARRY, [mp.head[0] - 40, mp.head[1] - 90]);
          bub(bMarry, T_MARRY, T_YES + 0.2, [mp.head[0] - 60, mp.head[1] - 90]);
          bub(bYes, T_YES, T_HUG + 0.6, [hp.head[0] - 10, hp.head[1] - 90]);
          hearts.forEach((h, i) => { const t0 = T_HUG + i * 0.2, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_CTA ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(RX + 110 + 80 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          // lower third
          lt.style.opacity = (sm(s, T_LIVE, T_LIVE + 0.3) * (1 - win(s, T_L2 - 0.4, T_L2) * (s < T_LT ? 1 : 0)) + (s > T_LT ? sm(s, T_LT, T_LT + 0.3) : 0)).toFixed(3);
          let lb = ""; for (const [a, txt] of LTB) if (s >= a) lb = txt.slice(0, Math.floor((s - a) * 34) + 1);
          if (s > T_LT) lb = tapped ? "FOLLOWING @SILENT.STICKMAN ✓" : "+ FOLLOW @SILENT.STICKMAN";
          E("ltB").textContent = lb;
          E("ltA").textContent = s > T_LT ? "NEW STORY EVERY DAY" : "BREAKING NEWS";
          E("ltA").style.background = s > T_LT ? (tapped ? "#111" : "#e0201a") : "#e0201a";
          E("ltLive").style.opacity = Math.sin(s * 6) > -0.3 ? 1 : 0.2;
          flash.style.opacity = (0.5 * Math.max(0, 1 - Math.abs(s - T_TURN) / 0.12)).toFixed(3);

          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "SHE CAME TO COVER THE NEWS.", L3 = "SHE WAS THE NEWS.";
          E("head").innerHTML = `<div>BREAKING NEWS, LIVE.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_LT, T_LT + 0.4)).toFixed(3);
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
