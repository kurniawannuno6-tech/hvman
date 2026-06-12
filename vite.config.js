import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function galleryManifestPlugin() {
  const imagesDir = path.resolve(__dirname, 'public/images')
  const manifestPath = path.resolve(__dirname, 'src/data/gallery-manifest.json')
  
  const blacklist = [
    'logo',
    'icon',
    'mascot',
    'location',
    'cold-brew',
    'espresso',
    'matcha',
    'ice-cream'
  ]

  function generateManifest() {
    try {
      if (!fs.existsSync(imagesDir)) {
        console.warn(`[Gallery Plugin] Images directory does not exist: ${imagesDir}`);
        return;
      }

      const files = fs.readdirSync(imagesDir);
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.bmp'];
      
      const images = files
        .filter(file => {
          const fullPath = path.join(imagesDir, file);
          if (!fs.statSync(fullPath).isFile()) return false;
          
          const ext = path.extname(file).toLowerCase();
          if (!imageExtensions.includes(ext)) return false;

          const lowerFile = file.toLowerCase();
          const isExplicitGallery = lowerFile.startsWith('gallery') || 
                                    lowerFile.startsWith('dsc') || 
                                    lowerFile.startsWith('img');

          if (!isExplicitGallery) {
            return !blacklist.some(keyword => lowerFile.includes(keyword));
          }
          return true;
        })
        .map(file => {
          const baseName = path.basename(file, path.extname(file));
          let title = '';
          const isCamera = /^dsc\d+/i.test(baseName) || /^img_\d+/i.test(baseName);
          
          if (isCamera) {
            const parts = baseName.split(/[-_]/);
            const cleanedParts = parts.filter(p => !/^dsc\d+/i.test(p) && !/^img/i.test(p) && !/^\d+$/.test(p.trim()));
            const titleJoined = cleanedParts.join(' ').trim();
            title = titleJoined ? titleJoined : 'HVMAN Moment';
          } else {
            title = baseName.replace(/^gallery-?/, '').replace(/[-_]/g, ' ').trim();
          }

          title = title.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

          if (/^\d+$/.test(title)) {
            title = `Moment ${title}`;
          }

          // Determine category
          let category = 'Other';
          const lowerFile = file.toLowerCase();
          const startsWithGallery = lowerFile.startsWith('gallery');
          if (startsWithGallery) {
            category = 'Café & Food';
          } else if (lowerFile.startsWith('dsc') || lowerFile.startsWith('img')) {
            category = 'Moments';
          }

          return {
            src: `/images/${file}`,
            title,
            category,
            filename: file
          };
        });

      const dir = path.dirname(manifestPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(manifestPath, JSON.stringify(images, null, 2));
      console.log(`[Gallery Plugin] Manifest generated successfully with ${images.length} images.`);
    } catch (err) {
      console.error('[Gallery Plugin] Error generating manifest:', err);
    }
  }

  return {
    name: 'gallery-manifest-plugin',
    buildStart() {
      generateManifest();
    },
    configureServer(server) {
      const watcher = server.watcher;
      watcher.add(imagesDir);
      
      const onChange = (filePath) => {
        if (filePath.includes(imagesDir)) {
          generateManifest();
        }
      };
      
      watcher.on('add', onChange);
      watcher.on('change', onChange);
      watcher.on('unlink', onChange);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), galleryManifestPlugin()],
})

