import type { PuzzleMetadata } from '#imports';
import { defineStore } from 'pinia';
export const usePuzzleStore = defineStore('puzzle', () => {
    const guesses = ref<number>(0);
    const cells = ref<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const name = ref<string>('');
    const restrictions = ref<{ row: string[]; column: string[] }>({ row: [], column: [] });
    const puzzleMetadata = ref<PuzzleMetadata>({
        possibleAnswers: [],
        championIds: [],
        rarityScore: [],
    });
    const headers = useRequestHeaders(['cookie']);

    async function loadPuzzle(puzzleId: string) {
        const data = await $fetch(`/api/puzzle/?puzzleId=${puzzleId}`, { headers });
        name.value = data.name;
        restrictions.value = data.restrictions;
        guesses.value = data.guesses;
        cells.value = data.cells;
        puzzleMetadata.value = data.puzzleMetadata;
    }
    return {
        name,
        cells,
        restrictions,
        guesses,
        puzzleMetadata,
        loadPuzzle,
    };
});
