import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';

export type GameStatus = 'completed' | 'in progress';
export const PuzzleInfo = v.pipe(
    v.object({
        puzzle_name: v.string(),
        row_restrictions: v.array(v.string()),
        col_restrictions: v.array(v.string()),
        cell_possible_answers_count: v.array(v.array(v.number())),
    }),
    v.transform((o) => ({
        name: o.puzzle_name,
        restrictions: {
            row: o.row_restrictions,
            column: o.col_restrictions,
        },
        possibleAnswers: o.cell_possible_answers_count,
    }))
);
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;
export const UserPuzzle = v.pipe(
    v.object({
        guesses: v.number(),
        champion_ids: v.array(v.array(v.string())),
        champion_names: v.array(v.array(v.string())),
        rarity_scores: v.array(v.array(v.number())),
    }),
    v.transform((p) => ({
        guesses: p.guesses,
        championIds: p.champion_ids,
        championNames: p.champion_names,
        rarityScores: p.rarity_scores,
    }))
);
const PuzzleBody = v.object({
    guesses: v.number(),
    championIds: v.array(v.array(v.string())),
    championNames: v.array(v.array(v.string())),
    rarityScores: v.array(v.array(v.number())),
});
export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;
export async function getPuzzleInfo(
    supabase: SupabaseClient,
    puzzleId: string
): Promise<PuzzleInfo> {
    const { data, error } = await supabase.rpc('get_puzzle_info', {
        puzzle_id: puzzleId,
    });
    if (error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    const { success, output } = v.safeParse(PuzzleInfo, data[0]);
    if (!success)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse puzzle info',
        });
    return output;
}
export type PuzzleBody = v.InferOutput<typeof PuzzleBody>;

export async function getPuzzleBody(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
): Promise<PuzzleBody> {
    const userPuzzle = await fetchUserPuzzle(supabase, puzzleId, userId);
    if (!userPuzzle)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse the user puzzle.',
        });
    return {
        championNames: userPuzzle.championNames,
        championIds: userPuzzle.championIds,
        rarityScores: userPuzzle.rarityScores,
        guesses: userPuzzle.guesses,
    };
}

async function fetchUserPuzzle(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
): Promise<UserPuzzle | null> {
    const { data, error } = await supabase.rpc('get_user_puzzle', { u_id: userId, p_id: puzzleId });
    if (error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
    if (success) return puzzle;
    return null;
}
export function savePuzzleToLocalStorage(
    championIds: string[][],
    chamionNames: string[][],
    guesses: number
) {
    localStorage.setItem(
        'localGame',
        JSON.stringify({
            championIds: championIds,
            championNames: chamionNames,
            guesses: guesses,
        })
    );
}
export async function fetchPuzzleIdByDate(
    supabase: SupabaseClient,
    date?: string
): Promise<string | null> {
    if (!date) date = getCurrentDate();
    const { data, error } = await supabase.from('puzzle').select('id').eq('date', date);
    if (data && data.length === 1) return data[0].id as string;
    if (error) console.error(error);
    if (data && data.length > 1) console.error('more than one puzzles found');
    return null;
}
function getPuzzleBodyFromLocalStorage(): {
    championIds: string[][];
    championNames: string[][];
    guesses: number;
} {
    let championNames = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    let championIds = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    let guesses = 9;
    const cachedGame = localStorage.getItem('localGame');
    if (cachedGame) {
        return JSON.parse(cachedGame);
    } else {
        savePuzzleToLocalStorage(championIds, championNames, guesses);
        return { championIds, championNames, guesses };
    }
}
export async function getLocalPuzzle(puzzleId: string): Promise<PuzzleBody> {
    const { championIds, championNames, guesses } = getPuzzleBodyFromLocalStorage();
    const rarityScores = await $fetch(`/api/rarity-scores/`, {
        method: 'POST',
        body: JSON.stringify({
            puzzleId: puzzleId,
            championIds: championIds,
        }),
    });
    return { championIds, championNames, guesses, rarityScores };
}

export async function getAnswerScore(
    supabase: SupabaseClient,
    puzzleId: string,
    x: number,
    y: number,
    champion: string,
    userId?: string
): Promise<number> {
    const { data } = await supabase.rpc('champion_chosen', {
        x: x,
        y: y,
        p_id: puzzleId,
        champion_id: champion,
        u_id: userId ?? null,
    });
    return data;
}
export async function giveUp(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
): Promise<void> {
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
}
