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
    }
}

export const calculate = {
    nextMover: (player: Player) => Player[player + 1] ? ++player : 0,
    cellPositionById: (number: number) => [number % fieldSize.x, Math.floor(number / fieldSize.x)],
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