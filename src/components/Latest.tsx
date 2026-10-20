import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Volume2, X } from 'lucide-react';
import Reveal from './Reveal';
import PillLink from './PillLink';
import { latest, arenas, press, type Clip } from '../content/site';

// Open Droids first: the longest chapter, one scroll under the hero. The header, then the story
// every clip side by side, then the story as steps you click through.
export default function Latest() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<Clip | null>(null);

  return (
    <section id="open-droids" className="relative px-5 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-14">
          <Reveal>
            <figure className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(255,122,26,0.22)_0%,transparent_70%)] blur-2xl" aria-hidden="true" />
              <img
                src={latest.photo.src}
                alt={latest.photo.alt}
                width={latest.photo.width}
                height={latest.photo.height}
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-3xl object-cover object-[60%_40%] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </figure>
          </Reveal>

          <div className="flex min-w-0 flex-col justify-center">
            <Reveal>
              <p className="hud mb-4 text-ember-soft">{latest.when}</p>
              <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.01em] text-bone md:text-6xl">{latest.name}</h2>
              <p className="mt-3 font-display text-lg text-ember-soft md:text-2xl">{latest.tagline}</p>
              <div className="trace mt-7" aria-hidden="true" />
              <p className="mt-7 font-body text-[1.12rem] leading-[1.6] text-bone/90">{latest.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {latest.facts.map((f) => (
                  <li key={f} className="hud rounded-full border border-ember/30 bg-ember/[0.06] px-3 py-1.5 text-bone">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* The reel: every clip side by side, all playing at once while on screen, framed as the
            robots' own camera feeds, four to a row. A click opens one with sound. */}
        <Reveal className="mt-20">
          <h3 className="section-heading mb-6">{latest.reelHeading}</h3>
          <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
            {latest.reel.map((c, i) => (
              <li key={c.src} className="w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-3*1rem)/4)]">
                <Feed clip={c} index={i} onOpen={() => setOpen(c)} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The story: a numbered list of steps (the order is the story); the open one shows its text. */}
        <Reveal className="mx-auto mt-24 max-w-3xl">
          <h3 className="section-heading mb-6">{latest.storyHeading}</h3>
          <ol>
            {latest.story.map((st, i) => {
              const on = i === step;
              return (
                <li key={st.label} className="border-t border-white/[0.08] last:border-b">
                  <button
                    onClick={() => setStep(i)}
                    aria-expanded={on}
                    aria-controls={`step-${i}`}
                    className="group flex w-full items-baseline gap-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                  >
                    <span className={`hud w-6 shrink-0 ${on ? 'text-ember' : 'text-ash-dim'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-display text-xl leading-snug transition-colors md:text-2xl ${on ? 'text-bone' : 'text-ash group-hover:text-bone'}`}>
                      {st.label}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`step-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="measure space-y-3 pb-6 pl-11 font-body text-[1.04rem] leading-[1.7] text-bone/90">
                          {st.body.map((p, k) => (
                            <p key={k}>{p}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
          <p className="measure mt-8 border-l-2 border-ember/60 pl-4 font-body text-[1rem] italic text-ash">{latest.carried}</p>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="section-heading mb-6">{latest.arenasHeading}</h3>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:grid-cols-2 md:grid-cols-4">
            {arenas.map((a) => (
              <div key={a.label} className="bg-obsidian/60 p-5">
                <p className="hud mb-2 text-ember-soft">{a.label}</p>
                <p className="font-body text-[0.98rem] leading-snug text-bone/90">{a.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* The press as a news strip: verbatim quotes drifting left, each linking to its source. The
            list is drawn twice so the loop is seamless; hover pauses it, reduced motion stops it. */}
        <Reveal className="mt-12">
          <h3 className="section-heading mb-6">{latest.pressHeading}</h3>
          <div className="group relative -mx-5 overflow-hidden md:mx-0 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-4">
                  {press.map((p) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={copy === 1 ? -1 : undefined}
                        className="liquid-glass relative flex h-full w-[19rem] flex-col justify-between gap-3 rounded-2xl p-5 transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="font-body text-[0.98rem] leading-snug text-bone">{p.quote ? <>&ldquo;{p.quote}&rdquo;</> : p.title}</span>
                        <span className="hud inline-flex items-center gap-1 text-ember-soft">
                          {p.source}
                          <ArrowUpRight size={12} aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-5 flex flex-wrap gap-3">
          {latest.links.map((l) => (
            <PillLink key={l.href} href={l.href}>
              {l.label}
            </PillLink>
          ))}
        </Reveal>
      </div>

      <AnimatePresence>{open && <Player clip={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

// One clip as a camera feed: corner brackets, a channel number and a live dot. Plays muted only
// while on screen, and not at all under reduced motion (the poster stands in).
function Feed({ clip, index, onOpen }: { clip: Clip; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button
      onClick={onOpen}
      aria-label={`Play "${clip.label}" with sound`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
    >
      <video ref={ref} src={clip.src} poster={clip.poster} muted loop playsInline preload="none" className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${clip.contain ? 'object-contain' : 'object-cover'}`} />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-2.5" aria-hidden="true">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-ember/80" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-ember/80" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ember/80" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ember/80" />
      </span>
      {/* Channel and date stack, so they never collide on the narrow reel cards. */}
      <span className="hud pointer-events-none absolute left-4 top-4 flex flex-col gap-0.5 text-bone/90">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember shadow-glow" aria-hidden="true" />
          CAM {String(index + 1).padStart(2, '0')}
        </span>
        {clip.date && <span className="text-bone/70">{clip.date}</span>}
      </span>
      <span className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
        <span className="font-body text-[0.95rem] leading-tight text-bone">{clip.label}</span>
        <Volume2 size={14} aria-hidden="true" className="shrink-0 text-ember-soft opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    </button>
  );
}

// The opened clip, with sound and controls. Escape or a click outside closes it.
function Player({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={clip.label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.figure
        className="relative h-[min(86vh,56rem)] max-w-full"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <video src={clip.src} poster={clip.poster} controls autoPlay playsInline className="h-full w-auto max-w-full rounded-2xl bg-black" />
        <figcaption className="hud mt-3 text-center text-ash">{clip.label}{clip.date ? ` · ${clip.date}` : ''}</figcaption>
        <button
          ref={close}
          onClick={onClose}
          aria-label="Close video"
          className="liquid-glass absolute -right-2 -top-2 rounded-full p-2 text-bone hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember md:-right-12 md:top-0"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </motion.figure>
    </motion.div>
  );
}
