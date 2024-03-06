
export default defineEventHandler((event) => {
  appendHeader(event, 'Cache-Control', 'max-age=30');
  return {
    restrictions: [
      ['Fighter', 'Noxian', 'Male'],
      ['Top Lane', 'Mid Lane', 'Bot Lane']
    ],
    date: new Date(),
    name: 'LolGrids #1'
  };
});