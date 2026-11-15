---
name: motion-dev-animations
description: >-
  Hub for motion.dev-style animations: routes a request (add, copy or recreate any Motion library effect such as layout/shared-element, gestures, scroll, text, SVG, cursor, page transitions, UI components, or performance tuning) to the right motion-* skill and its verified code. Use when the user asks to add motion.dev animations or any Motion (Framer Motion) effect to their website, or names an effect from the motion.dev examples gallery.
---

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
