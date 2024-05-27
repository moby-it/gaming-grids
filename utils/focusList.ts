export function focusList(focusedListItem: (HTMLLIElement | null), event: string): void {
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