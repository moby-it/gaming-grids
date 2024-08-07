<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';
const props = defineProps<{ users: { userName: string; rank: number; userScore: number }[] }>();
const { user } = useAuth();
const currentUser = computed(() => props.users.find((u) => u.userName === user.value?.name));
const supabase: SupabaseClient = useSupabaseClient();
</script>

<template>
    <section class="container">
        <section class="header">
            <h2>Leaderboard</h2>
        </section>
        <ul>
            <section class="list-item">
                <LeaderBoardItem v-if="currentUser" :user="currentUser!" class="current-user" />
                <LeaderBoardItem v-for="user of users" :user="user" />
            </section>
        </ul>
    </section>
</template>

<style scoped>
.container {
    width: calc(var(--cell) * 3);
    margin-top: var(--gap-4);
    background-color: var(--primary-900);
    color: white;
    border: 1px solid var(--accent-300);
    border-radius: var(--radius);
    text-align: center;
}
.current-user {
    color: var(--primary-900);
    border-radius: calc(var(--radius) * 2);
    margin: var(--gap-5) 0;
}
.header {
    width: 100%;
    border-bottom: 1px solid var(--accent-300);
    color: var(--accent-300);
}
@media (width <= 576px) {
    .container {
        width: calc(var(--cell) * 4);
    }
}
</style>
