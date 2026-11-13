        // ---------- "love is a tent. #13": winner split-screen format. Storm, gusts from left and right. BOTH HOLD: each holds a pole, the tent stands, after the storm they hug, the lantern inside lights up, heart. ONE HOLDS: she sits inside on her phone, he runs from pole to pole in the rain; the storm ends, he drops to his knees soaked, she unzips the door: "WHY ARE YOU SO TIRED?". FOLLOW: the door zipper tag "+ FOLLOW", she zips the door open, warm light, "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const PL = 500, PR = 780, PT = 215, DX = 640, LST = 430, RST = 850;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const flash = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#9fb8e0", opacity: 0 }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [340, 940]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const behind = svgEl("g", {}, inner);           // inside the tent
          const lamp = svgEl("circle", { cx: DX, cy: 430, r: 210, fill: "url(#fireGlow)", opacity: 0 }, inner);
          const tent = svgEl("g", {}, inner);
          const poleL = svgEl("line", { stroke: "#000", "stroke-width": 14, "stroke-linecap": "round" }, tent);
          const poleLw = svgEl("line", { stroke: "#b9a27a", "stroke-width": 7, "stroke-linecap": "round" }, tent);
          const poleR = svgEl("line", { stroke: "#000", "stroke-width": 14, "stroke-linecap": "round" }, tent);
          const poleRw = svgEl("line", { stroke: "#b9a27a", "stroke-width": 7, "stroke-linecap": "round" }, tent);
          const fab = svgEl("path", { fill: "#d9772e", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round", "fill-rule": "evenodd", opacity: 0.93 }, tent);
          const seam = svgEl("path", { fill: "none", stroke: "#7a3a12", "stroke-width": 4 }, tent);
          const zipLine = svgEl("path", { fill: "none", stroke: "#ffd25a", "stroke-width": 4, opacity: 0 }, tent);
          const ropes = svgEl("path", { fill: "none", stroke: "#e8e2d4", "stroke-width": 3 }, tent);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const rain = Array.from({ length: 46 }, () => svgEl("line", { stroke: "#a9c4e8", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, fx));
          const splash = Array.from({ length: 10 }, () => svgEl("ellipse", { fill: "none", stroke: "#a9c4e8", "stroke-width": 2, opacity: 0 }, fx));
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, flash, beams, glow, behind, lamp, tent, poleL, poleLw, poleR, poleRw, fab, seam, zipLine, ropes, figs, fx, rain, splash, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const toScreen = (P2, x, y) => [PX + x * PK, P2.y0 + (y - PY0) * PK];
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const GUSTS = [[1.2, -1], [2.9, 1], [4.6, -1], [6.2, 1], [7.6, -1]];   // [t, side]  -1 = left pole, 1 = right pole
        const GD = 1.0, T_FLASH = [0.15, 4.3], T_CALM = 8.8;
        const T_LETGO = 9.0, T_HUG = 9.9, T_HEART = 10.3;
        const T_KNEE = 9.0, T_DOOR = 9.6, T_ASK = 10.0;
        const T_H2 = 10.7, T_H3 = 11.6;
        const T_CTA = 13.4, T_TAG = T_CTA + 1.0, T_ZIP = T_TAG + 0.7, T_OPEN = T_ZIP + 1.0;
        const gust = (t, side) => GUSTS.reduce((k, [a, sd]) => Math.max(k, sd === side || side === 0 ? hold(t, a, a + GD, 0.3) : 0), 0);
        const storm = (t) => 1 - sm(t, T_CALM - 0.4, T_CALM + 0.6);
        // bottom: where he is. He runs to the gust side 0.7 s before each gust (the last one he is a bit late)
        const RUNS = GUSTS.map(([a, sd], i) => [a - (i === 4 ? 0.45 : 0.75), sd]);
        function heX(t) {
          let x = RST;
          for (const [r0, sd] of RUNS) { const to = sd < 0 ? LST : RST; if (t >= r0) x = lerp(x, to, sm(t, r0, r0 + 0.6)); }
          return x;
        }
        const heRunning = (t) => RUNS.some(([r0]) => t > r0 && t < r0 + 0.6);
        const heSide = (t) => (heX(t) < DX ? -1 : 1);
        // pole tilt: a gust bends its pole unless someone holds it
        function tilt(t, side, held) { const g = gust(t, side); return side * g * (held ? 3 : 14) * (0.7 + 0.3 * Math.sin(t * 9)); }

        // camera for the FOLLOW part: push into the top tent door
        const CF = [DX, 430], CS = [540, 1000], ZK = 1.45;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = toScreen(top, CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const camPt = (t, x, y) => { const c = cam(t); return [c.ox + x * c.z, c.oy + (y - PY0) * c.z]; };

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const running = (x) => { const ft = feetOn(0, x, 130, 22), sw = Math.sin((Math.PI * 2 * x) / 130); return base({ hx: x, hy: stand + 6 + 5 * Math.abs(sw), torso: 18, head: -4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 40 * sw, ael: 70, bsh: -4 - 40 * sw, bel: 70 }); };
        // holding a pole: f = which way the person faces (toward the pole)
        function holding(x, f, poleX, lean, poleTilt) {
          const st = standOn(x, f, FL); st.head = -6;
          st.torso += 8 + 10 * lean; st.hx -= f * 10 * lean;
          const top1 = [poleX + Math.sin((poleTilt * Math.PI) / 180) * 150, stand - 150];
          reachTo(st, 1, top1); reachTo(st, 1, [poleX + Math.sin((poleTilt * Math.PI) / 180) * 110, stand - 110], "b");
          return st;
        }
        // ---- top ----
        function topHer(t) {
          const st = holding(LST, 1, PL, gust(t, -1), tilt(t, -1, true));
          const lg = win(t, T_LETGO, T_LETGO + 0.4); st.aw *= 1 - lg; st.bw *= 1 - lg;
          const x = lerp(LST, 590, sm(t, T_LETGO + 0.2, T_HUG));
          if (t < T_LETGO + 0.2) return st;
          const w = standOn(x, 1, FL); w.head = -4;
          const hug = win(t, T_HUG - 0.2, T_HUG + 0.3) * (1 - win(t, T_CTA + 0.3, T_CTA + 0.7));
          reachTo(w, hug, [690 - 10, stand - 150]); reachTo(w, hug, [690 + 6, stand - 120], "b"); w.torso += 6 * hug;
          if (t > T_CTA + 0.3) {
            const x2 = lerp(590, 560, sm(t, T_CTA + 0.3, T_CTA + 0.9)); w.hx += x2 - 590; w.ax += x2 - 590; w.bx += x2 - 590;
            const zp = sm(t, T_ZIP, T_OPEN), rch = hold(t, T_TAG + 0.2, T_OPEN + 0.25, 0.3);
            reachTo(w, rch, [DX - 10, lerp(FL - 50, PT + 70, zp)]); w.head = lerp(w.head, -6 - 10 * zp, rch);
            const cheer = hold(t, T_OPEN + 0.35, T_OPEN + 1.5, 0.2), wv = 14 * Math.sin(t * 14);
            reachTo(w, cheer, [x2 - 35, stand - 250 + wv]); reachTo(w, cheer, [x2 + 35, stand - 250 - wv], "b");
          }
          return w;
        }
        function topHim(t) {
          const st = holding(RST, -1, PR, gust(t, 1), tilt(t, 1, true));
          const lg = win(t, T_LETGO, T_LETGO + 0.4); st.aw *= 1 - lg; st.bw *= 1 - lg;
          if (t < T_LETGO + 0.2) return st;
          const x = lerp(RST, 690, sm(t, T_LETGO + 0.2, T_HUG));
          const w = standOn(x, -1, FL); w.head = 4;
          const hug = win(t, T_HUG - 0.2, T_HUG + 0.3) * (1 - win(t, T_CTA + 0.3, T_CTA + 0.7));
          reachTo(w, hug, [590 + 10, stand - 130]); reachTo(w, hug, [590 - 4, stand - 100], "b");
          if (t > T_CTA + 0.3) {
            const x2 = lerp(690, 730, sm(t, T_CTA + 0.3, T_CTA + 0.9)); w.hx += x2 - 690; w.ax += x2 - 690; w.bx += x2 - 690;
            const pt = hold(t, T_TAG, T_ZIP, 0.3); reachTo(w, pt, [DX + 40, FL - 70]);
            const cheer = hold(t, T_OPEN + 0.35, T_OPEN + 1.5, 0.2), wv = 14 * Math.sin(t * 14 + 1);
            reachTo(w, cheer, [x2 - 35, stand - 250 + wv]); reachTo(w, cheer, [x2 + 35, stand - 250 - wv], "b");
          }
          return w;
        }
        // ---- bottom ----
        function botHim(t) {
          const x = heX(t), sd = heSide(t);
          if (heRunning(t)) return running(x);
          if (t < T_CALM) return holding(x, sd < 0 ? 1 : -1, sd < 0 ? PL : PR, gust(t, sd), tilt(t, sd, true));
          // exhausted: hands on knees, then looks up at her
          const st = standOn(x, -1, FL);
          const k = win(t, T_KNEE, T_KNEE + 0.5);
          st.torso += 42 * k; st.head = lerp(-6, 30, k); st.hy += 26 * k; st.ax -= 10 * k; st.bx += 10 * k;
          reachTo(st, k, [x - 34, FL - 96]); reachTo(st, k, [x - 20, FL - 92], "b");
          st.torso += 3 * Math.sin(t * 6) * k;   // heavy breathing
          const lk = win(t, T_ASK + 0.4, T_ASK + 0.8); st.head = lerp(st.head, -10, lk);
          return st;
        }
        const botHimF = (t) => (heRunning(t) ? (heX(t + 0.05) > heX(t) ? 1 : -1) : t < T_CALM ? (heSide(t) < 0 ? 1 : -1) : -1);
        function botHer(t) {
          // inside, scrolling; then steps into the doorway
          const st = standOn(DX - 10, 1, FL); st.head = 26; st.torso = 6;
          const ex = win(t, T_DOOR, T_DOOR + 0.4);
          reachTo(st, 1 - 0.5 * ex, [DX + 34, stand - 116]); reachTo(st, 1 - ex, [DX + 26, stand - 110], "b");
          st.head = lerp(st.head, -4, ex);
          return st;
        }

        const mkFigs = (P2, white) => {
          const her = makeFig(white ? P2.figs : P2.behind, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + (white ? "T" : "B"));
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, white ? P2.figs : P2.behind);
          const him = makeFig(P2.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + (white ? "T" : "B"));
          return { bun, her, him };
        };
        const TF = mkFigs(top, true), BF = mkFigs(bot, false);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.behind);
        const phoneGlow = svgEl("circle", { r: 90, fill: "url(#phoneGlow)", opacity: 0.8 }, bot.tent);
        const lantern = svgEl("g", { opacity: 0 }, top.behind);
        svgEl("path", { d: "M0 -40 L0 -18", stroke: "#000", "stroke-width": 3 }, lantern);
        svgEl("rect", { x: -14, y: -18, width: 28, height: 36, rx: 6, fill: "#ffd25a", stroke: "#000", "stroke-width": 4 }, lantern);
        const drips = Array.from({ length: 8 }, () => svgEl("circle", { r: 4, fill: "#a9c4e8", opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { points: `${DX - 50},${PY0} ${DX + 50},${PY0} ${DX + 170},${FL} ${DX - 170},${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bubG = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("rect", { x: -250, y: -44, width: 500, height: 76, rx: 32, fill: "#fff", stroke: "#000", "stroke-width": 5 }, bubG);
        svgEl("path", { d: "M-130 30 L-160 66 L-96 30 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, bubG);
        svgEl("rect", { x: -134, y: 24, width: 42, height: 10, fill: "#fff" }, bubG);
        const bubT = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#111", "text-anchor": "middle" }, bubG);

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH HOLD"; botT.textContent = "ONE HOLDS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "EACH HOLDS A SIDE"], [GUSTS[1][0], "THE STORM PULLS"], [GUSTS[3][0], "THEY DON'T LET GO"], [T_CALM, "STORM OVER"], [T_HEART, "STILL STANDING", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE'S INSIDE"], [RUNS[0][0], "LEFT!"], [RUNS[1][0], "RIGHT!"], [RUNS[2][0], "LEFT!"], [RUNS[3][0], "RIGHT!"], [RUNS[4][0], "LEFT! TOO LATE?", "#ff3b30"], [T_CALM, "HE HELD IT ALONE"], [T_ASK, "SHE NEVER SAW THE STORM", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---- FOLLOW layer ----
        const tagEl = document.createElement("div");
        tagEl.style.cssText = "position:absolute;height:64px;border-radius:12px;display:flex;align-items:center;justify-content:center;white-space:nowrap;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.08em;border:5px solid #000;padding:0 20px;opacity:0";
        E("stage").appendChild(tagEl);
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1400px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.14em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const fist = svgEl("g", { opacity: 0 }, ctaSvg);
        const armO = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 44, "stroke-linecap": "round" }, fist);
        const armW = svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 29, "stroke-linecap": "round" }, fist);
        const sparks = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, ctaSvg));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function drawTent(P2, t, tl, tr, doorOpen, zip) {
          const rl = (tl * Math.PI) / 180, rr = (tr * Math.PI) / 180;
          const L = [PL + Math.sin(rl) * (FL - PT), FL - Math.cos(rl) * (FL - PT)], R = [PR + Math.sin(rr) * (FL - PT), FL - Math.cos(rr) * (FL - PT)];
          const gl = gust(t, -1) * storm(t), gr = gust(t, 1) * storm(t), flap = 8 * Math.sin(t * 17) * storm(t);
          P2.poleL.setAttribute("x1", PL); P2.poleL.setAttribute("y1", FL); P2.poleL.setAttribute("x2", r1(L[0])); P2.poleL.setAttribute("y2", r1(L[1] - 14));
          P2.poleR.setAttribute("x1", PR); P2.poleR.setAttribute("y1", FL); P2.poleR.setAttribute("x2", r1(R[0])); P2.poleR.setAttribute("y2", r1(R[1] - 14));
          for (const [a, b] of [[P2.poleL, P2.poleLw], [P2.poleR, P2.poleRw]]) for (const k of ["x1", "y1", "x2", "y2"]) b.setAttribute(k, a.getAttribute(k));
          const bl = 40 * gl - 26 * gr, mid = [(L[0] + R[0]) / 2 + bl * 0.5, (L[1] + R[1]) / 2 + 10 + flap];
          let d = `M410 ${FL} Q${r1(L[0] - 60 + bl)} ${r1((L[1] + FL) / 2)} ${r1(L[0])} ${r1(L[1])} Q${r1(mid[0])} ${r1(mid[1])} ${r1(R[0])} ${r1(R[1])} Q${r1(R[0] + 60 + bl)} ${r1((R[1] + FL) / 2)} 870 ${FL} Z`;
          const dt = [(L[0] + R[0]) / 2, mid[1] + 18];
          if (doorOpen > 0) { const w = 70 * doorOpen; d += ` M${r1(DX - w)} ${FL} L${r1(dt[0])} ${r1(dt[1] + 10)} L${r1(DX + w)} ${FL} Z`; }
          P2.fab.setAttribute("d", d);
          P2.seam.setAttribute("d", doorOpen > 0 ? "" : `M${r1(dt[0])} ${r1(dt[1])} L${DX} ${FL}`);
          P2.zipLine.setAttribute("d", `M${DX} ${FL} L${DX} ${r1(lerp(FL, dt[1], zip))}`); P2.zipLine.setAttribute("opacity", zip > 0 && doorOpen <= 0 ? 1 : 0);
          P2.ropes.setAttribute("d", `M${r1(L[0])} ${r1(L[1])} L${r1(L[0] - 150)} ${FL} M${r1(R[0])} ${r1(R[1])} L${r1(R[0] + 150)} ${FL}`);
          return { L, R, door: dt };
        }
        function drawRain(P2, t, k) {
          P2.rain.forEach((l, i) => {
            const q = frac(t * 1.7 + (i * 0.618) % 1), x = ((i * 97) % (PW + 300)) - 150 + 140 * q, y = PY0 - 40 + (FL - PY0 + 80) * q;
            l.setAttribute("x1", r1(x)); l.setAttribute("y1", r1(y)); l.setAttribute("x2", r1(x - 18)); l.setAttribute("y2", r1(y - 44));
            l.setAttribute("opacity", (0.55 * k).toFixed(3));
          });
          P2.splash.forEach((e, i) => { const q = frac(t * 2.3 + i / 10); e.setAttribute("cx", r1((i * 131) % PW)); e.setAttribute("cy", FL + 4); e.setAttribute("rx", r1(4 + 20 * q)); e.setAttribute("ry", r1(2 + 4 * q)); e.setAttribute("opacity", (0.6 * (1 - q) * k).toFixed(3)); });
          const fl = T_FLASH.reduce((m, a) => Math.max(m, a < t && t < a + 0.35 ? (1 - (t - a) / 0.35) * (Math.sin((t - a) * 60) > -0.3 ? 1 : 0.3) : 0), 0);
          P2.flash.setAttribute("opacity", (0.28 * fl).toFixed(3));
        }

        function render(t) {
          // ---- top
          const ttl = tilt(t, -1, true), ttr = tilt(t, 1, true);
          const zip = sm(t, T_ZIP, T_OPEN), open = win(t, T_OPEN, T_OPEN + 0.4);
          const T = drawTent(top, t, ttl, ttr, open, zip);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), -1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          drawRain(top, t, storm(t));
          const lk = win(t, T_HEART - 0.3, T_HEART + 0.3);
          top.lamp.setAttribute("opacity", (0.9 * lk + 0.3 * open).toFixed(3));
          top.fab.setAttribute("fill", lk > 0.5 ? "#f09a4a" : "#d9772e");
          lantern.setAttribute("opacity", lk.toFixed(3)); lantern.setAttribute("transform", `translate(${r1(T.door[0])} ${r1(T.door[1] + 60)})`);
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_TAG - 0.4, T_TAG));
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${DX} 190) scale(${(backOut(hk) * 0.85 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", DX); top.glow.setAttribute("cy", 190); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("opacity", (0.4 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const hx = heX(t), held = (sd) => !heRunning(t) && heSide(t) === sd;
          const bdoor = win(t, T_DOOR, T_DOOR + 0.4);
          drawTent(bot, t, tilt(t, -1, held(-1)), tilt(t, 1, held(1)), bdoor, 0); bot.fab.setAttribute("opacity", 0.78);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), botHimF(t));
          const ph = sp.hands[0];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1] - 8)})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1] - 8)); phoneGlow.setAttribute("opacity", ((0.75 + 0.15 * Math.sin(t * 5)) * (1 - 0.6 * bdoor)).toFixed(3));
          drawRain(bot, t, storm(t));
          drips.forEach((e, i) => { const q = frac(t * 1.3 + i / 8); e.setAttribute("cx", r1(bp.head[0] - 30 + (i * 23) % 70)); e.setAttribute("cy", r1(bp.head[1] + 20 + 160 * q)); e.setAttribute("opacity", t > T_CALM ? (0.8 * (1 - q)).toFixed(3) : 0); });
          const bq = hold(t, T_ASK, DUR, 0.15), msg = "WHY ARE YOU SO TIRED?";
          bubG.setAttribute("opacity", bq.toFixed(3)); bubG.setAttribute("transform", `translate(${DX + 170} 150) scale(${(0.6 + 0.4 * backOut(bq)).toFixed(3)})`);
          bubT.textContent = msg.slice(0, Math.max(0, Math.floor((t - T_ASK - 0.1) * 34)));
          bot.dark.setAttribute("opacity", (0.25 * win(t, T_ASK + 1.2, T_ASK + 2.2)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0]; topS.style.color = typed(TOPSEQ, t)[1] || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "SHE NEVER SAW THE STORM.", L3 = "ONLY THAT HE WAS TIRED.";
          E("head").innerHTML = `<div>LOVE IS A TENT. #13</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;

          // ---- FOLLOW: zipper tag ----
          const tq = win(t, T_TAG, T_TAG + 0.35);
          const tagW = [DX, lerp(FL - 46, T.door[1] + 40, zip)];
          const S0 = camPt(t, tagW[0], tagW[1]);
          const opened = t >= T_OPEN;
          tagEl.style.opacity = tq.toFixed(3);
          tagEl.style.left = r1(S0[0] + 18) + "px"; tagEl.style.top = r1(S0[1] - 32) + "px";
          tagEl.style.transform = `scale(${(0.6 + 0.4 * backOut(tq)).toFixed(3)}) rotate(${r1(opened ? 0 : 6 * Math.sin(t * 5))}deg)`;
          tagEl.style.transformOrigin = "0 50%";
          tagEl.style.background = opened ? "#ffffff" : "#ff3b30"; tagEl.style.color = opened ? "#000" : "#fff";
          tagEl.style.boxShadow = opened ? "0 0 40px rgba(255,210,90,0.8)" : "0 0 30px rgba(255,59,48,0.6)";
          tagEl.textContent = opened ? "FOLLOWING ✓" : "+ FOLLOW";
          const hw = hp.hands[0], hs = camPt(t, hw[0], hw[1]), es = camPt(t, hw[0] - 40, hw[1] + 24);
          fist.setAttribute("opacity", t > T_TAG + 0.3 && t < T_OPEN + 0.3 && hs[0] > S0[0] - 60 ? 1 : 0);
          const ad = `M${r1(es[0])} ${r1(es[1])} L${r1(hs[0])} ${r1(hs[1])}`; armO.setAttribute("d", ad); armW.setAttribute("d", ad);
          const dq = camPt(t, T.door[0], T.door[1] + 120);
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_OPEN) / 1.4, 0, 1), a = -Math.PI / 2 + (i - 5.5) * 0.24; s2.setAttribute("opacity", opened && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(dq[0] + Math.cos(a) * 380 * q3)} ${r1(dq[1] + Math.sin(a) * 300 * q3)}) scale(${(1.1 - 0.4 * q3).toFixed(2)})`); });
          const sq = t - (T_TAG + 0.4), line1 = "LOVE IS A ... #14", line2 = "TOMORROW.";
          sub.innerHTML = sq > 0 ? `${line1.slice(0, Math.floor(sq * 30))}&nbsp;<br/>${line2.slice(0, Math.max(0, Math.floor((sq - 0.7) * 30)))}&nbsp;` : "";
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
