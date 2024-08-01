<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to fetch puzzle');
const { user } = useAuth();
// console.log(user.value);
const store = useLeaderBoardStore();
if (user.value) {
    await store.loadLeaderBoard(puzzleId.value);
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
    <h2 v-if="!user?.id">You must first sign in to see the leaderboard</h2>
    <LeaderBoardContainer v-else />
</template>
<style scoped></style>
