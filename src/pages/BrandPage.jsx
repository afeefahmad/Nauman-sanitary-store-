import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { getProductImage } from '../data/categories';
import { useCatalog } from '../context/CatalogContext';
import { useInquiry } from '../context/InquiryContext';
import ProductCard from '../components/ProductCard';

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
            <ProductCard
              key={prod.id || i}
              prod={prod}
              slug={prod._catSlug}
              handleEnquire={(p, s) => handleEnquire(p, s)}
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
          <div className="cat-browse-more-sec">
            <div className="sr mb-8">
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
                      {(b.logo || b.image) ? (
                        <img 
                          src={b.logo || b.image} 
                          alt={b.name} 
                          loading="lazy" 
                          decoding="async" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="brand-avatar-circle" style={{ display: (b.logo || b.image) ? 'none' : 'flex' }}>
                        <span>{b.name?.substring(0, 2).toUpperCase() || 'BR'}</span>
                      </div>
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
