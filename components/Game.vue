<script setup lang="ts">
import type { Champion } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';
import { savePuzzleToLocalStorage } from '../utils/puzzle';
const props = defineProps<{ puzzleId: string }>();
const { user } = useAuth();
const puzzleId = props.puzzleId;
const puzzleStore = usePuzzleStore();
await puzzleStore.loadPuzzle(puzzleId);
const { name, guesses, loading, championNames, championIds, rarityScores, status } =
    storeToRefs(puzzleStore);
const supabase: SupabaseClient = useSupabaseClient();
onMounted(async () => {
    if (!user.value) {
        loading.value = true;
        const puzzle = await getLocalPuzzle(puzzleId);
        puzzleStore.storeLocalPuzzle(puzzle);
    }
    loading.value = false;
});
const selectedCell = ref<Cell>({ x: -1, y: -1 });
const searchBar = ref(null);
const { showScoreModal, scoreModal, hideScoreModal } = useScoreModal();
const score = computed<number>(() => +getScore(rarityScores.value).toFixed(2));
provide('status', status);
provide('selectedCell', selectedCell);

const showSearch = computed(
    () => (selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && status.value === 'in progress'
);
supabase.auth.onAuthStateChange(async (event) => {
    // onAuthStateChange cannot handle async requests
    // see https://github.com/supabase/auth-js/issues/762
    // see https://github.com/nuxt-modules/supabase/issues/273
    setTimeout(async () => {
        if (event === 'SIGNED_OUT') {
            loading.value = true;
            const puzzle = await getLocalPuzzle(puzzleId);
            puzzleStore.storeLocalPuzzle(puzzle);
            loading.value = false;
        }
    }, 0);
});

onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell);
    const target = e.target as HTMLTextAreaElement;
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});
async function giveUp() {
    guesses.value = 0;
    showScoreModal();
    if (user.value) {
        await $fetch(`/api/giveUp/`, {
            method: 'PUT',
            body: JSON.stringify({
                puzzleId: puzzleId,
            }),
        });
    } else {
        savePuzzleToLocalStorage(championIds.value, championNames.value, 0);
    }
}
async function handleChampionChosen(champion: Champion): Promise<void> {
    if (guesses.value <= 0) return;
    const { score } = await $fetch(`/api/submit-champion/`, {
        method: 'POST',
        body: JSON.stringify({
            x: selectedCell.value.x,
            y: selectedCell.value.y,
            puzzleId: puzzleId,
            champion: champion.id,
            userId: user.value?.id ?? null,
        }),
    });

    puzzleStore.updatePuzzle(selectedCell.value.x, selectedCell.value.y, champion, score);
    if (!user.value) {
        savePuzzleToLocalStorage(championIds.value, championNames.value, guesses.value);
    }
    resetSelectedCell(selectedCell);
    if (status.value === 'completed') showScoreModal();
}
</script>

<template>
    <section class="loading" v-if="loading">
        <h1>Loading...</h1>
    </section>
    <section v-else class="game">
        <main>
            <Modal :show="showSearch">
                <Search @champion-chosen="handleChampionChosen" ref="searchBar" />
            </Modal>
            <ClientOnly>
                <Grid
                    :champion-ids="championIds"
                    :champion-names="championNames"
                    :rarity-scores="rarityScores"
                />
            </ClientOnly>
        </main>
        <ClientOnly>
            <section class="options">
                <Summary
                    :name="name"
                    :score="score"
                    :rarity-scores="rarityScores"
                    :status="status"
                    :score-modal="scoreModal"
                    @show-modal="showScoreModal"
                    @hide-modal="hideScoreModal"
                />
                <section v-if="status === 'completed'">
                    <p>Rarity score</p>
                    <h1>{{ score }}</h1>
                </section>
                <GiveUp v-if="status === 'in progress'" @give-up="giveUp" />
                <Guesses v-if="status === 'in progress'" class="guesses" :guesses="guesses" />
            </section>
        </ClientOnly>
    </section>
</template>

<style scoped>
.options {
    margin-top: var(--gap-4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
}
.game {
    display: flex;
    flex-direction: column;
    align-items: center;
}
main {
    flex-direction: column;
    align-items: center;
}
.loading {
    margin-top: var(--cell);
    color: var(--accent-300);
}
@media (width <= 768px) {
    .options {
        align-items: center;
    }
}
</style>
