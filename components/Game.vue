<script setup lang="ts">
import { } from "../composables/UseGame"
import { type Cell } from '~/utils/cells';
const selectedCell = ref<Cell>({
    x: -1,
    y: -1,
    value: ''
});

const showSearch = computed(() => ((selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && guesses.value > 0));
const searchBar = ref(null);
const { name, cells, restrictions, guesses, cellAnswers } = await useGame();
onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});

function handlePlayerChosen(playerName: string): void {
    if (guesses.value > 0) {
        cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = playerName;
        --guesses.value;
    }
    resetSelectedCell(selectedCell.value);
}
</script>

<template>
    <section id="game" class="game">
        <main>
            <section class="search-container">
                <Search @player-chosen="handlePlayerChosen" v-if="showSearch" ref="searchBar"
                    :selectedCell="selectedCell" />
            </section>
            <Grid :name="name" :cells="cells" :restrictions="restrictions" :selectedCell="selectedCell"
                :guesses="guesses" :possible-answers="cellAnswers" />
        </main>
        <Guesses class="guesses" :guesses="guesses" />
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
