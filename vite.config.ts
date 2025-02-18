import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import copy from 'rollup-plugin-copy';
// Make sure to import your themePlugin correctly:
import themePlugin from 'your-theme-plugin-path'; // adjust the path as needed

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    copy({
      targets: [
        // Copy _redirects to the root of the dist folder.
        { src: 'client/public/_redirects', dest: 'dist' }
      ],
      hook: 'writeBundle' // Ensures the file is copied after the bundle is generated.
    }),
    // Include additional plugins in development if needed
    ...(process.env.NODE_ENV !== 'production' && process.env.REPL_ID !== undefined
      ? [
          // Add any dev-specific plugins here.
        ]
      : [])
  ],
  build: {
    // Output all build files (including index.html) directly to the "dist" folder.
    outDir: 'dist'
  },
  // Specify the folder containing your static assets.
  publicDir: 'client/public'
});
