export const useScoreModal = () => {
    const scoreModal: Ref<boolean> = ref(false);
    function showScoreModal() {
        scoreModal.value = true;
    }
    function hideScoreModal() {
        scoreModal.value = false;
    }
    return { scoreModal, showScoreModal, hideScoreModal };
};
