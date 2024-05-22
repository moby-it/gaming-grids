<script setup lang="ts">
import { getCellRadius } from '~/utils/cells';
const props = defineProps<{
  x: number;
  y: number;
  text?: string;
  index?: number;
  selected?: boolean;
}>();
</script>

<template>
  <section :style="getCellRadius(props.x, props.y)" class="cell" :class="{ selected }">
    <p>{{ props.text }}</p>
  </section>

</template>

<style scoped>
.cell {
  display: flex;
  cursor: pointer;
  margin: auto;
  width: 9rem;
  height: 9rem;
  border: 1px solid var(--neutral-100);
  transition: transform 0.2s;

  &:hover {
    background-color: var(--neutral-100);
  }

  &.selected {
    background-color: hsla(210, 14%, 14%, 0.8);
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
  }
}

@media (width <=425px) {
  .cell {
    width: 5rem;
    height: 5rem;
  }
}
</style>