/**
 * Cloudflare R2 Storage Utilities
 * Uses AWS S3-compatible API (R2 is fully S3-compatible)
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// ── Singleton R2 Client ──────────────────────────────────────────────────────
let _r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (_r2Client) return _r2Client;

  const accountId  = process.env.CLOUDFLARE_R2_ACCOUNT_ID!;
  const accessKey  = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!;
  const secretKey  = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!;

  if (!accountId || !accessKey || !secretKey) {
    throw new Error('[R2] Missing Cloudflare R2 environment variables. Check .env.local');
  }

  _r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId:     accessKey,
      secretAccessKey: secretKey,
    },
  });

  return _r2Client;
}

// ── Upload file to R2 ────────────────────────────────────────────────────────
/**
 * Uploads a Buffer to Cloudflare R2.
 * @param buffer   - The file content as a Buffer
 * @param key      - The object key / path inside the bucket (e.g. "products/img.webp")
 * @param mimeType - MIME type of the file (e.g. "image/webp")
 * @returns The public URL of the uploaded file
 */
export async function uploadToR2(
  buffer:   Buffer,
  key:      string,
  mimeType: string = 'image/webp',
): Promise<string> {
  const client     = getR2Client();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
  const publicUrl  = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!;

  if (!bucketName || !publicUrl) {
    throw new Error('[R2] Missing CLOUDFLARE_R2_BUCKET_NAME or NEXT_PUBLIC_R2_PUBLIC_URL');
  }

  const command = new PutObjectCommand({
    Bucket:      bucketName,
    Key:         key,
    Body:        buffer,
    ContentType: mimeType,
    CacheControl: 'public, max-age=31536000, immutable',
    // Note: R2 does NOT support object-level ACLs.
    // Public access is controlled at bucket level via Custom Domain (assets.vegaarena.com)
  });

  await client.send(command);

  // Return the public CDN URL
  return `${publicUrl.replace(/\/$/, '')}/${key}`;
}

// ── Delete file from R2 ──────────────────────────────────────────────────────
/**
 * Deletes an object from Cloudflare R2.
 * @param key - The object key to delete (extracted from URL)
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client     = getR2Client();
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

  if (!bucketName) {
    throw new Error('[R2] Missing CLOUDFLARE_R2_BUCKET_NAME');
  }

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key:    key,
  });

  await client.send(command);
}

// ── Extract R2 key from public URL ───────────────────────────────────────────
/**
 * Extracts the R2 object key from a full public URL.
 * e.g. "https://assets.vegaarena.com/products/img.webp" → "products/img.webp"
 */
export function r2KeyFromUrl(url: string): string | null {
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? '';
  if (!url || !publicUrl) return null;

  const base = publicUrl.replace(/\/$/, '');
  if (url.startsWith(base)) {
    return url.slice(base.length + 1); // +1 for the "/"
  }
  return null;
}
