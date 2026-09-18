# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal site for Sampreeth Radha Krishna, robotics software engineer. Served as a GitHub Pages user site at the domain root. Rebuilt in September 2026 as a React single page; the previous HTML5 UP template lives in `legacy/` for reference only. The particle portrait was removed at the owner's request; do not bring it back.

## Stack

- React 18 + TypeScript, bundled by Vite 5. `npm run dev` for local, `npm run build` for `dist/`, `npm run preview` to serve the build on port 4173.
- Tailwind CSS 3 with tokens in `tailwind.config.js`: warm near-black `obsidian` ground, cosmic-orange `ember` accent (#FF7A1A, deep #D9520E, soft #FFB073), `bone` and `ash` text tones, `font-serif` = Instrument Serif, `font-mono` = JetBrains Mono. No purple anywhere; the owner rejected it.
- Framer Motion for scroll reveals (`src/components/Reveal.tsx` is the one reveal treatment; reuse it rather than adding new ones).
- Three.js for the hero point field (`src/components/HeroCanvas.tsx`, targets in `src/lib/field.ts`).
- Lucide icons.
- Deploy: `.github/workflows/deploy.yml` builds and publishes `dist/` with GitHub Pages actions on push to `main` or `test`. Pages must be set to "GitHub Actions" as the source in the repo settings.

## Layout

```
index.html                 document shell, fonts, favicon
src/main.tsx               entry, MotionConfig reducedMotion="user"
src/index.css              Tailwind layers, .liquid-glass, .hud, .measure
src/pages/Index.tsx        section order: Hero, Latest, Journey, Now, Contact
src/components/            one file per section plus HeroCanvas, Nav, Reveal
src/content/site.ts        ALL copy. Generated from content/06-journey-narrative.md; edit the source, regenerate.
src/lib/field.ts           human brain generator, stream cloud, robot-brain slot expansion
public/images/             site images (r2d3.png is the transparent, ember-recoloured cutout)
public/data/robot_brain.json  ~7.8k points of the circuit-board brain (x, y, z, brightness, trace id, t)
docs/superpowers/specs/    design spec for the hero (2026-09-17-hero-handover-design.md)
content/                   the content project: extraction, research, drafts, asset inventory
.lavish/journey.html       the reviewed content page (Lavish review surface)
legacy/                    the old template site, untouched
```

## The hero field

30,000 particles in one `THREE.Points` with a custom shader. There is no morph and no state cycle. Each particle lives an 11-second life driven by `fract(uTime / uCycle + aSeed)`: rest in the human brain (30%), disperse into a drifting cloud (14%), converge onto its slot in the circuit brain (14%), rest there with pulses running along the traces (42%), fade, respawn. Phases are spread evenly so both brains are always fully formed and the stream never stops. The pointer repels nearby particles in field space. `prefers-reduced-motion` freezes time at a frame where both brains are formed.

The canvas is `position: fixed` behind the whole page (mounted in `pages/Index.tsx`, `main` sits above it at z-10). Scroll drives `spread` in [0,1]: at 0 the brains sit inside the hero; at 1 they have glided into the page margins at ~80% size. The field keeps full brightness on every part of the page; the owner rejected dimming behind text. Scroll velocity also speeds the particle clock, so fast scrolling visibly accelerates the stream. Per-breakpoint `hero`/`page` layouts are in `resize()`.

The human brain is procedural (`humanBrain`). The robot brain is a brain-profile silhouette filled with PCB traces, pads and a chip, generated offline (Python, see the session record in `content/`) into `public/data/robot_brain.json`; `robotBrainSlots` expands it to one destination per particle. Layout offsets and scale per breakpoint live in the `resize` function of `HeroCanvas.tsx`.

## Content rules

- Copy is final in `content/06-journey-narrative.md` (draft 8). Order: hero, Open Droids first, then the journey oldest-first, Now, beliefs, contact.
- No inflation. Never say "built R2D3" (the software stack was built), never "featured in TechCrunch" (the robot was). The Accenture client is under NDA. The new venture gets one sentence and nothing more.
- Words not to use: cutting-edge, innovative, passionate about innovation, seamlessly.

## Still owed by the owner

A real solar-car photo (the YouTube thumbnail is a placeholder), a photo or clip with the robots, and the Open Droids title once LinkedIn is updated.
