<script setup lang="ts">
const props = defineProps<{
    text: string;
    index: number;
}>();
const emits = defineEmits(['playerChosen', 'touchLi']);
</script>
<template>
    <li @touchstart="$emit('touchLi', props.index)" @click="() => $emit('playerChosen', props.text)">
        <p>{{ props.text }}</p>
    </li>
</template>

<style scoped>
li {
    text-align: start;
    color: var(--accent-300);
    font-weight: bold;

    padding: var(--gap-2);

    &.focused {
        background-color: var(--primary-700);
    }
}
</style>