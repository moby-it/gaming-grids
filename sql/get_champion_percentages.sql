-- DROP FUNCTION public.get_champion_percentages(uuid, _text);

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
    -- Initialize a 2D array with NULLs of size 3x3
    percentages := ARRAY[
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL]
    ];

    -- Loop through each x and y coordinate
    FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP
            -- Check if the champion name is not NULL or empty
            IF champion_names[x][y] IS NOT NULL AND champion_names[x][y] <> '' THEN
                -- Call the calculate_champion_percentage function for each cell
                percentage := calculate_champion_percentage(p_id, champion_names[x][y], x, y);
                -- Store the percentage in the 2D array
                percentages[x][y] := percentage;
            ELSE
                -- If there is no champion name, set the percentage to NULL
                percentages[x][y] := NULL;
            END IF;
        END LOOP;
    END LOOP;

    RETURN percentages;
END;
$function$
;
