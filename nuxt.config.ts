import tailwindcss from '@tailwindcss/vite';

import './app/lib/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-csurf',
    'nuxt-maplibre',
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // noDiscovery: true,
      include: [
        'maplibre-gl',
      ],
    },
  },
  eslint: {
    config: {
      standalone: false, // <---
    },
  },
  colorMode: {
    /** Modify `data-theme` attribute on root html element */
    dataValue: 'theme',
  },
});
