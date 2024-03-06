<script setup lang="ts">

const model = defineModel();
const emits = defineEmits(['playerChosen']);
const timeout = ref();
const results = ref<string[] | null>(null);

async function fetchResults() {
  const res = await $fetch('/api/champions', { query: { search: model.value } });
  if (res) {
    results.value = res;
  }
}
watchEffect(async () => {
  if (timeout.value) clearTimeout(timeout.value);
  if (model.value) {
    timeout.value = setTimeout(() => {
      fetchResults();
    }, 500);
  }
});
</script>
<template>
  <section class="search">
    <input id="search-player" v-model="model" placeholder="Type a player name">
    <ul class="results" v-if="results && results.length">
      <li v-for="(result) of results" @click="() => $emit('playerChosen', result)">{{ result }}</li>
    </ul>
  </section>
</template>
<style scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 50px;
  display: flex;
  & input {
    flex: 1;
  }

  & input:focus {
    outline: none;
  }

  .results {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 100%;
    cursor: pointer;
    background-color: gray;
    width: 400px;


    li {
      padding: 4px var(--gap-1);
      border-bottom: 1px solid var(--neutral-200);

      &:hover {
        background-color: var(--neutral-600);
      }
    }
  }
}
</style>
