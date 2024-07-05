import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
export const PuzzleMetadata = v.pipe(
    v.object({
        champion_ids: v.array(v.array(v.nullable(v.string()))),
        cell_possible_answers_count: v.array(v.array(v.number())),
        champion_percentages: v.array(v.array(v.nullable(v.number()))),
    }),
    v.transform((m) => ({
        possibleAnswers: m.cell_possible_answers_count,
        championIds: m.champion_ids,
        rarityScore: m.champion_percentages,
    }))
);
export const PuzzleInfo = v.object({
    puzzle_name: v.string(),
    row_restrictions: v.array(v.string()),
    col_restrictions: v.array(v.string()),
});
export const UserPuzzle = v.object({
    id: v.string(),
    user_id: v.string(),
    puzzle_id: v.string(),
    guesses: v.number(),
    cells: v.array(v.array(v.string())),
    score: v.nullable(v.number()),
});
export type PuzzleMetadata = v.InferOutput<typeof PuzzleMetadata>;
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;
export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;

export async function getPuzzleInfo(
    supabase: SupabaseClient,
    puzzleId: string
): Promise<{
    name: Ref<string>;
    restrictions: Ref<{
        row: string[];
        column: string[];
    }>;
}> {
    const { data, error } = await supabase.rpc('get_puzzle_info', {
        puzzle_id: puzzleId,
    });
    if (error) throw new Error(error.message);
    const { success, output: puzzleInfo } = v.safeParse(PuzzleInfo, data[0]);
    if (!success) throw new Error('Failed to pass Puzzle info.');
    const { puzzle_name, row_restrictions, col_restrictions } = puzzleInfo;
    const name = ref(puzzle_name);
    const restrictions = ref({ row: row_restrictions, column: col_restrictions });
    return { name, restrictions };
}
export async function getPuzzleBody(
    userId: string | undefined,
    puzzleId: string,
    supabase: SupabaseClient
): Promise<{
    cells: globalThis.Ref<string[][]>;
    guesses: globalThis.Ref<number>;
}> {
    const cells: Ref<string[][]> = ref([]);
    const guesses: Ref<number> = ref(0);
    if (userId) {
        const puzzleBody = await getUserPuzzle(userId, puzzleId, supabase);
        if (!puzzleBody) throw new Error('Something went wrong with fetching the puzzle');
        cells.value = puzzleBody.cells;
        guesses.value = puzzleBody.guesses;
    } else {
        if (import.meta.client) {
            const cachedGame = localStorage.getItem('localGame');
            if (cachedGame) {
                const localGame = JSON.parse(cachedGame);
                guesses.value = localGame.guesses;
                cells.value = localGame.cells;
            } else {
                cells.value = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ];
                guesses.value = 9;
                localStorage.setItem(
                    'localGame',
                    JSON.stringify({
                        cells: cells.value,
                        guesses: guesses.value,
                    })
                );
            }
        }
    }
    return { cells: cells, guesses: guesses };
}
async function getUserPuzzle(
    userId: string,
    puzzleId: string,
    supabase: SupabaseClient
): Promise<UserPuzzle | null> {
    const { data, error } = await supabase
        .from('user_puzzle')
        .select()
        .eq('user_id', userId)
        .eq('puzzle_id', puzzleId);
    if (error) throw new Error(error.message);
    if (!data.length) {
        const puzzle = await createUserPuzzle(userId, puzzleId, supabase);
        return puzzle;
    }
    const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
    if (success) {
        return puzzle;
    }
    return null;
}
async function createUserPuzzle(
    userId: string,
    puzzleId: string,
    supabase: SupabaseClient
): Promise<UserPuzzle | null> {
    const { error, data } = await supabase
        .from('user_puzzle')
        .insert({ user_id: userId, puzzle_id: puzzleId })
        .select();
    if (!error) {
        const { output, success } = v.safeParse(UserPuzzle, data[0]);
        if (success) return output;
    }
    return null;
}
export async function getCellMetadata(
    cells: string[][],
    supabase: SupabaseClient,
    puzzleId: string
): Promise<Ref<PuzzleMetadata>> {
    const { data, error } = await supabase.rpc('get_puzzle_metadata', {
        p_id: puzzleId,
        champion_names: cells,
    });
    if (error) throw new Error(error.message);
    const { output: metadata, success } = v.safeParse(PuzzleMetadata, data);
    if (!success) throw new Error('Could not correctly parse metadata!');
    return ref(metadata);
}
