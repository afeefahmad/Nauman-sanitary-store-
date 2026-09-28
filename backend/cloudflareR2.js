const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadBucketCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');

function getR2Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

function isR2Configured() {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    process.env.CLOUDFLARE_R2_BUCKET_NAME
  );
}

/**
 * Upload a buffer file to Cloudflare R2
 * @param {Buffer} buffer - File buffer
 * @param {string} originalname - Original file name
 * @param {string} mimetype - MIME type (e.g. image/png)
 * @returns {Promise<string>} Public URL of uploaded image
 */
async function uploadToR2(buffer, originalname, mimetype) {
  const client = getR2Client();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!client || !bucketName) {
    throw new Error('Cloudflare R2 is not fully configured (missing Account ID or Bucket Name).');
  }

  const ext = path.extname(originalname) || '.png';
  const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
  const fileKey = `uploads/${filename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: buffer,
    ContentType: mimetype || 'application/octet-stream'
  });

  await client.send(command);

  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (publicBaseUrl && publicBaseUrl.trim() !== '' && !publicBaseUrl.includes('r2.cloudflarestorage.com')) {
    const cleanBase = publicBaseUrl.replace(/\/$/, '');
    return `${cleanBase}/${fileKey}`;
  }

  // Use local backend proxy URL for clean browser rendering
  return `http://localhost:5000/uploads/${filename}`;
}

/**
 * Get object stream/data from Cloudflare R2
 * @param {string} fileKey - Key of the file in the bucket
 */
async function getObjectFromR2(fileKey) {
  const client = getR2Client();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!client || !bucketName) return null;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey
    });
    return await client.send(command);
  } catch (err) {
    return null;
  }
}

/**
 * Delete a file from Cloudflare R2
 * @param {string} fileKey - Key of the file in the bucket
 */
async function deleteFromR2(fileKey) {
  const client = getR2Client();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!client || !bucketName) return;

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileKey
  });

  await client.send(command);
}

/**
 * Check connection status to Cloudflare R2
 */
async function checkR2Status() {
  const configured = isR2Configured();
  const details = {
    hasApiToken: Boolean(process.env.CLOUDFLARE_API_TOKEN),
    hasAccessKeyId: Boolean(process.env.CLOUDFLARE_R2_ACCESS_KEY_ID),
    hasSecretAccessKey: Boolean(process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY),
    hasAccountId: Boolean(process.env.CLOUDFLARE_ACCOUNT_ID),
    hasBucketName: Boolean(process.env.CLOUDFLARE_R2_BUCKET_NAME),
    bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME || null,
    isConfigured: configured,
    connected: false,
    message: ''
  };

  if (!configured) {
    details.message = 'Cloudflare credentials present, but Cloudflare Account ID is missing in .env.';
    return details;
  }

  try {
    const client = getR2Client();
    const command = new HeadBucketCommand({ Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME });
    await client.send(command);
    details.connected = true;
    details.message = 'Successfully connected to Cloudflare R2 bucket!';
  } catch (err) {
    details.connected = false;
    details.message = `Connection failed: ${err.message}`;
  }

  return details;
}

module.exports = {
  isR2Configured,
  uploadToR2,
  getObjectFromR2,
  deleteFromR2,
  checkR2Status
};

