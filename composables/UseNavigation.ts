import type { Champion } from '~/utils/fetchResults';
import type ListItem from '../components/ListItem.vue';

export const useNavigation = (
    input: Ref<unknown>,
    listItems: Ref<InstanceType<typeof ListItem>[]>,
    emits: (event: 'championChosen', ...args: any[]) => void
) => {
    const results = ref<Champion[] | null>(null);
    const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
    const focusedChoice = ref<number | null>(null);

    onMounted(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }
            const focusedListItem = listItems.value.find((li) =>
                li.$el.classList.contains('focused')
            );
            navigateList(
                e.key,
                results,
                focusedChoice,
                focusedListItem?.$el as HTMLLIElement,
                emits
            );
        };
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });
    watchEffect(() => {
        if (timeout.value) clearTimeout(timeout.value);
        if (input.value) {
            timeout.value = setTimeout(() => {
                fetchResults(input.value, results);
                focusedChoice.value = 0;
            }, 0);
        }
    });
    return { results, focusedChoice, listItems };
};
