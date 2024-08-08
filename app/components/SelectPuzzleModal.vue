<script setup lang="ts">
const modal = ref(null);
const emits = defineEmits(['close']);
const { date } = usePuzzleStore();
const { data: latestPuzzles, status } = await useFetch('/api/latest-puzzles');

onClickOutside(modal, (e: Event) => {
    emits('close');
    e.stopPropagation();
});
</script>
<template>
    <section ref="modal" class="modal">
        <header>
            <h2>Previous days</h2>
            <Exit @click="$emit('close')" />
        </header>
        <p v-if="status === 'pending'">Loading...</p>
        <p v-else-if="status === 'error'">Failed to fetch latest puzzle dates</p>
        <ul v-else-if="status === 'success'">
            <NuxtLink
                @click="$emit('close')"
                :to="idx === 0 ? '/' : `/${p.date}`"
                v-for="(p, idx) of latestPuzzles"
                >{{ p.date }} <span v-if="date === p.date">&#10003;</span></NuxtLink
            >
        </ul>
    </section>
</template>
<style scoped>
.modal {
    width: 300px;
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--gap-4);
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: var(--gap-1);
        a {
            color: var(--primary-400);
        }
    }
}
</style>
