export const useModal = () => {
  const helpModal: Ref<boolean> = ref(false);
  const signInModal: Ref<boolean> = ref(false);
  function showHelpModal() {
    helpModal.value = true;
  }
  function hideHelpModal() {
    helpModal.value = false;
  }

  if (process.client) {
    if (!localStorage.getItem('seenModal')) showHelpModal();
    localStorage.setItem('seenModal', 'true');
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        hideHelpModal();
      }
    });
  }
  return { helpModal, showHelpModal, hideHelpModal }
}