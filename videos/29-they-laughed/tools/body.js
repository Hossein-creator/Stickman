        // ---------- "they laughed": he carves steps, the crowd laughs. A step breaks, he falls, they laugh harder. He gets up and climbs anyway ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const wallG = svgEl("g", {}, W);
        const stepG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const labelG = svgEl("g", {}, cam);
        const FXS = E("fx");
        const frac = (v) => v - Math.floor(v);
        const pw = (s, K) => { for (let i = 1; i < K.length; i++) if (s < K[i][0]) return lerp(K[i - 1][1], K[i][1], ease((s - K[i - 1][0]) / (K[i][0] - K[i - 1][0]))); return K[K.length - 1][1]; };

        // ---------- time warp: slow motion on the fall and on the catch ----------
        const SLOWS = [[2.5, 3.6], [9.0, 9.9]], SLOWK = 0.35;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T0 = 0.15, PER = 0.7;                       // first climb: steps 1-3
        const T_BREAK = 2.55, T_LAND = 2.95;              // step 3 breaks, he falls
        const T_STRIKE = 5.625, T_C2 = 6.2, PER2 = 0.4;   // gets up, strikes, power climb: steps 3-7
        const T_JUMP = 8.25, T_SLIP = 8.45, T_GRAB = 8.6, T_TOP = 9.3;
        const STOP = [6.9, 7.5, 6.6, 7.9, 7.2];           // when each laugher goes quiet
        const STRIKES = [];
        for (let k = 0; k < 4; k++) for (const o of [0.0825, 0.3575]) STRIKES.push([T0 + k * PER + PER * o, k, 0]);
        STRIKES.push([T_STRIKE, 0, 2]);
        for (let k = 2; k < 7; k++) for (const o of [0.0825, 0.3575]) STRIKES.push([T_C2 + (k - 2) * PER2 + PER2 * o, k, 1]);

        // ---------- the cliff ----------
        const WX = 560, HX = 536, RISE = 90, NSTEP = 7, TOPY = FL - RISE * NSTEP - 420;
        const lvl = (k) => FL - RISE * k;
        const legH = Math.sqrt(LEG * LEG - 15 * 15);
        const topBeam = svgEl("polygon", { points: `${WX + 40},-2200 ${WX + 300},-2200 ${WX + 380},${TOPY} ${WX},${TOPY}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.45 }, beams);
        const hopeBeam = svgEl("polygon", { points: `${WX - 10},${TOPY} ${WX + 30},${TOPY} ${WX + 10},${FL} ${WX - 220},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        svgEl("polygon", { points: `-120,-900 60,-900 180,${FL} -300,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.1 }, beams);
        const topPool = svgEl("ellipse", { cx: WX + 180, cy: TOPY, rx: 280, ry: 44, fill: "url(#topGlow)", opacity: 0.6 }, backG);
        const hopePool = svgEl("ellipse", { cx: 450, cy: FL, rx: 170, ry: 30, fill: "url(#topGlow)", opacity: 0 }, backG);
        svgEl("rect", { x: WX, y: TOPY, width: 700, height: FL - TOPY, fill: "url(#rock)", stroke: "#000", "stroke-width": 6 }, wallG);
        for (let i = 0; i < 40; i++) {
          const y = TOPY + 20 + rnd() * (FL - TOPY - 40), x = WX + 20 + rnd() * 380;
          svgEl("path", { d: `M${r1(x)} ${r1(y)} l${r1(10 + rnd() * 30)} ${r1(rnd() * 14 - 7)} l${r1(rnd() * 20)} ${r1(10 + rnd() * 12)}`, fill: "none", stroke: "#1a1a1a", "stroke-width": 3 }, wallG);
        }
        svgEl("rect", { x: WX, y: TOPY - 4, width: 700, height: 8, fill: "#e8e8e8" }, wallG);
        const stepEls = [null];
        for (let k = 1; k <= NSTEP; k++) stepEls.push(svgEl("rect", { x: WX, y: lvl(k), width: 0, height: 14, rx: 3, fill: "#8a8a8a", stroke: "#000", "stroke-width": 4 }, stepG));
        const grow = (s, tc, per) => win(s, tc + 0.1 * per, tc + 0.5 * per);
        function stepW(i, s) {
          if (i === NSTEP && s > T_JUMP) return 0;
          const c2 = i >= 3 ? grow(s, T_C2 + (i - 3) * PER2, PER2) : 0;
          if (i > 3) return c2;
          if (i === 3 && s > T_BREAK) return c2;
          return grow(s, T0 + (i - 1) * PER, PER);
        }
        // pieces that break off and fall: step 3 under him, step 7 when he jumps, a chunk of the edge when his hands slip
        const DROPS = [[T_BREAK, WX - 44, lvl(3), 46, 14], [T_JUMP, WX - 44, lvl(NSTEP), 46, 14], [T_SLIP, WX - 6, TOPY - 2, 30, 20]].map(([t0, x, y, w, h]) => ({ t0, x, y, w, h, el: svgEl("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: 3, fill: "#8a8a8a", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG) }));
        const pebbles = [];
        for (let d = 0; d < 3; d++) for (let i = 0; i < 7; i++) pebbles.push({ d, i, el: svgEl("circle", { r: 3 + (i % 3) * 2, fill: "#6a6a6a", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG) });
        // chips and sparks on every strike
        const chips = STRIKES.map(([ts, k, kind]) => Array.from({ length: 6 }, (_, i) => svgEl("circle", { r: kind ? 4 : 3, fill: kind ? "#ffd27a" : "#d8d8d8", opacity: 0 }, fxG)));
        // dust where he lands
        const dust = Array.from({ length: 7 }, (_, i) => svgEl("circle", { r: 30, fill: "url(#dustG)", opacity: 0 }, fxG));

        // ---------- crowd and hero ----------
        const CX = [-320, -200, -80, 40, 160];
        const crowd = CX.map((x, i) => ({ x, parts: makeFig(svgEl("g", {}, figG), "#8a8a8a", "#6e6e6e", false, "c" + i) }));
        const hero = makeFig(figG, "#ffffff", "#dedede", true, "hero");
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const gray = (v) => { v = Math.round(v); return `rgb(${v},${v},${v})`; };

        const floorSit = (x, f, look) => base({ hx: x, hy: FL - 24, torso: 20 - 14 * look, head: 26 - 46 * look, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, ash: 30, ael: 30, aw: 1, atx: x + f * 60, aty: FL - 92, bsh: 20, bel: 30, bw: 1, btx: x + f * 52, bty: FL - 88 });
        // one carve-and-climb cycle from level k to k+1
        function climbPose(x, k, q) {
          const L0 = lvl(k), L1 = lvl(k + 1);
          const s = standOn(x, 1, L0);
          if (q < 0.55) {
            const c = (q / 0.275) % 1, hit = Math.sin(Math.PI * Math.min(1, c / 0.6));
            s.torso = 10 + 16 * hit; s.head = 10 + 8 * hit;
            s.aw = 1; s.atx = lerp(x - 10, WX - 8, hit); s.aty = lerp(L0 - 250, L0 - 100, hit);
            s.bw = 1; s.btx = WX - 6; s.bty = L0 - 190;
            return s;
          }
          const a = win(q, 0.55, 0.75), h = win(q, 0.62, 0.92), b = win(q, 0.75, 0.95);
          s.ax = x + 15; s.ay = lerp(L0, L1, a) - Math.sin(Math.PI * a) * 30;
          s.bx = x - 15; s.by = lerp(L0, L1, b) - Math.sin(Math.PI * b) * 26;
          s.hy = lerp(L0, L1, h) - legH + 10 * Math.sin(Math.PI * h);
          s.torso = 12 - 6 * h; s.head = -6;
          s.aw = 1; s.atx = WX - 6; s.aty = lerp(L0 - 230, L1 - 230, h);
          s.bw = 1; s.btx = WX - 4; s.bty = lerp(L0 - 180, L1 - 180, h);
          return s;
        }
        const LX = 470;
        const lie = base({ hx: LX, hy: FL - 22, torso: -86, head: -4, ax: LX + 78, ay: FL, bx: LX + 60, by: FL - 2, aw: 1, atx: LX - 210, aty: FL - 4, bw: 1, btx: LX - 50, bty: FL - 44 });
        function sitP(s, look, fist) {
          const st = base({ hx: LX, hy: FL - 24, torso: lerp(26, 4, look), head: lerp(36, -40, look), ax: LX + 70, ay: FL, bx: LX + 56, by: FL, aw: 1, atx: LX + 64, aty: FL - 92, bw: 1, btx: LX + 52, bty: FL - 86 });
          st.atx = lerp(st.atx, LX + 36, fist); st.aty = lerp(st.aty, FL - 178, fist) + fist * 3 * Math.sin(s * 70);
          return st;
        }
        const hangY = TOPY + UARM + FARM + TORSO - 6;
        function heroRaw(s) {
          if (s < T0) return standOn(HX, 1, FL);
          if (s < T_BREAK) { const k = Math.floor((s - T0) / PER); return climbPose(HX, k, (s - T0 - k * PER) / PER); }
          if (s < T_LAND) {
            // the step breaks: he tips back and falls, arms flailing (slow motion)
            const p = (s - T_BREAK) / (T_LAND - T_BREAK), e = ease(p);
            const hx = lerp(HX, LX, e), hy = lerp(lvl(3) - legH, FL - 22, p * p);
            const st = base({ hx, hy, torso: lerp(10, -86, e), head: lerp(-10, -30, e), ash: 150 + 30 * Math.sin(s * 30), ael: 20, bsh: 120 + 30 * Math.sin(s * 26 + 1), bel: 40 });
            st.ax = hx + lerp(15, 78, e); st.ay = hy + lerp(legH, 22, e);
            st.bx = hx + lerp(-15, 60, e); st.by = hy + lerp(legH, 10, e);
            return st;
          }
          if (s < 4.0) { const st = { ...lie }; st.hy -= 16 * Math.sin(Math.PI * clamp((s - T_LAND) / 0.22, 0, 1)); return st; }
          if (s < 4.5) return mixPose(lie, sitP(s, 0, 0), win(s, 4.0, 4.5));
          if (s < 5.2) return sitP(s, win(s, 4.6, 4.95), win(s, 4.85, 5.1));
          const stand = standOn(HX, 1, FL);
          stand.head = -22; stand.torso = 6; stand.aw = 1; stand.atx = HX + 6; stand.aty = FL - legH - 110;
          if (s < 5.55) return mixPose(sitP(s, 1, 1), stand, win(s, 5.2, 5.55));
          if (s < 5.7) {
            // the comeback strike
            const hit = Math.sin(Math.PI * clamp((s - 5.55) / 0.15, 0, 1));
            const st = { ...stand };
            st.torso = 6 + 22 * hit; st.head = -10 + 14 * hit; st.atx = lerp(HX + 6, WX - 8, hit); st.aty = lerp(FL - legH - 110, FL - 150, hit);
            return st;
          }
          if (s < 6.2) { const k = s < 5.95 ? 0 : 1; return climbPose(HX, k, 0.55 + 0.45 * clamp((s - 5.7 - k * 0.25) / 0.25, 0, 1)); }
          if (s < T_JUMP - 0.05) { const k = Math.min(6, 2 + Math.floor((s - T_C2) / PER2)); return climbPose(HX, k, clamp((s - T_C2 - (k - 2) * PER2) / PER2, 0, 1)); }
          const L7 = lvl(NSTEP), hy0 = L7 - legH, hxW = WX - 26;
          if (s < T_SLIP) {
            // leap for the edge
            const p = win(s, T_JUMP - 0.05, T_SLIP - 0.05);
            const hy = lerp(hy0, hy0 - 70, p);
            return base({ hx: lerp(HX, hxW, p), hy, torso: 8, head: -30, ax: HX + 12, ay: hy + legH - 30 * p, bx: HX - 8, by: hy + legH - 50 * p, aw: 1, atx: lerp(HX + 20, WX + 6, p), aty: lerp(hy - 200, TOPY + 2, p), bw: 1, btx: lerp(HX + 6, WX - 4, p), bty: lerp(hy - 190, TOPY + 4, p) });
          }
          if (s < T_GRAB) {
            // the edge crumbles: hands slip, he drops (slow motion)
            const p = (s - T_SLIP) / (T_GRAB - T_SLIP);
            const hy = hy0 - 70 + 120 * p * p;
            return base({ hx: hxW - 6 * p, hy, torso: 4, head: -36, ax: hxW + 14, ay: hy + legH - 10, bx: hxW - 14, by: hy + legH - 30, aw: 1, atx: WX + 2, aty: TOPY + 4 + 60 * p * p, bw: 1, btx: WX - 30, bty: TOPY + 30 + 90 * p });
          }
          if (s < 8.8) {
            // one hand catches, then the other
            const hy = hangY + 18 * Math.exp(-(s - T_GRAB) * 14) - 4;
            const b = win(s, 8.68, 8.78);
            return base({ hx: hxW, hy, torso: -2, head: -30, ax: hxW + 12, ay: hy + legH - 4, bx: hxW - 10, by: hy + legH - 16, aw: 1, atx: WX + 4, aty: TOPY + 2, bw: 1, btx: lerp(WX - 40, WX - 2, b), bty: lerp(TOPY + 100, TOPY + 2, b) });
          }
          if (s < T_TOP) {
            // pull up and over
            const k = ease((s - 8.8) / (T_TOP - 8.8));
            const hx = lerp(hxW, WX + 70, k), hy = lerp(hangY, TOPY - legH, k);
            const st = base({ hx, hy, torso: 4 + 40 * Math.sin(Math.PI * k), head: -20, aw: 1, atx: lerp(WX + 4, hx + 40, k), aty: TOPY + 2, bw: 1, btx: lerp(WX - 2, hx + 20, k), bty: TOPY + 2 });
            st.ax = k > 0.5 ? lerp(WX + 10, hx + 15, win(k, 0.5, 1)) : hx + 10; st.ay = k > 0.5 ? TOPY : hy + legH - 30;
            st.bx = k > 0.75 ? hx - 15 : hx - 5; st.by = k > 0.75 ? TOPY : hy + legH - 10;
            return st;
          }
          // on top, in the light. turns and looks down at them
          const st = standOn(WX + 70, 1, TOPY);
          const turn = win(s, 9.7, 9.9);
          st.head = lerp(-24, 34, turn); st.torso = lerp(2, 8, turn);
          st.ash = lerp(8, 30, turn); st.bsh = lerp(-4, 20, turn);
          return st;
        }
        const heroF = (s) => (s < 9.8 ? 1 : -1);

        // crowd: laughing intensity (0 quiet, 1 laughing, 1.5 rolling)
        function laughI(i, s) {
          const o = i * 0.05;
          return pw(s, [[0, 0], [0.62 + o, 0], [0.85 + o, 0.9], [T_LAND, 0.9], [T_LAND + 0.12, 1.5], [3.95, 1.5], [4.5, 0.45], [5.62, 0.45], [5.8, 0.9], [STOP[i], 0.9], [STOP[i] + 0.4, 0]]);
        }
        let heroHead = [HX, FL - 300];
        function crowdRaw(i, s) {
          const x = CX[i], ph = i * 1.7, I = laughI(i, s);
          const look = win(s, STOP[i] + 0.15, STOP[i] + 0.6);
          const st = floorSit(x, 1, look);
          st.head -= 18 * win(s, 8.0, 9.3) * look;
          if (I < 0.001) return st;
          const L1 = Math.min(1, I), hard = Math.max(0, I - 0.9) / 0.6, sh = Math.sin(s * 19 + ph);
          st.torso = lerp(st.torso, -6 - 7 * sh - 10 * hard, L1);
          st.head = lerp(st.head, -24 - 8 * Math.sin(s * 19 + ph + 0.8), L1);
          st.hy -= 5 * L1 * Math.abs(sh);
          st.atx = lerp(st.atx, x + 90, L1); st.aty = lerp(st.aty, Math.min(heroHead[1] + 40, FL - 250) + 10 * sh, L1); // point up at him, never through a neighbour
          st.ash = 70; st.btx = lerp(st.btx, x + 18, L1); st.bty = lerp(st.bty, FL - 78, L1);
          st.ay -= 50 * hard * Math.max(0, Math.sin(s * 15 + ph)); st.by -= 44 * hard * Math.max(0, Math.sin(s * 15 + ph + 1.6));
          return st;
        }
        // the one who follows: stands, walks to the wall, reaches for the first step
        const T_F = 9.6;
        function followRaw(s) {
          const x0 = CX[4];
          if (s < T_F) return crowdRaw(4, s);
          if (s < T_F + 0.35) return mixPose(crowdRaw(4, T_F), standOn(x0, 1, FL), win(s, T_F, T_F + 0.35));
          const ST = 120;
          if (s < T_F + 1.15) {
            const q = win(s, T_F + 0.35, T_F + 1.15), hx = lerp(x0, HX - 20, q);
            const feet = [0, 0.5].map((o) => { const qq = frac((hx - x0) / ST + o + 1e-6); if (qq < 0.5) return [hx + ST * (0.25 - qq), FL]; const s2 = (qq - 0.5) / 0.5; return [hx + ST * (-0.25 + 0.5 * ease(s2)), FL - Math.sin(Math.PI * s2) * 16]; });
            return base({ hx, hy: FL - legH - 2, torso: 6, head: -16, ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1] });
          }
          const st = standOn(HX - 20, 1, FL), r = win(s, T_F + 1.2, T_F + 1.5);
          st.head = -30; st.aw = r; st.atx = WX - 30; st.aty = lvl(1) - 4; st.bw = r * 0.6; st.btx = WX - 6; st.bty = lvl(1) - 120;
          return st;
        }

        // ---------- "HA" bubbles ----------
        const HA = [];
        const haRun = (t0, t1, n, big, seq) => { for (let j = 0; j < n; j++) HA.push([t0 + ((t1 - t0) * j) / n, seq[j % seq.length], big]); };
        haRun(0.7, 2.5, 8, 0, [2, 0, 4, 1, 3]);
        haRun(T_LAND + 0.05, 3.95, 9, 1, [1, 3, 0, 4, 2]);
        haRun(4.55, 5.6, 3, 0, [0, 3, 1]);
        haRun(5.8, 7.6, 6, 0, [1, 3, 4, 0, 1, 3]);
        const bubbles = HA.map(([, , big], j) => {
          const g = svgEl("g", { opacity: 0 }, labelG);
          svgEl("path", { d: "M-18 30 L-34 62 L6 34 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("ellipse", { rx: big ? 82 : 66, ry: big ? 48 : 40, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-24 32 L-4 30", stroke: "#fff", "stroke-width": 8 }, g);
          const tx = svgEl("text", { y: 12, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": big ? 38 : 32, fill: "#111" }, g);
          tx.textContent = big ? (j % 2 ? "HAHA!" : "HA HA") : j % 3 ? "HA!" : "HAHA";
          return g;
        });

        // ---------- screen streaks for the power climb ----------
        const streaks = Array.from({ length: 14 }, (_, i) => ({ x: 70 + ((i * 397) % 940), off: (i * 733) % 2400, el: svgEl("rect", { width: 4, height: 220, fill: "url(#streakV)", opacity: 0 }, FXS) }));

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none";
        E("stage").insertBefore(dim, E("head"));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.9, 520, 430, 0], [0.55, 1.9, 520, 425, 0],
          [0.8, 1.4, -80, 500, -2], [1.45, 1.4, -80, 500, -2],
          [1.75, 1.5, 470, 330, 0], [2.45, 1.55, 480, 250, 0],
          [2.6, 1.75, 500, 220, 2], [2.95, 1.05, 160, 470, -2],
          [3.4, 1.15, 20, 480, 2], [3.95, 1.1, 180, 470, 0],
          [5.0, 2.05, 440, 500, 0], [5.55, 1.7, 500, 430, 0],
          [6.3, 1.35, 460, 230, 0], [7.2, 1.0, 330, 120, 0],
          [8.15, 1.45, 500, -200, 0], [8.6, 2.0, 540, -330, 3],
          [9.3, 1.35, 560, -350, 0], [10.2, 0.95, 330, -50, 0], [99, 0.95, 330, -50, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          for (const [ts, , kind] of STRIKES) {
            if (kind === 0) hit(realOf(ts), 0.15, 0, 0, 0.1);
            else if (kind === 1) hit(realOf(ts), 0.32, 0.3, 0, 0.12);
            else hit(realOf(ts), 1.3, 1, 0.35, 0.3);
          }
          hit(realOf(T_BREAK), 0.8, 0.8, 0.15, 0.25);
          hit(realOf(T_LAND), 1.7, 1, 0.5, 0.35);
          hit(realOf(T_JUMP), 0.4, 0.4, 0, 0.2);
          hit(realOf(T_SLIP), 0.6, 0.7, 0, 0.25);
          hit(realOf(T_GRAB), 1.1, 1, 0.3, 0.35);
          hit(realOf(T_TOP), 1.3, 0.6, 0.85, 0.45);
          HA.forEach(([hs, , big]) => hit(realOf(hs), big ? 0.18 : 0.1, 0, 0, 0.08));
          const em = win(s, 3.6, 4.1) * (1 - win(s, 5.5, 5.65)); // he is down: the world goes dark and quiet

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);
          dim.style.opacity = (0.12 * em).toFixed(3);

          // steps, falling pieces, pebbles
          for (let i = 1; i <= NSTEP; i++) { const g = stepW(i, s); stepEls[i].setAttribute("x", r1(WX - 44 * g)); stepEls[i].setAttribute("width", r1(44 * g + 2)); stepEls[i].setAttribute("opacity", g > 0.01 ? 1 : 0); }
          DROPS.forEach((d, j) => {
            const dt = s - d.t0, yy = d.y + 1600 * dt * dt, landY = FL - d.h / 2;
            const on = dt > 0 && dt < 1.2;
            d.el.setAttribute("opacity", on ? (1 - win(dt, 0.9, 1.2)).toFixed(3) : 0);
            d.el.setAttribute("transform", `translate(${r1(d.x + d.w / 2 - 40 * dt)} ${r1(Math.min(yy + d.h / 2, landY))}) rotate(${r1(-260 * dt)})`);
          });
          pebbles.forEach((p) => {
            const d = DROPS[p.d], dt = s - d.t0 - p.i * 0.03;
            const on = dt > 0 && dt < 1.0;
            p.el.setAttribute("cx", r1(d.x + 10 + p.i * 5 - (20 + p.i * 14) * dt));
            p.el.setAttribute("cy", r1(d.y + 1500 * dt * dt));
            p.el.setAttribute("opacity", on && d.y + 1500 * dt * dt < FL ? 1 : 0);
          });
          STRIKES.forEach(([ts, k, kind], j) => {
            const dt = s - ts, L0 = kind === 2 ? FL - 150 : lvl(k) - 100;
            chips[j].forEach((c, i) => {
              const on = dt > 0 && dt < 0.3;
              c.setAttribute("cx", r1(WX - 10 - dt * (260 + i * 70)));
              c.setAttribute("cy", r1(L0 - dt * (150 + (i % 3) * 90) + dt * dt * 2600));
              c.setAttribute("opacity", on ? (1 - dt / 0.3).toFixed(2) : 0);
            });
          });
          dust.forEach((c, i) => {
            const dt = s - T_LAND, on = dt > 0 && dt < 1.2, side = i % 2 ? 1 : -1;
            c.setAttribute("cx", r1(LX - 60 + side * (40 + i * 22) * Math.min(1, dt * 2.5)));
            c.setAttribute("cy", r1(FL - 14 - i * 4 - dt * 30));
            c.setAttribute("r", r1(26 + 60 * Math.min(1, dt * 2)));
            c.setAttribute("opacity", on ? (0.9 * (1 - dt / 1.2)).toFixed(3) : 0);
          });

          // light: a beam finds him when he looks up; floods the top when he gets there
          const hope = win(s, 4.6, 5.0) * (1 - win(s, 5.6, 6.2));
          hopeBeam.setAttribute("opacity", (0.75 * hope).toFixed(3));
          hopePool.setAttribute("opacity", (0.8 * hope).toFixed(3));
          const lit = win(s, T_TOP - 0.1, T_TOP + 0.5);
          topBeam.setAttribute("opacity", (0.45 + 0.4 * lit).toFixed(3));
          topPool.setAttribute("opacity", (0.6 + 0.4 * lit).toFixed(3));

          // figures
          const hh = drawFig(hero, livePose(heroRaw, s, 0.3), heroF(s));
          heroHead = hh.head;
          crowd.forEach((c, i) => {
            if (i === 4) {
              drawFig(c.parts, livePose(followRaw, s, 2.2), 1);
              const w = win(s, T_F + 0.3, T_F + 1.6);
              tint(c.parts, gray(lerp(138, 255, w) * (1 - 0.35 * em)), gray(lerp(110, 222, w) * (1 - 0.35 * em)));
              return;
            }
            drawFig(c.parts, livePose((tt) => crowdRaw(i, tt), s, i), 1);
            tint(c.parts, gray(138 * (1 - 0.35 * em)), gray(110 * (1 - 0.35 * em)));
          });

          // HA bubbles over the laughers
          bubbles.forEach((g, j) => {
            const [hs, i, big] = HA[j], q = (s - hs) / (big ? 0.6 : 0.5);
            if (q <= 0 || q >= 1) { g.setAttribute("opacity", 0); return; }
            const x = CX[i] - 10, y = FL - 290 - (i % 2) * 85;
            g.setAttribute("opacity", ((1 - Math.max(0, q - 0.6) / 0.4) * (1 - 0.55 * em)).toFixed(3));
            g.setAttribute("transform", `translate(${x} ${r1(y - 40 * q)}) scale(${(backOut(clamp(q / 0.3, 0, 1)) * (big ? 1 : 0.85)).toFixed(3)}) rotate(${j % 2 ? -9 : 8})`);
          });

          // speed streaks while he powers up the wall
          const pc = win(s, 6.15, 6.35) * (1 - win(s, 8.15, 8.35)) + 0.6 * win(s, T_GRAB + 0.2, T_GRAB + 0.3) * (1 - win(s, 9.2, 9.35));
          streaks.forEach((k) => {
            const y = ((t * 2600 + k.off) % 2400) - 300;
            k.el.setAttribute("x", k.x); k.el.setAttribute("y", r1(y));
            k.el.setAttribute("opacity", (0.45 * pc).toFixed(3));
          });

          E("h1").innerHTML = slam(["THEY", "LAUGHED."], [11.5, 11.72], t, []);
          E("h2").innerHTML = slam(["HE", "KEPT", "CLIMBING."], [12.35, 12.52, 12.75], t, [2]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 12.3, 12.6)).toFixed(3);
          fade.style.opacity = win(t, 13.5, 13.95).toFixed(3);
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
