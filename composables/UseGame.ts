import type { Champion } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';
import { type Cell } from '~/utils/cells';

export const useGame = async (puzzleId: string, userId?: string) => {
    const supabase: SupabaseClient = useSupabaseClient();

    const { name, restrictions } = await getPuzzleInfo(supabase, puzzleId);
    let { cells, guesses } = await getPuzzleBody(supabase, puzzleId, userId);

    const cellsMetadata = await getCellsMetadata(supabase, cells, puzzleId);

    async function handleChampionChosen(champion: Champion, selectedCell: Cell): Promise<void> {
        if (guesses <= 0) return;
        const { data: score } = await supabase.rpc('champion_chosen', {
            x: selectedCell.x,
            y: selectedCell.y,
            p_id: puzzleId,
            champion_name: champion.name,
            u_id: userId ?? null,
        });
        if (score > 0) {
            cells[selectedCell.x - 1][selectedCell.y - 1] = champion.name;
            cellsMetadata.championIds[selectedCell.x - 1][selectedCell.y - 1] = champion.id;
            cellsMetadata.rarityScore[selectedCell.x - 1][selectedCell.y - 1] = score;
        }
        --guesses;

        if (!userId) {
            localStorage.setItem(
                'localGame',
                JSON.stringify({
                    cells: cells,
                    guesses: guesses,
                })
            );
        }

        resetSelectedCell(selectedCell);
    }
    return {
        name,
        cells,
        restrictions,
        guesses,
        cellsMetadata,
        handleChampionChosen,
    };
};
