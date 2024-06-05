<script setup lang="ts">
const props = defineProps<{
    username?: string;
    email: string;
    userImageUrl: string;
}>();
const info = ref();
const showInfo = ref(false);
const emits = defineEmits(['logOut']);
onClickOutside(info, (e: Event) => {
    showInfo.value = false;
    e.stopImmediatePropagation();
});
</script>
<template>
    <section class="container">
        <header @click="showInfo = true">
            <NuxtImg class="img" :src="userImageUrl" height="40px" />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <path
                        d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor"
                        d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z" />
                </g>
            </svg>
        </header>
        <section v-if="showInfo" ref="info" class="info">
            <h5>
                {{ props.username }}
            </h5>
            <h6>
                {{ props.email }}
            </h6>

            <footer @click="$emit('logOut')">
                <h5 class="logout">logout</h5>
            </footer>
        </section>
    </section>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    cursor: pointer;
    color: var(--accent-200);

    :hover {
        color: var(--accent-300);

    }

}

.container {
    display: flex;

    :hover {
        .img {
            border: 3px solid var(--accent-300);
        }

    }
}


.img {
    border-radius: 50%;
    border: 3px solid var(--accent-200);
    box-sizing: border-box;
}


.info {
    background-color: var(--primary-900);
    position: absolute;
    margin-top: 50px;
    margin-left: -100px;
    border: 1px solid var(--accent-300);
    border-radius: var(--radius);
    box-shadow: 3px 3px 8px var(--accent-900);

    & h5,
    h6 {
        padding: var(--gap-1) var(--gap-3)
    }

    & h6 {
        color: var(--accent-200) !important;
        font-size: var(--font-size-s);
    }
}

footer {
    padding-top: var(--gap-2);

    :hover {
        background-color: var(--primary-700)
    }

    &p {
        color: blue;
    }

}

.logout {
    border-top: 1px solid var(--accent-900);
    border-radius: 0 0 var(--radius) var(--radius);
    color: var(--accent-300);
    font-size: var(--font-size-m);
    cursor: pointer;
}


@media (max-width:576px) {
    .img {
        height: var(--gap-5);
    }
}
</style>