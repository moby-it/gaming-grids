<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const { user } = useAuth();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to get puzzle id');
const store = usePuzzleStore();
const { name, guesses } = storeToRefs(store);
if (!name.value) await store.loadPuzzle(puzzleId.value);

onMounted(async () => {
    if (!user.value && puzzleId.value) {
        const puzzle = await getLocalPuzzle(puzzleId.value);
        const rarityScores = await getRarityScores(puzzleId.value, puzzle.championIds);
        store.storeLocalPuzzle({ ...puzzle, rarityScores });
    } else {
        // this is a patch for the specific case in which a user just signs in via google. The cookie is set AFTER the
        // fetch of the HTML page so the app in initialized with unauthenticated data for an authenticated user.
        // with the line below we fetch the puzzle again on the client. The guesses check is a monkey patch but I do not
        // want to introduce more refs to check this.
        if (guesses.value === 9 && puzzleId.value) await store.loadPuzzleClient(puzzleId.value);
    }
});
supabase.auth.onAuthStateChange(async (event) => {
    // onAuthStateChange cannot handle async requests
    // see https://github.com/supabase/auth-js/issues/762
    // see https://github.com/nuxt-modules/supabase/issues/273
    setTimeout(async () => {
        if (event === 'SIGNED_OUT' && puzzleId.value) {
            await store.loadPuzzleClient(puzzleId.value);
            clearPuzzleLocalStorage();
        }
    }, 0);
});
</script>
<template>
    <h1 v-if="!puzzleId">Puzzle not found</h1>
    <Game v-else :puzzle-id="puzzleId" />
</template>
