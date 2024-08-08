<script setup lang="ts">
import { fetchPuzzleIdByDateClient } from './utils/puzzle';

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
const prevAuthState = ref('INITIAL_SESSION');
onMounted(() => {
    (window as any).supabase = supabase;
});
const store = usePuzzleStore();
const { name } = storeToRefs(store);
const route = useRoute();
const puzzleDate = route.params.puzzleDate as string;
const { data: puzzleId, error } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (error.value) throw createError(error.value);
if (!name.value) await store.loadPuzzle(puzzleId.value!);
const { data: champions, error: championsError } = await supabase.from('champion').select();
if (championsError) throw createError('failed to fetch champions');
provide('champions', champions);

supabase.auth.onAuthStateChange(async (event) => {
    if (prevAuthState.value === 'INITIAL_SESSION' && event === 'SIGNED_IN') return;
    if (event === prevAuthState.value) return;
    // onAuthStateChange cannot handle async requests
    // see https://github.com/supabase/auth-js/issues/762
    // see https://github.com/nuxt-modules/supabase/issues/273
    setTimeout(async () => {
        prevAuthState.value = event;
        const puzzleDate = route.params.puzzleDate as string;
        const puzzleId = await fetchPuzzleIdByDateClient(supabase, puzzleDate);
        if (event === 'SIGNED_IN') {
            await store.loadPuzzleClient(puzzleId);
            clearPuzzleLocalStorage(puzzleId);
        }
        if (event === 'SIGNED_OUT') {
            await store.loadPuzzleClient(puzzleId);
        }
    }, 0);
});
</script>
<template>
    <NuxtErrorBoundary>
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
        <NavBar />
        <section id="modal"></section>
        <main>
            <NuxtPage />
        </main>
        <template #error="{ error, clearError }">
            <section class="error">
                <h1>Application failed</h1>
                <h2>{{ error }}</h2>
                <Button :button-class="'accent'" @click="clearError">
                    Go to Home <IconsRightArrow
                /></Button>
            </section>
        </template>
    </NuxtErrorBoundary>
</template>
<style lang="css">
.error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-2);
    margin-top: var(--gap-6);

    p {
        font-size: var(--font-size-l);
    }
    button {
        display: flex;
        align-items: center;
        gap: var(--gap-2);
        align-self: center;
    }
}
</style>
