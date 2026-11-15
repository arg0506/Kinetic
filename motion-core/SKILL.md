---
name: motion-core
description: >-
  Foundation of the Motion animation library (motion/react and motion JS): motion component, initial/animate/exit, variants, springs and tween transitions, keyframes, stagger and orchestration, useAnimate, animate(), MotionConfig reduced motion. Use for any Motion animation task, or as the base before layout, gesture, scroll, text or SVG work.
---

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
