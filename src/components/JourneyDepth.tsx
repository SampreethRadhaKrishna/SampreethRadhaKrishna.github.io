import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useStoryScroll } from './ScrollStory';
import type { Chapter, Media } from '../content/site';

// The journey on wide screens, as a flight through the archive. Every picture and clip hangs in
// one deep space, a cluster per chapter, the oldest nearest. On arrival you see all of them
// receding into the dark; scrolling flies forward, each chapter's cluster comes up to full size
// and light, then swells past and is gone. The text for the chapter in front sits on the left.
const DEPTH = 520; // px between chapters along the line of sight
const PERSPECTIVE = 1000; // px
// The chapters still ahead trail off to the upper right instead of hiding behind the one in
// front: placed so that, after perspective, the k-th one ahead lands sqrt(k / 8) of the way to
// STREAM. Chapters already passed slide out to the lower left as they swell.
const STREAM: [number, number] = [28, -34]; // vw, vh
const PASS: [number, number] = [-18, 10]; // vw, vh per chapter

// Where a chapter's pictures sit around its cluster centre: x and size in vw, y in vh.
const CLUSTERS: [number, number, number][][] = [
  [],
  [[0, 0, 30]],
  [[-8, -7, 22], [9, 8, 20]],
  [[-9, -10, 19], [10, -6, 16], [0, 12, 18]],
  [[-10, -11, 17], [8, -12, 15], [-6, 11, 15], [11, 9, 17]],
];

type Props = {
  chapters: Chapter[];
  label: string;
  stepVh?: number;
  // The text for chapter `i`, shown on the left.
  children: (i: number) => ReactNode;
};

export default function JourneyDepth({ chapters, label, stepVh = 90, children }: Props) {
  const n = chapters.length;
  const { track, scrollYProgress, pos, jump } = useStoryScroll(n);
  // The camera sits on chapter i at the middle of its step.
  const cam = useTransform(scrollYProgress, (p) => Math.min(n - 1, Math.max(0, p * n - 0.5)));
  const fill = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, (p * n - 0.5) / (n - 1))));

  return (
    <div ref={track} className="relative" style={{ height: `${n * stepVh + 100}vh` }}>
      {/* Full bleed: the space runs to the edges of the window, not the text column. */}
      <div className="sticky top-0 ml-[calc(50%-50vw)] h-[100svh] w-screen overflow-hidden">
        <div className="absolute inset-0" style={{ perspective: PERSPECTIVE, perspectiveOrigin: '66% 54%' }} aria-hidden="true">
          <div className="absolute left-[66%] top-[54%]" style={{ transformStyle: 'preserve-3d' }}>
            {chapters.map((c, i) => {
              const ox = 2 + Math.sin(i * 2.1) * 4;
              const oy = Math.cos(i * 1.7) * 6;
              const layout = CLUSTERS[Math.min(4, c.media.length)];
              return c.media.map((m, j) => (
                <Piece
                  key={m.src}
                  media={m}
                  chapter={i}
                  cam={cam}
                  at={layout[j] ?? [0, 0, 18]}
                  offset={[ox, oy]}
                  tilt={(((i * 5 + j * 3) % 7) - 3) * 0.9}
                  year={j === 0 ? c.when : undefined}
                  onClick={() => jump(i)}
                />
              ));
            })}
          </div>
        </div>

        {/* A shade behind the words so they read over whatever is passing. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent" aria-hidden="true" />

        <div className="absolute inset-y-0 flex w-[34%] max-w-[30rem] items-center" style={{ left: 'max(2.5rem, calc((100vw - 72rem) / 2 + 2.5rem))' }} aria-live="polite">
          {children(pos.i)}
        </div>

        {/* The years along the bottom: a trace that fills as you fly, each year a stop to jump to. */}
        <nav aria-label={label} className="absolute bottom-7" style={{ left: 'max(2.5rem, calc((100vw - 72rem) / 2 + 2.5rem))', right: 'max(2.5rem, calc((100vw - 72rem) / 2 + 2.5rem))' }}>
          <div className="relative h-px bg-white/10">
            <motion.div style={{ scaleX: fill }} className="h-full origin-left bg-gradient-to-r from-ember-deep via-ember to-ember-soft shadow-glow" />
          </div>
          <ol className="relative mt-3 flex justify-between">
            {chapters.map((c, i) => {
              const on = i === pos.i;
              return (
                <li key={c.id} className="relative">
                  <span
                    className={`absolute -top-[17px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rotate-45 border transition-colors ${
                      i <= pos.i ? 'border-ember bg-ember' : 'border-white/30 bg-obsidian'
                    } ${on ? 'shadow-[0_0_10px_3px_rgba(255,122,26,0.7)]' : ''}`}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => jump(i)}
                    aria-current={on ? 'step' : undefined}
                    className={`hud -translate-x-1/2 whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember ${
                      on ? 'text-ember-soft' : 'text-ash-dim hover:text-bone'
                    }`}
                    style={{ marginLeft: '50%' }}
                  >
                    {c.when}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

// One picture or clip in the space. Its distance from the camera sets how far back it sits and
// how bright it is; once the camera passes it, it swells and fades out. Clips play muted.
function Piece({ media, chapter, cam, at, offset, tilt, year, onClick }: {
  media: Media;
  chapter: number;
  cam: MotionValue<number>;
  at: [number, number, number];
  offset: [number, number];
  tilt: number;
  year?: string;
  onClick: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [x, y, w] = at;
  const transform = useTransform(cam, (c) => {
    const d = chapter - c;
    // Undo the perspective shrink so the on-screen spacing is what we chose.
    const k = d > 0 ? Math.sqrt(d / 8) * ((PERSPECTIVE + d * DEPTH) / PERSPECTIVE) : 0;
    const [dx, dy] = d > 0 ? [STREAM[0] * k, STREAM[1] * k] : [PASS[0] * -d, PASS[1] * -d];
    return `translate3d(calc(-50% + ${dx.toFixed(2)}vw), calc(-50% + ${dy.toFixed(2)}vh), ${(-d * DEPTH).toFixed(1)}px) rotate(${tilt}deg)`;
  });
  const opacity = useTransform(cam, (c) => {
    const d = chapter - c;
    return d < 0 ? Math.max(0, 1 + d * 2.2) : Math.max(0.28, 1 - d * 0.11);
  });
  const lit = useTransform(cam, (c) => Math.max(0, 1 - Math.abs(chapter - c) * 1.6));
  const glow = useTransform(lit, (l) => `0 0 0 1px rgba(255,122,26,${(l * 0.9).toFixed(2)}), 0 30px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255,122,26,${(l * 0.35).toFixed(2)})`);
  const shade = useTransform(lit, (l) => 0.6 * (1 - l));
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? 'hidden' : 'visible'));

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="absolute" style={{ left: `${x + offset[0]}vw`, top: `${y + offset[1]}vh`, width: `${w}vw`, transformStyle: 'preserve-3d' }}>
      <motion.button
        onClick={onClick}
        tabIndex={-1}
        style={{ transform, opacity, visibility, boxShadow: glow }}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black"
      >
        {media.video ? (
          <video ref={video} src={media.src} muted loop playsInline preload="metadata" aria-label={media.alt} className="h-full w-full object-cover" />
        ) : (
          <img src={media.src} alt={media.alt} loading="lazy" className="h-full w-full object-cover" />
        )}
        <motion.span style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-obsidian" aria-hidden="true" />
        {year && <span className="hud pointer-events-none absolute left-3 top-3 rounded-md bg-black/60 px-1.5 py-0.5 text-bone">{year}</span>}
      </motion.button>
    </div>
  );
}
