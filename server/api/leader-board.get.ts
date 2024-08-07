import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import getUserId from '../middleware/getUserId';
import * as v from 'valibot';
export default defineEventHandler(async (event) => {
    const leaderboard = v.pipe(
        v.array(v.object({ rank: v.number(), user_name: v.string(), user_score: v.number() })),
        v.transform((l) =>
            l.map((item) => ({
                rank: item.rank,
                userName: item.user_name,
                userScore: item.user_score,
            }))
        )
    );

    await getUserId(event);
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    const userId = event.context.userId;
    const { data, error } = await supabase.rpc('get_leaderboard', {
        p_id: puzzleId,
        u_id: userId,
    });
    const { output, success } = v.safeParse(leaderboard, data);
    if (!success)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse leaderboard.',
        });

    setHeader(event, 'Cache-Control', 'max-age=60, must-revalidate');
    return output;
});
