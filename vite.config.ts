import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const page = (name: string) => fileURLToPath(new URL(`./${name}/index.html`, import.meta.url));

export default defineConfig({
  // Nom du dépôt GitHub : les pages sont servies sous https://<utilisateur>.github.io/carriere/
  base: '/carriere/',
  // Multi-page : pas de fallback SPA, une URL inconnue renvoie une 404
  appType: 'mpa',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      // Chaque page déclare son propre manifest (public/manifest-plan-*.webmanifest)
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,jpg,svg,webmanifest}'],
        navigateFallback: null,
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^edit$/, /^focus$/],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  build: {
    // `rolldownOptions` est le nouveau nom de `rollupOptions` depuis Vite 8
    rolldownOptions: {
      input: {
        'plan-1': page('plan-1'),
        'plan-2': page('plan-2'),
      },
    },
  },
});
