import { SupabaseClient } from '@supabase/supabase-js';

export const useGame = async (puzzleId: string, userId?: string) => {
    const supabase: SupabaseClient = useSupabaseClient();

    const { name, restrictions } = await getPuzzleInfo(supabase, puzzleId);
    let { cells, guesses } = await getPuzzleBody(supabase, puzzleId, userId);

    const puzzleMetadata = await getpuzzleMetadata(supabase, cells, puzzleId);
    return {
        name,
        cells,
        restrictions,
        guesses,
        puzzleMetadata,
    };
};
