import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import * as v from 'valibot';

export default defineEventHandler(async (event) => {
    const currentDate = new Date().toUTCString();
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const { data, error } = await supabase
        .from('puzzle')
        .select('id, date')
        .lte('date', currentDate)
        .order('date', { ascending: false })
        .limit(10);
    if (error) throw createError(error);
    const puzzles = v.parse(v.array(v.object({ id: v.string(), date: v.string() })), data);
    setHeader(event, 'Cache-Control', 'max-age=3600, must-revalidate');
    return puzzles;
});
