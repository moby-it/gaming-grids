export type Cell = {
    x: number;
    y: number;
    value?: string;
  };
  export function resetSelectedCell(selectedCell:Cell) {
    selectedCell.value = '';
    selectedCell.x = -1;
    selectedCell.y = -1;
  }
export function checkActive(guesses:number,selectedCell:Cell,
     cell: { x: number, y: number }):
      boolean {
        if (!guesses) return false;
    return (selectedCell.x === cell.x && selectedCell.y === cell.y)
  }
  export function selectCell(cellValue:string,selectedCell:Cell, cellCoordinates:Cell) {
    if (!cellValue) {
      selectedCell.x = cellCoordinates.x;
      selectedCell.y = cellCoordinates.y;
      selectedCell.value = '';
      setTimeout(() => {
        document.getElementById("search-player")?.focus();
      }, 0);
    }
  }

  export function getCellRadius(x: number, y: number): string {

    let borderRadius = '';
    if (x === 1 && y === 1) {
      borderRadius = 'border-radius:10px 0 0 0'
    }
  
    if (x === 1 && y === 3) {
      borderRadius = 'border-radius: 0 10px 0 0'
    }
  
    if (x === 3 && y === 1) {
      borderRadius = 'border-radius: 0 0 0 10px'
    }
  
    if (x === 3 && y === 3) {
      borderRadius = 'border-radius: 0 0 10px 0'
    }
    return borderRadius;
  }
  