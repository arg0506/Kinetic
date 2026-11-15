---
name: motion-hero
description: >-
  Hero section animations with Motion: staged intro sequences (eyebrow, split headline, subtext, CTA), masked line and word reveals, image or media reveal with scale-in, looping marquee and ticker strips, and hero-to-next-section transitions. Use when the user wants a landing page hero, first-impression intro, or a hero that feels premium on load.
---

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
