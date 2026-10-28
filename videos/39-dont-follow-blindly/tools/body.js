        // ---------- "don't follow blindly": an endless blindfolded crowd marches off a cliff. One takes his blindfold off, sees it, turns and tries to hold them back. They keep walking, push him over the edge, and keep marching ----------
        // one-to-one remake of a reel the user uploaded 2026-10-28, smoother: planted feet (phase from position), a real push chain, depth rows with floor reflections
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) if (el.tagName === "use" || el.tagName === "rect") el.setAttribute("opacity", 0);
        const W = E("world");
        const svgRoot = E("svg");
        const defs = svgRoot.querySelector("defs");
        const frac = (v) => v - Math.floor(v);

        // ---------- time warp: slow motion when he goes over ----------
        const EDGE = 560, FLR = 580, V = 120, STRIDE = 32, GAP = 100, VP = 36;
        const T_STOP = 1.9, XH = 375, XH0 = XH - V * T_STOP;
        const T_HANDS = 2.05, T_PULL = 2.4, T_BAND = 2.95, T_LOOK = 3.0, T_TURN = 3.35, T_CONTACT = T_STOP + (340 - GAP) / V;
        const T_SLIP = T_CONTACT + (EDGE - 62 - XH) / VP, T_FALL = T_SLIP + 0.32;
        const SLOWS = [[T_SLIP - 0.05, T_FALL + 0.9]], SLOWK = 0.35;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- stage: floor plane with depth, the edge, the cliff face ----------
        defs.insertAdjacentHTML("beforeend", `
          <linearGradient id="plane" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050505"/><stop offset="0.7" stop-color="#151515"/><stop offset="1" stop-color="#232323"/></linearGradient>
          <linearGradient id="face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a1a"/><stop offset="0.35" stop-color="#0b0b0b"/><stop offset="1" stop-color="#000"/></linearGradient>
          <radialGradient id="spotF" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.09"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <linearGradient id="voidG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></linearGradient>`);
        const stageG = svgEl("g", {}, W);
        svgEl("polygon", { points: `-2600,-40 ${EDGE},-40 ${EDGE},600 -2600,600`, fill: "url(#plane)" }, stageG);
        svgEl("ellipse", { cx: 250, cy: 380, rx: 700, ry: 330, fill: "url(#spotF)" }, stageG);
        let facePts = `-2600,600 ${EDGE},600 `;
        for (let y = 640; y <= 2000; y += 46) facePts += `${r1(EDGE + (rnd() - 0.5) * 16 - (y - 600) * 0.012)},${y} `;
        svgEl("polygon", { points: facePts + "-2600,2000", fill: "url(#face)", stroke: "#000", "stroke-width": 3 }, stageG);
        svgEl("line", { x1: -2600, y1: 600, x2: EDGE, y2: 600, stroke: "#4a4a4a", "stroke-width": 2.5 }, stageG);
        svgEl("line", { x1: EDGE, y1: -40, x2: EDGE, y2: 600, stroke: "#2c2c2c", "stroke-width": 2 }, stageG);

        // ---------- rows: back rows smaller, higher, dimmer. Row-local floor is FLR, local edge is EDGE ----------
        const ROWS = [
          { fy: -3, k: 0.56, col: ["#5a5a5a", "#474747"], band: "#7a1c1f", n: 17, dx: 70 },
          { fy: 163, k: 0.68, col: ["#7c7c7c", "#626262"], band: "#9a2226", n: 16, dx: 25 },
          { fy: 356, k: 0.82, col: ["#a6a6a6", "#888888"], band: "#c4272c", n: 15, dx: 110 },
          { fy: 580, k: 1, col: ["#d9d9d9", "#b4b4b4"], band: "#e0262b", n: 0, dx: 0 },
        ];
        const SPACE = 190;
        ROWS.forEach((r, ri) => {
          r.ox = EDGE * (1 - r.k); r.oy = r.fy - r.k * FLR;
          r.g = svgEl("g", { id: "row" + ri, transform: `translate(${r1(r.ox)} ${r1(r.oy)}) scale(${r.k})` }, W);
          // short glossy reflection under the row
          const cp = svgEl("clipPath", { id: "clipR" + ri }, defs);
          svgEl("rect", { x: -2600, y: r.fy, width: 2600 + EDGE, height: 70 * r.k }, cp);
          const rg = svgEl("g", { "clip-path": `url(#clipR${ri})`, opacity: 0.13 }, W);
          W.insertBefore(rg, r.g);
          svgEl("use", { href: "#row" + ri, transform: `translate(0 ${r1(2 * r.fy)}) scale(1 -1)` }, rg);
          r.figs = [];
        });
        svgEl("rect", { x: EDGE - 40, y: 600, width: 1400, height: 1500, fill: "url(#voidG)", opacity: 0 }, W);

        function addFig(r, x0, hero) {
          const wrap = svgEl("g", {}, r.g);
          const fig = makeFig(wrap, hero ? "#ffffff" : r.col[0], hero ? "#dedede" : r.col[1], !!hero, hero ? "hero" : "f" + Math.round(rnd() * 1e9));
          const bandO = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 17, "stroke-linecap": "round", "stroke-linejoin": "round" }, wrap);
          const bandI = svgEl("path", { fill: "none", stroke: r.band, "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round" }, wrap);
          const o = { r, x0, wrap, fig, bandO, bandI, ph: rnd() * 6, hero: !!hero };
          r.figs.push(o);
          return o;
        }
        // back rows march at a steady pace, analytic
        ROWS.slice(0, 3).forEach((r) => { for (let i = 0; i < r.n; i++) addFig(r, EDGE + 240 - r.dx - i * SPACE + (rnd() - 0.5) * 40); });
        // front row: three ahead of him, him, a gap, then the ones who will push
        const FRONT = ROWS[3];
        const ahead = [1, 2, 3].map((m) => addFig(FRONT, XH0 + SPACE * m));
        const behind = Array.from({ length: 10 }, (_, j) => addFig(FRONT, XH0 - 340 - SPACE * j));
        const hero = addFig(FRONT, XH0, true);
        const heroGlow = hero.fig.g.previousSibling;

        // ---------- front row simulation: the push chain (story time, fixed step, seek-safe) ----------
        const SIMDT = 1 / 200, NSIM = Math.ceil((DUR + 1) / SIMDT);
        const heroX = (s) => (s < T_STOP ? XH0 + V * s : s < T_CONTACT ? XH : Math.min(XH + VP * (s - T_CONTACT), EDGE - 62));
        const heroVel = (s) => (s < T_STOP ? V : s < T_CONTACT || s > T_SLIP ? 0 : VP);
        behind.forEach((b) => { b.sx = new Float32Array(NSIM + 1); b.sp = new Float32Array(NSIM + 1); b.sv = new Float32Array(NSIM + 1); });
        {
          const x = behind.map((b) => b.x0), vel = behind.map(() => V), push = behind.map(() => 0);
          for (let n = 0; n <= NSIM; n++) {
            const s = n * SIMDT;
            for (let j = 0; j < behind.length; j++) {
              vel[j] += (V - vel[j]) * Math.min(1, SIMDT * 2.5);
              x[j] += vel[j] * SIMDT;
              let lx = null, lv = 0;
              if (j === 0) { if (s < T_FALL) { lx = heroX(s); lv = heroVel(s); } }
              else if (x[j - 1] < EDGE + 8) { lx = x[j - 1]; lv = vel[j - 1]; }
              let on = 0;
              if (lx !== null && x[j] > lx - GAP) { x[j] = lx - GAP; vel[j] = Math.min(vel[j], lv); on = 1; }
              if (x[j] >= EDGE + 8) on = 0;
              push[j] += (on - push[j]) * Math.min(1, SIMDT * 7);
              behind[j].sx[n] = x[j]; behind[j].sp[n] = push[j]; behind[j].sv[n] = vel[j];
            }
          }
        }
        const simAt = (arr, s) => { const f = clamp(s / SIMDT, 0, NSIM), i = Math.floor(f), j = Math.min(i + 1, NSIM); return arr[i] + (arr[j] - arr[i]) * (f - i); };
        // the moment each pusher walked off the edge
        behind.forEach((b) => { b.tf = 99; for (let n = 0; n <= NSIM; n++) if (b.sx[n] >= EDGE + 8) { b.tf = n * SIMDT; b.vf = b.sv[n]; break; } });

        // ---------- poses ----------
        function walkPose(x, ph, f, push) {
          const p = base({ hx: x, hy: FLR - 147 - 3 * Math.cos(4 * Math.PI * ph), torso: 5 + 20 * push, head: -2 + 4 * push });
          [["a", 0], ["b", 0.5]].forEach(([k, off]) => {
            const u = frac(ph + off);
            let rel, lift;
            if (u < 0.5) { rel = STRIDE * (1 - 4 * u); lift = 0; } else { const v = (u - 0.5) / 0.5; rel = -STRIDE + 2 * STRIDE * ease(v); lift = 24 * Math.sin(Math.PI * v); }
            p[k + "x"] = x + f * rel; p[k + "y"] = FLR - lift;
          });
          const sw = Math.sin(2 * Math.PI * ph);
          p.ash = 8 + 26 * sw * (1 - push); p.bsh = -4 - 26 * sw * (1 - push); p.ael = 14; p.bel = 14;
          if (push > 0) { p.aw = push; p.atx = x + f * 92; p.aty = p.hy - 112; p.bw = push; p.btx = x + f * 84; p.bty = p.hy - 96; }
          return p;
        }
        // falling off the edge: forward tumble, arms and legs flailing
        function fallPose(x, tau, f, ph) {
          const k = Math.min(1, tau / 0.25), fl = Math.sin(tau * 16 + ph);
          const p = base({ hx: x, hy: FLR - 147, torso: 10, head: -10 * k, ax: x + f * (30 + 20 * fl), ay: FLR - 30 * k, bx: x - f * (40 - 20 * fl), by: FLR - 60 * k });
          p.aw = k; p.atx = x + f * (60 + 30 * fl); p.aty = FLR - 147 - 200; p.bw = k; p.btx = x - f * (40 - 30 * fl); p.bty = FLR - 147 - 190;
          return p;
        }
        const G = 1500;
        // where a walker is at story time s: { x, push, tau (time since walking off, <0 still walking) }
        function stateOf(o, s) {
          if (o.r !== FRONT) { const x = o.x0 + V * s, tf = (EDGE + 8 - o.x0) / V; return { x: Math.min(x, EDGE + 8), push: 0, tau: s - tf, vf: V, ph: x / (4 * STRIDE) }; }
          if (!o.sx) { const x = o.x0 + V * s, tf = (EDGE + 8 - o.x0) / V; return { x: Math.min(x, EDGE + 8), push: 0, tau: s - tf, vf: V, ph: x / (4 * STRIDE) }; }
          const x = simAt(o.sx, Math.min(s, o.tf));
          return { x, push: simAt(o.sp, s), tau: s - o.tf, vf: o.vf || V, ph: x / (4 * STRIDE) };
        }
        function drawWalker(o, s, t) {
          const st = stateOf(o, s);
          if (st.tau > 1.7) { o.wrap.setAttribute("display", "none"); return; }
          const sx = o.r.ox + o.r.k * st.x;
          if (sx < -500 || sx > 1100) { o.wrap.setAttribute("display", "none"); return; }
          o.wrap.removeAttribute("display");
          let pose, rot = 0, dx = 0, dy = 0;
          if (st.tau < 0) pose = walkPose(st.x, st.ph, 1, st.push);
          else {
            const tau = st.tau;
            pose = mixPose(walkPose(st.x, st.ph, 1, 0), fallPose(st.x, tau, 1, o.ph), Math.min(1, tau / 0.2));
            dx = st.vf * 0.7 * tau; dy = 0.5 * G * tau * tau;
            rot = Math.min(tau, 1.7) * 150;
          }
          pose.hy += 1.2 * Math.sin(t * 1.9 + o.ph);
          const p = drawFig(o.fig, pose, 1);
          o.wrap.setAttribute("transform", (dx || dy ? `translate(${r1(dx)} ${r1(dy)}) ` : "") + (rot ? `rotate(${r1(rot)} ${r1(p.hip[0])} ${r1(p.hip[1])})` : ""));
          o.wrap.setAttribute("opacity", st.tau > 0.9 ? (1 - (st.tau - 0.9) / 0.8).toFixed(3) : 1);
          drawBand(o, p.head, 1, t);
          return p;
        }
        // the blindfold: a band over the eyes and a fluttering knot at the back
        function drawBand(o, hc, f, t) {
          const r = HEADR, y = hc[1] - 4, fl = Math.sin(t * 9 + o.ph) * 4;
          const d = `M${r1(hc[0] - r * 0.92)} ${r1(y + 2)} L${r1(hc[0] + r * 0.92)} ${r1(y - 2)} M${r1(hc[0] - f * r * 0.9)} ${r1(y)} l${r1(-f * 18)} ${r1(10 + fl)} M${r1(hc[0] - f * r * 0.9)} ${r1(y)} l${r1(-f * 22)} ${r1(-2 + fl)}`;
          o.bandO.setAttribute("d", d); o.bandI.setAttribute("d", d);
        }

        // ---------- him ----------
        const bandLoose = svgEl("path", { fill: "#e0262b", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round", opacity: 0 }, FRONT.g);
        const dusts = Array.from({ length: 8 }, () => svgEl("circle", { r: 6, fill: "#9a9a9a", opacity: 0 }, FRONT.g));
        function heroRaw(s) {
          const x = heroX(s);
          if (s < T_STOP) return walkPose(x, x / (4 * STRIDE), 1, 0);
          const stand = standOn(x, 1, FLR);
          const w = walkPose(x, x / (4 * STRIDE), 1, 0);
          let p = mixPose(w, stand, win(s, T_STOP, T_STOP + 0.25));
          // hands up to the blindfold, pull it off forward and down
          const hands = win(s, T_HANDS - 0.1, T_HANDS + 0.2) * (1 - win(s, T_PULL + 0.25, T_PULL + 0.45) * 0) ;
          if (s < T_TURN) {
            p.aw = 1; p.bw = 1;
            const pull = win(s, T_PULL, T_PULL + 0.35), drop = win(s, T_BAND, T_BAND + 0.3);
            p.atx = lerp(lerp(x + 20, x + 22, hands), x + 58, pull); p.aty = lerp(lerp(p.hy + 10, p.hy - 152, hands), p.hy - 70, pull);
            p.btx = lerp(lerp(x - 10, x - 12, hands), x + 30, pull); p.bty = lerp(lerp(p.hy + 12, p.hy - 150, hands), p.hy - 40, pull);
            p.atx = lerp(p.atx, x + 26, drop); p.aty = lerp(p.aty, p.hy + 6, drop); p.btx = lerp(p.btx, x - 12, drop); p.bty = lerp(p.bty, p.hy + 10, drop);
            p.head = lerp(-6, 12, pull) * (1 - win(s, T_LOOK, T_LOOK + 0.15));
            // sees the edge: recoils
            const rec = win(s, T_LOOK, T_LOOK + 0.2);
            p.torso -= 10 * rec; p.head -= 10 * rec;
            return p;
          }
          // turns to them: STOP, palms out
          const stop = base({ hx: x, hy: FLR - 150, torso: -4, head: -4, ax: x - 18, ay: FLR, bx: x + 30, by: FLR, aw: 1, atx: x - 82, aty: FLR - 300, bw: 1, btx: x - 70, bty: FLR - 270 });
          if (s < T_CONTACT - 0.15) return stop;
          // braced, pushing back with everything, sliding toward the edge
          const pushP = base({ hx: x, hy: FLR - 128, torso: 26 + 3 * Math.sin(s * 23), head: 8, ax: x - 46, ay: FLR, bx: x + 62, by: FLR, aw: 1, atx: x - 66, aty: FLR - 236, bw: 1, btx: x - 58, bty: FLR - 222 });
          p = mixPose(stop, pushP, win(s, T_CONTACT - 0.15, T_CONTACT + 0.1));
          if (s < T_SLIP) return p;
          // back foot finds nothing: windmills, then goes over backwards
          const sl = win(s, T_SLIP, T_SLIP + 0.15);
          p.by = lerp(p.by, FLR + 60, sl); p.bx = lerp(p.bx, x + 50, sl);
          p.torso = lerp(p.torso, -30, win(s, T_SLIP, T_FALL));
          const wm = (s - T_SLIP) * 22;
          p.atx = lerp(p.atx, x + Math.cos(wm) * 90, sl); p.aty = lerp(p.aty, FLR - 230 + Math.sin(wm) * 90, sl);
          p.btx = lerp(p.btx, x + Math.cos(wm + 2) * 90, sl); p.bty = lerp(p.bty, FLR - 230 + Math.sin(wm + 2) * 90, sl);
          if (s < T_FALL) return p;
          const tau = s - T_FALL;
          const fall = base({ hx: x, hy: FLR - 147, torso: -20, head: -20, ax: x - 50, ay: FLR - 50, bx: x + 30, by: FLR - 20, aw: 1, atx: x - 80 + 40 * Math.sin(tau * 14), aty: FLR - 330, bw: 1, btx: x - 20 + 40 * Math.sin(tau * 14 + 2), bty: FLR - 340 });
          return mixPose(p, fall, Math.min(1, tau / 0.3));
        }
        const heroF = (s) => (s < T_TURN ? 1 : -1);

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): static like the reference, a slow push toward him ----------
        const CK = [
          [0, 0.78, 311, 574, 0], [T_STOP, 0.8, 320, 572, 0], [T_TURN + 0.3, 0.88, 360, 560, 0], [T_SLIP, 0.96, 400, 556, 0],
          [T_FALL + 0.6, 0.92, 410, 600, 0], [T_FALL + 2.0, 0.84, 360, 585, 0], [99, 0.84, 360, 585, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const h2t = [0, 1, 2, 3, 4].map((i) => realOf(T_FALL) + 0.15 + i * 0.16);

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          hit(realOf(T_CONTACT), 0.4, 0.2, 0, 0.15);
          hit(realOf(T_FALL), 1.2, 0.8, 0.12, 0.4);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.04 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1) * 0.6).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 8;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          ROWS.slice(0, 3).forEach((r) => r.figs.forEach((o) => drawWalker(o, s, t)));
          ahead.forEach((o) => drawWalker(o, s, t));
          behind.forEach((o) => drawWalker(o, s, t));

          // him: glows once the blindfold is off
          const hp = drawFig(hero.fig, livePose(heroRaw, s, 0.3), heroF(s));
          heroGlow.setAttribute("opacity", (0.45 * win(s, T_PULL + 0.2, T_PULL + 0.6)).toFixed(3));
          const off = win(s, T_PULL + 0.25, T_PULL + 0.45);
          ["armF", "armB", "legF", "legB", "torso"].forEach((n) => hero.fig[n][1].setAttribute("stroke", off > 0.5 ? (n === "armB" || n === "legB" ? "#dedede" : "#ffffff") : (n === "armB" || n === "legB" ? FRONT.col[1] : FRONT.col[0])));
          hero.fig.head.setAttribute("fill", off > 0.5 ? "#ffffff" : FRONT.col[0]);
          let wrapT = "";
          if (s > T_FALL) {
            const tau = s - T_FALL;
            wrapT = `translate(${r1(70 * tau)} ${r1(0.5 * G * tau * tau)}) rotate(${r1(Math.min(tau, 2) * 120)} ${r1(hp.hip[0])} ${r1(hp.hip[1])})`;
          }
          hero.wrap.setAttribute("transform", wrapT);
          hero.wrap.setAttribute("opacity", s > T_FALL + 1.2 ? Math.max(0, 1 - (s - T_FALL - 1.2) / 0.8).toFixed(3) : 1);
          // his blindfold: on his eyes, then in his hand, then dropped on the floor
          if (s < T_PULL + 0.3) { drawBand(hero, hp.head, 1, t); bandLoose.setAttribute("opacity", 0); }
          else {
            hero.bandO.setAttribute("d", ""); hero.bandI.setAttribute("d", "");
            let bx = hp.hands[0][0], by = hp.hands[0][1] + 8, flat = 0;
            if (s > T_BAND) { const q = s - T_BAND, fx = XH + 50; const land = Math.min(1, q / 0.35); bx = lerp(bx, fx, land); by = Math.min(FLR - 3, by + 900 * q * q); flat = land; if (s > T_BAND + 0.35) { bx = fx; by = FLR - 3; } }
            const d = flat > 0.95 ? `M${r1(bx - 26)} ${r1(by)} q13 -7 26 -2 q13 4 26 -1 l-2 5 q-13 4 -26 1 q-13 -4 -24 2 Z` : `M${r1(bx - 8)} ${r1(by - 4)} q10 -6 18 0 l-4 26 q-6 4 -10 0 Z`;
            bandLoose.setAttribute("d", d); bandLoose.setAttribute("opacity", 1);
          }
          // dust from his sliding feet
          dusts.forEach((d, i) => {
            const q = frac(s * 2.2 + i / dusts.length);
            const on = s > T_CONTACT + 0.2 && s < T_SLIP ? 1 : 0;
            d.setAttribute("cx", r1(heroX(s) + 62 + (i % 2 ? -110 : 0) + 30 * q));
            d.setAttribute("cy", r1(FLR - 6 - 22 * q));
            d.setAttribute("r", r1(4 + 8 * q));
            d.setAttribute("opacity", (on * 0.35 * (1 - q)).toFixed(3));
          });

          E("h1").innerHTML = slam(["DON'T", "FOLLOW", "BLINDLY."], [2.7, 2.85, 3.0], t, []);
          E("h2").innerHTML = slam(["OR", "YOU'LL", "PAY", "THE", "CONSEQUENCES."], h2t, t, [4]);
          E("h1").style.opacity = (1 - 0.4 * win(t, h2t[0] - 0.1, h2t[0] + 0.2)).toFixed(3);
          fade.style.opacity = win(t, DUR - 0.45, DUR - 0.02).toFixed(3);
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
