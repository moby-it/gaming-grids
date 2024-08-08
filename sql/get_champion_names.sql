-- DROP FUNCTION public.get_champion_names(_text);

CREATE OR REPLACE FUNCTION public.get_champion_names(champion_ids text[])
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    champion_names TEXT[][];
    x INT;
    y INT;
    champ_name text;
BEGIN
    champion_names := ARRAY[
        ARRAY['', '', ''],
        ARRAY['', '', ''],
        ARRAY['', '', '']
    ];
    FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP
            IF champion_ids[x][y] IS NOT NULL AND champion_ids[x][y] <> '' THEN
                SELECT c.name INTO champ_name
                FROM champion c
                WHERE c.champion_id = champion_ids[x][y]
                LIMIT 1;
                
                -- Store the champion_id in the 2D array
                champion_names[x][y] := champ_name;
            END IF;
        END LOOP;
    END LOOP;

    RETURN champion_names;
END;
$function$
;
