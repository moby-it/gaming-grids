import { type Restriction } from './puzzle';

const countOccurrencies =
    <T>(arr: T[]) =>
    (value: T): number =>
        arr.reduce((acc, v) => (v === value ? acc + 1 : acc), 0);

const filterByOccurencies = <T>(arr: T[], occurencies: number): T[] =>
    arr.filter((v) => countOccurrencies(arr)(v) >= occurencies);

const filterByTwoOccurencies = <T>(arr: T[]) => filterByOccurencies(arr, 2);

export function getRestrictionPossibleAnswers(a: Restriction, b: Restriction): string[] {
    const arr = a?.champion_list.concat(b.champion_list);
    return Array.from(new Set(filterByTwoOccurencies(arr)));
}
