export function getScore(rarityScores: number[][]): number {
    let sum = 0;
    for (const rows of rarityScores) {
        for (const cell of rows) {
            sum += cell;
        }
    }
    return sum;
}
