        // ---------- "same rock": winner split-screen format (reel 36), mindset topic. Both walk into the same big rock and push. GROWTH: steps back, sees a step, climbs it, jumps up to the high ground, walks into the gold light. FIXED: kicks it, calls it a wall, sits down against it, stuck ----------
        E("svg").children[1].style.display = "none";
        const SVG = E("svg");
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- panel geometry: world 0..1233 x 98..815, ground at 600, high ground on the right ----------
        const PW = 1233, PY0 = 98, PY1 = 815, PK = 535 / 717, PX = 81;
        const RX = 640, RTOP = FL - 95, LEDGE = 800, LTOP = FL - 140;
        function makePanel(y0, id) {
          const clip = svgEl("clipPath", { id: "clip" + id }, SVG.querySelector("defs"));
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0 }, clip);
          const g = svgEl("g", { transform: `translate(${PX} ${y0}) scale(${PK}) translate(0 ${-PY0})` }, SVG);
          const inner = svgEl("g", { "clip-path": `url(#clip${id})` }, g);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "url(#panelBg)" }, inner);
          const beams = svgEl("g", {}, inner);
          for (const bx of [300, 1050]) svgEl("polygon", { points: `${bx - 50},${PY0} ${bx + 50},${PY0} ${bx + 150},${FL} ${bx - 150},${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.28 }, beams);
          const gold = svgEl("ellipse", { cx: 1060, cy: LTOP - 60, rx: 420, ry: 300, fill: "url(#fireGlow)", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: FL, width: PW, height: PY1 - FL, fill: "url(#ground)" }, inner);
          svgEl("rect", { x: 0, y: FL - 2, width: PW, height: 3, fill: "#8a8172" }, inner);
          // the high ground
          svgEl("path", { d: `M${LEDGE} ${PY1} L${LEDGE - 6} ${LTOP + 90} L${LEDGE + 8} ${LTOP + 30} L${LEDGE} ${LTOP} L${PW + 10} ${LTOP} L${PW + 10} ${PY1} Z`, fill: "url(#cliff)", stroke: "#000", "stroke-width": 5 }, inner);
          // the rock
          svgEl("path", { d: `M${RX - 120} ${FL + 2} Q${RX - 132} ${RTOP + 40} ${RX - 70} ${RTOP + 6} Q${RX} ${RTOP - 14} ${RX + 74} ${RTOP + 8} Q${RX + 128} ${RTOP + 46} ${RX + 116} ${FL + 2} Z`, fill: "#7a7a80", stroke: "#000", "stroke-width": 6 }, inner);
          svgEl("path", { d: `M${RX - 40} ${RTOP + 30} l20 34 l-16 30 M${RX + 50} ${RTOP + 50} l-14 26`, fill: "none", stroke: "#4a4a50", "stroke-width": 5, "stroke-linecap": "round" }, inner);
          svgEl("path", { d: `M${RX - 80} ${RTOP + 22} Q${RX - 10} ${RTOP} ${RX + 60} ${RTOP + 18}`, fill: "none", stroke: "#9a9aa2", "stroke-width": 5, "stroke-linecap": "round" }, inner);
          const figs = svgEl("g", {}, inner);
          const fx = svgEl("g", {}, inner);
          const dark = svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "#05070c", opacity: 0 }, inner);
          svgEl("rect", { x: 0, y: PY0, width: PW, height: PY1 - PY0, fill: "none", stroke: "#2c2c30", "stroke-width": 5 }, g);
          return { beams, gold, figs, fx, dark };
        }
        const top = makePanel(412, "T");
        const bot = makePanel(1010, "B");

        // ---------- poses ----------
        function feetOn(x0, hx, ST, lift, fy = FL) {
          const p = (hx - x0) / ST;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * ST * (0.25 - q), fy];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * ST * (-0.25 + 0.5 * ease(ss)), fy - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x, fy = FL) => {
          const ft = feetOn(x0, x, 120, 14, fy), sw = Math.sin((Math.PI * 2 * (x - x0)) / 120), sy = fy - Math.sqrt(LEG * LEG - 15 * 15);
          return base({ hx: x, hy: sy + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 30 * sw, ael: 20, bsh: -4 - 30 * sw, bel: 20 });
        };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function hop(t, t0, d, x0, y0, x1, y1, f, h) {
          const p = clamp((t - t0) / d, 0, 1), e = ease(p), tuck = Math.sin(Math.PI * p);
          const st = standOn(lerp(x0, x1, e), f, lerp(y0, y1, e) - tuck * h);
          st.ay -= 40 * tuck; st.by -= 48 * tuck; st.ax += f * 16 * tuck; st.bx -= f * 8 * tuck;
          st.ash = 8 + 120 * tuck; st.bsh = 8 + 110 * tuck; st.torso = 3 + 10 * tuck;
          return st;
        }
        const PUSHX = RX - 168;
        const pushPose = (t) => { const st = standOn(PUSHX, 1, FL); st.torso = 30 + 4 * Math.sin(t * 9); st.hx -= 18; st.bx -= 40; st.ax -= 10; reachTo(st, 1, [RX - 118, FL - 80]); reachTo(st, 1, [RX - 116, FL - 60], "b"); st.head = -10; return st; };

        // ---------- beats ----------
        const T_AT = 1.5, T_PUSH = 1.6, T_PUSH1 = 2.9;
        const T_LOOK = 3.05, T_CLIMB = 3.6, T_ONROCK = 4.15, T_JUMP = 4.7, T_LAND = 5.25, T_WALKUP = 5.4, T_FIST = 6.4;
        const T_KICK = 3.05, T_SIT = 3.9, T_STUCK = 6.4;
        const T_TEXT1 = 9.0, T_TEXT2 = 9.8, T_CARD = 11.6;

        // growth: same start, then steps back, looks up, climbs, jumps up, walks into the light
        function topRaw(t) {
          if (t < T_AT) return walking(60, lerp(60, PUSHX, ease(t / T_AT)));
          if (t < T_PUSH1) return mixPose(standOn(PUSHX, 1, FL), pushPose(t), win(t, T_AT, T_PUSH));
          if (t < T_CLIMB) {
            const st = standOn(PUSHX - 30 * win(t, T_PUSH1, T_LOOK), 1, FL);
            const look = win(t, T_LOOK, T_LOOK + 0.3);
            st.head = -26 * look; st.torso = -4 * look;
            reachTo(st, hold(t, T_LOOK + 0.2, T_CLIMB, 0.15), [PUSHX + 40, stand - 190]);   // points up: a step!
            return mixPose(pushPose(t), st, win(t, T_PUSH1, T_PUSH1 + 0.2));
          }
          if (t < T_ONROCK) { const h = hop(t, T_CLIMB, T_ONROCK - T_CLIMB, PUSHX - 30, FL, RX - 10, RTOP + 4, 1, 40); reachTo(h, Math.sin(Math.PI * clamp((t - T_CLIMB) / 0.4, 0, 1)), [RX - 70, RTOP + 10]); return h; }
          if (t < T_JUMP) { const st = standOn(RX - 10, 1, RTOP + 4); const k = Math.sin(Math.PI * clamp((t - T_JUMP + 0.3) / 0.3, 0, 1)); st.hy += 30 * k; st.torso += 20 * k; return st; }
          if (t < T_LAND) return hop(t, T_JUMP, T_LAND - T_JUMP, RX - 10, RTOP + 4, LEDGE + 70, LTOP, 1, 22);
          if (t < T_WALKUP) { const st = standOn(LEDGE + 70, 1, LTOP); st.hy += 26 * (1 - win(t, T_LAND, T_WALKUP)); st.torso = 16 * (1 - win(t, T_LAND, T_WALKUP)); return st; }
          if (t < T_FIST) return walking(LEDGE + 70, lerp(LEDGE + 70, 1010, ease((t - T_WALKUP) / (T_FIST - T_WALKUP))), LTOP);
          const st = standOn(1010, 1, LTOP); st.torso = -4; st.head = -12;
          reachTo(st, win(t, T_FIST, T_FIST + 0.3), [1075, LTOP - 430]);
          return st;
        }
        // fixed: same start, kicks the rock, sits down against it, head down
        function botRaw(t) {
          if (t < T_AT) return walking(60, lerp(60, PUSHX, ease(t / T_AT)));
          if (t < T_PUSH1) return mixPose(standOn(PUSHX, 1, FL), pushPose(t), win(t, T_AT, T_PUSH));
          if (t < T_SIT) {
            const st = standOn(PUSHX - 20, 1, FL);
            const kick = Math.sin(Math.PI * clamp((t - T_KICK) / 0.35, 0, 1));
            st.ax = lerp(st.ax, RX - 120, kick); st.ay = lerp(st.ay, FL - 40, kick); st.torso = -8 * kick;
            // throws his arms up: "a wall"
            const arms = hold(t, T_KICK + 0.35, T_SIT, 0.15);
            reachTo(st, arms, [PUSHX - 70, stand - 170]); reachTo(st, arms, [PUSHX + 30, stand - 170], "b");
            return mixPose(pushPose(t), st, win(t, T_PUSH1, T_PUSH1 + 0.2));
          }
          const sx = PUSHX - 40;
          const sit = base({ hx: sx, hy: FL - 30, torso: -16, head: 40, ax: sx - 88, ay: FL, bx: sx - 74, by: FL, aw: 1, atx: sx - 76, aty: FL - 86, bw: 1, btx: sx - 66, bty: FL - 80 });
          sit.torso += 2 * Math.sin(t * 2.2);
          return mixPose(standOn(PUSHX - 20, 1, FL), sit, win(t, T_SIT, T_SIT + 0.6));
        }
        const botF = (t) => (t >= T_SIT + 0.3 ? -1 : 1);

        const tMan = makeFig(top.figs, "#ffffff", "#dedede", true, "tMan");
        const bMan = makeFig(bot.figs, "#9a9a9a", "#7e7e7e", false, "bMan");
        const sparks = Array.from({ length: 10 }, () => svgEl("circle", { r: 5, fill: "#ffd060", opacity: 0 }, top.fx));
        const cloud = svgEl("g", { opacity: 0 }, bot.fx);
        for (const [x, y, r] of [[-40, 0, 34], [0, -16, 42], [44, 0, 34], [0, 10, 34]]) svgEl("circle", { cx: x, cy: y, r, fill: "#4a4e58", stroke: "#000", "stroke-width": 4 }, cloud);
        const drops = Array.from({ length: 10 }, () => svgEl("line", { stroke: "#7d93b5", "stroke-width": 3, opacity: 0 }, bot.fx));

        // ---------- labels (typed) ----------
        const label = (x, y, size, col) => { const d = document.createElement("div"); d.className = "mono"; d.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:0.16em;color:${col}`; E("stage").appendChild(d); return d; };
        const topT = label(PX + 44, 412 + 26, 30, "#ffffff"), topS = label(PX + 44, 412 + 66, 19, "#c8c8c8");
        const botT = label(PX + 44, 1010 + 26, 30, "#a8a8a8"), botS = label(PX + 44, 1010 + 66, 19, "#a8a8a8");
        topT.textContent = "GROWTH MINDSET"; botT.textContent = "FIXED MINDSET";
        topT.style.textShadow = "0 0 12px rgba(255,255,255,0.35)";
        const typed = (seq, t, cps = 16) => { let cur = null; for (const s of seq) if (t >= s[0]) cur = s; if (!cur) return ["", "#c8c8c8"]; const n = Math.floor((t - cur[0]) * cps); return [cur[1].slice(0, n), cur[2] || null]; };
        const TOPSEQ = [[0.45, "A ROCK"], [T_LOOK + 0.2, "A STEP", "#ffd060"], [T_FIST, "HIGHER", "#ffd060"]];
        const BOTSEQ = [[0.45, "A ROCK"], [T_KICK + 0.3, "A WALL", "#ff3b30"], [T_STUCK, "STUCK", "#ff3b30"]];
        const HEAD = [[0, "SAME ROCK."], [T_TEXT1, "ONE SAW A WALL."], [T_TEXT2, "ONE SAW A STEP."]];
        E("head").style.top = "236px";
        E("head").style.fontSize = "30px";
        E("head").style.letterSpacing = "0.16em";
        E("head").style.lineHeight = "1.6";

        // ---------- end card ----------
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:100px;right:100px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:56px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:26px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"WHETHER YOU THINK YOU CAN,<br/>OR YOU THINK YOU CAN'T,<br/>YOU'RE RIGHT."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">HENRY FORD</div></div>`;
        const cardCss = document.createElement("style");
        cardCss.textContent = "#card span.w { display: inline-block; margin: 0 0.16em; }";
        document.head.appendChild(cardCss);
        E("stage").appendChild(card);
        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ffd060;" : ""}">${w}</span>`;
        }).join("");
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        // ---------- per-frame render ----------
        function render(t) {
          const tp = drawFig(tMan, livePose(topRaw, t, 0.4), 1);
          drawFig(bMan, livePose(botRaw, t, 1.3), botF(t));
          // gold light on the high ground once he is up there, sparks around his fist
          const g = win(t, T_LAND - 0.2, T_FIST + 0.6);
          top.gold.setAttribute("opacity", (0.95 * g * (0.94 + 0.06 * Math.sin(t * 5))).toFixed(3));
          sparks.forEach((s, j) => {
            const p = frac(t * 0.6 + j / 10), on = t > T_FIST + 0.2;
            s.setAttribute("cx", r1(tp.hands[0][0] + 60 * Math.cos(j * 2.4) * p));
            s.setAttribute("cy", r1(tp.hands[0][1] + 10 - 120 * p));
            s.setAttribute("opacity", on ? (Math.sin(Math.PI * p) * 0.9).toFixed(3) : 0);
          });
          // bottom: it gets darker, a rain cloud over him
          bot.dark.setAttribute("opacity", (0.4 * win(t, T_SIT, T_STUCK + 0.6)).toFixed(3));
          const ck = win(t, T_SIT + 0.4, T_SIT + 1.2);
          const cx = PUSHX - 40, cy = FL - 300;
          cloud.setAttribute("opacity", ck.toFixed(3)); cloud.setAttribute("transform", `translate(${r1(cx + 6 * Math.sin(t))} ${r1(cy)})`);
          drops.forEach((d, j) => { const p = frac(t * 1.4 + j / 10), x = cx - 50 + j * 11; d.setAttribute("x1", r1(x)); d.setAttribute("x2", r1(x - 4)); d.setAttribute("y1", r1(cy + 30 + p * 200)); d.setAttribute("y2", r1(cy + 50 + p * 200)); d.setAttribute("opacity", (ck * 0.7).toFixed(3)); });

          topS.textContent = typed(TOPSEQ, t)[0];
          const [ts, tc] = typed(TOPSEQ, t); topS.style.color = tc || "#c8c8c8";
          const [bs, bc] = typed(BOTSEQ, t);
          botS.textContent = bs; botS.style.color = bc || "#a8a8a8";
          E("head").innerHTML = HEAD.map(([t0, s], i) => `<div>${i === 0 ? s : s.slice(0, Math.max(0, Math.floor((t - t0) * 30)))}&nbsp;</div>`).join("");

          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["THE", "ROCK", "IS", "THE", "SAME."], [T_CARD, T_CARD + 0.12, T_CARD + 0.24, T_CARD + 0.36, T_CARD + 0.48], t, []);
          E("cm2").innerHTML = slam(["YOUR", "MIND", "ISN'T."], [T_CARD + 0.85, T_CARD + 1.0, T_CARD + 1.15], t, [1]);
          E("cq").style.opacity = win(t, T_CARD + 1.6, T_CARD + 2.1).toFixed(3);
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
