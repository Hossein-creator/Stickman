        // ---------- "the wall" (idea remake of a user upload, 2026-11-14): every fight adds a row of bricks between them until the wall is taller than both. She knocks and leans on it crying; he turns his back (too proud). She gives up and walks away. One day he is ready, says "I'M SORRY." and pushes the wall down: she is gone. He kneels in the rubble. FOLLOW: six bricks rise from the rubble and form a sign "+ FOLLOW", he taps it.
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const wallG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_S1 = 0.6, T_H1 = 2.1, T_S2 = 3.0, T_S3 = 4.4;
        const C1 = 6.0, T_K1 = 6.7, T_K2 = 7.05, T_LEAN = 7.6;
        const C2 = 9.0;
        const C3 = 11.0, T_WIPE = 11.2, T_TURNH = 11.9, T_LEAVE = 12.2, T_GONE = 13.4;
        const C4 = 13.4, T_SOFT = 13.5, T_TURNM = 13.9, T_SORRY = 14.1, T_PUSH = 14.7, T_COL = 15.2;
        const C5 = 15.7, T_KNEEL = 16.9, T_L2 = 18.0, T_L3 = 19.1;
        const T_CTA = 20.6, T_UP = 20.8, T_SIGN = 21.6, T_TAP = 22.6;
        const SHE = 350, HE = 730, WX = 540, WW = 110, WL = WX - WW / 2, WR = WX + WW / 2, RH = 25, ROWS = 20;
        // shout -> rows that rise after it
        const GROUPS = [[T_S1, 0, 6], [T_S2, 7, 12], [T_S3, 13, 19]];
        const rowT = (r) => { for (const [t0, a, b] of GROUPS) if (r >= a && r <= b) return t0 + 0.35 + (r - a) * 0.13; return 0; };

        // ---------- set: dark void, one cold spotlight on the wall ----------
        svgEl("polygon", { points: `${WX - 90},${FL - 560} ${WX + 90},${FL - 560} ${WX + 330},${FL} ${WX - 330},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.14 }, beams);
        const cold = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#0c1428", opacity: 0 }, backG);
        const warm = svgEl("circle", { cx: WX, cy: FL - 200, r: 520, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- bricks ----------
        const bricks = [];
        let bs = 3;
        const br = () => ((bs = (bs * 16807) % 2147483647) / 2147483647);
        for (let r = 0; r < ROWS; r++) {
          const cuts = r % 2 ? [WL, WL + WW / 4, WX + WW / 4, WR] : [WL, WX, WR];
          for (let i = 0; i < cuts.length - 1; i++) {
            const x0 = cuts[i], x1 = cuts[i + 1], y1 = FL - r * RH, y0 = y1 - RH;
            const g = svgEl("g", { opacity: 0 }, wallG);
            const w = x1 - x0;
            svgEl("rect", { x: -w / 2 + 1.5, y: -RH / 2 + 1.5, width: w - 3, height: RH - 3, rx: 2, fill: ["#d9d3c7", "#cfc8bb", "#e2dccf"][(r + i) % 3], stroke: "#000", "stroke-width": 4 }, g);
            svgEl("line", { x1: -w / 2 + 6, y1: -RH / 2 + 6, x2: w / 2 - 8, y2: -RH / 2 + 6, stroke: "#fff", "stroke-width": 2, opacity: 0.5 }, g);
            const fall = (r + 1) / ROWS;
            bricks.push({ g, r, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w, t: rowT(r) + i * 0.04,
              // collapse: away from him (he pushes from the right), top rows fly furthest
              ex: WX - 60 - 220 * fall * (0.6 + 0.6 * br()) + 90 * (br() - 0.5), ey: FL - 10 - 26 * br() * (1 - fall * 0.6), er: (br() - 0.5) * 220, dl: (ROWS - r) * 0.018 + br() * 0.05 });
          }
        }
        // the six sign bricks for the FOLLOW moment (3 x 2), taken from the rubble
        const SIGN = [WX - 40, FL - 190], SB = [0, 7, 15, 22, 30, 38].map((k) => bricks[k]);
        const signT = svgEl("text", { x: 0, y: 14, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 30, fill: "#d8261c", "text-anchor": "middle", opacity: 0 }, fxG);
        signT.setAttribute("paint-order", "stroke"); signT.setAttribute("stroke", "#fff"); signT.setAttribute("stroke-width", 6);
        const dust = Array.from({ length: 22 }, (_, i) => svgEl("circle", { r: 10, fill: "#9a958c", opacity: 0, filter: "url(#soft)" }, fxG));
        const tears = Array.from({ length: 5 }, () => svgEl("ellipse", { rx: 4, ry: 7, fill: "#6ab8ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));

        // ---------- figures ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");

        const bubble = (txt, w, size = 30, col = "#111", angry = false) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          if (angry) {
            const n = 14, pts = Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? 1 : 1.16; return `${r1(Math.cos(a) * (w / 2 + 10) * rr)},${r1(Math.sin(a) * 52 * rr - 5)}`; }).join(" ");
            svgEl("polygon", { points: pts, fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          } else {
            svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
            svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
            svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          }
          const tx = svgEl("text", { x: 0, y: 11, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bS1 = bubble("YOU NEVER LISTEN!", 300, 28, "#d8261c", true), bH1 = bubble("CAN WE TALK?", 230, 28), bS2 = bubble("NOT NOW!", 170, 30, "#d8261c", true), bS3 = bubble("LEAVE ME ALONE!", 270, 28, "#d8261c", true);
        const bK = bubble("KNOCK KNOCK", 220, 26, "#555"), bSorry = bubble("I'M SORRY.", 210, 30);

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, head = 10) => { const ft = feetOn(x0, x, 100, 10), sw = Math.sin((Math.PI * 2 * (x - x0)) / 100); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 8, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 14 * sw, ael: 14, bsh: -4 - 14 * sw, bel: 14 }); };

        // ---- her ----
        const NEAR = 418;
        const herDir = (s) => (s > T_TURNH ? -1 : 1);
        function herRaw(s) {
          if (s < C1) {
            const st = standOn(SHE, 1, FL); st.head = -2;
            const ask = hold(s, T_H1 - 0.1, T_H1 + 1.0, 0.25); reachTo(st, ask, [SHE + 70, stand - 120]); reachTo(st, ask, [SHE + 60, stand - 110], "b"); st.torso += 6 * ask;
            for (const t of [T_S1, T_S2, T_S3]) { const fl = hold(s, t, t + 0.6, 0.12); st.torso -= 7 * fl; st.head += 12 * fl; }
            return st;
          }
          if (s < T_LEAVE) {
            const x = lerp(SHE, NEAR, sm(s, C1, C1 + 0.6));
            if (s < C1 + 0.6) return walking(SHE, x, 4);
            const st = standOn(x, herDir(s), FL); st.head = 0;
            const kn = hold(s, T_K1 - 0.25, T_LEAN, 0.2), bump = Math.max(0, Math.sin(Math.PI * clamp((s - T_K1) / 0.15, 0, 1))) + Math.max(0, Math.sin(Math.PI * clamp((s - T_K2) / 0.15, 0, 1)));
            reachTo(st, kn, [WL - 22 + 14 * bump, stand - 95]);
            const ln = hold(s, T_LEAN, T_WIPE, 0.5);
            st.torso += 16 * ln; st.head += 22 * ln; st.hx += 8 * ln;
            reachTo(st, ln, [WL - 4, stand - 115], "b"); reachTo(st, ln, [WL - 12, stand - 50]);
            const wp = hold(s, T_WIPE, T_TURNH, 0.2); reachTo(st, wp, [x + 22, stand - 160]); st.head += 14 * wp;
            if (s > T_TURNH) { st.head = 18; }
            return st;
          }
          const x = lerp(NEAR, 60, sm(s, T_LEAVE, T_GONE + 0.6));
          return walking(NEAR, x, 20);
        }
        // ---- him ----
        const himDir = (s) => (s > C2 - 0.4 && s < T_TURNM ? 1 : -1);
        function himRaw(s) {
          if (s < C2 - 0.4) {
            const st = standOn(HE, -1, FL); st.head = -6;
            for (const t of [T_S1, T_S2, T_S3]) {
              const sh = hold(s, t - 0.1, t + 0.9, 0.12); st.torso += 10 * sh; st.head -= 8 * sh;
              reachTo(st, sh, [HE - 110, stand - 175 + 8 * Math.sin(s * 30) * sh]);
              reachTo(st, sh * 0.8, [HE + 10, stand - 60], "b");
            }
            return st;
          }
          if (s < T_TURNM) {
            const st = standOn(HE, 1, FL); st.head = -12; st.torso = -2;
            reachTo(st, 1, [HE + 30, stand - 30]); reachTo(st, 1, [HE - 20, stand - 30], "b");
            const sf = win(s, T_SOFT, T_SOFT + 0.4); st.head = lerp(st.head, 24, sf); st.torso += 6 * sf;
            return st;
          }
          // turns back to the wall, says sorry, steps in and pushes
          const x = lerp(HE, 655, sm(s, T_SORRY + 0.4, T_PUSH));
          const st = standOn(x, -1, FL); st.head = lerp(24, 4, win(s, T_TURNM, T_TURNM + 0.4));
          const pu = s < T_COL ? win(s, T_PUSH - 0.25, T_PUSH) : 1 - win(s, T_COL, T_COL + 0.5);
          const strain = s > T_PUSH && s < T_COL ? 1 : 0;
          st.torso += 22 * pu + 2 * strain * Math.sin(s * 40); st.hx += 6 * pu;
          reachTo(st, pu, [WR + 6, stand - 150]); reachTo(st, pu, [WR + 6, stand - 105], "b");
          // after the fall: looks for her, then kneels
          const lk = win(s, C5 + 0.2, C5 + 0.8); st.head = lerp(st.head, -6, lk);
          const kn = s < T_UP ? win(s, T_KNEEL, T_KNEEL + 0.8) : 1 - win(s, T_UP, T_UP + 0.7);
          st.hy += 78 * kn; st.torso += 26 * kn; st.head = lerp(st.head, 30, kn);
          st.ax = x - 40; st.ay = FL; st.bx = lerp(x + 15, x + 52, kn); st.by = FL;
          reachTo(st, kn, [x - 70, FL - 20]);
          // FOLLOW: reaches out and taps the brick sign
          const tp = hold(s, T_TAP - 0.5, T_TAP + 0.4, 0.3), press = s > T_TAP - 0.08 && s < T_TAP + 0.12 ? 8 : 0;
          reachTo(st, tp, [SIGN[0] + 95 - press, SIGN[1] + 8]);
          const ch = win(s, T_TAP + 0.6, T_TAP + 0.9);
          st.head = lerp(st.head, -12, ch);
          return st;
        }

        // ---------- text layers ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:100px;right:100px;top:350px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:100px;right:100px;top:1660px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:34px;letter-spacing:0.1em;color:#fff";
        E("stage").appendChild(sub);
        const cut = document.createElement("div");
        cut.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(cut);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera: hard cuts between her side and his side ----------
        const SHOTS = [[0, 1.72, 540, 385, 1.8], [C1, 2.2, 430, 385, 2.35], [C2, 2.2, 655, 385, 2.35], [C3, 2.1, 420, 385, 2.0], [C4, 2.05, 640, 385, 2.3], [C5, 1.6, 540, 395, 1.7], [T_CTA, 1.7, 570, 395, 1.8]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.9, "EVERY FIGHT ADDED A BRICK.", 4], [C1 + 0.2, "SHE KNOCKED."], [T_LEAN, "HE DIDN'T ANSWER.", 2], [C2 + 0.2, "HE WAS TOO PROUD.", 3], [C3 + 0.2, "SO ONE DAY SHE LEFT.", 4], [C4 + 0.2, "THEN HE WAS READY."], [C5 + 0.2, "BUT SHE WAS GONE.", 3]];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }

        E("head").style.top = "236px";
        E("head").style.fontSize = "32px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s);
          // shake: each shout (small), the collapse (big)
          let shk = 0;
          for (const tt of [T_S1, T_S2, T_S3]) shk += s > tt && s < tt + 0.3 ? 5 * (1 - (s - tt) / 0.3) : 0;
          shk += s > T_COL && s < T_COL + 0.7 ? 16 * (1 - (s - T_COL) / 0.7) : 0;
          const sx = shk * Math.sin(s * 91), sy = shk * Math.cos(s * 77);
          cam.setAttribute("transform", `translate(${r1(540 + sx)} ${r1(1180 + sy)}) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herDir(s));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himDir(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25 * herDir(s))); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const herOn = s < T_GONE + 0.6;
          her.g.style.opacity = herOn ? 1 : 0; bun.setAttribute("opacity", herOn ? 1 : 0);
          // bricks: pop in row by row, fall at the push, six of them rise into the sign
          bricks.forEach((b) => {
            let x = b.cx, y = b.cy, rot = 0, sc = [1, 1], op = 0;
            if (s > b.t) {
              const q = clamp((s - b.t) / 0.22, 0, 1); op = 1; y = b.cy - 40 * (1 - backOut(q)); rot = 0;
            }
            const fq = clamp((s - T_COL - b.dl) / 0.75, 0, 1);
            if (s > T_COL + b.dl) { x = lerp(b.cx, b.ex, ease(fq)); y = lerp(b.cy, b.ey, fq * fq) - 40 * Math.sin(Math.PI * fq) * (1 - b.r / ROWS); rot = b.er * fq; if (fq >= 1) y += 3 * Math.max(0, Math.sin(Math.PI * clamp((s - T_COL - b.dl - 0.75) / 0.15, 0, 1))); }
            const si = SB.indexOf(b);
            if (si >= 0 && s > T_SIGN - 0.6) {
              const q = backOut(clamp((s - (T_SIGN - 0.6) - si * 0.07) / 0.55, 0, 1));
              const tx = SIGN[0] + ((si % 3) - 1) * 70, ty = SIGN[1] + (si < 3 ? -20 : 20);
              x = lerp(b.ex, tx, q); y = lerp(b.ey, ty, q); rot = lerp(b.er, 0, q); sc = [lerp(1, 70 / b.w, q), lerp(1, 40 / RH, q)];
            }
            b.g.setAttribute("opacity", op);
            b.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${sc[0].toFixed(3)} ${sc[1].toFixed(3)})`);
          });
          // sign text + tap
          const tapped = s > T_TAP;
          const sq = clamp((s - T_SIGN) / 0.3, 0, 1);
          const pr = tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.2, 0, 1)) : 1 + 0.04 * Math.max(0, Math.sin(s * 6)) * sq;
          signT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          signT.setAttribute("font-size", tapped ? 26 : 32);
          signT.setAttribute("fill", tapped ? "#111" : "#d8261c");
          signT.setAttribute("opacity", sq.toFixed(3));
          signT.setAttribute("transform", `translate(${SIGN[0]} ${SIGN[1]}) scale(${(pr * lerp(1.4, 1, backOut(sq))).toFixed(3)})`);
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(SIGN[0] + Math.cos(a) * 170 * Math.sqrt(q))} ${r1(SIGN[1] + Math.sin(a) * 120 * Math.sqrt(q) - 40 * q)}) scale(${(0.9 - 0.4 * q).toFixed(2)})`); });
          // dust cloud after the collapse
          dust.forEach((e, i) => { const q = clamp((s - T_COL - 0.25) / 1.8, 0, 1), a = (i / 22) * Math.PI + 0.4 * Math.sin(i * 7.1), rr = 0.5 + 0.5 * Math.abs(Math.sin(i * 3.3)); e.setAttribute("opacity", s > T_COL + 0.25 && q < 1 ? (0.5 * (1 - q)).toFixed(3) : 0); e.setAttribute("cx", r1(WX - 60 - Math.cos(a) * 260 * rr * Math.sqrt(q))); e.setAttribute("cy", r1(FL - 20 - Math.sin(a) * 110 * rr * Math.sqrt(q))); e.setAttribute("r", r1(10 + 34 * q)); });
          // tears while she leans on the wall
          tears.forEach((e, i) => { const q = frac((s - T_LEAN) * 0.9 + i / 5); const on = s > T_LEAN + 0.3 && s < T_WIPE + 0.2; e.setAttribute("opacity", on ? (1 - q).toFixed(3) : 0); e.setAttribute("cx", r1(hp.head[0] + 16)); e.setAttribute("cy", r1(hp.head[1] + 12 + 150 * q * q)); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bS1, T_S1, T_S1 + 1.2, [mp.head[0] - 60, mp.head[1] - 120]);
          bub(bH1, T_H1, T_S2 - 0.05, [hp.head[0] + 50, hp.head[1] - 110]);
          bub(bS2, T_S2, T_S2 + 1.1, [mp.head[0] - 30, mp.head[1] - 120]);
          bub(bS3, T_S3, T_S3 + 1.3, [mp.head[0] - 60, mp.head[1] - 120]);
          bub(bK, T_K1 - 0.05, T_K2 + 0.6, [hp.head[0] - 10, hp.head[1] - 112]);
          bub(bSorry, T_SORRY, T_PUSH + 0.2, [mp.head[0] - 30, mp.head[1] - 112]);
          // mood: colder with every row, cold blue when she leaves, a little warmth at the FOLLOW tap
          const built = bricks.filter((b) => s > b.t).length / bricks.length;
          cold.setAttribute("opacity", (0.3 * built + 0.25 * win(s, T_LEAVE, T_GONE) - 0.3 * win(s, T_TAP, T_TAP + 0.6)).toFixed(3));
          warm.setAttribute("opacity", (0.22 * win(s, T_TAP, T_TAP + 0.6)).toFixed(3));
          E("flash").style.opacity = (s > T_COL && s < T_COL + 0.25 ? 0.35 * (1 - (s - T_COL) / 0.25) : 0).toFixed(3);

          // captions + cut flashes
          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.1 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          let cf = 0; for (const cc of [C1, C2, C3, C4, C5]) cf = Math.max(cf, 1 - Math.abs(s - cc) / 0.12);
          cut.style.opacity = clamp(cf, 0, 1).toFixed(3);
          const L1 = "THE WALL.", L2 = "EVERY HARSH WORD IS A BRICK.", L3 = "DON'T WAIT UNTIL SHE'S GONE.";
          E("head").innerHTML = s < T_L2 - 0.6 ? "" : `<div>${L1.slice(0, Math.max(0, Math.floor((s - T_L2 + 0.6) * 26)))}&nbsp;</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          const sb = s - (T_SIGN + 0.3), a1 = "BUILD BRIDGES, NOT WALLS.";
          sub.innerHTML = sb > 0 ? `${a1.slice(0, Math.floor(sb * 30))}&nbsp;` : "";
          fade.style.opacity = win(s, DUR - 0.4, DUR - 0.02).toFixed(3);
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
