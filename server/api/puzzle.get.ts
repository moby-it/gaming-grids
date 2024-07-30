import { serverSupabaseClient } from '#supabase/server';
import { getPuzzleBody, getPuzzleInfo, PuzzleInfo } from '~/utils/puzzle';
import getUserId from '../middleware/getUserId';
export default defineEventHandler(async (event) => {
    await getUserId(event);
    let championNames: string[][] = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    let championIds: string[][] = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    let rarityScores: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    let guesses = 9;
    let name = '';
    let restrictions = { row: ['', '', ''], column: ['', '', ''] };
    let possibleAnswers: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    const supabase = await serverSupabaseClient(event);
    const puzzleId = getQuery(event).puzzleId as string;
    if (!puzzleId)
        throw createError({
            statusCode: 404,
            statusMessage: 'Puzzle Id not found',
        });
    const userId = event.context.userId;
    const puzzleInfo: PuzzleInfo = await getPuzzleInfo(supabase, puzzleId);
    if (userId) {
        const puzzleBody = await getPuzzleBody(supabase, puzzleId, userId);
        championNames = puzzleBody.championNames;
        championIds = puzzleBody.championIds;
        rarityScores = puzzleBody.rarityScores;
        guesses = puzzleBody.guesses;
    }
    name = puzzleInfo.name;
    restrictions = puzzleInfo.restrictions;
    possibleAnswers = puzzleInfo.possibleAnswers;
    return {
        name,
        restrictions,
        guesses,
        puzzleId,
        possibleAnswers,
        championIds,
        championNames,
        rarityScores,
    };
});
