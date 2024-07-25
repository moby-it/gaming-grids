import { serverSupabaseClient } from '#supabase/server';
import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
export default defineEventHandler(async (event) => {
    if (event.method === 'POST') {
        const supabase: SupabaseClient = await serverSupabaseClient(event);
        const body = await readBody(event);
        const { puzzleId, championIds } = body;
        const { data } = await supabase.rpc('get_puzzle_rarity_scores', {
            p_id: puzzleId,
            champion_ids: championIds,
        });
        const { output: rarityScores, success } = v.safeParse(v.array(v.array(v.number())), data);
        if (!success)
            throw createError({
                statusCode: 500,
                statusMessage: 'Could not parse rarity score for local puzzle.',
            });
        return rarityScores;
    }
    throw createError({
        statusCode: 405,
        statusMessage: 'Method not supported for /rarity-scores',
    });
});
