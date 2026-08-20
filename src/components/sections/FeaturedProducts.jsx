import { useMemo } from 'react';

/* ─────────────────────────────────────────────
   FEATURED PRODUCTS SECTION
   Shows 4 major categories with premium images.
───────────────────────────────────────────── */

const MAJOR_CATEGORIES = [
  { id: 'toilets', name: 'Commode', brand: 'Luxury Collection', description: 'Premium modern commodes & toilets.', image: '/popular-commode.png', categorySlug: 'toilets' },
  { id: 'basins', name: 'Wash Basins', brand: 'Luxury Collection', description: 'Sleek & elegant wash basins.', image: '/popular-basin.png', categorySlug: 'basins' },
  { id: 'vanities', name: 'Vanities', brand: 'Luxury Collection', description: 'Luxurious bathroom vanities.', image: '/popular-vanity.png', categorySlug: 'vanities' },
  { id: 'mirrors', name: 'Mirrors', brand: 'Luxury Collection', description: 'Illuminated & decorative mirrors.', image: '/popular-mirror.png', categorySlug: 'mirrors' },
];

export default function FeaturedProducts({ onScrollTo, onGoCategory }) {
  return (
    <section className="sec" id="products">
      <div className="sr flex justify-between items-end flex-wrap gap-4">
        <div>
          <span className="sec-label">Major Categories</span>
          <h2 className="sec-title">Popular <em>Picks</em></h2>
        </div>
        <button
          className="btn-ghost py-[11px] px-[24px] text-[9.5px]"
          onClick={() => onScrollTo('all-cats')}
        >
          View All Categories →
        </button>
      </div>

      <div className="prod-grid">
        {MAJOR_CATEGORIES.map((cat, i) => (
          <div key={cat.id || i} className="prod-card" onClick={() => onGoCategory(cat.categorySlug)}>
            <div className="prod-img fill-img">
              <div className="prod-img-inner">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="prod-gradient-overlay" />
              <div className="prod-tag" style={{ background: 'var(--bronze)', color: '#000' }}>Featured</div>
            </div>
            <div className="prod-info">
              <div className="prod-brand-lbl">{cat.brand}</div>
              <div className="prod-name">{cat.name}</div>
              <div className="cat-prod-desc">{cat.description}</div>
              <div className="prod-footer" style={{ marginTop: '1rem' }}>
                <div className="prod-price" style={{ color: 'var(--bronze-lt)', fontSize: '14px', letterSpacing: '1px' }}>
                  Explore Collection →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
