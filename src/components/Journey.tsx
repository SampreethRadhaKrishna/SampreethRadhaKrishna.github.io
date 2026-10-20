import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import PillLink from './PillLink';
import ScrollStory from './ScrollStory';
import JourneyDepth from './JourneyDepth';
import { journey, journeyIntro, type Chapter } from '../content/site';

// Nine chapters, oldest first, told as you scroll. Wide screens fly through every picture,
// a cluster per chapter, with the text on the left; narrower ones pin a stage that steps through each chapter's
// pictures beside its text.
export default function Journey() {
  const wide = useWide();

  return (
    <section id="journey" className="relative overflow-x-clip px-5 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {/* The eyebrow is the section heading: an h2 in the outline, the same mono label on screen. */}
          <h2 className="section-heading">{journeyIntro.eyebrow}</h2>
        </Reveal>

        {wide ? (
          <JourneyDepth chapters={journey} label={journeyIntro.eyebrow}>
            {(i) => <ChapterText key={journey[i].id} i={i} compact />}
          </JourneyDepth>
        ) : (
          <ScrollStory labels={journey.map((c) => c.when)} sublabels={journey.map((c) => c.title)} railLabel={journeyIntro.eyebrow}>
            {(i, sub) => (
              <motion.div
                key={journey[i].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex h-full flex-col gap-5 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-12"
              >
                <div className="order-2 md:order-1">
                  <ChapterText i={i} />
                </div>
                <Stage chapter={journey[i]} sub={sub} />
              </motion.div>
            )}
          </ScrollStory>
        )}

      </div>
    </section>
  );
}

// Wide screens get the flight; narrower ones the pinned stage with the rail.
function useWide() {
  const q = '(min-width: 1024px)';
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return wide;
}

// One chapter's words: where it sits, the line, what it left me with, its links. In the flight
// (`compact`) it also carries the organisation's logo and fades in on each change.
function ChapterText({ i, compact }: { i: number; compact?: boolean }) {
  const c = journey[i];
  const body = (
    <>
      <p className="hud text-ember-soft">
        {String(i + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')} · {c.when}
      </p>
      <div className={compact ? 'mt-3 flex items-center gap-4' : ''}>
        {compact && c.logo && (
          <span className="shrink-0 rounded-lg bg-bone/95 px-2.5 py-1.5">
            <img src={c.logo.src} alt={c.logo.alt} className="h-6 w-auto max-w-[7rem] object-contain" />
          </span>
        )}
        <h3 className={`font-display leading-tight text-bone ${compact ? 'text-[1.7rem] xl:text-[2rem]' : 'mt-3 text-2xl md:text-[2.3rem]'}`}>{c.title}</h3>
      </div>
      <p className={`measure font-body text-bone/90 ${compact ? 'mt-3 text-[0.98rem] leading-[1.55] xl:text-[1.04rem]' : 'mt-4 text-[1rem] leading-[1.65] md:mt-5 md:text-[1.08rem]'}`}>{c.line}</p>
      <p className={`border-l-2 border-ember/60 pl-4 font-body text-ash ${compact ? 'mt-3 text-[0.94rem]' : 'mt-5 text-[0.98rem]'}`}>
        <span className="hud mb-1 block text-ash-dim">{journeyIntro.carriedLabel}</span>
        {c.carried}
      </p>
      {c.links.length > 0 && (
        <div className={`${compact ? 'mt-3' : 'mt-5'} flex flex-wrap gap-3`}>
          {c.links.map((l) => (
            <PillLink key={l.href} href={l.href}>
              {l.label}
            </PillLink>
          ))}
        </div>
      )}
      {i === journey.length - 1 && (
        <p className={`hud ${compact ? 'mt-3' : 'mt-5'} text-ash-dim`}>
          {journeyIntro.bridge.before}{' '}
          <a href={journeyIntro.bridge.link.href} className="text-ash underline decoration-ember/50 underline-offset-4 hover:text-bone">
            {journeyIntro.bridge.link.label}
          </a>
          {journeyIntro.bridge.after}
        </p>
      )}
    </>
  );
  if (!compact) return body;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
      {body}
    </motion.div>
  );
}

// The pictures for one chapter, with the organisation's logo pinned in the corner. With several
// pictures, scrolling through the chapter steps through them. No captions: descriptions are alt text.
function Stage({ chapter, sub }: { chapter: Chapter; sub: number }) {
  const n = chapter.media.length;
  const k = Math.min(n - 1, Math.floor(sub * n));
  const m = chapter.media[k];

  return (
    <figure className="order-1 md:order-2">
      <div className="relative aspect-[16/10] max-h-[34svh] w-full overflow-hidden rounded-3xl bg-black/60 shadow-[0_30px_60px_rgba(0,0,0,0.5)] md:max-h-none">
        <AnimatePresence initial={false}>
          {m && (
            <motion.div key={m.src} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
              {m.video ? (
                <video src={m.src} autoPlay muted loop playsInline aria-label={m.alt} className="h-full w-full object-cover" />
              ) : (
                <img src={m.src} alt={m.alt} className="h-full w-full object-cover" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
        {chapter.logo && (
          <div className="absolute left-4 top-4 rounded-xl bg-bone/95 px-3 py-2 shadow-lg">
            <img src={chapter.logo.src} alt={chapter.logo.alt} className="h-6 w-auto max-w-[9rem] object-contain md:h-8" />
          </div>
        )}
        {n > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5" aria-hidden="true">
            {chapter.media.map((x, j) => (
              <span key={x.src} className={`h-1.5 rounded-full transition-all ${j === k ? 'w-5 bg-ember' : 'w-1.5 bg-white/40'}`} />
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
