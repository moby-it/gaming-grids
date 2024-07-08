<script setup lang="ts">
import type { PuzzleMetadata } from '~/utils/puzzle';
const props = defineProps<{
    name: string;
    cells: string[][];
    restrictions: { column: string[]; row: string[] };
    guesses: number;
}>();
const puzzleMetadata = inject<Ref<PuzzleMetadata>>('puzzleMetadata');
const selectedCell = inject<Ref<Cell>>('selectedCell');

function getChampion(x: number, y: number): string | undefined {
    return props.cells?.[x - 1]?.[y - 1];
}

function onCellClick(x: number, y: number) {
    if (!selectedCell?.value || !props.guesses) return;
    selectedCell.value = {
        x,
        y,
        possibleAnswers: puzzleMetadata?.value.possibleAnswers[x - 1][y - 1],
    };
    setTimeout(() => {
        document.getElementById('search-player')?.focus();
    }, 0);
}
</script>
<template>
    <section class="grid-container">
        <section class="grid-head">
            <RestrictionCell :text="props.name" />
            <section class="column-restrictions">
                <RestrictionCell
                    v-for="restriction in props.restrictions.column"
                    :text="restriction"
                />
            </section>
        </section>
        <section class="grid-body">
            <section class="row-restrictions">
                <RestrictionCell
                    v-for="restriction in props.restrictions.row"
                    :text="restriction"
                />
            </section>
            <section class="rows" v-for="y in 3">
                <Cell
                    v-for="x in 3"
                    :champion="getChampion(x, y)"
                    :x="x"
                    :y="y"
                    @click="onCellClick(x, y)"
                />
            </section>
        </section>
    </section>
</template>

<style scoped>
.grid-container {
    display: flex;
    flex-direction: column;
    margin-left: 1px;
}

.grid-head {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.column-restrictions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.row-restrictions {
    display: flex;
    flex-direction: column;
    align-content: space-around;
}

.rows {
    flex-direction: column;
}

.grid-body {
    display: flex;
}
</style>
