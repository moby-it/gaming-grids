<script setup>
const { user } = useAuth();
if (user.value) {
    await navigateTo('/');
}
</script>
<template>
    <section v-if="!user">
        <SignInCard />
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: var(--gap-6);
}
</style>
