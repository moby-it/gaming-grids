import { serverSupabaseClient } from '#supabase/server';
import { getPuzzleInfo } from '../utils/puzzle';

export default defineEventHandler(async (event) => {
    const puzzleId = getQuery(event).puzzleId as string;
    if (!puzzleId)
        throw createError({
            statusCode: 404,
            statusMessage: 'Puzzle Id not found',
        });

    const supabase = await serverSupabaseClient(event);
    const userId = event.context.userId;
    let championNames: string[][] = [
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
        const puzzleBody = await fetchUserPuzzle(supabase, puzzleId, userId);
        championNames = puzzleBody.championNames;
        rarityScores = puzzleBody.rarityScores;
        guesses = puzzleBody.guesses;
    }
    return {
        puzzleId,
        name: puzzleInfo.name,
        restrictions: puzzleInfo.restrictions,
        possibleAnswers: puzzleInfo.possibleAnswers,
        guesses,
        championNames,
        rarityScores,
    };
});
