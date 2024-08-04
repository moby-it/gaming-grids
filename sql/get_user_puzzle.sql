CREATE OR REPLACE FUNCTION public.get_user_puzzle(u_id uuid, p_id uuid)
 RETURNS TABLE(guesses integer, champion_ids text[], champion_names text[], rarity_scores double precision[])
 LANGUAGE plpgsql
AS $function$
DECLARE
    puzzle_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM user_puzzle p
        WHERE p.user_id = u_id AND p.puzzle_id = p_id
    ) INTO puzzle_exists;
    IF NOT puzzle_exists THEN
        INSERT INTO user_puzzle (user_id, puzzle_id)
        VALUES (u_id, p_id);
    END IF;
    SELECT p.guesses, p.cells INTO guesses, champion_ids
    FROM user_puzzle p
    WHERE p.user_id = u_id AND p.puzzle_id = p_id;
    IF guesses IS NULL OR champion_ids IS NULL THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT[][], NULL::TEXT[][], NULL::FLOAT[][];
        RETURN;
    END IF;
    champion_names := get_champion_names(champion_ids);
    rarity_scores := get_puzzle_rarity_scores(p_id, champion_ids);

    RETURN QUERY SELECT guesses, champion_ids, champion_names, rarity_scores;
END;
$function$
;

