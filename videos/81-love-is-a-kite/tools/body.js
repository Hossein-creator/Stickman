        // ---------- "love is a kite": winner split-screen format (reel 36) + TEST of the new ending (user, 2026-11-10): quote over the still-moving payoff, then the heart-kite flies out and becomes a "+ FOLLOW" button that gets tapped.
        // BOTH HOLD: they hold the string together, every gust lifts the kite higher, it turns into a red heart. ONE HOLDS: she lets go for her phone, the gust pulls him forward, the string slips, the kite flies away.
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SHE = 300, HE = 450;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [380, 980]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.28 }, beams);
          const stars = svgEl("g", {}, inner);
          for (let i = 0; i < 26; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 300), r: 2 + (i % 3), fill: "#fff", opacity: 0.25 }, stars);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const string = svgEl("path", { fill: "none", stroke: "#e8e2d4", "stroke-width": 3 }, inner);
          const kiteG = svgEl("g", {}, inner);
          const tail = svgEl("path", { fill: "none", stroke: "#e8e2d4", "stroke-width": 3 }, kiteG);
          const bows = [0, 1, 2].map(() => svgEl("path", { d: "M-12 -8 L0 0 L-12 8 Z M12 -8 L0 0 L12 8 Z", fill: "#ff5a4a", stroke: "#000", "stroke-width": 3 }, kiteG));
          const body = svgEl("g", {}, kiteG);
          svgEl("path", { d: "M0 -62 L44 0 L0 86 L-44 0 Z", fill: "#ffc93c", stroke: "#000", "stroke-width": 5 }, body);
          svgEl("path", { d: "M0 -62 L0 86 M-44 0 L44 0", stroke: "#7a5a1a", "stroke-width": 3 }, body);
          svgEl("path", { d: "M0 -62 L44 0 L0 0 Z", fill: "#ff9b3c", stroke: "#000", "stroke-width": 3 }, body);
          const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, kiteG);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const winds = Array.from({ length: 8 }, () => svgEl("path", { fill: "none", stroke: "#cfe3ff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fx));
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, string, kiteG, tail, bows, body, heart, figs, fx, winds, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const toScreen = (P2, x, y) => [PX + x * PK, P2.y0 + (y - PY0) * PK];

        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const GU = [0.6, 1.9, 3.1];          // wind gusts (from the right, pull the kite away)
        const GD = 0.9;
        const T_LET = 0.4, T_SLIP = 3.6, T_HEART = 4.8, T_LEAN = 5.3;
        const T_T1 = 5.6, T_T2 = 6.1, T_Q = 7.0, T_CTA = 9.4, T_PILL = T_CTA + 0.9, T_TAP = T_PILL + 1.3;   // 15 s cut (stats 2026-11-10)
        // camera push-in on the top couple for the FOLLOW part
        const CF = [520, 430], CS = [540, 1020], ZK = 1.55, PILL = [660, 370];
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = toScreen(top, CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - CF[1] * z }; };
        const camPt = (t, x, y) => { const c = cam(t); return [c.ox + x * c.z, c.oy + y * c.z]; };
        const gust = (t) => GU.reduce((k, a) => Math.max(k, hold(t, a, a + GD, 0.3)), 0);
        // kite position: top climbs with every gust
        const climbTop = (t) => GU.reduce((c, a) => c + sm(t, a + 0.2, a + GD + 0.3), 0) / GU.length;
        function kiteTop(t) {
          const c = climbTop(t);
          return [lerp(800, 950, c) + 30 * Math.sin(t * 1.3), lerp(330, 190, c) + 14 * Math.sin(t * 2.1), 10 * Math.sin(t * 1.7) + 12 * gust(t)];
        }
        function kiteBot(t) {
          const sag = sm(t, T_LET, T_LET + 1.2);
          let x = lerp(800, 840, sag) + 30 * Math.sin(t * 1.3) + 50 * gust(t), y = lerp(330, 420, sag) + 14 * Math.sin(t * 2.1) - 30 * gust(t), r = 10 * Math.sin(t * 1.7) + 25 * gust(t) + 12 * sag * Math.sin(t * 5);
          const f = sm(t, T_SLIP, T_SLIP + 1.8);
          return [x + 620 * f, y - 420 * f + 60 * Math.sin(f * 3), r + 260 * f];
        }
        const pullBot = (t) => (t < T_SLIP ? hold(t, GU[1], GU[1] + GD, 0.3) * 0.6 + hold(t, GU[2], T_SLIP + 0.05, 0.3) : 0);

        // hands: one string point per person
        const handPt = (x, k = 0) => [x + 92 + 30 * k, stand - 150 + 20 * k];
        function holder(x, t, lean, k) {
          const st = standOn(x + 40 * k, 1, FL); st.head = -6;
          st.torso -= 10 * lean; st.head -= 8 * lean;
          const p = handPt(x + 40 * k, k);
          reachTo(st, 1, p); reachTo(st, 1, [p[0] - 8, p[1] + 10], "b");
          return st;
        }
        // after the heart becomes the button: he points at it, she taps it, both cheer, then hug and look at you
        function ctaPose(st, t, me, other, f) {
          const r = win(t, T_PILL, T_PILL + 0.4); st.aw *= 1 - r; st.bw *= 1 - r;
          const cheer = win(t, T_TAP + 0.35, T_TAP + 0.6) * (1 - win(t, T_TAP + 1.5, T_TAP + 1.8));
          const wv = 14 * Math.sin(t * 14);
          reachTo(st, cheer, [me - 35, stand - 250 + wv]); reachTo(st, cheer, [me + 35, stand - 250 - wv], "b");
          st.head = lerp(st.head, -14, cheer);
          const hug = win(t, T_TAP + 1.6, T_TAP + 2.0);
          st.hx += f * 34 * hug; st.ax += f * 34 * hug; st.bx += f * 34 * hug;
          reachTo(st, hug, [other + (f > 0 ? -10 : 40), stand - 160]); reachTo(st, hug, [other + (f > 0 ? -20 : 30), stand - 120], "b");
          return st;
        }
        const topHer = (t) => {
          const st = holder(SHE, t, gust(t), 0); const l = win(t, T_LEAN, T_LEAN + 0.5); st.head += 22 * l; st.hx += 22 * l;
          if (t < T_PILL) return st;
          st.head = lerp(st.head, -4, win(t, T_PILL, T_PILL + 0.4));
          ctaPose(st, t, SHE, HE, 1);
                    const pt = hold(t, T_PILL + 0.25, T_TAP - 0.1, 0.3);
          reachTo(st, pt, [SHE - 40 + 22 * Math.sin(t * 11), stand - 235]); st.head = lerp(st.head, -10, pt);
          return st;
        };
        const topHim = (t) => {
          const st = holder(HE, t, gust(t), 0); const l = win(t, T_LEAN, T_LEAN + 0.5); st.head -= 6 * l;
          if (t < T_PILL) return st;
          ctaPose(st, t, HE, SHE, -1);
          const tap = hold(t, T_TAP - 0.55, T_TAP + 0.3, 0.35), press = t > T_TAP - 0.1 && t < T_TAP + 0.12 ? 10 : 0;
          reachTo(st, tap, [PILL[0] - 104 + press, PILL[1] + 4]); st.head = lerp(st.head, -4, tap);
          return st;
        };
        function botHer(t) {
          const let1 = win(t, T_LET, T_LET + 0.4);
          if (let1 <= 0) return holder(SHE, t, gust(t), 0);
          const st = standOn(SHE, 1, FL); st.head = lerp(-6, 24, let1); st.torso = 4 * let1;
          const p = handPt(SHE);
          reachTo(st, 1, [lerp(p[0], SHE + 42, let1), lerp(p[1], stand - 116, let1)]); reachTo(st, 1, [lerp(p[0] - 8, SHE + 34, let1), lerp(p[1] + 10, stand - 110, let1)], "b");
          return st;
        }
        function botHim(t) {
          const k = pullBot(t), slip = win(t, T_SLIP, T_SLIP + 0.3);
          const drag = sm(t, GU[2], T_SLIP) * 50;
          if (slip <= 0) { const st = holder(HE + drag, t, -0.6 * k, k * 0.6); st.torso += 14 * k; return st; }
          const st = standOn(HE + 50 + 30 * slip, 1, FL); st.head = lerp(-6, -24, slip);
          const reach = hold(t, T_SLIP, T_SLIP + 1.4, 0.3);
          reachTo(st, 1, [HE + 170, stand - 250]); reachTo(st, reach, [HE + 160, stand - 230], "b");
          const slump = win(t, T_SLIP + 1.3, T_SLIP + 1.9);
          st.head = lerp(st.head, 30, slump); st.torso += 14 * slump;
          st.aw *= 1 - slump; st.bw *= 1 - slump;
          return st;
        }

        const mkFigs = (P2, white) => {
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, P2.figs);
          const her = makeFig(P2.figs, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + (white ? "T" : "B"));
          P2.figs.insertBefore(bun, her.g.previousSibling);
          const him = makeFig(P2.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + (white ? "T" : "B"));
          return { bun, her, him };
        };
        const TF = mkFigs(top, true), BF = mkFigs(bot, false);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0 }, bot.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH HOLD ON"; botT.textContent = "ONE HOLDS ON";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "WIND! THEY HOLD ON"], [GU[1] + 0.4, "HIGHER"], [GU[2] + 0.4, "HIGHER STILL"], [T_HEART, "IT FLIES", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE LETS GO"], [GU[1] + 0.2, "WIND! HE HOLDS ALONE"], [GU[2] + 0.2, "TOO STRONG"], [T_SLIP + 0.1, "IT FLEW AWAY", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A KITE. #11"], [T_T1, "IT ONLY FLIES"], [T_T2, "WHEN BOTH HOLD ON."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---- ending layer: dim over the moving scene, quote, then the FOLLOW button ----
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const QW = ["HE", "WASN'T", "TOO", "WEAK.", "|", "HE", "WAS", "HOLDING", "IT", "|", "ALONE."];
        const quote = document.createElement("div");
        quote.style.cssText = "position:absolute;left:120px;right:120px;top:600px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;font-size:46px;line-height:1.35;letter-spacing:0.06em;text-shadow:0 0 18px rgba(255,255,255,0.35)";
        E("stage").appendChild(quote);
        const qName = document.createElement("div");
        qName.style.cssText = "position:absolute;left:120px;right:120px;top:880px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:24px;color:#9a9a9a;letter-spacing:0.22em;opacity:0";
        qName.textContent = "";
        E("stage").appendChild(qName);

        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const flyHeart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, ctaSvg);
        const trail = Array.from({ length: 6 }, () => svgEl("circle", { r: 8, fill: "#ff6a60", opacity: 0 }, ctaSvg));
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", opacity: 0 }, ctaSvg));
        const pill = document.createElement("div");
        pill.style.cssText = "position:absolute;left:540px;top:1000px;height:96px;border-radius:48px;display:flex;align-items:center;justify-content:center;white-space:nowrap;overflow:hidden;font-family:HFMono,monospace;font-weight:700;font-size:38px;letter-spacing:0.1em;opacity:0;border:5px solid #000;box-shadow:0 0 40px rgba(255,59,48,0.55)";
        E("stage").appendChild(pill);
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1330px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.14em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const hand = svgEl("g", { opacity: 0 }, ctaSvg);
        svgEl("path", { d: "M0 10 L0 -64", stroke: "#000", "stroke-width": 40, "stroke-linecap": "round" }, hand);
        svgEl("path", { d: "M0 10 L0 -64", stroke: "#fff", "stroke-width": 26, "stroke-linecap": "round" }, hand);
        svgEl("rect", { x: -26, y: 0, width: 80, height: 90, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 6 }, hand);
        svgEl("path", { d: "M-26 30 Q-50 20 -40 0", fill: "none", stroke: "#000", "stroke-width": 6 }, hand);
        const ring = svgEl("circle", { cx: 540, cy: 1048, r: 40, fill: "none", stroke: "#fff", "stroke-width": 5, opacity: 0 }, ctaSvg);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        function drawWind(P2, t, k) {
          P2.winds.forEach((w, i) => {
            const q = ((t * 1.6 + i / P2.winds.length) % 1 + 1) % 1, y = PY0 + 120 + (i * 61) % (FL - PY0 - 200);
            const x0 = lerp(PW + 100, -100, q);
            w.setAttribute("d", `M${r1(x0)} ${y} q-60 -18 -120 0 t-110 6`);
            w.setAttribute("opacity", (0.55 * k * Math.sin(Math.PI * q)).toFixed(3));
          });
        }
        function drawKite(P2, k, t, hk, from, slack) {
          const [x, y, r] = k;
          P2.kiteG.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(r)})`);
          P2.body.setAttribute("transform", `scale(${(1 - backOut(hk) * 0 - hk).toFixed(3)})`);
          P2.heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hk >= 1 ? 1 : 0);
          P2.heart.setAttribute("transform", `scale(${(backOut(hk) * 1.25 * beat).toFixed(3)})`);
          // tail
          let d = "M0 86"; const pts = [];
          for (let i = 1; i <= 12; i++) { const yy = 86 + i * 14, xx = 14 * Math.sin(t * 6 - i * 0.6) * (i / 12); d += ` L${r1(xx)} ${yy}`; if (i % 4 === 0) pts.push([xx, yy]); }
          P2.tail.setAttribute("d", d); P2.tail.setAttribute("opacity", (1 - hk).toFixed(3));
          P2.bows.forEach((b, i) => { b.setAttribute("transform", `translate(${r1(pts[i][0])} ${pts[i][1]})`); b.setAttribute("opacity", (1 - hk).toFixed(3)); });
          // string from the hands to the kite's bottom point
          const rad = (r * Math.PI) / 180, by = hk > 0 ? lerp(86, 40, hk) : 86;
          const ex = x - by * Math.sin(rad), ey = y + by * Math.cos(rad);
          if (!from) { P2.string.setAttribute("d", ""); return; }
          const pts2 = [...from, [ex, ey]];
          let s = `M${r1(pts2[0][0])} ${r1(pts2[0][1])}`;
          for (let i = 1; i < pts2.length - 1; i++) s += ` L${r1(pts2[i][0])} ${r1(pts2[i][1])}`;
          const a = pts2[pts2.length - 2], mx = (a[0] + ex) / 2, my = (a[1] + ey) / 2 + 60 * slack;
          s += ` Q${r1(mx)} ${r1(my)} ${r1(ex)} ${r1(ey)}`;
          P2.string.setAttribute("d", s);
        }
        const mid = (p) => [(p.hands[0][0] + p.hands[1][0]) / 2, (p.hands[0][1] + p.hands[1][1]) / 2];
        function render(t) {
          const gk = gust(t);
          // ---- top: BOTH HOLD ON
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.45);
          const kt = kiteTop(t);
          const flyOut = t >= T_PILL ? 1 : 0;
          const dq = sm(t, T_CTA + 0.2, T_PILL);
          if (dq > 0) { kt[0] = lerp(kt[0], PILL[0], dq); kt[1] = lerp(kt[1], PILL[1], dq) - 80 * Math.sin(Math.PI * dq); kt[2] = lerp(kt[2], 0, dq); }
          drawKite(top, kt, t, hk, flyOut > 0 ? null : [mid(hp), mid(mp)], (0.6 - 0.5 * climbTop(t) - 0.3 * gk) * (1 - dq) + 0.5 * dq);
          top.kiteG.setAttribute("opacity", (1 - flyOut).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));
          drawWind(top, t, gk);
          const done = win(t, T_HEART - 0.2, T_HEART + 0.4) * (1 - flyOut);
          top.glow.setAttribute("cx", r1(kt[0])); top.glow.setAttribute("cy", r1(kt[1]));
          top.glow.setAttribute("opacity", (0.8 * done).toFixed(3));
          redSpot.setAttribute("points", `${r1(kt[0] - 50)},${PY0} ${r1(kt[0] + 50)},${PY0} ${r1(kt[0] + 160)},${FL} ${r1(kt[0] - 160)},${FL}`);
          redSpot.setAttribute("opacity", (0.45 * done).toFixed(3));
          // ---- bottom: ONE HOLDS ON
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const pk = win(t, T_LET + 0.2, T_LET + 0.5);
          const pp = mid(sp);
          phone.setAttribute("transform", `translate(${r1(pp[0])} ${r1(pp[1] - 10)}) scale(${pk.toFixed(3)})`);
          phoneGlow.setAttribute("cx", r1(pp[0])); phoneGlow.setAttribute("cy", r1(pp[1] - 10)); phoneGlow.setAttribute("opacity", (0.6 * pk).toFixed(3));
          const kb = kiteBot(t);
          const holders = t < T_LET ? [mid(sp), mid(bp)] : [mid(bp)];
          if (t >= T_SLIP) {
            // loose string trailing under the kite
            const f = sm(t, T_SLIP, T_SLIP + 1.8);
            drawKite(bot, kb, t, 0, [[kb[0] - 120 - 60 * f, kb[1] + 300 - 40 * Math.sin(t * 4)]], 0.8);
          } else drawKite(bot, kb, t, 0, holders, 0.3 + 0.6 * sm(t, T_LET, T_LET + 1) - 0.6 * gk);
          drawWind(bot, t, t < T_SLIP + 0.6 ? gk : 0);
          bot.dark.setAttribute("opacity", (0.4 * win(t, T_SLIP + 0.3, T_SLIP + 1.2)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0]; topS.style.color = typed(TOPSEQ, t)[1] || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          // ---- ending: quote over the moving scene, then FOLLOW ----
          const qOut = win(t, T_CTA - 0.35, T_CTA);
          dim.style.opacity = (0.62 * win(t, T_Q - 0.4, T_Q) * (1 - win(t, T_CTA - 0.3, T_CTA + 0.5))).toFixed(3);
          let wi = 0;
          quote.innerHTML = QW.map((w) => { if (w === "|") return "<br/>"; const t0 = T_Q + 0.065 * wi++; const q = clamp((t - t0) / 0.18, 0, 1); return `<span style="display:inline-block;margin:0 0.14em;opacity:${q.toFixed(2)};transform:translateY(${r1(12 * (1 - q))}px);${["ALONE."].includes(w) ? "color:#ff6a60;" : ""}">${w}</span>`; }).join("");
          quote.style.opacity = (1 - qOut).toFixed(3);
          qName.style.opacity = (win(t, T_Q + 1.1, T_Q + 1.4) * (1 - qOut)).toFixed(3);
          const PS = camPt(t, PILL[0], PILL[1]);
          // pill
          const pq = win(t, T_PILL - 0.05, T_PILL + 0.3);
          const tapped = t >= T_TAP;
          const press = tapped ? 1 - 0.08 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.18, 0, 1)) : 1;
          const w = lerp(96, tapped ? 420 : 360, backOut(pq));
          pill.style.opacity = pq > 0 ? 1 : 0;
          pill.style.width = r1(w) + "px"; pill.style.left = r1(PS[0] - w / 2) + "px"; pill.style.top = r1(PS[1] - 48) + "px";
          pill.style.transform = `scale(${(press * (1 + 0.04 * Math.max(0, Math.sin(t * 6)) * (tapped ? 0 : 1))).toFixed(3)})`;
          pill.style.background = tapped ? "#ffffff" : "#ff3b30";
          pill.style.color = tapped ? "#000" : "#fff";
          pill.style.boxShadow = tapped ? "0 0 40px rgba(255,255,255,0.5)" : "0 0 40px rgba(255,59,48,0.6)";
          pill.innerHTML = pq < 0.5 ? "" : tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          const sq = t - (T_PILL + 0.5), line1 = "LOVE IS A ... #12", line2 = "TOMORROW.";
          sub.innerHTML = sq > 0 ? `${line1.slice(0, Math.floor(sq * 34))}&nbsp;<br/>${line2.slice(0, Math.max(0, Math.floor((sq - 0.65) * 34)))}&nbsp;` : "";
          const rq = clamp((t - T_TAP) / 0.5, 0, 1);
          ring.setAttribute("opacity", tapped && rq < 1 ? (1 - rq).toFixed(3) : 0); ring.setAttribute("r", r1(30 + 300 * rq)); ring.setAttribute("cx", r1(PS[0])); ring.setAttribute("cy", r1(PS[1]));
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(PS[0] + Math.cos(a) * 320 * Math.sqrt(q3))} ${r1(PS[1] + Math.sin(a) * 200 * Math.sqrt(q3) - 60 * q3)}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
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
