<script setup lang="ts">
type Champion = { name: string; id: string; rarityScore: number };
const props = defineProps<{
    championNames: string[][];
    championIds: string[][];
    rarityScores: number[][];
}>();
const puzzleStore = usePuzzleStore();
const { name, restrictions, status, possibleAnswers } = storeToRefs(puzzleStore);

const selectedCell = inject<Ref<Cell>>('selectedCell');
function getChampion(x: number, y: number): Champion | undefined {
    return {
        name: props.championNames[x - 1][y - 1],
        id: props.championIds[x - 1][y - 1],
        rarityScore: props.rarityScores[x - 1][y - 1],
    };
}
const getX = (n: number) => Math.ceil(n / 3);
const getY = (n: number) => (n % 3 === 0 ? 3 : n % 3);

function onCellClick(x: number, y: number) {
    if (!selectedCell?.value || status.value === 'completed' || getChampion(x, y)?.name) return;
    selectedCell.value = {
        x,
        y,
        possibleAnswers: possibleAnswers.value[x - 1][y - 1],
    };
    setTimeout(() => {
        document.getElementById('search-player')?.focus();
    }, 0);
}
</script>
<template>
    <section class="grid-container">
        <RestrictionCell style="grid-area: title; color: var(--accent-300)" :text="name" />
        <RestrictionCell
            :style="{ 'grid-area': 'col-restriction-' + (index + 1) }"
            v-for="(restriction, index) in restrictions.column"
            :text="restriction.name"
        />
        <RestrictionCell
            :style="{ 'grid-area': 'row-restriction-' + (index + 1) }"
            v-for="(restriction, index) in restrictions.row"
            :text="restriction.name"
        />
        <Cell
            v-for="n in 9"
            :champion="getChampion(getX(n), getY(n))"
            :x="getX(n)"
            :y="getY(n)"
            @click="onCellClick(getX(n), getY(n))"
        />
    </section>
</template>

<style>
main {
    display: flex;
    justify-content: center;
}
.grid-container {
    max-width: fit-content;
    padding: var(--gap-4);
    gap: 0;
    display: grid;
    grid-template-areas:
        'title col-restriction-1 col-restriction-2 col-restriction-3'
        'row-restriction-1 champion-cell champion-cell champion-cell'
        'row-restriction-2 champion-cell champion-cell champion-cell'
        'row-restriction-3 champion-cell champion-cell champion-cell';
}
@media (width <= 768px) {
    .grid-container {
        margin-right: calc(var(--cell) / 2);
    }
}
@media (width <= 426px) {
    .grid-container {
        margin: 0;
    }
}
</style>
