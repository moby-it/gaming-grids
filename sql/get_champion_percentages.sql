CREATE OR REPLACE FUNCTION public.get_champion_percentages(p_id uuid, champion_names text[])
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
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL]
    ];
    FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP
            IF champion_names[x][y] IS NOT NULL AND champion_names[x][y] <> '' THEN
                percentage := calculate_champion_percentage(p_id, champion_names[x][y], x, y);
                percentages[x][y] := percentage;
            ELSE
                percentages[x][y] := NULL;
            END IF;
        END LOOP;
    END LOOP;
    RETURN percentages;
END;
$function$
;

