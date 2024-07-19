import { defineStore } from 'pinia';

export const useMostPopularStore = defineStore('most-popular', () => {
    const loading = ref<boolean>(true);
    const cells = ref<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const championIds = ref<(string | null)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const rarityScore = ref<(number | null)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const puzzleStore = usePuzzleStore();

    const { guesses, name, restrictions } = storeToRefs(puzzleStore);
    const headers = useRequestHeaders(['cookie']);
    async function loadMostPopular(puzzleId: string) {
        loading.value = true;
        const data = await $fetch(`/api/most-popular/?puzzleId=${puzzleId}`, { headers });
        cells.value = data.mostPopularChampions;
        championIds.value = data.championIds;
        rarityScore.value = data.rarityScore;
    }

    return {
        name,
        guesses,
        restrictions,
        cells,
        championIds,
        rarityScore,
        loading,
        loadMostPopular,
    };
});
