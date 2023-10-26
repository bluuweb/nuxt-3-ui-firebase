// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: "123",

    // Public keys that are exposed to the client
    public: {
      apiKey: process.env.FIRE_APIKEY,
      authDomain: process.env.FIRE_AUTHDOMAIN,
      projectId: process.env.FIRE_PROJECTID,
      storageBucket: process.env.FIRE_STORAGEBUCKET,
      messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
      appId: process.env.FIRE_APPID,
    },
  },
  // ssr: false,
  routeRules: {
    "/": { prerender: true },
    "/admin/**": { ssr: false }, // client side rendering
  },
});
