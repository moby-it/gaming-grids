import type { Champion } from "./fetchResults";
function focusList(focusedListItem: (HTMLLIElement | null), event: string): void {
  if (event === 'ArrowUp') {
    if (focusedListItem) {
      focusedListItem?.
        previousElementSibling?.
        previousElementSibling?.
        previousElementSibling?.
        previousElementSibling?.
        scrollIntoView();
    }
  } else {
    if (focusedListItem) {
      focusedListItem?.
        previousElementSibling?.
        previousElementSibling?.
        previousElementSibling?.
        scrollIntoView();
    }
  }
};
export function navigateList(eventName: string,
  results: globalThis.Ref<Champion[] | null>,
  focusedChoice: globalThis.Ref<number | null>,
  focusedListItem: HTMLLIElement | null,
  emits: (event: 'championChosen', ...args: any[]) => void
): void {

  if (results.value?.length) {
    if (focusedChoice.value === null) {
      focusedChoice.value = 0;
      return;
    }
    if (eventName === 'ArrowUp' && focusedChoice.value > 0) {
      focusList(focusedListItem as HTMLLIElement, eventName);
      --focusedChoice.value;
      return;
    }
    if (eventName === 'ArrowDown' && focusedChoice.value < results.value.length - 1) {
      focusList(focusedListItem as HTMLLIElement, eventName);
      ++focusedChoice.value;
      return;
    }
    if (eventName === 'Enter') {
      emits('championChosen', results.value[focusedChoice.value]);
    };
  }
}