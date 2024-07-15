<script setup lang="ts">
const { signInWithGoogle } = useAuth();
</script>
<template>
    <Transition>
        <section class="sign-in">
            <header>
                <h1>Sign in</h1>
            </header>

            <section class="card">
                <Button @click="async () => await signInWithGoogle()">
                    <NuxtImg src="/Google__G__logo.svg.webp" height="20px" />
                    Sign in with Google
                </Button>
            </section>
        </section>
    </Transition>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
}

.sign-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: hsla(225, 57%, 17%, 0.9);
    border: 1px solid var(--accent-600);
    border-radius: var(--radius);
}
button {
    color: var(--primary-900);
    flex-direction: row;
    width: 14rem;
    display: flex;
    justify-content: space-evenly;
}

h1 {
    border-bottom: 2px solid var(--accent-300);
    margin-bottom: var(--gap-4);
}

Button {
    margin: var(--gap-1);
    display: flex;
    flex-direction: row;
}

.card {
    padding: var(--gap-4) var(--gap-5);
    flex-direction: row;
}
</style>
