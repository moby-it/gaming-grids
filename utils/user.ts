import * as v from 'valibot';

export const User = v.pipe(
    v.object({
        email: v.string(),
        user_metadata: v.object({
            name: v.string(),
            avatar_url: v.string(),
        }),
        id: v.string(),
    }),
    v.transform((e) => ({
        name: e.user_metadata.name,
        email: e.email,
        avatarUrl: e.user_metadata.avatar_url,
        id: e.id,
    }))
);

export type User = v.InferOutput<typeof User>;
