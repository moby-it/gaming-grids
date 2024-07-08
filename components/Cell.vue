<script setup lang="ts">
import { getImageRadius, getNameRadius, getScoreRadius } from '~/utils/cells';
import type { PuzzleMetadata } from '#imports';

const props = defineProps<{
    x: number;
    y: number;
    champion?: string;
}>();
const { BUCKET_URL } = useRuntimeConfig().public;
const puzzleMetadata = inject<Ref<PuzzleMetadata>>('puzzleMetadata');
const status = inject<Ref<GameStatus>>('status');
const selectedCell = inject<Ref<Cell>>('selectedCell');
const championId = computed(() => puzzleMetadata?.value.championIds?.[props.x - 1]?.[props.y - 1]);
const rarityScore = computed(() => puzzleMetadata?.value.rarityScore?.[props.x - 1]?.[props.y - 1]);
const score = computed(() => rarityScore.value?.toFixed());
const source = computed(() => (championId.value ? `${BUCKET_URL}${championId.value}_0.jpg` : ''));
const isSelected = computed(
    () =>
        status?.value === 'in progress' &&
        selectedCell?.value.x === props.x &&
        selectedCell.value.y === props.y
);
</script>

<template>
    <section
        :style="getCellRadius(props.x, props.y)"
        class="cell"
        :class="{ selected: isSelected, answered: !!champion, hovered: status === 'in progress' }"
    >
        <section v-if="championId" class="metadata">
            <section class="rarity-score" :style="getScoreRadius(props.x, props.y)">
                <p>{{ score }}%</p>
            </section>
            <section class="name" :style="getNameRadius(props.x, props.y)">
                <p>{{ props.champion }}</p>
            </section>
        </section>
        <NuxtImg
            v-if="championId"
            :style="getImageRadius(props.x, props.y)"
            :src="source"
            object-fit="contain"
            layout="responsive"
        />
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

    &.selected {
        background-color: var(--accent-600);
    }

    &.answered {
        color: var(--accent-300);
        cursor: default;
    }
}

.hovered {
    &:hover {
        background-color: var(--accent-200);
    }
}

img {
    width: var(--cell);
    height: var(--cell);
}

.name {
    background-color: var(--accent-200);
    color: var(--primary-700);
    font-size: var(--font-size-m);
    margin-top: var(--gap-6);
    width: inherit;
}

.rarity-score {
    background-color: var(--accent-200);
    color: var(--primary-700);
    font-size: var(--font-size-m);
    border-radius: 0 0 0 var(--radius);
    align-self: flex-end;
    margin-bottom: var(--gap-6);
    padding: 0 var(--gap-1);
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

@media (max-width: 992px) {
    .name {
        font-size: var(--font-size-m);
        margin-top: var(--gap-6);
    }

    .rarity-score {
        margin-bottom: var(--gap-5);
        padding: 0 var(--gap-1);
        font-size: var(--font-size-m);
    }
}

@media (max-width: 768px) {
    .name {
        font-size: var(--font-size-m);
        margin-top: var(--gap-6);
    }

    .rarity-score {
        margin-bottom: var(--gap-4);
        padding: 0 var(--gap-1);
        font-size: var(--font-size-m);
    }
}

@media (max-width: 576px) {
    .name {
        font-size: var(--font-size-s);
        margin-top: var(--gap-6);
    }

    .rarity-score {
        margin-bottom: var(--gap-3);
        padding: 0 var(--gap-1);
        font-size: var(--font-size-s);
    }
}

@media (max-width: 425px) {
    .name {
        margin-top: var(--gap-5);
    }

    .rarity-score {
        padding: 0 var(--gap-1);
    }
}
</style>
