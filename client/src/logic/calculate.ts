import { FIELD_WIDTH } from '../data/constants'
import { Player } from '../types'
import { trying } from './common'

export const nextMover = (player: Player) => (Player[player + 1] ? ++player : 0)

export const cellPositionById = (number: number) => [
    Math.floor(number / FIELD_WIDTH),
    number % FIELD_WIDTH
]

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
