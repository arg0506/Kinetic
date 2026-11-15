---
name: bold-web-animation
description: >-
  Adds bold, high-impact animations to websites: hero intro sequences, split-text reveals, scroll-triggered sections, parallax, pinned/horizontal scroll, magnetic buttons, marquees and hover micro-interactions. Use when the user wants to make a site more animated, dynamic, premium or eye-catching, or asks for GSAP / Motion / scroll animations on a landing page or portfolio.
---

# Bold Web Animation

Goal: site ko "wow" feel dena bina performance, accessibility ya code quality kharab kiye. Animation ek clear story sunaye: pehle hero, phir sections, phir CTA.

Recipes ke liye code: `references/recipes.md` padho.

---

## Step 1: Stack detect karo

Pehle project ko samjho, phir decide karo:

| Project | Library |
|---|---|
| Vanilla HTML / Astro / Webflow-like / kisi bhi framework | **GSAP + ScrollTrigger** (default) |
| React / Next.js, sirf component-level motion chahiye | **Motion** (`motion/react`) ya GSAP + `@gsap/react` |
| Sirf hover/tap/small toggles | Plain CSS transitions (library ki zarurat nahi) |

Check karo:
- `package.json` mein already `gsap`, `motion`, `framer-motion`, `lottie` hai ya nahi.
- Agar koi animation library already hai, usi ko use karo. **Doosri library mat add karo.**
- Agar plain HTML hai aur build step nahi, to CDN se load karo (version pin karke):
  `https://cdnjs.cloudflare.com/ajax/libs/gsap/<version>/gsap.min.js` aur `ScrollTrigger.min.js`.

Agar stack clear nahi hai, ek hi sawal poochho. Warna default choose karke bata do ki kya chuna aur kyun.

---

## Step 2: Motion plan banao (code se pehle)

Har page ke liye ye 4 cheezein decide karo:

1. **Hero moment (1 hi):** Page ka sabse bada entrance. Jaise headline split-text reveal, image scale-in.
2. **Section reveals:** Har section ka ek consistent pattern (fade + translateY 30–60px).
3. **Signature effect (1–2 max):** Jaise magnetic button, marquee, parallax image, pinned horizontal scroll. Zyada effects = chaos.
4. **Hover/feedback:** Buttons aur links par chhota response (scale 1.03, color shift).

### Timing rules (bold lekin clean)
- Duration: entrances `0.8–1.2s`, hover `0.2–0.4s`, scroll reveals `0.6–0.9s`.
- Easing: `power3.out`, `power4.out`, `expo.out` entrances ke liye. `none` sirf scrub/parallax ke liye.
- Stagger: `0.06–0.12s` between items. Zyada stagger page ko slow lagta hai.
- Ek hi easing family use karo poore site mein, random mix mat karo.

---

## Step 3: Implement karo

### Rules (har project mein follow karo)

1. **Sirf `transform` aur `opacity` animate karo.** `top`, `left`, `width`, `height`, `margin` animate karne se layout thrash hota hai.
2. **Reduced motion respect karo.** Ye zaroori hai:
   ```js
   const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```
   Reduce true ho to animations skip karke final state dikhao, ya bahut chhote fades rakho.
3. **Cleanup karo.** React mein `useGSAP` (from `@gsap/react`) ya `gsap.context()` use karo. Unmount par ScrollTrigger kill hona chahiye, warna memory leak aur galat positions aate hain.
4. **Content visible rakho bina JS ke.** Agar animation fail ho, text hidden nahi hona chahiye. Initial hidden state JS se set karo, CSS se nahi (ya `<noscript>` fallback do).
5. **`will-change` sparingly.** Sirf active animation par, zyada elements par nahi.
6. **Fonts load hone ke baad split/measure karo** (`document.fonts.ready`), warna split-text ki line breaks galat hoti hain.
7. **Resize par ScrollTrigger refresh** (GSAP automatically karta hai, lekin layout change ke baad `ScrollTrigger.refresh()` call karo).
8. **Mobile par effects halke rakho.** Parallax aur pinned scroll ko `matchMedia('(min-width: 768px)')` ke andar rakho ya intensity kam karo.

### Implementation order
1. Library install / CDN add.
2. Global setup file (`animations.js` ya `lib/motion.ts`): plugin register, reduced-motion check, helper functions.
3. Hero entrance.
4. Section reveals (ek reusable function).
5. Signature effect(s).
6. Hover/micro-interactions.
7. Cleanup aur mobile tuning.

---

## Step 4: Verify karo

Ye sab check karo, kuch assume mat karo:

- [ ] Dev server chalao aur console mein koi error nahi (`npm run dev`, ya HTML file ko browser mein kholo).
- [ ] Har animation ka final state sahi hai (text cut nahi, image overflow nahi).
- [ ] Mobile width (375px) par horizontal scroll nahi aata.
- [ ] Reduced motion ON karke dekho (OS setting ya DevTools > Rendering > Emulate `prefers-reduced-motion`). Content sahi dikhna chahiye.
- [ ] Page navigate karke wapas aao (SPA ho to): animations duplicate nahi hoti, ScrollTrigger leak nahi hota.
- [ ] Agar sambhav ho to Lighthouse / Performance tab mein dekho ki scroll par frame drops nahi hain.

Agar kuch verify nahi kar paaye (jaise browser nahi chala), to final message mein saaf likho ki kya check nahi hua.

---

## Common mistakes

- **Har element par animation.** Sab kuch move karega to kuch bhi highlight nahi hoga. Hero aur 1–2 signature effects par focus karo.
- **Bahut lamba intro (3s+).** User wait nahi karega. Total intro ~1.5–2s rakho.
- **`scrub` ke saath `ease` ka galat use.** Scroll-linked animations mein `ease: "none"` ya ease ke bina scrub karo.
- **Pinned section ke andar wrapper ki height missing.** Pin ke liye parent ko sahi height chahiye, warna pin kaam nahi karega.
- **Lottie/video heavy file bina lazy load ke.** Bada asset page load slow karta hai.

---

## Output expectations

Kaam khatam hone par user ko batao:
- Kaunsi library chuni aur kyun.
- Kaunse files change hue.
- Kaunse effects add hue (hero, reveals, signature).
- Kya verify hua aur kya nahi.
