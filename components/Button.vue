<script setup lang="ts">
defineEmits(['clicked']);
</script>

<template>
  <button @click="$emit('clicked')">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  outline: none;
  border: none;
  cursor: pointer;
}
button:disabled {
  cursor: default;
}
</style>