import { ALL_CATEGORIES } from '../../data/categories';

/* ─────────────────────────────────────────────
   ALL CATEGORIES SECTION
   Full grid of every product category.
   Edit ALL_CATEGORIES in data/categories.js
   to add, remove, or rename categories.

   Props:
     onGoCategory(slug) — navigate to category page
───────────────────────────────────────────── */
export default function AllCategoriesSection({ onGoCategory }) {
  return (
    <section className="sec" id="all-cats">
      <div className="sr text-center">
        <span className="sec-label block text-center">
          Complete Range
        </span>
        <h2 className="sec-title text-center">
          All Product<br /><em>Categories</em>
        </h2>
      </div>
      <div className="all-cats-grid stg">
        {ALL_CATEGORIES.map(cat => (
          <div key={cat.slug} className="ac-item" onClick={() => onGoCategory(cat.slug)}>
            <div className="ac-icon">
              {typeof cat.icon === 'string' &&
                (cat.icon.startsWith('data:image') || cat.icon.startsWith('/') || cat.icon.startsWith('http'))
                ? <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-[1em] h-[1em] object-contain invert"
                  />
                : cat.icon}
            </div>
            <div className="ac-name">{cat.name}</div>
            <div className="ac-subs">{cat.subs}</div>
            <div className="ac-cta">Explore →</div>
          </div>
        ))}
      </div>
    </section>
  );
}
