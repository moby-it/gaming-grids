<script lang="ts" setup>
const route = useRoute();
const puzzleDate = route.params.puzzleDate;
const mostPopularLink = puzzleDate ? `${puzzleDate}/most-popular` : '/most-popular';
</script>
<template>
    <section class="nav-container">
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
    justify-content: space-evenly;
    gap: var(--gap-2);
    border-radius: var(--radius);
    margin-right: calc(var(--cell) / 2);
}

.nav-link {
    border-radius: var(--radius);
    background-color: var(--accent-100);
    color: black;
    font-size: var(--font-size-l);
    font-weight: bolder;
    padding: var(--gap-1) var(--gap-2);
    &:hover {
        transform: none;
        background-color: var(--primary-300);
        color: white;
    }
}
.active {
    background-color: var(--primary-600) !important;
    color: white;
}

@media (width <= 426px) {
    .nav-container {
        margin: auto;
    }
}
</style>
