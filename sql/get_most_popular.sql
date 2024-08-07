-- DROP FUNCTION public.get_most_popular(uuid);

CREATE OR REPLACE FUNCTION public.get_most_popular(p_id uuid)
 RETURNS TABLE(champion_names text[], rarity_scores double precision[])
 LANGUAGE plpgsql
AS $function$
DECLARE
    rarity_result FLOAT[][] := ARRAY[[100, 100, 100], [100, 100, 100], [100, 100, 100]];
    champion_names TEXT[][] := ARRAY[['', '', ''], ['', '', ''], ['', '', '']];
    cell_values TEXT[];
    most_common TEXT;
    rarity FLOAT;
    champion_name TEXT;
    i INT;
    j INT;
BEGIN
    FOR i IN 1..3 LOOP
        FOR j IN 1..3 LOOP
            cell_values := ARRAY(
                SELECT cells[i][j]
                FROM user_puzzle
                WHERE puzzle_id = p_id
                AND cells[i][j] <> ''
            );

            IF array_length(cell_values, 1) > 0 THEN
                SELECT INTO most_common
                    value
                FROM unnest(cell_values) AS value
                GROUP BY value
                ORDER BY COUNT(*) DESC, value
                LIMIT 1;

                champion_names[i][j] := most_common;

                rarity := get_rarity_score(p_id, most_common, i, j);
                rarity_result[i][j] := rarity;
                      
            ELSE
                rarity_result[i][j] :=100;
                champion_names[i][j] := '';
            END IF;
        END LOOP;
    END LOOP;

    RETURN QUERY SELECT champion_names,rarity_result;
END;
$function$
;
