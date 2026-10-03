import { useCatalog } from '../../context/CatalogContext';
import PROD_IMAGES from '../../constants/productImages';
import { formatImgUrl } from '../../utils/apiConfig';

/* ─────────────────────────────────────────────
   ALL CATEGORIES SECTION
   Full grid of every product category.
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
        {(categories || []).map(cat => {
          const firstProdImg = (cat.products && cat.products[0]) ? (cat.products[0].image || (Array.isArray(cat.products[0].images) ? cat.products[0].images[0] : null)) : null;
          const rawImg = cat.img || cat.image || firstProdImg || PROD_IMAGES[cat.slug] || '/prod-commode.png';
          const imgSrc = formatImgUrl(rawImg);

          return (
            <div key={cat.slug || cat.id} className="ac-item" onClick={() => onGoCategory(cat.slug)}>
              <div className="ac-icon">
                <img 
                  src={imgSrc} 
                  alt={cat.name} 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PROD_IMAGES[cat.slug] || '/prod-commode.png';
                  }}
                />
              </div>
              <div className="ac-name">{cat.name}</div>
              <div className="ac-subs">{cat.hint || cat.subs || `${cat.products?.length || 0} Products`}</div>
              <div className="ac-cta">Explore →</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
