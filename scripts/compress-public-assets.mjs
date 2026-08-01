import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

async function compressPublicAssets() {
  console.log(`Found ${files.length} static images in public/ folder.`);

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const stat = fs.statSync(filePath);
    const origMB = (stat.size / (1024 * 1024)).toFixed(2);

    if (stat.size > 200 * 1024) { // Only compress files larger than 200KB
      const baseName = path.basename(file, path.extname(file));
      const webpPath = path.join(publicDir, `${baseName}.webp`);

      await sharp(filePath)
        .webp({ quality: 80, effort: 4 })
        .toFile(webpPath);

      const newStat = fs.statSync(webpPath);
      const newMB = (newStat.size / (1024 * 1024)).toFixed(2);
      console.log(`Optimized ${file} (${origMB} MB -> ${newMB} MB WebP)`);
    }
  }
}

compressPublicAssets().catch(err => {
  console.error('Error optimizing assets:', err);
});
