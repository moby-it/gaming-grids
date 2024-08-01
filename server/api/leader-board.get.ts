import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import getUserId from '../middleware/getUserId';
import * as v from 'valibot';
export default defineEventHandler(async (event) => {
    await getUserId(event);
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    const userId = event.context.userId;
    const { data, error } = await supabase.rpc('test', {
        p_id: puzzleId,
        u_id: userId,
    });
    setHeader(event, 'Cache-Control', 'max-age=60, must-revalidate');
    return data;
});
