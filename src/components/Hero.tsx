import Nav from './Nav';
import Reveal from './Reveal';
import Headline from './Headline';
import { HERO_HEADLINE_ID, headlineText } from './heroHeadline';
import { hero } from '../content/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Nav />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-10 pt-24 md:px-10 md:pb-14">
        <Reveal y={24} delay={0.3} duration={1.1}>
          <p className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium leading-none text-bone">{hero.name}</span>
            <span className="hud text-ash">{hero.role}</span>
          </p>
          {/* The two spans are spaced by a margin, not a space character, so name the heading explicitly. */}
          <h1 id={HERO_HEADLINE_ID} aria-label={headlineText} className="font-display leading-[1.12] text-ember-soft">
            <Headline
              leadClass="text-[clamp(1.1rem,2.3vw,2.1rem)]"
              mainClass="text-[clamp(1.9rem,4.35vw,4rem)] md:whitespace-nowrap"
            />
          </h1>
          <p className="mt-6 max-w-xl font-body text-[1.05rem] leading-relaxed text-ash md:text-[1.15rem]">{hero.fact}</p>
        </Reveal>
      </div>
    </section>
  );
}
