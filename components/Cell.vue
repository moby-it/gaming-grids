<script setup lang="ts">
defineProps<{
  imgUrl?: string;
  header?: string;
}>();
</script>
<template>
  <section class="cell" v-if="!$props.header">
  </section>
  <h3 class="restriction" v-else> {{ $props.header }} </h3>
</template>
<style scoped>
.restriction {
  margin: auto;
}
.cell {
  cursor: pointer;
  margin: auto;
  width: 120px;
  height: 120px;
  border-radius: var(--radius);
  border: 1px solid gray;
  box-shadow: 3px 5px 7px black;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
}
</style>