import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';

export type GameStatus = 'completed' | 'in progress';

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
export type PuzzleMetadata = v.InferOutput<typeof PuzzleMetadata>;

export const PuzzleInfo = v.pipe(
    v.object({
        puzzle_name: v.string(),
        row_restrictions: v.array(v.string()),
        col_restrictions: v.array(v.string()),
    }),
    v.transform((o) => ({
        name: o.puzzle_name,
        restrictions: {
            row: o.row_restrictions,
            column: o.col_restrictions,
        },
    }))
);
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;

export const UserPuzzle = v.object({
    id: v.string(),
    user_id: v.string(),
    puzzle_id: v.string(),
    guesses: v.number(),
    cells: v.array(v.array(v.string())),
    score: v.nullable(v.number()),
});

export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;

export async function getPuzzleInfo(
    supabase: SupabaseClient,
    puzzleId: string
): Promise<PuzzleInfo> {
    const { data, error } = await supabase.rpc('get_puzzle_info', {
        puzzle_id: puzzleId,
    });
    if (error) throw new Error(error.message);
    const { success, output } = v.safeParse(PuzzleInfo, data[0]);
    if (!success) throw new Error('Failed to parse Puzzle info.');
    return output;
}

type PuzzleBody = Pick<UserPuzzle, 'cells' | 'guesses'>;

export async function getPuzzleBody(
    supabase: SupabaseClient,
    puzzleId: string,
    userId?: string
): Promise<PuzzleBody> {
    if (userId) {
        const userPuzzle = await fetchUserPuzzle(supabase, puzzleId, userId);
        if (!userPuzzle) throw new Error('Something went wrong with fetching the puzzle');
        return { cells: userPuzzle.cells, guesses: userPuzzle.guesses };
    } else {
        if (import.meta.client) return getPuzzleBodyFromLocalStorage();
        return { cells: [], guesses: 0 };
    }
}

async function fetchUserPuzzle(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
): Promise<UserPuzzle | null> {
    const { data, error } = await supabase
        .from('user_puzzle')
        .select()
        .eq('user_id', userId)
        .eq('puzzle_id', puzzleId);
    if (error) throw new Error(error.message);
    if (!data.length) {
        const puzzle = await createUserPuzzle(supabase, puzzleId, userId);
        return puzzle;
    }
    const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
    if (success) return puzzle;
    return null;
}

async function createUserPuzzle(
    supabase: SupabaseClient,
    puzzleId: string,
    userId: string
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

export async function getPuzzleMetadata(
    supabase: SupabaseClient,
    cells: string[][],
    puzzleId: string
): Promise<PuzzleMetadata> {
    const { data, error } = await supabase.rpc('get_puzzle_metadata', {
        p_id: puzzleId,
        champion_names: cells,
    });
    if (error) throw new Error(error.message);
    const { output: metadata, success } = v.safeParse(PuzzleMetadata, data);
    if (!success) throw new Error('Could parse puzzle metadata!');
    return metadata;
}

function createNewPuzzle(): PuzzleBody {
    const cells = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    const guesses = 9;
    return { cells, guesses };
}

function savePuzzleToLocalStorage({ cells, guesses }: PuzzleBody) {
    localStorage.setItem(
        'localGame',
        JSON.stringify({
            cells: cells,
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

function getPuzzleBodyFromLocalStorage(): PuzzleBody {
    const cachedGame = localStorage.getItem('localGame');
    if (cachedGame) {
        return JSON.parse(cachedGame);
    } else {
        const puzzle = createNewPuzzle();
        savePuzzleToLocalStorage(puzzle);
        return puzzle;
    }
}
async function getLocalMetadata(cells: string[][], puzzleId: string): Promise<PuzzleMetadata> {
    const { metadata } = await $fetch(`/api/metadata/`, {
        method: 'POST',
        body: JSON.stringify({ cells: cells, puzzleId: puzzleId }),
    });
    return metadata;
}

export async function getLocalPuzzle(
    puzzleId: string
): Promise<{ cells: string[][]; guesses: number; metadata: PuzzleMetadata }> {
    const puzzleBody = getPuzzleBodyFromLocalStorage();
    const metadata = await getLocalMetadata(puzzleBody.cells, puzzleId);
    const { cells, guesses } = puzzleBody;
    return { cells, guesses, metadata };
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
    const { data, error } = await supabase
        .from('user_puzzle')
        .update({ guesses: 0 })
        .eq('user_id', userId)
        .eq('puzzle_id', puzzleId);
    if (error) console.error('There was an error trying to give up!', error);
}
