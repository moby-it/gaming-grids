<script setup lang="ts">
import { getImageRadius, getNameRadius, getScoreRadius } from '~/utils/cells';

const props = defineProps<{
  x: number;
  y: number;
  champion?: string;
  index?: number;
  selected?: boolean;
  answered: boolean;
  metadata: { id: string, rarityScore: number | null };
}>();
const source = computed(() => {
  if (props.metadata.id) {
    return `https://znvtpipzflqwytxrtatb.supabase.co/storage/v1/object/public/champions/${props.metadata.id}_0.jpg`;
  }
  return '';
});
</script>

<template>
  <section :style="getCellRadius(props.x, props.y)" class="cell" :class="{ selected, answered }">
    <section v-if="props.metadata.id" class="metadata">
      <section class="rarity-score" :style="getScoreRadius(props.x, props.y)">
        <p>{{ props.metadata.rarityScore }}%</p>
      </section>
      <section class="name" :style="getNameRadius(props.x, props.y)">
        <p>{{ props.champion }}</p>
      </section>
    </section class="champions">
    <NuxtImg v-if="props.metadata.id" :style="getImageRadius(props.x, props.y)" :src="source" object-fit="contain"
      layout="responsive" />
  </section>
</template>

<style scoped>
.cell {
  display: flex;
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
    color: var(--accent-300);
    cursor: default;
  }

}


img {
  width: var(--cell);
  height: var(--cell);
}

.name {
  background-color: var(--accent-200);
  color: var(--primary-900);
  color: var(--primary-700);
  font-size: var(--font-size-m);
  margin-top: var(--gap-6);
  width: inherit;
}

.rarity-score {
  background-color: var(--accent-200);
  color: var(--primary-900);
  border-radius: 0 0 0 var(--radius);
  align-self: flex-end;
  margin-bottom: var(--gap-6);
  padding: 0 var(--gap-1);
  color: var(--primary-700);
  font-size: var(--font-size-m);
}


.metadata {

  position: absolute;
  width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: inherit;
}
</style>