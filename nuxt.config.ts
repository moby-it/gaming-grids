// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@nuxt/image", '@nuxtjs/supabase'],
  devtools: { enabled: true },
  supabase: {
    redirect: false
  }
});