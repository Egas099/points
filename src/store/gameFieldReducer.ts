import { fieldSize, spawnPoints } from '../data';
import { calcCellPositionById, createField, placeSpawnPoint } from '../logic';
import { Player } from '../types';
import { CellZeroing, GameActions, GameActionType, CellIncrement, CellCapture, playerMoving } from './types';

const defaultState = (): GameField => {
    return {
        field: placeSpawnPoint(createField(fieldSize), spawnPoints),
    }
}

const getPlayers = () => [
    Player.red,
    Player.orange,
    Player.yellow,
    Player.green,
    Player.blue
]

export const gameFieldReducer = (state = defaultState(), action: GameActions): GameField => {
    switch (action.type) {
        case GameActionType.CELL_CAPTURE:
            return actionCellCapture(state, action);
        case GameActionType.CELL_INCREMENT:
            return actionCellIncrement(state, action);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action);
        case GameActionType.RESTART_GAME:
            console.log("rest f");

            return defaultState();
        default:
            return state;
    }
};

/**
 * Action creators
 */
export const cellIncrement = (payload: number): GameActions => ({ type: GameActionType.CELL_INCREMENT, payload: payload })
export const cellZeroing = (payload: number): GameActions => ({ type: GameActionType.CELL_ZEROING, payload: payload })
export const cellCapture = (payload: playerMoving): GameActions => ({ type: GameActionType.CELL_CAPTURE, payload: payload })
export const restartGame = (): GameActions => ({ type: GameActionType.RESTART_GAME, payload: undefined })

function actionCellCapture(state: GameField, action: CellCapture) {
    let newState = { ...state };
    const [x, y] = calcCellPositionById(action.payload.cellId);

    newState.field[y][x].player = action.payload.player;

    return newState;
}

function actionCellIncrement(state: GameField, action: CellIncrement) {

    let newState = { ...state };
    const [x, y] = calcCellPositionById(action.payload);

    newState.field[y][x].count += 1;

    return newState;
}


function actionCellZeroing(state: GameField, action: CellZeroing) {
    let newState: GameField = { ...state };
    const [x, y] = calcCellPositionById(action.payload);

    newState.field[y][x].count = 0;
    newState.field[y][x].player = null;

    return newState;
}