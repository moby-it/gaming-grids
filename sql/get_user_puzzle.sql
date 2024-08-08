-- DROP FUNCTION public.get_user_puzzle(uuid, uuid);

CREATE OR REPLACE FUNCTION public.get_user_puzzle(u_id uuid, p_id uuid)
 RETURNS TABLE(guesses integer, champion_names text[], rarity_scores double precision[])
 LANGUAGE plpgsql
AS $function$DECLARE
    puzzle_exists BOOLEAN;
	champion_ids text[];
BEGIN
    -- Check if the user_puzzle record exists
    SELECT EXISTS (
        SELECT 1
        FROM user_puzzle p
        WHERE p.user_id = u_id AND p.puzzle_id = p_id
    ) INTO puzzle_exists;

    -- If the record does not exist, create it
    IF NOT puzzle_exists THEN
        INSERT INTO user_puzzle (user_id, puzzle_id)
        VALUES (u_id, p_id);
    END IF;

    -- Fetch guesses and champion_names
    SELECT p.guesses, p.cells INTO guesses, champion_names
    FROM user_puzzle p
    WHERE p.user_id = u_id AND p.puzzle_id = p_id;

    -- Check if guesses or champion_names are NULL, if so return NULL
    IF guesses IS NULL OR champion_names IS NULL THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT[][], NULL::TEXT[][], NULL::FLOAT[][];
        RETURN;
    END IF;

    -- Get champion names
    champion_ids := get_champion_ids(champion_names);

    -- Get rarity scores
    rarity_scores := get_puzzle_rarity_scores(p_id, champion_ids);

    RETURN QUERY SELECT guesses, champion_names, rarity_scores;
END;$function$
;
