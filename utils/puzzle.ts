import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';

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

export async function getPuzzleAnswers(supabase: SupabaseClient, puzzleId: string): Promise<Ref<number[][]>> {
    const { data } = await supabase.rpc('get_cell_possible_answers_count', { puzzle_id: puzzleId });
    const { output: answers, success } = v.safeParse(v.array(v.array(v.number())), data)
    if (!success) throw new Error("Something went wrong with Fetching the answers array!");
    return ref(answers);
}

export async function getPuzzleInfo(supabase: SupabaseClient):
    Promise<{
        name: Ref<string>,
        restrictions: Ref<{
            row: string[];
            column: string[];
        }>
    }> {
    const { data: puzzleId, error: e } = await supabase.from('puzzle').select('id');
    if (e) throw new Error(e.message);
    const { data, error } = await supabase.rpc('get_puzzle_info', {
        puzzle_id: puzzleId[0].id
    })
    if (error) throw new Error(error.message);
    const { success, output: puzzleInfo } = v.safeParse(PuzzleInfo, data[0]);
    if (!success) throw new Error("Failed to pass Puzzle info.");
    const { puzzle_name, row_restrictions, col_restrictions } = puzzleInfo;
    const name = ref(puzzle_name);
    const restrictions = ref({ row: row_restrictions, column: col_restrictions });
    return { name, restrictions };
};
export async function getPuzzleBody(userId: string | undefined, supabase: SupabaseClient)
    : Promise<{
        cells: globalThis.Ref<string[][]>;
        guesses: globalThis.Ref<number>;
    }> {

    const cells: Ref<string[][]> = ref([]);
    const guesses: Ref<number> = ref(0);
    if (userId) {
        const puzzleBody = await getUserPuzzle(userId, supabase);
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

async function getUserPuzzle(userId: string, supabase: SupabaseClient): Promise<UserPuzzle | null> {
    const { data, error } = await supabase.from('user_puzzle').select().eq('user_id', userId);
    if (!error) {
        if (!data.length) {
            const puzzle = createUserPuzzle(userId, supabase);
            return puzzle;
        }
        const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
        if (success) {
            return puzzle;
        }
    }
    return null;
}

async function createUserPuzzle(userId: string, supabase: SupabaseClient): Promise<UserPuzzle | null> {
    const { error: e, data: puzzleId } = await supabase.from('puzzle').select('id');
    if (e) throw new Error(e.message);
    const { error, data } = await supabase.from('user_puzzle').insert({ user_id: userId, puzzle_id: puzzleId[0].id }).select();
    if (!error) {
        const { output, success } = v.safeParse(UserPuzzle, data[0]);
        if (success) return output
    }
    return null;
}

export async function checkAnswer(supabase: SupabaseClient, champion: string, selectedCell: { x: number, y: number }, puzzleId: string): Promise<boolean> {
    const { data: answer, error } = await supabase.rpc('check_answer', {
        x: selectedCell.x, y: selectedCell.y, puzzle_id: puzzleId, champion_name: champion
    });

    return answer;
}
export async function handlePlayerChosen(champion: string, cell: { x: number, y: number }, userId: string | undefined) {
    const supabase: SupabaseClient = useSupabaseClient();
    const { data, error: e } = await supabase.from('user_puzzle').select('id,puzzle_id').eq('user_id', userId);
    if (e) throw new Error(e.message);
    const isAnswerCorrect = checkAnswer(supabase, champion, cell, data[0].puzzle_id)
    console.log(isAnswerCorrect)
}


export async function updateCells(supabase: SupabaseClient, champion: string, cell: { x: number, y: number }, userId: string | undefined) {
    const { data: user_puzzle_id, error: e } = await supabase.from('user_puzzle').select('id').eq('user_id', userId);
    if (e) throw new Error(e.message);
    const { error } = await supabase.rpc('update_puzzle', {
        user_puzzle_id: user_puzzle_id[0].id, x: cell.x, y: cell.y, champion_name: champion
    })
    if (error) throw new Error(error.message);
}