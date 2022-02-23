import { cellPositionById } from "./calculate";
import { trying } from "./common";

export function filterCellsByCount(cells: Cell[], count: number) {
    return cells.filter(cell => cell.count === count);
}

export function amountCellWithPoints(cells: Cell[], count: number) {
    return cells.reduce(
        (acum, cur) => (cur.count === count ? acum + 1 : acum),
        0
    )
}
export function amountEmptyNeighs(field: Cell[][], cell: Cell) {
    return getNeighbors(field, cell).reduce(
        (acum, cur) => (cur.player === null ? acum + 1 : acum),
        0
    )
}

export function maxNeighsCount(field: Cell[][], cell: Cell) {
    return Math.max(...getNeighbors(field, cell).map(c => c.count))
}

export function maxNeighsEnemiesCount(field: Cell[][], cell: Cell) {
    return Math.max(
        ...getNeighbors(field, cell).map(c =>
            c.player !== cell.player ? c.count : 0
        )
    )
}

export function getNeighbors(field: Cell[][], cell: Cell): Cell[] {
    const [x, y] = cellPositionById(cell.id)
    return [
        trying(() => field[x + 1][y], null),
        trying(() => field[x][y + 1], null),
        trying(() => field[x - 1][y], null),
        trying(() => field[x][y - 1], null)
    ].filter(Boolean)
}

export function randomElemetFrom(array: Array<any>) {
    if (Array.isArray(array))
        return array[Math.floor(Math.random() * array.length)];
    throw new Error('The argument is not an array.');
}
