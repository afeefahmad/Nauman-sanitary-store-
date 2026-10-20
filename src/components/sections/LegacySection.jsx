import { LEGACY_FEATURES, CONTACT } from '../../data/categories';

/* ─────────────────────────────────────────────
   LEGACY / ABOUT SECTION
   "Built on Trust & Quality"
   Features CEO Muhammad Nauman Zaffar spotlight,
   company pillars, milestone metrics & store visit CTA.
───────────────────────────────────────────── */
export default function LegacySection({ onScrollTo }) {
  const pillars = [
    {
      icon: '🏛️',
      title: 'Authorized Brand Direct',
      desc: 'Official direct supply partner for Porta, Nesco, Pool, Master, Turk Plast, Minhas & Dura Flow. 100% factory-sealed original inventory.'
    },
    {
      icon: '⚡',
      title: 'Turnkey Sanitary & Piping',
      desc: 'Complete residential and commercial catalog: luxury commodes, modern vanities, mixer faucets, and industrial-grade PPRC & UPVC pressure systems.'
    },
    {
      icon: '💼',
      title: 'Contractor & Bulk Advisory',
      desc: 'Structured wholesale pricing, volume contractor discounts, and dedicated project quantity estimates for builders, architects & developers.'
    },
    {
      icon: '🚚',
      title: 'Punjab-Wide Distribution',
      desc: 'Dual distribution hubs and stocked warehouses across Lahore and Multan, with prompt, secure delivery throughout Punjab.'
    }
  ];

  const stats = [
    { value: '27+', label: 'Years of Trust (Est. 1997)' },
    { value: '100%', label: 'Certified Genuine Brands' },
    { value: '50,000+', label: 'Projects & Homes Supplied' },
    { value: 'Lahore & Multan', label: 'Primary Distribution Hubs' },
  ];

  return (
    <section className="sec" id="legacy" style={{ position: 'relative' }}>
      <span id="about" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

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
        <span className="sec-label">Our Story &amp; Leadership</span>
        <h2 className="sec-title">Built on Trust &amp; <em>Quality</em></h2>
        <div className="rule" />
        <p className="sec-desc">
          For over 25 years, Nauman Sanitary Store has been a preferred destination for premium
          sanitary ware and bathroom solutions in Lahore and Multan. We offer an extensive
          portfolio of renowned brands, complemented by high quality PPRC and UPVC piping
          systems, elegant vanities, modern faucets, and carefully selected accessories for
          residential and commercial projects.
        </p>
        <p className="sec-desc" style={{ marginTop: '0.9rem', fontSize: '0.95rem', color: 'var(--mist)' }}>
          Founded and led by <strong>Muhammad Nauman Zaffar</strong>, our business is rooted in a tradition of genuine authenticity, transparent pricing, and technical excellence. We proudly supply homeowners, renowned architects, and government contractors with the highest-grade bathware in Pakistan.
        </p>

        <div className="my-8" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-primary" onClick={() => onScrollTo('contact')}>
            Visit Our Store
          </button>
          <a
            href={CONTACT?.whatsappUrl || 'https://wa.me/923008118085'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <span>Inquire via WhatsApp</span>
            <span style={{ fontSize: '1.1rem' }}>↗</span>
          </a>
        </div>

        <div className="legacy-feats">
          {LEGACY_FEATURES.map((feat, i) => (
            <div key={i} className="lf">
              <div className="lf-dot" />
              <div className="lf-txt">{feat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spanning Full-Width: CEO Spotlight & Company Capabilities */}
      <div className="legacy-expanded-wrap">
        {/* CEO Leadership Card */}
        <div className="ceo-spotlight-card">
          <div className="ceo-avatar-wrap">
            <div className="ceo-avatar-monogram">MNZ</div>
            <div className="ceo-verified-badge">
              <span>◆</span>
              <span>Founder &amp; CEO</span>
            </div>
          </div>

          <div className="ceo-content-wrap">
            <div className="ceo-header-meta">
              <span className="ceo-role-tag">Executive Leadership Message</span>
              <h3 className="ceo-name-heading">Muhammad Nauman Zaffar</h3>
              <div className="ceo-sub-meta">Chief Executive Officer · Nauman Sanitary Store (Est. 1997)</div>
            </div>

            <p className="ceo-quote-text">
              “When I founded Nauman Sanitary Store, my commitment was straightforward: never compromise on material authenticity. A bathroom is not merely a utility—it is a cornerstone of living comfort and architectural grace. For over two and a half decades, we have treated every client’s project as if it were our own home, ensuring only certified ceramics, durable piping, and timeless fixtures leave our doors.”
            </p>

            <div className="ceo-signature-block">
              <div className="ceo-sig-txt">Muhammad Nauman Zaffar</div>
              <div className="ceo-sig-location">Lahore &amp; Multan, Punjab</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="about-pillars-grid">
          {pillars.map((p, idx) => (
            <div key={idx} className="about-pillar-card">
              <div className="pillar-icon-badge">{p.icon}</div>
              <div className="pillar-card-title">{p.title}</div>
              <div className="pillar-card-desc">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Milestone Strip */}
        <div className="about-stats-strip">
          {stats.map((s, idx) => (
            <div key={idx} className="about-stat-item">
              <div className="about-stat-val">{s.value}</div>
              <div className="about-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
