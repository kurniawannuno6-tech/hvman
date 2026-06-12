import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../public/images');

const files = fs.readdirSync(imagesDir);
for (const file of files) {
  if (file.toLowerCase().endsWith('.webp')) {
    const lowerFile = file.toLowerCase();
    if (lowerFile.includes('.jpg.webp') || lowerFile.includes('.png.webp') || lowerFile.includes('.jpeg.webp')) {
      const newName = file
        .replace(/\.jpg\.webp$/i, '.webp')
        .replace(/\.jpeg\.webp$/i, '.webp')
        .replace(/\.png\.webp$/i, '.webp');
        
      const oldPath = path.join(imagesDir, file);
      const newPath = path.join(imagesDir, newName);
      
      if (fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
      }
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${newName}`);
    }
  }
}
