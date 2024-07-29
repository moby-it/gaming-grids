<script setup lang="ts">
useHead({
    script: [
        {
            defer: true,
            src: '/login.js',
        },
        {
            async: true,
            src: 'https://accounts.google.com/gsi/client',
        },
    ],
    link: [
        {
            rel: 'stylesheet',
            href: '/styles.css',
        },
    ],
});
const supabase = useSupabaseClient();
onMounted(() => {
    window.supabase = supabase;
});
const store = usePuzzleStore();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to fetch puzzle');

supabase.auth.onAuthStateChange(async (event) => {
    // onAuthStateChange cannot handle async requests
    // see https://github.com/supabase/auth-js/issues/762
    // see https://github.com/nuxt-modules/supabase/issues/273
    setTimeout(async () => {
        if (event === 'SIGNED_IN' && puzzleId.value) {
            await store.loadPuzzleClient(puzzleId.value);
        }
        if (event === 'SIGNED_OUT' && puzzleId.value) {
            await store.loadPuzzleClient(puzzleId.value);
            clearPuzzleLocalStorage();
        }
    }, 0);
});
</script>
<template>
    <div
        id="g_id_onload"
        data-client_id="710196254096-oio0spi37e8828vqncq360hhfs93t2cf.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
    ></div>
    <Header />
    <section id="modal"></section>
    <main>
        <NuxtPage />
    </main>
</template>
