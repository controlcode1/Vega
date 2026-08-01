import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const framesDir = path.join(process.cwd(), 'public/frames');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} JPG frame files.`);

async function compressFrames() {
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  // Inspect first image
  const meta = await sharp(path.join(framesDir, files[0])).metadata();
  console.log(`Original image dimensions: ${meta.width}x${meta.height}`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const srcPath = path.join(framesDir, file);
    const baseName = path.basename(file, '.jpg');
    const destPath = path.join(framesDir, `${baseName}.webp`);

    const origStats = fs.statSync(srcPath);
    totalOriginalSize += origStats.size;

    await sharp(srcPath)
      .webp({ quality: 72, effort: 4 })
      .toFile(destPath);

    const newStats = fs.statSync(destPath);
    totalNewSize += newStats.size;

    if ((i + 1) % 50 === 0 || i === files.length - 1) {
      console.log(`Processed ${i + 1}/${files.length} frames...`);
    }
  }

  const origMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const newMB = (totalNewSize / (1024 * 1024)).toFixed(2);
  const savings = (((totalOriginalSize - totalNewSize) / totalOriginalSize) * 100).toFixed(1);

  console.log(`\n Compression Finished!`);
  console.log(`Original Size: ${origMB} MB`);
  console.log(`Compressed Size: ${newMB} MB`);
  console.log(`Saved: ${savings}% bandwidth!`);
}

compressFrames().catch(err => {
  console.error('Error compressing frames:', err);
});
