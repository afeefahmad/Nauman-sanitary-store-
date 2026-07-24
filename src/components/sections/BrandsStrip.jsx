import { BRANDS } from '../../data/categories';

/* ─────────────────────────────────────────────
   BRANDS STRIP SECTION
   Shows all trusted brands as pill badges.
   Edit BRANDS in data/categories.js to add,
   remove, or rename brands.
───────────────────────────────────────────── */
export default function BrandsStrip() {
  return (
    <section className="sec-sm" id="brands">
      <p className="brands-eyebrow">Trusted Brands We Stock</p>
      <div className="brands-row stg">
        {BRANDS.map(b => (
          <div key={b.id} className="brand-pill hero-pill">
            <span>{b.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
