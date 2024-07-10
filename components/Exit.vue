<template>
    <svg
        class="exit"
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
        />
    </svg>
</template>
<style scoped>
.exit {
    cursor: pointer;
    border-radius: 0 var(--radius) 0 0;
    padding: var(--gap-2);
    color: var(--accent-300);

    &:hover {
        background-color: var(--primary-600);
    }
}
</style>
