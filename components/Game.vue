<script setup lang="ts">
const { name, cells, restrictions, guesses } = await useGame();
const selectedCell = ref<Cell>({
    x: -1, y: -1, value: ''
});
const showSearch = computed(() => selectedCell.value.x >= 0 || selectedCell.value.y >= 0);
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
                <Search @player-chosen="handlePlayerChosen" v-if="showSearch" :selected-cell="selectedCell" />
            </section>
            <Grid :name="name" :cells="cells" :restrictions="restrictions" :selectedCell="selectedCell" />
        </main>
        <Guesses :guesses="guesses" />
    </section>

</template>

<style scoped>
.game {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    text-align: center;
    align-content: center;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 5px;
    padding: 0;

}

.search-container {
    position: absolute;
    width: 400px;
    height: 50px;
    margin-left: 9rem;
}

footer {
    font-family: 'Beaufort';
    text-align: center;
    margin-left: 30px;
    font-size: 18px;
    font-weight: 600;
    color: var(--accent-200);
}

@media (max-width:992px) {
    main {
        margin-top: 3px;
    }
}

@media (max-width:768px) {
    main {
        margin-top: 3px;
    }

    .search-container {
        padding-top: 0;
        height: 3rem;
    }
}

@media (width <=576px) {
    .game {
        flex-direction: column;
        text-align: center;
    }
}
</style>
