import { useEffect } from 'react';

/* ─────────────────────────────────────────────
   HERO SECTION
   Includes: animated photo bg, water effects,
   ripple rings, parallax scroll, particles,
   falling drops, shimmer, grid overlay,
   hero text + CTA buttons + scroll indicator.

   Props:
     onScrollTo(id) — smooth-scroll to a section
───────────────────────────────────────────── */
export default function HeroSection({ onScrollTo }) {

  /* ── Particles + Water Drops ── */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Floating particles
    const cont = document.getElementById('particles');
    if (cont) {
      cont.innerHTML = '';
      const ptCount = prefersReduced ? 0 : isMobile ? 8 : 20;
      for (let i = 0; i < ptCount; i++) {
        const p = document.createElement('div');
        p.className = 'pt';
        const sz = (1 + Math.random() * 2.5) + 'px';
        p.style.cssText = `left:${Math.random() * 100}%;width:${sz};height:${sz};
          animation-duration:${10 + Math.random() * 16}s;
          animation-delay:${Math.random() * 20}s;`;
        cont.appendChild(p);
      }
    }

    // Falling water drops
    const drops = document.getElementById('hero-drops-cont');
    if (drops) {
      drops.innerHTML = '';
      const dropCount = prefersReduced ? 0 : isMobile ? 10 : 28;
      for (let i = 0; i < dropCount; i++) {
        const d = document.createElement('div');
        d.className = 'water-drop';
        const h = 25 + Math.random() * 100;
        d.style.cssText = `
          left:${Math.random() * 100}%;
          height:${h}px;
          animation-duration:${2.5 + Math.random() * 5}s;
          animation-delay:${Math.random() * 10}s;`;
        drops.appendChild(d);
      }
    }
  }, []);

  /* ── Parallax on scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        const grid = document.querySelector('.hero-grid');
        const hc = document.querySelector('.hero-content');
        const locs = document.querySelector('.hero-locations');
        if (grid) grid.style.transform = `translateY(${y * 0.22}px)`;
        if (hc) {
          hc.style.transform = `translateY(${y * 0.10}px)`;
          hc.style.opacity = Math.max(0, 1 - y / 620);
        }
        if (locs) locs.style.opacity = Math.max(0, 1 - y / 350);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero">

      {/* Background Video */}
      <video
        className="hero-video-bg"
        src="/hero-section-2sec-no-logo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-video-overlay" />

      {/* Water caustics light effect */}
      <div className="hero-caustics" />

      {/* Water ripple rings */}
      <div className="hero-water-rings">
        {[...Array(6)].map((_, i) => <div key={i} className="water-ring" />)}
      </div>

      {/* Falling water drop streaks */}
      <div className="hero-drops" id="hero-drops-cont" />

      {/* Shimmer sweep */}
      <div className="hero-shimmer" />

      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Floating particles */}
      <div id="particles" />

      {/* ── Hero Text ── */}
      <div className="hero-content">


        <h1 className="hero-h1">
          Elegance in<br />
          <em>Every Detail</em>
          <span>Premium Sanitary Wares</span>
        </h1>

        <p className="hero-sub">
          Ceramics · PPRC · UPVC · Pipes &amp; Fittings · Vanities · Faucets
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onScrollTo('categories')}>
            Explore Products
          </button>
          <button className="btn-ghost" onClick={() => onScrollTo('contact')}>
            Request a Quote
          </button>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero-scroll-indicator">
        <div className="scroll-bar" />
      </div>
    </section>
  );
}
