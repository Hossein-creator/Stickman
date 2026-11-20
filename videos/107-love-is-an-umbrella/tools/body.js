        // ---------- "love is an umbrella. #23": winner split-screen format. Rain. BOTH HOLD: one umbrella, both hands on the handle, both stay dry, then the rain stops and the canopy glows. ONE HOLDS: he holds it tilted over her, he stands in the rain and gets soaked and starts to shake, she scrolls and never looks up, then walks away dry; he still holds it over nobody. FOLLOW: a "+ FOLLOW" tag hangs from the rim, he taps it, hearts burst off the canopy: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 720, HER = 520, HIM = 710, HERB = 470, HIMB = 720;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_LIFT = 6.6, T_HEART = 7.2, T_TIRED = 4.6, T_LET = 6.0, T_GONE = 8.2;
        const T_H2 = 9.0, T_H3 = 10.2;
        const T_CTA = 12.6, T_TAG = 13.4, T_TAP = 15.0;
        // umbrellas: top straight up between them, bottom tilted over her from his hand
        const RT = 200, LT = 170, UT = [615, G - 370];
        const RB = 175, LB = 170, HANDB = [622, G - 252], ROTB = -35;
        const UB = [HANDB[0] - LB * Math.sin(rad(-ROTB)), HANDB[1] - LB * Math.cos(rad(-ROTB))];
        // world y of the rim line at x (rim from local (-R,0) to (R,0))
        const rimAt = (c, rot, R, x) => { const a = rad(rot), x0 = c[0] - R * Math.cos(a), y0 = c[1] - R * Math.sin(a), x1 = c[0] + R * Math.cos(a), y1 = c[1] + R * Math.sin(a); if (x < Math.min(x0, x1) || x > Math.max(x0, x1)) return null; return lerp(y0, y1, (x - x0) / (x1 - x0)); };

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [HER, HIM]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${G} ${bx - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.18 }, beams);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          const puddle = svgEl("ellipse", { cx: 640, cy: G + 22, rx: 300, ry: 14, fill: "#3c4a5e", opacity: 0.5 }, inner);
          const glow = svgEl("circle", { r: 300, fill: "url(#redGlow)", opacity: 0 }, inner);
          const figs = svgEl("g", {}, inner);
          const umb = svgEl("g", {}, inner);
          const shaft = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 12, "stroke-linecap": "round" }, umb);
          const shaftW = svgEl("path", { fill: "none", stroke: "#d8d8d8", "stroke-width": 5, "stroke-linecap": "round" }, umb);
          const canopy = svgEl("path", { stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, umb);
          const ribs = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 3, opacity: 0.45 }, umb);
          const rain = svgEl("path", { fill: "none", stroke: "#9fb6d4", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.7 }, inner);
          const splash = svgEl("path", { fill: "none", stroke: "#9fb6d4", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.6 }, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, puddle, glow, figs, umb, shaft, shaftW, canopy, ribs, rain, splash, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        function buildUmb(P2, R, L, fill) {
          let d = `M${-R} 0 C${-R} ${-0.92 * R} ${R} ${-0.92 * R} ${R} 0`;
          for (let i = 0; i < 4; i++) { const xa = R - (i * 2 * R) / 4, xb = R - ((i + 1) * 2 * R) / 4; d += ` Q${r1((xa + xb) / 2)} ${r1(-0.16 * R)} ${r1(xb)} 0`; }
          P2.canopy.setAttribute("d", d + " Z"); P2.canopy.setAttribute("fill", fill);
          P2.ribs.setAttribute("d", `M0 ${-0.69 * R} Q${-0.42 * R} ${-0.5 * R} ${-0.5 * R} 0 M0 ${-0.69 * R} Q${0.42 * R} ${-0.5 * R} ${0.5 * R} 0 M0 ${-0.69 * R} L0 0`);
          const sd = `M0 ${-0.69 * R - 22} L0 ${L} Q0 ${L + 34} -22 ${L + 30}`;
          P2.shaft.setAttribute("d", sd); P2.shaftW.setAttribute("d", sd);
        }
        buildUmb(top, RT, LT, "#ff3b30");
        buildUmb(bot, RB, LB, "#7a5656");
        top.umb.setAttribute("transform", `translate(${UT[0]} ${UT[1]})`);
        bot.umb.setAttribute("transform", `translate(${r1(UB[0])} ${r1(UB[1])}) rotate(${ROTB})`);

        // ---------- rain ----------
        const NR = 70;
        const DROPS = Array.from({ length: NR }, (_, i) => ({ x: (i * 173.3 + 37 * (i % 7)) % (PW + 120) - 60, o: (i * 0.618) % 1, v: 1.3 + 0.35 * ((i * 7) % 5) / 5 }));
        function drawRain(P2, t, amt, c, rot, R) {
          let d = "", sp = "";
          if (amt > 0.01) for (const dr of DROPS) {
            const q = frac(dr.o + t * dr.v);
            const y = PY0 - 40 + q * (G - PY0 + 40), x = dr.x - 0.2 * (y - PY0);
            const ry = rimAt(c, rot, R, x);
            if (ry !== null && y > ry - 0.55 * R * (1 - Math.abs((x - c[0]) / R) ** 2) - 10) continue;
            if (frac(dr.o * 13) > amt) continue;
            d += `M${r1(x)} ${r1(y)} l-6 26`;
            if (q > 0.9) { const gx = x; sp += `M${r1(gx - 4)} ${G - 2} l-8 -10 M${r1(gx + 4)} ${G - 2} l8 -10`; }
          }
          P2.rain.setAttribute("d", d); P2.splash.setAttribute("d", sp);
        }
        // bounce ticks off a canopy
        const mkTicks = (P2) => Array.from({ length: 10 }, () => svgEl("path", { fill: "none", stroke: "#cfe0f5", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0 }, P2.fx));
        const tickT = mkTicks(top), tickB = mkTicks(bot);
        function drawTicks(arr, t, c, rot, R, amt) {
          arr.forEach((p, i) => {
            const q = frac(t * 2.2 + i * 0.37), u = ((i * 0.29) % 1) * 1.6 - 0.8;
            const lx = u * R, ly = -0.92 * 0.75 * R * (1 - u * u) - 6, a = rad(rot);
            const wx = c[0] + lx * Math.cos(a) - ly * Math.sin(a), wy = c[1] + lx * Math.sin(a) + ly * Math.cos(a);
            p.setAttribute("d", `M${r1(wx - 10 * q)} ${r1(wy - 12 * q)} l-5 -6 M${r1(wx + 10 * q)} ${r1(wy - 12 * q)} l5 -6`);
            p.setAttribute("opacity", (amt * 0.8 * (1 - q)).toFixed(3));
          });
        }

        // ---------- poses ----------
        function topHer(t) {
          const st = standOn(HER, 1, G); st.torso = 4 + 3 * win(t, T_HEART, T_HEART + 0.5);
          reachTo(st, 1, [UT[0] - 10, UT[1] + LT - 12]);
          st.head = lerp(0, -16, win(t, T_LIFT, T_LIFT + 0.5)) + 10 * win(t, T_HEART, T_HEART + 0.5);
          return st;
        }
        function topHim(t) {
          const st = standOn(HIM, -1, G); st.torso = 4 + 3 * win(t, T_HEART, T_HEART + 0.5);
          reachTo(st, 1, [UT[0] + 12, UT[1] + LT - 34]);
          st.head = lerp(0, -16, win(t, T_LIFT, T_LIFT + 0.5)) + 10 * win(t, T_HEART, T_HEART + 0.5);
          return st;
        }
        const shake = (t) => win(t, T_TIRED, T_TIRED + 0.5);
        function botHim(t) {
          const st = standOn(HIMB, -1, G);
          const k = shake(t);
          st.hx += 3 * Math.sin(t * 38) * k; st.torso = 6 + 6 * k;
          reachTo(st, 1, [HANDB[0] + 2 * Math.sin(t * 41) * k, HANDB[1] + 2 * Math.cos(t * 37) * k]);
          reachTo(st, 1, [HIMB - 20, stY - 40], "b");
          st.head = lerp(-8, 14, k) + lerp(0, 18, win(t, T_GONE - 0.3, T_GONE + 0.5));
          return st;
        }
        const herX = (t) => HERB - 640 * sm(t, T_LET, T_LET + 2.4);
        function botHer(t) {
          const x = herX(t), walk = win(t, T_LET, T_LET + 0.3);
          const st = standOn(x, 1, G); st.head = 26 + 2 * Math.sin(t * 1.3); st.torso = 6;
          const ph = (t - T_LET) * 7.5;
          if (walk > 0) { st.ax = x + 26 * Math.sin(ph) * walk; st.bx = x - 26 * Math.sin(ph) * walk; st.ay = G - 12 * Math.max(0, Math.cos(ph)) * walk; st.by = G - 12 * Math.max(0, -Math.cos(ph)) * walk; st.hy += 3 * Math.abs(Math.sin(ph)) * walk; }
          reachTo(st, 1, [x + 40, stY - 120], "b");
          reachTo(st, 1, [x + 46, stY - 116]);
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.fx);
        const drips = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tag = svgEl("g", { opacity: 0 }, top.umb);
        const tagR = svgEl("rect", { x: -100, y: -0.42 * RT - 26, width: 200, height: 46, rx: 14, fill: "#ffffff", stroke: "#000", "stroke-width": 4 }, tag);
        const tagT = svgEl("text", { x: 0, y: -0.42 * RT + 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 28, fill: "#ff3b30", "text-anchor": "middle" }, tag);
        const conf = Array.from({ length: 22 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));
        const bigHeart = svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH HOLD"; botT.textContent = "ONE HOLDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "FOUR HANDS, ONE HANDLE"], [3.0, "BOTH STAY DRY"], [T_LIFT, "THE RAIN STOPS", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE HOLDS IT OVER HER"], [1.5, "SHE NEVER LOOKS UP", "#ff3b30"], [3.0, "HE GETS SOAKED"], [T_TIRED, "HE STARTS TO SHAKE", "#ff3b30"], [T_LET, "SHE WALKS AWAY DRY", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 590, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [615, G - 330], CS = [540, 1000], ZK = 1.25;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };

        function render(t) {
          // ---- top
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const rainT = 1 - sm(t, T_LIFT - 0.4, T_LIFT + 0.6);
          const popped = t > T_TAP;
          const spin = popped ? 360 * sm(t, T_TAP, T_TAP + 0.9) : 0;
          top.umb.setAttribute("transform", `translate(${UT[0]} ${UT[1] - 6 * win(t, T_HEART, T_HEART + 0.5)}) rotate(${r1(2 * Math.sin(t * 1.4) + 8 * Math.sin(Math.PI * 2 * clamp((t - T_TAP + 0.2) / 0.6, 0, 1)))})`);
          top.canopy.setAttribute("transform", `scale(${(1 + 0.04 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.3, 0, 1))).toFixed(3)} 1)`);
          drawRain(top, t, rainT, UT, 0, RT);
          drawTicks(tickT, t, UT, 0, RT, rainT);
          top.puddle.setAttribute("opacity", (0.5 * rainT + 0.15).toFixed(3));
          top.glow.setAttribute("cx", UT[0]); top.glow.setAttribute("cy", UT[1] - 80); top.glow.setAttribute("opacity", (0.55 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          redSpot.setAttribute("points", `${UT[0] - 60},${PY0} ${UT[0] + 60},${PY0} ${UT[0] + 280},${G} ${UT[0] - 280},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const hq = sm(t, T_HEART, T_HEART + 0.6);
          bigHeart.setAttribute("opacity", (hq * (1 - sm(t, T_CTA, T_CTA + 0.5))).toFixed(3));
          bigHeart.setAttribute("transform", `translate(${UT[0]} ${r1(UT[1] - 0.69 * RT - 26 - 12 * hq)}) scale(${(backOut(hq) * 1.6).toFixed(3)})`);
          // "+ FOLLOW" printed on the canopy; she twirls the umbrella, it flips to FOLLOWING and it rains hearts
          const fl = clamp((t - T_TAP + 0.2) / 0.4, 0, 1), flip = Math.abs(Math.cos(Math.PI * fl));
          tag.setAttribute("opacity", sm(t, T_TAG, T_TAG + 0.3).toFixed(3));
          tag.setAttribute("transform", `scale(${(t > T_TAG + 0.3 ? flip : backOut(sm(t, T_TAG, T_TAG + 0.4))).toFixed(3)} ${(t > T_TAG + 0.3 ? 1 : backOut(sm(t, T_TAG, T_TAG + 0.4))).toFixed(3)})`);
          tagR.setAttribute("fill", popped ? "#ff3b30" : "#ffffff"); tagT.setAttribute("fill", popped ? "#fff" : "#ff3b30");
          tagT.textContent = popped ? "FOLLOWING ✓" : "+ FOLLOW"; tagT.setAttribute("font-size", popped ? 24 : 28);
          conf.forEach((h, i) => { const q = clamp((t - T_TAP - 0.1 * (i % 6)) / 1.8, 0, 1), x = 120 + ((i * 523) % 1000), y = PY0 - 40 + q * (G - PY0 + 20); const ry = rimAt(UT, 0, RT, x); const blocked = ry !== null && y > ry - 0.69 * RT * (1 - ((x - UT[0]) / RT) ** 2); h.setAttribute("opacity", popped && q > 0 && q < 1 && !blocked ? 1 : 0); h.setAttribute("transform", `translate(${r1(x + 20 * Math.sin(q * 9 + i))} ${r1(y)}) rotate(${r1(25 * Math.sin(q * 7 + i))}) scale(0.8)`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const hf = t > T_LET + 0.1 ? -1 : 1;
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), hf);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25 * hf)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const k = shake(t);
          bot.umb.setAttribute("transform", `translate(${r1(UB[0] + 2 * Math.sin(t * 41) * k)} ${r1(UB[1] + 2 * Math.cos(t * 37) * k)}) rotate(${r1(ROTB + 1.5 * Math.sin(t * 29) * k)})`);
          drawRain(bot, t + 0.3, 1, UB, ROTB, RB);
          drawTicks(tickB, t + 0.2, UB, ROTB, RB, 1);
          const ph = sp.hands[1];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          const wet = sm(t, 1.2, 3.0);
          drips.forEach((e, i) => { const q = frac(t * 1.3 + i / 8), sx = i % 2 ? 1 : -1; e.setAttribute("transform", `translate(${r1(bp.head[0] + sx * (18 + 12 * (i % 3)))} ${r1(bp.head[1] + 10 + 140 * q * q)})`); e.setAttribute("opacity", (wet * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_LET + 0.8, T_GONE + 0.5)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE KEPT HER DRY.", L3 = "SHE NEVER NOTICED IT WAS RAINING.";
          E("head").innerHTML = `<div>LOVE IS AN UMBRELLA. #23</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #24 TOMORROW";
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
