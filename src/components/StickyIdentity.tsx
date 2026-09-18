import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { hero } from '../content/site';

// The hero identity, scaled down and pinned to the top-left once the hero scrolls away.
// Same arrangement as the hero: name with the role beside it, the headline underneath.
export default function StickyIdentity() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.55));
  return (
    <motion.a
      href="#top"
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -10 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ pointerEvents: shown ? 'auto' : 'none', textShadow: '0 1px 12px rgba(10,8,7,0.9)' }}
      className="fixed left-4 top-4 z-30 block md:left-6 md:top-5"
    >
      <p className="flex flex-wrap items-baseline gap-x-2.5">
        <span className="font-display text-[0.7rem] font-medium leading-none text-bone md:text-[0.95rem]">{hero.name}</span>
        <span className="hud text-[0.5rem] text-ash md:text-[0.62rem]">{hero.role}</span>
      </p>
      <p className="mt-1 whitespace-nowrap font-display leading-[1.12] text-ember-soft">
        <span className="mr-[0.35em] text-[0.42rem] text-ash md:text-[0.55rem]">Working towards</span>
        <span className="text-[0.78rem] font-semibold tracking-[-0.01em] md:text-[1.05rem]">
          <em className="italic">fully</em> autonomous robots.
        </span>
      </p>
    </motion.a>
  );
}
