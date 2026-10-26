        // ---------- scene: unsaid words become bricks in a wall between two people ----------
        const W = E("world");
        const LBL = svgEl("g", {}, W.parentNode); // brick words sit outside #world so the reflection does not mirror them
        const wallG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const dustG = svgEl("g", {}, W);
        const WORDS = ["FINE.", "NOTHING.", "WHATEVER.", "NOT NOW.", "NEVER MIND.", "LATER."];
        const TB = [2.6, 3.9, 5.2, 6.5, 7.8, 9.0]; // landing times
        const SPK = [0, 1, 0, 1, 0, 1]; // who says it: 0 left, 1 right
        const BW = 150, BH = 46, WX = 400;
        const PX = [215, 585], FACE = [1, -1];
        const slot = TB.map((_, i) => [WX + (rnd() - 0.5) * 10, FL - BH * (i + 0.5), (rnd() - 0.5) * 3]);
        const bricks = WORDS.map((w, i) => {
          const g = svgEl("g", { opacity: 0 }, wallG);
          svgEl("rect", { x: -BW / 2, y: -BH / 2, width: BW, height: BH, rx: 5, fill: i === 5 ? "#c4302b" : "url(#ply)", stroke: "#000", "stroke-width": 3 }, g);
          svgEl("rect", { x: -BW / 2 + 4, y: -BH / 2 + 4, width: BW - 8, height: 5, rx: 2, fill: "#ffffff", opacity: 0.18 }, g);
          const tx = svgEl("text", { "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 21, "letter-spacing": 1, fill: i === 5 ? "#ffffff" : "#1c150b", opacity: 0 }, LBL);
          tx.textContent = w;
          return { g, tx };
        });
        const dust = TB.map(() => [0, 1, 2, 3, 4].map(() => svgEl("circle", { r: 5, fill: "url(#dustG)", opacity: 0 }, dustG)));
        const env = (p, a, b, c, d) => ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));
        const landed = (t) => TB.reduce((n, tb) => n + win(t, tb, tb + 0.5), 0);
        const HAND = (k) => [PX[k] + FACE[k] * 46, 410];
        function pose(k, t) {
          const nn = landed(t), f = FACE[k];
          const talk = win(t, 0.2, 0.6) * (1 - win(t, 1.8, 2.4));
          let aw = 0;
          TB.forEach((tb, i) => { if (SPK[i] === k) aw = Math.max(aw, env(t, tb - 1.15, tb - 0.8, tb - 0.5, tb - 0.2)); });
          const end = win(t, 9.3, 10.2);
          const s = standOn(PX[k], f, FL);
          const h = HAND(k);
          return {
            ...s,
            hy: s.hy + 3 * end,
            torso: 3 - 2.4 * nn + 7 * aw - 4 * end + 3 * talk * Math.sin(t * 2.4 + k),
            head: 2 + 3.2 * nn + 7 * end - 3 * aw,
            ash: 8 + 26 * talk * Math.sin(t * 3 + k * 2.1) + 22 * aw, ael: 12 + 14 * talk,
            bsh: -4 + 20 * talk * Math.sin(t * 2.6 + k), bel: 10,
            aw, atx: h[0], aty: h[1],
          };
        }
        const figs = [makeFig(figG, "#ffffff", "#e2e2e2", true, "figL"), makeFig(figG, "#dcdcdc", "#bcbcbc", true, "figR")];

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };
        const pad = (n) => String(n).padStart(2, "0");

        // ---------- per-frame render ----------
        function render(t) {
          const js = [0, 1].map((k) => drawFig(figs[k], livePose((tt) => pose(k, tt), t, 0.4 + k * 1.9), FACE[k]));
          bricks.forEach((b, i) => {
            const tb = TB[i], k = SPK[i], tHold = tb - 1.0, tThrow = tb - 0.5;
            let x, y, rot = slot[i][2], sc = 1, vis = 1;
            if (t < tHold) vis = 0;
            else if (t < tThrow) {
              const hnd = js[k].hands[0];
              x = hnd[0] + FACE[k] * 62; y = hnd[1] - 12; sc = 0.55 * backOut((t - tHold) / 0.3); rot = FACE[k] * -8;
            } else {
              const p = clamp((t - tThrow) / 0.5, 0, 1), h0 = HAND(k);
              const sx0 = h0[0] + FACE[k] * 62, sy0 = h0[1] - 12;
              x = lerp(sx0, slot[i][0], ease(p)); y = lerp(sy0, slot[i][1], p * p) - 70 * Math.sin(Math.PI * p) * (1 - p * 0.3);
              sc = lerp(0.55, 1, ease(p));
              rot = lerp(FACE[k] * -8, slot[i][2], p);
              if (p >= 1) y += 3 * Math.exp(-(t - tb) * 12) * Math.abs(Math.cos((t - tb) * 24));
            }
            if (!vis) { b.g.setAttribute("opacity", 0); b.tx.setAttribute("opacity", 0); return; }
            const tr = `translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${sc.toFixed(3)})`;
            b.g.setAttribute("transform", tr);
            b.g.setAttribute("opacity", 1);
            b.tx.setAttribute("transform", tr);
            b.tx.setAttribute("y", 7);
            b.tx.setAttribute("opacity", 1);
          });
          dust.forEach((ds, i) => ds.forEach((c, j) => {
            const a = (t - TB[i]) / 0.6;
            if (a <= 0 || a >= 1) { c.setAttribute("opacity", 0); return; }
            const dir = j < 2.5 ? -1 : 1, v = 30 + j * 10;
            c.setAttribute("cx", r1(WX + dir * (BW / 2 - 10 + v * a)));
            c.setAttribute("cy", r1(FL - 8 - 12 * a * (j % 2)));
            c.setAttribute("r", r1(5 + 9 * a));
            c.setAttribute("opacity", (0.55 * (1 - a)).toFixed(3));
          }));
          E("num").textContent = pad(TB.filter((tb) => t >= tb - 0.05).length);
          typed("h1", "NO ONE MEANT TO BUILD A WALL.", t, 9.8, 26);
          typed("h2", "THEY JUST STOPPED TALKING.", t, 11.2, 26);
        }
