import { SupabaseClient } from '@supabase/supabase-js';
import * as v from 'valibot';
export const MostPopular = v.pipe(
    v.object({
        common_cells: v.array(v.array(v.string())),
        champion_ids: v.array(v.array(v.nullable(v.string()))),
        rarity_scores: v.array(v.array(v.nullable(v.number()))),
    }),
    v.transform((m) => ({
        mostPopularChampions: m.common_cells,
        championIds: m.champion_ids,
        rarityScore: m.rarity_scores,
    }))
);
export type MostPopular = v.InferOutput<typeof MostPopular>;
export default async function getMostPopular(supabase: SupabaseClient, puzzleId: string) {
    const { data, error } = await supabase.rpc('get_most_popular', { p_id: puzzleId });
    if (error) throw new Error(error.message);
    const { output, success } = v.safeParse(MostPopular, data[0]);
    if (!success) throw new Error('Failed to parse most popular answers');
    const { mostPopularChampions, championIds, rarityScore } = output;
    return { mostPopularChampions, championIds, rarityScore };
}
