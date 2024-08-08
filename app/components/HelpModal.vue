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
    <Modal :show="helpModal" @close="hideHelpModal">
        <section ref="modal" class="modal">
            <header>
                <hgroup>
                    <h2>Welcome to LeagueGrid!</h2>
                    <IconsExit @click="hideHelpModal" />
                </hgroup>
                <h4>Here's how to play:</h4>
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
    p {
        font-size: var(--font-size-s);
    }

    header > hgroup {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: var(--gap-2);
    }
}
</style>
