<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? getCurrentDate();
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
if (!puzzleId.value) throw createError('failed to fetch puzzle');

const store = useLeaderboardStore();
const { users, loading } = storeToRefs(store);
await store.loadLeaderboard(puzzleId.value);

const puzzleStore = usePuzzleStore();
const { name, status } = storeToRefs(puzzleStore);
if (!name.value) await puzzleStore.loadPuzzle(puzzleId.value);

const { user } = useAuth();
const currentUser = computed(() => users.value.find((u) => u.userName === user.value?.name));
</script>
<template>
    <section class="container">
        <NavBar />
        <section v-if="loading" class="message">
            <h1>Loading...</h1>
        </section>
        <section v-else-if="status === 'completed'" class="container">
            <section class="header">
                <h2>Leaderboard</h2>
            </section>
            <ul>
                <section class="list-item">
                    <LeaderboardItem v-if="currentUser" :user="currentUser!" class="current-user" />
                    <LeaderboardItem v-for="user of users" :user="user" />
                </section>
            </ul>
        </section>
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
