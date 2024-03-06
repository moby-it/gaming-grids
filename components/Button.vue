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
  color: white;
  background: linear-gradient(0.25turn, var(--primary-a), var(--primary-b));
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