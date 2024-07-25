import { defineStore } from 'pinia';

export const useMostPopularStore = defineStore('most-popular', () => {
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
    const puzzleStore = usePuzzleStore();
    const { loading } = storeToRefs(puzzleStore);

    const headers = useRequestHeaders(['cookie']);
    async function loadMostPopular(puzzleId: string) {
        await puzzleStore.loadPuzzle(puzzleId!);
        loading.value = true;
        const data = await $fetch(`/api/most-popular/?puzzleId=${puzzleId}`, { headers });
        championIds.value = data.championIds;
        championNames.value = data.championNames;
        rarityScores.value = data.rarityScores;
    }

    return {
        championNames,
        championIds,
        rarityScores,
        loading,
        loadMostPopular,
    };
});
