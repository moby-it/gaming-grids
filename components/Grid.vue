<script setup lang="ts">
const props = defineProps<{
    name: string;
    cells: string[][];
    selectedCell: Cell;
    restrictions: { column: string[], row: string[] };
}>();
</script>

<template>
    <section class="grid-container">
        <section class="column-restrictions">
            <RestrictionCell :text="props.name" />
            <RestrictionCell v-for="       restriction in props.restrictions.column       " :text="restriction" />
        </section>
        <section class="row-restrictions-cells">
            <section class="row-restrictions">
                <RestrictionCell v-for="       restriction in props.restrictions.row     " :text="restriction" />
            </section>
            <section class="rows" v-for="y in 3">
                <Cell v-for="x in 3" :text="props.cells[x - 1][y - 1]" :x="x" :y="y"
                    :selected="checkActive(props.selectedCell, { x, y })"
                    :answered="props.cells[x - 1][y - 1] ? true : false"
                    @click="selectCell(props.cells[x - 1][y - 1], props.selectedCell, { x, y })" />
            </section>
        </section>
    </section>
</template>

<style scoped>
.grid-container {
    display: flex;
    flex-direction: column;

}

.column-restrictions {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;

}

.row-restrictions {
    display: flex;
    flex-direction: column;
    align-content: space-around;
}

.rows {
    display: flex;
    flex-direction: column;
}

.row-restrictions-cells {
    display: flex;
}
</style>
