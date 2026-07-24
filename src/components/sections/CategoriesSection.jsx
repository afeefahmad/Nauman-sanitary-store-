import { HERO_CATEGORIES } from '../../data/categories';
import PROD_IMAGES from '../../constants/productImages';

/* ─────────────────────────────────────────────
   CATEGORIES SECTION
   The large hero grid of category cards.
   Edit HERO_CATEGORIES in data/categories.js
   to change which categories appear here.
   Edit PROD_IMAGES in constants/productImages.js
   to change the card background images.

   Props:
     onScrollTo(id)    — smooth-scroll helper
     onGoCategory(slug) — navigate to category page
───────────────────────────────────────────── */
export default function CategoriesSection({ onScrollTo, onGoCategory }) {
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
        {HERO_CATEGORIES.map((cat) => (
          <div key={cat.slug} className="cat-card" onClick={() => onGoCategory(cat.slug)}>
            <div className="cat-fill">
              {PROD_IMAGES[cat.slug] && (
                <img
                  src={PROD_IMAGES[cat.slug]}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>

            <div className="cat-shade" />
            <div className="cat-link">↗</div>
            <div className="cat-body">
              <div className="cat-no">{cat.no}</div>
              <div className="cat-name">
                {cat.name.split('\n').map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                ))}
              </div>
              <div className="cat-hint">{cat.hint}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
