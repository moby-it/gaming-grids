<script lang="ts" setup>
const route = useRoute();
const puzzleDate = route.params.puzzleDate;
const mostPopularLink = puzzleDate ? `${puzzleDate}/most-popular` : '/most-popular';
const store = usePuzzleStore();
const { name } = storeToRefs(store);
</script>
<template>
    <section class="nav-container">
        <span>{{ name }}</span>
        <NuxtLink :to="`/${puzzleDate}`" class="nav-link" exact-active-class="active"
            >My grid</NuxtLink
        >
        <NuxtLink :to="mostPopularLink" class="nav-link" exact-active-class="active"
            >Most popular</NuxtLink
        >
        <NuxtLink class="nav-link">Leaderboard</NuxtLink>
    </section>
</template>

<style>
.nav-container {
    padding: var(--gap-2);
    margin-top: var(--gap-2);
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: var(--gap-2);
    border-radius: var(--radius);
}

.nav-link {
    border-radius: var(--radius);
    background-color: var(--accent-150);
    color: black;
    font-size: var(--font-size-m);
    font-weight: bolder;
    padding: var(--gap-1) var(--gap-2);
    &:hover {
        transform: none;
        background-color: var(--accent-200);
    }
}
.active {
    background-color: var(--accent-600) !important;
    color: white;
}

@media (width <= 426px) {
    .nav-container {
        margin: auto;
    }
}
@media (width <= 393px) {
    .nav-link {
        font-size: var(--font-size-s);
    }
}
</style>
