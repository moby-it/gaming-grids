<script setup>
useHead({
    link: [
        {
            rel: 'stylesheet',
            href: '/styles.css',
        },
    ],
});
</script>
<template>
    <Header />
    <main>
        <section id="modal"></section>
        <NuxtPage />
    </main>
</template>
