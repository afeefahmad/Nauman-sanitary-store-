import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { normalizeBrand } from '../utils/brandUtils';

/* ── Stretchy Toggle ── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={`theme-toggle${isDark ? ' dark' : ' light'}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="tt-track">
        <span className="tt-thumb">
          <span className="tt-icon">{isDark ? '☀️' : '🌙'}</span>
        </span>
      </span>
    </button>
  );
}

import { useInquiry } from '../context/InquiryContext';
import { useCatalog } from '../context/CatalogContext';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalCount, setIsOpen } = useInquiry();
  const { categories, brands } = useCatalog();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [activeMobileTab, setActiveMobileTab] = useState(null);
  const [activeMobileBrand, setActiveMobileBrand] = useState(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { 
    setOpen(false); 
    setActiveMobileTab(null);
    setActiveMobileBrand(null);
  }, [location.pathname]);

  const scrollTo = (id) => {
    setOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Categories', id: 'categories' },
    { label: 'Brands', id: 'brand-showcase' },
    { label: 'Products', id: 'products' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav id="nav" className={solid ? 'solid' : ''}>
        {/* Logo */}
        <div className="logo-wrap" onClick={goHome} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && goHome()}>
          <img src="/website-new-logo.png" alt="Nauman Sanitary Store Logo" className="logo-img" />
          <div>
            <div className="logo-text">Nauman Sanitary Store</div>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.id} className={l.id === 'categories' || l.id === 'brand-showcase' ? 'nav-item-dropdown' : ''}>
              <a 
                onClick={() => scrollTo(l.id)} 
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && scrollTo(l.id)}
              >
                {l.label}
              </a>
              {l.id === 'categories' && categories && categories.length > 0 && (
                <div className="nav-dropdown">
                  {categories.map(cat => (
                    <a 
                      key={cat.slug} 
                      onClick={() => { setOpen(false); navigate(`/category/${cat.slug}`); window.scrollTo(0,0); }}
                      className="nav-dropdown-item"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              )}
              {l.id === 'brand-showcase' && brands && brands.length > 0 && (
                <div className="nav-dropdown">
                  {brands.map(brand => {
                    const normBrand = normalizeBrand(brand.name);
                    const brandCats = categories ? categories.filter(c => 
                      c.products && c.products.some(p => normalizeBrand(p.brand) === normBrand)
                    ) : [];

                    return (
                      <div 
                        key={brand.id || brand.name} 
                        className="nav-dropdown-item has-submenu"
                        style={{ padding: 0 }}
                      >
                        <a 
                          onClick={() => { setOpen(false); navigate(`/brand/${encodeURIComponent(brand.name)}`); window.scrollTo(0,0); }}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0.6rem 1rem' }}
                        >
                          {brand.name}
                          {brandCats.length > 0 && <span className="submenu-arrow">›</span>}
                        </a>

                        {brandCats.length > 0 && (
                          <div className="nav-submenu">
                            {brandCats.map(bc => (
                              <a
                                key={bc.slug}
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setOpen(false); 
                                  navigate(`/brand/${encodeURIComponent(brand.name)}`, { state: { category: bc.slug } }); 
                                  window.scrollTo(0,0); 
                                }}
                                className="nav-dropdown-item"
                              >
                                {bc.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsOpen(true)}
            className="inquiry-btn"
            title="View WhatsApp Inquiry Cart"
          >
            <ShoppingBag style={{ width: '1rem', height: '1rem' }} />
            <span className="inquiry-btn-text">Inquiry</span>
            {totalCount > 0 && (
              <span className="inquiry-badge">
                {totalCount}
              </span>
            )}
          </button>
          <span className="theme-toggle-wrap"><ThemeToggle /></span>

          {/* Hamburger */}
          <button
            className={`hamburger${open ? ' is-open' : ''}`}
            id="ham"
            aria-label="Menu"
            onClick={() => setOpen(p => !p)}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(4.5px,4.5px)' : '' }} />
            <span style={{ opacity: open ? '0' : '1', transform: open ? 'scaleX(0)' : '' }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(4.5px,-4.5px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div id="mobile-nav" className={open ? 'open' : ''}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '1.25rem', maxWidth: '480px', margin: '0 auto' }}>
          {/* Home */}
          <a 
            className="mob-link" 
            onClick={() => { setOpen(false); navigate('/'); window.scrollTo(0,0); }}
          >
            <span>Home</span>
          </a>

          {/* Categories Accordion */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
            <button 
              className="mob-link"
              onClick={() => setActiveMobileTab(activeMobileTab === 'categories' ? null : 'categories')}
            >
              <span>Categories</span>
              <span style={{ transform: activeMobileTab === 'categories' ? 'rotate(90deg)' : '', transition: 'transform 0.2s', display: 'inline-block' }}>›</span>
            </button>
            
            {activeMobileTab === 'categories' && (
              <div style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {categories.map(cat => (
                  <a
                    key={cat.slug}
                    onClick={() => { setOpen(false); navigate(`/category/${cat.slug}`); window.scrollTo(0,0); }}
                    className="mob-sub-link"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Brands Accordion (Nested Double Dropdown equivalent) */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
            <button 
              className="mob-link"
              onClick={() => setActiveMobileTab(activeMobileTab === 'brands' ? null : 'brands')}
            >
              <span>Brands</span>
              <span style={{ transform: activeMobileTab === 'brands' ? 'rotate(90deg)' : '', transition: 'transform 0.2s', display: 'inline-block' }}>›</span>
            </button>

            {activeMobileTab === 'brands' && (
              <div style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {brands.map(brand => {
                  const normBrand = normalizeBrand(brand.name);
                  const brandCats = categories ? categories.filter(c => 
                    c.products && c.products.some(p => normalizeBrand(p.brand) === normBrand)
                  ) : [];
                  const isBrandOpen = activeMobileBrand === brand.name;

                  return (
                    <div key={brand.id || brand.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <button
                        className="mob-sub-link"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: 'none', background: 'none', padding: '0.2rem 0', fontWeight: '500' }}
                        onClick={() => setActiveMobileBrand(isBrandOpen ? null : brand.name)}
                      >
                        <span>{brand.name}</span>
                        {brandCats.length > 0 && (
                          <span style={{ transform: isBrandOpen ? 'rotate(90deg)' : '', transition: 'transform 0.2s', display: 'inline-block' }}>›</span>
                        )}
                      </button>
                      
                      {isBrandOpen && brandCats.length > 0 && (
                        <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.2rem', borderLeft: '1px solid rgba(200, 160, 96, 0.2)' }}>
                          <a
                            onClick={() => { 
                              setOpen(false); 
                              navigate(`/brand/${encodeURIComponent(brand.name)}`); 
                              window.scrollTo(0,0); 
                            }}
                            className="mob-sub-link"
                            style={{ fontSize: '1.1rem', opacity: '0.6', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}
                          >
                            View All {brand.name}
                          </a>
                          {brandCats.map(bc => (
                            <a
                              key={bc.slug}
                              onClick={() => { 
                                setOpen(false); 
                                navigate(`/brand/${encodeURIComponent(brand.name)}`, { state: { category: bc.slug } }); 
                                window.scrollTo(0,0); 
                              }}
                              className="mob-sub-link"
                            >
                              {bc.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products */}
          <a 
            className="mob-link" 
            onClick={() => scrollTo('products')}
          >
            <span>Products</span>
          </a>

          {/* Contact */}
          <a 
            className="mob-link" 
            onClick={() => scrollTo('contact')}
          >
            <span>Contact</span>
          </a>

          <div style={{ marginTop: '1.5rem' }}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
