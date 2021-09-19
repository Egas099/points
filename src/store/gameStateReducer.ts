import { playerIsExistOnGameField } from '../logic';
import { Player, States } from '../types';
import { GameActions, GameActionType, playerMoving } from './types';

const defaultState = (): GameState => {
    return {
        mover: Player.red,
        moveBlock: false,
        players: getPlayers(),
        moveNumber: 0,
        state: States.Moving
    }
}

const getPlayers = () => [
    Player.red,
    Player.orange,
    Player.yellow,
    Player.green,
    Player.blue
]

export const gameStateReducer = (state = defaultState(), action: GameActions): GameState => {
    switch (action.type) {
        case GameActionType.BLOCK_MOVING:
            return { ...state, moveBlock: true };
        case GameActionType.ALLOW_MOVING:
            return { ...state, moveBlock: false };
        case GameActionType.NEXT_MOVER:
            return actionNextMover(state, action.payload);
        case GameActionType.RESTART_GAME:
            console.log("rest gs");

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
export const nextMover = (payload: Cell[][]): GameActions => ({ type: GameActionType.NEXT_MOVER, payload: payload })
export const blockMoving = (): GameActions => ({ type: GameActionType.BLOCK_MOVING, payload: undefined })
export const allowMoving = (): GameActions => ({ type: GameActionType.ALLOW_MOVING, payload: undefined })
export const restartGame = (): GameActions => ({ type: GameActionType.RESTART_GAME, payload: undefined })

function actionNextMover(state: GameState, field: Cell[][]) {
    const leftPlayers = [...state.players];
    let curI = leftPlayers.indexOf(state.mover);
    let nextMover = leftPlayers[curI + 1] ? leftPlayers[curI + 1] : 0;

    while (leftPlayers.length > 1 && !playerIsExistOnGameField(field, nextMover)) {
        curI = leftPlayers.indexOf(state.mover);
        leftPlayers.splice(leftPlayers.indexOf(nextMover), 1);
        nextMover = leftPlayers[curI + 1] ? leftPlayers[curI + 1] : 0;
    }
    if (state.mover === nextMover) {
        console.log(`${nextMover} vin`);
    }
    return { ...state, mover: nextMover, players: leftPlayers };
}