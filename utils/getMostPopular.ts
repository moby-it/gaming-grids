import { SupabaseClient } from '@supabase/supabase-js';
import * as v from 'valibot';
export const MostPopular = v.pipe(
    v.object({
        rarity_scores: v.array(v.array(v.number())),
        champion_names: v.array(v.array(v.string())),
    }),
    v.transform((m) => ({
        championNames: m.champion_names,
        rarityScores: m.rarity_scores,
    }))
);
export type MostPopular = v.InferOutput<typeof MostPopular>;
export default async function getMostPopular(supabase: SupabaseClient, puzzleId: string) {
    const { data, error } = await supabase.rpc('get_most_popular', { p_id: puzzleId });
    if (error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    const { output, success } = v.safeParse(MostPopular, data[0]);
    if (!success)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse the most-popular answers ',
        });
    return output;
}
