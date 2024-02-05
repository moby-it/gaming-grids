<script setup lang="ts">
const model = defineModel('');
</script>
<template>
  <section class="search">
    <input :value="model" placeholder="Type a player name">
  </section>
</template>
<style scoped>
.search {
  width: 300px;
  height: 35px;
  display: flex;
  & input {
    flex: 1;
  }
  & input:focus {
    outline: none;
  }
}
</style>
