const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize Schema
db.serialize(() => {
  // Contact
  db.run(`CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner TEXT,
    phone TEXT,
    phoneFormatted TEXT,
    whatsappUrl TEXT
  )`);

  // Ticker
  db.run(`CREATE TABLE IF NOT EXISTS ticker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL
  )`);

  // Stats
  db.run(`CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    label TEXT NOT NULL
  )`);

  // Brands
  db.run(`CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT NOT NULL
  )`, () => {
    db.get("SELECT COUNT(*) AS count FROM brands", (err, row) => {
      if (!err && row && row.count === 0) {
        const defaultBrands = [
          { name: 'Porta', logo: '/porta-logo.webp' },
          { name: 'Master', logo: '/master-logo.webp' },
          { name: 'Pool', logo: '/pool-logo.webp' },
          { name: 'ICL Boch', logo: '/iclboch-logo.webp' },
          { name: 'Dell', logo: '/dell-logo.webp' },
          { name: 'Brite', logo: '/brite-logo.webp' },
          { name: 'Sonex', logo: '/sonex-logo.webp' },
          { name: 'Faisal', logo: '/faisal-logo.webp' },
          { name: 'Kale', logo: '/kale-logo.webp' },
          { name: 'Grohe', logo: '/grohe-logo.webp' }
        ];
        const stmt = db.prepare("INSERT INTO brands (name, logo) VALUES (?, ?)");
        defaultBrands.forEach(b => stmt.run(b.name, b.logo));
        stmt.finalize();
      }
    });
  });

  // Hero
  db.run(`CREATE TABLE IF NOT EXISTS hero (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    img TEXT NOT NULL,
    slug TEXT NOT NULL
  )`);

  // Categories
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    no TEXT,
    name TEXT NOT NULL,
    hint TEXT,
    icon TEXT
  )`);

  // Products
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    categoryId INTEGER NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price REAL,
    stock INTEGER,
    code TEXT,
    color TEXT,
    image TEXT,
    description TEXT,
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE
  )`);

  // Migration: Add description column to existing DB if it doesn't exist
  db.run(`ALTER TABLE products ADD COLUMN description TEXT`, (err) => {
    // Ignore error if column already exists
  });

  // Migration: Add images column to existing DB if it doesn't exist
  db.run(`ALTER TABLE products ADD COLUMN images TEXT`, (err) => {
    // Ignore error if column already exists
  });
});

module.exports = db;
