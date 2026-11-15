        // ---------- "love is a house. #16": winner split-screen format. BOTH BUILD: brick by brick from both sides, they lift the roof together, the window lights up (heart). ONE BUILDS: she sits on her brick pile scrolling, her side of the wall stays empty; he lifts the roof alone, it tips onto the missing side and falls, knocking the wall down. FOLLOW: chimney smoke drifts up and forms a "+ FOLLOW" cloud, he taps the light switch, the cloud lights up: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const G = 660, BW = 80, BH = 44, WX0 = 500, HX = 620, RTOP = G - 4 * BH;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const stY = G - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const CYC = 0.8, T0 = 0.4;
        const T_R0 = 5.5, T_R1 = 7.0, T_LIGHT = 7.5, T_HEART = 7.9;
        const T_BR0 = 6.9, T_BR1 = 8.2, T_FALL = 8.6, T_HIT = 8.9, T_KNEEL = 9.3, T_LOOK = 9.8;
        const T_H2 = 10.2, T_H3 = 11.4;
        const T_CTA = 13.6, T_SMK = 14.3, T_CLOUD = 15.3, T_TAP = 16.8;
        const bx = (c) => WX0 + BW * c + BW / 2, by = (r) => G - BH * r - BH / 2;
        const LIST = {
          herT: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1], [3, 0]],
          himT: [[0, 2], [1, 2], [1, 1], [2, 2], [3, 2], [3, 1]],
          himB: [[0, 2], [0, 1], [1, 2], [1, 1], [2, 2], [2, 1], [3, 2], [3, 1]],
        };
        const placedAt = (k) => T0 + k * CYC + 0.72 * CYC;

        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx2 of [300, 1000]) svgEl("polygon", { points: `${bx2 - 50},${PY0} ${bx2 + 50},${PY0} ${bx2 + 150},${G} ${bx2 - 150},${G}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 200), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          svgEl("rect", { x: 0, y: G, width: PW, height: PY1 - G, fill: "url(#ground)" }, inner);
          svgEl("path", { d: `M0 ${G} L${PW} ${G}`, stroke: "#8a8172", "stroke-width": 4 }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const winG = svgEl("circle", { cx: HX, cy: G - 110, r: 260, fill: "url(#winGlow)", opacity: 0 }, inner);
          const roofL = svgEl("g", {}, inner);
          const wall = svgEl("g", {}, inner);
          const front = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, winG, roofL, wall, front, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- bricks, piles, roof ----------
        const mkBrick = (parent, white) => svgEl("rect", { x: -BW / 2 + 2, y: -BH / 2 + 2, width: BW - 4, height: BH - 4, rx: 4, fill: white ? "url(#brickT)" : "url(#brickB)", stroke: "#000", "stroke-width": 4 }, parent);
        const mkSet = (P2, white, n) => Array.from({ length: n }, () => mkBrick(P2.wall, white));
        const BT = { her: mkSet(top, true, 6), him: mkSet(top, true, 6) };
        const BBk = { him: mkSet(bot, false, 8) };
        const pile = (P2, x, n, white) => Array.from({ length: n }, (_, i) => { const b = mkBrick(P2.front, white); b.setAttribute("transform", `translate(${x + (i % 2) * 34 - 17} ${G - BH / 2 - Math.floor(i / 2) * (BH - 6)}) scale(0.8)`); return b; });
        const pileHerT = pile(top, 440, 6, true), pileHimT = pile(top, 800, 6, true), pileHimB = pile(bot, 800, 8, false), pileHerB = pile(bot, 440, 6, false);
        const winT = svgEl("rect", { x: HX - 26, y: G - 3 * BH + 6, width: 52, height: 2 * BH - 12, rx: 3, fill: "#2a2a30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.wall);
        const winX = svgEl("path", { d: `M${HX} ${G - 3 * BH + 6} L${HX} ${G - BH - 6} M${HX - 26} ${G - 2 * BH} L${HX + 26} ${G - 2 * BH}`, stroke: "#000", "stroke-width": 4, opacity: 0 }, top.wall);
        const sw = svgEl("rect", { x: 744, y: G - 120, width: 14, height: 22, rx: 3, fill: "#e8e8e8", stroke: "#000", "stroke-width": 3, opacity: 0 }, top.wall);
        function mkRoof(P2, white) {
          const g = svgEl("g", {}, P2.roofL);
          svgEl("rect", { x: 250, y: -110, width: 34, height: 60, fill: white ? "#7a4a32" : "#5a524c", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-20 0 L380 0 L180 -140 Z", fill: white ? "url(#roofT)" : "#3a3a40", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, g);
          for (let i = 1; i < 4; i++) svgEl("path", { d: `M${-20 + i * 50} ${-i * 35} L${380 - i * 50} ${-i * 35}`, stroke: "#000", "stroke-width": 3, opacity: 0.4 }, g);
          return g;
        }
        const RFT = mkRoof(top, true), RFB = mkRoof(bot, false);
        const dust = Array.from({ length: 12 }, () => svgEl("circle", { r: 30, fill: "url(#dustG)", opacity: 0 }, bot.fx));

        // ---------- poses ----------
        // brick k of a placer: pick from the pile, carry, press into place
        function placer(t, list, f, xIdle, xPlace, pileX) {
          const k = Math.floor((t - T0) / CYC), act = t >= T0 && k < list.length;
          const st = standOn(xIdle, f, G);
          if (!act) return { st, k: clamp(k, 0, list.length), p: 0, act };
          const p = frac((t - T0) / CYC), [r, c] = list[k];
          const bend = win(p, 0.05, 0.22) * (1 - win(p, 0.3, 0.5));
          const go = win(p, 0.25, 0.6) * (1 - win(p, 0.88, 1));
          const xx = lerp(xIdle, xPlace, go);
          Object.assign(st, standOn(xx, f, G));
          st.torso = 40 * bend + 18 * go; st.hy += 22 * bend; st.head = 10 * bend;
          let h;
          if (p < 0.3) h = [lerp(xIdle + f * 50, pileX, win(p, 0, 0.22)), lerp(G - 220, G - 30, win(p, 0, 0.22))];
          else if (p < 0.72) { const q = win(p, 0.3, 0.72); h = [lerp(pileX, bx(c), q), lerp(G - 30, by(r), q) - 40 * Math.sin(Math.PI * q)]; }
          else h = [bx(c), by(r)];
          const k2 = 1 - win(p, 0.86, 1);
          reachTo(st, k2, [h[0] - f * 26, h[1]]); reachTo(st, k2, [h[0] + f * 10, h[1] + 4], "b");
          return { st, k, p, act, h };
        }
        const roofTop = (t) => ({ x: 440, y: lerp(G, RTOP, sm(t, T_R0 + 0.4, T_R1)), sy: lerp(0.22, 1, sm(t, T_R0 + 0.4, T_R1)), a: 0 });
        function roofBot(t) {
          const up = sm(t, T_BR0 + 0.3, T_BR1), fall = clamp((t - T_FALL) / (T_HIT - T_FALL), 0, 1);
          let a = lerp(0, -28, up) * (1 - fall * fall);
          if (t > T_HIT) a = 3 * Math.exp(-(t - T_HIT) * 6) * Math.sin((t - T_HIT) * 30);
          return { x: 440, y: G, sy: lerp(0.22, 1, up), a };
        }
        const eaveR = (R) => { const r = (R.a * Math.PI) / 180; return [R.x + 360 * Math.cos(r), R.y + 360 * Math.sin(r) * 1]; };
        function topHer(t) {
          const P = placer(t, LIST.herT, 1, 400, 455, 440);
          const st = P.st;
          if (t > T_R0 - 0.3) {
            const q = win(t, T_R0 - 0.3, T_R0 + 0.2), R = roofTop(t);
            Object.assign(st, standOn(lerp(400, 410, q), 1, G));
            st.torso = 30 * hold(t, T_R0, T_R0 + 0.9, 0.3); st.hy += 20 * hold(t, T_R0, T_R0 + 0.9, 0.3);
            const on = hold(t, T_R0 - 0.2, T_R1 + 0.3, 0.3);
            reachTo(st, on, [R.x - 6, R.y - 6]); reachTo(st, on, [R.x + 14, R.y - 2], "b");
            const hug = win(t, T_LIGHT, T_LIGHT + 0.6);
            const cheer = hold(t, T_TAP + 0.2, DUR, 0.3); reachTo(st, cheer, [430, stY - 260 + 10 * Math.sin(t * 12)], "b");
            st.head = lerp(st.head, -18, win(t, T_SMK, T_SMK + 0.5));
          }
          return st;
        }
        function topHim(t) {
          const P = placer(t, LIST.himT, -1, 840, 785, 800);
          const st = P.st;
          if (t > T_R0 - 0.3) {
            const q = win(t, T_R0 - 0.3, T_R0 + 0.2), R = roofTop(t);
            Object.assign(st, standOn(lerp(840, 830, q), -1, G));
            st.torso = 30 * hold(t, T_R0, T_R0 + 0.9, 0.3); st.hy += 20 * hold(t, T_R0, T_R0 + 0.9, 0.3);
            const on = hold(t, T_R0 - 0.2, T_R1 + 0.3, 0.3);
            reachTo(st, on, [R.x + 366, R.y - 6]); reachTo(st, on, [R.x + 346, R.y - 2], "b");
            // CTA: tap the light switch
            const tp = hold(t, T_TAP - 0.5, T_TAP + 0.3, 0.3);
            reachTo(st, tp, [758, G - 110 + (Math.abs(t - T_TAP) < 0.1 ? 4 : 0)]);
            st.head = lerp(st.head, -18, win(t, T_SMK, T_SMK + 0.5) * (1 - tp));
          }
          return st;
        }
        function botHim(t) {
          const P = placer(t, LIST.himB, -1, 840, 785, 800);
          const st = P.st;
          if (t > T_BR0 - 0.3) {
            const R = roofBot(t), e = eaveR(R);
            const on = hold(t, T_BR0, T_FALL + 0.05, 0.3);
            st.torso = lerp(st.torso, 10, on); st.hx += 8 * Math.sin(t * 9) * hold(t, T_BR1 - 0.4, T_FALL, 0.2);
            reachTo(st, on, [e[0] + 6, e[1] - 4]); reachTo(st, on, [e[0] + 20, e[1]], "b");
            const kn = win(t, T_KNEEL, T_KNEEL + 0.5);
            st.hy = lerp(st.hy, G - 70, kn); st.ax = lerp(st.ax, st.hx - 40, kn); st.ay = lerp(st.ay, G - 4, kn); st.bx = lerp(st.bx, st.hx + 30, kn);
            st.torso = lerp(st.torso, 30, kn); st.head = lerp(st.head, 34, kn);
            reachTo(st, kn, [st.hx - 50, G - 60]); reachTo(st, kn, [st.hx - 30, G - 56], "b");
          }
          return st;
        }
        function botHer(t) {
          const lk = win(t, T_LOOK, T_LOOK + 0.5);
          const st = base({ hx: 400, hy: G - 100, torso: lerp(10, 2, lk), head: lerp(28 + 2 * Math.sin(t * 1.3), -6, lk), ax: 450, ay: G, bx: 430, by: G });
          reachTo(st, 1, [lerp(446, 440, lk), lerp(G - 196, G - 140, lk)]); reachTo(st, 1, [lerp(440, 434, lk), lerp(G - 190, G - 134, lk)], "b");
          return st;
        }
        const mkFig = (P2, white, kind) => makeFig(P2.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs), her: mkFig(top, true, "her"), him: mkFig(top, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs), her: mkFig(bot, false, "her"), him: mkFig(bot, false, "him") };
        const carryT = { her: mkBrick(top.figs, true), him: mkBrick(top.figs, true) }, carryB = mkBrick(bot.figs, false);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.figs);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BUILD"; botT.textContent = "ONE BUILDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "TOGETHER"], [2.0, "BRICK BY BRICK"], [T_R0, "THE ROOF"], [T_LIGHT, "HOME", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE SCROLLS"], [2.0, "HE BUILDS FOR TWO"], [5.0, "HER SIDE IS EMPTY", "#ff3b30"], [T_BR0, "THE ROOF"], [T_FALL, "IT FALLS", "#ff3b30"], [T_LOOK + 0.2, "SHE DIDN'T LOOK UP"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- FOLLOW: chimney smoke cloud ----------
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const puffs = Array.from({ length: 14 }, () => svgEl("circle", { r: 30, fill: "#d8d8d8", opacity: 0 }, ctaSvg));
        const hearts = Array.from({ length: 8 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, ctaSvg));
        const cloud = document.createElement("div");
        cloud.style.cssText = "position:absolute;left:540px;top:610px;height:120px;padding:0 56px;border-radius:60px;display:flex;align-items:center;justify-content:center;font-family:HFMono,monospace;font-weight:700;font-size:46px;letter-spacing:0.08em;white-space:nowrap;opacity:0;transform:translate(-50%,-50%)";
        E("stage").appendChild(cloud);
        const tom = label(0, 712, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const CLD = [540, 610];

        const CF = [HX, G - 150], CS = [540, 1130], ZK = 1.35;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const setRoof = (g, R) => g.setAttribute("transform", `translate(${r1(R.x)} ${r1(R.y)}) rotate(${r1(R.a)}) scale(1 ${R.sy.toFixed(3)})`);

        function drawBricks(set, list, t, carry, P, white, fallFn) {
          set.forEach((b, k) => {
            const tp = placedAt(k), [r, c] = list[k];
            if (t < tp) { b.setAttribute("opacity", 0); return; }
            let x = bx(c), y = by(r) - 10 * Math.exp(-(t - tp) * 20) * (t - tp < 0.15 ? 1 : 0), a = 0;
            if (fallFn) { const fl = fallFn(r, c, t); if (fl) { x += fl[0]; y += fl[1]; a = fl[2]; } }
            b.setAttribute("opacity", 1); b.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(a)})`);
          });
          const on = P.act && P.p > 0.22 && P.p < 0.72 && P.h;
          carry.setAttribute("opacity", on ? 1 : 0);
          if (on) carry.setAttribute("transform", `translate(${r1(P.h[0])} ${r1(P.h[1])})`);
        }
        const pileLeft = (arr, used) => arr.forEach((b, i) => b.setAttribute("opacity", i < arr.length - used ? 1 : 0));
        const usedBy = (t, n) => clamp(Math.floor((t - T0) / CYC + 1 - 0.22), 0, n) * (t > T0 + 0.22 * CYC ? 1 : 0);
        // the roof hits the middle column: its top bricks tumble to the left
        function fallB(r, c, t) {
          if (t < T_HIT || !((c === 1 && r >= 1) || (c === 2 && r === 3))) return null;
          const tau = t - T_HIT, d = (r - 0.5) * 0.04, q = Math.max(0, tau - d);
          const vx = -160 - 60 * r - (c === 2 ? 80 : 0), drop = G - BH / 2 - by(r);
          const yy = Math.min(drop, 0.5 * 2600 * q * q);
          return [vx * Math.min(q, 0.5) * (1 - 0.3 * Math.min(q, 0.5)), yy, -70 * Math.min(1, q * 2) * (r % 2 ? 1 : -1)];
        }

        function render(t) {
          // ---- top
          const Ph = placer(t, LIST.herT, 1, 400, 455, 440), Pm = placer(t, LIST.himT, -1, 840, 785, 800);
          drawBricks(BT.her, LIST.herT, t, carryT.her, Ph, true);
          drawBricks(BT.him, LIST.himT, t, carryT.him, Pm, true);
          pileLeft(pileHerT, usedBy(t, 6)); pileLeft(pileHimT, usedBy(t, 6));
          const Rt = roofTop(t); setRoof(RFT, Rt);
          const lit = t >= T_LIGHT;
          winT.setAttribute("opacity", t > 5.0 ? 1 : 0); winX.setAttribute("opacity", t > 5.0 ? 1 : 0); sw.setAttribute("opacity", t > 5.0 ? 1 : 0);
          const blink = t >= T_TAP && t < T_TAP + 0.12;
          winT.setAttribute("fill", lit && !blink ? "#ffd27a" : "#2a2a30");
          top.winG.setAttribute("opacity", (lit && !blink ? 0.9 * win(t, T_LIGHT, T_LIGHT + 0.4) * (t > T_TAP ? 1.25 : 1) : 0).toFixed(3));
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_SMK - 0.3, T_SMK));
          const hc = [HX, RTOP - 260], beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${hc[0]} ${hc[1]}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", hc[0]); top.glow.setAttribute("cy", hc[1]); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `${HX - 60},${PY0} ${HX + 60},${PY0} ${HX + 260},${G} ${HX - 260},${G}`);
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const Pb = placer(t, LIST.himB, -1, 840, 785, 800);
          drawBricks(BBk.him, LIST.himB, t, carryB, Pb, false, fallB);
          pileLeft(pileHimB, usedBy(t, 8)); pileLeft(pileHerB, 0);
          const Rb = roofBot(t); setRoof(RFB, Rb);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), -1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", ((0.75 + 0.15 * Math.sin(t * 5)) * (1 - 0.6 * win(t, T_LOOK, T_LOOK + 0.5))).toFixed(3));
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 6); e.setAttribute("transform", `translate(${r1(bp.head[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(bp.head[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_BR0, T_FALL + 0.3, 0.4) * (1 - q)).toFixed(3)); });
          dust.forEach((d, i) => { const q = clamp((t - T_HIT) / 1.4, 0, 1), a = (i / 12) * Math.PI; d.setAttribute("cx", r1(560 + Math.cos(a) * 240 * Math.sqrt(q))); d.setAttribute("cy", r1(G - 20 - Math.sin(a) * 90 * Math.sqrt(q))); d.setAttribute("r", r1(26 + 40 * q)); d.setAttribute("opacity", t > T_HIT ? (0.8 * (1 - q)).toFixed(3) : 0); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_HIT, T_HIT + 1.0)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "ONE CAN BUILD THE WALLS...", L3 = "NOBODY LIFTS A ROOF ALONE.";
          E("head").innerHTML = `<div>LOVE IS A HOUSE. #16</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.8 * win(t, T_CLOUD - 0.6, T_CLOUD)).toFixed(3);

          // ---- FOLLOW: smoke puffs from the chimney drift up into the cloud
          const chim = [Rt.x + 267, Rt.y - 112], cs = [c.ox + chim[0] * c.z, c.oy + (chim[1] - PY0) * c.z];
          puffs.forEach((p2, i) => {
            const t0 = T_SMK + i * 0.08, q = clamp((t - t0) / 1.0, 0, 1);
            const tx = CLD[0] + Math.cos(i * 2.39) * 150 * (i % 3 ? 1 : 0.5), ty = CLD[1] + Math.sin(i * 2.39) * 40;
            const x = lerp(cs[0], tx, ease(q)) + 20 * Math.sin(t * 2 + i), y = lerp(cs[1], ty, ease(q));
            p2.setAttribute("cx", r1(x)); p2.setAttribute("cy", r1(y)); p2.setAttribute("r", r1(14 + 34 * q));
            p2.setAttribute("opacity", t > t0 ? (0.75 * Math.min(1, q * 4) * (1 - win(t, T_CLOUD, T_CLOUD + 0.5))).toFixed(3) : 0);
          });
          const cq = sm(t, T_CLOUD - 0.3, T_CLOUD + 0.3), tapped = t >= T_TAP;
          cloud.style.opacity = cq.toFixed(3);
          cloud.style.filter = `blur(${r1(10 * (1 - cq))}px)`;
          cloud.style.background = tapped ? "#ffd27a" : "#e2e2e2"; cloud.style.color = tapped ? "#000" : "#333";
          cloud.style.boxShadow = tapped ? "0 0 70px rgba(255,200,100,0.9)" : "0 0 50px rgba(220,220,220,0.5)";
          cloud.style.border = tapped ? "6px solid #000" : "6px solid #9a9a9a";
          cloud.style.transform = `translate(-50%,-50%) scale(${(tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.25, 0, 1)) : 1 + 0.03 * Math.sin(t * 3)).toFixed(3)})`;
          cloud.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          hearts.forEach((h, i) => { const t0 = T_TAP + 0.15 + i * 0.12, q = clamp((t - t0) / 1.0, 0, 1); h.setAttribute("opacity", t > t0 && q < 1 ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(cs[0] + 30 * Math.sin(i * 1.7 + q * 4))} ${r1(cs[1] - 260 * q)}) scale(${(0.6 + 0.5 * q).toFixed(2)})`); });
          const TT = "LOVE IS A ... #17 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_TAP - 0.4) * 28)));
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
