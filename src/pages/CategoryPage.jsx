import { useEffect, useState, useMemo } from 'react';
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

/* ── Brand colour pills ─────────────────────────────────── */
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

/* ── Intelligent Subcategory Classifier ── */
function classifyProduct(slug, name = '', brand = '') {
  const n = name.toLowerCase();
  
  if (slug === 'toilets') {
    if (n.includes('two piece') || n.includes('2-piece') || n.includes('2 piece')) {
      return 'Two Piece Toilets';
    }
    if (n.includes('wall hung')) {
      return 'Wall Hung Toilets';
    }

    return 'One Piece Toilet'; // Default commode subcategory
  }
  
  if (slug === 'basins') {
    if (n.includes('pedestal')) return 'Basins Pedestal';
    if (n.includes('one piece') || n.includes('1-piece')) return 'One Piece Basins';
    if (n.includes('vanity') || n.includes('bowl') || n.includes('counter top')) return 'Vanity Bowl';
    if (n.includes('wall hung')) return 'Wall Hung Basin';
    if (n.includes('upper counter') || n.includes('uper counter')) return 'Upper Counter Basins';
    if (n.includes('under counter')) return 'Under Counter Basins';
    return 'Basins Pedestal';
  }
  
  if (slug === 'taps') {
    if (n.includes('single lever')) return 'Complete Single Lever Bath Set';
    if (n.includes('quarter round')) return 'Complete Quarter Round Bath Set';
    if (n.includes('full round')) return 'Complete Full Round Bath Set';
    if (n.includes('shower set') || n.includes('shower')) return 'Luxury Bathroom Shower Sets';
    if (n.includes('vanity mixer') || n.includes('art bowl')) return 'Vanity Mixers - Art Bowl Taps';
    if (n.includes('concealed')) return 'Concealed Shower Set';
    if (n.includes('basin mixer')) return 'Basin Mixers';
    if (n.includes('sink mixer')) return 'Sink Mixer';
    if (n.includes('pull out')) return 'Pull Out Kitchen Taps';
    if (n.includes('sensor')) return 'Sensor Taps';
    return 'Basin Mixers';
  }
  
  if (slug === 'muslim-showers') {
    if (n.includes('hand shower')) return 'Hand Shower';
    if (n.includes('muslim')) return 'Muslim Shower';
    if (n.includes('shower head') || n.includes('rain')) return 'Shower Heads';
    if (n.includes('panel')) return 'Shower Panels';
    return 'Hand Shower';
  }
  
  if (slug === 'accessories') {
    if (n.includes('bottle trap') || n.includes('p-trap')) return 'Bottle Traps';
    if (n.includes('waste')) return 'Basin Waste';
    if (n.includes('double bibcock') || n.includes('bibcock')) return 'Double Bibcock';
    if (n.includes('tee-cock')) return 'Tee-cock';
    if (n.includes('hose')) return 'Shower Hose';
    return 'Bottle Traps';
  }
  
  if (slug === 'vanities') {
    if (n.includes('bracket')) return 'Aluminum Bracket Basin';
    if (n.includes('pvc')) return 'PVC Bathroom Vanities';
    if (n.includes('aluminum')) return 'Aluminum Bathroom Vanities';
    if (n.includes('counter')) return 'Counter Vanities';
    if (n.includes('vanity bowl')) return 'Vanity Bowls';
    return 'Counter Vanities';
  }
  
  if (slug === 'mirrors') {
    if (n.includes('led') || n.includes('backlit') || n.includes('smart') || n.includes('touch')) return 'LED Mirrors';
    if (n.includes('standard') || n.includes('frameless')) return 'Standard Mirrors';
    if (n.includes('makeup')) return 'Makeup Mirror';
    return 'LED Mirrors';
  }
  
  if (slug === 'kitchen-ware') {
    if (n.includes('single bowl')) return 'Single Bowl Handmade Sink';
    if (n.includes('double bowl')) return 'Double Bowl Handmade Sink';
    if (n.includes('hood')) return 'Kitchen Hood';
    if (n.includes('hob')) return 'Kitchen Hob';
    return 'Kitchen Accessories';
  }
  
  if (slug === 'bath-tubs') {
    if (n.includes('corner') || n.includes('whirlpool')) return 'Corner Bath Tubs';
    return 'Standard/Regular Baths';
  }
  
  if (slug === 'pipes-fittings') {
    const isUPVC = n.includes('upvc');
    const isPipe = n.includes('pipe');
    if (isPipe) {
      return isUPVC ? 'UPVC PIPES' : 'PPRC PIPES';
    }
    return isUPVC ? 'UPVC FITTINGS' : 'PPRC FITTINGS';
  }
  

  if (slug === 'flush-tanks') {
    if (n.includes('concealed')) return 'Concealed Cistern';
    if (n.includes('wall hung')) return 'Wall Hung Cistern';
    return 'Standard Flush Tank';
  }
  
  return '';
}

export default function CategoryPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const { categories, CONTACT } = useCatalog();
  const { addToInquiry } = useInquiry();
  const category    = categories.find(c => c.slug === slug);

  const [activeBrand, setActiveBrand] = useState('all');
  const [activeSubCat, setActiveSubCat] = useState('all');

  useScrollReveal([slug, activeBrand, activeSubCat]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveBrand('all');
    setActiveSubCat('all');
  }, [slug]);

  /* Unique brands in this category — hooks MUST be called before any early return */
  const brandList = useMemo(() => {
    if (!category) return [];
    const set = new Set(
      category.products.map(p => p.brand).filter(Boolean)
    );
    return Array.from(set);
  }, [category]);

  const hasBrands  = brandList.length > 1;
  const hasSubCats = (category?.subCategories || []).length > 0;

  /* Filtered products */
  const filtered = useMemo(() => {
    if (!category) return [];
    let prods = category.products;
    if (activeBrand !== 'all' && activeBrand !== '') {
      prods = prods.filter(p => p.brand === activeBrand);
    }
    if (activeSubCat !== 'all' && activeSubCat !== '') {
      prods = prods.filter(p => {
        const itemSubCat = classifyProduct(slug, p.name, p.brand);
        return itemSubCat === activeSubCat;
      });
    }
    return prods;
  }, [category, slug, activeBrand, activeSubCat]);

  /* 3D tilt on cards */
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
  }, [slug, activeBrand, activeSubCat]);

  /* Early return AFTER all hooks */
  if (!category) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>Category not found</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const handleEnquire = (prod) => {
    const prodImg = prod.image || getProductImage(slug, prod.name, prod.brand) || PROD_IMAGES[slug] || '/prod-commode.png';
    addToInquiry({
      id: prod.id || `${prod.name}-${prod.brand}`,
      name: prod.name,
      brand: prod.brand,
      image: prodImg
    });
  };

  const nameParts = category.name.split(' ');
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
            <span>Categories</span>
            <span>›</span>
            <span className="text-[var(--ivory)]">{category.name}</span>
          </div>

          {/* Product count badge */}
          <div className="cat-page-meta" style={{ marginTop: 0 }}>
            <span className="cat-count-badge">{category.products.length} Products</span>
            {hasBrands && (
              <span className="cat-count-badge">{brandList.length} Brands</span>
            )}
          </div>
        </div>

        <h1 className="cat-page-title">
          {firstWord}{restWords && <> <em>{restWords}</em></>}
        </h1>
        <p className="cat-page-subs">{category.subs}</p>

        {/* ── BRAND FILTER TABS ── */}
        {hasBrands && (
          <div className="cat-brand-filter mt-6">
            <div className="cbf-label text-center mb-4">Filter by Brand</div>
            <div className="cbf-tabs justify-center">
              <button
                className={`cbf-btn${activeBrand === 'all' ? ' active' : ''}`}
                onClick={() => setActiveBrand('all')}
              >
                All Products
                <span className="cbf-count">{category.products.length}</span>
              </button>
              {brandList.map(brand => (
                <button
                  key={brand}
                  className={`cbf-btn${activeBrand === brand ? ' active' : ''}`}
                  onClick={() => setActiveBrand(brand)}
                  style={activeBrand === brand ? {
                    borderColor: BRAND_COLORS[brand] || 'var(--bronze)',
                    color:       BRAND_COLORS[brand] || 'var(--bronze)',
                    background:  (BRAND_COLORS[brand] || 'rgba(200,160,96') + '15',
                  } : {}}
                >
                  {brand}
                  <span className="cbf-count">
                    {category.products.filter(p => p.brand === brand).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══ BODY ══ */}
      <div className="cat-page-body">
        <button className="cat-back-btn" onClick={() => navigate(-1)}>← Back</button>

        {/* ── SUB-CATEGORIES PILLS ── */}
        {hasSubCats && (
          <div className="cat-subcat-row">
            <button
              className={`subcat-pill${activeSubCat === 'all' ? ' active' : ''}`}
              onClick={() => setActiveSubCat('all')}
            >All</button>
            {(category.subCategories || []).map(sc => (
              <button
                key={sc}
                className={`subcat-pill${activeSubCat === sc ? ' active' : ''}`}
                onClick={() => setActiveSubCat(activeSubCat === sc ? 'all' : sc)}
              >
                {sc}
              </button>
            ))}
          </div>
        )}

        {/* ── PRODUCT GRID ── */}
        <div className="sr mb-10">
          <span className="sec-label">
            {activeBrand === 'all' ? 'All Products' : activeBrand}
          </span>
          <h2 className="sec-title">
            {filtered.length} <em>Products</em>
          </h2>
        </div>

        <div className="cat-prod-grid stg">
          {filtered.map((prod, i) => (
            <div key={i} className="cat-prod-card">
              <div className="cat-prod-img">
                <div className="cat-prod-img-inner">
                  <img
                    src={prod.image || getProductImage(slug, prod.name, prod.brand) || PROD_IMAGES[slug] || '/prod-commode.png'}
                    alt={prod.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PROD_IMAGES[slug] || '/prod-commode.png';
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
                    onClick={() => handleEnquire(prod)}
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

        {/* ── CONTACT CTA ── */}
        <div className="cat-contact-cta sr">
          <h3 className="cat-cta-title">Need a <em>Custom Quote?</em></h3>
          <p className="cat-cta-desc">
            Contact us directly for bulk pricing, contractor rates, or any specific requirements.
            Serving Lahore &amp; Multan since 1997.
          </p>
          <div className="cat-cta-actions">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              WhatsApp Us
            </a>
            <a href={`tel:${CONTACT.phone}`} className="btn-ghost">
              Call {CONTACT.phoneFormatted}
            </a>
          </div>
        </div>

        {/* ── BROWSE MORE ── */}
        <div className="mt-[5.5rem]">
          <div className="sr mb-8">
            <span className="sec-label">Browse More</span>
            <h2 className="sec-title">Other <em>Categories</em></h2>
          </div>
          <div className="all-cats-grid stg">
            {categories
              .filter(cat => cat.slug !== slug)
              .slice(0, 6)
              .map(cat => (
                <div
                  key={cat.slug}
                  className="ac-item"
                  onClick={() => navigate(`/category/${cat.slug}`)}
                >
                  <div className="ac-icon">
                    {typeof cat.icon === 'string' && (cat.icon.startsWith('data:image') || cat.icon.startsWith('/') || cat.icon.startsWith('http'))
                      ? <img src={cat.icon} alt={cat.name} className="w-[1em] h-[1em] object-contain invert" />
                      : cat.icon}
                  </div>
                  <div className="ac-name">{cat.name}</div>
                  <div className="ac-subs">{cat.subs}</div>
                  <div className="ac-cta">Explore →</div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}
