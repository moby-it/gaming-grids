import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

import * as v from 'valibot';
import { LeaderboardSchema } from '../utils/types';

export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    const userId = event.context.userId || null;
    const { data, error } = await supabase.rpc('get_leaderboard', {
        p_id: puzzleId,
        u_id: userId,
    });
    if (error) throw createError(error);
    const { output, success, issues } = v.safeParse(LeaderboardSchema, data);
    if (!success) {
        console.error(issues);
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse leaderboard.',
        });
    }

    setHeader(event, 'Cache-Control', 'max-age=3600, must-revalidate');
    return output;
});
