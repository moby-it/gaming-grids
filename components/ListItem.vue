<script setup lang="ts">
import type { Champion } from '~/utils/fetchResults';

const props = defineProps<{
    champion: Champion;
}>();
const emits = defineEmits(['championChosen']);
</script>
<template>
    <li @click="() => $emit('championChosen', props.champion)">
        <p>{{ props.champion.name }}</p>
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
