import { FEATURED_PRODUCTS, getProductImage } from '../../data/categories';
import PROD_IMAGES from '../../constants/productImages';

/* ─────────────────────────────────────────────
   FEATURED PRODUCTS SECTION
   Shows the highlighted product cards with
   images, brand labels and an enquiry button.

   Edit FEATURED_PRODUCTS in data/categories.js
   to change which products are featured.

   Props:
     onScrollTo(id)     — smooth-scroll helper
     onGoCategory(slug) — navigate to category page
     onProdAdd(prod)    — scroll to contact + pre-fill form
───────────────────────────────────────────── */
export default function FeaturedProducts({ onScrollTo, onGoCategory, onProdAdd }) {
  return (
    <section className="sec" id="products">
      <div className="sr flex justify-between items-end flex-wrap gap-4">
        <div>
          <span className="sec-label">Featured Products</span>
          <h2 className="sec-title">Popular<br /><em>Picks</em></h2>
        </div>
        <button
          className="btn-ghost py-[11px] px-[24px] text-[9.5px]"
          onClick={() => onScrollTo('all-cats')}
        >
          View All →
        </button>
      </div>

      <div className="prod-grid">
        {FEATURED_PRODUCTS.map((prod, i) => (
          <div key={i} className="prod-card" onClick={() => onGoCategory(prod.category)}>
            <div className="prod-img">
              <div className="prod-img-inner">
                {getProductImage(prod.category, prod.name, prod.brand) || PROD_IMAGES[prod.category]
                  ? <img
                      src={getProductImage(prod.category, prod.name, prod.brand) || PROD_IMAGES[prod.category]}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PROD_IMAGES[prod.category] || '/prod-commode.png';
                      }}
                    />
                  : <div className="prod-icon-bg">{prod.icon}</div>
                }
              </div>
              <div className="prod-gradient-overlay" />
              <div className="prod-tag">{prod.brandTag}</div>
            </div>
            <div className="prod-info">
              <div className="prod-brand-lbl">{prod.brand}</div>
              <div className="prod-name">{prod.name}</div>
              <div className="prod-footer">
                <div className="prod-price">
                  <small>from</small>{prod.price}
                </div>
                <button
                  className="prod-add"
                  title="Enquire"
                  onClick={e => { e.stopPropagation(); onProdAdd(prod); }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
