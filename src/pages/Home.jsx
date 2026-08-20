import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useInquiry } from '../context/InquiryContext';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToInquiry } = useInquiry();
  useScrollReveal([]);

  // Cross-page anchor scroll listener
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      window.history.replaceState({}, document.title);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  /* ── Shared helpers passed to sections ── */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goCategory = (slug) => navigate(`/category/${slug}`);

  const handleProdAdd = (prod) => {
    addToInquiry({
      id: prod.id || `${prod.name}-${prod.brand || ''}`,
      name: prod.name,
      brand: prod.brand || 'Nauman Sanitary',
      image: prod.image || prod.img || '/prod-commode.png'
    });
  };

  return (
    <>
      <HeroSection          onScrollTo={scrollTo} />
      <TickerSection />
      <BrandsStrip />
      <CategoriesSection    onScrollTo={scrollTo}  onGoCategory={goCategory} />
      <FeaturedProducts     onScrollTo={scrollTo}  onGoCategory={goCategory} onProdAdd={handleProdAdd} />
      <AllCategoriesSection onGoCategory={goCategory} />
      <StatsSection />
      <BrandShowcase />
      <LegacySection        onScrollTo={scrollTo} />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
