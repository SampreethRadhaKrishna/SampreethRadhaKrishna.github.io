import { hero } from '../content/site';

// Shared between Hero (which renders the headline) and StickyIdentity (which watches it leave).
export const HERO_HEADLINE_ID = 'hero-headline';

// The headline as one sentence, for accessible names: on screen its parts are separate spans
// spaced by a margin, which a screen reader would otherwise run together.
export const headlineText = `${hero.lead} ${hero.emphasis} ${hero.rest}`;
