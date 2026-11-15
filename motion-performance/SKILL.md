---
name: motion-performance
description: >-
  Performance and bundle optimization for Motion animations: LazyMotion with the m component, the mini animate and useAnimate builds, transform-only rules, avoiding layout thrash, handling large animated lists, reduced motion, and debugging janky animations. Use when the user reports laggy or janky animations, a large bundle, or wants to optimize Motion for production.
---

# Motion Performance

Pehle measure karo, phir optimize karo. Browser DevTools Performance tab aur Motion ke Performance Doctor / Motion Studio tools (docs mein hain) se dekho ki kya slow hai.

## 1. Bundle size

Docs ke mutabik (approximate):

| Setup | Size |
|---|---|
| Full `motion` component | ~43 kb |
| `LazyMotion` + `m` | ~5 kb initial |
| `animate()` mini (`motion/mini`) | ~3.2 kb |
| `animate()` hybrid (`motion`) | ~22 kb |
| `scroll()` | ~3.8 kb |
| `inView()` | ~0.5 kb |
| `useInView` | ~0.6 kb |
| Layout animations | ~12 kb extra |

### LazyMotion + m (React)

```jsx
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} />
    </LazyMotion>
  )
}
```

- `m` component `motion` ke jaise hi kaam karta hai, bas features lazy load hote hain.
- `strict` option (`<LazyMotion strict>`) galti se `motion.div` use hone par error deta hai.
- Layout animation chahiye to `domMax` features (ya `layout` feature) add karo. Exact feature name docs mein check karo.

### Mini animate

```js
import { animate } from "motion/mini"
```

Sirf simple animations (opacity, transform, numbers) ke liye.

### useAnimate mini (React)

```jsx
import { useAnimate } from "motion/react-mini"
```

Sabse chhota React option. Declarative `motion` components ki jagah scoped imperative animations.

## 2. Transform-only rule

- Animate karo: `transform` (`x`, `y`, `scale`, `rotate`) aur `opacity`. Ye GPU par chalte hain.
- Avoid: `top`, `left`, `width`, `height`, `margin`, `padding`, `box-shadow` animate karna (har frame layout ya paint trigger karta hai).
- Layout animation chahiye to `layout` prop use karo (ye FLIP transform use karta hai).

## 3. will-change

- `will-change: transform` sirf active animation ke time par rakho. Hamesha-on mat rakho, kyunki memory badhti hai.
- Motion ke andar ye automatic kaafi kuch handle hota hai, isliye aksar manually lagane ki zarurat nahi.

## 4. Scroll performance

- Scroll-linked animations ke liye `useScroll` + motion values use karo. React state update mat karo har scroll par.
- `useSpring` se smoothing karo, lekin spring stiffness bahut zyada rakhne se extra work hota hai.
- Parallax ko kam elements par rakho (3 se 5 layers kaafi hain).

## 5. Large lists

- 50 se zyada animated items ho to virtualization (react-window, react-virtuoso) lagao, ya stagger ko sirf visible items par chalao.
- Har item par `layout` prop ka cost bhi hota hai. Zaroorat na ho to mat do.
- `viewport={{ once: true }}` se off-screen items par re-animation rokte hain.

## 6. Re-render avoid karo

- Animation values ko `useState` mein mat rakho. `useMotionValue` / `useSpring` use karo.
- `motion` component ko memo-friendly rakho: `variants` objects component ke bahar define karo, har render par naya object nahi.
- `useMotionValueEvent` se value change par side effect chalao, state update se nahi.

## 7. Reduced motion (performance ke liye bhi)

- `MotionConfig reducedMotion="user"` se transform aur layout animations band hote hain, jo kaafi kaam bachata hai.

## 8. Debug checklist

Agar animation janky hai:
1. Kya transform/opacity ke alawa koi property animate ho rahi hai? Fix karo.
2. Kya ek hi frame mein bahut DOM measure ho raha hai (layout thrash)? `layout` ko kam elements par karo.
3. Kya React re-render har frame ho raha hai? Motion values use karo.
4. Kya `filter: blur` ya `box-shadow` bade elements par animate ho raha hai? Chhota karo ya opacity-based effect use karo.
5. Mobile par effects kam karo aur low-end device par test karo (DevTools CPU throttling 4x).

## Verify

- DevTools Performance tab mein scroll/animation ke dauran frame drops kam hain (60fps target).
- Bundle analyzer (`vite-bundle-visualizer` ya Next.js analyzer) mein motion ka size expected range mein hai.
