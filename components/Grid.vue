<script setup lang="ts">
const props = defineProps<{
    name: string;
    cells: string[][];
    selectedCell: Cell;
    restrictions: { column: string[], row: string[] };
    guesses: number;
    answers: number[][]
}>();
</script>

<template>
    <section class="grid-container">
        <section class="grid-head">
            <RestrictionCell :text="props.name" />
            <section class="column-restrictions">
                <RestrictionCell v-for="       restriction in props.restrictions.column       " :text="restriction" />
            </section>
        </section>
        <section class="grid-body">
            <section class="row-restrictions">
                <RestrictionCell v-for="       restriction in props.restrictions.row     " :text="restriction" />
            </section>
            <section class="rows" v-for="y in 3">
                <Cell v-for="x in 3" :champion="props.cells[x - 1][y - 1]" :x="x" :y="y"
                    :selected="checkActive(props.guesses, props.selectedCell, { x, y })"
                    :answered="props.cells[x - 1][y - 1] ? true : false"
                    @click="selectCell(props.cells[x - 1][y - 1], props.selectedCell, { x, y }, answers[x - 1][y - 1])" />
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
