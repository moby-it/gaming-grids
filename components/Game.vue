<script setup lang="ts">
import type { Champion, GameStatus } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const props = defineProps<{ puzzleId: string }>();
const puzzleId = props.puzzleId;
const { user } = useAuth();
const game = await useGame(puzzleId, user.value?.id);
const selectedCell = ref<Cell>({ x: -1, y: -1 });
const guesses = ref(game.guesses);
const cells = ref(game.cells);
const puzzleMetadata = ref(game.puzzleMetadata);
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
            const puzzleBody = getPuzzleBodyFromLocalStorage();
            puzzleMetadata.value = await getPuzzleMetadata(supabase, puzzleBody.cells, puzzleId);
            cells.value = puzzleBody.cells;
            guesses.value = puzzleBody.guesses;
        }
    }, 0);
});

onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement;
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});
async function handleChampionChosen(champion: Champion): Promise<void> {
    if (guesses.value <= 0) return;
    const { data: score } = await supabase.rpc('champion_chosen', {
        x: selectedCell.value.x,
        y: selectedCell.value.y,
        p_id: puzzleId,
        champion_name: champion.name,
        u_id: user.value?.id ?? null,
    });
    if (score >= 0) {
        cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = champion.name;
        puzzleMetadata.value.championIds[selectedCell.value.x - 1][selectedCell.value.y - 1] =
            champion.id;
        puzzleMetadata.value.rarityScore[selectedCell.value.x - 1][selectedCell.value.y - 1] =
            score;
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
    resetSelectedCell(selectedCell.value);
    if (status.value === 'completed') showScoreModal();
}
</script>

<template>
    <section class="game">
        <main>
            <section class="search-container">
                <Search @champion-chosen="handleChampionChosen" v-if="showSearch" ref="searchBar" />
            </section>
            <ClientOnly>
                <Grid
                    :name="game.name"
                    :cells="cells"
                    :restrictions="game.restrictions"
                    :guesses="guesses"
                />
            </ClientOnly>
        </main>
        <ClientOnly>
            <section class="options">
                <Summary
                    :name="game.name"
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

.search-container {
    position: absolute;
}

@media (width <= 768px) {
    .options {
        align-items: center;
    }
}
</style>
