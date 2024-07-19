<script lang="ts" setup>
const route = useRoute();
const puzzleDate = route.params.puzzleDate;
</script>
<template>
    <section class="nav-container">
        <section class="nav-item">
            <NuxtLink :to="{ path: `/${puzzleDate}` }" class="nav-link" exact-active-class="active"
                >My grid</NuxtLink
            >
        </section>
        <section class="nav-item">
            <NuxtLink
                :to="{ path: `/${puzzleDate ? `${puzzleDate}/` : ''}most-popular` }"
                class="nav-link"
                exact-active-class="active"
                >Most popular</NuxtLink
            >
        </section>
        <section class="nav-item">
            <NuxtLink class="nav-link">LeaderBoard</NuxtLink>
        </section>
    </section>
</template>

<style>
.nav-container {
    margin-top: var(--gap-2);
    background-color: var(--accent-300);
    width: max-content;
    font-size: var(--font-size-xs);
    display: flex;
    justify-content: space-around;
    border-radius: 20px;
}
.nav-item {
    margin: var(--gap-2) 3px;
}
.nav-item:first-child {
    margin-left: var(--gap-2);
}
.nav-item:last-child {
    margin-right: var(--gap-2);
}

.nav-link {
    text-decoration: none;
    border-radius: 20px;
    background-color: var(--accent-100);
    color: black;
    font-size: var(--font-size-s);
    padding: var(--gap-1) var(--gap-2);
    &:hover {
        transform: none;
        background-color: var(--primary-600);
        color: white;
    }
}
.active {
    background-color: var(--primary-900) !important;
    color: white;
}

@media (width <= 426px) {
    .nav-container {
        margin-left: var(--cell);
    }
}
</style>
