import { Dispatch } from 'react';
import { fieldSize } from '../data';
import { cellCapture, cellIncrement, cellZeroing } from '../store/gameReducer';
import { Player } from '../types';

export const checkCellsToOverflow = (state: GameState, dispatch: Dispatch<any>) => {
    state.field.forEach((row) => {
        row.forEach((cell) => {
            if (cell.count > 3)
                cloneCell(state, dispatch, cell)
        })
    })
}

const cloneCell = (state: GameState, dispatch: Dispatch<any>, cell: Cell) => {
    const player = cell.player;
    const [x, y] = calcCellPositionById(cell.id);
    dispatch(cellZeroing(state.field[y][x].id));

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

export const findPlayerOnGameField = (state: GameState, player: Player) => {
    return state.field.find((row) => row.find((cell) => cell.player === player))
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