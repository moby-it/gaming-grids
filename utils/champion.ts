import * as v from 'valibot';
import { SupabaseClient } from '@supabase/supabase-js';

export const Champion = v.pipe(
    v.object({
        name: v.string(),
        champion_id: v.string(),
    }),
    v.transform((c) => ({
        name: c.name,
        id: c.champion_id,
    }))
);

export type Champion = v.InferOutput<typeof Champion>;

export async function searchChampionsByTerm(term: string): Promise<Champion[]> {
    const supabase: SupabaseClient = useSupabaseClient();
    const { data, error } = await supabase
        .from('champion')
        .select('name,champion_id')
        .ilike('name', `%${term}%`);
    if (error) throw new Error(`Could not fetch results, ${error.message}`);
    const { output: champions, success } = v.safeParse(v.array(Champion), data);
    if (!success) throw new Error('Something went wrong with fetching the answers!');
    return champions;
}
