<script setup lang="ts">
const props = defineProps<{
    guesses: number
}>();
</script>

<template>
    <footer>
        <p>
            guesses left:
        </p>
        <span> {{ props.guesses }} </span>
    </footer>
</template>

<style scoped>
footer {
    font-size: var(--font-size-l);
    text-align: center;
    color: var(--accent-200);
}

@media (max-width:768px) {
    footer {
        font-size: var(--font-size-xl);
    }
}
</style>