        // ---------- "let her go": a rope ties her hand to his wrist. She tests him three times (walks off, waves at a stranger, sulks with her back to him) and waits for the pull. He never pulls. He unties the rope and lets it fall. She drops her end, runs back and takes his hand ----------
        // remake of a 14.3x outlier (Havefunzer, "no point in being jealous"), see viral/2026-10-27-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const ropeG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- time warp: slow motion while the rope falls ----------
        const SLOWS = [[7.25, 8.25]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_GO = 0.15, T_STOP = 1.15, T_TUG = [1.5, 1.8];
        const T_STR = 2.3, T_WAVE = 3.05, T_CHECK = 3.8;
        const T_SIT = 4.35, T_PEEK = 5.0, T_YAWN = 5.0;
        const T_UNTIE = 6.1, T_OFFER = 6.85, T_DROP = 7.3, T_STAND = 8.2, T_LETGO = 8.6, T_RUN = 8.8, T_HOLD = 9.35, T_WALK = 9.75, T_END = 11.2;
        const HX = 300, OUTX = 640, HOLDX = 450, STRX = 880;
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const ROPE = 420;

        // ---------- set: two cold beams, a warm pool for the end ----------
        const beamHim = svgEl("polygon", { points: `${HX - 50},-900 ${HX + 40},-900 ${HX + 150},${FL} ${HX - 170},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.26 }, beams);
        const beamHer = svgEl("polygon", { points: `${OUTX - 50},-900 ${OUTX + 40},-900 ${OUTX + 150},${FL} ${OUTX - 170},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.2 }, beams);
        const warm = svgEl("ellipse", { cx: 480, cy: FL, rx: 420, ry: 56, fill: "url(#fireGlow)", opacity: 0 }, backG);
        const halo = svgEl("circle", { cx: 480, cy: FL - 150, r: 400, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- rope ----------
        const ropeO = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 13, "stroke-linecap": "round" }, ropeG);
        const ropeW = svgEl("path", { fill: "none", stroke: "#c9a46a", "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "10 5" }, ropeG);
        const knot = svgEl("circle", { r: 10, fill: "#c9a46a", stroke: "#000", "stroke-width": 4 }, fxG);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round", opacity: 0 }, fxG);
        const qmarks = [0, 1, 2].map(() => svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 54, fill: "#fff", "text-anchor": "middle", opacity: 0 }, fxG));
        qmarks.forEach((q) => (q.textContent = "?"));
        const zz = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#9a9a9a", "text-anchor": "middle", opacity: 0 }, fxG);
        zz.textContent = "~";

        // ---------- the people ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const strBox = svgEl("g", {}, figG);
        const stranger = makeFig(strBox, "#8a8a8a", "#6a6a6a", false, "str");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");

        function feetOn(x0, hx, ST, lift) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, ST, lift, torso, head) => {
          const ft = feetOn(x0, x, ST, lift), sw = Math.sin((Math.PI * 2 * (x - x0)) / ST);
          return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 });
        };
        const running = (x0, x, f) => {
          const ft = feetOn(x0, x, 135, 30), sw = Math.sin((Math.PI * 2 * (x - x0)) / 135);
          return base({ hx: x, hy: stand + 10 + 4 * Math.abs(sw), torso: 18, head: -10, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 - 55 * sw * f, ael: 85, bsh: -4 + 55 * sw * f, bel: 85 });
        };
        const floorSit = (x, f) => base({ hx: x, hy: FL - 24, torso: 6, head: 10, ax: x + f * 66, ay: FL, bx: x + f * 52, by: FL, ash: 30, ael: 30, bsh: 20, bel: 30 });

        // ---------- him: stands calm the whole time. Tugged, he doesn't move. Yawns. Unties, offers the end, lets go. Holds her hand, they walk ----------
        function himRaw(s) {
          const st = standOn(HX, 1, FL);
          st.aw = 1; st.atx = HX + 44; st.aty = stand - 40;   // rope hand, low and relaxed
          st.bw = 0;
          T_TUG.forEach((t0) => { const k = Math.exp(-Math.max(0, s - t0) * 9) * (s > t0 ? 1 : 0); st.atx += 40 * k; st.aty -= 14 * k; st.torso += 3 * k; });
          // test 2: looks at his nails while she waves at the stranger
          const nails = win(s, T_WAVE, T_WAVE + 0.3) * (1 - win(s, T_CHECK + 0.2, T_CHECK + 0.5));
          st.bw = nails; st.btx = HX + 30; st.bty = stand - 150; st.head = lerp(st.head, 26, nails);
          // test 3: a big yawn
          const yawn = Math.sin(Math.PI * clamp((s - T_YAWN) / 0.8, 0, 1));
          st.head -= 26 * yawn; st.bw = Math.max(st.bw, yawn); if (yawn > nails) { st.btx = HX + 24; st.bty = stand - 196; }
          if (s < T_UNTIE) return st;
          // unties the knot: both hands at the wrist
          const un = win(s, T_UNTIE, T_UNTIE + 0.25) * (1 - win(s, T_OFFER - 0.1, T_OFFER + 0.1));
          const fid = Math.sin(s * 30) * 6 * un;
          st.atx = lerp(st.atx, HX + 40, un); st.aty = lerp(st.aty, stand - 110, un);
          st.bw = Math.max(st.bw * (1 - un), un); st.btx = HX + 52 + fid; st.bty = stand - 104 - fid;
          st.head = lerp(st.head, 28, un);
          // offers her the rope end at arm's length, then opens his hand
          const off = win(s, T_OFFER, T_OFFER + 0.3);
          st.aw = 1 - off * 0.0; st.atx = lerp(st.atx, HX + 30, off); st.aty = lerp(st.aty, stand - 60, off);
          st.bw = lerp(st.bw, 1, off); st.btx = lerp(st.btx, HX + 112, off); st.bty = lerp(st.bty, stand - 130, off);
          st.head = lerp(st.head, -2, off);
          const lower = win(s, T_DROP + 0.4, T_DROP + 0.9);
          st.bty = lerp(st.bty, stand - 40, lower); st.btx = lerp(st.btx, HX + 40, lower);
          if (s < T_HOLD - 0.1) return st;
          // her hand in his, then they walk off together
          const h = win(s, T_HOLD - 0.1, T_HOLD + 0.1);
          st.aw = 1; st.atx = lerp(st.atx, HX + 70, h); st.aty = lerp(st.aty, stand - 18, h); st.bw = 0; st.head = lerp(st.head, -6, h);
          if (s < T_WALK) return st;
          const x = HX + 230 * ease((s - T_WALK) / (T_END - T_WALK));
          const w = walking(HX, x, 130, 14, 3, -4);
          w.aw = 1; w.atx = x + 70; w.aty = stand - 18;
          return mixPose(st, w, win(s, T_WALK, T_WALK + 0.2));
        }

        // ---------- her: tests him three times, then comes back ----------
        function herRaw(s) {
          if (s < T_GO) { const st = standOn(HOLDX, 1, FL); st.bw = 1; st.btx = HOLDX - 50; st.bty = stand - 40; return st; }
          if (s < T_STOP) { const x = lerp(HOLDX, OUTX, ease((s - T_GO) / (T_STOP - T_GO))); const w = walking(HOLDX, x, 130, 16, 2, -8); w.bw = 1; w.btx = x - 70; w.bty = stand - 50; return w; }
          const st = standOn(OUTX, 1, FL);
          st.bw = 1; st.btx = OUTX - 70; st.bty = stand - 50;
          if (s < T_STR) {
            // stops, looks back over her shoulder, tugs twice
            T_TUG.forEach((t0) => { const k = Math.sin(Math.PI * clamp((s - t0 + 0.08) / 0.2, 0, 1)); st.btx += 26 * k; st.torso += 8 * k; });
            st.head = -10;
            return st;
          }
          if (s < T_SIT) {
            // waves at the stranger, big, then checks if he saw
            const wave = win(s, T_WAVE, T_WAVE + 0.2) * (1 - win(s, T_CHECK, T_CHECK + 0.2));
            st.aw = wave; st.atx = OUTX + 60 + 26 * Math.sin(s * 18); st.aty = stand - 240; st.head = -10 * wave;
            st.torso = 4 + 4 * wave;
            return st;
          }
          // sits down with her back to him, arms crossed, sulking. Peeks.
          const sit = floorSit(OUTX + 20, 1);
          sit.aw = 1; sit.atx = OUTX + 46; sit.aty = FL - 110; sit.bw = 1; sit.btx = OUTX + 56; sit.bty = FL - 100;
          sit.head = 14;
          if (s < T_STAND) {
            const into = mixPose(st, sit, win(s, T_SIT, T_SIT + 0.35));
            // the rope pulls her back hand until she sits on it... she watches the rope fall
            if (s > T_DROP) { into.head = lerp(into.head, 30, win(s, T_DROP + 0.1, T_DROP + 0.5)); }
            return into;
          }
          // stands up, drops her end, runs back to him
          const up = standOn(OUTX, -1, FL); up.head = 22; up.bw = 1; up.btx = OUTX + 60; up.bty = stand - 50;
          if (s < T_RUN) {
            const k = win(s, T_STAND, T_STAND + 0.3);
            const m = mixPose(sit, up, k);
            m.bty = lerp(m.bty, stand - 10, win(s, T_LETGO, T_LETGO + 0.15));
            return m;
          }
          if (s < T_HOLD) return running(OUTX, lerp(OUTX, HOLDX, ease((s - T_RUN) / (T_HOLD - T_RUN))), -1);
          const hold = standOn(HOLDX, -1, FL);
          hold.head = -6; hold.torso = -6;
          hold.aw = 1; hold.atx = HOLDX - 70; hold.aty = stand - 18;
          if (s < T_WALK) return mixPose(running(OUTX, HOLDX, -1), hold, win(s, T_HOLD, T_HOLD + 0.15));
          const x = HOLDX + 230 * ease((s - T_WALK) / (T_END - T_WALK));
          const w = walking(HOLDX + 40, x, 130, 14, 3, -8);
          w.bw = 1; w.btx = x - 70; w.bty = stand - 18; w.aw = 0;
          return w;
        }
        // facing: right while walking away and sulking, left when she looks back / runs back
        const herF = (s) => {
          if (s > T_TUG[0] - 0.25 && s < T_STR - 0.1) return -1;
          if (s > T_CHECK + 0.1 && s < T_SIT) return -1;
          if (s > T_PEEK && s < T_PEEK + 0.35) return -1;
          if (s > T_STAND && s < T_WALK) return -1;
          return 1;
        };

        // ---------- stranger: walks in from the right at test 2, waves back, leaves when the rope drops ----------
        function strRaw(s) {
          if (s < T_STR) return walking(1300, 1300, 130, 14, 3, 0);
          if (s < T_WAVE) return walking(1300, lerp(1300, STRX, ease((s - T_STR) / (T_WAVE - T_STR))), 130, 14, 3, 0);
          const st = standOn(STRX, -1, FL);
          const w = win(s, T_WAVE + 0.2, T_WAVE + 0.4) * (1 - win(s, T_CHECK + 0.1, T_CHECK + 0.3));
          st.aw = w; st.atx = STRX - 50 + 18 * Math.sin(s * 14); st.aty = stand - 230;
          if (s < T_DROP + 0.4) return st;
          return walking(STRX, lerp(STRX, 1400, ease((s - T_DROP - 0.4) / 1.4)), 130, 14, 3, 0);
        }
        const strF = (s) => (s > T_DROP + 0.4 ? 1 : -1);

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.7, 420, 460, 0], [1.1, 1.35, 470, 450, 0], [1.5, 1.9, 330, 440, -2], [2.0, 1.3, 520, 450, 0],
          [2.9, 1.15, 600, 450, 0], [3.4, 1.9, 320, 430, 2], [3.9, 1.4, 520, 450, 0], [4.8, 1.6, 600, 470, 0],
          [5.1, 2.0, 310, 430, -2], [5.9, 1.7, 330, 440, 0], [6.5, 2.4, 350, 420, 0], [7.0, 1.6, 420, 450, 0],
          [7.3, 1.9, 400, 470, 0], [8.2, 1.5, 560, 460, 0], [8.8, 1.35, 480, 450, 0], [9.4, 1.9, 360, 430, 2],
          [9.9, 1.4, 460, 450, 0], [11.4, 1.3, 560, 460, 0], [99, 1.3, 560, 460, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        // rope between two points with a fixed length: it sags when slack, lies on the floor when dropped
        function ropePath(a, b) {
          const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
          const sag = d < ROPE ? Math.sqrt(ROPE * ROPE - d * d) * 0.55 : 0;
          const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
          const cy = Math.min(my + sag * 2, 2 * (FL - 4) - my);
          return `M${r1(a[0])} ${r1(a[1])} Q${r1(mx)} ${r1(cy)} ${r1(b[0])} ${r1(b[1])}`;
        }

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          T_TUG.forEach((t0) => hit(realOf(t0), 0.5, 0.35, 0, 0.15));
          hit(realOf(T_SIT + 0.3), 0.3, 0.1, 0, 0.15);
          hit(realOf(T_DROP + 0.55), 1.2, 0.8, 0.12, 0.35);
          hit(realOf(T_HOLD), 0.6, 0.3, 0, 0.3);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hp = drawFig(her, livePose(herRaw, s, 1.2), herF(s));
          drawFig(stranger, livePose(strRaw, s, 2.1), strF(s));
          strBox.setAttribute("opacity", s < T_STR ? 0 : 1);
          bun.setAttribute("cx", r1(hp.head[0] - herF(s) * 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));

          // rope ends: his wrist (until untied), his offered hand, then falling; her back hand, then dropped
          const wrist = mp.hands[0];
          let a;
          if (s < T_OFFER) a = wrist;
          else if (s < T_DROP) a = mp.hands[1];
          else {
            const ft = Math.max(0, s - T_DROP), hand = [HX + 112, stand - 130];
            const end = [hand[0] + 40 * Math.min(ft, 0.6), Math.min(FL - 4, hand[1] + 900 * ft * ft)];
            a = end;
          }
          let b = hp.hands[1];
          if (s > T_LETGO + 0.1) { const ft = s - T_LETGO - 0.1; b = [OUTX + 40, Math.min(FL - 4, stand - 10 + 900 * ft * ft)]; }
          const rope = ropePath(a, b);
          ropeO.setAttribute("d", rope); ropeW.setAttribute("d", rope);
          const ropeOp = 1 - win(s, T_HOLD + 0.3, T_WALK + 0.6);
          ropeO.setAttribute("opacity", ropeOp.toFixed(3)); ropeW.setAttribute("opacity", ropeOp.toFixed(3));
          knot.setAttribute("cx", r1(wrist[0])); knot.setAttribute("cy", r1(wrist[1]));
          knot.setAttribute("opacity", s < T_OFFER - 0.15 ? 1 : 0);

          // her "?" each time she checks whether he reacts
          [[T_TUG[0] - 0.1, 0], [T_CHECK + 0.1, 1], [T_PEEK, 2]].forEach(([t0, i]) => {
            const q = clamp((s - t0) / 0.7, 0, 1);
            qmarks[i].setAttribute("x", r1(hp.head[0] + 10)); qmarks[i].setAttribute("y", r1(hp.head[1] - 50 - 30 * q));
            qmarks[i].setAttribute("opacity", s > t0 && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0);
          });
          const yq = clamp((s - T_YAWN) / 0.9, 0, 1);
          zz.setAttribute("x", r1(mp.head[0] + 20)); zz.setAttribute("y", r1(mp.head[1] - 40 - 40 * yq));
          zz.setAttribute("opacity", s > T_YAWN && yq < 1 ? (0.8 * Math.sin(Math.PI * yq)).toFixed(3) : 0);

          // the payoff: a heart over their hands, warm light
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1);
          const hm = [(mp.hands[0][0] + hp.hands[s < T_WALK ? 0 : 1][0]) / 2, Math.min(mp.hands[0][1], hp.hands[0][1])];
          heart.setAttribute("transform", `translate(${r1(hm[0])} ${r1(hm[1] - 150 - 30 * hq)}) scale(${(s > T_HOLD ? backOut(hq) * 0.9 : 0).toFixed(3)})`);
          heart.setAttribute("opacity", s > T_HOLD ? (1 - win(s, 10.6, 11.0)).toFixed(3) : 0);
          const wq = win(s, T_HOLD, T_HOLD + 0.6);
          warm.setAttribute("opacity", (0.8 * wq).toFixed(3));
          halo.setAttribute("opacity", (0.4 * wq).toFixed(3));
          warm.setAttribute("cx", r1(lerp(480, 600, win(s, T_WALK, T_END)))); halo.setAttribute("cx", warm.getAttribute("cx"));
          beamHim.setAttribute("opacity", (0.26 * (1 - wq)).toFixed(3));
          beamHer.setAttribute("opacity", (0.2 * (1 - wq)).toFixed(3));

          E("h1").innerHTML = slam(["I", "DON'T", "HOLD", "ANYONE."], [10.9, 11.04, 11.18, 11.34], t, []);
          E("h2").innerHTML = slam(["WHO", "WANTS", "TO", "STAY,", "STAYS."], [11.95, 12.08, 12.2, 12.34, 12.56], t, [4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 11.85, 12.15)).toFixed(3);
          fade.style.opacity = win(t, 13.6, 13.98).toFixed(3);
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
