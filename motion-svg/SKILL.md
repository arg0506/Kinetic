---
name: motion-svg
description: >-
  SVG animations with Motion: path line drawing (pathLength), path morphing between shapes, stroke and dash animations, animated icons (checkmark draw, hamburger to X), loading spinners and dot/bar loaders, and SVG attribute animation. Use for animated icons, logo draw-on effects, loaders, or morphing shapes.
---

# Motion SVG and Loaders

SVG elements ke liye `motion.path`, `motion.svg`, `motion.circle` etc. milte hain. Layout animation SVG par support nahi hoti. Transform aur attributes animate karo.

## 1. Line drawing (pathLength)

```jsx
<motion.path
  d="M4 12 L9 17 L20 6"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
/>
```

- `pathLength` 0 se 1 tak path ko draw karta hai.
- Stroke ke liye `strokeLinecap="round"` se ends smooth dikhte hain.
- Logo draw-on: har path ko `delay` ke saath stagger karo (`transition={{ delay: i * 0.2 }}`).

## 2. Path morphing

```jsx
<motion.path
  d={isOpen ? "M4 4 L20 20" : "M4 8 L20 8"}
  animate={{ d: isOpen ? "M4 4 L20 20" : "M4 8 L20 8" }}
  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}
/>
```

- Morph ke liye dono `d` strings mein same number aur type ke commands honi chahiye (jaise dono mein 2 `M`/`L` ya dono mein `C`). Mismatch par shape jump karta hai.
- Keyframes ke saath: `animate={{ d: [pathA, pathB, pathC] }}`.

## 3. Animated icon: hamburger to X

```jsx
function MenuIcon({ open }) {
  const t = { type: "spring", bounce: 0.1, visualDuration: 0.35 }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <motion.line x1="4" x2="20" y1="8" y2="8"
        animate={{ y1: open ? 12 : 8, y2: open ? 12 : 8, rotate: open ? 45 : 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={t} />
      <motion.line x1="4" x2="20" y1="16" y2="16"
        animate={{ y1: open ? 12 : 16, y2: open ? 12 : 16, rotate: open ? -45 : 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={t} />
    </svg>
  )
}
```

- `rotate` aur `originX` / `originY` SVG elements par kaam karte hain (style prop mein).

## 4. Hover icon (whileHover)

```jsx
<motion.svg whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", bounce: 0.4 }}>
  {/* paths */}
</motion.svg>
```

Gesture props SVG root par theek chalte hain. Filter primitives par nahi.

## 5. Loaders

### Spinner (rotate)

```jsx
<motion.svg width="40" height="40" viewBox="0 0 40 40"
  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
  <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4"
    strokeDasharray="60 100" strokeLinecap="round" />
</motion.svg>
```

### Dots

```jsx
<div style={{ display: "flex", gap: 6 }}>
  {[0, 1, 2].map((i) => (
    <motion.span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor" }}
      animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
  ))}
</div>
```

### Indeterminate bar

```jsx
<div style={{ position: "relative", overflow: "hidden", height: 4, background: "#eee" }}>
  <motion.div style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: "currentColor" }}
    animate={{ left: ["-40%", "100%"] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
</div>
```

Loader ko `role="status"` aur `aria-label="Loading"` do.

## 6. Checkmark (copy success)

```jsx
<motion.path d="M4 12 L9 17 L20 6" fill="none" stroke="currentColor" strokeWidth={2}
  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
```

## Rules

1. `d` morph ke liye command structure same rakho.
2. SVG ke `viewBox` ko sahi rakho, warna scale aur rotate ka center galat hota hai.
3. Filter (blur/glow) animate karna heavy hai. Chhote elements par hi use karo.
4. SVG par `layout` prop mat lagao.

## Verify

- Draw aur morph ka end state sahi hai (path poora dikhe).
- Loader infinite loop ke baad bhi smooth hai, aur CPU spike nahi hai.
- Reduced motion par loaders static ya slow hon (aur ek message ho).
