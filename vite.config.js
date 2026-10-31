import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy para evitar el error de CORS de la API
const proxy = {
  '/api': {
    target: 'https://gundam-api.pages.dev',
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
