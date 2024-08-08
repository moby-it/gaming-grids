import { SupabaseClient } from '@supabase/supabase-js';

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
export const fetchPuzzleIdByDate = (supabase: SupabaseClient, date?: string) =>
    useAsyncData(
        date || 'latestDate',
        async () => {
            if (date && !isValidDate(date)) throw createError(`invalid date string: ${date}`);
            const { data, error } = !!date
                ? await supabase.from('puzzle').select('id').eq('date', date)
                : await supabase
                      .from('puzzle')
                      .select('id')
                      .lte('date', new Date().toUTCString())
                      .order('date')
                      .limit(1);
            if (error) throw createError(error);
            if (!data.length) throw createError(`puzzle for date ${date} not found`);
            return data[0]?.id as string;
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
