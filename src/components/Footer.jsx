import { useNavigate, useLocation } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';

export default function Footer() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === '/';
  const { categories, CONTACT } = useCatalog();

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

  const goCategory = (slug) => {
    navigate(`/category/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only display categories that are actively present in categories context (never show deleted ones)
  const activeSlugs = new Set((categories || []).map(c => c.slug));

  const ceramicCats = ['toilets', 'basins', 'flush-tanks', 'bath-sets'].filter(slug => activeSlugs.has(slug));
  const fittingCats = ['taps', 'muslim-showers', 'pipes-fittings'].filter(slug => activeSlugs.has(slug));
  const moreCats    = ['vanities', 'kitchen-ware', 'bath-tubs', 'accessories', 'mirrors'].filter(slug => activeSlugs.has(slug));

  // Any custom categories added dynamically via Admin that aren't in the predefined groups
  const knownSlugs = new Set(['toilets', 'basins', 'flush-tanks', 'bath-sets', 'taps', 'muslim-showers', 'pipes-fittings', 'vanities', 'kitchen-ware', 'bath-tubs', 'accessories', 'mirrors']);
  const customCats = (categories || []).filter(c => !knownSlugs.has(c.slug));

  const getCatName = (slug) => categories.find(c => c.slug === slug)?.name || '';

  const facebookUrl  = CONTACT?.facebook || 'https://facebook.com';
  const instagramUrl = CONTACT?.instagram || 'https://instagram.com';
  const tiktokUrl    = CONTACT?.tiktok || 'https://tiktok.com';
  const whatsappUrl  = CONTACT?.whatsappUrl || 'https://wa.me/923008118085';
  const emailAddress = CONTACT?.email || 'afeefzafar2@gmail.com';

  return (
    <footer>
      <div className="ft-grid">
        {/* About & Brand Info */}
        <div className="ft-about">
          <div className="logo-wrap no-underline pointer-events-none">
            <img src="/website-new-logo.png" alt="Nauman Sanitary Store Logo" className="logo-img" />
            <div>
              <div className="logo-text">Nauman Sanitary Store</div>
            </div>
          </div>
          <p className="ft-tagline">
            Lahore's trusted destination for premium sanitary ware, ceramics, pipes and fittings.
            Quality products, expert advice, competitive prices — since 2005.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.2rem', fontSize: '12px', color: 'var(--smoke)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span> <span>Lahore &amp; Multan, Punjab, Pakistan</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📞</span> <a href={`tel:${CONTACT?.phone || '03008118085'}`} style={{ color: 'var(--bronze)', textDecoration: 'none' }}>{CONTACT?.phoneFormatted || '+92 300 8118085'}</a>
            </span>
          </div>

          {/* Professional Social Media Options */}
          <div className="ft-social" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Facebook */}
            <a 
              className="soc-btn" 
              href={facebookUrl} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook"
              title="Follow us on Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              className="soc-btn" 
              href={instagramUrl} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* TikTok */}
            <a 
              className="soc-btn" 
              href={tiktokUrl} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="TikTok"
              title="Follow us on TikTok"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-1.05-.09A6.33 6.33 0 0 0 3 15.56a6.33 6.33 0 0 0 6.33 6.33c3.43 0 6.22-2.73 6.33-6.14V8.58a8.28 8.28 0 0 0 4.93 1.62V6.75a4.88 4.88 0 0 1-1-.06z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              className="soc-btn" 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
              </svg>
            </a>

            {/* Email */}
            <a 
              className="soc-btn" 
              href={`mailto:${emailAddress}`} 
              aria-label="Email"
              title="Send us an Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Ceramics */}
        <div className="ft-col">
          <h4>Ceramics</h4>
          <div className="ft-links">
            {ceramicCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{getCatName(slug)}</a>
            ))}
            <a onClick={() => scrollTo('brand-showcase')}>Nesco · Pool · Porta</a>
          </div>
        </div>

        {/* Fittings */}
        <div className="ft-col">
          <h4>Fittings &amp; Plumbing</h4>
          <div className="ft-links">
            {fittingCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{getCatName(slug)}</a>
            ))}
            <a onClick={() => scrollTo('all-cats')}>All Categories →</a>
          </div>
        </div>

        {/* More */}
        <div className="ft-col">
          <h4>More</h4>
          <div className="ft-links">
            {moreCats.map(slug => (
              <a key={slug} onClick={() => goCategory(slug)}>{getCatName(slug)}</a>
            ))}
            {customCats.map(c => (
              <a key={c.slug} onClick={() => goCategory(c.slug)}>{c.name}</a>
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
