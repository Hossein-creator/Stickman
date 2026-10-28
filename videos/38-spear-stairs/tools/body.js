        // ---------- "spear stairs": he leaves the crowd and jumps over to the tower. They throw spears at him. Every spear that sticks in the wall becomes his next step: WORK, LEARN, BUILD, GROW... SUCCESS. When he stands on top, the crowd goes quiet ----------
        // one-to-one remake of a reel the user uploaded 2026-10-28, in our style. User: at the end, when he makes it, everyone goes quiet
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) if (el.tagName === "use" || el.tagName === "rect") el.setAttribute("opacity", 0);
        const W = E("world");
        const svgRoot = E("svg");
        const skyG = svgEl("g", {});
        svgRoot.insertBefore(skyG, cam);
        const mistG = svgEl("g", {}, W);
        const rockG = svgEl("g", {}, W);
        const labelG = svgEl("g", {}, W);
        const spearG = svgEl("g", {}, W);
        const crowdBackG = svgEl("g", {}, W);
        const crowdG = svgEl("g", {}, W);
        const heroWrap = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);

        // ---------- time warp: slow motion on the last flip onto the top ----------
        const SLOWS = [[9.95, 10.95]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- the world: crowd cliff on the left, the tower on the right, spears stick in its left wall ----------
        const CLIFF = 380, WALL = 522, TOWER_R = 820, TOP = -1250, SPLEN = 195, SLOPE = 0.268;   // spears stick 15 deg tail-down
        // stations he stands on: cliff edge, ledge at the foot of the tower, five spears, the top
        const ST = [[190, CLIFF], [478, 520], [470, 220], [470, -80], [470, -380], [470, -680], [470, -980], [640, TOP]];
        // jumps: takeoff, landing, flip. Jump k goes from ST[k] to ST[k + 1]
        const JP = [[1.3, 1.85, 0], [2.75, 3.2, 0], [4.05, 4.5, 0], [5.35, 5.85, 1], [7.3, 7.75, 0], [8.7, 9.15, 0], [10.0, 10.55, 1]];
        const T_TURN = 11.6, T_QUIET = 11.75, T_DROP = 12.35;
        const CX = [-370, -280, -190, -100, -10, 80];
        // spears: hit time, where it sticks (y on the wall), who throws it. step = he climbs on it
        const SPY = (st) => ST[st][1] - SLOPE * (WALL + 6 - 470);
        const SP = [
          { hit: 2.35, y: SPY(2), who: 5, step: 2 }, { hit: 3.65, y: SPY(3), who: 3, step: 3 }, { hit: 4.95, y: SPY(4), who: 4, step: 4 },
          { hit: 6.62, y: 95, who: 1 }, { hit: 6.76, y: -235, who: 2 },
          { hit: 6.9, y: SPY(5), who: 5, step: 5 }, { hit: 8.3, y: SPY(6), who: 4, step: 6 },
        ];
        SP.forEach((p) => { p.rel = p.hit - 0.4; p.R = [CX[p.who] + 60, CLIFF - 300]; p.H = [WALL + 6, p.y]; });
        const LABELS = [["WORK", SP[0].y, 2], ["LEARN", SP[1].y, 3], ["BUILD", SP[2].y, 4], ["GROW", SP[5].y, 5], ["SUCCESS", TOP + 34, 7]];

        const defs = svgRoot.querySelector("defs");
        defs.insertAdjacentHTML("beforeend", `
          <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a2c"/><stop offset="0.55" stop-color="#2c3855"/><stop offset="1" stop-color="#55627f"/></linearGradient>
          <linearGradient id="rockG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#232a3c"/><stop offset="0.25" stop-color="#151a27"/><stop offset="1" stop-color="#0c0f18"/></linearGradient>
          <linearGradient id="cliffG" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#252c3e"/><stop offset="0.2" stop-color="#151a27"/><stop offset="1" stop-color="#0c0f18"/></linearGradient>
          <radialGradient id="goldG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd76a" stop-opacity="0.9"/><stop offset="0.4" stop-color="#ffb52e" stop-opacity="0.3"/><stop offset="1" stop-color="#ffb52e" stop-opacity="0"/></radialGradient>
          <radialGradient id="mistG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#c8d2e8" stop-opacity="0.22"/><stop offset="1" stop-color="#c8d2e8" stop-opacity="0"/></radialGradient>
          <filter id="glowL" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>`);

        // sky + three mountain ranges (screen space, slow parallax)
        svgEl("rect", { x: 0, y: 0, width: 1080, height: 1920, fill: "url(#skyG)" }, skyG);
        const ranges = [[1250, 260, "#3a4561", 0.05], [1420, 200, "#2e3851", 0.1], [1600, 150, "#222a3f", 0.16]].map(([y0, amp, col, k]) => {
          const g = svgEl("g", {}, skyG);
          let pts = "-300,2600 ", y = y0;
          for (let x = -300; x <= 1400; x += 70) { y = clamp(y + (rnd() - 0.5) * amp * 0.9, y0 - amp, y0 + amp * 0.3); pts += `${x},${r1(y)} `; }
          svgEl("polygon", { points: pts + "1400,2600", fill: col }, g);
          return { g, k };
        });
        // mist in the gap
        [[380, 760, 420, 120], [300, 980, 520, 160], [650, 860, 480, 130]].forEach(([x, y, rx, ry]) => svgEl("ellipse", { cx: x, cy: y, rx, ry, fill: "url(#mistG)" }, mistG));

        // rocks: jagged edges
        const jag = (x0, y0, y1, step, amp) => { const pts = []; for (let y = y0; y <= y1; y += step) pts.push([x0 + (rnd() - 0.5) * amp, y]); return pts; };
        const toPts = (a) => a.map((p) => r1(p[0]) + "," + r1(p[1])).join(" ");
        const leftEdge = jag(WALL, TOP, 1300, 38, 12);
        const ledge = [[WALL, 512], [462, 518], [450, 528], [458, 540], [492, 556], [WALL, 572]];
        const wallPts = leftEdge.filter((p) => p[1] < 512).concat(ledge, leftEdge.filter((p) => p[1] > 572));
        const towerPts = [[WALL, TOP], [TOWER_R, TOP - 12]].concat(jag(TOWER_R, TOP, 1300, 50, 14), [[TOWER_R, 1400], [WALL, 1400]], wallPts.reverse());
        svgEl("polygon", { points: toPts(towerPts), fill: "url(#rockG)", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, rockG);
        svgEl("polyline", { points: toPts(wallPts), fill: "none", stroke: "#4a5675", "stroke-width": 2.5, opacity: 0.7 }, rockG);
        for (let i = 0; i < 26; i++) { const y = TOP + 40 + rnd() * 2300, x = WALL + 30 + rnd() * 240; svgEl("path", { d: `M${r1(x)} ${r1(y)} l${r1(10 + rnd() * 20)} ${r1(8 + rnd() * 26)} l${r1(-6 + rnd() * 12)} ${r1(10 + rnd() * 20)}`, fill: "none", stroke: "#06080d", "stroke-width": 2, opacity: 0.8 }, rockG); }
        const cliffPts = [[-900, CLIFF + 4], [-500, CLIFF - 2], [-100, CLIFF + 3], [248, CLIFF]].concat(jag(250, CLIFF, 1300, 40, 14), [[240, 1400], [-900, 1400]]);
        svgEl("polygon", { points: toPts(cliffPts), fill: "url(#cliffG)", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, rockG);
        svgEl("polyline", { points: toPts(jag(250, CLIFF, 1300, 40, 14)), fill: "none", stroke: "#4a5675", "stroke-width": 2.5, opacity: 0.6 }, rockG);

        // labels on the tower face, light up when he gets there
        const labels = LABELS.map(([txt, y, st]) => {
          const t = svgEl("text", { x: WALL + 26, y: r1(y + 9), "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, "letter-spacing": 4, fill: "#7d88a2" }, labelG);
          t.textContent = "— " + txt;
          const g = svgEl("text", { x: WALL + 26, y: r1(y + 9), "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 26, "letter-spacing": 4, fill: "#ffffff", filter: "url(#glowL)", opacity: 0 }, labelG);
          g.textContent = "— " + txt;
          return { t, g, st };
        });
        // the trophy on top
        const TROPHY = [735, TOP - 12];
        const trophyGlow = svgEl("circle", { cx: TROPHY[0], cy: TROPHY[1] - 34, r: 120, fill: "url(#goldG)", opacity: 0.35 }, rockG);
        const trophy = svgEl("g", { transform: `translate(${TROPHY[0]} ${TROPHY[1]})` }, rockG);
        svgEl("path", { d: "M-24 -64 L24 -64 C24 -36 14 -24 4 -20 L4 -10 L14 -4 L14 0 L-14 0 L-14 -4 L-4 -10 L-4 -20 C-14 -24 -24 -36 -24 -64 Z", fill: "#e2b443", stroke: "#000", "stroke-width": 3.5, "stroke-linejoin": "round" }, trophy);
        svgEl("path", { d: "M-24 -58 C-40 -58 -40 -38 -20 -34 M24 -58 C40 -58 40 -38 20 -34", fill: "none", stroke: "#e2b443", "stroke-width": 5 }, trophy);
        svgEl("path", { d: "M-15 -58 C-15 -42 -10 -34 -4 -30", fill: "none", stroke: "#fff1c0", "stroke-width": 3, "stroke-linecap": "round" }, trophy);

        // ---------- spears ----------
        function makeSpear(parent) {
          const g = svgEl("g", {}, parent);
          svgEl("line", { x1: -SPLEN, y1: 0, x2: -8, y2: 0, stroke: "#000", "stroke-width": 13, "stroke-linecap": "round" }, g);
          svgEl("line", { x1: -SPLEN, y1: 0, x2: -8, y2: 0, stroke: "#a58e6c", "stroke-width": 7, "stroke-linecap": "round" }, g);
          const head = svgEl("path", { d: "M0 0 L-28 -8 L-23 0 L-28 8 Z", fill: "#cfd4de", stroke: "#000", "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
          return { g, head };
        }
        SP.forEach((p) => {
          p.sp = makeSpear(spearG);
          p.crack = svgEl("path", { d: `M${p.H[0]} ${r1(p.H[1])} l8 -6 m-8 6 l9 5 m-9 -5 l2 -10`, fill: "none", stroke: "#000", "stroke-width": 2, opacity: 0 }, spearG);
          const dx = p.H[0] - p.R[0];
          p.A = (SLOPE * dx + (p.R[1] - p.H[1])) / Math.PI;
        });
        const lastLand = (st) => { const k = JP.findIndex((j, i) => i + 1 === st); return k >= 0 ? JP[k][1] : -9; };
        const nextTake = (st) => (JP[st] ? JP[st][0] : 99);
        function spearAt(p, s) {
          const q = (s - p.rel) / (p.hit - p.rel);
          if (q < 0) return null;
          if (q < 1) {
            const x = lerp(p.R[0], p.H[0], q), y = lerp(p.R[1], p.H[1], q) - p.A * Math.sin(Math.PI * q);
            const ang = Math.atan2((p.H[1] - p.R[1]) - p.A * Math.PI * Math.cos(Math.PI * q), p.H[0] - p.R[0]);
            return { x, y, deg: (ang * 180) / Math.PI, flying: true };
          }
          const d = s - p.hit;
          let deg = 15 + 7 * Math.exp(-d * 7) * Math.sin(d * 45);
          if (p.step) { const l = s - lastLand(p.step), o = s - nextTake(p.step); if (l > 0) deg += 6 * Math.exp(-l * 8) * Math.sin(l * 38); if (o > 0) deg -= 5 * Math.exp(-o * 8) * Math.sin(o * 38); }
          return { x: p.H[0], y: p.H[1], deg, flying: false };
        }

        // ---------- the crowd (grey) and him (white) ----------
        const crowd = [];
        CX.slice(0, 5).forEach((x, i) => crowd.push({ x: x + 45, i: i + 10, back: true, fig: makeFig(crowdBackG, "#3c404a", "#30343d", false, "cb" + i) }));
        CX.forEach((x, i) => crowd.push({ x, i, back: false, fig: makeFig(crowdG, "#6f7480", "#5a5f6a", false, "cf" + i) }));
        crowd.forEach((c) => { c.spear = makeSpear(c.back ? crowdBackG : crowdG); if (c.back) c.spear.g.setAttribute("opacity", 0.6); });
        const hero = makeFig(heroWrap, "#ffffff", "#dedede", true, "hero");
        const ring = svgEl("circle", { r: 10, fill: "none", stroke: "#fff", "stroke-width": 6, opacity: 0 }, fxG);
        const dust = Array.from({ length: 10 }, (_, i) => ({ a: Math.PI + (i / 9) * Math.PI, v: 60 + (i % 3) * 40, el: svgEl("circle", { r: 4 + (i % 3) * 2, fill: "#aab3c8", opacity: 0 }, fxG) }));
        const chips = Array.from({ length: 6 }, (_, i) => svgEl("rect", { width: 6, height: 4, fill: "#3a4258", opacity: 0 }, fxG));
        const dropSpear = makeSpear(crowdG);

        const throwOf = (who, s) => { for (const p of SP) if (p.who === who && s > p.rel - 0.4 && s < p.rel + 0.9) return p; return null; };
        function crowdRaw(c) {
          return (s) => {
            const x = c.x, p = standOn(x, 1, CLIFF);
            const jeer = 1 - win(s, T_QUIET, T_QUIET + 0.4), ph = c.i * 1.37;
            const pump = jeer * (0.5 + 0.5 * Math.sin(s * 8.5 + ph)) * 34;
            p.aw = 1; p.atx = x + 30; p.aty = p.hy - 2 - pump;
            p.head = -4 + jeer * 7 * Math.sin(s * 7 + ph); p.torso = 3 + jeer * 3 * Math.sin(s * 8.5 + ph);
            const th = c.back ? null : throwOf(c.i, s);
            if (th) {
              const wind = win(s, th.rel - 0.35, th.rel - 0.06), rel = win(s, th.rel - 0.06, th.rel + 0.08), back = win(s, th.rel + 0.35, th.rel + 0.8);
              p.atx = lerp(lerp(lerp(p.atx, x - 34, wind), x + 64, rel), x + 30, back);
              p.aty = lerp(lerp(lerp(p.aty, p.hy - 205, wind), p.hy - 190, rel), p.hy - 2 - pump, back);
              p.torso += -12 * wind + 26 * rel - 26 * back + 12 * back * (1 - back);
            }
            // quiet: spear down, head down, one by one
            const q = win(s, T_QUIET + 0.12 * ((c.i % 10) % 7), T_QUIET + 0.12 * ((c.i % 10) % 7) + 0.6);
            p.head += 34 * q; p.torso += 9 * q; p.aty += 26 * q; p.atx -= 4 * q;
            return p;
          };
        }
        crowd.forEach((c) => (c.raw = crowdRaw(c)));

        // his poses
        const groundPose = (x, fy, f, k, duck) => {
          const p = standOn(x, f, fy);
          p.hy += 48 * k; p.torso += 28 * k; p.head -= 8 * k;
          p.aw = k; p.atx = x + f * 44; p.aty = p.hy - 30; p.bw = k; p.btx = x + f * 26; p.bty = p.hy - 10;
          if (duck > 0) { p.aw = 1; p.bw = 1; p.atx = lerp(p.atx, x + f * 30, duck); p.aty = lerp(p.aty, p.hy - 150, duck); p.btx = lerp(p.btx, x + f * 4, duck); p.bty = lerp(p.bty, p.hy - 160, duck); p.head -= 14 * duck; }
          return p;
        };
        const stationOf = (s) => { let k = 0; JP.forEach(([, b], i) => { if (s >= b) k = i + 1; }); return k; };
        function heroRaw(s) {
          const f = s < T_TURN ? 1 : -1;
          for (let i = 0; i < JP.length; i++) {
            const [a, b, flip] = JP[i];
            if (s < a || s >= b) continue;
            const q = (s - a) / (b - a), [x0, y0] = ST[i], [x1, y1] = ST[i + 1];
            const h0 = y0 - 140, h1 = y1 - 140, H = 0.5 * Math.abs(h0 - h1) + 110;
            const x = lerp(x0, x1, q), y = lerp(h0, h1, q) - H * 4 * q * (1 - q);
            const tk = flip ? Math.min(1, Math.sin(Math.PI * q) * 2) : Math.sin(Math.PI * q);
            return base({ hx: x, hy: y, torso: 12 + 18 * tk, head: 4 * tk, ax: x + f * (22 + 40 * tk), ay: y + 150 - 80 * tk, bx: x - f * (12 - 30 * tk), by: y + 148 - 90 * tk,
              aw: 1, atx: x + f * (30 + 30 * tk), aty: y - 150 + 70 * tk, bw: 1, btx: x - f * (20 - 40 * tk), bty: y - 140 + 90 * tk });
          }
          const st = stationOf(s), [x, fy] = ST[st];
          const take = JP[st] ? JP[st][0] : 99, land = st ? JP[st - 1][1] : -9;
          let k = Math.max(win(s, take - 0.28, take - 0.02), s > land ? 0.85 * Math.max(0, 1 - (s - land) / 0.3) ** 1.5 : 0);
          let duck = 0;
          for (const p of SP) if (p.step === st + 1) duck = Math.max(duck, Math.sin(Math.PI * clamp((s - p.hit + 0.22) / 0.6, 0, 1)));
          k = Math.max(k, duck * 0.9);
          if (st < 7) return groundPose(x, fy, f, k, duck);
          // on top: lands, kneels, gets up, turns to them and looks down
          const kneel = win(s, land, land + 0.15) * (1 - win(s, 11.05, 11.5));
          const p = groundPose(x, fy, f, 0, 0);
          const kn = base({ hx: x, hy: fy - 86, torso: 22, head: 10, ax: x + f * 58, ay: fy, bx: x - f * 64, by: fy, aw: 1, atx: x + f * 52, aty: fy - 96, bw: 1, btx: x + f * 14, bty: fy - 4 });
          const m = mixPose(p, kn, kneel);
          if (s > T_TURN) { m.head = lerp(m.head, 16, win(s, T_TURN, T_TURN + 0.5)); }
          return m;
        }
        function heroRot(s) {
          for (let i = 0; i < JP.length; i++) { const [a, b, flip] = JP[i]; if (flip && s > a && s < b) return 360 * ease((s - a) / (b - a)); }
          return 0;
        }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll. Close keys = hard cuts ----------
        const CK = [
          [0, 2.2, -40, 290, 0], [1.0, 2.25, 10, 290, 0], [1.5, 1.05, 300, 420, 0], [2.3, 1.15, 400, 500, 0],
          [3.4, 1.15, 420, 210, 0], [4.7, 1.15, 420, -90, 0], [5.95, 1.15, 420, -390, 0],
          [6.0, 2.0, -60, 300, 0], [6.82, 2.1, -40, 300, -1], [6.86, 1.15, 420, -390, 0],
          [7.95, 1.15, 420, -690, 0], [9.3, 1.15, 430, -990, 0], [10.6, 1.45, 560, -1240, 0], [11.7, 1.5, 580, -1240, 0],
          [11.74, 2.2, -60, 300, 0], [13.0, 2.4, -60, 290, 0], [13.04, 0.78, 235, -610, 0], [99, 0.84, 260, -660, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }
        const setSpear = (sp, x, y, deg, off = 0) => sp.g.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${deg.toFixed(2)}) translate(${off} 0)`);

        // ---------- per-frame render ----------
        function render(t) {
          const s = story(t);
          let kick = 0, chroma = 0, flash = 0;
          const hit = (tr, k, c, f, d) => { if (t >= tr) { const dt = t - tr; kick += k * Math.exp(-dt / d); chroma += c * Math.exp(-dt / d); flash += f * Math.exp(-dt / (d * 0.35)); } };
          SP.forEach((p) => hit(realOf(p.hit), 0.35, 0.3, 0, 0.12));
          JP.forEach(([, b], i) => hit(realOf(b), i === 6 ? 1.6 : 0.3, i === 6 ? 0.9 : 0.1, i === 6 ? 0.25 : 0, i === 6 ? 0.4 : 0.15));

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 10 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 8 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          ranges.forEach((r) => r.g.setAttribute("transform", `translate(${r1(-(cx - 300) * sc * r.k * 0.5)} ${r1((300 - cy) * sc * r.k * 0.35)})`));
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          // crowd + their spears
          crowd.forEach((c) => {
            const p = drawFig(c.fig, livePose(c.raw, s, c.i * 0.7), 1);
            const hand = p.hands[0];
            const th = c.back ? null : throwOf(c.i, s);
            let deg = -90, hide = false;
            if (th) {
              const wind = win(s, th.rel - 0.35, th.rel - 0.06);
              deg = lerp(-90, -150, wind);
              hide = s > th.rel && s < th.rel + 0.85;
            }
            const q = win(s, T_QUIET + 0.12 * ((c.i % 10) % 7), T_QUIET + 0.12 * ((c.i % 10) % 7) + 0.6);
            deg = lerp(deg, -82, q);
            if (!c.back && c.i === 3 && s > T_DROP) hide = true;
            setSpear(c.spear, hand[0], hand[1], deg, lerp(140, hand[1] - CLIFF + SPLEN - 6, q));
            c.spear.g.setAttribute("opacity", hide ? 0 : c.back ? 0.6 * (1 - q) : 1);
            if (!c.back && c.i === 3) c.hand = hand;
          });
          // one of them drops his spear. clatter
          const dq = s - T_DROP;
          if (dq > 0) {
            const h = crowd.find((c) => !c.back && c.i === 3).hand;
            const fall = Math.min(dq, 0.42);
            const y = Math.min(CLIFF - 4, h[1] + 900 * fall * fall), deg = lerp(-82, -178, Math.min(1, dq / 0.42)) + (dq > 0.42 ? 4 * Math.exp(-(dq - 0.42) * 10) * Math.sin((dq - 0.42) * 50) : 0);
            setSpear(dropSpear, h[0] + 40 * Math.min(1, dq / 0.42), y, deg, 90);
            dropSpear.g.setAttribute("opacity", 1);
          } else dropSpear.g.setAttribute("opacity", 0);

          // thrown spears
          SP.forEach((p) => {
            const a = spearAt(p, s);
            p.sp.g.setAttribute("opacity", a ? 1 : 0);
            p.crack.setAttribute("opacity", a && !a.flying ? 0.9 : 0);
            if (!a) return;
            setSpear(p.sp, a.x, a.y, a.deg);
            p.sp.head.setAttribute("opacity", a.flying ? 1 : 0);
          });

          // him
          const hp = drawFig(hero, livePose(heroRaw, s, 0.3), s < T_TURN ? 1 : -1);
          const rot = heroRot(s);
          heroWrap.setAttribute("transform", rot ? `rotate(${rot.toFixed(1)} ${r1(hp.hip[0])} ${r1(hp.hip[1])})` : "");

          // landing dust + rock chips on spear hits
          let ld = -1, lp = null;
          JP.forEach(([, b], i) => { if (s > b && s < b + 0.8) { ld = s - b; lp = ST[i + 1]; } });
          dust.forEach((d) => {
            if (!lp) { d.el.setAttribute("opacity", 0); return; }
            d.el.setAttribute("cx", r1(lp[0] + Math.cos(d.a) * d.v * Math.min(ld, 0.5) * 1.6));
            d.el.setAttribute("cy", r1(lp[1] - 4 + Math.sin(d.a) * d.v * Math.min(ld, 0.5) * 0.5));
            d.el.setAttribute("opacity", (0.6 * (1 - ld / 0.8)).toFixed(3));
          });
          let cq = -1, cp = null;
          SP.forEach((p) => { if (s > p.hit && s < p.hit + 0.7) { cq = s - p.hit; cp = p.H; } });
          chips.forEach((c, i) => {
            if (!cp) { c.setAttribute("opacity", 0); return; }
            const a = -Math.PI / 2 - 0.9 + i * 0.36;
            c.setAttribute("x", r1(cp[0] + Math.cos(a) * 70 * cq - 6));
            c.setAttribute("y", r1(cp[1] + Math.sin(a) * 50 * cq + 300 * cq * cq));
            c.setAttribute("opacity", (1 - cq / 0.7).toFixed(3));
          });
          const tl6 = s - JP[6][1];
          ring.setAttribute("cx", ST[7][0]); ring.setAttribute("cy", ST[7][1]);
          ring.setAttribute("r", r1(10 + 260 * clamp(tl6 / 0.5, 0, 1)));
          ring.setAttribute("opacity", tl6 > 0 && tl6 < 0.5 ? (0.8 * (1 - tl6 / 0.5)).toFixed(3) : 0);

          // labels + trophy
          const st = stationOf(s);
          labels.forEach((l) => { const on = st >= l.st ? win(s, lastLand(l.st), lastLand(l.st) + 0.3) : 0; l.g.setAttribute("opacity", on.toFixed(3)); l.t.setAttribute("fill", on > 0.5 ? "#ffffff" : "#7d88a2"); });
          const gold = tl6 > 0 ? 0.35 + 0.5 * win(s, JP[6][1], JP[6][1] + 0.6) + 0.1 * Math.sin(s * 3) : 0.35;
          trophyGlow.setAttribute("opacity", gold.toFixed(3));
          trophyGlow.setAttribute("r", r1(120 + 60 * win(s, JP[6][1], JP[6][1] + 0.6)));

          E("h1").innerHTML = slam(["THEY", "THREW", "SPEARS."], [13.75, 13.9, 14.05], t, []);
          E("h2").innerHTML = slam(["HE", "BUILT", "STAIRS."], [14.65, 14.8, 15.0], t, [2]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 14.55, 14.85)).toFixed(3);
          fade.style.opacity = win(t, DUR - 0.4, DUR - 0.02).toFixed(3);
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
