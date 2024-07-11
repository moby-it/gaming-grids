<script lang="ts" setup>
const props = defineProps<{
    text: string;
}>();
</script>

<template>
    <div class="restriction">
        <span> {{ props.text }} </span>
    </div>
</template>

<style scoped>
.restriction {
    width: var(--cell);
    height: var(--cell);
    font-family: 'Spiegel';
    font-weight: 600;
    display: flex;
    text-align: center;
    align-items: center;
    color: var(--accent-200);

    &:hover {
        color: var(--accent-600);
    }
}

@media (width<= 426px) {
    .restriction {
        font-size: var(--font-size-s);
    }
}
</style>
