<script setup lang="ts">
const props = defineProps<{
    name: string;
    cells: string[][];
    restrictions: { column: string[]; row: string[] };
    guesses: number;
}>();

function getChampion(x: number, y: number): string | undefined {
    return props.cells?.[x - 1]?.[y - 1];
}
const getX = (n: number) => Math.ceil(n / 3);
const getY = (n: number) => (n % 3 === 0 ? 3 : n % 3);
</script>
<template>
    <section class="grid-container">
        <RestrictionCell style="grid-area: title; color: var(--accent-300)" :text="props.name" />
        <RestrictionCell
            :style="{ 'grid-area': 'col-restriction-' + (index + 1) }"
            v-for="(restriction, index) in props.restrictions.column"
            :text="restriction"
        />
        <RestrictionCell
            :style="{ 'grid-area': 'row-restriction-' + (index + 1) }"
            v-for="(restriction, index) in props.restrictions.row"
            :text="restriction"
        />
        <MostPopularCell
            v-for="n in 9"
            :champion="getChampion(getX(n), getY(n))"
            :x="getX(n)"
            :y="getY(n)"
        />
    </section>
</template>

<style>
main {
    display: flex;
    justify-content: center;
}
.grid-container {
    margin-right: var(--cell);
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
@media (width <= 426px) {
    .grid-container {
        margin: 0;
    }
}
</style>
