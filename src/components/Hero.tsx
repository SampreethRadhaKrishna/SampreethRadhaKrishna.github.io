import { motion } from 'framer-motion';
import Nav from './Nav';
import { hero } from '../content/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,8,7,0.4)_80%,rgba(10,8,7,0.85)_100%)]" aria-hidden="true" />

      <Nav />

      {/* labels for the two brains, so the idea reads even before the eye finishes */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(40%-27vmin)] z-10 hidden md:block" aria-hidden="true">
        <span className="hud absolute left-[22%] -translate-x-1/2 text-ash">human brain</span>
        <span className="hud absolute left-[78%] -translate-x-1/2 text-ember-soft">robot brain</span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-10 pt-24 md:px-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium leading-none text-bone">{hero.name}</span>
            <span className="hud text-ash">{hero.role}</span>
          </p>
          <h1 className="font-display leading-[1.12] text-ember-soft">
            <span className="mr-[0.35em] text-[clamp(1.1rem,2.3vw,2.1rem)] font-normal text-ash">Working towards</span>
            <span className="text-[clamp(1.9rem,4.35vw,4rem)] font-semibold tracking-[-0.01em] md:whitespace-nowrap">
              <em className="italic">fully</em> autonomous robots.
            </span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-[1.05rem] leading-relaxed text-ash md:text-[1.15rem]">{hero.fact}</p>
        </motion.div>

      </div>
    </section>
  );
}
