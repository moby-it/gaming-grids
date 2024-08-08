import * as v from 'valibot';
import { getRestrictionPossibleAnswers } from './puzzle';

export const Restriction = v.object({
    name: v.string(),
    champion_list: v.array(v.string()),
    created_at: v.string(),
});
export const RestrictionView = v.object({
    name: v.string(),
    created_at: v.string(),
    possibleAnswers: v.array(v.array(v.number())),
});

export type Restriction = v.InferOutput<typeof Restriction>;

export type GameStatus = 'completed' | 'in progress';

export const PuzzleInfo = v.pipe(
    v.object({
        name: v.string(),
        date: v.string(),
        row_restrictions: v.array(Restriction),
        col_restrictions: v.array(Restriction),
    }),
    v.transform((o) => ({
        name: o.name,
        date: o.date,
        restrictions: {
            row: o.row_restrictions.map((r) => ({ name: r.name, created_at: r.created_at })),
            column: o.col_restrictions.map((r) => ({ name: r.name, created_at: r.created_at })),
        },
        possibleAnswers: o.row_restrictions.map((rr) =>
            o.col_restrictions.map((cr) => getRestrictionPossibleAnswers(rr, cr).length)
        ),
    }))
);
export type PuzzleInfo = v.InferOutput<typeof PuzzleInfo>;

export const UserPuzzle = v.pipe(
    v.object({
        guesses: v.number(),
        champion_names: v.array(v.array(v.string())),
        rarity_scores: v.array(v.array(v.number())),
    }),
    v.transform((p) => ({
        guesses: p.guesses,
        championNames: p.champion_names,
        rarityScores: p.rarity_scores,
    }))
);
export type UserPuzzle = v.InferOutput<typeof UserPuzzle>;

export const LeaderboardSchema = v.pipe(
    v.array(v.object({ rank: v.number(), user_name: v.string(), user_score: v.number() })),
    v.transform((l) =>
        l.map((item) => ({
            rank: item.rank,
            userScore: item.user_score,
            username: item.user_name,
        }))
    )
);
export type Leaderboard = v.InferOutput<typeof LeaderboardSchema>;
