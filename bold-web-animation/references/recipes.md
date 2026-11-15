# Bold Animation Recipes

Har recipe ka use `SKILL.md` ke Step 2 plan ke hisaab se karo. Sab recipes mein reduced-motion check pehle se hona chahiye (SKILL.md, Rule 2).

Library version: npm par latest GSAP check karo aur wahi pin karo. CDN use kar rahe ho to exact version likho.

---

## 0. Setup (GSAP, vanilla)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/<version>/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/<version>/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>
```

React/Next mein:
```bash
npm i gsap @gsap/react
```
```js
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
```

---

## 1. Hero intro timeline

Headline, subtext aur CTA ek ke baad ek aate hain. Ye har page ka opening moment hai.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
  .from('.hero-title .line', { yPercent: 110, duration: 1.1, stagger: 0.08 }, '-=0.3')
  .from('.hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.7')
  .from('.hero-cta', { y: 16, opacity: 0, duration: 0.6 }, '-=0.5');

if (reduce) tl.progress(1); // final state directly
```

HTML side ke liye `.hero-title .line` ko `overflow: hidden` wrapper ke andar rakho taaki yPercent reveal clean dikhe.

---

## 2. Split-text line reveal

Har line alag mask se upar aati hai. Hero title par best lagta hai.

```js
// GSAP SplitText (recent GSAP versions mein free hai)
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  const split = SplitText.create('.split-title', { type: 'lines', mask: 'lines' });
  gsap.from(split.lines, {
    yPercent: 100,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.08,
  });
});
```

Plugin nahi chahiye to fallback: heading ko words mein manually split karke `span` wrap karo aur `.word` animate karo.

---

## 3. Scroll reveal (reusable)

Ek hi function sab sections par.

```js
function revealOnScroll(selector = '[data-reveal]') {
  if (reduce) return;
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      y: 48,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
revealOnScroll();
```

Group reveal (cards ek saath): `gsap.from(items, { ..., stagger: 0.1, scrollTrigger: { trigger: container, start: 'top 80%' } })`.

---

## 4. Parallax image (scrub)

Image container ke andar image ko slow move karo, scroll ke saath.

```js
if (!reduce && window.innerWidth >= 768) {
  gsap.to('.parallax-img', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
```

Parent `.parallax-wrap` par `overflow: hidden` lagao, warna image bahar nikal jaayegi.

---

## 5. Pinned horizontal scroll

Vertical scroll ke andar horizontal panels slide hote hain.

```js
if (!reduce) {
  const panels = gsap.utils.toArray('.h-panel');
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.h-wrap',
      pin: true,
      scrub: 1,
      end: () => '+=' + document.querySelector('.h-wrap').offsetWidth * (panels.length - 1),
      invalidateOnRefresh: true,
    },
  });
}
```

HTML: `.h-wrap` (pinned) > `.h-track` (display flex, width max-content) > `.h-panel`.

---

## 6. Magnetic button

Cursor ke paas aate hi button thoda khinchta hai. Desktop-only.

```js
if (!reduce && matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    });
    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
```

`gsap.quickTo` performance ke liye best hai (har frame new tween nahi banta).

---

## 7. Marquee (infinite text strip)

Pure CSS, koi JS nahi. Lightweight aur smooth.

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee__track {
  display: inline-flex;
  gap: 3rem;
  animation: marquee 18s linear infinite;
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```

HTML: track ke andar same content do baar duplicate karo (`-50%` seamless loop ke liye zaroori hai).

---

## 8. Button hover fill (CSS)

Chhota, clean hover feedback.

```css
.btn {
  position: relative;
  overflow: hidden;
  transition: color 0.35s ease;
  isolation: isolate;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}
.btn:hover::before { transform: scaleX(1); }
.btn:hover { color: var(--btn-hover-text, #fff); }
```

Note: `currentColor` background ke saath text color ko contrast ke liye `--btn-hover-text` set karo, warna text dikhai nahi dega.

---

## 9. Motion (React) version: staggered list entrance

Agar project React + Motion use kar raha hai.

```jsx
import { motion } from 'motion/react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Features({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {items.map((t) => (
        <motion.li key={t} variants={item}>{t}</motion.li>
      ))}
    </motion.ul>
  );
}
```

Reduced motion: Motion ke `MotionConfig reducedMotion="user"` wrap se OS setting automatically respect hoti hai.

---

## Quick picker

| Goal | Recipe |
|---|---|
| Page pehli baar khule to wow | 1 + 2 |
| Har section scroll par aaye | 3 |
| Image mein depth | 4 |
| Case study / portfolio gallery | 5 |
| CTA par interactive feel | 6 + 8 |
| Logos / brand strip | 7 |
| React app ka list/feature grid | 9 |
