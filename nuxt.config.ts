// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2023-04-03',
    future: {
        compatibilityVersion: 4,
    },
    runtimeConfig: {
        public: {
            BUCKET_URL: 'https://hermeldb.moby-it.com/storage/v1/object/public/champions',
        },
    },
    modules: [
        '@vueuse/nuxt',
        '@nuxt/image',
        '@nuxtjs/supabase',
        '@nuxt/test-utils/module',
        '@pinia/nuxt',
    ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    devtools: { enabled: true },
    supabase: {
        url: 'https://hermeldb.moby-it.com',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzIyMjAwNDAwLAogICJleHAiOiAxODc5OTY2ODAwCn0.A2CnJ1KEJcEtb_01pC9WVKoadTXwGBT8yC3SSFGKZZA',
        redirect: false,
    },
    imports: {
        dirs: ['stores'],
    },
});
