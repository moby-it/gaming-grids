import { defineStore } from 'pinia';

export const usePuzzleIdStore = defineStore('puzzleId', () => {
    const puzzleId: Ref<string> = ref('');
    const loading = ref<boolean>(false);

    async function getPuzzleId(puzzleDate: string) {
        if (puzzleId.value) return;
        loading.value = true;
        const data = await $fetch(`/api/puzzle-id?puzzleDate=${puzzleDate}`);
        puzzleId.value = data;  
        loading.value = false;
    }
    return { puzzleId, loading, getPuzzleId };
});
