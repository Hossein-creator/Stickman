        // ---------- "surprise dance" (viral remake, 14.6M views "A surprise dance performance for my fiancé"): engagement party, he sits on a chair in the middle, guests around. Lights out. A spotlight. She walks in and dances for him - she practiced for months, he had no idea. He covers his mouth, then cries. She pulls him up, they dance together, the guests cheer, hearts. FOLLOW: a red "+ FOLLOW" tile lights up on the dance floor, she steps on it on the beat → "FOLLOWING ✓". ----------
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_DARK = 1.6, T_SPOT = 2.2, T_MUS = 2.4, T_IN = 2.5, T_AT = 3.4, T_SURP = 3.8, T_CRY = 6.4, T_PULL = 9.0, T_UP = 9.5, T_TOG = 9.9, T_END = 12.0;
        const T_L2 = 12.6, T_L3 = 13.6;
        const T_CTA = 15.6, T_TILE = 16.0, T_TAP = 17.4;
        const BEAT = 0.5;
        const CHX = 330, DX = 640, GST = [[120, 1], [930, -1], [1040, -1]];

        // ---------- room: string lights, back wall, floor ----------
        const wallG = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 2000, fill: "#1a1420", opacity: 1 }, backG);
        const darkR = svgEl("rect", { x: -1400, y: -1400, width: 3400, height: 3400, fill: "#000", opacity: 0 }, backG);
        const spot = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const spot2 = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const bulbs = [];
        for (let i = 0; i < 26; i++) { const x = -100 + i * 50, y = FL - 470 + 30 * Math.sin((i % 6) / 6 * Math.PI); bulbs.push(svgEl("circle", { cx: x, cy: y, r: 7, fill: ["#ffcf6a", "#ff7a9a", "#7ad0ff"][i % 3], stroke: "#000", "stroke-width": 2 }, roomG)); }
        svgEl("path", { d: Array.from({ length: 26 }, (_, i) => `${i ? "L" : "M"}${-100 + i * 50} ${r1(FL - 476 + 30 * Math.sin((i % 6) / 6 * Math.PI))}`).join(" "), fill: "none", stroke: "#3a3a42", "stroke-width": 3 }, roomG);
        const dots = Array.from({ length: 14 }, (_, i) => svgEl("ellipse", { rx: 28, ry: 8, fill: ["#ff5a8a", "#5ac8ff", "#ffd25a"][i % 3], opacity: 0 }, roomG));
        svgEl("rect", { x: -1400, y: FL - 4, width: 3400, height: 8, fill: "#3a2e48" }, roomG);
        // chair
        svgEl("rect", { x: CHX - 40, y: FL - 104, width: 80, height: 14, rx: 4, fill: "#d8b46a", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: CHX - 46, y: FL - 230, width: 14, height: 230, fill: "#c8a45a", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: CHX + 30, y: FL - 90, width: 10, height: 90, fill: "#c8a45a", stroke: "#000", "stroke-width": 3 }, roomG);
        // follow tile
        const tile = svgEl("g", { opacity: 0 }, fxG);
        const tileR = svgEl("path", { d: "M-90 0 L90 0 L70 -22 L-70 -22 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, tile);
        const tileT = svgEl("text", { x: 0, y: -5, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#fff", "text-anchor": "middle" }, tile);
        const tileGlow = svgEl("ellipse", { cx: 0, cy: -10, rx: 150, ry: 40, fill: "url(#redGlow)", opacity: 0.8 }, tile);
        tile.insertBefore(tileGlow, tileR);

        // ---------- figures ----------
        const guests = GST.map(([x], i) => makeFig(figG, "#5a5e6a", "#4a4e58", false, "g" + i));
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const veil = svgEl("path", { fill: "#ff3b30", stroke: "#000", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0.95 }, figG);
        const tears = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9d4ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const hearts = Array.from({ length: 12 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const notes = Array.from({ length: 6 }, () => svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 34, fill: "#ffcf6a", opacity: 0 }, fxG));
        notes.forEach((n, i) => (n.textContent = i % 2 ? "♪" : "♫"));
        const burst = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 10 C-22 -3 -16 -22 0 -12 C16 -22 22 -3 0 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 28, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt; return g;
        };
        const bWhat = bubble("WAIT... WHAT?!", 260, 26), bCry = bubble("I'M NOT CRYING.", 270, 24), bCome = bubble("DANCE WITH ME ♥", 280, 24, "#c0282a");

        // ---------- dance poses (relative to x, facing toward f) ----------
        const DP = (x, f, k) => {
          const st = base({ hx: x, hy: stand, torso: 3, head: 0, ax: x + 15 * f, ay: FL, bx: x - 15 * f, by: FL });
          if (k === 0) { st.hx += 14; st.ax = x + 40; st.bx = x - 30; reachTo(st, 1, [x - 70, stand - 250]); reachTo(st, 1, [x + 80, stand - 240], "b"); st.torso = -6 * f; st.head = -8; }
          if (k === 1) { st.hy += 26; st.ax = x + 60 * f; st.bx = x - 50 * f; reachTo(st, 1, [x + 120 * f, stand - 150]); reachTo(st, 1, [x - 20 * f, stand - 60], "b"); st.torso = 10; st.head = 6; }
          if (k === 2) { st.hx -= 14; st.ax = x - 20; st.bx = x + 34; st.by = FL - 30; reachTo(st, 1, [x + 80, stand - 250]); reachTo(st, 1, [x - 70, stand - 240], "b"); st.torso = 6 * f; st.head = -8; }
          if (k === 3) { st.hy += 34; st.ax = x + 50 * f; st.bx = x - 40 * f; reachTo(st, 1, [x + 30 * f, stand - 120]); reachTo(st, 1, [x + 40 * f, stand - 110], "b"); st.torso = 20; st.head = 14; }
          return st;
        };
        const danceAt = (x, f, t, off = 0) => { const b = (t - T_MUS) / BEAT + off, i = Math.floor(b), q = sm(frac(b), 0, 0.45); const seq = [0, 1, 2, 3, 0, 2, 1, 3]; return mixPose(DP(x, f, seq[((i % 8) + 8) % 8]), DP(x, f, seq[(((i + 1) % 8) + 8) % 8]), q); };

        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, head = 0) => { const ft = feetOn(x0, x, 90, 9), sw = Math.sin((Math.PI * 2 * (x - x0)) / 90); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 4 + 12 * sw, ael: 14, bsh: -4 - 12 * sw, bel: 14 }); };
        const sitAt = (x, f, o) => base({ hx: x, hy: FL - 112, torso: 6, head: 0, ax: x + f * 60, ay: FL, bx: x + f * 44, by: FL, ...o });

        // ---- her ----
        const herX = (s) => (s < T_AT ? lerp(1250, DX, sm(s, T_IN, T_AT)) : s < T_PULL ? DX : lerp(DX, CHX + 200, sm(s, T_PULL, T_UP)));
        const herF = (s) => (s < T_TOG ? -1 : Math.sin((s - T_TOG) * Math.PI / (BEAT * 4)) > 0 ? -1 : 1);
        function herRaw(s) {
          const x = herX(s);
          if (s < T_AT) { const st = walking(1250, x, -4); reachTo(st, 1, [x - 60, stand - 230]); return st; }
          if (s < T_PULL) return danceAt(x, -1, s);
          if (s < T_TOG) { const st = standOn(x, -1, FL); reachTo(st, 1, [x - 90, stand - 110]); st.head = 6; return st; }
          if (s < T_TAP - 0.6) return danceAt(x, herF(s), s);
          const st = standOn(x, 1, FL); const stp = hold(s, T_TAP - 0.5, T_TAP + 0.5, 0.2);
          st.ax = lerp(st.ax, x + 80, stp); st.ay = FL - 40 * hold(s, T_TAP - 0.5, T_TAP, 0.2); st.hx += 20 * stp;
          reachTo(st, 1, [x - 60, stand - 240]); reachTo(st, 1, [x + 60, stand - 240], "b");
          return st;
        }
        // ---- him ----
        const himX = (s) => (s < T_UP ? CHX + 10 : CHX + 60);
        function himRaw(s) {
          if (s < T_UP) {
            const st = sitAt(CHX + 10, 1, { torso: 4 });
            st.head = lerp(0, -6, win(s, T_SPOT, T_SPOT + 0.3));
            const surp = hold(s, T_SURP, T_PULL, 0.2); reachTo(st, surp, [CHX + 40, FL - 270]); reachTo(st, surp, [CHX + 34, FL - 262], "b"); st.torso = lerp(st.torso, -8, surp);
            if (s > T_SURP && s < T_SURP + 1.0) st.head += 8 * Math.sin((s - T_SURP) * 18) * (1 - (s - T_SURP));
            const cry = hold(s, T_CRY, T_PULL, 0.3); st.head = lerp(st.head, 14, cry); st.torso = lerp(st.torso, 16, cry); reachTo(st, cry, [CHX + 34, FL - 250]); reachTo(st, cry, [CHX + 30, FL - 244], "b");
            const take = win(s, T_PULL + 0.1, T_PULL + 0.4); reachTo(st, take, [herX(s) - 80, stand - 110]);
            if (s > T_PULL + 0.3) { const u = win(s, T_PULL + 0.3, T_UP); st.hy = lerp(st.hy, stand, u); st.ax = lerp(st.ax, CHX + 25, u); st.bx = lerp(st.bx, CHX - 5, u); }
            return st;
          }
          if (s < T_TOG) { const st = standOn(CHX + 60, 1, FL); reachTo(st, 1, [CHX + 140, stand - 110]); return st; }
          if (s < T_CTA) return danceAt(CHX + 60, -herF(s), s, 2);
          const st = standOn(CHX + 60, 1, FL); reachTo(st, 1, [CHX + 120, stand - 240]); reachTo(st, 1, [CHX + 20, stand - 220], "b"); st.head = -6; return st;
        }
        function guestRaw(i) { return (s) => { const [x, f] = GST[i]; const st = standOn(x, f, FL); const ch = hold(s, T_TOG - 0.3, T_CTA + 2, 0.3); const clap = Math.abs(Math.sin(s * 8 + i)); reachTo(st, ch, [x + f * 30, stand - 230 - 20 * clap]); reachTo(st, ch, [x + f * 10, stand - 220 + 20 * clap], "b"); reachTo(st, (1 - ch) * win(s, T_SURP, T_SURP + 0.4), [x + f * 20, stand - 150]); st.head = -4; return st; }; }

        // ---------- HTML overlays ----------
        const capCss = document.createElement("style");
        capCss.textContent = "#cap span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(capCss);
        const cap = document.createElement("div"); cap.id = "cap";
        cap.style.cssText = "position:absolute;left:110px;right:110px;top:320px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;color:#fff;letter-spacing:0.06em;text-shadow:0 0 14px rgba(255,255,255,0.3)";
        E("stage").appendChild(cap);
        const tom = document.createElement("div");
        tom.style.cssText = "position:absolute;left:0;width:1080px;top:540px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:28px;letter-spacing:0.14em;color:#ffcf7a";
        E("stage").appendChild(tom);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera ----------
        const SHOTS = [[0, 1.2, 560, 400, 1.25], [T_SPOT, 1.3, 600, 400, 1.35], [T_SURP - 0.05, 2.1, CHX + 20, 370, 2.2], [T_SURP + 1.4, 1.5, 560, 390, 1.6], [T_CRY - 0.05, 2.2, CHX + 20, 370, 2.3], [T_CRY + 1.4, 1.4, 520, 400, 1.5], [T_TOG, 1.5, 450, 390, 1.6], [T_L2 - 0.1, 1.3, 520, 400, 1.35], [T_CTA, 1.8, CHX + 190, 420, 2.0]];
        function camAt(s) {
          let k = 0; for (let i = 0; i < SHOTS.length; i++) if (s >= SHOTS[i][0]) k = i;
          const [a, z0, cx, cy, z1] = SHOTS[k], b = k + 1 < SHOTS.length ? SHOTS[k + 1][0] : DUR;
          return [lerp(z0, z1, sm(s, a, b)), cx, cy];
        }
        const CAPS = [[0.2, "ENGAGEMENT PARTY."], [T_DARK, "LIGHTS OFF.", 1], [T_AT, "SHE PRACTICED FOR MONTHS.", 2], [T_SURP + 0.6, "HE HAD NO IDEA.", 2], [T_CRY, "HE'S CRYING.", 1], [T_PULL, "\"DANCE WITH ME.\"", 0], [T_TOG + 0.4, "NOW THEY BOTH DANCE.", 2]];
        function slamHTML(txt, t0, t, red) {
          return txt.split(" ").map((w, i) => {
            const q = clamp((t - t0 - i * 0.09) / 0.2, 0, 1);
            if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
            return `<span class="w" style="transform:scale(${lerp(1.8, 1, backOut(q)).toFixed(3)});filter:blur(${((1 - q) * 5).toFixed(1)}px);${red !== undefined && i === red ? "color:#ff3b30;" : ""}">${w}</span>`;
          }).join("");
        }
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.14em";
        E("head").style.lineHeight = "1.6";

        function render(t) {
          const s = t, c = camAt(s);
          cam.setAttribute("transform", `translate(540 1180) scale(${c[0].toFixed(4)}) translate(${r1(-c[1])} ${r1(-c[2])})`);
          guests.forEach((g, i) => drawFig(g, livePose(guestRaw(i), s, i), GST[i][1]));
          const mp = drawFig(him, livePose(himRaw, s, 0.3), s < T_TOG ? 1 : (s < T_CTA ? -herF(s) : 1));
          const hf = s < T_AT ? -1 : (s < T_TOG ? -1 : s > T_TAP - 0.6 ? 1 : herF(s));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), hf);
          her.g.setAttribute("opacity", s > T_IN ? 1 : 0); bun.setAttribute("opacity", s > T_IN ? 1 : 0); veil.setAttribute("opacity", s > T_IN ? 0.95 : 0);
          if (her.g.previousSibling) her.g.previousSibling.setAttribute("opacity", s > T_IN ? 0.45 : 0);
          bun.setAttribute("cx", r1(hp.head[0] - 25 * hf)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const vx = hp.head[0] - 22 * hf, vy = hp.head[1] - 10, sw = 10 * Math.sin(s * 6);
          veil.setAttribute("d", `M${r1(vx)} ${r1(vy - 20)} Q${r1(vx - 40 * hf + sw)} ${r1(vy + 40)} ${r1(vx - 30 * hf + sw)} ${r1(vy + 110)} L${r1(vx - 10 * hf)} ${r1(vy + 100)} Q${r1(vx - 10 * hf)} ${r1(vy + 30)} ${r1(vx + 6 * hf)} ${r1(vy - 4)} Z`);
          // lights
          const dk = sm(s, T_DARK, T_DARK + 0.15) * (1 - sm(s, T_TOG, T_TOG + 0.6) * 0.6);
          darkR.setAttribute("opacity", (0.75 * dk).toFixed(3));
          bulbs.forEach((b, i) => b.setAttribute("opacity", s > T_DARK && s < T_TOG ? 0.25 : (0.75 + 0.25 * Math.sin(s * 4 + i)).toFixed(3)));
          const sx = herX(s);
          spot.setAttribute("points", `${r1(sx - 40)},${FL - 700} ${r1(sx + 40)},${FL - 700} ${r1(sx + 150)},${FL} ${r1(sx - 150)},${FL}`);
          spot.setAttribute("opacity", (sm(s, T_SPOT, T_SPOT + 0.2) * 0.9).toFixed(3));
          spot2.setAttribute("points", `${CHX - 30},${FL - 700} ${CHX + 50},${FL - 700} ${CHX + 150},${FL} ${CHX - 110},${FL}`);
          spot2.setAttribute("opacity", (sm(s, T_SURP, T_SURP + 0.3) * 0.5).toFixed(3));
          dots.forEach((d, i) => { const ph = s * 0.8 + i * 0.7; d.setAttribute("cx", r1(150 + ((i * 97 + ph * 120) % 900))); d.setAttribute("cy", FL + 6); d.setAttribute("opacity", s > T_MUS ? (0.5 * (0.5 + 0.5 * Math.sin(s * 6 + i))).toFixed(3) : 0); });
          // tears, notes, hearts
          tears.forEach((e, i) => { const q = frac(s * 1.2 + i / 6); e.setAttribute("transform", `translate(${r1(mp.head[0] + (i % 2 ? 22 : -4))} ${r1(mp.head[1] + 4 + 70 * q * q)})`); e.setAttribute("opacity", (hold(s, T_CRY, T_UP + 0.6, 0.3) * (1 - q)).toFixed(3)); });
          notes.forEach((n, i) => { const q = frac(s * 0.5 + i / 6); n.setAttribute("x", r1(sx - 140 + 280 * ((i * 0.37) % 1))); n.setAttribute("y", r1(FL - 320 - 200 * q)); n.setAttribute("opacity", s > T_MUS && s < T_CTA ? (0.8 * Math.sin(Math.PI * q)).toFixed(3) : 0); });
          hearts.forEach((h, i) => { const t0 = T_TOG + i * 0.18, q = clamp((s - t0) / 1.6, 0, 1); h.setAttribute("opacity", s > t0 && q < 1 && s < T_CTA ? (1 - q).toFixed(3) : 0); h.setAttribute("transform", `translate(${r1(450 + 160 * Math.sin(i * 2.3 + q * 3))} ${r1(stand - 220 - 240 * q)}) scale(${(0.7 + 0.6 * q).toFixed(2)})`); });
          // bubbles
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bWhat, T_SURP + 0.1, T_SURP + 1.4, [mp.head[0] + 70, mp.head[1] - 90]);
          bub(bCry, T_CRY + 0.3, T_CRY + 1.8, [mp.head[0] + 80, mp.head[1] - 90]);
          bub(bCome, T_PULL, T_TOG + 0.2, [hp.head[0] - 30, hp.head[1] - 90]);
          // FOLLOW tile
          const tk = sm(s, T_TILE, T_TILE + 0.3), tapped = s > T_TAP;
          tile.setAttribute("opacity", tk.toFixed(3));
          tile.setAttribute("transform", `translate(${CHX + 300} ${FL + 2}) scale(${(tapped ? 1 + 0.1 * Math.sin(Math.PI * clamp((s - T_TAP) / 0.25, 0, 1)) : 0.6 + 0.4 * backOut(tk)).toFixed(3)})`);
          tileR.setAttribute("fill", tapped ? "#ffffff" : "#ff3b30"); tileT.setAttribute("fill", tapped ? "#000" : "#fff"); tileT.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW"; tileT.setAttribute("font-size", tapped ? 13 : 16);
          tileGlow.setAttribute("opacity", (0.5 + 0.3 * Math.sin(s * 8)).toFixed(3));
          burst.forEach((e, i) => { const q = clamp((s - T_TAP) / 0.9, 0, 1), a = Math.PI + (i / 9) * Math.PI; e.setAttribute("opacity", tapped && q < 1 ? (1 - q).toFixed(3) : 0); e.setAttribute("transform", `translate(${r1(CHX + 300 + Math.cos(a) * 160 * Math.sqrt(q))} ${r1(FL - 20 + Math.sin(a) * 120 * Math.sqrt(q))}) scale(${(0.5 - 0.2 * q).toFixed(2)})`); });

          let ci = -1; for (let i = 0; i < CAPS.length; i++) if (s >= CAPS[i][0]) ci = i;
          cap.innerHTML = ci >= 0 && s < T_L2 - 0.3 ? slamHTML(CAPS[ci][1], CAPS[ci][0], s, CAPS[ci][2]) : "";
          const L2 = "SHE DANCED FOR HIM.", L3 = "HE CRIED FOR HER.";
          E("head").innerHTML = `<div>SURPRISE FOR MY FIANCÉ.</div><div>${L2.slice(0, Math.max(0, Math.floor((s - T_L2) * 26)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((s - T_L3) * 26)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.75 * win(s, T_TILE, T_TILE + 0.4)).toFixed(3);
          const TT = "TOMORROW: A NEW LOVE STORY ♥";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((s - T_TAP - 0.4) * 28)));
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
