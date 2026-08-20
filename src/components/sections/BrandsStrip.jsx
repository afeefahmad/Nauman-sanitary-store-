import { useCatalog } from '../../context/CatalogContext';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────
   BRANDS STRIP SECTION
   A marquee-style continuous scrolling ribbon of brands.
   Edit BRANDS in Admin Portal
───────────────────────────────────────────── */
export default function BrandsStrip() {
  const { BRANDS } = useCatalog();
  const navigate = useNavigate();

  return (
    <section className="sec-sm" id="brands">
      <p className="brands-eyebrow">Trusted Brands We Stock</p>
      <div className="brands-row stg">
        {BRANDS.map((b, i) => (
          <div 
            key={i} 
            className="brand-pill hero-pill" 
            onClick={() => navigate(`/brand/${encodeURIComponent(b.name)}`)}
            style={{ cursor: 'pointer' }}
          >
            <span>{b.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
