import * as v from 'valibot';
export default defineEventHandler(async event => {
  const url = 'https://liquipedia.net/leagueoflegends/api.php';
  const query = getQuery(event);
  console.log(query);
  if (!query.search) return setResponseStatus(event, 400);
  const results = await $fetch(url, {
    query: {
      action: 'leagueoflegendsdbplayeridapi',
      format: 'json',
      search: query.search
    }
  });
  const { output, success } = v.safeParse(v.object({ leagueoflegendsdbplayeridapi: v.array(v.string()) }), results);
  if (!success) return setResponseStatus(event, 500, 'failed to fetch players');
  const players = new Set();
  output.leagueoflegendsdbplayeridapi.forEach(p => players.add(p));
  return Array.from(players);
});