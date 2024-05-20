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
.restriction {
  margin: auto;
  text-align: center;
}

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
    background-color: var(--neutral-600);
  }

  p {
    margin: auto;
  }
}

@media (width <=768px) {
  .cell {
    width: 9rem;
    height: 9rem;
  }
}

@media (width <=425px) {
  .cell {
    width: 6rem;
    height: 6rem;
  }
}
</style>