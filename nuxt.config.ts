import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      thingSpeakReadKey: import.meta.env.NUXT_PUBLIC_API_KEY,
    },
  },
  modules: ["vuetify-nuxt-module", "nuxt-lucide-icons", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
