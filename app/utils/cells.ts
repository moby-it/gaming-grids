export type Cell = {
    x: number;
    y: number;
    possibleAnswers?: number | null;
};
export function resetSelectedCell(selectedCell: Ref<Cell>) {
    selectedCell.value.x = -1;
    selectedCell.value.y = -1;
}
export function checkActive(selectedCell: Cell, cell: { x: number; y: number }): boolean {
    return selectedCell.x === cell.x && selectedCell.y === cell.y;
}
export function selectCell(
    cellValue: string,
    selectedCell: Cell,
    cellCoordinates: Cell,
    cellAnswers: number | null
) {
    if (!cellValue) {
        selectedCell.x = cellCoordinates.x;
        selectedCell.y = cellCoordinates.y;
        selectedCell.possibleAnswers = cellAnswers;
        setTimeout(() => {
            document.getElementById('search-player')?.focus();
        }, 0);
    }
}
export function getCellRadius(x: number, y: number): string {
    let borderRadius = '';
    if (x === 1 && y === 1) {
        borderRadius = 'var(--radius) 0 0 0';
    }

    if (x === 1 && y === 3) {
        borderRadius = '0  var(--radius) 0 0';
    }

    if (x === 3 && y === 1) {
        borderRadius = '0 0 0  var(--radius)';
    }

    if (x === 3 && y === 3) {
        borderRadius = '0 0  var(--radius) 0';
    }
    return borderRadius;
}
export function getImageRadius(x: number, y: number) {
    if (x === 1 && y === 1) {
        return 'border-radius: var(--radius) 0 0 0';
    }
    if (x === 1 && y === 3) {
        return ' border-radius: 0 var(--radius) 0 0';
    }
    if (x === 3 && y === 1) {
        return 'border-radius: 0 0 0 var(--radius)';
    }
    if (x === 3 && y === 3) {
        return 'border-radius: 0 0 var(--radius) 0';
    }
    return '';
}
export function getNameRadius(x: number, y: number) {
    if (x === 3 && y === 1) {
        return 'border-radius: 0 0 0 var(--radius)';
    }
    if (x === 3 && y === 3) {
        return 'border-radius: 0 0 var(--radius) 0';
    }
    return '';
}
export function getScoreRadius(x: number, y: number) {
    if (x === 1 && y === 3) {
        return 'border-radius: 0 var(--radius) 0 0 ';
    }
    return '';
}
