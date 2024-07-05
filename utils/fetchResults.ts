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

export async function fetchResults(input: unknown, results: Ref<Champion[] | null>) {
    const supabase: SupabaseClient = useSupabaseClient();
    const { data, error } = await supabase
        .from('champion')
        .select('name,champion_id')
        .ilike('name', `%${input}%`);
    if (error) throw new Error(`Could not fetch results, ${error.message}`);
    const { output: champions, success } = v.safeParse(v.array(Champion), data);
    if (!success) throw new Error('Something went wrong with fetching the answers!');
    results.value = champions;
}
