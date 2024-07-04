import { SupabaseClient } from '@supabase/supabase-js';
export const useGame = async (userId: string | undefined, puzzleId: string) => {
    const supabase: SupabaseClient = useSupabaseClient();
    const { name, restrictions } = await getPuzzleInfo(supabase, puzzleId);
    const { cells, guesses } = await getPuzzleBody(userId, puzzleId, supabase);
    const cellAnswers = await getPuzzleAnswers(supabase, puzzleId);
    const cellInfo = await getCellInfo(cells.value, supabase, puzzleId);
    supabase.auth.onAuthStateChange(async (event, session) => {
        setTimeout(async () => {
            const user = session?.user;
            const puzzleBody = await getPuzzleBody(user?.id, puzzleId, supabase);
            cells.value = puzzleBody.cells.value;
            guesses.value = puzzleBody.guesses.value;
            cellInfo.value = (await getCellInfo(cells.value, supabase, puzzleId)).value;
        }, 0)
    })
    return {
        name, cells, restrictions, guesses, cellInfo, cellAnswers
    };

}
