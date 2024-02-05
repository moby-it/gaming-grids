<script setup>
const question = 'Which player has earned the most awards at Worlds, ranging from 2018 to 2021?';
const rowRestrictions = ["T1", 'Fnatic', 'G2'];
const cells = new Array(12);
rowRestrictions.forEach((rr, idx) => {
  cells[idx * 4] = rr;
});
</script>
<template>
  <h4>{{ question }}</h4>
  <section class="grid">
    <Cell v-for="cell of cells" :header="cell" />
  </section>
</template>
<style scoped>
h4 {
  margin: auto;
  text-align: center;
  margin-bottom: var(--gap-2);
  max-width: 600px;
}

.grid {
  max-width: 600px;
  margin: auto;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-1);
  justify-content: center;
}
</style>