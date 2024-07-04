<script setup lang="ts">
import type { Champion } from '~/utils/fetchResults';
const puzzleId = await usePuzzle('2024-06-22');
const { user } = useAuth();
const { name, cells, restrictions, guesses, cellMetadata, selectedCell, handleChampionChosen } = await useGame(user.value?.id, puzzleId.value);
const searchBar = ref(null);
const showSearch = computed(() => ((selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && guesses.value > 0));
onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});
</script>

<template>
    <ClientOnly>
        <section id="game" class="game">
            <main>
                <section class="search-container">
                    <Search @champion-chosen="handleChampionChosen" v-if="showSearch" ref="searchBar"
                        :selectedCell="selectedCell" />
                </section>
                <Grid :name="name" :cells="cells" :restrictions="restrictions" :selectedCell="selectedCell"
                    :cellMetadata="cellMetadata" :guesses="guesses" />
            </main>
            <Guesses class="guesses" :guesses="guesses" />
        </section>
    </ClientOnly>
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
    margin-left: var(--cell)
}

@media (max-width:768px) {
    .game {
        flex-direction: column;
    }

    .guesses {
        margin-top: var(--gap-5);
        margin-left: var(--cell);
    }
}
</style>
