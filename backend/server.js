const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Setup uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// ----------------------------------------------------
// CMS Routes
// ----------------------------------------------------

// Hero
app.get('/api/hero', (req, res) => {
  db.all('SELECT * FROM hero', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.post('/api/hero', (req, res) => {
  const { title, subtitle, img, slug } = req.body;
  db.run('INSERT INTO hero (title, subtitle, img, slug) VALUES (?, ?, ?, ?)', [title, subtitle, img, slug], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, subtitle, img, slug });
  });
});
app.put('/api/hero/:id', (req, res) => {
  const { title, subtitle, img, slug } = req.body;
  db.run('UPDATE hero SET title = ?, subtitle = ?, img = ?, slug = ? WHERE id = ?', 
    [title, subtitle, img, slug, req.params.id], 
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});
app.delete('/api/hero/:id', (req, res) => {
  db.run('DELETE FROM hero WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Brands
app.get('/api/brands', (req, res) => {
  db.all('SELECT * FROM brands', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.post('/api/brands', (req, res) => {
  const { name, logo } = req.body;
  db.run('INSERT INTO brands (name, logo) VALUES (?, ?)', [name, logo], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, logo });
  });
});
app.put('/api/brands/:id', (req, res) => {
  const { name, logo } = req.body;
  db.run('UPDATE brands SET name = ?, logo = ? WHERE id = ?', [name, logo, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
app.delete('/api/brands/:id', (req, res) => {
  db.run('DELETE FROM brands WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Stats
app.get('/api/stats', (req, res) => {
  db.all('SELECT * FROM stats', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.post('/api/stats', (req, res) => {
  const { value, label } = req.body;
  db.run('INSERT INTO stats (value, label) VALUES (?, ?)', [value, label], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, value, label });
  });
});
app.put('/api/stats/:id', (req, res) => {
  const { value, label } = req.body;
  db.run('UPDATE stats SET value = ?, label = ? WHERE id = ?', [value, label, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
app.delete('/api/stats/:id', (req, res) => {
  db.run('DELETE FROM stats WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Ticker
app.get('/api/ticker', (req, res) => {
  db.all('SELECT * FROM ticker', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => ({ id: r.id, message: r.message })));
  });
});
app.post('/api/ticker', (req, res) => {
  const { message } = req.body;
  db.run('INSERT INTO ticker (message) VALUES (?)', [message], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message });
  });
});
app.put('/api/ticker/:id', (req, res) => {
  const { message } = req.body;
  db.run('UPDATE ticker SET message = ? WHERE id = ?', [message, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
app.delete('/api/ticker/:id', (req, res) => {
  db.run('DELETE FROM ticker WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Contact
app.get('/api/contact', (req, res) => {
  db.get('SELECT * FROM contact ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});
app.post('/api/contact', (req, res) => {
  const { owner, phone, phoneFormatted, whatsappUrl } = req.body;
  db.run('DELETE FROM contact', err => { // Only keep 1 row
    db.run('INSERT INTO contact (owner, phone, phoneFormatted, whatsappUrl) VALUES (?, ?, ?, ?)', 
      [owner, phone, phoneFormatted, whatsappUrl], 
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, owner, phone, phoneFormatted, whatsappUrl });
      }
    );
  });
});

// ----------------------------------------------------
// Catalog Routes (Categories & Products)
// ----------------------------------------------------

app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories', (err, cats) => {
    if (err) return res.status(500).json({ error: err.message });
    // For each category, fetch products
    db.all('SELECT * FROM products', (err2, prods) => {
      if (err2) return res.status(500).json({ error: err2.message });
      const result = cats.map(cat => {
        cat.products = prods.filter(p => p.categoryId === cat.id);
        return cat;
      });
      res.json(result);
    });
  });
});

app.post('/api/products', (req, res) => {
  const { id, categorySlug, name, brand, price, stock, code, color, image, description } = req.body;
  
  db.get('SELECT id FROM categories WHERE slug = ?', [categorySlug], (err, cat) => {
    if (err || !cat) return res.status(404).json({ error: 'Category not found' });
    
    db.run(`INSERT INTO products (id, categoryId, name, brand, price, stock, code, color, image, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [id, cat.id, name, brand, price, stock, code, color, image, description], 
      function(err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ success: true });
      });
  });
});

app.put('/api/products/:id', (req, res) => {
  const { categorySlug, name, brand, image, description } = req.body;
  db.get('SELECT id FROM categories WHERE slug = ?', [categorySlug], (err, cat) => {
    if (err || !cat) return res.status(404).json({ error: 'Category not found' });
    
    db.run('UPDATE products SET categoryId = ?, name = ?, brand = ?, image = ?, description = ? WHERE id = ?', 
      [cat.id, name, brand, image, description, req.params.id], 
      function(err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ success: true });
    });
  });
});

app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/api/products/delete-bulk', (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'No IDs provided' });
  }
  const placeholders = ids.map(() => '?').join(',');
  db.run(`DELETE FROM products WHERE id IN (${placeholders})`, ids, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
