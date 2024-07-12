<script setup lang="ts">
import type { Champion } from '#imports';

const selectedCell = inject<Ref<Cell>>('selectedCell');

const model = defineModel<string>();
const champions = ref<Champion[]>([]);
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

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
watchEffect(() => {
    if (timeout.value) clearTimeout(timeout.value);
    const v = model.value;
    if (v) {
        timeout.value = setTimeout(async () => {
            champions.value = await searchChampionsByTerm(v);
        }, 500);
    }
});
</script>

<template>
    <section class="search">
        <input autocomplete="off" id="search-player" v-model="model" :placeholder="placeholder" />
        <SearchResults
            :list-items="champions.map((c) => c.name)"
            @champion-chosen="handleChampionChosen"
        />
    </section>
</template>

<style scoped>
.search {
    margin-top: var(--gap-4);
    display: flex;
    width: calc(var(--cell) * 3);
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
</style>
