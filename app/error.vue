<script setup lang="ts">
import type { NuxtError } from '#app';
useHead({
    link: [
        {
            rel: 'stylesheet',
            href: '/styles.css',
        },
    ],
});
defineProps({
    error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
    <main>
        <section>
            <h1>Application failure.</h1>
            <h2>Status: {{ $props.error?.statusCode }}</h2>
            <p>{{ $props.error?.message }}</p>
            <Button :button-class="'accent'" @click="handleError"
                >Go to Home <IconsRightArrow
            /></Button>
        </section>
    </main>
</template>
<style lang="css" scoped>
section {
    display: flex;
    flex-direction: column;
    gap: var(--gap-2);
    margin-top: var(--gap-6);
}
p {
    font-size: var(--font-size-l);
}
button {
    display: flex;
    align-items: center;
    gap: var(--gap-2);
    align-self: center;
}
</style>
