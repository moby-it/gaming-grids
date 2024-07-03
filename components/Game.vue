<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';
import { } from "../composables/UseGame"
import { type Cell } from '~/utils/cells';
const selectedCell = ref<Cell>({
    x: -1,
    y: -1,
    value: ''
});

const showSearch = computed(() => ((selectedCell.value.x >= 0 || selectedCell.value.y >= 0) && guesses.value > 0));
const searchBar = ref(null);
const { user } = useAuth();
const puzzleId = await usePuzzle('2024-06-22');
const { name, cells, restrictions, guesses, cellAnswers } = await useGame(user.value?.id, puzzleId.value);
onClickOutside(searchBar, (e: Event) => {
    resetSelectedCell(selectedCell.value);
    const target = e.target as HTMLTextAreaElement
    if (target.classList[0] !== 'cell') {
        e.stopPropagation();
    }
});

async function handleChampionChosen(champion: string): Promise<void> {
    const userId = user.value ? user.value?.id : null
    if (guesses.value > 0) {
        const supabase: SupabaseClient = useSupabaseClient();
        const { data: score } = await supabase.rpc('test', {
            x: selectedCell.value.x,
            y: selectedCell.value.y,
            p_id: puzzleId.value, u_id: userId,
            champion_name: champion
        });
        if (score + 1) {
            cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = champion;
        }
        console.log(score)
        --guesses.value;
        if (!userId) {
            localStorage.setItem('localGame', JSON.stringify({
                cells: cells.value, guesses: guesses.value
            }))
        }
        // }
    }
    resetSelectedCell(selectedCell.value);
}
</script>

<template>
    <ClientOnly>
        <section id="game" class="game">
            <main>
                <section class="search-container">
                    <Search @champion-chosen="handleChampionChosen" v-if="showSearch" ref="searchBar"
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
