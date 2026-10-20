# Hero redesign: the handover

Date: 2026-09-17. Decisions confirmed with the owner in chat.

## Intent

The first thing a visitor sees is a human brain made of light continuously dispersing into data and re-forming, on the other side, as a robot brain. Both brains exist at all times. The stream between them never stops. A visitor should understand in two seconds, without reading, that this is a person who turns human intelligence into machine intelligence.

## Decisions

- Robot brain: the brain's profile rebuilt as a circuit board. Traces routed inside the outline with 45° turns, glowing pads at trace ends, a processor die at the centre with pin stubs, and the outline itself drawn in points. Pulses of light travel along the traces.
- Trigger: none. It is a continuous process. Each particle lives a cycle: rest in the human brain, disperse into a wide cloud (the dispersion animation the owner liked), converge onto its slot in the robot brain, rest there, fade, respawn in the human brain. Particle phases are staggered so both brains are always populated and the stream is always flowing.
- Portrait: removed from the site entirely.
- Palette: cosmic orange, warm and deep. `ember` #FF7A1A, `ember-deep` #D9520E, `ember-soft` #FFB073, ground `obsidian` #0A0807 (warm), text `bone` #F2EDE6, secondary `ash` #B8AFA6. No purple anywhere.
- Type: Instrument Serif (display and prose), JetBrains Mono (readouts).

## Hero composition

Wide screens: human brain upper-left third, robot brain upper-right third, stream across the middle. Headline bottom-left, telemetry readout bottom-right. Narrow screens: brains stacked, human above robot, headline below.

Telemetry shows live counts: particles resting in the human brain, in transit, in the robot brain, and frame rate. The numbers come from the same phase function the shader uses, so they are true.

Interaction: pointer repels nearby particles, which return. Human brain rotates slowly; robot brain is tilted a few degrees toward the camera and holds.

## Data

- `src/lib/field.ts`: human brain generator (kept), stream cloud generator.
- `public/data/robot_brain.json`: generated offline by a Python script (union-of-ellipses silhouette, grid random-walk trace routing, pads, chip). Fields per point: x, y, z, brightness, trace id, t along trace.

## Rest of the page

Same content and order as draft 8 (Open Droids first, journey, now, beliefs, contact) recoloured to ember. Section titles get a hairline trace with a travelling pulse. The R2D3 render gets an ember rim glow. The journey rail fills in ember as you scroll.

## Out of scope

Particle portrait. Any purple. Cycling states or morph readouts.

## Amendments (2026-09-17 to 2026-09-18)

Later decisions by the owner. Where they conflict with the body above, these win. `CLAUDE.md` describes the current state in full.

- Telemetry card: removed. No live counts or frame-rate readout anywhere; do not bring it back.
- Type: Inknut Antiqua for display, Inconsolata for prose, JetBrains Mono for small labels only. Instrument Serif is gone (BioRhyme was also tried for prose and rejected).
- Pointer: a black hole rather than a repulsion. Shadow disc, photon ring, a short edge-on accretion line tilted 15 degrees, far side lensed into arcs, tight reach. Mouse and pen only.
- Robot brain motion: the board sways gently on two axes rather than holding a fixed tilt.
- Chip: enlarged, with a revolving five-layer ring-and-column neural core inside it, built from the same particles.
- Board depth: a faint underside copy, raised pads, a slab edge and a proud chip. The traces stay on a single crisp layer; spreading them across depth layers blurred the lines and was rejected.
- Scroll: the canvas is fixed behind the whole page. The brains glide into the margins, the stream fans out to fill the viewport, and the backlight glows follow the brains. Brightness is never dimmed behind text.
- Pinned identity: once the hero scrolls away, a compact name, role and headline block pins to the top-left. No location line, no border.
