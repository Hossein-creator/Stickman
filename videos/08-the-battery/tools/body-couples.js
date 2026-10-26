        // ---------- the couples ----------
        // top: turned toward each other; bottom: turned away, each on a phone
        const TM = { hip: [625, 598], feet: [[700, FL], [716, FL]], lap: [[668, 590], [656, 594]] };
        const TW = { hip: [805, 598], feet: [[748, FL], [732, FL]], lap: [[762, 590], [774, 594]] };
        const BM = { hip: [560, 598], feet: [[486, FL], [470, FL]], lap: [[516, 590], [528, 594]] };
        const BW = { hip: [880, 598], feet: [[954, FL], [970, FL]], lap: [[922, 590], [910, 594]] };
        const HANDS = [715, 572];
        const laugh = (t, a, b) => (t > a && t < b ? Math.abs(Math.sin((t - a) * 22)) * 4 * (1 - (t - a) / (b - a)) : 0);
        function topMan(t) {
          const q = keyAt([[0, { torso: 4, head: 0 }], [0.6, { torso: 4, head: 0 }], [1.0, { torso: 10, head: 4 }], [2.4, { torso: 10, head: 4 }], [2.8, { torso: 2, head: -12 }], [3.8, { torso: 2, head: -12 }], [4.2, { torso: 6, head: 2 }], [4.6, { torso: 6, head: 2 }], [5.1, { torso: 20, head: 6 }], [DUR, { torso: 20, head: 6 }]], t);
          const hf = path([[0.6, TM.lap[0]], [1.0, HANDS], [2.4, HANDS], [2.8, TM.lap[0]], [4.6, TM.lap[0]], [5.1, [792, 476]]], t);
          return { hip: [TM.hip[0], TM.hip[1] - laugh(t, 2.6, 3.9)], f: 1, torso: q.torso, head: q.head, feet: TM.feet, arms: [{ t: hf }, { t: TM.lap[1] }] };
        }
        function topWom(t) {
          const q = keyAt([[0, { torso: 4, head: 0 }], [0.6, { torso: 4, head: 0 }], [1.0, { torso: 8, head: 4 }], [2.4, { torso: 8, head: 4 }], [2.8, { torso: 0, head: -14 }], [3.8, { torso: 0, head: -14 }], [4.2, { torso: 4, head: 0 }], [4.8, { torso: 4, head: 0 }], [5.3, { torso: 16, head: 16 }], [DUR, { torso: 16, head: 16 }]], t);
          const hf = path([[0.6, TW.lap[0]], [1.0, HANDS], [2.4, HANDS], [2.8, TW.lap[0]], [4.8, TW.lap[0]], [5.3, [690, 520]]], t);
          return { hip: [TW.hip[0], TW.hip[1] - laugh(t, 2.65, 3.9)], f: -1, torso: q.torso, head: q.head, feet: TW.feet, arms: [{ t: hf }, { t: TW.lap[1] }] };
        }
        const PHM = [498, 506], PHW = [942, 506];
        function botMan(t) {
          const on = win(t, 0.3, 0.7);
          const hf = path([[0.3, BM.lap[0]], [0.7, PHM]], t);
          return { hip: [BM.hip[0], BM.hip[1] - laugh(t, 4.6, 5.9)], f: -1, torso: 4 + 8 * on, head: 28 * on - (t > 4.6 && t < 5.9 ? 14 : 0) * win(t, 4.6, 4.8), feet: BM.feet, arms: [{ t: hf }, { t: BM.lap[1] }] };
        }
        function botWom(t) {
          const on = win(t, 0.4, 0.8);
          const reach = win(t, 2.4, 2.9) * (1 - win(t, 3.7, 4.1));
          const q = keyAt([[0, { torso: 4, head: 0 }], [7.0, { torso: 4, head: 0 }], [7.5, { torso: -4, head: 0 }], [DUR, { torso: -4, head: 0 }]], t);
          const hf = path([[0.4, BW.lap[0]], [0.8, PHW], [7.0, PHW], [7.4, BW.lap[0]]], t);
          const hb = lerp2(BW.lap[1], [722, 586], reach);
          const head = 30 * on * (1 - reach) - 16 * reach + (t > 7.0 ? 8 * win(t, 7.0, 7.5) : 0);
          return { hip: BW.hip, f: 1, torso: q.torso + 6 * on - 8 * reach, head, feet: BW.feet, arms: [{ t: hf }, { t: hb }] };
        }
        const figs = {
          tm: makeFig(RT.figs, "#ffffff", "#e2e2e2", false, true, "tm"),
          tw: makeFig(RT.figs, "#ffffff", "#e2e2e2", true, true, "tw"),
          bm: makeFig(RB.figs, "#9a9a9a", "#7c7c7c", false, false, "bm"),
          bw: makeFig(RB.figs, "#9a9a9a", "#7c7c7c", true, false, "bw"),
        };
        const phones = [0, 1].map(() => {
          const glow = svgEl("circle", { r: 110, fill: "url(#phoneGlow)", opacity: 0 }, RB.fx);
          const ph = svgEl("g", {}, RB.fx);
          svgEl("rect", { x: -11, y: -19, width: 22, height: 38, rx: 4, fill: "#111", stroke: "#000", "stroke-width": 2 }, ph);
          svgEl("rect", { x: -8, y: -15, width: 16, height: 30, rx: 2, fill: "#9cc4ff" }, ph);
          return { glow, ph };
        });

        // ---------- labels ----------
        const SUBT = [[0.6, "HOLDS HER HAND"], [2.6, "MAKES HER LAUGH"], [4.6, "A HUG"], [5.6, "FULL"]];
        const SUBB = [[0.4, "PHONES"], [2.4, "HER HAND"], [3.4, "IGNORED"], [4.6, "HE LAUGHS ALONE"], [7.2, "EMPTY"]];
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
          drawFig(figs.tm, live(topMan, t, 0));
          drawFig(figs.tw, live(topWom, t, 1.7));
          const jbm = drawFig(figs.bm, live(botMan, t, 0.6));
          const jbw = drawFig(figs.bw, live(botWom, t, 2.3));
          [jbm.hands[0], t < 7.2 ? jbw.hands[0] : null].forEach((h, i) => {
            const p = phones[i], on = t > (i ? 0.6 : 0.5) && h;
            p.ph.setAttribute("opacity", on ? 1 : 0);
            p.glow.setAttribute("opacity", on ? (0.75 + 0.15 * Math.sin(t * (8 + i * 3))).toFixed(3) : 0);
            if (h) {
              p.ph.setAttribute("transform", `translate(${r1(h[0])} ${r1(h[1])}) rotate(${i ? 10 : -10})`);
              p.glow.setAttribute("cx", r1(h[0]));
              p.glow.setAttribute("cy", r1(h[1]));
            }
          });
          battery(RT, LT, t, true);
          battery(RB, LB, t, false);
          RT.glow.setAttribute("opacity", (0.8 + 0.15 * win(t, 5.2, 6)).toFixed(3));

          E("badgeTxt").textContent = String(1 + Math.floor(51 * ease(t / 9.5)));
          E("badgeArc").setAttribute("stroke-dashoffset", (339.3 * (1 - clamp(t / 9.5, 0, 1))).toFixed(1));
          E("sub-t").textContent = subAt(SUBT, t);
          E("sub-b").textContent = subAt(SUBB, t);
          E("sub-b").style.color = t > 7.2 ? "#ff4a3d" : "#d2d2d2";
          typed("h2", "SMALL THINGS CHARGE IT.", t, 9.8, 26);
          typed("h3", "SMALL THINGS DRAIN IT.", t, 10.9, 26);
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
