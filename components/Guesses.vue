<script setup lang="ts">
const props = defineProps<{
    guesses: number;
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
    font-family: 'Beaufort';
    text-align: center;
    margin-left: 30px;
    font-size: 18px;
    font-weight: 600;
    color: var(--accent-200);
}

@media (max-width:768px) {

    footer {
        margin-left: 5px;
        font-size: 15px;
    }
}

@media (width <=576px) {
    footer {
        margin-left: 90px;
        font-size: 13px;
    }
}
</style>