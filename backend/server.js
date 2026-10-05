require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./database');
const cloudflareR2 = require('./cloudflareR2');

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());


// Setup uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// R2 Streaming Image Proxy Route with local disk fallback
app.get('/uploads/:filename', async (req, res) => {
  const filename = req.params.filename;
  const fileKey = `uploads/${filename}`;

  if (cloudflareR2.isR2Configured()) {
    try {
      const obj = await cloudflareR2.getObjectFromR2(fileKey);
      if (obj && obj.Body) {
        res.setHeader('Content-Type', obj.ContentType || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        if (typeof obj.Body.pipe === 'function') {
          return obj.Body.pipe(res);
        } else {
          const byteArray = await obj.Body.transformToByteArray();
          return res.send(Buffer.from(byteArray));
        }
      }
    } catch (err) {
      console.error('Error streaming from R2:', err.message);
    }
  }

  // Local fallback
  const localFile = path.join(uploadsDir, filename);
  if (fs.existsSync(localFile)) {
    return res.sendFile(localFile);
  }
  res.status(404).send('File not found');
});

// Serve R2 public assets (/r2-media/{*path})
app.get('/r2-media/{*path}', async (req, res) => {
  const r2Key = Array.isArray(req.params.path) ? req.params.path.join('/') : (req.params.path || '');
  if (cloudflareR2.isR2Configured() && r2Key) {
    try {
      const obj = await cloudflareR2.getObjectFromR2(r2Key);
      if (obj && obj.Body) {
        res.setHeader('Content-Type', obj.ContentType || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        if (typeof obj.Body.pipe === 'function') {
          return obj.Body.pipe(res);
        } else {
          const byteArray = await obj.Body.transformToByteArray();
          return res.send(Buffer.from(byteArray));
        }
      }
    } catch (e) {}
  }
  res.status(404).send('Media not found');
});



// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir));


// Multer in-memory upload storage
const upload = multer({ storage: multer.memoryStorage() });

// Cloudflare status endpoint
app.get('/api/cloudflare/status', async (req, res) => {
  try {
    const status = await cloudflareR2.checkR2Status();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload Endpoint (Cloudflare R2 with fallback to local disk)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Attempt Cloudflare R2 Upload if configured
  if (cloudflareR2.isR2Configured()) {
    try {
      const r2Url = await cloudflareR2.uploadToR2(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      return res.json({ url: r2Url, storage: 'cloudflare_r2' });
    } catch (err) {
      console.error('Cloudflare R2 Upload failed, falling back to local storage:', err.message);
    }
  }

  // Fallback: save to local disk
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(req.file.originalname) || '.png';
    const filename = uniqueSuffix + ext;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, req.file.buffer);

    const publicUploadsDir = path.join(__dirname, '..', 'public', 'uploads');
    try {
      if (!fs.existsSync(publicUploadsDir)) fs.mkdirSync(publicUploadsDir, { recursive: true });
      fs.writeFileSync(path.join(publicUploadsDir, filename), req.file.buffer);
    } catch (e) {}

    const imageUrl = `/uploads/${filename}`;
    return res.json({ url: imageUrl, storage: 'local' });
  } catch (err) {
    console.error('Local file write error:', err);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
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
  const targetId = req.params.id;
  const queryName = req.query.name || targetId;
  const decodedTarget = decodeURIComponent(targetId);
  const decodedName = decodeURIComponent(queryName);

  db.run(
    'DELETE FROM brands WHERE id = ? OR LOWER(name) = LOWER(?) OR LOWER(name) = LOWER(?) OR LOWER(REPLACE(name, " ", "-")) = LOWER(?)',
    [targetId, decodedTarget, decodedName, decodedTarget],
    function (err) {
      if (err) console.error('Error deleting brand from DB:', err);

      db.run(
        'DELETE FROM products WHERE LOWER(brand) = LOWER(?) OR LOWER(brand) = LOWER(?)',
        [decodedTarget, decodedName],
        function (pErr) {
          if (pErr) console.error('Error deleting brand products from DB:', pErr);
          res.json({ success: true });
        }
      );
    }
  );
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
      const cleanUrl = (u) => {
        if (typeof u === 'string' && u.includes('/uploads/')) {
          return `/uploads/${u.split('/uploads/')[1]}`;
        }
        return u;
      };
      const processedProds = prods.map(p => {
        if (p.image) p.image = cleanUrl(p.image);
        if (p.images) {
          try {
            let parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            if (Array.isArray(parsed)) p.images = parsed.map(cleanUrl);
          } catch(e) {}
        }
        return p;
      });
      const result = cats.map(cat => {
        cat.products = processedProds.filter(p => p.categoryId === cat.id);
        return cat;
      });
      res.json(result);
    });
  });
});

app.post('/api/products', (req, res) => {
  const { id, categorySlug, name, brand, price, stock, code, color, image, images, description } = req.body;
  const cleanUrl = (u) => (typeof u === 'string' && u.includes('/uploads/')) ? `/uploads/${u.split('/uploads/')[1]}` : u;
  const cleanImage = cleanUrl(image);
  const cleanImagesArr = Array.isArray(images) ? images.map(cleanUrl) : (cleanImage ? [cleanImage] : null);
  const imagesStr = cleanImagesArr ? JSON.stringify(cleanImagesArr) : null;
  const slugToUse = categorySlug || 'toilets';
  
  const insertProductWithCatId = (catId) => {
    db.run(`INSERT INTO products (id, categoryId, name, brand, price, stock, code, color, image, images, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [id, catId, name, brand, price, stock, code, color, cleanImage, imagesStr, description], 
      function(err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ success: true });
      });
  };

  db.get('SELECT id FROM categories WHERE slug = ?', [slugToUse], (err, cat) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!cat) {
      const formattedName = slugToUse.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      db.run('INSERT INTO categories (slug, name, hint, icon) VALUES (?, ?, ?, ?)',
        [slugToUse, formattedName, 'Custom Collection', '📦'],
        function(err3) {
          if (err3) return res.status(500).json({ error: err3.message });
          insertProductWithCatId(this.lastID);
        }
      );
    } else {
      insertProductWithCatId(cat.id);
    }
  });
});

app.put('/api/products/:id', (req, res) => {
  const { categorySlug, name, brand, color, image, images, description } = req.body;
  const cleanUrl = (u) => (typeof u === 'string' && u.includes('/uploads/')) ? `/uploads/${u.split('/uploads/')[1]}` : u;
  const cleanImage = cleanUrl(image);
  const cleanImagesArr = Array.isArray(images) ? images.map(cleanUrl) : (cleanImage ? [cleanImage] : null);
  const imagesStr = cleanImagesArr ? JSON.stringify(cleanImagesArr) : null;
  const slugToUse = categorySlug || 'toilets';

  const updateProductWithCatId = (catId) => {
    db.run('UPDATE products SET categoryId = ?, name = ?, brand = ?, color = ?, image = ?, images = ?, description = ? WHERE id = ?', 
      [catId, name, brand, color, cleanImage, imagesStr, description, req.params.id], 
      function(err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ success: true });
    });
  };

  db.get('SELECT id FROM categories WHERE slug = ?', [slugToUse], (err, cat) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!cat) {
      const formattedName = slugToUse.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      db.run('INSERT INTO categories (slug, name, hint, icon) VALUES (?, ?, ?, ?)',
        [slugToUse, formattedName, 'Custom Collection', '📦'],
        function(err3) {
          if (err3) return res.status(500).json({ error: err3.message });
          updateProductWithCatId(this.lastID);
        }
      );
    } else {
      updateProductWithCatId(cat.id);
    }
  });
});

app.delete('/api/products/:id', (req, res) => {
  const targetId = req.params.id;
  const decodedTarget = decodeURIComponent(targetId);
  db.run('DELETE FROM products WHERE id = ? OR LOWER(name) = LOWER(?)', [targetId, decodedTarget], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/api/products/delete-bulk', (req, res) => {
  const { ids, names } = req.body;
  const idList = Array.isArray(ids) ? ids : [];
  const nameList = Array.isArray(names) ? names : [];

  if (idList.length === 0 && nameList.length === 0) {
    return res.status(400).json({ error: 'No IDs or names provided' });
  }

  const idPlaceholders = idList.map(() => '?').join(',');
  const namePlaceholders = nameList.map(() => '?').join(',');

  let query = 'DELETE FROM products WHERE ';
  const params = [];

  if (idList.length > 0 && nameList.length > 0) {
    query += `id IN (${idPlaceholders}) OR LOWER(name) IN (${namePlaceholders})`;
    params.push(...idList, ...nameList.map(n => n.toLowerCase()));
  } else if (idList.length > 0) {
    query += `id IN (${idPlaceholders})`;
    params.push(...idList);
  } else {
    query += `LOWER(name) IN (${namePlaceholders})`;
    params.push(...nameList.map(n => n.toLowerCase()));
  }

  db.run(query, params, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
