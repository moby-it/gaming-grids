<script setup lang="ts">
import { getFocusedChoice } from '~/utils/navigateList';

const props = defineProps<{ listItems: string[] }>();
const listItems = ref<HTMLElement[]>([]);

const focusedChoice = ref<number>(0);

const emits = defineEmits<{
    championChosen: [value: string];
}>();
onMounted(() => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && focusedChoice.value >= 0)
            return emits('championChosen', props.listItems[focusedChoice.value]);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
        const focusedListItem = listItems.value.find((li) =>
            li.classList.contains('focused')
        ) as HTMLLIElement;
        focusedChoice.value = getFocusedChoice(e.key, props.listItems.length, focusedChoice.value);
        focusListItem(focusedListItem, e.key);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
        window.removeEventListener('keydown', handleKeydown);
    };
});
</script>

<template>
    <ul class="results" v-if="props.listItems.length">
        <li
            ref="listItems"
            @click="$emit('championChosen', result)"
            :class="{ focused: focusedChoice === index }"
            v-for="(result, index) of props.listItems"
            @mousemove="focusedChoice = index"
        >
            <p>{{ result }}</p>
        </li>
    </ul>
</template>

<style scoped>
.results {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: var(--gap-6);
    cursor: pointer;
    width: calc(var(--cell) * 3);
    max-height: 14rem;
    overflow-y: auto;
    border-radius: 0 0 var(--radius) var(--radius);
    background-color: var(--primary-600);
    z-index: 1;
}
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
