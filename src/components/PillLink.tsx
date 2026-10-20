import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  // sm: the mono readout pill used for link lists and the nav. md: the larger contact buttons.
  size?: 'sm' | 'md';
  className?: string;
};

const SIZES = {
  sm: 'hud px-4 py-2',
  md: 'px-5 py-2.5 font-mono text-[0.78rem]',
};

// The one glass pill link. Off-site links open in a new tab without handing over the referrer.
export default function PillLink({ href, children, size = 'sm', className = '' }: Props) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`liquid-glass inline-flex items-center gap-2 rounded-full text-bone transition-colors hover:bg-white/5 ${SIZES[size]} ${className}`}
    >
      {children}
    </a>
  );
}
