---
name: motion-layout
description: >-
  Layout and shared-element animations with Motion: layout and layoutId, shared element transitions (card to detail), LayoutGroup, layoutDependency and layoutAnchor, AnimatePresence exit modes (sync, wait, popLayout), accordion and expand/collapse, animated tab underline, list reordering. Use when elements change size, position or order, or when the user wants a shared-element or "morph into detail" effect.
---

# Motion Layout

Layout animation (FLIP) browser ke CSS se nahi hoti. Motion element ka purana aur naya position/size measure karta hai, aur transform se animate karta hai. Ye `motion-core` ke basics ke baad padho.

## 1. Basic layout

```jsx
<motion.div layout onClick={() => setOpen(!open)} style={{ width: open ? 320 : 160 }}>
  {open ? <FullContent /> : <Summary />}
</motion.div>
```

- `layout` `true`, `"position"` (sirf position animate), ya `"size"` ho sakta hai.
- Layout change ko `style` ya `className` se karo. `animate` ya `whileHover` se layout change mat karo.
- Element `display: inline` par kaam nahi karega. `block`, `flex` ya `inline-block` do.
- Image ka aspect ratio change ho to `layout="position"` use karo, warna image stretch dikhti hai.
- Scale hone par children bhi distort hote hain. Unhe bhi `layout` do taaki correction ho.
- `borderRadius` aur `boxShadow` tabhi correct hote hain jab wo `style` ya animation prop se set hon.

## 2. Shared element (layoutId)

```jsx
import { motion, AnimatePresence } from "motion/react"

function Gallery({ items }) {
  const [openId, setOpenId] = useState(null)
  const active = items.find((i) => i.id === openId)

  return (
    <>
      {items.map((i) => (
        <motion.img key={i.id} layoutId={i.id} src={i.src} onClick={() => setOpenId(i.id)} />
      ))}
      <AnimatePresence>
        {active && (
          <motion.div key="overlay" className="overlay" onClick={() => setOpenId(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img layoutId={active.id} src={active.src} className="detail" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- Dono jagah `layoutId` same string honi chahiye.
- Detail wale element ko `AnimatePresence` ke andar rakho taaki exit bhi shared transition se chale.
- Overlay ka `key` alag ho, aur `AnimatePresence` conditional ke bahar ho.

## 3. LayoutGroup

Jab alag-alag components ke andar `layoutId` hon, to unhe `LayoutGroup` mein wrap karo.

```jsx
import { LayoutGroup, motion } from "motion/react"

<LayoutGroup id="tabs">
  {tabs.map((t) => (
    <button key={t}>
      {t === active && <motion.span layoutId="underline" className="underline" />}
      {t}
    </button>
  ))}
</LayoutGroup>
```

Ye sliding underline / pill tab ka standard pattern hai.

## 4. Accordion (height animation)

```jsx
function Item({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{title}</button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

Alternative: agar content ka height pehle se pata hai, to `layout` wala version simple hai.

## 5. AnimatePresence modes

| Mode | Kab use karo |
|---|---|
| `"sync"` (default) | Enter aur exit saath chalein (overlays, toasts) |
| `"wait"` | Pehle exit khatam ho, phir naya enter (page / tab content). Sirf ek child ek waqt par |
| `"popLayout"` | Exit wala element layout se bahar nikle aur baaki items smoothly khiskein (lists) |

- `popLayout` mein custom components ko `ref` forward karna zaroori hai.
- `onExitComplete` sab exit khatam hone par chalta hai.
- `initial={false}` pehli render par enter animation skip karta hai.

## 6. Reorder list

```jsx
<AnimatePresence initial={false} mode="popLayout">
  {items.map((it) => (
    <motion.li key={it.id} layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}>
      {it.label}
    </motion.li>
  ))}
</AnimatePresence>
```

Key stable honi chahiye (`id`, index nahi). Index key par reorder galat dikhta hai.

## 7. Scroll ya fixed parent ke andar layout

- Scrollable ancestor ke andar layout glitch ho to us ancestor par `layoutScroll` do.
- `position: fixed` parent par `layoutRoot` do.
- Parent scale ho raha ho to measurement galat aa sakti hai. Scale ko motion value se drive karo.
- `layoutDependency={someValue}` do to measurement sirf tab hoti hai jab value change ho (performance ke liye). Example: `<motion.nav layout layoutDependency={isOpen} />`.
- Corner anchor chahiye (jaise expand from top-left) to `layoutAnchor={{ x: 0, y: 0 }}` (0 se 1).

## Rules

1. Layout animation ke liye `transform` pe trust karo, `width`/`height` ko JS se tween mat karo.
2. Shared element ke liye `layoutId` har jagah unique ho (list items mein `id` ke saath).
3. SVG elements par layout animation support nahi hai. SVG ke liye `motion-svg` skill dekho.
4. Horizontal window resize ke time layout animation band hota hai, ye expected hai.

## Verify

- Click karke dekho ki shared element smoothly move/resize ho raha hai.
- Scroll container ke andar, aur mobile width par bhi test karo.
- Reduced motion ON par layout jump karta hai (ye expected hai).
