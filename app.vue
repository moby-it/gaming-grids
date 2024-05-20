<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/styles.css'
    }
  ]
});
</script>
<template>
  <Header />
  <main>
    <NuxtPage />
  </main>
</template>

<style scoped>
main {
  padding: 0;
}
</style>