import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { latest, arenas, made, press } from '../content/site';

// Open Droids first: the longest chapter, one scroll under the hero.
export default function Latest() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [intro, vision, ...rest] = latest.story;
  const arenaParas = rest.slice(0, 4);
  const closing = rest.slice(4);

  return (
    <section id="open-droids" ref={ref} className="relative px-5 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="hud mb-5 text-ember-soft">{latest.when}</p>
          <h2 className="max-w-4xl font-display text-3xl leading-[1.15] tracking-[-0.01em] text-bone md:text-5xl">
            {latest.title}
          </h2>
          <div className="trace mt-8 max-w-4xl" aria-hidden="true" />
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div className="measure space-y-6 text-[1.06rem] leading-[1.75] text-bone/90 md:text-[1.12rem]">
            <Reveal as="p">{intro}</Reveal>
            <Reveal as="p" delay={0.05}>{vision}</Reveal>
          </div>

          <Reveal className="md:sticky md:top-24 md:self-start">
            <motion.figure style={{ y: imgY }} className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.28)_0%,rgba(217,82,14,0.10)_40%,transparent_70%)] blur-3xl" aria-hidden="true" />
              <img
                src="/images/r2d3.png"
                alt="R2D3, the dual-arm mobile manipulator"
                className="relative mx-auto max-h-[38rem] w-auto drop-shadow-[0_30px_60px_rgba(255,122,26,0.25)]"
                loading="lazy"
              />
              <figcaption className="liquid-glass relative mt-4 rounded-2xl p-5 md:absolute md:bottom-2 md:left-0 md:mt-0 md:max-w-sm">
                <p className="hud mb-2 text-ember-soft">R2D3</p>
                <p className="font-body text-sm leading-relaxed text-bone">
                  Dual-arm mobile manipulator. Unveiled at CES 2025 and CES 2026. The robot in the press coverage ran on the software described here.
                </p>
              </figcaption>
            </motion.figure>
          </Reveal>
        </div>

        {/* Four arenas: home, healthcare, industry, hotels. Paragraph and a one-line summary each. */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-white/[0.06] md:grid-cols-2">
          {arenaParas.map((para, i) => {
            const label = arenas[i]?.split(':')[0] ?? '';
            return (
              <Reveal key={label} delay={i * 0.08} className="bg-obsidian/70 p-7 backdrop-blur-sm md:p-9">
                <p className="hud mb-4 text-ember-soft">{label}</p>
                <p className="font-body text-[1.04rem] leading-[1.75] text-bone/90">{para}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
          <div className="measure space-y-6 text-[1.06rem] leading-[1.75] text-bone/90 md:text-[1.12rem]">
            {closing.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.05}>{p}</Reveal>
            ))}
            <Reveal as="p" className="!mt-10 border-l-2 border-ember/60 pl-5 font-body text-base italic text-ash">
              {latest.carried}
            </Reveal>
          </div>
          <Reveal className="liquid-glass rounded-3xl p-7 md:p-8">
            <p className="hud mb-5 text-ash-dim">What the software work made possible</p>
            <ul className="space-y-3.5 font-body text-[1rem] leading-relaxed text-bone/90">
              {made.map((m) => (
                <li key={m} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ember shadow-glow" aria-hidden="true" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="hud text-ash-dim">The platform, in the press</p>
          {press.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="hud group inline-flex items-center gap-1 text-ash transition-colors hover:text-bone"
            >
              {p.label}
              <ArrowUpRight size={12} className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </Reveal>
        <Reveal className="mt-5 flex flex-wrap gap-3">
          {latest.links.slice(0, 4).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="liquid-glass hud rounded-full px-4 py-2 text-bone transition-colors hover:bg-white/5">
              {l.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
