import { serverSupabaseClient } from '#supabase/server';
import { giveUp } from '~/utils/puzzle';
import getUserId from '../middleware/getUserId';

export default defineEventHandler(async (event) => {
    await getUserId(event);
    const userId = event.context.userId;

    const body = await readBody(event);
    const { puzzleId } = body;
    if (!puzzleId)
        createError({
            statusCode: 404,
            statusMessage: 'Puzzle id not found',
        });
    const supabase = await serverSupabaseClient(event);
    await giveUp(supabase, puzzleId, userId);
});
