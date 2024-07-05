export const useModal = () => {
    const helpModal: Ref<boolean> = ref(false);
    function showHelpModal() {
        helpModal.value = true;
    }
    function hideHelpModal() {
        helpModal.value = false;
    }
    onMounted(() => {
        if (!localStorage.getItem('seenModal')) {
            if (!localStorage.getItem('seenModal')) setTimeout(() => showHelpModal(), 0);
            localStorage.setItem('seenModal', 'true');
        }
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                hideHelpModal();
            }
        });
    });
    return { helpModal, showHelpModal, hideHelpModal };
};
