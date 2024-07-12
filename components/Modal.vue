<script lang="ts" setup>
const props = defineProps<{ show: boolean }>();
</script>
<template>
    <ClientOnly>
        <Teleport to="#modal">
            <Transition>
                <section class="modal-container" v-if="props.show">
                    <slot></slot>
                </section>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>
