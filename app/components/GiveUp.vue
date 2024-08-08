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
                <section style="text-align: center" class="heading">
                    <h2>Are you sure you want to give up?</h2>
                </section>
                <section>
                    <Exit style="align-self: flex-end" @click="showModal = false" />
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
