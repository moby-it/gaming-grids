import { serverSupabaseClient } from '#supabase/server';
import { getPuzzleMetadata } from '~/utils/puzzle';
export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { cells, puzzleId } = body;
    const metadata = await getPuzzleMetadata(supabase, cells, puzzleId);
    return { metadata };
});
