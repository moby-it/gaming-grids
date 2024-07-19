import { serverSupabaseClient } from '#supabase/server';
import { getPuzzleMetadata } from '~/utils/puzzle';
export default defineEventHandler(async (event) => {
    let metadata;
    if (event.method === 'POST') {
        const supabase = await serverSupabaseClient(event);
        const body = await readBody(event);
        const { cells, puzzleId } = body;
        metadata = await getPuzzleMetadata(supabase, cells, puzzleId);
    }
    if (!metadata) throw new Error('Wrong method for specific endpoint');
    return { metadata };
});
