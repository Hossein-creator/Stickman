        // ---------- "the gift": he walks in hiding a fancy gift bag. "GUESS!" He shows it off... she points at his wallet. Takes it, the cash flies out, a moth flies out of the empty wallet. Then she laughs, slips a heart note into it, kisses him and takes the bag too ----------
        // remake of a 3.3x outlier (Ai story world, "biwi se panga lena mehenga pad gaya"), see viral/2026-11-01-check.md
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
        const fxG = svgEl("g", {}, W);
        const frac = (v) => v - Math.floor(v);
        const stand = FL - Math.sqrt(LEG * LEG - 15 * 15);

        // ---------- beats ----------
        const T_IN = 0.2, T_AT = 1.0, T_GUESS = 1.1, T_SHOW = 2.0, T_NO = 2.8, T_POINT = 3.2, T_HUH = 3.9, T_GRAB = 4.4, T_CASH = 4.9, T_MOTH = 5.7, T_LAUGH = 6.8, T_NOTE = 7.2, T_KISS = 7.7, T_TAKE = 8.1, T_GO = 8.4;
        const T_H1 = 9.8, T_H2 = 10.7, T_CARD = 11.8;
        const HX = 460, SX2 = 700;

        // ---------- room ----------
        svgEl("rect", { x: 420, y: FL - 470, width: 200, height: 160, fill: "#7aa8d8", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        svgEl("circle", { cx: 560, cy: FL - 260, r: 420, fill: "url(#fireGlow)", opacity: 0.3 }, backG);
        svgEl("polygon", { points: `420,${FL - 470} 620,${FL - 470} 740,${FL} 300,${FL}`, fill: "url(#beam)", filter: "url(#soft)", opacity: 0.14 }, beams);
        svgEl("rect", { x: 140, y: FL - 280, width: 120, height: 280, fill: "#4a3a2c", stroke: "#2c2c2c", "stroke-width": 8 }, backG);
        const warm = svgEl("ellipse", { cx: 560, cy: FL - 160, rx: 320, ry: 230, fill: "url(#fireGlow)", opacity: 0 }, backG);

        // ---------- people + props ----------
        const him = makeFig(figG, "#ffffff", "#dedede", true, "him");
        const bun = svgEl("circle", { r: 15, fill: "#ffffff", stroke: "#000", "stroke-width": 6 }, figG);
        const her = makeFig(figG, "#ffffff", "#e2e2e2", true, "her");
        figG.insertBefore(bun, her.g.previousSibling);
        const gift = svgEl("g", {}, fxG);
        svgEl("path", { d: "M-18 -70 Q0 -96 18 -70", fill: "none", stroke: "#000", "stroke-width": 5 }, gift);
        svgEl("rect", { x: -34, y: -70, width: 68, height: 70, rx: 5, fill: "#2a2a2a", stroke: "#000", "stroke-width": 5 }, gift);
        svgEl("rect", { x: -34, y: -70, width: 68, height: 14, fill: "#d4af37", stroke: "#000", "stroke-width": 3 }, gift);
        const lux = svgEl("text", { x: 0, y: -24, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": 18, fill: "#d4af37", "text-anchor": "middle" }, gift); lux.textContent = "LUXE";
        const sparkle = svgEl("path", { d: "M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z", fill: "#fff6b0", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG);
        const wallet = svgEl("g", {}, fxG);
        svgEl("rect", { x: -22, y: -16, width: 44, height: 32, rx: 5, fill: "#6a4a2a", stroke: "#000", "stroke-width": 4 }, wallet);
        svgEl("line", { x1: -22, y1: 0, x2: 22, y2: 0, stroke: "#000", "stroke-width": 3 }, wallet);
        const noteH = svgEl("path", { d: "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z", fill: "#ff3b30", stroke: "#000", "stroke-width": 3, opacity: 0, transform: "scale(0.35)" }, wallet);
        const bills = Array.from({ length: 8 }, (_, i) => ({ a: -Math.PI / 2 + (i - 3.5) * 0.28, v: 260 + (i % 3) * 60, el: (() => { const g = svgEl("g", { opacity: 0 }, fxG); svgEl("rect", { x: -18, y: -9, width: 36, height: 18, rx: 2, fill: "#7ac06a", stroke: "#000", "stroke-width": 3 }, g); svgEl("circle", { cx: 0, cy: 0, r: 5, fill: "#4a8a3a" }, g); return g; })() }));
        const moth = svgEl("g", { opacity: 0 }, fxG);
        svgEl("ellipse", { cx: -8, cy: 0, rx: 10, ry: 6, fill: "#bbb", stroke: "#000", "stroke-width": 2 }, moth);
        svgEl("ellipse", { cx: 8, cy: 0, rx: 10, ry: 6, fill: "#bbb", stroke: "#000", "stroke-width": 2 }, moth);
        svgEl("ellipse", { cx: 0, cy: 0, rx: 3, ry: 8, fill: "#666" }, moth);
        const HEART = "M0 18 C-40 -8 -30 -40 0 -22 C30 -40 40 -8 0 18 Z";
        const heart = svgEl("path", { d: HEART, fill: "#ff3b30", stroke: "#000", "stroke-width": 4, opacity: 0 }, fxG);
        const kissH = svgEl("path", { d: HEART, fill: "#ff6a9a", stroke: "#000", "stroke-width": 3, opacity: 0 }, fxG);
        const sweat = Array.from({ length: 3 }, () => svgEl("path", { d: "M0 -8 Q6 2 0 6 Q-6 2 0 -8 Z", fill: "#9fd0ff", stroke: "#000", "stroke-width": 2, opacity: 0 }, fxG));
        const bubble = (txt, w, size = 32, col = "#111") => {
          const g = svgEl("g", { opacity: 0 }, fxG);
          svgEl("rect", { x: -w / 2, y: -40, width: w, height: 70, rx: 30, fill: "#fff", stroke: "#000", "stroke-width": 5 }, g);
          svgEl("path", { d: "M-8 28 L-20 58 L12 28 Z", fill: "#fff", stroke: "#000", "stroke-width": 5, "stroke-linejoin": "round" }, g);
          svgEl("rect", { x: -12, y: 22, width: 22, height: 10, fill: "#fff" }, g);
          const tx = svgEl("text", { x: 0, y: 12, "font-family": "HFMono, monospace", "font-weight": 700, "font-size": size, fill: col, "text-anchor": "middle" }, g);
          tx.textContent = txt;
          return g;
        };
        const bGuess = bubble("GUESS WHAT!", 250), bTa = bubble("TA-DA!", 160), bThat = bubble("I WANT THAT.", 260), bHuh = bubble("?!", 100, 44), bTy = bubble("THANK YOU!", 230);

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
          const st = s < T_AT ? walking(200, lerp(200, HX, ease((s - T_IN) / (T_AT - T_IN)))) : standOn(HX, 1, FL);
          // gift hidden behind his back, then shown off
          const show = win(s, T_SHOW, T_SHOW + 0.2) * (1 - win(s, T_TAKE, T_TAKE + 0.2));
          reachTo(st, 1, [lerp(st.hx - 40, HX + 80, show), lerp(stand - 30, stand - 130, show)], "b");
          st.head -= 8 * hold(s, T_GUESS, T_SHOW + 0.6, 0.15);
          // wallet in his back pocket, she takes it; he holds the empty wallet after
          const huh = hold(s, T_HUH, T_LAUGH, 0.15); st.torso -= 10 * huh; st.head -= 6 * huh;
          const holdW = hold(s, T_MOTH - 0.2, T_NOTE, 0.2); reachTo(st, holdW, [HX + 60, stand - 110]);
          const sm = win(s, T_KISS, T_KISS + 0.3); st.head = lerp(st.head, -12, sm);
          reachTo(st, win(s, T_NOTE + 0.3, T_NOTE + 0.5), [HX + 50, stand - 120]);
          return st;
        }
        function herRaw(s) {
          if (s > T_GO) { const p = walking(SX2, lerp(SX2, 1200, ease((s - T_GO) / 1.6))); reachTo(p, 1, [p.hx + 30, stand - 40], "b"); return p; }
          const st = standOn(SX2, -1, FL);
          const think = hold(s, T_SHOW + 0.4, T_POINT, 0.15); reachTo(st, think, [SX2 - 24, stand - 150]); st.head += 10 * think;
          const no = hold(s, T_NO, T_POINT, 0.1); st.head += 12 * Math.sin(s * 20) * no;
          const point = hold(s, T_POINT, T_GRAB, 0.12); reachTo(st, point, [HX + 40, stand - 20]); st.torso += 18 * point;
          const grab = Math.sin(Math.PI * clamp((s - T_GRAB) / 0.4, 0, 1)); reachTo(st, grab, [HX - 20, stand - 10]); st.torso += 30 * grab; st.hx -= 60 * grab;
          const cash = hold(s, T_GRAB + 0.3, T_MOTH, 0.15); reachTo(st, cash, [SX2 - 60, stand - 200]); reachTo(st, cash, [SX2 - 40, stand - 190], "b");
          const laugh = hold(s, T_LAUGH, T_NOTE, 0.1); st.torso += 10 * Math.abs(Math.sin(s * 14)) * laugh;
          const note = hold(s, T_NOTE, T_KISS, 0.15); reachTo(st, note, [HX + 70, stand - 120]); st.torso += 18 * note; st.hx -= 50 * note;
          const kiss = hold(s, T_KISS, T_GO, 0.15); st.torso += 30 * kiss; st.hx -= 90 * kiss; st.head -= 6 * kiss;
          const take = win(s, T_TAKE, T_TAKE + 0.2); reachTo(st, take, [HX + 80, stand - 120], "b");
          return st;
        }
        const herF = (s) => (s > T_GO ? 1 : -1);

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
          <div id="cm2" style="font-size:44px;line-height:1.35;margin-top:22px;text-shadow:0 0 14px rgba(255,255,255,0.25)"></div>
          <div id="cq" style="opacity:0;margin-top:120px;font-size:30px;line-height:1.5;color:#bdbdbd;letter-spacing:0.05em">"THE BEST THINGS IN LIFE<br/>AREN'T THINGS."<div style="margin-top:22px;font-size:24px;color:#8a8a8a;letter-spacing:0.2em">ART BUCHWALD</div></div>`;
        E("stage").appendChild(card);
        const fade = document.createElement("div");
        fade.style.cssText = "position:absolute;inset:0;background:#000;opacity:0";
        E("stage").appendChild(fade);

        const CK = [
          [0, 1.8, 480, 450, 0], [1.1, 2.1, 540, 440, 0], [2.0, 2.4, 520, 430, 0], [3.2, 2.0, 560, 440, 0], [4.9, 1.9, 560, 430, 0],
          [5.7, 2.8, 520, 420, 0], [6.6, 2.0, 560, 440, 0], [8.4, 1.9, 560, 450, 0], [99, 2.1, 500, 450, 0],
        ];
        function camAt(s) {
          let i = 1;
          while (i < CK.length - 1 && s > CK[i][0]) i++;
          const a = CK[i - 1], b = CK[i], k = ease((s - a[0]) / (b[0] - a[0]));
          return a.map((x, j) => lerp(x, b[j], k));
        }

        function render(t) {
          const s = t;
          let kick = 0, flash = 0;
          const hit = (tr, k, f, d) => { if (t >= tr) { kick += k * Math.exp(-(t - tr) / d); flash += f * Math.exp(-(t - tr) / (d * 0.35)); } };
          hit(T_SHOW, 0.5, 0.25, 0.2); hit(T_POINT, 0.4, 0, 0.15); hit(T_CASH, 0.6, 0, 0.2); hit(T_MOTH, 0.3, 0, 0.2);
          const [, cs, cx, cy, cr] = camAt(s);
          const sc = cs * (1 + 0.05 * Math.min(kick, 1.5));
          const shx = Math.sin(t * 67) * 8 * Math.min(kick, 1), shy = Math.cos(t * 59) * 6 * Math.min(kick, 1);
          cam.setAttribute("transform", `translate(${r1(540 + shx)} ${r1(1180 + shy)}) rotate(${cr.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${r1(-cx)} ${r1(-cy)})`);
          E("flash").style.opacity = Math.min(0.5, flash).toFixed(3);

          const mp = drawFig(him, livePose(himRaw, s, 0.3), 1);
          const hf = herF(s);
          const hp = drawFig(her, livePose(herRaw, s, 1.4), hf);
          bun.setAttribute("cx", r1(hp.head[0] - hf * 25)); bun.setAttribute("cy", r1(hp.head[1] - 16));
          // gift bag: his hand, then hers
          const gp = s < T_TAKE + 0.1 ? mp.hands[1] : hp.hands[1];
          gift.setAttribute("transform", `translate(${r1(gp[0])} ${r1(gp[1] + 70)})`);
          const spk = hold(s, T_SHOW, T_NO + 0.4, 0.1);
          sparkle.setAttribute("opacity", (spk * (0.6 + 0.4 * Math.sin(t * 20))).toFixed(3)); sparkle.setAttribute("transform", `translate(${r1(gp[0] + 40)} ${r1(gp[1] + 10)}) rotate(${r1(t * 90)})`);
          // wallet: in his back pocket, in her hand (cash out), back to him empty, heart note in it
          let wp, wr = 0;
          if (s < T_GRAB + 0.2) wp = [mp.hip[0] - 22, mp.hip[1] + 18];
          else if (s < T_MOTH - 0.2) { wp = [hp.hands[0][0], hp.hands[0][1]]; wr = -20; }
          else wp = [mp.hands[0][0] + 6, mp.hands[0][1]];
          wallet.setAttribute("transform", `translate(${r1(wp[0])} ${r1(wp[1])}) rotate(${wr})`);
          noteH.setAttribute("opacity", s > T_NOTE + 0.3 ? 1 : 0);
          bills.forEach((b) => { const q = s - T_CASH, on = q > 0 && q < 1.4; b.el.setAttribute("opacity", on ? (1 - q / 1.4).toFixed(3) : 0); b.el.setAttribute("transform", `translate(${r1(hp.hands[0][0] + Math.cos(b.a) * b.v * Math.min(q, 0.6))} ${r1(hp.hands[0][1] + Math.sin(b.a) * b.v * Math.min(q, 0.6) + 300 * Math.max(0, q - 0.3) ** 2)}) rotate(${r1(q * 300 * (b.a > -1.57 ? 1 : -1))})`); });
          const mq = clamp((s - T_MOTH) / 1.0, 0, 1);
          moth.setAttribute("opacity", mq > 0 && mq < 1 ? 1 : 0);
          moth.setAttribute("transform", `translate(${r1(wp[0] + 60 * mq + 14 * Math.sin(mq * 20))} ${r1(wp[1] - 140 * mq)}) scale(${(1 + 0.25 * Math.sin(t * 40)).toFixed(3)} 1)`);
          sweat.forEach((d, i) => { const q = frac(t * 1.1 + i / 3), on = s > T_HUH && s < T_LAUGH; d.setAttribute("transform", `translate(${r1(mp.head[0] + (i - 1) * 22)} ${r1(mp.head[1] - 20 + 50 * q)})`); d.setAttribute("opacity", on ? Math.sin(Math.PI * q).toFixed(3) : 0); });
          // speech
          const bub = (g, a, b, p) => { const k = hold(s, a, b, 0.1); g.setAttribute("opacity", k.toFixed(3)); g.setAttribute("transform", `translate(${r1(p[0])} ${r1(p[1])}) scale(${(0.6 + 0.4 * backOut(k)).toFixed(3)})`); };
          bub(bGuess, T_GUESS, T_SHOW, [mp.head[0] + 20, mp.head[1] - 110]);
          bub(bTa, T_SHOW, T_NO, [mp.head[0] + 10, mp.head[1] - 110]);
          bub(bThat, T_POINT, T_HUH, [hp.head[0] - 30, hp.head[1] - 110]);
          bub(bHuh, T_HUH, T_GRAB + 0.4, [mp.head[0] - 20, mp.head[1] - 100]);
          bub(bTy, T_TAKE, T_GO + 0.9, [hp.head[0] + 10, hp.head[1] - 110]);
          const kq = clamp((s - T_KISS - 0.1) / 0.6, 0, 1);
          kissH.setAttribute("opacity", kq > 0 && kq < 1 ? Math.sin(Math.PI * kq).toFixed(3) : 0);
          kissH.setAttribute("transform", `translate(${r1(mp.head[0] + 20)} ${r1(mp.head[1] - 40 - 50 * kq)}) scale(0.5)`);
          const hq = clamp((s - T_GO) / 0.4, 0, 1), beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (hq >= 1 ? 1 : 0);
          heart.setAttribute("opacity", hq > 0 ? 1 : 0);
          heart.setAttribute("transform", `translate(${r1(mp.head[0] + 20)} ${r1(mp.head[1] - 110)}) scale(${(backOut(hq) * 1.0 * beat).toFixed(3)})`);
          warm.setAttribute("opacity", (0.8 * win(s, T_KISS, T_KISS + 0.8)).toFixed(3));

          E("h1").innerHTML = slam(["HE", "BOUGHT", "HER", "A", "BAG."], [T_H1, T_H1 + 0.12, T_H1 + 0.24, T_H1 + 0.36, T_H1 + 0.48], t, []);
          E("h2").innerHTML = slam(["SHE", "WANTED", "THE", "WALLET."], [T_H2, T_H2 + 0.13, T_H2 + 0.26, T_H2 + 0.4], t, [3]);
          E("h1").style.opacity = (1 - 0.45 * win(t, T_H2 - 0.1, T_H2 + 0.2)).toFixed(3);
          dim.style.opacity = (0.8 * win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("head").style.opacity = (1 - win(t, T_CARD - 0.4, T_CARD)).toFixed(3);
          E("cm1").innerHTML = slam(["LOVE", "IS", "SHARING."], [T_CARD, T_CARD + 0.15, T_CARD + 0.3], t, []);
          E("cm2").innerHTML = slam(["EVEN", "THE", "WALLET."], [T_CARD + 0.75, T_CARD + 0.9, T_CARD + 1.05], t, [2]);
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
