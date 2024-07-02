<script setup lang="ts">
const props = defineProps<{
  x: number;
  y: number;
  champion?: string;
  score?: number;
  index?: number;
  selected?: boolean;
  answered: boolean;
}>();
const source = computed(() => {
  if (props.champion) {
    return `https://znvtpipzflqwytxrtatb.supabase.co/storage/v1/object/public/champions/${props.champion}_0.jpg`;
  }
  return '';
});
</script>

<template>
  <section :style="getCellRadius(props.x, props.y)" class="cell" :class="{ selected, answered }">
    <NuxtImg class="champions" v-if="champion" :src="source" />
  </section>

</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: var(--cell);
  height: var(--cell);
  background-color: var(--primary-900);
  border: 2px solid var(--accent-300);
  margin: -1px;

  &:hover {
    background-color: var(--accent-200);
  }

  &.selected {
    background-color: var(--accent-600);
  }

  &.answered {
    background-color: var(--primary-600);
    color: var(--accent-300);
    cursor: default;
  }

}

img {
  width: var(--cell);
  height: var(--cell);
}
</style>