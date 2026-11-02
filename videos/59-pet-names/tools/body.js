        // ---------- "pet names": in a café he shouts "BABY!" and "MY QUEEN!!", everyone stares, she hides behind the menu: "STOP!". Later, while he orders at the counter, she stands up and shouts "MY KING!!!". Now he's the one hiding ----------
        // remake of a 3.9x outlier (Ai story world, "biwi naraz, pati bekaraar"), see viral/2026-11-02-check.md
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
        const tableG = svgEl("g", {}, W);
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        const T_BABY = 0.5, T_HIDE = 1.2, T_QUEEN = 2.0, T_STOP = 2.8, T_WHISPER = 3.6, T_PEEK = 4.3, T_ORDER = 5.0, T_AT = 5.8, T_KING = 6.2, T_BLUSH = 6.6, T_COVER = 7.0, T_BACK = 7.9, T_SIT = 8.6, T_HOLD = 9.0;
        const T_H1 = 9.9, T_H2 = 10.8, T_CARD = 11.9;
        const SHE = 470, HE = 690, TX = 580, SEAT = FL - 74, COUNTER = 1180, GX = [840, 960];

        // ---------- café ----------
        svgEl("rect", { x: 330, y: FL - 470, width: 500, height: 190, fill: "#2a3040", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const cafeSign = svgEl("text", { x: 580, y: FL - 360, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 50, fill: "#ffcf8a", "text-anchor": "middle" }, backG); cafeSign.textContent = "CAFÉ";
        svgEl("circle", { cx: 580, cy: FL - 260, r: 460, fill: "url(#fireGlow)", opacity: 0.35 }, backG);
        svgEl("rect", { x: COUNTER - 30, y: FL - 130, width: 260, height: 130, fill: "#6b4f36", stroke: "#000", "stroke-width": 5 }, roomG);
        svgEl("rect", { x: COUNTER - 40, y: FL - 140, width: 280, height: 14, fill: "#8a6a4a", stroke: "#000", "stroke-width": 4 }, roomG);
        // their table
        svgEl("rect", { x: TX - 90, y: FL - 112, width: 180, height: 14, rx: 4, fill: "#5a4330", stroke: "#000", "stroke-width": 4 }, tableG);
        svgEl("rect", { x: TX - 6, y: FL - 98, width: 12, height: 98, fill: "#5a4330", stroke: "#000", "stroke-width": 3 }, tableG);
        const cups = [TX - 40, TX + 40].map((x) => { const g = svgEl("g", { transform: `translate(${x} ${FL - 112})` }, tableG); svgEl("path", { d: "M-14 -26 L-11 0 L11 0 L14 -26 Z", fill: "#fff", stroke: "#000", "stroke-width": 3 }, g); return g; });
        for (const x of [SHE, HE]) { svgEl("rect", { x: x - 32, y: SEAT, width: 64, height: 10, rx: 3, fill: "#3a2e24", stroke: "#000", "stroke-width": 3 }, roomG); svgEl("rect", { x: x - 4, y: SEAT + 10, width: 8, height: FL - SEAT - 10, fill: "#3a2e24" }, roomG); }
        // the other guests (left), they turn and stare
        const guests = GX.map((x, i) => makeFig(roomG, "#8e8e8e", "#767676", false, "g" + i));
        svgEl("rect", { x: 870, y: FL - 112, width: 60, height: 14, rx: 4, fill: "#4a3a2c", stroke: "#000", "stroke-width": 4 }, roomG);

        // ---------- the two of them ----------
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const blush = svgEl("circle", { r: 31, fill: "#ff7a8a", opacity: 0 }, fxG);
        const menu = svgEl("g", { opacity: 0 }, fxG);
        svgEl("rect", { x: -36, y: -50, width: 72, height: 100, rx: 4, fill: "#2a5a3a", stroke: "#000", "stroke-width": 4 }, menu);
        const mtx = svgEl("text", { x: 0, y: -18, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 16, fill: "#ffcf8a", "text-anchor": "middle" }, menu); mtx.textContent = "MENU";
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const stares = guests.map(() => { const t = svgEl("text", { "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 44, fill: "#ffd060", "text-anchor": "middle", opacity: 0 }, fxG); t.textContent = "!"; return t; });
        const bubble = (txt, w, size = 34, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bBaby = bubble("BABY!", 160, 38), bQueen = bubble("MY QUEEN!!", 250, 40), bStop = bubble("STOP!", 140, 36, "#ff3b30"), bWhisper = bubble("baby...", 140, 22, "#666"), bKing = bubble("MY KING!!!", 270, 44, "#d4a017");

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
        const reachTo = (s, k, p, hand = "a") => { if (s[hand + "w"] < 1e-6) { s[hand + "tx"] = p[0]; s[hand + "ty"] = p[1]; s[hand + "w"] = k; return s; } s[hand + "w"] = Math.max(s[hand + "w"], k); s[hand + "tx"] = lerp(s[hand + "tx"], p[0], k); s[hand + "ty"] = lerp(s[hand + "ty"], p[1], k); return s; };
        const hold = (s, a, b, r = 0.2) => win(s, a, a + r) * (1 - win(s, b - r, b));
        const seated = (x, f) => base({ hx: x, hy: SEAT - 8, torso: 4, head: 0, ax: x + f * 64, ay: FL, bx: x + f * 50, by: FL, aw: 1, atx: x + f * 70, aty: SEAT - 50, bw: 1, btx: x + f * 60, bty: SEAT - 46 });
        function herRaw(s) {
          if (s > T_KING - 0.3 && s < T_BACK + 0.4) {
            // stands up and shouts across the café
            const st = mixPose(seated(SHE, 1), standOn(SHE, 1, FL), win(s, T_KING - 0.3, T_KING));
            const sh = hold(s, T_KING, T_COVER + 0.4, 0.1); reachTo(st, sh, [SHE + 40, stand - 150]); reachTo(st, sh, [SHE + 34, stand - 140], "b"); st.torso -= 8 * sh;
            const laugh = hold(s, T_COVER, T_BACK + 0.4, 0.1); st.torso += 10 * Math.abs(Math.sin(s * 14)) * laugh;
            return mixPose(st, seated(SHE, 1), win(s, T_BACK, T_BACK + 0.4));
          }
          const st = seated(SHE, 1);
          const hide = hold(s, T_HIDE, T_PEEK + 0.3, 0.15); reachTo(st, hide, [SHE + 40, SEAT - 150]); reachTo(st, hide, [SHE + 50, SEAT - 146], "b"); st.head += 10 * hide;
          const stop = hold(s, T_STOP, T_WHISPER, 0.1); reachTo(st, stop, [SHE + 120, SEAT - 130]);
          const laugh = win(s, T_SIT, T_SIT + 0.3); st.head -= 8 * laugh; st.torso += 6 * Math.abs(Math.sin(s * 10)) * laugh * (1 - win(s, T_HOLD + 0.8, T_HOLD + 1.2));
          return st;
        }
        function himRaw(s) {
          if (s < T_ORDER) {
            const st = seated(HE, -1);
            const shout = Math.max(hold(s, T_BABY, T_HIDE, 0.1), hold(s, T_QUEEN, T_STOP, 0.1));
            reachTo(st, shout, [HE - 30, SEAT - 240]); reachTo(st, shout, [HE + 30, SEAT - 240], "b"); st.torso -= 10 * shout; st.head -= 14 * shout;
            const wh = hold(s, T_WHISPER, T_ORDER, 0.2); st.torso += 26 * wh; st.head += 6 * wh;
            return st;
          }
          if (s < T_AT) { const p = walking(HE, lerp(HE, COUNTER - 60, ease((s - T_ORDER) / (T_AT - T_ORDER)))); return mixPose(seated(HE, -1), p, win(s, T_ORDER, T_ORDER + 0.25)); }
          if (s < T_BACK) {
            const st = standOn(COUNTER - 60, 1, FL);
            const turn = win(s, T_KING + 0.1, T_KING + 0.3); st.head = lerp(4, -6, turn);
            const cover = hold(s, T_COVER, T_BACK, 0.15); reachTo(st, cover, [COUNTER - 30, stand - 130]); reachTo(st, cover, [COUNTER - 40, stand - 136], "b"); st.head += 20 * cover; st.torso += 10 * cover;
            return st;
          }
          if (s < T_SIT) { const p = walking(COUNTER - 60, lerp(COUNTER - 60, HE, ease((s - T_BACK) / (T_SIT - T_BACK)))); p.head = 14; return p; }
          const st = seated(HE, -1); const laugh = win(s, T_SIT, T_SIT + 0.3); st.head -= 8 * laugh; st.torso += 6 * Math.abs(Math.sin(s * 10 + 1)) * laugh * (1 - win(s, T_HOLD + 0.8, T_HOLD + 1.2));
          return mixPose(standOn(HE, -1, FL), st, win(s, T_SIT, T_SIT + 0.3));
        }
        const himF = (s) => (s >= T_ORDER && s < T_AT ? 1 : s >= T_AT && s < T_KING + 0.15 ? 1 : -1);
        function guestRaw(i) { return (s) => { const x = GX[i], st = seated(x, i ? -1 : 1); st.hy -= 0; const look = Math.max(hold(s, T_BABY, T_WHISPER, 0.2), hold(s, T_KING, T_BACK + 0.3, 0.2)); st.head = -10 * look; st.torso = -6 * look; return st; }; }

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
        card.innerHTML = `<div id="cm1" style="font-size:60px;line-height:1.25;text-shadow:0 0 18px rgba(255,255,255,0.35)"></div>
          <div id="cm2" style="font-size:42px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"LOVE IS FRIENDSHIP<br/>THAT HAS CAUGHT FIRE."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ANN LANDERS</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 1.5, 700, 450, 0], [0.5, 1.8, 640, 430, 0], [1.2, 1.5, 690, 450, 0], [2.0, 2.3, 640, 420, 0], [2.8, 2.4, 520, 420, 0], [3.6, 2.2, 580, 430, 0],
          [5.0, 1.45, 800, 450, 0], [6.6, 1.3, 820, 450, 0], [7.0, 2.4, 1130, 410, 0], [7.8, 2.4, 1120, 420, 0], [8.6, 2.0, 580, 440, 0], [99, 2.0, 580, 445, 0],
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
          hit(T_BABY, 0.6, 0.15); hit(T_QUEEN, 0.9, 0.2); hit(T_STOP, 0.4, 0.12); hit(T_KING, 1.2, 0.25);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 10 * Math.min(kick, 1.2), shy = Math.cos(t * 59) * 8 * Math.min(kick, 1.2);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          const gp = guests.map((g, i) => drawFig(g, livePose(guestRaw(i), s, 2 + i), i ? -1 : 1));
          const hp = drawFig(her, livePose(herRaw, s, 1.4), 1);
          const mp = drawFig(him, livePose(himRaw, s, 0.3), himF(s));
          bun.setAttribute("cx", r1(hp.head[0] - 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          const mk = hold(s, T_HIDE, T_PEEK + 0.3, 0.15);
          menu.setAttribute("opacity", mk.toFixed(3));
          menu.setAttribute("transform", `translate(${r1((hp.hands[0][0] + hp.hands[1][0]) / 2 + 6)} ${r1((hp.hands[0][1] + hp.hands[1][1]) / 2 - 10 - 20 * hold(s, T_PEEK, T_PEEK + 0.3, 0.1))})`);
          const bl = hold(s, T_BLUSH, T_SIT + 0.4, 0.2);
          blush.setAttribute("opacity", (0.6 * bl).toFixed(3)); blush.setAttribute("cx", r1(mp.head[0])); blush.setAttribute("cy", r1(mp.head[1]));
          stares.forEach((st, i) => { const k = Math.max(hold(s, T_BABY + 0.1, T_HIDE + 0.6, 0.1), hold(s, T_QUEEN + 0.1, T_STOP + 0.4, 0.1), hold(s, T_KING + 0.1, T_COVER + 0.4, 0.1)); st.setAttribute("x", r1(gp[i].head[0])); st.setAttribute("y", r1(gp[i].head[1] - 50)); st.setAttribute("opacity", k.toFixed(3)); });
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bBaby, T_BABY, T_HIDE + 0.3, [mp.head[0] - 20, mp.head[1] - 110]);
          bub(bQueen, T_QUEEN, T_STOP, [mp.head[0] - 50, mp.head[1] - 110]);
          bub(bStop, T_STOP, T_WHISPER, [hp.head[0] + 10, hp.head[1] - 110]);
          bub(bWhisper, T_WHISPER + 0.1, T_ORDER, [mp.head[0] - 10, mp.head[1] - 90]);
          bub(bKing, T_KING, T_COVER + 0.6, [hp.head[0] + 120, hp.head[1] - 120]);
          const hq = clamp((s - T_HOLD) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${TX} ${r1(Math.min(hp.head[1], mp.head[1]) - 100)}) scale(${(backOut(hq) * 1.1 * beat).toFixed(3)})`);

          E("h1").innerHTML = slam(["SHE", "TOLD", "HIM", "TO", "STOP."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.48], t, []);
          E("h2").innerHTML = slam(["THEN", "SHE", "DID", "IT", "TOO."], [T_H2, T_H2 + 0.12, T_H2 + 0.24, T_H2 + 0.36, T_H2 + 0.48], t, [4]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "IS"], [T_CARD, T_CARD + 0.15], t, []);
          E("cm2").innerHTML = slam(["A", "LITTLE", "EMBARRASSING."], [T_CARD + 0.6, T_CARD + 0.75, T_CARD + 0.95], t, [2]);
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
