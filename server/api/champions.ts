import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const term = getQuery(event).term;
    const { data, error } = await supabase
        .from('champion')
        .select('name,champion_id')
        .ilike('name', `%${term}%`);
    if (error) throw new Error(`Could not fetch results, ${error.message}`);
    return data;
});
