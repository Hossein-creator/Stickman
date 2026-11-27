        // ---------- "love is a couch. #31": winner split-screen format. Moving day, a staircase up to their new place. BOTH CARRY: each takes one end, they carry the couch up the stairs together, set it down, sit on it, lean in, heart. ONE CARRIES: she sits on the couch scrolling while he pushes it up the stairs alone (with her on it), slips, keeps going, collapses at the top; she never looks up. FOLLOW: a throw pillow "+ FOLLOW" drops onto the couch arm, she taps it → red "FOLLOWING ✓". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 700, R0 = 300, RH = 180, STW = 400 / 6, LND = G - RH, R1 = R0 + 6 * STW;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stH = Math.sqrt(LEG * LEG - 15 * 15);
        // stepped floor for feet, nose line for the couch
        const footY = (x) => (x < R0 ? G : x >= R0 + 6 * STW - 1 ? LND : G - 30 * (Math.floor((x - R0) / STW) + 1));
        const rampY = (x) => G - RH * clamp((x - (R0 - STW)) / (6 * STW), 0, 1);

        // ---------- beats ----------
        const T_BEND = 0.3, T_LIFT = 0.9, T_GO = 1.3, T_UP = 5.0, T_DOWN = 5.6, T_SIT = 5.9, T_SAT = 6.5, T_LEAN = 6.9, T_HEART = 7.6;
        const T_BGRAB = 0.8, T_SLIP = 4.4, T_BTOP = 8.0, T_DROP = 8.3;
        const T_H2 = 9.6, T_H3 = 10.8;
        const T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
        const CX0 = 225, CX1 = 920, CB0 = 310, CB1 = 930;

        function makePanel(y0, id, warm) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#wallG)" }, inner);
          // wall panels + a window with the moon on the left, the open door of the new place at the top right
          for (let i = 0; i < 9; i++) svgEl("path", { d: `M${70 + i * 140} ${PY0} L${70 + i * 140} ${G}`, stroke: "#1e2028", "stroke-width": 4 }, inner);
          svgEl("rect", { x: 70, y: 200, width: 150, height: 190, fill: "#0b1020", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("circle", { cx: 120, cy: 250, r: 22, fill: "#e8e4d8", opacity: 0.8 }, inner);
          svgEl("path", { d: "M145 200 L145 390 M70 295 L220 295", stroke: "#000", "stroke-width": 6 }, inner);
          const lamp = svgEl("circle", { cx: 1060, cy: 330, r: 220, fill: "url(#lampG)", opacity: warm ? 0.9 : 0.25 }, inner);
          svgEl("rect", { x: 1120, y: LND - 300, width: 113, height: 300, fill: warm ? "#3a2c1c" : "#1c1c20", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("rect", { x: 1132, y: LND - 288, width: 101, height: 288, fill: warm ? "#ffcf7a" : "#3a3a40", opacity: warm ? 0.35 : 0.4 }, inner);
          svgEl("path", { d: `M1060 ${PY0} L1060 280`, stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("path", { d: "M1030 280 L1090 280 L1080 300 L1040 300 Z", fill: warm ? "#ffd890" : "#6a6a6a", stroke: "#000", "stroke-width": 4 }, inner);
          // floor, stairs, landing
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "#1a1714" }, inner);
          let d = `M0 ${G}`;
          for (let i = 0; i < 6; i++) { const x = R0 + i * STW; d += ` L${r1(x)} ${G - 30 * i} L${r1(x)} ${G - 30 * (i + 1)}`; }
          d += ` L${PW} ${LND} L${PW} ${PY1} L0 ${PY1} Z`;
          svgEl("path", { d, fill: "#2a231c", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, inner);
          for (let i = 0; i < 6; i++) { const x = R0 + i * STW; svgEl("path", { d: `M${r1(x)} ${G - 30 * (i + 1) + 3} L${r1(x + STW)} ${G - 30 * (i + 1) + 3}`, stroke: "#5a4a38", "stroke-width": 4 }, inner); }
          // banister
          svgEl("path", { d: `M${R0 - 20} ${G - 200} L${R1} ${LND - 200} L${PW} ${LND - 200}`, fill: "none", stroke: "#000", "stroke-width": 12, "stroke-linecap": "round" }, inner);
          svgEl("path", { d: `M${R0 - 20} ${G - 200} L${R1} ${LND - 200} L${PW} ${LND - 200}`, fill: "none", stroke: "#4a3a2a", "stroke-width": 5, "stroke-linecap": "round" }, inner);
          for (let i = 0; i < 6; i++) { const x = R0 + i * STW + STW / 2; svgEl("path", { d: `M${r1(x)} ${G - 30 * (i + 1)} L${r1(x)} ${r1(G - 200 - (x - R0 + 20) * RH / (R1 - R0 + 20))}`, stroke: "#3a2e22", "stroke-width": 4, opacity: 0.8 }, inner); }
          // moving boxes at the bottom left
          for (const [x, w, h, yy] of [[30, 110, 80, 0], [50, 80, 60, 80]]) {
            svgEl("rect", { x, y: G - h - yy, width: w, height: h, fill: "#6a5236", stroke: "#000", "stroke-width": 5 }, inner);
            svgEl("path", { d: `M${x + w / 2} ${G - h - yy} L${x + w / 2} ${G - h - yy + 20}`, stroke: "#c8b48a", "stroke-width": 6 }, inner);
          }
          const beams = svgEl("g", {}, inner);
          const glow = svgEl("circle", { r: 260, fill: "url(#redGlow)", opacity: 0 }, inner);
          const couch = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, couch, figs, fx, dark, lamp };
        }
        const top = makePanel(412, "T", true);
        const bot = makePanel(1010, "B", false);
        // couch in local coords: (0,0) = bottom centre
        function mkCouch(parent, fill) {
          const g = svgEl("g", {}, parent);
          svgEl("rect", { x: -128, y: -16, width: 12, height: 16, fill: "#2a1e14", stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: 116, y: -16, width: 12, height: 16, fill: "#2a1e14", stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: -124, y: -132, width: 248, height: 84, rx: 16, fill, stroke: "#000", "stroke-width": 6 }, g);
          svgEl("rect", { x: -142, y: -62, width: 284, height: 48, rx: 10, fill, stroke: "#000", "stroke-width": 6 }, g);
          svgEl("rect", { x: -118, y: -76, width: 116, height: 22, rx: 9, fill, stroke: "#000", "stroke-width": 5 }, g);
          svgEl("rect", { x: 2, y: -76, width: 116, height: 22, rx: 9, fill, stroke: "#000", "stroke-width": 5 }, g);
          svgEl("rect", { x: -154, y: -92, width: 36, height: 78, rx: 13, fill, stroke: "#000", "stroke-width": 6 }, g);
          svgEl("rect", { x: 118, y: -92, width: 36, height: 78, rx: 13, fill, stroke: "#000", "stroke-width": 6 }, g);
          svgEl("path", { d: "M-110 -120 L110 -120", stroke: "#fff", "stroke-width": 4, opacity: 0.18 }, g);
          return g;
        }
        const CT = mkCouch(top.couch, "url(#couchT)"), CB = mkCouch(bot.couch, "url(#couchB)");
        // where the couch is: centre x, bottom y, angle (deg), as a function of its centre x and lift
        const couchAt = (cx, lift) => { const yl = rampY(cx - 140), yr = rampY(cx + 140); return { cx, cy: (yl + yr) / 2 - lift, a: (Math.atan2(yr - yl, 280) * 180) / Math.PI }; };
        const toW = (c, lx, ly) => { const r = rad(c.a), co = Math.cos(r), si = Math.sin(r); return [c.cx + lx * co - ly * si, c.cy + lx * si + ly * co]; };

        // FOLLOW pillow
        const pil = svgEl("g", { opacity: 0 }, top.fx);
        const pilB = svgEl("path", { d: "M-78 -44 Q0 -58 78 -44 Q90 0 78 44 Q0 58 -78 44 Q-90 0 -78 -44 Z", fill: "#3a7bd5", stroke: "#000", "stroke-width": 5 }, pil);
        for (const [x, y] of [[-80, -46], [80, -46], [-80, 46], [80, 46]]) svgEl("circle", { cx: x, cy: y, r: 7, fill: "#ffcf7a", stroke: "#000", "stroke-width": 3 }, pil);
        const pilT = svgEl("text", { x: 0, y: 9, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#fff", "text-anchor": "middle" }, pil);
        const minis = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 6 C-13 -2 -9 -13 0 -7 C9 -13 13 -2 0 6 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 2, opacity: 0 }, top.fx));
        const sweat = Array.from({ length: 4 }, () => svgEl("path", { d: "M0 -10 Q6 0 0 6 Q-6 0 0 -10 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));

        // ---------- poses ----------
        const walkPose = (x, f, t, t0, sp = 7.5) => {
          const ph = (t - t0) * sp, ax = x + 22 * Math.sin(ph), bx = x - 22 * Math.sin(ph);
          const ay = footY(ax) - 10 * Math.max(0, Math.cos(ph)), by = footY(bx) - 10 * Math.max(0, -Math.cos(ph));
          return base({ hx: x, hy: Math.min(footY(ax), footY(bx)) - stH + 6, ax, ay, bx, by });
        };
        const stand = (x, f) => { const st = standOn(x, f, footY(x)); st.ay = footY(st.ax); st.by = footY(st.bx); st.hy = Math.min(st.ay, st.by) - stH; return st; };
        // seated on a couch, in couch coords
        const seatPose = (c, lx, f, lean = 0) => { const h = toW(c, lx, -66), a = toW(c, lx + 44 * f, -2), b = toW(c, lx + 30 * f, -2); return base({ hx: h[0], hy: h[1], torso: -4 + c.a * f + lean, head: 4, ax: a[0], ay: a[1], bx: b[0], by: b[1] }); };
        const liftK = (t) => sm(t, T_BEND + 0.2, T_LIFT);
        const topCX = (t) => lerp(CX0, CX1, sm(t, T_GO, T_UP));
        const topC = (t) => couchAt(topCX(t), 72 * liftK(t) * (1 - sm(t, T_UP, T_DOWN)));
        const walking = (t) => t > T_GO && t < T_UP;
        const SITH = -98, SITS = 98;
        function topHim(t) {
          const c = topC(t), x = c.cx - 178;
          let st = walking(t) ? walkPose(x, 1, t, T_GO, 6.6) : stand(x, 1);
          const bend = hold(t, T_BEND, T_LIFT + 0.2, 0.3) + hold(t, T_UP - 0.1, T_DOWN + 0.3, 0.3);
          st.hy += 46 * bend; st.torso += 22 * bend;
          if (t > T_DOWN + 0.2) { const k = sm(t, T_SIT, T_SAT); st = mixPose(st, seatPose(couchAt(CX1, 0), SITH, 1), k); }
          const carry = hold(t, T_BEND, T_DOWN + 0.3, 0.3);
          const pL = toW(c, -136, -92);
          reachTo(st, carry, pL); reachTo(st, carry, [pL[0] + 6, pL[1] + 12], "b");
          const ln = win(t, T_LEAN, T_LEAN + 0.6); st.torso = lerp(st.torso, 16, ln); st.head = lerp(st.head, 14, ln);
          if (t > T_LEAN) reachTo(st, win(t, T_LEAN, T_LEAN + 0.5), toW(couchAt(CX1, 0), SITS - 20, -200), "b");
          return st;
        }
        function topHer(t) {
          const c = topC(t), x = c.cx + 178;
          let st = walking(t) ? walkPose(x, 1, t, T_GO, 6.6) : stand(x, 1);
          const bend = hold(t, T_BEND, T_LIFT + 0.2, 0.3) + hold(t, T_UP - 0.1, T_DOWN + 0.3, 0.3);
          st.hy += 46 * bend; st.torso -= 10 * bend;
          if (t > T_DOWN + 0.2) { const k = sm(t, T_SIT, T_SAT); st = mixPose(st, seatPose(couchAt(CX1, 0), SITS, -1), k); }
          const carry = hold(t, T_BEND, T_DOWN + 0.3, 0.3);
          const pR = toW(c, 136, -92);
          reachTo(st, carry, pR); reachTo(st, carry, [pR[0] - 6, pR[1] + 12], "b");
          const ln = win(t, T_LEAN, T_LEAN + 0.6); st.torso = lerp(st.torso, 18, ln); st.head = lerp(st.head, 20, ln);
          const tap = hold(t, T_TAP - 0.55, T_TAP + 0.4, 0.3); reachTo(st, tap, toW(couchAt(CX1, 0), 168, -150 + 10 * win(t, T_TAP - 0.1, T_TAP)), "a");
          return st;
        }
        // bottom: couch centre by time (with a slip back), on the stairs, no lift
        const KEYS = [[T_BGRAB + 0.6, CB0], [T_SLIP, 600], [T_SLIP + 0.35, 540], [T_SLIP + 1.1, 556], [T_BTOP, CB1]];
        const botCX = (t) => { if (t <= KEYS[0][0]) return CB0; for (let i = 1; i < KEYS.length; i++) if (t <= KEYS[i][0]) { const [a, va] = KEYS[i - 1], [b, vb] = KEYS[i]; const p = (t - a) / (b - a); return lerp(va, vb, i === 2 ? ease(p) : p + (i === 1 || i === 4 ? 0.02 * Math.sin(p * Math.PI * 8) : 0)); } return CB1; };
        const botC = (t) => couchAt(botCX(t), 0);
        const slipK = (t) => hold(t, T_SLIP, T_SLIP + 1.0, 0.25);
        function botHim(t) {
          const c = botC(t), x = c.cx - 188 - 30 * slipK(t);
          const mv = t > T_BGRAB + 0.6 && t < T_BTOP;
          let st = mv ? walkPose(x, 1, t, T_BGRAB, 5.2) : stand(x, 1);
          const push = hold(t, T_BGRAB, T_BTOP + 0.1, 0.3);
          st.torso += 30 * push; st.hy += 22 * push; st.head -= 10 * push;
          st.hy += 50 * slipK(t); st.torso += 10 * slipK(t);
          const pL = toW(c, -140, -86);
          reachTo(st, push, pL); reachTo(st, push, [pL[0] - 4, pL[1] + 16], "b");
          // collapses on the landing, sits with his head down
          const dk = sm(t, T_BTOP + 0.05, T_DROP + 0.4);
          if (dk > 0) { const X = c.cx - 205; st = mixPose(st, base({ hx: X, hy: LND - 34, torso: 32, head: 34, ax: X + 120, ay: LND, bx: X + 96, by: LND - 4, aw: 1, atx: X + 70, aty: LND - 60, bw: 1, btx: X + 60, bty: LND - 52 }), dk); }
          return st;
        }
        function botHer(t) {
          const c = botC(t);
          const st = seatPose(c, 40, 1, 6);
          st.head = 26;
          const h = [st.hx, st.hy];
          reachTo(st, 1, [h[0] + 44, h[1] - 112 + 2 * Math.sin(t * 2)], "b");
          reachTo(st, 1, [h[0] + 50, h[1] - 104], "a");
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH CARRY"; botT.textContent = "ONE CARRIES";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "EACH TAKES ONE END"], [T_UP - 0.6, "STEP BY STEP"], [T_SIT, "THEN THEY SIT DOWN", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE CARRIES IT"], [2.6, "SHE SITS ON IT", "#ff3b30"], [T_SLIP + 0.2, "SCROLLING", "#ff3b30"], [T_DROP, "HE CAN'T GO ON", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [860, 440], CS = [640, 1010], ZK = 1.2;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const PIL0 = [1000, PY0 - 80];

        function render(t) {
          // ---- top
          const c = topC(t);
          CT.setAttribute("transform", `translate(${r1(c.cx)} ${r1(c.cy)}) rotate(${c.a.toFixed(2)})`);
          drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          const hf = t > T_SIT + 0.3 ? -1 : 1;
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), hf);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const fc = couchAt(CX1, 0), gc = toW(fc, 0, -150);
          top.glow.setAttribute("cx", r1(gc[0])); top.glow.setAttribute("cy", r1(gc[1])); top.glow.setAttribute("opacity", (0.55 * win(t, T_LEAN, T_LEAN + 0.8)).toFixed(3));
          redSpot.setAttribute("points", `${CX1 - 60},${PY0} ${CX1 + 60},${PY0} ${CX1 + 260},${LND} ${CX1 - 260},${LND}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${CX1} ${r1(LND - 330 - 10 * hq)}) scale(${(backOut(hq) * 1.5).toFixed(3)})`);
          // FOLLOW pillow: drops in, bounces onto the right arm of the couch
          const PILP = toW(fc, 176, -150);
          const lq = clamp((t - T_TAG) / 0.9, 0, 1), popped = t > T_TAP;
          const bounce = lq < 1 ? 0 : 26 * Math.exp(-(t - T_TAG - 0.9) * 6) * Math.abs(Math.sin((t - T_TAG - 0.9) * 14));
          const py = lerp(PIL0[1], PILP[1], lq * lq) - bounce, px = lerp(PIL0[0], PILP[0], lq);
          const pk = popped ? 1 + 0.14 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1;
          pil.setAttribute("opacity", sm(t, T_TAG, T_TAG + 0.2).toFixed(3));
          pil.setAttribute("transform", `translate(${r1(px)} ${r1(py)}) rotate(${r1(-14 * (1 - lq) + 4 * Math.sin(t * 2) * (popped ? 0 : 0.3) - 6)}) scale(${pk.toFixed(3)})`);
          pilB.setAttribute("fill", popped ? "#ff3b30" : "#3a7bd5");
          pilT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; pilT.setAttribute("font-size", popped ? 19 : 24);
          minis.forEach((h, i) => { const q = clamp((t - T_TAP) / 1.3, 0, 1), a = (i / 12) * Math.PI * 2; h.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(PILP[0] + Math.cos(a) * 170 * Math.sqrt(q))} ${r1(PILP[1] + Math.sin(a) * 110 * Math.sqrt(q) - 40 * q)}) scale(${(1 - 0.4 * q).toFixed(3)})`); });
          const cm = cam(t);
          top.g.setAttribute("transform", `translate(${r1(cm.ox)} ${r1(cm.oy)}) scale(${cm.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const b = botC(t);
          CB.setAttribute("transform", `translate(${r1(b.cx)} ${r1(b.cy)}) rotate(${b.a.toFixed(2)})`);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const mp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)}) rotate(${r1(b.a)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          sweat.forEach((s, i) => { const tt = ((t - 2.0) * 0.9 + i * 0.25) % 1; const on = t > 2.0 && t < T_DROP + 2.5; s.setAttribute("opacity", on ? (0.9 * (1 - tt)).toFixed(3) : 0); s.setAttribute("transform", `translate(${r1(mp.head[0] + (i % 2 ? 30 : -24) + 20 * tt * (i % 2 ? 1 : -1))} ${r1(mp.head[1] - 20 + 50 * tt * tt)})`); });
          bot.dark.setAttribute("opacity", (0.34 * win(t, T_DROP, T_DROP + 1.8)).toFixed(3));
          bot.lamp.setAttribute("opacity", (0.25 * (1 - 0.6 * win(t, T_DROP, T_DROP + 1.5))).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE CARRIED IT ALL THE WAY UP.", L3 = "SHE NEVER EVEN GOT UP.";
          E("head").innerHTML = `<div>LOVE IS A COUCH. #31</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #32 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TAP - 0.5) * 28)));
          fade.style.opacity = win(t, DUR - 0.35, DUR - 0.02).toFixed(3);
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
