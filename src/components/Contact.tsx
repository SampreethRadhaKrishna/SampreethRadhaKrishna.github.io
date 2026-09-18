import { Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './Reveal';
import { contact } from '../content/site';

export default function Contact() {
  return (
    <section id="contact" className="px-5 pb-16 pt-12 md:px-10 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="liquid-glass rounded-3xl px-7 py-12 md:px-14 md:py-16">
          <p className="max-w-3xl font-display text-2xl leading-[1.25] text-bone md:text-4xl">{contact.line}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 font-mono text-[0.78rem] text-obsidian transition-colors hover:bg-white">
              <Mail size={15} /> {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.78rem] text-bone transition-colors hover:bg-white/5">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.78rem] text-bone transition-colors hover:bg-white/5">
              <Github size={15} /> GitHub
            </a>
            <a href={contact.githubOld} target="_blank" rel="noreferrer" className="hud inline-flex items-center px-3 py-2.5 text-ash transition-colors hover:text-bone">
              older projects
            </a>
          </div>
        </Reveal>
        <footer className="hud mt-10 flex flex-wrap items-center justify-between gap-3 text-ash-dim">
          <span>Sampreeth Radha Krishna · San Francisco</span>
          <span>30,000 particles, in transit behind every line of this page.</span>
        </footer>
      </div>
    </section>
  );
}
