<script setup lang="ts">
export type SelectedCell = {
  x: number;
  y: number;
  value: string;
};
const { data, error } = await useFetch('/api/dailyQuestion');
const rowRestrictions = data.value?.restrictions[0];
const cells = new Array(12);
if (rowRestrictions) {
  rowRestrictions.forEach((rr, idx) => {
    cells[idx * 4] = rr;
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
  <h4>{{ data?.name }}</h4>
  <Teleport to="body">
    <Transition>
      <section class="search-container" v-if="showSearch">
        <Search v-model="selectedCell.value" @player-chosen="handlePlayerChosen" />
      </section>
    </Transition>
  </Teleport>
  <section class="grid">
    <Cell :selected="index === activeCell" v-for="(cell, index) of cells" :text="cell" :is-restriction="index % 4 === 0"
      @click="selectCell(index)" />
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
  margin: auto;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: min-content repeat(3, 1fr);
  justify-content: center;
}

.grid .cell:last-child {
  border: none;
}

.grid .cell:nth-child(4n) {
  border-right: none;
}

.grid .cell:nth-child(10) {
  border-bottom: none;
}

.grid .cell:nth-child(11) {
  border-bottom: none;
}
</style>
