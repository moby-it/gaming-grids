<script setup lang="ts">
import { useCells } from '~/composables/useCells';

export type SelectedCell = {
  x: number;
  y: number;
  value: string;
};
const guesses = ref(9);
const { data } = await useFetch('/api/dailyQuestion');
const { cells } = useCells(data.value);
const selectedCell = ref<SelectedCell>({
  x: -1,
  y: -1,
  value: ''
});
const activeCellIndex = computed(() => {
  if (!showSearch) return -1;
  return selectedCell.value.x + selectedCell.value.y * 4;
});
const showSearch = computed(() => selectedCell.value.x >= 0 || selectedCell.value.y >= 0);
function selectCell(cellIndex: number) {
  selectedCell.value.x = cellIndex % 4;
  selectedCell.value.y = Math.floor(cellIndex / 4);
  selectedCell.value.value = '';
  setTimeout(() => {
    document.getElementById("search-player")?.focus();
  }, 0);
}
function handlePlayerChosen(playerName: string) {
  cells[activeCellIndex.value] = playerName;
  resetSelectedCell();
}
function resetSelectedCell() {
  selectedCell.value.value = '';
  selectedCell.value.x = -1;
  selectedCell.value.y = -1;
}
if (process.client) {
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      selectedCell.value.x = -1;
      selectedCell.value.y = -1;
    }
  });
}
const searchBar = ref(null);
onClickOutside(searchBar, () => {
  resetSelectedCell();
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <section class="search-container" v-if="showSearch">
        <Search ref="searchBar" v-model="selectedCell.value" @player-chosen="handlePlayerChosen" />
      </section>
    </Transition>
  </Teleport>
  <section class="grid-container">
    <section class="grid">
      <Cell :selected="index === activeCellIndex" v-for="(cell, index) of cells" :text="cell" :index="index"
        @click="selectCell(index)" />
    </section>
    <p>
      guesses left <br>
      <span> {{ guesses }} </span>
    </p>
  </section>
</template>

<style scoped>
.grid-container {
  display: flex;
  align-items: flex-start;
  margin-left: auto;
  justify-content: center;
}

@media (width <=768px) {
  .grid-container {
    flex-direction: column;
    align-items: center;
  }
}

.search-container {
  position: absolute;
  width: 100vw;
  background-color: hsla(0, 0%, 60%, 0.4);
}

.search-container .search {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
}

.grid {
  display: grid;
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: repeat(4, 1fr);
}

.grid .cell:nth-child(6) {
  border-top-left-radius: var(--radius);
}

.grid .cell:nth-child(8) {
  border-top-right-radius: var(--radius);
}

.grid .cell:nth-child(14) {
  border-bottom-left-radius: var(--radius);
}

.grid .cell:nth-child(16) {
  border-bottom-right-radius: var(--radius);
}

.grid-container p {
  text-transform: uppercase;
  position: relative;
  left: var(--gap-2);
  top: calc(145px - var(--gap-2));
  text-align: center;
}

.grid-container p>span {
  font-size: 3rem;
}

@media (width <=768px) {
  .grid-container p>span {
    font-size: 1.5rem;
  }

  .grid-container p {
    text-transform: uppercase;
    position: relative;
    top: calc(var(--gap-1));
  }
}
</style>
