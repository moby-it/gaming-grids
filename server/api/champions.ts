import * as fs from 'node:fs';
import * as path from 'node:path';



export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log(query);
  if (!query.search) return setResponseStatus(event, 400);
  const file = await fs.promises.readFile(path.join(process.cwd(), 'public', 'championFull.json'), 'utf-8');
  const champions = JSON.parse(file);

  return champions;
});