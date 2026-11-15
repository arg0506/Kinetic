---
name: motion-scroll
description: >-
  Scroll-based animations with Motion: scroll-linked motion with useScroll and useTransform, parallax, smoothed scroll with useSpring, scroll progress bars, horizontal scroll sections, scroll-triggered reveals with whileInView and viewport, useInView, and the vanilla scroll() and inView() APIs. Use for parallax heroes, scroll storytelling, progress indicators, scroll reveals, or horizontal galleries.
---

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
