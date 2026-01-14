import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: 'localhost', // Changed from 0.0.0.0 for security - use localhost for dev
  },
  plugins: [react()],
  // SECURITY: NEVER expose API keys in the client bundle
  // API keys should be used server-side only
  // If you need to call an API from the client, use a backend proxy
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
