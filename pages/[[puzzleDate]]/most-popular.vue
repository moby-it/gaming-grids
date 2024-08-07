<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId, error } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (error.value) throw createError(error.value);
if (!puzzleId.value) throw createError('puzzle id not found');
const { user } = useAuth();

const puzzleStore = usePuzzleStore();
const { name, guesses, status } = storeToRefs(puzzleStore);
if (!name.value) await puzzleStore.loadPuzzle(puzzleId.value);

const mostPopularStore = useMostPopularStore();
const { championNames, rarityScores, loading } = storeToRefs(mostPopularStore);
if (status.value === 'completed') await mostPopularStore.loadMostPopular(puzzleId.value);

onMounted(async () => {
    if (!user.value && puzzleId.value) {
        const puzzle = await getLocalPuzzle(puzzleId.value);
        guesses.value = puzzle.guesses;
        if (status.value === 'completed')
            await mostPopularStore.loadMostPopularClient(puzzleId.value);
    }
});

const selectedCell = ref<Cell>({ x: -1, y: -1 });
provide('selectedCell', selectedCell);
</script>
<template>
    <section>
        <NavBar />
        <h2 v-if="status === 'in progress'" class="message">Complete puzzle first</h2>
        <h1 v-else-if="loading" class="message">Loading...</h1>
        <Grid
            id="most-popular-grid"
            v-else
            :champion-names="championNames"
            :rarity-scores="rarityScores"
        />
    </section>
</template>
<style scoped>
.message {
    text-align: center;
    margin-top: var(--cell);
    color: var(--accent-300);
}
</style>
