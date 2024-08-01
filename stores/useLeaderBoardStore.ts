import { defineStore } from 'pinia';
export const useLeaderBoardStore = defineStore('leaderboard', () => {
    const loading = ref<boolean>(false);
    const users = ref<{ id: string; rank: number; score: number }[]>([]);
    async function loadLeaderBoard(puzzleId: string) {
        loading.value = true;
        const { data, error } = await useFetch(`/api/leader-board/?puzzleId=${puzzleId}`, {
            key: `leader-board${puzzleId}`,
            getCachedData: (key, nuxtApp) => {
                return nuxtApp.payload.data[key];
            },
        });

        // if (!data) throw createError('failed to get leader-board');
        console.log(data.value);
        loading.value = false;
    }
    async function loadLeaderBoardClient(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/leader-board/?puzzleId=${puzzleId}`);
        console.log(data);
    }
    return { loading, users, loadLeaderBoard, loadLeaderBoardClient };
});
