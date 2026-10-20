import Reveal from './Reveal';
import { thread } from '../content/site';

// The one paragraph that ties every chapter together, set right under the hero.
export default function Thread() {
  return (
    <section className="relative px-5 pt-32 md:px-10 md:pt-40">
      <Reveal className="mx-auto max-w-6xl">
        {/* Centred, in the hero headline's ember, so it reads as the headline's continuation. */}
        <p className="mx-auto max-w-3xl text-center font-body text-[1.2rem] leading-[1.55] text-ember-soft md:text-[1.45rem] md:leading-[1.5]">{thread}</p>
        <div className="trace mx-auto mt-8 max-w-3xl" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
