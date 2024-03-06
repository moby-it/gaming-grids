<script setup lang="ts">
defineProps<{
  text?: string;
  isRestriction: boolean;
  selected: boolean;
}>();
</script>

<template>
  <section class="cell" :class="{ selected }" v-if="!$props.isRestriction">
    <p>{{ text }}</p>
  </section>
  <h5 class="restriction" v-else> {{ $props.text }} </h5>
</template>

<style scoped>
.restriction {
  margin: auto;
}

.cell {
  display: flex;
  cursor: pointer;
  margin: auto;
  width: 8rem;
  height: 8rem;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  transition: transform 0.2s;

  &:hover {
    background-color: gray;
  }

  &.selected {
    background-color: darkgray;
  }

  p {
    margin: auto;
  }
}

.restriction {
  margin-right: var(--gap-3);
}
</style>