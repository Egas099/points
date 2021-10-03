import { calc, create, cellIsExist } from '../logic/functions';
import { Player } from '../types';
import { GameActions, GameActionType, CellCloning, playerMoving } from './types';

const defaultState = (): Cell[][] => []
export const givenState = (templete: FieldTemplate): Cell[][] => create.spawnPoint(create.fieldByTemplate(templete), templete.spawns)
export const gameFieldReducer = (state = defaultState(), action: GameActions): Cell[][] => {
    switch (action.type) {
        case GameActionType.START_GAME:
            return action.payload
                ? givenState(action.payload)
                : defaultState();
        case GameActionType.CELL_CAPTURE:
            return actionCellCapture(state, action.payload);
        case GameActionType.CELL_INCREMENT:
            return actionCellIncrement(state, action.payload);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action.payload);
        case GameActionType.CELL_CLONING:
            return actionCloneCell(state, action);
        case GameActionType.PLAYER_MOVE:
            return actionCellIncrement(state, action.payload.id);
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

function actionCellCapture(state: Cell[][], captureInfo: playerMoving) {
    if (!state.length) return state;

    const [x, y] = calc.cellPositionById(captureInfo.cellId);
    const newState = Array.from(state);

    newState[x][y] = { ...state[x][y], player: captureInfo.player };

    return newState;
}

function actionCellIncrement(state: Cell[][], cellId: number) {
    if (!state.length) return state;

    const newState = Array.from(state);
    const [x, y] = calc.cellPositionById(cellId);

    newState[x][y] = { ...state[x][y], count: newState[x][y].count + 1 };

    return newState;
}


function actionCellZeroing(state: Cell[][], cellId: number) {
    if (!state.length) return state;

    const newState = Array.from(state);
    const [x, y] = calc.cellPositionById(cellId);

    newState[x][y] = { ...state[x][y], count: 0, player: null };

    return newState;
}

function actionCloneCell(state: Cell[][], action: CellCloning) {
    if (!state.length) return state;

    const newState = Array.from(state);
    const cell = action.payload;
    const [x, y] = calc.cellPositionById(cell.id);

    if (cell.count === 5) {
        newState[x][y] = { ...newState[x][y], count: 1 }
    } else {
        newState[x][y] = { ...newState[x][y], count: 0, player: null }
    }

    if (cellIsExist(newState, [x + 1, y]))
        newState[x + 1][y] = cellIncAndCapture(newState[x + 1][y], cell.player);

    if (cellIsExist(newState, [x, y + 1]))
        newState[x][y + 1] = cellIncAndCapture(newState[x][y + 1], cell.player);

    if (cellIsExist(newState, [x - 1, y]))
        newState[x - 1][y] = cellIncAndCapture(newState[x - 1][y], cell.player);

    if (cellIsExist(newState, [x, y - 1]))
        newState[x][y - 1] = cellIncAndCapture(newState[x][y - 1], cell.player);

    return newState;
}

const cellIncAndCapture = (cell: Cell, player: Player): Cell => {

    return { ...cell, player: player, count: cell.count + 1 }
}