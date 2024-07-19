<script setup lang="ts">
import type { Champion, GameStatus } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';
const props = defineProps<{ puzzleId: string }>();
const supabase: SupabaseClient = useSupabaseClient();
const { user } = useAuth();
const puzzleId = props.puzzleId;
const mostPopularStore = useMostPopularStore();
const { name, restrictions, guesses, cells, championIds, rarityScore, loading } =
    storeToRefs(mostPopularStore);
const status = computed<GameStatus>(() => (guesses.value > 0 ? 'in progress' : 'completed'));
await mostPopularStore.loadMostPopular(puzzleId);
onMounted(async () => {
    loading.value = true;
    if (!user.value) {
        const puzzleBody = await getLocalPuzzle(puzzleId);
        guesses.value = puzzleBody.guesses;
    }
    loading.value = false;
});
provide('championIds', championIds);
provide('rarityScore', rarityScore);
supabase.auth.onAuthStateChange(async (event) => {
    setTimeout(async () => {
        if (event === 'SIGNED_OUT') {
            loading.value = true;
            const puzzleBody = await getLocalPuzzle(puzzleId);
            guesses.value = puzzleBody.guesses;
            loading.value = false;
        }
    }, 0);
});
</script>

<template>
    <section class="game">
        <NavBar />
        <main>
            <section v-if="loading" class="message">
                <h1>Loading...</h1>
            </section>
            <section v-else-if="status === 'in progress'" class="message">
                <h1>Complete the puzzle first.</h1>
            </section>
            <MostPopularGrid
                v-else
                :name="name"
                :cells="cells"
                :restrictions="restrictions"
                :guesses="guesses"
            />
        </main>
    </section>
</template>

<style scoped>
.game {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.message {
    margin-top: var(--cell);
}
@media (width <= 768px) {
    .options {
        align-items: center;
    }
}
</style>
