<script setup>
useHead({
    script: [
        {
            defer: true,
            src: '/login.js',
        },
        {
            async: true,
            src: 'https://accounts.google.com/gsi/client',
        },
    ],
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
