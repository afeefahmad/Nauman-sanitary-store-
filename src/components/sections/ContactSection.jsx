import { useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';

/* ─────────────────────────────────────────────
   CONTACT FORM
   Quote request form. Categories in the
   dropdown come from ALL_CATEGORIES.
   Edit CONTACT in data/categories.js to change
   phone, email, WhatsApp link, and owner name.
───────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const { categories, CONTACT } = useCatalog();
  return (
    <div className="contact-form-wrap">
      <h3 className="form-title">Request a Quote</h3>
      <div className="cf">
        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-lbl">Full Name</label>
            <input className="cf-input" type="text" placeholder="Your name" />
          </div>
          <div className="cf-field">
            <label className="cf-lbl">Phone</label>
            <input className="cf-input" type="text" placeholder="0300 0000000" />
          </div>
        </div>
        <div className="cf-field">
          <label className="cf-lbl">Interested In</label>
          <select className="cf-input">
            <option>Select a category...</option>
            {categories.map(c => (
              <option key={c.slug}>{c.name}</option>
            ))}
            <option>Other</option>
          </select>
        </div>
        <div className="cf-field">
          <label className="cf-lbl">Requirements</label>
          <textarea
            className="cf-txt"
            placeholder="Describe your requirements, quantities, budget range…"
          />
        </div>
        <button
          className="cf-submit"
          type="button"
          onClick={() => setSent(true)}
          style={sent ? { background: 'var(--bronze-lt)', backgroundSize: '100%' } : {}}
        >
          {sent ? '✓ Enquiry Sent — We Will Contact You Shortly' : 'Send Enquiry →'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
   Contact details left + quote form right.
   Edit store addresses and hours directly
   in this file. Phone/email/WhatsApp come
   from CONTACT in data/categories.js.
───────────────────────────────────────────── */
export default function ContactSection() {
  const { CONTACT } = useCatalog();

  return (
    <section className="sec" id="contact">
      {/* Left — contact details */}
      <div className="sr-l">
        <span className="sec-label">Get In Touch</span>
        <h2 className="sec-title">Visit Us or <em>Call Us</em></h2>
        <div className="rule" />
        <p className="sec-desc">
          Come visit our stores in Lahore &amp; Multan, or reach out for pricing, availability
          and project quotes. We&apos;re here to help.
        </p>

        <div className="contact-details">
          {/* Location */}
          <div className="ci">
            <div className="ci-icon">📍</div>
            <div>
              <div className="ci-lbl">Store Locations</div>
              <div className="ci-val">
                Nauman Sanitary Store — Lahore, Punjab<br />
                Nauman Sanitary Store — Multan, Punjab
              </div>
            </div>
          </div>

          {/* Owner */}
          <div className="ci">
            <div className="ci-icon">👤</div>
            <div>
              <div className="ci-lbl">Owner</div>
              <div className="ci-val">{CONTACT.owner}</div>
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div className="ci">
            <div className="ci-icon">📞</div>
            <div>
              <div className="ci-lbl">Phone / WhatsApp</div>
              <div className="ci-val">
                <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneFormatted}</a>
                &nbsp;·&nbsp;
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp ↗
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="ci">
            <div className="ci-icon flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
              </svg>
            </div>
            <div>
              <div className="ci-lbl">Email</div>
              <div className="ci-val">
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="ci">
            <div className="ci-icon">⏰</div>
            <div>
              <div className="ci-lbl">Business Hours</div>
              <div className="ci-val">
                <strong>Lahore Showroom</strong><br />
                Monday to Sunday: 8:00 AM to 8:00 PM<br /><br />
                <strong>Multan Showroom</strong><br />
                Monday to Thursday: 8:00 AM to 8:00 PM<br />
                Friday: Closed<br />
                Saturday to Sunday: 8:00 AM to 8:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — quote form */}
      <div className="sr-r">
        <ContactForm />
      </div>
    </section>
  );
}
