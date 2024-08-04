CREATE OR REPLACE FUNCTION public.get_cell_answers(x integer, y integer, puzzle_id uuid)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    common_champions text[];
BEGIN
    -- Use the given parameters to join the restrictions and find common entries
    SELECT ARRAY(
        SELECT unnest(r1.champion_list)
        FROM puzzle p 
        JOIN restriction r1 ON r1.id = p.row_restrictions[x] AND p.id =puzzle_id
        INTERSECT
        SELECT unnest(r2.champion_list)
        FROM puzzle p 
        JOIN restriction r2 ON r2.id = p.col_restrictions[y] AND p.id =puzzle_id
    ) INTO common_champions;

    RETURN common_champions;
END;
$function$
;

