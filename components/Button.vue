<script setup lang="ts">
defineProps<{ primary?: boolean; accent?: boolean; }>();
defineEmits(['clicked']);
</script>

<template>
  <button :class="{ primary, accent }" @click="$emit('clicked')">
    <p>Sign in</p>
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
  font-size: 17px;

  &:hover {
    transform: translateY(-2px);
  }
}

button.primary {
  background: linear-gradient(0.25turn, var(--primary-600), var(--primary-700));
  box-shadow: 1px 1px var(--primary-700)
}

button:disabled {
  cursor: default;
}

@media (max-width:992px) {
  button {
    font-size: 15px;

  }
}

@media (max-width:576px) {
  button {
    font-size: 12px;
  }
}

@media (max-width:492px) {
  button {
    font-size: 10px;
  }
}
</style>