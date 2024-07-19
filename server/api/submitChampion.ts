import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { getAnswerScore } from '~/utils/puzzle';

export default defineEventHandler(async (event) => {
    const supabase: SupabaseClient = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { x, y, puzzleId, champion, userId } = body;
    const score = await getAnswerScore(supabase, puzzleId, x, y, champion, userId);
    return { score };
});
