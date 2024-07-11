<script setup lang="ts">
const selectedCell = inject<Ref<Cell>>('selectedCell');

const model = defineModel<string>();
const emits = defineEmits(['championChosen']);
const handleChampionChosen = (playerName: string) => {
    emits('championChosen', playerName);
};
if (import.meta.client) {
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape' && selectedCell?.value) {
            resetSelectedCell(selectedCell);
        }
    });
}
const placeholder = `${selectedCell?.value.possibleAnswers} possible answers!`;
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
        border-radius: var(--radius);
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
