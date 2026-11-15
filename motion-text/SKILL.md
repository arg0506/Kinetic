---
name: motion-text
description: >-
  Text and number animations with Motion: split-text word and character reveals, line mask reveals, scroll-linked word highlighting, typewriter with natural typing rhythm, scramble (decode) text, animated number counters and digit tickers. Use when the user wants animated headings, typing effects, counting stats, or text reveal effects on a site.
---

# Motion Text and Numbers

Text animation ke liye Motion ka core `animate` aur `stagger` kaafi hai. Alag plugin ki zarurat nahi.

## Accessibility (pehle ye padho)

- Split text ko screen reader ke liye `aria-label` par rakho, aur split spans ko `aria-hidden="true"` karo. Warna har letter padha jaata hai.
- Reduced motion ON ho to pura text turant dikhao (`useReducedMotion()` se check karo).

## 1. Word / character reveal (React)

```jsx
import { Fragment } from "react"
import { motion, useReducedMotion } from "motion/react"

function SplitHeading({ text, as: Tag = "h1" }) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  return (
    <Tag aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: wi * 0.08 }}>
              {word}
            </motion.span>
          </span>
          {" "}
        </Fragment>
      ))}
    </Tag>
  )
}
```

- Words ke beech real space character (`{" "}`) zaroori hai. Sirf CSS margin se space dene par copy-paste aur innerText mein words jud jaate hain (ye bug test mein pakda gaya tha).
- Overflow hidden wrapper ka matlab mask reveal hai (text neeche se upar aata hai).
- Character level ke liye `text.split("")` aur delay `ci * 0.03` jaisa chhota stagger.
- Lines ke liye pehle text ko line break ke hisaab se wrap karna padta hai (DOM measurement). Simple version word-level hi rakho.

## 2. Stagger version (vanilla, stagger() se)

```js
import { animate, stagger } from "motion"

const chars = document.querySelectorAll(".heading .char")  // pehle text ko spans mein split karo
animate(chars, { y: ["110%", "0%"], opacity: [0, 1] }, { duration: 0.8, delay: stagger(0.03) })
```

Text ko spans mein split karne ka kaam manually karo (section 1 ki tarah). Motion ka built-in text splitter is skill mein verified nahi hai, isliye use nahi kiya.

## 3. Scroll-linked word highlight

Paragraph ke har word ka opacity scroll ke saath badhta hai.

```jsx
import { motion, useScroll, useTransform } from "motion/react"

function ScrollWords({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] })
  const words = text.split(" ")

  return (
    <p ref={ref} style={{ fontSize: 48, lineHeight: 1.2 }}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>
      })}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity, marginRight: "0.25em", display: "inline-block" }}>{children}</motion.span>
}
```

## 4. Typewriter with natural rhythm

Har character ka delay thoda random ho, punctuation par pause ho. Ye approximate pattern hai, motion.dev ke demo ka exact source nahi mila.

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function typeNatural(el, text, { base = 55, jitter = 60 } = {}) {
  el.textContent = ""
  for (const ch of text) {
    el.textContent += ch
    const pause = /[.,!?]/.test(ch) ? 260 : 0
    await sleep(base + Math.random() * jitter + pause)
  }
}
```

- Cursor ke liye `::after { content: "|"; animation: blink 1s steps(1) infinite; }` CSS lagao.
- Effect ko cleanup karo (component unmount par flag set karke loop rok do).

## 5. Scramble (decode) text

Random characters se shuru hokar sahi text par resolve hota hai. Plain JS version.

```js
const CHARS = "!<>-_\\/[]{}=+*^?#"

function scramble(el, finalText, duration = 900) {
  const start = performance.now()
  function frame(now) {
    const p = Math.min((now - start) / duration, 1)
    const revealed = Math.floor(p * finalText.length)
    el.textContent = finalText
      .split("")
      .map((c, i) => (i < revealed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join("")
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
```

Hover par dobara chalana ho to `onMouseEnter={() => scramble(el, text)}` do.

## 6. Number counter

```jsx
import { animate } from "motion"

function Counter({ to, duration = 1.4 }) {
  const ref = useRef(null)
  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() },
    })
    return () => controls.stop()
  }, [to, duration])
  return <span ref={ref} />
}
```

- Jab element viewport mein aaye tab chalana ho to `useInView` ya `inView()` se trigger karo.
- Price ya decimal ke liye `toFixed(2)` ya `Intl.NumberFormat` use karo.

## 7. Digit ticker (odometer style)

Har digit ek column mein hota hai, aur wo apne target digit tak slide karta hai.

```jsx
function Digit({ value }) {
  return (
    <span style={{ display: "inline-block", height: "1em", overflow: "hidden", verticalAlign: "top" }}>
      <motion.span
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: "spring", bounce: 0.15, visualDuration: 0.6 }}
        style={{ display: "flex", flexDirection: "column" }}>
        {[0,1,2,3,4,5,6,7,8,9].map((d) => <span key={d} style={{ height: "1em" }}>{d}</span>)}
      </motion.span>
    </span>
  )
}
```

Number ko digits mein split karke har digit ke liye ye component render karo. Pura number ek saath slide karne ke liye `motion-numbers` wala alag pattern chahiye (is skill mein verified nahi).

## Rules

1. Text animation mein `display: inline-block` aur mask (overflow hidden) chahiye, warna mask reveal nahi dikhta.
2. Font load hone se pehle split/measure mat karo (`document.fonts.ready` ke baad).
3. Long paragraphs par character-level animation heavy hai. Word-level ya line-level use karo.

## Verify

- Heading ka final state sahi hai (cut nahi, extra space nahi).
- Screen reader ke liye `aria-label` aur `aria-hidden` set hain.
- Reduced motion par text turant dikhta hai.
