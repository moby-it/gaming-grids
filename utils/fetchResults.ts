import { SupabaseClient } from '@supabase/supabase-js';
export async function fetchResults(input: unknown, results: Ref<string[] | null>) {
  const supabase: SupabaseClient = useSupabaseClient();
  const { data, error } = await supabase.from('champion').select('name').ilike('name', `%${input}%`)
  if (error) throw new Error(`Could not fetch results, ${error.message}`);
  const champions = data.map(champion => champion.name);
  results.value = champions

}