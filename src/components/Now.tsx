import Reveal from './Reveal';
import { now, beliefs } from '../content/site';

export default function Now() {
  return (
    <section id="now" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.10)_0%,transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="hud mb-6 text-ember-soft">Now</p>
          <p className="font-body text-[1.06rem] leading-[1.7] text-bone/90 md:text-[1.22rem]">{now.story}</p>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl text-center">
          <p className="font-display text-3xl leading-[1.2] tracking-[-0.01em] text-bone md:text-5xl">
            {now.mission}
          </p>
        </Reveal>

        <div className="mt-28 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-4 md:gap-8">
          {beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <h3 className="font-display text-xl leading-tight text-bone">{b.title}</h3>
              <p className="mt-3 font-body text-[0.98rem] leading-relaxed text-ash">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
