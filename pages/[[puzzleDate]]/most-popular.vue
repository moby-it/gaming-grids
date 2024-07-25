<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const { user } = useAuth();
const puzzleDate = route.params.puzzleDate as string;
const puzzleId = await fetchPuzzleIdByDate(supabase, puzzleDate);
const puzzleStore = usePuzzleStore();
const { guesses, status } = storeToRefs(puzzleStore);
const mostPopularStore = useMostPopularStore();
const { championNames, championIds, rarityScores, loading } = storeToRefs(mostPopularStore);
await mostPopularStore.loadMostPopular(puzzleId!);
onMounted(async () => {
    if (!user.value && puzzleId) {
        const puzzle = await getLocalPuzzle(puzzleId);
        guesses.value = puzzle.guesses;
    }
    loading.value = false;
});
const selectedCell = ref<Cell>({ x: -1, y: -1 });
provide('status', puzzleStore.status);
provide('selectedCell', selectedCell);

supabase.auth.onAuthStateChange(async (event) => {
    // onAuthStateChange cannot handle async requests
    // see https://github.com/supabase/auth-js/issues/762
    // see https://github.com/nuxt-modules/supabase/issues/273
    setTimeout(async () => {
        if (event === 'SIGNED_OUT' && puzzleId) {
            loading.value = true;
            const puzzle = await getLocalPuzzle(puzzleId);
            puzzleStore.storeLocalPuzzle(puzzle);
            loading.value = false;
        }
    }, 0);
});
</script>
<template>
    <h1 v-if="!puzzleId">Puzzle not found</h1>
    <section class="message" v-else-if="loading">
        <h1>Loading...</h1>
    </section>
    <section v-else>
        <section class="message" v-if="status === 'in progress'">
            <h1>Complete puzzle firtst</h1>
        </section>
        <Grid
            v-else
            :champion-names="championNames"
            :champion-ids="championIds"
            :rarity-scores="rarityScores"
        />
    </section>
</template>
<style scoped>
.message {
    margin-top: var(--cell);
    color: var(--accent-300);
}
</style>
