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
  const [formData, setFormData] = useState(() => ({
    name: typeof window !== 'undefined' ? localStorage.getItem('nauman_customer_name') || '' : '',
    phone: typeof window !== 'undefined' ? localStorage.getItem('nauman_customer_phone') || '' : '',
    category: '',
    requirements: ''
  }));
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { categories, CONTACT } = useCatalog();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    try {
      if (name === 'name') localStorage.setItem('nauman_customer_name', value);
      if (name === 'phone') localStorage.setItem('nauman_customer_phone', value);
    } catch (err) {}
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.phone.trim()) {
      setError('Please enter your phone number so we can reach you.');
      return;
    }

    const targetPhone = CONTACT?.whatsapp || '923008118085';
    let message = `*New Quote Request — Nauman Sanitary Store*\n`;
    message += `──────────────────────\n`;
    if (formData.name.trim()) {
      message += `👤 *Customer Name:* ${formData.name.trim()}\n`;
    }
    message += `📞 *Customer Phone:* ${formData.phone.trim()}\n`;
    if (formData.category && formData.category !== 'Select a category...') {
      message += `🏷️ *Interested In:* ${formData.category}\n`;
    }
    if (formData.requirements.trim()) {
      message += `📝 *Requirements:* \n${formData.requirements.trim()}\n`;
    }
    message += `──────────────────────\n`;
    message += `Please share pricing and availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank');

    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 6000);
  };

  return (
    <div className="contact-form-wrap">
      <h3 className="form-title">Request a Quote</h3>
      <form className="cf" onSubmit={handleSubmit}>
        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-lbl">Full Name</label>
            <input
              className="cf-input"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="cf-field">
            <label className="cf-lbl">Phone</label>
            <input
              className="cf-input"
              type="tel"
              name="phone"
              placeholder="0300 0000000"
              value={formData.phone}
              onChange={handleChange}
              style={error ? { borderColor: '#ef4444' } : {}}
            />
          </div>
        </div>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '-6px', marginBottom: '6px' }}>
            {error}
          </div>
        )}
        <div className="cf-field">
          <label className="cf-lbl">Interested In</label>
          <select
            className="cf-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category...</option>
            {categories.map(c => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="cf-field">
          <label className="cf-lbl">Requirements</label>
          <textarea
            className="cf-txt"
            name="requirements"
            placeholder="Describe your requirements, quantities, budget range…"
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>
        <button
          className="cf-submit"
          type="submit"
          style={sent ? { background: 'var(--bronze-lt)', backgroundSize: '100%' } : {}}
        >
          {sent ? '✓ Enquiry Sent via WhatsApp' : 'Send Enquiry →'}
        </button>
      </form>
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
