# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal site for Sampreeth Radha Krishna, robotics software engineer. Served as a GitHub Pages user site at the domain root. Rebuilt in September 2026 as a React single page; the previous HTML5 UP template lives in `legacy/` for reference only. The particle portrait was removed at the owner's request; do not bring it back.

## Stack

- React 18 + TypeScript, bundled by Vite 5. `npm run dev` for local, `npm run build` for `dist/`, `npm run preview` to serve the build on port 4173.
- Tailwind CSS 3 with tokens in `tailwind.config.js`. Palette: warm near-black `obsidian` ground (#0A0807), cosmic-orange `ember` accent (#FF7A1A, `ember-deep` #D9520E, `ember-soft` #FFB073), text tones `bone`, `ash`, `ash-dim`. No purple anywhere; the owner rejected it.
- Type: `font-display` = Inknut Antiqua (headings, hero), `font-body` = Inconsolata (paragraphs, the body default), `font-mono` = JetBrains Mono (small `.hud` labels only). There is no `font-serif` token and Instrument Serif is no longer used. The owner tried BioRhyme and Instrument Serif for prose and rejected both; do not reintroduce them.
- Framer Motion for scroll reveals (`src/components/Reveal.tsx` is the one reveal treatment; reuse it rather than adding new ones).
- Three.js for the hero point field (`src/components/HeroCanvas.tsx`, targets in `src/lib/field.ts`).
- Lucide icons.
- Deploy: `.github/workflows/deploy.yml` builds and publishes `dist/` with the GitHub Pages actions. Only a push to `test` (the default, working branch) publishes, plus manual `workflow_dispatch`; a running deploy is never cancelled. Pages must be set to "GitHub Actions" as the source in the repo settings. Live at https://sampreeth98.github.io/, so Vite `base: '/'` is correct.

## Layout

```
index.html                 document shell, fonts, favicon, canonical + Open Graph/Twitter tags (absolute URLs)
src/main.tsx               entry, MotionConfig reducedMotion="user"
src/index.css              Tailwind layers, .liquid-glass, .hud, .trace, .measure
src/pages/Index.tsx        HeroCanvas and StickyIdentity, then main: Hero, Thread, Latest, Journey, Now, Contact
src/components/            one file per section, plus:
  HeroCanvas.tsx           the particle scene; also renders the two brain labels, the backlight glows
                           and the black-hole disc as DOM elements inside its fixed container
  StickyIdentity.tsx       compact identity pinned top-left once the hero scrolls away: name, role,
                           headline. No location line. Borderless, no orange outline.
  PillLink.tsx             the shared pill link; use it instead of restyling anchors per section
  ScrollStory.tsx          the pinned scroll story (useStoryScroll + a year rail); Journey below 1024px
  JourneyDepth.tsx         Journey at 1024px and up: every picture in one deep space, a cluster per
                           chapter, flown through on scroll; the owner rejected a boxed ring layout
  Nav.tsx, Reveal.tsx      hero nav; the one scroll-reveal treatment
src/content/site.ts        ALL copy. Generated from content/06-journey-narrative.md; edit the source, regenerate.
src/lib/field.ts           human brain generator, stream cloud, robot-brain slot expansion
public/images/, public/media/  only the images and clips the site references; raw footage in media/ is gitignored (r2d3.png is the transparent, ember-recoloured cutout)
public/og.jpg              share image, 1200x630 (name, headline, circular crop of legacy/images/profpic.jpg)
public/data/robot_brain.json  ~13.3k points of the circuit-board brain (format below)
docs/superpowers/specs/    design spec for the hero (2026-09-17-hero-handover-design.md; read its Amendments section)
content/                   the content project: extraction, research, drafts, asset inventory
.lavish/journey.html       the reviewed content page (Lavish review surface)
legacy/                    the old template site, for reference; legacy/images/ holds the old images nothing references
```

## The hero field

30,000 particles in one `THREE.Points` with a custom shader: a human brain on the left, a circuit-board brain on the right, a continuous stream between them. There is no morph and no state cycle. Each particle lives an 11-second life driven by `fract(uTime / uCycle + aSeed)`: rest in the human brain (30%), disperse into a drifting cloud (14%), converge onto its slot in the circuit brain (14%), rest there with pulses running along the traces (42%), fade, respawn. Phases are spread evenly so both brains are always fully formed and the stream never stops. There is NO telemetry card; it was removed at the owner's request, do not bring it back.

**Circuit brain.** A brain-profile outline with an inset second line, ~70 routed traces on ONE crisp layer (the owner rejected spreading traces across several depth layers because it blurred the lines). Depth comes from a faint underside copy, pads as raised posts, a slab edge, and an enlarged chip standing proud. Inside the chip a five-layer ring-and-column neural core, built from the same particles, spins about a diagonal axis and also turns slowly about the board normal. The board sways gently on two axes; pulses ride just above the traces. The human brain is procedural (`humanBrain`) and rotates slowly.

**Data.** `public/data/robot_brain.json` is generated offline (Python, see the session record in `content/`): `n` points, `data` flat with 6 numbers per point (x, y, z, brightness, trace id, t along trace), and a `chip` centre. Trace ids 0..69 are routed traces, 70 and 71 the outer and inner outline, 72 the chip, and -2 marks core points, whose coordinates are local to the chip centre. `robotBrainSlots` expands it to one destination per particle.

**Scroll.** The canvas is `position: fixed` behind the whole page (mounted in `pages/Index.tsx`; `main` sits above it at z-10). Scroll drives `spread` in [0,1]: at 0 the brains sit inside the hero; at 1 they have glided into the page margins at a smaller scale, computed from the real viewport so both brains stay fully on screen. Once scrolled, the stream fans out vertically to fill the viewport, and scroll velocity speeds the particle clock. The field keeps FULL brightness everywhere; the owner rejected dimming behind text. The backlight glows follow the brains. Per-breakpoint layouts live in `resize()` in `HeroCanvas.tsx`. The stream's mid-air positions are rebuilt in the shader each frame from the live brain offsets. A previous CPU re-anchoring compounded and sent the stream to infinity: do not reintroduce per-frame CPU rewrites of attributes.

**Cursor.** A black hole, not a repulsion. A black shadow disc (DOM, behind the canvas), a photon ring on its rim, a short sharp bright line tilted 15 degrees crossing in front (the edge-on accretion disk), the far side lensed into arcs above and below, the left side brighter. Tight reach: R = 0.5 field units, horizon 0.13. Mouse and pen only, not touch. Reference: NASA's edge-on black hole visualisation.

**Robustness.** The scene fails soft when WebGL is unavailable (the page still reads without it). `prefers-reduced-motion` renders a single still frame with both brains formed. The loop pauses while the tab is hidden.

## Content rules

- Copy is final in `content/06-journey-narrative.md` (draft 8). Order: hero, Open Droids first, then the journey oldest-first, Now, beliefs, contact.
- No inflation. Never say "built R2D3" (the software stack was built), never "featured in TechCrunch" (the robot was). The Accenture client is under NDA. The new venture gets one sentence and nothing more.
- Words not to use: cutting-edge, innovative, passionate about innovation, seamlessly.

## Still owed by the owner

A real solar-car photo (the YouTube thumbnail is a placeholder), a photo or clip with the robots, and the Open Droids title once LinkedIn is updated.
