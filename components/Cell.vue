<script setup lang="ts">
import { getCellRadius } from '~/utils/cells';
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
  cursor: pointer;
  margin: 1px;
  font-size: 20px;
  width: 9rem;
  height: 9rem;
  outline: 2px solid var(--accent-300);
  transition: transform 0.2s;

  &:hover {
    background-color: var(--accent-200);
  }

  &.selected {
    background-color: var(--accent-600);
  }

  &.answered {
    background-color: var(--primary-700);
    color: var(--accent-300);
    cursor: default;
  }

  p {
    margin: auto;
  }
}

@media (max-width:992px) {
  .cell {
    width: 9rem;
    height: 9rem;
  }
}

@media (max-width:768px) {
  .cell {
    width: 8rem;
    height: 8rem;
  }
}

@media (max-width:576px) {
  .cell {
    width: 6rem;
    height: 6rem;
    font-size: 15px;
  }
}

@media (width <=425px) {
  .cell {
    width: 5rem;
    height: 5rem;

  }
}
</style>