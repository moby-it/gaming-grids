<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const { user } = useAuth();
const route = useRoute();
const puzzleDate = route.params.puzzleDate as string | undefined;
const { data: puzzleId, error } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (error.value) throw createError(error.value);
if (!puzzleId.value) throw createError('puzzle id not found');
const store = usePuzzleStore();
const { name } = storeToRefs(store);
if (!name.value) await store.loadPuzzle(puzzleId.value);

onMounted(async () => {
    if (!user.value && puzzleId.value) {
        const puzzle = await getLocalPuzzle(puzzleId.value);
        const rarityScores = await getRarityScores(puzzleId.value, puzzle.championNames);
        store.storeLocalPuzzle({ ...puzzle, rarityScores });
    }
});
</script>
<template>
    <section>
        <NavBar />
        <h1 v-if="!puzzleId">Puzzle not found</h1>
        <Game v-else :puzzle-id="puzzleId" />
    </section>
</template>
<style scoped>
section:has(.nav-container) {
    display: flex;
    flex-direction: column;
}
</style>
