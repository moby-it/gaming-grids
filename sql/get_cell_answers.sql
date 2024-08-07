-- DROP FUNCTION public.get_cell_answers(int4, int4, uuid);

CREATE OR REPLACE FUNCTION public.get_cell_answers(x integer, y integer, puzzle_id uuid)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$DECLARE
    common_champions text[];
BEGIN
    -- Use the given parameters to join the restrictions and find common entries
    SELECT ARRAY(
        SELECT jsonb_array_elements_text(row_restrictions->x-1->'champion_list')
        FROM puzzle p
        WHERE p.id =puzzle_id
        INTERSECT
        SELECT jsonb_array_elements_text(col_restrictions->y-1->'champion_list') 
        FROM puzzle p
        WHERE p.id =puzzle_id
    ) INTO common_champions;

    RETURN common_champions;
END;$function$
;
