import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal';
import { thread, journey } from '../content/site';

// Nine chapters, oldest first, on one rail that fills as you scroll.
export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 80%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <section id="journey" className="relative px-5 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="hud mb-5 text-ember-soft">How I got here</p>
          <p className="max-w-3xl font-body text-[1.2rem] leading-[1.55] text-bone md:text-[1.55rem] md:leading-[1.5]">{thread}</p>
          <div className="trace mt-8 max-w-3xl" aria-hidden="true" />
        </Reveal>

        <ol ref={ref} className="relative mt-20 md:mt-28">
          {/* rail */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/[0.08] md:left-[10.5rem]" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="absolute inset-x-0 top-0 h-full origin-top bg-ember shadow-glow" />
          </div>

          {journey.map((c, i) => (
            <li key={c.id} className="relative grid gap-4 pb-16 pl-8 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-0 md:pb-24 md:pl-0">
              <div className="hud relative text-ember-soft md:pr-8 md:pt-1.5">
                <span className="absolute -left-8 top-1.5 h-[15px] w-[15px] rounded-full border border-ember/60 bg-obsidian md:left-auto md:right-[-7px]">
                  <span className="absolute inset-[4px] rounded-full bg-ember" />
                </span>
                {c.when}
              </div>
              <div className="md:pl-12">
                <Reveal>
                  <h3 className="font-display text-2xl leading-tight text-bone md:text-3xl">{c.title}</h3>
                  <div className="measure mt-5 space-y-4 text-[1.04rem] leading-[1.75] text-bone/85">
                    {c.story.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-6 max-w-[62ch] border-l-2 border-ember/50 pl-4 font-body text-[1rem] italic text-ash">{c.carried}</p>
                </Reveal>
                {c.figures.length > 0 && (
                  <Reveal delay={0.1} className="mt-7 flex flex-wrap gap-3">
                    {c.figures.map((f) => (
                      <figure key={f.src} className="liquid-glass w-[min(100%,16rem)] overflow-hidden rounded-2xl">
                        <img src={f.src} alt={f.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                        <figcaption className="hud px-3 py-2 text-ash-dim">{f.alt}</figcaption>
                      </figure>
                    ))}
                  </Reveal>
                )}
                {i === journey.length - 1 && (
                  <p className="hud mt-8 text-ash-dim">
                    Which is what brought me to{' '}
                    <a href="#open-droids" className="text-ash underline decoration-ember/50 underline-offset-4 hover:text-bone">
                      Open Droids
                    </a>
                    , at the top of this page.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
