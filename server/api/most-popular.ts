import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import getMostPopular from '~/utils/getMostPopular';

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        const supabase: SupabaseClient = await serverSupabaseClient(event);
        const puzzleId = getQuery(event).puzzleId as string;
        const { championNames, championIds, rarityScores } = await getMostPopular(
            supabase,
            puzzleId
        );
        return { championNames, championIds, rarityScores };
    }
    throw createError({
        statusCode: 405,
        statusMessage: 'Method not supported for /most-popular',
    });
});
