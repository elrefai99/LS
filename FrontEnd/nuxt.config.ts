// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },
  modules: [
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@unocss/nuxt',
    "@pinia/nuxt"
  ]
})
