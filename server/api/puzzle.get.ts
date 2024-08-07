import { serverSupabaseClient } from '#supabase/server';
import { getPuzzleBody, getPuzzleInfo, PuzzleInfo } from '~/utils/puzzle';
import getUserId from '../middleware/getUserId';
export default defineEventHandler(async (event) => {
    const puzzleId = getQuery(event).puzzleId as string;
    if (!puzzleId)
        throw createError({
            statusCode: 404,
            statusMessage: 'Puzzle Id not found',
        });

    const supabase = await serverSupabaseClient(event);
    await getUserId(event);
    const userId = event.context.userId;

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

    const puzzleInfo = await getPuzzleInfo(supabase, puzzleId);
    if (userId) {
        const puzzleBody = await getPuzzleBody(supabase, puzzleId, userId);
        championNames = puzzleBody.championNames;
        championIds = puzzleBody.championIds;
        rarityScores = puzzleBody.rarityScores;
        guesses = puzzleBody.guesses;
    }
    return {
        puzzleId,
        name: puzzleInfo.name,
        restrictions: puzzleInfo.restrictions,
        possibleAnswers: puzzleInfo.possibleAnswers,
        guesses,
        championIds,
        championNames,
        rarityScores,
    };
});
