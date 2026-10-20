import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Headline from './Headline';
import { HERO_HEADLINE_ID } from './heroHeadline';
import { hero } from '../content/site';

// The hero identity, scaled down and pinned to the top-left once the hero headline has
// scrolled away. Same arrangement as the hero: name with the role beside it, the headline
// underneath. Phones get the name and role only; the headline cannot fit there at a legible size.
export default function StickyIdentity() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [shown, setShown] = useState(false);

  // Shown only while the hero headline is above the viewport, so the two never appear together.
  // The observer reports on mount as well, which covers reloads mid-page and #hash links.
  useEffect(() => {
    const headline = document.getElementById(HERO_HEADLINE_ID);
    if (!headline) return;
    const io = new IntersectionObserver(([entry]) => {
      setShown(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    io.observe(headline);
    return () => io.disconnect();
  }, []);

  // Do not leave keyboard focus on a link that has just become invisible.
  useEffect(() => {
    if (!shown && ref.current === document.activeElement) ref.current?.blur();
  }, [shown]);

  // Not a scroll reveal, so not <Reveal>: this toggles in AND out with state, and Reveal only ever enters once.
  return (
    <motion.a
      ref={ref}
      href="#top"
      aria-label={`${hero.name}, ${hero.backToTop}`}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -10 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ pointerEvents: shown ? 'auto' : 'none', textShadow: '0 1px 12px rgba(10,8,7,0.9)' }}
      className="fixed left-4 top-4 z-30 block max-w-[calc(100vw-2rem)] md:left-6 md:top-5"
    >
      {/* Backing: a borderless dark pad with blurred edges, so page text passing underneath stays out of the way. */}
      <span className="pointer-events-none absolute -inset-x-5 -inset-y-3 -z-10 rounded-[2rem] bg-obsidian/80 blur-[10px]" aria-hidden="true" />
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-display text-[0.78rem] font-medium leading-none text-bone md:text-[0.9rem]">{hero.name}</span>
        <span className="hud text-[0.62rem] text-ash">{hero.role}</span>
      </p>
      <p className="mt-1 hidden whitespace-nowrap font-display leading-[1.12] text-ember-soft md:block">
        <Headline leadClass="text-[0.64rem]" mainClass="text-[1.2rem]" />
      </p>
    </motion.a>
  );
}
