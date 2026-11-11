        // ---------- "love is a boat. part 2": sequel of reel 40 (winner format, stats 2026-11-10: sequels of hits). BOTH ROW: they reach the island and hug. ONE ROWS: he rows alone in circles, one day he stops, steps onto the rock and leaves; she looks up, takes the oar and rows in circles. FOLLOW: a message in a bottle washes up at the island, the note unrolls, he presses the wax seal. ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);

        // ---------- panel geometry: world 0..1233 x 98..815, water line at 600 ----------
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const WL = FL, IY = 568, ISL = 945, X0 = 330;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1080]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${WL} ${bx - 150},${WL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.32 }, beams);
          svgEl("rect", { x: 0, y: WL, width: PW, height: PY1 - WL, fill: "url(#water)" }, inner);
          for (const bx of [300, 1080]) svgEl("ellipse", { cx: bx, cy: WL + 26, rx: 190, ry: 30, fill: "url(#shine)" }, inner);
          // left rock (where they start) and the island (where they want to go)
          svgEl("path", { d: `M0 ${WL - 16} L118 ${WL - 16} L128 ${WL + 24} L120 ${WL + 90} L136 ${PY1} L0 ${PY1} Z`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 4 }, inner);
          svgEl("path", { d: `M${ISL - 14} ${WL + 30} Q${ISL - 2} ${IY + 2} ${ISL + 40} ${IY} L${PW + 10} ${IY} L${PW + 10} ${PY1} L${ISL - 20} ${PY1} Z`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 4 }, inner);
          const wake = svgEl("g", {}, inner);
          const wave = svgEl("path", { fill: "none", stroke: "#3c556e", "stroke-width": 3, opacity: 0.8 }, inner);
          const boat = svgEl("g", {}, inner);
          const figs = svgEl("g", {}, boat);
          const hull = svgEl("g", {}, boat);
          svgEl("path", { d: "M-178 -36 L176 -36 L196 -50 Q170 8 116 26 L-122 26 Q-168 12 -178 -36 Z", fill: "url(#hull)", stroke: "#000", "stroke-width": 5 }, hull);
          svgEl("path", { d: "M-170 -24 L180 -24", stroke: "#a98258", "stroke-width": 4 }, hull);
          svgEl("path", { d: "M-150 -8 L150 -8", stroke: "#4a321e", "stroke-width": 3, opacity: 0.6 }, hull);
          const oars = svgEl("g", {}, boat);
          const drops = svgEl("g", {}, boat);
          svgEl("rect", { x: 0, y: WL + 3, width: PW, height: PY1 - WL, fill: "#08121c", opacity: 0.55 }, inner);
          const fx = svgEl("g", {}, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { g, beams, wake, wave, boat, figs, oars, drops, fx };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- oars, splashes, ripples ----------
        function makeOar(panel) {
          const o = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 15, "stroke-linecap": "round" }, panel.oars);
          const w = svgEl("path", { fill: "none", stroke: "#c49a68", "stroke-width": 8, "stroke-linecap": "round" }, panel.oars);
          const bo = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 26, "stroke-linecap": "round" }, panel.oars);
          const bw = svgEl("path", { fill: "none", stroke: "#c49a68", "stroke-width": 16, "stroke-linecap": "round" }, panel.oars);
          const drop = Array.from({ length: 6 }, () => svgEl("circle", { r: 5, fill: "#cfe4ff", opacity: 0 }, panel.drops));
          return { o, w, bo, bw, drop };
        }
        function drawOar(oar, h, b) {
          const dx = b[0] - h[0], dy = b[1] - h[1], d = Math.hypot(dx, dy) || 1;
          const s = [b[0] - (dx / d) * 46, b[1] - (dy / d) * 46];
          const sh = `M${r1(h[0])} ${r1(h[1])} L${r1(b[0])} ${r1(b[1])}`, bl = `M${r1(s[0])} ${r1(s[1])} L${r1(b[0])} ${r1(b[1])}`;
          oar.o.setAttribute("d", sh); oar.w.setAttribute("d", sh); oar.bo.setAttribute("d", bl); oar.bw.setAttribute("d", bl);
        }
        const rings = (panel) => Array.from({ length: 8 }, () => svgEl("ellipse", { fill: "none", stroke: "#9fc0e0", "stroke-width": 3, opacity: 0 }, panel.wake));

        // ---------- rowing: one stroke = drive (lean back, pull, blade in water) + recovery (lean forward, blade out) ----------
        const SEATY = -26, FLOORY = 12;
        function stroke(u) {
          if (u < 0.45) { const p = ease(u / 0.45); return { torso: lerp(26, -16, p), hx: lerp(150, 18, p), hy: lerp(-60, -92, p), wet: ease(u / 0.06) }; }
          const p = ease((u - 0.45) / 0.55);
          return { torso: lerp(-16, 26, p), hx: lerp(18, 150, p), hy: lerp(-92, -60, p) + 16 * Math.sin(Math.PI * p), wet: 1 - ease((u - 0.45) / 0.07) };
        }
        function seated(sx, f, st) {
          return base({ hx: sx, hy: SEATY, torso: st.torso, head: -st.torso * 0.4, ax: sx + f * 70, ay: FLOORY, bx: sx + f * 56, by: FLOORY + 2,
            aw: 1, atx: sx + f * st.hx, aty: st.hy, bw: 1, btx: sx + f * (st.hx - 8), bty: st.hy + 5 });
        }
        const lockOf = (sx, f) => [sx + f * 46, -42];
        const bladeOf = (sx, f, h, wet) => { const L = lockOf(sx, f); return [L[0] - (h[0] - L[0]) * 0.85, lerp(-22, 26, wet)]; };
        const CATCH = stroke(0);
        const rowU = (t, t0, per, n) => (t < t0 || t >= t0 + per * n ? null : frac((t - t0) / per));

        // ---------- boat motion: fixed-step integration at init (seek-safe) ----------
        const DT = 1 / 200, NT = Math.ceil(DUR / DT) + 2;
        const pulse = (u) => (u === null || u >= 0.45 ? 0 : Math.sin((Math.PI * u) / 0.45));
        // top: 5 strokes, glide into the island
        const TR0 = 0.45, TRP = 1.11, TRN = 5, TR1 = TR0 + TRP * TRN;
        const DOCK = ISL - 190;
        const topX = new Float32Array(NT);
        {
          const sp = (t) => { const u = rowU(t, TR0, TRP, TRN); return t < TR0 ? 0 : u !== null ? 0.3 + pulse(u) : 0.3 * Math.exp(-(t - TR1) * 4); };
          let c = 0; for (let i = 1; i < NT; i++) { c += sp((i - 0.5) * DT) * DT; topX[i] = c; }
          for (let i = 0; i < NT; i++) topX[i] = X0 + ((DOCK - X0) * topX[i]) / c;
        }
        // bottom: he rows 7 strokes (2 turns), stops; later SHE rows 3 strokes and the boat turns again
        const BR0 = 0.5, BRP = 0.99, BRN = 7, BR1 = BR0 + BRP * BRN;
        const T_ROW = 11.6, SRN = 3, SR1 = T_ROW + BRP * SRN;
        const FLIPS = [3.6, 6.55, 12.75, 13.9], FLD = 0.6;
        function heading(t) {
          let k = 0, p = 1;
          for (const a of FLIPS) { if (t >= a + FLD) k++; else if (t >= a) { p = Math.cos(Math.PI * ease((t - a) / FLD)); } }
          return (k % 2 ? -1 : 1) * p;
        }
        const botX = new Float32Array(NT);
        {
          const sp = (t) => { const u = rowU(t, BR0, BRP, BRN), v = rowU(t, T_ROW, BRP, SRN); return t < BR0 ? 0 : u !== null ? 0.15 + 0.6 * pulse(u) : v !== null ? 0.15 + 0.6 * pulse(v) : t < T_ROW ? 0.15 * Math.exp(-(t - BR1) * 2) : 0.15 * Math.exp(-(t - SR1) * 2); };
          let x = X0; botX[0] = x;
          for (let i = 1; i < NT; i++) { const t = (i - 0.5) * DT; x += 165 * sp(t) * heading(t) * DT; botX[i] = x; }
        }
        const at = (arr, t) => { const f = clamp(t, 0, DUR) / DT, i = Math.floor(f); return lerp(arr[i], arr[Math.min(i + 1, NT - 1)], f - i); };
        const bobY = (t, ph) => WL + 4 + 3 * Math.sin(t * 2.1 + ph);

        // ---------- people (local boat coords) ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        // top: he sits at the back, she sits in front, both face the stern and row
        const SX_B = -84, SX_F = 64;
        const redSpot = svgEl("polygon", { points: `1006,${PY0} 1118,${PY0} 1206,${IY} 916,${IY}`, fill: "url(#redBeam)", filter: "url(#soft)", opacity: 0 }, top.beams);
        const tHim = makeFig(top.figs, "#ffffff", "#dedede", true, "tHim");
        const tBun = svgEl("circle", { r: 15, fill: "#fff", stroke: "#000", "stroke-width": 6 }, top.figs);
        const tHer = makeFig(top.figs, "#ffffff", "#e2e2e2", true, "tHer");
        top.figs.insertBefore(tBun, tHer.g.previousSibling);
        const tOarB = makeOar(top), tOarF = makeOar(top);
        const tRings = rings(top);
        const heartGlow = svgEl("circle", { r: 70, fill: "url(#redGlow)", opacity: 0 }, top.fx);
        const heart = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        // bottom: he rows at the back, she sits in front facing the bow, on her phone
        const bHim = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bHim");
        const bBun = svgEl("circle", { r: 15, fill: "#8e8e8e", stroke: "#000", "stroke-width": 6 }, bot.figs);
        const bHer = makeFig(bot.figs, "#8e8e8e", "#767676", false, "bHer");
        const phoneGlow = svgEl("circle", { r: 78, fill: "url(#phoneGlow)" }, bot.figs);
        const phone = svgEl("rect", { x: -9, y: -15, width: 18, height: 30, rx: 4, fill: "#bfe0ff", stroke: "#000", "stroke-width": 4 }, bot.figs);
        const bOar = makeOar(bot);
        const bRings = rings(bot);
        // ---------- beats ----------
        const T_UP_F = 6.55, T_HOP_F = 7.15, T_UP_B = 6.85, T_WALK_B = 7.3, T_HOP_B = 7.85, HOPD = 0.5;
        const T_MEET = 8.55, T_HOLD = 9.2;
        const T_CIRC = 6.45;
        // bottom part 2: he stops, stands, steps onto the rock and walks away; she looks up, takes the oar, rows in circles
        const T_STOP = BR1, T_STAND = 8.1, T_BWALK = 8.55, T_BHOP = 9.05, T_GONE = 9.55, T_LOOK = 9.95, T_TURN = 10.45, T_DROPP = 10.8, T_SLIDE = 11.0;
        const T_H2 = 9.7, T_H3 = 12.9;
        // FOLLOW: a bottle drifts to the island, the cork pops, a scroll unrolls, he taps the wax seal
        const T_BOT = 11.8, T_SHORE = 14.6, T_CTA = 14.9, T_POP = 15.95, T_UNROLL = 16.45, T_TAP = 17.4;
        const HUGL = 1046, HUGR = 1078, LANDF = 1108, LANDB = 1012;
        const ROCK = [64, WL - 16];
        const standY = (fy) => fy - Math.sqrt(LEG * LEG - 15 * 15);
        const sm = (t, a, b) => { const p = clamp((t - a) / (b - a), 0, 1); return p * p * (3 - 2 * p); };
        const topBoat = (t) => [at(topX, t), bobY(t, 0)];
        const botBoat = (t) => [at(botX, t) + (300 - at(botX, T_BHOP)) * sm(t, T_STOP, T_STAND + 0.5), bobY(t, 1.1)];
        const shift = (pose, dx, dy) => { const o = { ...pose }; for (const k of ["hx", "ax", "bx", "atx", "btx"]) o[k] += dx; for (const k of ["hy", "ay", "by", "aty", "bty"]) o[k] += dy; return o; };
        const toL = (pose, t) => { const [bx, by] = topBoat(t); return shift(pose, -bx, -by); };
        const toLB = (pose, t) => { const [bx, by] = botBoat(t); return shift(pose, -bx, -by); };
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function hop(t, t0, fromX, fromY, toX, toY, f) {
          const p = clamp((t - t0) / HOPD, 0, 1), e = ease(p);
          const x = lerp(fromX, toX, e), fy = lerp(fromY, toY, e) - Math.sin(Math.PI * p) * 70;
          const st = standOn(x, f, fy), tuck = Math.sin(Math.PI * p);
          st.ay -= 34 * tuck; st.by -= 40 * tuck; st.ax += f * 14 * tuck; st.bx -= f * 6 * tuck;
          st.ash = 8 + 120 * tuck; st.bsh = 8 + 110 * tuck; st.torso = 3 + 8 * tuck;
          return st;
        }
        function walkPose(x, f, fy, ph) {
          const st = standOn(x, f, fy); const sw = Math.sin(ph * Math.PI * 2);
          st.ax += f * 18 * sw; st.bx -= f * 18 * sw; st.ay -= Math.max(0, 10 * sw); st.by -= Math.max(0, -10 * sw); st.ash = 8 + 26 * sw; st.bsh = -4 - 26 * sw; st.hy += 3 * Math.abs(sw);
          return st;
        }
        const restRow = (sx, f) => seated(sx, f, { ...CATCH, wet: 0 });
        // camera push-in on the island couple for the FOLLOW part
        const CF = [880, 420], CS = [540, 980], ZK = 1.3, SEAL = [884, 404];
        const zoomK = (t) => sm(t, T_CTA, T_CTA + 1.0);
        const panelPt = (x, y) => [PX + x * PK, 412 + (y - PY0) * PK];
        const cam = (t) => { const q = zoomK(t), z = lerp(PK, ZK, q), s0 = panelPt(CF[0], CF[1]); return { z, ox: lerp(s0[0], CS[0], q) - CF[0] * z, oy: lerp(s0[1], CS[1], q) - (CF[1] - PY0) * z }; };
        const camPt = (t, x, y) => { const c = cam(t); return [c.ox + x * c.z, c.oy + (y - PY0) * c.z]; };

        function topHerRaw(t) {          // local coords
          const u = rowU(t, TR0, TRP, TRN);
          if (t < T_UP_F) return u === null ? restRow(SX_F, -1) : seated(SX_F, -1, stroke(u));
          const [bx, by] = topBoat(t);
          if (t < T_HOP_F) { const st = standOn(SX_F, 1, FLOORY); st.head = -4; return mixPose(restRow(SX_F, -1), st, win(t, T_UP_F, T_UP_F + 0.5)); }
          if (t < T_HOP_F + HOPD) return toL(hop(t, T_HOP_F, bx + SX_F, by + FLOORY, LANDF, IY, 1), t);
          if (t < T_MEET) { const st = standOn(lerp(LANDF, HUGR, win(t, T_HOP_F + HOPD + 0.2, T_MEET)), -1, IY); st.head = -6; return toL(st, t); }
          const hug = standOn(HUGR, -1, IY); hug.torso = 8; hug.head = -4;
          hug.aw = 1; hug.atx = HUGL - 10; hug.aty = standY(IY) - 150; hug.bw = 1; hug.btx = HUGL + 6; hug.bty = standY(IY) - 120;
          hug.hy += 2 * Math.sin(t * 2);
          let st = mixPose(standOn(HUGR, -1, IY), hug, win(t, T_MEET, T_MEET + 0.5));
          // FOLLOW: she lets go, looks at the scroll, claps when he taps, hugs him again
          const off = hold(t, T_UNROLL, T_TAP + 0.9, 0.35);
          st.aw *= 1 - off; st.bw *= 1 - off; st.torso = lerp(st.torso, 2, off); st.head = lerp(st.head, -12, off);
          const clap = hold(t, T_TAP + 0.15, T_TAP + 0.85, 0.15), cp = 8 * Math.abs(Math.sin(t * 16));
          reachTo(st, clap, [HUGR - 46 - cp, standY(IY) - 190]); reachTo(st, clap, [HUGR - 34 + cp, standY(IY) - 185], "b");
          return toL(st, t);
        }
        const topHerF = (t) => (t < T_UP_F + 0.25 ? -1 : t < T_HOP_F + HOPD + 0.15 ? 1 : -1);
        function topHimRaw(t) {
          const u = rowU(t, TR0, TRP, TRN);
          if (t < T_UP_B) return u === null ? restRow(SX_B, -1) : seated(SX_B, -1, stroke(u));
          const [bx, by] = topBoat(t);
          if (t < T_WALK_B) { const st = standOn(SX_B, 1, FLOORY); st.head = -4; return mixPose(restRow(SX_B, -1), st, win(t, T_UP_B, T_UP_B + 0.45)); }
          if (t < T_HOP_B) { const x = lerp(SX_B, 96, ease((t - T_WALK_B) / (T_HOP_B - T_WALK_B))); return walkPose(x, 1, FLOORY, (x - SX_B) / 90); }
          if (t < T_HOP_B + HOPD) return toL(hop(t, T_HOP_B, bx + 96, by + FLOORY, LANDB, IY, 1), t);
          if (t < T_MEET) { const st = standOn(lerp(LANDB, HUGL, win(t, T_HOP_B + HOPD, T_MEET)), 1, IY); st.head = 4; return toL(st, t); }
          const hug = standOn(HUGL, 1, IY); hug.torso = 4; hug.head = 6;
          hug.aw = 1; hug.atx = HUGR + 10; hug.aty = standY(IY) - 130; hug.bw = 1; hug.btx = HUGR - 4; hug.bty = standY(IY) - 100;
          let st = mixPose(standOn(HUGL, 1, IY), hug, win(t, T_MEET, T_MEET + 0.5));
          // FOLLOW: he turns to the scroll and presses the wax seal, then back into the hug
          const off = hold(t, T_UNROLL - 0.1, T_TAP + 0.9, 0.35);
          st.aw *= 1 - off; st.bw *= 1 - off; st.head = lerp(st.head, -6, off); st.torso = lerp(st.torso, 6, off);
          const tap = hold(t, T_TAP - 0.55, T_TAP + 0.3, 0.3), press = t > T_TAP - 0.1 && t < T_TAP + 0.12 ? 8 : 0;
          reachTo(st, tap, [SEAL[0] + 30 + press, SEAL[1] + 14]);
          const wave = hold(t, T_TAP + 0.35, T_TAP + 0.9, 0.15);
          reachTo(st, wave, [HUGL - 30 + 16 * Math.sin(t * 14), standY(IY) - 250], "b");
          return toL(st, t);
        }
        const topHimF = (t) => (t < T_UP_B + 0.22 ? -1 : t > T_UNROLL + 0.05 && t < T_TAP + 0.75 ? -1 : 1);
        function botHerRaw(t) {
          if (t < T_TURN) {
            const st = seated(SX_F + 6, 1, { torso: 14, hx: 46, hy: SEATY - 72, wet: 0 });
            st.head = 32 + 2 * Math.sin(t * 1.3);
            st.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0);   // thumb scrolling
            const lk = win(t, T_LOOK, T_LOOK + 0.35); st.head = lerp(st.head, -10, lk); st.torso = lerp(st.torso, 2, lk);
            return st;
          }
          // turned around to the empty seat: phone sinks, then she slides back and takes the oar
          const st = seated(SX_F + 6, -1, { torso: 2, hx: 46, hy: SEATY - 72, wet: 0 }); st.head = -8;
          const dr = win(t, T_DROPP - 0.1, T_DROPP + 0.25); st.aty = lerp(st.aty, FLOORY - 30, dr); st.bty = lerp(st.bty, FLOORY - 26, dr); st.atx = lerp(st.atx, SX_F - 30, dr); st.btx = lerp(st.btx, SX_F - 20, dr); st.torso = lerp(st.torso, 20, dr); st.head = lerp(st.head, 10, dr);
          if (t < T_SLIDE) return st;
          const sl = win(t, T_SLIDE, T_SLIDE + 0.5);
          const u = rowU(t, T_ROW, BRP, SRN);
          const row = u === null ? restRow(SX_B, -1) : seated(SX_B, -1, stroke(u));
          return mixPose(st, row, sl);
        }
        const botHerF = (t) => (t < T_TURN + 0.15 ? 1 : -1);
        function botHimRaw(t) {
          const u = rowU(t, BR0, BRP, BRN);
          const row = u === null ? restRow(SX_B, -1) : seated(SX_B, -1, stroke(u));
          if (t < T_STAND) { const sad = win(t, T_STOP, T_STOP + 0.5); row.head = lerp(row.head, 18, sad); return row; }
          if (t < T_BWALK) { const st = standOn(SX_B, -1, FLOORY); st.head = 6; return mixPose(restRow(SX_B, -1), st, win(t, T_STAND, T_STAND + 0.4)); }
          const [bx, by] = botBoat(t);
          if (t < T_BHOP) { const x = lerp(SX_B, -150, ease((t - T_BWALK) / (T_BHOP - T_BWALK))); return walkPose(x, -1, FLOORY, (SX_B - x) / 90); }
          if (t < T_BHOP + HOPD) return toLB(hop(t, T_BHOP, bx - 150, by + FLOORY, ROCK[0] + 40, ROCK[1], -1), t);
          const x = ROCK[0] + 40 - (t - T_BHOP - HOPD) * 150;
          const st = walkPose(x, -1, x > 0 ? ROCK[1] : ROCK[1], (ROCK[0] - x) / 90); st.head = 8;
          return toLB(st, t);
        }

        // ---------- labels (typed) ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH ROW"; botT.textContent = "ONE ROWS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.05, "PULL TOGETHER"], [6.45, "THEY ARRIVE"], [T_HOLD, "HOLD ON", "#ff6a60"]];
        const BOTSEQ = [[0.05, "SHE SCROLLS"], [2.45, "HE ROWS ALONE"], [T_CIRC, "IN CIRCLES", "#ff3b30"], [T_STOP + 0.1, "HE STOPS"], [T_BHOP, "HE LEAVES", "#ff3b30"], [T_LOOK, "SHE LOOKS UP"], [T_ROW, "NOW SHE ROWS"], [12.85, "IN CIRCLES", "#ff3b30"]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- FOLLOW layer: bottle, scroll with wax seal ----------
        const bottle = svgEl("g", {}, top.fx);
        svgEl("path", { d: "M-34 -14 L18 -14 Q30 -14 36 -8 L52 -6 L52 6 L36 8 Q30 14 18 14 L-34 14 Q-44 14 -44 0 Q-44 -14 -34 -14 Z", fill: "#7fc9a0", "fill-opacity": 0.75, stroke: "#000", "stroke-width": 4 }, bottle);
        svgEl("rect", { x: -30, y: -7, width: 40, height: 14, rx: 4, fill: "#f3e3bf", stroke: "#6b5532", "stroke-width": 2 }, bottle);
        const cork = svgEl("rect", { x: 50, y: -7, width: 16, height: 14, rx: 3, fill: "#b07a46", stroke: "#000", "stroke-width": 3 }, top.fx);
        const flyRoll = svgEl("rect", { x: -26, y: -9, width: 52, height: 18, rx: 6, fill: "#f3e3bf", stroke: "#000", "stroke-width": 4, opacity: 0 }, top.fx);
        const scroll = document.createElement("div");
        scroll.style.cssText = "position:absolute;width:300px;height:0;overflow:hidden;background:linear-gradient(#f6e9c8,#e9d6a6);border:5px solid #000;border-radius:10px;box-shadow:0 0 40px rgba(255,220,150,0.35);font-family:HFMono,monospace;font-weight:700;text-align:center;color:#3a2a14;opacity:0";
        scroll.innerHTML = `<div style="margin-top:22px;font-size:17px;letter-spacing:0.14em;color:#7a6440">A MESSAGE FOR YOU</div><div style="margin-top:12px;font-size:24px;letter-spacing:0.06em">@SILENT.STICKMAN</div><div id="seal" style="margin:22px auto 0;width:200px;height:74px;border-radius:37px;border:5px solid #000;display:flex;align-items:center;justify-content:center;font-size:26px;letter-spacing:0.08em"></div>`;
        E("stage").appendChild(scroll);
        const rods = [0, 1].map(() => { const d = document.createElement("div"); d.style.cssText = "position:absolute;width:330px;height:22px;border-radius:11px;background:#c9a56a;border:4px solid #000;opacity:0"; E("stage").appendChild(d); return d; });
        const sub = document.createElement("div");
        sub.style.cssText = "position:absolute;left:120px;right:120px;top:1360px;text-align:center;font-family:HFMono,monospace;font-weight:700;font-size:30px;letter-spacing:0.14em;color:#fff;line-height:1.5";
        E("stage").appendChild(sub);
        const ctaSvg = svgEl("svg", { viewBox: "0 0 1080 1920", width: 1080, height: 1920, style: "position:absolute;left:0;top:0;overflow:visible" });
        E("stage").appendChild(ctaSvg);
        const fist = svgEl("g", { opacity: 0 }, ctaSvg);
        const armO = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 44, "stroke-linecap": "round" }, fist);
        const armW = svgEl("path", { fill: "none", stroke: "#fff", "stroke-width": 29, "stroke-linecap": "round" }, fist);
        const ring = svgEl("circle", { r: 40, fill: "none", stroke: "#fff", "stroke-width": 5, opacity: 0 }, ctaSvg);
        const sparks = Array.from({ length: 10 }, () => svgEl("path", { d: "M0 12 C-26 -4 -19 -26 0 -14 C19 -26 26 -4 0 12 Z", fill: "#ff3b30", opacity: 0 }, ctaSvg));
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- splashes + ripples from the strokes ----------
        function splash(oar, t, t0, per, n, sx, f) {
          const k = Math.floor((t - t0) / per), dt = t - (t0 + k * per);
          oar.drop.forEach((d, j) => {
            const ok = t >= t0 && k < n && dt < 0.55;
            if (!ok) { d.setAttribute("opacity", 0); return; }
            const b = bladeOf(sx, f, [sx + f * CATCH.hx, CATCH.hy], 1);
            const vx = (j - 2.5) * 38, vy = -150 - ((j * 37) % 70);
            d.setAttribute("cx", r1(b[0] + vx * dt)); d.setAttribute("cy", r1(2 + vy * dt + 600 * dt * dt));
            d.setAttribute("r", (5 - j * 0.4).toFixed(1));
            d.setAttribute("opacity", (0.85 * (1 - dt / 0.55)).toFixed(3));
          });
        }
        const splashB = (t) => { if (t < T_ROW) splash(bOar, t, BR0, BRP, BRN, SX_B, -1); else splash(bOar, t, T_ROW, BRP, SRN, SX_B, -1); };
        function ripples(pool, t, t0, per, n, xs, sk, sx, f) {
          pool.forEach((e, j) => {
            let k = Math.floor((t - t0) / per); k -= ((k - j) % pool.length + pool.length) % pool.length;
            const tc = t0 + k * per, age = t - tc;
            if (k < 0 || k >= n || age < 0 || age > 2.2) { e.setAttribute("opacity", 0); return; }
            const b = bladeOf(sx, f, [sx + f * CATCH.hx, CATCH.hy], 1);
            const cx = xs(tc) + (typeof sk === "function" ? sk(tc) : sk) * b[0];
            e.setAttribute("cx", r1(cx)); e.setAttribute("cy", WL + 6);
            e.setAttribute("rx", r1(14 + 80 * Math.sqrt(age / 2.2))); e.setAttribute("ry", r1(3 + 8 * Math.sqrt(age / 2.2)));
            e.setAttribute("opacity", (0.4 * (1 - age / 2.2)).toFixed(3));
          });
        }
        const waveD = (t, ph) => { let d = ""; for (let x = 120; x <= PW; x += 24) d += (x === 120 ? "M" : "L") + x + " " + r1(WL + 3 * Math.sin(x * 0.02 + t * 1.6 + ph) + 2 * Math.sin(x * 0.047 - t * 2.3)); return d; };

        // ---------- per-frame render ----------
        function render(t) {
          // top panel
          const [tbx, tby] = topBoat(t);
          top.boat.setAttribute("transform", `translate(${r1(tbx)} ${r1(tby)}) rotate(${(0.8 * Math.sin(t * 1.7)).toFixed(2)})`);
          top.wave.setAttribute("d", waveD(t, 0));
          const mp = drawFig(tHim, livePose(topHimRaw, t, 1.3), topHimF(t));
          const hp = drawFig(tHer, livePose(topHerRaw, t, 0.4), topHerF(t));
          const hf = topHerF(t);
          tBun.setAttribute("cx", r1(hp.head[0] - hf * 25)); tBun.setAttribute("cy", r1(hp.head[1] - 16));
          for (const [oar, sx, fp, tUp] of [[tOarB, SX_B, mp, T_UP_B], [tOarF, SX_F, hp, T_UP_F]]) {
            const u = rowU(t, TR0, TRP, TRN), wet = u === null ? 0 : stroke(u).wet;
            const rest = [sx - 150, -50];
            const hh = t < tUp ? fp.hands[0] : [lerp(fp.hands[0][0], rest[0], win(t, tUp, tUp + 0.3)), lerp(fp.hands[0][1], rest[1], win(t, tUp, tUp + 0.3))];
            const h2 = t > tUp + 0.3 ? rest : hh;
            drawOar(oar, h2, bladeOf(sx, -1, h2, t < tUp ? wet : lerp(wet, 0.2, win(t, tUp, tUp + 0.3))));
            splash(oar, t, TR0, TRP, TRN, sx, -1);
          }
          ripples(tRings.slice(0, 4), t, TR0, TRP, TRN, (x) => at(topX, x), 1, SX_B, -1);
          ripples(tRings.slice(4), t, TR0, TRP, TRN, (x) => at(topX, x), 1, SX_F, -1);
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          const hc = [tbx + (hp.head[0] + mp.head[0]) / 2, tby + Math.min(hp.head[1], mp.head[1]) - 90];
          const hOut = win(t, T_POP - 0.3, T_POP);
          heart.setAttribute("opacity", t > T_HOLD ? (1 - hOut).toFixed(3) : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * 0.9 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", r1(hc[0])); heartGlow.setAttribute("cy", r1(hc[1] - 4));
          heartGlow.setAttribute("opacity", (0.9 * hq * (1 - hOut)).toFixed(3));
          redSpot.setAttribute("opacity", (0.55 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));
          const c = cam(t);
          top.g.setAttribute("transform", `translate(${r1(c.ox)} ${r1(c.oy)}) scale(${c.z.toFixed(4)}) translate(0 ${-PY0})`);
          const zq = zoomK(t);
          bot.g.setAttribute("opacity", (1 - zq).toFixed(3));
          [topT, topS, botT, botS].forEach((d) => (d.style.opacity = (1 - zq).toFixed(3)));

          // bottle drifts in and washes up at the island, cork pops, a rolled note flies out
          const bq = sm(t, T_BOT, T_SHORE);
          const bxw = lerp(-80, 968, bq), byw = WL + 2 + 4 * Math.sin(t * 3) * (1 - win(t, T_SHORE - 0.3, T_SHORE)) - 6 * win(t, T_SHORE - 0.3, T_SHORE);
          const brot = 8 * Math.sin(t * 2.4) * (1 - win(t, T_SHORE - 0.3, T_SHORE)) - 18 * win(t, T_SHORE - 0.3, T_SHORE);
          bottle.setAttribute("transform", `translate(${r1(bxw)} ${r1(byw)}) rotate(${r1(brot)})`);
          bottle.setAttribute("opacity", t > T_BOT ? 1 : 0);
          const cq = clamp((t - T_POP) / 0.7, 0, 1), ra = (brot * Math.PI) / 180;
          const cx0 = bxw + 58 * Math.cos(ra), cy0 = byw + 58 * Math.sin(ra);
          cork.setAttribute("transform", t < T_POP ? `translate(${r1(bxw)} ${r1(byw)}) rotate(${r1(brot)})` : `translate(${r1(cx0 + 160 * cq - 58)} ${r1(cy0 - 260 * cq + 380 * cq * cq)}) rotate(${r1(brot + 500 * cq)})`);
          cork.setAttribute("opacity", t > T_BOT && cq < 1 ? 1 : 0);
          const fq = clamp((t - (T_POP + 0.1)) / (T_UNROLL - T_POP - 0.1), 0, 1);
          const SC = [SEAL[0], SEAL[1] - 52];
          flyRoll.setAttribute("opacity", fq > 0 && fq < 1 ? 1 : 0);
          flyRoll.setAttribute("transform", `translate(${r1(lerp(cx0, SC[0], fq))} ${r1(lerp(cy0, SC[1], fq) - 120 * Math.sin(Math.PI * fq))}) rotate(${r1(720 * fq)})`);
          const uq = sm(t, T_UNROLL, T_UNROLL + 0.45);
          const S0 = camPt(t, SC[0], SC[1]);
          const H = 236 * uq;
          scroll.style.opacity = t >= T_UNROLL ? 1 : 0;
          scroll.style.left = r1(S0[0] - 150) + "px"; scroll.style.top = r1(S0[1] - H / 2) + "px"; scroll.style.height = r1(H) + "px";
          rods.forEach((d, i) => { d.style.opacity = t >= T_UNROLL ? 1 : 0; d.style.left = r1(S0[0] - 165) + "px"; d.style.top = r1(S0[1] + (i ? H / 2 - 6 : -H / 2 - 16)) + "px"; });
          const tapped = t >= T_TAP, seal = E("seal");
          seal.style.background = tapped ? "#ffffff" : "#c8241c";
          seal.style.color = tapped ? "#000" : "#fff";
          seal.style.boxShadow = tapped ? "0 0 26px rgba(255,255,255,0.6)" : "0 0 26px rgba(200,36,28,0.55)";
          seal.style.transform = `scale(${(tapped ? 1 - 0.1 * Math.sin(Math.PI * clamp((t - T_TAP) / 0.2, 0, 1)) : 1 + 0.05 * Math.max(0, Math.sin(t * 6))).toFixed(3)})`;
          seal.textContent = tapped ? "FOLLOWING ✓" : "+ FOLLOW";
          const SP = [S0[0], S0[1] + 74];
          // his tapping hand drawn above the note
          const hw = [tbx + mp.hands[0][0], tby + mp.hands[0][1]], hs = camPt(t, hw[0], hw[1]), es = camPt(t, hw[0] + 46, hw[1] + 18);
          const onNote = t > T_UNROLL && hs[0] < S0[0] + 160;
          fist.setAttribute("opacity", onNote ? 1 : 0);
          const ad = `M${r1(es[0])} ${r1(es[1])} L${r1(hs[0])} ${r1(hs[1])}`; armO.setAttribute("d", ad); armW.setAttribute("d", ad);
          const rq = clamp((t - T_TAP) / 0.5, 0, 1);
          ring.setAttribute("opacity", tapped && rq < 1 ? (1 - rq).toFixed(3) : 0); ring.setAttribute("r", r1(30 + 300 * rq)); ring.setAttribute("cx", r1(SP[0])); ring.setAttribute("cy", r1(SP[1]));
          sparks.forEach((s2, i) => { const q3 = clamp((t - T_TAP) / 0.9, 0, 1), a = (i / 10) * Math.PI * 2; s2.setAttribute("opacity", tapped && q3 < 1 ? (1 - q3).toFixed(3) : 0); s2.setAttribute("transform", `translate(${r1(SP[0] + Math.cos(a) * 300 * Math.sqrt(q3))} ${r1(SP[1] + Math.sin(a) * 200 * Math.sqrt(q3) - 60 * q3)}) scale(${(1 - 0.5 * q3).toFixed(2)})`); });
          const sq = t - (T_UNROLL + 0.4), line1 = "LOVE IS A ... #12", line2 = "TOMORROW.";
          sub.innerHTML = sq > 0 ? `${line1.slice(0, Math.floor(sq * 30))}&nbsp;<br/>${line2.slice(0, Math.max(0, Math.floor((sq - 0.7) * 30)))}&nbsp;` : "";

          // bottom panel
          const [bbx, bby] = botBoat(t), sk = heading(t);
          bot.boat.setAttribute("transform", `translate(${r1(bbx)} ${r1(bby)}) scale(${sk.toFixed(3)} 1) rotate(${(1.2 * Math.sin(t * 1.5)).toFixed(2)})`);
          bot.wave.setAttribute("d", waveD(t, 1.7));
          const sp = drawFig(bHer, livePose(botHerRaw, t, 0.9), botHerF(t));
          const bp = drawFig(bHim, livePose(botHimRaw, t, 2.0), -1);
          bHim.g.setAttribute("opacity", t < 11.4 ? 1 : 0);
          const bf = botHerF(t);
          bBun.setAttribute("cx", r1(sp.head[0] - bf * 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2];
          const dropQ = win(t, T_DROPP + 0.15, T_DROPP + 0.4);
          const phx = lerp(ph[0] + 6, SX_F - 6, dropQ), phy = lerp(ph[1] - 6, FLOORY - 6, dropQ);
          phone.setAttribute("transform", `translate(${r1(phx)} ${r1(phy)}) rotate(${r1(80 * dropQ)})`);
          phoneGlow.setAttribute("cx", r1(phx)); phoneGlow.setAttribute("cy", r1(phy - 4));
          phoneGlow.setAttribute("opacity", ((0.85 + 0.15 * Math.sin(t * 5)) * (1 - 0.6 * dropQ)).toFixed(3));
          {
            const rest = [SX_B - 40, -46];
            let hnd, wet = 0;
            if (t < T_STOP) { const u = rowU(t, BR0, BRP, BRN); wet = u === null ? 0 : stroke(u).wet; hnd = bp.hands[0]; }
            else if (t < T_STAND + 0.2) { hnd = bp.hands[0]; wet = 0.2; }
            else if (t < T_SLIDE + 0.3) { const q = win(t, T_STAND + 0.2, T_STAND + 0.45); hnd = [lerp(bp.hands[0][0], rest[0], q), lerp(bp.hands[0][1], rest[1], q)]; if (t > T_STAND + 0.45) hnd = rest; wet = 0.2; }
            else { const q = win(t, T_SLIDE + 0.3, T_SLIDE + 0.5); hnd = [lerp(rest[0], sp.hands[0][0], q), lerp(rest[1], sp.hands[0][1], q)]; const u = rowU(t, T_ROW, BRP, SRN); wet = u === null ? 0.2 : stroke(u).wet; }
            drawOar(bOar, hnd, bladeOf(SX_B, -1, hnd, wet));
            splashB(t);
          }
          ripples(bRings.slice(0, 4), t, BR0, BRP, BRN, (x) => botBoat(x)[0], heading, SX_B, -1);
          ripples(bRings.slice(4), t, T_ROW, BRP, SRN, (x) => botBoat(x)[0], heading, SX_B, -1);

          // labels and headline
          topS.textContent = typed(TOPSEQ, t)[0]; topS.style.color = typed(TOPSEQ, t)[1] || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          const L2 = "ONE DAY HE STOPPED ROWING.", L3 = "NOW SHE KNOWS HOW IT FEELS.";
          E("head").innerHTML = `<div>LOVE IS A BOAT. PART 2</div><div>${L2.slice(0, Math.max(0, Math.floor((t - T_H2) * 30)))}&nbsp;</div><div style="color:#ff6a60">${L3.slice(0, Math.max(0, Math.floor((t - T_H3) * 30)))}&nbsp;</div>`;
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
