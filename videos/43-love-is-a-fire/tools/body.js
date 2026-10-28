        // ---------- "love is a fire": winner format of reel 36 (two panels). BOTH FEED IT: both bring sticks, the fire grows, they hold on (red heart). ONE FEEDS IT: he feeds it and reaches for her, she pulls away to her phone, twice. He stops asking, sits apart, the fire dies. Remake of "when love dies silently" (viral/2026-10-28-check.md) ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- panel geometry: world 0..1233 x 98..815, ground at 600 ----------
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const FX = 760;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1080]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.22 }, beams);
          const glowBack = svgEl("circle", { cx: FX, cy: FL - 60, r: 330, fill: "url(#fireGlow)", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          const glowGround = svgEl("ellipse", { cx: FX, cy: FL + 18, rx: 360, ry: 60, fill: "url(#fireGlow)", opacity: 0 }, inner);
          const back = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, inner);
          const fire = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const cold = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#0a1830", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { beams, glowBack, glowGround, back, fire, figs, fx, cold };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- the fire: logs, layered flames that flicker and scale with its strength, sparks, smoke ----------
        function makeFire(panel) {
          const logs = svgEl("g", {}, panel.fire);
          const extra = Array.from({ length: 6 }, (_, i) => svgEl("rect", { x: -46, y: -7, width: 92, height: 14, rx: 6, fill: "#5a3c22", stroke: "#000", "stroke-width": 4, opacity: 0, transform: `translate(${FX + (i % 2 ? 1 : -1) * (6 + 4 * i)} ${FL - 12 - 6 * Math.floor(i / 2)}) rotate(${(i % 2 ? 1 : -1) * (18 + 7 * i)})` }, logs));
          for (const a of [-22, 22]) svgEl("rect", { x: -60, y: -9, width: 120, height: 18, rx: 7, fill: "#6b4728", stroke: "#000", "stroke-width": 4, transform: `translate(${FX} ${FL - 9}) rotate(${a})` }, logs);
          const layers = [["#ff4a1c", 1], ["#ff9a1f", 0.72], ["#ffe066", 0.42]].map(([c, k]) => ({ k, el: Array.from({ length: 5 }, () => svgEl("path", { fill: c, stroke: k === 1 ? "#000" : "none", "stroke-width": 4 }, panel.fire)) }));
          const sparks = Array.from({ length: 8 }, () => svgEl("circle", { r: 4, fill: "#ffd060" }, panel.fire));
          const smoke = Array.from({ length: 7 }, () => svgEl("circle", { fill: "#5c5f66", opacity: 0 }, panel.fire));
          return { extra, layers, sparks, smoke };
        }
        function drawFire(f, panel, I, sticks, smokeK, t) {
          f.extra.forEach((e, i) => e.setAttribute("opacity", i < sticks ? 1 : 0));
          const offs = [-34, -16, 0, 16, 34];
          for (const { k, el } of f.layers) el.forEach((p, j) => {
            const x0 = FX + offs[j] * (0.7 + 0.3 * I) * (k === 1 ? 1 : 0.8);
            const hh = (j === 2 ? 1 : j === 1 || j === 3 ? 0.78 : 0.55) * 150 * I * k * (0.85 + 0.15 * Math.sin(t * (9 + j * 1.7) + j * 2.1 + k * 3));
            const w = (18 + 10 * I) * (0.6 + 0.4 * k), lean = 8 * Math.sin(t * 5.3 + j);
            if (hh < 3) { p.setAttribute("d", "M0 0"); return; }
            const b = FL - 18;
            p.setAttribute("d", `M${r1(x0 - w)} ${b} Q${r1(x0 - w * 1.05)} ${r1(b - hh * 0.45)} ${r1(x0 + lean)} ${r1(b - hh)} Q${r1(x0 + w * 1.05)} ${r1(b - hh * 0.45)} ${r1(x0 + w)} ${b} Z`);
          });
          f.sparks.forEach((s, j) => {
            const p = frac(t * 0.7 + j * 0.137), on = I > 0.35;
            s.setAttribute("cx", r1(FX + (j - 3.5) * 9 + 18 * Math.sin(p * 6 + j)));
            s.setAttribute("cy", r1(FL - 40 - p * 200 * Math.min(1.4, I)));
            s.setAttribute("opacity", on ? ((1 - p) * Math.min(1, I)).toFixed(3) : 0);
          });
          f.smoke.forEach((s, j) => {
            const p = frac(t * 0.35 + j / 7);
            s.setAttribute("cx", r1(FX + 10 * Math.sin(p * 5 + j) + p * 40));
            s.setAttribute("cy", r1(FL - 30 - p * 330));
            s.setAttribute("r", r1(14 + 40 * p));
            s.setAttribute("opacity", (smokeK * 0.45 * Math.sin(Math.PI * p)).toFixed(3));
          });
          const g = clamp(I / 1.6, 0, 1.15);
          panel.glowBack.setAttribute("opacity", (0.9 * g * (0.93 + 0.07 * Math.sin(t * 11))).toFixed(3));
          panel.glowGround.setAttribute("opacity", (0.9 * g).toFixed(3));
        }
        const fT = makeFire(top), fB = makeFire(bot);

        // ---------- stick piles + thrown sticks ----------
        function pile(panel, x) { for (let i = 0; i < 5; i++) svgEl("rect", { x: x - 40 + i * 6, y: FL - 14 - (i % 2) * 10, width: 84, height: 11, rx: 5, fill: "#6b4728", stroke: "#000", "stroke-width": 3, transform: `rotate(${(i - 2) * 4} ${x} ${FL})` }, panel.back); }
        const stickEl = (panel) => { const o = svgEl("path", { stroke: "#000", "stroke-width": 16, "stroke-linecap": "round", fill: "none" }, panel.fx); const w = svgEl("path", { stroke: "#7a5232", "stroke-width": 8, "stroke-linecap": "round", fill: "none" }, panel.fx); return [o, w]; };
        const setStick = (s, a, b) => { const d = a ? `M${r1(a[0])} ${r1(a[1])} L${r1(b[0])} ${r1(b[1])}` : "M0 0"; s[0].setAttribute("d", d); s[1].setAttribute("d", d); };

        // ---------- poses ----------
        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, ST = 120) => {
          const ft = feetOn(x0, x, ST, 14), sw = Math.sin((Math.PI * 2 * (x - x0)) / ST);
          return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 4, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 });
        };
        const walkBetween = (t, t0, d, x0, x1) => walking(x0, lerp(x0, x1, ease((t - t0) / d)));
        const bend = (x, f) => base({ hx: x, hy: stand + 34, torso: 62, head: 18, ax: x + f * 22, ay: FL, bx: x - f * 26, by: FL, aw: 1, atx: x + f * 74, aty: FL - 14, bw: 1, btx: x + f * 62, bty: FL - 10 });
        const carry = (x, f) => { const s = standOn(x, f, FL); s.aw = 1; s.atx = x + f * 46; s.aty = stand - 112; s.bw = 1; s.btx = x + f * 30; s.bty = stand - 104; return s; };
        const tossP = (x, f) => { const s = standOn(x, f, FL); s.torso = 14; s.aw = 1; s.atx = x + f * 110; s.aty = stand - 128; s.bw = 1; s.btx = x + f * 96; s.bty = stand - 118; return s; };
        // one feeding trip: walk to the pile, pick up a stick, walk back, toss it in
        const TRIP = 1.75;
        function trip(t, t0, xs, xp, f) {
          const p = t - t0;
          if (p < 0.45) return { pose: walkBetween(t, t0, 0.45, xs, xp), hold: false };
          if (p < 0.85) return { pose: mixPose(standOn(xp, f, FL), bend(xp, f), Math.sin(Math.PI * clamp((p - 0.45) / 0.4, 0, 1))), hold: p > 0.65 };
          if (p < 1.3) { const w = walkBetween(t, t0 + 0.85, 0.45, xp, xs); const c = carry(w.hx, -f); for (const k of ["aw", "atx", "aty", "bw", "btx", "bty", "torso"]) w[k] = c[k]; return { pose: w, hold: true }; }
          return { pose: mixPose(carry(xs, -f), tossP(xs, -f), Math.sin(Math.PI * clamp((p - 1.3) / 0.45, 0, 1))), hold: p < 1.5 };
        }
        const sitG = (x, f) => base({ hx: x, hy: FL - 30, torso: 10, head: 8, ax: x + f * 92, ay: FL, bx: x + f * 76, by: FL, aw: 1, atx: x + f * 88, aty: FL - 92, bw: 1, btx: x + f * 80, bty: FL - 86 });

        // ---------- people ----------
        // top: she feeds from the left (pile at 330), he from the right (pile at 1110)
        const HX_S = 560, HX_P = 360, MX_S = 950, MX_P = 1130;
        pile(top, HX_P); pile(top, MX_P); pile(bot, MX_P);
        const redSpot = svgEl("polygon", { points: `440,${PY0} 552,${PY0} 640,${FL} 352,${FL}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs);
        const tHer = makeFig(top.figs, "#ffffff", "#e2e2e2", true, "tHer");
        top.figs.insertBefore(tBun, tHer.g);
        const tHim = makeFig(top.figs, "#ffffff", "#dedede", true, "tHim");
        const heartGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, top.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const tSticks = [stickEl(top), stickEl(top)], tFly = [stickEl(top), stickEl(top)];
        // bottom: she sits left of the fire on her phone, he feeds it from the right
        const SHX = 470;
        const bBun = svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHer");
        bot.figs.insertBefore(bBun, bHer.g);
        const bHim = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bHim");
        const phoneGlow = svgEl("circle", { r: 78, fill: "url(#phoneGlow)" }, bot.fx);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.fx);
        const bStick = stickEl(bot), bFly = stickEl(bot);

        // ---------- beats ----------
        const TS0 = 0.4, TM0 = 0.75, TN = 3;                     // top trips
        const T_GO = 6.0, T_MEET = 7.3, T_HOLD = 8.0, HUGL = 480, HUGR = 512;
        const B1 = 0.5, B_R1 = 2.35, B_P1 = 3.3, B2 = 4.25, B_R2 = 6.1, B_P2 = 7.05;  // bottom: feed, reach, pulled away, feed, reach, pulled away
        const T_STOP = 8.05, T_GIVE = 8.8, T_COLD = 10.4, REACHX = 655;
        const tossTimes = (t0, n) => Array.from({ length: n }, (_, k) => t0 + k * TRIP + 1.45);
        const T_TOSS = [...tossTimes(TS0, TN), ...tossTimes(TM0, TN)].sort((a, b) => a - b);
        const B_TOSS = [B1 + 1.45, B2 + 1.45];
        const count = (arr, t) => arr.filter((x) => t >= x + 0.3).length;
        function intensity(arr, t, base0) { let I = base0; for (const x of arr) I += 0.24 * win(t, x + 0.25, x + 0.75); return I; }

        function topHerRaw(t) {
          if (t < TS0) return standOn(HX_S, -1, FL);
          if (t < TS0 + TN * TRIP) { const k = Math.floor((t - TS0) / TRIP); return trip(t, TS0 + k * TRIP, HX_S, HX_P, -1).pose; }
          if (t < T_GO) return standOn(HX_S, 1, FL);
          if (t < T_MEET) { const st = t < T_GO + 0.5 ? walkBetween(t, T_GO, 0.5, HX_S, HUGL) : standOn(HUGL, 1, FL); st.head = -6; return st; }
          const hug = standOn(HUGL, 1, FL); hug.torso = 8; hug.head = -4;
          hug.aw = 1; hug.atx = HUGR + 10; hug.aty = stand - 150; hug.bw = 1; hug.btx = HUGR - 6; hug.bty = stand - 120;
          hug.hy += 2 * Math.sin(t * 2);
          return mixPose(standOn(HUGL, 1, FL), hug, win(t, T_MEET, T_MEET + 0.5));
        }
        const topHerF = (t) => (t < TS0 + TN * TRIP ? (t < TS0 ? 1 : frac((t - TS0) / TRIP) * TRIP < 0.85 ? -1 : 1) : 1);
        function topHimRaw(t) {
          if (t < TM0) return standOn(MX_S, -1, FL);
          if (t < TM0 + TN * TRIP) { const k = Math.floor((t - TM0) / TRIP); return trip(t, TM0 + k * TRIP, MX_S, MX_P, 1).pose; }
          if (t < T_MEET) { const st = t < T_GO + 0.1 ? standOn(MX_S, -1, FL) : t < T_GO + 1.15 ? walkBetween(t, T_GO + 0.1, 1.05, MX_S, HUGR) : standOn(HUGR, -1, FL); st.head = 4; return st; }
          const hug = standOn(HUGR, -1, FL); hug.torso = 4; hug.head = 6;
          hug.aw = 1; hug.atx = HUGL - 10; hug.aty = stand - 130; hug.bw = 1; hug.btx = HUGL + 4; hug.bty = stand - 100;
          return mixPose(standOn(HUGR, -1, FL), hug, win(t, T_MEET, T_MEET + 0.5));
        }
        const topHimF = (t) => (t < TM0 || t >= TM0 + TN * TRIP ? -1 : frac((t - TM0) / TRIP) * TRIP < 0.85 ? 1 : -1);
        const topHold = (t, t0, n) => { if (t < t0 || t >= t0 + n * TRIP) return false; const k = Math.floor((t - t0) / TRIP); return trip(t, t0 + k * TRIP, 0, 0, 1).hold; };

        // bottom
        function botHerRaw(t) {
          const st = sitG(SHX, 1);
          st.head = 30 + 2 * Math.sin(t * 1.3); st.torso = 14;
          st.atx = SHX + 46; st.aty = FL - 30 - 84; st.btx = SHX + 38; st.bty = FL - 30 - 78;
          st.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0);
          // pulls away from his hand: leans back, phone up
          const away = Math.max(win(t, B_P1 - 0.05, B_P1 + 0.25) * (1 - win(t, B_P1 + 1.1, B_P1 + 1.6)), win(t, B_P2 - 0.05, B_P2 + 0.25) * (1 - win(t, B_P2 + 1.1, B_P2 + 1.6)));
          st.torso -= 26 * away; st.hx -= 6 * away; st.head -= 8 * away; st.aty -= 22 * away; st.bty -= 22 * away; st.atx -= 12 * away; st.btx -= 12 * away;
          return st;
        }
        function reachPose(t, tr) {
          const st = standOn(REACHX, -1, FL);
          const k = win(t, tr, tr + 0.4) * (1 - win(t, tr + 0.95, tr + 1.15));
          st.torso = 4 + 24 * k; st.head = 4 + 10 * k; st.aw = k; st.atx = SHX + 44; st.aty = FL - 30 - 108;
          if (t > tr + 0.95) { st.torso += 6 * (1 - k); st.head = 24 * (1 - win(t, tr + 1.1, tr + 1.6)); }
          return st;
        }
        function botHimRaw(t) {
          if (t < B1) return standOn(MX_S, -1, FL);
          if (t < B1 + TRIP) return trip(t, B1, MX_S, MX_P, 1).pose;
          if (t < B_R1 - 0.6) return standOn(MX_S, -1, FL);
          if (t < B_R1) return walkBetween(t, B_R1 - 0.6, 0.6, MX_S, REACHX);
          if (t < B_R1 + 1.3) return reachPose(t, B_R1);
          if (t < B2) { const w = walkBetween(t, B_R1 + 1.3, 0.6, REACHX, MX_S); w.head = 18; return t < B_R1 + 1.9 ? w : standOn(MX_S, -1, FL); }
          if (t < B2 + TRIP) return trip(t, B2, MX_S, MX_P, 1).pose;
          if (t < B_R2 - 0.6) return standOn(MX_S, -1, FL);
          if (t < B_R2) return walkBetween(t, B_R2 - 0.6, 0.6, MX_S, REACHX);
          if (t < B_R2 + 1.3) return reachPose(t, B_R2);
          if (t < T_STOP) { const w = walkBetween(t, B_R2 + 1.3, 0.6, REACHX, MX_S); w.head = 22; return w; }
          // goes for a stick, stops, looks at her, lets it drop; sits down apart, back to her
          if (t < T_GIVE) { const s = mixPose(standOn(MX_S, 1, FL), bend(MX_S + 60, 1), Math.sin(Math.PI * 0.5 * win(t, T_STOP, T_STOP + 0.35))); return s; }
          const st = standOn(MX_S + 30, 1, FL); st.head = 26; st.torso = 8;
          const sit = sitG(MX_S + 30, 1); sit.torso = 34; sit.head = 34; sit.atx = MX_S + 30 + 70; sit.aty = FL - 70; sit.btx = MX_S + 30 + 62; sit.bty = FL - 64;
          sit.torso += 2 * Math.sin(t * 2);
          return mixPose(mixPose(bend(MX_S + 60, 1), st, win(t, T_GIVE, T_GIVE + 0.4)), sit, win(t, T_GIVE + 0.7, T_GIVE + 1.4));
        }
        const botHimF = (t) => {
          for (const t0 of [B1, B2]) if (t >= t0 && t < t0 + TRIP) return frac((t - t0) / TRIP) * TRIP < 0.85 ? 1 : -1;
          return t >= T_STOP ? 1 : -1;
        };

        // ---------- labels (typed) ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH FEED IT"; botT.textContent = "ONE FEEDS IT";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "STICK BY STICK"], [T_MEET, "THEY STAY CLOSE"], [T_HOLD, "WARM"]];
        const BOTSEQ = [[0.5, "HE FEEDS IT"], [1.6, "SHE SCROLLS"], [B_P1, "PULLED AWAY", "#ff3b30"], [B_P2, "AGAIN", "#ff3b30"], [T_GIVE, "HE STOPS ASKING", "#ff3b30"], [T_COLD, "COLD", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A FIRE."], [10.9, "IT DOESN'T DIE IN A FIGHT."], [11.75, "IT DIES IN SILENCE."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- end card: the message big in the middle + a quote ----------
        const T_CARD = 12.7;
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:40px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE OPPOSITE OF LOVE<br/>IS NOT HATE,<br/>IT'S INDIFFERENCE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ELIE WIESEL</div></div>`;
        const cardCss = document.createElement("style");
        cardCss.textContent = "#card span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(cardCss);
        E("stage").appendChild(card);
        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // a stick between the hands, and a stick flying into the fire after each toss
        function handStick(s, fp, on) { if (!on) return setStick(s, null); const a = fp.hands[0], b = fp.hands[1], dx = a[0] - b[0], dy = a[1] - b[1], d = Math.hypot(dx, dy) || 1; setStick(s, [b[0] - (dx / d) * 30, b[1] - (dy / d) * 30], [a[0] + (dx / d) * 40, a[1] + (dy / d) * 40]); }
        function flyStick(s, t, tosses, fromX) {
          for (const x of tosses) if (t >= x && t < x + 0.35) {
            const p = (t - x) / 0.35, sx = lerp(fromX(x), FX, p), sy = lerp(stand - 120, FL - 20, p) - Math.sin(Math.PI * p) * 70, a = p * 4;
            return setStick(s, [sx - 40 * Math.cos(a), sy - 40 * Math.sin(a)], [sx + 40 * Math.cos(a), sy + 40 * Math.sin(a)]);
          }
          setStick(s, null);
        }

        // ---------- per-frame render ----------
        function render(t) {
          // top panel
          const It = intensity(T_TOSS, t, 0.45) * (1 + 0.06 * win(t, T_HOLD, T_HOLD + 1));
          drawFire(fT, top, It, count(T_TOSS, t), 0, t);
          const hp = drawFig(tHer, livePose(topHerRaw, t, 0.4), topHerF(t));
          const mp = drawFig(tHim, livePose(topHimRaw, t, 1.3), topHimF(t));
          tBun.setAttribute("cx", r1(hp.head[0] - topHerF(t) * 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          handStick(tSticks[0], hp, topHold(t, TS0, TN)); handStick(tSticks[1], mp, topHold(t, TM0, TN));
          flyStick(tFly[0], t, tossTimes(TS0, TN), () => HX_S - 60); flyStick(tFly[1], t, tossTimes(TM0, TN), () => MX_S + 60);
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          const hc = [(hp.head[0] + mp.head[0]) / 2, Math.min(hp.head[1], mp.head[1]) - 90];
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * 0.9 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", r1(hc[0])); heartGlow.setAttribute("cy", r1(hc[1] - 4));
          heartGlow.setAttribute("opacity", (0.9 * hq).toFixed(3));
          redSpot.setAttribute("opacity", (0.5 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));

          // bottom panel
          const die = win(t, T_GIVE, T_COLD + 0.3);
          const Ib = intensity(B_TOSS, t, 0.5) * (1 - 0.97 * die);
          drawFire(fB, bot, Ib, count(B_TOSS, t), win(t, T_GIVE + 0.6, T_COLD), t);
          bot.cold.setAttribute("opacity", (0.28 * win(t, T_GIVE + 0.5, T_COLD + 0.5)).toFixed(3));
          const sp = drawFig(bHer, livePose(botHerRaw, t, 0.9), 1);
          const bp = drawFig(bHim, livePose(botHimRaw, t, 2.0), botHimF(t));
          bBun.setAttribute("cx", r1(sp.head[0] - 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2];
          phone.setAttribute("transform", `translate(${r1(ph[0] + 6)} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0] + 6)); phoneGlow.setAttribute("cy", r1(ph[1] - 10));
          phoneGlow.setAttribute("opacity", (t < 0.45 ? 0 : 0.85 + 0.15 * Math.sin(t * 5)).toFixed(3));
          phone.setAttribute("opacity", t < 0.45 ? 0 : 1);
          handStick(bStick, bp, topHold(t, B1, 1) || topHold(t, B2, 1) || (t > T_STOP + 0.3 && t < T_GIVE + 0.15));
          flyStick(bFly, t, B_TOSS, () => MX_S + 60);

          // labels and headline
          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          // end card
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["FEED", "IT", "TOGETHER."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["OR", "WATCH", "IT", "GO", "COLD."], [T_CARD + 0.7, T_CARD + 0.82, T_CARD + 0.94, T_CARD + 1.06, T_CARD + 1.2], t, [4]);
          E("cq").style.opacity = win(t, T_CARD + 1.6, T_CARD + 2.1).toFixed(3);
          fade.style.opacity = win(t, DUR - 0.3, DUR - 0.02).toFixed(3);
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
