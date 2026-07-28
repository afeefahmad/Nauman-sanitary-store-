import { LEGACY_FEATURES } from '../../data/categories';

/* ─────────────────────────────────────────────
   LEGACY / ABOUT SECTION
   "Built on Trust & Quality" section.
   Edit LEGACY_FEATURES in data/categories.js
   to change the feature bullet points.
   Edit the paragraph text directly in this file.

   Props:
     onScrollTo(id) — smooth-scroll helper
───────────────────────────────────────────── */
export default function LegacySection({ onScrollTo }) {
  return (
    <section className="sec" id="legacy">
      {/* Visual left column */}
      <div className="legacy-vis sr-l">
        <div className="lv-main">
          <div className="lv-monogram">NSS</div>
        </div>
        <div className="lv-accent">
          <p>Premium Quality<br />◆<br />Guaranteed</p>
        </div>
        <div className="lv-badge">
          <span className="lv-badge-num">27+</span>
          <div className="lv-badge-lbl">Years of Service</div>
        </div>
      </div>

      {/* Text right column */}
      <div className="sr-r">
        <span className="sec-label">Our Story</span>
        <h2 className="sec-title">Built on Trust &amp; <em>Quality</em></h2>
        <div className="rule" />
        <p className="sec-desc">
          For over 25 years, Nauman Sanitary Store has been a preferred destination for premium
          sanitary ware and bathroom solutions in Lahore and Multan. We offer an extensive
          portfolio of renowned brands, complemented by high quality PPRC and UPVC piping
          systems, elegant vanities, modern faucets, and carefully selected accessories for
          residential and commercial projects.
        </p>
        <div className="legacy-feats">
          {LEGACY_FEATURES.map((feat, i) => (
            <div key={i} className="lf">
              <div className="lf-dot" />
              <div className="lf-txt">{feat}</div>
            </div>
          ))}
        </div>
        <div className="mt-11">
          <button className="btn-primary" onClick={() => onScrollTo('contact')}>
            Visit Our Store
          </button>
        </div>
      </div>
    </section>
  );
}
