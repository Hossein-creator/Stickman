        // ===== PART 1/4 "The Umbrella": storm at the bus stop, a stranger gives her his yellow umbrella and runs off in the rain; next day she gives it back, he sneezes, it rains again: one umbrella, two people; every day after; cliffhanger: her dad sees them =====
        const DURP = 36;
        const PART = 1;
        bubble("here", "HERE."); bubble("wet", "YOU'LL GET WET!"); bubble("achoo", "ACHOO!"); bubble("haha", "HAHA!"); bubble("who", "WHO IS HE?!", "#ff3b30", 34);
        const FLASH = [0.3, 1.7, 31.0];
        const SHE = 900, HE0 = 1380, HE1 = 1070;
        const SC = [
          { a: 0, b: 13.6, set: "stop", sky: () => ({ storm: 1 }), rain: () => 1,
            cam: (t) => { const k = win(t, 2.4, 4.6), k2 = win(t, 10.6, 12.4); return [lerp(lerp(910, 1000, k), 930, k2), lerp(430, 420, k), lerp(lerp(2.2, 1.75, k), 2.1, k2)]; },
            cast: {
              her: (t) => {
                const st = pose(SHE + 3 * Math.sin(t * 40) * (1 - win(t, 8.6, 9.0)), 1, { head: 14 });
                const bag = 1 - win(t, 6.2, 7.0);
                reachTo(st, bag, [SHE + 14, stand - 190]); reachTo(st, bag, [SHE - 6, stand - 186], "b");
                st.torso += 6 * bag;
                const take = win(t, 8.4, 8.8); reachTo(st, take, [SHE + 34, stand - 150]);
                st.head -= 14 * hold(t, 6.4, 8.6, 0.3);
                const chest = win(t, 10.8, 11.4); reachTo(st, chest, [SHE + 22, stand - 120], "b"); st.head += 10 * chest;
                return st;
              },
              him: (t) => {
                if (t < 2.4) return null;
                if (t < 5.0) { const x = lerp(HE0, HE1, (t - 2.4) / 2.6); const st = walking(HE0, x, -1); reachTo(st, 1, [x - 34, stand - 150]); return st; }
                if (t < 9.0) { const st = pose(HE1, -1, { head: 10 }); const out = win(t, 5.8, 6.4); reachTo(st, 1, [HE1 - lerp(34, 100, out) - 30 * win(t, 8.3, 8.7), stand - 150]); st.torso += 8 * out; return st; }
                const x = lerp(HE1, 1560, (t - 9.0) / 1.7); const st = walking(HE1 - 40, x, 1, 1); reachTo(st, 1, [x + 6, stand - 200]); reachTo(st, 1, [x - 10, stand - 196], "b"); return st;
              },
            },
            draw: (t, P) => {
              if (P.him && t < 8.7) putUmb(U1, P.him.hands[0], "open", t < 5.8 ? 0 : -8 * win(t, 5.8, 6.4));
              else if (t > 8.7) putUmb(U1, P.her.hands[0], "open", -4);
              if (P.him) { say("here", hold(t, 5.9, 7.2, 0.12), [P.him.head[0] + 10, P.him.head[1] - 110]); }
              say("wet", hold(t, 7.2, 8.6, 0.12), [P.her.head[0] + 60, P.her.head[1] - 120]);
              floatHearts([P.her.head[0], P.her.head[1] - 60], 11.4, t);
            } },
          { a: 13.6, b: 23.6, set: "stop", sky: (t) => ({ gray: 1, storm: win(t, 19.4, 20.2) * 0.8 }), rain: (t) => win(t, 19.6, 20.4),
            cam: (t) => [lerp(930, 990, win(t, 15.8, 16.8)), 430, lerp(2.1, 1.85, win(t, 15.8, 16.8)) + 0.15 * win(t, 20.6, 22.6)],
            cast: {
              her: (t) => {
                const look = t < 14.6 ? 1 : t < 15.6 ? lerp(1, -1, win(t, 14.6, 14.9)) : lerp(-1, 1, win(t, 15.6, 15.9));
                const st = pose(SHE, look, { head: -4 });
                const give = win(t, 18.9, 19.3), keep = 1 - give;
                reachTo(st, keep, [SHE + 26 * look, stand - 96]);
                reachTo(st, hold(t, 18.8, 19.6, 0.2), [SHE + 120, stand - 130]);
                const laugh = hold(t, 18.3, 19.0, 0.1); st.head -= 18 * laugh; reachTo(st, laugh, [SHE + 20, stand - 172], "b");
                if (t > 20.2) { const k = win(t, 20.6, 21.2); reachTo(st, k, [SHE + 90, stand - 100], "b"); st.head += 10 * k; }
                return st;
              },
              him: (t) => {
                if (t < 16.0) return null;
                if (t < 17.8) { const x = lerp(HE0, HE1, (t - 16) / 1.8); return walking(HE0, x, -1); }
                const st = pose(lerp(HE1, 1010, win(t, 20.0, 20.6)), -1, { head: 6 });
                const sn = hold(t, 17.9, 18.4, 0.08); st.torso += 22 * sn; st.head += 20 * sn; reachTo(st, sn, [st.hx - 30, stand - 165]);
                const take = win(t, 19.0, 19.4); reachTo(st, take, [st.hx - lerp(110, 50, win(t, 19.6, 20.2)), stand - lerp(130, 170, win(t, 19.6, 20.2))]);
                if (t > 20.2) { const k = win(t, 20.6, 21.2); reachTo(st, k, [st.hx - 80, stand - 100], "b"); }
                return st;
              },
            },
            draw: (t, P) => {
              if (t < 19.2 || !P.him) putUmb(U1, P.her.hands[0], "closed", -20);
              else putUmb(U1, P.him.hands[0], t < 20.2 ? "closed" : "open", lerp(-30, -8, win(t, 19.6, 20.2)));
              if (P.him) say("achoo", hold(t, 17.9, 18.7, 0.08), [P.him.head[0] + 10, P.him.head[1] - 110]);
              say("haha", hold(t, 18.4, 19.2, 0.08), [P.her.head[0] - 20, P.her.head[1] - 110]);
              if (P.him) { floatHearts([(P.him.head[0] + P.her.head[0]) / 2, P.her.head[1] - 40], 21.3, t); }
            } },
          { a: 23.6, b: 36, set: "road", sky: (t) => ({ storm: 1 }), rain: () => 0.75,
            cam: (t) => { const x = Math.min(280 + 85 * (t - 23.6), 280 + 85 * 6.6); const k = win(t, 30.6, 31.6); return [lerp(x + 20, x + 220, k), lerp(430, 410, k), lerp(1.75, 1.6, k) + 0.25 * win(t, 31.0, 31.5)]; },
            cast: {
              him: (t) => { const x = Math.min(280 + 85 * (t - 23.6), 280 + 85 * 6.6); const st = t < 30.2 ? walking(280, x, 1) : pose(x, 1, { head: -6 }); reachTo(st, 1, [x - 34, stand - 170]); if (t < 31.3) reachTo(st, 1, [x - 70, stand - 100], "b"); return st; },
              her: (t) => { const x = Math.min(170 + 85 * (t - 23.6), 170 + 85 * 6.6); const st = t < 30.2 ? walking(170, x, 1) : pose(x, 1, { head: -6 }); const drop = win(t, 31.2, 31.5); reachTo(st, 1 - drop, [x + 50, stand - 100]); st.hx -= 20 * drop; st.torso -= 10 * drop; reachTo(st, drop, [x + 30, stand - 150], "b"); return st; },
              dad: (t) => { if (t < 29.6) return null; const x = lerp(1180, 1020, win(t, 29.6, 30.8)); const st = t < 30.8 ? walking(1180, x, -1) : pose(x, -1, { head: 6 }); reachTo(st, 1, [x - 30, stand - 140]); const pt = win(t, 31.4, 31.7); reachTo(st, pt, [x - 140, stand - 160], "b"); st.torso += 10 * pt; return st; },
            },
            draw: (t, P) => {
              putUmb(U1, P.him.hands[0], "open", -10);
              if (P.dad) putUmb(U2, P.dad.hands[0], "open", 4);
              if (t < 30.6) floatHearts([(P.him.head[0] + P.her.head[0]) / 2, P.her.head[1] - 50], 24.8 + 2.4 * Math.floor((t - 24.8) / 2.4), t);
              if (P.dad) { say("who", hold(t, 31.5, 34, 0.12), [P.dad.head[0] - 30, P.dad.head[1] - 120]); const b = clamp((t - 31.05) / 0.2, 0, 1); bang.setAttribute("opacity", b); bang.setAttribute("x", r1(P.her.head[0])); bang.setAttribute("y", r1(P.her.head[1] - 60)); }
            } },
        ];
        const CAPS = [
          [0.2, 3.4, "SHE WAS STUCK IN THE STORM."],
          [3.6, 6.2, "THEN A STRANGER STOPPED..."],
          [9.0, 11.6, "...AND GAVE HER HIS UMBRELLA.", "y"],
          [11.6, 13.5, "HE DIDN'T EVEN SAY HIS NAME."],
          [13.7, 15.8, "THE NEXT DAY..."],
          [15.8, 17.9, "SHE WAITED TO GIVE IT BACK."],
          [20.4, 23.5, "ONE UMBRELLA. TWO PEOPLE."],
          [23.7, 26.8, "EVERY DAY AFTER THAT..."],
          [26.8, 29.8, "THEY WALKED HOME TOGETHER."],
          [30.0, 33.4, "UNTIL HER DAD SAW THEM.", [2]],
        ];
        const CARD = { t: 33.6, html: (t) => `<div style="font-size:52px;line-height:1.3">${slam(["WHAT", "WILL", "HER", "DAD", "DO?"], 33.6, t, [3])}</div>${follow(t, 34.3, "2/4")}` };
        const render = (t) => renderAll(t, PART, SC, CAPS, FLASH, CARD);
