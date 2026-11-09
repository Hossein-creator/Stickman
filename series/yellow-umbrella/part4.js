        // ===== PART 4/4 "The Choice": she pulls her hand back, the ring falls: "NO." She takes his broken umbrella and runs out in her veil. He's leaving town: the bus comes, he gets on, it drives off; she runs after it and falls to her knees. Then the rain stops falling on her: he got off the bus and holds the broken umbrella over her. Hug, sun, rainbow. Dad finds them... and shakes his hand: "TAKE CARE OF HER." 5 years later: the three of them under the yellow umbrella at the same bus stop. =====
        const MAPDEF = [["tease", 16.5, 17.9, 1], ["rew", 17.9, 0, 0.45], ["play", 0, 0.3, 1], ["play", 0.3, 1.0, 0.4], ["play", 1.0, 12.2, 1], ["play", 12.2, 12.9, 0.4], ["play", 12.9, 16.6, 1], ["play", 16.6, 17.4, 0.5], ["play", 17.4, 33.6, 1], ["freeze", 33.6, 0.8], ["play", 33.6, 40, 1]];
        const FXP = { tease: "WHO STOPPED THE RAIN?", photo: true, punch: [[0.5, 0.06], [12.4, 0.08]], bars: [[0.3, 2.4], [12.0, 13.2], [16.4, 18.0]] };
        const PART = 4;
        bubble("no", "NO.", "#ff3b30", 40); bubble("where", "WHERE ARE YOU GOING?!", "#111", 26); bubble("wait", "WAIT!", "#ff3b30", 34); bubble("care", "TAKE CARE OF HER.", "#111", 28); bubble("sorry", "I'M SORRY.", "#111", 28);
        const FLASH = [0.3, 12.4];
        const BX = (t) => (t < 8.0 ? lerp(1600, 700, ease((t - 6.4) / 1.6)) : t < 9.6 ? 700 : 700 + 600 * Math.pow(t - 9.6, 1.6));
        const UMB_G = [965, FL - 10];
        const kidT = (s, P) => [s.hx + (P[0] - s.hx) / 0.55, FL + (P[1] - FL) / 0.55];
        const SC = [
          { a: 0, b: 6.4, set: "hall", sky: () => ({ warm: 1 }), rain: () => 0, veil: () => 1, veilFly: (t) => 0.45 * win(t, 3.8, 4.3),
            kick: (t) => (t > 0.5 ? 0.7 * Math.exp(-(t - 0.5) / 0.2) : 0),
            grade: ["warm", 0.3], cam: shots([[0, 780, 470, 2.6], [0.5, 720, 400, 2.4], [1.4, 840, 400, 2.3], [2.0, 560, 420, 1.7], [3.8, 350, 430, 1.8], [4.2, 500, 410, 2.2]]),
            cast: {
              her: (t) => {
                if (t < 2.4) { const st = pose(700, 1, { head: -6 }); reachTo(st, 1 - win(t, 0.2, 0.4), [774, stand - 38]); reachTo(st, win(t, 0.25, 0.45), [690, stand - 120]); st.hx -= 16 * win(t, 0.2, 0.4); return st; }
                if (t < 3.0) { const x = lerp(700, 400, win(t, 2.4, 3.0)); return walking(700, x, -1, 1); }
                if (t < 3.8) { const kn = kneel(400, -1); reachTo(kn, 1, [380, FL - 20]); const st = pose(400, -1); return t < 3.4 ? mixPose(walking(700, 400, -1, 1), kn, win(t, 3.0, 3.25)) : mixPose(kn, st, win(t, 3.4, 3.8)); }
                const x = lerp(400, 120, (t - 3.8) / 1.0); const st = walking(400, x, -1, 1); reachTo(st, 1, [x - 30, stand - 120]); return st;
              },
              rich: (t) => { const st = pose(840, -1, { head: -6 }); reachTo(st, 1 - win(t, 0.3, 0.5), [790, stand - 44]); const sh = win(t, 0.6, 0.9); reachTo(st, sh, [870, stand - 200]); reachTo(st, sh, [810, stand - 200], "b"); st.torso -= 10 * sh; return st; },
              dad: (t) => { const f = t < 2.6 ? 1 : lerp(1, -1, win(t, 3.6, 3.9)); const st = pose(540, f, { head: 0 }); const sh = hold(t, 0.6, 3.6, 0.2); reachTo(st, sh, [560, stand - 190]); reachTo(st, sh, [520, stand - 190], "b"); reachTo(st, hold(t, 4.2, 6.4, 0.2), [540 - 140, stand - 150], "b"); return st; },
            },
            draw: (t, P) => {
              const q = clamp((t - 0.35) / 0.5, 0, 1), bounce = Math.abs(Math.sin(Math.PI * 2.5 * q)) * (1 - q);
              ringBox.setAttribute("opacity", 1); lid.setAttribute("transform", "rotate(-80 -26 -10)");
              const p0 = [790, stand - 50], p1 = [800, FL - 20];
              ringBox.setAttribute("transform", `translate(${r1(lerp(p0[0], p1[0], q))} ${r1(lerp(p0[1], p1[1], Math.min(1, q * 1.6)) - 60 * bounce)}) rotate(${r1(200 * q)}) scale(0.8)`);
              say("no", hold(t, 0.5, 2.3, 0.1), [P.her.head[0] - 10, P.her.head[1] - 120]);
              const b = clamp((t - 0.5) / 0.2, 0, 1) * (1 - win(t, 2.2, 2.5)); bang.setAttribute("opacity", b); bang.setAttribute("x", r1(P.rich.head[0])); bang.setAttribute("y", r1(P.rich.head[1] - 60));
              if (t < 3.3) putUmb(U1, [380, FL - 10], "broken", -88); else putUmb(U1, P.her.hands[0], "broken", -20);
              say("where", hold(t, 4.2, 6.3, 0.12), [P.dad.head[0] - 60, P.dad.head[1] - 130]);
            } },
          { a: 6.4, b: 14.4, set: "stop", sky: () => ({ storm: 1 }), rain: () => 1,
            grade: ["cold", 0.65], cam: shots([[6.4, 1150, 430, 1.6], [8.0, 900, 410, 2.2], [9.4, 980, 380, 2.3], [10.0, 500, 430, 1.8], [11.2, 880, 410, 2.1], [12.2, 880, 470, 2.4]]),
            cast: {
              him: (t) => { if (t > 9.0) return null; const x = t < 8.2 ? 980 : lerp(980, 770, win(t, 8.2, 9.0)); const st = t < 8.2 ? pose(x, -1, { head: 22 }) : walking(980, x, -1); reachTo(st, 1, [x + 20, stand + 30], "b"); return st; },
              her: (t) => {
                if (t < 10.0) return null;
                const run = (tt) => { const x = lerp(240, 880, (tt - 10.0) / 1.6); const st = walking(240, x, 1, 1); reachTo(st, 1, [x - 20, stand - 120]); return st; };
                if (t < 11.6) return run(t);
                const st = pose(880, 1, { head: -10 }); reachTo(st, hold(t, 11.5, 12.4, 0.15), [1000, stand - 180], "b"); reachTo(st, 1, [860, stand - 120]);
                if (t < 12.3) return mixPose(run(11.6), st, win(t, 11.6, 11.8));
                const kn = knees2(880, 1); reachTo(kn, 1, [930, FL - 60]); reachTo(kn, 1, [915, FL - 70], "b"); return mixPose(st, kn, win(t, 12.3, 12.7));
              },
            },
            draw: (t, P) => {
              const bx = BX(t); bus.setAttribute("opacity", t > 6.4 ? 1 : 0); bus.setAttribute("transform", `translate(${r1(bx)} 0)`);
              busHead.setAttribute("opacity", t > 9.1 && t < 11.0 ? 1 : 0);
              if (P.him) { suitcase.setAttribute("opacity", 1); suitcase.setAttribute("transform", `translate(${r1(P.him.hands[1][0])} ${r1(P.him.hands[1][1] + 10)})`); }
              if (P.her) { if (t < 12.4) putUmb(U1, P.her.hands[0], "broken", 10); else { const d = win(t, 12.4, 12.8); putUmb(U1, [lerp(P.her.hands[0][0], UMB_G[0], d), lerp(P.her.hands[0][1], UMB_G[1], d)], "broken", lerp(10, 88, d)); } say("wait", hold(t, 11.2, 12.4, 0.1), [P.her.head[0] + 40, P.her.head[1] - 120]); if (t > 12.6) cry(P.her.head, t, 1); }
            } },
          { a: 14.4, b: 24, set: "stop", sky: (t) => { const k = win(t, 20.6, 22.0); return { storm: 1 - k, day: k, sun: k, sunX: 1100, bow: k * 0.9, bowX: 420 }; }, rain: (t) => 1 - win(t, 20.4, 21.2),
            grade: (t) => (t < 20.6 ? ["cold", 0.5] : ["warm", 0.45]), glow: (t) => 0.9 * win(t, 20.0, 21.0), cam: shots([[14.4, 880, 470, 2.6], [15.0, 950, 430, 1.8], [16.5, 900, 440, 2.4], [19.0, 930, 430, 2.0], [20.6, 900, 380, 1.6]]),
            cast: {
              her: (t) => {
                const kn = knees2(880, 1); reachTo(kn, 1, [930, FL - 60]); reachTo(kn, 1, [915, FL - 70], "b"); kn.head -= 40 * win(t, 16.8, 17.3);
                if (t < 19.0) return kn;
                const st = pose(lerp(880, 930, win(t, 19.4, 19.9)), 1, { head: -6 }); const hug = win(t, 19.6, 20.0); reachTo(st, hug, [st.hx + 60, stand - 130]); reachTo(st, hug, [st.hx + 50, stand - 100], "b");
                return mixPose(kn, st, win(t, 19.0, 19.5));
              },
              him: (t) => {
                if (t < 14.6) return null;
                if (t < 15.8) { const x = lerp(1300, 990, (t - 14.6) / 1.2); return walking(1300, x, -1); }
                const st = pose(990, -1, { head: 10 }); const bend = hold(t, 15.8, 16.4, 0.15); st.torso += 40 * bend; st.hy += 30 * bend;
                reachTo(st, 1, t < 16.1 ? [lerp(990, UMB_G[0], win(t, 15.8, 16.0)), lerp(stand - 60, UMB_G[1] - 20, win(t, 15.8, 16.0))] : [lerp(UMB_G[0], 950, win(t, 16.1, 16.5)), lerp(UMB_G[1], stand - 180, win(t, 16.1, 16.5))]);
                if (t > 19.6) reachTo(st, win(t, 19.6, 20.0), [st.hx - 70, stand - 110], "b");
                return st;
              },
            },
            draw: (t, P) => {
              if (!P.him || t < 16.05) putUmb(U1, UMB_G, "broken", 88);
              else { putUmb(U1, P.him.hands[0], "broken", lerp(88, -6, win(t, 16.1, 16.5))); if (t > 16.4) U1.span = [P.him.hands[0][0] - 120, P.him.hands[0][0] + 80, P.him.hands[0][1] - 160]; }
              if (t < 17.0) cry(P.her.head, t, 1);
              if (t > 20.0) { placeHeart([(P.him.head[0] + P.her.head[0]) / 2, P.her.head[1] - 120], win(t, 20.0, 20.4), t); floatHearts([(P.him.head[0] + P.her.head[0]) / 2, P.her.head[1] - 60], 20.4, t); }
            } },
          { a: 24, b: 31, set: "stop", sky: () => ({ day: 1, sun: 1, sunX: 1100 }), rain: () => 0,
            grade: ["warm", 0.35], glow: () => 0.4, cam: shots([[24, 820, 430, 1.55], [26.0, 780, 400, 2.3], [27.4, 870, 420, 1.9], [28.6, 1060, 400, 2.4]]),
            cast: {
              dad: (t) => { const x = lerp(400, 790, win(t, 24.1, 25.8)); const st = t < 25.8 ? walking(400, x, 1) : pose(x, 1, { head: 4 }); reachTo(st, 1, [x + 20, stand - 30]); st.head += 18 * hold(t, 26.2, 27.2, 0.2); const shake = hold(t, 27.4, 31, 0.3); reachTo(st, shake, [880, stand - 90 + 5 * Math.sin(t * 20) * (t < 28.6 ? 1 : 0)], "b"); return st; },
              him: (t) => { const st = pose(965, lerp(1, -1, win(t, 24.6, 24.9)), { head: 6 }); reachTo(st, 1, [990, stand - 30], "b"); const shake = hold(t, 27.4, 31, 0.3); reachTo(st, shake, [880, stand - 90 + 5 * Math.sin(t * 20) * (t < 28.6 ? 1 : 0)]); return st; },
              her: (t) => { const st = pose(1070, -1, { head: 4 }); const hold2 = 1 - win(t, 25.2, 25.6); reachTo(st, hold2, [1010, stand - 110]); const happy = win(t, 28.6, 29.0); reachTo(st, happy, [1050, stand - 160], "b"); return st; },
            },
            draw: (t, P) => {
              putUmb(U1, P.him.hands[1], "closed", 10);
              say("sorry", hold(t, 26.0, 27.2, 0.12), [P.dad.head[0] + 10, P.dad.head[1] - 120]);
              say("care", hold(t, 27.4, 29.6, 0.12), [P.dad.head[0] + 20, P.dad.head[1] - 120]);
              const b = clamp((t - 25.85) / 0.2, 0, 1) * (1 - win(t, 26.4, 26.8)); bang.setAttribute("opacity", b); bang.setAttribute("x", r1(P.her.head[0])); bang.setAttribute("y", r1(P.her.head[1] - 60));
              if (t > 28.6) floatHearts([P.her.head[0], P.her.head[1] - 50], 28.7, t);
            } },
          { a: 31, b: 40, set: "stop", sky: () => ({ gray: 1 }), rain: () => 0.55,
            grade: ["warm", 0.3], glow: () => 0.5, cam: (t) => [940, lerp(440, 450, win(t, 31, 34)), lerp(1.75, 1.95, win(t, 31, 35))],
            cast: {
              him: (t) => { const st = pose(850, 1, { head: -4 }); reachTo(st, 1, [880, stand - 200]); reachTo(st, 1, [900, FL - 135], "b"); return st; },
              her: (t) => { const st = pose(1040, -1, { head: -4 }); reachTo(st, 1, [985, FL - 135]); reachTo(st, hold(t, 34.0, 40, 0.3), [1020, stand - 130], "b"); return st; },
              kid: (t) => { const jump = Math.max(0, Math.sin(Math.PI * clamp((t - 33.4) / 0.5, 0, 1))); const st = pose(945, 1, { head: -14 }); st.hy -= 50 * jump; st.ay -= 50 * jump; st.by -= 50 * jump; reachTo(st, 1, kidT(st, [985, FL - 135 - 28 * jump])); reachTo(st, 1, kidT(st, [900, FL - 135 - 28 * jump]), "b"); return st; },
            },
            draw: (t, P) => {
              putUmb(U1, P.him.hands[0], "open", 14);
              doSplash([945, FL - 6], 33.9, t);
              floatHearts([P.her.head[0] - 40, P.her.head[1] - 40], 34.6, t);
            } },
        ];
        const CAPS = [
          [0.1, 2.4, "PREVIOUSLY: SHE SAW HIS UMBRELLA.", "y"],
          [2.6, 6.3, "SHE SAID NO.", [2]],
          [6.5, 9.4, "HE WAS LEAVING TOWN."],
          [10.6, 14.3, "SHE WAS TOO LATE..."],
          [14.5, 16.6, "THEN THE RAIN STOPPED..."],
          [16.8, 19.4, "HE GOT OFF THE BUS.", "y"],
          [20.2, 23.9, "SHE CHOSE LOVE OVER MONEY."],
          [24.2, 26.8, "HER DAD FOUND THEM...", [1]],
          [27.6, 30.9, "HE FINALLY UNDERSTOOD."],
          [31.1, 33.6, "5 YEARS LATER..."],
          [33.7, 36.2, "SAME BUS STOP. SAME UMBRELLA.", "y"],
        ];
        const CARD = { t: 36.4, html: (t) => `<div style="font-size:50px;line-height:1.3">${slam(["REAL", "LOVE", "DOESN'T", "NEED", "A", "RING."], 36.4, t, [5])}</div><div style="margin-top:26px;font-size:42px;line-height:1.35">${slam(["IT", "NEEDS", "SOMEONE", "WHO", "STAYS", "IN", "THE", "RAIN."], 37.3, t, "y")}</div><div style="margin-top:80px;font-size:40px;letter-spacing:0.3em;opacity:${win(t, 38.5, 38.9).toFixed(3)}">THE END</div><div style="margin-top:20px;font-size:26px;letter-spacing:0.16em;color:#bdbdbd;opacity:${win(t, 38.8, 39.2).toFixed(3)}">FOLLOW FOR THE NEXT STORY</div>` };
        const MAP = buildMap(MAPDEF);
        const render = (t) => renderVideo(t, MAP, FXP, PART, SC, CAPS, FLASH, CARD);
