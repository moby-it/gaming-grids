-- DROP FUNCTION public.update_cells(uuid, int4, int4, text);

CREATE OR REPLACE FUNCTION public.update_cells(user_puzzle_id uuid, x integer, y integer, champion_name text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    cells_array text[][];
BEGIN
    -- Retrieve the current cells array from the user_puzzle table
    SELECT cells INTO cells_array
    FROM user_puzzle
    WHERE id = user_puzzle_id;

    -- Update the specified cell with the champion name
    cells_array[x][y] := champion_name;

    -- Update the cells column in the user_puzzle table with the modified array
    UPDATE user_puzzle
    SET cells = cells_array
    WHERE id = user_puzzle_id;
END;
$function$
;
