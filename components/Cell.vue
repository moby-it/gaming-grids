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
  justify-self: center;
  cursor: pointer;
  margin: auto;
  width: 6rem;
  height: 6rem;
  border-radius: var(--radius);
  border: 1px solid gray;
  box-shadow: 3px 5px 7px black;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &.selected {
    background-color: darkgray;
  }
  p {
    margin: auto;
  }
}
</style>