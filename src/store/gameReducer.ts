import { fieldSize, spawnPoints } from '../data';
import { calcCellPositionById, createField, placeSpawnPoint, playerIsExistOnGameField } from '../logic';
import { Player } from '../types';
import { CellZeroing, GameActions, GameActionType, CellIncrement, CellCapture, playerMoving, NextMover } from './types';

const defaultState = (): GameState => {
    return {
        field: placeSpawnPoint(createField(fieldSize), spawnPoints),
        mover: Player.red,
        moveBlock: false,
        players: getPlayers()
    }
}

const getPlayers = () => [
    Player.red,
    Player.orange,
    Player.yellow,
    Player.green,
    Player.blue
]

export const gameReducer = (state = defaultState(), action: GameActions) => {
    switch (action.type) {
        case GameActionType.CELL_CAPTURE:
            return actionCellCapture(state, action);
        case GameActionType.CELL_INCREMENT:
            return actionCellIncrement(state, action);
        case GameActionType.CELL_ZEROING:
            return actionCellZeroing(state, action);
        case GameActionType.BLOCK_MOVING:
            return { ...state, moveBlock: true };
        case GameActionType.ALLOW_MOVING:
            return { ...state, moveBlock: false };
        case GameActionType.NEXT_MOVER:
            return actionNextMover(state, action);
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

function getNext() {

}

/**
 * Action creators
 */
export const cellIncrement = (payload: number): GameActions => ({ type: GameActionType.CELL_INCREMENT, payload: payload })
export const cellZeroing = (payload: number): GameActions => ({ type: GameActionType.CELL_ZEROING, payload: payload })
export const cellCapture = (payload: playerMoving): GameActions => ({ type: GameActionType.CELL_CAPTURE, payload: payload })
export const nextMover = (): GameActions => ({ type: GameActionType.NEXT_MOVER, payload: undefined })
export const blockMoving = (): GameActions => ({ type: GameActionType.BLOCK_MOVING, payload: undefined })
export const allowMoving = (): GameActions => ({ type: GameActionType.ALLOW_MOVING, payload: undefined })
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

function actionNextMover(state: GameState, action: NextMover) {
    const leftPlayers = [...state.players];
    let curI = leftPlayers.indexOf(state.mover);
    let nextMover = leftPlayers[curI + 1] ? leftPlayers[curI + 1] : 0;

    while (leftPlayers.length > 1 && !playerIsExistOnGameField(state.field, nextMover)) {
        curI = leftPlayers.indexOf(state.mover);
        leftPlayers.splice(leftPlayers.indexOf(nextMover), 1);
        nextMover = leftPlayers[curI + 1] ? leftPlayers[curI + 1] : 0;
    }
    return { ...state, mover: nextMover, players: leftPlayers };
}