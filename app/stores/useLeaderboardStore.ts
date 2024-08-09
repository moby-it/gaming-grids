import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', () => {
    const loading = ref(false);
    const users = ref<LeaderboardUsers>([{ username: '', rank: 0, userScore: 900 }]);
    async function loadLeaderboard(puzzleId: string) {
        loading.value = true;
        const { data } = await useFetch(`/api/leaderboard/?puzzleId=${puzzleId}`, {
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
        const data = await $fetch(`/api/leaderboard/?puzzleId=${puzzleId}`);
        users.value = data;
        loading.value = false;
    }
    return { loading, users, loadLeaderboard, loadLeaderBoardClient: loadLeaderboardClient };
});
