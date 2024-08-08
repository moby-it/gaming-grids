-- DROP FUNCTION public.get_rarity_score(uuid, text, int4, int4);

CREATE OR REPLACE FUNCTION public.get_rarity_score(p_id uuid, champion_name text, x integer, y integer)
 RETURNS double precision
 LANGUAGE plpgsql
AS $function$
DECLARE
    champion_count INTEGER := 0;
    truthy_count INTEGER := 0;
    percentage FLOAT;
    cells_row RECORD; -- Declare a record type for the loop
BEGIN
    FOR cells_row IN
        SELECT cells
        FROM user_puzzle
        WHERE puzzle_id = p_id
    LOOP
        IF cells_row.cells IS NOT NULL THEN
            BEGIN
                PERFORM cells_row.cells[x][y];
                
               IF cells_row.cells[x][y] <> '' then
                    truthy_count := truthy_count + 1;
                    
                    IF cells_row.cells[x][y] = champion_name THEN
                        champion_count := champion_count + 1;
                    END IF;
                END IF;
            EXCEPTION
                WHEN OTHERS THEN
                    CONTINUE;
            END;
        END IF;
    END LOOP;

    IF truthy_count > 0 THEN
        percentage := ((champion_count)::FLOAT / truthy_count::FLOAT) * 100;
    ELSE
        percentage := 0.0;
    END IF;
    IF truthy_count = 1 THEN
       percentage :=0.0;
    END IF;
    RETURN percentage;
END;
$function$
;
