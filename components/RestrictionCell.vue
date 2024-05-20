<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="restriction">
    <h5> {{ props.text }} </h5>
  </div>
</template>

<style>
.restriction {
  display: flex;
  width: 9rem;
  height: 9rem;
  text-align: baseline;
  justify-content: center;
  align-items: center;

}
</style>