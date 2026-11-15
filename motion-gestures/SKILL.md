---
name: motion-gestures
description: >-
  Gesture-driven interactions with Motion: whileHover, whileTap (with tap count and hold), whileFocus, drag with constraints and elastic edges, drag snap, direction lock, dragControls, swipe-to-dismiss, pan, and pinch. Use for buttons with hover/press feedback, draggable cards or sliders, swipe actions, or touch-friendly controls.
---

# Motion Gestures

Gesture props `motion` component par seedhe milte hain. Basics ke liye `motion-core` padho.

## 1. Hover, tap, focus

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,.6)" }}
  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.3 }}>
  Click me
</motion.button>
```

- Hover event: `onHoverStart(event)`, `onHoverEnd(event)`.
- Tap: `onTapStart`, `onTap` (button ke andar release), `onTapCancel` (bahar release).
- Keyboard accessibility ke liye `whileFocus` do, aur element focusable hona chahiye (`tabIndex={0}` ya button).
- Touch devices par hover nahi hota, isliye `whileTap` ko primary feedback samjho.

### Advanced tap

```jsx
<motion.div
  tap={{ count: 2, countTimeout: 0.3 }}
  onTap={(e, info) => {/* double tap */}}
  whileTap={{ scale: 0.9 }}>
  Double tap to like
</motion.div>
```

- `tap.count` (default 1), `tap.countTimeout` (default 0.3s), `tap.hold` (seconds) aur `tap.repeat` (seconds) options hain.
- `propagate={{ tap: false }}` nested elements mein tap ko parent tak jaane se rokta hai.

## 2. Drag

```jsx
const ref = useRef(null)

<div ref={ref} className="track">
  <motion.div
    drag="x"
    dragConstraints={ref}
    dragElastic={0.2}
    dragMomentum
    whileDrag={{ scale: 1.05 }}
  />
</div>
```

- `drag`: `true`, `"x"`, ya `"y"`.
- `dragConstraints`: `{ left, right, top, bottom }` (pixels) ya kisi parent element ka ref.
- `dragElastic` (0 se 1, default 0.5) edge par kitna khinchna hai. Per side object bhi chalta hai.
- `dragMomentum` throw ke baad glide karta hai. Bounce tuning ke liye `dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}`.
- `dragSnapToOrigin`: chhodne par wapas origin par.
- `dragDirectionLock`: pehle detect hone wale axis par lock.
- `dragPropagation` default false hai, nested draggable ke liye useful.

### Events

```jsx
onDragStart={(e, info) => {}}
onDrag={(e, info) => {}}      // info.point, info.delta, info.offset, info.velocity
onDragEnd={(e, info) => {}}
```

Parent transform (scale/rotate) ke andar drag ki distance galat ho sakti hai. Motion ka `correctParentTransform` helper `MotionConfig` ke `transformPagePoint` ke saath use hota hai.

## 3. Swipe to dismiss (pattern)

```jsx
function SwipeCard({ onDismiss }) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  return (
    <motion.div
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500) {
          onDismiss()
        }
      }}>
      Swipe me
    </motion.div>
  )
}
```

- Dismiss ke baad element ko `AnimatePresence` se remove karo, taaki exit animation chale.
- `useMotionValue` / `useTransform` se opacity ko drag position ke saath link karo.

## 4. Drag from another element (dragControls)

```jsx
const controls = useDragControls()

<div onPointerDown={(e) => controls.start(e, { snapToCursor: true })}>Drag handle</div>
<motion.div drag dragControls={controls} dragListener={false} />
```

- `dragListener={false}` ka matlab element ko sirf `controls.start` se hi drag kiya ja sakta hai.

## 5. Pan

```jsx
<motion.div onPanStart={() => {}} onPan={(e, info) => {}} onPanEnd={() => {}} />
```

Touch par pan ke liye `touch-action` CSS lagana padta hai (jaise `touch-action: pan-y` horizontal slider mein vertical scroll chalane ke liye).

## 6. Pinch

Pinch default bundle mein nahi hai. `pinchFeatures` ko LazyMotion ke `features` mein add karna padta hai, aur `whilePinch` / `onPinch` use hote hain. Pinch `touch-action: none` set karta hai, isliye sirf wahi element pe lagao jahan zoom chahiye. Exact setup ke liye motion.dev docs check karo, kyunki ye skill mein verified nahi hai.

## Rules

1. Draggable element ke andar `<img>` par `draggable={false}` do, warna browser ka native drag beech mein aata hai.
2. Gesture target ko chhota aur clear rakho. Poori page par drag mat lagao.
3. Gestures SVG `filter` primitives par kaam nahi karte. `while-` props parent par do aur variants use karo.
4. Hover effect ko sirf `(hover: hover)` devices par rakho, aur tap ko sab par.

## Verify

- Mouse aur touch (DevTools device mode) dono se test karo.
- Drag edge par elastic feel karta hai ya nahi, aur release par snap/momentum sahi hai ya nahi.
- Keyboard focus ring dikhta hai.
