<script setup lang="ts">
const props = defineProps<{
    text: string
}>();
const emits = defineEmits(['championChosen']);
</script>
<template>
    <li @click="() => $emit('championChosen', props.text)">
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