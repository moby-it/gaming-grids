<script setup lang="ts">
type buttonClass = 'sign-in' | 'primary' | 'accent'
const props = defineProps<{
  buttonClass: buttonClass
}>();
</script>

<template>
  <button :class="props.buttonClass">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  color: white;
  padding: var(--gap-2) var(--gap-3);
  border-radius: var(--radius);
  outline: none;
  border: none;
  cursor: pointer;
  transition: transform 200ms ease-in;
  margin-right: var(--gap-1);
  font-size: var(--font-size-m);

  &:hover {
    transform: translateY(-2px);
  }
}

button.primary {
  background: linear-gradient(0.25turn, var(--accent-300), var(--accent-600));
}

button.sign-in {
  background: var(--accent-300);
  flex-direction: row;
  width: 14rem;
  display: flex;
  justify-content: space-evenly;
}

button:disabled {
  cursor: default;
}

@media (max-width:425px) {
  button {
    font-size: var(--font-size-s);
  }

}
</style>