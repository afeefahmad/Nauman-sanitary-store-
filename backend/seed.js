const fs = require('fs');
const db = require('./database');

// We need to parse the categories.js file
// It's a JS file using export const, so we can't easily require() it in Node without babel.
// But we can parse the JSON-like structures.
// Actually, an easier way is to just define a temporary script inside the frontend that imports categories.js and calls the backend POST endpoints.
// Even better, I will just rewrite the initial seed data here.
const TICKER_ITEMS = [
  "🚧 We are currently updating our systems. Expect minor delays.",
  "✨ Huge Discounts on Modern Bathroom Vanities - Up to 30% Off!",
  "🚚 Free Delivery in Lahore & Multan for Orders Over Rs. 50,000",
  "⭐ Explore Our New Premium Spanish Tiles Collection",
  "📞 Need Help? Contact us via WhatsApp anytime."
];

const STATS = [
  { value: '100k+', label: 'Happy Customers' },
  { value: '50+', label: 'Top Brands' },
  { value: '10,000+', label: 'Products' },
  { value: '34+', label: 'Years Experience' }
];

const BRANDS = [
  { name: 'Porta', logo: 'https://images.unsplash.com/photo-1590725140246-200085a210d7?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sonex', logo: 'https://images.unsplash.com/photo-1590725140246-200085a210d7?auto=format&fit=crop&q=80&w=400' },
  { name: 'Grohe', logo: 'https://images.unsplash.com/photo-1590725140246-200085a210d7?auto=format&fit=crop&q=80&w=400' },
  { name: 'Master', logo: 'https://images.unsplash.com/photo-1590725140246-200085a210d7?auto=format&fit=crop&q=80&w=400' }
];

const HERO_CATEGORIES = [
  { title: 'Modern Toilets', subtitle: 'Elevate your bathroom', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', slug: 'toilets' },
  { title: 'Elegant Basins', subtitle: 'Designer counter tops', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200', slug: 'basins' }
];

const CONTACT = {
  owner: 'Nauman Zaffar',
  phone: '03008118085',
  phoneFormatted: '+92 300 8118085',
  whatsappUrl: 'https://wa.me/923008118085'
};

const CATEGORIES = [
  { slug: 'toilets', no: '01', name: 'Toilets', hint: 'One Piece · Commode', icon: '🚽' },
  { slug: 'basins', no: '02', name: 'Basins', hint: 'Pedestal · Wall Hung', icon: '🪣' }
];

db.serialize(() => {
  TICKER_ITEMS.forEach(t => db.run('INSERT INTO ticker (message) VALUES (?)', [t]));
  STATS.forEach(s => db.run('INSERT INTO stats (value, label) VALUES (?, ?)', [s.value, s.label]));
  BRANDS.forEach(b => db.run('INSERT INTO brands (name, logo) VALUES (?, ?)', [b.name, b.logo]));
  HERO_CATEGORIES.forEach(h => db.run('INSERT INTO hero (title, subtitle, img, slug) VALUES (?, ?, ?, ?)', [h.title, h.subtitle, h.img, h.slug]));
  db.run('INSERT INTO contact (owner, phone, phoneFormatted, whatsappUrl) VALUES (?, ?, ?, ?)', [CONTACT.owner, CONTACT.phone, CONTACT.phoneFormatted, CONTACT.whatsappUrl]);
  CATEGORIES.forEach(c => db.run('INSERT INTO categories (slug, no, name, hint, icon) VALUES (?, ?, ?, ?, ?)', [c.slug, c.no, c.name, c.hint, c.icon]));
});

console.log("Database seeded successfully!");
