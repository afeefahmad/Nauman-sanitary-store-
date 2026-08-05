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
  )`);

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
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE
  )`);
});

module.exports = db;
