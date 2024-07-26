<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = route.query.puzzleDate ? (route.query.puzzleDate as string) : '';
const puzzleIdStore = usePuzzleIdStore();
const { puzzleId } = storeToRefs(puzzleIdStore);
const { user } = useAuth();
puzzleIdStore.getPuzzleId(puzzleDate);
const puzzleStore = usePuzzleStore();
const { guesses, status } = storeToRefs(puzzleStore);
const mostPopularStore = useMostPopularStore();
const { championNames, championIds, rarityScores, loading } = storeToRefs(mostPopularStore);
await mostPopularStore.loadMostPopular(puzzleId.value);
onMounted(async () => {
    loading.value = true;
    if (!user.value && puzzleId) {
        const puzzle = await getLocalPuzzle(puzzleId.value);
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
            const puzzle = await getLocalPuzzle(puzzleId.value);
            puzzleStore.storeLocalPuzzle(puzzle);
            loading.value = false;
        }
    }, 0);
});
</script>
<template>
    <h1 v-if="loading" class="message">Loading...</h1>
    <h1 v-else-if="status === 'in progress'" class="message">Complete puzzle first</h1>
    <Grid
        v-else-if="status === 'completed'"
        :champion-names="championNames"
        :champion-ids="championIds"
        :rarity-scores="rarityScores"
    />
    <h1 v-else="!puzzleId" class="message">Puzzle not found</h1>
</template>
<style scoped>
.message {
    margin-top: var(--cell);
    color: var(--accent-300);
}
</style>
