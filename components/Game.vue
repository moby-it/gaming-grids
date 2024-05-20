<script setup lang="ts">
import { resetSelectedCell, type Cell } from '~/utils/cells';
const selectedCell = ref<Cell>({
    x: -1,
    y: -1,
    value: ''
});
const showSearch = computed(() => selectedCell.value.x >= 0 || selectedCell.value.y >= 0);
const searchBar = ref(null);
const { name, cells, restrictions, guesses } = await useGame();

if (process.client) {
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            resetSelectedCell(selectedCell.value);
        }
    });
}
onClickOutside(searchBar, () => {
    resetSelectedCell(selectedCell.value);
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
    <section class="game">
        <main>
            <section class="search-container">
                <Search ref="searchBar" @player-chosen="handlePlayerChosen" v-if="showSearch" />
            </section>
            <Grid :name="name" :cells="cells" :restrictions="restrictions" :selectedCell="selectedCell" />
        </main>
        <footer class="guesses">
            <h1>
                guesses left:
            </h1>
            <h2> {{ guesses }} </h2>
        </footer>
    </section>

</template>

<style>
main {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 5px;
    padding: 0;

}

.game {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

}

.search-container {
    position: absolute;
    width: 400px;
    height: 50px;
    margin-left: 9rem;
    margin-top: 5rem;
}

footer {
    text-align: center;
    margin-left: 30px;
}
</style>
