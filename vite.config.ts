import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration for Optimized Production Build
 * Performance: Code splitting, tree-shaking, minification, compression
 * Security: Removes console logs in production
 */
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Enable minification for production (terser)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    // Code splitting for better caching and performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries - cached separately
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Form and validation
          'form': ['react-hook-form', '@emailjs/browser', 'dompurify'],
          // Icons library
          'icons': ['lucide-react'],
        },
        // Optimize asset naming for better caching
        // Format: asset-type/name-hash.extension
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          // Separate assets by type for better organization
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Performance: Optimize chunk size warning threshold
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting for better performance
    cssCodeSplit: true,
    // Disable source maps in production for smaller bundle size
    sourcemap: false,
    // Target ES2020+ for modern browsers (better performance)
    target: 'ES2020',
    // Performance: Reduce bundle size
    emptyOutDir: true,
    // Performance: Reports when gzip is available
    reportCompressedSize: true,
    // Performance: Configures limits for displayed information
    assetsInlineLimit: 4096, // Inline small assets
  },
  // Performance: Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    // Ensure these are pre-bundled
    esbuildOptions: {
      target: 'ES2020',
    },
  },
  // Performance: Configure dev server for better development experience
  server: {
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
    strictPort: false,
    watch: {
      usePolling: false,
    },
  },
});