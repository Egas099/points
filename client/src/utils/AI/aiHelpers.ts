import { cellPositionById } from '../calculate';
import { trying } from '../common';

export function filterCellsByCount(cells: Cell[], count: number) {
    return cells.filter(cell => cell.count === count);
}

export function amountCellWithPoints(cells: Cell[], count: number) {
    return cells.reduce(
        (amount, cur) => (cur.count === count ? amount + 1 : amount),
        0
    );
}
export function amountEmptyNeighs(field: Cell[][], cell: Cell) {
    return getNeighbors(field, cell).reduce(
        (amount, cur) => (cur.player === null ? amount + 1 : amount),
        0
    );
}

export function amountEnemyNeighs(field: Cell[][], cell: Cell) {
    return getNeighbors(field, cell).reduce(
        (amount, cur) =>
            cur.player !== cell.player && cur.player !== null
                ? amount + 1
                : amount,
        0
    );
}

export function maxNeighsCount(field: Cell[][], cell: Cell) {
    return Math.max(...getNeighbors(field, cell).map(c => c.count));
}

export function maxNeighsEnemiesCount(field: Cell[][], cell: Cell) {
    return Math.max(
        ...getNeighbors(field, cell).map(c =>
            c.player !== cell.player ? c.count : 0
        )
    );
}

export function getNeighbors(field: Cell[][], cell: Cell): Cell[] {
    const [x, y] = cellPositionById(cell.id);
    return [
        trying(() => field[x + 1][y], null),
        trying(() => field[x][y + 1], null),
        trying(() => field[x - 1][y], null),
        trying(() => field[x][y - 1], null)
    ].filter(Boolean) as Cell[];
}

export function randomElementFrom<T>(array: Array<T>): T {
    if (Array.isArray(array))
        return array[Math.floor(Math.random() * array.length)];
    throw new Error('The argument is not an array.');
}
