<script setup lang="ts">

const props = defineProps<{
  input: unknown
}>()
const results = ref<string[] | null>(null);
const el = ref<(HTMLElement | null)[]>([]);
const timeout = ref();
const focusedChoice = ref<number | null>(null);
const emits = defineEmits(['playerChosen']);
async function fetchResults() {
  const res = await $fetch('/api/champions', { query: { search: props.input } });
  if (res) {
    results.value = res;
  }
}
onMounted(() => {
  window.addEventListener('keyup', (e) => {
    const focusedListItem = el.value.find((e) => {
      if (e) return e.classList.contains('focused');
    })
    navigateList(e.key, results, focusedChoice, focusedListItem as HTMLLIElement, emits);
  }
  );
});
watchEffect(async () => {
  if (timeout.value) clearTimeout(timeout.value);
  if (props.input) {
    timeout.value = setTimeout(() => {
      fetchResults();
    }, 0);
  }
});
</script>

<template>
  <ul class="results" v-if="results && results.length && input">
    <li ref="el" @mousemove="focusedChoice = index" :class="{ focused: focusedChoice === index }"
      v-for="(result, index) of results" @click="() => $emit('playerChosen', result)">{{
        result }}</li>
  </ul>
</template>

<style scoped>
ul.results {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 50px;
  cursor: pointer;
  background-color: gray;
  width: 400px;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 10px;

  li {
    padding: 4.5px var(--gap-1);
    border-bottom: 1px solid var(--neutral-200);

    &.focused {
      background-color: var(--neutral-600);
    }
  }
}
</style>