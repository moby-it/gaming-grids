<script setup lang="ts">
const question = 'Which player has earned the most awards at Worlds, ranging from 2018 to 2021?';
const rowRestrictions = ["T1", 'Fnatic', 'G2'];
const cells = new Array(12);
rowRestrictions.forEach((rr, idx) => {
  cells[idx * 4] = rr;
});
const selectedCell = ref({
  x: -1,
  y: -1,
  value: ''
});
const showSearch = computed(() => selectedCell.value.x >= 0 || selectedCell.value.y >= 0);
provide('selectedCell', selectCell);
function selectCell(cellIndex: number) {
  selectedCell.value.x = cellIndex % 4;
  selectedCell.value.y = Math.floor(cellIndex / 4);
  selectedCell.value.value = '';
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
        <Search v-model="selectedCell.value" />
      </section>
    </Transition>
  </Teleport>
  <section class="grid">
    <Cell v-for="(cell, index) of cells" :header="cell" @click="selectCell(index)" />
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