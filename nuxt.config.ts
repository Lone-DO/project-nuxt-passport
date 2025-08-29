import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/color-mode'],
  vite: {
    plugins: [tailwindcss()],
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
