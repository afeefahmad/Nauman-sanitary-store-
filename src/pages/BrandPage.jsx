import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { getProductImage } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useInquiry } from '../context/InquiryContext';

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
  'Porta':                 '#5b7a3c',
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

  // Decode URI component just in case
  const decodedBrandName = decodeURIComponent(brandName);

  useScrollReveal([decodedBrandName, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [decodedBrandName]);

  // Find the exact brand object if it exists to get its icon/logo if we want to
  const brandData = (brands || []).find(b => b.name.toLowerCase() === decodedBrandName.toLowerCase()) || { name: decodedBrandName };

  // Group products by category
  const brandCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    
    const groups = [];
    categories.forEach(cat => {
      // Find all products in this category that belong to the brand
      const catProducts = (cat.products || []).filter(
        p => p.brand && p.brand.toLowerCase() === decodedBrandName.toLowerCase()
      );
      
      if (catProducts.length > 0) {
        groups.push({
          ...cat,
          brandProducts: catProducts
        });
      }
    });
    return groups;
  }, [categories, decodedBrandName]);

  // Calculate total products for this brand
  const totalProducts = brandCategories.reduce((sum, cat) => sum + cat.brandProducts.length, 0);

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
  }, [brandCategories]);

  // If no products found for this brand yet
  if (!categories || categories.length === 0) {
    return <div className="p-8">Loading...</div>; // loading
  }

  if (brandCategories.length === 0) {
    return (
      <div className="not-found">
        <h1>{decodedBrandName}</h1>
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

  const nameParts = decodedBrandName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div className="cat-page">

      {/* ══ HERO BANNER ══ */}
      <div className="cat-page-hero">
        <div className="flex justify-between items-center w-full mb-[2.2rem] flex-wrap gap-4">
          <div className="cat-page-breadcrumb" style={{ marginBottom: 0 }}>
            <a onClick={() => navigate('/')} role="button" tabIndex={0}>Home</a>
            <span>›</span>
            <span>Brands</span>
            <span>›</span>
            <span className="text-[var(--ivory)]">{decodedBrandName}</span>
          </div>

          {/* Product count badge */}
          <div className="cat-page-meta" style={{ marginTop: 0 }}>
            <span className="cat-count-badge">{totalProducts} Products</span>
            <span className="cat-count-badge">{brandCategories.length} Categories</span>
          </div>
        </div>

        <h1 className="cat-page-title">
          {firstWord}{restWords && <> <em>{restWords}</em></>}
        </h1>
        <p className="cat-page-subs">Explore the complete range of {decodedBrandName} products, organized perfectly by category.</p>
      </div>

      {/* ══ BODY ══ */}
      <div className="cat-page-body">
        <button className="cat-back-btn" onClick={() => navigate(-1)}>← Back</button>

        {/* ── BROWSE BY CATEGORY SECTION ── */}
        {brandCategories.map((cat, idx) => (
          <div key={cat.slug} className={`mb-16 ${idx === 0 ? 'mt-8' : ''}`}>
            <div className="sr mb-8">
              <span className="sec-label">
                {cat.brandProducts.length} {cat.brandProducts.length === 1 ? 'Product' : 'Products'}
              </span>
              <h2 className="sec-title" style={{ fontSize: '2.5rem' }}>
                {cat.name.split(' ')[0]} <em>{cat.name.split(' ').slice(1).join(' ')}</em>
              </h2>
              <div className="rule" style={{ marginLeft: 0 }} />
            </div>

            <div className="cat-prod-grid stg">
              {cat.brandProducts.map((prod, i) => (
                <div key={i} className="cat-prod-card">
                  <div className="cat-prod-img">
                    <div className="cat-prod-img-inner">
                      <img
                        src={prod.image || getProductImage(cat.slug, prod.name, prod.brand) || PROD_IMAGES[cat.slug] || '/prod-commode.png'}
                        alt={prod.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PROD_IMAGES[cat.slug] || '/prod-commode.png';
                        }}
                      />
                    </div>
                    <div className="cat-prod-overlay" />
                    {prod.tag && (
                      <div
                        className="cat-prod-tag"
                        style={{ background: TAG_COLOR(prod.tag) }}
                      >
                        {prod.tag}
                      </div>
                    )}
                    {prod.brand && (
                      <div
                        className="cat-prod-brand-tag"
                        style={{ background: BRAND_COLORS[prod.brand] ? `${BRAND_COLORS[prod.brand]}cc` : 'rgba(200,160,96,0.85)' }}
                      >
                        {prod.brand}
                      </div>
                    )}
                  </div>
                  <div className="cat-prod-info">
                    <div className="cat-prod-name">{prod.name}</div>
                    {prod.model && (
                      <div className="cat-prod-model">Model: {prod.model}</div>
                    )}
                    <div className="cat-prod-footer">
                      <button
                        className="cat-prod-btn"
                        title="Add to Inquiry Cart"
                        onClick={() => handleEnquire(prod, cat.slug)}
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
          </div>
        ))}

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
