        // ---------- "love is a bridge. part 2 #17": sequel of the winner reel 36. Two cliffs, an abyss. BOTH BUILD: plank by plank from both sides, they meet in the middle (heart). ONE BUILDS, part 2: his half from part 1 is there, he sits at its end and waits (DAY 1 -> 365), stands up and walks away; only then she puts the phone down and builds her half, reaches the middle: his side is empty. FOLLOW: a banner unrolls under the bridge "+ FOLLOW", she tugs the rope: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 600, E0 = 330, E1 = 903, PLW = 52, NPL = 11;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);
        const pcx = (i) => E0 + PLW / 2 + PLW * i;

        // ---------- beats ----------
        const CYC = 0.9, T0 = 0.4, T_MEET = 5.9, T_HUG = 6.3, T_HEART = 6.7;
        const T_STAND = 4.2, T_LEAVE = 4.6, T_GONE = 6.4, T_LOOK = 6.3, T_SB = 6.9, CYB = 0.6, T_KNEEL = 10.6;
        const T_H2 = 10.6, T_H3 = 11.8;
        const T_CTA = 14.0, T_BAN = 14.8, T_TUG = 16.6;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          svgEl("rect", { x: E0, y: G, width: E1 - E0, height: PY1 - G, fill: "url(#abyss)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx2 of [220, 1010]) svgEl("polygon", { points: `${bx2 - 50},${PY0} ${bx2 + 50},${PY0} ${bx2 + 150},${G} ${bx2 - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 200), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          for (const [a, b, f] of [[0, E0, 1], [E1, PW, -1]]) {
            const edge = f > 0 ? b : a;
            svgEl("path", { d: `M${a} ${PY1} L${a} ${G} L${b} ${G} L${b} ${PY1} Z M${edge} ${G} L${edge - f * 30} ${PY1}`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 5 }, inner);
          }
          for (const x of [E0 - 14, E1 + 14]) svgEl("rect", { x: x - 7, y: G - 70, width: 14, height: 70, fill: "#6a5240", stroke: "#000", "stroke-width": 4 }, inner);
          const ropes = svgEl("path", { fill: "none", stroke: "#8a7458", "stroke-width": 4 }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const planks = svgEl("g", {}, inner);
          const banner = svgEl("g", { opacity: 0 }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, ropes, glow, planks, banner, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const mkPlank = (P2, white) => svgEl("rect", { x: -PLW / 2 + 2, y: 0, width: PLW - 4, height: 16, rx: 3, fill: white ? "#c9a27a" : "#8a7a6a", stroke: "#000", "stroke-width": 4 }, P2.planks);
        const PT = Array.from({ length: NPL }, () => mkPlank(top, true));
        const PB = Array.from({ length: NPL }, () => mkPlank(bot, false));
        const carry = { her: mkPlank(top, true), him: mkPlank(top, true), herB: mkPlank(bot, false) };
        [carry.her, carry.him, carry.herB].forEach((c) => c.parentNode.appendChild(c));

        // when each plank appears: top her 0..5, him 10..6; bottom: 6..10 always (his half), her 0..5 from T_SB
        const herOrder = [0, 1, 2, 3, 4, 5], himOrder = [10, 9, 8, 7, 6];
        const placeT = (k) => T0 + k * CYC + 0.6 * CYC;
        const placeB = (k) => T_SB + k * CYB + 0.6 * CYB;
        function topPlanked(i, t) { const k = herOrder.indexOf(i); if (k >= 0) return t >= placeT(k) ? t - placeT(k) : -1; const m = himOrder.indexOf(i); return t >= placeT(m) ? t - placeT(m) : -1; }
        function botPlanked(i, t) { if (i >= 6) return 9; const k = herOrder.indexOf(i); return t >= placeB(k) ? t - placeB(k) : -1; }

        // builder pose: stands on the last plank, bends and lays the next one in front
        function builder(t, f, order, t0, cyc, xEdge, done) {
          const k = Math.floor((t - t0) / cyc), act = t >= t0 && k < order.length;
          const kk = clamp(k, 0, order.length);
          const p = act ? frac((t - t0) / cyc) : 0;
          const stepK = act ? k + sm(p, 0.75, 1) : kk;
          const x = xEdge - f * 34 + f * PLW * stepK;
          const st = standOn(x, f, G);
          if (!act) return { st, p, act, x };
          const bend = win(p, 0.15, 0.45) * (1 - win(p, 0.62, 0.8));
          st.torso = 45 * bend; st.hy += 30 * bend; st.head = 14 * bend;
          const tgt = [pcx(order[k]), G + 4];
          const h = p < 0.15 ? [x + f * 30, stY - 110] : p < 0.6 ? [lerp(x + f * 30, tgt[0], win(p, 0.15, 0.6)), lerp(stY - 110, tgt[1], win(p, 0.15, 0.6))] : tgt;
          const k2 = 1 - win(p, 0.62, 0.8);
          reachTo(st, k2, [h[0] - f * 20, h[1] - 4]); reachTo(st, k2, [h[0] + f * 16, h[1]], "b");
          return { st, p, act, x, h };
        }
        function topHer(t) {
          const B = builder(t, 1, herOrder, T0, CYC, E0, 6);
          const st = B.st;
          if (t > T_MEET - 0.4) { const q = sm(t, T_MEET - 0.4, T_HUG); Object.assign(st, standOn(lerp(B.x, 598, q), 1, G)); reachTo(st, win(t, T_HUG - 0.3, T_HUG + 0.2), [660, stY - 120]); }
          const cheer = hold(t, T_TUG + 0.2, DUR, 0.3); reachTo(st, cheer, [570, stY - 250 + 10 * Math.sin(t * 12)], "b");
          const tug = hold(t, T_TUG - 0.5, T_TUG + 0.3, 0.2); reachTo(st, tug, [600, G - 10 + 20 * win(t, T_TUG - 0.1, T_TUG)]); st.torso += 30 * tug; st.hy += 16 * tug;
          return st;
        }
        function topHim(t) {
          const B = builder(t, -1, himOrder, T0, CYC, E1, 5);
          const st = B.st;
          if (t > T_MEET - 0.4) { const q = sm(t, T_MEET - 0.4, T_HUG); Object.assign(st, standOn(lerp(B.x, 664, q), -1, G)); reachTo(st, win(t, T_HUG - 0.3, T_HUG + 0.2), [600, stY - 120]); }
          st.head = lerp(st.head, -10, win(t, T_HEART, T_HEART + 0.4));
          return st;
        }
        // bottom him: sits at the end of his half, legs over the abyss; then stands and walks away to the right
        const HSX = pcx(6) + 30;
        function botHim(t) {
          if (t < T_STAND) {
            const st = base({ hx: HSX, hy: G - 6, torso: 4, head: lerp(-4, 30, sm(t, 1.5, 4.0)), ax: HSX - 40, ay: G + 140, bx: HSX - 60, by: G + 136 });
            reachTo(st, 1, [HSX - 30, G - 10]); reachTo(st, 1, [HSX - 20, G - 6], "b");
            return st;
          }
          if (t < T_LEAVE) return mixPose(base({ hx: HSX, hy: G - 6, torso: 4, head: 30, ax: HSX - 40, ay: G + 140, bx: HSX - 60, by: G + 136 }), standOn(HSX + 10, 1, G), win(t, T_STAND, T_LEAVE));
          const x = lerp(HSX + 10, 1330, sm(t, T_LEAVE, T_GONE + 0.6)), STR = 100;
          const ph = (x - HSX) / STR;
          const ft = [0, 0.5].map((o) => { const q = frac(ph + o + 1e-6); if (q < 0.5) return [x + STR * (0.25 - q), G]; const ss = (q - 0.5) / 0.5; return [x + STR * (-0.25 + 0.5 * ease(ss)), G - Math.sin(Math.PI * ss) * 10]; });
          const sw = Math.sin(Math.PI * 2 * ph);
          return base({ hx: x, hy: stY + 3 + 3 * Math.abs(sw), torso: 10, head: 26, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 });
        }
        function botHer(t) {
          if (t < T_SB - 0.3) {
            const lk = win(t, T_LOOK, T_LOOK + 0.4);
            const st = base({ hx: 230, hy: G - 6, torso: 8, head: lerp(28 + 2 * Math.sin(t * 1.3), -8, lk), ax: 290, ay: G, bx: 276, by: G });
            reachTo(st, 1, [266, G - 120]); reachTo(st, 1, [272, G - 114], "b");
            return st;
          }
          const B = builder(t, 1, herOrder, T_SB, CYB, E0, 6);
          const st = B.st;
          if (t < T_SB) Object.assign(st, mixPose(base({ hx: 230, hy: G - 6, torso: 8, head: -8, ax: 290, ay: G, bx: 276, by: G }), st, win(t, T_SB - 0.3, T_SB)));
          const kn = win(t, T_KNEEL, T_KNEEL + 0.5);
          if (kn > 0) { st.hy = lerp(st.hy, G - 70, kn); st.ax = lerp(st.ax, st.hx + 40, kn); st.bx = lerp(st.bx, st.hx - 30, kn); st.ay = lerp(st.ay, G - 4, kn); st.by = lerp(st.by, G, kn); st.torso = lerp(st.torso, 20, kn); st.head = lerp(st.head, 10, kn); reachTo(st, kn, [st.hx + 100, stY - 60]); }
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.figs);
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        // banner (top panel, under the bridge)
        const banRect = svgEl("rect", { x: -150, y: 0, width: 300, height: 120, fill: "#ff3b30", stroke: "#000", "stroke-width": 6 }, top.banner);
        const banT = svgEl("text", { x: 0, y: 78, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 50, fill: "#fff", "text-anchor": "middle" }, top.banner);
        const banRope = svgEl("path", { fill: "none", stroke: "#8a7458", "stroke-width": 4 }, top.figs);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.fx));

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BUILD"; botT.textContent = "ONE BUILT (PART 1)";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "PLANK BY PLANK"], [3.5, "HALF WAY"], [T_MEET, "THEY MEET", "#ff6a60"]];
        const BOTSEQ = [[0.05, "HIS HALF IS DONE"], [1.4, "HE WAITS. DAY 1"], [2.6, "DAY 100"], [3.4, "DAY 365"], [T_STAND, "HE STOPS WAITING", "#ff3b30"], [T_SB, "NOW SHE BUILDS"], [T_KNEEL - 0.2, "HE'S GONE", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";
        const tom = label(0, 1500, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center"; tom.style.top = "1440px";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CF = [630, G - 40], CS = [540, 940], ZK = 1.3;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const ropeD = (P2, t, n) => { let d = `M${E0 - 14} ${G - 64} Q${(E0 + E1) / 2} ${G - 10} ${E1 + 14} ${G - 64}`; return d; };

        function drawPlanks(arr, fn, t) { arr.forEach((p, i) => { const a = fn(i, t); if (a < 0) { p.setAttribute("opacity", 0); return; } p.setAttribute("opacity", 1); p.setAttribute("transform", `translate(${pcx(i)} ${r1(G - 8 * Math.exp(-a * 20) * (a < 0.15 ? 1 : 0))})`); }); }
        function drawCarry(c, B) { const on = B && B.act && B.p < 0.6 && B.h; c.setAttribute("opacity", on ? 1 : 0); if (on) c.setAttribute("transform", `translate(${r1(B.h[0])} ${r1(B.h[1] - 8)}) rotate(${r1(lerp(-70, 0, win(B.p, 0.15, 0.55)))})`); }

        function render(t) {
          // ---- top
          drawPlanks(PT, topPlanked, t);
          drawCarry(carry.her, builder(t, 1, herOrder, T0, CYC, E0, 6));
          drawCarry(carry.him, builder(t, -1, himOrder, T0, CYC, E1, 5));
          top.ropes.setAttribute("d", ropeD()); bot.ropes.setAttribute("d", ropeD());
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_BAN - 0.3, T_BAN));
          const hc = [630, stY - 300], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", hc[0]); top.glow.setAttribute("cy", hc[1]); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `570,${PY0} 690,${PY0} 860,${G} 400,${G}`);
          redSpot.setAttribute("opacity", (0.45 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          // banner unrolls under the middle of the bridge
          const uq = sm(t, T_BAN, T_BAN + 0.7), tapped = t >= T_TUG;
          top.banner.setAttribute("opacity", t > T_BAN ? 1 : 0);
          const sway = 3 * Math.sin(t * 2.2);
          top.banner.setAttribute("transform", `translate(630 ${G + 16}) rotate(${r1(sway)}) scale(${(tapped ? 1 + 0.08 * Math.sin(Math.PI * clamp((t - T_TUG) / 0.25, 0, 1)) : 1).toFixed(3)} ${Math.max(0.01, uq).toFixed(3)})`);
          banRect.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30");
          banT.setAttribute("fill", tapped ? "#000" : "#fff"); banT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; banT.setAttribute("font-size", tapped ? 40 : 50);
          banRope.setAttribute("d", t > T_TUG - 0.6 ? `M600 ${G + 16} L${r1(hp.hands[0][0])} ${r1(hp.hands[0][1])}` : "");
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TUG) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(630 + Math.cos(a) * 260 * Math.sqrt(q3))} ${r1(G + 76 + Math.sin(a) * 160 * Math.sqrt(q3))}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          drawPlanks(PB, botPlanked, t);
          drawCarry(carry.herB, t > T_SB ? builder(t, 1, herOrder, T_SB, CYB, E0, 6) : null);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1 * (t > T_STAND + 0.2 ? -1 : 1));
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          const dropQ = clamp((t - (T_SB - 0.3)) / 0.4, 0, 1);
          const pp = t < T_SB - 0.3 ? ph : [lerp(ph[0], 200, dropQ), lerp(ph[1], G - 6, dropQ)];
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1])}) rotate(${t > T_SB - 0.3 ? 90 * dropQ : 0})`);
          phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1])); phoneGlow.setAttribute("opacity", ((0.75 + 0.15 * Math.sin(t * 5)) * (1 - 0.7 * dropQ)).toFixed(3));
          BF.him.g.setAttribute("opacity", t > T_GONE + 0.6 ? 0 : 1);
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_KNEEL, T_KNEEL + 1.0)).toFixed(3));
          botT.textContent = t < T_SB ? "ONE WAITED" : "ONE BUILDS";

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "SHE STARTED BUILDING", L3 = "WHEN HE STOPPED WAITING.";
          E("head").innerHTML = `<div>LOVE IS A BRIDGE. PART 2 #17</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          const TT = "LOVE IS A ... #18 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TUG - 0.4) * 28)));
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
