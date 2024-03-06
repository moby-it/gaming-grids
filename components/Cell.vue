<script setup lang="ts">
const props = defineProps<{
  text?: string;
  index: number;
  selected: boolean;
}>();
const isRowRestriction = props.index !== 0 && props.index % 4 === 0;
const isColRestriction = props.index <= 4;
const isRestriction = isRowRestriction || isColRestriction;

</script>

<template>
  <section class="cell" :class="{ selected }" v-if="!isRestriction">
    <p>{{ text }}</p>
  </section>
  <h5 class="restriction" :class="{ 'highlight': index === 0 }" v-else> {{ $props.text }} </h5>
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
    width: 8rem;
    height: 8rem;
  }
}

@media (width <=425px) {
  .cell {
    width: 6rem;
    height: 6rem;
  }
}
</style>