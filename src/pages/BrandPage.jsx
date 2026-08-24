import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { getProductImage } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useInquiry } from '../context/InquiryContext';

import { normalizeBrand } from '../utils/brandUtils';

/* ── Image map ──────────────────────────────────────────── */
const PROD_IMAGES = {
  'toilets':        '/prod-commode.png',
  'basins':         '/prod-basin.png',
  'taps':           '/prod-taps.png',
  'muslim-showers': '/prod-shower.png',
  'accessories':    '/prod-faucet.png',
  'vanities':       '/prod-vanity.png',
  'mirrors':        '/prod-mirror.png',
  'kitchen-ware':   '/prod-kitchensink.png',
  'bath-tubs':      '/prod-bathtub.png',
  'pipes-fittings': '/prod-pprc.png',
  'flush-tanks':    '/prod-commode.png',
};

const BRAND_COLORS = {
  'Pool Sanitary Ware':    '#1a6fa8',
  'Nesco Ceramics':        '#8b5e3c',
  'Porta':                 '#1D3557',
  'Master Sanitary Ware':  '#7a3c8b',
  'Dell Sanitary Ware':    '#3c6b8b',
  'Brite Sanitary Ware':   '#8b6e3c',
  'Minhas Pipes and Fittings': '#4a7a3c',
  'Turk Plast':            '#3c5a8b',
  'Dura Flow':             '#8b3c7a',
  'Master Pipes And Fittings': '#7a5a3c',
};

const TAG_COLOR = (tag) =>
  Object.entries(BRAND_COLORS).find(([k]) =>
    k.toLowerCase().startsWith(tag?.toLowerCase())
  )?.[1] ?? 'var(--bronze-dk)';

export default function BrandPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const { categories, brands, CONTACT } = useCatalog();
  const { addToInquiry } = useInquiry();

  const decodedBrandName = decodeURIComponent(brandName);
  const normalizedBrandName = normalizeBrand(decodedBrandName);

  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  useScrollReveal([normalizedBrandName, activeCategory, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveCategory(location.state?.category || 'all');
    setCurrentPage(1);
  }, [normalizedBrandName, location.state?.category]);

  const brandData = (brands || []).find(b => normalizeBrand(b.name) === normalizedBrandName) || { name: normalizedBrandName };

  // Group products by category
  const brandCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    
    const groups = [];
    categories.forEach(cat => {
      const catProducts = (cat.products || []).filter(
        p => normalizeBrand(p.brand) === normalizedBrandName
      );
      
      if (catProducts.length > 0) {
        groups.push({
          ...cat,
          brandProducts: catProducts
        });
      }
    });
    return groups;
  }, [categories, normalizedBrandName]);

  const allBrandProducts = useMemo(() => {
    return brandCategories.flatMap(c => 
      c.brandProducts.map(p => ({ ...p, _catSlug: c.slug, _catName: c.name }))
    );
  }, [brandCategories]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return allBrandProducts;
    return allBrandProducts.filter(p => p._catSlug === activeCategory);
  }, [allBrandProducts, activeCategory]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Handle 3D tilt on cards
  useEffect(() => {
    const cards = document.querySelectorAll('.cat-prod-card');
    let frameId;
    const onMove = (e) => {
      if (frameId) cancelAnimationFrame(frameId);
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
      const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
      
      frameId = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)`;
      });
    };
    const onLeave = (e) => {
      if (frameId) cancelAnimationFrame(frameId);
      const el = e.currentTarget;
      requestAnimationFrame(() => {
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
        el.style.transition = 'transform .5s ease';
        setTimeout(() => {
          if (el) el.style.transition = '';
        }, 500);
      });
    };
    cards.forEach(c => {
      c.addEventListener('mousemove', onMove, { passive: true });
      c.addEventListener('mouseleave', onLeave, { passive: true });
    });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      cards.forEach(c => {
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [brandCategories, activeCategory, currentPage]);

  if (!categories || categories.length === 0) {
    return <div className="p-8">Loading...</div>;
  }

  if (brandCategories.length === 0) {
    return (
      <div className="not-found">
        <h1>{normalizedBrandName}</h1>
        <p>No products found for this brand yet.</p>
        <button className="btn-primary mt-4" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const handleEnquire = (prod, slug) => {
    const prodImg = prod.image || getProductImage(slug, prod.name, prod.brand) || PROD_IMAGES[slug] || '/prod-commode.png';
    addToInquiry({
      id: prod.id || `${prod.name}-${prod.brand}`,
      name: prod.name,
      brand: prod.brand,
      image: prodImg
    });
  };

  const nameParts = normalizedBrandName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div className="cat-page">

      {/* ══ HERO BANNER ══ */}
      <div className="cat-page-hero">
        <div className="flex justify-between items-center w-full mb-[clamp(1.5rem,3.5vw,2.5rem)] flex-wrap gap-4">
          <div className="cat-page-breadcrumb" style={{ marginBottom: 0 }}>
            <a onClick={() => navigate('/')} role="button" tabIndex={0}>Home</a>
            <span>›</span>
            <a 
              onClick={() => navigate('/', { state: { scrollTo: 'brand-showcase' } })} 
              role="button" 
              tabIndex={0}
            >
              Brands
            </a>
            <span>›</span>
            <a 
              onClick={() => { setActiveCategory('all'); setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              role="button" 
              tabIndex={0}
              style={{ color: 'var(--ivory)' }}
            >
              {normalizedBrandName}
            </a>
          </div>
        </div>

        <h1 className="cat-page-title">
          {firstWord}{restWords && <> <em>{restWords}</em></>}
        </h1>
        <p className="cat-page-subs">Explore the complete range of {normalizedBrandName} products, organized perfectly by category.</p>
      </div>

      {/* ══ BODY ══ */}
      <div className="cat-page-body">
        <button className="cat-back-btn" onClick={() => navigate(-1)}>← Back</button>

        {brandCategories.length > 1 && (
          <div className="cat-subcat-row" style={{ marginBottom: '2rem' }}>
            <button
              className={`subcat-pill${activeCategory === 'all' ? ' active' : ''}`}
              onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
            >All Categories</button>
            {brandCategories.map(c => (
              <button
                key={c.slug}
                className={`subcat-pill${activeCategory === c.slug ? ' active' : ''}`}
                onClick={() => { setActiveCategory(c.slug); setCurrentPage(1); }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div className="sr mb-8">
          <span className="sec-label">
            {activeCategory === 'all' ? 'All Products' : brandCategories.find(c => c.slug === activeCategory)?.name}
          </span>
          <h2 className="sec-title">
            {filteredProducts.length} <em>Products</em>
          </h2>
        </div>

        <div className="cat-prod-grid stg">
          {paginatedProducts.map((prod, i) => (
            <div key={i} className="cat-prod-card">
              <div className="cat-prod-img">
                <div className="cat-prod-img-inner">
                  <img
                    src={prod.image || getProductImage(prod._catSlug, prod.name, prod.brand) || PROD_IMAGES[prod._catSlug] || '/prod-commode.png'}
                    alt={prod.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = PROD_IMAGES[prod._catSlug] || '/prod-commode.png'; }}
                  />
                </div>
                <div className="cat-prod-overlay" />
                {prod.tag && (
                  <div className="cat-prod-tag" style={{ background: TAG_COLOR(prod.tag) }}>{prod.tag}</div>
                )}
                <div className="cat-prod-brand-tag" style={{ background: BRAND_COLORS[normalizedBrandName] || '#1e222b', color: '#fff' }}>
                  {normalizeBrand(prod.brand)}
                </div>
              </div>
              <div className="cat-prod-info">
                <div className="cat-prod-brand">{normalizeBrand(prod.brand)}</div>
                <div className="cat-prod-name">{prod.name.replace(/\s*Model:.*$/i, '')}</div>
                {prod.description && <div className="cat-prod-desc">{prod.description}</div>}
                {prod.model && <div className="cat-prod-model">Model: {prod.model}</div>}
                <div className="cat-prod-footer">
                  <button
                    className="cat-prod-btn"
                    title="Add to Inquiry Cart"
                    onClick={() => handleEnquire(prod, prod._catSlug)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Add to Inquiry Cart
                  </button>
                  <a
                    href={CONTACT?.whatsappUrl || '#'}
                    target="_blank" 
                    rel="noreferrer"
                    className="cat-prod-whatsapp-btn"
                    title="Call or WhatsApp for Price"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Call / WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn" 
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx + 1} 
                className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                onClick={() => { setCurrentPage(idx + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              className="page-btn" 
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
            >
              Next
            </button>
          </div>
        )}

        {/* ── CONTACT CTA ── */}
        <div className="cat-contact-cta sr mt-8">
          <h3 className="cat-cta-title">Need a <em>Custom Quote?</em></h3>
          <p className="cat-cta-desc">
            Contact us directly for bulk pricing, contractor rates, or any specific requirements for {decodedBrandName} products.
          </p>
          <div className="cat-cta-actions">
            <a href={CONTACT?.whatsappUrl || '#'} target="_blank" rel="noreferrer" className="btn-primary">
              WhatsApp Us
            </a>
            <a href={`tel:${CONTACT?.phone || '#'}`} className="btn-ghost">
              Call Us
            </a>
          </div>
        </div>

        {/* ── BROWSE MORE BRANDS ── */}
        {brands && brands.length > 1 && (
          <div className="mt-[5.5rem]">
            <div className="sr mb-8">
              <span className="sec-label">Browse More</span>
              <h2 className="sec-title">Other <em>Brands</em></h2>
            </div>
            <div className="all-cats-grid stg">
              {brands
                .filter(b => b.name.toLowerCase() !== decodedBrandName.toLowerCase())
                .slice(0, 6)
                .map(b => (
                  <div
                    key={b.id || b.name}
                    className="ac-item"
                    onClick={() => navigate(`/brand/${encodeURIComponent(b.name)}`)}
                  >
                    <div className="ac-icon">
                      <span className="text-3xl">🏛️</span>
                    </div>
                    <div className="ac-name">{b.name}</div>
                    <div className="ac-subs">Premium Sanitaryware</div>
                    <div className="ac-cta">Explore →</div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
