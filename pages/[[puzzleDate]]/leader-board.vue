<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to fetch puzzle');
const { user } = useAuth();
const store = useLeaderBoardStore();
const { users, loading } = storeToRefs(store);
if (user.value) {
    await store.loadLeaderBoard(puzzleId.value);
}
const puzzleStore = usePuzzleStore();
const { name, status } = storeToRefs(puzzleStore);
if (!name.value) await puzzleStore.loadPuzzle(puzzleId.value);
</script>
<template>
    <section class="container">
        <NavBar />
        <section v-if="!user?.id" class="message">
            <h2>You must first sign in to see the leaderboard</h2>
        </section>
        <section v-else-if="loading" class="message">
            <h1>Loading...</h1>
        </section>
        <LeaderBoardContainer :users="users" v-else-if="status === 'completed'" />
        <section v-else class="message">
            <h2>Complete puzzle first</h2>
        </section>
    </section>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.message {
    text-align: center;
    margin-top: var(--cell);
    color: var(--accent-300);
}
</style>
