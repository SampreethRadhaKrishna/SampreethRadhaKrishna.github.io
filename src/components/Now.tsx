import Reveal from './Reveal';
import { now } from '../content/site';

export default function Now() {
  return (
    <section id="now" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.10)_0%,transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* The eyebrow is the section heading: an h2 in the outline, the same mono label on screen. */}
          <h2 className="section-heading mb-6">{now.eyebrow}</h2>
          <p className="font-body text-[1.06rem] leading-[1.7] text-bone/90 md:text-[1.22rem]">{now.story}</p>
          <div className="trace mx-auto mt-8 max-w-3xl" aria-hidden="true" />
        </Reveal>
        <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl text-center">
          <p className="font-display text-3xl leading-[1.2] tracking-[-0.01em] text-bone md:text-5xl">
            {now.mission}
          </p>
        </Reveal>

      </div>
    </section>
  );
}
