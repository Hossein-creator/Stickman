        // ---------- "love is a lifeboat. #15": winner split-screen format. A leaking boat on a stormy night sea. BOTH BAIL: bucket by bucket the water stays low, the storm passes, dawn, they lean together (heart). ONE BAILS: she sits on her phone, he bails for two, gets slower, stops; the water rises to the rim; only then she looks up. FOLLOW: he fires a flare, it bursts into "+ FOLLOW" in the sky, she fires the second one: "FOLLOWING". ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const frac = (v) => v - Math.floor(v);
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const SEA = 610, BCX = 620;
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- beats ----------
        const T_GO = 0.3, T_REST = 8.5, T_LEAN = 8.9, T_HEART = 9.3;
        const T_TIRED = 4.5, T_STOP = 8.0, T_LOOK = 9.2;
        const T_H2 = 10.0, T_H3 = 11.2;
        const T_CTA = 13.6, T_F1 = T_CTA + 1.3, T_B1 = T_F1 + 0.6, T_F2 = T_B1 + 1.2, T_B2 = T_F2 + 0.55;
        const storm = (t, top) => (top ? lerp(1, 0.3, sm(t, 6.0, 9.0)) : 1);

        // bail phase tables (seek-safe): rate in cycles per second
        const STEP = 1 / 240, NST = Math.ceil(DUR / STEP) + 2;
        const rateTop = (t) => (t < T_GO || t > T_REST ? 0 : 1.0);
        const rateBot = (t) => (t < T_GO || t > T_STOP ? 0 : t < T_TIRED ? 1.0 : lerp(1.0, 0.55, (t - T_TIRED) / (T_STOP - T_TIRED)));
        function table(rate, off) { const a = new Float32Array(NST); let ph = off; for (let i = 0; i < NST; i++) { a[i] = ph; ph += rate(i * STEP) * STEP; } return a; }
        const PH = { her: table(rateTop, 0.5), him: table(rateTop, 0), bot: table(rateBot, 0) };
        const phAt = (arr, t) => { const x = clamp(t / STEP, 0, NST - 2), i = Math.floor(x); return lerp(arr[i], arr[i + 1], x - i); };
        // time of the last splash (phase crossing k + 0.7) before t
        function lastSplash(arr, t) { const p = phAt(arr, t) - 0.7; if (p < 0) return -9; const k = Math.floor(p) + 0.7; let i = Math.floor(clamp(t / STEP, 0, NST - 2)); while (i > 0 && arr[i] > k) i--; return i * STEP; }

        function makePanel(y0, id, top) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const dawn = svgEl("rect", { x: 0, y: PY0, width: PW, height: SEA - PY0 + 10, fill: "url(#dawn)", opacity: 0 }, inner);
          const sun = svgEl("circle", { cx: 1010, cy: SEA + 40, r: 90, fill: "#ffcf7a", opacity: 0 }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1000]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${SEA} ${bx - 150},${SEA}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.16 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 220), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          svgEl("circle", { cx: 1120, cy: PY0 + 90, r: 34, fill: "#e8e4d8", opacity: 0.55 }, inner);
          const seaB = svgEl("path", { fill: "url(#seaB)" }, inner);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const boat = svgEl("g", {}, inner);
          const seaF = svgEl("path", { fill: "url(#seaF)" }, inner);
          const foam = svgEl("path", { fill: "none", stroke: "#9fb6cc", "stroke-width": 4, opacity: 0.55 }, inner);
          const rain = Array.from({ length: 26 }, () => svgEl("line", { stroke: "#9fb0c8", "stroke-width": 3, opacity: 0.45, "stroke-linecap": "round" }, inner));
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, top, dawn, sun, beams, seaB, seaF, foam, rain, glow, boat, fx, dark };
        }
        const top = makePanel(412, "T", true);
        const bot = makePanel(1010, "B", false);

        // ---------- the boat (local: rim center at 0,0; opening seen slightly from above) ----------
        const RX = 270, RY = 40;
        function makeBoat(P2, white) {
          const g = svgEl("g", {}, P2.boat);
          svgEl("ellipse", { cx: 0, cy: 0, rx: RX, ry: RY, fill: white ? "#3a2616" : "#2a2622", stroke: "#000", "stroke-width": 6 }, g);
          const water = svgEl("ellipse", { cx: 0, cy: 20, rx: 150, ry: 18, fill: "#2f6c9e", stroke: "#1a3a58", "stroke-width": 3, opacity: 0.95 }, g);
          const spout = svgEl("path", { fill: "#8fc0ea", stroke: "#1a3a58", "stroke-width": 2 }, g);
          svgEl("path", { d: `M${-RX + 30} 22 L${RX - 30} 22`, stroke: white ? "#7a5232" : "#55504a", "stroke-width": 12, "stroke-linecap": "round" }, g); // bench
          const figs = svgEl("g", {}, g);
          const hull = `M${-RX} 0 A${RX} ${RY} 0 0 0 ${RX} 0 L${RX - 50} 110 Q0 132 ${-RX + 50} 110 Z`;
          svgEl("path", { d: hull, fill: white ? "url(#woodT)" : "url(#woodB)", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, g);
          for (const yy of [44, 78]) svgEl("path", { d: `M${-RX + 18 + yy * 0.4} ${yy} Q0 ${yy + 40} ${RX - 18 - yy * 0.4} ${yy}`, fill: "none", stroke: "#000", "stroke-width": 3, opacity: 0.45 }, g);
          svgEl("path", { d: `M${-RX} 0 A${RX} ${RY} 0 0 0 ${RX} 0`, fill: "none", stroke: white ? "#d9a36a" : "#9a928a", "stroke-width": 6 }, g);
          const drops = svgEl("g", {}, g);
          return { g, water, spout, figs, drops };
        }
        const TB = makeBoat(top, true), BB = makeBoat(bot, false);
        const mkFig = (B, white, kind) => makeFig(B.figs, white ? "#ffffff" : kind === "her" ? "#8e8e8e" : "#9a9a9a", white ? "#e0e0e0" : "#767676", white, kind + (white ? "T" : "B"));
        const TF = { bun: svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, TB.figs), her: mkFig(TB, true, "her"), him: mkFig(TB, true, "him") };
        const BF = { bun: svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, BB.figs), her: mkFig(BB, false, "her"), him: mkFig(BB, false, "him") };
        const bucket = (B, col) => { const g = svgEl("g", {}, B.figs); svgEl("path", { d: "M-20 -22 L20 -22 L15 16 L-15 16 Z", fill: col, stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, g); svgEl("path", { d: "M-20 -22 Q0 -46 20 -22", fill: "none", stroke: "#000", "stroke-width": 3 }, g); return g; };
        const bkHerT = bucket(TB, "#e8e8e8"), bkHimT = bucket(TB, "#e8e8e8"), bkHimB = bucket(BB, "#a8a8a8");
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, BB.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, BB.figs);
        const gun = svgEl("g", { opacity: 0 }, TB.figs);
        svgEl("path", { d: "M-6 10 L-6 -6 L22 -6 L22 4 L4 4 L4 10 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, "stroke-linejoin": "round" }, gun);
        const gun2 = gun.cloneNode(true); TB.figs.appendChild(gun2);
        const mkDrops = (B) => Array.from({ length: 7 }, () => svgEl("circle", { r: 7, fill: "#8fc0ea", stroke: "#1a3a58", "stroke-width": 2, opacity: 0 }, B.drops));
        const dHerT = mkDrops(TB), dHimT = mkDrops(TB), dHimB = mkDrops(BB);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);

        // ---------- poses (boat-local) ----------
        const SEATY = 26;
        // bucket path through one bail cycle (side f, seat x sx)
        function bailHand(sx, f, p) {
          const K = [[0, [sx + f * 50, -30]], [0.3, [sx + f * 40, 40]], [0.42, [sx + f * 60, 30]], [0.62, [sx + f * 190, -70]], [0.78, [sx + f * 205, -60]], [1, [sx + f * 50, -30]]];
          for (let i = 0; i < K.length - 1; i++) if (p <= K[i + 1][0]) { const q = ease((p - K[i][0]) / (K[i + 1][0] - K[i][0])); return [lerp(K[i][1][0], K[i + 1][1][0], q), lerp(K[i][1][1], K[i + 1][1][1], q)]; }
          return K[0][1];
        }
        const tipAng = (p, f) => f * 110 * win(p, 0.62, 0.72) * (1 - win(p, 0.8, 0.95));
        function bailer(sx, f, p, k) {
          const lean = 26 * (win(p, 0, 0.3) * (1 - win(p, 0.42, 0.62))) - 6 * win(p, 0.55, 0.7) * (1 - win(p, 0.8, 1));
          const st = base({ hx: sx, hy: SEATY, torso: 6 + lean * k, head: 8, ax: sx + f * 70, ay: 96, bx: sx + f * 50, by: 100 });
          const h = bailHand(sx, f, p);
          reachTo(st, k, [h[0] - f * 8, h[1] - 14]); reachTo(st, k, [h[0] + f * 10, h[1] - 10], "b");
          return st;
        }
        const seatTop = (t, who) => { const q = sm(t, T_REST, T_LEAN + 0.2); return who === "her" ? lerp(-110, -62, q) : lerp(110, 62, q); };
        const facing = (t, who) => (t < T_REST + 0.25 ? (who === "her" ? -1 : 1) : who === "her" ? 1 : -1);
        function topBailer(t, who) {
          const f0 = who === "her" ? -1 : 1, sx = seatTop(t, who), k = 1 - win(t, T_REST - 0.1, T_REST + 0.25);
          const st = bailer(sx, f0, frac(phAt(PH[who], t)), k);
          if (t >= T_REST + 0.25) {
            // turned toward each other: lean in, arm around the other
            const f = -f0, q = win(t, T_REST + 0.25, T_LEAN + 0.3);
            Object.assign(st, base({ hx: sx, hy: SEATY, torso: 10 * q, head: -6 * q, ax: sx + f * 70, ay: 96, bx: sx + f * 50, by: 100 }));
            reachTo(st, q, [sx + f * 95, -100]);
            if (who === "her") st.head = lerp(st.head, 18, q);
            // CTA: flare guns up
            const fire = who === "him" ? hold(t, T_F1 - 0.6, T_F1 + 0.5, 0.3) : hold(t, T_F2 - 0.6, T_F2 + 0.5, 0.3);
            reachTo(st, fire, [sx + f * 30, -270], "b");
            const cheer = hold(t, T_B2 + 0.2, DUR, 0.3);
            reachTo(st, cheer, [sx - f * 20, -260 + 10 * Math.sin(t * 12)], "b");
          }
          return st;
        }
        function botHim(t) {
          const p = frac(phAt(PH.bot, t)), k = 1 - win(t, T_STOP - 0.15, T_STOP + 0.35);
          const st = bailer(110, 1, p, k);
          st.hx += 5 * Math.sin(t * 9) * hold(t, T_TIRED, T_STOP, 0.4);
          const sl = win(t, T_STOP, T_STOP + 0.8);
          st.torso = lerp(st.torso, 34, sl); st.head = lerp(st.head, 34, sl);
          reachTo(st, sl, [175, 20]); reachTo(st, sl, [160, 26], "b");
          return st;
        }
        function botHer(t) {
          const lk = win(t, T_LOOK, T_LOOK + 0.5);
          const st = base({ hx: -110, hy: SEATY, torso: lerp(10, 2, lk), head: lerp(28 + 2 * Math.sin(t * 1.3), -10, lk), ax: -40, ay: 96, bx: -60, by: 100 });
          reachTo(st, 1, [lerp(-64, -70, lk), lerp(-96, -40, lk)]); reachTo(st, 1, [lerp(-70, -78, lk), lerp(-90, -34, lk)], "b");
          return st;
        }

        // ---------- labels ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH BAIL"; botT.textContent = "ONE BAILS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", null]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "TOGETHER"], [3.0, "BUCKET BY BUCKET"], [6.4, "THE STORM PASSES"], [T_REST, "SAFE", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE SCROLLS"], [2.0, "HE BAILS FOR TWO"], [T_TIRED + 0.3, "TOO MUCH WATER", "#ff3b30"], [T_STOP, "HE CAN'T ANYMORE", "#ff3b30"], [T_LOOK + 0.2, "NOW SHE LOOKS UP"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- FOLLOW: flares ----------
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const trail = [0, 1].map(() => svgEl("path", { fill: "none", stroke: "#ffb27a", "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, ctaSvg));
        const flareDot = [0, 1].map(() => svgEl("circle", { r: 14, fill: "#fff3d6", stroke: "#ff6a30", "stroke-width": 5, opacity: 0 }, ctaSvg));
        const burst = [0, 1].map(() => Array.from({ length: 18 }, () => svgEl("circle", { r: 7, fill: "#ffcf7a", opacity: 0 }, ctaSvg)));
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, ctaSvg));
        const pill = document.createElement("div");
        pill.style.cssText = "position:absolute;left:540px;top:600px;height:104px;padding:0 46px;border-radius:52px;border:6px solid #000;display:flex;align-items:center;justify-content:center;font-family:HFMono,monospace;font-weight:700;font-size:44px;letter-spacing:0.08em;white-space:nowrap;opacity:0;transform:translate(-50%,-50%)";
        E("stage").appendChild(pill);
        const tom = label(0, 690, 26, "#ffcf7a"); tom.style.width = "1080px"; tom.style.textAlign = "center";
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);
        const PILL = [540, 600];

        // camera push-in on the top boat
        const CF = [BCX, SEA - 120], CS = [540, 1090], ZK = 1.3;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = [PX + CF[0] * PK, top.y0 + (CF[1] - PY0) * PK]; return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };

        const waveY = (x, t, A) => SEA + A * (14 * Math.sin(x * 0.012 + t * 1.6) + 7 * Math.sin(x * 0.027 - t * 2.3));
        function drawSea(P2, t, A) {
          let f = `M0 ${PY1}`, b = `M0 ${PY1}`, fm = "";
          for (let x = 0; x <= PW; x += 20) { const y = waveY(x, t, A); f += ` L${x} ${r1(y)}`; b += ` L${x} ${r1(y - 26 - 6 * A * Math.sin(x * 0.02 + t))}`; fm += (x ? " L" : "M") + `${x} ${r1(y)}`; }
          P2.seaF.setAttribute("d", f + ` L${PW} ${PY1} Z`); P2.seaB.setAttribute("d", b + ` L${PW} ${PY1} Z`); P2.foam.setAttribute("d", fm);
        }
        function drawRain(P2, t, k) { P2.rain.forEach((l, i) => { const q = frac(t * 1.7 + i * 0.381), x = (i * 211 + 900 * q * 0.25) % PW, y = PY0 + q * (SEA - PY0 + 60); l.setAttribute("x1", r1(x)); l.setAttribute("y1", r1(y)); l.setAttribute("x2", r1(x - 10)); l.setAttribute("y2", r1(y + 38)); l.setAttribute("opacity", (0.4 * k).toFixed(3)); }); }
        const levelTop = (t) => 66 + 4 * Math.sin(t * 2.1);
        const levelBot = (t) => lerp(66, 10, sm(t, 1.2, 10.0));
        function placeBoat(P2, B, t, A, sink, lvl) {
          const y = SEA - 62 + sink + 6 * A * Math.sin(t * 1.8), a = 3.2 * A * Math.sin(t * 1.3 + 0.4);
          B.g.setAttribute("transform", `translate(${BCX} ${r1(y)}) rotate(${r1(a)})`);
          const rx = RX - 60 * (lvl / 110), ry = RY * (rx / RX);
          B.water.setAttribute("cy", r1(lvl * 0.35)); B.water.setAttribute("rx", r1(rx)); B.water.setAttribute("ry", r1(ry));
          const sh = (P2.top ? 14 : 24) * (0.7 + 0.3 * Math.sin(t * 23)), sx = 30, sy = lvl * 0.35;
          B.spout.setAttribute("d", `M${sx - 6} ${r1(sy)} Q${sx - 2} ${r1(sy - sh)} ${sx + 2} ${r1(sy - sh - 6)} Q${sx + 4} ${r1(sy - sh)} ${sx + 6} ${r1(sy)} Z`);
          return { y, a };
        }
        const toW = (bx, by, a, p) => { const r = (a * Math.PI) / 180; return [bx + p[0] * Math.cos(r) - p[1] * Math.sin(r), by + p[0] * Math.sin(r) + p[1] * Math.cos(r)]; };
        function drawBucket(g, hands, p, f, on) {
          const h = [(hands[0][0] + hands[1][0]) / 2, (hands[0][1] + hands[1][1]) / 2 + 16];
          g.setAttribute("transform", `translate(${r1(h[0])} ${r1(h[1])}) rotate(${r1(tipAng(p, f))})`);
          g.setAttribute("opacity", on ? 1 : 0);
          return h;
        }
        function drawDrops(drops, arr, t, sx, f) {
          const ts = lastSplash(arr, t), tau = t - ts;
          drops.forEach((d, i) => { const vis = tau >= 0 && tau < 0.55; const x = sx + f * (215 + (40 + 22 * i) * tau * 2.2), y = -70 + (-120 - 18 * i) * tau + 900 * tau * tau; d.setAttribute("cx", r1(x)); d.setAttribute("cy", r1(y)); d.setAttribute("r", 4 + (i % 3) * 2); d.setAttribute("opacity", vis ? (1 - tau / 0.55).toFixed(3) : 0); });
        }

        function render(t) {
          // ---- top
          const At = storm(t, true);
          drawSea(top, t, At); drawRain(top, t, 1 - sm(t, 6.0, 8.6));
          const bt = placeBoat(top, TB, t, At, 0, levelTop(t));
          top.dawn.setAttribute("opacity", (0.9 * sm(t, 6.0, 9.5)).toFixed(3));
          top.sun.setAttribute("cy", r1(SEA + 60 - 110 * sm(t, 7.0, 12))); top.sun.setAttribute("opacity", (0.85 * sm(t, 6.5, 9.0)).toFixed(3));
          const hp = drawFig(TF.her, livePose((s) => topBailer(s, "her"), t, 0.4), facing(t, "her"));
          const mp = drawFig(TF.him, livePose((s) => topBailer(s, "him"), t, 1.3), facing(t, "him"));
          TF.bun.setAttribute("cx", r1(hp.head[0] + 25 * (facing(t, "her") === -1 ? 1 : -1))); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const bOn = t < T_REST + 0.25;
          drawBucket(bkHerT, hp.hands, frac(phAt(PH.her, t)), -1, bOn);
          drawBucket(bkHimT, mp.hands, frac(phAt(PH.him, t)), 1, bOn);
          drawDrops(dHerT, PH.her, t, seatTop(t, "her"), -1); drawDrops(dHimT, PH.him, t, seatTop(t, "him"), 1);
          // flare guns in the raised hand (hand b)
          const g1 = hold(t, T_F1 - 0.6, T_F1 + 0.5, 0.3), g2 = hold(t, T_F2 - 0.6, T_F2 + 0.5, 0.3);
          gun.setAttribute("opacity", g1 > 0.05 ? 1 : 0); gun.setAttribute("transform", `translate(${r1(mp.hands[1][0])} ${r1(mp.hands[1][1])}) rotate(-80)`);
          gun2.setAttribute("opacity", g2 > 0.05 ? 1 : 0); gun2.setAttribute("transform", `translate(${r1(hp.hands[1][0])} ${r1(hp.hands[1][1])}) rotate(-100) scale(1 -1)`);
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_F1 - 0.4, T_F1));
          const hc = toW(BCX, bt.y, bt.a, [0, -300]);
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", r1(hc[0])); top.glow.setAttribute("cy", r1(hc[1])); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `${BCX - 60},${PY0} ${BCX + 60},${PY0} ${BCX + 260},${SEA} ${BCX - 260},${SEA}`);
          redSpot.setAttribute("opacity", (0.45 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const Ab = storm(t, false);
          drawSea(bot, t + 0.7, Ab); drawRain(bot, t + 0.3, 1);
          const sink = lerp(0, 52, sm(t, 1.5, 10.5));
          const bb = placeBoat(bot, BB, t, Ab * 0.8, sink, levelBot(t));
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          drawBucket(bkHimB, bp.hands, frac(phAt(PH.bot, t)), 1, true);
          drawDrops(dHimB, PH.bot, t, 110, 1);
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", ((0.75 + 0.15 * Math.sin(t * 5)) * (1 - 0.6 * win(t, T_LOOK, T_LOOK + 0.5))).toFixed(3));
          const hw = toW(BCX, bb.y, bb.a, bp.head);
          sweat.forEach((e, i) => { const q = frac(t * 1.4 + i / 6); e.setAttribute("transform", `translate(${r1(hw[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(hw[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_TIRED, T_STOP + 1.5, 0.4) * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_STOP, T_STOP + 1.2)).toFixed(3));

          const [ts, tc] = typed(TOPSEQ, t); topS.textContent = ts; topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t); botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "SHE THOUGHT THEY WERE FINE.", L3 = "HE WAS BAILING FOR TWO.";
          E("head").innerHTML = `<div>LOVE IS A LIFEBOAT. #15</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
          E("head").style.opacity = (1 - 0.8 * win(t, T_B1 - 0.4, T_B1)).toFixed(3);

          // ---- FOLLOW: two flares
          [[T_F1, T_B1, mp.hands[1]], [T_F2, T_B2, hp.hands[1]]].forEach(([tf, tb, hand], i) => {
            const s0 = [c.ox + hand[0] * c.z + BCX * 0, 0];
            const w0 = toW(BCX, bt.y, bt.a, hand), from = [c.ox + w0[0] * c.z, c.oy + (w0[1] - PY0) * c.z];
            const q = clamp((t - tf) / (tb - tf), 0, 1), qe = 1 - (1 - q) * (1 - q);
            const to = i === 0 ? PILL : [PILL[0] + 40, PILL[1] + 10];
            const cur = [lerp(from[0], to[0], qe), lerp(from[1], to[1], qe)];
            const on = t >= tf && t < tb;
            flareDot[i].setAttribute("cx", r1(cur[0])); flareDot[i].setAttribute("cy", r1(cur[1])); flareDot[i].setAttribute("opacity", on ? 1 : 0);
            trail[i].setAttribute("d", `M${r1(from[0])} ${r1(from[1])} L${r1(cur[0])} ${r1(cur[1])}`); trail[i].setAttribute("opacity", on ? 0.7 : t >= tb && t < tb + 0.4 ? (0.7 * (1 - (t - tb) / 0.4)).toFixed(3) : 0);
            const bq = clamp((t - tb) / 0.9, 0, 1);
            burst[i].forEach((d, j) => { const a = (j / 18) * Math.PI * 2; d.setAttribute("cx", r1(to[0] + Math.cos(a) * 300 * Math.sqrt(bq))); d.setAttribute("cy", r1(to[1] + Math.sin(a) * 220 * Math.sqrt(bq) + 80 * bq * bq)); d.setAttribute("fill", i ? "#ff6a60" : "#ffcf7a"); d.setAttribute("opacity", t >= tb && bq < 1 ? (1 - bq).toFixed(3) : 0); });
          });
          const pq = sm(t, T_B1, T_B1 + 0.35), tapped = t >= T_B2;
          pill.style.opacity = t >= T_B1 ? pq.toFixed(3) : 0;
          pill.style.background = tapped ? "#ffffff" : "#ff3b30"; pill.style.color = tapped ? "#000" : "#fff";
          pill.style.boxShadow = tapped ? "0 0 40px rgba(255,255,255,0.6)" : "0 0 50px rgba(255,90,60,0.8)";
          pill.style.transform = `translate(-50%,-50%) scale(${(t < T_B1 + 0.35 ? backOut(pq) : tapped ? 1 + 0.12 * Math.sin(Math.PI * clamp((t - T_B2) / 0.25, 0, 1)) : 1 + 0.04 * Math.max(0, Math.sin(t * 6))).toFixed(3)})`;
          pill.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_B2) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(PILL[0] + Math.cos(a) * 280 * Math.sqrt(q3))} ${r1(PILL[1] + Math.sin(a) * 190 * Math.sqrt(q3) + 60 * q3)}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
          const TT = "LOVE IS A ... #16 TOMORROW";
          tom.textContent = TT.slice(0, Math.max(0, Math.floor((t - T_B2 - 0.4) * 28)));
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
