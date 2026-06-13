import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // rolldown-vite: object-form manualChunks unsupported, use advancedChunks
        advancedChunks: {
          groups: [
            { name: 'playcanvas', test: /node_modules[\\/]playcanvas/ },
            { name: 'react', test: /node_modules[\\/]react/ },
            { name: 'vendor', test: /node_modules[\\/](howler|gsap)/ },
          ],
        },
      },
    },
  },
});
