-- DROP FUNCTION public.update_puzzle(uuid, int4, int4, text);

CREATE OR REPLACE FUNCTION public.update_puzzle(user_puzzle_id uuid, x integer, y integer, champion_id text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  cells_array text[][];
BEGIN
    SELECT cells INTO cells_array
    FROM user_puzzle
    WHERE id = user_puzzle_id;
   cells_array[x][y] := champion_id;
    UPDATE user_puzzle
    SET cells =cells_array
    WHERE id = user_puzzle_id;
END;
$function$
;
