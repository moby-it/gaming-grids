import { defineStore } from 'pinia';
export const useLeaderBoardStore = defineStore('leaderboard', () => {
    const loading = ref<boolean>(false);
    const users = ref<{ user_name: string; rank: number; user_score: number }[]>([]);
    async function loadLeaderBoard(puzzleId: string) {
        loading.value = true;
        const { data, error } = await useFetch(`/api/leader-board/?puzzleId=${puzzleId}`, {
            key: `leader-board${puzzleId}`,
            getCachedData: (key, nuxtApp) => {
                return nuxtApp.payload.data[key];
            },
        });
        // console.log(data.value, 'x');

        users.value = data.value;
        loading.value = false;
    }
    async function loadLeaderBoardClient(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/leader-board/?puzzleId=${puzzleId}`);
        // console.log(data, 'y');
        users.value = data;
    }
    return { loading, users, loadLeaderBoard, loadLeaderBoardClient };
});
