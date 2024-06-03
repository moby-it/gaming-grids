<script setup lang="ts">

const emits = defineEmits(['closeModal'])
const modal = ref(null);

</script>
<template>
    <Transition>
        <section ref="modal" class="sign-in">
            <header>
                <h1>Sign in</h1>
            </header>

            <section class="card">
                <Button @click="console.log('google')" signIn>
                    <NuxtImg src="/Google__G__logo.svg.webp" height="20px" />
                    Sign in with Google
                </Button>
            </section>
            <section class="card">
                <Button @click="console.log('apple')" signIn>
                    <NuxtImg src="/Apple_logo_black.svg.png" height="23px" />
                    Sign in with Apple
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
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    background-color: hsla(225, 57%, 17%, 0.9);
    border: 1px solid var(--accent-600);
    border-radius: var(--radius);
}

h1 {
    border-bottom: 2px solid var(--accent-300);
    margin-bottom: var(--gap-6)
}

Button {
    margin: var(--gap-2) var(--gap-1);
}

.card {
    padding: var(--gap-4) var(--gap-5);

}
</style>