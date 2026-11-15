---
name: motion-storytelling
description: >-
  Scrollytelling and story-style scroll animations with Motion: chapter-based sticky stages that crossfade as the reader scrolls, step-by-step process timelines, scroll-driven scene changes with text and visuals kept in sync, and narrative reveal sequences. Use when the user wants a story, case study, product walkthrough, "how it works" steps, or any scroll-driven narrative on a website.
---

# Motion Storytelling (Scrollytelling)

Story scroll ka matlab hai ek sticky stage (screen par chipka hua visual), aur reader ke scroll se chapters, text ya visuals badalte hain. Ye `motion-scroll` (API) aur `motion-scroll-effects` (single effects) ka next level hai.

Verified: the internal test page aur browser test script (3 chapters, 6 checks pass).

## Structure (har story ke liye ye pattern)

```
<div style="height: 100vh * chapters">        <- scroll range (outer)
  <div style="position: sticky; top: 0; height: 100vh">   <- stage (screen par chipka)
    chapter 1 visual + text   (opacity crossfade)
    chapter 2 ...
    progress indicator
  </div>
</div>
```

- Outer height = chapters ki sankhya x 100vh (3 chapters = `300vh`). Har chapter ko barabar scroll space milta hai.
- Stage `sticky` hota hai, to scroll ke dauran wo screen par rehta hai.

## 1. Chapter crossfade

```tsx
const { scrollYProgress } = useScroll({ target: outerRef })

function Chapter({ index, count, progress, children }) {
  const start = index / count
  const end = (index + 1) / count
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const opacity = useTransform(
    progress,
    [clamp(start - 0.05), clamp(start + 0.05), clamp(end - 0.05), clamp(end + 0.05)],
    [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0],
  )
  const y = useTransform(progress, [clamp(start - 0.05), clamp(start + 0.05)], [40, 0])
  return <motion.div style={{ gridArea: "1 / 1", opacity, y }}>{children}</motion.div>
}
```

Sab chapters stage ke grid ki ek hi cell (`gridArea: "1 / 1"`) mein stack hote hain. Stage par `display: grid; place-items: center` do.

### Ye rules bahut zaroori hain

1. **Offsets [0, 1] ke andar rakho.** Motion scroll ko browser ke native ScrollTimeline par chalata hai, aur wo `[0,1]` ke bahar offset par error deta hai. Ek error se poora React tree crash ho sakta hai (test page mein ye hua tha). Isliye har `clamp()` lagao.
2. **Ranges strictly sorted rakho** (non-decreasing). Chapter ke edges par fade ke liye `±0.05` jaisa chhota overlap rakho.
3. **Pehla chapter index 0 par visible** aur **aakhri chapter end par visible** hona chahiye, warna stage khaali dikhta hai.

## 2. Chapter ka active index (state sirf change par)

Har frame par state update mat karo. Sirf chapter badalne par update karo:

```tsx
const [active, setActive] = useState(0)
useMotionValueEvent(scrollYProgress, "change", (p) => {
  const idx = Math.min(count - 1, Math.floor(p * count))
  setActive((prev) => (prev === idx ? prev : idx))
})
```

- `setActive` ko same value par call karne se React re-render nahi karta, lekin condition se extra safety milti hai.
- Active index ka use progress dots, side navigation ya "Step 2 of 4" label ke liye hota hai.

## 3. Progress indicator (stage ke andar)

```tsx
<motion.div className="story-progress" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} />
```

## 4. Step timeline (process / "how it works")

Steps ek vertical line par chalte hain, aur har step active hone par highlight hota hai.

```tsx
function StepLine({ progress, index, count }) {
  const start = index / count
  const end = (index + 1) / count
  const scale = useTransform(progress, [start, end], [0, 1])  // line is filled up to this step
  return <motion.div className="step-fill" style={{ scaleY: scale, transformOrigin: "top" }} />
}
```

Har step ke liye `useInView` ya `whileInView` se reveal bhi laga sakte ho (`motion-scroll` skill).

## 5. Text and visual sync

- Visual aur text ek hi `Chapter` component mein rakho, taaki dono ek hi progress range se chalen.
- Mobile par story ko sticky ki jagah normal stacked sections mein badal do (`window.matchMedia("(max-width: 768px)")`), kyunki chhote screen par sticky stage aksar text ko dhak leta hai.

## 6. Accessibility

- Har chapter ka text DOM mein hona chahiye (sirf visual nahi), taaki screen reader padh sake.
- Chapter headings `h2`/`h3` mein ho.
- Reduced motion ON ho to crossfade ki jagah chapters ko normal stacked sections dikhao (`motion-accessibility` skill dekho).

## 7. Performance

- Stage par sirf `opacity` aur `transform` animate karo.
- Har chapter ke andar heavy images `loading="lazy"` aur `decoding="async"` ke saath.
- Outer height ko zaroorat se zyada mat badhao: 3 chapters ke liye `300vh` kaafi hai.

## Common mistakes

- Stage ko `sticky` ki parent height bina set kiye: scroll range nahi milti, effect nahi chalta.
- `overflow: hidden` parent ke bina sticky stage ke bahar ki cheezein dikhti hain.
- Chapter count aur outer height match nahi: last chapter ke baad stage pin hi nahi rehta.

## Verify

1. Har chapter ke beech ka scroll point check karo: sirf ek chapter visible ho.
2. Pehle aur aakhri chapter ka edge check karo.
3. Console mein koi error (`Offsets must be ...`) na ho.
4. Mobile width par layout break na ho.
