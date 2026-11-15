        // ---------- "surprise visit" (viral remake, 18M views "Wife's Reaction to Husband's Surprise Visit"): 6 PM video call, he is 4,800 km away: "I CAN'T COME HOME THIS YEAR." "IT'S OK..." 8 PM dinner for one, she crosses out the heart on the calendar. 8:30 PM KNOCK KNOCK, she opens: he is at the door with a suitcase and flowers. She runs into his arms, he lifts her. FOLLOW: his boarding pass flies to the camera ("FROM: FAR AWAY / TO: HER"), a stamp slams "FOLLOWING". ----------
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
        const C = [0, 5.2, 9.4];                                // 6 PM / 8 PM / 8:30 PM
        const T_SAY = 0.9, T_OK = 3.0, T_END = 4.2;
        const T_CROSS = 7.2;
        const T_K1 = 9.9, T_K2 = 10.5, T_UP = 10.9, T_WALK = 11.2, T_DOOR = 12.6, T_OPEN = 12.9, T_GASP = 13.4, T_RUN = 14.0, T_HUG = 14.6, T_LIFT = 15.0;
        const T_L2 = 16.6, T_L3 = 17.8;
        const T_CTA = 19.6, T_PASS = 20.0, T_TAP = 21.8;
        const CHX = 700, EMX = 520, TBLX = 610, DOORX = 160, CALX = 880;

        // ---------- room: front door left, table + 2 chairs, calendar ----------
        const warm = svgEl("circle", { cx: 600, cy: FL - 260, r: 440, fill: "url(#fireGlow)", opacity: 0.2 }, backG);
        svgEl("polygon", { points: `530,${FL - 520} 690,${FL - 520} 790,${FL} 430,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        const doorLight = svgEl("rect", { x: DOORX - 70, y: FL - 300, width: 140, height: 300, fill: "#ffe2a8", opacity: 0 }, roomG);
        const doorGlow = svgEl("circle", { cx: DOORX, cy: FL - 150, r: 320, fill: "#ffd27a", filter: "url(#soft)", opacity: 0 }, backG);
        svgEl("rect", { x: DOORX - 80, y: FL - 310, width: 160, height: 310, fill: "none", stroke: "#3a3a42", "stroke-width": 10 }, roomG);
        const doorP = svgEl("g", {}, roomG);
        svgEl("rect", { x: 0, y: FL - 300, width: 140, height: 300, fill: "#2a2018", stroke: "#000", "stroke-width": 5 }, doorP);
        svgEl("circle", { cx: 120, cy: FL - 150, r: 8, fill: "#c9a24a" }, doorP);
        // calendar
        const cal = svgEl("g", {}, roomG);
        svgEl("rect", { x: CALX - 60, y: FL - 430, width: 120, height: 130, rx: 6, fill: "#efefef", stroke: "#000", "stroke-width": 5 }, cal);
        svgEl("rect", { x: CALX - 60, y: FL - 430, width: 120, height: 30, fill: "#ff3b30", stroke: "#000", "stroke-width": 5 }, cal);
        const calT = svgEl("text", { x: CALX, y: FL - 336, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 50, fill: "#222", "text-anchor": "middle" }, cal); calT.textContent = "24";
        const calH = svgEl("path", { d: `M${CALX} ${FL - 310} C${CALX - 46} ${FL - 336} ${CALX - 40} ${FL - 372} ${CALX} ${FL - 352} C${CALX + 40} ${FL - 372} ${CALX + 46} ${FL - 336} ${CALX} ${FL - 310} Z`, fill: "none", stroke: "#ff3b30", "stroke-width": 5 }, cal);
        const calX = svgEl("path", { fill: "none", stroke: "#222", "stroke-width": 7, "stroke-linecap": "round" }, cal);
        // table + chairs
        const chair = (x, f) => { svgEl("rect", { x: x - 30, y: FL - 104, width: 60, height: 12, fill: "#5a4636", stroke: "#000", "stroke-width": 4 }, roomG); svgEl("rect", { x: x + f * 26 - 6, y: FL - 220, width: 12, height: 220, fill: "#4a3a2e", stroke: "#000", "stroke-width": 4 }, roomG); svgEl("rect", { x: x - f * 26 - 5, y: FL - 92, width: 10, height: 92, fill: "#4a3a2e", stroke: "#000", "stroke-width": 3 }, roomG); };
        chair(EMX, -1); chair(CHX, 1);
        svgEl("rect", { x: TBLX - 70, y: FL - 150, width: 140, height: 14, rx: 4, fill: "#6a5240", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: TBLX - 8, y: FL - 136, width: 16, height: 136, fill: "#4a3a2e", stroke: "#000", "stroke-width": 3 }, roomG);
        const dinner = svgEl("g", { opacity: 0 }, propG);
        svgEl("ellipse", { cx: TBLX + 34, cy: FL - 156, rx: 30, ry: 7, fill: "#f4f4f4", stroke: "#000", "stroke-width": 3 }, dinner);
        svgEl("ellipse", { cx: TBLX + 34, cy: FL - 162, rx: 16, ry: 5, fill: "#d9a35a", stroke: "#000", "stroke-width": 2 }, dinner);
        svgEl("rect", { x: TBLX - 26, y: FL - 196, width: 10, height: 46, fill: "#efe6d6", stroke: "#000", "stroke-width": 3 }, dinner);
        const flame = svgEl("path", { fill: "#ffb347", stroke: "#000", "stroke-width": 2 }, dinner);

        // ---------- figures ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const phone = svgEl("g", {}, propG);
        svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.6 }, phone);
        svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, phone);
        const suit = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -34, y: -78, width: 68, height: 78, rx: 8, fill: "#3a5a8a", stroke: "#000", "stroke-width": 5 }, suit);
        svgEl("path", { d: "M-14 -78 L-14 -94 L14 -94 L14 -78", fill: "none", stroke: "#000", "stroke-width": 5 }, suit);
        const tagS = svgEl("rect", { x: 18, y: -60, width: 22, height: 14, fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, suit);
        const flowers = svgEl("g", { opacity: 0 }, propG);
        svgEl("path", { d: "M0 0 L-8 -46 M0 0 L0 -50 M0 0 L8 -46", stroke: "#3a8a3a", "stroke-width": 4 }, flowers);
        for (const [x, y] of [[-10, -50], [0, -56], [10, -50], [-4, -42], [6, -44]]) svgEl("circle", { cx: x, cy: y, r: 9, fill: "#ff5a6e", stroke: "#000", "stroke-width": 3 }, flowers);

        // video call card (world, above her)
        const card = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -110, y: -170, width: 220, height: 340, rx: 28, fill: "#0e1626", stroke: "#000", "stroke-width": 6 }, card);
        svgEl("rect", { x: -96, y: -150, width: 192, height: 270, rx: 16, fill: "#1d3550", stroke: "#4f8cff", "stroke-width": 3 }, card);
        svgEl("circle", { cx: 0, cy: -60, r: 34, fill: "#fff", stroke: "#000", "stroke-width": 5 }, card);
        svgEl("path", { d: "M0 -26 L0 60 M0 0 L-36 30 M0 0 L36 30", stroke: "#fff", "stroke-width": 12, "stroke-linecap": "round" }, card);
        const kmT = svgEl("text", { x: 0, y: 106, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 20, fill: "#bfe0ff", "text-anchor": "middle" }, card); kmT.textContent = "4,800 KM AWAY";
        svgEl("circle", { cx: 0, cy: 146, r: 15, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, card);

        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bCant = bubble("I CAN'T COME HOME THIS YEAR.", 470, 24), bOk = bubble("IT'S OK...", 180, 28, "#666"), bK1 = bubble("KNOCK", 130, 28), bK2 = bubble("KNOCK", 130, 28), bSur = bubble("SURPRISE.", 190, 30, "#ff3b30");
        const hearts = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const tear = svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, STR = 100, lift = 10, head = 20) => { const ft = feetOn(x0, x, STR, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / STR); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 8, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };
        const sitAt = (x, f) => base({ hx: x, hy: FL - 112, torso: 6, head: 20, ax: x + f * 60, ay: FL, bx: x + f * 44, by: FL });

        // ---- her ----
        const herX = (s) => (s < T_WALK ? CHX : s < T_DOOR ? lerp(CHX - 20, 300, sm(s, T_WALK, T_DOOR)) : s < T_RUN ? 300 : lerp(300, 248, sm(s, T_RUN, T_HUG)));
        function herRaw(s) {
          const x = herX(s);
          if (s < T_UP) {
            const st = sitAt(CHX, -1);
            // 6 PM: phone up for the call; sad after
            const call = 1 - win(s, T_END, T_END + 0.4);
            reachTo(st, call, [CHX - 64, FL - 232]); st.head = lerp(st.head, 0, call);
            st.head = lerp(st.head, 34, win(s, T_OK, T_OK + 0.5) * (s < C[1] ? 1 : 0));
            // 8 PM: crosses out the calendar? (she reaches back toward it from the chair)
            const cr = hold(s, T_CROSS - 0.6, T_CROSS + 0.6, 0.3);
            reachTo(st, cr, [CALX - 30 + 30 * Math.sin((s - T_CROSS) * 14) * win(s, T_CROSS - 0.2, T_CROSS), FL - 360]);
            if (s > C[1]) { st.head = lerp(16, 30, win(s, C[1], C[1] + 1)); }
            const kn = win(s, T_K1, T_K1 + 0.3); st.head = lerp(st.head, -4, kn);
            return st;
          }
          if (s < T_WALK) { const q = win(s, T_UP, T_WALK); return mixPose(sitAt(CHX, -1), standOn(CHX - 20, -1, FL), q); }
          if (s < T_DOOR) return walking(CHX - 20, x, 90, 8, 10);
          const st = standOn(x, -1, FL);
          // opens the door
          reachTo(st, hold(s, T_DOOR - 0.2, T_OPEN + 0.3, 0.2), [DOORX + 70, FL - 150]);
          // gasp: hands to face
          const gp = hold(s, T_GASP, T_RUN + 0.1, 0.2);
          reachTo(st, gp, [x - 26, stand - 150]); reachTo(st, gp, [x - 18, stand - 146], "b"); st.head = lerp(st.head, -6, gp);
          if (s > T_RUN) {
            const r = walking(300, x, 110, 16, -6);
            const hug = win(s, T_HUG - 0.2, T_HUG + 0.1);
            Object.assign(st, mixPose(st, r, 1 - hug));
            reachTo(st, hug, [x - 70, stand - 150]); reachTo(st, hug, [x - 60, stand - 140], "b");
            const lift = win(s, T_LIFT, T_LIFT + 0.4);
            st.hy -= 50 * lift; st.ay -= 50 * lift; st.by -= 40 * lift; st.ax += 30 * lift; st.bx += 50 * lift;
            st.head = -10;
          }
          return st;
        }
        // ---- him: in the doorway ----
        function himRaw(s) {
          const st = standOn(DOORX + 10, 1, FL);
          st.head = -4;
          reachTo(st, 1 - win(s, T_RUN, T_HUG), [DOORX + 60, stand - 100]);         // flowers
          reachTo(st, 1 - win(s, T_HUG - 0.3, T_HUG), [DOORX - 30, stand - 10], "b"); // suitcase handle
          const hug = win(s, T_HUG - 0.2, T_HUG + 0.1);
          reachTo(st, hug, [DOORX + 90, stand - 100]); reachTo(st, hug, [DOORX + 80, stand - 120], "b");
          st.torso -= 6 * win(s, T_LIFT, T_LIFT + 0.4);
          return st;
        }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const tag = document.createElement("div");
        tag.style.cssText = "position:absolute;left:120px;top:1450px;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.22em;color:#ff6a60";
        E("stage").appendChild(tag);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        // FOLLOW: boarding pass
        const pass = document.createElement("div");
        pass.style.cssText = "position:absolute;left:540px;top:900px;width:760px;height:400px;border-radius:26px;background:#f7f4ec;border:6px solid #000;font-family:HFMono,monospace;font-weight:700;color:#111;opacity:0;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.7)";
        pass.innerHTML = `<div style="height:78px;background:#2f7cf6;color:#fff;display:flex;align-items:center;padding:0 34px;font-size:30px;letter-spacing:0.14em;border-bottom:6px solid #000">✈ BOARDING PASS</div>
          <div style="display:flex;padding:26px 34px 0;font-size:20px;color:#777;letter-spacing:0.12em"><div style="flex:1">FROM</div><div style="flex:1">TO</div><div style="width:150px">SEAT</div></div>
          <div style="display:flex;padding:6px 34px 0;font-size:40px;letter-spacing:0.06em"><div style="flex:1">FAR AWAY</div><div style="flex:1;color:#ff3b30">HER ♥</div><div style="width:150px">1A</div></div>
          <div style="padding:22px 34px 0;font-size:20px;color:#777;letter-spacing:0.12em">PASSENGER: @SILENT.STICKMAN</div>
          <div id="pBtn" style="position:absolute;left:34px;bottom:30px;height:74px;padding:0 34px;border-radius:37px;border:5px solid #000;display:flex;align-items:center;font-size:34px;letter-spacing:0.08em"></div>
          <div style="position:absolute;right:30px;bottom:26px;width:200px;height:80px;background:repeating-linear-gradient(90deg,#111 0 4px,transparent 4px 9px,#111 9px 11px,transparent 11px 16px)"></div>`;
        E("stage").appendChild(pass);
        const stamp = document.createElement("div");
        stamp.style.cssText = "position:absolute;left:640px;top:960px;padding:8px 20px;border:6px solid #e0282a;border-radius:12px;background:rgba(247,244,236,0.85);color:#e0282a;font-family:HFMono,monospace;font-weight:700;font-size:36px;letter-spacing:0.08em;opacity:0;white-space:nowrap";
        stamp.textContent = "WELCOME HOME ♥";
        E("stage").appendChild(stamp);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:1160px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.4, 590, 360, 1.48], [C[1], 1.2, 560, 400, 1.25], [C[2], 1.75, 230, 380, 1.85], [T_UP, 1.15, 480, 400, 1.18], [T_OPEN - 0.05, 1.7, 250, 380, 1.85], [T_HUG - 0.1, 1.85, 230, 370, 2.0], [T_L2 - 0.1, 1.3, 330, 390, 1.35]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const toScreen = (c, x, y) => [540 + (x - c[1]) * c[0], 1180 + (y - c[2]) * c[0]];
        const CAPS = [[0.3, "HE'S 4,800 KM AWAY."], [T_SAY + 0.6, "HE CAN'T COME HOME.", 1], [C[1] + 0.3, "DINNER FOR ONE."], [T_CROSS, "SHE CROSSES OUT THE DAY.", 1], [C[2] + 0.2, "THEN..."], [T_K1, "KNOCK KNOCK."], [T_OPEN + 0.1, "HE CAME HOME.", 1]];
        const TAGS = ["6:00 PM", "8:00 PM", "8:30 PM"];
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
          const ch = s < C[1] ? 0 : s < C[2] ? 1 : 2;
          const hp = drawFig(her, livePose(herRaw, s, 1.4), -1);
          const open = sm(s, T_OPEN - 0.1, T_OPEN + 0.5);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          him.g.setAttribute("opacity", s > T_OPEN ? 1 : 0);
          if (him.g.previousSibling) him.g.previousSibling.setAttribute("opacity", s > T_OPEN ? 0.45 : 0);
          bun.setAttribute("cx", r1(hp.head[0] + 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // door swings open (inward, toward the room)
          doorP.setAttribute("transform", `translate(${DOORX - 70} 0) scale(${(1 - 0.85 * open).toFixed(3)} 1)`);
          doorLight.setAttribute("opacity", (0.9 * open).toFixed(3)); doorGlow.setAttribute("opacity", (0.35 * open).toFixed(3));
          // props
          phone.setAttribute("opacity", s < T_END + 0.4 ? 1 : 0);
          phone.setAttribute("transform", `translate(${r1(hp.hands[0][0])} ${r1(hp.hands[0][1] - 6)})`);
          dinner.setAttribute("opacity", s > C[1] ? 1 : 0);
          const fh = 14 + 3 * Math.sin(s * 13);
          flame.setAttribute("d", `M${TBLX - 21} ${FL - 196} Q${TBLX - 29} ${r1(FL - 206)} ${TBLX - 21} ${r1(FL - 196 - fh)} Q${TBLX - 13} ${r1(FL - 206)} ${TBLX - 21} ${FL - 196} Z`);
          const cx2 = clamp((s - (T_CROSS - 0.2)) / 0.4, 0, 1);
          calX.setAttribute("d", cx2 > 0 ? `M${CALX - 44} ${FL - 380} L${r1(CALX - 44 + 88 * Math.min(1, cx2 * 2))} ${r1(FL - 380 + 76 * Math.min(1, cx2 * 2))}${cx2 > 0.5 ? ` M${CALX + 44} ${FL - 380} L${r1(CALX + 44 - 88 * (cx2 * 2 - 1))} ${r1(FL - 380 + 76 * (cx2 * 2 - 1))}` : ""}` : "");
          calH.setAttribute("opacity", s > T_OPEN + 0.5 ? 0 : 1);
          suit.setAttribute("opacity", s > T_OPEN ? 1 : 0);
          const sp = s < T_HUG - 0.1 ? [mp.hands[1][0], FL] : [DOORX - 50, FL];
          suit.setAttribute("transform", `translate(${r1(sp[0])} ${r1(sp[1])}) rotate(${s > T_HUG ? -6 : 0})`);
          flowers.setAttribute("opacity", s > T_OPEN ? 1 : 0);
          const fp = s < T_RUN ? mp.hands[0] : [lerp(mp.hands[0][0], DOORX + 140, sm(s, T_RUN, T_HUG)), lerp(mp.hands[0][1], FL, sm(s, T_RUN, T_HUG + 0.3))];
          flowers.setAttribute("transform", `translate(${r1(fp[0])} ${r1(fp[1])}) rotate(${r1(s > T_RUN ? 80 * sm(s, T_RUN, T_HUG + 0.3) : 0)})`);
          // call card above her
          const ck = hold(s, 0.05, T_END, 0.25);
          card.setAttribute("opacity", ck.toFixed(3));
          card.setAttribute("transform", `translate(${CHX - 210} ${FL - 400}) scale(${(0.7 + 0.3 * ck).toFixed(3)})`);
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bCant, T_SAY, T_OK + 0.2, [CHX - 210, FL - 610]);
          bub(bOk, T_OK, T_END + 0.3, [hp.head[0] + 50, hp.head[1] - 80]);
          bub(bK1, T_K1, T_K1 + 1.3, [DOORX + 20, FL - 360]);
          bub(bK2, T_K2, T_UP + 0.6, [DOORX + 60, FL - 440]);
          bub(bSur, T_OPEN + 0.3, T_RUN + 0.3, [mp.head[0] + 90, mp.head[1] - 80]);
          const tq = frac(s * 0.7);
          tear.setAttribute("opacity", hold(s, T_OK + 0.4, T_END + 1.2, 0.3) * (1 - tq) > 0 ? (hold(s, T_OK + 0.4, T_END + 1.2, 0.3) * (1 - tq)).toFixed(3) : 0);
          tear.setAttribute("transform", `translate(${r1(hp.head[0] - 20)} ${r1(hp.head[1] + 10 + 50 * tq)})`);
          hearts.forEach((h, i) => { const t0 = T_HUG + 0.2 + i * 0.22, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(220 + 70 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          cold.setAttribute("opacity", (0.12 * ch * (1 - open)).toFixed(3));
          warm.setAttribute("opacity", (0.2 - 0.05 * ch + 0.15 * open).toFixed(3));

          tag.textContent = s < T_L2 - 0.2 ? TAGS[ch].slice(0, Math.floor((s - C[ch]) * 20) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C[1], C[2]]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.14);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L2 = "SOMETIMES \"I CAN'T COME\"", L3 = "MEANS \"I'M ALREADY ON MY WAY.\"";
          E("head").innerHTML = `<div>HE SAID HE COULDN'T COME HOME.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_PASS, T_PASS + 0.3)).toFixed(3);
          dim.style.opacity = (0.55 * win(s, T_CTA, T_PASS + 0.3)).toFixed(3);

          // ---- FOLLOW: boarding pass flies out of his hand to the camera
          const pq = sm(s, T_PASS, T_PASS + 0.6), from = toScreen(c, mp.head[0] + 40, mp.head[1] + 80);
          pass.style.opacity = s > T_PASS ? 1 : 0;
          pass.style.left = r1(lerp(from[0], 540, pq) - 380) + "px"; pass.style.top = r1(lerp(from[1], 900, pq) - 200) + "px";
          pass.style.transform = `scale(${lerp(0.1, 1, pq).toFixed(3)}) rotate(${r1(lerp(-30, -3, pq))}deg)`;
          const tapped = s > T_TAP;
          const btn = E("pBtn");
          btn.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; btn.style.background = tapped ? "#fff" : "#ff3b30"; btn.style.color = tapped ? "#000" : "#fff";
          btn.style.transform = `scale(${(1 + 0.05 * Math.max(0, Math.sin(s * 6))).toFixed(3)})`;
          const sq = clamp((s - T_TAP) / 0.18, 0, 1);
          stamp.style.opacity = tapped ? 1 : 0;
          stamp.style.transform = `rotate(-12deg) scale(${lerp(2.4, 1, sq).toFixed(3)})`;
          const TT = "FOLLOW FOR MORE LOVE STORIES ♥";
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
