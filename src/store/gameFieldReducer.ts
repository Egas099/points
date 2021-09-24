import { fieldSize, spawnPoints } from '../data';
import { calc, create } from '../logic/functions';
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
    let newState = { field: [...state.field] };
    const [x, y] = calc.cellPositionById(action.payload.cellId);

    newState.field[x][y].player = action.payload.player;

    return newState;
}

function actionCellIncrement(state: GameField, action: CellIncrement) {
    let newState = { field: [...state.field] };
    const [x, y] = calc.cellPositionById(action.payload);

    newState.field[x][y].count += 1;

    return newState;
}


function actionCellZeroing(state: GameField, action: CellZeroing) {
    let newState = { field: [...state.field] };
    const [x, y] = calc.cellPositionById(action.payload);

    newState.field[x][y].count = 0;
    newState.field[x][y].player = null;

    return newState;
}