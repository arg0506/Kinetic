---
name: motion-scroll-effects
description: >-
  Catalog of scroll-driven effects built with Motion, each tested in a real browser: fixed scroll progress bar, zoom-on-scroll sticky hero, word-by-word highlight, clip-path reveal, pinned horizontal scroll, multi-speed parallax layers, 3D tilt-in, background color shift on scroll, staggered grid reveal, and scroll-linked numbers. Use when the user wants a specific scroll effect on a website, or asks for "scroll pe alag-alag animations".
---

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
