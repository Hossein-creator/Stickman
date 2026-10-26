        // ---------- rooms (table scene from reel 04, no plant) ----------
        function buildRoom(g, good) {
          const R = {};
          svgEl("rect", { x: 0, y: 0, width: 1421, height: 730, fill: good ? "#3a2f45" : "#1b1e2c" }, g);
          svgEl("rect", { x: 0, y: 730, width: 1421, height: 75, fill: "#2b231f" }, g);
          svgEl("rect", { x: 0, y: 722, width: 1421, height: 8, fill: "#15131a" }, g);
          svgEl("rect", { x: 150, y: 140, width: 300, height: 280, fill: "#15141f" }, g);
          svgEl("rect", { x: 162, y: 152, width: 276, height: 256, fill: "url(#skyDusk)", opacity: good ? 1 : 0.6 }, g);
          svgEl("rect", { x: 296, y: 152, width: 8, height: 256, fill: "#15141f" }, g);
          svgEl("rect", { x: 162, y: 276, width: 276, height: 8, fill: "#15141f" }, g);
          svgEl("rect", { x: 1060, y: 200, width: 150, height: 190, fill: "#15141f" }, g);
          svgEl("rect", { x: 1072, y: 212, width: 126, height: 166, fill: good ? "#4d405c" : "#262a3c" }, g);
          svgEl("rect", { x: 708, y: 0, width: 4, height: 250, fill: "#0d0d10" }, g);
          if (good) R.cone = svgEl("polygon", { points: "680,290 740,290 900,560 520,560", fill: "url(#lampCone)", filter: "url(#soft)", opacity: 0.55 }, g);
          if (good) svgEl("circle", { cx: 710, cy: 292, r: 70, fill: "url(#warmGlow)" }, g);
          svgEl("polygon", { points: "668,292 752,292 730,250 690,250", fill: good ? "#f0cf8f" : "#33343d", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: 516, y: 470, width: 14, height: 152, rx: 4, fill: "#4c382c" }, g);
          svgEl("rect", { x: 516, y: 606, width: 106, height: 14, rx: 3, fill: "#5a4334" }, g);
          svgEl("rect", { x: 522, y: 620, width: 9, height: 110, fill: "#3f2f25" }, g);
          svgEl("rect", { x: 606, y: 620, width: 9, height: 110, fill: "#3f2f25" }, g);
          svgEl("rect", { x: 890, y: 470, width: 14, height: 152, rx: 4, fill: "#4c382c" }, g);
          svgEl("rect", { x: 798, y: 606, width: 106, height: 14, rx: 3, fill: "#5a4334" }, g);
          svgEl("rect", { x: 806, y: 620, width: 9, height: 110, fill: "#3f2f25" }, g);
          svgEl("rect", { x: 890, y: 620, width: 9, height: 110, fill: "#3f2f25" }, g);
          R.figs = svgEl("g", {}, g);
          svgEl("rect", { x: 702, y: 560, width: 16, height: 170, fill: "#3f2f25" }, g);
          svgEl("rect", { x: 655, y: 720, width: 110, height: 10, rx: 3, fill: "#3f2f25" }, g);
          svgEl("rect", { x: 596, y: 546, width: 228, height: 15, rx: 3, fill: "#6a4e3c", stroke: "#000", "stroke-width": 3 }, g);
          // two cups on the table
          for (const x of [650, 770]) {
            svgEl("rect", { x: x - 12, y: 524, width: 24, height: 22, rx: 4, fill: good ? "#e9e2d6" : "#8c8a86", stroke: "#000", "stroke-width": 2.5 }, g);
            svgEl("path", { d: `M${x + 12} 529 q10 0 10 7 q0 7 -10 7`, fill: "none", stroke: "#000", "stroke-width": 2.5 }, g);
          }
          R.fx = svgEl("g", {}, g);
          return R;
        }
        const RT = buildRoom(E("roomT"), true);
        const RB = buildRoom(E("roomB"), false);

        // speech bubble: rounded box with a tail, either three dots or a word
        function makeBubble(parent, word, red) {
          const b = svgEl("g", { opacity: 0 }, parent);
          svgEl("path", { d: "M-8 20 L0 40 L10 20 Z", fill: "#fff", stroke: "#000", "stroke-width": 3, "stroke-linejoin": "round" }, b);
          svgEl("rect", { x: -48, y: -26, width: 96, height: 50, rx: 24, fill: "#fff", stroke: red ? "#b3261e" : "#000", "stroke-width": red ? 4 : 3 }, b);
          svgEl("rect", { x: -9, y: 18, width: 18, height: 5, fill: "#fff" }, b);
          const dots = word ? [] : [-20, 0, 20].map((x) => svgEl("circle", { cx: x, cy: -1, r: 6, fill: "#222" }, b));
          if (word) {
            const tx = svgEl("text", { x: 0, y: 9, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 26, fill: "#b3261e", "letter-spacing": 2 }, b);
            tx.textContent = word;
          }
          return { b, dots };
        }
        function placeBubble(B, pos, s, t, flip) {
          B.b.setAttribute("transform", `translate(${r1(pos[0])} ${r1(pos[1])}) scale(${(flip ? -1 : 1) * Math.max(0.001, s)} ${Math.max(0.001, s)})`);
          B.b.setAttribute("opacity", s > 0.02 ? 1 : 0);
          B.dots.forEach((d, i) => d.setAttribute("cy", r1(-1 - 5 * Math.max(0, Math.sin(t * 9 - i * 0.9)))));
        }

        // ---------- rig (seated, from reel 04) ----------
        function makeFig(parent, front, back, hair, glow, id) {
          const g = svgEl("g", { id }, parent);
          if (glow) parent.insertBefore(svgEl("use", { href: "#" + id, filter: "url(#blur)", opacity: 0.4 }), g);
          const parts = { g };
          for (const [n, col] of [["armB", back], ["legB", back], ["torso", front], ["legF", front], ["armF", front]]) {
            const o = svgEl("path", { fill: "none", stroke: "#000", "stroke-width": 34, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
            const w = svgEl("path", { fill: "none", stroke: col, "stroke-width": 22, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
            parts[n] = [o, w];
          }
          if (hair) parts.hair = svgEl("circle", { r: 15, fill: front, stroke: "#000", "stroke-width": 5 }, g);
          parts.head = svgEl("circle", { r: HEADR, fill: front, stroke: "#000", "stroke-width": 6 }, g);
          return parts;
        }
        function ik(a, b, l1, l2, pick) {
          let dx = b[0] - a[0], dy = b[1] - a[1];
          let d = Math.hypot(dx, dy);
          const maxd = l1 + l2 - 0.5;
          if (d > maxd) {
            b = [a[0] + (dx / d) * maxd, a[1] + (dy / d) * maxd];
            dx = b[0] - a[0];
            dy = b[1] - a[1];
            d = maxd;
          }
          d = Math.max(d, Math.abs(l1 - l2) + 1);
          const al = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
          const base = Math.atan2(dy, dx);
          const c1 = [a[0] + Math.cos(base + al) * l1, a[1] + Math.sin(base + al) * l1];
          const c2 = [a[0] + Math.cos(base - al) * l1, a[1] + Math.sin(base - al) * l1];
          return [pick(c1, c2), b];
        }
        const P = (pts) => "M" + pts.map((p) => r1(p[0]) + " " + r1(p[1])).join("L");
        const setD = (pair, d) => {
          pair[0].setAttribute("d", d);
          pair[1].setAttribute("d", d);
        };
        function drawFig(parts, s) {
          const f = s.f, hip = s.hip;
          const tu = up(s.torso, f);
          const sh = [hip[0] + tu[0] * TORSO, hip[1] + tu[1] * TORSO];
          const nk = [hip[0] + tu[0] * (TORSO + NECK), hip[1] + tu[1] * (TORSO + NECK)];
          const hu = up(s.torso + s.head, f);
          const hc = [nk[0] + hu[0] * HEADR, nk[1] + hu[1] * HEADR];
          setD(parts.torso, P([hip, sh, nk]));
          parts.head.setAttribute("cx", r1(hc[0]));
          parts.head.setAttribute("cy", r1(hc[1]));
          if (parts.hair) {
            parts.hair.setAttribute("cx", r1(hc[0] - f * 27));
            parts.hair.setAttribute("cy", r1(hc[1] - 12));
          }
          const legPick = (c1, c2) => (c1[0] * f > c2[0] * f ? c1 : c2);
          ["legF", "legB"].forEach((n, i) => {
            const [kn, ft] = ik(hip, s.feet[i], THIGH, SHIN, legPick);
            setD(parts[n], P([hip, kn, ft]));
          });
          const hands = [];
          ["armF", "armB"].forEach((n, i) => {
            const a = s.arms[i];
            const u = down(52, f);
            const el = [sh[0] + u[0] * UARM, sh[1] + u[1] * UARM];
            const pick = (c1, c2) => (Math.hypot(c1[0] - el[0], c1[1] - el[1]) < Math.hypot(c2[0] - el[0], c2[1] - el[1]) ? c1 : c2);
            const [e2, h2] = ik(sh, a.t, UARM, FARM, pick);
            setD(parts[n], P([sh, e2, h2]));
            hands.push(h2);
          });
          return { head: hc, hands };
        }
        // smooth motion: Gaussian blend of the raw pose over time (seek-safe), plus breathing
        const KER = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => [k * 0.03, Math.exp(-((k / 2.3) ** 2))]);
        function live(raw, t, phase) {
          let ws = 0;
          const o = { torso: 0, head: 0, hx: 0, hy: 0, a0: 0, a1: 0, b0: 0, b1: 0 };
          for (const [dt, w] of KER) {
            const p = raw(clamp(t + dt, 0, DUR));
            o.torso += p.torso * w; o.head += p.head * w;
            o.hx += p.hip[0] * w; o.hy += p.hip[1] * w;
            o.a0 += p.arms[0].t[0] * w; o.a1 += p.arms[0].t[1] * w;
            o.b0 += p.arms[1].t[0] * w; o.b1 += p.arms[1].t[1] * w;
            ws += w;
          }
          const base = raw(t), br = Math.sin(t * 1.9 + phase);
          return {
            ...base, hip: [o.hx / ws, o.hy / ws + br * 1.2], torso: o.torso / ws + br * 0.8, head: o.head / ws + Math.sin(t * 1.2 + phase) * 1.5,
            arms: [{ t: [o.a0 / ws, o.a1 / ws] }, { t: [o.b0 / ws, o.b1 / ws] }],
          };
        }
        function keyAt(K, t) {
          let i = 0;
          while (i < K.length - 2 && t >= K[i + 1][0]) i++;
          const [ta, a] = K[i], [tb, b] = K[i + 1];
          const p = ease((t - ta) / (tb - ta));
          const o = {};
          for (const k in a) o[k] = lerp(a[k], b[k] === undefined ? a[k] : b[k], p);
          return o;
        }
        function path(stops, t) {
          if (t <= stops[0][0]) return stops[0][1];
          for (let i = 1; i < stops.length; i++) {
            if (t <= stops[i][0]) {
              const [ta, a] = stops[i - 1], [tb, b] = stops[i];
              return tb - ta < 1e-6 ? b : lerp2(a, b, ease((t - ta) / (tb - ta)));
            }
          }
          return stops[stops.length - 1][1];
        }

        // ---------- the couples ----------
        const MAN = { hip: [580, 598], feet: [[652, FL], [670, FL]], rest: [[662, 544], [648, 546]] };
        const WOM = { hip: [840, 598], feet: [[768, FL], [750, FL]], rest: [[758, 544], [772, 546]] };
        const MEET = [712, 534];
        const womTalk = (t) => [758 - 22 * Math.sin(t * 6.2), 500 - 26 * Math.abs(Math.sin(t * 3.1))];
        const manTalk = (t) => [664 + 30 * Math.sin(t * 8.5), 488 - 40 * Math.abs(Math.sin(t * 4.3))];
        const CHIN = [630, 476];

        // TOP: she talks, he leans in and listens; she opens up; they hold hands
        function topMan(t) {
          const q = keyAt([[0, { torso: 4, head: 0 }], [0.6, { torso: 4, head: 0 }], [1.2, { torso: 14, head: 6 }], [8.2, { torso: 14, head: 6 }], [8.7, { torso: 12, head: 10 }], [DUR, { torso: 12, head: 10 }]], t);
          const nod = t > 1.4 && t < 8.2 ? Math.max(0, Math.sin(t * 4.2)) * 6 : 0;
          const hf = path([[1.0, MAN.rest[0]], [1.4, CHIN], [8.0, CHIN], [8.6, MEET]], t);
          return { hip: MAN.hip, f: 1, torso: q.torso, head: q.head + nod, feet: MAN.feet, arms: [{ t: hf }, { t: MAN.rest[1] }] };
        }
        function topWom(t) {
          const talking = t > 0.3 && t < 8.3;
          const q = keyAt([[0, { torso: 4, head: 0 }], [6.0, { torso: 6, head: -4 }], [8.6, { torso: 8, head: 12 }], [DUR, { torso: 8, head: 12 }]], t);
          const hf = talking ? womTalk(t) : path([[8.3, womTalk(8.3)], [8.65, MEET]], t);
          return { hip: WOM.hip, f: -1, torso: q.torso, head: q.head, feet: WOM.feet, arms: [{ t: hf }, { t: WOM.rest[1] }] };
        }
        // BOTTOM: she talks, he only waits for his turn, then talks over her; she stops
        function botMan(t) {
          const q = keyAt([[0, { torso: 2, head: -6 }], [2.4, { torso: 2, head: -6 }], [2.8, { torso: 16, head: -2 }], [DUR, { torso: 16, head: -2 }]], t);
          const tap = t < 2.6 ? [648 + 4 * Math.sin(t * 14), 544] : null; // drums his fingers, waiting
          const hf = tap || manTalk(t);
          return { hip: MAN.hip, f: 1, torso: q.torso, head: q.head, feet: MAN.feet, arms: [{ t: hf }, { t: MAN.rest[1] }] };
        }
        function botWom(t) {
          const q = keyAt([[0, { torso: 4, head: 0 }], [5.4, { torso: 4, head: 0 }], [6.0, { torso: -2, head: 8 }], [7.4, { torso: -2, head: 8 }], [8.0, { torso: -4, head: 26 }], [DUR, { torso: -4, head: 26 }]], t);
          const hf = t < 5.2 ? womTalk(t) : path([[5.2, womTalk(5.2)], [5.7, WOM.rest[0]]], t);
          return { hip: WOM.hip, f: -1, torso: q.torso, head: q.head, feet: WOM.feet, arms: [{ t: hf }, { t: WOM.rest[1] }] };
        }
        const figs = {
          tm: makeFig(RT.figs, "#ffffff", "#e2e2e2", false, true, "tm"),
          tw: makeFig(RT.figs, "#ffffff", "#e2e2e2", true, true, "tw"),
          bm: makeFig(RB.figs, "#9a9a9a", "#7c7c7c", false, false, "bm"),
          bw: makeFig(RB.figs, "#9a9a9a", "#7c7c7c", true, false, "bw"),
        };
        const BT = makeBubble(RT.fx, null, false);
        const BBW = makeBubble(RB.fx, null, false);
        const BBM = makeBubble(RB.fx, "ME", true);
        const heartGlow = svgEl("circle", { r: 80, fill: "url(#heartGlow)", opacity: 0 }, RT.fx);
        const heart = svgEl("path", { d: HEART, fill: "#e0322b", stroke: "#000", "stroke-width": 2.5, opacity: 0 }, RT.fx);
        const minis = [0, 1, 2, 3].map(() => svgEl("path", { d: HEART, fill: "#ff4a4a", opacity: 0 }, RT.fx));

        // ---------- labels ----------
        const SUBT = [[0.3, "SHE TALKS"], [1.3, "HE LISTENS"], [6.0, "SHE OPENS UP"], [8.5, "CLOSER"]];
        const SUBB = [[0.3, "SHE TALKS"], [1.2, "HE WAITS"], [2.8, "HE TALKS"], [7.4, "SHE STOPS"]];
        const subAt = (Lst, t) => {
          let s = "", t0 = 0;
          for (const [tt, txt] of Lst) if (t >= tt) { s = txt; t0 = tt; }
          return s.slice(0, clamp(Math.floor((t - t0) * 40), 0, s.length));
        };
        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };

        // ---------- per-frame render ----------
        function render(t) {
          const jm = drawFig(figs.tm, live(topMan, t, 0));
          const jw = drawFig(figs.tw, live(topWom, t, 1.7));
          drawFig(figs.bm, live(botMan, t, 0.6));
          const jbw = drawFig(figs.bw, live(botWom, t, 2.3));

          // top: her bubble grows while he listens, gone when they hold hands
          const sT = t < 0.3 ? 0 : backOut((t - 0.3) / 0.3) * lerp(0.9, 1.35, win(t, 2, 8)) * (1 - win(t, 8.1, 8.4));
          placeBubble(BT, [jw.head[0] - 30, jw.head[1] - 86 - 10 * win(t, 2, 8)], sT, t, true);
          // bottom: his ME bubble grows and pushes hers smaller until she stops
          const sW = t < 0.3 ? 0 : backOut((t - 0.3) / 0.3) * lerp(1, 0.4, win(t, 2.9, 6.8)) * (1 - win(t, 6.9, 7.2));
          placeBubble(BBW, [jbw.head[0] - 26, jbw.head[1] - 80], sW, t, true);
          const sM = t < 2.7 ? 0 : backOut((t - 2.7) / 0.3) * lerp(1, 1.55, win(t, 3, 8));
          placeBubble(BBM, [MAN.hip[0] + 84 + 30 * win(t, 3, 8), 368 - 14 * win(t, 3, 8)], sM, t, false);

          RT.cone.setAttribute("opacity", (0.55 + 0.25 * win(t, 8.4, 9.2)).toFixed(3));
          const hp = [712, 470];
          const hs = t > 8.8 ? backOut((t - 8.8) / 0.6) * (1 + 0.06 * Math.sin((t - 9.4) * 6)) : 0;
          heart.setAttribute("transform", `translate(${hp[0]} ${hp[1]}) scale(${(2 * hs).toFixed(3)})`);
          heart.setAttribute("opacity", t > 8.8 ? 1 : 0);
          heartGlow.setAttribute("cx", hp[0]);
          heartGlow.setAttribute("cy", hp[1]);
          heartGlow.setAttribute("opacity", (0.85 * clamp((t - 8.8) / 0.5, 0, 1)).toFixed(3));
          minis.forEach((m, k) => {
            const a = t - (9.3 + k * 0.6), vis = a > 0 && a < 2.2;
            m.setAttribute("transform", `translate(${r1(hp[0] + Math.sin(a * 3 + k * 2) * 26)} ${r1(hp[1] - 30 - a * 55)}) scale(0.7)`);
            m.setAttribute("opacity", vis ? (Math.sin((Math.PI * a) / 2.2) * 0.85).toFixed(3) : 0);
          });

          E("badgeTxt").textContent = String(1 + Math.floor(9 * ease(t / 9.5)));
          E("badgeArc").setAttribute("stroke-dashoffset", (339.3 * (1 - clamp(t / 9.5, 0, 1))).toFixed(1));
          E("sub-t").textContent = subAt(SUBT, t);
          E("sub-b").textContent = subAt(SUBB, t);
          E("sub-b").style.color = t > 7.4 ? "#ff4a3d" : "#d2d2d2";
          typed("h2", "ONE LISTENED.", t, 9.8, 26);
          typed("h3", "ONE WAITED TO TALK.", t, 10.8, 26);
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
