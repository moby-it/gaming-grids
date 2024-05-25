<script setup lang="ts">
const props = defineProps<{
  selectedCell: Cell;
}>();
const model = defineModel();
const emits = defineEmits(['playerChosen']);
const handlePlayerChosen = (playerName: string) => {
  emits('playerChosen', playerName);
};
if (process.client) {
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      resetSelectedCell(props.selectedCell);
    }
  });
}
</script>

<template>
  <section class="search">
    <input autocomplete="off" id="search-player" v-model="model" placeholder="Type a player name">
    <SearchResults :input="model" @player-chosen="handlePlayerChosen" />
  </section>
</template>

<style scoped>
.search {
  display: flex;
  width: var(--result-list-width);
  height: var(--gap-6);
  flex-direction: column;

  & input {
    background-color: var(--primary-600);
    flex: 1;
    border-radius: var(--radius) var(--radius) 0 0;
    color: var(--accent-300);
  }

  & input:focus {
    outline: none;
  }
}



@media (max-width:576px) {
  .search {
    height: var(--gap-5)
  }
}
</style>
