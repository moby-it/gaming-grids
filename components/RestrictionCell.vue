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
    min-height: 50px;
    font-family: 'Spiegel';
    font-weight: 600;
    font-size: var(--font-size-m);
    display: flex;
    text-align: center;
    align-items: center;
    color: var(--accent-200);
    cursor: default;
    justify-content: center;
}

@media (width<= 426px) {
    .restriction {
        font-size: var(--font-size-s);
    }
}
</style>
