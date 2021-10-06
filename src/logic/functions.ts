import { gameSettings } from "../data";
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

    cellPositionById: (number: number) =>
        [Math.floor(number / gameSettings.template.size[0]), number % gameSettings.template.size[0]],

    amountCellWithPoints: (cells: Cell[], count: number) =>
        cells.reduce((acum, cur) => cur.count === count ? acum + 1 : acum, 0),

    amountEmptyNeighs: (field: Cell[][], cell: Cell) => {
        return getNeighbors(field, cell).reduce((acum, cur) => cur.player === null ? acum + 1 : acum, 0);;
    },
    maxNeighsCount: (field: Cell[][], cell: Cell) => {
        return Math.max(...getNeighbors(field, cell).map(c => c.count))
    },
    maxNeighsEnemiesCount: (field: Cell[][], cell: Cell) => {
        return Math.max(
            ...getNeighbors(field, cell).map(c => c.player !== cell.player ? c.count : 0)
        )
    }
}

export const create = {
    cell: (id: number) => ({ id: id, count: 0, player: null, allow: true }),
    emptyCell: (id: number) => ({ id: id, count: 0, player: null, allow: false }),
    field: (size: Vector2): Cell[][] => {
        return new Array(size[1]).fill(1).map((a, i) => {
            return (new Array(size[0]).fill(1).map((b, j) => create.cell(i * size[0] + j)))
        })
    },
    spawnPoint: (field: Cell[][], spawnPoints: SpawnPoint[]) => {
        let newField = field;
        spawnPoints.forEach((spawn) => {
            newField[spawn.y][spawn.x].player = spawn.player;
            newField[spawn.y][spawn.x].count = 3;
        });
        return newField;
    },
    fieldByTemplate(fieldTemplate: FieldTemplate) {
        const [sizeX, sizeY] = fieldTemplate.size;
        const newField = create.field(fieldTemplate.size);

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                if (fieldTemplate.field[i][j]) {
                    newField[i][j] = create.cell(i * sizeX + j);
                } else {
                    newField[i][j] = create.emptyCell(i * sizeX + j);
                }
            }
        }

        return newField;
    }
}
export const isExist = {
    playerOnField: (field: Cell[][], player: Player) =>
        field.some((row) => row.some((cell) => cell.player === player) ? true : false)
}

export const random = {
    elemetFrom: (object: Array<any> | Object | any): any => {
        if (Array.isArray(object))
            return object[Math.floor(Math.random() * object.length)]

        else if (Object.prototype.toString.call(object))
            return object[random.elemetFrom(Object.keys(object))];

        throw new Error("The argument is not an array or object.");
    },
}

export const filter = {
    cellsByCount: (cells: Cell[], count: number) => cells.filter(cell => cell.count === count),
}

function trying(func: Function, onCatch: any) {
    try { return func() } catch (e) { return onCatch }
}
function getNeighbors(field: Cell[][], cell: Cell): Cell[] {
    const [x, y] = calc.cellPositionById(cell.id);
    return [
        trying(() => field[x + 1][y], null),
        trying(() => field[x][y + 1], null),
        trying(() => field[x - 1][y], null),
        trying(() => field[x][y - 1], null),
    ].filter(e => e);
}

export function upFirst(str: string) {
    return str[0].toUpperCase() + str.slice(1, str.length);
}

export function cellIsExist(field: Cell[][], pos: Vector2) {
    const [x, y] = pos;
    if (trying(() => field[x][y].allow, undefined))
        return true;
    else
        return false;
}