import { WHY_US } from '../../data/categories';

/* ─────────────────────────────────────────────
   WHY US SECTION
   "The Nauman Difference" — reason cards.
   Edit WHY_US in data/categories.js to change
   the reasons, titles, and descriptions.
───────────────────────────────────────────── */
export default function WhyUsSection() {
  return (
    <section className="sec" id="why">
      <div className="sr text-center">
        <span className="sec-label block text-center">
          Why Choose Us
        </span>
        <h2 className="sec-title">
          The Nauman <em>Difference</em>
        </h2>
      </div>
      <div className="why-grid">
        {WHY_US.map(w => (
          <div key={w.no} className="why-card">
            <div className="why-no">{w.no}</div>
            <div className="why-ttl">{w.title}</div>
            <div className="why-dsc">{w.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
