const fs = require('fs');
const path = require('path');
const db = require('./database');

// 1. Read the ES Module file
const srcPath = path.join(__dirname, '../src/data/categories.js');
let rawContent = fs.readFileSync(srcPath, 'utf8');

// 2. Convert ES module exports to CommonJS
// Replace "export const " with "const " and "export function" with "function"
rawContent = rawContent.replace(/export /g, '');
// Append module.exports
rawContent += `\nmodule.exports = { CONTACT, TICKER_ITEMS, STATS, BRANDS, HERO_CATEGORIES, BRAND_PANELS, ALL_CATEGORIES };\n`;

// 3. Write to a temporary file
const tempPath = path.join(__dirname, 'temp_categories.js');
fs.writeFileSync(tempPath, rawContent);

// 4. Require the temporary file
const data = require('./temp_categories');

// 5. Seed the database
db.serialize(() => {
  // Clear existing data
  db.run('DELETE FROM contact');
  db.run('DELETE FROM ticker');
  db.run('DELETE FROM stats');
  db.run('DELETE FROM brands');
  db.run('DELETE FROM hero');
  db.run('DELETE FROM categories');
  db.run('DELETE FROM products');

  // Insert Contact
  db.run('INSERT INTO contact (owner, phone, phoneFormatted, whatsappUrl) VALUES (?, ?, ?, ?)', 
    [data.CONTACT.owner, data.CONTACT.phone, data.CONTACT.phoneFormatted, data.CONTACT.whatsappUrl]);

  // Insert Ticker
  data.TICKER_ITEMS.forEach(t => db.run('INSERT INTO ticker (message) VALUES (?)', [t]));

  // Insert Stats
  data.STATS.forEach(s => db.run('INSERT INTO stats (value, label) VALUES (?, ?)', [s.count.toString() + (s.count >= 500 ? '+' : ''), s.label]));

  // Insert Brands (use placeholder logo if none provided)
  const defaultLogo = 'https://images.unsplash.com/photo-1590725140246-200085a210d7?auto=format&fit=crop&q=80&w=400';
  data.BRANDS.forEach(b => db.run('INSERT INTO brands (name, logo) VALUES (?, ?)', [b.name, b.logo || defaultLogo]));

  // Insert Hero
  data.HERO_CATEGORIES.forEach(h => db.run('INSERT INTO hero (title, subtitle, img, slug) VALUES (?, ?, ?, ?)', [h.name, h.hint, h.image || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', h.slug]));

  // Insert Categories & Products
  data.ALL_CATEGORIES.forEach((cat, index) => {
    const no = (index + 1).toString().padStart(2, '0');
    db.run('INSERT INTO categories (slug, no, name, hint, icon) VALUES (?, ?, ?, ?, ?)', 
      [cat.slug, no, cat.name, cat.subs || '', cat.icon], 
      function(err) {
        if (err) return console.error("Error inserting category:", err);
        const catId = this.lastID;
        
        // Insert products for this category
        if (cat.products && cat.products.length > 0) {
          const stmt = db.prepare('INSERT INTO products (id, categoryId, name, brand, price, stock, code, color, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
          cat.products.forEach(p => {
            stmt.run([
              Math.random().toString(36).substr(2, 9), // generate random id
              catId,
              p.name,
              p.brand || 'Unbranded',
              0, // price
              0, // stock
              p.model || '',
              '', // color
              p.image || ''
            ]);
          });
          stmt.finalize();
        }
      }
    );
  });
});

console.log("Full data migration successful!");

// Cleanup temp file
setTimeout(() => fs.unlinkSync(tempPath), 1000);
