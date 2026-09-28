require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./database');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL ? process.env.CLOUDFLARE_R2_PUBLIC_URL.replace(/\/$/, '') : '';

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
  console.error('ERROR: Missing Cloudflare configuration in .env!');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey }
});

const mimeMap = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

async function uploadToR2(filePath, r2Key) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeMap[ext] || 'application/octet-stream';

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: r2Key,
    Body: fileBuffer,
    ContentType: contentType
  });

  await s3.send(command);
  return `${publicUrl}/${r2Key}`;
}

async function verifyObjectInR2(r2Key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: r2Key }));
    return true;
  } catch (err) {
    return false;
  }
}

async function runMigration() {
  console.log('=== STARTING CLOUDFLARE R2 MIGRATION ===');

  const stats = {
    totalImagesFound: 0,
    totalImagesUploaded: 0,
    totalReferencesUpdated: 0,
    totalProductsAffected: 0,
    failedFiles: [],
    unresolvedReferences: [],
    uploadedMap: {}, // local path/URL -> R2 URL
    safeToRemove: []
  };

  const uploadsDir = path.join(__dirname, 'uploads');
  const publicDir = path.join(__dirname, '..', 'public');

  // 1. Upload files in backend/uploads
  const uploadFiles = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
  console.log(`Processing ${uploadFiles.length} files in backend/uploads...`);

  for (const filename of uploadFiles) {
    const filePath = path.join(uploadsDir, filename);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    stats.totalImagesFound++;
    const r2Key = `uploads/${filename}`;

    try {
      const r2Url = await uploadToR2(filePath, r2Key);
      const verified = await verifyObjectInR2(r2Key);

      if (verified) {
        stats.totalImagesUploaded++;
        stats.safeToRemove.push(`backend/uploads/${filename}`);

        // Store mappings for all possible local reference variations
        stats.uploadedMap[`http://localhost:5000/uploads/${filename}`] = r2Url;
        stats.uploadedMap[`https://localhost:5000/uploads/${filename}`] = r2Url;
        stats.uploadedMap[`/uploads/${filename}`] = r2Url;
        stats.uploadedMap[`uploads/${filename}`] = r2Url;
        stats.uploadedMap[filename] = r2Url;
      } else {
        stats.failedFiles.push({ file: filename, reason: 'Verification failed after upload' });
      }
    } catch (err) {
      console.error(`Failed uploading ${filename}:`, err.message);
      stats.failedFiles.push({ file: filename, error: err.message });
    }
  }

  // 2. Upload files in public/
  const publicFiles = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];
  console.log(`Processing ${publicFiles.length} files in public/...`);

  for (const filename of publicFiles) {
    const filePath = path.join(publicDir, filename);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    // Skip non-image/video files if any
    const ext = path.extname(filename).toLowerCase();
    if (!mimeMap[ext]) continue;

    stats.totalImagesFound++;
    const r2Key = `public/${filename}`;

    try {
      const r2Url = await uploadToR2(filePath, r2Key);
      const verified = await verifyObjectInR2(r2Key);

      if (verified) {
        stats.totalImagesUploaded++;
        stats.safeToRemove.push(`public/${filename}`);

        stats.uploadedMap[`/${filename}`] = r2Url;
        stats.uploadedMap[filename] = r2Url;
      } else {
        stats.failedFiles.push({ file: filename, reason: 'Verification failed after upload' });
      }
    } catch (err) {
      console.error(`Failed uploading public asset ${filename}:`, err.message);
      stats.failedFiles.push({ file: filename, error: err.message });
    }
  }

  console.log(`Upload complete. Total uploaded: ${stats.totalImagesUploaded}/${stats.totalImagesFound}`);

  // 3. Update SQLite Database Records
  console.log('Updating SQLite Database...');

  // Update Products
  await new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', async (err, products) => {
      if (err) return reject(err);

      const affectedProductIds = new Set();

      for (const p of products) {
        let isModified = false;
        let newImage = p.image;
        let newImages = p.images;

        // Check primary image
        if (p.image) {
          const match = stats.uploadedMap[p.image] || stats.uploadedMap[`/${p.image.replace(/^\//, '')}`];
          if (match && match !== p.image) {
            newImage = match;
            isModified = true;
            stats.totalReferencesUpdated++;
          }
        }

        // Check gallery images
        if (p.images) {
          try {
            const arr = JSON.parse(p.images);
            if (Array.isArray(arr)) {
              let arrayModified = false;
              const newArr = arr.map(imgStr => {
                const match = stats.uploadedMap[imgStr] || stats.uploadedMap[`/${imgStr.replace(/^\//, '')}`];
                if (match && match !== imgStr) {
                  arrayModified = true;
                  stats.totalReferencesUpdated++;
                  return match;
                }
                return imgStr;
              });

              if (arrayModified) {
                newImages = JSON.stringify(newArr);
                isModified = true;
              }
            }
          } catch (e) {
            console.error(`Error parsing images JSON for product ${p.id}:`, e.message);
          }
        }

        if (isModified) {
          affectedProductIds.add(p.id);
          db.run(
            'UPDATE products SET image = ?, images = ? WHERE id = ?',
            [newImage, newImages, p.id]
          );
        }
      }

      stats.totalProductsAffected = affectedProductIds.size;
      resolve();
    });
  });

  // Update Hero Table
  await new Promise((resolve, reject) => {
    db.all('SELECT * FROM hero', (err, heroes) => {
      if (err) return reject(err);
      for (const h of heroes) {
        if (h.img) {
          const match = stats.uploadedMap[h.img] || stats.uploadedMap[`/${h.img.replace(/^\//, '')}`];
          if (match && match !== h.img) {
            db.run('UPDATE hero SET img = ? WHERE id = ?', [match, h.id]);
            stats.totalReferencesUpdated++;
          }
        }
      }
      resolve();
    });
  });

  // Update Brands Table
  await new Promise((resolve, reject) => {
    db.all('SELECT * FROM brands', (err, brands) => {
      if (err) return reject(err);
      for (const b of brands) {
        if (b.logo) {
          const match = stats.uploadedMap[b.logo] || stats.uploadedMap[`/${b.logo.replace(/^\//, '')}`];
          if (match && match !== b.logo) {
            db.run('UPDATE brands SET logo = ? WHERE id = ?', [match, b.id]);
            stats.totalReferencesUpdated++;
          }
        }
      }
      resolve();
    });
  });

  console.log('Database update completed.');

  // Save the mapping table to JSON for reference
  const mapPath = path.join(__dirname, 'r2_migration_mapping.json');
  fs.writeFileSync(mapPath, JSON.stringify(stats.uploadedMap, null, 2));

  // 4. Output final migration report
  console.log('\n========================================');
  console.log('   MIGRATION REPORT SUMMARY');
  console.log('========================================');
  console.log(`Total images found:           ${stats.totalImagesFound}`);
  console.log(`Total uploaded to R2:        ${stats.totalImagesUploaded}`);
  console.log(`Total references updated:     ${stats.totalReferencesUpdated}`);
  console.log(`Total products affected:      ${stats.totalProductsAffected}`);
  console.log(`Failed files:                 ${stats.failedFiles.length}`);
  console.log(`Unresolved references:        ${stats.unresolvedReferences.length}`);
  console.log('========================================\n');

  if (stats.failedFiles.length > 0) {
    console.log('FAILED FILES:', stats.failedFiles);
  }
}

runMigration().catch(err => {
  console.error('Migration execution error:', err);
});
