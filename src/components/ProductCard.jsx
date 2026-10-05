import { useState, useRef } from 'react';
import { getProductImage } from '../data/categories';
import { formatImgUrl, isVideoUrl } from '../utils/apiConfig';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const scrollWrapRef = useRef(null);

  const catSlug = slug || prod._catSlug || prod.categorySlug || 'toilets';

  // Gather all images array safely (handling Array, JSON string, or single image fallback)
  let resolvedImages = [];
  if (Array.isArray(prod.images) && prod.images.length > 0) {
    resolvedImages = prod.images.filter(Boolean);
  } else if (typeof prod.images === 'string' && prod.images.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(prod.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        resolvedImages = parsed.filter(Boolean);
      }
    } catch (e) {}
  }

  if (resolvedImages.length === 0) {
    resolvedImages = [(prod.image || getProductImage(catSlug, prod.name, prod.brand) || PROD_IMAGES?.[catSlug] || '/prod-commode.png')];
  } else if (prod.image && !resolvedImages.includes(prod.image)) {
    resolvedImages.unshift(prod.image);
  }

  const allImages = resolvedImages.map(formatImgUrl);

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

  const openDetails = (e) => {
    e.stopPropagation();
    setShowDetailModal(true);
  };

  return (
    <>
      <div className="cat-prod-card" onClick={openDetails}>
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
                    {isVideoUrl(imgUrl) ? (
                      <video
                        src={imgUrl}
                        className="w-full h-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={imgUrl}
                        alt={`${prod.name} ${idx + 1}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PROD_IMAGES?.[catSlug] || '/prod-commode.png';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              isVideoUrl(allImages[0]) ? (
                <video
                  src={allImages[0]}
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={allImages[0]}
                  alt={prod.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PROD_IMAGES?.[catSlug] || '/prod-commode.png';
                  }}
                />
              )
            )}
          </div>

          <div className="cat-prod-overlay" />

          {/* Brand Tag */}
          {prod.brand && (
            <div
              className="cat-prod-brand-tag"
              style={{
                background: (BRAND_COLORS?.[brandName] || BRAND_COLORS?.[prod.brand])
                  ? `${BRAND_COLORS[brandName] || BRAND_COLORS[prod.brand]}cc`
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
                {imgIdx + 1} / {allImages.length}
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
          <div className="cat-prod-name" onClick={openDetails}>
            {prod.name.replace(/\s*Model:.*$/i, '')}
          </div>
          {prod.color && (
            <div className="cat-prod-color">
              <span className="cat-prod-color-label">Color:</span> {prod.color}
            </div>
          )}
          {prod.description && <div className="cat-prod-desc">{prod.description}</div>}
          {prod.model && prod.model.trim() !== '' && prod.model !== prod.name && <div className="cat-prod-model">Model: {prod.model}</div>}

          <div className="cat-prod-footer" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cat-prod-btn"
              title="Add to Inquiry Cart"
              onClick={(e) => {
                e.stopPropagation();
                handleEnquire && handleEnquire(prod, catSlug);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Inquiry Cart
            </button>

            <a
              href={`${CONTACT?.whatsappUrl || 'https://wa.me/923008118085'}?text=${encodeURIComponent(`Hi Nauman Sanitary, I am interested in: ${prod.name} (${prod.brand || ''})`)}`}
              target="_blank"
              rel="noreferrer"
              className="cat-prod-whatsapp-btn"
              title="Call or WhatsApp for Price"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call / WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Full Product Detail Modal */}
      {showDetailModal && (
        <div className="prod-modal-backdrop" onClick={() => setShowDetailModal(false)}>
          <div className="prod-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="prod-modal-close-btn"
              onClick={() => setShowDetailModal(false)}
              title="Close Details"
            >
              ✕
            </button>

            <div className="prod-modal-grid">
              {/* Left Column: Full Image Viewer & Thumbnail Gallery */}
              <div className="prod-modal-media">
                <div className="prod-modal-main-img-wrap">
                  {isVideoUrl(allImages[modalImgIdx] || allImages[0]) ? (
                    <video
                      src={allImages[modalImgIdx] || allImages[0]}
                      className="prod-modal-main-img"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={allImages[modalImgIdx] || allImages[0]}
                      alt={prod.name}
                      className="prod-modal-main-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PROD_IMAGES?.[catSlug] || '/prod-commode.png';
                      }}
                    />
                  )}
                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        className="prod-modal-arrow prev"
                        onClick={() => setModalImgIdx((modalImgIdx - 1 + allImages.length) % allImages.length)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="prod-modal-arrow next"
                        onClick={() => setModalImgIdx((modalImgIdx + 1) % allImages.length)}
                      >
                        ›
                      </button>
                      <span className="prod-modal-counter">
                        {modalImgIdx + 1} / {allImages.length}
                      </span>
                    </>
                  )}
                </div>

                {hasMultipleImages && (
                  <div className="prod-modal-thumbs">
                    {allImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`prod-modal-thumb ${idx === modalImgIdx ? 'active' : ''}`}
                        onClick={() => setModalImgIdx(idx)}
                      >
                        {isVideoUrl(imgUrl) ? (
                          <div className="relative w-full h-full flex items-center justify-center bg-black rounded">
                            <video src={imgUrl} className="w-full h-full object-cover rounded" muted />
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs bg-black/40">▶</span>
                          </div>
                        ) : (
                          <img src={imgUrl} alt={`${prod.name} ${idx + 1}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Complete Details */}
              <div className="prod-modal-details">
                <div>
                  {prod.brand && (
                    <div
                      className="prod-modal-brand-tag"
                      style={{
                        background: (BRAND_COLORS?.[brandName] || BRAND_COLORS?.[prod.brand])
                          ? `${BRAND_COLORS[brandName] || BRAND_COLORS[prod.brand]}cc`
                          : 'rgba(200,160,96,0.85)'
                      }}
                    >
                      {brandTag}
                    </div>
                  )}
                  <h2 className="prod-modal-title">{prod.name.replace(/\s*Model:.*$/i, '')}</h2>
                </div>

                <div className="prod-modal-badges">
                  {prod.subCategory && (
                    <div className="prod-modal-spec-badge">
                      <span className="spec-lbl">Subcategory:</span> <span className="spec-val">{prod.subCategory}</span>
                    </div>
                  )}
                  {prod.model && prod.model.trim() !== '' && prod.model !== prod.name && (
                    <div className="prod-modal-spec-badge">
                      <span className="spec-lbl">Model:</span> <span className="spec-val">{prod.model}</span>
                    </div>
                  )}
                  {prod.color && (
                    <div className="prod-modal-spec-badge gold">
                      <span className="spec-lbl">Color / Finish:</span> <span className="spec-val">{prod.color}</span>
                    </div>
                  )}
                </div>

                {prod.description && (
                  <div className="prod-modal-desc-box">
                    <h4 className="prod-modal-desc-title">Product Details & Specifications</h4>
                    <div className="prod-modal-desc-text">{prod.description}</div>
                  </div>
                )}

                <div className="prod-modal-actions">
                  <button
                    type="button"
                    className="cat-prod-btn modal-action-btn"
                    onClick={() => {
                      handleEnquire && handleEnquire(prod, catSlug);
                      setShowDetailModal(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Add to Inquiry Cart
                  </button>

                  <a
                    href={`${CONTACT?.whatsappUrl || 'https://wa.me/923008118085'}?text=${encodeURIComponent(`Hi Nauman Sanitary, I am interested in: ${prod.name} (${prod.brand || ''})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="cat-prod-whatsapp-btn modal-action-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Call / WhatsApp for Price
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
