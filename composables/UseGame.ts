import { SupabaseClient } from '@supabase/supabase-js';
export const useGame = async (userId: string | undefined, puzzleId: string) => {
    const supabase: SupabaseClient = useSupabaseClient();

    const { user } = useAuth();
    const { name, restrictions } = await getPuzzleInfo(supabase, puzzleId);
    const { cells, guesses } = await getPuzzleBody(userId, supabase);
    const cellAnswers = await getPuzzleAnswers(supabase, puzzleId);
    return {
        name, cells, restrictions, guesses, cellAnswers
    };

}
