<script setup lang="ts">
const showModal = ref<boolean>(false);
const emits = defineEmits(['giveUp']);
const modal = ref(null);
function giveUp() {
    showModal.value = false;
    emits('giveUp');
}
onClickOutside(modal, (e: Event) => {
    showModal.value = false;
    e.stopPropagation();
});
</script>

<template>
    <Button @click="showModal = true"> Give up </Button>
    <Modal :show="showModal" @close="showModal = false">
        <section class="modal" ref="modal">
            <header>
                <section class="heading">
                    <h1>Are you sure you want to give up?</h1>
                </section>
                <section>
                    <Exit class="exit" @click="showModal = false" />
                </section>
            </header>
            <main>
                <Button button-class="accent" @click="giveUp">Yes</Button>
                <Button button-class="accent" @click="showModal = false">No</Button>
            </main>
        </section>
    </Modal>
</template>

<style scoped>
.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
    text-align: center;
    box-shadow: 3px 3px 10px var(--primary-600);

    h1 {
        font-family: 'Spiegel';
        color: var(--accent-300);
        font-size: var(--font-size-l);
    }
}
.exit {
    align-self: flex-end;
}
main {
    display: flex;
    width: 100%;
    padding-bottom: var(--gap-4);
    flex-direction: row;
    justify-content: space-evenly;
}
.heading {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: var(--gap-5);
    margin-bottom: var(--gap-4);
}
header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}
</style>
