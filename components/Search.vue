<script setup lang="ts">
const props = defineProps<{
    selectedCell: Cell;
}>();
const model = defineModel<string>();
const emits = defineEmits(['championChosen']);
const handleChampionChosen = (playerName: string) => {
    emits('championChosen', playerName, props.selectedCell);
};
if (import.meta.client) {
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            resetSelectedCell(props.selectedCell);
        }
    });
}
const placeholder = `${props.selectedCell.possibleAnswers} possible answers!`;
</script>

<template>
    <section class="search">
        <input autocomplete="off" id="search-player" v-model="model" :placeholder="placeholder" />
        <SearchResults :input="model" @champion-chosen="handleChampionChosen" />
    </section>
</template>

<style scoped>
.search {
    display: flex;
    width: 27rem;
    height: var(--gap-6);
    flex-direction: column;

    & input {
        background-color: var(--primary-600);
        padding-left: var(--gap-4);
        flex: 1;
        border-radius: var(--radius) var(--radius) 0 0;
        color: var(--accent-300);
    }

    & input:focus {
        outline: none;
    }
}

@media (max-width: 992px) {
    .search {
        width: 24rem;
    }
}

@media (max-width: 768px) {
    .search {
        width: 21rem;
    }
}

@media (max-width: 576px) {
    .search {
        width: 18rem;
    }
}

@media (max-width: 425px) {
    .search {
        height: var(--gap-5);
        width: 15rem;
    }
}
</style>
