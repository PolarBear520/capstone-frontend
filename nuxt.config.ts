// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineStore } from 'pinia'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: ''
    }
  },

  sourcemap: {
    server: true,
    client: true
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/ui",
    'arco-design-nuxt-module',
    'nuxt-lodash',
    '@pinia-plugin-persistedstate/nuxt',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  pinia:{
    autoImports:[defineStore],
  },
  imports:{
    dirs:["./stores"],
  },


})