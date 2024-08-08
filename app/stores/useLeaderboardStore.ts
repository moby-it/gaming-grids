import { defineStore } from 'pinia';
import * as v from 'valibot';

export const useLeaderboardStore = defineStore('leaderboard', () => {
    const loading = ref<boolean>(false);
    const users = ref<LeaderboardUsers>([{ username: '', rank: 0, userScore: 900 }]);
    async function loadLeaderboard(puzzleId: string) {
        loading.value = true;
        const { data, error } = await useFetch(`/api/leaderboard/?puzzleId=${puzzleId}`, {
            key: `leaderboard-${puzzleId}`,
            getCachedData: (key, nuxtApp) => {
                return nuxtApp.payload.data[key];
            },
        });
        if (!data.value) throw createError('Leaderboard data is null');
        users.value = data.value;
        loading.value = false;
    }
    async function loadLeaderboardClient(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/leader-board/?puzzleId=${puzzleId}`);
        const { output, success, issues } = v.safeParse(LeaderboardUsersSchema, data);
        if (!success) {
            console.error(JSON.stringify(issues));
            throw createError('failed to parse leaderboard users');
        }
        users.value = output;
    }
    return { loading, users, loadLeaderboard, loadLeaderBoardClient: loadLeaderboardClient };
});
