<script setup lang="ts">
const helpModal = ref(null);

const ShowHelpModal: Ref<boolean> = ref(true);
onClickOutside(helpModal, () => {
    ShowHelpModal.value = false;
});
if (process.client) {
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            ShowHelpModal.value = false;
        }
    });
}
</script>

<template>
    <section class="modal-container" v-if="ShowHelpModal">
        <section ref="helpModal" class="help-modal">
            <header>
                <h4>
                    How to play LeagueGrid.
                </h4>
                <h4 class="exit" @click="() => ShowHelpModal = false">
                    X
                </h4>
            </header>
            <p>You have nine guesses to fill-put the grid.</p>
            <p> Select a champion for each cell that matches the restrictions in the respective row/column combination.
            </p>
            <p>You get one undo per day to help you correct an incorrect guess, or try to find a rarer selection to
                improve your score.</p>
            <p>Rarity scores are based on how unique your selections are in relation to the rest of the contenders. The
                lower your rarity score, the better. Searching for unique Champions will help you keep your rarity score
                low!</p>
            <p>A champion can be used more than once.</p>
            <p>A new grid is available each day at midnight GMT!</p>
        </section>
    </section>
</template>

<style scoped>
.modal-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: hsla(198, 100%, 25%, 0.2);
    display: flex;
    justify-content: center;
    align-items: start;
}

.help-modal {
    cursor: default;
    border-top: 1px solid var(--primary-600);
    border-left: 1px solid var(--primary-600);
    margin-top: var(--cell);
    border-radius: var(--radius);
    width: 36rem;
    height: 27rem;
    ;
    background-color: hsla(225, 57%, 17%, 0.9);
    box-shadow: 3px 3px 10px var(--primary-600);

    p,
    h4 {
        font-family: 'Spiegel';
        color: var(--accent-300);
        font-weight: 600;
        padding: var(--gap-3);
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

    &:hover {
        background-color: var(--primary-600);
    }
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width:992px) {
    .help-modal {
        width: 32rem;
        height: 23rem;

        p,
        h4 {
            padding: var(--gap-2);
        }
    }


}

@media (max-width:768px) {
    .modal-container {
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .help-modal {
        width: 30rem;
        height: 21rem;
    }
}


@media (max-width:576px) {

    .help-modal {
        width: 26rem;
        height: 22rem;

        p,
        h4 {
            padding: var(--gap-2);
        }
    }
}

@media (max-width:425px) {
    .help-modal {
        width: 22rem;
        height: 20rem;

    }
}
</style>