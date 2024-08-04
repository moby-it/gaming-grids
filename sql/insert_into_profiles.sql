CREATE OR REPLACE FUNCTION public.insert_into_profiles()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO public.profiles (user_id, user_name)
    VALUES (NEW.id, NEW.raw_meta_data ->> 'name');
END;
$function$
;

