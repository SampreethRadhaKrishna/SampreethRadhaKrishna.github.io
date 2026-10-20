import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'h2' | 'h3';
};

// One reveal treatment for the whole page: a short rise as the block enters, once.
// The hero uses the same treatment with a longer duration; nothing else should roll its own.
export default function Reveal({ children, className, delay = 0, duration = 0.8, y = 28, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const M = motion[as] as typeof motion.div;
  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
