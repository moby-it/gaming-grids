import { serverSupabaseClient } from '#supabase/server';
import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const queryParams = getQuery(event);
    const { puzzleId, championIds } = queryParams;
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
    setHeader(event, 'Cache-Control', 'max-age=60, must-revalidate');
    return rarityScores;
});
