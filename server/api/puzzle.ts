import { serverSupabaseClient } from '#supabase/server';
import {
    getPuzzleBody,
    getPuzzleInfo,
    getPuzzleMetadata,
    PuzzleInfo,
    PuzzleMetadata,
} from '~/utils/puzzle';
import getUserId from '../middleware/getUserId';
export default defineEventHandler(async (event) => {
    await getUserId(event);
    let cells: string[][] = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    let guesses = 0;
    let name = '';
    let restrictions = { row: [''], column: [''] };
    let puzzleMetadata: PuzzleMetadata = {
        championIds: [['']],
        rarityScore: [[null]],
        possibleAnswers: [[0]],
    };
    const supabase = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    if (!puzzleId) throw new Error('Puzzle Id not found!');
    const userId = event.context.userId;
    const puzzleInfo: PuzzleInfo = await getPuzzleInfo(supabase, puzzleId);
    if (userId) {
        const puzzleBody = await getPuzzleBody(supabase, puzzleId, userId);
        cells = puzzleBody.cells;
        puzzleMetadata = await getPuzzleMetadata(supabase, cells, puzzleId);
    }
    name = puzzleInfo.name;
    restrictions = puzzleInfo.restrictions;
    return { name, restrictions, cells, guesses, puzzleMetadata, puzzleId };
});
