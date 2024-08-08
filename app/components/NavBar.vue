<script lang="ts" setup>
const route = useRoute();
const puzzleDate = (route.params.puzzleDate as string) || '';
const mostPopularLink = puzzleDate ? `/${puzzleDate}/most-popular` : '/most-popular';
const leaderboardsLink = puzzleDate ? `/${puzzleDate}/leaderboard` : '/leaderboard';
const store = usePuzzleStore();
const { name } = storeToRefs(store);
const showPuzzles = ref(false);
</script>
<template>
    <section>
        <span class="name" @click="() => (showPuzzles = !showPuzzles)"
            >{{ name }} <NavArrowDown style="cursor: pointer"
        /></span>
        <Modal :show="showPuzzles" @close="showPuzzles = false">
            <SelectPuzzleModal />
        </Modal>
        <section class="nav-container">
            <NuxtLink :to="`/${puzzleDate}`" class="nav-link" exact-active-class="active"
                >My grid</NuxtLink
            >
            <NuxtLink :to="mostPopularLink" class="nav-link" exact-active-class="active"
                >Most popular</NuxtLink
            >
            <NuxtLink :to="leaderboardsLink" class="nav-link" exact-active-class="active"
                >Leaderboard</NuxtLink
            >
        </section>
    </section>
</template>

<style>
.name {
    font-size: var(--font-size-xl);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
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
