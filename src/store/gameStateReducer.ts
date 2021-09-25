import { isExist } from '../logic/functions';
import { Player } from '../types';
import { GameActions, GameActionType } from './types';

const defaultState = (): GameState => ({
    mover: Player.red,
    moveBlock: false,
    endGame: false,
    moveNumber: 0,
    players: getPlayers(),
})

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
            return { ...state, moveBlock: false, moveNumber: state.moveNumber + 1 };
        case GameActionType.NEW_MOVE:
            return actionNewMove(state, action.payload);
        case GameActionType.NEXT_MOVER:
            return actionNextMover(state, action.payload);
        case GameActionType.PLAYER_MOVE:
            return { ...state, moveBlock: true };
        case GameActionType.RESTART_GAME:
            return defaultState();
        default:
            return state;
    }
};

function actionNextMover(state: GameState, field: Cell[][]) {
    const leftPlayers = [...state.players].filter((player) => isExist.playerOnField(field, player));
    const currentMoverIndex = leftPlayers.indexOf(state.mover);
    const nextMoverIndex = currentMoverIndex + 1 < leftPlayers.length ? currentMoverIndex + 1 : 0;
    let newMover = leftPlayers[nextMoverIndex];
    return { ...state, mover: newMover, players: leftPlayers };
}
function actionNewMove(state: GameState, field: Cell[][]) {
    if (state.moveBlock) {
        const newState = {
            ...actionNextMover(state, field),
            moveNumber: state.moveNumber + 1,
            moveBlock: false
        };
        if (newState.players.length === 1) {
            newState.endGame = true;
            newState.moveBlock = true;
        }
        return newState;
    } else {
        return state;
    }
}