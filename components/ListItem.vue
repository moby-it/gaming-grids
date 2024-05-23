<script setup lang="ts">
const props = defineProps<{
    text: string;
}>();
const emits = defineEmits(['playerChosen']);
</script>
<template>
    <li @click="() => $emit('playerChosen', props.text)">{{ props.text }}</li>
</template>

<style scoped>
li {
    font-family: 'Beaufort';
    padding: 9px var(--gap-1);
    text-align: start;
    color: var(--accent-300);
    font-weight: bold;

    &.focused {
        background-color: var(--primary-600);
    }
}

@media (max-width:992px) {
    li {
        padding: 2.5px var(--gap-1);
    }
}

@media (max-width:768px) {
    .results {
        width: 300px;
    }
}

@media (max-width:425px) {
    li {
        padding: 5px var(--gap-1);
    }
}
</style>