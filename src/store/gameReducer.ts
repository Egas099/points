import { fieldSize, spawnPoints } from '../data';
import { calcCellPositionById, createField, findPlayerOnGameField, getNextMover, placeSpawnPoint } from '../logic';
import { Player } from '../types';
import { CellZeroing, GameActions, GameActionType, CellIncrement, CellCapture, playerMoving } from './types';

const defaultState = (): GameState => {
    return { field: placeSpawnPoint(createField(fieldSize), spawnPoints), mover: Player.red }
}

export const gameReducer = (state = defaultState(), action: GameActions) => {
    switch (action.type) {
        case GameActionType.CELL_CAPTURE:
            return actionCellCapture(state, action);
        case GameActionType.CELL_INCREMENT:
            return actionCellIncrement(state, action);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action);
        case GameActionType.NEXT_MOVER:
            let nextMover = getNextMover(state.mover);
            // if (findPlayerOnGameField(state, nextMover))
            //     console.log("Found", findPlayerOnGameField(state, nextMover), nextMover);
            // else
            //     console.log("Not found");
            return { ...state, mover: nextMover };
        case GameActionType.RESTART_GAME:
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
export const nextMover = (): GameActions => ({ type: GameActionType.NEXT_MOVER, payload: undefined })
export const restartGame = (): GameActions => ({ type: GameActionType.RESTART_GAME, payload: undefined })

function actionCellCapture(state: GameState, action: CellCapture) {
    let newState = { ...state };
    const [x, y] = calcCellPositionById(action.payload.cellId);

    newState.field[y][x].player = action.payload.player;

    return newState;
}

function actionCellIncrement(state: GameState, action: CellIncrement) {

    let newState = { ...state };
    const [x, y] = calcCellPositionById(action.payload);

    newState.field[y][x].count += 1;

    return newState;
}


function actionCellZeroing(state: GameState, action: CellZeroing) {
    let newState = { ...state };
    const [x, y] = calcCellPositionById(action.payload);

    newState.field[y][x].count = 0;
    newState.field[y][x].player = undefined;

    return newState;
}