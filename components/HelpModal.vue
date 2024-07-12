<script setup lang="ts">
const emits = defineEmits(['closeModal']);
const modal = ref(null);
const { helpModal, hideHelpModal } = useHelpModal();
onClickOutside(modal, (e: Event) => {
    hideHelpModal();
    e.stopPropagation();
});
</script>

<template>
    <Modal :show="helpModal">
        <section ref="modal" class="modal">
            <header>
                <h4>How to play LeagueGrid.</h4>
                <Exit @click="hideHelpModal" />
            </header>
            <p>You have nine guesses to fill-put the grid.</p>
            <p>
                Select a champion for each cell that matches the restrictions in the respective
                row/column combination.
            </p>
            <p>
                Rarity scores are based on how unique your selections are in relation to the rest of
                the contenders. The lower your rarity score, the better. Searching for unique
                Champions will help you keep your rarity score low!
            </p>
            <p>A champion can be used more than once.</p>
            <p>A new grid is available each day at midnight GMT!</p>
        </section>
    </Modal>
</template>

<style scoped>
svg {
    cursor: pointer;
}

.modal {
    p,
    h4 {
        font-family: 'Spiegel';
        color: var(--accent-200);
        font-weight: 400;
        padding: var(--gap-4);
    }

    p {
        font-size: var(--font-size-s);
    }

    h4 {
        font-size: var(--font-size-l);
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: start;
    }
}
</style>
