import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.resolve(rootDir, 'public/images');

async function optimizeFolder(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file === 'hvman-mascot') continue;
      await optimizeFolder(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    if (!imageExtensions.includes(ext)) continue;

    const isIconFolder = dir.includes('hvman-icon');
    if (stat.size < 30000 && !isIconFolder && !file.includes('logo')) {
      continue;
    }

    console.log(`Processing: ${path.relative(imagesDir, fullPath)} (${(stat.size / 1024).toFixed(1)} KB)`);

    try {
      const metadata = await sharp(fullPath).metadata();
      let pipeline = sharp(fullPath);

      let targetPath = fullPath;
      let targetExt = ext;

      const lowerFile = file.toLowerCase();
      const isCameraOrGallery = lowerFile.startsWith('dsc') || 
                                lowerFile.startsWith('img') || 
                                lowerFile.startsWith('gallery');

      const originalExt = path.extname(file);
      if (isCameraOrGallery && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
        targetExt = '.webp';
        targetPath = path.join(dir, path.basename(file, originalExt) + '.webp');
      }

      let maxWidth = 1200;
      if (isIconFolder) {
        maxWidth = 150;
      } else if (file.includes('logo') || file.includes('icon')) {
        maxWidth = 300;
      } else if (file.includes('cold-brew') || file.includes('espresso') || file.includes('matcha') || file.includes('ice-cream')) {
        maxWidth = 500;
      }

      if (metadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      if (targetExt === '.webp') {
        pipeline = pipeline.webp({ quality: 80 });
      } else if (targetExt === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
      } else if (targetExt === '.jpg' || targetExt === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
      }

      const tempPath = targetPath + '.tmp';
      await pipeline.toFile(tempPath);

      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      fs.renameSync(tempPath, targetPath);

      if (targetPath !== fullPath) {
        fs.unlinkSync(fullPath);
        console.log(`-> Converted to WebP: ${path.relative(imagesDir, targetPath)}`);
      } else {
        console.log(`-> Optimized in-place: ${path.relative(imagesDir, targetPath)}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

(async () => {
  console.log('Starting image optimization...');
  await optimizeFolder(imagesDir);
  console.log('Image optimization finished successfully!');
})();
