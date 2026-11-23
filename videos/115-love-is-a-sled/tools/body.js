        // ---------- "love is a sled. #27": winner split-screen format. Snow, a hill. BOTH PULL: side by side they pull the sled up the hill, sit on it together and fly down, laughing, heart. ONE PULLS: she sits on the sled scrolling, he pulls her up alone (slow, sweat); at the top she slides down without him; he stands on the hill with the rope; at the bottom she walks away. FOLLOW: a big snowball rolls down to them "+ FOLLOW", he taps it → "FOLLOWING ✓" + snowflakes. ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, HX0 = 200, HX1 = 900, HH = 250;
        const gy = (x) => (x < HX0 ? G : x < HX1 ? G - ((x - HX0) / (HX1 - HX0)) * HH : G - HH);
        const ANG = Math.atan2(HH, HX1 - HX0) * 180 / Math.PI;
        const angAt = (x) => (x > HX0 && x < HX1 ? -ANG : 0);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const LEGH = Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_UP = 4.4, T_SIT = 5.0, T_GO = 5.6, T_DOWN = 7.0, T_HEART = 7.3;
        const T_TIRED = 4.2, T_LET = 6.2, T_DN = 7.6, T_STAND = 7.9, T_GONE = 9.6;
        const T_H2 = 9.6, T_H3 = 10.8;
        const T_CTA = 12.6, T_TAG = 13.0, T_TAP = 14.9;
        const STR = 100;
        const topX = (t) => lerp(250, 1010, sm(t, 0.4, T_UP));
        const topSled = (t) => (t < T_GO ? topX(Math.min(t, T_UP)) - 115 : lerp(895, 170, sm(t, T_GO, T_DOWN)));
        const botX = (t) => lerp(250, 1010, sm(t, 0.4, T_LET - 0.2));
        const botSled = (t) => (t < T_LET ? botX(t) - 120 : lerp(890, 170, sm(t, T_LET + 0.1, T_DN)));
        const herWalkX = (t) => lerp(170, -200, sm(t, T_STAND + 0.2, T_GONE));
        function gaitFoot(q, bx, lift = 12) { q = frac(q); let x, l = 0; if (q < 0.5) x = bx + STR * (0.25 - q); else { const ss = (q - 0.5) / 0.5; x = bx + STR * (-0.25 + 0.5 * ease(ss)); l = Math.sin(Math.PI * ss) * lift; } return [x, gy(x) - l]; }
        const walkOn = (x, x0, lean = 0) => { const p = (x - x0) / STR, f1 = gaitFoot(p, x), f2 = gaitFoot(p + 0.5, x); const hy = Math.min(f1[1], f2[1], gy(x)) - LEGH + 6; return base({ hx: x, hy, torso: 6 + lean, head: -2, ax: f1[0], ay: f1[1], bx: f2[0], by: f2[1] }); };
        const sitOn = (x, f) => { const y = gy(x); return base({ hx: x, hy: y - 62, torso: 4, head: 0, ax: x + 74 * f, ay: y - 22, bx: x + 62 * f, by: y - 16 }); };

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [350, 850]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
          svgEl("path", { d: `M0 ${G} L${HX0} ${G} L${HX1} ${G - HH} L${PW} ${G - HH} L${PW} ${PY1} L0 ${PY1} Z`, fill: "url(#snowG)" }, inner);
          svgEl("path", { d: `M0 ${G} L${HX0} ${G} L${HX1} ${G - HH} L${PW} ${G - HH}`, fill: "none", stroke: "#f0f3f8", "stroke-width": 5 }, inner);
          for (const [tx, s] of [[1000, 1], [1150, 0.8], [60, 0.9]]) { const ty = gy(tx); svgEl("path", { d: `M${tx} ${ty} l0 -20 M${tx - 40 * s} ${ty - 20} L${tx} ${ty - 140 * s} L${tx + 40 * s} ${ty - 20} Z`, fill: "#2a4a3a", stroke: "#000", "stroke-width": 4 }, inner); }
          const glow = svgEl("circle", { r: 300, fill: "url(#redGlow)", opacity: 0 }, inner);
          const rope = svgEl("path", { fill: "none", stroke: "#c8a060", "stroke-width": 4 }, inner);
          const sled = svgEl("g", {}, inner);
          const sledB = svgEl("g", {}, sled);
          svgEl("path", { d: "M-62 0 L54 0 Q78 0 78 -22", fill: "none", stroke: "#000", "stroke-width": 9, "stroke-linecap": "round" }, sledB);
          svgEl("path", { d: "M-62 0 L54 0 Q78 0 78 -22", fill: "none", stroke: "#bbb", "stroke-width": 4, "stroke-linecap": "round" }, sledB);
          for (const dx of [-40, 30]) svgEl("rect", { x: dx - 3, y: -16, width: 6, height: 16, fill: "#5a3a22", stroke: "#000", "stroke-width": 2 }, sledB);
          const sledTop = svgEl("rect", { x: -62, y: -26, width: 124, height: 14, rx: 4, stroke: "#000", "stroke-width": 4 }, sledB);
          const figs = svgEl("g", {}, inner);
          const flakes = svgEl("path", { fill: "#e8eef7", stroke: "none", opacity: 0.85 }, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, rope, sled, sledB, sledTop, figs, flakes, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        top.sledTop.setAttribute("fill", "#ff3b30"); bot.sledTop.setAttribute("fill", "#8a5a5a");

        // ---------- flakes ----------
        const FL8 = Array.from({ length: 50 }, (_, i) => ({ x: (i * 197.3 + 41 * (i % 5)) % PW, o: (i * 0.618) % 1, v: 0.12 + 0.06 * ((i * 7) % 5) / 5, r: 3 + (i % 3) }));
        function drawFlakes(P2, t) { let d = ""; for (const f of FL8) { const q = frac(f.o + t * f.v), y = PY0 - 10 + q * (G - PY0 + 10), x = f.x + 18 * Math.sin(t * 1.3 + f.o * 20); d += `M${r1(x - f.r)} ${r1(y)} a${f.r} ${f.r} 0 1 0 ${2 * f.r} 0 a${f.r} ${f.r} 0 1 0 ${-2 * f.r} 0`; } P2.flakes.setAttribute("d", d); }

        // ---------- poses ----------
        const sitK = (t) => win(t, T_SIT - 0.1, T_GO - 0.1);
        function topHer(t) {
          if (t < T_SIT) { const x = topX(t), st = walkOn(x, 250, 16); reachTo(st, 1, [x - 34, st.hy + 10]); reachTo(st, 1, [x - 40, st.hy + 16], "b"); st.head = -6; return st; }
          const sx = topSled(t), st = mixPose(base({ ...walkOn(topX(T_SIT), 250), hx: topX(T_SIT) }), sitOn(sx - 26, -1), sitK(t));
          const ride = t > T_GO && t < T_DOWN; reachTo(st, ride ? 1 : 0, [sx - 60, gy(sx) - 120], "b"); reachTo(st, ride ? 1 : 0, [sx - 70, gy(sx) - 130]);
          st.head = lerp(-4, -16, win(t, T_GO, T_GO + 0.4));
          const tap = hold(t, T_TAP - 0.5, T_TAP + 0.4, 0.3); reachTo(st, tap, [262, G - 70]);
          return st;
        }
        function topHim(t) {
          if (t < T_SIT) { const x = topX(t) + 50, st = walkOn(x, 300, 16); reachTo(st, 1, [x - 40, st.hy + 10]); reachTo(st, 1, [x - 46, st.hy + 16], "b"); st.head = -6; return st; }
          const sx = topSled(t), st = mixPose(base({ ...walkOn(topX(T_SIT) + 50, 300), hx: topX(T_SIT) + 50 }), sitOn(sx + 28, -1), sitK(t));
          reachTo(st, sitK(t), [sx - 4, gy(sx) - 100]); reachTo(st, sitK(t), [sx - 10, gy(sx) - 96], "b");
          st.head = lerp(-4, -16, win(t, T_GO, T_GO + 0.4));
          return st;
        }
        function botHim(t) {
          const x = botX(t) + 10, tired = win(t, T_TIRED, T_TIRED + 0.4);
          const st = walkOn(x, 260, 22 + 8 * tired); reachTo(st, 1 - win(t, T_LET, T_LET + 0.3), [x - 40, st.hy + 10]); reachTo(st, 1 - win(t, T_LET, T_LET + 0.3), [x - 46, st.hy + 16], "b");
          st.head = lerp(-2, 10, tired);
          if (t > T_LET) { const s2 = standOn(x, -1, gy(x)); s2.head = lerp(-10, 24, win(t, T_DN - 0.6, T_DN)); return mixPose(st, s2, win(t, T_LET, T_LET + 0.4)); }
          return st;
        }
        function botHer(t) {
          if (t < T_STAND) { const sx = botSled(t), f = t < T_LET ? 1 : -1; const st = sitOn(sx + (f > 0 ? -10 : -20), f); st.head = 26; st.torso = 6; reachTo(st, 1, [st.hx + 40 * f, st.hy - 110], "b"); reachTo(st, 1, [st.hx + 46 * f, st.hy - 106]); return st; }
          const x = herWalkX(t), st = walkOn(x, 170, 0); st.head = 24; reachTo(st, 1, [x - 40, st.hy - 110], "b"); reachTo(st, 1, [x - 46, st.hy - 106]); return mixPose(sitOn(150, -1), st, win(t, T_STAND, T_STAND + 0.3));
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const spray = Array.from({ length: 8 }, () => svgEl("circle", { r: 6, fill: "#f0f4fa", opacity: 0 }, top.fx));
        const sprayB = Array.from({ length: 8 }, () => svgEl("circle", { r: 6, fill: "#c8ccd4", opacity: 0 }, bot.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);
        const ball = svgEl("g", { opacity: 0 }, top.fx);
        svgEl("circle", { r: 58, fill: "#f4f6fa", stroke: "#000", "stroke-width": 5 }, ball);
        const ballR = svgEl("rect", { x: -54, y: -16, width: 108, height: 32, rx: 16, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, ball);
        const ballT = svgEl("text", { x: 0, y: 6, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#fff", "text-anchor": "middle" }, ball);
        const puff = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 -10 L0 10 M-10 0 L10 0 M-7 -7 L7 7 M-7 7 L7 -7", fill: "none", stroke: "#e8f2ff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH PULL"; botT.textContent = "ONE PULLS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "SIDE BY SIDE"], [T_UP, "ON TOP TOGETHER"], [T_GO, "DOWN TOGETHER", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE PULLS"], [1.5, "SHE SCROLLS", "#ff3b30"], [T_TIRED, "HE'S EXHAUSTED", "#ff3b30"], [T_LET, "SHE RIDES DOWN ALONE", "#ff3b30"], [T_STAND, "AND WALKS AWAY", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [420, G - 150], CS = [540, 1000], ZK = 1.2;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const placeSled = (P2, sx, flip) => { P2.sled.setAttribute("transform", `translate(${r1(sx)} ${r1(gy(sx))}) rotate(${r1(angAt(sx))})`); P2.sledB.setAttribute("transform", `scale(${flip} 1)`); };
        const ballX = (t) => lerp(1120, 300, sm(t, T_TAG, T_TAG + 1.4));

        function render(t) {
          // ---- top
          const sxT = topSled(t);
          placeSled(top, sxT, t < T_SIT ? 1 : -1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), t < T_SIT ? 1 : -1);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), t < T_SIT ? 1 : -1);
          const hf = t < T_SIT ? 1 : -1;
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          top.rope.setAttribute("d", t < T_SIT ? `M${r1(sxT + 74)} ${r1(gy(sxT) - 24)} L${r1(hp.hands[1][0])} ${r1(hp.hands[1][1])} M${r1(sxT + 74)} ${r1(gy(sxT) - 24)} L${r1(mp.hands[1][0])} ${r1(mp.hands[1][1])}` : "");
          drawFlakes(top, t);
          const rideT = t > T_GO && t < T_DOWN + 0.3;
          spray.forEach((c, i) => { const q = frac(t * 3 + i / 8); c.setAttribute("cx", r1(sxT + 60 + 50 * q)); c.setAttribute("cy", r1(gy(sxT) - 20 * q - 4 * i % 20)); c.setAttribute("opacity", rideT ? (0.8 * (1 - q)).toFixed(3) : 0); });
          top.glow.setAttribute("cx", 230); top.glow.setAttribute("cy", G - 160); top.glow.setAttribute("opacity", (0.5 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `170,${PY0} 290,${PY0} 470,${G} -10,${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(175 ${r1(G - 330 - 10 * hq)}) scale(${(backOut(hq) * 1.5).toFixed(3)})`);
          // FOLLOW snowball
          const popped = t > T_TAP, bx = ballX(t), roll = (1120 - bx) / 58 * 57.3;
          ball.setAttribute("opacity", t > T_TAG ? 1 : 0);
          ball.setAttribute("transform", `translate(${r1(bx)} ${r1(gy(bx) - 58)}) scale(${(popped ? 1.1 + 0.12 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1).toFixed(3)})`);
          ballR.setAttribute("transform", `rotate(${r1(t < T_TAG + 1.4 ? -roll % 360 : 0)})`); ballT.setAttribute("transform", ballR.getAttribute("transform"));
          ballR.setAttribute("fill", popped ? "#ffffff" : "#ff3b30"); ballT.setAttribute("fill", popped ? "#000" : "#fff"); ballT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; ballT.setAttribute("font-size", popped ? 12 : 16);
          puff.forEach((s, i) => { const q = clamp((t - T_TAP - 0.1) / 1.2, 0, 1), a = (i / 12) * Math.PI * 2; s.setAttribute("opacity", popped && q > 0 && q < 1 ? (1 - q).toFixed(3) : 0); s.setAttribute("transform", `translate(${r1(300 + Math.cos(a) * 220 * Math.sqrt(q))} ${r1(G - 58 + Math.sin(a) * 160 * Math.sqrt(q))}) rotate(${r1(90 * q)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const sxB = botSled(t);
          placeSled(bot, sxB, t < T_LET ? 1 : -1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), t < T_LET ? 1 : -1);
          const bf = t < T_LET ? 1 : -1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), bf);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * bf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const rh = bp.hands[1];
          bot.rope.setAttribute("d", t < T_LET ? `M${r1(sxB + 74)} ${r1(gy(sxB) - 24)} L${r1(rh[0])} ${r1(rh[1])}` : `M${r1(bp.hands[0][0])} ${r1(bp.hands[0][1])} Q${r1(bp.hands[0][0] - 30)} ${r1(gy(bp.hands[0][0]) - 4)} ${r1(bp.hands[0][0] - 80)} ${r1(gy(bp.hands[0][0] - 80) - 2)}`);
          drawFlakes(bot, t + 3);
          const rideB = t > T_LET + 0.1 && t < T_DN + 0.2;
          sprayB.forEach((c2, i) => { const q = frac(t * 3 + i / 8); c2.setAttribute("cx", r1(sxB + 60 + 50 * q)); c2.setAttribute("cy", r1(gy(sxB) - 20 * q)); c2.setAttribute("opacity", rideB ? (0.7 * (1 - q)).toFixed(3) : 0); });
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 6); e.setAttribute("transform", `translate(${r1(bp.head[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(bp.head[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_TIRED, T_DN, 0.4) * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_STAND, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE PULLED HER UP THE HILL.", L3 = "SHE RODE DOWN WITHOUT HIM.";
          E("head").innerHTML = `<div>LOVE IS A SLED. #27</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #28 TOMORROW";
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
