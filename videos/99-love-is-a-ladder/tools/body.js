        // ---------- "love is a ladder. #19": winner split-screen format. A house, a ladder to the flat roof under the stars. BOTH HOLD: he holds while she climbs, then she holds the top while he climbs; on the roof together (heart). ONE HOLDS: he holds while she climbs; on the roof she walks off on her phone; he climbs, nobody holds the top, the ladder tips and he falls. FOLLOW: a string of bulbs over the roof reads "+ FOLLOW", she plugs it in: the bulbs light up "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SK = 0.72, G = 720, R = 310, WX = 800, LB = [690, G], LT = [790, R - 46];
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stG = G - Math.sqrt(LEG * LEG - 15 * 15), stR = R - Math.sqrt(LEG * LEG - 15 * 15);
        const Lx = (y) => lerp(LB[0], LT[0], (G - y) / (G - LT[1]));

        // ---------- beats ----------
        const T_C1 = 0.5, T_C1E = 2.8, T_S1 = 3.4, T_KN = 3.6, T_C2 = 3.9, T_C2E = 6.0, T_S2 = 6.6, T_HUG = 6.9, T_HEART = 7.2;
        const T_AWAY = 3.6, T_BC = 4.1, T_SLIP = 5.6, T_DOWN = 6.3;
        const T_H2 = 9.6, T_H3 = 10.8;
        const T_CTA = 13.6, T_PLUG = 16.0;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          let inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const outer = inner;
          inner = svgEl("g", { transform: `translate(${PW / 2} ${PY1}) scale(${SK}) translate(${-PW / 2} ${-PY1})` }, outer);
          const beams = svgEl("g", {}, inner);
          svgEl("polygon", { points: `250,${-300} 350,${-300} 500,${G} 100,${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.2 }, beams);
          for (let i = 0; i < 34; i++) svgEl("circle", { cx: -300 + (i * 397) % (PW + 600), cy: -200 + ((i * 131) % 330), r: 2 + (i % 3), fill: "#fff", opacity: 0.3 }, inner);
          svgEl("circle", { cx: 330, cy: -60, r: 36, fill: "#e8e4d8", opacity: 0.6 }, inner);
          svgEl("rect", { x: -500, y: G, width: PW + 1000, height: 400, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M-500 ${G} L${PW + 500} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          // house
          svgEl("rect", { x: WX, y: R, width: PW - WX + 400, height: G - R, fill: "#3a3540", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("rect", { x: WX - 10, y: R - 14, width: PW - WX + 400, height: 18, fill: "#5a5262", stroke: "#000", "stroke-width": 5 }, inner);
          svgEl("rect", { x: 1150, y: R - 120, width: 50, height: 106, fill: "#6a4a3a", stroke: "#000", "stroke-width": 5 }, inner);
          const win1 = svgEl("rect", { x: 900, y: R + 90, width: 90, height: 100, rx: 4, fill: "#ffd27a", stroke: "#000", "stroke-width": 5, opacity: 0.85 }, inner);
          svgEl("rect", { x: 1060, y: G - 200, width: 90, height: 200, fill: "#2a2018", stroke: "#000", "stroke-width": 5 }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const lights = svgEl("g", {}, inner);
          const ladder = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, outer);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, lights, ladder, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        // ladder drawn in its own frame (base at 0,0, going up along -y), rotated around the base
        const LLEN = Math.hypot(LT[0] - LB[0], LT[1] - LB[1]), LANG = (Math.atan2(LT[0] - LB[0], LB[1] - LT[1]) * 180) / Math.PI;
        function mkLadder(P2, white) {
          const g = svgEl("g", {}, P2.ladder);
          const col = white ? "#c9a27a" : "#8a7a6a";
          for (const dx of [-20, 20]) { svgEl("line", { x1: dx, y1: 0, x2: dx, y2: -LLEN, stroke: "#000", "stroke-width": 14, "stroke-linecap": "round" }, g); svgEl("line", { x1: dx, y1: 0, x2: dx, y2: -LLEN, stroke: col, "stroke-width": 7, "stroke-linecap": "round" }, g); }
          for (let y = -30; y > -LLEN + 10; y -= 42) { svgEl("line", { x1: -20, y1: y, x2: 20, y2: y, stroke: "#000", "stroke-width": 9 }, g); svgEl("line", { x1: -20, y1: y, x2: 20, y2: y, stroke: col, "stroke-width": 4 }, g); }
          return g;
        }
        const LDT = mkLadder(top, true), LDB = mkLadder(bot, false);
        const rotP = (p, a) => { const r = (a * Math.PI) / 180, dx = p[0] - LB[0], dy = p[1] - LB[1]; return [LB[0] + dx * Math.cos(r) - dy * Math.sin(r), LB[1] + dx * Math.sin(r) + dy * Math.cos(r)]; };
        const ladAng = (t) => -78 * Math.pow(clamp((t - T_SLIP) / (T_DOWN - T_SLIP), 0, 1), 2);

        // ---------- poses ----------
        // climber on the ladder, u 0 (ground) .. 1 (top), f = 1 (faces the ladder)
        function climber(u, ph) {
          const hy = lerp(stG + 4, R + 26, u), hx = Lx(hy) - 48;
          const st = base({ hx, hy, torso: 10, head: -4, ax: Lx(hy + 112 + 20 * Math.sin(ph)) - 10, ay: hy + 112 + 20 * Math.sin(ph), bx: Lx(hy + 128 - 20 * Math.sin(ph)) - 14, by: hy + 128 - 20 * Math.sin(ph) });
          const ya = hy - 150 - 18 * Math.sin(ph + Math.PI), yb = hy - 170 + 18 * Math.sin(ph + Math.PI);
          reachTo(st, 1, [Lx(ya) - 6, ya]); reachTo(st, 1, [Lx(yb) - 10, yb], "b");
          return st;
        }
        const climbPose = (t, a, b) => { const u = sm(t, a, b); return climber(u, u * 22); };
        function stepOff(t, a, b, x, cp) { const q = win(t, a, b); const st = mixPose(cp, standOn(x, 1, R), q); st.hy -= 30 * Math.sin(Math.PI * q); return st; }
        const holderBase = () => { const st = standOn(620, 1, G); st.torso = 12; reachTo(st, 1, [Lx(G - 150) - 16, G - 150]); reachTo(st, 1, [Lx(G - 205) - 16, G - 205], "b"); return st; };
        function topHer(t) {
          if (t < T_C1) { const st = standOn(560, 1, G); st.head = -16; return st; }
          if (t < T_C1E) return climbPose(t, T_C1, T_C1E);
          if (t < T_S1) return stepOff(t, T_C1E, T_S1, 860, climber(1, 22));
          // kneels at the top and holds the ladder for him
          const kn = hold(t, T_KN, T_C2E + 0.4, 0.3);
          const st = standOn(lerp(860, 840, kn), -1, R);
          st.hy += 60 * kn; st.ax = lerp(st.ax, 800, kn); st.ay = lerp(st.ay, R - 4, kn); st.bx = lerp(st.bx, 880, kn); st.torso = 20 * kn;
          reachTo(st, kn, [LT[0] + 4, LT[1] + 20]); reachTo(st, kn, [LT[0] + 6, LT[1] + 50], "b");
          const x2 = lerp(840, 930, sm(t, T_S2 - 0.4, T_HUG));
          if (t > T_S2 - 0.4) Object.assign(st, mixPose(st, standOn(x2, -1, R), win(t, T_S2 - 0.4, T_S2)));
          const hug = win(t, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [x2 - 60, stR - 120]);
          const plug = hold(t, T_PLUG - 0.7, T_PLUG + 0.3, 0.3); reachTo(st, plug, [1150, R - 70], "b"); st.head = lerp(st.head, -14, win(t, T_CTA + 0.6, T_CTA + 1.0));
          return st;
        }
        function topHim(t) {
          if (t < T_C2) return holderBase();
          if (t < T_C2E) return climbPose(t, T_C2, T_C2E);
          const st = stepOff(t, T_C2E, T_S2, lerp(860, 860, 0), climber(1, 22));
          const hug = win(t, T_HUG - 0.3, T_HUG + 0.2); reachTo(st, hug, [930, stR - 120]); st.head = lerp(st.head, -10, win(t, T_HEART, T_HEART + 0.4));
          const cheer = hold(t, T_PLUG + 0.2, DUR, 0.3); reachTo(st, cheer, [850, stR - 250 + 10 * Math.sin(t * 12)], "b");
          return st;
        }
        function botHer(t) {
          if (t < T_C1) { const st = standOn(560, 1, G); st.head = 26; reachTo(st, 1, [600, stG - 120]); reachTo(st, 1, [596, stG - 114], "b"); return st; }
          if (t < T_C1E) return climbPose(t, T_C1, T_C1E);
          if (t < T_S1) return stepOff(t, T_C1E, T_S1, 860, climber(1, 22));
          // walks off along the roof on her phone
          const x = lerp(860, 1100, sm(t, T_AWAY, T_AWAY + 1.6));
          const st = standOn(x, 1, R); st.head = 26;
          const ph = (x - 860) / 90, sw = Math.sin(Math.PI * 2 * ph), mv = hold(t, T_AWAY, T_AWAY + 1.6, 0.2);
          st.ax = x + 15 + 18 * sw * mv; st.bx = x - 15 - 18 * sw * mv; st.ay = R - 8 * Math.max(0, sw) * mv; st.by = R - 8 * Math.max(0, -sw) * mv;
          reachTo(st, 1, [x + 40, stR - 120]); reachTo(st, 1, [x + 34, stR - 114], "b");
          return st;
        }
        function botHim(t) {
          if (t < T_BC) return holderBase();
          const a = ladAng(t);
          let st = climber(Math.min(sm(t, T_BC, T_BC + 2.6), sm(T_SLIP, T_BC, T_BC + 2.6)), 22 * sm(Math.min(t, T_SLIP), T_BC, T_BC + 2.6));
          if (t > T_SLIP) {
            // rides the tipping ladder
            const rot = (k1, k2) => { const p = rotP([st[k1], st[k2]], a); st[k1] = p[0]; st[k2] = p[1]; };
            rot("hx", "hy"); rot("ax", "ay"); rot("bx", "by"); rot("atx", "aty"); rot("btx", "bty"); st.torso += a;
            const lie = base({ hx: 470, hy: G - 26, torso: -96, head: 6, ax: 610, ay: G - 6, bx: 590, by: G, ash: 40, ael: 10, bsh: 60, bel: 20 });
            st = mixPose(st, lie, win(t, T_DOWN - 0.15, T_DOWN + 0.25));
          }
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.figs);
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const dust = Array.from({ length: 10 }, () => svgEl("circle", { r: 26, fill: "url(#dustG)", opacity: 0 }, bot.fx));
        // string of bulbs (top, CTA)
        const wire = svgEl("path", { d: `M960 ${R - 260} Q1085 ${R - 200} 1210 ${R - 260}`, fill: "none", stroke: "#222", "stroke-width": 4, opacity: 0 }, top.lights);
        const plugW = svgEl("path", { fill: "none", stroke: "#222", "stroke-width": 4, opacity: 0 }, top.lights);
        const bulbs = Array.from({ length: 9 }, (_, i) => {
          const q = (i + 0.5) / 9, x = 960 + 250 * q, y = R - 230 + 2 * q * (1 - q) * 60 * 2 * 0.5 + 0;
          const g = svgEl("g", { transform: `translate(${r1(x)} ${r1(R - 260 + 120 * q * (1 - q) + 8)})`, opacity: 0 }, top.lights);
          const gl = svgEl("circle", { r: 34, fill: "url(#winGlow)", opacity: 0 }, g);
          const b = svgEl("circle", { cy: 22, r: 19, fill: "#4a4a50", stroke: "#000", "stroke-width": 4 }, g);
          svgEl("rect", { x: -7, y: -2, width: 14, height: 8, fill: "#888", stroke: "#000", "stroke-width": 2 }, g);
          const tx = svgEl("text", { x: 0, y: 30, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#ddd", "text-anchor": "middle" }, g);
          return { g, gl, b, tx };
        });
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH HOLD"; botT.textContent = "ONE HOLDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "HE HOLDS, SHE CLIMBS"], [T_KN, "SHE HOLDS, HE CLIMBS"], [T_S2, "UP THERE TOGETHER", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HE HOLDS, SHE CLIMBS"], [T_AWAY, "SHE'S UP. SHE WALKS OFF"], [T_BC, "HIS TURN"], [T_SLIP - 0.4, "NOBODY HOLDS IT", "#ff3b30"], [T_DOWN, "HE FALLS", "#ff3b30"], [T_DOWN + 1.3, "SHE DIDN'T SEE"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 580, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const toP = (x, y) => [PW / 2 + (x - PW / 2) * SK, PY1 + (y - PY1) * SK];
        const CF = toP(1010, R - 130), CS = [540, 1000], ZK = 1.5;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const placeLadder = (g, a) => g.setAttribute("transform", `translate(${LB[0]} ${LB[1]}) rotate(${r1(LANG + a)})`);

        function render(t) {
          // ---- top
          placeLadder(LDT, 0);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), t > T_S1 - 0.3 ? -1 : 1);
          drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] + (t > T_S1 - 0.3 ? 25 : -25))); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_CTA + 0.6, T_CTA + 1.0));
          const hc = [895, stR - 240], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", hc[0]); top.glow.setAttribute("cy", hc[1]); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `840,${-300} 950,${-300} 1080,${R} 710,${R}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // bulbs
          const lq = sm(t, T_CTA + 0.6, T_CTA + 1.2), on = t >= T_PLUG;
          wire.setAttribute("opacity", lq.toFixed(3)); plugW.setAttribute("opacity", lq.toFixed(3));
          plugW.setAttribute("d", `M1210 ${R - 260} Q1200 ${R - 150} ${t < T_PLUG ? r1(hp.hands[1][0]) : 1150} ${t < T_PLUG ? r1(hp.hands[1][1]) : R - 70}`);
          const PRE = "+ FOLLOW ", POST = "FOLLOWING";
          bulbs.forEach((B, i) => {
            const lit = on && t > T_PLUG + i * 0.06;
            B.g.setAttribute("opacity", lq.toFixed(3));
            B.b.setAttribute("fill", lit ? (i % 2 ? "#ffd27a" : "#ff6a60") : "#4a4a50");
            B.gl.setAttribute("opacity", lit ? (0.8 + 0.2 * Math.sin(t * 8 + i)).toFixed(3) : 0);
            B.tx.textContent = lit ? POST[i] : PRE[i]; B.tx.setAttribute("fill", lit ? "#000" : "#ddd");
          });
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_PLUG - 0.5) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", t > T_PLUG + 0.5 && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(1085 + Math.cos(a) * 240 * Math.sqrt(q3))} ${r1(R - 220 + Math.sin(a) * 140 * Math.sqrt(q3))}) scale(${(0.8 - 0.4 * q3).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          placeLadder(LDB, ladAng(t));
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), t > T_DOWN - 0.1 ? -1 : 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const pOn = t < T_C1 || t > T_S1;
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          phone.setAttribute("opacity", pOn ? 1 : 0); phoneGlow.setAttribute("opacity", pOn ? (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3) : 0);
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`); phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1]));
          dust.forEach((d, i) => { const q = clamp((t - T_DOWN) / 1.3, 0, 1), a = (i / 10) * Math.PI; d.setAttribute("cx", r1(420 + Math.cos(a) * 260 * Math.sqrt(q))); d.setAttribute("cy", r1(G - 10 - Math.sin(a) * 70 * Math.sqrt(q))); d.setAttribute("r", r1(22 + 34 * q)); d.setAttribute("opacity", t > T_DOWN ? (0.8 * (1 - q)).toFixed(3) : 0); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_DOWN, T_DOWN + 1.0)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "HE HELD THE LADDER FOR HER.", L3 = "SHE NEVER HELD IT FOR HIM.";
          E("head").innerHTML = `<div>LOVE IS A LADDER. #19</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #20 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_PLUG - 0.6) * 28)));
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
