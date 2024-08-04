CREATE OR REPLACE FUNCTION public.get_cell_possible_answers_count(puzzle_id uuid)
 RETURNS integer[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    answer_counts int[][];
    x int;
    y int;
    count int;
BEGIN
    answer_counts := ARRAY[
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL],
        ARRAY[NULL, NULL, NULL]
    ];
         FOR x IN 1..3 LOOP
        FOR y IN 1..3 LOOP
            count := array_length(get_cell_answers(x, y,puzzle_id),1);
            answer_counts[x][y] := count;
        END LOOP;
    END LOOP;

    RETURN answer_counts;
END;
$function$
;

