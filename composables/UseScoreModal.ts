export const useScoreModal = () => {
    onMounted(() => {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                hideScoreModal();
            }
        });
    });
    const scoreModal: Ref<boolean> = ref(false);
    function showScoreModal() {
        scoreModal.value = true;
    }
    function hideScoreModal() {
        scoreModal.value = false;
    }
    return { scoreModal, showScoreModal, hideScoreModal };
};
