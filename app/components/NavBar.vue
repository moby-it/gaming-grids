<script lang="ts" setup>
const store = usePuzzleStore();
const { date, name } = storeToRefs(store);
const puzzleDate = () => useRoute().params['puzzleDate'];

const myGridLink = computed(() => (puzzleDate() ? `/${date.value}` : '/'));

const mostPopularLink = computed(() =>
    puzzleDate() ? `/${date.value}/most-popular` : '/most-popular'
);

const leaderboardsLink = computed(() =>
    puzzleDate() ? `/${date.value}/leaderboard` : '/leaderboard'
);

const showPuzzles = ref(false);
</script>
<template>
    <section class="navbar">
        <span class="name" style="cursor: pointer" @click="() => (showPuzzles = !showPuzzles)"
            >{{ name }} <IconsNavArrowDown
        /></span>
        <Modal :show="showPuzzles" @close="showPuzzles = false">
            <SelectPuzzleModal @close="showPuzzles = false" />
        </Modal>
        <section class="links-container">
            <NuxtLink :to="myGridLink" class="nav-link" exact-active-class="active"
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

<style scoped>
.navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.name {
    font-size: var(--font-size-xl);
    text-align: center;
    padding: var(--gap-2);
    border-radius: var(--radius);
    transition: background-color 200ms ease-in;
    &:hover {
        border-radius: var(--radius);
        background-color: var(--accent-200);
    }
}
.links-container {
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
    .links-container {
        margin: auto;
    }
}
@media (width <= 393px) {
    .nav-link {
        font-size: var(--font-size-s);
    }
}
</style>
