CREATE OR REPLACE FUNCTION public.get_puzzle_rarity_scores(p_id uuid, champion_ids text[])
 RETURNS double precision[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    percentages FLOAT[][];
    x INT;
    y INT;
    percentage FLOAT;
BEGIN
    percentages := ARRAY[
        ARRAY[100, 100, 100],
        ARRAY[100, 100, 100],
        ARRAY[100, 100, 100]
    ];

    FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP
            IF champion_ids[x][y] IS NOT NULL AND champion_ids[x][y] <> '' THEN
                percentage := get_rarity_score(p_id, champion_ids[x][y], x, y);
                percentages[x][y] := percentage;
          
            END IF;
        END LOOP;
    END LOOP;

    RETURN percentages;
END;
$function$
;

