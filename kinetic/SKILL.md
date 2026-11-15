---
name: kinetic
description: >-
  The umbrella skill for production-grade website motion. Use for any request to add, design, review, fix or optimize animations on a website: it chooses the right specialist skill (core, layout, gestures, scroll, scroll-effects, storytelling, hero, navigation, buttons, text, SVG, cursor, transitions, components, performance, accessibility), applies one quality bar, and runs a final checklist. Prefer this skill when the user asks for "best", "premium", "production-ready" or "motion.dev level" animations, or is unsure which motion skill to use.
---

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
