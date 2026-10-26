        // ---------- scene ----------
        const beams = E("beams");
        const beam = svgEl("polygon", { points: "330,-90 470,-90 640,600 160,600", fill: "url(#beam)", filter: "url(#soft)", opacity: 0.45 }, beams);
        const W = E("world");
        const pileG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const stackG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);

        // ---------- the walk with a growing load ----------
        const WORDS = ["WHAT IF", "THE PAST", "THEIR OPINION", "TOO LATE", "NOT ENOUGH"];
        const DROP = [1.2, 2.4, 3.6, 4.8, 6.0];
        const RELEASE = 8.2, X0 = 150, X1 = 420, STRIDE = 64;
        const load = (t) => DROP.reduce((n, d) => n + ease((t - d - 0.25) / 0.35), 0) * (1 - win(t, RELEASE + 0.15, RELEASE + 0.5));
        const hipX = (t) => X0 + (X1 - X0) * (1 - Math.pow(1 - clamp(t / 7.6, 0, 1), 1.7));
        const frac = (v) => v - Math.floor(v);
        function heroRaw(t) {
          const n = load(t) / 5; // 0..1 how much he carries
          const hx = hipX(t), p = (hx - X0) / STRIDE;
          const walking = t < 7.6;
          const feet = [0, 0.5].map((o) => {
            const q = frac(p + o);
            if (!walking) return [hx + (o ? -14 : 16), FL];
            if (q < 0.5) return [hx + STRIDE * (0.25 - q), FL];
            const s = (q - 0.5) / 0.5;
            return [hx + STRIDE * (-0.25 + 0.5 * ease(s)), FL - Math.sin(Math.PI * s) * (16 - 8 * n)];
          });
          const bob = walking ? 4 * Math.abs(Math.cos(Math.PI * 2 * p)) : 0;
          const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);
          const up = win(t, RELEASE + 0.4, RELEASE + 1.4);
          const bend = n * (1 - up);
          return {
            hx, hy: stand + 34 * bend + bob, torso: 6 + 50 * bend, head: -6 - 26 * bend + 6 * up,
            ax: feet[0][0], ay: feet[0][1], bx: feet[1][0], by: feet[1][1],
            // hands grip the straps while loaded, hang loose after
            ash: lerp(70, 8, up), ael: lerp(-80, 12, up), aw: 0, atx: 0, aty: 0,
            bsh: lerp(40, -4, up), bel: lerp(-70, 10, up), bw: 0, btx: 0, bty: 0,
          };
        }
        const hero = makeFig(figG, "#ffffff", "#e2e2e2", true, "hero");

        // thought bricks: fall onto his back and stack outward from it, slide off at the release
        const bricks = WORDS.map((w) => {
          const g = svgEl("g", { opacity: 0 }, stackG);
          const bw = 30 + w.length * 10.5;
          const rect = svgEl("rect", { x: -bw / 2, y: -17, width: bw, height: 34, rx: 6, fill: "#2a2a2e", stroke: "#000", "stroke-width": 3 }, g);
          const tx = svgEl("text", { x: 0, y: 6, "text-anchor": "middle", "font-family": "HFMono", "font-weight": 700, "font-size": 16, fill: "#f2f2f2", "letter-spacing": 1.5 }, g);
          tx.textContent = w;
          return { g, rect, tx, bw };
        });
        const PILE = [[268, FL - 17, -8], [330, FL - 17, 6], [296, FL - 51, -3], [214, FL - 17, 12], [352, FL - 51, -14]];
        const dust = [-1, 0, 1].map(() => svgEl("ellipse", { rx: 10, ry: 6, fill: "url(#dustG)", opacity: 0 }, fxG));
        function slotOf(s, k) {
          const a = rad(s.torso), tu = [Math.sin(a), -Math.cos(a)], nb = [-Math.cos(a), -Math.sin(a)];
          const c = [s.hx + tu[0] * 74 + nb[0] * (34 + 36 * k), s.hy + tu[1] * 74 + nb[1] * (34 + 36 * k)];
          return { c, rot: s.torso - 90 };
        }

        const typed = (id, text, t, t0, cps) => {
          const n = clamp(Math.floor((t - t0) * cps), 0, text.length);
          E(id).innerHTML = "<span>" + text.slice(0, n) + '</span><span class="ghost">' + text.slice(n) + "</span>";
        };

        // ---------- per-frame render ----------
        function render(t) {
          const s = livePose(heroRaw, t, 0.4);
          drawFig(hero, s, 1);
          bricks.forEach((b, k) => {
            const d = DROP[k];
            if (t < d) return b.g.setAttribute("opacity", 0);
            b.g.setAttribute("opacity", 1);
            const slot = slotOf(s, k);
            let c = slot.c, rot = slot.rot;
            const fall = (t - d) / 0.35;
            if (fall < 1) {
              const q = clamp(fall, 0, 1);
              c = [slot.c[0], lerp(-80, slot.c[1], q * q)];
              rot = lerp(slot.rot + 25, slot.rot, q);
            } else if (fall < 1.6) {
              c = [c[0], c[1] - Math.sin(((fall - 1) / 0.6) * Math.PI) * 8];
            }
            const r = (t - RELEASE - 0.05 * k) / 0.55;
            if (r > 0) {
              const q = clamp(r, 0, 1), pl = PILE[k];
              c = [lerp(slot.c[0], pl[0], q), lerp(slot.c[1], pl[1], q * q) - Math.sin(Math.PI * q) * 30];
              rot = lerp(slot.rot, pl[2], q);
              if (r >= 1) { c = [pl[0], pl[1]]; rot = pl[2]; }
            }
            b.g.setAttribute("transform", `translate(${r1(c[0])} ${r1(c[1])}) rotate(${r1(rot)})`);
            const grey = win(t, RELEASE + 1.0, RELEASE + 2.0);
            b.tx.setAttribute("fill", hexLerp("#f2f2f2", "#5a5a5a", grey));
            b.rect.setAttribute("fill", hexLerp("#2a2a2e", "#1a1a1c", grey));
          });
          const da = (t - (RELEASE + 0.55)) / 0.8;
          dust.forEach((c, j) => {
            const dir = j - 1, g = ease(da);
            c.setAttribute("cx", r1(285 + dir * 70 * g));
            c.setAttribute("cy", r1(FL - 10 - (dir === 0 ? 20 : 8) * g));
            c.setAttribute("rx", r1(20 + 50 * g));
            c.setAttribute("ry", r1(10 + 16 * g));
            c.setAttribute("opacity", da > 0 && da < 1 ? (0.7 * (1 - da)).toFixed(3) : 0);
          });
          beam.setAttribute("opacity", (0.45 - 0.15 * (load(t) / 5) + 0.5 * win(t, RELEASE + 0.6, RELEASE + 1.6)).toFixed(3));
          typed("h1", "YOU WERE NEVER TOO WEAK.", t, 9.8, 26);
          typed("h2", "YOU WERE CARRYING TOO MUCH.", t, 11.0, 26);
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
