import * as v from "valibot";

export const useGame = async () => {
  const { data } = await useFetch("/api/dailyQuestion");
  const Restrictions = v.array(v.array(v.string()));
  const Input = v.object({
    restrictions: Restrictions,
    name: v.string(),
  });
  const { success, output } = v.safeParse(Input, data.value);
  if (!success) throw createError("failed to parse restrictions");
  const cells: Ref<string[][]> = ref(
    [...Array(3)].map(() => Array(3).fill("")),
  );
  const columnRestrictions: string[] = output.restrictions[0];
  const rowRestrictions: string[] = output.restrictions[1];
  const name = output.name;
  const guesses = ref(9);
  return {
    name,
    cells,
    restrictions: { row: rowRestrictions, column: columnRestrictions },
    guesses,
  };
};
