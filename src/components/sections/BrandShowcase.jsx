import { useState } from 'react';
import { BRAND_PANELS } from '../../data/categories';

/* ─────────────────────────────────────────────
   BRAND TABS
   Tabbed view for each featured brand.
   Edit BRAND_PANELS in data/categories.js to
   add/edit brand info, descriptions, and
   featured product listings.
───────────────────────────────────────────── */
function BrandTabs() {
  const [active, setActive] = useState('nesco');
  return (
    <>
      <div className="tab-bar">
        {BRAND_PANELS.map(b => (
          <button
            key={b.id}
            className={`tab-btn${active === b.id ? ' on' : ''}`}
            onClick={() => setActive(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>
      {BRAND_PANELS.map(b => (
        <div key={b.id} className={`brand-panel${active === b.id ? ' on' : ''}`} id={`tab-${b.id}`}>
          <div className="brand-meta">
            <span className="sec-label">{b.label}</span>
            <h3 className="brand-title">
              {b.title.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>
            <div className="rule" />
            <p className="brand-desc">{b.desc}</p>
            <div className="brand-badges">
              {b.badges.map((badge, i) => (
                <div key={i} className="b-badge">
                  <div className="b-badge-num">{badge.num}</div>
                  <div className="b-badge-lbl">{badge.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="brand-products">
            {b.products.map((p, i) => (
              <div key={i} className="bp-item">
                <div className="bp-name">{p.name}</div>
                <div className="bp-from">From</div>
                <div className="bp-price">{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   BRAND SHOWCASE SECTION
   Tabbed brand detail section.
───────────────────────────────────────────── */
export default function BrandShowcase() {
  return (
    <section className="sec" id="brand-showcase">
      <div className="brand-head sr">
        <span className="sec-label">Our Ceramic Lines</span>
        <h2 className="sec-title">Featured<br /><em>Brands</em></h2>
        <div className="rule" />
      </div>
      <BrandTabs />
    </section>
  );
}
