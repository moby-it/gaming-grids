import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import getMostPopular from '~/utils/getMostPopular';

export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    const { championNames, championIds, rarityScores } = await getMostPopular(supabase, puzzleId);
    setHeader(event, 'Cache-Control', 'max-age=60, must-revalidate');
    return { championNames, championIds, rarityScores };
});
