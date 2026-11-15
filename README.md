# Kinetic

**Kinetic** ek skill set hai jo website par production-grade animations add karti hai: hero intros, scroll effects, story-style scrollytelling, navigation, buttons, modals, text effects, SVG, cursor effects, aur performance aur accessibility ke rules.

Patterns Motion library (`motion/react`, `motion` JS, motion.dev) par based hain, aur ek GSAP skill bhi hai.

Kinetic do tarah se use hoti hai:
1. **Claude Code skills**: `kinetic/SKILL.md` aur baaki `motion-*` folders ko Claude Code mein load karke. Claude ko request do, wo sahi skill chunkar code add karega.
2. **Dusre AI tools**: `dist/` mein plain Markdown bundles (Cursor, GitHub Copilot, Gemini CLI, Codex, ya kisi bhi chat AI mein paste karne ke liye).

---

## Quick start

| Aapka kaam | Kahan se shuru karein |
|---|---|
| Pata nahi kaunsi skill chahiye | [`kinetic/`](kinetic/SKILL.md) (umbrella, sabse pehle yahi) |
| motion.dev ka koi example copy karna | [`motion-dev-animations/`](motion-dev-animations/SKILL.md) (hub + catalog) |
| Scroll effects (zoom, parallax, tilt, progress) | [`motion-scroll-effects/`](motion-scroll-effects/SKILL.md) |
| Story / scrollytelling | [`motion-storytelling/`](motion-storytelling/SKILL.md) |
| Hero section | [`motion-hero/`](motion-hero/SKILL.md) |
| Header / navigation | [`motion-navigation/`](motion-navigation/SKILL.md) |
| Buttons / CTA | [`motion-buttons/`](motion-buttons/SKILL.md) |
| GSAP project | [`bold-web-animation/`](bold-web-animation/SKILL.md) |

---

## Saari skills (19)

| Skill | Kaam |
|---|---|
| [`kinetic`](kinetic/SKILL.md) | Umbrella: request ko route karta hai, quality bar aur final checklist deta hai |
| [`motion-core`](motion-core/SKILL.md) | Base: initial/animate, variants, springs, keyframes, stagger, useAnimate, reduced motion |
| [`motion-layout`](motion-layout/SKILL.md) | Shared element (layoutId), expand/collapse, tab underline, reorder, AnimatePresence modes |
| [`motion-gestures`](motion-gestures/SKILL.md) | Hover, tap, focus, drag, swipe, pan, pinch |
| [`motion-scroll`](motion-scroll/SKILL.md) | useScroll, useTransform, whileInView, inView, scroll() API |
| [`motion-scroll-effects`](motion-scroll-effects/SKILL.md) | 10 ready scroll effects (progress, zoom hero, word highlight, clip reveal, horizontal, parallax, 3D tilt, color shift, stagger, scroll number) |
| [`motion-storytelling`](motion-storytelling/SKILL.md) | Chapter-based sticky scroll story, step timelines |
| [`motion-hero`](motion-hero/SKILL.md) | Staged intro, masked reveals, media reveal, marquee |
| [`motion-navigation`](motion-navigation/SKILL.md) | Hide-on-scroll header, active section indicator, mobile drawer, menus |
| [`motion-buttons`](motion-buttons/SKILL.md) | Shine sweep, press feedback, loading to success, icon swap |
| [`motion-text`](motion-text/SKILL.md) | Split text, typewriter, scramble, scroll word highlight, counters |
| [`motion-svg`](motion-svg/SKILL.md) | Path draw, path morph, animated icons, loaders |
| [`motion-cursor`](motion-cursor/SKILL.md) | Custom spring cursor, magnetic elements, trail |
| [`motion-transitions`](motion-transitions/SKILL.md) | Route transitions, curtain wipe, modal, drawer, toast |
| [`motion-components`](motion-components/SKILL.md) | Accordion, tabs, dropdown, toast stack, skeleton, carousel, card stack, FAB, command palette |
| [`motion-performance`](motion-performance/SKILL.md) | LazyMotion, bundle size, janky animation debugging, large lists |
| [`motion-accessibility`](motion-accessibility/SKILL.md) | Reduced motion, seizure safety, focus, screen readers (har kaam ke saath lagao) |
| [`motion-dev-animations`](motion-dev-animations/SKILL.md) | Hub: motion.dev examples ka catalog aur routing |
| [`bold-web-animation`](bold-web-animation/SKILL.md) | GSAP + ScrollTrigger: hero, reveals, parallax, pinned scroll |

---

## Install: Claude Code

Claude Code skills `~/.claude/skills/` (user-level) ya `<project>/.claude/skills/` (sirf us project ke liye) se load hoti hain. Har skill folder ko wahan copy karo.

**Windows PowerShell:**

```powershell
$src = "C:\path\to\Kinetic"
$dst = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Get-ChildItem $src -Directory | Where-Object { Test-Path (Join-Path $_.FullName "SKILL.md") } | ForEach-Object {
  Copy-Item -Recurse -Force $_.FullName (Join-Path $dst $_.Name)
}
```

**macOS / Linux:**

```bash
src=/path/to/Kinetic
dst=~/.claude/skills
mkdir -p "$dst"
for d in "$src"/*/; do
  [ -f "$d/SKILL.md" ] && cp -r "$d" "$dst/"
done
```

Copy ke baad Claude Code ka naya session shuru karo. Skills apne `description` ke hisaab se trigger hoti hain.

Repo clone karne ke liye:

```bash
git clone https://github.com/arg0506/Kinetic.git
```

---

## Use kaise karein (Claude Code)

Seedha request karo. Jitna clear ho, utna behtar.

Examples:
- `kinetic` use karke is hero section ko premium animation do. Stack React + Vite hai.
- Is page par story-style scroll banao: 3 chapters, left sticky visual, right text.
- Header scroll down par hide ho aur scroll up par wapas aaye.
- Ye button hover par shine sweep kare, aur click par "Sending" se "Sent" dikhaye.
- `motion-scroll-effects` se parallax aur 3D tilt add karo, mobile par band karke.
- motion.dev ka "layout anchor" example is project mein add karo.
- Ye GSAP project hai, `bold-web-animation` se hero aur reveals lagao.

**Achha prompt:** kahan (section/page), feel (subtle, bold, cinematic), stack (React, Vue, vanilla, GSAP), aur constraint (mobile, performance, accessibility) batao.

---

## Dusre AI tools ke liye (`dist/`)

Claude Code skills dusre tools mein nahi chalti. Isliye repo ek script se same knowledge plain Markdown mein deti hai. `dist/` mein ready-made files hain:

| File | Kahan use karein |
|---|---|
| `dist/AGENTS.md` | Generic agent standard (kai coding agents). Project root par rakho |
| `dist/GEMINI.md` | Gemini CLI. Project root par rakho |
| `dist/.cursorrules` | Cursor (legacy rules file). Project root par rakho |
| `dist/.github/copilot-instructions.md` | GitHub Copilot. Project ke `.github/` mein rakho |
| `dist/universal-prompt.md` | Kisi bhi chat AI (ChatGPT, Claude.ai, Gemini web) mein pehle message ke roop mein paste karo |
| `dist/chat-custom-instructions.md` | Chat apps ke "Custom instructions" box ke liye (chhota version) |

Notes:
- Full files ~130 KB hain. Kuch tools mein size limit hoti hai. Agar tool truncate kare to `chat-custom-instructions.md` use karo, ya specific skill ka section.
- Har tool ka behaviour alag ho sakta hai. Ye bundles har tool mein verify nahi kiye gaye hain.

Bundle dobara banane ke liye (skill edit karne ke baad):

```bash
node scripts/build-portable.mjs
```

---

## Har skill ka structure

```
<skill-name>/
  SKILL.md          # frontmatter (name, description) + instructions
  references/*.md   # optional: lamba reference material
```

`SKILL.md` ka frontmatter:

```markdown
---
name: skill-name
description: >-
  Kya karti hai aur kab use karni hai (Claude isi se decide karta hai).
---
```

---

## Core rules (har skill mein lagu)

1. Sirf `transform` aur `opacity` animate karo. Size/position ke liye `layout` / `layoutId`.
2. Reduced motion respect karo: app root par `MotionConfig reducedMotion="user"`, aur scroll effects ko `useReducedMotion` se branch karo.
3. Scroll-linked `useTransform` ke input ranges `[0, 1]` ke andar rakho. Bahar ke offset par native ScrollTimeline error deta hai.
4. `AnimatePresence` children par stable `key` do (index nahi).
5. Motion values ko React state mein mat daalo.
6. `animate()`, `scroll()`, `inView()` aur event listeners unmount par cleanup karo.
7. Split text mein words ke beech real space ho, aur parent par `aria-label`.
8. Project ki existing library use karo (`motion`, `framer-motion` ya `gsap`). Doosri library mat jodo.
9. Intro 2 second se kam. Entrance 0.6–1.0s, hover 0.2–0.4s, easing `[0.22, 1, 0.36, 1]`.

---

## Common problems

| Problem | Wajah | Fix |
|---|---|---|
| Page blank, console mein "Offsets must be..." | Scroll range `[0,1]` ke bahar | Range clamp karo (`motion-scroll`) |
| Exit animation nahi chalta | `AnimatePresence` conditional ke andar, ya child par `key` nahi | `AnimatePresence` ko conditional ke bahar rakho |
| Animation jhatka deta hai | Tailwind `transition-*` class conflict | Motion element se `transition-*` hatao |
| Next.js par "motion is not defined" | Client component nahi | Motion wali file ke upar `"use client"` |
| Split text mein words jud jaate hain | Words ke beech real space nahi | `{" "}` daalo |
| Modal ke upar nav dikh raha hai | Nav ka z-index overlay se upar | Overlay ka z-index nav se bada rakho |
| Scroll effect 100% tak nahi pahunchta | Effect page ke end par, aur niche scroll nahi | Section ke baad `100vh` spacer do |
| Scroll par layout jump | Layout animation ke andar `width`/`height` tween | `layout` prop use karo |

---

## Verification ka status (imaandari se)

- Code snippets Motion ke latest package (14.x) ke against TypeScript type-check hue hain.
- Story scroll, sticky nav, buttons, modal, scroll effects aur gestures ka browser test ek internal test page par hua: values (opacity, transform, clip-path, background, text) check hui, aur console errors 0 rahe. Ye test page is repo mein shamil nahi hai.
- Animation ka feel (timing, easing, smoothness) browser mein aapko khud dekhna hoga.
- motion.dev ke 520+ demos mein se sirf kuch ka source dekha gaya hai. Baaki patterns approximate hain, aur skill files mein ye likha hai.
- Paywall wale demos (Copy Button, Typewriter) ka exact code nahi mila. Approximate hai.
- `motion-svg`, `motion-cursor` aur `bold-web-animation` (GSAP) ka browser test nahi hua, sirf code review.
- Multi-AI bundles ka test sirf file generation tak hai.
- Kisi production site par end-to-end test abhi nahi hua. Use karne se pehle apne project par check karein.

---

## Repo structure

```
Kinetic/
  README.md                   # ye file
  LICENSE                     # MIT
  kinetic/                    # umbrella skill (start here)
  motion-*/                   # specialist skills
  bold-web-animation/         # GSAP skill
  scripts/build-portable.mjs  # multi-AI bundle builder
  dist/                       # generated bundles
```

## License

MIT. Dekho [LICENSE](LICENSE).
