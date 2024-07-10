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
    <section id="modal"></section>
    <main>
        <NuxtPage />
    </main>
</template>
