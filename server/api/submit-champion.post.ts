import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { x, y, puzzleId, champion, userId } = body;
    const { data: score } = await supabase.rpc('champion_chosen', {
        x: x,
        y: y,
        p_id: puzzleId,
        champion_name: champion,
        u_id: userId ?? null,
    });
    return { score };
});
