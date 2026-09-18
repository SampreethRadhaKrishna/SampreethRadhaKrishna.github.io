import { Github, Linkedin } from 'lucide-react';
import { contact } from '../content/site';

const LINKS = [
  { href: '#open-droids', label: 'Open Droids' },
  { href: '#journey', label: 'Journey' },
  { href: '#now', label: 'Now' },
  { href: '#contact', label: 'Contact' },
];

function Mark() {
  // Five nodes and their edges: the site's favicon, inline.
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <path d="M6 9L16 16L26 9M6 24L16 16L26 24" stroke="#FF7A1A" strokeWidth="1.2" fill="none" opacity=".6" />
      <circle cx="16" cy="16" r="4.5" fill="#FF7A1A" />
      <circle cx="6" cy="9" r="2" fill="#FFB073" />
      <circle cx="26" cy="9" r="2" fill="#FFB073" />
      <circle cx="6" cy="24" r="2" fill="#FFB073" />
      <circle cx="26" cy="24" r="2" fill="#FFB073" />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="relative z-20 px-4 pt-5 md:px-6 md:pt-6">
      <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 md:px-6 md:py-3">
        <div className="flex items-center gap-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Sampreeth Radha Krishna, home">
            <Mark />
            <span className="font-mono text-[0.8rem] tracking-[0.06em] text-bone">SRK</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hud text-ash transition-colors hover:text-bone">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={contact.github} className="rounded-full p-2 text-ash transition-colors hover:text-bone" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={contact.linkedin} className="rounded-full p-2 text-ash transition-colors hover:text-bone" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="liquid-glass hud ml-1 rounded-full px-4 py-2 text-bone transition-colors hover:bg-white/5"
          >
            Email
          </a>
        </div>
      </nav>
    </header>
  );
}
