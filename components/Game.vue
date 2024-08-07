<script setup lang="ts">
import type { Champion } from '#imports';

const props = defineProps<{ puzzleId: string }>();
const puzzleId = props.puzzleId;

const { user } = useAuth();
const puzzleStore = usePuzzleStore();
const { name, guesses, loading, championNames, rarityScores, status } = storeToRefs(puzzleStore);

const selectedCell = ref<Cell>({ x: -1, y: -1 });
const searchBar = ref(null);

const { showScoreModal, scoreModal, hideScoreModal } = useScoreModal();
const score = computed<number>(() => +getScore(rarityScores.value).toFixed(2));
provide('selectedCell', selectedCell);

const showSearch = computed(
    () => (selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && status.value === 'in progress'
);

onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell);
    const target = e.target as HTMLTextAreaElement;
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});

async function giveUp() {
    guesses.value = 0;
    if (user.value) {
        await $fetch(`/api/giveUp/`, {
            method: 'PUT',
            body: JSON.stringify({
                puzzleId,
            }),
        });
    } else {
        savePuzzleToLocalStorage(puzzleId, championNames.value, 0);
    }
    showScoreModal();
}
async function handleChampionChosen(champion: Champion): Promise<void> {
    if (guesses.value <= 0) return;
    const { score } = await $fetch(`/api/submit-champion/`, {
        method: 'POST',
        body: JSON.stringify({
            x: selectedCell.value.x,
            y: selectedCell.value.y,
            puzzleId: puzzleId,
            champion: champion.name,
            userId: user.value?.id ?? null,
        }),
    });
    puzzleStore.updatePuzzle(selectedCell.value.x, selectedCell.value.y, champion, score);
    if (!user.value) {
        savePuzzleToLocalStorage(puzzleId, championNames.value, guesses.value);
    }
    resetSelectedCell(selectedCell);
    if (status.value === 'completed') showScoreModal();
}
</script>

<template>
    <section class="loading" v-if="loading">
        <h1>Loading...</h1>
    </section>
    <section v-else class="game">
        <section class="main">
            <Modal :show="showSearch">
                <Search @champion-chosen="handleChampionChosen" ref="searchBar" />
            </Modal>
            <Grid :champion-names="championNames" :rarity-scores="rarityScores" />
        </section>
        <section class="options">
            <Summary
                :name="name"
                :score="score"
                :rarity-scores="rarityScores"
                :status="status"
                :score-modal="scoreModal"
                @show-modal="showScoreModal"
                @hide-modal="hideScoreModal"
            />
            <section v-if="status === 'completed'">
                <p>Rarity score</p>
                <h1>{{ score }}</h1>
            </section>
            <GiveUp v-if="status === 'in progress'" @give-up="giveUp" />
            <Guesses v-if="status === 'in progress'" class="guesses" :guesses="guesses" />
        </section>
    </section>
</template>

<style scoped>
.options {
    width: var(--cell);
    margin-top: calc(var(--cell) / 2);
    display: flex;
    flex-direction: column;
    text-align: center;
}
.game {
    display: flex;
    gap: var(--gap-2);
    align-items: center;
}
.main {
    flex-direction: column;
    align-items: center;
}
.loading {
    margin-top: var(--cell);
    color: var(--accent-300);
}
@media (width <= 768px) {
    .game {
        flex-direction: column;
    }
    .options {
        margin-top: var(--gap-2);
        align-items: center;
    }
}
</style>
