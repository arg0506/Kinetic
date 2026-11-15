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
