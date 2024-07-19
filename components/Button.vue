<script setup lang="ts">
type ButtonClass = 'primary' | 'accent' | 'neutral' | 'nav';
const props = withDefaults(defineProps<{ buttonClass?: ButtonClass }>(), {
    buttonClass: 'neutral',
});
</script>

<template>
    <button :class="props.buttonClass">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    color: white;
    padding: var(--gap-2) var(--gap-3);
    border-radius: var(--radius);
    outline: none;
    border: none;
    cursor: pointer;
    transition: transform 200ms ease-in;
    margin-right: var(--gap-1);
    font-size: var(--font-size-m);

    &:hover {
        transform: translateY(-2px);
    }
}

button.neutral {
    color: var(--primary-100);
    background: linear-gradient(0.25turn, var(--neutral-200), var(--neutral-200));
}

button.primary {
    background: linear-gradient(0.25turn, var(--primary-300), var(--primary-600));
}
button.accent {
    color: var(--primary-100);
    background: linear-gradient(0.25turn, var(--accent-300), var(--accent-600));
}
button.nav {
    border-radius: 20px;
    background-color: var(--accent-100);
    color: black;
    &:hover {
        transform: none;
        background-color: var(--primary-900);
        color: white;
    }
}
button:disabled {
    cursor: default;
}

@media (max-width: 425px) {
    button {
        font-size: var(--font-size-s);
    }
}
</style>
