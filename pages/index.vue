<script setup lang="ts">
export type SelectedCell = {
  x: number;
  y: number;
  value: string;
};
const guesses = ref(9);
const { data } = await useFetch('/api/dailyQuestion');
const rowRestrictions = data.value?.restrictions[0];
const columnRestrictions = data.value?.restrictions[1];
const cells: Array<string | undefined> = new Array(16).fill(undefined);
cells[0] = data.value?.name;
if (rowRestrictions) {
  rowRestrictions.forEach((rr, idx) => {
    cells[((idx + 1) * 4)] = rr;
  });
}
if (columnRestrictions) {
  columnRestrictions.forEach((rr, idx) => {
    if (idx <= 3) {
      cells[idx + 1] = rr;
    }
  });
}
const selectedCell = ref<SelectedCell>({
  x: -1,
  y: -1,
  value: ''
});
const activeCell = computed(() => {
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
  cells[activeCell.value] = playerName;
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
</script>

<template>
  <Teleport to="body">
    <Transition>
      <section class="search-container" v-if="showSearch">
        <Search v-model="selectedCell.value" @player-chosen="handlePlayerChosen" />
      </section>
    </Transition>
  </Teleport>
  <section class="grid">
    <Cell :selected="index === activeCell" v-for="(cell, index) of cells" :text="cell" :index="index"
      @click="selectCell(index)" />
    <p>
      GUESSES LEFT <br>
      <span> {{ guesses }} </span>
    </p>
  </section>
</template>

<style scoped>
h4 {
  text-align: center;
  margin-bottom: var(--gap-2);
}

.search-container {
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
}

.grid {
  max-width: fit-content;
  margin: var(--gap-4) auto;
  display: grid;
  grid-template-areas:
    ". col-restr col-restr col-restr guesses"
    "row-restr play-area play-area play-area guesses"
    "row-restr play-area play-area play-area guesses"
    "row-restr play-area play-area play-area guesses"
  ;
}

.grid p {
  grid-area: guesses;
  margin: auto var(--gap-2);
  text-align: center;
}

.grid p>span {
  font-size: 3rem;
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
</style>
