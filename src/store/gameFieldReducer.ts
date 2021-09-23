import { fieldSize, spawnPoints } from '../data';
import { calculate, create } from '../logic/functions';
import { CellZeroing, GameActions, GameActionType, CellIncrement, CellCapture } from './types';

const defaultState = (): GameField => ({
    field: create.spawnPoint(create.field(fieldSize), spawnPoints)
})


export const gameFieldReducer = (state = defaultState(), action: GameActions): GameField => {
    switch (action.type) {
        case GameActionType.CELL_CAPTURE:
            return actionCellCapture(state, action);
        case GameActionType.CELL_INCREMENT:
            return actionCellIncrement(state, action);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action);
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

function actionCellCapture(state: GameField, action: CellCapture) {
    let newState = { ...state };
    const [x, y] = calculate.cellPositionById(action.payload.cellId);

    newState.field[y][x].player = action.payload.player;

    return newState;
}

function actionCellIncrement(state: GameField, action: CellIncrement) {

    let newState = { ...state };
    const [x, y] = calculate.cellPositionById(action.payload);

    newState.field[y][x].count += 1;

    return newState;
}


function actionCellZeroing(state: GameField, action: CellZeroing) {
    let newState: GameField = { ...state };
    const [x, y] = calculate.cellPositionById(action.payload);

    newState.field[y][x].count = 0;
    newState.field[y][x].player = null;

    return newState;
}