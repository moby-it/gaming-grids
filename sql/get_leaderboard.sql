CREATE OR REPLACE FUNCTION public.get_leaderboard(p_id uuid, u_id uuid)
 RETURNS TABLE(rank integer, user_name text, user_score double precision)
 LANGUAGE plpgsql
AS $function$
DECLARE
    user_row RECORD;
    user_rank INT;
BEGIN
    SELECT
        up.user_id,
        (
            SELECT SUM(score)
            FROM unnest(get_puzzle_rarity_scores(p_id, up.cells)) AS score
        ) AS user_score
    INTO user_row
    FROM user_puzzle up
    WHERE up.puzzle_id = p_id AND up.user_id = u_id;
    SELECT COUNT(*)
    INTO user_rank
    FROM (
        SELECT
            up.user_id,
            (
                SELECT SUM(score)
                FROM unnest(get_puzzle_rarity_scores(p_id, up.cells)) AS score
            ) AS user_score
        FROM user_puzzle up
        WHERE up.puzzle_id = p_id AND up.guesses = 0
    ) subquery
    WHERE subquery.user_score < user_row.user_score;
    RETURN QUERY
    WITH ranked_puzzles AS (
        SELECT
            RANK() OVER (ORDER BY
                (
                    SELECT SUM(score)
                    FROM unnest(get_puzzle_rarity_scores(p_id, up.cells)) AS score
                ) ASC) :: INTEGER AS row_rank,
            up.user_id,
            (
                SELECT SUM(score)
                FROM unnest(get_puzzle_rarity_scores(p_id, up.cells)) AS score
            ) AS user_score
        FROM user_puzzle up
        WHERE up.puzzle_id = p_id AND up.guesses = 0
    )
    SELECT ranked_puzzles.row_rank AS rank, profiles.user_name, ranked_puzzles.user_score
    FROM ranked_puzzles
    JOIN profiles ON profiles.user_id = ranked_puzzles.user_id
    WHERE ranked_puzzles.row_rank <= 25 OR ranked_puzzles.user_id = u_id
    ORDER BY rank;
END;
$function$
;
