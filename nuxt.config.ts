// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@nuxt/image", '@nuxtjs/supabase'],
  devtools: { enabled: true },
  supabase: {
    url: "https://znvtpipzflqwytxrtatb.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudnRwaXB6Zmxxd3l0eHJ0YXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NDQ2MjksImV4cCI6MjAyNTMyMDYyOX0.GR_EKQT3J8BaOrJMgTAhziM41FqHx7sPo3RaBaF32zA",
    redirect: false
  }
});