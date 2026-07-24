import { useNavigate, useLocation } from 'react-router-dom';
import { CONTACT } from '../data/categories';
import { ALL_CATEGORIES } from '../data/categories';

export default function Footer() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  const scrollTo = (id) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goCategory = (slug) => navigate(`/category/${slug}`);

  const ceramicCats = ['commodes-toilets', 'basins', 'flush-tanks'];
  const fittingCats = ['faucets-taps', 'muslim-showers', 'pprc-pipes', 'upvc-pipes'];
  const moreCats    = ['vanities', 'kitchen-sinks', 'water-geysers', 'accessories'];

  const catName = (slug) =>
    ALL_CATEGORIES.find(c => c.slug === slug)?.name || slug;

  return (
    <footer>
      <div className="ft-grid">
        {/* About */}
        <div className="ft-about">
          <div className="logo-wrap no-underline pointer-events-none">
            <img src="/website-new-logo.png" alt="Nauman Sanitary Store Logo" className="logo-img" />
            <div>
              <div className="logo-text text-[17px]">Nauman Sanitary Store</div>
            </div>
          </div>
          <p className="ft-tagline">
            Lahore's trusted destination for premium sanitary ware, ceramics, pipes and fittings.
            Quality products, expert advice, competitive prices — since 2005.
          </p>
          <div className="ft-social">
            <a className="soc-btn" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a className="soc-btn" href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">W</a>
            <a className="soc-btn" href={`mailto:${CONTACT.email}`} aria-label="Email">@</a>
          </div>
        </div>

        {/* Ceramics */}
        <div className="ft-col">
          <h4>Ceramics</h4>
          <div className="ft-links">
            {ceramicCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{catName(slug)}</a>
            ))}
            <a onClick={() => goCategory('bath-sets')}>Bath Sets</a>
            <a onClick={() => scrollTo('brand-showcase')}>Nesco · Pool · Porta</a>
          </div>
        </div>

        {/* Fittings */}
        <div className="ft-col">
          <h4>Fittings &amp; Plumbing</h4>
          <div className="ft-links">
            {fittingCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{catName(slug)}</a>
            ))}
          </div>
        </div>

        {/* More */}
        <div className="ft-col">
          <h4>More</h4>
          <div className="ft-links">
            {moreCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{catName(slug)}</a>
            ))}
            <a onClick={() => scrollTo('legacy')}>About Us</a>
            <a onClick={() => scrollTo('contact')}>Contact</a>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-copy">
          © {new Date().getFullYear()} Nauman Sanitary Store · All rights reserved · Lahore, Pakistan
        </div>
        <div className="ft-credit">Elegance in Every Detail ◆</div>
      </div>
    </footer>
  );
}
