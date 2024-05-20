<script setup lang="ts">
const model = defineModel();
const emits = defineEmits(['playerChosen']);
const handlePlayerChosen = (playerName: string) => {
  emits('playerChosen', playerName);
};
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
  flex-direction: column;
  width: 400px;
  height: 50px;
  padding-top: 20px;

  & input {

    flex: 1;
    border-radius: var(--radius);
  }

  & input:focus {
    outline: none;
  }
}
</style>
