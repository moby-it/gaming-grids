<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';
import { getCellAnswerPercent } from "../utils/cells"
import { usePuzzle } from '@/composables/UsePuzzle';
import { type Cell } from '~/utils/cells';
const { user } = useAuth();
await getCellAnswerPercent(user.value?.id, 'Annie');
const selectedCell = ref<Cell>({
    x: -1,
    y: -1,
    value: '',
    possibleAnswers: 0
});
const showSearch = computed(() => ((selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && guesses.value > 0));
const searchBar = ref(null);
const { name, cells, restrictions, guesses, cellAnswers } = await usePuzzle();
onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});
async function handlePlayerChosen(playerName: string): Promise<void> {
    if (guesses.value > 0) {
        const supabase: SupabaseClient = useSupabaseClient();
        if (user.value?.id) {
            const { data, error: e } = await supabase.from('user_puzzle').select('id,puzzle_id').eq('user_id', user.value.id);
            if (e) throw new Error(e.message);
            const answerIsCorrect = await checkAnswer(supabase, playerName, { x: selectedCell.value.x, y: selectedCell.value.y }, data[0].puzzle_id)
            if (answerIsCorrect) {
                await updateCells(supabase, playerName, selectedCell.value, user.value?.id);
                cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = playerName;
            }
            await supabase.from('user_puzzle').update({ guesses: --guesses.value }).eq('id', data[0].id)
        }
    }
    resetSelectedCell(selectedCell.value);
}
</script>

<template>
    <ClientOnly>

        <section id="game" class="game">
            <main>
                <section class="search-container">
                    <Search @player-chosen="handlePlayerChosen" v-if="showSearch" ref="searchBar"
                        :selectedCell="selectedCell" />
                </section>
                <Grid :name="name" :cells="cells" :possibleAnswers="cellAnswers" :restrictions="restrictions"
                    :selectedCell="selectedCell" :guesses="guesses" />
            </main>
            <Guesses class="guesses" :guesses="guesses" />
        </section>
    </ClientOnly>

</template>

<style scoped>
.game {
    display: flex;
    justify-content: center;
    align-items: center;
}

.guesses {
    margin-left: var(--gap-6);
    margin-top: var(--cell);
}

main {
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

.search-container {
    position: absolute;
    margin-top: var(--margin-sm);
    margin-left: var(--cell)
}

@media (max-width:768px) {
    .game {
        flex-direction: column;
    }

    .guesses {
        margin-top: var(--gap-5);
        margin-left: var(--cell);
    }
}
</style>
