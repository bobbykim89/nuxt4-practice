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
      meta: [
        {
          name: 'description',
          content:
            'A photo blog dedicated to Manguito, an adorable peach-faced lovebird, showcasing daily moments and charming antics.',
        },
        { property: 'og:title', content: 'Royal Pollo' },
        {
          property: 'og:description',
          content:
            'A photo blog dedicated to Manguito, an adorable peach-faced lovebird, showcasing daily moments and charming antics.',
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale/f_auto/v1700694621/assets/manguito_page_logo192.png',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Royal Pollo',
        },
        {
          name: 'twitter:description',
          content:
            'A photo blog dedicated to Manguito, an adorable peach-faced lovebird, showcasing daily moments and charming antics.',
        },
        {
          name: 'twitter:image',
          content:
            'https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale/f_auto/v1700694621/assets/manguito_page_logo192.png',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
