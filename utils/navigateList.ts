export function focusListItem(focusedListItem: HTMLLIElement, event: string): void {
    if (event === 'ArrowUp') {
        focusedListItem?.previousElementSibling?.previousElementSibling?.previousElementSibling?.previousElementSibling?.scrollIntoView();
    } else {
        focusedListItem?.previousElementSibling?.previousElementSibling?.previousElementSibling?.scrollIntoView();
    }
}
export function getFocusedChoice(
    eventName: string,
    results: string[],
    focusedChoice: number
): number {
    if (!results.length) return -1;
    if (focusedChoice < 0) return 0;
    if (focusedChoice === 0 && eventName === 'ArrowUp') return 0;
    if (eventName === 'ArrowDown' && focusedChoice < results.length - 1) return ++focusedChoice;
    if (focusedChoice > 0 && eventName === 'ArrowUp') return --focusedChoice;
    return -1;
}
