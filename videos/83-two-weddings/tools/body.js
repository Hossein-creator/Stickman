        // ---------- "two weddings" (user upload 2026-11-10, idea remake in our own design): same love, two weddings. TOP "THE PARTY": lights, balloons, a big cake, fireworks, dancing guests; every item pops a price tag and SAVINGS falls to -$20K. 1 YEAR LATER: a small dark rented room, red bills drop in and pile up, interest ticks, they argue and turn their backs, the wedding photo falls. BOTTOM "JUST US": small arch, rings, a tiny cake (-$1K); 1 YEAR LATER they fill a coin jar, build their own little house, the window lights up, hug. Headline, quote over the moving scene, FOLLOW: he nails a name sign over their door, she taps the "+ FOLLOW" tag.
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_CUT = 9.0;                                            // "1 YEAR LATER"
        const TAGS_T = [[1.0, 620, 150, 8], [2.0, 900, 360, 4], [3.0, 260, 170, 2], [4.0, 520, 130, 6], [5.2, 980, 400, 30]];
        const FW = [3.8, 4.4, 5.0, 5.7, 6.4, 7.2];                    // fireworks
        const T_RINGS = 1.6, T_SCAKE = 2.8, T_KISS = 4.4;
        const MAIL = [9.8, 10.6, 11.3, 11.9, 12.4, 12.9, 13.3];
        const T_ARG1 = 14.4, T_ARG2 = 15.9, T_BACK = 17.4, T_PHOTO = 18.0;
        const COINS = [9.8, 10.5, 11.2, 11.9, 12.6, 13.3];
        const T_WALK = 13.8, T_BUILD = 14.0, T_ROOF = 15.6, T_LIGHT = 16.8, T_HUG = 17.3;
        const T_H2 = 19.4, T_H3 = 20.4, T_Q = 21.8, T_CTA = 25.6, T_NAIL = 26.8, T_WRITE = 27.9, T_TAG = 28.6, T_TAP = 30.0;

        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [380, 900]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.25 }, beams);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const A = svgEl("g", {}, inner), B = svgEl("g", {}, inner);        // act 1 set / act 2 set
          const figs = svgEl("g", {}, inner), fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#000", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, A, B, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const toScreen = (P2, x, y) => [PX + x * PK, P2.y0 + (y - PY0) * PK];

        // ---------- shared props ----------
        function arch(parent, cx, w, h, bulbs, big) {
          const g = svgEl("g", {}, parent);
          const pts = [];
          for (let i = 0; i <= bulbs; i++) { const a = Math.PI * (i / bulbs); pts.push([cx - Math.cos(a) * w / 2, FL - h + (1 - Math.sin(a)) * 0 - Math.sin(a) * (big ? 70 : 40)]); }
          svgEl("path", { d: `M${cx - w / 2} ${FL} L${cx - w / 2} ${FL - h} Q${cx} ${FL - h - (big ? 150 : 80)} ${cx + w / 2} ${FL - h} L${cx + w / 2} ${FL}`, fill: "none", stroke: "#6a5a48", "stroke-width": 10 }, g);
          const lights = [];
          for (let i = 0; i <= bulbs; i++) {
            const p = i / bulbs, x = cx - w / 2 + w * p, y = FL - h - (big ? 150 : 80) * 4 * p * (1 - p) * 0.5 * 2 * 0.5 * 2 / 2 * 2;
            const yy = (1 - p) * (1 - p) * (FL - h) + 2 * p * (1 - p) * (FL - h - (big ? 150 : 80)) + p * p * (FL - h);
            if (big) lights.push(svgEl("circle", { cx: x, cy: yy, r: 9, fill: "#ffd98a", stroke: "#000", "stroke-width": 2 }, g));
            else lights.push(svgEl("circle", { cx: x, cy: yy, r: 11, fill: i % 2 ? "#ff8fa8" : "#fff", stroke: "#000", "stroke-width": 3 }, g));
          }
          if (big) for (const s of [-1, 1]) for (let k = 0; k < 6; k++) lights.push(svgEl("circle", { cx: cx + s * w / 2, cy: FL - h + k * (h / 6), r: 8, fill: "#ffd98a", stroke: "#000", "stroke-width": 2 }, g));
          return { g, lights };
        }
        const bubble = (parent, txt, w, size = 26, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, parent);
          svgEl("rect", { x: -w / 2, y: -36, width: w, height: 62, rx: 26, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 24 L-18 52 L12 24 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 18, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";

        // ---------- TOP act 1: the party ----------
        const bigArch = arch(top.A, 620, 300, 230, 22, true);
        const strings = [];
        for (let i = 0; i < 26; i++) { const x = 40 + i * 46, y = 150 + 26 * Math.sin((i / 25) * Math.PI); strings.push(svgEl("circle", { cx: x, cy: y, r: 6, fill: ["#ffd98a", "#ff8fa8", "#9fe0ff"][i % 3], opacity: 0 }, top.A)); }
        svgEl("path", { d: `M40 150 Q620 ${150 + 52} 1190 150`, fill: "none", stroke: "#3a3a42", "stroke-width": 2 }, top.A);
        const balloons = [];
        for (let i = 0; i < 5; i++) { const g = svgEl("g", { opacity: 0 }, top.A); svgEl("line", { x1: 0, y1: 40, x2: 0, y2: 170, stroke: "#bbb", "stroke-width": 2 }, g); svgEl("ellipse", { cx: 0, cy: 0, rx: 30, ry: 38, fill: ["#ff5a6a", "#ffd25a", "#fff", "#ff8fa8", "#9fe0ff"][i], stroke: "#000", "stroke-width": 4 }, g); balloons.push(g); }
        const bigCake = svgEl("g", { opacity: 0 }, top.A);
        svgEl("rect", { x: 830, y: FL - 120, width: 140, height: 120, fill: "#4a3a2a", stroke: "#000", "stroke-width": 4 }, bigCake);
        for (const [w, y, h] of [[120, 120, 60], [90, 180, 50], [60, 230, 40]]) svgEl("rect", { x: 900 - w / 2, y: FL - y - h, width: w, height: h, rx: 6, fill: "#f6ead8", stroke: "#000", "stroke-width": 4 }, bigCake);
        svgEl("circle", { cx: 900, cy: FL - 282, r: 10, fill: "#ff3b30", stroke: "#000", "stroke-width": 3 }, bigCake);
        const fireworks = FW.map((t0, i) => { const g = svgEl("g", { opacity: 0 }, top.A); const col = ["#ffd25a", "#ff5a6a", "#9fe0ff"][i % 3]; for (let k = 0; k < 14; k++) svgEl("line", { x1: 0, y1: 0, x2: 0, y2: 0, stroke: col, "stroke-width": 4, "stroke-linecap": "round" }, g); return { g, t0, x: [260, 980, 520, 1100, 380, 820][i], y: [190, 170, 210, 230, 160, 200][i] }; });
        const tagsT = TAGS_T.map(([t0, x, y, v]) => { const g = svgEl("g", { opacity: 0 }, top.fx); svgEl("rect", { x: -62, y: -26, width: 124, height: 46, rx: 8, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, g); const tx = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#fff", "text-anchor": "middle" }, g); tx.textContent = `-$${v}K`; return { g, t0, x, y }; });

        // ---------- TOP act 2: the rented room ----------
        svgEl("rect", { x: 180, y: 150, width: 870, height: FL - 150, fill: "#17171b", stroke: "#2e2e34", "stroke-width": 8 }, top.B);
        svgEl("rect", { x: 260, y: 230, width: 110, height: 120, fill: "#0b1220", stroke: "#2e2e34", "stroke-width": 6 }, top.B);
        svgEl("line", { x1: 620, y1: 150, x2: 620, y2: 230, stroke: "#555", "stroke-width": 3 }, top.B);
        const bulb = svgEl("circle", { cx: 620, cy: 240, r: 12, fill: "#d9c88a", stroke: "#000", "stroke-width": 3 }, top.B);
        const bulbGlow = svgEl("circle", { cx: 620, cy: 240, r: 160, fill: "url(#fireGlow)", opacity: 0.35 }, top.B);
        const slot = svgEl("rect", { x: 830, y: 170, width: 90, height: 14, fill: "#000" }, top.B);
        const photo = svgEl("g", {}, top.B);
        svgEl("rect", { x: -45, y: -36, width: 90, height: 72, fill: "#2a2a2e", stroke: "#8a7a5a", "stroke-width": 6 }, photo);
        svgEl("circle", { cx: -14, cy: -6, r: 9, fill: "#ddd" }, photo); svgEl("circle", { cx: 14, cy: -6, r: 9, fill: "#ddd" }, photo);
        svgEl("path", { d: "M-14 3 v20 M14 3 v20", stroke: "#ddd", "stroke-width": 6 }, photo);
        const photoCrack = svgEl("path", { d: "M-40 -30 L-8 2 L-20 14 L30 32", fill: "none", stroke: "#fff", "stroke-width": 3, opacity: 0 }, photo);
        const mail = MAIL.map((t0, i) => { const g = svgEl("g", { opacity: 0 }, top.B); svgEl("rect", { x: -36, y: -22, width: 72, height: 44, rx: 4, fill: "#f2ead8", stroke: "#000", "stroke-width": 3 }, g); svgEl("path", { d: "M-36 -22 L0 4 L36 -22", fill: "none", stroke: "#000", "stroke-width": 3 }, g); const st = svgEl("rect", { x: -32, y: 6, width: 64, height: 14, fill: "#ff3b30" }, g); const tx = svgEl("text", { x: 0, y: 18, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 12, fill: "#fff", "text-anchor": "middle" }, g); tx.textContent = ["BILL", "LOAN", "RENT", "BILL", "LOAN", "FINAL", "OVERDUE"][i]; return { g, t0, i }; });
        const bArg1 = bubble(top.fx, "WE CAN'T PAY THIS!", 330), bArg2 = bubble(top.fx, "IT WAS YOUR IDEA!", 310);

        // ---------- BOTTOM act 1: just us ----------
        const smallArch = arch(bot.A, 620, 230, 190, 10, false);
        const smallCake = svgEl("g", { opacity: 0 }, bot.A);
        svgEl("rect", { x: 800, y: FL - 90, width: 60, height: 90, fill: "#4a3a2a", stroke: "#000", "stroke-width": 4 }, smallCake);
        svgEl("rect", { x: 805, y: FL - 130, width: 50, height: 40, rx: 6, fill: "#f6ead8", stroke: "#000", "stroke-width": 4 }, smallCake);
        svgEl("circle", { cx: 830, cy: FL - 138, r: 7, fill: "#ff3b30", stroke: "#000", "stroke-width": 2 }, smallCake);
        const rings = [0, 1].map(() => svgEl("circle", { r: 9, fill: "none", stroke: "#ffd25a", "stroke-width": 5, opacity: 0 }, bot.fx));
        const tagB = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("rect", { x: -62, y: -26, width: 124, height: 46, rx: 8, fill: "#3a8a4a", stroke: "#000", "stroke-width": 4 }, tagB);
        const tbt = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#fff", "text-anchor": "middle" }, tagB); tbt.textContent = "-$1K";
        const heartB = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, bot.fx);

        // ---------- BOTTOM act 2: coin jar + own house ----------
        const JAR = [400, FL];
        const jarFill = svgEl("rect", { x: JAR[0] - 38, y: FL - 10, width: 76, height: 0, fill: "#ffd25a" }, bot.B);
        svgEl("path", { d: `M${JAR[0] - 42} ${FL - 120} L${JAR[0] - 42} ${FL - 6} Q${JAR[0]} ${FL + 4} ${JAR[0] + 42} ${FL - 6} L${JAR[0] + 42} ${FL - 120}`, fill: "rgba(200,230,255,0.12)", stroke: "#cfe3ff", "stroke-width": 5 }, bot.B);
        const coinsB = COINS.map(() => svgEl("circle", { r: 12, fill: "#ffd25a", stroke: "#000", "stroke-width": 3, opacity: 0 }, bot.fx));
        const H0 = 760, H1 = 1080, HT = FL - 250;
        const house = svgEl("g", {}, bot.B);
        const walls = svgEl("rect", { x: H0, y: FL, width: H1 - H0, height: 0, fill: "#3a2a20", stroke: "#000", "stroke-width": 5 }, house);
        const roof = svgEl("path", { d: `M${H0 - 30} ${HT} L${(H0 + H1) / 2} ${HT - 120} L${H1 + 30} ${HT} Z`, fill: "#8a3a2a", stroke: "#000", "stroke-width": 5, opacity: 0 }, house);
        const door = svgEl("rect", { x: 880, y: FL - 150, width: 72, height: 150, fill: "#6a4a30", stroke: "#000", "stroke-width": 4, opacity: 0 }, house);
        const win1 = svgEl("rect", { x: 980, y: FL - 200, width: 70, height: 60, fill: "#1a2030", stroke: "#000", "stroke-width": 4, opacity: 0 }, house);
        const winGlow = svgEl("circle", { cx: 1015, cy: FL - 170, r: 140, fill: "url(#fireGlow)", opacity: 0 }, house);
        const tagH = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("rect", { x: -70, y: -26, width: 140, height: 46, rx: 8, fill: "#3a8a4a", stroke: "#000", "stroke-width": 4 }, tagH);
        const tht = svgEl("text", { x: 0, y: 8, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, fill: "#fff", "text-anchor": "middle" }, tagH); tht.textContent = "-$25K";
        // name sign over the door (CTA) + hanging "+ FOLLOW" tag
        const sign = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("rect", { x: 790, y: HT + 20, width: 250, height: 52, rx: 6, fill: "#c89a5a", stroke: "#000", "stroke-width": 5 }, sign);
        const nails = [svgEl("circle", { cx: 804, cy: HT + 46, r: 5, fill: "#333", opacity: 0 }, sign), svgEl("circle", { cx: 1026, cy: HT + 46, r: 5, fill: "#333", opacity: 0 }, sign)];
        const signT = svgEl("text", { x: 915, y: HT + 56, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 24, fill: "#3a2410", "text-anchor": "middle" }, sign);
        const ftag = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("line", { x1: 0, y1: -30, x2: 0, y2: 0, stroke: "#3a2410", "stroke-width": 3 }, ftag);
        const ftR = svgEl("rect", { x: -82, y: 0, width: 164, height: 46, rx: 10, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, ftag);
        const ftT = svgEl("text", { x: 0, y: 31, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 22, fill: "#fff", "text-anchor": "middle" }, ftag);
        const hammer = svgEl("g", { opacity: 0 }, bot.fx);
        svgEl("line", { x1: 0, y1: 0, x2: 0, y2: 46, stroke: "#6a4a30", "stroke-width": 7 }, hammer);
        svgEl("rect", { x: -16, y: -10, width: 32, height: 16, fill: "#888", stroke: "#000", "stroke-width": 3 }, hammer);
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: HEART, fill: "#ff3b30", opacity: 0 }, bot.fx));
        const heartB2 = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, bot.fx);

        // ---------- figures ----------
        const mk = (P2, white, n) => {
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, P2.figs);
          const her = makeFig(P2.figs, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + n);
          P2.figs.insertBefore(bun, her.g.previousSibling);
          const veil = svgEl("path", { fill: "#ffffff", opacity: 0.85, stroke: "#000", "stroke-width": 3 }, P2.figs);
          const him = makeFig(P2.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + n);
          return { bun, her, him, veil };
        };
        const TF = mk(top, true, "T"), BF = mk(bot, true, "B");
        const guests = [150, 1000, 1110].map((x, i) => ({ x, f: makeFig(top.figs, "#7a7a7a", "#666", false, "g" + i) }));

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => { const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1; if (q < 0.5) return [hx + d * STR * (0.25 - q), FL]; const ss = (q - 0.5) / 0.5; return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift]; });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 6, head: 6, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };
        const hop = (st, t, ph) => { const h = Math.abs(Math.sin(t * 6 + ph)) * 14; st.hy -= h; st.ay -= h * 0.4; st.by -= h * 0.4; return st; };

        // top couple
        function topHer(s) {
          if (s < T_CUT) { const st = standOn(560, 1, FL); st.head = -4; hop(st, s, 0.4); const ch = hold(s, 3.8, T_CUT, 0.3); reachTo(st, ch, [540, stand - 240 + 10 * Math.sin(s * 9)]); reachTo(st, ch, [600, stand - 230], "b"); return st; }
          const x = 700, f = s > T_BACK ? 1 : -1;
          const st = standOn(x, f, FL); st.head = 8;
          const a2 = hold(s, T_ARG2, T_ARG2 + 1.4, 0.2); reachTo(st, a2, [x - 70, stand - 150]);
          const dn = win(s, T_BACK, T_BACK + 0.6); st.head = lerp(st.head, 30, dn); reachTo(st, dn, [x + 18, stand - 150]); reachTo(st, dn, [x + 8, stand - 140], "b");
          return st;
        }
        function topHim(s) {
          if (s < T_CUT) { const st = standOn(680, -1, FL); st.head = -4; hop(st, s, 1.6); const ch = hold(s, 3.8, T_CUT, 0.3); reachTo(st, ch, [700, stand - 240 - 10 * Math.sin(s * 9)]); reachTo(st, ch, [640, stand - 230], "b"); return st; }
          const x = 500, f = s > T_BACK ? -1 : 1;
          const st = standOn(x, f, FL); st.head = 6;
          const look = hold(s, MAIL[0], T_ARG1, 0.3); st.head += 16 * look;
          const a1 = hold(s, T_ARG1, T_ARG1 + 1.4, 0.2); reachTo(st, a1, [x + 60, stand - 230 + 12 * Math.sin(s * 12)]); reachTo(st, a1, [x + 70, stand - 160], "b");
          const dn = win(s, T_BACK, T_BACK + 0.6); st.head = lerp(st.head, 30, dn); reachTo(st, dn, [x - 18, stand - 150]); reachTo(st, dn, [x - 8, stand - 140], "b");
          return st;
        }
        const topDir = (who, s) => (s < T_CUT ? (who ? 1 : -1) : who ? (s > T_BACK ? 1 : -1) : s > T_BACK ? -1 : 1);
        // bottom couple
        const bx = (who, s) => (s < T_CUT ? (who ? 560 : 680) : lerp(who ? 470 : 330, who ? 700 : 820, sm(s, T_WALK, T_WALK + 2.4)));
        function botFig(who, s) {
          const x = bx(who, s), f = who ? 1 : -1;
          if (s < T_CUT) {
            const st = standOn(x, f, FL); st.head = 0;
            const rg = hold(s, T_RINGS, T_RINGS + 1.2, 0.3); reachTo(st, rg, [620 + (who ? -14 : 14), stand - 120]);
            const ks = hold(s, T_KISS, T_CUT, 0.4); st.torso += 10 * ks; st.head -= 4 * ks; st.hx += f * 20 * ks;
            reachTo(st, ks, [620 + f * 10, stand - 150]); reachTo(st, ks, [620 + f * 4, stand - 120], "b");
            return st;
          }
          if (s > T_WALK && s < T_WALK + 2.4) { const p = walking(who ? 470 : 330, x); return p; }
          if (s <= T_WALK) {
            const st = standOn(x, who ? -1 : 1, FL); st.head = 18;
            let k = 0; COINS.forEach((c, i) => { if (i % 2 === (who ? 1 : 0)) k = Math.max(k, hold(s, c - 0.35, c + 0.25, 0.2)); });
            reachTo(st, k, [JAR[0] + (who ? 26 : -26), FL - 140]);
            return st;
          }
          const st = standOn(x, f, FL); st.head = -6;
          const hg = win(s, T_HUG, T_HUG + 0.5) * (1 - win(s, T_CTA, T_CTA + 0.4));
          st.hx += f * 26 * hg; reachTo(st, hg, [760 + f * 10, stand - 150]); reachTo(st, hg, [760 + f * 4, stand - 120], "b");
          return st;
        }
        const botDir = (who, s) => (s > T_CUT && s <= T_WALK ? (who ? -1 : 1) : who ? 1 : -1);
        // CTA poses override (bottom, zoomed): he nails the sign, she taps the tag
        const SIGNX = [804, 1026], TAGP = [915, HT + 104];
        function ctaHim(st, s) {
          const k = win(s, T_CTA + 0.2, T_CTA + 0.9);
          if (k <= 0) return st;
          const x = lerp(820, 1110, k);
          const p = s < T_CTA + 0.9 ? walking(820, x) : standOn(1110, -1, FL);
          const nail = hold(s, T_NAIL - 0.3, T_WRITE, 0.3), knock = Math.max(0, Math.sin((s - T_NAIL) * Math.PI * 3)) * (s > T_NAIL && s < T_WRITE - 0.2 ? 1 : 0);
          reachTo(p, nail, [SIGNX[1] + 26, HT + 30 - 26 * knock]); reachTo(p, nail, [SIGNX[1] + 4, HT + 50], "b");
          const cheer = win(s, T_TAP + 0.5, T_TAP + 0.8);
          reachTo(p, cheer, [1080, stand - 240 + 10 * Math.sin(s * 14)]); reachTo(p, cheer, [1140, stand - 240 - 10 * Math.sin(s * 14)], "b");
          p.head = lerp(-10, -14, cheer);
          return p;
        }
        function ctaHer(st, s) {
          const k = win(s, T_CTA + 0.2, T_CTA + 0.9);
          if (k <= 0) return st;
          const x = lerp(700, 690, k);
          const p = standOn(x, 1, FL); p.head = -6;
          const tap = hold(s, T_TAP - 0.5, T_TAP + 0.3, 0.3), press = s > T_TAP - 0.08 && s < T_TAP + 0.12 ? 8 : 0;
          reachTo(p, tap, [TAGP[0] - 84 + press, TAGP[1] + 24]); p.head = lerp(p.head, -12, tap);
          const cheer = win(s, T_TAP + 0.5, T_TAP + 0.8);
          reachTo(p, cheer, [x - 30, stand - 240 + 10 * Math.sin(s * 14)]); reachTo(p, cheer, [x + 30, stand - 240 - 10 * Math.sin(s * 14)], "b");
          return p;
        }

        // ---------- labels, headline, quote ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#ffffff"), botS = label(PX + 44, 1010 + 66, 19, "#c8c8c8");
        topT.textContent = "THE BIG PARTY"; botT.textContent = "JUST THE TWO";
        const cnt = (y0) => { const d = document.createElement("div"); d.style.cssText = `position:absolute;right:${1080 - (PX + 920 - 30)}px;top:${y0 + 22}px;text-align:right;font-family:HFMono,monospace;font-weight:700;line-height:1.1`; E("stage").appendChild(d); return d; };
        const topC = cnt(412), botC = cnt(1010);
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.4, "THE DREAM WEDDING"], [3.8, "FIREWORKS!"], [T_CUT + 0.4, "1 YEAR LATER: BILLS"], [MAIL[3], "MORE BILLS"], [T_ARG1, "FIGHTS", "#ff6a60"], [T_BACK, "ALONE TOGETHER", "#ff3b30"]];
        const BOTSEQ = [[0.4, "A SMALL WEDDING"], [T_RINGS, "TWO RINGS"], [T_KISS, "THAT'S ENOUGH"], [T_CUT + 0.4, "1 YEAR LATER: SAVING"], [T_BUILD, "BUILDING"], [T_LIGHT, "THEIR OWN HOME", "#ffd25a"]];
        E("head").style.top = "236px"; E("head").style.fontSize = "30px"; E("head").style.letterSpacing = "0.16em"; E("head").style.lineHeight = "1.6";
        const yearCard = document.createElement("div");
        yearCard.style.cssText = "position:absolute;left:0;right:0;top:930px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:52px;letter-spacing:0.2em;color:#fff;opacity:0;text-shadow:0 0 20px rgba(255,255,255,0.5)";
        yearCard.textContent = "1 YEAR LATER";
        const cutDark = document.createElement("div"); cutDark.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cutDark); E("stage").appendChild(yearCard);
        const dim = document.createElement("div"); dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0"; E("stage").appendChild(dim);
        const quote = document.createElement("div");
        quote.style.cssText = "position:absolute;left:110px;right:110px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:46px;line-height:1.35;color:#fff;letter-spacing:0.05em;text-shadow:0 0 18px rgba(255,255,255,0.35)";
        E("stage").appendChild(quote);
        const qName = document.createElement("div");
        qName.style.cssText = "position:absolute;left:110px;right:110px;top:960px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:26px;color:#9a9a9a;letter-spacing:0.24em;opacity:0";
        qName.textContent = "BENJAMIN FRANKLIN"; E("stage").appendChild(qName);
        const QL = [["BEWARE", "OF", "LITTLE", "EXPENSES."], ["A", "SMALL", "LEAK"], ["WILL", "SINK", "A", "GREAT", "SHIP."]];
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1340px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.12em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const fade = document.createElement("div"); fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0"; E("stage").appendChild(fade);

        // camera push into the bottom panel for the FOLLOW part
        const CF = [930, 430], CS = [540, 1030], ZK = 1.55;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        function camB(t) { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = toScreen(bot, CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - CF[1] * z }; }
        const veilD = (h, f) => `M${r1(h[0] - f * 10)} ${r1(h[1] - 28)} Q${r1(h[0] - f * 60)} ${r1(h[1] + 10)} ${r1(h[0] - f * 52)} ${r1(h[1] + 110)} L${r1(h[0] - f * 20)} ${r1(h[1] + 60)} Z`;
        const money = (v) => (v < 0 ? `<span style="color:#ff3b30">-$${Math.abs(v)}K</span>` : `$${v}K`);

        function render(t) {
          const act2 = t >= T_CUT;
          [top, bot].forEach((P2) => { P2.A.setAttribute("opacity", act2 ? 0 : 1); P2.B.setAttribute("opacity", act2 ? 1 : 0); });
          // ---- top figures
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), topDir(1, t));
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), topDir(0, t));
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25 * topDir(1, t))); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          TF.veil.setAttribute("d", act2 ? "" : veilD(hp.head, topDir(1, t)));
          guests.forEach((gu, i) => { const st = standOn(gu.x, i ? -1 : 1, FL); st.head = -6; hop(st, t, i * 1.3); const ch = win(t, 3.8, 4.2); reachTo(st, ch, [gu.x - 20, stand - 230 + 10 * Math.sin(t * 8 + i)]); reachTo(st, ch, [gu.x + 20, stand - 230], "b"); drawFig(gu.f, st, i ? -1 : 1); gu.f.g.style.opacity = act2 ? 0 : 1; });
          bigArch.lights.forEach((l, i) => l.setAttribute("opacity", (0.6 + 0.4 * Math.sin(t * 6 + i)).toFixed(2)));
          strings.forEach((c, i) => c.setAttribute("opacity", t > 0.9 + i * 0.02 ? (0.6 + 0.4 * Math.sin(t * 5 + i * 1.7)).toFixed(2) : 0));
          balloons.forEach((b, i) => { const q = backOut(clamp((t - 2.9 - i * 0.08) / 0.4, 0, 1)); b.setAttribute("opacity", q > 0 ? 1 : 0); b.setAttribute("transform", `translate(${170 + i * 60 + (i > 2 ? 0 : 0)} ${r1(260 + 8 * Math.sin(t * 2 + i))}) scale(${q.toFixed(3)})`); });
          { const q = backOut(clamp((t - 1.9) / 0.4, 0, 1)); bigCake.setAttribute("opacity", q > 0 ? 1 : 0); }
          fireworks.forEach((fw) => { const q = clamp((t - fw.t0) / 1.1, 0, 1); fw.g.setAttribute("opacity", t > fw.t0 && q < 1 ? (1 - q * q).toFixed(3) : 0); Array.from(fw.g.children).forEach((l, k) => { const a = (k / 14) * Math.PI * 2, r0 = 70 * Math.sqrt(q), r1_ = r0 + 30 * Math.sqrt(q); l.setAttribute("x1", r1(fw.x + Math.cos(a) * r0)); l.setAttribute("y1", r1(fw.y + Math.sin(a) * r0 + 30 * q * q)); l.setAttribute("x2", r1(fw.x + Math.cos(a) * r1_)); l.setAttribute("y2", r1(fw.y + Math.sin(a) * r1_ + 30 * q * q)); }); });
          tagsT.forEach((tg) => { const q = clamp((t - tg.t0) / 1.4, 0, 1); tg.g.setAttribute("opacity", t > tg.t0 && q < 1 ? (q < 0.8 ? 1 : (1 - q) / 0.2).toFixed(3) : 0); tg.g.setAttribute("transform", `translate(${tg.x} ${r1(tg.y - 50 * q)}) scale(${backOut(clamp(q * 5, 0, 1)).toFixed(3)})`); });
          // top act 2
          bulb.setAttribute("opacity", Math.sin(t * 13) > 0.85 ? 0.5 : 1); bulbGlow.setAttribute("opacity", (0.3 - 0.12 * win(t, T_BACK, T_BACK + 1)).toFixed(3));
          mail.forEach((m) => { const q = clamp((t - m.t0) / 0.5, 0, 1); const px = 875 + ((m.i * 37) % 90) - 45, py = FL - 26 - m.i * 14; m.g.setAttribute("opacity", act2 && t > m.t0 ? 1 : 0); m.g.setAttribute("transform", `translate(${r1(lerp(875, px, q))} ${r1(lerp(180, py, q * q))}) rotate(${r1(lerp(0, (m.i % 2 ? 12 : -10), q))})`); });
          { const pf = sm(t, T_PHOTO, T_PHOTO + 0.35); photo.setAttribute("transform", `translate(${r1(lerp(420, 400, pf))} ${r1(lerp(300, FL - 36, pf))}) rotate(${r1(lerp(0, -80, pf))})`); photoCrack.setAttribute("opacity", t > T_PHOTO + 0.35 ? 1 : 0); }
          const bub = (g, a, b, p) => { const k = hold(t, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bArg1, T_ARG1, T_ARG1 + 1.5, [mp.head[0] + 40, mp.head[1] - 100]);
          bub(bArg2, T_ARG2, T_ARG2 + 1.5, [hp.head[0] - 30, hp.head[1] - 100]);
          top.dark.setAttribute("opacity", (0.35 * win(t, T_BACK, T_BACK + 1)).toFixed(3));
          // ---- bottom figures (+ CTA overrides)
          const herRaw = (s) => ctaHer(botFig(1, s), s), himRaw = (s) => ctaHim(botFig(0, s), s);
          const bhp = drawFig(BF.her, livePose(herRaw, t, 0.9), t > T_CTA + 0.2 ? 1 : botDir(1, t));
          const bmp = drawFig(BF.him, livePose(himRaw, t, 2.0), t > T_CTA + 0.9 ? -1 : t > T_CTA + 0.2 ? 1 : botDir(0, t));
          const bdir = t > T_CTA + 0.2 ? 1 : botDir(1, t);
          BF.bun.setAttribute("cx", r1(bhp.head[0] - 25 * bdir)); BF.bun.setAttribute("cy", r1(bhp.head[1] - 16));
          BF.veil.setAttribute("d", act2 ? "" : veilD(bhp.head, bdir));
          smallArch.lights.forEach((l, i) => l.setAttribute("opacity", 1));
          { const q = backOut(clamp((t - T_SCAKE) / 0.4, 0, 1)); smallCake.setAttribute("opacity", q > 0 ? 1 : 0); }
          rings.forEach((r, i) => { const k = hold(t, T_RINGS + 0.3, T_RINGS + 1.3, 0.2); r.setAttribute("cx", r1(620 + (i ? 8 : -8))); r.setAttribute("cy", r1(stand - 132 - 14 * k)); r.setAttribute("opacity", act2 ? 0 : k.toFixed(3)); });
          { const q = clamp((t - T_SCAKE) / 1.4, 0, 1); tagB.setAttribute("opacity", t > T_SCAKE && q < 1 ? (q < 0.8 ? 1 : (1 - q) / 0.2).toFixed(3) : 0); tagB.setAttribute("transform", `translate(830 ${r1(FL - 200 - 50 * q)})`); }
          { const k = hold(t, T_KISS + 0.3, T_CUT, 0.3); heartB.setAttribute("opacity", k.toFixed(3)); heartB.setAttribute("transform", `translate(620 ${r1(stand - 250)}) scale(${(1.4 * backOut(k) * (1 + 0.08 * Math.max(0, Math.sin(t * 7)))).toFixed(3)})`); }
          // coins into the jar
          let filled = 0;
          coinsB.forEach((c, i) => { const q = clamp((t - COINS[i]) / 0.45, 0, 1); const hand = i % 2 ? bhp.hands[0] : bmp.hands[0]; const p = q < 0.4 ? hand : [lerp(hand[0], JAR[0], (q - 0.4) / 0.6), lerp(hand[1], FL - 20 - filled * 0, ((q - 0.4) / 0.6) ** 2)]; c.setAttribute("cx", r1(p[0])); c.setAttribute("cy", r1(p[1])); c.setAttribute("opacity", act2 && t > COINS[i] - 0.3 && q < 1 ? 1 : 0); if (q >= 1) filled++; });
          const fillH = act2 ? 16 * filled * (1 - sm(t, T_BUILD, T_BUILD + 1.5)) : 0;
          jarFill.setAttribute("y", r1(FL - 8 - fillH)); jarFill.setAttribute("height", r1(fillH));
          // the house builds
          const wq = sm(t, T_BUILD, T_ROOF); walls.setAttribute("y", r1(FL - (FL - HT) * wq)); walls.setAttribute("height", r1((FL - HT) * wq));
          const rq = backOut(clamp((t - T_ROOF) / 0.5, 0, 1)); roof.setAttribute("opacity", t > T_ROOF ? 1 : 0); roof.setAttribute("transform", `translate(0 ${r1(-80 * (1 - rq))})`);
          door.setAttribute("opacity", t > T_ROOF + 0.4 ? 1 : 0); win1.setAttribute("opacity", t > T_ROOF + 0.6 ? 1 : 0);
          const lq = win(t, T_LIGHT, T_LIGHT + 0.4); win1.setAttribute("fill", lq > 0.5 ? "#ffd98a" : "#1a2030"); winGlow.setAttribute("opacity", (0.6 * lq).toFixed(3));
          { const q = clamp((t - T_ROOF) / 1.4, 0, 1); tagH.setAttribute("opacity", t > T_ROOF && q < 1 ? (q < 0.8 ? 1 : (1 - q) / 0.2).toFixed(3) : 0); tagH.setAttribute("transform", `translate(920 ${r1(HT - 140 - 50 * q)})`); }
          { const k = win(t, T_HUG + 0.3, T_HUG + 0.7) * (1 - win(t, T_CTA, T_CTA + 0.3)); heartB2.setAttribute("opacity", k.toFixed(3)); heartB2.setAttribute("transform", `translate(${r1((bhp.head[0] + bmp.head[0]) / 2)} ${r1(Math.min(bhp.head[1], bmp.head[1]) - 80)}) scale(${(1.3 * backOut(k) * (1 + 0.08 * Math.max(0, Math.sin(t * 7)))).toFixed(3)})`); }
          // ---- CTA: zoom, sign, tag
          const c = camB(t), zq = zoomK(t);
          bot.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)})`);
          top.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, topC, botT, botS, botC].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));
          const sq = clamp((t - T_CTA - 0.8) / 0.4, 0, 1);
          sign.setAttribute("opacity", sq.toFixed(3)); sign.setAttribute("transform", `translate(0 ${r1(-30 * (1 - sq))})`);
          nails.forEach((n, i) => n.setAttribute("opacity", t > T_NAIL + i * 0.6 ? 1 : 0));
          const ws = "@SILENT.STICKMAN"; signT.textContent = ws.slice(0, Math.max(0, Math.floor((t - T_WRITE) * 24)));
          hammer.setAttribute("opacity", hold(t, T_NAIL - 0.3, T_WRITE, 0.2).toFixed(3));
          hammer.setAttribute("transform", `translate(${r1(bmp.hands[0][0])} ${r1(bmp.hands[0][1])}) rotate(${r1(-30 + 40 * Math.max(0, Math.sin((t - T_NAIL) * Math.PI * 3)))})`);
          const tg = clamp((t - T_TAG) / 0.6, 0, 1), sw = 14 * Math.sin((t - T_TAG) * 7) * (1 - tg) * (t > T_TAG ? 1 : 0);
          ftag.setAttribute("opacity", t > T_TAG ? 1 : 0);
          const tapped = t > T_TAP, press = tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.2, 0, 1)) : 1;
          ftag.setAttribute("transform", `translate(${TAGP[0]} ${r1(HT + 72 + 30 * (1 - backOut(tg)))}) rotate(${r1(sw)}) scale(${press.toFixed(3)})`);
          ftR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); ftT.setAttribute("fill", tapped ? "#111" : "#fff"); ftT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          burst.forEach((e, i) => { const q = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(TAGP[0] + Math.cos(a) * 170 * Math.sqrt(q))} ${r1(TAGP[1] + 24 + Math.sin(a) * 120 * Math.sqrt(q) - 40 * q)}) scale(${(0.8 - 0.4 * q).toFixed(2)})`); });
          winGlow.setAttribute("opacity", (0.6 * lq + 0.3 * win(t, T_TAP, T_TAP + 0.4)).toFixed(3));

          // ---- counters
          let vT = 30; TAGS_T.forEach(([t0, , , v]) => { vT -= Math.round(v * sm(t, t0, t0 + 0.6)); });
          if (act2) vT -= Math.round(4 * sm(t, MAIL[0], MAIL[6] + 0.5));
          let vB = 30 - Math.round(1 * sm(t, T_SCAKE, T_SCAKE + 0.6)) - Math.round(25 * sm(t, T_ROOF, T_ROOF + 0.6));
          topC.innerHTML = `<div style="font-size:17px;letter-spacing:0.16em;color:#a8a8a8">${vT < 0 ? "DEBT" : "SAVINGS"}</div><div style="font-size:40px;color:#fff">${money(vT)}</div>`;
          botC.innerHTML = `<div style="font-size:17px;letter-spacing:0.16em;color:#a8a8a8">${t > T_LIGHT ? "HOME + SAVINGS" : "SAVINGS"}</div><div style="font-size:40px;color:${t > T_LIGHT ? "#ffd25a" : "#fff"}">${money(vB)}</div>`;
          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#c8c8c8";
          // ---- cut card "1 YEAR LATER"
          const ck = hold(t, T_CUT - 0.25, T_CUT + 0.55, 0.25);
          cutDark.style.opacity = (0.92 * ck).toFixed(3); yearCard.style.opacity = hold(t, T_CUT - 0.15, T_CUT + 0.5, 0.15).toFixed(3);
          // ---- headline
          const L2 = "THE PARTY LASTED ONE NIGHT.", L3 = "THE DEBT LASTED YEARS.";
          E("head").innerHTML = `<div>SAME LOVE. TWO WEDDINGS.</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.6 * win(t, T_Q - 0.5, T_Q) - 0.4 * win(t, T_CTA, T_CTA + 0.4)).toFixed(3);
          // ---- quote over the moving scene
          const qOut = win(t, T_CTA - 0.4, T_CTA);
          dim.style.opacity = (0.62 * win(t, T_Q - 0.5, T_Q) * (1 - qOut)).toFixed(3);
          let wi = 0;
          quote.innerHTML = QL.map((line) => line.map((w) => { const q = clamp((t - T_Q - 0.08 * wi++) / 0.2, 0, 1); return `<span style="display:inline-block;margin:0 0.14em;opacity:${q.toFixed(2)};transform:translateY(${r1(14 * (1 - q))}px);${["SINK", "GREAT", "SHIP."].includes(w) ? "color:#ff6a60;" : ""}">${w}</span>`; }).join("")).join("<br/>");
          quote.style.opacity = (1 - qOut).toFixed(3);
          qName.style.opacity = (win(t, T_Q + 1.2, T_Q + 1.5) * (1 - qOut)).toFixed(3);
          const s2 = t - (T_TAG + 0.3), a1 = "LOVE THAT LASTS,", a2 = "NOT A PARTY THAT ENDS.";
          sub.innerHTML = s2 > 0 ? `${a1.slice(0, Math.floor(s2 * 30))}&nbsp;<br/><span style="color:#ffd25a">${a2.slice(0, Math.max(0, Math.floor((s2 - 0.55) * 30)))}</span>&nbsp;` : "";
          fade.style.opacity = win(t, DUR - 0.4, DUR - 0.02).toFixed(3);
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
