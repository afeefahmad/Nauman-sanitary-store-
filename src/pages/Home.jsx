import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── Section Components ─── */
import HeroSection         from '../components/sections/HeroSection';
import TickerSection       from '../components/sections/TickerSection';
import BrandsStrip         from '../components/sections/BrandsStrip';
import CategoriesSection   from '../components/sections/CategoriesSection';
import StatsSection        from '../components/sections/StatsSection';
import BrandShowcase       from '../components/sections/BrandShowcase';
import AllCategoriesSection from '../components/sections/AllCategoriesSection';
import FeaturedProducts    from '../components/sections/FeaturedProducts';
import LegacySection       from '../components/sections/LegacySection';
import WhyUsSection        from '../components/sections/WhyUsSection';
import ContactSection      from '../components/sections/ContactSection';

/* ─────────────────────────────────────────────
   HOME PAGE
   This file is intentionally thin — it only
   wires up scroll/tilt effects and passes
   shared helpers down to each section.

   To edit a section's content or markup,
   open the matching file in:
     src/components/sections/
───────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  useScrollReveal([]);

  /* ── 3D card tilt on mouse move ── */
  useEffect(() => {
    const cards = document.querySelectorAll('.cat-card,.prod-card');
    const onMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) / r.width;
      const y = (e.clientY - r.top  - r.height / 2) / r.height;
      e.currentTarget.style.transform =
        `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(8px)`;
    };
    const onLeave = (e) => {
      e.currentTarget.style.transform =
        'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
      e.currentTarget.style.transition = 'transform .5s ease';
      setTimeout(() => { e.currentTarget.style.transition = ''; }, 500);
    };
    cards.forEach(c => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });
    return () => cards.forEach(c => {
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  /* ── Shared helpers passed to sections ── */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goCategory = (slug) => navigate(`/category/${slug}`);

  const handleProdAdd = (prod) => {
    scrollTo('contact');
    setTimeout(() => {
      const txt = document.querySelector('.cf-txt');
      if (txt && !txt.value) txt.value = 'Enquiring about: ' + prod.name;
    }, 900);
  };

  return (
    <>
      <HeroSection          onScrollTo={scrollTo} />
      <TickerSection />
      <BrandsStrip />
      <CategoriesSection    onScrollTo={scrollTo}  onGoCategory={goCategory} />
      <StatsSection />
      <BrandShowcase />
      <AllCategoriesSection onGoCategory={goCategory} />
      <FeaturedProducts     onScrollTo={scrollTo}  onGoCategory={goCategory} onProdAdd={handleProdAdd} />
      <LegacySection        onScrollTo={scrollTo} />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
