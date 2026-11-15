# Motion & Website Animation Rules

These rules are generated from the motionGodd-skill repository (19 skills).
Use them whenever the user asks to add, design, review or fix animations on a website.
Start with the "kinetic" section: it decides which specialist section applies.

## Skill index

- **kinetic**: The umbrella skill for production-grade website motion. Use for any request to add, design, review, fix or optimize animations on a website: it chooses the right specialist skill (core, layout, gestures, scroll, scroll-effects, storytelling, hero, navigation, buttons, text, SVG, cursor, transitions, components, performance, accessibility), applies one quality bar, and runs a final checklist. Prefer this skill when the user asks for "best", "premium", "production-ready" or "motion.dev level" animations, or is unsure which motion skill to use.
- **bold-web-animation**: Adds bold, high-impact animations to websites: hero intro sequences, split-text reveals, scroll-triggered sections, parallax, pinned/horizontal scroll, magnetic buttons, marquees and hover micro-interactions. Use when the user wants to make a site more animated, dynamic, premium or eye-catching, or asks for GSAP / Motion / scroll animations on a landing page or portfolio.
- **motion-accessibility**: Accessibility rules for motion on websites: prefers-reduced-motion handling with Motion (MotionConfig, useReducedMotion, CSS fallbacks), vestibular and seizure safety (no flashing, limited parallax and zoom), focus and keyboard behaviour for animated UI, screen reader friendly split text, and how to test motion accessibility. Use when the user asks about accessibility, reduced motion, WCAG, or wants to make any animation safe for everyone. Apply this skill to every other motion skill's output.
- **motion-buttons**: Button and CTA micro-interactions with Motion: hover fill and shine sweep, press feedback, magnetic pull, loading-to-success state change, icon swaps, and link underline draw. Use when the user wants buttons, call-to-action, or small hover and click feedback to feel polished.
- **motion-components**: Production-ready animated UI components built with Motion: accordion, animated tabs with sliding underline, dropdown menu, toast stack, skeleton shimmer, swipeable card stack, carousel with drag and snap, floating action button expand, and command palette open/close. Use when the user needs a complete animated UI component rather than a single effect.
- **motion-core**: Foundation of the Motion animation library (motion/react and motion JS): motion component, initial/animate/exit, variants, springs and tween transitions, keyframes, stagger and orchestration, useAnimate, animate(), MotionConfig reduced motion. Use for any Motion animation task, or as the base before layout, gesture, scroll, text or SVG work.
- **motion-cursor**: Cursor and pointer-driven effects with Motion: custom spring-following cursor, magnetic buttons, cursor trails, cursor state changes on hover targets, and touch fallbacks. Use when the user wants a custom cursor, magnetic elements, pointer-follow effects, or cursor hover states on a portfolio or landing page.
- **motion-dev-animations**: Hub for motion.dev-style animations: routes a request (add, copy or recreate any Motion library effect such as layout/shared-element, gestures, scroll, text, SVG, cursor, page transitions, UI components, or performance tuning) to the right motion-* skill and its verified code. Use when the user asks to add motion.dev animations or any Motion (Framer Motion) effect to their website, or names an effect from the motion.dev examples gallery.
- **motion-gestures**: Gesture-driven interactions with Motion: whileHover, whileTap (with tap count and hold), whileFocus, drag with constraints and elastic edges, drag snap, direction lock, dragControls, swipe-to-dismiss, pan, and pinch. Use for buttons with hover/press feedback, draggable cards or sliders, swipe actions, or touch-friendly controls.
- **motion-hero**: Hero section animations with Motion: staged intro sequences (eyebrow, split headline, subtext, CTA), masked line and word reveals, image or media reveal with scale-in, looping marquee and ticker strips, and hero-to-next-section transitions. Use when the user wants a landing page hero, first-impression intro, or a hero that feels premium on load.
- **motion-layout**: Layout and shared-element animations with Motion: layout and layoutId, shared element transitions (card to detail), LayoutGroup, layoutDependency and layoutAnchor, AnimatePresence exit modes (sync, wait, popLayout), accordion and expand/collapse, animated tab underline, list reordering. Use when elements change size, position or order, or when the user wants a shared-element or "morph into detail" effect.
- **motion-navigation**: Navigation animations with Motion: header that hides on scroll down and returns on scroll up, sticky header with scroll-based background, active section indicator, animated mobile menu drawer, mega menu reveal, and dropdown menus. Use when the user wants a site header or navigation that moves, hides, reveals, or highlights sections with animation.
- **motion-performance**: Performance and bundle optimization for Motion animations: LazyMotion with the m component, the mini animate and useAnimate builds, transform-only rules, avoiding layout thrash, handling large animated lists, reduced motion, and debugging janky animations. Use when the user reports laggy or janky animations, a large bundle, or wants to optimize Motion for production.
- **motion-scroll**: Scroll-based animations with Motion: scroll-linked motion with useScroll and useTransform, parallax, smoothed scroll with useSpring, scroll progress bars, horizontal scroll sections, scroll-triggered reveals with whileInView and viewport, useInView, and the vanilla scroll() and inView() APIs. Use for parallax heroes, scroll storytelling, progress indicators, scroll reveals, or horizontal galleries.
- **motion-scroll-effects**: Catalog of scroll-driven effects built with Motion, each tested in a real browser: fixed scroll progress bar, zoom-on-scroll sticky hero, word-by-word highlight, clip-path reveal, pinned horizontal scroll, multi-speed parallax layers, 3D tilt-in, background color shift on scroll, staggered grid reveal, and scroll-linked numbers. Use when the user wants a specific scroll effect on a website, or asks for "scroll pe alag-alag animations".
- **motion-storytelling**: Scrollytelling and story-style scroll animations with Motion: chapter-based sticky stages that crossfade as the reader scrolls, step-by-step process timelines, scroll-driven scene changes with text and visuals kept in sync, and narrative reveal sequences. Use when the user wants a story, case study, product walkthrough, "how it works" steps, or any scroll-driven narrative on a website.
- **motion-svg**: SVG animations with Motion: path line drawing (pathLength), path morphing between shapes, stroke and dash animations, animated icons (checkmark draw, hamburger to X), loading spinners and dot/bar loaders, and SVG attribute animation. Use for animated icons, logo draw-on effects, loaders, or morphing shapes.
- **motion-text**: Text and number animations with Motion: split-text word and character reveals, line mask reveals, scroll-linked word highlighting, typewriter with natural typing rhythm, scramble (decode) text, animated number counters and digit tickers. Use when the user wants animated headings, typing effects, counting stats, or text reveal effects on a site.
- **motion-transitions**: Page and route transitions with Motion: fade and slide route changes, full-screen curtain or wipe overlays, Next.js App Router transition patterns, and enter/exit for modals, dialogs, drawers and toasts. Use when the user wants animated page navigation, a page-change overlay, or smooth modal/drawer open-close transitions.

## Core rules (always apply)

1. Animate only transform and opacity. Use layout / layoutId for size and position changes.
2. Respect reduced motion: wrap the app in MotionConfig reducedMotion="user" (React) or check prefers-reduced-motion (vanilla).
3. Keep scroll-linked input ranges inside [0, 1]. Out-of-range offsets crash the native ScrollTimeline path.
4. Use stable keys for AnimatePresence children. Never use array index as key for reorderable lists.
5. Keep motion values out of React state. Use useMotionValue, useSpring, useTransform.
6. Clean up animate(), scroll(), inView() and event listeners on unmount.
7. Split text needs real space characters between words and aria-label on the parent.
8. Use the library the project already has (motion, framer-motion, or gsap). Do not add a second one.
9. Intro under 2 seconds. Entrance 0.6 to 1.0s, hover 0.2 to 0.4s, easing [0.22, 1, 0.36, 1].
10. Verify before claiming done: no console errors, reduced motion check, keyboard focus, mobile width without overflow.

---



# SKILL: kinetic

> The umbrella skill for production-grade website motion. Use for any request to add, design, review, fix or optimize animations on a website: it chooses the right specialist skill (core, layout, gestures, scroll, scroll-effects, storytelling, hero, navigation, buttons, text, SVG, cursor, transitions, components, performance, accessibility), applies one quality bar, and runs a final checklist. Prefer this skill when the user asks for "best", "premium", "production-ready" or "motion.dev level" animations, or is unsure which motion skill to use.

# Motion God (Umbrella)

Ye skill router aur quality gate dono hai. Ek request aaye to yahan se shuru karo, sahi specialist skill chuno, aur end mein quality checklist chalao.

## Step 1: Request samjho (ek hi sawal, zarurat ho to)

Pehle ye 4 cheezein clear karo. Jo clear ho, usko assume karo aur final message mein batao.

1. **Kahan:** hero, section, navigation, button, page transition, story, ya poori site.
2. **Kaisa feel:** subtle (premium, calm), bold (energetic, playful), ya cinematic (story).
3. **Stack:** React / Next.js (`motion/react`), vanilla JS (`motion`), Vue (`motion-v`), ya GSAP (`bold-web-animation`). Project ke `package.json` se decide karo.
4. **Constraints:** mobile priority, performance budget, accessibility level (default: WCAG AA + reduced motion).

## Step 2: Specialist skill chuno

| Need | Skill |
|---|---|
| Koi bhi Motion ka base code | `motion-core` |
| Shared element, expand, reorder, tab underline | `motion-layout` |
| Hover, tap, drag, swipe | `motion-gestures` |
| Scroll-linked, parallax, reveal | `motion-scroll` |
| Ready-made scroll effects | `motion-scroll-effects` |
| Story / chapters / step timelines | `motion-storytelling` |
| Hero intro, marquee, media reveal | `motion-hero` |
| Header hide/show, menus, active section | `motion-navigation` |
| Buttons, CTA, loading states | `motion-buttons` |
| Split text, typewriter, counters | `motion-text` |
| SVG draw, morph, loaders | `motion-svg` |
| Custom cursor, magnetic | `motion-cursor` |
| Page transitions, modal, drawer, toast | `motion-transitions` |
| Accordion, tabs, carousel, card stack | `motion-components` |
| Lag, bundle size, big lists | `motion-performance` |
| Reduced motion, a11y, safety | `motion-accessibility` (har kaam ke saath) |
| GSAP / ScrollTrigger project | `bold-web-animation` |
| motion.dev examples ka naam | `motion-dev-animations` (hub) |

Ek request mein kai skills ho sakti hain. Pehle `motion-core` ka setup, phir baaki specialist code.

## Step 3: Motion design ka plan (code se pehle)

- **Ek signature moment** per page (hero ya story). Baaki sab usse support karein.
- **Timing scale:** entrance 0.6 to 1.0s, hover 0.2 to 0.4s, scroll reveal 0.6 to 0.9s.
- **Easing:** ek hi family: `[0.22, 1, 0.36, 1]` (expo out) entrances ke liye, `"linear"` sirf loops aur scrub ke liye.
- **Stagger:** 0.06 to 0.12s. Zyada stagger page ko slow banata hai.
- **Motion budget:** ek screen par 2 se 3 motion ideas, usse zyada nahi.

## Step 4: Implement karo (quality rules)

1. **Existing component pehle dhoondo.** Naya UI system mat banao.
2. **Sirf `transform` aur `opacity`** animate karo. Layout ke liye `layout`/`layoutId`.
3. **Reduced motion:** `MotionConfig reducedMotion="user"` app root par. Har scroll effect ko `useReducedMotion` se branch karo.
4. **Scroll offsets [0, 1] ke andar** rakho (native ScrollTimeline error se React tree crash hota hai).
5. **Cleanup:** `animate()`, `scroll()`, `inView()`, event listeners unmount par band karo.
6. **Stable keys** AnimatePresence children par (index nahi, id).
7. **Motion values** ko state mein mat daalo (har frame re-render).
8. **Mobile:** parallax aur pin ki range kam, ya desktop-only.
9. **Text:** split text par `aria-label` aur `aria-hidden` spans.
10. **Dependency:** project mein pehle se jo library hai (`motion`, `framer-motion`, `gsap`) wahi use karo. Doosri library mat jodo.

## Step 5: Verify (kuch assume mat karo)

- [ ] Dev server par console mein error ya warning nahi (`Offsets must be...`, `Cannot read properties of null` type errors dhoondo).
- [ ] Har interaction chalta hai (hover, click, drag, scroll).
- [ ] Final state sahi hai (text cut nahi, overflow nahi).
- [ ] Reduced motion ON: content turant visible, koi bhaari effect nahi.
- [ ] Keyboard se sab reachable, focus visible.
- [ ] Mobile 375px: horizontal overflow nahi.
- [ ] Type-check (`tsc`) aur build pass.
- [ ] Agar browser test ho sakta hai to Playwright se values check karo (test page ke pattern ko copy karo).

Jo verify nahi hua, final message mein saaf likho.

## Step 6: Final message ka format

1. Kya banaya: skills aur files (path ke saath).
2. Kya verify hua, aur kaise (build, browser test, console errors).
3. Kya approximate hai ya verify nahi hua.
4. Next step ek line mein (jaise "kisi real page par feel check karo").

## Anti-patterns (ye kabhi mat karo)

- Har element par animation. Motion ka matlab kam, sahi jagah par.
- 3 second se lamba intro.
- `transition-all` Tailwind class motion element par.
- Scroll handler mein `setState` (har frame re-render).
- Reduced motion ignore karna.
- `display: none` se text chhupa kar JS se dikhana.
- Bina test kiye "production ready" bolna.

## Reference

- `motion-dev-animations/references/catalog.md`: motion.dev examples ke patterns (verified aur approximate ka label ke saath).
- the internal test page: test site aur browser test scripts (browser test script, browser test script, browser test script).
- `README.md` (repo root): install aur usage guide.

---


# SKILL: bold-web-animation

> Adds bold, high-impact animations to websites: hero intro sequences, split-text reveals, scroll-triggered sections, parallax, pinned/horizontal scroll, magnetic buttons, marquees and hover micro-interactions. Use when the user wants to make a site more animated, dynamic, premium or eye-catching, or asks for GSAP / Motion / scroll animations on a landing page or portfolio.

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

## Reference: recipes.md

# Bold Animation Recipes

Har recipe ka use `SKILL.md` ke Step 2 plan ke hisaab se karo. Sab recipes mein reduced-motion check pehle se hona chahiye (SKILL.md, Rule 2).

Library version: npm par latest GSAP check karo aur wahi pin karo. CDN use kar rahe ho to exact version likho.

---

## 0. Setup (GSAP, vanilla)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/<version>/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/<version>/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>
```

React/Next mein:
```bash
npm i gsap @gsap/react
```
```js
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
```

---

## 1. Hero intro timeline

Headline, subtext aur CTA ek ke baad ek aate hain. Ye har page ka opening moment hai.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
  .from('.hero-title .line', { yPercent: 110, duration: 1.1, stagger: 0.08 }, '-=0.3')
  .from('.hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.7')
  .from('.hero-cta', { y: 16, opacity: 0, duration: 0.6 }, '-=0.5');

if (reduce) tl.progress(1); // final state directly
```

HTML side ke liye `.hero-title .line` ko `overflow: hidden` wrapper ke andar rakho taaki yPercent reveal clean dikhe.

---

## 2. Split-text line reveal

Har line alag mask se upar aati hai. Hero title par best lagta hai.

```js
// GSAP SplitText (recent GSAP versions mein free hai)
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  const split = SplitText.create('.split-title', { type: 'lines', mask: 'lines' });
  gsap.from(split.lines, {
    yPercent: 100,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.08,
  });
});
```

Plugin nahi chahiye to fallback: heading ko words mein manually split karke `span` wrap karo aur `.word` animate karo.

---

## 3. Scroll reveal (reusable)

Ek hi function sab sections par.

```js
function revealOnScroll(selector = '[data-reveal]') {
  if (reduce) return;
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      y: 48,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
revealOnScroll();
```

Group reveal (cards ek saath): `gsap.from(items, { ..., stagger: 0.1, scrollTrigger: { trigger: container, start: 'top 80%' } })`.

---

## 4. Parallax image (scrub)

Image container ke andar image ko slow move karo, scroll ke saath.

```js
if (!reduce && window.innerWidth >= 768) {
  gsap.to('.parallax-img', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
```

Parent `.parallax-wrap` par `overflow: hidden` lagao, warna image bahar nikal jaayegi.

---

## 5. Pinned horizontal scroll

Vertical scroll ke andar horizontal panels slide hote hain.

```js
if (!reduce) {
  const panels = gsap.utils.toArray('.h-panel');
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.h-wrap',
      pin: true,
      scrub: 1,
      end: () => '+=' + document.querySelector('.h-wrap').offsetWidth * (panels.length - 1),
      invalidateOnRefresh: true,
    },
  });
}
```

HTML: `.h-wrap` (pinned) > `.h-track` (display flex, width max-content) > `.h-panel`.

---

## 6. Magnetic button

Cursor ke paas aate hi button thoda khinchta hai. Desktop-only.

```js
if (!reduce && matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    });
    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
```

`gsap.quickTo` performance ke liye best hai (har frame new tween nahi banta).

---

## 7. Marquee (infinite text strip)

Pure CSS, koi JS nahi. Lightweight aur smooth.

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee__track {
  display: inline-flex;
  gap: 3rem;
  animation: marquee 18s linear infinite;
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```

HTML: track ke andar same content do baar duplicate karo (`-50%` seamless loop ke liye zaroori hai).

---

## 8. Button hover fill (CSS)

Chhota, clean hover feedback.

```css
.btn {
  position: relative;
  overflow: hidden;
  transition: color 0.35s ease;
  isolation: isolate;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}
.btn:hover::before { transform: scaleX(1); }
.btn:hover { color: var(--btn-hover-text, #fff); }
```

Note: `currentColor` background ke saath text color ko contrast ke liye `--btn-hover-text` set karo, warna text dikhai nahi dega.

---

## 9. Motion (React) version: staggered list entrance

Agar project React + Motion use kar raha hai.

```jsx
import { motion } from 'motion/react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Features({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {items.map((t) => (
        <motion.li key={t} variants={item}>{t}</motion.li>
      ))}
    </motion.ul>
  );
}
```

Reduced motion: Motion ke `MotionConfig reducedMotion="user"` wrap se OS setting automatically respect hoti hai.

---

## Quick picker

| Goal | Recipe |
|---|---|
| Page pehli baar khule to wow | 1 + 2 |
| Har section scroll par aaye | 3 |
| Image mein depth | 4 |
| Case study / portfolio gallery | 5 |
| CTA par interactive feel | 6 + 8 |
| Logos / brand strip | 7 |
| React app ka list/feature grid | 9 |

---


# SKILL: motion-accessibility

> Accessibility rules for motion on websites: prefers-reduced-motion handling with Motion (MotionConfig, useReducedMotion, CSS fallbacks), vestibular and seizure safety (no flashing, limited parallax and zoom), focus and keyboard behaviour for animated UI, screen reader friendly split text, and how to test motion accessibility. Use when the user asks about accessibility, reduced motion, WCAG, or wants to make any animation safe for everyone. Apply this skill to every other motion skill's output.

# Motion Accessibility

Ye skill har dusre motion skill ke saath lagti hai. Koi bhi animation tab tak complete nahi jab tak reduced motion, keyboard aur screen reader ke liye check na ho.

Verified: browser test script aur browser test script mein reduced-motion check hai (hero text turant dikhta hai). Screen reader ka test manual hai (neeche).

## 1. Reduced motion: teen levels

### Level A: global (sabse pehle ye lagao)

```tsx
import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

- `"user"` OS setting follow karta hai. Ye default choice hai.
- Reduced ON hone par Motion transform aur layout animations band karta hai. Opacity aur color chalte rehte hain.

### Level B: component mein branch

```tsx
const reduce = useReducedMotion()
<motion.div initial={reduce ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} />
```

- `initial={false}` ka matlab: enter animation skip, final state turant.
- Scroll-linked effects (parallax, zoom) par `reduce` ho to effect ko disable karo, ya value flat rakho.

### Level C: CSS fallback (non-Motion elements)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- CSS marquee, spinners aur CSS transitions ke liye ye safety net hai.

### Reduced motion ka matlab kya hai?

- Ye NAHI matlab ki page broken dikhe. Content ka final state turant dikhe.
- Loading spinner band mat karo: uski jagah static indicator ya text do ("Loading…").
- Opacity fade chal sakta hai, lekin zoom, slide, parallax, spin band karo.

## 2. Vestibular aur seizure safety

- **Flash:** 3 se zyada flashes per second na ho (seizure risk). Blink, strobe, rapid color swap avoid karo.
- **Parallax aur zoom:** large motion (bade elements, tez) motion sickness deta hai. Reduced ON par band.
- **Auto-play:** auto-moving carousel ko pause karne ka control do, aur 5 second se zyada auto-advance mat karo.
- **Hover effects:** 3D tilt aur big scale hover par reduced motion mein band.

## 3. Focus aur keyboard

- Jo element animate hota hai, use keyboard se focus kar sakte ho (`tabIndex` ya native button/link).
- Modal, drawer aur menu open hone par focus andar move karo, aur close par wapas trigger par.
- `whileFocus` se focus ring dikhao, lekin focus ring ko animation se hide mat karo.
- Focus ring `outline` se band mat karo: `:focus-visible` style do.

```tsx
<motion.button whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,.7)" }}>Action</motion.button>
```

## 4. Screen reader friendly text animation

Split text (words ya letters) mein screen reader har letter alag padhta hai. Fix:

```tsx
<h1 aria-label="Motion skills test page">
  {words.map((w, i) => (
    <span key={i} aria-hidden="true">...</span>
  ))}
</h1>
```

- Parent par `aria-label` ho, aur split spans par `aria-hidden="true"`.
- Typewriter effect ke liye final text ko live region mein do, taaki screen reader ek hi baar padhe, har letter par nahi.

## 5. Live updates (toasts, loaders, counters)

- Toast ko `role="status"` (ya `aria-live="polite"`) do.
- Counter ka final value screen reader ke liye accessible ho: animate karte waqt bhi text DOM mein sahi value rakho, ya `aria-label` mein final number do.
- Loader ko `role="status"` aur `aria-label="Loading"` do.

## 6. Contrast aur color animation

- Color animation (background shift) ke dauran text contrast WCAG (4.5:1 normal text, 3:1 large) se neeche na jaaye. Har color stop par check karo.
- Sirf color se meaning mat do (jaise active tab sirf color se nahi, underline se bhi).

## 7. Testing checklist

- [ ] OS setting "Reduce motion" ON karke poori page scroll karo. Content visible, koi effect bhaari na lage.
- [ ] Keyboard only: Tab se sab interactive elements tak pahuncho, focus dikhe.
- [ ] Screen reader (NVDA on Windows, VoiceOver on Mac): heading order aur split text sahi padhe jaaye.
- [ ] Zoom 200%: layout nahi tootta.
- [ ] Flash test: koi element 3/sec se zyada flash nahi karta.
- [ ] Console mein koi error nahi (browser test script aur browser test script chalao).

## Automated checks

- the internal test page reduced motion par hero text check karta hai.
- Axe (`@axe-core/playwright`) ya Lighthouse Accessibility audit add karo CI mein.

## Verify

Reduced motion ON, keyboard aur screen reader ke checklist ke saath ek final pass karo. Jo nahi check hua, final message mein likho.

---


# SKILL: motion-buttons

> Button and CTA micro-interactions with Motion: hover fill and shine sweep, press feedback, magnetic pull, loading-to-success state change, icon swaps, and link underline draw. Use when the user wants buttons, call-to-action, or small hover and click feedback to feel polished.

# Motion Buttons

Button ka kaam click ko confirm karna hai. Animation chhota (0.2 se 0.4s), aur state se linked ho: hover, press, loading, success.

Verified: the internal test page (`ShineButton`, `LoadingButton`) aur browser test script (shine sweep, loading to sent).

## 1. Shine sweep (hover)

```tsx
const shine = { rest: { x: "-100%" }, hover: { x: "100%" } }

<motion.button className="btn" initial="rest" whileHover="hover" whileTap={{ scale: 0.97 }}
  variants={{ rest: {}, hover: {} }}>
  <motion.span className="shine" variants={shine}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
  <span className="btn-label">{children}</span>
</motion.button>
```

```css
.btn { position: relative; overflow: hidden; }
.shine { position: absolute; inset: 0; background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent); pointer-events: none; }
.btn-label { position: relative; }
```

- Parent `variants={{ rest: {}, hover: {} }}` do: iske bina `whileHover="hover"` ka label child tak propagate karne mein issue ho sakta hai (test page mein yahi pattern kaam kiya).
- Overlay `pointer-events: none` ho, warna click block hota hai.

## 2. Press feedback

```tsx
<motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", bounce: 0.25, visualDuration: 0.25 }}>
  Continue
</motion.button>
```

- Hover par thoda upar, press par thoda chhota. Ye sabse safe default hai.
- Touch device par `whileHover` nahi chalta, press feedback zaroor lagao.

## 3. Loading to success

Button ka label `AnimatePresence mode="wait"` mein badlo: idle, loading, done.

```tsx
const [state, setState] = useState<"idle" | "loading" | "done">("idle")
const label = state === "idle" ? "Send" : state === "loading" ? "Sending…" : "Sent ✓"

<motion.button aria-busy={state === "loading"} onClick={() => state === "idle" && setState("loading")}>
  <AnimatePresence mode="wait" initial={false}>
    <motion.span key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      {label}
    </motion.span>
  </AnimatePresence>
</motion.button>
```

- Ek hi `setTimeout` (ya async request) se state badlo, aur cleanup (`clearTimeout`) useEffect mein karo.
- Loading ke dauran button disabled ya `aria-busy` ho, double submit na ho.
- Testbed mein ye test hua: "Sending…" aur phir "Sent ✓".

## 4. Magnetic CTA

`motion-cursor` skill ka `Magnetic` wrapper use karo. Primary CTA par hi lagao, har button par nahi.

## 5. Icon swap

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.svg key={copied ? "check" : "copy"} initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
    {/* icon */}
  </motion.svg>
</AnimatePresence>
```

- Icon ke `key` ko state se linked rakho, taaki swap animate ho.

## 6. Link underline draw

```css
.link { background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px; background-position: 0 100%; background-repeat: no-repeat; transition: background-size .35s cubic-bezier(.22,1,.36,1); }
.link:hover { background-size: 100% 1px; }
```

Ye CSS-only hai, aur `transform` nahi `background-size` animate karta hai. Chhota element hai, to performance theek rehti hai.

## Rules

1. Button ka size hover par change mat karo (layout shift hota hai). Sirf `transform` aur `opacity`.
2. Har button par focus-visible ring rakho (`:focus-visible`), motion se pehle.
3. Loading state mein label badalo, layout ko nahi.
4. Ek screen par 1 primary CTA ke liye zyada motion, baaki buttons ke liye kam.

## Common mistakes

- `whileHover` ke saath CSS `transition: all` (Tailwind `transition-all`): dono conflict karte hain.
- `whileTap` ko `scale` ke bajaye `width` se karna: layout jump.
- Loading mein `setTimeout` cleanup na karna: unmount ke baad state update warning.

## Verify

1. Hover, press, focus ring teeno dikhte hain.
2. Loading flow: idle, loading, done sahi order mein.
3. Touch device par press feedback kaam karta hai.
4. Reduced motion par shine aur spring band ho (instant state change).

---


# SKILL: motion-components

> Production-ready animated UI components built with Motion: accordion, animated tabs with sliding underline, dropdown menu, toast stack, skeleton shimmer, swipeable card stack, carousel with drag and snap, floating action button expand, and command palette open/close. Use when the user needs a complete animated UI component rather than a single effect.

# Motion Components

Ye complete components hain jo copy karke project mein use kiye ja sakte hain. Har component ke liye building blocks `motion-core`, `motion-layout` aur `motion-gestures` mein hain.

## Rules for all components

- Existing project ka component library (shadcn, Radix, Base UI) hai to unke primitives par motion lagao, naya UI system mat banao.
- Accessibility: role, aria attributes aur keyboard navigation zaroor do.
- Reduced motion: `useReducedMotion()` se transitions ko instant ya opacity-only rakho.

---

## 1. Accordion

```jsx
function Accordion({ items }) {
  const [openId, setOpenId] = useState(null)
  return items.map((it) => {
    const open = openId === it.id
    return (
      <div key={it.id}>
        <button aria-expanded={open} onClick={() => setOpenId(open ? null : it.id)}>
          {it.title}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="panel" role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}>
              {it.body}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  })
}
```

## 2. Tabs with sliding underline

```jsx
function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <LayoutGroup id="tabs">
      <div role="tablist" style={{ display: "flex", gap: 16 }}>
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id}
            onClick={() => setActive(t.id)} style={{ position: "relative" }}>
            {t.label}
            {active === t.id && (
              <motion.span layoutId="tab-underline"
                style={{ position: "absolute", left: 0, right: 0, bottom: -4, height: 2, background: "currentColor" }}
                transition={{ type: "spring", bounce: 0.15, visualDuration: 0.4 }} />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} role="tabpanel"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}>
          {tabs.find((t) => t.id === active).content}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
```

`LayoutGroup` import `motion/react` se karo.

## 3. Dropdown menu

```jsx
<AnimatePresence>
  {open && (
    <motion.ul role="menu" key="menu"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ transformOrigin: "top right" }}>
      {items.map((i) => (
        <motion.li key={i.id} role="none">
          <motion.button role="menuitem" whileHover={{ x: 4 }} onClick={i.onSelect}>{i.label}</motion.button>
        </motion.li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>
```

Keyboard arrow navigation alag se implement karo (Radix ya Base UI menu use karo to free milta hai).

## 4. Toast stack

```jsx
<AnimatePresence initial={false} mode="popLayout">
  {toasts.map((t) => (
    <motion.div key={t.id} layout role="status"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ type: "spring", bounce: 0.15, visualDuration: 0.4 }}>
      {t.message}
    </motion.div>
  ))}
</AnimatePresence>
```

Auto-dismiss ke liye `setTimeout` alag se lagao, aur `toasts` state se item hatao.

## 5. Skeleton shimmer

```jsx
<motion.div aria-busy="true" style={{ height: 16, borderRadius: 4, overflow: "hidden",
  background: "#e5e7eb", position: "relative" }}>
  <motion.div style={{ position: "absolute", inset: 0,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent)" }}
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
</motion.div>
```

## 6. Swipeable card stack

```jsx
function CardStack({ cards, onDismiss }) {
  const top = cards[0]
  return (
    <AnimatePresence>
      {top && (
        <SwipeCard key={top.id} onDismiss={() => onDismiss(top.id)}>
          {top.content}
        </SwipeCard>
      )}
    </AnimatePresence>
  )
}
```

`SwipeCard` ka code `motion-gestures` skill ke "Swipe to dismiss" pattern se lo. Piche ke cards ko scale aur y offset se dikhao: `style={{ scale: 1 - i * 0.05, y: i * 10 }}`.

## 7. Carousel with drag

```jsx
function Carousel({ slides }) {
  const trackRef = useRef(null)
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div ref={trackRef} drag="x" style={{ display: "flex", gap: 16, cursor: "grab" }}
        dragConstraints={{ right: 0, left: -(slides.length - 1) * 320 }}
        dragElastic={0.1} dragMomentum>
        {slides.map((s) => (
          <div key={s.id} style={{ flex: "0 0 300px" }}>{s.content}</div>
        ))}
      </motion.div>
    </div>
  )
}
```

- `-(n-1) * (slide width + gap)` ko actual width se match karo.
- Snap chahiye to drag end par `info.offset.x` ke hisaab se `animate` se nearest slide par jaao.
- Carousel ke `<img>` par `draggable={false}` do.

## 8. FAB expand

```jsx
<motion.div layout style={{ borderRadius: 999, background: "#111", color: "#fff", overflow: "hidden" }}
  transition={{ type: "spring", bounce: 0.15, visualDuration: 0.35 }}>
  <button onClick={() => setOpen(!open)} style={{ padding: 16 }}>+</button>
  <AnimatePresence>
    {open && (
      <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* action buttons */}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

## 9. Command palette

Overlay ka `motion-transitions` modal pattern use karo. Results list ke liye `AnimatePresence` + `layout` + `popLayout` (motion-layout section 6).

---

## Verify (sab components ke liye)

- Keyboard se open, navigate aur close kar sakte ho.
- Mobile width par layout break nahi hota.
- Reduced motion ON par component kaam karta hai aur animations skip ya simple hain.

---


# SKILL: motion-core

> Foundation of the Motion animation library (motion/react and motion JS): motion component, initial/animate/exit, variants, springs and tween transitions, keyframes, stagger and orchestration, useAnimate, animate(), MotionConfig reduced motion. Use for any Motion animation task, or as the base before layout, gesture, scroll, text or SVG work.

# Motion Core

Ye skill sabse pehle load hoti hai. Layout, gestures, scroll, text aur SVG skills ke code ki neev yahi hai.

## 1. Install aur imports

| Stack | Install | Import |
|---|---|---|
| React / Next.js | `npm i motion` | `import { motion, AnimatePresence, useAnimate } from "motion/react"` |
| Vanilla JS | `npm i motion` | `import { animate, stagger, scroll, inView } from "motion"` |
| Vue | `npm i motion-v` | `<motion.div :animate="{ x: 100 }" />` |

- Pehle `package.json` dekho. Agar `framer-motion` already hai, to wahi use karo (same API, import path `framer-motion`). Doosra package mat add karo.
- Next.js App Router mein motion component wali file ke upar `"use client"` lagao.
- Tailwind ki `transition-*` classes motion ke saath conflict karti hain. Motion wale element se hata do.

## 2. Basic animation

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

- `initial={false}` enter animation skip karta hai aur `animate` values seedhe dikhata hai.
- `ease` naam ho sakta hai (`"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`, `"circOut"`, `"backOut"`, `"anticipate"` etc.), cubic-bezier array ho sakta hai, ya function.
- Ek achha default curve: `[0.22, 1, 0.36, 1]` (expo-like out).

## 3. Springs (sabse zyada use hone wali)

```jsx
transition={{ type: "spring", bounce: 0.25, visualDuration: 0.6 }}
```

- `bounce` (-1 se 1) aur `visualDuration` (seconds) se spring predictable rehti hai. Ye tuning ke liye best hai.
- Physics control chahiye to `stiffness`, `damping`, `mass` use karo. Inme se koi bhi set ho to `bounce` override ho jaata hai.
- Presets (starting points):
  - Bouncy: `{ type: "spring", stiffness: 300, damping: 18 }`
  - Smooth: `{ type: "spring", stiffness: 120, damping: 22 }`
  - Snappy UI: `{ type: "spring", bounce: 0.15, visualDuration: 0.35 }`
- `velocity` aur `restDelta` finishing feel tune karte hain. Zaroorat ho tabhi.
- `type: "inertia"` drag momentum ke liye hai (`power`, `timeConstant`, `bounceStiffness`, `bounceDamping`). Zyadatar cases mein gestures skill ke dragTransition se hi kaam chal jaata hai.

## 4. Per-property transition

```jsx
transition={{
  default: { type: "spring", bounce: 0.2 },
  opacity: { duration: 0.3, ease: "linear" },
}}
```

`default` fallback hai, aur key-wise override possible hai.

## 5. Keyframes

```jsx
<motion.div
  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
  transition={{ duration: 1.2, times: [0, 0.4, 1], ease: ["easeOut", "easeInOut"] }}
/>
```

- `times` ki length keyframes ke barabar honi chahiye.
- `repeat: Infinity`, `repeatType: "reverse"` (ya `"mirror"`) aur `repeatDelay` loops ke liye.

## 6. Variants aur orchestration

```jsx
const list = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08, { startDelay: 0.1 }) } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

<motion.ul variants={list} initial="hidden" animate="show">
  {items.map((i) => <motion.li key={i.id} variants={item} />)}
</motion.ul>
```

- Variant label `animate`, `initial`, `whileHover` etc. mein string ke roop mein de sakte ho. Array bhi chal sakta hai: `animate={["visible", "active"]}`.
- `stagger` `motion` package se import hota hai. Variants mein `delayChildren: stagger(...)` documented form hai.
- `when: "beforeChildren"` ya `"afterChildren"` parent aur children ka order decide karta hai.
- Dynamic variant: `visible: (i) => ({ opacity: 1, transition: { delay: i * 0.1 } })`, aur `custom={i}` prop se pass karo.
- `inherit={false}` parent ke variant changes ko rokta hai.

## 7. Imperative animation: useAnimate (React)

```jsx
import { useAnimate } from "motion/react"
import { stagger } from "motion"

function Reveal() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("li", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.6 })
  }, [])

  return <ul ref={scope}>{/* li items */}</ul>
}
```

- `scope` ref ke andar ke selectors hi target honge.
- Component unmount hone par animations apne aap clean ho jaati hain.
- Controls: `controls.speed`, `controls.time`, `controls.play()`, `controls.pause()`, `controls.stop()`. `stop()` ke baad animation restart nahi hoti.

## 8. Imperative animation: animate() (JS)

```js
import { animate, stagger } from "motion"

animate(".card", { opacity: [0, 1], y: [24, 0] }, { delay: stagger(0.08), duration: 0.7 })
const controls = animate(0, 100, { duration: 1, onUpdate: (v) => (el.textContent = Math.round(v)) })
controls.then(() => console.log("done"))   // Promise-like; animation khatam hone par
```

- Bundle chhota chahiye to `import { animate } from "motion/mini"` (lagbhag 3.2kb) use karo.
- Cleanup: `controls.stop()` component/page destroy par call karo.

## 9. Reduced motion

```jsx
import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

- `"user"` OS setting respect karta hai. `"never"` default hai. `"always"` sirf debugging ke liye.
- Reduce ON hone par transform aur layout animations band hoti hain. Opacity aur color animations chalti rehti hain.
- Component mein branch chahiye to `useReducedMotion()` boolean deta hai (`x: shouldReduce ? 0 : -100`).

## 10. Rules (hamesha follow karo)

1. Transform (`x`, `y`, `scale`, `rotate`) aur opacity animate karo. Layout properties (`width`, `top`) ko sirf zaroorat ho to animate karo, aur tab `layout` prop use karo.
2. Ek hi element par `animate` aur `whileHover` ko same property par mat do. Conflict hota hai.
3. Exit animation ke liye `AnimatePresence` ko conditional ke bahar rakho aur har child ko stable `key` do.
4. Animation values ko React state se mat chalao (har frame re-render). `useMotionValue` / `useSpring` use karo.
5. Mobile par heavy effects kam karo.

## Verify

- `npm run dev` par console mein error na ho.
- Enter, hover, exit aur reduced motion (OS setting ya DevTools emulation) test karo.
- Final message mein batao kya verify hua aur kya nahi.

---


# SKILL: motion-cursor

> Cursor and pointer-driven effects with Motion: custom spring-following cursor, magnetic buttons, cursor trails, cursor state changes on hover targets, and touch fallbacks. Use when the user wants a custom cursor, magnetic elements, pointer-follow effects, or cursor hover states on a portfolio or landing page.

# Motion Cursor

Cursor effects sirf fine pointer (mouse) devices par lagao. Touch devices par native behavior hi rehne do.

## 0. Sirf mouse par enable karo

```jsx
const isFinePointer = typeof window !== "undefined" && matchMedia("(pointer: fine)").matches
const reduce = useReducedMotion()

if (!isFinePointer || reduce) return null
```

Custom cursor ke saath native cursor hide karna ho to sirf `(pointer: fine)` ke andar `cursor: none` lagao.

## 1. Spring-following custom cursor

Verified pattern (motion.dev pointer spring demo par based).

```jsx
import { motion, useSpring } from "motion/react"

function CustomCursor() {
  const x = useSpring(0, { stiffness: 400, damping: 30, mass: 0.5 })
  const y = useSpring(0, { stiffness: 400, damping: 30, mass: 0.5 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  return (
    <motion.div
      style={{ x, y, position: "fixed", left: 0, top: 0, pointerEvents: "none", zIndex: 9999,
               translateX: "-50%", translateY: "-50%" }}
      className="cursor-dot"
    />
  )
}
```

- Stiffness zyada ho to cursor tight follow karta hai, kam ho to lag ke saath floaty.
- `translateX`/`translateY` center ke liye hain. Agar motion version mein ye prop kaam na kare to `x` aur `y` ke saath CSS `margin: -8px` (size ka half) use karo.
- `pointer-events: none` zaroori hai, warna cursor click block karega.

## 2. Cursor grows on hover targets

Cursor ka state (`default`, `link`, `button`) context se share karo, ya simple: `useMotionValue` ke bajaye variant.

```jsx
const [variant, setVariant] = useState("default")

<motion.div
  className="cursor-dot"
  variants={{
    default: { width: 16, height: 16, opacity: 0.9 },
    link: { width: 64, height: 64, opacity: 0.35 },
  }}
  animate={variant}
  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.35 }}
  style={{ x, y, position: "fixed", pointerEvents: "none", translateX: "-50%", translateY: "-50%" }}
/>

// target par
<a onPointerEnter={() => setVariant("link")} onPointerLeave={() => setVariant("default")}>Link</a>
```

- `setVariant` har hover par state change karta hai. Ye zyada elements par ho to context se banao, aur `useMotionValue` ke saath mix mat karo.

## 3. Magnetic element

Cursor ke paas aate hi element khinchta hai.

```jsx
import { motion, useMotionValue, useSpring } from "motion/react"

function Magnetic({ children, strength = 0.3 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })

  return (
    <motion.div
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}
```

- Inner element ko `pointer-events` mat rokne do, warna hover band ho sakta hai.
- `strength` 0.2 se 0.4 ke beech achha lagta hai.

## 4. Cursor trail

Chhote dots ek ke baad ek follow karte hain, har ek ka spring alag delay se.

```jsx
function Trail({ count = 8 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  return Array.from({ length: count }).map((_, i) => (
    <TrailDot key={i} x={x} y={y} index={i} />
  ))
}

function TrailDot({ x, y, index }) {
  const stiffness = 400 - index * 35
  const sx = useSpring(x, { stiffness, damping: 25 })
  const sy = useSpring(y, { stiffness, damping: 25 })
  return (
    <motion.div style={{ x: sx, y: sy, position: "fixed", left: 0, top: 0, pointerEvents: "none",
      width: 8, height: 8, borderRadius: 999, opacity: 1 - index / 10, background: "currentColor",
      translateX: "-50%", translateY: "-50%" }} />
  )
}
```

Ye approximate pattern hai (motion.dev ke trail demo ka exact code verified nahi hai). Stiffness ka farq trail length decide karta hai. `count` 6 se 10 rakho.

## 5. Touch fallback

- Touch par `whileHover` nahi chalta. `whileTap` aur `onTap` se feedback do.
- Custom cursor ko `(pointer: coarse)` par render hi mat karo.

## Rules

1. Cursor element par `pointer-events: none` hamesha do.
2. Pointer listener ko `useEffect` cleanup mein remove karo, warna memory leak hota hai.
3. Cursor re-render ke bajaye motion values use karo.
4. Accessibility: custom cursor hide karne par focus ring ya visible hover state zaroor do.

## Verify

- Mouse se cursor smooth follow karta hai, aur click block nahi hota.
- Links/buttons par state change hota hai.
- Touch device (DevTools touch emulation) par cursor nahi dikhta aur page normal chalta hai.

---


# SKILL: motion-dev-animations

> Hub for motion.dev-style animations: routes a request (add, copy or recreate any Motion library effect such as layout/shared-element, gestures, scroll, text, SVG, cursor, page transitions, UI components, or performance tuning) to the right motion-* skill and its verified code. Use when the user asks to add motion.dev animations or any Motion (Framer Motion) effect to their website, or names an effect from the motion.dev examples gallery.

# motion.dev Animations (Hub)

Ye skill router hai. User ki request ko sahi sub-skill se map karti hai, phir us skill ka code project mein add karti hai.

## Sub-skills

| Request type | Skill |
|---|---|
| Koi bhi Motion animation ka base (initial/animate, variants, springs, keyframes, stagger, useAnimate, reduced motion) | `motion-core` |
| Shared element, card se detail, expand/collapse, tab underline, reorder, AnimatePresence modes | `motion-layout` |
| Hover, tap, focus, drag, swipe, pan, pinch | `motion-gestures` |
| Parallax, scroll progress, pinned/horizontal scroll, scroll reveal, whileInView, inView | `motion-scroll` |
| Ready-made scroll effects (zoom hero, word highlight, clip reveal, 3D tilt, color shift, scroll number) | `motion-scroll-effects` |
| Split text, typewriter, scramble, word highlight, number counter, digit ticker | `motion-text` |
| Path draw, path morph, animated icons, loaders, spinners | `motion-svg` |
| Custom cursor, magnetic button, cursor trail, cursor hover states | `motion-cursor` |
| Route transitions, curtain/wipe, Next.js App Router transitions, modal, drawer, toast | `motion-transitions` |
| Accordion, tabs, dropdown, toast stack, skeleton, card stack, carousel, FAB, command palette | `motion-components` |
| Lag, janky animations, bundle size, LazyMotion, large lists | `motion-performance` |

Request do skills se zyada ko cover karti ho (jaise "shared layout wala modal with drag") to dono skills ka code milakar use karo, aur `motion-core` pehle load karo.

Scroll-based ya GSAP-style timelines ke liye `bold-web-animation` skill bhi hai (GSAP + ScrollTrigger). Project mein already GSAP ho to usi ko use karo, Motion dono ko mix mat karo.

Catalog ke verified patterns (motion.dev demos se): `references/catalog.md`.

---

## Step 1: Stack aur existing setup check karo

- `package.json` mein dekho: `react`, `next`, `vue`, `svelte`, ya plain JS.
- Motion already installed hai to dobara install mat karo. Check karo `motion`, `framer-motion` (purana naam, same API lagbhag), ya `motion-v` (Vue).
- Install:
  - React / JS: `npm install motion`
  - Vue: `npm install motion-v`
- Imports:
  - React: `import { motion, AnimatePresence, useScroll, useSpring } from "motion/react"`
  - JS: `import { animate, stagger, scroll, inView } from "motion"`
- Project `framer-motion` use kar raha ho to wahi package aur import path rakho. Naya package add mat karo.

## Step 2: Request ko sub-skill se map karo

- Effect ka naam diya ho (jaise "magnetic button", "shared layout", "stagger grid"), to upar table se skill chuno.
- Sirf "motion.dev jaisa" bola ho, to poochho ki kaunsa section chahiye (hero, cards, navigation, text, scroll, gestures) ya 2–3 options suggest karo.
- Kisi demo ka link diya ho aur page padh nahi sakte, to bata do ki exact source chahiye, aur approximate version bana do, clearly label karke.

## Step 3: Implement karo

1. **Existing component dhoondo.** Button ya card pehle se hai to usi par animation lagao, naya component mat banao.
2. **Props se configurable rakho.** Duration, spring values, distance constants ya props mein.
3. **Reduced motion.** React mein app root par `<MotionConfig reducedMotion="user">`. Vanilla JS mein `matchMedia("(prefers-reduced-motion: reduce)")`.
4. **Sirf transform aur opacity animate karo.** Layout ke liye `layout` / `layoutId`.
5. **Exit animations** ke liye `AnimatePresence` conditional ke bahar, aur direct children par stable `key`.
6. **Next.js App Router:** motion wali client files ke upar `"use client"`.
7. **Cleanup:** `animate()`, `scroll()`, `inView()` ke return values ko unmount par stop/cancel karo.
8. **Touch:** `whileHover` touch par nahi chalta, `whileTap` se feedback do.

## Step 4: Verify karo

- `npm run dev` chalao, console mein error/warning na ho.
- Har interaction test karo (hover, click, drag, scroll jo bhi pattern hai).
- Reduced motion ON karke content sahi dikhe.
- Mobile width (375px) par layout shift ya horizontal overflow na ho.
- Browser chala nahi sakte to final message mein saaf likho kya verify nahi hua.

---

## Limitations (user ko batana zaroori hai)

- motion.dev par ~520 demos hain. Maine sirf 4 demo pages ka source dekha hai (Drag, Layout Anchor verified; Copy Button aur Typewriter ka source paywall ke peeche tha). Baaki patterns approximate hain, aur springs/durations live demos se match nahi karte ho sakte.
- Hero aur 3D (Three.js / vgpu) demos ki exact implementation is skill set mein nahi hai.
- Exact values ke liye user demo page ka source copy karke de sakta hai, ya motion.dev ke "Motion Studio" se timing tune kar sakta hai.
- Skills kisi real project par end-to-end test nahi ki gayi hain. Har skill ke Verify section ko project par chalana zaroori hai.

---

## Output expectations

Kaam khatam hone par user ko batao:
- Kaunsi sub-skill(s) use hui aur kyun.
- Kaunse files change hue.
- Kaunsi values approximate hain.
- Kya verify hua aur kya nahi.

## Reference: catalog.md

# motion.dev Pattern Catalog

Verified = motion.dev page ya demo se code dekha gaya.
Approx = concept se likha gaya, exact motion.dev source nahi mila (paywall ya page par code nahi tha).

## Index

| User kehta hai | Pattern | Status |
|---|---|---|
| shared element, card se detail, layout animation | 1. Shared layout (layoutId) | Verified |
| drag, swipe, hover scale, tap feedback | 2. Gestures | Verified |
| scroll progress bar, scroll-linked | 3. Scroll progress | Verified |
| cursor follow, spring follow | 4. Pointer spring follow | Verified |
| anchor point, expand box | 5. Layout anchor | Verified |
| drag vanilla JS | 6. Vanilla drag | Verified |
| copy button, checkmark draw | 7. Copy button | Approx |
| typing effect, typewriter | 8. Natural typewriter | Approx |
| list reorder, stagger | 9. Stagger and AnimatePresence | Approx (concept) |
| magnetic button | 10. Magnetic | Approx |
| loading spinner, dots | 11. Loading | Approx |
| path draw, SVG | 12. SVG path draw | Approx |
| number count, price switch | 13. Number ticker | Approx |
| page transition | 14. Page transition | Approx |
| smooth scroll | 15. Lenis smooth scroll | Approx |

---

## 1. Shared layout (layoutId) — Verified

Card click karne par wahi image bade size mein detail view mein smoothly jaati hai.

```jsx
import { motion, AnimatePresence } from "motion/react"

function Gallery({ items }) {
  const [openId, setOpenId] = useState(null)
  return (
    <>
      {items.map((item) => (
        <motion.img
          key={item.id}
          layoutId={item.id}
          src={item.src}
          onClick={() => setOpenId(item.id)}
        />
      ))}
      <AnimatePresence>
        {openId && (
          <motion.img
            layoutId={openId}
            className="detail"
            src={items.find((i) => i.id === openId).src}
            onClick={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
```

Note: `layoutId` dono jagah same hona chahiye. `AnimatePresence` wrap exit ke liye zaroori hai.

---

## 2. Gestures (drag, hover, tap, whileDrag) — Verified

```jsx
<motion.div
  drag
  dragSnapToOrigin
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 1 }}
  whileDrag={{ scale: 1.2 }}
/>
```

- `dragSnapToOrigin`: chhodne par wapas origin par.
- Drag momentum (throw) default mein hai.
- Touch par `whileHover` nahi chalta, isliye `whileTap` par zor do.

---

## 3. Scroll progress — Verified

```jsx
import { useScroll, motion } from "motion/react"

function ScrollBar() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} className="progress" />
}
```

Container scroll ke liye motion.dev demo `useScroll({ container })` use karta hai, aur `scrollXProgress` horizontal ke liye. Browser ScrollTimeline available ho to wo use hota hai.

---

## 4. Pointer spring follow — Verified

Cursor ke saath lagbhag lag-free follow, spring se.

```jsx
import { useSpring, motion } from "motion/react"

function PointerFollow() {
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 1 })
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 1 })
  return (
    <div
      style={{ height: "100vh" }}
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
    >
      <motion.div style={{ x, y }} className="dot" />
    </div>
  )
}
```

Note: `.dot` ko `position: fixed` aur `translate(-50%, -50%)` de do taaki center cursor par rahe.

---

## 5. Layout anchor — Verified

Parent expand hota hai, child aur crosshair delay ke saath follow karte hain.

```jsx
"use client"
import { useState } from "react"
import { motion } from "motion/react"

function LayoutAnchor({ anchorX = 0.5, anchorY = 0.5 }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={container}>
      <motion.div
        layout
        layoutDependency={expanded}
        style={{ ...parent, width: expanded ? 300 : 150, height: expanded ? 300 : 150 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={() => setExpanded(!expanded)}
      >
        <motion.div
          layout
          layoutDependency={expanded}
          layoutAnchor={{ x: anchorX, y: anchorY }}
          style={{ ...child, width: expanded ? 100 : 70, height: expanded ? 100 : 70 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
        >
          <motion.div
            layout
            layoutDependency={expanded}
            style={{ ...crosshair, left: `${anchorX * 100}%`, top: `${anchorY * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
          >
            <div style={crosshairH} />
            <div style={crosshairV} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
```

`style` objects (`container`, `parent`, `child`, `crosshair`, `crosshairH`, `crosshairV`) apne project ke CSS ya inline objects se banao. Crosshair ke liye `position: absolute`, `transform: translate(-50%, -50%)`, aur dashed lines.

---

## 6. Vanilla JS drag — Verified

```html
<div class="box"></div>
<script type="module">
  import { drag } from "motion"
  drag(".box")
</script>
<style>
  .box { width: 120px; height: 120px; background-color: var(--accent); cursor: grab; }
  .box:active { cursor: grabbing; }
</style>
```

---

## 7. Copy button (checkmark draw) — Approx

Click par icon swap, blur transition, aur checkmark path draw.

```jsx
import { motion, AnimatePresence } from "motion/react"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.svg key="check" initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }}>
            <motion.path d="M4 12 L9 17 L20 6" fill="none" stroke="currentColor" strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
          </motion.svg>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }}>
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
```

Note: Exact icon, timing aur styling demo se match nahi karte. Ye approximation hai.

---

## 8. Natural typewriter — Approx

Typing speed har character par thodi random ho, word length aur punctuation par depend karke.

Motion UI ka `typewriter` function use hota hai (motion.dev ka demo). Exact source paywall ke peeche hai. Manual version:

```js
async function typeNatural(el, text) {
  el.textContent = ""
  for (const ch of text) {
    el.textContent += ch
    const base = 60
    const jitter = Math.random() * 60
    const pause = /[.,!?]/.test(ch) ? 250 : 0
    await new Promise((r) => setTimeout(r, base + jitter + pause))
  }
}
```

---

## 9. Stagger and AnimatePresence (list) — Approx (concept)

Motion.dev mein list reorder, stagger from edges, aur toast stack jaise patterns isi pe based hain.

```jsx
import { stagger } from "motion"

const list = { show: { transition: { delayChildren: stagger(0.06) } } }
const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 },
}

<AnimatePresence>
  <motion.ul variants={list} initial="hidden" animate="show">
    {items.map((it) => (
      <motion.li key={it.id} variants={row} exit="exit" layout>
        {it.label}
      </motion.li>
    ))}
  </motion.ul>
</AnimatePresence>
```

`layout` prop reorder ko smooth karta hai. `key` unique hona chahiye.

---

## 10. Magnetic button — Approx

Cursor ke paas aane par element khinchta hai. Desktop ke liye.

```jsx
import { useMotionValue, useSpring, motion } from "motion/react"

function Magnetic({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.3)
        y.set((e.clientY - r.top - r.height / 2) * 0.3)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 11. Loading (pulse dots) — Approx

```jsx
<motion.div style={{ display: "flex", gap: 6 }}>
  {[0, 1, 2].map((i) => (
    <motion.span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor" }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
  ))}
</motion.div>
```

---

## 12. SVG path draw — Approx

```jsx
<motion.path d="M10 80 Q 52.5 10, 95 80" stroke="currentColor" fill="none" strokeWidth={3}
  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
```

---

## 13. Number ticker — Approx

```jsx
import { animate } from "motion"
import { useEffect, useRef } from "react"

function Counter({ to }) {
  const ref = useRef(null)
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() },
    })
    return () => controls.stop()
  }, [to])
  return <span ref={ref} />
}
```

---

## 14. Page transition (curtain wipe) — Approx

Route change par full-screen overlay slide karta hai. Motion.dev mein "curtains", "wipe", "iris" variants hain. Basic version:

```jsx
<AnimatePresence mode="wait">
  <motion.main key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}>
    {children}
  </motion.main>
</AnimatePresence>
```

---

## 15. Lenis smooth scroll — Approx

motion.dev mein Lenis examples hain (JS aur React). Install `npm install lenis`, phir:

```js
import Lenis from "lenis"
const lenis = new Lenis()
function raf(t) { lenis.raf(t); requestAnimationFrame(raf) }
requestAnimationFrame(raf)
```

Cleanup par `lenis.destroy()` call karo.

---


# SKILL: motion-gestures

> Gesture-driven interactions with Motion: whileHover, whileTap (with tap count and hold), whileFocus, drag with constraints and elastic edges, drag snap, direction lock, dragControls, swipe-to-dismiss, pan, and pinch. Use for buttons with hover/press feedback, draggable cards or sliders, swipe actions, or touch-friendly controls.

# Motion Gestures

Gesture props `motion` component par seedhe milte hain. Basics ke liye `motion-core` padho.

## 1. Hover, tap, focus

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,.6)" }}
  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.3 }}>
  Click me
</motion.button>
```

- Hover event: `onHoverStart(event)`, `onHoverEnd(event)`.
- Tap: `onTapStart`, `onTap` (button ke andar release), `onTapCancel` (bahar release).
- Keyboard accessibility ke liye `whileFocus` do, aur element focusable hona chahiye (`tabIndex={0}` ya button).
- Touch devices par hover nahi hota, isliye `whileTap` ko primary feedback samjho.

### Advanced tap

```jsx
<motion.div
  tap={{ count: 2, countTimeout: 0.3 }}
  onTap={(e, info) => {/* double tap */}}
  whileTap={{ scale: 0.9 }}>
  Double tap to like
</motion.div>
```

- `tap.count` (default 1), `tap.countTimeout` (default 0.3s), `tap.hold` (seconds) aur `tap.repeat` (seconds) options hain.
- `propagate={{ tap: false }}` nested elements mein tap ko parent tak jaane se rokta hai.

## 2. Drag

```jsx
const ref = useRef(null)

<div ref={ref} className="track">
  <motion.div
    drag="x"
    dragConstraints={ref}
    dragElastic={0.2}
    dragMomentum
    whileDrag={{ scale: 1.05 }}
  />
</div>
```

- `drag`: `true`, `"x"`, ya `"y"`.
- `dragConstraints`: `{ left, right, top, bottom }` (pixels) ya kisi parent element ka ref.
- `dragElastic` (0 se 1, default 0.5) edge par kitna khinchna hai. Per side object bhi chalta hai.
- `dragMomentum` throw ke baad glide karta hai. Bounce tuning ke liye `dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}`.
- `dragSnapToOrigin`: chhodne par wapas origin par.
- `dragDirectionLock`: pehle detect hone wale axis par lock.
- `dragPropagation` default false hai, nested draggable ke liye useful.

### Events

```jsx
onDragStart={(e, info) => {}}
onDrag={(e, info) => {}}      // info.point, info.delta, info.offset, info.velocity
onDragEnd={(e, info) => {}}
```

Parent transform (scale/rotate) ke andar drag ki distance galat ho sakti hai. Motion ka `correctParentTransform` helper `MotionConfig` ke `transformPagePoint` ke saath use hota hai.

## 3. Swipe to dismiss (pattern)

```jsx
function SwipeCard({ onDismiss }) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  return (
    <motion.div
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500) {
          onDismiss()
        }
      }}>
      Swipe me
    </motion.div>
  )
}
```

- Dismiss ke baad element ko `AnimatePresence` se remove karo, taaki exit animation chale.
- `useMotionValue` / `useTransform` se opacity ko drag position ke saath link karo.

## 4. Drag from another element (dragControls)

```jsx
const controls = useDragControls()

<div onPointerDown={(e) => controls.start(e, { snapToCursor: true })}>Drag handle</div>
<motion.div drag dragControls={controls} dragListener={false} />
```

- `dragListener={false}` ka matlab element ko sirf `controls.start` se hi drag kiya ja sakta hai.

## 5. Pan

```jsx
<motion.div onPanStart={() => {}} onPan={(e, info) => {}} onPanEnd={() => {}} />
```

Touch par pan ke liye `touch-action` CSS lagana padta hai (jaise `touch-action: pan-y` horizontal slider mein vertical scroll chalane ke liye).

## 6. Pinch

Pinch default bundle mein nahi hai. `pinchFeatures` ko LazyMotion ke `features` mein add karna padta hai, aur `whilePinch` / `onPinch` use hote hain. Pinch `touch-action: none` set karta hai, isliye sirf wahi element pe lagao jahan zoom chahiye. Exact setup ke liye motion.dev docs check karo, kyunki ye skill mein verified nahi hai.

## Rules

1. Draggable element ke andar `<img>` par `draggable={false}` do, warna browser ka native drag beech mein aata hai.
2. Gesture target ko chhota aur clear rakho. Poori page par drag mat lagao.
3. Gestures SVG `filter` primitives par kaam nahi karte. `while-` props parent par do aur variants use karo.
4. Hover effect ko sirf `(hover: hover)` devices par rakho, aur tap ko sab par.

## Verify

- Mouse aur touch (DevTools device mode) dono se test karo.
- Drag edge par elastic feel karta hai ya nahi, aur release par snap/momentum sahi hai ya nahi.
- Keyboard focus ring dikhta hai.

---


# SKILL: motion-hero

> Hero section animations with Motion: staged intro sequences (eyebrow, split headline, subtext, CTA), masked line and word reveals, image or media reveal with scale-in, looping marquee and ticker strips, and hero-to-next-section transitions. Use when the user wants a landing page hero, first-impression intro, or a hero that feels premium on load.

# Motion Hero

Hero page ka pehla impression hai. Ek hi "signature" moment rakho aur baaki sab usse support karein. Total intro ~1.5 se 2 second mein khatam ho.

Verified: `internal test page` ka hero (word reveal + counter) aur browser test script (hero title render, reduced-motion check).

## 1. Intro sequence (staged)

```tsx
import { motion, useReducedMotion } from "motion/react"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroIntro({ eyebrow, title, subtitle, cta }) {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay } }

  return (
    <section>
      <motion.p {...fade(0)}>{eyebrow}</motion.p>
      <motion.h1 {...fade(0.15)}>{title}</motion.h1>
      <motion.p {...fade(0.4)}>{subtitle}</motion.p>
      <motion.div {...fade(0.55)}>{cta}</motion.div>
    </section>
  )
}
```

- Delay ka chain: eyebrow (0), headline (0.15), subtitle (0.4), CTA (0.55).
- `reduce` true ho to `{}` spread karo: element seedha final state mein dikhega.
- `as const` ease ke liye zaroori hai, warna TypeScript `number[]` samajhta hai.

## 2. Masked line reveal (headline)

Har line neeche se mask ke andar upar aati hai. Word reveal ka code `motion-text` skill mein hai (Fragment + `{" "}` ke saath, copy-paste safe).

```tsx
<span className="mask" style={{ display: "block", overflow: "hidden" }}>
  <motion.span style={{ display: "block" }}
    initial={{ y: "110%" }} animate={{ y: "0%" }}
    transition={{ duration: 1, ease, delay: 0.1 }}>
    {line}
  </motion.span>
</span>
```

## 3. Media reveal (image scale-in)

```tsx
<motion.div className="hero-media" style={{ overflow: "hidden", borderRadius: 24 }}
  initial={{ clipPath: "inset(12% 12% 12% 12% round 24px)" }}
  animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
  transition={{ duration: 1.2, ease, delay: 0.3 }}>
  <motion.img src={src} alt={alt} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
    transition={{ duration: 1.8, ease }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</motion.div>
```

- `clipPath` mein `round` radius bhi animate hota hai, to corners smooth rehte hain.
- Image par `alt` zaroori hai. Decorative image ho to `alt=""`.

## 4. Marquee / ticker strip

Pure CSS, koi JS nahi, aur reduced motion par band:

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee__track { display: inline-flex; gap: 3rem; animation: marquee 18s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }
```

- Track mein content do baar duplicate karo (`-50%` seamless loop ke liye zaroori).
- Motion ke saath: `animate={{ x: ["0%", "-50%"] }}` with `repeat: Infinity`, `ease: "linear"` (JS version, hover par pause karne ke liye useful).

## 5. Hero-to-next transition

Hero scroll par fade aur shrink hota hai, to next section aane ka feel smooth hota hai. Ye `motion-scroll-effects` ke "zoom hero" pattern jaisa hai.

## 6. Hero checklist

- [ ] Ek hi signature animation (headline reveal ya media reveal), baaki support.
- [ ] Total intro 2 second se kam.
- [ ] Reduced motion par content turant visible.
- [ ] Hero text LCP (largest contentful paint) ko block nahi karta: text ko JS se hide mat karo jab tak animation chal na sake. Initial HTML mein text visible ho (CSS-only hide ke bajaye `initial` motion values use karo jo SSR mein bhi final state dikhaye, ya `initial={false}`).
- [ ] Mobile (375px) par headline wrap sahi hai.

## Common mistakes

- Hero mein 5 se zyada alag animations: user ko kuch yaad nahi rehta.
- Headline ko `display: none` se chhupana aur JS se dikhana: slow network par blank screen.
- `initial` ko bina `animate` ke: element kabhi visible nahi hota.

## Verify

1. Page load par intro sequence dikhta hai aur 2s mein khatam hota hai.
2. Reduced motion ON par sab kuch turant dikhta hai.
3. Mobile width par kuch overflow nahi.

---


# SKILL: motion-layout

> Layout and shared-element animations with Motion: layout and layoutId, shared element transitions (card to detail), LayoutGroup, layoutDependency and layoutAnchor, AnimatePresence exit modes (sync, wait, popLayout), accordion and expand/collapse, animated tab underline, list reordering. Use when elements change size, position or order, or when the user wants a shared-element or "morph into detail" effect.

# Motion Layout

Layout animation (FLIP) browser ke CSS se nahi hoti. Motion element ka purana aur naya position/size measure karta hai, aur transform se animate karta hai. Ye `motion-core` ke basics ke baad padho.

## 1. Basic layout

```jsx
<motion.div layout onClick={() => setOpen(!open)} style={{ width: open ? 320 : 160 }}>
  {open ? <FullContent /> : <Summary />}
</motion.div>
```

- `layout` `true`, `"position"` (sirf position animate), ya `"size"` ho sakta hai.
- Layout change ko `style` ya `className` se karo. `animate` ya `whileHover` se layout change mat karo.
- Element `display: inline` par kaam nahi karega. `block`, `flex` ya `inline-block` do.
- Image ka aspect ratio change ho to `layout="position"` use karo, warna image stretch dikhti hai.
- Scale hone par children bhi distort hote hain. Unhe bhi `layout` do taaki correction ho.
- `borderRadius` aur `boxShadow` tabhi correct hote hain jab wo `style` ya animation prop se set hon.

## 2. Shared element (layoutId)

```jsx
import { motion, AnimatePresence } from "motion/react"

function Gallery({ items }) {
  const [openId, setOpenId] = useState(null)
  const active = items.find((i) => i.id === openId)

  return (
    <>
      {items.map((i) => (
        <motion.img key={i.id} layoutId={i.id} src={i.src} onClick={() => setOpenId(i.id)} />
      ))}
      <AnimatePresence>
        {active && (
          <motion.div key="overlay" className="overlay" onClick={() => setOpenId(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img layoutId={active.id} src={active.src} className="detail" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- Dono jagah `layoutId` same string honi chahiye.
- Detail wale element ko `AnimatePresence` ke andar rakho taaki exit bhi shared transition se chale.
- Overlay ka `key` alag ho, aur `AnimatePresence` conditional ke bahar ho.

## 3. LayoutGroup

Jab alag-alag components ke andar `layoutId` hon, to unhe `LayoutGroup` mein wrap karo.

```jsx
import { LayoutGroup, motion } from "motion/react"

<LayoutGroup id="tabs">
  {tabs.map((t) => (
    <button key={t}>
      {t === active && <motion.span layoutId="underline" className="underline" />}
      {t}
    </button>
  ))}
</LayoutGroup>
```

Ye sliding underline / pill tab ka standard pattern hai.

## 4. Accordion (height animation)

```jsx
function Item({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{title}</button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

Alternative: agar content ka height pehle se pata hai, to `layout` wala version simple hai.

## 5. AnimatePresence modes

| Mode | Kab use karo |
|---|---|
| `"sync"` (default) | Enter aur exit saath chalein (overlays, toasts) |
| `"wait"` | Pehle exit khatam ho, phir naya enter (page / tab content). Sirf ek child ek waqt par |
| `"popLayout"` | Exit wala element layout se bahar nikle aur baaki items smoothly khiskein (lists) |

- `popLayout` mein custom components ko `ref` forward karna zaroori hai.
- `onExitComplete` sab exit khatam hone par chalta hai.
- `initial={false}` pehli render par enter animation skip karta hai.

## 6. Reorder list

```jsx
<AnimatePresence initial={false} mode="popLayout">
  {items.map((it) => (
    <motion.li key={it.id} layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}>
      {it.label}
    </motion.li>
  ))}
</AnimatePresence>
```

Key stable honi chahiye (`id`, index nahi). Index key par reorder galat dikhta hai.

## 7. Scroll ya fixed parent ke andar layout

- Scrollable ancestor ke andar layout glitch ho to us ancestor par `layoutScroll` do.
- `position: fixed` parent par `layoutRoot` do.
- Parent scale ho raha ho to measurement galat aa sakti hai. Scale ko motion value se drive karo.
- `layoutDependency={someValue}` do to measurement sirf tab hoti hai jab value change ho (performance ke liye). Example: `<motion.nav layout layoutDependency={isOpen} />`.
- Corner anchor chahiye (jaise expand from top-left) to `layoutAnchor={{ x: 0, y: 0 }}` (0 se 1).

## Rules

1. Layout animation ke liye `transform` pe trust karo, `width`/`height` ko JS se tween mat karo.
2. Shared element ke liye `layoutId` har jagah unique ho (list items mein `id` ke saath).
3. SVG elements par layout animation support nahi hai. SVG ke liye `motion-svg` skill dekho.
4. Horizontal window resize ke time layout animation band hota hai, ye expected hai.

## Verify

- Click karke dekho ki shared element smoothly move/resize ho raha hai.
- Scroll container ke andar, aur mobile width par bhi test karo.
- Reduced motion ON par layout jump karta hai (ye expected hai).

---


# SKILL: motion-navigation

> Navigation animations with Motion: header that hides on scroll down and returns on scroll up, sticky header with scroll-based background, active section indicator, animated mobile menu drawer, mega menu reveal, and dropdown menus. Use when the user wants a site header or navigation that moves, hides, reveals, or highlights sections with animation.

# Motion Navigation

Navigation ko chhota aur predictable rakho. Animation sirf state change (open, hide, active) ko batana chahiye, decoration nahi.

Verified: the internal test page (`SiteNav`) aur browser test script (hide on down, return on up).

## 1. Hide on scroll, show on scroll up

```tsx
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react"
import { animate } from "motion"

export function AutoHideHeader({ height = 64 }) {
  const { scrollY } = useScroll()
  const y = useMotionValue(0)
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const goingDown = latest > lastY.current
    lastY.current = latest
    animate(y, goingDown && latest > 120 ? -height : 0, { duration: 0.3, ease: "easeOut" })
  })

  return <motion.header className="site-header" style={{ y }}>{/* logo, links */}</motion.header>
}
```

- `useMotionValueEvent` se scroll change ka callback milta hai, React state ki zarurat nahi.
- `120` ka threshold top par header ko hamesha visible rakhta hai.
- Header ko `position: fixed; top: 0; left: 0; right: 0` do.

## 2. Background change on scroll

```tsx
const { scrollY } = useScroll()
const bg = useTransform(scrollY, [0, 80], ["rgba(11,11,12,0)", "rgba(11,11,12,0.85)"])
<motion.header style={{ backgroundColor: bg }} className="site-header" />
```

- Background transparent se solid tak ka transition hero ke upar header ko readable rakhta hai.
- `backdrop-filter: blur()` ko motion value se animate karne ke liye (`useMotionTemplate` ya CSS variable) pehle apne motion version mein test karo. Testbed mein ye verify nahi hua, isliye default mein use nahi kiya.

## 3. Active section indicator

Har nav link ke saath ek section ka `id` hota hai. Jo section viewport mein hai, uska link highlight hota hai.

```tsx
function NavLink({ href, label, active }) {
  return (
    <a href={href} className="nav-link" aria-current={active ? "location" : undefined}>
      {label}
      {active && (
        <motion.span layoutId="nav-indicator" className="nav-indicator"
          transition={{ type: "spring", bounce: 0.15, visualDuration: 0.35 }} />
      )}
    </a>
  )
}
```

- `layoutId` se indicator ek link se doosre par slide karta hai (`motion-layout` ka pattern).
- Active section find karne ke liye `useInView` ya `IntersectionObserver` use karo. Har section ke liye ek `useInView` hook component ke andar rakho.
- `aria-current` zaroor do, screen reader ko pata chale kaunsa page/section active hai.

## 4. Mobile menu drawer

```tsx
<AnimatePresence>
  {open && (
    <>
      <motion.div key="scrim" className="scrim" onClick={close}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.nav key="drawer" className="drawer" role="dialog" aria-modal="true" aria-label="Menu"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", bounce: 0, visualDuration: 0.45 }}>
        {links}
      </motion.nav>
    </>
  )}
</AnimatePresence>
```

- Drawer open hone par `Escape` se close, aur focus drawer ke andar rakho (accessibility).
- Menu items ko stagger se dikhana: `variants` + `staggerChildren` ki jagah `delayChildren: stagger(0.05)` use karo.

## 5. Mega menu

- Trigger hover ya click par `AnimatePresence` ke andar panel open karo.
- Panel ki height `height: 0 -> "auto"` se animate karo, ya `layout` use karo.
- Hover-based menu touch device par kaam nahi karta: click se bhi open ho sakta ho.

## 6. Dropdown

Pattern `motion-components` skill mein hai (role="menu", `transformOrigin` top right).

## Rules

1. Header ke animations `transform` aur `opacity` tak rakho.
2. Menu open/close ke time focus trap aur `Escape` handling zaroori hai (ye animation nahi, behaviour hai).
3. Mobile par hover effects mat lagao.
4. Link click par smooth scroll ke liye CSS `scroll-behavior: smooth` (ya Lenis) use karo, aur `prefers-reduced-motion` mein `auto` rakho.

## Common mistakes

- Header hide hone par focus wahi rehta hai aur keyboard user ko pata nahi chalta. Jab header hide ho, focus usko visible karo.
- Hide-on-scroll ko fixed header ke bina lagana: header scroll ke saath neeche jaata hai.
- Active indicator ko bina `layoutId` ke state change se animate karna: smooth slide nahi hota.

## Verify

1. Scroll down: header hide. Scroll up: header wapas.
2. Menu items par click/keyboard focus kaam karta hai.
3. Mobile width par drawer khulta/bandta hai, aur Escape se band hota hai.
4. Reduced motion ON par header instant show/hide ho.

---


# SKILL: motion-performance

> Performance and bundle optimization for Motion animations: LazyMotion with the m component, the mini animate and useAnimate builds, transform-only rules, avoiding layout thrash, handling large animated lists, reduced motion, and debugging janky animations. Use when the user reports laggy or janky animations, a large bundle, or wants to optimize Motion for production.

# Motion Performance

Pehle measure karo, phir optimize karo. Browser DevTools Performance tab aur Motion ke Performance Doctor / Motion Studio tools (docs mein hain) se dekho ki kya slow hai.

## 1. Bundle size

Docs ke mutabik (approximate):

| Setup | Size |
|---|---|
| Full `motion` component | ~43 kb |
| `LazyMotion` + `m` | ~5 kb initial |
| `animate()` mini (`motion/mini`) | ~3.2 kb |
| `animate()` hybrid (`motion`) | ~22 kb |
| `scroll()` | ~3.8 kb |
| `inView()` | ~0.5 kb |
| `useInView` | ~0.6 kb |
| Layout animations | ~12 kb extra |

### LazyMotion + m (React)

```jsx
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} />
    </LazyMotion>
  )
}
```

- `m` component `motion` ke jaise hi kaam karta hai, bas features lazy load hote hain.
- `strict` option (`<LazyMotion strict>`) galti se `motion.div` use hone par error deta hai.
- Layout animation chahiye to `domMax` features (ya `layout` feature) add karo. Exact feature name docs mein check karo.

### Mini animate

```js
import { animate } from "motion/mini"
```

Sirf simple animations (opacity, transform, numbers) ke liye.

### useAnimate mini (React)

```jsx
import { useAnimate } from "motion/react-mini"
```

Sabse chhota React option. Declarative `motion` components ki jagah scoped imperative animations.

## 2. Transform-only rule

- Animate karo: `transform` (`x`, `y`, `scale`, `rotate`) aur `opacity`. Ye GPU par chalte hain.
- Avoid: `top`, `left`, `width`, `height`, `margin`, `padding`, `box-shadow` animate karna (har frame layout ya paint trigger karta hai).
- Layout animation chahiye to `layout` prop use karo (ye FLIP transform use karta hai).

## 3. will-change

- `will-change: transform` sirf active animation ke time par rakho. Hamesha-on mat rakho, kyunki memory badhti hai.
- Motion ke andar ye automatic kaafi kuch handle hota hai, isliye aksar manually lagane ki zarurat nahi.

## 4. Scroll performance

- Scroll-linked animations ke liye `useScroll` + motion values use karo. React state update mat karo har scroll par.
- `useSpring` se smoothing karo, lekin spring stiffness bahut zyada rakhne se extra work hota hai.
- Parallax ko kam elements par rakho (3 se 5 layers kaafi hain).

## 5. Large lists

- 50 se zyada animated items ho to virtualization (react-window, react-virtuoso) lagao, ya stagger ko sirf visible items par chalao.
- Har item par `layout` prop ka cost bhi hota hai. Zaroorat na ho to mat do.
- `viewport={{ once: true }}` se off-screen items par re-animation rokte hain.

## 6. Re-render avoid karo

- Animation values ko `useState` mein mat rakho. `useMotionValue` / `useSpring` use karo.
- `motion` component ko memo-friendly rakho: `variants` objects component ke bahar define karo, har render par naya object nahi.
- `useMotionValueEvent` se value change par side effect chalao, state update se nahi.

## 7. Reduced motion (performance ke liye bhi)

- `MotionConfig reducedMotion="user"` se transform aur layout animations band hote hain, jo kaafi kaam bachata hai.

## 8. Debug checklist

Agar animation janky hai:
1. Kya transform/opacity ke alawa koi property animate ho rahi hai? Fix karo.
2. Kya ek hi frame mein bahut DOM measure ho raha hai (layout thrash)? `layout` ko kam elements par karo.
3. Kya React re-render har frame ho raha hai? Motion values use karo.
4. Kya `filter: blur` ya `box-shadow` bade elements par animate ho raha hai? Chhota karo ya opacity-based effect use karo.
5. Mobile par effects kam karo aur low-end device par test karo (DevTools CPU throttling 4x).

## Verify

- DevTools Performance tab mein scroll/animation ke dauran frame drops kam hain (60fps target).
- Bundle analyzer (`vite-bundle-visualizer` ya Next.js analyzer) mein motion ka size expected range mein hai.

---


# SKILL: motion-scroll

> Scroll-based animations with Motion: scroll-linked motion with useScroll and useTransform, parallax, smoothed scroll with useSpring, scroll progress bars, horizontal scroll sections, scroll-triggered reveals with whileInView and viewport, useInView, and the vanilla scroll() and inView() APIs. Use for parallax heroes, scroll storytelling, progress indicators, scroll reveals, or horizontal galleries.

# Motion Scroll

Do tarah ke scroll animations hain: (a) scroll position se linked (scrub), aur (b) element viewport mein aane par trigger (reveal). Dono alag APIs hain.

## 1. Scroll-linked: useScroll + useTransform

```jsx
import { motion, useScroll, useTransform } from "motion/react"

function ParallaxHero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return <motion.div style={{ y, opacity }} className="hero" />
}
```

- `useScroll()` default mein window scroll track karta hai. Return values: `scrollY`, `scrollYProgress` (0 se 1), aur X ke liye `scrollX`, `scrollXProgress`.
- `useTransform(value, inputRange, outputRange)` se map karo. Easing chahiye to `useTransform` ke options mein ya `ease` wale function se karo.

### Specific section ke liye target

```jsx
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"], // element jab viewport mein aaye se leave kare tak
})
```

- `target` par CSS transform ho to progress galat aa sakta hai, kyunki transform ignore hota hai (ye expected hai).
- `offset` values: numbers (0 se 1), names (`"start"`, `"center"`, `"end"`), pixels (`"100px"`), ya `"vh"`.

### Container scroll

```jsx
const containerRef = useRef(null)
const { scrollXProgress } = useScroll({ container: containerRef })
```

## 2. Smooth the scroll value

```jsx
const { scrollYProgress } = useScroll()
const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
```

Progress bar aur parallax dono smooth lagte hain. Stiffness zyada ho to snappy, kam ho to floaty.

## 3. Scroll progress bar

```jsx
<motion.div
  className="progress"
  style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
/>
```

CSS mein `.progress { position: fixed; top: 0; left: 0; right: 0; height: 4px; }`.

## 4. Horizontal scroll section (pin-like)

```jsx
function HorizontalGallery({ items }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  return (
    <section ref={sectionRef} style={{ height: "300vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <motion.div style={{ x, display: "flex", width: "400%" }}>
          {items.map((i) => <div key={i.id} className="panel">{i.title}</div>)}
        </motion.div>
      </div>
    </section>
  )
}
```

- Pin ke liye sticky wrapper ki height (`300vh`) zaroori hai. Pehle sticky element ke parent ki height badho.
- Panel count ke hisaab se `width` aur `x` range badlo (4 panels = 400%, end `-75%`).

## 5. Scroll-triggered reveal (viewport based)

```jsx
<motion.section
  initial={{ opacity: 0, y: 48 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
  Content
</motion.section>
```

- `viewport.once` true ho to ek hi baar chalega.
- `viewport.amount`: `"some"` (default), `"all"`, ya 0 se 1.
- `viewport.margin`: `"-100px"` jaise values se trigger thoda pehle ya baad mein hota hai.
- `onViewportEnter(entry)` aur `onViewportLeave(entry)` callbacks hain.

### useInView (boolean chahiye to)

```jsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.4 })
```

- `initial` option measure hone se pehle ki value set karta hai.
- Scrollable parent ke andar ho to `root` ref do.

## 6. Vanilla JS

```js
import { scroll, inView, animate } from "motion"

// Scroll-linked animation
scroll(animate(".bar", { scaleX: [0, 1] }), { target: document.querySelector(".section") })

// Viewport reveal
inView(".reveal", (el) => {
  animate(el, { opacity: [0, 1], y: [30, 0] }, { duration: 0.7 })
}, { amount: 0.3 })
```

- `scroll()` ek cancel function return karta hai.
- `inView()` ka callback function return kar sakta hai jo element leave hone par chalta hai.
- Motion scroll-linked animations ko browser ke native ScrollTimeline par chalana try karta hai, aur support na ho to JavaScript fallback. Browser support table is skill mein verified nahi hai.

## Rules

1. Scroll-linked animation ke liye `transform` aur `opacity` hi animate karo.
1a. `useTransform` ke input ranges ko `[0, 1]` ke andar rakho (`Math.min(1, Math.max(0, v))` se clamp karo). Motion scroll ko native ScrollTimeline par chalata hai, aur bahar ke offsets par "Offsets must be..." error aata hai. Ye error React tree ko crash kar sakta hai (test page mein hua tha).
2. Scroll handler ko React state mein mat daalo. Motion values ka use karo, kyunki state har scroll par re-render karegi.
3. Reveal par `once: true` default rakho, warna scroll up-down par baar baar animate hota hai (ye sirf zarurat par).
4. Mobile par parallax ki range kam karo, ya `window.matchMedia("(min-width: 768px)")` se disable karo.
5. `overflow: hidden` parent ke bina parallax image bahar nikal jaati hai.

## Verify

- Scroll karke check karo ki progress 0 se 1 tak sahi chalta hai (end par visual state sahi ho).
- Mobile width par jank nahi aur content visible hai.
- Reduced motion ON par parallax band ya static ho.

---


# SKILL: motion-scroll-effects

> Catalog of scroll-driven effects built with Motion, each tested in a real browser: fixed scroll progress bar, zoom-on-scroll sticky hero, word-by-word highlight, clip-path reveal, pinned horizontal scroll, multi-speed parallax layers, 3D tilt-in, background color shift on scroll, staggered grid reveal, and scroll-linked numbers. Use when the user wants a specific scroll effect on a website, or asks for "scroll pe alag-alag animations".

# Motion Scroll Effects

Ye skill scroll ke saath hone wale 10 effects ka tested catalog hai. Har effect ka code the internal test page mein hai, aur the internal test page se browser mein verify hua hai (17 checks, sab pass).

API ki basics (`useScroll`, `useTransform`, `offset`, `target`) ke liye `motion-scroll` skill dekho. Ye skill us par ready-made effects deti hai.

## Pehle ye 4 rules

1. **Scroll-linked values sirf motion values se.** `useScroll` + `useTransform` use karo. Scroll ko React state mein mat daalo.
2. **Target element ko sahi `offset` do.** Default `offset` se effect kab shuru/khatam ho, ye samajhna zaroori hai. Neeche har effect ke saath offset diya hai.
3. **Sticky aur pinned effects ke liye outer wrapper ki height badho.** Sticky element ke parent ki height hi scroll range decide karti hai (jaise `180vh`, `300vh`). Pe ek sticky inner (`position: sticky; top: 0; height: 100vh`).
4. **Page ke end mein effect ho to spacer do.** Agar effect ka range page ke end par khatam hota hai, to progress 1 tak pahunchne ke liye page scroll nahi ho sakta. Testbed mein test ne ise pakda: scroll number 45% par ruk gaya tha. Fix: effect ke baad `<div style={{ height: "100vh" }} />` daalo.

---

## Effect index

| Effect | Kab use karein | Main API |
|---|---|---|
| 1. Progress bar | Long article, landing page | `useScroll()` + `scaleX` |
| 2. Zoom hero | Hero image ke liye cinematic feel | sticky + `scale`, `opacity` |
| 3. Word highlight | Manifesto / story text | `useScroll` target + per-word `useTransform` |
| 4. Clip reveal | Image ya card khulne ka effect | `clipPath` tween |
| 5. Horizontal scroll | Case study / gallery | sticky + `x` |
| 6. Parallax layers | Depth wali sections | multi-speed `y` |
| 7. 3D tilt-in | Cards jo flat se seedhe hon | `rotateX`, `scale` + `perspective` |
| 8. Color shift | Section background mood change | `backgroundColor` interpolation |
| 9. Stagger grid | Feature / product grid | `whileInView` + `stagger` |
| 10. Scroll number | Stats, progress percent | motion value as child |

---

## 1. Progress bar

```tsx
const { scrollYProgress } = useScroll()
<motion.div className="progress" style={{ scaleX: scrollYProgress }} />
```

```css
.progress { position: fixed; top: 0; left: 0; right: 0; height: 4px; transform-origin: 0% 50%; z-index: 50; }
```

Verified: start par `scaleX` 0, bottom par 1.

## 2. Zoom hero

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

<div ref={ref} style={{ height: "180vh" }}>
  <div style={{ position: "sticky", top: 0, height: "100vh", display: "grid", placeItems: "center" }}>
    <motion.div className="hero-card" style={{ scale, opacity }} />
  </div>
</div>
```

Verified: scale 1.00 start par, ~1.38 end ke paas.

## 3. Word highlight

Har word ka apna range hota hai. Hooks loop mein nahi chalte, isliye ek child component use karo.

```tsx
function ScrollWord({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export function WordHighlight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] })
  const words = text.split(" ")
  return (
    <p ref={ref}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <ScrollWord progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</ScrollWord>
          {" "}
        </Fragment>
      ))}
    </p>
  )
}
```

- Words ke beech real `{" "}` zaroori hai. CSS margin se space dene par copy-paste mein words jud jaate hain (test mein ye bug mili thi).
- `range` strictly increasing hona chahiye.

## 4. Clip reveal

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"])

<div ref={ref}><motion.div className="clip-card" style={{ clipPath }} /></div>
```

Verified: start par `inset(100% ...)`, end par `inset(0%)`.

## 5. Horizontal scroll (pinned)

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref })
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6667%"])

<div ref={ref} style={{ height: "300vh" }}>
  <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
    <motion.div style={{ x, display: "flex", width: "300%", height: "100%" }}>
      {panels.map((p) => <div key={p.id} style={{ flex: "0 0 33.3333%" }}>{p.content}</div>)}
    </motion.div>
  </div>
</div>
```

- `x` percent track ki apni width par lagta hai. 3 panels ke liye end `-66.6667%` hai (track 300% hai, to ye 2 viewport width shift karta hai). Panel count ke hisaab se badlo: `N` panels ke liye track `N*100%`, end `-(N-1)/N * 100%`.
- Verified: start par `x` 0, end par `-2560px` (1280 viewport par).

## 6. Parallax layers

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const slow = useTransform(scrollYProgress, [0, 1], [60, -60])
const fast = useTransform(scrollYProgress, [0, 1], [180, -180])

<div ref={ref} style={{ position: "relative", height: 420, overflow: "hidden" }}>
  <motion.div className="layer-back" style={{ y: slow }} />
  <motion.div className="layer-front" style={{ y: fast }} />
</div>
```

- Layers `position: absolute` honi chahiye. Speed ka farq range se aata hai: fast ki range slow se 3 guna badi hai.
- Verified: fast layer 360px move karti hai, slow 120px.

## 7. 3D tilt-in

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
const rotateX = useTransform(scrollYProgress, [0, 1], [35, 0])
const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])

<div style={{ perspective: 1000 }}>
  <motion.div ref={ref} style={{ rotateX, scale, transformOrigin: "center top" }} />
</div>
```

- `perspective` parent par hona chahiye, element par nahi.

## 8. Color shift

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const bg = useTransform(scrollYProgress, [0, 0.5, 1], ["#2a1670", "#0b3b3a", "#5a1a2e"])

<motion.div ref={ref} style={{ backgroundColor: bg }} />
```

- Colors ka array hex ya rgb dono chalta hai. Har stop par ek hi format rakho.

## 9. Stagger grid reveal

```tsx
import type { Variants } from "motion/react"
import { stagger } from "motion"

const parent = { hidden: {}, show: { transition: { delayChildren: stagger(0.08) } } }
const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

<motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
  {items.map((i) => <motion.div key={i.id} variants={item} />)}
</motion.div>
```

- `Variants` type annotate karo. Bina annotation ke `ease` array `number[]` ban jaata hai aur TypeScript error deta hai (test page mein ye error aaya tha).

## 10. Scroll-linked number

```tsx
const ref = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const label = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)

<div ref={ref}><motion.span>{label}</motion.span></div>
```

- Motion value ko seedhe JSX children mein de sakte ho, React state ki zarurat nahi.
- Page ke end mein ho to spacer zaroor do (rule 4).

---

## Verify

1. `internal test page` mein `npm run dev` chalao.
2. `node browser test script chalao (dev server 5173 par ho). Expected: `17/17 passed`.
3. Browser mein dekho: jo scroll effect dikhna chahiye, wo dikhe. Test sirf values check karta hai, feel nahi.

## Known limits

- Ye tests values check karte hain (opacity, transform, clip-path, background). Smoothness aur timing ko aankh se check karna hoga.
- Parallax aur tilt ke exact values aapke design ke hisaab se tune karne padenge.
- Mobile par ye effects heavy ho sakte hain. Mobile ke liye range kam karo ya `window.matchMedia("(min-width: 768px)")` se disable karo.

---


# SKILL: motion-storytelling

> Scrollytelling and story-style scroll animations with Motion: chapter-based sticky stages that crossfade as the reader scrolls, step-by-step process timelines, scroll-driven scene changes with text and visuals kept in sync, and narrative reveal sequences. Use when the user wants a story, case study, product walkthrough, "how it works" steps, or any scroll-driven narrative on a website.

# Motion Storytelling (Scrollytelling)

Story scroll ka matlab hai ek sticky stage (screen par chipka hua visual), aur reader ke scroll se chapters, text ya visuals badalte hain. Ye `motion-scroll` (API) aur `motion-scroll-effects` (single effects) ka next level hai.

Verified: the internal test page aur browser test script (3 chapters, 6 checks pass).

## Structure (har story ke liye ye pattern)

```
<div style="height: 100vh * chapters">        <- scroll range (outer)
  <div style="position: sticky; top: 0; height: 100vh">   <- stage (screen par chipka)
    chapter 1 visual + text   (opacity crossfade)
    chapter 2 ...
    progress indicator
  </div>
</div>
```

- Outer height = chapters ki sankhya x 100vh (3 chapters = `300vh`). Har chapter ko barabar scroll space milta hai.
- Stage `sticky` hota hai, to scroll ke dauran wo screen par rehta hai.

## 1. Chapter crossfade

```tsx
const { scrollYProgress } = useScroll({ target: outerRef })

function Chapter({ index, count, progress, children }) {
  const start = index / count
  const end = (index + 1) / count
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const opacity = useTransform(
    progress,
    [clamp(start - 0.05), clamp(start + 0.05), clamp(end - 0.05), clamp(end + 0.05)],
    [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0],
  )
  const y = useTransform(progress, [clamp(start - 0.05), clamp(start + 0.05)], [40, 0])
  return <motion.div style={{ gridArea: "1 / 1", opacity, y }}>{children}</motion.div>
}
```

Sab chapters stage ke grid ki ek hi cell (`gridArea: "1 / 1"`) mein stack hote hain. Stage par `display: grid; place-items: center` do.

### Ye rules bahut zaroori hain

1. **Offsets [0, 1] ke andar rakho.** Motion scroll ko browser ke native ScrollTimeline par chalata hai, aur wo `[0,1]` ke bahar offset par error deta hai. Ek error se poora React tree crash ho sakta hai (test page mein ye hua tha). Isliye har `clamp()` lagao.
2. **Ranges strictly sorted rakho** (non-decreasing). Chapter ke edges par fade ke liye `±0.05` jaisa chhota overlap rakho.
3. **Pehla chapter index 0 par visible** aur **aakhri chapter end par visible** hona chahiye, warna stage khaali dikhta hai.

## 2. Chapter ka active index (state sirf change par)

Har frame par state update mat karo. Sirf chapter badalne par update karo:

```tsx
const [active, setActive] = useState(0)
useMotionValueEvent(scrollYProgress, "change", (p) => {
  const idx = Math.min(count - 1, Math.floor(p * count))
  setActive((prev) => (prev === idx ? prev : idx))
})
```

- `setActive` ko same value par call karne se React re-render nahi karta, lekin condition se extra safety milti hai.
- Active index ka use progress dots, side navigation ya "Step 2 of 4" label ke liye hota hai.

## 3. Progress indicator (stage ke andar)

```tsx
<motion.div className="story-progress" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} />
```

## 4. Step timeline (process / "how it works")

Steps ek vertical line par chalte hain, aur har step active hone par highlight hota hai.

```tsx
function StepLine({ progress, index, count }) {
  const start = index / count
  const end = (index + 1) / count
  const scale = useTransform(progress, [start, end], [0, 1])  // line is filled up to this step
  return <motion.div className="step-fill" style={{ scaleY: scale, transformOrigin: "top" }} />
}
```

Har step ke liye `useInView` ya `whileInView` se reveal bhi laga sakte ho (`motion-scroll` skill).

## 5. Text and visual sync

- Visual aur text ek hi `Chapter` component mein rakho, taaki dono ek hi progress range se chalen.
- Mobile par story ko sticky ki jagah normal stacked sections mein badal do (`window.matchMedia("(max-width: 768px)")`), kyunki chhote screen par sticky stage aksar text ko dhak leta hai.

## 6. Accessibility

- Har chapter ka text DOM mein hona chahiye (sirf visual nahi), taaki screen reader padh sake.
- Chapter headings `h2`/`h3` mein ho.
- Reduced motion ON ho to crossfade ki jagah chapters ko normal stacked sections dikhao (`motion-accessibility` skill dekho).

## 7. Performance

- Stage par sirf `opacity` aur `transform` animate karo.
- Har chapter ke andar heavy images `loading="lazy"` aur `decoding="async"` ke saath.
- Outer height ko zaroorat se zyada mat badhao: 3 chapters ke liye `300vh` kaafi hai.

## Common mistakes

- Stage ko `sticky` ki parent height bina set kiye: scroll range nahi milti, effect nahi chalta.
- `overflow: hidden` parent ke bina sticky stage ke bahar ki cheezein dikhti hain.
- Chapter count aur outer height match nahi: last chapter ke baad stage pin hi nahi rehta.

## Verify

1. Har chapter ke beech ka scroll point check karo: sirf ek chapter visible ho.
2. Pehle aur aakhri chapter ka edge check karo.
3. Console mein koi error (`Offsets must be ...`) na ho.
4. Mobile width par layout break na ho.

---


# SKILL: motion-svg

> SVG animations with Motion: path line drawing (pathLength), path morphing between shapes, stroke and dash animations, animated icons (checkmark draw, hamburger to X), loading spinners and dot/bar loaders, and SVG attribute animation. Use for animated icons, logo draw-on effects, loaders, or morphing shapes.

# Motion SVG and Loaders

SVG elements ke liye `motion.path`, `motion.svg`, `motion.circle` etc. milte hain. Layout animation SVG par support nahi hoti. Transform aur attributes animate karo.

## 1. Line drawing (pathLength)

```jsx
<motion.path
  d="M4 12 L9 17 L20 6"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
/>
```

- `pathLength` 0 se 1 tak path ko draw karta hai.
- Stroke ke liye `strokeLinecap="round"` se ends smooth dikhte hain.
- Logo draw-on: har path ko `delay` ke saath stagger karo (`transition={{ delay: i * 0.2 }}`).

## 2. Path morphing

```jsx
<motion.path
  d={isOpen ? "M4 4 L20 20" : "M4 8 L20 8"}
  animate={{ d: isOpen ? "M4 4 L20 20" : "M4 8 L20 8" }}
  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}
/>
```

- Morph ke liye dono `d` strings mein same number aur type ke commands honi chahiye (jaise dono mein 2 `M`/`L` ya dono mein `C`). Mismatch par shape jump karta hai.
- Keyframes ke saath: `animate={{ d: [pathA, pathB, pathC] }}`.

## 3. Animated icon: hamburger to X

```jsx
function MenuIcon({ open }) {
  const t = { type: "spring", bounce: 0.1, visualDuration: 0.35 }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <motion.line x1="4" x2="20" y1="8" y2="8"
        animate={{ y1: open ? 12 : 8, y2: open ? 12 : 8, rotate: open ? 45 : 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={t} />
      <motion.line x1="4" x2="20" y1="16" y2="16"
        animate={{ y1: open ? 12 : 16, y2: open ? 12 : 16, rotate: open ? -45 : 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={t} />
    </svg>
  )
}
```

- `rotate` aur `originX` / `originY` SVG elements par kaam karte hain (style prop mein).

## 4. Hover icon (whileHover)

```jsx
<motion.svg whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", bounce: 0.4 }}>
  {/* paths */}
</motion.svg>
```

Gesture props SVG root par theek chalte hain. Filter primitives par nahi.

## 5. Loaders

### Spinner (rotate)

```jsx
<motion.svg width="40" height="40" viewBox="0 0 40 40"
  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
  <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4"
    strokeDasharray="60 100" strokeLinecap="round" />
</motion.svg>
```

### Dots

```jsx
<div style={{ display: "flex", gap: 6 }}>
  {[0, 1, 2].map((i) => (
    <motion.span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor" }}
      animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
  ))}
</div>
```

### Indeterminate bar

```jsx
<div style={{ position: "relative", overflow: "hidden", height: 4, background: "#eee" }}>
  <motion.div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: "currentColor" }}
    animate={{ left: ["-40%", "100%"] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
</div>
```

Loader ko `role="status"` aur `aria-label="Loading"` do.

## 6. Checkmark (copy success)

```jsx
<motion.path d="M4 12 L9 17 L20 6" fill="none" stroke="currentColor" strokeWidth={2}
  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
```

## Rules

1. `d` morph ke liye command structure same rakho.
2. SVG ke `viewBox` ko sahi rakho, warna scale aur rotate ka center galat hota hai.
3. Filter (blur/glow) animate karna heavy hai. Chhote elements par hi use karo.
4. SVG par `layout` prop mat lagao.

## Verify

- Draw aur morph ka end state sahi hai (path poora dikhe).
- Loader infinite loop ke baad bhi smooth hai, aur CPU spike nahi hai.
- Reduced motion par loaders static ya slow hon (aur ek message ho).

---


# SKILL: motion-text

> Text and number animations with Motion: split-text word and character reveals, line mask reveals, scroll-linked word highlighting, typewriter with natural typing rhythm, scramble (decode) text, animated number counters and digit tickers. Use when the user wants animated headings, typing effects, counting stats, or text reveal effects on a site.

# Motion Text and Numbers

Text animation ke liye Motion ka core `animate` aur `stagger` kaafi hai. Alag plugin ki zarurat nahi.

## Accessibility (pehle ye padho)

- Split text ko screen reader ke liye `aria-label` par rakho, aur split spans ko `aria-hidden="true"` karo. Warna har letter padha jaata hai.
- Reduced motion ON ho to pura text turant dikhao (`useReducedMotion()` se check karo).

## 1. Word / character reveal (React)

```jsx
import { Fragment } from "react"
import { motion, useReducedMotion } from "motion/react"

function SplitHeading({ text, as: Tag = "h1" }) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  return (
    <Tag aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: wi * 0.08 }}>
              {word}
            </motion.span>
          </span>
          {" "}
        </Fragment>
      ))}
    </Tag>
  )
}
```

- Words ke beech real space character (`{" "}`) zaroori hai. Sirf CSS margin se space dene par copy-paste aur innerText mein words jud jaate hain (ye bug test mein pakda gaya tha).
- Overflow hidden wrapper ka matlab mask reveal hai (text neeche se upar aata hai).
- Character level ke liye `text.split("")` aur delay `ci * 0.03` jaisa chhota stagger.
- Lines ke liye pehle text ko line break ke hisaab se wrap karna padta hai (DOM measurement). Simple version word-level hi rakho.

## 2. Stagger version (vanilla, stagger() se)

```js
import { animate, stagger } from "motion"

const chars = document.querySelectorAll(".heading .char")  // pehle text ko spans mein split karo
animate(chars, { y: ["110%", "0%"], opacity: [0, 1] }, { duration: 0.8, delay: stagger(0.03) })
```

Text ko spans mein split karne ka kaam manually karo (section 1 ki tarah). Motion ka built-in text splitter is skill mein verified nahi hai, isliye use nahi kiya.

## 3. Scroll-linked word highlight

Paragraph ke har word ka opacity scroll ke saath badhta hai.

```jsx
import { motion, useScroll, useTransform } from "motion/react"

function ScrollWords({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] })
  const words = text.split(" ")

  return (
    <p ref={ref} style={{ fontSize: 48, lineHeight: 1.2 }}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>
      })}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity, marginRight: "0.25em", display: "inline-block" }}>{children}</motion.span>
}
```

## 4. Typewriter with natural rhythm

Har character ka delay thoda random ho, punctuation par pause ho. Ye approximate pattern hai, motion.dev ke demo ka exact source nahi mila.

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function typeNatural(el, text, { base = 55, jitter = 60 } = {}) {
  el.textContent = ""
  for (const ch of text) {
    el.textContent += ch
    const pause = /[.,!?]/.test(ch) ? 260 : 0
    await sleep(base + Math.random() * jitter + pause)
  }
}
```

- Cursor ke liye `::after { content: "|"; animation: blink 1s steps(1) infinite; }` CSS lagao.
- Effect ko cleanup karo (component unmount par flag set karke loop rok do).

## 5. Scramble (decode) text

Random characters se shuru hokar sahi text par resolve hota hai. Plain JS version.

```js
const CHARS = "!<>-_\\/[]{}=+*^?#"

function scramble(el, finalText, duration = 900) {
  const start = performance.now()
  function frame(now) {
    const p = Math.min((now - start) / duration, 1)
    const revealed = Math.floor(p * finalText.length)
    el.textContent = finalText
      .split("")
      .map((c, i) => (i < revealed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join("")
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
```

Hover par dobara chalana ho to `onMouseEnter={() => scramble(el, text)}` do.

## 6. Number counter

```jsx
import { animate } from "motion"

function Counter({ to, duration = 1.4 }) {
  const ref = useRef(null)
  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() },
    })
    return () => controls.stop()
  }, [to, duration])
  return <span ref={ref} />
}
```

- Jab element viewport mein aaye tab chalana ho to `useInView` ya `inView()` se trigger karo.
- Price ya decimal ke liye `toFixed(2)` ya `Intl.NumberFormat` use karo.

## 7. Digit ticker (odometer style)

Har digit ek column mein hota hai, aur wo apne target digit tak slide karta hai.

```jsx
function Digit({ value }) {
  return (
    <span style={{ display: "inline-block", height: "1em", overflow: "hidden", verticalAlign: "top" }}>
      <motion.span
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: "spring", bounce: 0.15, visualDuration: 0.6 }}
        style={{ display: "flex", flexDirection: "column" }}>
        {[0,1,2,3,4,5,6,7,8,9].map((d) => <span key={d} style={{ height: "1em" }}>{d}</span>)}
      </motion.span>
    </span>
  )
}
```

Number ko digits mein split karke har digit ke liye ye component render karo. Pura number ek saath slide karne ke liye `motion-numbers` wala alag pattern chahiye (is skill mein verified nahi).

## Rules

1. Text animation mein `display: inline-block` aur mask (overflow hidden) chahiye, warna mask reveal nahi dikhta.
2. Font load hone se pehle split/measure mat karo (`document.fonts.ready` ke baad).
3. Long paragraphs par character-level animation heavy hai. Word-level ya line-level use karo.

## Verify

- Heading ka final state sahi hai (cut nahi, extra space nahi).
- Screen reader ke liye `aria-label` aur `aria-hidden` set hain.
- Reduced motion par text turant dikhta hai.

---


# SKILL: motion-transitions

> Page and route transitions with Motion: fade and slide route changes, full-screen curtain or wipe overlays, Next.js App Router transition patterns, and enter/exit for modals, dialogs, drawers and toasts. Use when the user wants animated page navigation, a page-change overlay, or smooth modal/drawer open-close transitions.

# Motion Transitions

Ye skill route changes (page to page) aur overlay/modal open-close cover karti hai. Exit animations ke liye `AnimatePresence` zaroori hai.

## 1. Route fade and slide (React Router / Vite)

```jsx
import { AnimatePresence, motion } from "motion/react"
import { useLocation, Routes, Route } from "react-router-dom"

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <Routes location={location} key={location.pathname}>
          {/* routes */}
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}
```

- `mode="wait"` ka matlab purana page pehle exit hoga, phir naya aayega.
- `Routes` ko `location` prop dena zaroori hai, warna exit wala page naye route ka content dikhata hai.

## 2. Next.js App Router

Next.js App Router mein route change par `AnimatePresence` ka exit lagbhag hamesha chalega, lekin soft navigation (Link click) par ye kabhi-kabhi janky hota hai, kyunki router page ko turant unmount karta hai. Safe pattern:

```jsx
"use client"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

export default function Template({ children }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- `template.tsx` file ka use karo (layout ki tarah shared nahi, har navigation par remount hoti hai) — ye transitions ke liye sahi hai.
- Agar exit kaam na kare to motion.dev ka Next.js integration note check karo, kyunki ye framework-specific hai aur is skill mein full verify nahi hai.

## 3. Curtain wipe overlay

Ek full-screen panel slide hokar cover karta hai, phir hat jaata hai.

```jsx
function Curtain({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div key="curtain"
          className="curtain"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1, originY: 1 }}
          exit={{ scaleY: 0, originY: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} />
      )}
    </AnimatePresence>
  )
}
```

CSS: `.curtain { position: fixed; inset: 0; background: #0b0b0b; z-index: 9998; }`

Sequence chahiye (cover, navigate, reveal) to `onAnimationComplete` callback ke andar route change karo.

## 4. Modal / dialog

```jsx
<AnimatePresence>
  {open && (
    <motion.div key="backdrop" className="backdrop" onClick={close}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
  )}
  {open && (
    <motion.div key="dialog" role="dialog" aria-modal="true" className="dialog"
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ type: "spring", bounce: 0.15, visualDuration: 0.35 }}>
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

- Backdrop aur dialog ke alag keys hain.
- Dialog par `Escape` key se close aur focus trap chahiye (accessibility). Ye motion ka kaam nahi, but dhyan rakho.

## 5. Drawer (side sheet)

```jsx
<AnimatePresence>
  {open && (
    <motion.aside key="drawer" className="drawer"
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ type: "spring", bounce: 0, visualDuration: 0.45 }} />
  )}
</AnimatePresence>
```

## 6. Toast

Toast ka exit `layout` ke saath stack shift karta hai. `motion-layout` skill ka `popLayout` pattern use karo.

## Rules

1. `AnimatePresence` conditional ke bahar rakho, aur direct children par `key` do.
2. `mode="wait"` sirf ek child ke liye hai. Multiple children ho to `sync` ya `popLayout`.
3. Route transition mein duration chhota rakho (0.3 se 0.5s), warna navigation slow lagta hai.
4. Modal open hone par background scroll lock karo (CSS `overflow: hidden` on body).

## Verify

- Route change ke dauran blank flash na ho.
- Modal ka close (backdrop click aur Escape) exit animation ke saath chale.
- Reduced motion ON par transitions instant ya opacity-only hon.