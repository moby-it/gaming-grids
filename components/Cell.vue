<script setup lang="ts">
const props = defineProps<{
  x: number;
  y: number;
  text?: string;
  index?: number;
  selected?: boolean;
  answered: boolean;
}>();
</script>

<template>
  <section :style="getCellRadius(props.x, props.y)" class="cell" :class="{ selected, answered }">
    <p>{{ props.text }}</p>
  </section>

</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: var(--cell);
  height: var(--cell);
  background-color: var(--primary-900);
  border: 1px solid var(--accent-300);
  margin: -1px;

  &:hover {
    background-color: var(--accent-200);
  }

  &.selected {
    background-color: var(--accent-600);
  }

  &.answered {
    background-color: var(--primary-600);
    color: var(--accent-300);
    cursor: default;
  }
}
</style>