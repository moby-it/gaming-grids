<script setup lang="ts">
import { getImageRadius, getNameRadius, getScoreRadius } from '~/utils/cells';
const props = defineProps<{
    x: number;
    y: number;
    champion?: string;
    index?: number;
    selected?: boolean;
    answered: boolean;
    championId: string | null;
    rarityScore: number | null;
    hovered: boolean;
}>();
const source = computed(() => {
    if (props.championId) {
        return `https://znvtpipzflqwytxrtatb.supabase.co/storage/v1/object/public/champions/${props.championId}_0.jpg`;
    }
    return '';
});
</script>

<template>
    <section
        :style="getCellRadius(props.x, props.y)"
        class="cell"
        :class="{ selected, answered, hovered }"
    >
        <section v-if="props.championId" class="metadata">
            <section class="rarity-score" :style="getScoreRadius(props.x, props.y)">
                <p>{{ props.rarityScore }}%</p>
            </section>
            <section class="name" :style="getNameRadius(props.x, props.y)">
                <p>{{ props.champion }}</p>
            </section>
        </section>
        <NuxtImg
            v-if="props.championId"
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
