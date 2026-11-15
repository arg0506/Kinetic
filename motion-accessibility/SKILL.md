---
name: motion-accessibility
description: >-
  Accessibility rules for motion on websites: prefers-reduced-motion handling with Motion (MotionConfig, useReducedMotion, CSS fallbacks), vestibular and seizure safety (no flashing, limited parallax and zoom), focus and keyboard behaviour for animated UI, screen reader friendly split text, and how to test motion accessibility. Use when the user asks about accessibility, reduced motion, WCAG, or wants to make any animation safe for everyone. Apply this skill to every other motion skill's output.
---

# Motion Accessibility

Ye skill har dusre motion skill ke saath lagti hai. Koi bhi animation tab tak complete nahi jab tak reduced motion, keyboard aur screen reader ke liye check na ho.

Verified: browser test script aur browser test script mein reduced-motion check hai (hero text turant dikhta hai). Screen reader ka test manual hai (neeche).

## 1. Reduced motion: teen levels

### Level A: global (sabse pehle ye lagao)

```tsx
import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

- `"user"` OS setting follow karta hai. Ye default choice hai.
- Reduced ON hone par Motion transform aur layout animations band karta hai. Opacity aur color chalte rehte hain.

### Level B: component mein branch

```tsx
const reduce = useReducedMotion()
<motion.div initial={reduce ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} />
```

- `initial={false}` ka matlab: enter animation skip, final state turant.
- Scroll-linked effects (parallax, zoom) par `reduce` ho to effect ko disable karo, ya value flat rakho.

### Level C: CSS fallback (non-Motion elements)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- CSS marquee, spinners aur CSS transitions ke liye ye safety net hai.

### Reduced motion ka matlab kya hai?

- Ye NAHI matlab ki page broken dikhe. Content ka final state turant dikhe.
- Loading spinner band mat karo: uski jagah static indicator ya text do ("Loading…").
- Opacity fade chal sakta hai, lekin zoom, slide, parallax, spin band karo.

## 2. Vestibular aur seizure safety

- **Flash:** 3 se zyada flashes per second na ho (seizure risk). Blink, strobe, rapid color swap avoid karo.
- **Parallax aur zoom:** large motion (bade elements, tez) motion sickness deta hai. Reduced ON par band.
- **Auto-play:** auto-moving carousel ko pause karne ka control do, aur 5 second se zyada auto-advance mat karo.
- **Hover effects:** 3D tilt aur big scale hover par reduced motion mein band.

## 3. Focus aur keyboard

- Jo element animate hota hai, use keyboard se focus kar sakte ho (`tabIndex` ya native button/link).
- Modal, drawer aur menu open hone par focus andar move karo, aur close par wapas trigger par.
- `whileFocus` se focus ring dikhao, lekin focus ring ko animation se hide mat karo.
- Focus ring `outline` se band mat karo: `:focus-visible` style do.

```tsx
<motion.button whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,.7)" }}>Action</motion.button>
```

## 4. Screen reader friendly text animation

Split text (words ya letters) mein screen reader har letter alag padhta hai. Fix:

```tsx
<h1 aria-label="Motion skills test page">
  {words.map((w, i) => (
    <span key={i} aria-hidden="true">...</span>
  ))}
</h1>
```

- Parent par `aria-label` ho, aur split spans par `aria-hidden="true"`.
- Typewriter effect ke liye final text ko live region mein do, taaki screen reader ek hi baar padhe, har letter par nahi.

## 5. Live updates (toasts, loaders, counters)

- Toast ko `role="status"` (ya `aria-live="polite"`) do.
- Counter ka final value screen reader ke liye accessible ho: animate karte waqt bhi text DOM mein sahi value rakho, ya `aria-label` mein final number do.
- Loader ko `role="status"` aur `aria-label="Loading"` do.

## 6. Contrast aur color animation

- Color animation (background shift) ke dauran text contrast WCAG (4.5:1 normal text, 3:1 large) se neeche na jaaye. Har color stop par check karo.
- Sirf color se meaning mat do (jaise active tab sirf color se nahi, underline se bhi).

## 7. Testing checklist

- [ ] OS setting "Reduce motion" ON karke poori page scroll karo. Content visible, koi effect bhaari na lage.
- [ ] Keyboard only: Tab se sab interactive elements tak pahuncho, focus dikhe.
- [ ] Screen reader (NVDA on Windows, VoiceOver on Mac): heading order aur split text sahi padhe jaaye.
- [ ] Zoom 200%: layout nahi tootta.
- [ ] Flash test: koi element 3/sec se zyada flash nahi karta.
- [ ] Console mein koi error nahi (browser test script aur browser test script chalao).

## Automated checks

- the internal test page reduced motion par hero text check karta hai.
- Axe (`@axe-core/playwright`) ya Lighthouse Accessibility audit add karo CI mein.

## Verify

Reduced motion ON, keyboard aur screen reader ke checklist ke saath ek final pass karo. Jo nahi check hua, final message mein likho.
