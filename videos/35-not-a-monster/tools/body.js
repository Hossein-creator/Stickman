        // ---------- "not a monster": a dark, spiky stranger walks in, the crowd backs off. A kid trips, he brings back the ball: a spike falls off. A crate drops over a villager, he catches it: two more fall. Nobody moves, he walks away. The kid runs after him and takes his hand: the last spikes fall, he is light. The crowd comes to him ----------
        // remake of a 7.6x outlier (Aniblague, "greatest healer's son & human can change"), see viral/2026-10-27-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const propG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- time warp: slow motion on the catch ----------
        const SLOWS = [[4.7, 5.7]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_IN = 0.1, T_FLINCH = 0.65, T_KIDRUN = 1.0, T_TRIP = 1.55, T_BALLSTOP = 2.05, T_PICK = 2.2, T_WALK = 2.45, T_KNEEL = 3.0, T_TAKE = 3.4;
        const T_SNAP = 4.15, T_SPRINT = 4.25, T_JUMP = 4.62, T_CATCH = 4.85, T_LAND = 5.25, T_SET = 5.9, T_TURN = 6.45, T_AWAY = 6.6;
        const T_KIDGO = 7.2, T_HAND = 7.9, T_LIGHT = 8.2, T_CROWD = 8.6;
        const DX0 = 170, KNX = 300, KIDX = 460, CRX = 700, AWAYX = 230;
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
        const KS = 0.62;   // kid scale

        // ---------- set: a gallows-like beam with a hanging crate, a cold light, a warm beam for the end ----------
        svgEl("rect", { x: CRX + 90, y: -60, width: 18, height: FL + 60, fill: "#2a2a2a", stroke: "#000", "stroke-width": 5 }, propG);
        svgEl("rect", { x: CRX - 40, y: -70, width: 160, height: 18, fill: "#2a2a2a", stroke: "#000", "stroke-width": 5 }, propG);
        const crateRope = svgEl("line", { stroke: "#9a8a6a", "stroke-width": 5 }, propG);
        const crate = svgEl("g", {}, propG);
        svgEl("rect", { x: -40, y: -40, width: 80, height: 80, fill: "#7a5a3a", stroke: "#000", "stroke-width": 6 }, crate);
        svgEl("path", { d: "M-40 -40 L40 40 M40 -40 L-40 40", stroke: "#4a3420", "stroke-width": 6 }, crate);
        const lightBeam = svgEl("polygon", { fill: "url(#beam)", filter: "url(#soft)", opacity: 0 }, beams);
        const warm = svgEl("ellipse", { cy: FL, rx: 460, ry: 60, fill: "url(#fireGlow)", opacity: 0 }, backG);
        const halo = svgEl("circle", { r: 360, fill: "url(#fireGlow)", opacity: 0 }, backG);
        const cold = svgEl("polygon", { points: `620,-900 760,-900 1000,${FL} 520,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.2 }, beams);

        // ---------- people ----------
        const tint = (parts, front, back) => {
          for (const n of ["torso", "legF", "armF"]) parts[n][1].setAttribute("stroke", front);
          for (const n of ["legB", "armB"]) parts[n][1].setAttribute("stroke", back);
          parts.head.setAttribute("fill", front);
        };
        const gray = (v) => { v = Math.round(v); return `rgb(${v},${v},${v})`; };
        const CROWD = [[CRX, 0], [820, 1], [930, 2]];
        const crowd = CROWD.map((c, i) => { const box = svgEl("g", {}, figG); const parts = makeFig(box, "#b0b0b0", "#909090", false, "c" + i); return { box, parts }; });
        const kidBox = svgEl("g", {}, figG);
        const kid = makeFig(kidBox, "#ffffff", "#e2e2e2", true, "kid");
        const darkBox = svgEl("g", {}, figG);
        const dark = makeFig(darkBox, "#3a3a3a", "#2a2a2a", false, "dark");
        const darkGlow = svgEl("use", { href: "#dark", filter: "url(#blur)", opacity: 0 }, figG);
        figG.insertBefore(darkGlow, darkBox);
        const eye = svgEl("circle", { r: 5, fill: "#ff3b30" }, fxG);
        const ball = svgEl("circle", { r: 13, fill: "#ff3b30", stroke: "#000", "stroke-width": 4 }, fxG);
        const ring = svgEl("circle", { r: 10, fill: "none", stroke: "#fff", "stroke-width": 6, opacity: 0 }, fxG);
        const dust = Array.from({ length: 10 }, (_, i) => ({ a: -Math.PI * (0.05 + 0.9 * i / 9), el: svgEl("circle", { r: 18, fill: "url(#dustG)", opacity: 0 }, fxG) }));
        const bangs = CROWD.map(() => svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 50, fill: "#ff3b30", "text-anchor": "middle", opacity: 0 }, fxG));
        bangs.forEach((b) => (b.textContent = "!"));
        // spikes: where they sit on him (anchor, angle, length), and when each one falls
        const SPK = [
          ["head", -60, 26, 3.5], ["head", 0, 30, 8.22], ["head", 60, 26, 5.0], ["head", -25, 22, 8.3], ["head", 25, 22, 4.95],
          ["sh", -100, 28, 8.36], ["sh", 100, 28, 8.26], ["back", 180, 26, 8.32],
        ].map(([at, ang, len, tf], i) => ({ at, ang, len, tf, el: svgEl("path", { d: `M-8 0 L0 ${-len} L8 0 Z`, fill: "#2a2a2a", stroke: "#000", "stroke-width": 4, "stroke-linejoin": "round" }, fxG), vx: (i % 2 ? 1 : -1) * (60 + 20 * (i % 3)) }));
        const grayAt = (s) => (s < 3.5 ? 58 : s < 4.95 ? lerp(58, 105, win(s, 3.5, 3.8)) : s < T_LIGHT ? lerp(105, 150, win(s, 4.95, 5.3)) : lerp(150, 255, win(s, T_LIGHT, T_LIGHT + 0.5)));

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
        const kneel = (x, f) => base({ hx: x, hy: FL - 58, torso: 14, head: 10, ax: x + f * 36, ay: FL, bx: x - f * 70, by: FL, ash: 30, ael: 40, bsh: -10, bel: 30 });

        // ---------- the dark one ----------
        const CATCHP = [CRX - 20, FL - 300];
        function darkRaw(s) {
          if (s < T_FLINCH + 0.3) return walking(-260, lerp(-260, DX0, ease((s - T_IN) / (T_FLINCH + 0.3 - T_IN))), 120, 12, 10, 14);
          const st = standOn(DX0, 1, FL);
          st.head = 14; st.torso = 8;
          if (s < T_PICK) { st.head = lerp(14, 34, win(s, 1.9, 2.1)); return st; }
          if (s < T_WALK) { const k = Math.sin(Math.PI * clamp((s - T_PICK) / 0.25, 0, 1)); st.hy += 50 * k; st.torso = 8 + 40 * k; st.aw = k; st.atx = DX0 + 40; st.aty = FL - 14; return st; }
          if (s < T_KNEEL) { const w = walking(DX0, lerp(DX0, KNX, ease((s - T_WALK) / (T_KNEEL - T_WALK))), 120, 12, 8, 16); w.aw = 1; w.atx = w.hx + 50; w.aty = stand - 70; return w; }
          const kn = kneel(KNX, 1);
          const give = win(s, T_KNEEL + 0.1, T_TAKE);
          kn.aw = 1; kn.atx = KNX + 50 + 34 * give; kn.aty = FL - 110 + 10 * give;
          if (s < T_SNAP) { kn.head = lerp(10, 20, win(s, T_TAKE, T_TAKE + 0.3)); return kn; }
          // the crate: sprint, leap, catch overhead
          if (s < T_SPRINT) { const k = mixPose(kn, standOn(KNX, 1, FL), win(s, T_SNAP, T_SPRINT)); k.head = -20; return k; }
          if (s < T_JUMP) return running(KNX, lerp(KNX, CATCHP[0] - 40, ease((s - T_SPRINT) / (T_JUMP - T_SPRINT))), 1);
          const air = base({ hx: CATCHP[0] - 10, hy: CATCHP[1] + 175, torso: -4, head: -24, ax: CATCHP[0] + 20, ay: CATCHP[1] + 320, bx: CATCHP[0] - 60, by: CATCHP[1] + 300, aw: 1, atx: CATCHP[0] + 30, aty: CATCHP[1] + 30, bw: 1, btx: CATCHP[0] - 20, bty: CATCHP[1] + 30 });
          if (s < T_CATCH) return mixPose(running(KNX, CATCHP[0] - 40, 1), air, win(s, T_JUMP, T_CATCH));
          const land = standOn(CATCHP[0] - 30, 1, FL);
          land.aw = 1; land.atx = CATCHP[0] + 10; land.aty = stand - 230; land.bw = 1; land.btx = CATCHP[0] - 50; land.bty = stand - 230; land.head = -18; land.hy += 22 * Math.exp(-Math.max(0, s - T_LAND) * 8);
          if (s < T_LAND) return mixPose(air, land, win(s, T_CATCH, T_LAND));
          if (s < T_SET) { const set = win(s, T_SET - 0.4, T_SET); const l = { ...land }; l.aty = lerp(stand - 230, stand - 40, set); l.bty = lerp(stand - 230, stand - 40, set); l.atx = lerp(l.atx, CATCHP[0] + 40, set); l.btx = lerp(l.btx, CATCHP[0] - 10, set); l.torso = 30 * set; l.hy += 30 * set; return l; }
          // looks at them. nobody moves. walks away, head down
          const look = standOn(CATCHP[0] - 30, 1, FL); look.head = 4;
          if (s < T_AWAY) return look;
          const ax = lerp(CATCHP[0] - 30, AWAYX, ease((s - T_AWAY) / (T_HAND - T_AWAY)));
          const w = walking(CATCHP[0] - 30, ax, 110, 10, 12, 30);
          if (s < T_HAND) return w;
          // the kid's hand stops him. he turns
          const st2 = standOn(AWAYX, 1, FL);
          st2.bw = 1; st2.btx = AWAYX + 50; st2.bty = stand - 20; st2.head = lerp(30, 20, win(s, T_HAND, T_HAND + 0.3));
          st2.head = lerp(st2.head, -8, win(s, T_CROWD + 0.3, T_CROWD + 0.8));
          return st2;
        }
        const darkF = (s) => (s > T_AWAY && s < T_HAND ? -1 : 1);

        // ---------- the kid: runs, trips, gets the ball back, runs after him ----------
        function kidRaw(s) {
          if (s < T_KIDRUN) return standOn(570, -1, FL);
          if (s < T_TRIP) return running(570, lerp(640, KIDX + 20, ease((s - T_KIDRUN) / (T_TRIP - T_KIDRUN))), -1);
          const fallen = base({ hx: KIDX, hy: FL - 24, torso: -30, head: 16, ax: KIDX + 120, ay: FL, bx: KIDX + 100, by: FL, aw: 1, atx: KIDX - 40, aty: FL - 10, bw: 1, btx: KIDX - 30, bty: FL - 4 });
          const sit = base({ hx: KIDX, hy: FL - 24, torso: 4, head: 8, ax: KIDX - 90, ay: FL, bx: KIDX - 70, by: FL, ash: 30, ael: 30, aw: 1, atx: KIDX - 60, aty: FL - 92, bsh: 20, bel: 30 });
          if (s < T_KNEEL) return mixPose(running(570, KIDX + 20, -1), fallen, win(s, T_TRIP, T_TRIP + 0.2));
          const take = win(s, T_TAKE - 0.2, T_TAKE);
          sit.aw = 1; sit.atx = lerp(KIDX - 60, KIDX - 120, take); sit.aty = lerp(FL - 92, FL - 140, take); sit.head = lerp(8, -20, take);
          if (s < T_TAKE + 0.4) return mixPose(fallen, sit, win(s, T_KNEEL, T_KNEEL + 0.3));
          sit.atx = KIDX - 70; sit.aty = FL - 120;
          if (s < T_KIDGO) return sit;
          const up = standOn(KIDX, -1, FL);
          if (s < T_KIDGO + 0.2) return mixPose(sit, up, win(s, T_KIDGO, T_KIDGO + 0.2));
          const handX = AWAYX + 50 / KS + 40;
          if (s < T_HAND) return running(KIDX, lerp(KIDX, handX, ease((s - T_KIDGO - 0.2) / (T_HAND - T_KIDGO - 0.2))), -1);
          const hold = standOn(handX, -1, FL);
          hold.aw = 1; hold.atx = handX - 70; hold.aty = FL - 260; hold.head = -26;
          return hold;
        }
        // ---------- the crowd: flinch, gasp, cower under the crate, stay still, then come to him ----------
        function crowdRaw(i, s) {
          const [x] = CROWD[i];
          const back = 40 * win(s, T_FLINCH, T_FLINCH + 0.25);
          let px = x + back;
          if (s > T_CROWD + i * 0.25) px = lerp(x + back, [430, 540, 650][i] + 40, ease((s - T_CROWD - i * 0.25) / 0.9));
          const walkingNow = s > T_CROWD + i * 0.25 && s < T_CROWD + i * 0.25 + 0.9;
          const st = walkingNow ? walking(x + back, px, 120, 12, 4, 0) : standOn(px, -1, FL);
          const fl = Math.sin(Math.PI * clamp((s - T_FLINCH) / 0.5, 0, 1));
          st.torso -= 12 * fl; st.aw = Math.max(st.aw, fl); st.atx = px - 40; st.aty = stand - 200;
          if (i === 0 && s > T_SNAP && s < T_SET + 0.2) {
            // cowers under the crate
            const cw = win(s, T_SNAP, T_SNAP + 0.2) * (1 - win(s, T_SET - 0.2, T_SET + 0.2));
            st.hy += 60 * cw; st.torso += 30 * cw; st.aw = 1; st.atx = px - 20; st.aty = stand - 160 + 60 * cw; st.bw = cw; st.btx = px + 10; st.bty = stand - 150 + 60 * cw; st.head = 30 * cw;
          }
          if (s > T_CROWD + i * 0.25 + 0.9 && i === 0) { const wv = win(s, T_CROWD + 1.2, T_CROWD + 1.4); st.aw = wv; st.atx = px - 50 + 16 * Math.sin(s * 14); st.aty = stand - 230; }
          return st;
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

        // ---------- camera keys (story): time, scale, world x, world y at screen 1180, roll ----------
        const CK = [
          [0, 1.6, 120, 450, 0], [0.6, 1.25, 420, 440, 0], [0.9, 1.6, 780, 440, 2], [1.3, 1.3, 450, 450, 0],
          [2.0, 1.6, 260, 460, 0], [2.6, 1.4, 320, 450, 0], [3.2, 2.0, 360, 450, 0], [3.9, 1.8, 360, 450, 0],
          [4.2, 1.4, 560, 380, 0], [4.85, 1.7, 650, 330, -3], [5.6, 1.3, 600, 420, 0], [6.4, 1.6, 720, 440, 0],
          [6.7, 1.3, 520, 450, 0], [7.6, 1.4, 360, 450, 0], [8.0, 2.0, 280, 450, 2], [8.6, 1.5, 340, 440, 0],
          [9.6, 1.2, 440, 450, 0], [99, 1.2, 440, 450, 0],
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
          hit(realOf(T_FLINCH), 0.4, 0.3, 0, 0.15);
          hit(realOf(T_TRIP + 0.15), 0.5, 0.2, 0, 0.15);
          hit(realOf(3.5), 0.3, 0.2, 0.08, 0.2);
          hit(realOf(T_SNAP), 0.4, 0.3, 0, 0.15);
          hit(realOf(T_CATCH), 1.8, 1, 0.25, 0.4);
          hit(realOf(T_LAND), 0.6, 0.3, 0, 0.2);
          hit(realOf(T_LIGHT), 0.7, 0.3, 0.3, 0.35);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          // the dark one, his colour and his spikes
          const dp = drawFig(dark, livePose(darkRaw, s, 0.5), darkF(s));
          const gv = grayAt(s);
          tint(dark, gray(gv), gray(gv * 0.82));
          dark.head.setAttribute("stroke", "#000");
          darkGlow.setAttribute("opacity", (0.45 * win(s, T_LIGHT, T_LIGHT + 0.5)).toFixed(3));
          const df = darkF(s);
          eye.setAttribute("cx", r1(dp.head[0] + df * 14)); eye.setAttribute("cy", r1(dp.head[1] - 4));
          eye.setAttribute("opacity", (1 - win(s, 3.5, T_LIGHT + 0.3)).toFixed(3));
          const sh = [lerp(dp.hip[0], dp.head[0], 0.72), lerp(dp.hip[1], dp.head[1], 0.72)];
          const bk = [lerp(dp.hip[0], dp.head[0], 0.45) - df * 12, lerp(dp.hip[1], dp.head[1], 0.45)];
          SPK.forEach((p) => {
            const anchor = p.at === "head" ? dp.head : p.at === "sh" ? sh : bk;
            const r = p.at === "head" ? HEADR - 2 : 10;
            const a = rad(p.ang * (p.at === "back" ? df : 1));
            let x = anchor[0] + Math.sin(a) * r, y = anchor[1] - Math.cos(a) * r, rot = p.ang * (p.at === "back" ? df : 1), op = 1;
            if (s > p.tf) {
              const ft = s - p.tf;
              x += p.vx * ft; y = Math.min(FL - 6, y - 120 * ft + 900 * ft * ft); rot += 400 * ft; op = 1 - win(s, p.tf + 0.5, p.tf + 0.9);
            }
            p.el.setAttribute("transform", `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)})`);
            p.el.setAttribute("opacity", op.toFixed(3));
            p.el.setAttribute("fill", gray(Math.min(gv, 120)));
          });

          // the kid (small)
          const kp = drawFig(kid, livePose(kidRaw, s, 1.7), s > T_KNEEL + 0.1 && s < T_KIDGO ? -1 : -1);
          const kx = kp.hip[0];
          kidBox.setAttribute("transform", `translate(${r1(kx)} ${FL}) scale(${KS}) translate(${r1(-kx)} ${-FL})`);
          const kw = (p) => [kx + (p[0] - kx) * KS, FL + (p[1] - FL) * KS];

          // the crowd
          crowd.forEach((c, i) => {
            drawFig(c.parts, livePose((tt) => crowdRaw(i, tt), s, i * 0.9), -1);
            const b = bangs[i], q = clamp((s - T_FLINCH - i * 0.05) / 0.6, 0, 1);
            const hx = CROWD[i][0] + 40;
            b.setAttribute("x", hx); b.setAttribute("y", r1(stand - 210 - 30 * q));
            b.setAttribute("opacity", s > T_FLINCH && q < 1 ? Math.sin(Math.PI * q).toFixed(3) : 0);
          });

          // the ball: in the kid's hand, rolls to his feet, he carries it back
          let bx, by;
          if (s < T_TRIP) { const h = kw(kp.hands[0]); bx = h[0]; by = h[1] - 8; }
          else if (s < T_BALLSTOP) { const q = ease((s - T_TRIP) / (T_BALLSTOP - T_TRIP)); bx = lerp(KIDX - 20, DX0 + 40, q); by = FL - 13 - 40 * Math.abs(Math.sin(q * Math.PI * 2)) * (1 - q); }
          else if (s < T_PICK + 0.12) { bx = DX0 + 40; by = FL - 13; }
          else if (s < T_TAKE) { bx = dp.hands[0][0]; by = dp.hands[0][1] - 10; }
          else { const h = kw(kp.hands[0]); bx = h[0]; by = h[1] - 8; }
          ball.setAttribute("cx", r1(bx)); ball.setAttribute("cy", r1(by));

          // the crate: hangs, the rope snaps, it drops, he catches it, sets it down
          let crx = CRX, cry = -52 + 200 + 40;
          const hang = [CRX, 188];
          if (s < T_SNAP) { crx = hang[0] + 4 * Math.sin(s * 2); cry = hang[1]; }
          else if (s < T_CATCH) { const ft = s - T_SNAP; crx = CRX; cry = Math.min(hang[1] + 380 * ft * ft, CATCHP[1] - 40); }
          else if (s < T_SET) { const hm = [(dp.hands[0][0] + dp.hands[1][0]) / 2, Math.min(dp.hands[0][1], dp.hands[1][1])]; crx = hm[0]; cry = hm[1] - 40; }
          else { crx = CATCHP[0] + 15; cry = FL - 40; }
          crate.setAttribute("transform", `translate(${r1(crx)} ${r1(cry)}) rotate(${s > T_SNAP && s < T_CATCH ? r1(20 * (s - T_SNAP)) : 0})`);
          crateRope.setAttribute("x1", CRX); crateRope.setAttribute("y1", -52);
          crateRope.setAttribute("x2", CRX); crateRope.setAttribute("y2", s < T_SNAP ? hang[1] - 40 : -10);
          const cd = s - T_CATCH;
          ring.setAttribute("cx", r1(crx)); ring.setAttribute("cy", r1(cry));
          ring.setAttribute("r", r1(10 + 300 * clamp(cd / 0.5, 0, 1)));
          ring.setAttribute("opacity", cd > 0 && cd < 0.5 ? (0.8 * (1 - cd / 0.5)).toFixed(3) : 0);
          const ld = s - T_LAND;
          dust.forEach((d) => {
            d.el.setAttribute("cx", r1(dp.hip[0] + Math.cos(d.a) * 160 * Math.min(ld, 0.6))); d.el.setAttribute("cy", r1(FL - 10 + Math.sin(d.a) * 40 * Math.min(ld, 0.6)));
            d.el.setAttribute("r", r1(16 + 50 * Math.max(ld, 0))); d.el.setAttribute("opacity", ld > 0 && ld < 0.8 ? (0.7 * (1 - ld / 0.8)).toFixed(3) : 0);
          });

          // light finds him at the end, warm glow, cold beam dies
          const li = win(s, T_LIGHT, T_LIGHT + 0.5);
          lightBeam.setAttribute("points", `${AWAYX - 50},-900 ${AWAYX + 50},-900 ${AWAYX + 180},${FL} ${AWAYX - 160},${FL}`);
          lightBeam.setAttribute("opacity", (0.4 * li).toFixed(3));
          warm.setAttribute("cx", AWAYX + 200); warm.setAttribute("opacity", (0.8 * win(s, T_CROWD, T_CROWD + 1)).toFixed(3));
          halo.setAttribute("cx", AWAYX + 60); halo.setAttribute("cy", FL - 150); halo.setAttribute("opacity", (0.45 * li).toFixed(3));
          cold.setAttribute("opacity", (0.2 * (1 - li)).toFixed(3));

          E("h1").innerHTML = slam(["PEOPLE", "CAN", "CHANGE."], [10.9, 11.06, 11.24], t, []);
          E("h2").innerHTML = slam(["IF", "YOU", "LET", "THEM."], [12.0, 12.14, 12.28, 12.5], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, 11.9, 12.2)).toFixed(3);
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
