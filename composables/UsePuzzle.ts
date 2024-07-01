import { SupabaseClient } from '@supabase/supabase-js';
export const usePuzzle = async () => {
    const supabase: SupabaseClient = useSupabaseClient();

    const { user } = useAuth();
    const { name, restrictions } = await getPuzzleInfo(supabase);
    const { cells, guesses } = await getPuzzleBody(user.value?.id, supabase);
    const { data, error } = await supabase.from('puzzle').select('id')
    if (error) throw new Error(error.message);
    const cellAnswers = await getPuzzleAnswers(supabase, data[0].id);
    return {
        name, cells, restrictions, guesses, cellAnswers
    };

}
