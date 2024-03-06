<script setup lang="ts">
const props = defineProps<{
  text?: string;
  index: number;
  selected: boolean;
}>();
const isRowRestriction = props.index % 4 === 0;
const isColRestriction = props.index <= 4;
const isRestriction = isRowRestriction || isColRestriction;
</script>

<template>
  <section class="cell" :class="{ selected }" v-if="!isRestriction">
    <p>{{ text }}</p>
  </section>
  <h5 class="restriction" :class="{ 'highlight': index === 0 }" :style="{
    paddingRight: isRowRestriction ? 'var(--gap-2)' : 0,
    paddingBottom: isColRestriction ? 'var(--gap-2)' : 0
  }" v-else> {{ $props.text }} </h5>
</template>

<style scoped>
.restriction {
  margin: auto;
  text-align: center;
}

.cell {
  display: flex;
  cursor: pointer;
  margin: auto;
  width: 10rem;
  height: 10rem;
  border: 1px solid var(--neutral-a);
  transition: transform 0.2s;

  &:hover {
    background-color: var(--neutral-a);
  }

  &.selected {
    background-color: var(--neutral-c);
  }

  p {
    margin: auto;
  }
}
</style>