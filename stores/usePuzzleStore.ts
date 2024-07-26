import { defineStore } from 'pinia';
export const usePuzzleStore = defineStore('puzzle', () => {
    const puzzleIdStore = usePuzzleIdStore();
    const { loading } = storeToRefs(puzzleIdStore);
    const guesses = ref<number>(9);
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
    async function loadPuzzle(puzzleId: string) {
        if (name.value) return;
        loading.value = true;
        const headers = useRequestHeaders(['cookie']);
        const data = await $fetch(`/api/puzzle/?puzzleId=${puzzleId}`, { headers });
        name.value = data.name;
        championIds.value = data.championIds;
        championNames.value = data.championNames;
        rarityScores.value = data.rarityScores;
        restrictions.value = data.restrictions;
        possibleAnswers.value = data.possibleAnswers;
        guesses.value = data.guesses;
        loading.value = false;
    }
    return {
        loading,
        name,
        championIds,
        championNames,
        rarityScores,
        restrictions,
        guesses,
        possibleAnswers,
        status,
        loadPuzzle,
        updatePuzzle,
        storeLocalPuzzle,
    };
});
