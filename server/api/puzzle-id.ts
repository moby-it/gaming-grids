import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { getCurrentDate } from '~/utils/currentDate';
import { fetchPuzzleIdByDate } from '~/utils/puzzle';

export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    let puzzleDate = getQuery(event).puzzleDate ? (getQuery(event).puzzleDate as string) : '';
    console.log(puzzleDate);
    if (!puzzleDate) {
        console.log('running');
        puzzleDate = getCurrentDate();
    }
    const puzzleId = await fetchPuzzleIdByDate(supabase, puzzleDate);
    if (!puzzleId)
        throw createError({
            statusCode: 404,
            message: 'Could not find puzzle corresponding to this date!',
            fatal: true,
        });
    return puzzleId;
});
