import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
import { UserPuzzle, PuzzleInfo, Restriction } from './types';

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

const countOccurrencies =
    <T>(arr: T[]) =>
    (value: T): number =>
        arr.reduce((acc, v) => (v === value ? acc + 1 : acc), 0);

const filterByOccurencies = <T>(arr: T[], occurencies: number): T[] =>
    arr.filter((v) => countOccurrencies(arr)(v) >= occurencies);

const filterByTwoOccurencies = <T>(arr: T[]) => filterByOccurencies(arr, 2);

export function getRestrictionPossibleAnswers(a: Restriction, b: Restriction): string[] {
    const arr = a?.champion_list.concat(b.champion_list);
    return Array.from(new Set(filterByTwoOccurencies(arr)));
}
