<script setup lang="ts">

const model = defineModel();
const emits = defineEmits(['playerChosen']);
const timeout = ref();
const results = ref<string[] | null>(null);
const focusedChoice = ref<number | null>(null);
async function fetchResults() {
  const res = await $fetch('/api/champions', { query: { search: model.value } });
  if (res) {
    results.value = res;
  }
}
onMounted(() => {
  window.addEventListener('keyup', (e) => {
    if (results.value?.length) {
      if (focusedChoice.value === null) return focusedChoice.value = 0;
      if (e.key === 'ArrowUp' && focusedChoice.value > 0) return focusedChoice.value--;
      if (e.key === 'ArrowDown' && focusedChoice.value < results.value.length) return focusedChoice.value++;
      if (e.key === 'Enter') emits('playerChosen', results.value[focusedChoice.value]);
    }
  });
});
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
    <input autocomplete="off" id="search-player" v-model="model" placeholder="Type a player name">
    <ul class="results" v-if="results && results.length">
      <li @mouseenter="focusedChoice = index" :class="{ focused: focusedChoice === index }"
        v-for="(result, index) of results" @click="() => $emit('playerChosen', result)">{{
      result }}</li>
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
    border-radius: var(--radius);
  }

  & input:focus {
    outline: none;
  }

  ul.results {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 100%;
    cursor: pointer;
    background-color: gray;
    width: 400px;
    max-height: 300px;
    overflow-y: scroll;

    li {
      padding: 4px var(--gap-1);
      border-bottom: 1px solid var(--neutral-200);

      &.focused {
        background-color: var(--neutral-600);
      }
    }

  }
}
</style>
