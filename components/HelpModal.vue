<script setup lang="ts">
const emits = defineEmits(['closeModal']);
const modal = ref(null);
const { helpModal, showHelpModal, hideHelpModal } = useHelpModal();
onClickOutside(modal, (e: Event) => {
    hideHelpModal();
    e.stopPropagation();
});
</script>

<template>
    <svg
        @click="showHelpModal"
        width="40px"
        height="40px"
        stroke-width="1.7"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#c8aa6f"
    >
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#c8aa6f"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
        <path
            d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999"
            stroke="#c8aa6f"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
        <path
            d="M12 18.01L12.01 17.9989"
            stroke="#c8aa6f"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
    </svg>
    <ClientOnly>
        <Teleport to="#modal">
            <Transition>
                <section class="modal-container" v-if="helpModal">
                    <section ref="modal" class="help-modal">
                        <header>
                            <h4>How to play LeagueGrid.</h4>
                            <Exit @click="hideHelpModal" />
                        </header>
                        <p>You have nine guesses to fill-put the grid.</p>
                        <p>
                            Select a champion for each cell that matches the restrictions in the
                            respective row/column combination.
                        </p>
                        <!-- <p>You get one undo per day to help you correct an incorrect guess, or try to find a rarer
                            selection
                            to
                            improve your score.</p> -->
                        <p>
                            Rarity scores are based on how unique your selections are in relation to
                            the rest of the contenders. The lower your rarity score, the better.
                            Searching for unique Champions will help you keep your rarity score low!
                        </p>
                        <p>A champion can be used more than once.</p>
                        <p>A new grid is available each day at midnight GMT!</p>
                    </section>
                </section>
            </Transition>
        </Teleport>
    </ClientOnly>
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
    z-index: 1;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

svg {
    cursor: pointer;
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

header {
    display: flex;
    justify-content: space-between;
    align-items: start;
}

@media (max-width: 992px) {
    .help-modal {
        width: 550px;

        p,
        h4 {
            padding: var(--gap-3) var(--gap-4);
        }
    }
}

@media (max-width: 576px) {
    .help-modal {
        width: 450px;

        p,
        h4 {
            padding: var(--gap-3) var(--gap-4);
        }
    }
}

@media (max-width: 425px) {
    .help-modal {
        width: 350px;
    }
}
</style>
