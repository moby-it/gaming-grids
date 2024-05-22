import * as fs from "node:fs";
import * as path from "node:path";
import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { success, output: filter } = v.safeParse(v.string(), query.search);
  if (!success) return setResponseStatus(event, 400);
  const file = await fs.promises.readFile(
    path.join(process.cwd(), "public", "championFull.json"),
    "utf-8",
  );
  const champions = JSON.parse(file);
  const championNames = Object.values(champions.keys) as string[];
  return championNames.filter((champion) =>
    champion.toLowerCase().includes(filter.toLowerCase()),
  );
});
