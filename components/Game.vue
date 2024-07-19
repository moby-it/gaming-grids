<script setup lang="ts">
import type { Champion, GameStatus } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';
const props = defineProps<{ puzzleId: string }>();
const { user } = useAuth();
const puzzleId = props.puzzleId;
const puzzleStore = usePuzzleStore();
await puzzleStore.loadPuzzle(puzzleId);
const { name, restrictions, cells, guesses, puzzleMetadata } = storeToRefs(puzzleStore);
const supabase: SupabaseClient = useSupabaseClient();
onMounted(async () => {
    if (!user.value) {
        const puzzle = await getLocalPuzzle(puzzleId);
        puzzleStore.$patch(() => {
            cells.value = puzzle.cells;
            guesses.value = puzzle.guesses;
            puzzleMetadata.value = puzzle.metadata;
        });
    }
});
const selectedCell = ref<Cell>({ x: -1, y: -1 });
const searchBar = ref(null);
const status = computed<GameStatus>(() => (guesses.value > 0 ? 'in progress' : 'completed'));
const { showScoreModal, scoreModal, hideScoreModal } = useScoreModal();
const score = computed<number>(() => +getScore(puzzleMetadata.value.rarityScore).toFixed(2));
provide('status', status);
provide('puzzleMetadata', puzzleMetadata);
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
            const puzzle = await getLocalPuzzle(puzzleId);
            puzzleStore.$patch(() => {
                cells.value = puzzle.cells;
                guesses.value = puzzle.guesses;
                puzzleMetadata.value = puzzle.metadata;
            });
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
async function handleChampionChosen(champion: Champion): Promise<void> {
    if (guesses.value <= 0) return;
    const { score } = await $fetch(`/api/submitChampion/`, {
        method: 'POST',
        body: JSON.stringify({
            x: selectedCell.value.x,
            y: selectedCell.value.y,
            puzzleId: puzzleId,
            champion: champion.name,
            userId: user.value?.id ?? null,
        }),
    });
    if (score >= 0) {
        puzzleStore.$patch(() => {
            puzzleStore.cells[selectedCell.value.x - 1][selectedCell.value.y - 1] = champion.name;
            puzzleStore.puzzleMetadata.championIds[selectedCell.value.x - 1][
                selectedCell.value.y - 1
            ] = champion.id;
            puzzleStore.puzzleMetadata.rarityScore[selectedCell.value.x - 1][
                selectedCell.value.y - 1
            ] = score;
        });
    }
    --guesses.value;
    if (!user.value) {
        localStorage.setItem(
            'localGame',
            JSON.stringify({
                cells: cells.value,
                guesses: guesses.value,
            })
        );
    }
    resetSelectedCell(selectedCell);
    if (status.value === 'completed') showScoreModal();
}
</script>

<template>
    <section class="game">
        <NavBar :puzzleId="puzzleId" />
        <main>
            <Modal :show="showSearch">
                <Search @champion-chosen="handleChampionChosen" ref="searchBar" />
            </Modal>
            <ClientOnly>
                <Grid :name="name" :cells="cells" :restrictions="restrictions" :guesses="guesses" />
            </ClientOnly>
        </main>
        <ClientOnly>
            <section class="options">
                <Summary
                    :name="name"
                    :score="score"
                    :rarity-scores="puzzleMetadata.rarityScore"
                    :status="status"
                    :score-modal="scoreModal"
                    @show-modal="showScoreModal"
                    @hide-modal="hideScoreModal"
                />
                <section v-if="status === 'completed'">
                    <p>Rarity score</p>
                    <h1>{{ score }}</h1>
                </section>
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
@media (width <= 768px) {
    .options {
        align-items: center;
    }
}
</style>
