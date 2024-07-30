import { defineStore } from 'pinia';

export const useMostPopularStore = defineStore('most-popular', () => {
    const loading = ref(false);
    const championIds = ref<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const championNames = ref<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const rarityScores = ref<number[][]>([
        [100, 100, 100],
        [100, 100, 100],
        [100, 100, 100],
    ]);

    async function loadMostPopularClient(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/most-popular/?puzzleId=${puzzleId}`);
        championIds.value = data.championIds;
        championNames.value = data.championNames;
        rarityScores.value = data.rarityScores;
        loading.value = false;
    }
    async function loadMostPopular(puzzleId: string) {
        loading.value = true;
        const { data } = await useFetch(`/api/most-popular/?puzzleId=${puzzleId}`, {
            key: `most-popular-${puzzleId}`,
            getCachedData: (key, nuxtApp) => {
                return nuxtApp.payload.data[key];
            },
        });
        if (!data.value) throw createError('failed to fetch most popular puzzle');
        championIds.value = data.value.championIds;
        championNames.value = data.value.championNames;
        rarityScores.value = data.value.rarityScores;
        loading.value = false;
    }

    return {
        championNames,
        loading,
        championIds,
        rarityScores,
        loadMostPopular,
        loadMostPopularClient,
    };
});
