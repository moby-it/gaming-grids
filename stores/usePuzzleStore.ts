import { defineStore } from 'pinia';
export const usePuzzleStore = defineStore('puzzle', () => {
    const loading = ref(true);
    const guesses = ref<number>(9);
    const isAnonPuzzle = ref(true);
    const championNames: Ref<string[][]> = ref([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const championIds: Ref<string[][]> = ref([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const rarityScores: Ref<number[][]> = ref([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const possibleAnswers = ref<number[][]>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const name = ref<string>('');
    const restrictions = ref<{ row: string[]; column: string[] }>({ row: [], column: [] });
    const status = computed<GameStatus>(() => (guesses.value > 0 ? 'in progress' : 'completed'));

    function storeLocalPuzzle(LocalPuzzle: PuzzleBody) {
        championIds.value = LocalPuzzle.championIds;
        championNames.value = LocalPuzzle.championNames;
        rarityScores.value = LocalPuzzle.rarityScores;
        guesses.value = LocalPuzzle.guesses;
    }
    function updatePuzzle(
        x: number,
        y: number,
        champion: { name: string; id: string },
        score: number
    ) {
        if (score >= 0) {
            championNames.value[x - 1][y - 1] = champion.name;
            championIds.value[x - 1][y - 1] = champion.id;
            rarityScores.value[x - 1][y - 1] = score;
        }
        --guesses.value;
    }
    async function loadPuzzleClient(puzzleId: string) {
        loading.value = true;
        const headers = useRequestHeaders(['cookie']);
        const puzzleBody = await $fetch(`/api/puzzle/?puzzleId=${puzzleId}`, {
            headers,
        });
        if (!puzzleBody) throw createError('failed to get puzzle body');
        name.value = puzzleBody.name;
        championIds.value = puzzleBody.championIds;
        championNames.value = puzzleBody.championNames;
        rarityScores.value = puzzleBody.rarityScores;
        restrictions.value = puzzleBody.restrictions;
        possibleAnswers.value = puzzleBody.possibleAnswers;
        guesses.value = puzzleBody.guesses;
        loading.value = false;
    }
    async function loadPuzzle(puzzleId: string) {
        loading.value = true;
        const headers = useRequestHeaders(['cookie']);
        const { data: puzzleBody } = await useFetch(`/api/puzzle/?puzzleId=${puzzleId}`, {
            headers,
        });
        if (!puzzleBody.value) throw createError('failed to get puzzle body');
        name.value = puzzleBody.value.name;
        championIds.value = puzzleBody.value.championIds;
        championNames.value = puzzleBody.value.championNames;
        rarityScores.value = puzzleBody.value.rarityScores;
        restrictions.value = puzzleBody.value.restrictions;
        possibleAnswers.value = puzzleBody.value.possibleAnswers;
        guesses.value = puzzleBody.value.guesses;
        if (headers.cookie) isAnonPuzzle.value = false;
        loading.value = false;
    }
    return {
        loading,
        name,
        isAnonPuzzle,
        championIds,
        championNames,
        rarityScores,
        restrictions,
        guesses,
        possibleAnswers,
        status,
        loadPuzzle,
        loadPuzzleClient,
        updatePuzzle,
        storeLocalPuzzle,
    };
});
