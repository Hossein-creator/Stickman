        // ---------- "love is a tandem. #14": winner split-screen format. A road that turns into a steep hill. BOTH PEDAL: they climb the hill together and reach the top (heart). ONE PEDALS: she sits behind him on her phone, feet off the pedals; on the flat he manages, uphill he stands on the pedals, stalls and rolls back down. She doesn't notice. FOLLOW: he rings the bike bell, a notification banner from @silent.stickman drops in, second ring = FOLLOWING. ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const H0 = 470, H1 = 950, RISE = 200, G = 745;
        // road height: flat, eased slope, flat crest
        const road = (x) => { if (x <= H0 - 60) return G; if (x >= H1 + 60) return G - RISE; const q = clamp((x - H0) / (H1 - H0), 0, 1); const e = x < H0 ? 0 : x > H1 ? 1 : q; const soft = (x - (H0 - 60)) / (H1 + 60 - (H0 - 60)); return G - RISE * (soft < 0.111 ? 0.5 * Math.pow(soft / 0.111, 2) * 0.111 / 0.889 : soft > 0.889 ? 1 - 0.5 * Math.pow((1 - soft) / 0.111, 2) * 0.111 / 0.889 : (soft - 0.0555) / 0.889); };
        const slopeAt = (x) => (Math.atan2(road(x + 70) - road(x - 70), 140) * 180) / Math.PI;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1000]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.24 }, beams);
          for (let i = 0; i < 22; i++) svgEl("circle", { cx: (i * 397) % PW, cy: PY0 + 20 + ((i * 131) % 220), r: 2 + (i % 3), fill: "#fff", opacity: 0.22 }, inner);
          let d = `M0 ${PY1} L0 ${G}`; for (let x = 0; x <= PW; x += 10) d += ` L${x} ${r1(road(x))}`; d += ` L${PW} ${PY1} Z`;
          svgEl("path", { d, fill: "url(#ground)" }, inner);
          let e = ""; for (let x = 0; x <= PW; x += 10) e += (x ? " L" : "M") + `${x} ${r1(road(x) - 1)}`;
          svgEl("path", { d: e, fill: "none", stroke: "#8a8172", "stroke-width": 4 }, inner);
          // flag on the top
          const flag = svgEl("g", { transform: `translate(${H1 + 170} ${G - RISE})` }, inner);
          svgEl("line", { x1: 0, y1: 0, x2: 0, y2: -150, stroke: "#c9c2b2", "stroke-width": 6 }, flag);
          const flagC = svgEl("path", { d: "M0 -150 L60 -132 L0 -114 Z", fill: "#bdbdbd", stroke: "#000", "stroke-width": 3 }, flag);
          const glow = svgEl("circle", { r: 230, fill: "url(#redGlow)", opacity: 0 }, inner);
          const bike = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, y0, beams, glow, bike, fx, dark, flagC };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");
        const toScreen = (P2, x, y) => [PX + x * PK, P2.y0 + (y - PY0) * PK];
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));

        // ---------- the bike (local coords: road contact at y 0, front to the right) ----------
        const WR = 46, RW = [-150, -WR], FW = [170, -WR], CR = [-62, -62], CFk = [58, -62], CK = 26;
        const SEAT_R = [-84, -178], SEAT_F = [36, -178], BAR_F = [138, -210], BAR_R = [-4, -196], BELL = [150, -222];
        function makeBike(P2, white) {
          const g = svgEl("g", {}, P2.bike);
          const back = svgEl("g", {}, g);              // far side cranks
          const wheels = [RW, FW].map((c) => { const w = svgEl("g", { transform: `translate(${c[0]} ${c[1]})` }, g); svgEl("circle", { r: WR, fill: "none", stroke: "#000", "stroke-width": 12 }, w); svgEl("circle", { r: WR, fill: "none", stroke: "#3a3a42", "stroke-width": 6 }, w); const sp = svgEl("path", { d: "M-40 0 L40 0 M0 -40 L0 40 M-28 -28 L28 28 M-28 28 L28 -28", stroke: "#8a8a92", "stroke-width": 3 }, w); svgEl("circle", { r: 6, fill: "#8a8a92", stroke: "#000", "stroke-width": 2 }, w); return sp; });
          const col = white ? "#ff5a4a" : "#a04040";
          const fr = `M${RW[0]} ${RW[1]} L${CR[0]} ${CR[1]} L${CFk[0]} ${CFk[1]} L${FW[0]} ${FW[1]} M${CR[0]} ${CR[1]} L${SEAT_R[0] + 6} ${SEAT_R[1] + 10} M${CFk[0]} ${CFk[1]} L${SEAT_F[0] + 6} ${SEAT_F[1] + 10} M${SEAT_R[0] + 6} ${SEAT_R[1] + 24} L${BAR_F[0] - 6} ${BAR_F[1] + 30} M${RW[0]} ${RW[1]} L${SEAT_R[0] + 6} ${SEAT_R[1] + 24} M${FW[0]} ${FW[1]} L${BAR_F[0] - 4} ${BAR_F[1] + 6} M${SEAT_R[0] + 20} ${SEAT_R[1] + 18} L${BAR_R[0]} ${BAR_R[1]}`;
          svgEl("path", { d: fr, fill: "none", stroke: "#000", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
          svgEl("path", { d: fr, fill: "none", stroke: col, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
          for (const s of [SEAT_R, SEAT_F]) svgEl("path", { d: `M${s[0] - 16} ${s[1] + 4} L${s[0] + 22} ${s[1] + 4} L${s[0] + 14} ${s[1] + 14} L${s[0] - 10} ${s[1] + 14} Z`, fill: "#2a2a30", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("path", { d: `M${BAR_F[0] - 4} ${BAR_F[1] + 6} L${BAR_F[0] + 10} ${BAR_F[1]} M${BAR_R[0] - 6} ${BAR_R[1]} L${BAR_R[0] + 10} ${BAR_R[1]}`, stroke: "#000", "stroke-width": 8, "stroke-linecap": "round" }, g);
          const bell = svgEl("g", { transform: `translate(${BELL[0]} ${BELL[1]})` }, g);
          svgEl("path", { d: "M-12 6 Q-12 -14 0 -14 Q12 -14 12 6 Z", fill: "#ffd25a", stroke: "#000", "stroke-width": 3 }, bell);
          const figs = svgEl("g", {}, g);
          const front = svgEl("g", {}, g);             // near side cranks
          const crank = (parent) => [CR, CFk].map(() => svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 7, "stroke-linecap": "round" }, parent));
          return { g, back, front, wheels, figs, bell, cb: crank(back), cf: crank(front) };
        }
        const TB = makeBike(top, true), BB = makeBike(bot, false);
        const pedals = (th) => [CR, CFk].map((c) => [[c[0] + CK * Math.cos(th), c[1] + CK * Math.sin(th)], [c[0] - CK * Math.cos(th), c[1] - CK * Math.sin(th)]]);

        // ---------- beats ----------
        const T_GO = 0.3, T_HILL = 2.6, T_TOP = 8.6, T_HEART = 8.9;
        const T_STAND = 4.6, T_STALL = 6.0, T_BACK = 6.8, T_DOWN = 8.6;
        const T_H2 = 9.6, T_H3 = 10.5;
        const T_CTA = 12.9, T_RING1 = T_CTA + 1.2, T_BAN = T_RING1 + 0.15, T_TAP = T_RING1 + 1.6;
        const topX = (t) => lerp(170, 1010, sm(t, T_GO, T_TOP));
        function botX(t) {
          const fwd = lerp(170, 640, sm(t, T_GO, T_STALL + 0.2));
          const wob = 8 * Math.sin((t - T_STALL) * 6) * hold(t, T_STALL, T_BACK + 0.2, 0.2);
          const back = lerp(0, -340, sm(t, T_BACK, T_DOWN));
          return fwd + wob + back;
        }
        const crankTop = (t) => (topX(t) - 170) / 30 + 0.6;
        const crankBot = (t) => (lerp(170, 640, sm(t, T_GO, T_STALL + 0.2)) - 170) / 30 + 0.6 + 0.6 * Math.sin((t - T_STALL) * 6) * hold(t, T_STALL, T_BACK, 0.2);

        // riders in local bike coords
        function rider(seat, bar, th, ci, standUp, f = 1) {
          const pd = pedals(th)[ci];
          const st = base({ hx: seat[0] + 4, hy: seat[1] - 6 - 34 * standUp, torso: 24 + 14 * standUp, head: -14, ax: pd[0][0], ay: pd[0][1], bx: pd[1][0], by: pd[1][1] });
          reachTo(st, 1, bar); reachTo(st, 1, [bar[0] - 6, bar[1] + 6], "b");
          return st;
        }
        function topHim(t) {
          const st = rider(SEAT_F, BAR_F, crankTop(t), 1, 0.25 * hold(t, T_HILL, T_TOP, 0.5));
          st.head += 4 * Math.sin(t * 7) * hold(t, T_HILL, T_TOP, 0.4);
          const up = hold(t, T_HEART, T_CTA + 0.5, 0.3); reachTo(st, up, [SEAT_F[0] + 20, SEAT_F[1] - 240], "b");
          // CTA: thumb rings the bell twice
          const rg = hold(t, T_RING1 - 0.35, T_TAP + 0.35, 0.25), pr = (Math.abs(t - T_RING1) < 0.12 || Math.abs(t - T_TAP) < 0.12) ? 8 : 0;
          reachTo(st, rg, [BELL[0] - 4, BELL[1] - 8 + pr]);
          const cheer = hold(t, T_TAP + 0.3, DUR, 0.25); reachTo(st, cheer, [SEAT_F[0] + 10, SEAT_F[1] - 250 + 12 * Math.sin(t * 13)], "b");
          return st;
        }
        function topHer(t) {
          const st = rider(SEAT_R, BAR_R, crankTop(t), 0, 0.25 * hold(t, T_HILL, T_TOP, 0.5));
          const up = hold(t, T_HEART, DUR, 0.3); reachTo(st, up, [SEAT_R[0] + 10, SEAT_R[1] - 250 + 12 * Math.sin(t * 12) * win(t, T_CTA, T_CTA + 0.3)]);
          st.head = lerp(st.head, -24, up);
          return st;
        }
        function botHim(t) {
          const su = hold(t, T_STAND, T_BACK + 0.2, 0.4);
          const st = rider(SEAT_F, BAR_F, crankBot(t), 1, su);
          st.hx += 10 * Math.sin(t * 9) * su; st.head += 6 * Math.sin(t * 9) * su;
          // rolling back: feet off, then one foot down, head down
          const dn = win(t, T_DOWN - 0.2, T_DOWN + 0.3);
          st.ax = lerp(st.ax, SEAT_F[0] + 40, dn); st.ay = lerp(st.ay, -4, dn);
          st.head = lerp(st.head, 30, win(t, T_DOWN + 0.2, T_DOWN + 0.8)); st.torso += 14 * win(t, T_DOWN + 0.2, T_DOWN + 0.8);
          return st;
        }
        function botHer(t) {
          const st = base({ hx: SEAT_R[0] + 4, hy: SEAT_R[1] - 6, torso: 10, head: 28 + 2 * Math.sin(t * 1.3), ax: CR[0] + 46, ay: CR[1] + 14, bx: CR[0] + 30, by: CR[1] + 20 });
          reachTo(st, 1, [SEAT_R[0] + 46, SEAT_R[1] - 96]); reachTo(st, 1, [SEAT_R[0] + 40, SEAT_R[1] - 90], "b");
          return st;
        }
        const mkFigs = (B, white) => {
          const her = makeFig(B.figs, white ? "#ffffff" : "#8e8e8e", white ? "#e2e2e2" : "#767676", white, "her" + (white ? "T" : "B"));
          const bun = svgEl("circle", { r: 15, fill: white ? "#fff" : "#8e8e8e", stroke: "#000", "stroke-width": 6 }, B.figs);
          B.figs.insertBefore(bun, her.g.previousSibling || her.g);
          const him = makeFig(B.figs, white ? "#ffffff" : "#9a9a9a", white ? "#dedede" : "#7e7e7e", white, "him" + (white ? "T" : "B"));
          return { bun, her, him };
        };
        const TF = mkFigs(TB, true), BF = mkFigs(BB, false);
        const phone = svgEl("rect", { x: -10, y: -16, width: 20, height: 32, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, BB.figs);
        const phoneGlow = svgEl("circle", { r: 70, fill: "url(#phoneGlow)", opacity: 0.8 }, BB.figs);
        const sweat = Array.from({ length: 6 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#a9c4e8", stroke: "#000", "stroke-width": 2, opacity: 0 }, bot.fx));
        const heart = svgEl("path", { d: "M0 40 C-90 -18 -66 -88 0 -48 C66 -88 90 -18 0 40 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 5, opacity: 0 }, top.fx);
        const redSpot = svgEl("polygon", { fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const bellWaves = [0, 1, 2].map(() => svgEl("path", { fill: "none", stroke: "#ffd25a", "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, top.fx));

        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH PEDAL"; botT.textContent = "ONE PEDALS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "TOGETHER"], [T_HILL, "UPHILL"], [5.2, "KEEP GOING"], [T_TOP, "THE TOP", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE SCROLLS"], [T_HILL, "UPHILL"], [T_STAND, "HE PEDALS FOR TWO"], [T_STALL, "TOO STEEP", "#ff3b30"], [T_BACK, "ROLLING BACK", "#ff3b30"], [T_DOWN + 0.2, "SHE DIDN'T NOTICE"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---- FOLLOW: notification banner ----
        const ban = document.createElement("div");
        ban.style.cssText = "position:absolute;left:150px;width:780px;height:132px;border-radius:30px;background:rgba(245,246,250,0.97);border:5px solid #000;box-shadow:0 10px 40px rgba(0,0,0,0.6);display:flex;align-items:center;font-family:HFMono,monospace;font-weight:700;color:#111;opacity:0";
        ban.innerHTML = `<div style="margin-left:24px;width:76px;height:76px;border-radius:50%;background:#111;border:4px solid #ff3b30;display:flex;align-items:center;justify-content:center;font-size:36px">🔔</div>
          <div style="margin-left:20px;flex:1"><div style="font-size:18px;color:#666;letter-spacing:0.1em">@silent.stickman · now</div><div id="banT" style="font-size:24px;margin-top:6px;letter-spacing:0.04em">LOVE IS A ... #15 TOMORROW</div></div>
          <div id="banB" style="margin-right:22px;height:68px;border-radius:34px;border:4px solid #000;display:flex;align-items:center;justify-content:center;padding:0 22px;font-size:24px;letter-spacing:0.06em"></div>`;
        E("stage").appendChild(ban);
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0 }, ctaSvg));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // camera push-in on the top bike at the hilltop
        const CF = [880, 400], CS = [540, 1010], ZK = 1.3;
        const zoomK = (t) => sm(t, T_CTA - 0.1, T_CTA + 1.0);
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = toScreen(top, CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };

        function placeBike(B, x, th, t) {
          const a = slopeAt(x), y = road(x);
          B.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(a)})`);
          const rot = ((x - 170) / WR) * (180 / Math.PI);
          B.wheels.forEach((w) => w.setAttribute("transform", `rotate(${r1(rot)})`));
          const P = pedals(th);
          [B.cb, B.cf].forEach((arr, side) => arr.forEach((p, i) => { const c = [CR, CFk][i], e = P[i][side]; p.setAttribute("d", `M${c[0]} ${c[1]} L${r1(e[0])} ${r1(e[1])}`); }));
          return { a, y };
        }
        const toW = (x, a, y, p) => { const r = (a * Math.PI) / 180; return [x + p[0] * Math.cos(r) - p[1] * Math.sin(r), y + p[0] * Math.sin(r) + p[1] * Math.cos(r)]; };

        function render(t) {
          // ---- top
          const tx = topX(t), ta = placeBike(TB, tx, crankTop(t), t);
          const hp = drawFig(TF.her, livePose(topHer, t, 0.4), 1);
          const mp = drawFig(TF.him, livePose(topHim, t, 1.3), 1);
          TF.bun.setAttribute("cx", r1(hp.head[0] - 25)); TF.bun.setAttribute("cy", r1(hp.head[1] - 16));
          const hk = win(t, T_HEART, T_HEART + 0.45) * (1 - win(t, T_BAN - 0.3, T_BAN));
          const hc = toW(tx, ta.a, ta.y, [-290, -300]);
          const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7));
          heart.setAttribute("opacity", hk > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hk) * 0.8 * beat).toFixed(3)})`);
          top.glow.setAttribute("cx", r1(hc[0])); top.glow.setAttribute("cy", r1(hc[1])); top.glow.setAttribute("opacity", (0.7 * hk).toFixed(3));
          redSpot.setAttribute("points", `${r1(tx - 60)},${PY0} ${r1(tx + 60)},${PY0} ${r1(tx + 220)},${G - RISE} ${r1(tx - 220)},${G - RISE}`);
          redSpot.setAttribute("opacity", (0.45 * win(t, T_HEART, T_HEART + 0.5)).toFixed(3));
          top.flagC.setAttribute("fill", t > T_TOP ? "#ff3b30" : "#bdbdbd");
          const bw = toW(tx, ta.a, ta.y, BELL);
          bellWaves.forEach((w, i) => { const rq = Math.max(clamp((t - T_RING1) / 0.6, 0, 1) * (t < T_RING1 + 0.6 ? 1 : 0), clamp((t - T_TAP) / 0.6, 0, 1) * (t > T_TAP && t < T_TAP + 0.6 ? 1 : 0)); const rr = 18 + 22 * i + 30 * rq; w.setAttribute("d", `M${r1(bw[0] + rr * 0.6)} ${r1(bw[1] - rr * 0.8)} A${r1(rr)} ${r1(rr)} 0 0 1 ${r1(bw[0] + rr * 0.6)} ${r1(bw[1] + rr * 0.8)}`); w.setAttribute("opacity", rq > 0 && rq < 1 ? (1 - rq).toFixed(3) : 0); });
          TB.bell.setAttribute("transform", `translate(${BELL[0]} ${BELL[1]}) rotate(${r1(((Math.abs(t - T_RING1) < 0.4 ? 1 : 0) + (Math.abs(t - T_TAP) < 0.4 ? 1 : 0)) * 14 * Math.sin(t * 60))})`);
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // ---- bottom
          const bx = botX(t), ba = placeBike(BB, bx, crankBot(t), t);
          const sp = drawFig(BF.her, livePose(botHer, t, 0.9), 1);
          const bp = drawFig(BF.him, livePose(botHim, t, 2.0), 1);
          BF.bun.setAttribute("cx", r1(sp.head[0] - 25)); BF.bun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2 - 8];
          phone.setAttribute("transform", `translate(${r1(ph[0])} ${r1(ph[1])})`);
          phoneGlow.setAttribute("cx", r1(ph[0])); phoneGlow.setAttribute("cy", r1(ph[1])); phoneGlow.setAttribute("opacity", (0.75 + 0.15 * Math.sin(t * 5)).toFixed(3));
          const hw = toW(bx, ba.a, ba.y, bp.head);
          sweat.forEach((e, i) => { const q = ((t * 1.4 + i / 6) % 1); e.setAttribute("transform", `translate(${r1(hw[0] + (i % 2 ? 1 : -1) * (30 + 30 * q))} ${r1(hw[1] - 20 + 60 * q * q)})`); e.setAttribute("opacity", (hold(t, T_STAND, T_DOWN + 1.0, 0.4) * (1 - q)).toFixed(3)); });
          bot.dark.setAttribute("opacity", (0.3 * win(t, T_DOWN, T_DOWN + 1.0)).toFixed(3));

          topS.textContent = typed(TOPSEQ, t)[0]; topS.style.color = typed(TOPSEQ, t)[1] || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "ONE CAN PEDAL FOR TWO...", L3 = "UNTIL THE ROAD GOES UP.";
          E("head").innerHTML = `<div>LOVE IS A TANDEM. #14</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;

          // ---- FOLLOW banner
          const bq = sm(t, T_BAN, T_BAN + 0.45), tapped = t >= T_TAP;
          ban.style.opacity = t > T_BAN ? 1 : 0;
          ban.style.top = r1(lerp(-160, 420, backOut(bq))) + "px";
          const bb = E("banB");
          bb.style.background = tapped ? "#ffffff" : "#ff3b30"; bb.style.color = tapped ? "#000" : "#fff";
          bb.style.transform = `scale(${(tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.2, 0, 1)) : 1 + 0.05 * Math.max(0, Math.sin(t * 6))).toFixed(3)})`;
          bb.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          const BP = [790, 486];
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(BP[0] + Math.cos(a) * 260 * Math.sqrt(q3))} ${r1(BP[1] + Math.sin(a) * 180 * Math.sqrt(q3) + 60 * q3)}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
          E("head").style.opacity = (1 - 0.75 * win(t, T_BAN, T_BAN + 0.3)).toFixed(3);
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
