import { defineStore } from 'pinia';
export const useLeaderboardStore = defineStore('leaderboard', () => {
    const loading = ref<boolean>(false);
    const users = ref<{ userName: string; rank: number; userScore: number }[]>([
        { userName: '', rank: 0, userScore: 900 },
    ]);
    async function loadLeaderboard(puzzleId: string) {
        loading.value = true;
        const { data, error } = await useFetch(`/api/leader-board/?puzzleId=${puzzleId}`, {
            key: `leader-board${puzzleId}`,
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
        if (!data) throw createError('Leaderboard data is null');
        users.value = data;
    }
    return { loading, users, loadLeaderboard, loadLeaderBoardClient: loadLeaderboardClient };
});
