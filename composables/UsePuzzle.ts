import { SupabaseClient } from '@supabase/supabase-js';
import { getCurrentDate } from '~/utils/currentDate';

export const usePuzzle = async (date = getCurrentDate()): Promise<string> => {
    const supabase: SupabaseClient = useSupabaseClient();
    const { data, error } = await supabase.from('puzzle').select('id').eq('date', date);
    if (error) throw new Error(error.message);
    const { id } = data[0];
    return id;
};
