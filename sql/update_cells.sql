CREATE OR REPLACE FUNCTION public.update_cells(user_puzzle_id uuid, x integer, y integer, champion_name text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    cells_array text[][];
BEGIN
    SELECT cells INTO cells_array
    FROM user_puzzle
    WHERE id = user_puzzle_id;
    cells_array[x][y] := champion_name;
    UPDATE user_puzzle
    SET cells = cells_array
    WHERE id = user_puzzle_id;
END;
$function$
;

