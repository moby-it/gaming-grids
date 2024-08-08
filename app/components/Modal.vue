<script lang="ts" setup>
defineProps<{ show: boolean }>();

const emit = defineEmits(['close']);
onMounted(() => {
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            emit('close');
        }
    });
});
</script>
<template>
    <ClientOnly>
        <Teleport to="#modal">
            <Transition>
                <section class="modal-container" v-if="$props.show">
                    <slot></slot>
                </section>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>
