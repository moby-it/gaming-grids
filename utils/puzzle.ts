import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';
type CellMetadata = {
    id: string;
    rarityScore: number | null;
}
export const PuzzleInfo = v.object
    ({
        puzzle_name: v.string(),
        row_restrictions: v.array(v.string()),
        col_restrictions: v.array(v.string())
    })
export const UserPuzzle = v.object({
    id: v.string(),
    user_id: v.string(),
    puzzle_id: v.string(),
    guesses: v.number(),
    cells: v.array(v.array(v.string())),
    score: v.nullable(v.number())
})
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;
export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;

export async function getPuzzleInfo(supabase: SupabaseClient, puzzleId: string):
    Promise<{
        name: Ref<string>,
        restrictions: Ref<{
            row: string[];
            column: string[];
        }>
    }> {
    const { data, error } = await supabase.rpc('get_puzzle_info', {
        puzzle_id: puzzleId
    })
    if (error) throw new Error(error.message);
    const { success, output: puzzleInfo } = v.safeParse(PuzzleInfo, data[0]);
    if (!success) throw new Error("Failed to pass Puzzle info.");
    const { puzzle_name, row_restrictions, col_restrictions } = puzzleInfo;
    const name = ref(puzzle_name);
    const restrictions = ref({ row: row_restrictions, column: col_restrictions });
    return { name, restrictions };
};
export async function getPuzzleBody(userId: string | undefined, puzzleId: string, supabase: SupabaseClient)
    : Promise<{
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
            }
            else {
                cells.value = [['', '', ''], ['', '', ''], ['', '', '']];
                guesses.value = 9
                localStorage.setItem('localGame', JSON.stringify({
                    cells: cells.value, guesses: guesses.value
                }));
            }
        }
    }
    return { cells: cells, guesses: guesses }
}
async function getUserPuzzle(userId: string, puzzleId: string, supabase: SupabaseClient): Promise<UserPuzzle | null> {
    const { data, error } = await supabase.from('user_puzzle').select().eq('user_id', userId).eq('puzzle_id', puzzleId);
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
async function createUserPuzzle(userId: string, puzzleId: string, supabase: SupabaseClient): Promise<UserPuzzle | null> {
    const { error, data } = await supabase.from('user_puzzle').insert({ user_id: userId, puzzle_id: puzzleId }).select();
    if (!error) {
        const { output, success } = v.safeParse(UserPuzzle, data[0]);
        if (success) return output
    }
    return null;
}
export async function getPuzzleAnswers(supabase: SupabaseClient, puzzleId: string): Promise<Ref<number[][]>> {
    const { data } = await supabase.rpc('get_cell_possible_answers_count', { puzzle_id: puzzleId });
    const { output: answers, success } = v.safeParse(v.array(v.array(v.number())), data)
    if (!success) throw new Error("Something went wrong with Fetching the answers array!");
    return ref(answers);
}
export async function getCellInfo(cells: string[][], supabase: SupabaseClient, puzzleId: string): Promise<Ref<CellMetadata[][]>> {
    const cellMetadata: CellMetadata[][] = Array(cells.length)
        .fill(null)
        .map(() => Array(cells[0].length).fill(null).map(() => ({ id: '', rarityScore: null, possibleAnswers: null })));
    const promises: Promise<void>[] = [];
    cells.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const promise = supabase.rpc('get_cell_info', {
                    p_id: puzzleId,
                    champion_name: cell,
                    x: i + 1,
                    y: j + 1,
                }).then(({ data, error }) => {

                    if (error) throw new Error(error.message);
                    cellMetadata[i][j] = { id: data[0].champion_id, rarityScore: data[0].rarity_score };
                }) as Promise<void>;
                promises.push(promise);
            }
        });
    });
    await Promise.all(promises);
    return ref(cellMetadata);
}