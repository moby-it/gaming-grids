import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
import { getRestrictionPossibleAnswers } from './calculateResults';

export const Restriction = v.object({
    name: v.string(),
    champion_list: v.array(v.string()),
    created_at: v.string(),
});
export const RestrictionView = v.object({
    name: v.string(),
    created_at: v.string(),
    possibleAnswers: v.array(v.array(v.number())),
});

export type Restriction = v.InferOutput<typeof Restriction>;

export type GameStatus = 'completed' | 'in progress';

export const PuzzleInfo = v.pipe(
    v.object({
        name: v.string(),
        row_restrictions: v.array(Restriction),
        col_restrictions: v.array(Restriction),
    }),
    v.transform((o) => ({
        name: o.name,
        restrictions: {
            row: o.row_restrictions.map((r) => ({ name: r.name, created_at: r.created_at })),
            column: o.col_restrictions.map((r) => ({ name: r.name, created_at: r.created_at })),
        },
        possibleAnswers: o.row_restrictions.map((rr) =>
            o.col_restrictions.map((cr) => getRestrictionPossibleAnswers(rr, cr).length)
        ),
    }))
);
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;

export async function getPuzzleInfo(
    supabase: SupabaseClient,
    puzzleId: string
): Promise<PuzzleInfo> {
    const { data, error } = await supabase.from('puzzle').select().eq('id', puzzleId);
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
            cause: error,
        });
    }
    const { success, output, issues } = v.safeParse(PuzzleInfo, data[0]);
    if (!success) throw createError(issues.map((i) => i.message).join(', '));
    return output;
}

export const UserPuzzle = v.pipe(
    v.object({
        guesses: v.number(),
        champion_names: v.array(v.array(v.string())),
        rarity_scores: v.array(v.array(v.number())),
    }),
    v.transform((p) => ({
        guesses: p.guesses,
        championNames: p.champion_names,
        rarityScores: p.rarity_scores,
    }))
);
export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;

export async function fetchUserPuzzle(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
): Promise<UserPuzzle> {
    const { data, error } = await supabase.rpc('get_user_puzzle', { u_id: userId, p_id: puzzleId });
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    }
    const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
    if (!success) throw createError('failed to parse user puzzle');
    return puzzle;
}

const PuzzleBody = v.object({
    guesses: v.number(),
    championNames: v.array(v.array(v.string())),
    rarityScores: v.array(v.array(v.number())),
});

export type PuzzleBody = v.InferOutput<typeof PuzzleBody>;

export function savePuzzleToLocalStorage(
    puzzleId: string,
    chamionNames: string[][],
    guesses: number
) {
    localStorage.setItem(
        puzzleId,
        JSON.stringify({
            championNames: chamionNames,
            guesses: guesses,
        })
    );
}

export function clearPuzzleLocalStorage(puzzleId: string) {
    localStorage.removeItem(puzzleId);
}

/**
 *
 * @param supabase SupabaseClient
 * @param date Date of the puzzle to fetch. Pass empty string for current date.
 * @returns
 */
export const fetchPuzzleIdByDate = (supabase: SupabaseClient, date: string) =>
    useAsyncData(
        date,
        async () => {
            if (!date) throw createError('invalid puzzle date');
            const { data, error } = await supabase.from('puzzle').select('id').eq('date', date);
            if (data && data.length === 1) return data[0].id as string;
            if (error) throw createError(error);
            if (data && data.length > 1) throw createError('more than one puzzles found');
        },
        {
            getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
        }
    );

function getPuzzleBodyFromLocalStorage(puzzleId: string): {
    championNames: string[][];
    guesses: number;
} {
    let championNames = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    let guesses = 9;
    const cachedGame = localStorage.getItem(puzzleId);
    if (cachedGame) {
        return JSON.parse(cachedGame);
    } else {
        savePuzzleToLocalStorage(puzzleId, championNames, guesses);
        return { championNames, guesses };
    }
}

export async function getRarityScores(
    puzzleId: string,
    championNames: string[][]
): Promise<number[][]> {
    const rarityScores = await $fetch(`/api/rarity-scores/`, {
        query: {
            puzzleId: puzzleId,
            championNames: championNames,
        },
    });
    return rarityScores;
}

export async function getLocalPuzzle(puzzleId: string): Promise<Omit<PuzzleBody, 'rarityScores'>> {
    const { championNames, guesses } = getPuzzleBodyFromLocalStorage(puzzleId);
    return { championNames, guesses };
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
        champion_name: champion,
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
