---
name: motion-cursor
description: >-
  Cursor and pointer-driven effects with Motion: custom spring-following cursor, magnetic buttons, cursor trails, cursor state changes on hover targets, and touch fallbacks. Use when the user wants a custom cursor, magnetic elements, pointer-follow effects, or cursor hover states on a portfolio or landing page.
---

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
