import { Champion, PuzzleInfo } from '#imports';
import { defineStore } from 'pinia';

export const usePuzzleStore = defineStore('puzzle', () => {
    const loading = ref(true);
    const guesses = ref<number>(9);
    const championNames: Ref<string[][]> = ref([
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
    const restrictions = ref<PuzzleInfo['restrictions']>({
        row: [],
        column: [],
    });
    const status = computed<GameStatus>(() => (guesses.value > 0 ? 'in progress' : 'completed'));

    function storeLocalPuzzle(localPuzzle: PuzzleBody) {
        championNames.value = localPuzzle.championNames;
        rarityScores.value = localPuzzle.rarityScores;
        guesses.value = localPuzzle.guesses;
    }
    function updatePuzzle(x: number, y: number, champion: Champion, score: number) {
        if (score >= 0) {
            championNames.value[x - 1][y - 1] = champion.name;
            rarityScores.value[x - 1][y - 1] = score;
        }
        --guesses.value;
    }

    function patchPuzzle(puzzleBody: PuzzleBody & PuzzleInfo) {
        name.value = puzzleBody.name;
        championNames.value = puzzleBody.championNames;
        rarityScores.value = puzzleBody.rarityScores;
        restrictions.value = puzzleBody.restrictions;
        possibleAnswers.value = puzzleBody.possibleAnswers;
        guesses.value = puzzleBody.guesses;
    }
    function reset() {
        name.value = '';

        championNames.value = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        rarityScores.value = [
            [100, 100, 100],
            [100, 100, 100],
            [100, 100, 100],
        ];
        possibleAnswers.value = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        restrictions.value = { row: [], column: [] };
        guesses.value = 9;
    }
    async function loadPuzzleClient(puzzleId: string) {
        loading.value = true;
        const puzzleBody = await $fetch(`/api/puzzle/?puzzleId=${puzzleId}`);
        if (!puzzleBody) throw createError('failed to get puzzle body');
        patchPuzzle(puzzleBody);
        loading.value = false;
    }
    async function loadPuzzle(puzzleId: string) {
        loading.value = true;
        const { data: puzzleBody, error } = await useFetch(`/api/puzzle/?puzzleId=${puzzleId}`, {
            key: `puzzle-${puzzleId}`,
            getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
        });
        if (error.value) throw createError(error.value);

        patchPuzzle(puzzleBody.value!);
        loading.value = false;
    }
    return {
        loading,
        name,
        championNames,
        rarityScores,
        restrictions,
        guesses,
        possibleAnswers,
        status,
        reset,
        loadPuzzle,
        loadPuzzleClient,
        updatePuzzle,
        storeLocalPuzzle,
    };
});
