        // ---------- "love is a boat": winner format of reel 36 (two panels). BOTH ROW: they row in sync, reach the island, step off, hold on (red heart). ONE ROWS: he rows alone with one oar, she scrolls; the boat turns and turns (in circles), he gives up ----------
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
          return { beams, wake, wave, boat, figs, oars, drops, fx };
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
        // bottom: one oar, 10 strokes, the boat keeps turning around
        const BR0 = 0.5, BRP = 0.99, BRN = 10, BR1 = BR0 + BRP * BRN;
        const FLIPS = [3.6, 6.55, 9.15], FLD = 0.6;
        function heading(t) {
          let k = 0, p = 1;
          for (const a of FLIPS) { if (t >= a + FLD) k++; else if (t >= a) { p = Math.cos(Math.PI * ease((t - a) / FLD)); } }
          return (k % 2 ? -1 : 1) * p;
        }
        const botX = new Float32Array(NT);
        {
          const sp = (t) => { const u = rowU(t, BR0, BRP, BRN); return t < BR0 ? 0 : u !== null ? 0.15 + 0.6 * pulse(u) : 0.15 * Math.exp(-(t - BR1) * 2); };
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
        const T_CIRC = 6.45, T_LOST = 10.4;
        const HUGL = 1046, HUGR = 1078, LANDF = 1108, LANDB = 1012;
        const standY = (fy) => fy - Math.sqrt(LEG * LEG - 15 * 15);
        const topBoat = (t) => [at(topX, t), bobY(t, 0)];
        // world -> local for the top boat (scale 1 there)
        const toL = (pose, t) => { const [bx, by] = topBoat(t); const o = { ...pose }; for (const k of ["hx", "ax", "bx", "atx", "btx"]) o[k] -= bx; for (const k of ["hy", "ay", "by", "aty", "bty"]) o[k] -= by; return o; };
        function hop(t, t0, fromX, fromY, toX, toY, f) {
          const p = clamp((t - t0) / HOPD, 0, 1), e = ease(p);
          const x = lerp(fromX, toX, e), fy = lerp(fromY, toY, e) - Math.sin(Math.PI * p) * 70;
          const st = standOn(x, f, fy), tuck = Math.sin(Math.PI * p);
          st.hy -= 0; st.ay -= 34 * tuck; st.by -= 40 * tuck; st.ax += f * 14 * tuck; st.bx -= f * 6 * tuck;
          st.ash = 8 + 120 * tuck; st.bsh = 8 + 110 * tuck; st.torso = 3 + 8 * tuck;
          return st;
        }
        const restRow = (sx, f) => seated(sx, f, { ...CATCH, wet: 0 });
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
          return toL(mixPose(standOn(HUGR, -1, IY), hug, win(t, T_MEET, T_MEET + 0.5)), t);
        }
        const topHerF = (t) => (t < T_UP_F + 0.25 ? -1 : t < T_HOP_F + HOPD + 0.15 ? 1 : -1);
        function topHimRaw(t) {
          const u = rowU(t, TR0, TRP, TRN);
          if (t < T_UP_B) return u === null ? restRow(SX_B, -1) : seated(SX_B, -1, stroke(u));
          const [bx, by] = topBoat(t);
          if (t < T_WALK_B) { const st = standOn(SX_B, 1, FLOORY); st.head = -4; return mixPose(restRow(SX_B, -1), st, win(t, T_UP_B, T_UP_B + 0.45)); }
          if (t < T_HOP_B) { const x = lerp(SX_B, 96, ease((t - T_WALK_B) / (T_HOP_B - T_WALK_B))); const st = standOn(x, 1, FLOORY); const sw = Math.sin(((x - SX_B) / 90) * Math.PI * 2); st.ax += 18 * sw; st.bx -= 18 * sw; st.ay -= Math.max(0, 10 * sw); st.by -= Math.max(0, -10 * sw); st.ash = 8 + 26 * sw; st.bsh = -4 - 26 * sw; return st; }
          if (t < T_HOP_B + HOPD) return toL(hop(t, T_HOP_B, bx + 96, by + FLOORY, LANDB, IY, 1), t);
          if (t < T_MEET) { const st = standOn(lerp(LANDB, HUGL, win(t, T_HOP_B + HOPD, T_MEET)), 1, IY); st.head = 4; return toL(st, t); }
          const hug = standOn(HUGL, 1, IY); hug.torso = 4; hug.head = 6;
          hug.aw = 1; hug.atx = HUGR + 10; hug.aty = standY(IY) - 130; hug.bw = 1; hug.btx = HUGR - 4; hug.bty = standY(IY) - 100;
          return toL(mixPose(standOn(HUGL, 1, IY), hug, win(t, T_MEET, T_MEET + 0.5)), t);
        }
        const topHimF = (t) => (t < T_UP_B + 0.22 ? -1 : 1);
        function botHerRaw(t) {
          const st = seated(SX_F + 6, 1, { torso: 14, hx: 46, hy: SEATY - 72, wet: 0 });
          st.head = 32 + 2 * Math.sin(t * 1.3);
          st.atx += 3 * Math.sin(t * 7) * (frac(t * 0.6) < 0.3 ? 1 : 0);   // thumb scrolling
          return st;
        }
        function botHimRaw(t) {
          const u = rowU(t, BR0, BRP, BRN);
          const row = u === null ? restRow(SX_B, -1) : seated(SX_B, -1, stroke(u));
          if (t < T_LOST) return row;
          // he gives up: lets go of the oar, elbows on knees, head in his hands
          const slump = base({ hx: SX_B, hy: SEATY + 2, torso: 46, head: 26, ax: SX_B - 70, ay: FLOORY, bx: SX_B - 56, by: FLOORY + 2, aw: 1, atx: SX_B - 112, aty: SEATY - 104, bw: 1, btx: SX_B - 100, bty: SEATY - 96 });
          slump.torso += 2 * Math.sin(t * 2.2); slump.hy += 1.5 * Math.sin(t * 2.2);
          return mixPose(row, slump, win(t, T_LOST + 0.1, T_LOST + 0.8));
        }

        // ---------- labels (typed) ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "BOTH ROW"; botT.textContent = "ONE ROWS";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "PULL TOGETHER"], [6.45, "THEY ARRIVE"], [T_HOLD, "HOLD ON"]];
        const BOTSEQ = [[0.5, "HE ROWS"], [2.45, "SHE SCROLLS"], [T_CIRC, "IN CIRCLES", "#ff3b30"], [T_LOST, "LOST", "#ff3b30"]];
        const HEAD = [[0, "LOVE IS A BOAT."], [10.9, "IF ONLY ONE ROWS,"], [11.55, "YOU GO IN CIRCLES."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- end card: the message big in the middle + a quote ----------
        const T_CARD = 12.6;
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:620px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:40px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:29px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"LOVE DOES NOT CONSIST<br/>IN GAZING AT EACH OTHER,<br/>BUT IN LOOKING OUTWARD TOGETHER<br/>IN THE SAME DIRECTION."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ANTOINE DE SAINT-EXUP&Eacute;RY</div></div>`;
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

        // ---------- splashes + ripples from the strokes ----------
        function splash(oar, t, t0, per, n, sx, f) {
          // droplets thrown up when the blade goes in (local coords)
          const k = Math.floor((t - t0) / per), dt = t - (t0 + k * per);
          oar.drop.forEach((d, j) => {
            const ok = t >= t0 && k < n && dt < 0.55;
            if (!ok) { d.setAttribute("opacity", 0); return; }
            const b = bladeOf(sx, f, [sx + f * CATCH.hx, CATCH.hy], 1);
            const vx = (j - 2.5) * 38, vy = -150 - ((j * 37) % 70);
            d.setAttribute("cx", r1(b[0] + vx * dt)); d.setAttribute("cy", r1(WL - WL + 2 + vy * dt + 600 * dt * dt));
            d.setAttribute("r", (5 - j * 0.4).toFixed(1));
            d.setAttribute("opacity", (0.85 * (1 - dt / 0.55)).toFixed(3));
          });
        }
        function ripples(pool, t, t0, per, n, xs, sk, sx, f) {
          pool.forEach((e, j) => {
            let k = Math.floor((t - t0) / per); k -= ((k - j) % pool.length + pool.length) % pool.length;
            const tc = t0 + k * per, age = t - tc;
            if (k < 0 || k >= n || age < 0 || age > 2.2) { e.setAttribute("opacity", 0); return; }
            const b = bladeOf(sx, f, [sx + f * CATCH.hx, CATCH.hy], 1);
            const cx = at(xs, tc) + (typeof sk === "function" ? sk(tc) : sk) * b[0];
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
            const h = t < tUp + 0.15 ? fp.hands[0] : rest;
            const hh = t < tUp ? h : [lerp(fp.hands[0][0], rest[0], win(t, tUp, tUp + 0.3)), lerp(fp.hands[0][1], rest[1], win(t, tUp, tUp + 0.3))];
            drawOar(oar, hh, bladeOf(sx, -1, hh, t < tUp ? wet : lerp(wet, 0.2, win(t, tUp, tUp + 0.3))));
            splash(oar, t, TR0, TRP, TRN, sx, -1);
          }
          ripples(tRings.slice(0, 4), t, TR0, TRP, TRN, topX, 1, SX_B, -1);
          ripples(tRings.slice(4), t, TR0, TRP, TRN, topX, 1, SX_F, -1);
          const hq = clamp((t - T_HOLD) / 0.35, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (t > T_HOLD + 0.4 ? 1 : 0);
          const hc = [tbx + (hp.head[0] + mp.head[0]) / 2, tby + Math.min(hp.head[1], mp.head[1]) - 90];
          heart.setAttribute("opacity", t > T_HOLD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(hc[0])} ${r1(hc[1])}) scale(${(backOut(hq) * 0.9 * beat).toFixed(3)})`);
          heartGlow.setAttribute("cx", r1(hc[0])); heartGlow.setAttribute("cy", r1(hc[1] - 4));
          heartGlow.setAttribute("opacity", (0.9 * hq).toFixed(3));
          redSpot.setAttribute("opacity", (0.55 * win(t, T_HOLD, T_HOLD + 0.5)).toFixed(3));

          // bottom panel
          const bbx = at(botX, t), bby = bobY(t, 1.1), sk = heading(t);
          bot.boat.setAttribute("transform", `translate(${r1(bbx)} ${r1(bby)}) scale(${sk.toFixed(3)} 1) rotate(${(1.2 * Math.sin(t * 1.5)).toFixed(2)})`);
          bot.wave.setAttribute("d", waveD(t, 1.7));
          const sp = drawFig(bHer, livePose(botHerRaw, t, 0.9), 1);
          const bp = drawFig(bHim, livePose(botHimRaw, t, 2.0), -1);
          bBun.setAttribute("cx", r1(sp.head[0] - 25)); bBun.setAttribute("cy", r1(sp.head[1] - 16));
          const ph = [(sp.hands[0][0] + sp.hands[1][0]) / 2, (sp.hands[0][1] + sp.hands[1][1]) / 2];
          phone.setAttribute("transform", `translate(${r1(ph[0] + 6)} ${r1(ph[1] - 6)})`);
          phoneGlow.setAttribute("cx", r1(ph[0] + 6)); phoneGlow.setAttribute("cy", r1(ph[1] - 10));
          phoneGlow.setAttribute("opacity", (t < 0.45 ? 0 : 0.85 + 0.15 * Math.sin(t * 5)).toFixed(3));
          phone.setAttribute("opacity", t < 0.45 ? 0 : 1);
          {
            const u = rowU(t, BR0, BRP, BRN), wet = u === null ? 0 : stroke(u).wet;
            if (t < T_LOST + 0.1) drawOar(bOar, bp.hands[0], bladeOf(SX_B, -1, bp.hands[0], wet));
            else {
              // the oar slips out of his hands and floats away behind the boat
              const q = win(t, T_LOST + 0.1, T_LOST + 1.1), drift = (t - T_LOST) * 14;
              const h0 = [SX_B - 150, -60], b0 = bladeOf(SX_B, -1, h0, 0);
              drawOar(bOar, [lerp(h0[0], -230 - drift, q), lerp(h0[1], 4, q)], [lerp(b0[0], -440 - drift, q), lerp(b0[1], 8, q)]);
            }
            splash(bOar, t, BR0, BRP, BRN, SX_B, -1);
          }
          ripples(bRings, t, BR0, BRP, BRN, botX, heading, SX_B, -1);

          // labels and headline
          topS.textContent = typed(TOPSEQ, t)[0];
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          // end card
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["BOTH", "HAVE", "TO", "ROW."], [T_CARD, T_CARD + 0.13, T_CARD + 0.26, T_CARD + 0.4], t, []);
          E("cm2").innerHTML = slam(["OR", "YOU", "NEVER", "ARRIVE."], [T_CARD + 0.8, T_CARD + 0.92, T_CARD + 1.04, T_CARD + 1.18], t, [2]);
          E("cq").style.opacity = win(t, T_CARD + 1.5, T_CARD + 2.0).toFixed(3);
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
