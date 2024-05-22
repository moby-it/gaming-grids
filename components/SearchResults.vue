<script setup lang="ts">
import type ListItem from './ListItem.vue';

const props = defineProps<{
  input: unknown
}>()
const results = ref<string[] | null>(null);
const timeout = ref();
const focusedChoice = ref<number | null>(null);
const emits = defineEmits(['playerChosen']);
const handlePlayerChosen = (playerName: string) => {
  emits('playerChosen', playerName);
};
const listItems = ref<InstanceType<typeof ListItem>[]>([]);
onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  })
  window.addEventListener('keyup', (e: KeyboardEvent) => {

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
    <ListItem :text="result" ref="listItems" @mousemove="focusedChoice = index"
      :class="{ focused: focusedChoice === index }" v-for="(result, index) of results"
      @player-chosen="handlePlayerChosen"></ListItem />
  </ul>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 50px;
  cursor: pointer;
  width: 400px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  background-color: rgba(0, 89, 128, 0.5);

}

@media (max-width:992px) {
  .results {
    width: 350px;
    max-height: 200px;
    margin-top: 50px;

  }
}

@media (max-width:768px) {
  .results {
    width: 300px;
  }
}

@media (max-width:576px) {
  .results {
    width: 250px;
    max-height: 180px;
  }
}


@media (max-width:425px) {
  .results {
    width: 200px;
    max-height: 160px;
  }
}
</style>