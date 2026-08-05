import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

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
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalCount, setIsOpen } = useInquiry();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const scrollTo = (id) => {
    setOpen(false);
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

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Categories', id: 'categories' },
    { label: 'Brands', id: 'brand-showcase' },
    { label: 'Products', id: 'products' },
    { label: 'About', id: 'legacy' },
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
            <li key={l.id}>
              <a onClick={() => scrollTo(l.id)} tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && scrollTo(l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsOpen(true)}
            className="inquiry-btn"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(200,160,96,0.4)',
              background: 'rgba(200,160,96,0.1)',
              color: '#c8a060',
              fontWeight: 600,
              fontSize: '0.825rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="View WhatsApp Inquiry Cart"
          >
            <ShoppingBag style={{ width: '1rem', height: '1rem' }} />
            <span>Inquiry</span>
            {totalCount > 0 && (
              <span
                style={{
                  background: '#c8a060',
                  color: '#000',
                  borderRadius: '9999px',
                  padding: '0.1rem 0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                {totalCount}
              </span>
            )}
          </button>
          <ThemeToggle />
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          id="ham"
          aria-label="Menu"
          onClick={() => setOpen(p => !p)}
        >
          <span style={{ transform: open ? 'rotate(45deg) translate(4px,4px)' : '' }} />
          <span style={{ opacity: open ? '0' : '1' }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(4px,-4px)' : '' }} />
        </button>
      </nav>

      {/* Mobile Nav */}
      <div id="mobile-nav" className={open ? 'open' : ''}>
        {navLinks.map(l => (
          <a key={l.id} className="mob-link" onClick={() => scrollTo(l.id)}
            tabIndex={0} onKeyDown={e => e.key === 'Enter' && scrollTo(l.id)}>
            {l.label}
          </a>
        ))}
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
