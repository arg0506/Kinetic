---
name: motion-transitions
description: >-
  Page and route transitions with Motion: fade and slide route changes, full-screen curtain or wipe overlays, Next.js App Router transition patterns, and enter/exit for modals, dialogs, drawers and toasts. Use when the user wants animated page navigation, a page-change overlay, or smooth modal/drawer open-close transitions.
---

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
