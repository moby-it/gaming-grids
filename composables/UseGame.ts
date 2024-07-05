import type { Champion } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';
import { type Cell } from '~/utils/cells';
export const useGame = async (id: string | undefined, puzzleId: string) => {
    const selectedCell = ref<Cell>({
        x: -1,
        y: -1,
    });
    const supabase: SupabaseClient = useSupabaseClient();
    const { name, restrictions } = await getPuzzleInfo(supabase, puzzleId);
    const { cells, guesses } = await getPuzzleBody(id, puzzleId, supabase);
    const cellMetadata = await getCellMetadata(cells.value, supabase, puzzleId);
    supabase.auth.onAuthStateChange(async (event, session) => {
        setTimeout(async () => {
            const user = session?.user;
            const puzzleBody = await getPuzzleBody(user?.id, puzzleId, supabase);
            cells.value = puzzleBody.cells.value;
            guesses.value = puzzleBody.guesses.value;
            cellMetadata.value = (await getCellMetadata(cells.value, supabase, puzzleId)).value;
        }, 0);
    });
    async function handleChampionChosen(champion: Champion): Promise<void> {
        const userId = id ? id : null;
        if (guesses.value > 0) {
            const supabase: SupabaseClient = useSupabaseClient();
            const { data: score } = await supabase.rpc('champion_chosen', {
                x: selectedCell.value.x,
                y: selectedCell.value.y,
                p_id: puzzleId,
                u_id: userId,
                champion_name: champion.name,
            });
            if (score + 1) {
                cells.value[selectedCell.value.x - 1][selectedCell.value.y - 1] = champion.name;
                cellMetadata.value.championIds[selectedCell.value.x - 1][selectedCell.value.y - 1] =
                    champion.id;
                cellMetadata.value.rarityScore[selectedCell.value.x - 1][selectedCell.value.y - 1] =
                    score;
            }
            --guesses.value;
            if (!userId) {
                localStorage.setItem(
                    'localGame',
                    JSON.stringify({
                        cells: cells.value,
                        guesses: guesses.value,
                    })
                );
            }
        }
        resetSelectedCell(selectedCell.value);
    }
    return {
        name,
        cells,
        restrictions,
        guesses,
        cellMetadata,
        selectedCell,
        handleChampionChosen,
    };
};
