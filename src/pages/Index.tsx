import Hero from '../components/Hero';
import StickyIdentity from '../components/StickyIdentity';
import HeroCanvas from '../components/HeroCanvas';
import Latest from '../components/Latest';
import Journey from '../components/Journey';
import Now from '../components/Now';
import Contact from '../components/Contact';

export default function Index() {
  return (
    <>
      {/* The particle scene is fixed behind the whole page. It never stops. */}
      <HeroCanvas />
      <StickyIdentity />
      <main className="relative z-10">
        <Hero />
        <Latest />
        <Journey />
        <Now />
        <Contact />
      </main>
    </>
  );
}
