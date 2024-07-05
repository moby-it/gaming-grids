<script setup lang="ts">
const supabase = useSupabaseClient();
const puzzleId = await usePuzzle('2024-06-22');
const { user } = useAuth();
const game = await useGame(puzzleId, user.value?.id);

const selectedCell = ref<Cell>({ x: -1, y: -1 });
const guesses = ref(game.guesses);
const cells = ref(game.cells);
const cellsMetadata = ref(game.cellsMetadata);
const searchBar = ref(null);

const showSearch = computed(
    () => (selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && guesses.value > 0
);

onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement;
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});

supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT') {
        const puzzleBody = await getPuzzleBody(supabase, puzzleId);
        cells.value = puzzleBody.cells;
        guesses.value = puzzleBody.guesses;
    }
});
</script>

<template>
    <section class="game">
        <main>
            <section class="search-container">
                <Search
                    @champion-chosen="game.handleChampionChosen"
                    v-if="showSearch"
                    ref="searchBar"
                    :selectedCell="selectedCell"
                />
            </section>
            <ClientOnly>
                <Grid
                    :name="game.name"
                    :cells="cells"
                    :restrictions="game.restrictions"
                    :selectedCell="selectedCell"
                    :cellMetadata="cellsMetadata"
                    :guesses="guesses"
                />
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
