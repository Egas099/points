import { Dispatch } from 'react';
import { fieldSize } from '../data';
import { allowMoving, cellCapture, cellIncrement, cellZeroing, nextMover } from '../store/gameReducer';
import { Player } from '../types';

export const checkCellsToOverflow = (state: GameState, dispatch: Dispatch<any>) => {
    const cell = findOverflowCells(state.field);

    if (cell) {
        cloneCell(state, dispatch, cell)
        setTimeout(() => checkCellsToOverflow(state, dispatch), 0)
    }
    else {
        dispatch(nextMover());
        dispatch(allowMoving())
    }
}

const findOverflowCells = (field: Cell[][]): Cell | undefined => {
    for (const row of field) {
        const cell = row.find((cell) => cell.count > 3);
        if (cell) return cell;
    }
}

const cloneCell = (state: GameState, dispatch: Dispatch<any>, cell: Cell) => {
    const player = cell.player;
    const [x, y] = calcCellPositionById(cell.id);
    const count = cell.count;

    dispatch(cellZeroing(state.field[y][x].id));

    if (count === 5)
        cellIncAndCapture(dispatch, state.field[y][x].id, player)

    if (y + 1 < fieldSize.y)
        cellIncAndCapture(dispatch, state.field[y + 1][x].id, player)

    if (x + 1 < fieldSize.x)
        cellIncAndCapture(dispatch, state.field[y][x + 1].id, player)

    if (y - 1 >= 0)
        cellIncAndCapture(dispatch, state.field[y - 1][x].id, player)

    if (x - 1 >= 0)
        cellIncAndCapture(dispatch, state.field[y][x - 1].id, player)
}

const cellIncAndCapture = (dispatch: Dispatch<any>, id: number, player: Player) => {
    dispatch(cellCapture({ cellId: id, player: player }))
    dispatch(cellIncrement(id));
}

export const calcCellPositionById = (number: number) => [number % 10, Math.floor(number / 10)]

export const getNextMover = (player: Player) => Player[player + 1] ? ++player : 0;

export const playerIsExistOnGameField = (field: Cell[][], player: Player) => {
    for (const row of field) {
        const cell = row.find((cell) => cell.player === player);
        if (cell) return true
    }
    return false;
}

export const createField = (size: Vector2): Cell[][] => {
    return new Array(size.y).fill(1).map((a, i) => {
        return (new Array(size.x).fill(1).map((b, j) => createCell(i * 10 + j)))
    })
}

const createCell = (id: number) => ({ id: id, count: 0, player: undefined })

export const placeSpawnPoint = (field: Cell[][], spawnPoints: SpawnPoint[]) => {
    let newField = field;
    spawnPoints.forEach((spawn) => {
        newField[spawn.y][spawn.x].player = spawn.player;
        newField[spawn.y][spawn.x].count = 3;
    });
    return newField;
}