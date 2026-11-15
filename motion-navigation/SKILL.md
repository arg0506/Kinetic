---
name: motion-navigation
description: >-
  Navigation animations with Motion: header that hides on scroll down and returns on scroll up, sticky header with scroll-based background, active section indicator, animated mobile menu drawer, mega menu reveal, and dropdown menus. Use when the user wants a site header or navigation that moves, hides, reveals, or highlights sections with animation.
---

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
