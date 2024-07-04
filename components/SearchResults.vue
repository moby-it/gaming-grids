<script setup lang="ts">
import type { Champion } from '~/utils/fetchResults';
import type ListItem from './ListItem.vue';
const props = defineProps<{
  input: unknown
}>()
const results = ref<Champion[] | null>(null);
const timeout = ref();
const focusedChoice = ref<number | null>(null);
const emits = defineEmits(['championChosen']);
const handleChampionChosen = (playerName: string) => {
  emits('championChosen', playerName);
};
const listItems = ref<InstanceType<typeof ListItem>[]>([]);
onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
    const focusedListItem = listItems.value.find(li => li.$el.classList.contains('focused'))
    navigateList(e.key, results, focusedChoice, focusedListItem?.$el as HTMLLIElement, emits);
  }
  );
});
watchEffect(async () => {
  if (timeout.value) clearTimeout(timeout.value);
  if (props.input) {
    timeout.value = setTimeout(() => {
      fetchResults(props.input, results);
      focusedChoice.value = 0;
    }, 0);
  }
});
</script>

<template>
  <ul class="results" v-if="results && results.length && input">
    <ListItem :champion="result" ref="listItems" @mousemove="focusedChoice = index"
      :class="{ focused: focusedChoice === index }" v-for="(result, index) of results"
      @champion-chosen="handleChampionChosen"></ListItem />
  </ul>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: var(--gap-6);
  cursor: pointer;
  width: 27rem;
  max-height: 14rem;
  overflow-y: auto;
  border-radius: 0 0 var(--radius) var(--radius);
  background-color: var(--primary-600);
  box-shadow: 2px 2px 5px var(--primary-700);
  z-index: 1;
}

@media (max-width:992px) {
  .results {
    width: 24rem;
    max-height: 12rem;
  }
}

@media (max-width:768px) {
  .results {
    margin-top: var(--gap-5);
    width: 21rem;
    max-height: 12rem;
  }
}

@media (max-width:576px) {
  .results {
    width: 18rem;
  }
}

@media (max-width:425px) {
  .results {

    width: 15rem;
  }
}
</style>