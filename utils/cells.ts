import { SupabaseClient } from '@supabase/supabase-js';
export type Cell = {
  x: number;
  y: number;
  value?: string;
  possibleAnswers?: number
};
export function resetSelectedCell(selectedCell: Cell) {
  selectedCell.value = '';
  selectedCell.x = -1;
  selectedCell.y = -1;
  selectedCell.possibleAnswers = 0;
}
export function checkActive(guesses: number, selectedCell: Cell,
  cell: { x: number, y: number; }):
  boolean {
  if (!guesses) return false;
  return (selectedCell.x === cell.x && selectedCell.y === cell.y);
}
export function selectCell(cellValue: string, selectedCell: Cell, cellCoordinates: Cell, cellAnswers: number) {
  if (!cellValue) {
    selectedCell.x = cellCoordinates.x;
    selectedCell.y = cellCoordinates.y;
    selectedCell.value = '';
    selectedCell.possibleAnswers = cellAnswers;
    setTimeout(() => {
      document.getElementById("search-player")?.focus();
    }, 0);
  }
}

export function getCellRadius(x: number, y: number): string {

  let borderRadius = '';
  if (x === 1 && y === 1) {
    borderRadius = 'border-radius:10px 0 0 0';
  }

  if (x === 1 && y === 3) {
    borderRadius = 'border-radius: 0 10px 0 0';
  }

  if (x === 3 && y === 1) {
    borderRadius = 'border-radius: 0 0 0 10px';
  }

  if (x === 3 && y === 3) {
    borderRadius = 'border-radius: 0 0 10px 0';
  }
  return borderRadius;
}
export async function getCellAnswerPercent(userId: string, champion: string | undefined) {
  // : Promise<(number | null)[]>
  const supabase = useSupabaseClient();

  const { data, error } = await supabase.from('user_puzzle').select('cells').eq('user_id', userId);
  if (!error) {
    const { cells } = data[0]
    console.log(cells);
    // for (const cell of cells) {
    //   console.log(cell)
    // }
    // if (!data.length) {
    //   const puzzle = createUserPuzzle(userId, supabase);
    //   return puzzle;
    // }
    // const { output: puzzle, success } = v.safeParse(UserPuzzle, data[0]);
    // if (success) {
    //   return puzzle;
    // }
  }
  // return null;
}