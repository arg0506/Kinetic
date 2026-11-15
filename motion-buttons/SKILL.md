---
name: motion-buttons
description: >-
  Button and CTA micro-interactions with Motion: hover fill and shine sweep, press feedback, magnetic pull, loading-to-success state change, icon swaps, and link underline draw. Use when the user wants buttons, call-to-action, or small hover and click feedback to feel polished.
---

# Motion Buttons

Button ka kaam click ko confirm karna hai. Animation chhota (0.2 se 0.4s), aur state se linked ho: hover, press, loading, success.

Verified: the internal test page (`ShineButton`, `LoadingButton`) aur browser test script (shine sweep, loading to sent).

## 1. Shine sweep (hover)

```tsx
const shine = { rest: { x: "-100%" }, hover: { x: "100%" } }

<motion.button className="btn" initial="rest" whileHover="hover" whileTap={{ scale: 0.97 }}
  variants={{ rest: {}, hover: {} }}>
  <motion.span className="shine" variants={shine}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
  <span className="btn-label">{children}</span>
</motion.button>
```

```css
.btn { position: relative; overflow: hidden; }
.shine { position: absolute; inset: 0; background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent); pointer-events: none; }
.btn-label { position: relative; }
```

- Parent `variants={{ rest: {}, hover: {} }}` do: iske bina `whileHover="hover"` ka label child tak propagate karne mein issue ho sakta hai (test page mein yahi pattern kaam kiya).
- Overlay `pointer-events: none` ho, warna click block hota hai.

## 2. Press feedback

```tsx
<motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", bounce: 0.25, visualDuration: 0.25 }}>
  Continue
</motion.button>
```

- Hover par thoda upar, press par thoda chhota. Ye sabse safe default hai.
- Touch device par `whileHover` nahi chalta, press feedback zaroor lagao.

## 3. Loading to success

Button ka label `AnimatePresence mode="wait"` mein badlo: idle, loading, done.

```tsx
const [state, setState] = useState<"idle" | "loading" | "done">("idle")
const label = state === "idle" ? "Send" : state === "loading" ? "Sending…" : "Sent ✓"

<motion.button aria-busy={state === "loading"} onClick={() => state === "idle" && setState("loading")}>
  <AnimatePresence mode="wait" initial={false}>
    <motion.span key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      {label}
    </motion.span>
  </AnimatePresence>
</motion.button>
```

- Ek hi `setTimeout` (ya async request) se state badlo, aur cleanup (`clearTimeout`) useEffect mein karo.
- Loading ke dauran button disabled ya `aria-busy` ho, double submit na ho.
- Testbed mein ye test hua: "Sending…" aur phir "Sent ✓".

## 4. Magnetic CTA

`motion-cursor` skill ka `Magnetic` wrapper use karo. Primary CTA par hi lagao, har button par nahi.

## 5. Icon swap

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.svg key={copied ? "check" : "copy"} initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
    {/* icon */}
  </motion.svg>
</AnimatePresence>
```

- Icon ke `key` ko state se linked rakho, taaki swap animate ho.

## 6. Link underline draw

```css
.link { background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px; background-position: 0 100%; background-repeat: no-repeat; transition: background-size .35s cubic-bezier(.22,1,.36,1); }
.link:hover { background-size: 100% 1px; }
```

Ye CSS-only hai, aur `transform` nahi `background-size` animate karta hai. Chhota element hai, to performance theek rehti hai.

## Rules

1. Button ka size hover par change mat karo (layout shift hota hai). Sirf `transform` aur `opacity`.
2. Har button par focus-visible ring rakho (`:focus-visible`), motion se pehle.
3. Loading state mein label badalo, layout ko nahi.
4. Ek screen par 1 primary CTA ke liye zyada motion, baaki buttons ke liye kam.

## Common mistakes

- `whileHover` ke saath CSS `transition: all` (Tailwind `transition-all`): dono conflict karte hain.
- `whileTap` ko `scale` ke bajaye `width` se karna: layout jump.
- Loading mein `setTimeout` cleanup na karna: unmount ke baad state update warning.

## Verify

1. Hover, press, focus ring teeno dikhte hain.
2. Loading flow: idle, loading, done sahi order mein.
3. Touch device par press feedback kaam karta hai.
4. Reduced motion par shine aur spring band ho (instant state change).
