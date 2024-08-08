import { serverSupabaseClient } from '#supabase/server';
import { UserPuzzle } from '#imports';
export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const body = await readBody(event);
    const { puzzleId } = body;
    if (!puzzleId)
        createError({
            statusCode: 404,
            statusMessage: 'Puzzle id not found',
        });
    const supabase = await serverSupabaseClient<{ user_puzzle: UserPuzzle }>(event);
    const { error } = await supabase
        .from('user_puzzle')
        .update({ guesses: 0 })
        .eq('user_id', userId)
        .eq('puzzle_id', puzzleId);
    if (error)
        throw createError({
            statusCode: +error.code,
            statusMessage: error.message,
        });
    return;
});
