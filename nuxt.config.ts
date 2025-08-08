// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxt/image'],
  css: ['~/assets/css/styles.css', '~/assets/css/page_transition.scss'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Royal Pollo',
      htmlAttrs: { lang: 'en' },
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  runtimeConfig: {
    manguitoPageUrl: process.env.MANGUITO_PAGE_URL,
  },
  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_URL,
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
        verbatimModuleSyntax: false,
        strict: true,
        types: ['vite/client'],
      },
    },
  },
})
