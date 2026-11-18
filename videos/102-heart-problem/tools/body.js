        // ---------- "heart problem" (viral remake, 6.4M views "Boyfriend arrives in ambulance with fake emergency for surprise proposal to nurse"): 3 AM night shift, she yawns at the nurse station. The doors burst open, red/blue light, a paramedic rolls in a stretcher: "HEART PROBLEM." She listens with the stethoscope, the monitor races. He sits up, opens a ring box: "ONLY YOU CAN FIX IT." "MARRY ME?" "YES!" Hug, the ECG line turns into hearts. FOLLOW: the heart monitor draws a red "+ FOLLOW" button, she taps the screen: "FOLLOWING" + a calm heartbeat. ----------
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
        const T_YAWN = 0.3, T_DOOR = 1.0, T_ROLL = 1.2, T_STOP = 2.7, T_CHART = 2.9, T_PMOUT = 3.5, T_WALK = 3.7, T_STETH = 4.6, T_RACE = 5.0;
        const T_SIT = 6.8, T_SURP = 7.1, T_BOX = 7.8, T_OPEN = 8.3, T_FIX = 8.5, T_MARRY = 9.6, T_HANDS = 9.9, T_YES = 10.8, T_HUG = 11.6;
        const T_L2 = 13.0, T_L3 = 14.0;
        const T_CTA = 16.4, T_DRAW = 17.0, T_TAP = 18.8;
        const STX = 500, NX = 860, MON = [730, FL - 330], DOORX = 90;

        // ---------- room: double doors (left), monitor on a stand, nurse station (right) ----------
        const coolG = svgEl("circle", { cx: 600, cy: FL - 260, r: 460, fill: "#cfe8ff", filter: "url(#soft)", opacity: 0.08 }, backG);
        svgEl("polygon", { points: `440,${FL - 520} 620,${FL - 520} 740,${FL} 320,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
        const siren = svgEl("circle", { cx: DOORX, cy: FL - 160, r: 300, filter: "url(#soft)", opacity: 0 }, backG);
        svgEl("rect", { x: DOORX - 90, y: FL - 320, width: 180, height: 320, fill: "#1a1e26", stroke: "#3a3a42", "stroke-width": 10 }, roomG);
        const doorL = svgEl("rect", { x: DOORX - 84, y: FL - 314, width: 84, height: 314, fill: "#2a3240", stroke: "#000", "stroke-width": 4 }, roomG);
        const doorR = svgEl("rect", { x: DOORX, y: FL - 314, width: 84, height: 314, fill: "#2a3240", stroke: "#000", "stroke-width": 4 }, roomG);
        const sign = svgEl("text", { x: DOORX, y: FL - 340, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#ff5a4a", "text-anchor": "middle" }, roomG); sign.textContent = "EMERGENCY";
        // nurse station
        svgEl("rect", { x: NX + 20, y: FL - 150, width: 220, height: 150, fill: "#d8dce4", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: NX + 10, y: FL - 164, width: 240, height: 16, fill: "#eef0f4", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("path", { d: `M${NX + 130} ${FL - 110} l0 40 M${NX + 110} ${FL - 90} l40 0`, stroke: "#ff3b30", "stroke-width": 10 }, roomG);
        // monitor
        svgEl("rect", { x: MON[0] - 6, y: MON[1] + 60, width: 12, height: FL - MON[1] - 60, fill: "#2a2a30", stroke: "#000", "stroke-width": 3 }, roomG);
        const monG = svgEl("g", { transform: `translate(${MON[0]} ${MON[1]})` }, roomG);
        svgEl("rect", { x: -90, y: -62, width: 180, height: 124, rx: 10, fill: "#1a1e26", stroke: "#000", "stroke-width": 6 }, monG);
        svgEl("rect", { x: -80, y: -52, width: 160, height: 104, rx: 4, fill: "#06140c" }, monG);
        const ecg = svgEl("path", { fill: "none", stroke: "#4dff7a", "stroke-width": 3, "stroke-linejoin": "round" }, monG);
        const bpm = svgEl("text", { x: 72, y: -32, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#4dff7a", "text-anchor": "end" }, monG);
        const monBtn = svgEl("g", { opacity: 0 }, monG);
        const monBR = svgEl("rect", { x: -66, y: -18, width: 132, height: 36, rx: 18, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, monBtn);
        const monBT = svgEl("text", { x: 0, y: 7, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#fff", "text-anchor": "middle" }, monBtn);
        // stretcher
        const str = svgEl("g", {}, propG);
        svgEl("rect", { x: -120, y: -96, width: 240, height: 16, rx: 6, fill: "#eef0f4", stroke: "#000", "stroke-width": 4 }, str);
        svgEl("rect", { x: -124, y: -82, width: 248, height: 8, fill: "#8a8e96", stroke: "#000", "stroke-width": 3 }, str);
        for (const dx of [-100, 100]) { svgEl("line", { x1: dx, y1: -76, x2: dx, y2: -16, stroke: "#5a5e66", "stroke-width": 6 }, str); svgEl("circle", { cx: dx, cy: -10, r: 10, fill: "#333", stroke: "#000", "stroke-width": 3 }, str); }
        const clip = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -26, y: -34, width: 52, height: 68, rx: 4, fill: "#f6f0e2", stroke: "#000", "stroke-width": 4 }, clip);
        const clipT = svgEl("text", { x: 0, y: -6, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 11, fill: "#ff3b30", "text-anchor": "middle" }, clip); clipT.textContent = "HEART";
        const clipT2 = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 11, fill: "#ff3b30", "text-anchor": "middle" }, clip); clipT2.textContent = "PROBLEM";
        const rbox = svgEl("g", { opacity: 0 }, propG);
        svgEl("rect", { x: -16, y: -16, width: 32, height: 16, rx: 4, fill: "#8a1a2a", stroke: "#000", "stroke-width": 3 }, rbox);
        const rlid = svgEl("rect", { x: -16, y: -28, width: 32, height: 12, rx: 4, fill: "#a02234", stroke: "#000", "stroke-width": 3 }, rbox);
        svgEl("circle", { cy: -16, r: 7, fill: "none", stroke: "#ffd25a", "stroke-width": 4 }, rbox);
        svgEl("path", { d: "M-5 -23 L5 -23 L0 -32 Z", fill: "#bfe8ff", stroke: "#000", "stroke-width": 2 }, rbox);
        const steth = svgEl("path", { fill: "none", stroke: "#222", "stroke-width": 4, opacity: 0 }, propG);

        // ---------- figures ----------
        const pm = makeFig(figG, "#9aa6b4", "#7a8694", false, "pm");
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const capN = svgEl("path", { d: "M-22 -8 L22 -8 L18 -24 L-18 -24 Z", fill: "#ffffff", stroke: "#000", "stroke-width": 4 }, figG);
        const capX = svgEl("path", { d: "M0 -21 L0 -11 M-5 -16 L5 -16", stroke: "#ff3b30", "stroke-width": 3 }, figG);
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bEm = bubble("EMERGENCY!", 210, 28, "#ff3b30"), bHP = bubble("HEART PROBLEM.", 260), bQ = bubble("?!", 80, 34), bFix = bubble("ONLY YOU CAN FIX IT.", 370), bMarry = bubble("MARRY ME?", 200, 30, "#ff3b30"), bYes = bubble("YES!", 110, 32, "#ff3b30");
        const zz = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#9ab", opacity: 0 }, fxG); zz.textContent = "~ yawn ~";
        const hearts = Array.from({ length: 9 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
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

        const strX = (s) => lerp(-260, STX, sm(s, T_ROLL, T_STOP));
        const TOPY = FL - 96;
        // ---- him: lying on the stretcher, then sits up ----
        function himRaw(s) {
          const x = strX(s);
          const lie = base({ hx: x + 20, hy: TOPY - 18, torso: -88, head: -8, ax: x + 170, ay: TOPY - 12, bx: x + 160, by: TOPY - 8, ash: 70, ael: 40, bsh: 80, bel: 30 });
          const sit = base({ hx: x + 10, hy: TOPY - 18, torso: 8, head: 0, ax: x + 170, ay: TOPY - 14, bx: x + 156, by: TOPY - 10 });
          let st = mixPose(lie, sit, win(s, T_SIT, T_SIT + 0.5));
          const bx2 = hold(s, T_BOX, T_HUG, 0.3); reachTo(st, bx2, [x + 80, TOPY - 110]);
          const hug = win(s, T_HUG - 0.2, T_HUG + 0.3); reachTo(st, hug, [x + 110, stand - 150]); reachTo(st, hug, [x + 100, stand - 120], "b");
          st.head = lerp(st.head, -10, win(s, T_HUG, T_HUG + 0.4));
          return st;
        }
        // ---- paramedic: pushes the stretcher in, hands over the chart, leaves ----
        function pmRaw(s) {
          if (s < T_STOP) { const x = strX(s) - 170, st = walking(-430, x, 4); reachTo(st, 1, [x + 46, TOPY - 6]); reachTo(st, 1, [x + 40, TOPY - 2], "b"); return st; }
          const x = s < T_PMOUT ? STX - 170 : lerp(STX - 170, -300, sm(s, T_PMOUT, T_PMOUT + 1.4));
          const st = s < T_PMOUT ? standOn(x, 1, FL) : walking(STX - 170, x, 4);
          reachTo(st, hold(s, T_CHART - 0.2, T_PMOUT, 0.2), [x + 70, stand - 120]);
          return st;
        }
        // ---- her: nurse station, then the stethoscope, then the hug ----
        const herX = (s) => (s < T_WALK ? NX : lerp(NX, STX + 150, sm(s, T_WALK, T_STETH - 0.1)) - 20 * win(s, T_SURP, T_SURP + 0.3) * (1 - win(s, T_MARRY, T_MARRY + 0.4)) - 20 * win(s, T_HUG - 0.4, T_HUG));
        function herRaw(s) {
          const x = herX(s);
          const st = s > T_WALK && s < T_STETH - 0.1 ? walking(NX, x) : standOn(x, -1, FL);
          const yawn = hold(s, T_YAWN, T_DOOR, 0.2); reachTo(st, yawn, [x - 20, stand - 160]); st.head = lerp(st.head, -18, yawn);
          st.head = lerp(st.head, -4, win(s, T_DOOR, T_DOOR + 0.2));
          reachTo(st, hold(s, T_CHART, T_WALK + 0.6, 0.2), [x - 50, stand - 120], "b");
          const stt = hold(s, T_STETH, T_SIT, 0.25); reachTo(st, stt, [STX + 40, TOPY - 40]); st.torso = lerp(st.torso, 30, stt); st.head = lerp(st.head, 20, stt);
          const surp = hold(s, T_SURP, T_HANDS, 0.15); st.torso = lerp(st.torso, -8, surp);
          const hands = hold(s, T_HANDS, T_HUG, 0.25); reachTo(st, hands, [x - 22, stand - 150]); reachTo(st, hands, [x - 14, stand - 146], "b"); st.head = lerp(st.head, -6, hands);
          if (s > T_YES && s < T_YES + 0.7) st.head += 12 * Math.sin(Math.PI * clamp((s - T_YES) / 0.35, 0, 1));
          const hug = win(s, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [STX + 60, stand - 140]); reachTo(st, hug, [STX + 70, stand - 110], "b"); st.torso = lerp(st.torso, 14, hug);
          const tap = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [MON[0] + 10, MON[1] + 8 + (Math.abs(s - T_TAP) < 0.1 ? 4 : 0)]); st.head = lerp(st.head, -12, win(s, T_DRAW, T_DRAW + 0.4));
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
        flash.style.cssText = "position:absolute;inset:0;background:#ff2a2a;opacity:0;mix-blend-mode:screen";
        E("stage").appendChild(flash);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.6, 820, 380, 1.7], [T_DOOR - 0.05, 1.2, 420, 400, 1.25], [T_STETH - 0.1, 1.8, 600, 400, 1.95], [T_SIT - 0.05, 1.6, 600, 390, 1.7], [T_OPEN - 0.05, 2.1, 590, 380, 2.2], [T_HANDS, 1.6, 620, 390, 1.7], [T_HUG - 0.1, 1.5, 620, 390, 1.6], [T_L2 - 0.1, 1.3, 600, 400, 1.34], [T_CTA, 2.2, MON[0], MON[1] + 30, 2.7]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.2, "3 AM. NIGHT SHIFT."], [T_DOOR, "EMERGENCY.", 0], [T_CHART + 0.1, "\"HEART PROBLEM.\"", 1], [T_RACE, "HIS HEART IS RACING.", 3], [T_SIT, "WAIT..."], [T_MARRY, "HE CAME FOR HER.", 3]];
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
        // ECG: beats per second rises when she listens, hearts after "yes", calm after FOLLOW
        const rate = (s) => (s < T_RACE ? 1.2 : s < T_SIT ? lerp(1.2, 3.2, sm(s, T_RACE, T_RACE + 1.2)) : s < T_YES ? 3.2 : s < T_TAP ? 2.2 : 1.1);
        const RT = []; { let ph = 0; for (let i = 0; i <= DUR * 120; i++) { RT.push(ph); ph += rate(i / 120) / 120; } }
        const beatPh = (s) => RT[Math.max(0, Math.min(RT.length - 1, Math.round(s * 120)))];

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const sx = strX(s);
          str.setAttribute("transform", `translate(${r1(sx)} ${FL})`);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const pp = drawFig(pm, livePose(pmRaw, s, 1.0), 1);
          pm.g.setAttribute("opacity", s > T_ROLL - 0.1 && s < T_PMOUT + 1.4 ? 1 : 0);
          him.g.setAttribute("opacity", s > T_ROLL - 0.1 ? 1 : 0);
          if (him.g.previousSibling) him.g.previousSibling.setAttribute("opacity", s > T_ROLL - 0.1 ? 0.45 : 0);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), s > T_WALK && s < T_STETH - 0.1 ? -1 : -1);
          capN.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1] - 18)})`); capX.setAttribute("transform", `translate(${r1(hp.head[0])} ${r1(hp.head[1] - 18)})`);
          // doors + siren
          const dq = hold(s, T_DOOR - 0.1, T_STOP + 0.4, 0.2);
          doorL.setAttribute("transform", `translate(${DOORX - 84} 0) scale(${(1 - 0.8 * dq).toFixed(3)} 1) translate(${-(DOORX - 84)} 0)`);
          doorR.setAttribute("transform", `translate(${DOORX + 84} 0) scale(${(1 - 0.8 * dq).toFixed(3)} 1) translate(${-(DOORX + 84)} 0)`);
          const sirenOn = s > T_DOOR && s < T_STOP + 1.0, red = Math.sin(s * 14) > 0;
          siren.setAttribute("fill", red ? "#ff3030" : "#3a6aff"); siren.setAttribute("opacity", sirenOn ? 0.45 : 0);
          flash.style.background = red ? "#ff2a2a" : "#2a5aff"; flash.style.opacity = sirenOn ? (0.08 * (Math.abs(Math.sin(s * 14)))).toFixed(3) : 0;
          // chart, stethoscope, ring box
          clip.setAttribute("opacity", s > T_CHART - 0.2 && s < T_WALK + 0.6 ? 1 : 0);
          const cp = s < T_CHART + 0.2 ? pp.hands[0] : hp.hands[1];
          clip.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1] - 10)}) scale(1.3)`);
          steth.setAttribute("opacity", hold(s, T_STETH, T_SIT, 0.2) > 0.05 ? 1 : 0);
          steth.setAttribute("d", `M${r1(hp.head[0] - 10)} ${r1(hp.head[1] + 30)} Q${r1(hp.head[0] - 40)} ${r1(hp.head[1] + 90)} ${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])}`);
          rbox.setAttribute("opacity", s > T_BOX && s < T_HUG ? 1 : 0);
          rbox.setAttribute("transform", `translate(${r1(mp.hands[0][0])} ${r1(mp.hands[0][1] - 4)}) scale(1.4)`);
          rlid.setAttribute("transform", `rotate(${s > T_OPEN ? -110 : 0} -16 -16)`);
          // monitor
          const ph = beatPh(s);
          let d = "";
          for (let i = 0; i <= 40; i++) { const xx = -78 + i * 4, p0 = ph - (40 - i) * 0.035, q = frac(p0); let y = 0; if (s > T_YES && s < T_TAP) { const hq = frac(p0 * 0.5); y = hq < 0.5 ? -Math.sin(Math.PI * hq * 2) * 22 : 0; } else y = q < 0.08 ? -36 * Math.sin(Math.PI * q / 0.08) : q < 0.14 ? 14 * Math.sin(Math.PI * (q - 0.08) / 0.06) : 0; d += (i ? " L" : "M") + `${xx} ${r1(y + 10)}`; }
          const drawK = sm(s, T_DRAW, T_DRAW + 0.5);
          ecg.setAttribute("d", d); ecg.setAttribute("opacity", (1 - 0.85 * drawK + (s > T_TAP ? 0.85 * win(s, T_TAP + 0.3, T_TAP + 0.8) : 0)).toFixed(3));
          ecg.setAttribute("stroke", s > T_YES && s < T_DRAW ? "#ff6a7a" : "#4dff7a");
          bpm.textContent = `♥ ${Math.round(rate(s) * 60)}`;
          monBtn.setAttribute("opacity", (drawK * (s > T_TAP + 0.6 ? 1 - win(s, T_TAP + 0.6, T_TAP + 1.0) : 1)).toFixed(3));
          const tapped = s > T_TAP;
          monBR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); monBT.setAttribute("fill", tapped ? "#000" : "#fff");
          monBT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; monBT.setAttribute("font-size", tapped ? 15 : 18);
          monBtn.setAttribute("transform", `scale(${(tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : backOut(drawK)).toFixed(3)})`);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(MON[0] + Math.cos(a) * 120 * Math.sqrt(q))} ${r1(MON[1] + Math.sin(a) * 90 * Math.sqrt(q))}) scale(${(0.6 - 0.3 * q).toFixed(2)})`); });
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bEm, T_DOOR + 0.2, T_STOP, [pp.head[0] + 40, pp.head[1] - 90]);
          bub(bHP, T_CHART, T_STETH, [pp.head[0] + 60, pp.head[1] - 90]);
          bub(bQ, T_SURP, T_FIX, [hp.head[0] + 10, hp.head[1] - 80]);
          bub(bFix, T_FIX, T_MARRY, [mp.head[0] + 20, mp.head[1] - 100]);
          bub(bMarry, T_MARRY, T_YES + 0.3, [mp.head[0] + 10, mp.head[1] - 100]);
          bub(bYes, T_YES, T_HUG + 0.6, [hp.head[0] + 10, hp.head[1] - 90]);
          zz.setAttribute("opacity", hold(s, T_YAWN, T_DOOR, 0.2).toFixed(3)); zz.setAttribute("x", r1(hp.head[0] - 60)); zz.setAttribute("y", r1(hp.head[1] - 60));
          hearts.forEach((h, i) => { const t0 = T_HUG + i * 0.2, q = clamp((s - t0) / 1.4, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_CTA ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(STX + 80 + 80 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 220 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });

          tag.textContent = s < T_STETH - 0.2 ? "NIGHT SHIFT · 3:00 AM".slice(0, Math.floor(s * 24) + 1) : "";
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "HE HAD A HEART PROBLEM.", L3 = "SHE WAS THE ONLY CURE.";
          E("head").innerHTML = `<div>EMERGENCY AT 3 AM.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_DRAW, T_DRAW + 0.4)).toFixed(3);
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
