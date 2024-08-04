CREATE OR REPLACE FUNCTION public.get_champion_ids(champion_names text[])
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    champion_ids TEXT[][];
    x INT;
    y INT;
    champ_id text;
BEGIN
RAISE NOTICE 'HELLO WORLD';
    champion_ids := ARRAY[
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL]
    ];
    FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP     
            IF champion_names[x][y] IS NOT NULL AND champion_names[x][y] <> '' THEN
                SELECT c.champion_id INTO champ_id
                FROM champion c
                WHERE c.name = champion_names[x][y]
                LIMIT 1;
                champion_ids[x][y] := champ_id;
            ELSE
                champion_ids[x][y] := NULL;
            END IF;
        END LOOP;
    END LOOP;

    RETURN champion_ids;
END;
$function$
;

