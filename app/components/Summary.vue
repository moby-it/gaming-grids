<script setup lang="ts">
const props = defineProps<{
    rarityScores: (number | null)[][];
    score: number;
    name: string;
    status: 'in progress' | 'completed';
    scoreModal: boolean;
}>();
const emits = defineEmits(['showModal', 'hideModal']);

const getCellScore = (x: number, y: number): number => {
    return props.rarityScores[x - 1]![y - 1] as number;
};

const modal = ref(null);
const showInfo = ref(false);
onClickOutside(modal, (e: Event) => {
    emits('hideModal');
    showInfo.value = false;
    e.stopPropagation();
});
</script>

<template>
    <Button
        style="align-self: center"
        @click="emits('showModal')"
        v-if="status === 'completed'"
        button-class="primary"
    >
        <section class="score-modal">
            <svg
                style="margin-right: 10px"
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M16 11V3H8v6H2v12h20V11zm-6-6h4v14h-4zm-6 6h4v8H4zm16 8h-4v-6h4z"
                />
            </svg>
            Summary
        </section>
    </Button>
    <Modal :show="scoreModal" @close="$emit('hideModal')">
        <section class="modal" ref="modal">
            <header>
                <section class="heading">
                    <h1>Summary</h1>
                    <h2>{{ props.name }}</h2>
                </section>
                <section>
                    <Exit class="exit" @click="emits('hideModal')" />
                </section>
            </header>
            <section class="grid-body">
                <section class="rows" v-for="y in 3">
                    <ModalCell v-for="x in 3" :x="x" :y="y" :rarity-score="getCellScore(x, y)" />
                </section>
            </section>
            <footer>
                <h2>
                    Rarity score
                    <div class="tooltip">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1rem"
                            height="1rem"
                            viewBox="0 0 256 256"
                        >
                            <path
                                fill="currentColor"
                                d="M136 180a8 8 0 1 1-8-8a8 8 0 0 1 8 8m-8-104c-19.85 0-36 14.36-36 32v4a4 4 0 0 0 8 0v-4c0-13.23 12.56-24 28-24s28 10.77 28 24s-12.56 24-28 24a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0v-4.2c18-1.77 32-15.36 32-31.8c0-17.64-16.15-32-36-32m100 52A100 100 0 1 1 128 28a100.11 100.11 0 0 1 100 100m-8 0a92 92 0 1 0-92 92a92.1 92.1 0 0 0 92-92"
                            />
                        </svg>
                        <span class="tooltiptext">
                            Rarity score is calculated as the sum of the percentages for each
                            correct cell, plus 100 for each empty cell. A lower score means your
                            answers are more rare. This score will change throughout the day as more
                            games are completed.
                        </span>
                    </div>
                </h2>

                <h1>{{ props.score }}</h1>
            </footer>
        </section>
    </Modal>
</template>

<style scoped>
.score-modal {
    display: flex;
    justify-content: center;
    text-align: center;
}
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
        font-size: var(--font-size-xl);
    }

    h2 {
        font-size: var(--font-size-m);
    }
}

.grid-body {
    display: flex;
    margin: var(--gap-2) 0;
}
footer {
    margin: var(--gap-4) 0;
    h2 {
        display: flex;
        align-items: center;
        gap: var(--gap-1);
    }
    svg {
        cursor: pointer;
    }
}
.info {
    position: absolute;
    left: 0;
    top: 0;
    padding: var(--gap-2) var(--gap-3);
    background-color: black;
    width: 18rem;
    & p {
        font-size: var(--font-size-s);
    }
}
.exit {
    align-self: flex-end;
}
.bubble {
    left: 2.5rem;
    bottom: -20px;
    position: relative;
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
