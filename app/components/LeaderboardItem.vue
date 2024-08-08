<script lang="ts" setup>
const props = defineProps<{ user: LeaderboardUsers[number] }>();
const rankClass = computed(() => {
    if (props.user.rank === 1) {
        return 'gold';
    }
    if (props.user.rank === 2) {
        return 'silver';
    }
    if (props.user.rank === 3) {
        return 'bronze';
    }
    return '';
});
</script>
<template>
    <li>
        <section class="user">
            <section class="rank" :class="rankClass">
                <span>{{ props.user.rank }}.</span>
            </section>
            <section>
                <span>{{ props.user.username }}</span>
            </section>
            <section class="score">
                <span>{{ props.user.userScore.toFixed(2) }}</span>
            </section>
        </section>
    </li>
</template>

<style scoped>
.user {
    display: flex;
    width: calc(var(--cell) * 2.5);
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--accent-300);
    padding: var(--gap-2) var(--gap-2);
    margin: var(--gap-3) 0;
    border-radius: calc(var(--radius) * 2);
}
.rank {
    border: 1px solid var(--accent-300);
    width: var(--gap-5);
    height: var(--gap-5);
    border-radius: var(--gap-5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.score {
    font-size: var(--font-size-s);
}

.gold.rank {
    background-color: gold !important;
    color: var(--primary-900) !important;
    border: 1px solid gold !important;
}
.silver.rank {
    background-color: silver !important;
    color: var(--primary-900) !important;
    border: 1px solid silver !important;
}
.bronze.rank {
    background-color: rgb(205, 127, 50) !important;
    color: var(--primary-900) !important;
    border: 1px solid rgb(205, 127, 50) !important;
}
.current-user {
    background-color: var(--accent-100) !important;
    border-radius: var(--radius);
    color: var(--primary-700);
    .user {
        border: none;
    }
}
@media (width <= 576px) {
    .user {
        width: calc(var(--cell) * 3.5);
    }
}
</style>
