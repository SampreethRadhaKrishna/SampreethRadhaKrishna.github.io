import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (SampreethRadhaKrishna.github.io) is served from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
});
