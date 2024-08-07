import * as v from 'valibot';

export const Champion = v.object({
    name: v.string(),
    champion_id: v.string(),
});

export type Champion = v.InferOutput<typeof Champion>;

export async function searchChampionsByTerm(term: string): Promise<Champion[]> {
    const data = await $fetch(`api/champions/?term=${term}`);
    const { output: champions, success } = v.safeParse(v.array(Champion), data);
    if (!success)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse the search results',
        });
    return champions;
}
