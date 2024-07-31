<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to fetch puzzle');
const { user } = useAuth();
// console.log(user.value);
if (user.value) {
    console.log(puzzleId.value);
    const { data, error } = await supabase.rpc('test', {
        p_id: puzzleId.value,
        u_id: user.value.id,
    });
    console.log(data);
}
// const puzzleStore = usePuzzleStore();
// const { name, guesses, status } = storeToRefs(puzzleStore);
// if (!name.value) await puzzleStore.loadPuzzle(puzzleId.value);

// const mostPopularStore = useMostPopularStore();
// const { championNames, championIds, rarityScores, loading } = storeToRefs(mostPopularStore);
// if (status.value === 'completed') await mostPopularStore.loadMostPopular(puzzleId.value);

// onMounted(async () => {
//     if (!user.value && puzzleId.value) {
//         const puzzle = await getLocalPuzzle(puzzleId.value);
//         guesses.value = puzzle.guesses;
//         if (status.value === 'completed')
//             await mostPopularStore.loadMostPopularClient(puzzleId.value);
//     }
// });

// const selectedCell = ref<Cell>({ x: -1, y: -1 });
// provide('selectedCell', selectedCell);
</script>
<template>
    <h1>Leaderboard</h1>
</template>
<style scoped></style>
