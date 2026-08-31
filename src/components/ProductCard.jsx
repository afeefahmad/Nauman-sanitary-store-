import { useState, useRef } from 'react';
import { getProductImage } from '../data/categories';

export default function ProductCard({
  prod,
  slug,
  handleEnquire,
  CONTACT,
  BRAND_COLORS,
  PROD_IMAGES,
  normalizeBrand
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const scrollWrapRef = useRef(null);

  const catSlug = slug || prod._catSlug || prod.categorySlug || 'toilets';

  // Gather all images array
  const allImages = (Array.isArray(prod.images) && prod.images.length > 0)
    ? prod.images.filter(Boolean)
    : [(prod.image || getProductImage(catSlug, prod.name, prod.brand) || PROD_IMAGES?.[catSlug] || '/prod-commode.png')];

  const hasMultipleImages = allImages.length > 1;
  const brandName = normalizeBrand ? normalizeBrand(prod.brand) : (prod.brand || '');
  const brandTag = normalizeBrand ? normalizeBrand(prod.brandTag || prod.brand) : (prod.brandTag || prod.brand || '');

  const scrollToImage = (targetIndex) => {
    const nextIdx = (targetIndex + allImages.length) % allImages.length;
    if (scrollWrapRef.current) {
      const width = scrollWrapRef.current.clientWidth;
      scrollWrapRef.current.scrollTo({
        left: nextIdx * width,
        behavior: 'smooth'
      });
    }
    setImgIdx(nextIdx);
  };

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== imgIdx && newIndex >= 0 && newIndex < allImages.length) {
        setImgIdx(newIndex);
      }
    }
  };

  return (
    <div className="cat-prod-card">
      <div className="cat-prod-img">
        <div className="cat-prod-img-inner">
          {hasMultipleImages ? (
            <div
              ref={scrollWrapRef}
              className="cat-prod-img-scroll-wrap"
              onScroll={handleScroll}
            >
              {allImages.map((imgUrl, idx) => (
                <div key={idx} className="cat-prod-img-slide">
                  <img
                    src={imgUrl}
                    alt={`${prod.name} ${idx + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PROD_IMAGES?.[catSlug] || '/prod-commode.png';
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={allImages[0]}
              alt={prod.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PROD_IMAGES?.[catSlug] || '/prod-commode.png';
              }}
            />
          )}
        </div>

        <div className="cat-prod-overlay" />

        {/* Brand Tag */}
        {prod.brand && (
          <div
            className="cat-prod-brand-tag"
            style={{
              background: BRAND_COLORS?.[prod.brand]
                ? `${BRAND_COLORS[prod.brand]}cc`
                : 'rgba(200,160,96,0.85)'
            }}
          >
            {brandTag}
          </div>
        )}

        {/* Multi-Image Navigation Arrows and Badge */}
        {hasMultipleImages && (
          <>
            <span className="prod-img-badge">
              📷 {imgIdx + 1} / {allImages.length}
            </span>
            <button
              type="button"
              className="prod-slider-btn prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                scrollToImage(imgIdx - 1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="prod-slider-btn next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                scrollToImage(imgIdx + 1);
              }}
            >
              ›
            </button>
            <div className="prod-dots-indicator" onClick={(e) => e.stopPropagation()}>
              {allImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`prod-dot ${idx === imgIdx ? 'active' : ''}`}
                  onClick={() => scrollToImage(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Metadata Info */}
      <div className="cat-prod-info">
        <div className="cat-prod-brand">{brandName}</div>
        <div className="cat-prod-name">{prod.name.replace(/\s*Model:.*$/i, '')}</div>
        {prod.description && <div className="cat-prod-desc">{prod.description}</div>}
        {prod.model && <div className="cat-prod-model">Model: {prod.model}</div>}

        <div className="cat-prod-footer">
          <button
            type="button"
            className="cat-prod-btn"
            title="Add to Inquiry Cart"
            onClick={() => handleEnquire && handleEnquire(prod, catSlug)}
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
  );
}
