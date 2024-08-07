import { defineStore } from 'pinia';
export const useLeaderBoardStore = defineStore('leaderboard', () => {
    const loading = ref<boolean>(false);
    const users = ref<{ userName: string; rank: number; userScore: number }[]>([]);
    async function loadLeaderBoard(puzzleId: string) {
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
    async function loadLeaderBoardClient(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/leader-board/?puzzleId=${puzzleId}`);
        if (!data) throw createError('Leaderboard data is null');
        users.value = data;
    }
    return { loading, users, loadLeaderBoard, loadLeaderBoardClient };
});
