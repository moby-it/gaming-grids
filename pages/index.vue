<script setup lang="ts">
export type SelectedCell = {
  x: number;
  y: number;
  value: string;
};
const question = 'Which player has earned the most awards at Worlds, ranging from 2018 to 2021?';
const rowRestrictions = ["T1", 'Fnatic', 'G2'];
const cells = new Array(12);
rowRestrictions.forEach((rr, idx) => {
  cells[idx * 4] = rr;
});
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
  const idx = selectedCell.value.x + selectedCell.value.y * 3;
  cells[idx] = playerName;
  console.log('player chosen: ', playerName);
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
  <h4>{{ question }}</h4>
  <Teleport to="body">
    <Transition>
      <section class="search-container" v-if="showSearch">
        <Search v-model="selectedCell.value" @player-chosen="handlePlayerChosen" />
      </section>
    </Transition>
  </Teleport>
  <section class="grid">
    <Cell :selected="index === activeCell" v-for="(cell, index) of cells" :text="cell" 
    :is-restriction="index % 4 === 0"
      @click="selectCell(index)" />
  </section>
</template>
<style scoped>
h4 {
  margin: auto;
  text-align: center;
  margin-bottom: var(--gap-2);
  max-width: 600px;
}

.search-container {
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 4px 6px 9px black;
}

.grid {
  max-width: 400px;
  margin: auto;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: min-content repeat(3, 1fr);
  gap: var(--gap-1);
  justify-content: center;
}
</style>
