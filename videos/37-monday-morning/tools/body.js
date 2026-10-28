        // ---------- "monday morning": 06:00, the alarm. He slaps it quiet. He tries to sit up, but his head is glued to the pillow: it stretches like gum and snaps him back. Twice. Third try he pulls his own head free, it tears, he sits up wrecked ----------
        // one-to-one remake of a reel the user uploaded 2026-10-28 ("MONDAY MORNING"), in our style
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          if (el.tagName === "use" || el.tagName === "rect") el.setAttribute("opacity", 0);
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const gooG = svgEl("g", {}, W);
        const frontG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);

        // ---------- time warp: slow motion on the tear ----------
        const SLOWS = [[8.55, 9.6]], SLOWK = 0.33;
        const speedAt = (t) => { let w = 0; for (const [a, b] of SLOWS) w += win(t, a, a + 0.1) * (1 - win(t, b - 0.3, b)); return 1 - (1 - SLOWK) * w; };
        const TSTEP = 1 / 400, TS = [0];
        for (let i = 1; i <= DUR / TSTEP; i++) TS.push(TS[i - 1] + speedAt((i - 0.5) * TSTEP) * TSTEP);
        const story = (t) => { const f = clamp(t / TSTEP, 0, TS.length - 1), i = Math.floor(f); return TS[i] + (TS[Math.min(i + 1, TS.length - 1)] - TS[i]) * (f - i); };
        const realOf = (s) => { let lo = 0, hi = TS.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TS[m] < s) lo = m; else hi = m; } return lo * TSTEP; };

        // ---------- story beats ----------
        const T_SLAP1 = 1.2, T_SLAP2 = 1.85, T_WAKE = 2.4;
        const TRIES = [[3.0, 3.75, 4.05, 40], [5.2, 6.1, 6.45, 22]];   // start, full stretch, snap back, how far he gets (torso angle)
        const T_A3 = 7.5, T_GRAB = 8.0, T_MAX3 = 8.6, T_TEAR = 8.8, T_UPR = 9.2;
        const BED0 = 150, BED1 = 660, MT = FL - 70;
        const HIPM = 330, HY = MT - 14, REST = 55;
        

        // ---------- room: dark blue night, window light, headboard, nightstand with the alarm clock ----------
        // 3/4 view from the foot of the bed like the reference: helper maps reference screen spots to world (camera at rest)
        const CAM0 = [264, 558, 3.3];
        const SW = (X, Y) => [CAM0[0] + (X - 540) / CAM0[2], CAM0[1] + (Y - 1180) / CAM0[2]];
        const CLK = SW(885, 930);
        const poly = (pts) => pts.map(([X, Y]) => SW(X, Y).map(r1).join(",")).join(" ");
        const pathS = (cmds) => cmds.replace(/(-?\d+),(-?\d+)/g, (m, X, Y) => SW(+X, +Y).map(r1).join(" "));
        const defs = E("svg").querySelector("defs");
        defs.insertAdjacentHTML("beforeend", '<linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0f1e"/><stop offset="0.55" stop-color="#1b2644"/><stop offset="1" stop-color="#0d1220"/></linearGradient><linearGradient id="matG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d4def3"/><stop offset="1" stop-color="#8fa3c8"/></linearGradient>');
        svgEl("rect", { x: -600, y: -400, width: 2000, height: 1600, fill: "url(#wallG)" }, backG);
        svgEl("polygon", { points: poly([[0, 420], [590, 500], [590, 1150], [0, 905]]), fill: "#1a1b28", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("polygon", { points: poly([[640, 1010], [1010, 990], [1010, 1400], [640, 1420]]), fill: "#1e2030", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("polygon", { points: poly([[620, 1010], [700, 975], [1050, 960], [1010, 990]]), fill: "#2a2c40", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("circle", { cx: SW(825, 1150)[0], cy: SW(825, 1150)[1], r: 4, fill: "#55586a" }, roomG);
                const clockG = svgEl("g", {}, roomG);
        svgEl("rect", { x: CLK[0] - 40, y: CLK[1] - 22, width: 80, height: 44, rx: 6, fill: "#15161c", stroke: "#000", "stroke-width": 5 }, clockG);
        const glowC = svgEl("ellipse", { cx: CLK[0], cy: CLK[1], rx: 70, ry: 40, fill: "#ff3b30", filter: "url(#soft)", opacity: 0.35 }, clockG);
        const digits = svgEl("text", { x: CLK[0], y: CLK[1] + 10, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 28, fill: "#ff3b30", "text-anchor": "middle" }, clockG);
        digits.textContent = "06:00";
        const clockRest = CLK.slice();

        // ---------- him ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const blanket = svgEl("path", { d: pathS("M300,1920 C340,1550 520,1180 720,1140 C860,1110 980,1040 1100,1050 L1100,1920 Z"), fill: "#3f5a8a", stroke: "#000", "stroke-width": 6, "stroke-linejoin": "round" }, frontG);
        svgEl("path", { d: pathS("M560,1500 C640,1380 760,1300 900,1280 M700,1700 C780,1560 900,1480 1060,1460"), fill: "none", stroke: "#2e4470", "stroke-width": 5, "stroke-linecap": "round" }, frontG);
        // goo = band + two end circles, black copy underneath for the outline
        const gooOut = svgEl("g", {}, gooG), gooIn = svgEl("g", {}, gooG);
        const mkGoo = (g, fill, extra) => ({ band: svgEl("path", { fill, stroke: fill, "stroke-width": extra, "stroke-linejoin": "round" }, g), ca: svgEl("circle", { fill }, g), ch: svgEl("circle", { fill }, g), extra });
        const gooParts = [mkGoo(gooOut, "#000", 12), mkGoo(gooIn, "#ffffff", 0)];
        const blobs = [[-8, -18, 11], [10, 14, 8]].map(([dx, dy, r]) => ({ dx, dy, r, el: svgEl("circle", { r, fill: "#ffffff", stroke: "#000", "stroke-width": 5, opacity: 0 }, gooG) }));
        const handBlob = svgEl("circle", { r: 9, fill: "#ffffff", stroke: "#000", "stroke-width": 5, opacity: 0 }, gooG);
        const zzs = [0, 1, 2].map(() => svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 40, fill: "#9aa4c0", "text-anchor": "middle", opacity: 0 }, fxG));
        zzs.forEach((z) => (z.textContent = "z"));
        const ring = svgEl("circle", { r: 10, fill: "none", stroke: "#fff", "stroke-width": 6, opacity: 0 }, fxG);
        const drops = Array.from({ length: 9 }, (_, i) => ({ a: -Math.PI * 0.15 - (i / 9) * Math.PI * 0.9, v: 90 + (i % 3) * 50, r: 4 + (i % 3) * 2, el: svgEl("circle", { r: 5, fill: "#fff", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG) }));

        // where the head sits for a pose (same maths as drawFig, f = -1)
        const headOf = (p) => {
          const tu = up(p.torso, -1), hu = up(p.torso + p.head, -1);
          return [p.hx + tu[0] * (TORSO + NECK) + hu[0] * HEADR, p.hy + tu[1] * (TORSO + NECK) + hu[1] * HEADR];
        };
        // propped up on the pillow, legs under the blanket
        const reclined = (torso) => base({ hx: HIPM, hy: HY, torso, head: -6, ax: HIPM + 120, ay: MT + 62, bx: HIPM + 108, by: MT + 70, ash: 10, ael: 20, bsh: 6, bel: 20, aw: 1, atx: HIPM - 30, aty: MT - 40, bw: 1, btx: HIPM - 44, bty: MT - 50 });
        const ANCHOR = headOf(reclined(REST));
        const PIL = [ANCHOR[0] - 26, ANCHOR[1] + 22];
        svgEl("polygon", { points: poly([[0, 900], [600, 1140], [1080, 1330], [1080, 1920], [0, 1920]]), fill: "url(#matG)", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("polygon", { points: poly([[0, 1500], [560, 1920], [0, 1920]]), fill: "#2b3654", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("ellipse", { cx: PIL[0], cy: PIL[1], rx: 92, ry: 40, fill: "#dfe6f5", stroke: "#000", "stroke-width": 5, transform: `rotate(28 ${PIL[0]} ${PIL[1]})` }, roomG);

        // ---------- his body: asleep, slaps the alarm, three tries to get up ----------
        function himRaw(s) {
          const st = reclined(REST);
          // slaps: the near arm swings over to the clock and back, twice
          const slap = (a) => Math.sin(Math.PI * clamp((s - a + 0.22) / 0.42, 0, 1));
          const sl = Math.max(slap(T_SLAP1), slap(T_SLAP2));
          st.atx = lerp(st.atx, CLK[0] + 6, sl); st.aty = lerp(st.aty, CLK[1] - 26, sl);
          st.torso -= 12 * sl; st.head += 8 * sl;
          // awake: a tiny lift, staring at the ceiling
          st.head -= 8 * win(s, T_WAKE, T_WAKE + 0.3);
          // tries 1 and 2: pushes up on both hands, gets stuck, snaps back
          for (const [a, m, sn, tgt] of TRIES) {
            if (s < a || s > sn + 1.0) continue;
            const push = win(s, a, a + 0.25);
            st.atx = lerp(st.atx, HIPM - 70, push); st.aty = lerp(st.aty, MT - 4, push);
            st.btx = lerp(st.btx, HIPM - 50, push); st.bty = lerp(st.bty, MT - 2, push);
            if (s < sn) st.torso = lerp(REST, tgt, ease((s - a) / (m - a))) + (s > m ? Math.sin(s * 70) * 1.5 : 0);
            else { const d = s - sn; st.torso = REST + (tgt - REST) * Math.exp(-d * 9) * Math.cos(d * 22); }
            st.head = lerp(-6, 10, win(s, a, m)) * (s < sn ? 1 : Math.exp(-(s - sn) * 6));
            const off = win(s, sn + 0.3, sn + 0.8);
            st.atx = lerp(st.atx, HIPM - 30, off); st.aty = lerp(st.aty, MT - 40, off);
            st.btx = lerp(st.btx, HIPM - 44, off); st.bty = lerp(st.bty, MT - 50, off);
          }
          if (s < T_A3) return st;
          // try 3: pushes with one hand, reaches back with the other and pulls his own head off the pillow
          const r = clamp((s - T_A3) / (T_MAX3 - T_A3), 0, 1);
          let torso = lerp(REST, 8, ease(r)) + (s > T_GRAB && s < T_TEAR ? Math.sin(s * 80) * 2 : 0);
          if (s > T_TEAR) { const d = s - T_TEAR; torso = 4 + 4 * Math.exp(-d * 6) * Math.cos(d * 18) - 10 * Math.exp(-d * 10); }
          const p3 = { ...st, torso, head: s < T_TEAR ? lerp(-6, 14, r) : 14 * Math.exp(-(s - T_TEAR) * 5) * Math.cos((s - T_TEAR) * 14) };
          const push = win(s, T_A3, T_A3 + 0.25);
          p3.atx = lerp(HIPM - 30, HIPM - 66, push); p3.aty = lerp(MT - 40, MT - 4, push);
          const grab = win(s, T_GRAB - 0.25, T_GRAB);
          const hd = headOf(p3), gp = [lerp(ANCHOR[0], hd[0], 0.62), lerp(ANCHOR[1], hd[1], 0.62)];
          p3.bw = 1; p3.btx = lerp(HIPM - 44, gp[0], grab); p3.bty = lerp(MT - 50, gp[1], grab);
          if (s < T_TEAR) return p3;
          // free: the arm flies out with the torn bit, then he sits there, wrecked, head nodding
          const sit = { ...p3 };
          const fly = win(s, T_TEAR, T_TEAR + 0.3), rest = win(s, T_UPR + 0.3, T_UPR + 1.0);
          sit.btx = lerp(lerp(gp[0], HIPM - 150, fly), HIPM - 20, rest); sit.bty = lerp(lerp(gp[1], MT - 200, fly), MT - 30, rest);
          sit.atx = lerp(p3.atx, HIPM - 40, rest); sit.aty = lerp(p3.aty, MT - 26, rest);
          if (s > T_UPR) {
            const k = win(s, T_UPR, T_UPR + 0.8);
            sit.torso = lerp(torso, 10 + 2 * Math.sin(s * 1.4), k);
            sit.head = lerp(sit.head, 16 + 7 * Math.max(0, Math.sin((s - T_UPR) * 2.2)), k);
          }
          return sit;
        }

        // the head stuck to the pillow: a gum-like band from the pillow to the head
        function setGoo(a, h, ra, rh, rm, show) {
          const dx = h[0] - a[0], dy = h[1] - a[1], d = Math.hypot(dx, dy) || 1;
          const nx = -dy / d, ny = dx / d, mx = (a[0] + h[0]) / 2, my = (a[1] + h[1]) / 2;
          const pt = (x, y) => r1(x) + " " + r1(y);
          const band = `M${pt(a[0] + nx * ra, a[1] + ny * ra)} Q${pt(mx + nx * rm, my + ny * rm)} ${pt(h[0] + nx * rh, h[1] + ny * rh)} L${pt(h[0] - nx * rh, h[1] - ny * rh)} Q${pt(mx - nx * rm, my - ny * rm)} ${pt(a[0] - nx * ra, a[1] - ny * ra)} Z`;
          for (const g of gooParts) {
            g.band.setAttribute("d", band);
            g.ca.setAttribute("cx", r1(a[0])); g.ca.setAttribute("cy", r1(a[1])); g.ca.setAttribute("r", r1(ra + g.extra / 2));
            g.ch.setAttribute("cx", r1(h[0])); g.ch.setAttribute("cy", r1(h[1])); g.ch.setAttribute("r", r1(rh + g.extra / 2));
          }
          gooG.querySelectorAll("g").forEach((g) => g.setAttribute("opacity", show ? 1 : 0));
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
          [0, 3.3, 264, 558, 0], [8.6, 3.45, 262, 550, 0], [9.6, 3.5, 268, 545, 0], [11.5, 3.9, 285, 520, 0], [99, 3.9, 285, 520, 0],
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
          hit(realOf(T_SLAP1), 0.5, 0.2, 0, 0.14);
          hit(realOf(T_SLAP2), 0.6, 0.25, 0, 0.14);
          TRIES.forEach(([, , sn]) => hit(realOf(sn), 0.9, 0.5, 0, 0.25));
          hit(realOf(T_TEAR), 1.8, 1, 0.25, 0.4);

          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.06 * Math.min(kick, 1.6));
          const shx = Math.sin(t * 67) * 12 * Math.min(kick, 1.5), shy = Math.cos(t * 59) * 10 * Math.min(kick, 1.5);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${(cr + Math.sin(t * 31) * Math.min(kick, 1)).toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const ch = Math.min(1, chroma) * 9;
          if (ch > 0.3) { W.setAttribute("filter", "url(#chromaF)"); E("chR").setAttribute("dx", (ch / sc).toFixed(2)); E("chB").setAttribute("dx", (-ch / sc).toFixed(2)); }
          else W.removeAttribute("filter");
          E("flash").style.opacity = Math.min(0.85, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), -1);

          // blanket mound over his legs (static)

          // the goo: stuck while he tries, torn at T_TEAR
          const d = Math.hypot(mp.head[0] - ANCHOR[0], mp.head[1] - ANCHOR[1]);
          const stuck = s < T_TEAR;
          setGoo(ANCHOR, mp.head, HEADR * 0.85, HEADR, HEADR * clamp(1 - d / 260, 0.28, 1), stuck && d > 4);
          // after the tear: bits stay on the pillow, one sticks to his hand
          const td = s - T_TEAR;
          blobs.forEach((b) => {
            b.el.setAttribute("cx", r1(ANCHOR[0] + b.dx)); b.el.setAttribute("cy", r1(ANCHOR[1] + b.dy));
            b.el.setAttribute("r", r1(td > 0 ? b.r * (1 + 0.6 * Math.exp(-td * 8)) : 0));
            b.el.setAttribute("opacity", td > 0 ? 1 : 0);
          });
          handBlob.setAttribute("cx", r1(mp.hands[1][0])); handBlob.setAttribute("cy", r1(mp.hands[1][1] - 6));
          handBlob.setAttribute("opacity", td > 0 ? 1 : 0);
          ring.setAttribute("cx", r1(lerp(ANCHOR[0], mp.head[0], 0.5))); ring.setAttribute("cy", r1(lerp(ANCHOR[1], mp.head[1], 0.5)));
          ring.setAttribute("r", r1(10 + 200 * clamp(td / 0.5, 0, 1)));
          ring.setAttribute("opacity", td > 0 && td < 0.5 ? (0.8 * (1 - td / 0.5)).toFixed(3) : 0);
          drops.forEach((f) => {
            const on = td > 0 && td < 1.2, q = Math.max(td, 0);
            f.el.setAttribute("cx", r1(lerp(ANCHOR[0], mp.head[0], 0.5) + Math.cos(f.a) * f.v * Math.min(q, 0.6)));
            f.el.setAttribute("cy", r1(lerp(ANCHOR[1], mp.head[1], 0.5) + Math.sin(f.a) * f.v * Math.min(q, 0.6) + 260 * q * q));
            f.el.setAttribute("r", f.r);
            f.el.setAttribute("opacity", on ? (1 - q / 1.2).toFixed(3) : 0);
          });

          // the alarm: blinks and jumps until the second slap
          const ringing = s < T_SLAP2;
          const on = !ringing || frac(s * 2) < 0.6;
          digits.setAttribute("opacity", on ? 1 : 0.15);
          glowC.setAttribute("opacity", ringing ? (on ? 0.5 : 0.1) : 0.3);
          const jig = ringing ? Math.sin(s * 90) * 2.5 : 0;
          const squash = [T_SLAP1, T_SLAP2].reduce((m, a) => m + (s > a ? 0.25 * Math.exp(-(s - a) * 12) : 0), 0);
          clockG.setAttribute("transform", `translate(${r1(jig)} 0) translate(${clockRest[0]} ${clockRest[1] + 22}) scale(${(1 + squash * 0.5).toFixed(3)} ${(1 - squash).toFixed(3)}) translate(${-clockRest[0]} ${-(clockRest[1] + 22)})`);

          // z z z while he sleeps
          const asleep = s < T_SLAP1 - 0.2 ? 1 : 0;
          zzs.forEach((z, i) => {
            const q = frac(t * 0.55 + i / 3);
            z.setAttribute("x", r1(mp.head[0] + 20 + 30 * q + 6 * Math.sin(q * 9)));
            z.setAttribute("y", r1(mp.head[1] - 30 - 55 * q));
            z.setAttribute("font-size", r1(18 + 16 * q));
            z.setAttribute("opacity", (asleep * Math.sin(Math.PI * q) * 0.9).toFixed(3));
          });

          E("ctr").style.opacity = (1 - win(t, 10.5, 10.8)).toFixed(3);
          E("h1").innerHTML = slam(["MONDAY,", "06:00."], [11.0, 11.2], t, []);
          E("h2").innerHTML = slam(["THE", "PILLOW", "FIGHTS", "BACK."], [12.0, 12.15, 12.3, 12.5], t, [3]);
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
