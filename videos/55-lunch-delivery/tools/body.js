        // ---------- "lunch delivery": he drowns in paperwork, 12:00, 1:30, 3:00, his stomach growls, he keeps typing. She walks in with a lunch box, pushes the papers away, feeds him a bite. The coworker peeks over the wall with a sad sandwich ----------
        // remake of a 4.1x outlier (Shreya Bloom, "Mehak brings lunch for Rishi at his office"), see viral/2026-11-01-check.md
        const cam = E("svg").children[1];
        for (const el of Array.from(cam.children)) {
          const fill = el.getAttribute("fill") || "";
          if (fill.includes("floorFade") || fill === "#2a2a2a") { el.setAttribute("x", -1400); el.setAttribute("width", 3400); }
        }
        const W = E("world");
        const backG = E("back");
        const beams = E("beams");
        const roomG = svgEl("g", {}, W);
        const figG = svgEl("g", {}, W);
        const deskG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_T1 = 1.2, T_T2 = 2.2, T_GROWL = 2.7, T_IN = 3.8, T_AT = 4.8, T_TAP = 4.9, T_LOOK = 5.1, T_PUSH = 5.5, T_SET = 6.0, T_FEED = 6.6, T_SMILE = 7.5, T_PEEK = 8.0, T_KISS = 9.0, T_BYE = 9.6;
        const T_H1 = 10.6, T_H2 = 11.5, T_CARD = 12.8;
        const HX = 470, D0 = 540, D1 = 820, DT = FL - 112, SHEX = 330, WALL = 900;
        const CLOCK = (s) => (s < T_T1 ? "12:00" : s < T_T2 ? "1:30 PM" : s < T_IN ? "3:00 PM" : "3:12 PM");

        // ---------- office ----------
        svgEl("rect", { x: 300, y: FL - 470, width: 260, height: 160, fill: "#7aa8d8", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("polygon", { points: `300,${FL - 470} 560,${FL - 470} 680,${FL} 180,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.14 }, beams);
        const warm = svgEl("ellipse", { cx: 560, cy: FL - 160, rx: 320, ry: 230, fill: "url(#fireGlow)", opacity: 0 }, backG);
        // cubicle wall + coworker behind it
        const cow = makeFig(roomG, "#bdbdbd", "#a5a5a5", false, "cow");
        svgEl("rect", { x: WALL, y: FL - 270, width: 26, height: 270, fill: "#5a6070", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: WALL, y: FL - 270, width: 300, height: 270, fill: "#4a5060", stroke: "#000", "stroke-width": 5 }, roomG);
        const sandwich = svgEl("g", { opacity: 0 }, roomG);
        svgEl("path", { d: "M-24 0 L24 0 L24 -10 L-24 -10 Z", fill: "#e8d0a0", stroke: "#000", "stroke-width": 3 }, sandwich);
        svgEl("path", { d: "M-24 -10 L24 -10 L20 -16 L-20 -16 Z", fill: "#7ac06a", stroke: "#000", "stroke-width": 3 }, sandwich);
        // desk, computer, chair
        svgEl("rect", { x: D0, y: DT, width: D1 - D0, height: 14, rx: 3, fill: "#5a4330", stroke: "#000", "stroke-width": 4 }, deskG);
        for (const lx of [D0 + 16, D1 - 28]) svgEl("rect", { x: lx, y: DT + 14, width: 12, height: FL - DT - 14, fill: "#5a4330", stroke: "#000", "stroke-width": 3 }, deskG);
        svgEl("rect", { x: D0 + 150, y: DT - 110, width: 120, height: 86, rx: 6, fill: "#222", stroke: "#000", "stroke-width": 4 }, deskG);
        const screen = svgEl("rect", { x: D0 + 158, y: DT - 102, width: 104, height: 70, fill: "#4a7ad0" }, deskG);
        svgEl("rect", { x: D0 + 200, y: DT - 24, width: 20, height: 24, fill: "#333", stroke: "#000", "stroke-width": 3 }, deskG);
        svgEl("rect", { x: HX - 36, y: FL - 82, width: 72, height: 12, rx: 3, fill: "#333", stroke: "#000", "stroke-width": 4 }, roomG);
        svgEl("rect", { x: HX - 6, y: FL - 70, width: 12, height: 70, fill: "#333" }, roomG);
        // paper piles that grow
        const piles = [D0 + 40, D0 + 100].map((x) => ({ x, sheets: Array.from({ length: 9 }, (_, i) => svgEl("rect", { x: x - 30, y: DT - 7 - i * 7, width: 60, height: 7, fill: i % 2 ? "#f0f0f0" : "#e0e0e0", stroke: "#000", "stroke-width": 2, opacity: 0 }, deskG)) }));

        // ---------- people + props ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const lunch = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -40, y: -34, width: 80, height: 34, rx: 6, fill: "#c0503a", stroke: "#000", "stroke-width": 4 }, lunch);
        const food = svgEl("g", { opacity: 0 }, lunch);
        svgEl("ellipse", { cx: -16, cy: -30, rx: 18, ry: 8, fill: "#fbfbf5", stroke: "#000", "stroke-width": 3 }, food);
        svgEl("circle", { cx: 16, cy: -32, r: 10, fill: "#fff", stroke: "#000", "stroke-width": 3 }, food);
        svgEl("circle", { cx: 16, cy: -32, r: 4, fill: "#ffc020" }, food);
        const lunchLid = svgEl("rect", { x: -42, y: -42, width: 84, height: 10, rx: 4, fill: "#d8604a", stroke: "#000", "stroke-width": 4 }, lunch);
        const spoon = svgEl("path", { fill: "none", stroke: "#cfcfcf", "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, fxG);
        const bite = svgEl("ellipse", { rx: 8, ry: 5, fill: "#fbfbf5", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const growl = Array.from({ length: 3 }, () => svgEl("path", { fill: "none", stroke: "#ffcf5a", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, fxG));
        const sweat = Array.from({ length: 2 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const kissH = svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const bubble = (txt, w, size = 32) => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: "#111", "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bSay = bubble("SAY \"AAH\"", 220), bSigh = bubble("SIGH...", 150, 28);

        // ---------- poses ----------
        function feetOn(x0, hx, STR, lift) {
          const p = (hx - x0) / STR;
          return [0, 0.5].map((o) => {
            const q = frac(Math.abs(p) + o + 1e-6), d = Math.sign(hx - x0) || 1;
            if (q < 0.5) return [hx + d * STR * (0.25 - q), FL];
            const ss = (q - 0.5) / 0.5;
            return [hx + d * STR * (-0.25 + 0.5 * ease(ss)), FL - Math.sin(Math.PI * ss) * lift];
          });
        }
        const walking = (x0, x) => { const ft = feetOn(x0, x, 110, 12), sw = Math.sin((Math.PI * 2 * (x - x0)) / 110); return base({ hx: x, hy: stand + 3 + 3 * Math.abs(sw), torso: 4, head: 2, ax: ft[0][0], ay: ft[0][1], bx: ft[1][0], by: ft[1][1], ash: 8 + 26 * sw, ael: 20, bsh: -4 - 26 * sw, bel: 20 }); };
        const reachTo = (s, k, p, hand = "a") => { s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        function himRaw(s) {
          const st = base({ hx: HX, hy: FL - 90, torso: 14, head: 10, ax: HX + 62, ay: FL, bx: HX + 50, by: FL, aw: 1, atx: D0 + 150 + 14 * Math.sin(s * 22), aty: DT - 8, bw: 1, btx: D0 + 130 + 14 * Math.cos(s * 19), bty: DT - 6 });
          const typing = 1 - win(s, T_LOOK, T_LOOK + 0.2);
          st.atx = lerp(D0 + 120, st.atx, typing); st.btx = lerp(D0 + 100, st.btx, typing);
          st.torso += 10 * win(s, 0, T_IN) * typing; st.head += 6 * win(s, 0, T_IN) * typing;
          const gr = hold(s, T_GROWL, T_GROWL + 0.7, 0.15); reachTo(st, gr, [HX + 30, FL - 150], "b");
          const look = win(s, T_LOOK, T_LOOK + 0.25); st.torso = lerp(st.torso, 2, look); st.head = lerp(st.head, -14, look);
          // eats the bite, smiles
          const eat = hold(s, T_FEED + 0.4, T_FEED + 0.8, 0.1); st.head -= 10 * eat;
          const sm = win(s, T_SMILE, T_SMILE + 0.3); st.head = lerp(st.head, -6, sm);
          if (s > T_BYE + 0.3) { const k = win(s, T_BYE + 0.3, T_BYE + 0.6); reachTo(st, k, [HX + 60, FL - 190 + 6 * Math.sin(s * 10)]); }
          return st;
        }
        function herRaw(s) {
          if (s < T_IN) return standOn(-200, 1, FL);
          if (s < T_AT) { const p = walking(-100, lerp(-100, SHEX, ease((s - T_IN) / (T_AT - T_IN)))); reachTo(p, 1, [p.hx + 40, stand - 60], "b"); return p; }
          if (s > T_BYE + 0.2) { const p = walking(SHEX, lerp(SHEX, -150, ease((s - T_BYE - 0.2) / 1.2))); return p; }
          const st = standOn(SHEX, 1, FL);
          reachTo(st, 1 - win(s, T_SET, T_SET + 0.2), [SHEX + 46, stand - 60], "b");
          const tap = hold(s, T_TAP, T_LOOK + 0.2, 0.08); reachTo(st, tap, [HX - 10, FL - 220]);
          const push = Math.sin(Math.PI * clamp((s - T_PUSH) / 0.4, 0, 1)); reachTo(st, push, [D0 + 140, DT - 40]); st.torso += 26 * push; st.hx += 30 * push;
          const set = Math.sin(Math.PI * clamp((s - T_SET) / 0.4, 0, 1)); reachTo(st, set, [D0 + 60, DT - 20], "b"); st.torso += 24 * set; st.hx += 30 * set;
          const feed = hold(s, T_FEED, T_SMILE, 0.2); reachTo(st, feed, [HX + 70, FL - 210]); st.torso += 10 * feed; st.hx += 30 * feed;
          const kiss = hold(s, T_KISS, T_BYE, 0.15); st.torso += 26 * kiss; st.hx += 34 * kiss; st.head -= 6 * kiss;
          return st;
        }
        const herF = (s) => (s > T_BYE + 0.2 ? -1 : 1);
        function cowRaw(s) { const k = hold(s, T_PEEK, T_KISS + 0.4, 0.3); const st = standOn(WALL + 110, -1, FL); st.hy += lerp(150, 20, k); st.head = 10 * k; reachTo(st, k, [WALL + 40, FL - 330 + 130]); return st; }

        const slam = (words, times, t, red) => words.map((w, i) => {
          const q = clamp((t - times[i]) / 0.2, 0, 1);
          if (q <= 0) return `<span class="w" style="opacity:0">${w}</span>`;
          const sc = lerp(2.3, 1, backOut(q)), bl = (1 - q) * 6;
          return `<span class="w" style="transform:scale(${sc.toFixed(3)});filter:blur(${bl.toFixed(1)}px);${red.includes(i) ? "color:#ff3b30;" : ""}">${w}</span>`;
        }).join("");
        const dim = document.createElement("div");
        dim.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(dim);
        const card = document.createElement("div");
        card.id = "card";
        card.style.cssText = "position:absolute;left:90px;right:90px;top:640px;text-align:center;font-family:HFMono,monospace;font-weight:700;color:#fff;letter-spacing:0.08em";
        card.innerHTML = `<div id="cm1" style="font-size:58px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:42px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:110px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"LOVE IS NOT ONLY SOMETHING<br/>YOU FEEL, IT IS SOMETHING<br/>YOU DO."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">DAVID WILKERSON</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 2.3, 600, 440, 0], [2.6, 2.6, 560, 430, 0], [3.6, 1.6, 560, 460, 0], [5.2, 1.9, 520, 450, 0], [6.6, 2.4, 500, 430, 0],
          [7.8, 1.7, 620, 450, 0], [8.4, 2.3, 860, 420, 0], [8.9, 2.0, 560, 440, 0], [99, 1.9, 540, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        function render(t) {
          const s = t;
          let kick = 0;
          const hit = (tr, k, d) => { if (t >= tr) kick += k * Math.exp(-(t - tr) / d); };
          hit(T_T1, 0.3, 0.1); hit(T_T2, 0.3, 0.1); hit(T_GROWL, 0.5, 0.2); hit(T_PUSH + 0.3, 0.4, 0.15);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);

          drawFig(cow, livePose(cowRaw, s, 2.2), -1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), herF(s));
          bun.setAttribute("cx", r1(hp.head[0] - herF(s) * 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          screen.setAttribute("fill", frac(t * 3) < 0.5 ? "#4a7ad0" : "#5a8ae0");
          // paper piles grow, then get pushed away
          const n = Math.floor(clamp(s / T_IN, 0, 1) * 9);
          const pushQ = clamp((s - T_PUSH - 0.15) / 0.35, 0, 1);
          piles.forEach((p, j) => p.sheets.forEach((sh, i) => { sh.setAttribute("opacity", i <= n ? 1 : 0); sh.setAttribute("transform", `translate(${r1(pushQ * (290 + 30 * j + (i % 3) * 12))} ${r1(pushQ * (112 + i * 4) - Math.sin(Math.PI * pushQ) * 60)}) rotate(${r1(pushQ * (i % 2 ? 8 : -6))})`); }));
          // growl, sweat
          growl.forEach((g, i) => { const q = clamp((s - T_GROWL - i * 0.08) / 0.6, 0, 1), on = q > 0 && q < 1; g.setAttribute("d", `M${r1(HX + 40 + 24 * q)} ${r1(FL - 150 + (i - 1) * 18)} q8 -8 16 0 q8 8 16 0`); g.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          sweat.forEach((d, i) => { const q = frac(t * 0.9 + i / 2), on = s > T_T2 && s < T_LOOK; d.setAttribute("transform", `translate(${r1(mp.head[0] + (i ? 20 : -16))} ${r1(mp.head[1] - 20 + 50 * q)})`); d.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // the lunch box
          const lOn = s > T_IN;
          lunch.setAttribute("opacity", lOn ? 1 : 0);
          const onDesk = s > T_SET + 0.2;
          const lp = onDesk ? [D0 + 70, DT] : [hp.hands[1][0], hp.hands[1][1] + 34];
          lunch.setAttribute("transform", `translate(${r1(lp[0])} ${r1(lp[1])})`);
          const open = win(s, T_SET + 0.3, T_SET + 0.5);
          lunchLid.setAttribute("transform", `translate(${r1(-60 * open)} ${r1(30 * open)})`); lunchLid.setAttribute("opacity", (1 - open).toFixed(3));
          food.setAttribute("opacity", open.toFixed(3));
          // the spoon + bite
          const feeding = s > T_FEED && s < T_SMILE;
          spoon.setAttribute("opacity", feeding ? 1 : 0);
          const h = hp.hands[0];
          spoon.setAttribute("d", `M${r1(h[0] - 10)} ${r1(h[1] + 6)} L${r1(h[0] + 22)} ${r1(h[1] - 8)}`);
          bite.setAttribute("opacity", feeding && s < T_FEED + 0.6 ? 1 : 0); bite.setAttribute("cx", r1(h[0] + 22)); bite.setAttribute("cy", r1(h[1] - 12));
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.12); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bSay, T_FEED - 0.2, T_FEED + 0.5, [hp.head[0] - 20, hp.head[1] - 110]);
          const cp = [WALL + 110, FL - 310];
          bub(bSigh, T_PEEK + 0.4, T_KISS + 0.3, [cp[0] - 70, cp[1] - 70]);
          sandwich.setAttribute("opacity", hold(s, T_PEEK + 0.2, T_KISS + 0.4, 0.2).toFixed(3)); sandwich.setAttribute("transform", `translate(${WALL + 40} ${FL - 280})`);
          // hearts
          const hq = clamp((s - T_SMILE) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 && s < T_CARD ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(mp.head[0] + 30)} ${r1(mp.head[1] - 110)}) scale(${(backOut(hq) * 1.0 * beat).toFixed(3)})`);
          const kq = clamp((s - T_KISS - 0.15) / 0.6, 0, 1);
          kissH.setAttribute("opacity", kq > 0 && kq < 1 ? Math.sin(Math.PI * kq).toFixed(3) : 0);
          kissH.setAttribute("transform", `translate(${r1(mp.head[0] - 20)} ${r1(mp.head[1] - 40 - 50 * kq)}) scale(0.5)`);
          warm.setAttribute("opacity", (0.8 * win(s, T_SMILE, T_SMILE + 0.8)).toFixed(3));
          E("num").textContent = CLOCK(s);
          E("num").style.color = s < T_IN ? "#ff3b30" : "#fff";
          E("ctr").style.opacity = (1 - win(s, T_AT, T_AT + 0.3)).toFixed(3);

          E("h1").innerHTML = slam(["HE", "FORGOT", "TO", "EAT."], [T_H1, T_H1 + 0.13, T_H1 + 0.26, T_H1 + 0.4], t, []);
          E("h2").innerHTML = slam(["SHE", "DIDN'T", "FORGET", "HIM."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "SHOWS", "UP."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["EVEN", "ON", "BUSY", "DAYS."], [T_CARD + 0.75, T_CARD + 0.87, T_CARD + 1.0, T_CARD + 1.12], t, [2]);
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
