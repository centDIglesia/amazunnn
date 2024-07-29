import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Ensure the root is set to the current directory
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'amazon.html'),
      },
    },
  },
  server: {
    open: '/amazon.html', // Automatically open amazon.html when the server starts
  },
});