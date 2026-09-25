import { useCatalog } from '../../context/CatalogContext';
import PROD_IMAGES from '../../constants/productImages';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   CATEGORIES GRID (HERO)
   Displays top featured categories on the homepage.
   Edit HERO_CATEGORIES in Admin Portal
───────────────────────────────────────────── */
function resolveCategorySlug(rawSlug, title) {
  const str = `${rawSlug || ''} ${title || ''}`.toLowerCase();
  if (str.includes('commode') || str.includes('toilet')) return 'toilets';
  if (str.includes('basin')) return 'basins';
  if (str.includes('tap') || str.includes('fitting') || str.includes('faucet') || str.includes('mixer')) return 'taps';
  if (str.includes('vanit')) return 'vanities';
  if (str.includes('mirror')) return 'mirrors';
  return rawSlug || 'toilets';
}

export default function CategoriesSection({ onScrollTo, onGoCategory }) {
  const { HERO_CATEGORIES } = useCatalog();

  const handleCardClick = (cat) => {
    const targetSlug = resolveCategorySlug(cat.slug, cat.title || cat.name);
    if (typeof onGoCategory === 'function') {
      onGoCategory(targetSlug);
    }
  };

  return (
    <section className="sec" id="categories">
      <div className="cats-head">
        <div>
          <span className="sec-label sr">Browse Collections</span>
          <h2 className="sec-title sr">Shop by <em>Category</em></h2>
        </div>
        <button
          className="btn-ghost text-[9.5px] py-[11px] px-[26px]"
          onClick={() => onScrollTo('all-cats')}
        >
          All Categories →
        </button>
      </div>

      <div className="cats-grid">
        {HERO_CATEGORIES.map((cat, index) => {
          const targetSlug = resolveCategorySlug(cat.slug, cat.title || cat.name);
          return (
            <div
              key={cat.slug || index}
              className="cat-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(cat)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cat)}
            >
              <div className="cat-fill">
                {(() => {
                  const isExternal = cat.img && (cat.img.includes('unsplash') || cat.img.includes('http'));
                  const imgSrc = (!isExternal && cat.img) ? cat.img : (PROD_IMAGES[targetSlug] || PROD_IMAGES[cat.slug] || cat.img);
                  return imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={cat.title || cat.name}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null;
                })()}
              </div>

              <div className="cat-shade" />
              <div className="cat-link" title={`View ${cat.title || cat.name}`}>↗</div>
              <div className="cat-body">
                <div className="cat-no">{'0' + (index + 1) + ' · Category'}</div>
                <div className="cat-name">{cat.title || cat.name}</div>
                <div className="cat-hint">{cat.subtitle || cat.hint}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
