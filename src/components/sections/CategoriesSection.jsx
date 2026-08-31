import { useCatalog } from '../../context/CatalogContext';
import PROD_IMAGES from '../../constants/productImages';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   CATEGORIES GRID (HERO)
   Displays top featured categories on the homepage.
   Edit HERO_CATEGORIES in Admin Portal
───────────────────────────────────────────── */
export default function CategoriesSection({ onScrollTo, onGoCategory }) {
  const { HERO_CATEGORIES } = useCatalog();
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
        {HERO_CATEGORIES.map((cat, index) => (
          <div key={cat.slug || index} className="cat-card" onClick={() => onGoCategory(cat.slug)}>
            <div className="cat-fill">
              {(() => {
                const isExternal = cat.img && (cat.img.includes('unsplash') || cat.img.includes('http'));
                const imgSrc = (!isExternal && cat.img) ? cat.img : (PROD_IMAGES[cat.slug] || cat.img);
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
            <div className="cat-link">↗</div>
            <div className="cat-body">
              <div className="cat-no">{'0' + (index + 1) + ' · Category'}</div>
              <div className="cat-name">{cat.title || cat.name}</div>
              <div className="cat-hint">{cat.subtitle || cat.hint}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
