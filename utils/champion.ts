import * as v from 'valibot';

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
    const data = await $fetch(`api/champions/?term=${term}`);
    const { output: champions, success } = v.safeParse(v.array(Champion), data);
    if (!success)
        throw createError({
            statusCode: 500,
            statusMessage: 'Could not parse the search results',
        });
    return champions;
}
