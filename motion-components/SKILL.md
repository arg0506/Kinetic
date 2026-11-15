---
name: motion-components
description: >-
  Production-ready animated UI components built with Motion: accordion, animated tabs with sliding underline, dropdown menu, toast stack, skeleton shimmer, swipeable card stack, carousel with drag and snap, floating action button expand, and command palette open/close. Use when the user needs a complete animated UI component rather than a single effect.
---

# Motion Components

Ye complete components hain jo copy karke project mein use kiye ja sakte hain. Har component ke liye building blocks `motion-core`, `motion-layout` aur `motion-gestures` mein hain.

## Rules for all components

- Existing project ka component library (shadcn, Radix, Base UI) hai to unke primitives par motion lagao, naya UI system mat banao.
- Accessibility: role, aria attributes aur keyboard navigation zaroor do.
- Reduced motion: `useReducedMotion()` se transitions ko instant ya opacity-only rakho.

---

## 1. Accordion

```jsx
function Accordion({ items }) {
  const [openId, setOpenId] = useState(null)
  return items.map((it) => {
    const open = openId === it.id
    return (
      <div key={it.id}>
        <button aria-expanded={open} onClick={() => setOpenId(open ? null : it.id)}>
          {it.title}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="panel" role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}>
              {it.body}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  })
}
```

## 2. Tabs with sliding underline

```jsx
function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <LayoutGroup id="tabs">
      <div role="tablist" style={{ display: "flex", gap: 16 }}>
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id}
            onClick={() => setActive(t.id)} style={{ position: "relative" }}>
            {t.label}
            {active === t.id && (
              <motion.span layoutId="tab-underline"
                style={{ position: "absolute", left: 0, right: 0, bottom: -4, height: 2, background: "currentColor" }}
                transition={{ type: "spring", bounce: 0.15, visualDuration: 0.4 }} />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} role="tabpanel"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}>
          {tabs.find((t) => t.id === active).content}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
```

`LayoutGroup` import `motion/react` se karo.

## 3. Dropdown menu

```jsx
<AnimatePresence>
  {open && (
    <motion.ul role="menu" key="menu"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ transformOrigin: "top right" }}>
      {items.map((i) => (
        <motion.li key={i.id} role="none">
          <motion.button role="menuitem" whileHover={{ x: 4 }} onClick={i.onSelect}>{i.label}</motion.button>
        </motion.li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>
```

Keyboard arrow navigation alag se implement karo (Radix ya Base UI menu use karo to free milta hai).

## 4. Toast stack

```jsx
<AnimatePresence initial={false} mode="popLayout">
  {toasts.map((t) => (
    <motion.div key={t.id} layout role="status"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ type: "spring", bounce: 0.15, visualDuration: 0.4 }}>
      {t.message}
    </motion.div>
  ))}
</AnimatePresence>
```

Auto-dismiss ke liye `setTimeout` alag se lagao, aur `toasts` state se item hatao.

## 5. Skeleton shimmer

```jsx
<motion.div aria-busy="true" style={{ height: 16, borderRadius: 4, overflow: "hidden",
  background: "#e5e7eb", position: "relative" }}>
  <motion.div style={{ position: "absolute", inset: 0,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent)" }}
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
</motion.div>
```

## 6. Swipeable card stack

```jsx
function CardStack({ cards, onDismiss }) {
  const top = cards[0]
  return (
    <AnimatePresence>
      {top && (
        <SwipeCard key={top.id} onDismiss={() => onDismiss(top.id)}>
          {top.content}
        </SwipeCard>
      )}
    </AnimatePresence>
  )
}
```

`SwipeCard` ka code `motion-gestures` skill ke "Swipe to dismiss" pattern se lo. Piche ke cards ko scale aur y offset se dikhao: `style={{ scale: 1 - i * 0.05, y: i * 10 }}`.

## 7. Carousel with drag

```jsx
function Carousel({ slides }) {
  const trackRef = useRef(null)
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div ref={trackRef} drag="x" style={{ display: "flex", gap: 16, cursor: "grab" }}
        dragConstraints={{ right: 0, left: -(slides.length - 1) * 320 }}
        dragElastic={0.1} dragMomentum>
        {slides.map((s) => (
          <div key={s.id} style={{ flex: "0 0 300px" }}>{s.content}</div>
        ))}
      </motion.div>
    </div>
  )
}
```

- `-(n-1) * (slide width + gap)` ko actual width se match karo.
- Snap chahiye to drag end par `info.offset.x` ke hisaab se `animate` se nearest slide par jaao.
- Carousel ke `<img>` par `draggable={false}` do.

## 8. FAB expand

```jsx
<motion.div layout style={{ borderRadius: 999, background: "#111", color: "#fff", overflow: "hidden" }}
  transition={{ type: "spring", bounce: 0.15, visualDuration: 0.35 }}>
  <button onClick={() => setOpen(!open)} style={{ padding: 16 }}>+</button>
  <AnimatePresence>
    {open && (
      <motion.div key="actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* action buttons */}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

## 9. Command palette

Overlay ka `motion-transitions` modal pattern use karo. Results list ke liye `AnimatePresence` + `layout` + `popLayout` (motion-layout section 6).

---

## Verify (sab components ke liye)

- Keyboard se open, navigate aur close kar sakte ho.
- Mobile width par layout break nahi hota.
- Reduced motion ON par component kaam karta hai aur animations skip ya simple hain.
