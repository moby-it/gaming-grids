<script setup lang="ts">
import { getNameRadius, getScoreRadius } from '~/utils/cells';
import type { StyleValue } from 'vue';

const props = defineProps<{
    x: number;
    y: number;
    champion?: { name: string; id: string; rarityScore: number };
}>();
const { BUCKET_URL } = useRuntimeConfig().public;

const store = usePuzzleStore();
const { status } = storeToRefs(store);
const selectedCell = inject<Ref<Cell>>('selectedCell');
const score = computed(() =>
    Number.isInteger(props.champion?.rarityScore)
        ? props.champion?.rarityScore
        : props.champion?.rarityScore.toFixed(2)
);
const imageSrc = computed(() =>
    props.champion?.id ? `${BUCKET_URL}/${props.champion?.id}_0.jpg` : ''
);
const isSelected = computed(
    () =>
        status?.value === 'in progress' &&
        selectedCell?.value.x === props.x &&
        selectedCell.value.y === props.y
);
const styles = computed(() => {
    const s: StyleValue = {
        borderRadius: getCellRadius(props.x, props.y),
    };
    if (imageSrc.value) {
        s.backgroundImage = `url(${imageSrc.value})`;
        s.backgroundSize = 'contain';
    }
    return s;
});
</script>

<template>
    <section
        :style="styles"
        class="cell"
        :class="{ selected: isSelected, answered: !!champion, hoverable: status === 'in progress' }"
    >
        <section v-if="props.champion?.id" class="metadata">
            <section class="rarity-score" :style="getScoreRadius(props.x, props.y)">
                <p>{{ score }}%</p>
            </section>
            <section class="name" :style="getNameRadius(props.x, props.y)">
                <p>{{ props.champion.name }}</p>
            </section>
        </section>
    </section>
</template>

<style scoped>
.cell {
    display: flex;
    cursor: pointer;
    background-color: var(--primary-700);
    border: 2px solid var(--accent-200);
    margin: -1px;
    width: var(--cell);
    height: var(--cell);
    &.selected {
        background-color: var(--accent-600);
    }

    &.answered {
        color: var(--accent-300);
        cursor: default;
    }
    &.hoverable {
        &:hover {
            background-color: var(--accent-200);
        }
    }
}

.name {
    width: inherit;
    background-color: var(--neutral-800);
    color: var(--primary-100);
    font-size: var(--font-size-s);
    font-family: 'IBM Plex Serif';
}

.rarity-score {
    background-color: var(--primary-900);
    color: var(--neutral-100);
    font-size: var(--font-size-m);
    border-radius: 0 0 0 var(--radius);
    align-self: flex-end;
    padding: 0 var(--gap-2);
}

.metadata {
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: inherit;
}
</style>
