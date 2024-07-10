<script setup lang="ts">
const props = defineProps<{
    rarityScore: number | null;
}>();
const getCellColor = () => {
    if (props.rarityScore === null) return 'background-color:white';
    if (0 <= props.rarityScore && props.rarityScore < 40) {
        return 'background-color:orange';
    }
    if (40 <= props.rarityScore && props.rarityScore < 60) {
        return 'background-color:purple';
    }
    if (60 <= props.rarityScore && props.rarityScore < 100) {
        return 'background-color:blue';
    }
    return 'background-color:white';
};
</script>
<template>
    <section :style="getCellColor()" class="cell"></section>
</template>
<style scoped>
.cell {
    width: 70px;
    height: 75px;
    justify-content: center;
    align-items: center;
    align-content: center;
    border: 1px solid var(--accent-300);
    margin: var(--gap-2) var(--gap-1);
}
</style>