import { useCatalog } from '../../context/CatalogContext';
import PROD_IMAGES from '../../constants/productImages';

/* ─────────────────────────────────────────────
   ALL CATEGORIES SECTION
   Full grid of every product category.
   Edit ALL_CATEGORIES in data/categories.js
   to add, remove, or rename categories.

   Props:
     onGoCategory(slug) — navigate to category page
───────────────────────────────────────────── */
export default function AllCategoriesSection({ onGoCategory }) {
  const { categories } = useCatalog();
  return (
    <section className="sec" id="all-cats">
      <div className="sr text-center">
        <span className="sec-label block text-center">
          Complete Range
        </span>
        <h2 className="sec-title">
          All Product <em>Categories</em>
        </h2>
      </div>
      <div className="all-cats-grid stg">
        {categories.slice(0, 10).map(cat => (
          <div key={cat.slug} className="ac-item" onClick={() => onGoCategory(cat.slug)}>
            <div className="ac-icon">
              <img 
                src={PROD_IMAGES[cat.slug] || '/placeholder.png'} 
                alt={cat.name} 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ac-name">{cat.name}</div>
            <div className="ac-subs">{cat.hint || cat.subs}</div>
            <div className="ac-cta">Explore →</div>
          </div>
        ))}
      </div>
    </section>
  );
}
