import { SupabaseClient } from '@supabase/supabase-js';
export const usePuzzle = async (date?: string): Promise<Ref<string>> => {
    const supabase: SupabaseClient = useSupabaseClient();
    if (date) {
        const { data, error } = await supabase.from('puzzle').select('id').eq('date', date);
        if (error) throw new Error(error.message);
        const { id } = data[0];
        return ref(id);
    } else {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        const { data, error } = await supabase.from('puzzle').select('id').eq('date', date);
        if (error) throw new Error(error.message);
        const { id } = data[0];
        return ref(id);
    }
};
