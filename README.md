<div align="center">

# ⚡ Kinetic

**Website ke liye production-grade motion skills.**
Hero intros, scroll effects, storytelling, navigation, buttons, modals, text, SVG, cursor, performance aur accessibility, sab ek jagah.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-19-7c5cff.svg)](#-saari-skills)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-ready-d97757.svg)](#-install-claude-code)
[![Motion](https://img.shields.io/badge/Motion-14.x-0b0b0c.svg)](https://motion.dev)

</div>

---

## 📑 Table of Contents

- [Kinetic kya hai](#-kinetic-kya-hai)
- [Quick start](#-quick-start)
- [Saari skills](#-saari-skills)
- [Install: Claude Code](#-install-claude-code)
- [Use kaise karein](#-use-kaise-karein)
- [Dusre AI tools ke liye](#-dusre-ai-tools-ke-liye)
- [Core rules](#-core-rules)
- [Common problems](#-common-problems)
- [Verification status](#-verification-status)
- [Repo structure](#-repo-structure)
- [License](#-license)

---

## 🎯 Kinetic kya hai

Kinetic ek **skill set** hai jo AI ko website animations sikhati hai. Aap request karo ("is hero ko premium animation do"), aur AI sahi skill chunkar code project mein add karta hai.

Patterns **Motion** library (`motion/react`, `motion` JS, [motion.dev](https://motion.dev)) par based hain. Ek **GSAP** skill bhi shamil hai.

| Use case | Ye kaise kaam karta hai |
|---|---|
| **Claude Code** | `kinetic/` aur `motion-*/` folders ko skills ke roop mein load karo |
| **Cursor, Copilot, Gemini CLI, Codex** | `dist/` ki ready-made rule files project mein rakho |
| **Kisi bhi chat AI** | `dist/universal-prompt.md` ko pehle message mein paste karo |

---

## 🚀 Quick start

| Aapka kaam | Kahan se shuru karein |
|---|---|
| 🤷 Pata nahi kaunsi skill chahiye | [`kinetic/`](kinetic/SKILL.md) (umbrella, yahi se shuru karo) |
| 🎬 Scroll effects (zoom, parallax, tilt) | [`motion-scroll-effects/`](motion-scroll-effects/SKILL.md) |
| 📖 Story / scrollytelling | [`motion-storytelling/`](motion-storytelling/SKILL.md) |
| 🦸 Hero section | [`motion-hero/`](motion-hero/SKILL.md) |
| 🧭 Header / navigation | [`motion-navigation/`](motion-navigation/SKILL.md) |
| 🔘 Buttons / CTA | [`motion-buttons/`](motion-buttons/SKILL.md) |
| 🎞️ motion.dev example copy karna | [`motion-dev-animations/`](motion-dev-animations/SKILL.md) |
| 🟢 GSAP project | [`bold-web-animation/`](bold-web-animation/SKILL.md) |

---

## 🧩 Saari skills

<details open>
<summary><b>🧠 Umbrella</b></summary>

| Skill | Kaam |
|---|---|
| [`kinetic`](kinetic/SKILL.md) | Request ko sahi skill tak route karta hai, quality bar aur final checklist deta hai |

</details>

<details open>
<summary><b>🏗️ Foundation</b></summary>

| Skill | Kaam |
|---|---|
| [`motion-core`](motion-core/SKILL.md) | Variants, springs, keyframes, stagger, `useAnimate`, reduced motion |
| [`motion-layout`](motion-layout/SKILL.md) | Shared element (`layoutId`), expand/collapse, tab underline, reorder, `AnimatePresence` |
| [`motion-gestures`](motion-gestures/SKILL.md) | Hover, tap, focus, drag, swipe, pan, pinch |
| [`motion-performance`](motion-performance/SKILL.md) | `LazyMotion`, bundle size, jank debugging, badi lists |

</details>

<details open>
<summary><b>📜 Scroll & Story</b></summary>

| Skill | Kaam |
|---|---|
| [`motion-scroll`](motion-scroll/SKILL.md) | `useScroll`, `useTransform`, `whileInView`, `inView`, `scroll()` API |
| [`motion-scroll-effects`](motion-scroll-effects/SKILL.md) | 10 ready effects: progress, zoom hero, word highlight, clip reveal, horizontal, parallax, 3D tilt, color shift, stagger, scroll number |
| [`motion-storytelling`](motion-storytelling/SKILL.md) | Chapter-based sticky story, step timelines |

</details>

<details open>
<summary><b>✨ UI & Interaction</b></summary>

| Skill | Kaam |
|---|---|
| [`motion-hero`](motion-hero/SKILL.md) | Staged intro, masked reveals, media reveal, marquee |
| [`motion-navigation`](motion-navigation/SKILL.md) | Hide-on-scroll header, active section, mobile drawer, menus |
| [`motion-buttons`](motion-buttons/SKILL.md) | Shine sweep, press feedback, loading → success, icon swap |
| [`motion-text`](motion-text/SKILL.md) | Split text, typewriter, scramble, scroll word highlight, counters |
| [`motion-components`](motion-components/SKILL.md) | Accordion, tabs, dropdown, toast, skeleton, carousel, card stack, FAB, command palette |

</details>

<details open>
<summary><b>🎨 Visual & Special</b></summary>

| Skill | Kaam |
|---|---|
| [`motion-svg`](motion-svg/SKILL.md) | Path draw, path morph, animated icons, loaders |
| [`motion-cursor`](motion-cursor/SKILL.md) | Custom spring cursor, magnetic elements, trail |
| [`motion-transitions`](motion-transitions/SKILL.md) | Route transitions, curtain wipe, modal, drawer, toast |

</details>

<details open>
<summary><b>♿ Quality & Reference</b></summary>

| Skill | Kaam |
|---|---|
| [`motion-accessibility`](motion-accessibility/SKILL.md) | Reduced motion, seizure safety, focus, screen readers (har kaam ke saath lagao) |
| [`motion-dev-animations`](motion-dev-animations/SKILL.md) | Hub: motion.dev examples ka catalog aur routing |
| [`bold-web-animation`](bold-web-animation/SKILL.md) | GSAP + ScrollTrigger: hero, reveals, parallax, pinned scroll |

</details>

---

## 🔌 Install: Claude Code

Claude Code skills `~/.claude/skills/` (sab projects ke liye) ya `<project>/.claude/skills/` (sirf ek project ke liye) se load hoti hain. Har skill folder ko wahan copy karo.

<details open>
<summary><b>🪟 Windows (PowerShell)</b></summary>

```powershell
$src = "C:\path\to\Kinetic"
$dst = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Get-ChildItem $src -Directory | Where-Object { Test-Path (Join-Path $_.FullName "SKILL.md") } | ForEach-Object {
  Copy-Item -Recurse -Force $_.FullName (Join-Path $dst $_.Name)
}
```

</details>

<details open>
<summary><b>🍎 macOS / 🐧 Linux</b></summary>

```bash
src=/path/to/Kinetic
dst=~/.claude/skills
mkdir -p "$dst"
for d in "$src"/*/; do
  [ -f "$d/SKILL.md" ] && cp -r "$d" "$dst/"
done
```

</details>

Repo clone karne ke liye:

```bash
git clone https://github.com/arg0506/Kinetic.git
```

> 💡 Copy ke baad Claude Code ka **naya session** shuru karo. Skills apne `description` ke hisaab se apne aap trigger hoti hain.

---

## 💬 Use kaise karein

Seedha request karo. Jitna clear ho, utna achha result.

```text
kinetic use karke is hero section ko premium animation do. Stack React + Vite hai.
```

```text
Is page par story-style scroll banao: 3 chapters, left sticky visual, right text.
```

```text
Header scroll down par hide ho aur scroll up par wapas aaye.
```

```text
Ye button hover par shine sweep kare, aur click par "Sending" se "Sent" dikhaye.
```

```text
motion-scroll-effects se parallax aur 3D tilt add karo, mobile par band karke.
```

```text
Ye GSAP project hai, bold-web-animation se hero aur reveals lagao.
```

### ✍️ Achha prompt kaise likhein

| Batao | Example |
|---|---|
| 📍 **Kahan** | "landing page ka hero", "pricing section" |
| 🎭 **Feel** | subtle / bold / cinematic |
| 🧱 **Stack** | React, Vue, vanilla JS, GSAP |
| 📏 **Constraint** | mobile, performance budget, accessibility |

---

## 🌐 Dusre AI tools ke liye

Claude Code skills dusre tools mein nahi chalti. Isliye `dist/` mein same knowledge plain Markdown mein hai.

| File | Kahan use karein |
|---|---|
| `dist/AGENTS.md` | Generic agent standard (kai coding agents). Project root par |
| `dist/GEMINI.md` | Gemini CLI. Project root par |
| `dist/.cursorrules` | Cursor (legacy rules). Project root par |
| `dist/.github/copilot-instructions.md` | GitHub Copilot. Project ke `.github/` mein |
| `dist/universal-prompt.md` | Kisi bhi chat AI mein pehle message ke roop mein paste karo |
| `dist/chat-custom-instructions.md` | Chat apps ke "Custom instructions" box ke liye (chhota) |

> ⚠️ Full files ~130 KB hain. Kuch tools mein size limit hoti hai, to `chat-custom-instructions.md` use karo.

Skill edit karne ke baad bundles dobara banane ke liye:

```bash
node scripts/build-portable.mjs
```

---

## 🧱 Skill ka structure

```text
<skill-name>/
├── SKILL.md          # frontmatter (name, description) + instructions
└── references/       # optional: lamba reference material
    └── *.md
```

```markdown
---
name: skill-name
description: >-
  Kya karti hai, aur kab use karni hai (Claude isi se decide karta hai).
---
```

---

## 📐 Core rules

Har skill mein ye rules lagu hote hain:

1. ✅ Sirf `transform` aur `opacity` animate karo. Size/position ke liye `layout` / `layoutId`.
2. ♿ Reduced motion respect karo: app root par `MotionConfig reducedMotion="user"`.
3. 📏 Scroll-linked `useTransform` ke input ranges `[0, 1]` ke andar rakho.
4. 🔑 `AnimatePresence` children par stable `key` do (index nahi).
5. 🧠 Motion values ko React state mein mat daalo.
6. 🧹 `animate()`, `scroll()`, `inView()` aur listeners unmount par cleanup karo.
7. 🔤 Split text mein words ke beech real space ho, aur parent par `aria-label`.
8. 📦 Project ki existing library use karo (`motion`, `framer-motion`, `gsap`). Doosri mat jodo.
9. ⏱️ Intro 2 second se kam. Entrance 0.6–1.0s, hover 0.2–0.4s, easing `[0.22, 1, 0.36, 1]`.

---

## 🛠️ Common problems

| Problem | Wajah | Fix |
|---|---|---|
| Page blank, console mein `Offsets must be...` | Scroll range `[0,1]` ke bahar | Range clamp karo (`motion-scroll`) |
| Exit animation nahi chalta | `AnimatePresence` conditional ke andar, ya child par `key` nahi | `AnimatePresence` ko conditional ke bahar rakho |
| Animation jhatka deta hai | Tailwind `transition-*` conflict | Motion element se `transition-*` hatao |
| Next.js: "motion is not defined" | Client component nahi | Motion wali file ke upar `"use client"` |
| Split text mein words jud jaate hain | Words ke beech real space nahi | `{" "}` daalo, sirf CSS margin nahi |
| Modal ke upar nav dikh raha hai | Nav ka z-index overlay se upar | Overlay ka z-index nav se bada rakho |
| Scroll effect 100% tak nahi pahunchta | Effect page ke end par | Section ke baad `100vh` spacer do |
| Scroll par layout jump | Layout ke andar `width`/`height` tween | `layout` prop use karo |

---

## ✅ Verification status

Imaandari se bataya gaya status:

| Kya | Status |
|---|---|
| Motion API snippets (TypeScript) | ✅ Latest `motion` (14.x) ke against type-check hue |
| Story, nav, buttons, modal, scroll effects, gestures | ✅ Internal test page par browser check (opacity, transform, clip-path, background, text). Console errors 0 |
| Animation ka feel (timing, easing, smoothness) | 👀 Aapko browser mein khud dekhna hoga |
| motion.dev examples | ⚠️ 520+ demos mein se kuch ka source verify hua. Baaki approximate hain (skill files mein likha hai) |
| Paywall demos (Copy Button, Typewriter) | ⚠️ Exact code nahi mila, approximate hai |
| `motion-svg`, `motion-cursor`, `bold-web-animation` | 📝 Sirf code review, browser test nahi |
| Multi-AI bundles | 📝 Sirf file generation tak test hua |
| Production site par end-to-end | ❌ Abhi nahi hua. Use karne se pehle apne project par check karein |

---

## 🗂️ Repo structure

```text
Kinetic/
├── README.md                    # ye file
├── LICENSE                      # MIT
├── kinetic/                     # 🧠 umbrella skill (yahan se shuru karo)
├── motion-*/                    # 🎬 specialist skills
├── bold-web-animation/          # 🟢 GSAP skill
├── scripts/
│   └── build-portable.mjs       # 🔁 multi-AI bundle builder
└── dist/                        # 🌐 generated rule files
```

---

## 📄 License

MIT License. Dekho [LICENSE](LICENSE).

<div align="center">

Made for websites that move with intent. ⚡

</div>
