// Builds portable rule files from every SKILL.md in this repo, so AI tools that do not read
// Claude Code skills (Cursor, Copilot, Gemini CLI, Codex, any chat app) get the same knowledge.
//
// Usage (from repo root):  node scripts/build-portable.mjs
// Output: dist/  (see README for which file goes where)

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "dist")
const SKIP = new Set(["node_modules", "dist", "scripts", "internal test page", ".git"])

function parseSkill(dir) {
  const raw = readFileSync(join(dir, "SKILL.md"), "utf8")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error(`No frontmatter in ${dir}/SKILL.md`)
  const fm = m[1]
  const name = fm.match(/^name:\s*(.+)$/m)?.[1].trim()
  // description may be a folded block (>-) on following indented lines
  const descMatch = fm.match(/^description:\s*>-?\s*\n([\s\S]*)$/m) ?? fm.match(/^description:\s*(.+)$/m)
  const description = descMatch ? descMatch[1].replace(/^\s+/gm, "").replace(/\n/g, " ").trim() : ""
  const body = m[2].trim()
  const refsDir = join(dir, "references")
  const refs = existsSync(refsDir)
    ? readdirSync(refsDir).filter((f) => f.endsWith(".md")).map((f) => ({ file: f, text: readFileSync(join(refsDir, f), "utf8").trim() }))
    : []
  return { name, description, body, refs, dir }
}

const skills = readdirSync(ROOT)
  .filter((d) => !SKIP.has(d) && statSync(join(ROOT, d)).isDirectory() && existsSync(join(ROOT, d, "SKILL.md")))
  .map((d) => parseSkill(join(ROOT, d)))
  .sort((a, b) => (a.name === "kinetic" ? -1 : b.name === "kinetic" ? 1 : a.name.localeCompare(b.name)))

if (skills.length === 0) throw new Error("No skills found")

const index = skills.map((s) => `- **${s.name}**: ${s.description}`).join("\n")

const header = `# Motion & Website Animation Rules

These rules are generated from the motionGodd-skill repository (${skills.length} skills).
Use them whenever the user asks to add, design, review or fix animations on a website.
Start with the "kinetic" section: it decides which specialist section applies.

## Skill index

${index}

## Core rules (always apply)

1. Animate only transform and opacity. Use layout / layoutId for size and position changes.
2. Respect reduced motion: wrap the app in MotionConfig reducedMotion="user" (React) or check prefers-reduced-motion (vanilla).
3. Keep scroll-linked input ranges inside [0, 1]. Out-of-range offsets crash the native ScrollTimeline path.
4. Use stable keys for AnimatePresence children. Never use array index as key for reorderable lists.
5. Keep motion values out of React state. Use useMotionValue, useSpring, useTransform.
6. Clean up animate(), scroll(), inView() and event listeners on unmount.
7. Split text needs real space characters between words and aria-label on the parent.
8. Use the library the project already has (motion, framer-motion, or gsap). Do not add a second one.
9. Intro under 2 seconds. Entrance 0.6 to 1.0s, hover 0.2 to 0.4s, easing [0.22, 1, 0.36, 1].
10. Verify before claiming done: no console errors, reduced motion check, keyboard focus, mobile width without overflow.

---

`

const sections = skills.map((s) => {
  const parts = [`\n\n# SKILL: ${s.name}\n\n> ${s.description}\n\n${s.body}`]
  for (const r of s.refs) parts.push(`\n\n## Reference: ${r.file}\n\n${r.text}`)
  return parts.join("")
})

const full = header + sections.join("\n\n---\n")

// Short version for tools with small instruction limits (e.g. ChatGPT custom instructions).
const short = `You are a website motion expert using the Motion library (motion.dev) and GSAP.
When asked to add or fix animations:
- Pick the library the project already uses (motion/react for React, motion for vanilla, gsap for GSAP projects).
- Animate only transform and opacity. Use layout/layoutId for layout changes.
- Wrap the app in MotionConfig reducedMotion="user" and branch scroll effects on useReducedMotion.
- Keep scroll input ranges within [0, 1]. Use stable keys in AnimatePresence. Keep motion values out of React state.
- Clean up animate/scroll/inView on unmount. Split text needs real spaces and aria-label.
- Intro under 2s; entrance 0.6-1.0s, hover 0.2-0.4s, ease [0.22, 1, 0.36, 1].
- Output: files changed, what was verified, what was not verified.
Skills covered: ${skills.map((s) => s.name).join(", ")}.
`

const files = {
  "AGENTS.md": full,                       // generic standard read by Codex, Cursor, many agents
  "GEMINI.md": full,                       // Gemini CLI reads GEMINI.md
  ".cursorrules": full,                    // legacy Cursor rules file
  ".github/copilot-instructions.md": full, // GitHub Copilot repo instructions
  "universal-prompt.md": full,             // paste into any chat AI
  "chat-custom-instructions.md": short,    // short version for chat custom-instructions boxes
}

for (const [rel, text] of Object.entries(files)) {
  const path = join(OUT, rel)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, text, "utf8")
}

console.log(`Built ${Object.keys(files).length} files from ${skills.length} skills:`)
for (const rel of Object.keys(files)) console.log("  dist/" + rel)
