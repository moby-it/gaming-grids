CREATE OR REPLACE FUNCTION public.champion_chosen(x integer, y integer, p_id uuid, champion_id text, u_id uuid)
 RETURNS double precision
 LANGUAGE plpgsql
AS $function$
DECLARE
    cell_answers text[];
    user_puzzle_id uuid;
    percentage float;
BEGIN
    cell_answers := get_cell_answers(x, y, p_id);
      IF u_id IS NOT NULL THEN
             SELECT id INTO user_puzzle_id
             FROM user_puzzle
             WHERE user_puzzle.user_id = u_id AND user_puzzle.puzzle_id = p_id;
            UPDATE user_puzzle
            SET guesses = guesses - 1
            WHERE id = user_puzzle_id;
        END IF;
    IF champion_id = ANY(cell_answers) THEN
            PERFORM update_cells(user_puzzle_id, x, y, champion_id);
        percentage := get_rarity_score(p_id, champion_id, x, y);
        RETURN percentage;
        ELSE
        RETURN -1;
    END IF;
END;
$function$
;

