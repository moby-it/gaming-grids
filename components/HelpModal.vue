<script setup lang="ts">
const emits = defineEmits(['closeModal']);
const modal = ref(null);
onClickOutside(modal, () => {
    emits('closeModal');
});
const show: Ref<boolean> = ref(false);
setTimeout(() => show.value = true, 0)
</script>

<template>
    <Transition>
        <section class="modal-container" v-if="show">
            <section ref="modal" class="help-modal">
                <header>
                    <h4>
                        How to play LeagueGrid.
                    </h4>
                    <svg class="exit" @click="$emit('closeModal')" xmlns="http://www.w3.org/2000/svg" width="1.5rem"
                        height="1.5rem" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
                    </svg>
                </header>
                <p>You have nine guesses to fill-put the grid.</p>
                <p> Select a champion for each cell that matches the restrictions in the respective row/column
                    combination.
                </p>
                <p>You get one undo per day to help you correct an incorrect guess, or try to find a rarer selection to
                    improve your score.</p>
                <p>Rarity scores are based on how unique your selections are in relation to the rest of the contenders.
                    The
                    lower your rarity score, the better. Searching for unique Champions will help you keep your rarity
                    score
                    low!</p>
                <p>A champion can be used more than once.</p>
                <p>A new grid is available each day at midnight GMT!</p>
            </section>
        </section>
    </Transition>
</template>

<style scoped>
.modal-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.help-modal {
    cursor: default;
    border-top: 1px solid var(--primary-600);
    border-left: 1px solid var(--primary-600);
    margin-top: var(--cell);
    border-radius: var(--radius);
    width: 600px;
    background-color: hsla(225, 57%, 17%, 0.9);
    box-shadow: 3px 3px 10px var(--primary-600);

    p,
    h4 {
        font-family: 'Spiegel';
        color: var(--accent-300);
        font-weight: 600;
        padding: var(--gap-4);
    }

    p {
        font-size: var(--font-size-s);
    }

    h4 {
        font-size: var(--font-size-l);
    }
}

.exit {
    cursor: pointer;
    border-radius: 0 var(--radius) 0 0;
    padding: var(--gap-4);
    color: var(--accent-300);

    &:hover {
        background-color: var(--primary-600);
    }
}

header {
    display: flex;
    justify-content: space-between;
    align-items: start;
}


@media (max-width:992px) {
    .help-modal {
        width: 550px;

        p,
        h4 {
            padding: var(--gap-3) var(--gap-4);
        }
    }
}



@media (max-width:576px) {

    .help-modal {

        width: 450px;


        p,
        h4 {
            padding: var(--gap-3) var(--gap-4);
        }
    }
}

@media (max-width:425px) {
    .help-modal {
        width: 350px;

    }
}
</style>