<script setup lang="ts">
import type { Champion, GameStatus } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';

const props = defineProps<{ puzzleId: string }>();
const puzzleId = props.puzzleId;

const supabase: SupabaseClient = useSupabaseClient();
const { user } = useAuth();
const game = await useGame(puzzleId, user.value?.id);

const selectedCell = ref<Cell>({ x: -1, y: -1 });
const guesses = ref(game.guesses);
const cells = ref(game.cells);
const cellsMetadata = ref(game.cellsMetadata);
const searchBar = ref(null);

const status = computed<GameStatus>(() => (guesses.value > 0 ? 'in progress' : 'completed'));

provide('status', status);
provide('cellsMetadata', cellsMetadata);
provide('selectedCell', selectedCell);

const showSearch = computed(
    () => (selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && status.value === 'in progress'
);

supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT') {
        const puzzleBody = await getPuzzleBody(supabase, puzzleId);
        cells.value = puzzleBody.cells;
        guesses.value = puzzleBody.guesses;
    }
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
    if (score > 0) {
        cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = champion.name;
        cellsMetadata.value.championIds[selectedCell.value.x - 1][selectedCell.value.y - 1] =
            champion.id;
        cellsMetadata.value.rarityScore[selectedCell.value.x - 1][selectedCell.value.y - 1] = score;
    }
    guesses.value--;

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
}
</script>

<template>
    <section class="game">
        <main>
            <section class="search-container">
                <Search @champion-chosen="handleChampionChosen" v-if="showSearch" ref="searchBar" />
            </section>
            <ClientOnly>
                <Grid :name="game.name" :cells="cells" :restrictions="game.restrictions" />
            </ClientOnly>
        </main>
        <ClientOnly>
            <Guesses class="guesses" :guesses="guesses" />
        </ClientOnly>
    </section>
</template>

<style scoped>
.game {
    display: flex;
    justify-content: center;
    align-items: center;
}

.guesses {
    margin-left: var(--gap-6);
    margin-top: var(--cell);
}

main {
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

.search-container {
    position: absolute;
    margin-top: var(--margin-sm);
    margin-left: var(--cell);
}

@media (max-width: 768px) {
    .game {
        flex-direction: column;
    }

    .guesses {
        margin-top: var(--gap-5);
        margin-left: var(--cell);
    }
}
</style>
