<script setup lang="ts">

import type { ModelRef } from 'vue';
const results = ref<string[] | null>(null);
const el =ref<(HTMLElement | null)[]>([]);
const timeout = ref();
const focusedChoice = ref<number | null>(null);
const input: ModelRef<unknown, string>|undefined = inject('value');
const emits = defineEmits(['playerChosen']);
async function fetchResults() {
  const res = await $fetch('/api/champions', { query: { search: input?.value } });
  if (res) {
    results.value = res;
  }
}

onMounted(() => {
  window.addEventListener('keyup', (e) =>{
    const focusedListItem =el.value.find((e) => {
              if (e) return e.classList.contains('focused');
            })
    navigateList(e.key,results,focusedChoice,focusedListItem as HTMLLIElement,emits);
  }
);
});

watchEffect(async () => {
  if (timeout.value) clearTimeout(timeout.value);
  if (input?.value) {
    timeout.value = setTimeout(() => {
      fetchResults();
    }, 0);
  }
});
</script>

<template>
<ul class="results" v-if="results && results.length&&input">
      <li ref="el" @mousemove="focusedChoice = index" :class="{ focused:focusedChoice === index }"
        v-for="(result, index) of results" @click="() => $emit('playerChosen', result)  ">{{
      result }}</li>
    </ul>
</template>

<style scoped >

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


</style>