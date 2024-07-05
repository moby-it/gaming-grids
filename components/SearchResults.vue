<script setup lang="ts">
import type ListItem from './ListItem.vue';
const props = defineProps<{ input: string | undefined }>();
const input = ref(props.input);
const listItems = ref<InstanceType<typeof ListItem>[]>([]);
const emits = defineEmits(['championChosen']);
const { results, focusedChoice } = useArrowNavigation(input, listItems, emits);
const handleChampionChosen = (playerName: string) => {
    emits('championChosen', playerName);
};
watchEffect(() => {
    input.value = props.input;
});
</script>

<template>
    <ul class="results" v-if="results && results.length && input">
        <ListItem
            :champion="result"
            ref="listItems"
            @mousemove="focusedChoice = index"
            :class="{ focused: focusedChoice === index }"
            v-for="(result, index) of results"
            @champion-chosen="handleChampionChosen"
        ></ListItem>
    </ul>
</template>

<style scoped>
.results {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: var(--gap-6);
    cursor: pointer;
    width: 27rem;
    max-height: 14rem;
    overflow-y: auto;
    border-radius: 0 0 var(--radius) var(--radius);
    background-color: var(--primary-600);
    box-shadow: 2px 2px 5px var(--primary-700);
    z-index: 1;
}

@media (max-width: 992px) {
    .results {
        width: 24rem;
        max-height: 12rem;
    }
}

@media (max-width: 768px) {
    .results {
        margin-top: var(--gap-5);
        width: 21rem;
        max-height: 12rem;
    }
}

@media (max-width: 576px) {
    .results {
        width: 18rem;
    }
}

@media (max-width: 425px) {
    .results {
        width: 15rem;
    }
}
</style>
