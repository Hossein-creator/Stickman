        // ---------- "love is a snowman. #24": winner split-screen format. Snow. BOTH BUILD: she rolls the base, he lifts the middle, she puts the head on, he gives it a nose, she wraps her red scarf on it; it smiles back, heart. ONE BUILDS: he rolls alone (slow, small), stacks a lopsided middle alone, holds the carrot out to her, she scrolls; the sun comes out and it melts into a puddle, the carrot drops. FOLLOW: a red "+ FOLLOW" button appears on the snowman's belly, she presses it → "FOLLOWING ✓", the snowman waves its twig arm. ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, SX0 = 615;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_LIFT = 6.6, T_HEART = 7.2, T_TIRED = 4.6, T_LET = 6.0, T_GONE = 8.4;
        const T_H2 = 9.0, T_H3 = 10.2;
        const T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
        // top snowman
        const TR = [70, 52, 36];
        const TY = [G - 70, G - 70 - 70 - 52 + 10, G - 70 - 70 - 52 + 10 - 52 - 36 + 8];
        function topBall(i, t) {
          if (i === 0) { const q = sm(t, 0.4, 1.9); return [lerp(330, SX0, q), G - lerp(22, TR[0], q), lerp(22, TR[0], q), t > 0.35 ? 1 : 0, q]; }
          if (i === 1) { const q = sm(t, 2.0, 3.2); return [lerp(790, SX0, q), lerp(G - 105, TY[1], q) - 25 * Math.sin(Math.PI * q), TR[1], t > 1.9 ? 1 : 0, q]; }
          const q = sm(t, 3.4, 4.6); return [lerp(440, SX0, q), lerp(G - 110, TY[2], q) - 30 * Math.sin(Math.PI * q), TR[2], t > 3.3 ? 1 : 0, q];
        }
        // bottom snowman (he alone): smaller, slower, lopsided; melts after T_LET
        const BR = [58, 40];
        const melt = (t) => sm(t, T_LET, T_GONE);
        function botBall(i, t) {
          const m = melt(t);
          if (i === 0) { const q = sm(t, 0.4, 2.7); const r = lerp(22, BR[0], q); return [lerp(930, SX0, q), G - r * (1 - 0.8 * m), r * (1 + 0.5 * m), r * (1 - 0.8 * m), t > 0.35 ? 1 : 0, q]; }
          const q = sm(t, 3.0, 4.2); const by = G - 2 * BR[0] * (1 - 0.8 * m);
          const r = BR[1] * (1 - 0.7 * m);
          return [lerp(780, SX0 + 14 + 30 * m, q), q < 1 ? lerp(G - 105, G - 2 * BR[0] - BR[1] + 8, q) - 25 * Math.sin(Math.PI * q) : by - r + 6, r * (1 + 0.3 * m), r, t > 2.9 ? 1 : 0, q];
        }
        const herTX = (t) => lerp(240, 480, sm(t, 0.4, 1.9));
        const himBX = (t) => lerp(1010, 745, sm(t, 0.4, 2.7));

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [480, 750]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.18 }, beams);
          const sun = svgEl("circle", { cx: 1080, cy: 200, r: 420, fill: "url(#sunGlow)", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#snowG)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#f0f3f8", "stroke-width": 4 }, inner);
          const puddle = svgEl("ellipse", { cx: SX0, cy: G + 8, rx: 0, ry: 12, fill: "#4a5a70", stroke: "#000", "stroke-width": 3, opacity: 0 }, inner);
          const glow = svgEl("circle", { r: 300, fill: "url(#redGlow)", opacity: 0 }, inner);
          const man = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const flakes = svgEl("path", { fill: "#e8eef7", stroke: "none", opacity: 0.85 }, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, sun, puddle, glow, man, figs, flakes, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const mkBall = (P2, col) => svgEl("ellipse", { fill: col, stroke: "#000", "stroke-width": 5 }, P2.man);
        // twig arms (behind the balls) then balls
        const armT = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, top.man);
        const armTw = svgEl("path", { fill: "none", stroke: "#8a5a32", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, top.man);
        const TB = [mkBall(top, "#f4f6fa"), mkBall(top, "#f4f6fa"), mkBall(top, "#f4f6fa")];
        const BB = [mkBall(bot, "#b9bcc2"), mkBall(bot, "#b9bcc2")];
        const face = svgEl("g", { opacity: 0 }, top.man);
        svgEl("circle", { cx: -12, cy: -8, r: 5, fill: "#111" }, face); svgEl("circle", { cx: 12, cy: -8, r: 5, fill: "#111" }, face);
        const smile = svgEl("path", { fill: "none", stroke: "#111", "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": "1 8" }, face);
        const noseT = svgEl("path", { d: "M0 -6 L34 0 L0 6 Z", fill: "#ff8a1f", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.man);
        const scarf = svgEl("g", { opacity: 0 }, top.man);
        svgEl("rect", { x: -40, y: -9, width: 80, height: 18, rx: 8, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, scarf);
        const scarfTail = svgEl("path", { fill: "#ff3b30", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, scarf);
        const coal = [0, 1].map(() => svgEl("circle", { r: 6, fill: "#111" }, top.man));
        const noseB = svgEl("path", { d: "M0 -6 L34 0 L0 6 Z", fill: "#b06a30", stroke: "#000", "stroke-width": 3 }, bot.fx);
        const btn = svgEl("g", { opacity: 0 }, top.man);
        const btnR = svgEl("rect", { x: -82, y: -22, width: 164, height: 44, rx: 22, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, btn);
        const btnT = svgEl("text", { x: 0, y: 9, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#fff", "text-anchor": "middle" }, btn);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);
        const sparks = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 -10 L0 10 M-10 0 L10 0 M-7 -7 L7 7 M-7 7 L7 -7", fill: "none", stroke: "#e8f2ff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, top.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const drips = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));

        // ---------- flakes ----------
        const NF = 60;
        const FL8 = Array.from({ length: NF }, (_, i) => ({ x: (i * 197.3 + 41 * (i % 5)) % PW, o: (i * 0.618) % 1, v: 0.12 + 0.06 * ((i * 7) % 5) / 5, r: 3 + (i % 3) }));
        function drawFlakes(P2, t, amt) {
          let d = "";
          if (amt > 0.01) for (const f of FL8) {
            if (frac(f.o * 13) > amt) continue;
            const q = frac(f.o + t * f.v), y = PY0 - 10 + q * (G - PY0 + 10), x = f.x + 18 * Math.sin(t * 1.3 + f.o * 20);
            d += `M${r1(x - f.r)} ${r1(y)} a${f.r} ${f.r} 0 1 0 ${2 * f.r} 0 a${f.r} ${f.r} 0 1 0 ${-2 * f.r} 0`;
          }
          P2.flakes.setAttribute("d", d);
        }

        // ---------- poses ----------
        const walkLegs = (st, x, t, k) => { const ph = t * 8; st.ax = x + 22 * Math.sin(ph) * k; st.bx = x - 22 * Math.sin(ph) * k; st.ay = G - 10 * Math.max(0, Math.cos(ph)) * k; st.by = G - 10 * Math.max(0, -Math.cos(ph)) * k; };
        function topHer(t) {
          const x = herTX(t), st = standOn(x, 1, G);
          const roll = hold(t, 0.35, 2.0, 0.15);
          walkLegs(st, x, t, roll); st.torso = 3 + 22 * roll;
          const b0 = topBall(0, t); reachTo(st, roll, [b0[0] - b0[2] + 4, b0[1] - 6]); reachTo(st, roll, [b0[0] - b0[2] + 8, b0[1] + 10], "b");
          const lift = hold(t, 3.3, 4.7, 0.15), b2 = topBall(2, t); reachTo(st, lift, [b2[0] - b2[2] + 6, b2[1]]); reachTo(st, lift, [b2[0] - b2[2] + 10, b2[1] + 14], "b");
          const wrap = hold(t, 5.5, 6.3, 0.2); reachTo(st, wrap, [SX0 - 30, TY[1] - TR[1] + 2]);
          const tap = hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [SX0 - 60, TY[1] + 8]);
          st.head = lerp(0, -12, win(t, T_LIFT, T_LIFT + 0.5)) + 8 * win(t, T_HEART, T_HEART + 0.4);
          return st;
        }
        function topHim(t) {
          const st = standOn(760, -1, G);
          const lift = hold(t, 1.9, 3.3, 0.15), b1 = topBall(1, t);
          st.torso = 3 + 10 * lift;
          reachTo(st, lift, [b1[0] + b1[2] - 6, b1[1]]); reachTo(st, lift, [b1[0] + b1[2] - 10, b1[1] + 16], "b");
          const nose = hold(t, 4.9, 5.7, 0.2); reachTo(st, nose, [SX0 + 50, TY[2] + 6]);
          st.head = lerp(0, -12, win(t, T_LIFT, T_LIFT + 0.5)) + 8 * win(t, T_HEART, T_HEART + 0.4);
          return st;
        }
        function botHim(t) {
          const x = himBX(t), st = standOn(x, -1, G);
          const roll = hold(t, 0.35, 2.8, 0.15);
          walkLegs(st, x, t * 0.7, roll); st.torso = 3 + 24 * roll;
          const b0 = botBall(0, t); reachTo(st, roll, [b0[0] + b0[2] - 4, b0[1] - 6]); reachTo(st, roll, [b0[0] + b0[2] - 8, b0[1] + 10], "b");
          const lift = hold(t, 2.9, 4.3, 0.15), b1 = botBall(1, t); reachTo(st, lift, [b1[0] + b1[2] - 6, b1[1]]); reachTo(st, lift, [b1[0] + b1[2] - 10, b1[1] + 14], "b");
          const offer = hold(t, T_TIRED, T_LET + 1.0, 0.3); reachTo(st, offer, [x - 110, stY - 70]); st.head = lerp(st.head, -6, offer);
          const ko = win(t, T_LET + 1.0, T_LET + 1.6); st.torso = lerp(st.torso, 18, ko); st.head = lerp(st.head, 24, ko);
          return st;
        }
        function botHer(t) {
          const st = standOn(420, 1, G); st.head = 26 + 2 * Math.sin(t * 1.3); st.torso = 6;
          reachTo(st, 1, [460, stY - 120], "b");
          reachTo(st, 1, [466, stY - 116]);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BUILD"; botT.textContent = "ONE BUILDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "SHE ROLLS, HE LIFTS"], [3.4, "IT GROWS"], [T_LIFT, "IT SMILES BACK", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE ROLLS"], [1.5, "SHE SCROLLS", "#ff3b30"], [3.0, "HE STACKS IT ALONE"], [T_TIRED, "HE WAITS FOR HER", "#ff3b30"], [T_LET, "IT MELTS", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [615, G - 280], CS = [540, 1000], ZK = 1.25;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const setE = (e, x, y, rx, ry, op) => { e.setAttribute("cx", r1(x)); e.setAttribute("cy", r1(y)); e.setAttribute("rx", r1(Math.max(0.1, rx))); e.setAttribute("ry", r1(Math.max(0.1, ry))); e.setAttribute("opacity", op); };

        function render(t) {
          // ---- top
          for (let i = 0; i < 3; i++) { const b = topBall(i, t); setE(TB[i], b[0], b[1], b[2], b[2], b[3]); }
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          drawFlakes(top, t, 1);
          const nq = sm(t, 5.2, 5.6);
          noseT.setAttribute("opacity", t > 4.95 ? 1 : 0);
          const np = t < 5.2 ? [mp.hands[0][0] - 30, mp.hands[0][1]] : [lerp(mp.hands[0][0] - 30, SX0 + 6, nq), lerp(mp.hands[0][1], TY[2] + 6, nq)];
          noseT.setAttribute("transform", `translate(${r1(np[0])} ${r1(np[1])})`);
          scarf.setAttribute("opacity", sm(t, 5.6, 6.0).toFixed(3));
          scarf.setAttribute("transform", `translate(${SX0} ${TY[1] - TR[1] + 4})`);
          const fl = 6 * Math.sin(t * 4);
          scarfTail.setAttribute("d", `M18 4 L${r1(30 + fl)} 48 L${r1(48 + fl)} 44 L34 2 Z`);
          coal.forEach((c, i) => { c.setAttribute("cx", SX0); c.setAttribute("cy", TY[1] + 4 + i * 26); c.setAttribute("opacity", t > 3.2 ? (t > T_TAG ? 0 : 1) : 0); });
          face.setAttribute("opacity", sm(t, T_LIFT - 0.2, T_LIFT + 0.2).toFixed(3));
          face.setAttribute("transform", `translate(${SX0} ${TY[2]})`);
          smile.setAttribute("d", `M-14 12 Q0 ${r1(12 + 10 * sm(t, T_LIFT, T_LIFT + 0.5))} 14 12`);
          const wave = t > T_TAP ? Math.sin((t - T_TAP) * 9) * 18 : 0;
          const ax = SX0 + TR[1] - 4, ay = TY[1] - 6;
          armT.setAttribute("d", `M${SX0 - TR[1] + 4} ${ay} L${SX0 - TR[1] - 50} ${ay - 30} M${SX0 - TR[1] - 34} ${ay - 22} l-6 -22 M${ax} ${ay} L${r1(ax + 56)} ${r1(ay - 30 - wave)} M${r1(ax + 38)} ${r1(ay - 20 - wave * 0.66)} l10 -20`);
          armTw.setAttribute("d", armT.getAttribute("d"));
          const ao = sm(t, T_LIFT - 0.2, T_LIFT + 0.2).toFixed(3); armT.setAttribute("opacity", ao); armTw.setAttribute("opacity", ao);
          top.glow.setAttribute("cx", SX0); top.glow.setAttribute("cy", TY[1]); top.glow.setAttribute("opacity", (0.5 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `${SX0 - 60},${PY0} ${SX0 + 60},${PY0} ${SX0 + 260},${G} ${SX0 - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${SX0} ${r1(TY[2] - 70 - 20 * hq)}) scale(${(backOut(hq) * 1.6).toFixed(3)})`);
          // FOLLOW button on the belly
          const popped = t > T_TAP;
          btn.setAttribute("opacity", t > T_TAG ? 1 : 0);
          const press = popped ? 1 - 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : backOut(sm(t, T_TAG, T_TAG + 0.4));
          btn.setAttribute("transform", `translate(${SX0} ${TY[1] + 16}) scale(${press.toFixed(3)})`);
          btnR.setAttribute("fill", popped ? "#ffffff" : "#ff3b30"); btnT.setAttribute("fill", popped ? "#000" : "#fff");
          btnT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; btnT.setAttribute("font-size", popped ? 20 : 24);
          sparks.forEach((s, i) => { const q = clamp((t - T_TAP) / 1.2, 0, 1), a = (i / 12) * Math.PI * 2; s.setAttribute("opacity", popped && q < 1 ? (1 - q).toFixed(3) : 0); s.setAttribute("transform", `translate(${r1(SX0 + Math.cos(a) * 260 * Math.sqrt(q))} ${r1(TY[1] + Math.sin(a) * 200 * Math.sqrt(q))}) rotate(${r1(90 * q)}) scale(${(1 - 0.4 * q).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          for (let i = 0; i < 2; i++) { const b = botBall(i, t); setE(BB[i], b[0], b[1], b[2], b[3], b[4]); }
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          drawFlakes(bot, t + 3, 0.5 * (1 - sm(t, T_LET - 0.6, T_LET)));
          const m = melt(t);
          bot.sun.setAttribute("opacity", sm(t, T_LET - 0.6, T_LET + 0.6).toFixed(3));
          bot.puddle.setAttribute("rx", r1(40 + 130 * m)); bot.puddle.setAttribute("opacity", (0.8 * sm(t, T_LET, T_LET + 0.6)).toFixed(3));
          // carrot: in his hand, offered, then dropped
          const hand = bp.hands[0], dq = sm(t, T_LET + 1.1, T_LET + 1.6);
          const cp = [lerp(hand[0] - 30, hand[0] - 40, dq), lerp(hand[1], G - 4, dq * dq)];
          noseB.setAttribute("transform", `translate(${r1(cp[0])} ${r1(cp[1])}) rotate(${r1(180 + 80 * dq)})`);
          noseB.setAttribute("opacity", t > 4.2 ? 1 : 0);
          drips.forEach((e, i) => { const q = frac(t * 1.5 + i / 8), b0 = botBall(0, t); e.setAttribute("transform", `translate(${r1(b0[0] + (i - 3.5) * 14)} ${r1(b0[1] + 20 * q)})`); e.setAttribute("opacity", (hold(t, T_LET, T_GONE + 0.6, 0.3) * (1 - q)).toFixed(3)); });
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_GONE - 0.5, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE BUILT IT ALONE.", L3 = "SHE WATCHED IT MELT.";
          E("head").innerHTML = `<div>LOVE IS A SNOWMAN. #24</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #25 TOMORROW";
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
