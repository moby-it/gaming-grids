<script setup lang="ts">
defineProps<{ primary?: boolean; accent?: boolean; }>();
defineEmits(['clicked']);
</script>

<template>
  <button :class="{ primary, accent }" @click="$emit('clicked')">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  outline: none;
  border: none;
  cursor: pointer;
  transition: transform 200ms ease-in;

  &:hover {
    transform: translateY(-2px);
  }
}

button.primary {
  background: linear-gradient(0.25turn, var(--primary-100), var(--primary-200));
  box-shadow: 1px 1px var(--primary-100)
}

button:disabled {
  cursor: default;
}

</style>