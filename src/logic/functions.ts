import { fieldSize } from "../data";
import { Player } from "../types";

export const find = {
    overflowingCell: (field: Cell[][]) => {
        for (const row of field) {
            const cell = row.find((cell) => cell.count > 3);
            if (cell) return cell;
        }
    },
    cellsByPlayer: (field: Cell[][], player: Player): Cell[] => {
        let responce: Cell[] = [];
        for (const row of field) {
            const cell = row.filter((cell) => cell.player === player);
            if (cell.length > 0) responce = responce.concat(cell);
        }
        return responce;
    },
}

export const calc = {
    nextMover: (player: Player) => Player[player + 1] ? ++player : 0,
    cellPositionById: (number: number) => [Math.floor(number / fieldSize.x), number % fieldSize.x],
    amountCellWithPoints: (cells: Cell[], count: number) => cells.reduce((acum, cur) => cur.count === count ? acum + 1 : acum, 0),
    amountEmptyNeighs: (field: Cell[][], cell: Cell) => {
        const [x, y] = calc.cellPositionById(cell.id);
        let count = 0;
        count += trying(() => field[x + 1][y].player === null ? 1 : 0, 0);
        count += trying(() => field[x][y + 1].player === null ? 1 : 0, 0);
        count += trying(() => field[x - 1][y].player === null ? 1 : 0, 0);
        count += trying(() => field[x][y - 1].player === null ? 1 : 0, 0);
        return count;
    }
}

export const create = {
    cell: (id: number) => ({ id: id, count: 0, player: null }),
    field: (size: Vector2): Cell[][] => {
        return new Array(size.y).fill(1).map((a, i) => {
            return (new Array(size.x).fill(1).map((b, j) => create.cell(i * size.x + j)))
        })
    },
    spawnPoint: (field: Cell[][], spawnPoints: SpawnPoint[]) => {
        let newField = field;
        spawnPoints.forEach((spawn) => {
            newField[spawn.y][spawn.x].player = spawn.player;
            newField[spawn.y][spawn.x].count = 3;
        });
        return newField;
    }
}
export const isExist = {
    playerOnField: (field: Cell[][], player: Player) => field.some((row) => row.some((cell) => cell.player === player) ? true : false)
}

export const random = {
    elemetFrom: (array: Array<any>) => array[Math.floor(Math.random() * array.length)],
}

export const filter = {
    cellsByCount: (cells: Cell[], count: number) => cells.filter(cell => cell.count === count),
}

function trying(func: Function, onCatch: any) {
    try { return func() } catch (e) { return onCatch }
}