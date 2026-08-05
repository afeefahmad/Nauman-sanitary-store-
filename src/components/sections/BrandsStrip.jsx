import { useCatalog } from '../../context/CatalogContext';

/* ─────────────────────────────────────────────
   BRANDS STRIP SECTION
   A marquee-style continuous scrolling ribbon of brands.
   Edit BRANDS in Admin Portal
───────────────────────────────────────────── */
export default function BrandsStrip() {
  const { BRANDS } = useCatalog();
  return (
    <section className="sec-sm" id="brands">
      <p className="brands-eyebrow">Trusted Brands We Stock</p>
      <div className="brands-row stg">
        {BRANDS.map((b, i) => (
          <div key={i} className="brand-pill hero-pill">
            <span>{b.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
