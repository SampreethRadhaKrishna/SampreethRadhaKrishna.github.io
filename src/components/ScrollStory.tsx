import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

type Props = {
  // One label per step, shown on the rail (years for the journey, short names for Open Droids).
  labels: string[];
  railLabel: string;
  // Optional second line under the current label on desktop (the chapter title).
  sublabels?: string[];
  // How much page each step takes, in viewport heights. More is slower.
  stepVh?: number;
  // Renders the pinned stage for step `i`; `sub` runs 0..1 through that step, for media that
  // advances within a step.
  children: (i: number, sub: number) => ReactNode;
};

// The scroll mechanics shared by every pinned story: attach `track` to a tall wrapper, read the
// step `pos` (and the raw progress for anything drawn continuously), and `jump` to a step.
export function useStoryScroll(n: number) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const [pos, setPos] = useState({ i: 0, sub: 0 });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const x = Math.min(n - 1e-6, Math.max(0, p * n));
    const i = Math.floor(x);
    const sub = Math.round((x - i) * 20) / 20; // quantised so React only re-renders on real change
    setPos((o) => (o.i === i && o.sub === sub ? o : { i, sub }));
  });

  const jump = (i: number) => {
    const t = track.current;
    if (!t) return;
    const top = t.getBoundingClientRect().top + window.scrollY;
    const span = t.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.15) / n), behavior: 'smooth' });
  };

  return { track, scrollYProgress, pos, jump };
}

// The one scroll-driven story treatment: the stage pins to the viewport and the steps change as
// the page scrolls past. The rail shows where you are and jumps to a step on click. Nothing here
// rewrites layout per frame; scroll only sets the step index and the rail fill.
export default function ScrollStory({ labels, railLabel, sublabels, stepVh = 90, children }: Props) {
  const n = labels.length;
  const { track, scrollYProgress, pos, jump } = useStoryScroll(n);
  // The fill reaches node i exactly as step i begins; the comet rides its tip.
  const reach = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, (p * n) / (n - 1))));
  const cometTop = useTransform(reach, (r) => `${r * 100}%`);

  return (
    <div ref={track} className="relative" style={{ height: `${n * stepVh + 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center pb-6 pt-24 md:flex-row md:items-center md:gap-10 md:pb-10 md:pt-24">
        <nav aria-label={railLabel} className="relative mb-4 shrink-0 md:mb-0 md:w-56 md:self-stretch">
          {/* Phones: a row of ticks across the top. Desktop: a vertical rail of labels. */}
          <div className="flex items-center gap-1.5 md:hidden" aria-hidden="true">
            {labels.map((l, i) => (
              <span key={l + i} className={`h-[3px] flex-1 rounded-full transition-colors ${i <= pos.i ? 'bg-ember' : 'bg-white/15'}`} />
            ))}
          </div>
          <p className="hud mt-2 text-ember-soft md:hidden">{labels[pos.i]}</p>

          {/* Desktop: a circuit-trace rail. The fill and a glowing comet ride the scroll, fine ticks
              rule the gaps, and the years magnify like a dock around the current one. */}
          <div className="relative hidden h-full md:block">
            <div className="absolute bottom-[8%] left-[11px] top-[8%] w-px bg-white/[0.08]" aria-hidden="true">
              <motion.div style={{ scaleY: reach }} className="h-full origin-top bg-gradient-to-b from-ember-deep via-ember to-ember-soft shadow-glow" />
              {Array.from({ length: (n - 1) * 4 }, (_, k) =>
                k % 4 === 0 ? null : (
                  <span key={k} className="absolute -left-[3px] h-px w-[7px] bg-white/15" style={{ top: `${(k / ((n - 1) * 4)) * 100}%` }} />
                ),
              )}
              <motion.div style={{ top: cometTop }} className="absolute left-1/2 -translate-x-1/2 -translate-y-full">
                <span className="block h-20 w-px bg-gradient-to-b from-transparent to-ember-soft" />
                <span className="absolute -bottom-[4px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-bone shadow-[0_0_10px_3px_rgba(255,176,115,0.9),0_0_28px_8px_rgba(255,122,26,0.55)]" />
              </motion.div>
            </div>

            <ol className="absolute inset-0">
              {labels.map((l, i) => {
                const d = Math.abs(i - pos.i);
                const on = d === 0;
                return (
                  <li key={l + i} className="absolute left-0 -translate-y-1/2" style={{ top: `${8 + (i / (n - 1)) * 84}%` }}>
                    <button
                      onClick={() => jump(i)}
                      aria-current={on ? 'step' : undefined}
                      className="group flex items-center gap-4 text-left focus-visible:outline-none"
                    >
                      <span className="relative flex h-[23px] w-[23px] shrink-0 items-center justify-center group-focus-visible:rounded-full group-focus-visible:ring-2 group-focus-visible:ring-ember" aria-hidden="true">
                        {on ? (
                          <>
                            <span className="absolute inset-0 animate-ping rounded-full bg-ember/30 motion-reduce:animate-none" />
                            <svg viewBox="0 0 24 24" className="absolute inset-0 animate-[spin_6s_linear_infinite] text-ember-soft motion-reduce:animate-none">
                              <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3.6" />
                            </svg>
                            <span className="h-[9px] w-[9px] rounded-full bg-ember shadow-[0_0_12px_3px_rgba(255,122,26,0.7)]" />
                          </>
                        ) : (
                          <span
                            className={`h-[7px] w-[7px] rotate-45 border transition-colors ${
                              i < pos.i ? 'border-ember bg-ember/70' : 'border-white/30 bg-obsidian group-hover:border-ember/70'
                            }`}
                          />
                        )}
                      </span>
                      <motion.span
                        className="flex origin-left flex-col"
                        animate={{ opacity: on ? 1 : d === 1 ? 0.75 : d === 2 ? 0.45 : 0.22, x: on ? 4 : 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      >
                        <span
                          className={`whitespace-nowrap transition-all duration-300 ${
                            on ? 'font-display text-[1.65rem] leading-none text-ember-soft' : `hud ${d === 1 ? 'text-ash' : 'text-ash-dim'} group-hover:text-bone`
                          }`}
                        >
                          {l}
                        </span>
                        {on && sublabels?.[i] && <span className="hud mt-1.5 max-w-[10rem] leading-snug text-ash">{sublabels[i]}</span>}
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        <div className="min-h-0 min-w-0 flex-1">{children(pos.i, pos.sub)}</div>
      </div>
    </div>
  );
}
