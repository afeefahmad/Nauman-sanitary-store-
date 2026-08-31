import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { getProductImage } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useInquiry } from '../context/InquiryContext';
import ProductCard from '../components/ProductCard';

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

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [];
  if (currentPage <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }
  return pages;
}

import { normalizeBrand } from '../utils/brandUtils';

export default function CategoryPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const { categories, CONTACT } = useCatalog();
  const { addToInquiry } = useInquiry();
  const category    = categories.find(c => c.slug === slug);

  const [activeBrand, setActiveBrand] = useState('all');
  const [activeSubCat, setActiveSubCat] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeBrand, activeSubCat]);

  useScrollReveal([slug, activeBrand, activeSubCat, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveBrand('all');
    setActiveSubCat('all');
    setCurrentPage(1);
  }, [slug]);

  /* Unique brands in this category — hooks MUST be called before any early return */
  const brandList = useMemo(() => {
    if (!category) return [];
    const set = new Set(
      category.products.map(p => normalizeBrand(p.brand)).filter(Boolean)
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
      prods = prods.filter(p => normalizeBrand(p.brand) === activeBrand);
    }
    if (activeSubCat !== 'all' && activeSubCat !== '') {
      prods = prods.filter(p => {
        const itemSubCat = classifyProduct(slug, p.name, p.brand);
        return itemSubCat === activeSubCat;
      });
    }
    return prods;
  }, [category, slug, activeBrand, activeSubCat]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
  }, [slug, activeBrand, activeSubCat, currentPage]);

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
        <div className="flex justify-between items-center w-full mb-[clamp(1.5rem,3.5vw,2.5rem)] flex-wrap gap-4">
          <div className="cat-page-breadcrumb" style={{ marginBottom: 0 }}>
            <a onClick={() => navigate('/')} role="button" tabIndex={0}>Home</a>
            <span>›</span>
            <a 
              onClick={() => navigate('/', { state: { scrollTo: 'all-cats' } })} 
              role="button" 
              tabIndex={0}
            >
              Categories
            </a>
            <span>›</span>
            <a 
              onClick={() => { setActiveBrand('all'); setActiveSubCat('all'); setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              role="button" 
              tabIndex={0}
              style={{ color: 'var(--ivory)' }}
            >
              {category.name}
            </a>
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

            {/* Mobile Dropdown Select (< 768px) */}
            <div className="cbf-mobile-select-wrap">
              <select
                className="cbf-mobile-select"
                value={activeBrand}
                onChange={(e) => {
                  setActiveBrand(e.target.value);
                  setActiveSubCat('all');
                  setCurrentPage(1);
                }}
                aria-label="Filter products by brand"
              >
                <option value="all">All Products ({category.products.length})</option>
                {brandList.map(brand => (
                  <option key={brand} value={brand}>
                    {brand} ({category.products.filter(p => normalizeBrand(p.brand) === brand).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Filter Pills (>= 768px) */}
            <div className="cbf-tabs justify-center">
              <button
                className={`cbf-btn${activeBrand === 'all' ? ' active' : ''}`}
                onClick={() => {
                  setActiveBrand('all');
                  setActiveSubCat('all');
                  setCurrentPage(1);
                }}
              >
                All Products
                <span className="cbf-count" style={{ pointerEvents: 'none' }}>{category.products.length}</span>
              </button>
              {brandList.map(brand => (
                <button
                  key={brand}
                  className={`cbf-btn${activeBrand === brand ? ' active' : ''}`}
                  onClick={() => {
                    setActiveBrand(brand);
                    setActiveSubCat('all');
                    setCurrentPage(1);
                  }}
                  style={activeBrand === brand ? {
                    borderColor: BRAND_COLORS[brand] || 'var(--bronze)',
                    color:       BRAND_COLORS[brand] || 'var(--bronze)',
                    background:  (BRAND_COLORS[brand] || 'rgba(200,160,96') + '15',
                  } : {}}
                >
                  {brand}
                  <span className="cbf-count" style={{ pointerEvents: 'none' }}>
                    {category.products.filter(p => normalizeBrand(p.brand) === brand).length}
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
          {paginatedProducts.map((prod, i) => (
            <ProductCard
              key={prod.id || i}
              prod={prod}
              slug={slug}
              handleEnquire={handleEnquire}
              CONTACT={CONTACT}
              BRAND_COLORS={BRAND_COLORS}
              PROD_IMAGES={PROD_IMAGES}
              normalizeBrand={normalizeBrand}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn page-btn-nav" 
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
              aria-label="Previous Page"
            >
              ‹ Prev
            </button>
            {getPageNumbers(currentPage, totalPages).map((p, idx) => (
              p === '...' ? (
                <span key={`dots-${idx}`} className="page-ellipsis">…</span>
              ) : (
                <button 
                  key={p} 
                  className={`page-btn ${currentPage === p ? 'active' : ''}`}
                  onClick={() => { setCurrentPage(p); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                >
                  {p}
                </button>
              )
            ))}
            <button 
              className="page-btn page-btn-nav" 
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
              aria-label="Next Page"
            >
              Next ›
            </button>
          </div>
        )}

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
        <div className="cat-browse-more-sec">
          <div className="sr mb-8">
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
                    <img 
                      src={PROD_IMAGES[cat.slug] || '/prod-commode.png'} 
                      alt={cat.name} 
                      loading="lazy"
                      decoding="async"
                    />
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
